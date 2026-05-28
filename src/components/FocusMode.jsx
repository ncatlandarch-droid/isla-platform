/**
 * FocusMode — Targeted weakness drilling component
 * Auto-detects weakest topics and drills them until mastery improves
 */
import React, { useState, useMemo } from 'react';
import { Target, Zap, TrendingUp, ArrowLeft, AlertTriangle, ChevronRight, Play } from 'lucide-react';
import { AGGIE_BLUE, AGGIE_GOLD } from '../data/examSections.js';
import AdaptiveQuiz from './AdaptiveQuiz.jsx';

export default function FocusMode({
  questionEngine,
  spacedRepetition,
  performanceTracker,
  onBack,
  examSections = [],
  questionBank = {}
}) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [drilling, setDrilling] = useState(false);

  // Get weakness report
  const weaknessReport = useMemo(() => performanceTracker.getWeaknessReport(), [drilling]);
  const allTopicStats = useMemo(() => performanceTracker.getAllTopicStats(), [drilling]);

  // Build topic list for each section with mastery data
  const sectionData = useMemo(() => {
    return examSections.map(section => {
      const topics = section.topics.map(t => {
        const stats = allTopicStats.find(s => s.section === section.id && s.topic === t.name);
        return {
          name: t.name,
          weight: t.weight,
          accuracy: stats?.accuracy ?? null,
          attempts: stats?.totalAttempts ?? 0,
          trend: stats?.trend ?? 'stable',
          isWeak: stats ? stats.accuracy < 70 : false,
          isUnattempted: !stats || stats.totalAttempts === 0
        };
      });
      return { ...section, topicsWithStats: topics };
    });
  }, [allTopicStats]);

  // If drilling, show adaptive quiz in focus mode
  if (drilling && selectedTopic && selectedSection) {
    return (
      <AdaptiveQuiz
        section={selectedSection}
        sectionTitle={examSections.find(s => s.id === selectedSection)?.shortTitle}
        questionEngine={questionEngine}
        spacedRepetition={spacedRepetition}
        performanceTracker={performanceTracker}
        onBack={() => setDrilling(false)}
        onComplete={() => setDrilling(false)}
        mode="focus"
        focusTopic={selectedTopic}
        questionCount={10}
        questionBank={questionBank}
      />
    );
  }

  return (
    <div className="focus-mode" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
      <div className="focus-mode__header">
        <button className="focus-mode__back" onClick={onBack}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div>
          <h2 className="focus-mode__title">
            <Target size={28} color={AGGIE_GOLD} /> Focus Mode
          </h2>
          <p className="focus-mode__subtitle">Target your weakest areas for accelerated mastery</p>
        </div>
      </div>

      {/* Weakness Summary */}
      {weaknessReport.totalWeakTopics > 0 ? (
        <div className="focus-mode__alert">
          <AlertTriangle size={20} />
          <div>
            <strong>{weaknessReport.totalWeakTopics} topic{weaknessReport.totalWeakTopics > 1 ? 's' : ''} below mastery threshold</strong>
            <p>{weaknessReport.critical.length} critical • {weaknessReport.moderate.length} moderate • {weaknessReport.approaching.length} approaching</p>
          </div>
        </div>
      ) : (
        <div className="focus-mode__alert focus-mode__alert--good">
          <TrendingUp size={20} />
          <div>
            <strong>{allTopicStats.length > 0 ? 'All practiced topics are above 70% mastery!' : 'Start practicing to see your weak areas.'}</strong>
            <p>Select any topic below to keep sharpening your skills.</p>
          </div>
        </div>
      )}

      {/* Auto-recommended drill */}
      {weaknessReport.critical.length > 0 && (
        <div className="focus-mode__recommended">
          <div className="focus-mode__recommended-header">
            <Zap size={20} color={AGGIE_GOLD} />
            <h3>Recommended Drill</h3>
          </div>
          <div className="focus-mode__recommended-topic">
            <div>
              <span className="focus-mode__recommended-name">{weaknessReport.critical[0].topic}</span>
              <span className="focus-mode__recommended-section">Section {weaknessReport.critical[0].section}</span>
              <span className="focus-mode__recommended-accuracy">{weaknessReport.critical[0].accuracy}% accuracy</span>
            </div>
            <button className="btn btn--gold" onClick={() => {
              setSelectedTopic(weaknessReport.critical[0].topic);
              setSelectedSection(weaknessReport.critical[0].section);
              setDrilling(true);
            }}>
              <Play size={16} /> Start Drill
            </button>
          </div>
          <p className="focus-mode__recommended-advice">{weaknessReport.critical[0].advice}</p>
        </div>
      )}

      {/* All Sections + Topics Grid */}
      <div className="focus-mode__sections">
        {sectionData.map(section => (
          <div key={section.id} className="focus-mode__section-card">
            <div className="focus-mode__section-header">
              <span className="focus-mode__section-num">Section {section.id}</span>
              <span className="focus-mode__section-title">{section.shortTitle}</span>
            </div>
            <div className="focus-mode__topics">
              {section.topicsWithStats.map((t, i) => (
                <div key={i}
                  className={`focus-mode__topic ${t.isWeak ? 'focus-mode__topic--weak' : ''} ${t.isUnattempted ? 'focus-mode__topic--new' : ''}`}
                  onClick={() => { setSelectedTopic(t.name); setSelectedSection(section.id); setDrilling(true); }}
                >
                  <div className="focus-mode__topic-info">
                    <span className="focus-mode__topic-name">{t.name}</span>
                    <span className="focus-mode__topic-weight">{t.weight}% of exam</span>
                  </div>
                  <div className="focus-mode__topic-stats">
                    {t.isUnattempted ? (
                      <span className="focus-mode__topic-new-badge">NEW</span>
                    ) : (
                      <>
                        <div className="focus-mode__topic-bar-wrap">
                          <div className="focus-mode__topic-bar">
                            <div className="focus-mode__topic-bar-fill" style={{
                              width: `${t.accuracy}%`,
                              background: t.accuracy >= 70 ? '#22c55e' : t.accuracy >= 50 ? AGGIE_GOLD : '#ef4444'
                            }} />
                          </div>
                          <span className="focus-mode__topic-pct">{t.accuracy}%</span>
                        </div>
                        <span className={`focus-mode__topic-trend focus-mode__topic-trend--${t.trend}`}>
                          {t.trend === 'improving' ? '↑' : t.trend === 'declining' ? '↓' : '→'}
                        </span>
                      </>
                    )}
                    <ChevronRight size={16} className="focus-mode__topic-arrow" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
