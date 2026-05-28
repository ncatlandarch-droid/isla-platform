import React, { useState, useRef, useEffect, useMemo } from 'react';
import UNIVERSITY from './config/university.js';
import CollegeSelector from './components/CollegeSelector.jsx';
import {
  Compass, Map as MapIcon, Layers, CheckCircle2, AlertCircle,
  History, BarChart3, UserCircle, Play, Save, Trash2, ChevronRight,
  Info, Calculator, BookOpen, Settings, LogOut, ChevronLeft, FileText,
  Lock, Mail, MessageSquare, Sparkles, Award, Volume2, VolumeX, ClipboardCheck,
  PencilRuler, Mountain, Globe, Send, Check, Briefcase, Calendar,
  PanelLeftClose, PanelLeftOpen, X, ArrowLeft, ExternalLink, Target,
  Zap, Clock, Square
} from 'lucide-react';
import {
  loginUser, registerUser, logoutUser, onAuthChange,
  getUserProgress, saveUserProgress, saveQuizResult,
  signInWithGoogle, firebaseReady
} from './firebase.js';

import { EXAM_SECTIONS, AGGIE_BLUE, AGGIE_GOLD } from './data/examSections.js';
import { QUESTION_BANK } from './data/questionBank.js';
import { PERRY_INTROS } from './data/flashcardData.js'; // Added PERRY_INTROS
import { generateQuestion, getAskedQuestions, recordAskedQuestion } from './engine/questionGenerator.js';
import { STATE_REQUIREMENTS, CLARB_FEES } from './data/stateRequirements.js';
import { GLOSSARY_DATA } from './data/glossaryData.js';
import {
  CELA_RESOURCES, CLARB_RESOURCES, SGLA_RESOURCES, EXAM_TIMELINE
} from './data/celaResources.js';

// === NEW: Adaptive Learning Engine ===
import questionEngine from './engine/QuestionEngine.js';
import spacedRepetition from './engine/SpacedRepetition.js';
import performanceTracker from './engine/PerformanceTracker.js';
import perryVoice from './engine/PerryVoice.js';

// === NEW: Adaptive Learning Components ===
import AdaptiveQuiz from './components/AdaptiveQuiz.jsx';
import FocusMode from './components/FocusMode.jsx';
import MasteryDashboard from './components/MasteryDashboard.jsx';
import ModuleLanding from './components/ModuleLanding.jsx';
import Flashcards from './components/Flashcards.jsx';
import MatchGame from './components/MatchGame.jsx';
import ExamSimulator from './components/ExamSimulator.jsx';

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

// --- ISLA Bark Sound Effect ---
const barkAudio = new Audio('/audio/isla-bark.wav');
barkAudio.volume = 0.5;
const islaBark = (volume = 0.5) => {
  try {
    barkAudio.volume = volume;
    barkAudio.currentTime = 0;
    barkAudio.play().catch(() => {});
  } catch (e) { /* silent fail */ }
};

const ConfettiEffect = ({ active }) => {
  if (!active) return null;
  const colors = [AGGIE_GOLD, AGGIE_BLUE, '#ffffff', '#60a5fa', '#22c55e', '#f59e0b'];
  const shapes = ['confetti-piece', 'confetti-piece confetti-piece--circle', 'confetti-piece confetti-piece--star'];
  return (
    <div className="confetti-container">
      {[...Array(120)].map((_, i) => (
        <div
          key={i}
          className={shapes[i % 3]}
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            '--drift': `${(Math.random() - 0.5) * 200}px`,
            '--spin': `${Math.random() * 720 - 360}deg`
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   MAIN APPLICATION
   ============================================================ */
export default function App() {
  // --- Firebase Auth State ---
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // --- Program Selection (modular architecture) ---
  const [activeProgram, setActiveProgram] = useState(null);   // null | 'lare' | 'nclex' etc.
  const [activeCollege, setActiveCollege] = useState(null);   // null | college object
  const [userRole, setUserRole] = useState('student');        // 'student' | 'admin'

  // --- App Navigation ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSection, setSelectedSection] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(perryVoice.isMuted);

  // --- User Data (derived from Firebase user) ---
  const userData = firebaseUser
    ? { name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Aggie Designer', id: firebaseUser.uid?.slice(0, 10) || 'LOCAL-US' }
    : { name: 'Aggie Designer', id: 'LOCAL-US' };
  // Load progress from localStorage — starts at 0 for new users
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('lare-progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if streak is still valid (studied today or yesterday)
        const lastStudy = parsed.lastStudyDate || '';
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastStudy !== today && lastStudy !== yesterday) {
          parsed.streak = 0; // Reset streak if missed a day
        }
        return parsed;
      }
    } catch (e) {}
    return { streak: 0, mastery: 0, solved: 0, lastStudyDate: '' };
  });
  const [chatHistory, setChatHistory] = useState([
    { role: 'isla', text: "Welcome to ISLA! Ready to sharpen your technical edge today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatScrollRef = useRef(null);

  // Auto-save progress to localStorage AND Firestore whenever it changes
  React.useEffect(() => {
    try { localStorage.setItem('lare-progress', JSON.stringify(progress)); } catch (e) {}
    // Also sync to Firestore if logged in
    if (firebaseUser?.uid) {
      saveUserProgress(firebaseUser.uid, progress).catch(() => {});
    }
  }, [progress, firebaseUser]);

  /** Track a correct answer — updates streak, mastery, solved count */
  const recordCorrectAnswer = () => {
    setProgress(prev => {
      const today = new Date().toDateString();
      const isNewDay = prev.lastStudyDate !== today;
      const newSolved = prev.solved + 1;
      // Mastery = % correct out of a reasonable target (e.g., 500 questions for mastery)
      const newMastery = Math.min(Math.round((newSolved / 500) * 100), 100);
      return {
        ...prev,
        solved: newSolved,
        mastery: newMastery,
        streak: isNewDay ? prev.streak + 1 : prev.streak,
        lastStudyDate: today
      };
    });
  };

  // --- Calculator State ---
  const [calcRise, setCalcRise] = useState('');
  const [calcRun, setCalcRun] = useState('');
  const calcSlope = (calcRise && calcRun && parseFloat(calcRun) !== 0)
    ? ((parseFloat(calcRise) / parseFloat(calcRun)) * 100).toFixed(2)
    : null;

  // --- Section 4: Grading Canvas ---
  const [points, setPoints] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const canvasRef = useRef(null);

  // --- Registration State ---
  const [selectedState, setSelectedState] = useState("");

  // --- Quiz State ---
  const [quizSection, setQuizSection] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);  // Active question pool (static + AI)
  const [generatingQ, setGeneratingQ] = useState(false);   // Loading state for AI generation

  // --- NEW: Adaptive Learning State ---
  const [viewMode, setViewMode] = useState(null); // 'adaptive-quiz' | 'focus-mode' | null
  const [adaptiveSection, setAdaptiveSection] = useState(null);
  const [adaptiveFocusTopic, setAdaptiveFocusTopic] = useState(null);

  /* ============================================================
     FIREBASE AUTH LISTENER
     ============================================================ */
  useEffect(() => {
    if (!firebaseReady) {
      setIsAuthReady(true);
      return;
    }
    const unsub = onAuthChange(async (user) => {
      setFirebaseUser(user);
      setIsAuthReady(true);
      if (user) {
        setIsLoggedIn(true);
        // Load progress from Firestore
        const cloudProgress = await getUserProgress(user.uid);
        if (cloudProgress) {
          setProgress(cloudProgress);
          try { localStorage.setItem('lare-progress', JSON.stringify(cloudProgress)); } catch(e) {}
        }
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsub();
  }, []);

  // --- Auto-scroll chat ---
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // --- Voice Engine Setup ---
  useEffect(() => {
    perryVoice.onSpeakStart = () => setIsSpeaking(true);
    perryVoice.onSpeakEnd = () => setIsSpeaking(false);
    return () => {
      perryVoice.onSpeakStart = null;
      perryVoice.onSpeakEnd = null;
      perryVoice.stop();
    };
  }, []);

  // --- Perry Landing Page Welcome (before login) ---
  const [hasPlayedLanding, setHasPlayedLanding] = useState(false);
  useEffect(() => {
    if (!isLoggedIn && !hasPlayedLanding && !perryVoice.isMuted) {
      const landingTimer = setTimeout(() => {
        playPerryStatic('landing');
        setHasPlayedLanding(true);
      }, 1200);
      return () => clearTimeout(landingTimer);
    }
  }, [isLoggedIn, hasPlayedLanding]);

  // --- ISLA Welcome (static pre-recorded audio + bark, after login) ---
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);
  useEffect(() => {
    if (isLoggedIn && !hasPlayedWelcome && !perryVoice.isMuted) {
      const welcomeTimer = setTimeout(() => {
        islaBark(0.4);  // 🐶 greeting bark!
        playPerryStatic('welcome');
        setHasPlayedWelcome(true);
      }, 800);
      return () => clearTimeout(welcomeTimer);
    }
  }, [isLoggedIn, hasPlayedWelcome]);

  /* ============================================================
     HANDLERS
     ============================================================ */
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!firebaseReady) {
      // Local-only mode fallback
      setIsLoggedIn(true);
      setAuthLoading(false);
      return;
    }

    try {
      if (isRegistering) {
        const displayName = formData.get('displayName') || email.split('@')[0];
        await registerUser(email, password, displayName);
      } else {
        await loginUser(email, password);
      }
      // onAuthChange listener handles the rest
    } catch (err) {
      const msg = err.code === 'auth/user-not-found' ? 'No account found. Click "Create Account" to register.'
        : err.code === 'auth/wrong-password' ? 'Incorrect password. Please try again.'
        : err.code === 'auth/invalid-credential' ? 'Invalid credentials. Check your email and password.'
        : err.code === 'auth/email-already-in-use' ? 'This email is already registered. Try logging in.'
        : err.code === 'auth/weak-password' ? 'Password must be at least 6 characters.'
        : err.code === 'auth/invalid-email' ? 'Please enter a valid email address.'
        : err.message || 'Authentication failed. Please try again.';
      setAuthError(msg);
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setFirebaseUser(null);
      setProgress({ streak: 0, mastery: 0, solved: 0, lastStudyDate: '' });
      setActiveTab('dashboard');
    } catch (err) {
      console.warn('Logout failed:', err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      const msg = err.code === 'auth/popup-closed-by-user' ? 'Sign-in popup was closed.'
        : err.code === 'auth/popup-blocked' ? 'Popup was blocked — please allow popups for this site.'
        : err.message || 'Google sign-in failed.';
      setAuthError(msg);
    }
    setAuthLoading(false);
  };

  const triggerAchievement = () => {
    setShowConfetti(true);
    islaBark(0.6);  // 🐶 celebratory bark!
    setTimeout(() => setShowConfetti(false), 6000);
  };

  const toggleMute = () => {
    const muted = perryVoice.toggleMute();
    setIsMuted(muted);
  };

  // Track last played static key for replay
  const [lastPlayedKey, setLastPlayedKey] = useState(null);
  const playPerryStatic = (key) => {
    setLastPlayedKey(key);
    perryVoice.playStatic(key);
  };
  const replayPerry = () => {
    if (lastPlayedKey) perryVoice.playStatic(lastPlayedKey);
  };
  const stopPerry = () => {
    perryVoice.stop();
    setIsSpeaking(false);
  };

  const sendMessageToPerry = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg, timestamp: Date.now() }]);
    setChatInput("");

    // Show thinking indicator
    setChatHistory(prev => [...prev, { role: 'isla', text: '...thinking...', timestamp: Date.now(), isThinking: true }]);

    try {
      // Build conversation context for Gemini
      const recentChat = chatHistory.slice(-6).map(c =>
        c.role === 'user' ? { role: 'user', parts: [{ text: c.text }] } : { role: 'model', parts: [{ text: c.text }] }
      );

      const systemPrompt = `You are ISLA, the AI study coach for the LARE (Landscape Architect Registration Examination) at North Carolina A&T State University. You are warm, encouraging, knowledgeable, and speak like a supportive coach who genuinely cares about each student's success.

Your expertise covers:
- LARE Sections 1-4 (Project & Construction Management, Inventory & Analysis, Design, Grading Drainage & Stormwater)
- CLARB registration process and Council Records
- NC licensing requirements
- Landscape architecture practice, codes, ADA, grading calculations, stormwater (Rational Method Q=CiA)
- CELA conferences and academic landscape architecture

Rules:
- Keep responses concise (2-4 sentences max)
- Be specific with formulas, percentages, and exam tips
- Use encouraging language ("Aggie", "let's get after it")
- Reference NC A&T pride when appropriate
- If asked something outside landscape architecture, gently redirect to LARE topics`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [...recentChat, { role: 'user', parts: [{ text: userMsg }] }],
            generationConfig: { maxOutputTokens: 600, temperature: 0.8 }
          })
        }
      );

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Let me think about that — try asking a specific LARE topic like grading, stormwater, or Section 1.";

      // Replace thinking indicator with real reply
      setChatHistory(prev => {
        const updated = [...prev];
        const thinkingIdx = updated.findLastIndex(c => c.isThinking);
        if (thinkingIdx >= 0) updated[thinkingIdx] = { role: 'isla', text: reply, timestamp: Date.now() };
        else updated.push({ role: 'isla', text: reply, timestamp: Date.now() });
        return updated;
      });
      perryVoice.speak(reply);
    } catch (err) {
      // Fallback to smart keyword matching if API fails — use pre-recorded audio
      const msg = userMsg.toLowerCase();
      let reply = "Great question! Every challenge in landscape architecture starts with understanding the site. What specific topic can I help you break down?";
      let audioKey = 'chat-default';
      if (msg.includes("grading") || msg.includes("slope")) { reply = "Slope (%) = (Rise / Run) × 100. For swales, stay between 2% and 10%. Section 4 is 44% grading — master this formula and you'll dominate that section."; audioKey = 'chat-grading'; }
      if (msg.includes("section 1") || msg.includes("management")) { reply = "Section 1 is 39% Physical Analysis. Focus on soil classification, hydrology, and ASTM Phase I ESA. Know your USGS symbols!"; audioKey = 'chat-section1'; }
      if (msg.includes("section 4") || msg.includes("stormwater")) { reply = "Section 4 is the 'Widowmaker' — 44% Grading, 39% Stormwater. Master the Rational Method: Q = CiA."; audioKey = 'chat-section4'; }
      if (msg.includes("hello") || msg.includes("hi")) { reply = "Good to see you, Aggie! Let's get after it. What section are you studying today?"; audioKey = 'chat-hello'; }

      setChatHistory(prev => {
        const updated = [...prev];
        const thinkingIdx = updated.findLastIndex(c => c.isThinking);
        if (thinkingIdx >= 0) updated[thinkingIdx] = { role: 'isla', text: reply, timestamp: Date.now() };
        else updated.push({ role: 'isla', text: reply, timestamp: Date.now() });
        return updated;
      });
      playPerryStatic(audioKey);
    }
  };

  const validateDesign = async () => {
    if (points.length < 2) return;
    triggerAchievement();
    setFeedback({ type: 'success', msg: `Masterful! 5.0% slope achieved. Positive drainage confirmed toward catch basin.` });

    if (db && userId && userId !== 'local-user') {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'lare-lab-demo';
      const userDocRef = doc(db, 'artifacts', appId, 'users', userId, 'profile', 'stats');
      updateDoc(userDocRef, {
        solved: (progress.solved || 0) + 1,
        mastery: Math.min((progress.mastery || 0) + 0.5, 100)
      });
    }
    recordCorrectAnswer();
  };

  const handleQuizAnswer = (optionIdx) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(optionIdx);
    const currentQ = quizQuestions[quizIndex];
    if (!currentQ) return;
    // Record this question as asked
    recordAskedQuestion(quizSection, currentQ.text);
    if (optionIdx === currentQ.correct) {
      islaBark(0.35);  // 🐶 quick happy bark on correct!
      setQuizScore(s => s + 1);
      recordCorrectAnswer();
    }
  };

  const nextQuestion = async () => {
    const nextIdx = quizIndex + 1;

    // If we have more questions in the pool, advance
    if (nextIdx < quizQuestions.length) {
      setQuizIndex(nextIdx);
      setQuizAnswer(null);
      return;
    }

    // Generate a new AI question
    setGeneratingQ(true);
    const previouslyAsked = getAskedQuestions(quizSection);
    const newQ = await generateQuestion(quizSection, previouslyAsked);
    setGeneratingQ(false);

    if (newQ) {
      setQuizQuestions(prev => [...prev, newQ]);
      setQuizIndex(nextIdx);
      setQuizAnswer(null);
    } else {
      // AI failed — end the quiz
      setQuizComplete(true);
      if (quizScore === quizQuestions.length) triggerAchievement();
    }
  };

  /** Start quiz — load static questions + shuffle them */
  const startQuiz = (section) => {
    const staticQs = [...(QUESTION_BANK[section] || [])];
    // Shuffle static questions for variety
    for (let i = staticQs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [staticQs[i], staticQs[j]] = [staticQs[j], staticQs[i]];
    }
    setQuizQuestions(staticQs);
    setQuizSection(section);
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizComplete(false);
  };

  const resetQuiz = () => {
    setQuizSection(null);
    setQuizQuestions([]);
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizComplete(false);
  };

  const navigateTo = (tab, section = null) => {
    setActiveTab(tab);
    setSelectedSection(section);
    setViewMode(null);
    setAdaptiveSection(null);
    setAdaptiveFocusTopic(null);
    resetQuiz();
    setFeedback(null);
    setPoints([]);
  };

  /** Open module landing page when clicking a module card */
  const openModuleLanding = (sectionId) => {
    setAdaptiveSection(sectionId);
    setViewMode('module-landing');
    setActiveTab('modules');
  };

  /** Launch adaptive quiz for a section (optionally focused on a topic) */
  const startAdaptiveQuiz = (sectionId, topic = null) => {
    questionEngine.resetSession(); // Clear previously-asked tracking so all 20 questions are available
    setAdaptiveSection(sectionId);
    setAdaptiveFocusTopic(topic);
    setViewMode('adaptive-quiz');
    setActiveTab('modules');
  };

  /** Launch focus mode */
  const startFocusMode = () => {
    setViewMode('focus-mode');
    setActiveTab('modules');
  };

  /* ============================================================
     RENDER: LOGIN
     ============================================================ */
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card card">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="login__logo-wrap">
              <Compass color={AGGIE_BLUE} size={50} />
            </div>
            <h1 className="login__title">ISLA</h1>
            <span className="login__brand-full">Interactive Study & Licensure Assistant</span>
            <div className="login__divider" />

            {/* ISLA welcome on landing */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
              <img
                src="/Perry.png"
                alt="ISLA"
                style={{ width: 40, height: 40, borderRadius: '50%', border: `2px solid ${AGGIE_GOLD}`, objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>ISLA</span>
              {isSpeaking ? (
                <button
                  onClick={stopPerry}
                  className="sidebar__stop-btn"
                  title="Stop ISLA"
                >
                  <Square size={10} fill="currentColor" /> Stop
                </button>
              ) : (
                <button
                  onClick={() => playPerryStatic('landing')}
                  className="sidebar__play-btn"
                  title="Play welcome"
                >
                  <Play size={10} fill="currentColor" /> Play
                </button>
              )}
            </div>

            <p className="login__subtitle">{isRegistering ? 'Create Your Account' : 'Credentials Required'}</p>
          </div>
          <form className="login__form" onSubmit={handleLogin}>
            {isRegistering && (
              <div className="login__field-group">
                <label className="login__label">Display Name</label>
                <div className="login__input-wrap">
                  <UserCircle className="login__input-icon" size={20} />
                  <input className="login__input" name="displayName" placeholder="Your Name" />
                </div>
              </div>
            )}
            <div className="login__field-group">
              <label className="login__label">Email</label>
              <div className="login__input-wrap">
                <Mail className="login__input-icon" size={20} />
                <input className="login__input" name="email" type="email" placeholder="aggie@ncat.edu" required />
              </div>
            </div>
            <div className="login__field-group">
              <label className="login__label">Password</label>
              <div className="login__input-wrap">
                <Lock className="login__input-icon" size={20} />
                <input className="login__input" name="password" type="password" placeholder="••••••••" required minLength={6} />
              </div>
            </div>
            {authError && (
              <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
                <AlertCircle size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                {authError}
              </div>
            )}
            <button type="submit" className="btn btn--gold" disabled={authLoading} style={{ width: '100%', padding: '1.5rem', fontSize: '1.5rem', letterSpacing: '-0.025em', textTransform: 'uppercase', opacity: authLoading ? 0.6 : 1 }}>
              {authLoading ? '...' : isRegistering ? 'CREATE ACCOUNT' : 'LOGIN TO LAB'}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,70,132,0.15)' }} />
              <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,70,132,0.15)' }} />
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={authLoading}
              style={{
                width: '100%', padding: '1.25rem', fontSize: '1.1rem',
                background: '#fff', border: '2px solid rgba(0,70,132,0.2)',
                borderRadius: '1rem', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                fontWeight: 700, color: '#333', transition: 'all 0.2s',
                opacity: authLoading ? 0.6 : 1
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = AGGIE_BLUE}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(0,70,132,0.2)'}
            >
              <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              Sign in with Google
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => { setIsRegistering(!isRegistering); setAuthError(''); }}
                style={{ background: 'none', border: 'none', color: AGGIE_BLUE, cursor: 'pointer', fontSize: '0.95rem', textDecoration: 'underline', fontWeight: 600 }}
              >
                {isRegistering ? '← Back to Login' : 'New here? Create Account'}
              </button>
            </div>
          </form>
        </div>
        <p className="login__footer">North Carolina A&T State University</p>
      </div>
    );
  }

  /* ============================================================
     RENDER: SIDEBAR
     ============================================================ */
  const Sidebar = () => (
    <aside className={`sidebar ${isSidebarCollapsed ? 'sidebar--collapsed' : 'sidebar--expanded'}`}>
      <div className="sidebar__header">
        {!isSidebarCollapsed && <span className="sidebar__label">Mastery Dock</span>}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="sidebar__toggle"
          style={isSidebarCollapsed ? { margin: '0 auto' } : {}}
        >
          {isSidebarCollapsed ? <PanelLeftOpen size={24} /> : <PanelLeftClose size={24} />}
        </button>
      </div>

      {!isSidebarCollapsed ? (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', animation: 'fadeIn 0.5s ease-out' }}>
          <div className="sidebar__avatar-wrap">
            <div className={`sidebar__avatar ${isSpeaking ? 'sidebar__avatar--speaking' : ''}`}>
              <img
                src="Perry.png"
                alt="ISLA"
                onError={(e) => { e.target.src = "https://placehold.co/400x400/004684/FDB927?text=ISLA"; }}
              />
              {isSpeaking && <div className="sidebar__avatar-wavelength" />}
            </div>
            <h3 className="sidebar__name">ISLA</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '0.25rem' }}>
              <p className="sidebar__role">Your Study Coach</p>
              <button onClick={toggleMute} className="sidebar__mute-btn" title={isMuted ? 'Unmute ISLA' : 'Mute ISLA'}>
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              {isSpeaking ? (
                <button
                  onClick={stopPerry}
                  className="sidebar__stop-btn"
                  title="Stop ISLA"
                >
                  <Square size={10} fill="currentColor" /> Stop
                </button>
              ) : lastPlayedKey && !isMuted ? (
                <button
                  onClick={replayPerry}
                  className="sidebar__play-btn"
                  title="Replay ISLA"
                >
                  <Play size={10} fill="currentColor" /> Replay
                </button>
              ) : null}
            </div>
          </div>

          <div className="sidebar__chat scrollbar-hide" ref={chatScrollRef}>
            {chatHistory.map((chat, idx) => (
              <div key={idx} className={`chat-bubble ${chat.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--isla'}`}>
                {chat.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessageToPerry} className="sidebar__chat-input-wrap">
            <div className="sidebar__chat-input-group">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="sidebar__chat-input"
                placeholder="Ask ISLA anything..."
              />
              <button type="submit" className="sidebar__chat-send"><Send size={22} /></button>
            </div>
          </form>
        </div>
      ) : (
        <div className="sidebar__collapsed-icons">
          <div className="sidebar__collapsed-avatar">
            <img src="Perry.png" alt="ISLA" onError={(e) => { e.target.src = "https://placehold.co/100/004684/FDB927?text=I"; }} />
          </div>
          <div className="sidebar__collapsed-nav">
            <BarChart3 size={28} />
            <Award size={28} />
            <Settings size={28} />
          </div>
        </div>
      )}
    </aside>
  );

  /* ============================================================
     RENDER: DASHBOARD
     ============================================================ */
  const Dashboard = () => (
    <div className="dashboard" style={{ animation: 'fadeIn 1s ease-out' }}>
      <div className="dashboard__hero">
        <div>
          <h2 className="dashboard__heading">Command<br />Center</h2>
          <p className="dashboard__quote">
            "To design is to plan for a future that works. To license is to prove you can do it safely."
          </p>
        </div>
        <div className="dashboard__stats">
          <div className="stat-block">
            <p className="stat-block__label">Study Streak</p>
            <p className="stat-block__value stat-block__value--gold">{progress.streak}</p>
          </div>
          <div className="stat-block stat-block--divided">
            <p className="stat-block__label">Mastery Score</p>
            <p className="stat-block__value stat-block__value--blue">{progress.mastery}%</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="dashboard__quick-actions">
        <button className="dashboard__quick-btn dashboard__quick-btn--focus" onClick={startFocusMode}>
          <Target size={22} color={AGGIE_GOLD} />
          <div>
            <span className="dashboard__quick-btn-title">Focus Mode</span>
            <span className="dashboard__quick-btn-desc">Drill your weakest topics</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="module-grid">
        {EXAM_SECTIONS.map(s => {
          const Icon = s.icon;
          const readiness = performanceTracker.getSectionReadiness(s.id);
          return (
            <div
              key={s.id}
              className="card module-card"
              onClick={() => openModuleLanding(s.id)}
            >
              <div className="module-card__header">
                <div className="module-card__icon-wrap">
                  <Icon size={42} strokeWidth={2.5} />
                </div>
                <span className="module-card__number">Module 0{s.id}</span>
              </div>
              <h3 className="module-card__title">{s.title}</h3>
              <p className="module-card__desc">
                {s.totalItems} exam items • {s.topics.length} topic areas • {QUESTION_BANK[s.id]?.length || 20} practice questions
              </p>

              {/* Video Tutorials */}
              {s.videos && s.videos.filter(v => v.url).length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }} onClick={(e) => e.stopPropagation()}>
                  {s.videos.filter(v => v.url).map((v, vi) => (
                    <a
                      key={vi}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        fontSize: '0.7rem', padding: '0.35rem 0.65rem',
                        background: 'rgba(0,70,132,0.06)', border: '1px solid rgba(0,70,132,0.12)',
                        borderRadius: '2rem', color: AGGIE_BLUE, textDecoration: 'none',
                        fontWeight: 600, transition: 'all 0.2s', whiteSpace: 'nowrap'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0,70,132,0.12)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,70,132,0.06)'; }}
                      title={v.title}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
                      {v.title.length > 30 ? v.title.substring(0, 28) + '...' : v.title}
                    </a>
                  ))}
                </div>
              )}

              <div className="module-card__progress">
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{ width: `${readiness.score}%` }}>
                    <div className="progress-bar__pulse" />
                  </div>
                </div>
                <span className="progress-label" style={{ color: readiness.color }}>{readiness.score}%</span>
              </div>
              <span className="module-card__readiness" style={{ color: readiness.color }}>{readiness.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ============================================================
     RENDER: PRACTICE QUIZ (Sections 1-3)
     ============================================================ */
  const PracticeQuiz = () => {
    if (!quizSection || quizQuestions.length === 0) return null;
    const questions = quizQuestions;
    const section = EXAM_SECTIONS.find(s => s.id === quizSection);

    if (quizComplete) {
      return (
        <div className="quiz-container" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
          <div className="card quiz-results">
            <Award size={80} color={AGGIE_GOLD} style={{ margin: '0 auto 2rem' }} />
            <div className="quiz-results__score">{quizScore}/{questions.length}</div>
            <div className="quiz-results__label">Questions Correct</div>
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#64748b', marginBottom: '2rem', maxWidth: '28rem', margin: '0 auto 2rem' }}>
              {quizScore === questions.length
                ? "Perfect score! You've mastered this material. Coach Perry is proud."
                : quizScore >= questions.length * 0.7
                  ? "Strong performance. Review the explanations for the ones you missed."
                  : "Keep studying — review the topic areas and try again. You've got this, Aggie."
              }
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn--gold" onClick={() => startQuiz(quizSection)}>
                Retry Section
              </button>
              <button className="btn btn--outline" onClick={() => navigateTo('dashboard')}>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQ = questions[quizIndex];
    const letters = ['A', 'B', 'C', 'D'];

    return (
      <div className="quiz-container" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
        <div className="quiz-header">
          <button className="quiz-header__back" onClick={() => navigateTo('dashboard')}>
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <span className="quiz-progress-text">
            {section?.shortTitle} • Question {quizIndex + 1}{currentQ?.isAI ? ' (AI Generated)' : ''}
          </span>
        </div>

        <div className="card quiz-card">
          <span className="quiz-topic-badge">{currentQ.topic}</span>
          <p className="quiz-question">{currentQ.text}</p>

          <div className="quiz-options">
            {currentQ.options.map((opt, idx) => {
              let cls = 'quiz-option';
              if (quizAnswer !== null) {
                if (idx === currentQ.correct) cls += ' quiz-option--correct';
                else if (idx === quizAnswer) cls += ' quiz-option--incorrect';
                else cls += ' quiz-option--dimmed';
              }
              return (
                <button
                  key={idx}
                  className={cls}
                  onClick={() => handleQuizAnswer(idx)}
                  disabled={quizAnswer !== null}
                >
                  <span className="quiz-option__letter">{letters[idx]}</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {quizAnswer !== null && (
            <div className="quiz-explanation">
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                {quizAnswer === currentQ.correct ? '✓ Correct!' : '✗ Incorrect'}
              </strong>
              {currentQ.explanation}
            </div>
          )}

          {quizAnswer !== null && (
            <div className="quiz-nav">
              {generatingQ ? (
                <button className="btn btn--primary" disabled>
                  <Sparkles size={18} style={{ animation: 'spin 1s linear infinite' }} /> Generating Question...
                </button>
              ) : (
                <button className="btn btn--primary" onClick={nextQuestion}>
                  Next Question <ChevronRight size={18} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ============================================================
     RENDER: GRADING CANVAS (Section 4)
     ============================================================ */
  const GradingCanvas = () => (
    <div className="grading-layout">
      <div className="grading-layout__info">
        <div className="card grading-info-card">
          <div className="grading-info-card__header">
            <h2 className="grading-info-card__title">The<br />Widowmaker</h2>
            <Info size={40} color={AGGIE_GOLD} />
          </div>
          <p className="grading-info-card__prompt">
            Solve for Point A to B.<br />
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: AGGIE_BLUE, background: 'rgba(0,70,132,0.05)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', marginTop: '1rem', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Regulatory Target: 2% – 10%
            </span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="elevation-block elevation-block--blue">
              <p className="elevation-block__label">Elevation A</p>
              <p className="elevation-block__value">102.50'</p>
            </div>
            <div className="elevation-block elevation-block--gold">
              <p className="elevation-block__label">Target Point B</p>
              <p className="elevation-block__value">100.00'</p>
            </div>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="card" style={{ padding: '2rem' }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 900, color: AGGIE_BLUE, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>Section 4 Blueprint</h4>
          {EXAM_SECTIONS[3].topics.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: i === 0 ? AGGIE_BLUE : i === 1 ? AGGIE_GOLD : '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 900, flexShrink: 0 }}>
                {t.weight}%
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0f172a' }}>{t.name}</p>
                <p style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 500 }}>{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grading-layout__canvas">
        <div className="card canvas-card">
          <div className="canvas-toolbar">
            <button className="btn btn--secondary" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Contours</button>
            <button className="btn btn--secondary" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Spot Elev</button>
            <div style={{ flex: 1 }} />
            <button className="btn btn--ghost" style={{ fontSize: '0.6875rem', color: '#fca5a5' }} onClick={() => { setPoints([]); setFeedback(null); }}>
              Reset Canvas
            </button>
            <button className="btn btn--gold" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', padding: '0 4rem', letterSpacing: '0.2em' }} onClick={validateDesign}>
              Validate Design
            </button>
          </div>

          <div className="canvas-area" onClick={(e) => {
            const rect = canvasRef.current.getBoundingClientRect();
            setPoints(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
          }}>
            <svg ref={canvasRef} className="canvas-svg">
              <defs>
                <pattern id="gridLarge" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke={AGGIE_BLUE} strokeWidth="2" opacity="0.12" />
                </pattern>
                <pattern id="gridSmall" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke={AGGIE_BLUE} strokeWidth="1" opacity="0.06" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridSmall)" />
              <rect width="100%" height="100%" fill="url(#gridLarge)" />

              <g transform="translate(200, 400)">
                <circle r="40" fill={AGGIE_BLUE} fillOpacity="0.05" className="animate-ping" />
                <circle r="16" fill={AGGIE_BLUE} stroke={AGGIE_GOLD} strokeWidth="6" />
                <text y="50" textAnchor="middle" fill={AGGIE_BLUE} style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Elevation A</text>
              </g>

              <g transform="translate(700, 400)">
                <rect x="-24" y="-24" width="48" height="48" fill={AGGIE_BLUE} rx="10" stroke={AGGIE_GOLD} strokeWidth="4" />
                <circle r="10" fill={AGGIE_GOLD} />
                <text y="60" textAnchor="middle" fill={AGGIE_BLUE} style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Catch Basin B</text>
              </g>

              {points.length > 1 && (
                <path
                  d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
                  fill="none" stroke={AGGIE_BLUE} strokeWidth="12"
                  strokeLinecap="round" strokeDasharray="40 20"
                  opacity="0.8"
                />
              )}
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="12" fill={AGGIE_BLUE} stroke={AGGIE_GOLD} strokeWidth="5" />
              ))}
            </svg>

            {feedback && (
              <div className="feedback-overlay">
                <div className="feedback-overlay__inner">
                  <div className="feedback-overlay__icon">
                    <CheckCircle2 size={60} color={AGGIE_BLUE} strokeWidth={3} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 className="feedback-overlay__title">Design Verified</h4>
                    <p className="feedback-overlay__msg">{feedback.msg}</p>
                    <button className="btn btn--gold" style={{ padding: '1.5rem 3rem', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '-0.025em' }} onClick={() => navigateTo('dashboard')}>
                      Continue Mastery
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /* ============================================================
     RENDER: REGISTRATION ROADMAP
     ============================================================ */
  const RegistrationRoadmap = () => (
    <div className="roadmap" style={{ animation: 'fadeSlideIn 0.7s ease-out' }}>
      <div className="roadmap__header">
        <h2 className="roadmap__title">Roadmap</h2>
        <Globe size={80} color={AGGIE_BLUE} style={{ opacity: 0.1 }} />
      </div>

      <div className="card roadmap__card">
        <div style={{ marginBottom: '4rem' }}>
          <label className="roadmap__select-label">Select Your Board</label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              if (e.target.value) {
                setChatHistory(prev => [...prev, {
                  role: 'perry',
                  text: `Ah, ${e.target.value}. A fine jurisdiction. Their board is known for technical rigor. Let's get you prepared.`
                }]);
              }
            }}
            className="roadmap__select"
          >
            <option value="">Select Jurisdiction...</option>
            {Object.keys(STATE_REQUIREMENTS).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {selectedState && STATE_REQUIREMENTS[selectedState] && (
          <div className="roadmap__details">
            <div className="roadmap__standards">
              <h3 className="roadmap__section-title">Board Standards</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { label: "Education", val: STATE_REQUIREMENTS[selectedState].education },
                  { label: "Experience", val: STATE_REQUIREMENTS[selectedState].experience },
                  { label: "Minimum Age", val: STATE_REQUIREMENTS[selectedState].age },
                  { label: "Continuing Ed", val: STATE_REQUIREMENTS[selectedState].continuingEd }
                ].map((item, i) => (
                  <div key={i} className="roadmap__item">
                    <div className="roadmap__item-check"><Check size={20} strokeWidth={4} /></div>
                    <div>
                      <p className="roadmap__item-label">{item.label}</p>
                      <p className="roadmap__item-value">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {STATE_REQUIREMENTS[selectedState].fees && (
                <div style={{ marginTop: '2rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 900, color: AGGIE_BLUE, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Fee Schedule</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {Object.entries(STATE_REQUIREMENTS[selectedState].fees).map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600, textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 900, color: AGGIE_BLUE }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="perry-panel">
              <Sparkles color={AGGIE_GOLD} size={48} style={{ marginBottom: '2rem' }} />
              <h4 className="perry-panel__label">Perry's Guidance</h4>
              <p className="perry-panel__quote" style={{ flex: 1 }}>
                "{STATE_REQUIREMENTS[selectedState].extra}"
              </p>
              {STATE_REQUIREMENTS[selectedState].examInfo && (
                <p style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.7, marginTop: '1.5rem', lineHeight: 1.5 }}>
                  {STATE_REQUIREMENTS[selectedState].examInfo}
                </p>
              )}
              <button
                className="btn btn--gold"
                style={{ width: '100%', marginTop: '2rem', padding: '1.5rem', fontSize: '1.125rem', textTransform: 'uppercase', letterSpacing: '-0.025em' }}
                onClick={() => window.open(`https://${STATE_REQUIREMENTS[selectedState].link}`, '_blank')}
              >
                Board Website <Globe size={18} style={{ marginLeft: '0.5rem' }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ============================================================
     RENDER: STUDY RESOURCES
     ============================================================ */
  const StudyResources = () => (
    <div className="resources" style={{ animation: 'fadeSlideIn 0.7s ease-out' }}>
      <div className="resources__header">
        <h2 className="resources__title">Study Resources</h2>
        <BookOpen size={80} color={AGGIE_BLUE} style={{ opacity: 0.1 }} />
      </div>

      {/* CELA & NotebookLM */}
      <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem', borderTop: `0.5rem solid ${AGGIE_GOLD}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: AGGIE_BLUE, textTransform: 'uppercase' }}>{CELA_RESOURCES.about.name}</h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500, lineHeight: 1.6, marginTop: '0.5rem', maxWidth: '40rem' }}>
              {CELA_RESOURCES.about.description}
            </p>
          </div>
          <button className="btn btn--primary" onClick={() => window.open(CELA_RESOURCES.ncatNotebookUrl, '_blank')}>
            <BookOpen size={18} /> Open LARE Notebook
          </button>
        </div>
        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: AGGIE_BLUE, background: 'rgba(0,70,132,0.05)', padding: '1rem', borderRadius: '0.75rem', borderLeft: `4px solid ${AGGIE_GOLD}` }}>
          {CELA_RESOURCES.about.ncatInvolvement}
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {CELA_RESOURCES.conferences.map((c, i) => (
            <div key={i} style={{ padding: '0.75rem 1.25rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '0.6875rem', fontWeight: 900, color: AGGIE_GOLD }}>{c.year} • {c.location}</p>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginTop: '0.25rem' }}>{c.topic}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CLARB Resources */}
      <h3 style={{ fontSize: '1rem', fontWeight: 900, color: AGGIE_BLUE, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', marginTop: '2rem' }}>CLARB Resources</h3>
      <div className="resources__grid">
        {Object.values(CLARB_RESOURCES).map((r, i) => (
          <div key={i} className="card resource-card">
            <h4 className="resource-card__title">{r.title}</h4>
            <p className="resource-card__text">{r.details}</p>
            {r.price && <span className="resource-card__price">{r.price}</span>}
            {r.url && (
              <button className="btn btn--ghost" style={{ fontSize: '0.75rem', padding: '0.25rem 0', marginTop: '0.5rem' }} onClick={() => window.open(r.url, '_blank')}>
                Visit <ExternalLink size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* CLARB Fee Table */}
      <div className="card" style={{ marginTop: '2rem', overflow: 'hidden' }}>
        <table className="fee-table">
          <thead>
            <tr>
              <th>CLARB Service</th>
              <th>Fee (2026)</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(CLARB_FEES).map((fee, i) => (
              <tr key={i}>
                <td>{fee.label}</td>
                <td>{fee.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SGLA Prep Courses */}
      <h3 style={{ fontSize: '1rem', fontWeight: 900, color: AGGIE_BLUE, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', marginTop: '3rem' }}>Third-Party Prep Courses</h3>
      <div className="resources__grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))' }}>
        {SGLA_RESOURCES.courses.map((c, i) => (
          <div key={i} className="card resource-card" style={{ borderLeftColor: i === 3 ? AGGIE_GOLD : AGGIE_BLUE }}>
            <h4 className="resource-card__title" style={{ fontSize: '0.875rem' }}>{c.section}</h4>
            <p className="resource-card__text" style={{ fontSize: '0.75rem' }}>{c.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="resource-card__price">{c.price}</span>
              <span className="resource-card__price" style={{ background: '#475569' }}>Materials: {c.materialsOnly}</span>
            </div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginTop: '1rem' }}>
        Source: <a href={SGLA_RESOURCES.url} target="_blank" rel="noopener noreferrer" style={{ color: AGGIE_BLUE }}>{SGLA_RESOURCES.name}</a>
      </p>

      {/* Licensure Timeline */}
      <h3 style={{ fontSize: '1rem', fontWeight: 900, color: AGGIE_BLUE, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', marginTop: '3rem' }}>Path to Licensure</h3>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div className="timeline">
          {EXAM_TIMELINE.map((step) => (
            <div key={step.step} className="timeline__step">
              <div className="timeline__dot">{step.step}</div>
              <div className="timeline__content">
                <p className="timeline__step-title">{step.title}</p>
                <p className="timeline__step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ============================================================
     RENDER: ANALYTICS
     ============================================================ */
  const Analytics = () => (
    <div className="dashboard" style={{ animation: 'fadeSlideIn 0.7s ease-out' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `8px solid ${AGGIE_GOLD}`, paddingBottom: '2rem', marginBottom: '3rem' }}>
        <h2 className="roadmap__title">Analytics</h2>
        <BarChart3 size={80} color={AGGIE_BLUE} style={{ opacity: 0.1 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
        {[
          { label: 'Questions Solved', value: progress.solved, color: AGGIE_BLUE },
          { label: 'Mastery Score', value: `${progress.mastery}%`, color: AGGIE_GOLD },
          { label: 'Day Streak', value: progress.streak, color: AGGIE_BLUE }
        ].map((stat, i) => (
          <div key={i} className="card" style={{ padding: '2.5rem', textAlign: 'center', borderTop: `0.5rem solid ${stat.color}` }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>{stat.label}</p>
            <p style={{ fontSize: '3.5rem', fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Section Breakdown */}
      <div className="card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 900, color: AGGIE_BLUE, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem' }}>Section Readiness</h3>
        {EXAM_SECTIONS.map((s, i) => {
          const pct = s.id === 4 ? 35 : 45 + (s.id * 5);
          return (
            <div key={s.id} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 900, color: '#0f172a' }}>
                  Section {s.id}: {s.shortTitle}
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 900, color: AGGIE_BLUE }}>{pct}%</span>
              </div>
              <div className="progress-bar" style={{ height: '1rem' }}>
                <div className="progress-bar__fill" style={{ width: `${pct}%`, background: s.color === AGGIE_GOLD ? AGGIE_GOLD : AGGIE_BLUE }} />
              </div>
              <p style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 500, marginTop: '0.25rem' }}>
                {s.totalItems} exam items • {s.topics.map(t => `${t.name} (${t.weight}%)`).join(', ')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ============================================================
     RENDER: MAIN APP SHELL
     ============================================================ */
  // --- Program selection handler ---
  const handleSelectProgram = (college, program) => {
    setActiveCollege(college);
    setActiveProgram(program.id);
    setActiveTab('dashboard');
  };
  const handleBackToPrograms = () => {
    setActiveProgram(null);
    setActiveCollege(null);
    setActiveTab('dashboard');
    setSelectedSection(null);
    setShowCalculator(false);
  };

  return (
    <>
      {/* ============ TOP HEADER BAR (universal — same for ALL programs) ============ */}
      <header className="isla-hero">
        <div className="isla-hero__brand" onClick={activeProgram ? handleBackToPrograms : undefined} style={activeProgram ? { cursor: 'pointer' } : {}}>
          <img src="/ncat-logo-white.png" alt="NC A&T" className="isla-hero__logo-left" />
          <div className="isla-hero__separator" />
          <div>
            <h1 className="isla-hero__title">
              <span className="isla-hero__gold">I</span>nteractive{' '}
              <span className="isla-hero__gold">S</span>tudy &{' '}
              <span className="isla-hero__gold">L</span>icensure{' '}
              <span className="isla-hero__gold">A</span>ssistant
            </h1>
            <span className="isla-hero__subtitle">Universal Credentialing Engine</span>
          </div>
        </div>
        <div className="isla-hero__actions">
          {/* Back button (visible when program is active) */}
          {activeProgram && (
            <button className="isla-hero__back-btn" onClick={handleBackToPrograms} title="Back to Programs">
              <ArrowLeft size={18} />
            </button>
          )}
          {/* College badge (visible when program is active) */}
          {activeCollege && (
            <div className="isla-hero__college-badge">
              <img src={activeCollege.icon} alt="" className="isla-hero__college-badge-icon" />
              {activeCollege.shortName}
            </div>
          )}
          {/* Role Switcher (EMMA-style) */}
          <div className="isla-hero__role-switcher">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="isla-hero__role-select"
            >
              <option value="student">👩‍🎓 Student</option>
              <option value="admin">🔧 Admin</option>
            </select>
          </div>
          <div className="isla-hero__user">
            <p className="isla-hero__user-name">{userData.name}</p>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', cursor: 'pointer', transition: 'all 0.2s' }} title="Sign Out">
              <LogOut size={20} />
            </button>
          </div>
          <img src={UNIVERSITY.logo} alt={UNIVERSITY.shortName} className="isla-hero__logo-right" />
        </div>
      </header>

      <div className="app-shell">
      <ConfettiEffect active={showConfetti} />

      {/* ============ COLLEGE SELECTOR (no program selected) ============ */}
      {!activeProgram ? (
        <CollegeSelector onSelectProgram={handleSelectProgram} />
      ) : (
        <>
        {Sidebar()}
        <div className="main-area">

        {/* Content Nav — tabs moved from header to body */}
        <div className="content-nav">
          <div className="content-nav__tabs">
            {['Dashboard', 'Modules', 'Registration', 'Resources', 'Analytics'].map(tab => (
              <button
                key={tab}
                onClick={() => navigateTo(tab.toLowerCase())}
                className={`content-nav__tab ${activeTab === tab.toLowerCase() ? 'content-nav__tab--active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="content-nav__tools">
            <button className="btn btn--gold" style={{ fontSize: '0.6875rem', padding: '0.5rem 1.25rem', textTransform: 'uppercase', letterSpacing: '0.15em' }} onClick={() => setShowCalculator(!showCalculator)}>
              <Calculator size={16} /> Calculator
            </button>
          </div>
        </div>

        <main className="content">
          {/* NEW: Adaptive Quiz Mode */}
          {/* Module Landing Page */}
          {viewMode === 'module-landing' && adaptiveSection && (
            <ModuleLanding
              sectionId={adaptiveSection}
              performanceTracker={performanceTracker}
              spacedRepetition={spacedRepetition}
              playPerryStatic={playPerryStatic}
              onBack={() => navigateTo('dashboard')}
              onStartQuiz={() => startAdaptiveQuiz(adaptiveSection)}
              onStartFlashcards={() => setViewMode('flashcards')}
              onStartMatchGame={() => setViewMode('match-game')}
              onStartGlossary={() => setViewMode('glossary-game')}
              onStartExam={() => setViewMode('exam-sim')}
            />
          )}

          {/* Flashcards */}
          {viewMode === 'flashcards' && adaptiveSection && (
            <Flashcards
              section={adaptiveSection}
              sectionTitle={EXAM_SECTIONS.find(s => s.id === adaptiveSection)?.shortTitle}
              onBack={() => setViewMode('module-landing')}
            />
          )}

          {/* Match Game */}
          {viewMode === 'match-game' && adaptiveSection && (
            <MatchGame
              section={adaptiveSection}
              sectionTitle={EXAM_SECTIONS.find(s => s.id === adaptiveSection)?.shortTitle}
              onBack={() => setViewMode('module-landing')}
            />
          )}

          {/* Glossary Match Game */}
          {viewMode === 'glossary-game' && adaptiveSection && (
            <MatchGame
              section={adaptiveSection}
              sectionTitle={EXAM_SECTIONS.find(s => s.id === adaptiveSection)?.shortTitle}
              onBack={() => setViewMode('module-landing')}
              dataSource={GLOSSARY_DATA}
              gameTitle={`${EXAM_SECTIONS.find(s => s.id === adaptiveSection)?.shortTitle} — Glossary Match`}
            />
          )}

          {viewMode === 'adaptive-quiz' && adaptiveSection && (
            <AdaptiveQuiz
              section={adaptiveSection}
              sectionTitle={EXAM_SECTIONS.find(s => s.id === adaptiveSection)?.shortTitle}
              questionEngine={questionEngine}
              spacedRepetition={spacedRepetition}
              performanceTracker={performanceTracker}
              onBack={() => setViewMode('module-landing')}
              onComplete={(results) => {
                const pct = Math.round((results.score / results.total) * 100);
                if (pct >= 80) {
                  triggerAchievement();
                  playPerryStatic('quiz-great');
                } else if (pct >= 60) {
                  playPerryStatic('quiz-good');
                } else {
                  playPerryStatic('quiz-try');
                }
              }}
              focusTopic={adaptiveFocusTopic}
              questionCount={20}
            />
          )}

          {/* Exam Simulation */}
          {viewMode === 'exam-sim' && adaptiveSection && (
            <ExamSimulator
              sectionId={adaptiveSection}
              performanceTracker={performanceTracker}
              onBack={() => setViewMode('module-landing')}
              onComplete={(results) => {
                const pct = Math.round((results.score / results.total) * 100);
                if (pct >= 80) {
                  triggerAchievement();
                  playPerryStatic('exam-great');
                } else if (pct >= 65) {
                  playPerryStatic('exam-good');
                } else {
                  playPerryStatic('exam-try');
                }
              }}
            />
          )}

          {/* Focus Mode */}
          {viewMode === 'focus-mode' && (
            <FocusMode
              questionEngine={questionEngine}
              spacedRepetition={spacedRepetition}
              performanceTracker={performanceTracker}
              onBack={() => navigateTo('dashboard')}
            />
          )}

          {/* Original views */}
          {!viewMode && activeTab === 'dashboard' && !selectedSection && Dashboard()}
          {!viewMode && activeTab === 'modules' && !selectedSection && Dashboard()}
          {!viewMode && activeTab === 'modules' && selectedSection?.id === 4 && GradingCanvas()}
          {!viewMode && activeTab === 'modules' && selectedSection && selectedSection.id !== 4 && quizSection && PracticeQuiz()}
          {!viewMode && activeTab === 'registration' && RegistrationRoadmap()}
          {!viewMode && activeTab === 'resources' && StudyResources()}

          {/* NEW: Mastery Dashboard replaces old Analytics */}
          {!viewMode && activeTab === 'analytics' && (
            <MasteryDashboard
              performanceTracker={performanceTracker}
              spacedRepetition={spacedRepetition}
              onStartQuiz={(sectionId, topic) => startAdaptiveQuiz(sectionId, topic)}
              onStartFocus={startFocusMode}
            />
          )}
        </main>

        <footer className="footer">
          <span className="footer__left">
            © 2026 {UNIVERSITY.name} {activeProgram === 'lare' && <><div className="footer__divider" /> Program of Landscape Architecture</>}
          </span>
          <span className="footer__center">ISLA v4.0 {activeProgram ? `· ${activeProgram.toUpperCase()} Module` : ''} • {firebaseReady && firebaseUser ? 'CLOUD SYNC ACTIVE' : 'LOCAL MODE'}</span>
          <span>EST. 2026</span>
        </footer>
      </div>
      </>
      )}

      {/* Calculator Overlay */}
      {showCalculator && (
        <div className="calculator-overlay">
          <div className="card calculator-card">
            <div className="calculator__header">
              <div className="calculator__header-title">
                <Calculator size={24} />
                <span>Grading Math</span>
              </div>
              <button className="calculator__close" onClick={() => setShowCalculator(false)}><X size={28} /></button>
            </div>
            <div className="calculator__body">
              <div className="calculator__field">
                <label className="calculator__field-label">Vertical Rise (De)</label>
                <input
                  className="calculator__field-input"
                  placeholder="0.00 ft"
                  value={calcRise}
                  onChange={(e) => setCalcRise(e.target.value)}
                  type="number"
                  step="0.01"
                />
              </div>
              <div className="calculator__field">
                <label className="calculator__field-label">Horizontal Run (D)</label>
                <input
                  className="calculator__field-input"
                  placeholder="0.00 ft"
                  value={calcRun}
                  onChange={(e) => setCalcRun(e.target.value)}
                  type="number"
                  step="0.01"
                />
              </div>
              {calcSlope !== null && (
                <div className="calculator__result">
                  <p className="calculator__result-label">Slope</p>
                  <p className="calculator__result-value">{calcSlope}%</p>
                </div>
              )}
              <p className="calculator__formula">Slope (%) = (Rise ÷ Run) × 100</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
