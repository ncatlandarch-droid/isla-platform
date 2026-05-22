/**
 * ModuleLanding — Landing page shown when a user clicks a module card
 * Features: Perry voice intro, embedded video player with switchable topics, topic overview, activity picker
 */
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, Play, BookOpen, Puzzle, Target, ChevronRight,
  ExternalLink, Zap, Volume2, VolumeX, RotateCcw, Timer
} from 'lucide-react';
import { AGGIE_BLUE, AGGIE_GOLD, EXAM_SECTIONS } from '../data/examSections.js';
import { PERRY_INTROS } from '../data/flashcardData.js';
import perryVoice from '../engine/PerryVoice.js';

/** Extract YouTube video ID from URL */
const getYouTubeId = (url) => {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

/** Check if URL is a NotebookLM / Google video URL */
const isDirectVideoUrl = (url) => {
  return url && (url.includes('googleusercontent.com') || url.endsWith('.mp4') || url.endsWith('.webm'));
};

export default function ModuleLanding({
  sectionId,
  onBack,
  onStartQuiz,
  onStartFlashcards,
  onStartMatchGame,
  onStartGlossary,
  onStartExam,
  performanceTracker,
  spacedRepetition,
  playPerryStatic
}) {
  const section = EXAM_SECTIONS.find(s => s.id === sectionId);
  const [introDone, setIntroDone] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const handleResetProgress = () => {
    performanceTracker?.resetSection(sectionId);
    spacedRepetition?.resetSection(sectionId);
    setShowResetConfirm(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
  };

  // Perry speaks the intro on mount — instant from static pre-recorded file
  useEffect(() => {
    perryVoice.stop();
    const key = `intro-${sectionId}`;
    if (playPerryStatic) playPerryStatic(key);
    else perryVoice.playStatic(key);
    const timer = setTimeout(() => setIntroDone(true), 1500);
    return () => { clearTimeout(timer); perryVoice.stop(); };
  }, [sectionId]);

  // Reset active video when section changes
  useEffect(() => {
    setActiveVideoIndex(0);
  }, [sectionId]);

  if (!section) return null;

  const Icon = section.icon;
  const allVideos = section.videos || [];
  const activeVideo = allVideos[activeVideoIndex];
  const activeYouTubeId = activeVideo ? getYouTubeId(activeVideo.url) : null;
  const activeIsDirectVideo = activeVideo ? isDirectVideoUrl(activeVideo.url) : false;
  const hasVideo = activeVideo && activeVideo.url;
  const readiness = performanceTracker?.getSectionReadiness(sectionId) || { score: 0, label: 'Not Started', color: '#94a3b8' };

  return (
    <div className="ml-container" style={{ animation: 'fadeSlideIn 0.6s ease-out' }}>
      {/* Header */}
      <div className="ml-header">
        <button className="ml-header__back" onClick={onBack}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="ml-header__meta" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="ml-header__readiness" style={{ color: readiness.color }}>
            {readiness.label} — {readiness.score}%
          </span>
          {!showResetConfirm && !resetDone && (
            <button
              onClick={() => setShowResetConfirm(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '2rem', padding: '0.35rem 0.75rem', cursor: 'pointer',
                fontSize: '0.7rem', fontWeight: 700, color: '#ef4444',
                fontFamily: 'var(--font-sans)', transition: 'all 0.2s'
              }}
              title="Reset this module's progress"
            >
              <RotateCcw size={12} /> Reset Progress
            </button>
          )}
          {showResetConfirm && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ef4444' }}>Are you sure?</span>
              <button
                onClick={handleResetProgress}
                style={{
                  background: '#ef4444', color: 'white', border: 'none',
                  borderRadius: '2rem', padding: '0.35rem 0.75rem', cursor: 'pointer',
                  fontSize: '0.7rem', fontWeight: 800, fontFamily: 'var(--font-sans)'
                }}
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{
                  background: 'rgba(0,0,0,0.05)', color: '#666', border: 'none',
                  borderRadius: '2rem', padding: '0.35rem 0.75rem', cursor: 'pointer',
                  fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-sans)'
                }}
              >
                Cancel
              </button>
            </div>
          )}
          {resetDone && (
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#22c55e' }}>
              ✓ Progress reset!
            </span>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="ml-hero">
        <div className="ml-hero__info">
          <div className="ml-hero__icon-wrap">
            <Icon size={48} strokeWidth={2.5} />
          </div>
          <div>
            <span className="ml-hero__module-num">MODULE 0{section.id}</span>
            <h2 className="ml-hero__title">{section.title}</h2>
            <p className="ml-hero__subtitle">{section.totalItems} exam items • {section.topics.length} topic areas</p>
          </div>
        </div>

        {/* Perry intro text */}
        <div className="ml-perry-intro">
          <div className="ml-perry-intro__avatar">
            <img
              src="Perry.png"
              alt="Coach Perry"
              onError={(e) => { e.target.src = "https://placehold.co/80/004684/FDB927?text=P"; }}
            />
          </div>
          <div className="ml-perry-intro__bubble">
            <p>{PERRY_INTROS[sectionId]}</p>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      {allVideos.length > 0 && (
        <div className="ml-video-section">
          <h3 className="ml-section-title">
            <Play size={20} color={AGGIE_GOLD} /> Video Tutorials
          </h3>

          {/* Video Tabs */}
          <div className="ml-video-tabs">
            {allVideos.map((v, i) => (
              <button
                key={i}
                className={`ml-video-tab ${i === activeVideoIndex ? 'ml-video-tab--active' : ''} ${!v.url ? 'ml-video-tab--disabled' : ''}`}
                onClick={() => {
                  if (v.url) {
                    perryVoice.stop();
                    setActiveVideoIndex(i);
                  }
                }}
                disabled={!v.url}
                title={!v.url ? 'Video coming soon' : v.title}
              >
                <Play size={12} />
                <span>{v.type === 'overview' ? '📋 Overview' : v.title}</span>
              </button>
            ))}
          </div>

          {/* Active Video Player */}
          {hasVideo && (
            <div className="ml-video-player">
              {activeYouTubeId ? (
                <div className="ml-video-embed">
                  <iframe
                    key={activeYouTubeId}
                    src={`https://www.youtube.com/embed/${activeYouTubeId}?rel=0&enablejsapi=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : activeIsDirectVideo ? (
                <div className="ml-video-embed">
                  <video
                    key={activeVideo.url}
                    src={activeVideo.url}
                    controls
                    preload="metadata"
                    onPlay={() => perryVoice.stop()}
                    onError={(e) => {
                      // If video can't play inline, open in new tab
                      e.target.parentElement.innerHTML = `
                        <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#0a0e17;flex-direction:column;gap:1rem;">
                          <p style="color:#94a3b8;font-size:0.9rem;">Video cannot play inline.</p>
                          <a href="${activeVideo.url}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:0.5rem;color:#FDB927;font-size:1.1rem;font-weight:700;text-decoration:none;padding:0.75rem 1.5rem;border:2px solid #FDB927;border-radius:2rem;">▶ Open Video</a>
                        </div>`;
                    }}
                  />
                </div>
              ) : (
                <div className="ml-video-embed" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0e17' }}>
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      color: AGGIE_GOLD, fontSize: '1.1rem', fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={20} /> Open Video in New Tab
                  </a>
                </div>
              )}
              <p className="ml-video-title">{activeVideo.title}</p>
            </div>
          )}
        </div>
      )}

      {/* Topic Breakdown */}
      <div className="ml-topics-section">
        <h3 className="ml-section-title">
          <Target size={20} color={AGGIE_GOLD} /> Topic Blueprint
        </h3>
        <div className="ml-topics-grid">
          {section.topics.map((t, i) => (
            <div key={i} className="ml-topic-card">
              <div className="ml-topic-card__weight" style={{
                background: i === 0 ? AGGIE_BLUE : i === 1 ? AGGIE_GOLD : '#64748b',
                color: i === 1 ? AGGIE_BLUE : '#fff'
              }}>
                {t.weight}%
              </div>
              <div className="ml-topic-card__info">
                <p className="ml-topic-card__name">{t.name}</p>
                <p className="ml-topic-card__desc">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Picker */}
      <div className="ml-activities-section">
        <h3 className="ml-section-title">
          <Zap size={20} color={AGGIE_GOLD} /> Choose Your Activity
        </h3>
        <div className="ml-activities-grid">
          {/* Practice Quiz */}
          <button className="ml-activity-card ml-activity-card--quiz" onClick={onStartQuiz}>
            <div className="ml-activity-card__icon-wrap ml-activity-card__icon-wrap--blue">
              <Target size={32} strokeWidth={2.5} />
            </div>
            <h4 className="ml-activity-card__title">Practice Quiz</h4>
            <p className="ml-activity-card__desc">
              Adaptive questions with explanations, streak tracking, and AI-generated bonus questions.
            </p>
            <span className="ml-activity-card__cta">
              Start Quiz <ChevronRight size={16} />
            </span>
          </button>

          {/* Flashcards */}
          <button className="ml-activity-card ml-activity-card--flashcards" onClick={onStartFlashcards}>
            <div className="ml-activity-card__icon-wrap ml-activity-card__icon-wrap--gold">
              <BookOpen size={32} strokeWidth={2.5} />
            </div>
            <h4 className="ml-activity-card__title">Flashcards</h4>
            <p className="ml-activity-card__desc">
              Flip through key terms and definitions. Mark what you know and what needs more study.
            </p>
            <span className="ml-activity-card__cta">
              Study Cards <ChevronRight size={16} />
            </span>
          </button>

          {/* Match Game */}
          <button className="ml-activity-card ml-activity-card--match" onClick={onStartMatchGame}>
            <div className="ml-activity-card__icon-wrap ml-activity-card__icon-wrap--green">
              <Puzzle size={32} strokeWidth={2.5} />
            </div>
            <h4 className="ml-activity-card__title">Match Game</h4>
            <p className="ml-activity-card__desc">
              Match terms to their definitions against the clock. Test your speed and accuracy.
            </p>
            <span className="ml-activity-card__cta">
              Play Game <ChevronRight size={16} />
            </span>
          </button>

          {/* Glossary Match Game */}
          <button className="ml-activity-card ml-activity-card--glossary" onClick={onStartGlossary}>
            <div className="ml-activity-card__icon-wrap ml-activity-card__icon-wrap--purple">
              <BookOpen size={32} strokeWidth={2.5} />
            </div>
            <h4 className="ml-activity-card__title">Glossary Game</h4>
            <p className="ml-activity-card__desc">
              Match LARE vocabulary terms to their definitions. Master the professional language of the exam.
            </p>
            <span className="ml-activity-card__cta">
              Play Glossary <ChevronRight size={16} />
            </span>
          </button>

          {/* Exam Simulation */}
          <button className="ml-activity-card ml-activity-card--exam" onClick={onStartExam}>
            <div className="ml-activity-card__icon-wrap ml-activity-card__icon-wrap--exam">
              <Timer size={32} strokeWidth={2.5} />
            </div>
            <h4 className="ml-activity-card__title">Exam Simulation</h4>
            <p className="ml-activity-card__desc">
              Full 3-hour timed test simulating the actual CLARB LARE exam. No feedback until you submit.
            </p>
            <span className="ml-activity-card__cta">
              Start Exam <ChevronRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

