/**
 * AdaptiveQuiz — Khan Academy-style adaptive quiz component
 * Features: progress ring, streak counter, detailed explanations,
 * "why is this wrong?" expandables, spaced repetition integration
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, ChevronRight, CheckCircle2, XCircle, Award,
  Zap, Target, BookOpen, Play, Clock, TrendingUp, Info,
  ChevronDown, ChevronUp, Lightbulb, AlertTriangle
} from 'lucide-react';
import { AGGIE_BLUE, AGGIE_GOLD } from '../data/examSections.js';

/** Circular Progress Ring */
const ProgressRing = ({ progress, size = 80, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (progress / 100) * circ;
  return (
    <svg width={size} height={size} className="progress-ring">
      <circle cx={size/2} cy={size/2} r={radius} fill="none"
        stroke="rgba(0,70,132,0.1)" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={radius} fill="none"
        stroke={progress >= 70 ? '#22c55e' : progress >= 40 ? AGGIE_GOLD : '#ef4444'}
        strokeWidth={strokeWidth} strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 0.6s ease-out' }} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: size * 0.25, fontWeight: 900, fill: AGGIE_BLUE }}>
        {Math.round(progress)}%
      </text>
    </svg>
  );
};

/** Mini streak flame */
const StreakBadge = ({ streak }) => (
  <div className="aq-streak-badge">
    <Zap size={16} color={streak > 0 ? AGGIE_GOLD : '#94a3b8'} fill={streak > 0 ? AGGIE_GOLD : 'none'} />
    <span style={{ color: streak > 0 ? AGGIE_GOLD : '#94a3b8' }}>{streak}</span>
  </div>
);

export default function AdaptiveQuiz({
  section,
  sectionTitle,
  questionEngine,
  spacedRepetition,
  performanceTracker,
  onBack,
  onComplete,
  mode = 'practice', // 'practice' | 'focus' | 'exam'
  focusTopic = null,
  questionCount = 15,
  questionBank = {}
}) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showWrongExplanations, setShowWrongExplanations] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ byTopic: {} });
  const [startTime, setStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);  // AI generating new question
  const letters = ['A', 'B', 'C', 'D'];

  // Load ALL static questions from bank, shuffled
  const loadStaticQuestions = () => {
    const staticQs = [...(questionBank[section] || [])];
    // Fisher-Yates shuffle
    for (let i = staticQs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [staticQs[i], staticQs[j]] = [staticQs[j], staticQs[i]];
    }
    return staticQs;
  };

  useEffect(() => {
    setIsLoading(true);
    const qs = loadStaticQuestions();
    setQuestions(qs);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setIsLoading(false);
  }, [section]);

  const currentQ = questions[currentIndex];

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);

    const correct = idx === currentQ.correct;
    const responseTime = Date.now() - questionStartTime;

    // Update score and streak
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => {
        const newStreak = s + 1;
        if (newStreak > bestStreak) setBestStreak(newStreak);
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    // Record in spaced repetition
    spacedRepetition.recordAnswer(
      currentQ.id, currentQ.topic, section, correct, null, responseTime
    );

    // Record in performance tracker
    performanceTracker.recordAnswer(
      section, currentQ.topic, correct, currentQ.id, currentQ.difficulty || 2
    );

    // Update session stats
    setSessionStats(prev => {
      const byTopic = { ...prev.byTopic };
      if (!byTopic[currentQ.topic]) byTopic[currentQ.topic] = { total: 0, correct: 0 };
      byTopic[currentQ.topic].total += 1;
      if (correct) byTopic[currentQ.topic].correct += 1;
      return { ...prev, byTopic };
    });
  };

  const nextQuestion = async () => {
    const nextIdx = currentIndex + 1;

    if (nextIdx < questions.length) {
      // More questions in pool
      setCurrentIndex(nextIdx);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowWrongExplanations(false);
      setShowSteps(false);
      setQuestionStartTime(Date.now());
    } else {
      // All static questions done — complete the quiz
      setIsComplete(true);
      if (onComplete) onComplete({ score, total: questions.length, sessionStats, bestStreak });
    }
  };

  /** Generate an AI bonus question after quiz completion */
  const generateBonusQuestion = async () => {
    setLoadingAI(true);
    setIsComplete(false);
    let aiQ = null;
    for (let attempt = 0; attempt < 2 && !aiQ; attempt++) {
      try {
        aiQ = await questionEngine.generateAIQuestion(section);
      } catch { /* retry */ }
    }
    if (aiQ) {
      setQuestions(prev => [...prev, aiQ]);
      setCurrentIndex(questions.length);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowWrongExplanations(false);
      setShowSteps(false);
      setQuestionStartTime(Date.now());
    } else {
      setIsComplete(true); // AI failed, stay on results
    }
    setLoadingAI(false);
  };

  /** Reset quiz with freshly shuffled static questions */
  const retakeQuiz = () => {
    const qs = loadStaticQuestions();
    setQuestions(qs);
    setCurrentIndex(0); setSelectedAnswer(null); setShowExplanation(false);
    setShowWrongExplanations(false); setShowSteps(false);
    setScore(0); setStreak(0); setBestStreak(0); setIsComplete(false);
    setSessionStats({ byTopic: {} }); setStartTime(Date.now()); setQuestionStartTime(Date.now());
  };

  // --- RESULTS SCREEN ---
  if (isComplete) {
    const pct = Math.round((score / questions.length) * 100);
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const topicResults = Object.entries(sessionStats.byTopic).map(([topic, data]) => ({
      topic,
      accuracy: Math.round((data.correct / data.total) * 100),
      correct: data.correct,
      total: data.total,
      isWeak: (data.correct / data.total) < 0.7
    })).sort((a, b) => a.accuracy - b.accuracy);

    return (
      <div className="aq-results" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
        <div className="aq-results__hero">
          <ProgressRing progress={pct} size={120} strokeWidth={8} />
          <div className="aq-results__score-text">
            <span className="aq-results__score-big">{score}/{questions.length}</span>
            <span className="aq-results__score-label">Questions Correct</span>
          </div>
        </div>

        <div className="aq-results__stats-row">
          <div className="aq-results__stat">
            <Clock size={20} color="#64748b" />
            <span>{mins}m {secs}s</span>
          </div>
          <div className="aq-results__stat">
            <Zap size={20} color={AGGIE_GOLD} />
            <span>Best Streak: {bestStreak}</span>
          </div>
          <div className="aq-results__stat">
            <TrendingUp size={20} color="#22c55e" />
            <span>{pct}% Accuracy</span>
          </div>
        </div>

        {pct >= 85 && (
          <div className="aq-results__message aq-results__message--great">
            <Award size={24} color={AGGIE_GOLD} />
            Excellent work! You're showing strong mastery of this material.
          </div>
        )}
        {pct >= 60 && pct < 85 && (
          <div className="aq-results__message aq-results__message--good">
            <TrendingUp size={24} color="#22c55e" />
            Good progress! Focus on the topics below to keep improving.
          </div>
        )}
        {pct < 60 && (
          <div className="aq-results__message aq-results__message--needs-work">
            <Target size={24} color="#f97316" />
            Keep practicing! Review the weak topics below and try Focus Mode for targeted drill.
          </div>
        )}

        {/* Topic Breakdown */}
        <div className="aq-results__topics">
          <h4 className="aq-results__topics-title">Topic Performance</h4>
          {topicResults.map((t, i) => (
            <div key={i} className={`aq-results__topic-row ${t.isWeak ? 'aq-results__topic-row--weak' : ''}`}>
              <div className="aq-results__topic-info">
                <span className="aq-results__topic-name">{t.topic}</span>
                <span className="aq-results__topic-score">{t.correct}/{t.total}</span>
              </div>
              <div className="aq-results__topic-bar">
                <div className="aq-results__topic-fill" style={{
                  width: `${t.accuracy}%`,
                  background: t.accuracy >= 70 ? '#22c55e' : t.accuracy >= 50 ? AGGIE_GOLD : '#ef4444'
                }} />
              </div>
              {t.isWeak && (
                <span className="aq-results__weak-badge">
                  <AlertTriangle size={12} /> Needs Practice
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="aq-results__actions">
          <button className="btn btn--gold aq-results__action-btn" onClick={retakeQuiz}>
            <Play size={18} /> Retake Section
          </button>
          <button className="btn btn--outline aq-results__action-btn" onClick={generateBonusQuestion} disabled={loadingAI}>
            <Sparkles size={18} /> {loadingAI ? 'Generating...' : 'Generate AI Question'}
          </button>
          <button className="btn btn--outline aq-results__action-btn" onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !currentQ) {
    return (
      <div className="aq-loading">
        <div className="aq-loading__spinner" />
        <p>Generating questions...</p>
      </div>
    );
  }

  // --- QUIZ SCREEN ---
  const progress = ((currentIndex + (selectedAnswer !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="aq-container" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>
      {/* Header Bar */}
      <div className="aq-header">
        <button className="aq-header__back" onClick={onBack}>
          <ArrowLeft size={18} /> Exit
        </button>
        <div className="aq-header__info">
          <span className="aq-header__section">{sectionTitle}</span>
          {focusTopic && <span className="aq-header__focus-badge"><Target size={12} /> {focusTopic}</span>}
        </div>
        <div className="aq-header__stats">
          <StreakBadge streak={streak} />
          <span className="aq-header__question-num">{currentIndex + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="aq-progress-bar">
        <div className="aq-progress-bar__fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question Card */}
      <div className="aq-card">
        <div className="aq-card__meta">
          <span className="aq-card__topic-badge">{currentQ.topic}</span>
          <span className="aq-card__difficulty">
            {['', '●○○', '●●○', '●●●'][currentQ.difficulty || 2]}
          </span>
        </div>

        <p className="aq-card__question">{currentQ.text}</p>

        {/* Options */}
        <div className="aq-options">
          {currentQ.options.map((opt, idx) => {
            let cls = 'aq-option';
            if (selectedAnswer !== null) {
              if (idx === currentQ.correct) cls += ' aq-option--correct';
              else if (idx === selectedAnswer) cls += ' aq-option--incorrect';
              else cls += ' aq-option--dimmed';
            }
            return (
              <button key={idx} className={cls}
                onClick={() => handleAnswer(idx)} disabled={selectedAnswer !== null}>
                <span className="aq-option__letter">{letters[idx]}</span>
                <span className="aq-option__text">{opt}</span>
                {selectedAnswer !== null && idx === currentQ.correct && (
                  <CheckCircle2 size={20} className="aq-option__icon aq-option__icon--correct" />
                )}
                {selectedAnswer !== null && idx === selectedAnswer && idx !== currentQ.correct && (
                  <XCircle size={20} className="aq-option__icon aq-option__icon--incorrect" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Panel */}
        {showExplanation && (
          <div className={`aq-explanation ${selectedAnswer === currentQ.correct ? 'aq-explanation--correct' : 'aq-explanation--incorrect'}`}>
            <div className="aq-explanation__header">
              {selectedAnswer === currentQ.correct ?
                <><CheckCircle2 size={20} color="#22c55e" /> <strong>Correct!</strong></> :
                <><XCircle size={20} color="#ef4444" /> <strong>Incorrect</strong> — The correct answer is {letters[currentQ.correct]}.</>
              }
            </div>
            <p className="aq-explanation__text">{currentQ.explanation}</p>

            {/* Step-by-step walkthrough */}
            {currentQ.detailedSteps && (
              <div className="aq-expandable">
                <button className="aq-expandable__toggle" onClick={() => setShowSteps(!showSteps)}>
                  <Lightbulb size={16} /> How to solve this
                  {showSteps ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {showSteps && (
                  <div className="aq-expandable__content">
                    {currentQ.detailedSteps.map((step, i) => (
                      <div key={i} className="aq-step">
                        <span className="aq-step__num">{i + 1}</span>
                        <span className="aq-step__text">{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Why wrong answers are wrong */}
            {currentQ.wrongAnswerExplanations && (
              <div className="aq-expandable">
                <button className="aq-expandable__toggle" onClick={() => setShowWrongExplanations(!showWrongExplanations)}>
                  <Info size={16} /> Why each answer is right or wrong
                  {showWrongExplanations ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {showWrongExplanations && (
                  <div className="aq-expandable__content">
                    {currentQ.options.map((opt, idx) => (
                      <div key={idx} className={`aq-wrong-explain ${idx === currentQ.correct ? 'aq-wrong-explain--correct' : ''}`}>
                        <span className="aq-wrong-explain__letter">{letters[idx]}</span>
                        <div>
                          <span className="aq-wrong-explain__opt">{opt}</span>
                          <p className="aq-wrong-explain__reason">
                            {idx === currentQ.correct
                              ? '✓ This is correct.'
                              : (currentQ.wrongAnswerExplanations[idx] || '✗ This is not the best answer.')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Formula Card */}
            {currentQ.formulaCard && (
              <div className="aq-formula-card">
                <span className="aq-formula-card__label">{currentQ.formulaCard.name}</span>
                <pre className="aq-formula-card__formula">{currentQ.formulaCard.formula}</pre>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        {selectedAnswer !== null && (
          <div className="aq-nav">
            {loadingAI ? (
              <button className="btn btn--primary aq-nav__btn" disabled>
                <span className="aq-loading__spinner" style={{ width: 18, height: 18, borderWidth: 2, display: 'inline-block', marginRight: 8 }} />
                AI Generating...
              </button>
            ) : (
              <button className="btn btn--primary aq-nav__btn" onClick={nextQuestion}>
                Next Question
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
