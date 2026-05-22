/**
 * PerformanceTracker — Topic-Level Analytics & Weakness Detection
 * Tracks per-topic accuracy, generates weakness reports, and calculates exam readiness
 */

const STORAGE_KEY = 'lare-lab-performance';
const MASTERY_THRESHOLD = 70; // Topics below this are "weak"
const HISTORY_LIMIT = 200; // Max recent answers to track per topic

export class PerformanceTracker {
  constructor() {
    this.history = {};  // { "1-Physical Analysis": [{ correct, timestamp, questionId, difficulty }] }
    this.sessions = []; // Session-level tracking
    this.dailyStats = {};
    this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.history = parsed.history || {};
        this.sessions = parsed.sessions || [];
        this.dailyStats = parsed.dailyStats || {};
      }
    } catch (e) {
      console.warn('PerformanceTracker: Failed to load', e);
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        history: this.history,
        sessions: this.sessions,
        dailyStats: this.dailyStats
      }));
    } catch (e) {
      console.warn('PerformanceTracker: Failed to save', e);
    }
  }

  /**
   * Record a single answer
   */
  recordAnswer(section, topic, correct, questionId, difficulty = 2) {
    const key = `${section}-${topic}`;
    if (!this.history[key]) this.history[key] = [];

    this.history[key].push({
      correct,
      timestamp: Date.now(),
      questionId,
      difficulty
    });

    // Trim to history limit
    if (this.history[key].length > HISTORY_LIMIT) {
      this.history[key] = this.history[key].slice(-HISTORY_LIMIT);
    }

    // Update daily stats
    const today = new Date().toISOString().split('T')[0];
    if (!this.dailyStats[today]) {
      this.dailyStats[today] = { total: 0, correct: 0, sections: {} };
    }
    this.dailyStats[today].total += 1;
    if (correct) this.dailyStats[today].correct += 1;
    if (!this.dailyStats[today].sections[section]) {
      this.dailyStats[today].sections[section] = { total: 0, correct: 0 };
    }
    this.dailyStats[today].sections[section].total += 1;
    if (correct) this.dailyStats[today].sections[section].correct += 1;

    this.save();
  }

  /**
   * Get accuracy for a specific topic (rolling average over last N attempts)
   */
  getTopicAccuracy(section, topic, lastN = 20) {
    const key = `${section}-${topic}`;
    const entries = this.history[key] || [];
    if (entries.length === 0) return null;

    const recent = entries.slice(-lastN);
    const correct = recent.filter(e => e.correct).length;
    return Math.round((correct / recent.length) * 100);
  }

  /**
   * Get all topic stats for a section
   */
  getSectionTopicStats(section) {
    const stats = [];
    for (const [key, entries] of Object.entries(this.history)) {
      const [sec, ...topicParts] = key.split('-');
      const topic = topicParts.join('-');
      if (parseInt(sec) !== section) continue;

      const recent = entries.slice(-20);
      const total = recent.length;
      const correct = recent.filter(e => e.correct).length;
      const accuracy = Math.round((correct / total) * 100);

      // Trend: compare last 10 to previous 10
      let trend = 'stable';
      if (entries.length >= 10) {
        const last10 = entries.slice(-10);
        const prev10 = entries.slice(-20, -10);
        if (prev10.length >= 5) {
          const lastAcc = last10.filter(e => e.correct).length / last10.length;
          const prevAcc = prev10.filter(e => e.correct).length / prev10.length;
          if (lastAcc - prevAcc > 0.1) trend = 'improving';
          else if (prevAcc - lastAcc > 0.1) trend = 'declining';
        }
      }

      stats.push({
        topic,
        section,
        accuracy,
        totalAttempts: entries.length,
        recentAttempts: total,
        recentCorrect: correct,
        trend,
        isWeak: accuracy < MASTERY_THRESHOLD,
        lastAttempt: entries[entries.length - 1]?.timestamp
      });
    }

    return stats.sort((a, b) => a.accuracy - b.accuracy);
  }

  /**
   * Get ALL topic stats across all sections
   */
  getAllTopicStats() {
    const all = [];
    for (const section of [1, 2, 3, 4]) {
      all.push(...this.getSectionTopicStats(section));
    }
    return all;
  }

  /**
   * Get the weakest topics (below mastery threshold)
   */
  getWeakTopics(section = null) {
    const all = section ? this.getSectionTopicStats(section) : this.getAllTopicStats();
    return all.filter(s => s.isWeak && s.totalAttempts >= 3).sort((a, b) => a.accuracy - b.accuracy);
  }

  /**
   * Generate a weakness report with actionable recommendations
   */
  getWeaknessReport() {
    const weakTopics = this.getWeakTopics();
    const recommendations = weakTopics.map(t => {
      let advice;
      if (t.accuracy < 30) {
        advice = `Critical weakness — start with fundamentals. Review reference materials and try easier questions first.`;
      } else if (t.accuracy < 50) {
        advice = `Needs significant work. Focus on understanding core concepts before attempting more practice.`;
      } else if (t.accuracy < 70) {
        advice = `Almost there! Do targeted practice drills to push past the mastery threshold.`;
      } else {
        advice = `Just below mastery. A few more focused sessions should solidify this.`;
      }

      return {
        section: t.section,
        topic: t.topic,
        accuracy: t.accuracy,
        trend: t.trend,
        attempts: t.totalAttempts,
        advice,
        priority: t.accuracy < 50 ? 'high' : t.accuracy < 70 ? 'medium' : 'low'
      };
    });

    return {
      totalWeakTopics: recommendations.length,
      critical: recommendations.filter(r => r.priority === 'high'),
      moderate: recommendations.filter(r => r.priority === 'medium'),
      approaching: recommendations.filter(r => r.priority === 'low'),
      all: recommendations
    };
  }

  /**
   * Get section readiness score (0-100)
   */
  getSectionReadiness(section) {
    const stats = this.getSectionTopicStats(section);
    if (stats.length === 0) return { score: 0, label: 'Not Started', color: '#94a3b8' };

    const totalWeight = stats.reduce((s, t) => s + t.totalAttempts, 0);
    if (totalWeight < 10) return { score: 10, label: 'Just Started', color: '#f97316' };

    const weightedScore = stats.reduce((s, t) => {
      const w = t.totalAttempts / totalWeight;
      return s + (t.accuracy * w);
    }, 0);

    const score = Math.round(weightedScore);
    let label, color;
    if (score >= 85) { label = 'Exam Ready'; color = '#22c55e'; }
    else if (score >= 70) { label = 'Nearly Ready'; color = '#84cc16'; }
    else if (score >= 55) { label = 'Making Progress'; color = '#f59e0b'; }
    else if (score >= 40) { label = 'Needs Work'; color = '#f97316'; }
    else { label = 'Focus Required'; color = '#ef4444'; }

    return { score, label, color };
  }

  /**
   * Get study streak (consecutive days with at least 1 question answered)
   */
  getStudyStreak() {
    const days = Object.keys(this.dailyStats).sort().reverse();
    if (days.length === 0) return 0;

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Must have studied today or yesterday to have an active streak
    if (days[0] !== today && days[0] !== yesterday) return 0;

    let checkDate = new Date(days[0]);
    for (const day of days) {
      const dayDate = new Date(day);
      const diff = (checkDate - dayDate) / 86400000;
      if (diff > 1) break;
      streak++;
      checkDate = dayDate;
    }

    return streak;
  }

  /**
   * Get daily activity for chart
   */
  getDailyActivity(days = 30) {
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      const stats = this.dailyStats[date] || { total: 0, correct: 0 };
      result.push({
        date,
        total: stats.total,
        correct: stats.correct,
        accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null
      });
    }
    return result;
  }

  /**
   * Get total questions answered
   */
  getTotalAnswered() {
    return Object.values(this.history).reduce((s, entries) => s + entries.length, 0);
  }

  /**
   * Get total correct
   */
  getTotalCorrect() {
    return Object.values(this.history).reduce(
      (s, entries) => s + entries.filter(e => e.correct).length, 0
    );
  }

  /**
   * Reset tracking data for a single section
   */
  resetSection(sectionId) {
    // Remove all history entries for this section
    for (const key of Object.keys(this.history)) {
      if (key.startsWith(`${sectionId}-`)) {
        delete this.history[key];
      }
    }
    // Clean daily stats for this section
    for (const day of Object.keys(this.dailyStats)) {
      if (this.dailyStats[day].sections?.[sectionId]) {
        const sectionStats = this.dailyStats[day].sections[sectionId];
        this.dailyStats[day].total -= sectionStats.total;
        this.dailyStats[day].correct -= sectionStats.correct;
        delete this.dailyStats[day].sections[sectionId];
      }
    }
    this.save();
  }

  /**
   * Reset all tracking data
   */
  reset() {
    this.history = {};
    this.sessions = [];
    this.dailyStats = {};
    this.save();
  }
}

export default new PerformanceTracker();
