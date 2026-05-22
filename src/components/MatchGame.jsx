/**
 * MatchGame — Term-Definition matching game
 * Features: click-to-match, animations, timer, confetti on completion
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft, Clock, RotateCcw, Award, Zap, CheckCircle2
} from 'lucide-react';
import { AGGIE_BLUE, AGGIE_GOLD } from '../data/examSections.js';
import { FLASHCARD_DATA } from '../data/flashcardData.js';

/** Shuffle helper */
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function MatchGame({ section, sectionTitle, onBack, dataSource = null, gameTitle = null }) {
  const PAIR_COUNT = 6;
  // Use custom dataSource if provided, otherwise fall back to flashcard data
  const allCards = useMemo(() => {
    if (dataSource && dataSource[section]) {
      // Glossary format: { term, definition } → convert to { front, back }
      return dataSource[section].map(item => ({
        front: item.term || item.front,
        back: item.definition || item.back
      }));
    }
    return FLASHCARD_DATA[section] || [];
  }, [section, dataSource]);

  const [pairs, setPairs] = useState([]);
  const [shuffledDefs, setShuffledDefs] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrongPair, setWrongPair] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef(null);

  // Initialize round
  const startRound = () => {
    const selected = shuffleArray(allCards).slice(0, PAIR_COUNT);
    setPairs(selected);
    setShuffledDefs(shuffleArray(selected.map(c => c.back)));
    setSelectedTerm(null);
    setSelectedDef(null);
    setMatched(new Set());
    setWrongPair(null);
    setTimer(0);
    setIsComplete(false);
    setAttempts(0);
  };

  useEffect(() => { startRound(); }, [section]);

  // Timer
  useEffect(() => {
    if (isComplete) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [isComplete]);

  // Check match
  useEffect(() => {
    if (selectedTerm === null || selectedDef === null) return;

    const termCard = pairs[selectedTerm];
    const defText = shuffledDefs[selectedDef];
    setAttempts(a => a + 1);

    if (termCard.back === defText) {
      // Correct match
      const newMatched = new Set([...matched, selectedTerm]);
      setMatched(newMatched);
      setSelectedTerm(null);
      setSelectedDef(null);

      if (newMatched.size === pairs.length) {
        setIsComplete(true);
      }
    } else {
      // Wrong match — shake
      setWrongPair({ term: selectedTerm, def: selectedDef });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 600);
    }
  }, [selectedTerm, selectedDef]);

  const handleTermClick = (i) => {
    if (matched.has(i) || wrongPair) return;
    setSelectedTerm(i);
  };

  const handleDefClick = (i) => {
    if (wrongPair) return;
    // Check if this def belongs to an already-matched pair
    const defText = shuffledDefs[i];
    const matchedTermIdx = pairs.findIndex((p, idx) => p.back === defText && matched.has(idx));
    if (matchedTermIdx >= 0) return;
    setSelectedDef(i);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // Completion screen
  if (isComplete) {
    const score = Math.max(0, Math.round(100 - (attempts - PAIR_COUNT) * 8 - timer * 0.5));
    return (
      <div className="mg-container" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
        <div className="mg-header">
          <button className="mg-header__back" onClick={onBack}><ArrowLeft size={18} /> Back</button>
          <span className="mg-header__title">{gameTitle || `${sectionTitle} — Match Game`}</span>
        </div>
        <div className="mg-complete card">
          <Award size={70} color={AGGIE_GOLD} style={{ margin: '0 auto 1.5rem', display: 'block' }} />
          <h3 className="mg-complete__title">All Matched!</h3>
          <div className="mg-complete__stats">
            <div className="mg-complete__stat">
              <Clock size={20} color="#64748b" />
              <span>{formatTime(timer)}</span>
            </div>
            <div className="mg-complete__stat">
              <Zap size={20} color={AGGIE_GOLD} />
              <span>{attempts} Attempts</span>
            </div>
            <div className="mg-complete__stat">
              <CheckCircle2 size={20} color="#22c55e" />
              <span>Score: {Math.max(score, 0)}</span>
            </div>
          </div>
          <div className="mg-complete__actions">
            <button className="btn btn--gold" onClick={startRound}><RotateCcw size={16} /> Play Again</button>
            <button className="btn btn--outline" onClick={onBack}>Back to Module</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mg-container" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>
      {/* Header */}
      <div className="mg-header">
        <button className="mg-header__back" onClick={onBack}><ArrowLeft size={18} /> Back</button>
        <span className="mg-header__title">{gameTitle || `${sectionTitle} — Match Game`}</span>
        <div className="mg-header__timer">
          <Clock size={16} /> {formatTime(timer)}
        </div>
      </div>

      {/* Progress */}
      <div className="mg-progress">
        <div className="mg-progress__bar">
          <div className="mg-progress__fill" style={{ width: `${(matched.size / PAIR_COUNT) * 100}%` }} />
        </div>
        <span className="mg-progress__text">{matched.size} of {PAIR_COUNT} matched</span>
      </div>

      <p className="mg-instructions">Click a term, then click its matching definition</p>

      {/* Game Grid */}
      <div className="mg-grid">
        {/* Terms column */}
        <div className="mg-column">
          <h4 className="mg-column__label">TERMS</h4>
          {pairs.map((pair, i) => (
            <button
              key={`t-${i}`}
              className={`mg-tile mg-tile--term
                ${matched.has(i) ? 'mg-tile--matched' : ''}
                ${selectedTerm === i ? 'mg-tile--selected' : ''}
                ${wrongPair?.term === i ? 'mg-tile--wrong' : ''}
              `}
              onClick={() => handleTermClick(i)}
              disabled={matched.has(i)}
            >
              {pair.front}
            </button>
          ))}
        </div>

        {/* Definitions column */}
        <div className="mg-column">
          <h4 className="mg-column__label">DEFINITIONS</h4>
          {shuffledDefs.map((def, i) => {
            const isMatchedDef = pairs.some((p, idx) => p.back === def && matched.has(idx));
            return (
              <button
                key={`d-${i}`}
                className={`mg-tile mg-tile--def
                  ${isMatchedDef ? 'mg-tile--matched' : ''}
                  ${selectedDef === i ? 'mg-tile--selected' : ''}
                  ${wrongPair?.def === i ? 'mg-tile--wrong' : ''}
                `}
                onClick={() => handleDefClick(i)}
                disabled={isMatchedDef}
              >
                {def.length > 100 ? def.substring(0, 97) + '...' : def}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
