/**
 * MasteryDashboard — Topic-level mastery heat map, weakness report, exam readiness
 * Replaces the old Analytics tab with comprehensive adaptive learning analytics
 */
import React, { useMemo } from 'react';
import {
  BarChart3, Target, AlertTriangle, TrendingUp, TrendingDown,
  Award, Zap, Clock, BookOpen, Play, ChevronRight, Minus
} from 'lucide-react';
import { AGGIE_BLUE, AGGIE_GOLD } from '../data/examSections.js';

/** Mastery color based on percentage */
function masteryColor(pct) {
  if (pct === null) return '#e2e8f0';
  if (pct >= 85) return '#22c55e';
  if (pct >= 70) return '#84cc16';
  if (pct >= 55) return '#f59e0b';
  if (pct >= 40) return '#f97316';
  return '#ef4444';
}

function masteryLabel(pct) {
  if (pct === null) return 'Not Started';
  if (pct >= 85) return 'Mastered';
  if (pct >= 70) return 'Proficient';
  if (pct >= 55) return 'Developing';
  if (pct >= 40) return 'Emerging';
  return 'Needs Focus';
}

export default function MasteryDashboard({
  performanceTracker,
  spacedRepetition,
  onStartQuiz,
  onStartFocus,
  onStartExam,
  onStartDrill,
  examSections = []
}) {
  const allStats = useMemo(() => performanceTracker.getAllTopicStats(), []);
  const weaknessReport = useMemo(() => performanceTracker.getWeaknessReport(), []);
  const studyStreak = useMemo(() => performanceTracker.getStudyStreak(), []);
  const dailyActivity = useMemo(() => performanceTracker.getDailyActivity(30), []);
  const totalAnswered = performanceTracker.getTotalAnswered();
  const totalCorrect = performanceTracker.getTotalCorrect();
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const srStats = useMemo(() => spacedRepetition.getOverallStats(), []);

  // Build section readiness
  const sectionReadiness = examSections.map(s => ({
    ...s,
    readiness: performanceTracker.getSectionReadiness(s.id)
  }));

  // Build heat map data
  const heatMapData = examSections.map(section => ({
    section,
    topics: section.topics.map(t => {
      const stat = allStats.find(s => s.section === section.id && s.topic === t.name);
      return {
        name: t.name,
        weight: t.weight,
        accuracy: stat?.accuracy ?? null,
        attempts: stat?.totalAttempts ?? 0,
        trend: stat?.trend ?? null
      };
    })
  }));

  // Activity chart — simple bar chart
  const maxDaily = Math.max(1, ...dailyActivity.map(d => d.total));

  return (
    <div className="mastery-dash" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
      {/* Hero Stats */}
      <div className="mastery-dash__hero">
        <div className="mastery-dash__hero-text">
          <h2 className="mastery-dash__title">Mastery Dashboard</h2>
          <p className="mastery-dash__subtitle">Your exam preparation at a glance</p>
        </div>
        <div className="mastery-dash__hero-stats">
          <div className="mastery-dash__hero-stat">
            <Zap size={24} color={AGGIE_GOLD} />
            <span className="mastery-dash__hero-stat-val">{studyStreak}</span>
            <span className="mastery-dash__hero-stat-label">Day Streak</span>
          </div>
          <div className="mastery-dash__hero-stat">
            <BarChart3 size={24} color={AGGIE_BLUE} />
            <span className="mastery-dash__hero-stat-val">{totalAnswered}</span>
            <span className="mastery-dash__hero-stat-label">Questions</span>
          </div>
          <div className="mastery-dash__hero-stat">
            <Target size={24} color={overallAccuracy >= 70 ? '#22c55e' : '#f97316'} />
            <span className="mastery-dash__hero-stat-val">{overallAccuracy}%</span>
            <span className="mastery-dash__hero-stat-label">Accuracy</span>
          </div>
          <div className="mastery-dash__hero-stat">
            <BookOpen size={24} color="#8b5cf6" />
            <span className="mastery-dash__hero-stat-val">{srStats.dueForReview}</span>
            <span className="mastery-dash__hero-stat-label">Due Review</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mastery-dash__actions">
        {examSections.map(s => (
          <button key={s.id} className="mastery-dash__action-btn" 
            onClick={() => onStartQuiz(s.id)} style={{ borderColor: s.color }}>
            <span className="mastery-dash__action-section">Section {s.id}</span>
            <span className="mastery-dash__action-title">{s.shortTitle}</span>
            <ChevronRight size={16} />
          </button>
        ))}
        <button className="mastery-dash__action-btn mastery-dash__action-btn--focus"
          onClick={onStartFocus}>
          <Target size={18} />
          <span className="mastery-dash__action-title">Focus Mode</span>
          <ChevronRight size={16} />
        </button>
        {onStartDrill && (
          <button className="mastery-dash__action-btn mastery-dash__action-btn--drill"
            onClick={onStartDrill}>
            <Zap size={18} />
            <span className="mastery-dash__action-title">Quick Drill</span>
            <ChevronRight size={16} />
          </button>
        )}
        {onStartExam && (
          <button className="mastery-dash__action-btn mastery-dash__action-btn--exam"
            onClick={onStartExam}>
            <Clock size={18} />
            <span className="mastery-dash__action-title">Exam Sim</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Section Readiness */}
      <div className="mastery-dash__readiness">
        <h3 className="mastery-dash__section-title">
          <Award size={20} /> Exam Readiness
        </h3>
        <div className="mastery-dash__readiness-grid">
          {sectionReadiness.map(s => (
            <div key={s.id} className="mastery-dash__readiness-card"
              style={{ borderTopColor: s.readiness.color }}>
              <span className="mastery-dash__readiness-section">Section {s.id}</span>
              <span className="mastery-dash__readiness-name">{s.shortTitle}</span>
              <div className="mastery-dash__readiness-score" style={{ color: s.readiness.color }}>
                {s.readiness.score}%
              </div>
              <span className="mastery-dash__readiness-label" style={{ color: s.readiness.color }}>
                {s.readiness.label}
              </span>
              <div className="mastery-dash__readiness-bar">
                <div style={{ width: `${s.readiness.score}%`, background: s.readiness.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Mastery Heat Map */}
      <div className="mastery-dash__heatmap">
        <h3 className="mastery-dash__section-title">
          <BarChart3 size={20} /> Topic Mastery Map
        </h3>
        {heatMapData.map(({ section, topics }) => (
          <div key={section.id} className="mastery-dash__heatmap-section">
            <div className="mastery-dash__heatmap-header">
              <span>Section {section.id}: {section.shortTitle}</span>
            </div>
            <div className="mastery-dash__heatmap-topics">
              {topics.map((t, i) => (
                <div key={i} className="mastery-dash__heatmap-topic"
                  onClick={() => onStartQuiz(section.id, t.name)}>
                  <div className="mastery-dash__heatmap-cell"
                    style={{ background: masteryColor(t.accuracy) }}>
                    {t.accuracy !== null ? `${t.accuracy}%` : '—'}
                  </div>
                  <div className="mastery-dash__heatmap-info">
                    <span className="mastery-dash__heatmap-name">{t.name}</span>
                    <span className="mastery-dash__heatmap-meta">
                      {t.weight}% of exam • {t.attempts} attempts
                      {t.trend === 'improving' && <TrendingUp size={12} color="#22c55e" />}
                      {t.trend === 'declining' && <TrendingDown size={12} color="#ef4444" />}
                      {t.trend === 'stable' && <Minus size={12} color="#94a3b8" />}
                    </span>
                  </div>
                  <span className="mastery-dash__heatmap-label" style={{ color: masteryColor(t.accuracy) }}>
                    {masteryLabel(t.accuracy)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Weakness Report */}
      {weaknessReport.totalWeakTopics > 0 && (
        <div className="mastery-dash__weakness">
          <h3 className="mastery-dash__section-title">
            <AlertTriangle size={20} color="#f97316" /> Weakness Report
          </h3>
          <div className="mastery-dash__weakness-list">
            {weaknessReport.all.slice(0, 5).map((w, i) => (
              <div key={i} className={`mastery-dash__weakness-item mastery-dash__weakness-item--${w.priority}`}>
                <div className="mastery-dash__weakness-info">
                  <span className="mastery-dash__weakness-topic">{w.topic}</span>
                  <span className="mastery-dash__weakness-meta">
                    Section {w.section} • {w.accuracy}% accuracy • {w.attempts} attempts
                  </span>
                  <p className="mastery-dash__weakness-advice">{w.advice}</p>
                </div>
                <button className="btn btn--gold mastery-dash__weakness-btn"
                  onClick={() => onStartQuiz(w.section, w.topic)}>
                  <Play size={14} /> Drill
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Chart */}
      <div className="mastery-dash__activity">
        <h3 className="mastery-dash__section-title">
          <Clock size={20} /> 30-Day Activity
        </h3>
        <div className="mastery-dash__activity-chart">
          {dailyActivity.map((d, i) => (
            <div key={i} className="mastery-dash__activity-bar-wrap"
              title={`${d.date}: ${d.total} questions, ${d.accuracy !== null ? d.accuracy + '% accuracy' : 'no activity'}`}>
              <div className="mastery-dash__activity-bar"
                style={{
                  height: `${(d.total / maxDaily) * 100}%`,
                  background: d.total > 0 ? (d.accuracy >= 70 ? '#22c55e' : d.accuracy >= 50 ? AGGIE_GOLD : '#f97316') : '#e2e8f0',
                  minHeight: d.total > 0 ? '4px' : '2px'
                }} />
            </div>
          ))}
        </div>
        <div className="mastery-dash__activity-labels">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
