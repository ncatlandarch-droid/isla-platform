/**
 * SpacedRepetition — SM-2 Algorithm Implementation for LARE LAB
 * Adaptively schedules questions based on performance history
 */

const STORAGE_KEY = 'lare-lab-sr-data';

/**
 * SM-2 quality ratings (mapped from quiz performance)
 * 0 = complete blackout
 * 1 = incorrect after thinking
 * 2 = incorrect but close
 * 3 = correct with difficulty
 * 4 = correct with some hesitation
 * 5 = perfect instant recall
 */
function calculateSM2(item, quality) {
  const newItem = { ...item };

  if (quality >= 3) {
    // Correct answer
    if (newItem.repetitions === 0) {
      newItem.interval = 1;
    } else if (newItem.repetitions === 1) {
      newItem.interval = 6;
    } else {
      newItem.interval = Math.round(newItem.interval * newItem.easeFactor);
    }
    newItem.repetitions += 1;
  } else {
    // Incorrect answer — reset
    newItem.repetitions = 0;
    newItem.interval = 1;
  }

  // Update ease factor (min 1.3)
  newItem.easeFactor = Math.max(
    1.3,
    newItem.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Calculate next review date
  newItem.nextReview = Date.now() + newItem.interval * 24 * 60 * 60 * 1000;
  newItem.lastReview = Date.now();

  return newItem;
}

/**
 * Create a new SR item for a question
 */
function createSRItem(questionId, topic, section) {
  return {
    questionId,
    topic,
    section,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: 0,
    lastReview: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    streak: 0
  };
}

/**
 * SpacedRepetition manager
 */
export class SpacedRepetitionManager {
  constructor() {
    this.items = {};
    this.load();
  }

  /**
   * Load SR data from localStorage
   */
  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) this.items = JSON.parse(data);
    } catch (e) {
      console.warn('SR: Failed to load data', e);
      this.items = {};
    }
  }

  /**
   * Save SR data to localStorage
   */
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn('SR: Failed to save data', e);
    }
  }

  /**
   * Record an answer for a question
   * @param {string} questionId
   * @param {string} topic 
   * @param {number} section
   * @param {boolean} correct
   * @param {number} confidence - self-rated 1-5 (optional)
   * @param {number} responseTimeMs - how long they took (optional)
   */
  recordAnswer(questionId, topic, section, correct, confidence = null, responseTimeMs = null) {
    if (!this.items[questionId]) {
      this.items[questionId] = createSRItem(questionId, topic, section);
    }

    const item = this.items[questionId];
    item.totalAttempts += 1;

    // Calculate quality rating (0-5) from correctness + confidence
    let quality;
    if (!correct) {
      quality = confidence ? Math.min(confidence - 1, 2) : 1;
    } else {
      if (confidence) {
        quality = Math.max(3, Math.min(confidence + 1, 5));
      } else if (responseTimeMs && responseTimeMs < 10000) {
        quality = 5; // Fast correct = perfect recall
      } else if (responseTimeMs && responseTimeMs < 30000) {
        quality = 4;
      } else {
        quality = 3;
      }
    }

    if (correct) {
      item.correctAttempts += 1;
      item.streak = (item.streak || 0) + 1;
    } else {
      item.streak = 0;
    }

    // Apply SM-2
    const updated = calculateSM2(item, quality);
    this.items[questionId] = { ...item, ...updated };
    this.save();

    return this.items[questionId];
  }

  /**
   * Get questions due for review for a section/topic
   */
  getDueQuestions(section = null, topic = null) {
    const now = Date.now();
    return Object.values(this.items).filter(item => {
      if (section && item.section !== section) return false;
      if (topic && item.topic !== topic) return false;
      return item.nextReview <= now;
    }).sort((a, b) => a.nextReview - b.nextReview);
  }

  /**
   * Get topic weights for the QuestionEngine (higher = weaker, needs more practice)
   */
  getTopicWeights(section) {
    const topicStats = {};

    Object.values(this.items)
      .filter(item => item.section === section)
      .forEach(item => {
        if (!topicStats[item.topic]) {
          topicStats[item.topic] = { total: 0, correct: 0, dueCount: 0 };
        }
        topicStats[item.topic].total += item.totalAttempts;
        topicStats[item.topic].correct += item.correctAttempts;
        if (item.nextReview <= Date.now()) {
          topicStats[item.topic].dueCount += 1;
        }
      });

    const weights = {};
    for (const [topic, stats] of Object.entries(topicStats)) {
      if (stats.total === 0) {
        weights[topic] = 1.0; // Never attempted = high priority
      } else {
        const accuracy = stats.correct / stats.total;
        // Invert accuracy: lower accuracy = higher weight (more practice needed)
        weights[topic] = Math.max(0.1, 1.0 - accuracy + (stats.dueCount * 0.1));
      }
    }

    return weights;
  }

  /**
   * Get mastery level for a topic (0-100)
   */
  getTopicMastery(section, topic) {
    const items = Object.values(this.items).filter(
      i => i.section === section && i.topic === topic
    );
    if (items.length === 0) return 0;

    const totalAttempts = items.reduce((s, i) => s + i.totalAttempts, 0);
    const correctAttempts = items.reduce((s, i) => s + i.correctAttempts, 0);
    if (totalAttempts === 0) return 0;

    const accuracy = correctAttempts / totalAttempts;
    const avgEase = items.reduce((s, i) => s + i.easeFactor, 0) / items.length;
    const avgStreak = items.reduce((s, i) => s + (i.streak || 0), 0) / items.length;

    // Mastery formula: weighted combo of accuracy, ease factor, and streak
    const mastery = (accuracy * 60) + ((avgEase - 1.3) / 1.2 * 25) + (Math.min(avgStreak, 5) / 5 * 15);
    return Math.min(100, Math.round(mastery));
  }

  /**
   * Get section-level mastery (0-100) 
   */
  getSectionMastery(section) {
    const items = Object.values(this.items).filter(i => i.section === section);
    if (items.length === 0) return 0;

    const totalAttempts = items.reduce((s, i) => s + i.totalAttempts, 0);
    const correctAttempts = items.reduce((s, i) => s + i.correctAttempts, 0);
    if (totalAttempts < 5) return Math.round((correctAttempts / Math.max(totalAttempts, 1)) * 30); // Low confidence score

    const accuracy = correctAttempts / totalAttempts;
    return Math.min(100, Math.round(accuracy * 100));
  }

  /**
   * Get comprehensive stats
   */
  getOverallStats() {
    const allItems = Object.values(this.items);
    const totalAttempts = allItems.reduce((s, i) => s + i.totalAttempts, 0);
    const correctAttempts = allItems.reduce((s, i) => s + i.correctAttempts, 0);
    const dueNow = allItems.filter(i => i.nextReview <= Date.now()).length;

    return {
      totalQuestionsSeen: allItems.length,
      totalAttempts,
      correctAttempts,
      overallAccuracy: totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0,
      dueForReview: dueNow,
      longestStreak: Math.max(0, ...allItems.map(i => i.streak || 0))
    };
  }

  /**
   * Clear SR data for a single section
   */
  resetSection(sectionId) {
    for (const [qId, item] of Object.entries(this.items)) {
      if (item.section === sectionId) {
        delete this.items[qId];
      }
    }
    this.save();
  }

  /**
   * Clear all SR data
   */
  reset() {
    this.items = {};
    this.save();
  }
}

export default new SpacedRepetitionManager();
