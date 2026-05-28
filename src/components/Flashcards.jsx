/**
 * Flashcards — Interactive flip-card study tool
 * Features: 3D flip animation, prev/next, shuffle, self-assessment tracking
 */
import React, { useState, useMemo } from 'react';
import {
  ArrowLeft, ChevronLeft, ChevronRight, Shuffle, RotateCcw,
  Check, BookOpen, Zap
} from 'lucide-react';
import { AGGIE_BLUE, AGGIE_GOLD } from '../data/examSections.js';

export default function Flashcards({ section, sectionTitle, onBack, flashcardData = {} }) {
  const allCards = useMemo(() => [...(flashcardData[section] || [])], [section, flashcardData]);
  const [cards, setCards] = useState(allCards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [confident, setConfident] = useState(new Set());
  const [needsWork, setNeedsWork] = useState(new Set());

  const card = cards[index];
  const total = cards.length;
  const doneCount = confident.size + needsWork.size;

  const shuffle = () => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
    setIndex(0);
    setFlipped(false);
    setConfident(new Set());
    setNeedsWork(new Set());
  };

  const restart = () => {
    setIndex(0);
    setFlipped(false);
    setConfident(new Set());
    setNeedsWork(new Set());
  };

  const goNext = () => { if (index < total - 1) { setIndex(i => i + 1); setFlipped(false); } };
  const goPrev = () => { if (index > 0) { setIndex(i => i - 1); setFlipped(false); } };

  const markConfident = () => {
    const key = card.front;
    setConfident(prev => new Set([...prev, key]));
    setNeedsWork(prev => { const n = new Set(prev); n.delete(key); return n; });
    goNext();
  };

  const markNeedsWork = () => {
    const key = card.front;
    setNeedsWork(prev => new Set([...prev, key]));
    setConfident(prev => { const n = new Set(prev); n.delete(key); return n; });
    goNext();
  };

  // Handle keyboard
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(f => !f); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  if (!card) return null;

  // Summary view
  if (doneCount === total) {
    return (
      <div className="fc-container" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
        <div className="fc-header">
          <button className="fc-header__back" onClick={onBack}><ArrowLeft size={18} /> Back</button>
          <span className="fc-header__title">{sectionTitle} — Flashcards</span>
        </div>
        <div className="fc-summary card">
          <BookOpen size={60} color={AGGIE_GOLD} style={{ margin: '0 auto 1.5rem', display: 'block' }} />
          <h3 className="fc-summary__title">Session Complete!</h3>
          <div className="fc-summary__stats">
            <div className="fc-summary__stat fc-summary__stat--green">
              <Check size={20} /> <span>{confident.size} Got It</span>
            </div>
            <div className="fc-summary__stat fc-summary__stat--gold">
              <BookOpen size={20} /> <span>{needsWork.size} Study More</span>
            </div>
          </div>
          <div className="fc-summary__actions">
            <button className="btn btn--gold" onClick={restart}><RotateCcw size={16} /> Review Again</button>
            <button className="btn btn--outline" onClick={shuffle}><Shuffle size={16} /> Shuffle & Retry</button>
            <button className="btn btn--outline" onClick={onBack}>Back to Module</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fc-container" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>
      {/* Header */}
      <div className="fc-header">
        <button className="fc-header__back" onClick={onBack}><ArrowLeft size={18} /> Back</button>
        <span className="fc-header__title">{sectionTitle} — Flashcards</span>
        <div className="fc-header__actions">
          <button className="fc-header__btn" onClick={shuffle} title="Shuffle"><Shuffle size={18} /></button>
        </div>
      </div>

      {/* Progress */}
      <div className="fc-progress">
        <div className="fc-progress__bar">
          <div className="fc-progress__fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <span className="fc-progress__text">Card {index + 1} of {total}</span>
      </div>

      {/* Card */}
      <div className="fc-card-wrap" onClick={() => setFlipped(f => !f)}>
        <div className={`fc-card ${flipped ? 'fc-card--flipped' : ''}`}>
          <div className="fc-card__face fc-card__front">
            <span className="fc-card__label">TERM</span>
            <p className="fc-card__text">{card.front}</p>
            <span className="fc-card__hint">Click to flip</span>
          </div>
          <div className="fc-card__face fc-card__back">
            <span className="fc-card__label">DEFINITION</span>
            <p className="fc-card__text">{card.back}</p>
            <span className="fc-card__hint">Click to flip</span>
          </div>
        </div>
      </div>

      {/* Self-assessment (show only when flipped) */}
      {flipped && (
        <div className="fc-assess" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <button className="fc-assess__btn fc-assess__btn--confident" onClick={markConfident}>
            <Check size={18} /> Got It
          </button>
          <button className="fc-assess__btn fc-assess__btn--work" onClick={markNeedsWork}>
            <BookOpen size={18} /> Study More
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="fc-nav">
        <button className="fc-nav__btn" onClick={goPrev} disabled={index === 0}>
          <ChevronLeft size={22} />
        </button>
        <div className="fc-nav__dots">
          {cards.map((_, i) => (
            <div
              key={i}
              className={`fc-nav__dot ${i === index ? 'fc-nav__dot--active' : ''} ${confident.has(cards[i].front) ? 'fc-nav__dot--green' : ''} ${needsWork.has(cards[i].front) ? 'fc-nav__dot--gold' : ''}`}
            />
          ))}
        </div>
        <button className="fc-nav__btn" onClick={goNext} disabled={index === total - 1}>
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
