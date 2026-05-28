/**
 * ExamSimulator — Realistic LARE Exam Simulation
 * 
 * Models the actual CLARB LARE test experience:
 * - 3-hour (180 min) countdown timer per section
 * - No feedback during the exam (just like the real test)
 * - Question navigation grid (Prometric-style)
 * - Flag-for-review system
 * - Auto-submit when timer expires
 * - Post-exam debrief with score, time analysis, and topic breakdown
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft, ChevronRight, ChevronLeft, Clock, Flag, CheckCircle2,
  XCircle, Award, AlertTriangle, BarChart3, Play, Pause, RotateCcw,
  Grid3X3, Eye, TrendingUp, Target, Zap, BookOpen, Timer, Loader
} from 'lucide-react';
import { AGGIE_BLUE, AGGIE_GOLD } from '../data/examSections.js';
import questionEngine from '../engine/QuestionEngine.js';

/** Format seconds into HH:MM:SS */
const formatTime = (totalSeconds) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/** Get timer urgency color */
const getTimerColor = (secondsLeft, totalSeconds) => {
  const pct = secondsLeft / totalSeconds;
  if (pct > 0.66) return '#22c55e';       // Green: > 2 hours
  if (pct > 0.33) return AGGIE_GOLD;      // Yellow: > 1 hour
  if (pct > 0.167) return '#f97316';      // Orange: > 30 min
  if (pct > 0.056) return '#ef4444';      // Red: > 10 min
  return '#dc2626';                        // Flashing red: < 10 min
};

export default function ExamSimulator({
  sectionId,
  onBack,
  onComplete,
  performanceTracker,
  examSections = [],
  questionBank = {}
}) {
  const section = examSections.find(s => s.id === sectionId);
  const examDuration = (section?.examDuration || 180) * 60; // seconds

  // === EXAM STATES ===
  const [phase, setPhase] = useState('intro');  // 'intro' | 'exam' | 'review' | 'results'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});       // { qIndex: selectedOptionIdx }
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(examDuration);
  const [isPaused, setIsPaused] = useState(false);
  const [showNavGrid, setShowNavGrid] = useState(false);
  const [examStartTime, setExamStartTime] = useState(null);
  const timerRef = useRef(null);
  const letters = ['A', 'B', 'C', 'D'];

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState('');

  // Load questions — fill to real exam count using QuestionEngine
  useEffect(() => {
    const targetCount = section?.totalItems || 80;
    setIsLoading(true);
    setLoadProgress(`Preparing ${targetCount} exam items...`);

    // Get static questions
    const staticQs = [...(questionBank[sectionId] || [])];
    
    // Generate additional questions from QuestionEngine to fill the gap
    const needed = Math.max(0, targetCount - staticQs.length);
    const engineQs = needed > 0
      ? questionEngine.generateQuestions(sectionId, needed, { excludeIds: staticQs.map(q => q.id) })
      : [];

    // Combine and shuffle all questions
    const allQs = [...staticQs, ...engineQs];
    for (let i = allQs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQs[i], allQs[j]] = [allQs[j], allQs[i]];
    }

    // Take exactly the target count
    const finalQs = allQs.slice(0, targetCount);
    setQuestions(finalQs);
    setLoadProgress(`${finalQs.length} items ready`);
    setIsLoading(false);
  }, [sectionId]);

  // Timer countdown
  useEffect(() => {
    if (phase !== 'exam' || isPaused) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setPhase('results'); // Auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, isPaused]);

  // === HANDLERS ===
  const startExam = () => {
    setPhase('exam');
    setExamStartTime(Date.now());
    setTimeLeft(examDuration);
  };

  const selectAnswer = (qIdx, optIdx) => {
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const toggleFlag = (qIdx) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qIdx)) next.delete(qIdx);
      else next.add(qIdx);
      return next;
    });
  };

  const goToQuestion = (idx) => {
    setCurrentIndex(idx);
    setShowNavGrid(false);
  };

  const submitExam = () => {
    clearInterval(timerRef.current);
    setPhase('results');
  };

  const togglePause = () => {
    setIsPaused(p => !p);
  };

  // Calculate score
  const calculateResults = useCallback(() => {
    let score = 0;
    let byTopic = {};
    questions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      const correct = userAnswer === q.correct;
      if (correct) score++;
      if (!byTopic[q.topic]) byTopic[q.topic] = { total: 0, correct: 0 };
      byTopic[q.topic].total++;
      if (correct) byTopic[q.topic].correct++;

      // Record in performance tracker
      if (performanceTracker && userAnswer !== undefined) {
        performanceTracker.recordAnswer(sectionId, q.topic, correct, q.id, q.difficulty || 2);
      }
    });
    return { score, total: questions.length, byTopic };
  }, [questions, answers, sectionId, performanceTracker]);

  if (!section) return null;

  const Icon = section.icon;
  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flagged.size;
  const timerColor = getTimerColor(timeLeft, examDuration);
  const isFlashing = timeLeft <= examDuration * 0.056; // < ~10 min

  /* ============================================================
     INTRO SCREEN — Pre-exam briefing
     ============================================================ */
  if (phase === 'intro') {
    return (
      <div className="es-intro" style={{ animation: 'fadeSlideIn 0.6s ease-out' }}>
        <button className="es-intro__back" onClick={onBack}>
          <ArrowLeft size={18} /> Back to Module
        </button>

        <div className="es-intro__card card">
          <div className="es-intro__header">
            <div className="es-intro__icon-wrap">
              <Icon size={48} strokeWidth={2.5} />
            </div>
            <div>
              <span className="es-intro__module-label">EXAM SIMULATION</span>
              <h2 className="es-intro__title">Section {section.id}: {section.title}</h2>
            </div>
          </div>

          <div className="es-intro__details">
            <div className="es-intro__detail">
              <Clock size={20} color={AGGIE_BLUE} />
              <div>
                <strong>Time Limit</strong>
                <p>{section.examDuration} minutes (3 hours)</p>
              </div>
            </div>
            <div className="es-intro__detail">
              <BookOpen size={20} color={AGGIE_BLUE} />
              <div>
                <strong>Questions</strong>
                <p>{section.totalItems} items — matches real CLARB exam</p>
              </div>
            </div>
            <div className="es-intro__detail">
              <Grid3X3 size={20} color={AGGIE_BLUE} />
              <div>
                <strong>Format</strong>
                <p>{section.examFormat}</p>
              </div>
            </div>
            <div className="es-intro__detail">
              <Flag size={20} color={AGGIE_BLUE} />
              <div>
                <strong>Navigation</strong>
                <p>Flag questions for review, jump to any question, submit when ready</p>
              </div>
            </div>
          </div>

          <div className="es-intro__rules">
            <h4>Exam Simulation Rules</h4>
            <ul>
              <li>No explanations or feedback until you submit</li>
              <li>Timer counts down from 3:00:00</li>
              <li>Exam auto-submits when time expires</li>
              <li>You can flag questions and return to them</li>
              <li>You can pause the timer (not available on real exam)</li>
              <li>Unanswered questions are scored as incorrect</li>
            </ul>
          </div>

          <div className="es-intro__topics">
            <h4>Topics Covered</h4>
            <div className="es-intro__topic-pills">
              {section.topics.map((t, i) => (
                <span key={i} className="es-intro__topic-pill">
                  {t.name} — {t.weight}%
                </span>
              ))}
            </div>
          </div>

          <button className="btn btn--gold es-intro__start" onClick={startExam} disabled={isLoading}>
            {isLoading ? (
              <><Loader size={22} className="spin" /> {loadProgress}</>
            ) : (
              <><Play size={22} /> Begin Exam Simulation ({questions.length} items)</>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* ============================================================
     EXAM SCREEN — Active test taking
     ============================================================ */
  if (phase === 'exam' && currentQ) {
    return (
      <div className="es-exam" style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
        {/* Top Bar */}
        <div className="es-exam__topbar">
          <div className="es-exam__topbar-left">
            <span className="es-exam__section-label">
              Section {section.id}: {section.shortTitle}
            </span>
            <span className="es-exam__q-counter">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          <div className={`es-exam__timer ${isFlashing ? 'es-exam__timer--flashing' : ''}`}
               style={{ color: timerColor, borderColor: timerColor }}>
            <Timer size={18} />
            <span className="es-exam__timer-display">{formatTime(timeLeft)}</span>
            <button
              className="es-exam__pause-btn"
              onClick={togglePause}
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          </div>

          <div className="es-exam__topbar-right">
            <button
              className={`es-exam__flag-btn ${flagged.has(currentIndex) ? 'es-exam__flag-btn--active' : ''}`}
              onClick={() => toggleFlag(currentIndex)}
              title="Flag for review"
            >
              <Flag size={16} fill={flagged.has(currentIndex) ? AGGIE_GOLD : 'none'} />
              {flagged.has(currentIndex) ? 'Flagged' : 'Flag'}
            </button>
            <button
              className="es-exam__grid-btn"
              onClick={() => setShowNavGrid(!showNavGrid)}
              title="Question navigator"
            >
              <Grid3X3 size={16} />
              Navigator
            </button>
          </div>
        </div>

        {/* Pause Overlay */}
        {isPaused && (
          <div className="es-exam__pause-overlay">
            <div className="es-exam__pause-card">
              <Pause size={48} color={AGGIE_BLUE} />
              <h3>Exam Paused</h3>
              <p>Timer is stopped. Click Resume to continue.</p>
              <button className="btn btn--gold" onClick={togglePause}>
                <Play size={18} /> Resume Exam
              </button>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="es-exam__progress">
          <div className="es-exam__progress-fill"
               style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
        </div>
        <div className="es-exam__progress-stats">
          <span>{answeredCount} answered</span>
          <span>{questions.length - answeredCount} remaining</span>
          {flaggedCount > 0 && <span style={{ color: AGGIE_GOLD }}>{flaggedCount} flagged</span>}
        </div>

        {/* Navigation Grid Overlay */}
        {showNavGrid && (
          <div className="es-exam__nav-overlay" onClick={() => setShowNavGrid(false)}>
            <div className="es-exam__nav-grid" onClick={e => e.stopPropagation()}>
              <h4 className="es-exam__nav-title">Question Navigator</h4>
              <div className="es-exam__nav-legend">
                <span><span className="es-nav-dot es-nav-dot--current" /> Current</span>
                <span><span className="es-nav-dot es-nav-dot--answered" /> Answered</span>
                <span><span className="es-nav-dot es-nav-dot--flagged" /> Flagged</span>
                <span><span className="es-nav-dot es-nav-dot--unanswered" /> Unanswered</span>
              </div>
              <div className="es-exam__nav-buttons">
                {questions.map((_, idx) => {
                  let cls = 'es-nav-btn';
                  if (idx === currentIndex) cls += ' es-nav-btn--current';
                  else if (answers[idx] !== undefined && flagged.has(idx)) cls += ' es-nav-btn--flagged';
                  else if (answers[idx] !== undefined) cls += ' es-nav-btn--answered';
                  else if (flagged.has(idx)) cls += ' es-nav-btn--flagged';
                  else cls += ' es-nav-btn--unanswered';
                  return (
                    <button key={idx} className={cls} onClick={() => goToQuestion(idx)}>
                      {idx + 1}
                      {flagged.has(idx) && <Flag size={8} className="es-nav-btn__flag-icon" />}
                    </button>
                  );
                })}
              </div>
              <button className="btn btn--outline es-exam__nav-close" onClick={() => setShowNavGrid(false)}>
                Close Navigator
              </button>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="es-exam__card card">
          <div className="es-exam__card-meta">
            <span className="es-exam__topic-badge">{currentQ.topic}</span>
            {flagged.has(currentIndex) && (
              <span className="es-exam__flagged-indicator">
                <Flag size={12} color={AGGIE_GOLD} fill={AGGIE_GOLD} /> Flagged for Review
              </span>
            )}
          </div>

          <p className="es-exam__question">{currentQ.text}</p>

          <div className="es-exam__options">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentIndex] === idx;
              return (
                <button
                  key={idx}
                  className={`es-exam__option ${isSelected ? 'es-exam__option--selected' : ''}`}
                  onClick={() => selectAnswer(currentIndex, idx)}
                >
                  <span className="es-exam__option-letter">{letters[idx]}</span>
                  <span className="es-exam__option-text">{opt}</span>
                  {isSelected && <CheckCircle2 size={18} className="es-exam__option-check" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="es-exam__bottom-nav">
          <button
            className="btn btn--outline es-exam__nav-prev"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={18} /> Previous
          </button>

          <button
            className="btn btn--outline es-exam__submit-btn"
            onClick={() => {
              if (window.confirm(
                `Submit exam?\n\n${answeredCount}/${questions.length} questions answered.\n${flaggedCount} questions flagged.\n\nUnanswered questions will be scored as incorrect.`
              )) {
                submitExam();
              }
            }}
          >
            Submit Exam
          </button>

          <button
            className="btn btn--primary es-exam__nav-next"
            onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
            disabled={currentIndex === questions.length - 1}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  /* ============================================================
     RESULTS SCREEN — Post-exam debrief
     ============================================================ */
  if (phase === 'results') {
    const results = calculateResults();
    const pct = Math.round((results.score / results.total) * 100);
    const elapsed = examStartTime ? Math.round((Date.now() - examStartTime) / 1000) : 0;
    const elapsedMins = Math.floor(elapsed / 60);
    const elapsedSecs = elapsed % 60;
    const timeUsed = examDuration - timeLeft;
    const timeUsedMins = Math.floor(timeUsed / 60);
    const avgSecondsPerQ = results.total > 0 ? Math.round(timeUsed / results.total) : 0;
    const passing = pct >= 65; // Approximate LARE passing threshold

    const topicResults = Object.entries(results.byTopic)
      .map(([topic, data]) => ({
        topic,
        accuracy: Math.round((data.correct / data.total) * 100),
        correct: data.correct,
        total: data.total,
        isWeak: (data.correct / data.total) < 0.65
      }))
      .sort((a, b) => a.accuracy - b.accuracy);

    return (
      <div className="es-results" style={{ animation: 'fadeSlideIn 0.6s ease-out' }}>
        <div className="es-results__header">
          <h2 className="es-results__title">Exam Simulation Complete</h2>
          <p className="es-results__section-name">
            Section {section.id}: {section.title}
          </p>
        </div>

        {/* Score Hero */}
        <div className={`es-results__hero ${passing ? 'es-results__hero--pass' : 'es-results__hero--fail'}`}>
          <div className="es-results__score-ring">
            <svg width="140" height="140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
              <circle cx="70" cy="70" r="60" fill="none"
                stroke={passing ? '#22c55e' : '#ef4444'}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${2 * Math.PI * 60 * (1 - pct / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
                style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
              />
              <text x="70" y="65" textAnchor="middle" style={{ fontSize: '2rem', fontWeight: 900, fill: 'white' }}>
                {pct}%
              </text>
              <text x="70" y="85" textAnchor="middle" style={{ fontSize: '0.75rem', fontWeight: 700, fill: 'rgba(255,255,255,0.7)' }}>
                {results.score}/{results.total}
              </text>
            </svg>
          </div>

          <div className="es-results__verdict">
            {passing ? (
              <>
                <Award size={32} color={AGGIE_GOLD} />
                <h3>Passing Score</h3>
                <p>You demonstrated sufficient competency for this section. Keep up the excellent work, Aggie!</p>
              </>
            ) : (
              <>
                <Target size={32} color="#f97316" />
                <h3>Below Passing Threshold</h3>
                <p>You need approximately 65% to pass. Review weak topics below and retake the simulation.</p>
              </>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="es-results__stats">
          <div className="es-results__stat-card">
            <Clock size={22} color="#64748b" />
            <div>
              <span className="es-results__stat-value">{timeUsedMins}m</span>
              <span className="es-results__stat-label">Time Used</span>
            </div>
          </div>
          <div className="es-results__stat-card">
            <Timer size={22} color="#64748b" />
            <div>
              <span className="es-results__stat-value">{avgSecondsPerQ}s</span>
              <span className="es-results__stat-label">Avg Per Question</span>
            </div>
          </div>
          <div className="es-results__stat-card">
            <CheckCircle2 size={22} color="#22c55e" />
            <div>
              <span className="es-results__stat-value">{answeredCount}</span>
              <span className="es-results__stat-label">Answered</span>
            </div>
          </div>
          <div className="es-results__stat-card">
            <Flag size={22} color={AGGIE_GOLD} />
            <div>
              <span className="es-results__stat-value">{flaggedCount}</span>
              <span className="es-results__stat-label">Flagged</span>
            </div>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="es-results__topics card">
          <h4 className="es-results__topics-title">
            <BarChart3 size={18} /> Topic Performance
          </h4>
          {topicResults.map((t, i) => (
            <div key={i} className={`es-results__topic-row ${t.isWeak ? 'es-results__topic-row--weak' : ''}`}>
              <div className="es-results__topic-info">
                <span className="es-results__topic-name">{t.topic}</span>
                <span className="es-results__topic-score">{t.correct}/{t.total} ({t.accuracy}%)</span>
              </div>
              <div className="es-results__topic-bar">
                <div className="es-results__topic-fill" style={{
                  width: `${t.accuracy}%`,
                  background: t.accuracy >= 65 ? '#22c55e' : t.accuracy >= 50 ? AGGIE_GOLD : '#ef4444'
                }} />
              </div>
              {t.isWeak && (
                <span className="es-results__weak-badge">
                  <AlertTriangle size={12} /> Needs Review
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Review Answers Button */}
        <button
          className="btn btn--outline es-results__review-btn"
          onClick={() => setPhase('review')}
        >
          <Eye size={18} /> Review All Answers
        </button>

        {/* Actions */}
        <div className="es-results__actions">
          <button className="btn btn--gold es-results__action" onClick={() => {
            setPhase('intro');
            setAnswers({});
            setFlagged(new Set());
            setCurrentIndex(0);
            setTimeLeft(examDuration);
            setIsPaused(false);
            // Regenerate fresh exam at full count
            const targetCount = section.totalItems || 80;
            const staticQs = [...(questionBank[sectionId] || [])];
            const needed = Math.max(0, targetCount - staticQs.length);
            const engineQs = needed > 0
              ? questionEngine.generateQuestions(sectionId, needed, { excludeIds: staticQs.map(q => q.id) })
              : [];
            const allQs = [...staticQs, ...engineQs];
            for (let i = allQs.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [allQs[i], allQs[j]] = [allQs[j], allQs[i]];
            }
            setQuestions(allQs.slice(0, targetCount));
          }}>
            <RotateCcw size={18} /> Retake Exam
          </button>
          <button className="btn btn--outline es-results__action" onClick={onBack}>
            Back to Module
          </button>
        </div>

        {/* Info Note */}
        <div className="es-results__note">
          <AlertTriangle size={14} />
          <p>
            This simulation contains {questions.length} items matching the actual LARE Section {section.id} exam
            format with a 3-hour time limit. Passing scores are determined by CLARB
            using a criterion-referenced standard (approximately 65% correct). Questions are a mix of
            curated practice items and engine-generated variations.
          </p>
        </div>
      </div>
    );
  }

  /* ============================================================
     REVIEW SCREEN — See all answers with explanations
     ============================================================ */
  if (phase === 'review') {
    return (
      <div className="es-review" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>
        <div className="es-review__header">
          <button className="es-review__back" onClick={() => setPhase('results')}>
            <ArrowLeft size={18} /> Back to Results
          </button>
          <h3 className="es-review__title">Answer Review — Section {section.id}</h3>
        </div>

        <div className="es-review__questions">
          {questions.map((q, qIdx) => {
            const userAnswer = answers[qIdx];
            const isCorrect = userAnswer === q.correct;
            const wasAnswered = userAnswer !== undefined;

            return (
              <div key={qIdx} className={`es-review__q-card card ${isCorrect ? 'es-review__q-card--correct' : 'es-review__q-card--incorrect'}`}>
                <div className="es-review__q-header">
                  <span className="es-review__q-num">Q{qIdx + 1}</span>
                  <span className="es-review__q-topic">{q.topic}</span>
                  {isCorrect ? (
                    <CheckCircle2 size={18} color="#22c55e" />
                  ) : (
                    <XCircle size={18} color="#ef4444" />
                  )}
                  {flagged.has(qIdx) && <Flag size={14} color={AGGIE_GOLD} fill={AGGIE_GOLD} />}
                </div>

                <p className="es-review__q-text">{q.text}</p>

                <div className="es-review__options">
                  {q.options.map((opt, idx) => {
                    let cls = 'es-review__option';
                    if (idx === q.correct) cls += ' es-review__option--correct';
                    if (idx === userAnswer && idx !== q.correct) cls += ' es-review__option--wrong';
                    return (
                      <div key={idx} className={cls}>
                        <span className="es-review__option-letter">{letters[idx]}</span>
                        <span>{opt}</span>
                        {idx === q.correct && <CheckCircle2 size={14} />}
                        {idx === userAnswer && idx !== q.correct && <XCircle size={14} />}
                      </div>
                    );
                  })}
                </div>

                {!wasAnswered && (
                  <p className="es-review__unanswered">⚠ Not answered — scored as incorrect</p>
                )}

                <div className="es-review__explanation">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn btn--primary es-review__back-btn" onClick={() => setPhase('results')}>
          Back to Results
        </button>
      </div>
    );
  }

  return null;
}
