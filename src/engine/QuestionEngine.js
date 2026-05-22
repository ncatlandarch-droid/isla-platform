/**
 * QuestionEngine — Parametric + AI Question Generator for LARE LAB
 * 
 * Combines three question sources:
 * 1. Static question bank (hand-written, high quality)
 * 2. Parametric templates (formula-based variations)
 * 3. Gemini AI generation (unlimited unique questions)
 * 
 * AI questions are generated when static + template pools run low,
 * ensuring the user always gets fresh, unique practice material.
 */

import { QUESTION_BANK } from '../data/questionBank.js';
import { QUESTION_TEMPLATES } from '../data/questionTemplates.js';
import { generateQuestion, getAskedQuestions, recordAskedQuestion } from './questionGenerator.js';

// Seeded random for reproducible generation
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pickRandom(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate a question from a template with random parameters
 */
function generateFromTemplate(template, seed) {
  const rng = seededRandom(seed);
  const params = {};

  for (const [key, range] of Object.entries(template.params)) {
    if (Array.isArray(range) && typeof range[0] === 'string') {
      params[key] = pickRandom(range, rng);
    } else if (Array.isArray(range) && range.length === 2) {
      const [min, max] = range;
      if (Number.isInteger(min) && Number.isInteger(max)) {
        params[key] = Math.floor(rng() * (max - min + 1)) + min;
      } else {
        params[key] = +(min + rng() * (max - min)).toFixed(2);
      }
    } else {
      params[key] = range;
    }
  }

  const generated = template.generate(params, rng);

  return {
    id: `gen-${template.id}-${seed}`,
    section: template.section,
    topic: template.topic,
    difficulty: template.difficulty || 2,
    text: generated.text,
    options: generated.options,
    correct: generated.correct,
    explanation: generated.explanation,
    detailedSteps: generated.detailedSteps || null,
    wrongAnswerExplanations: generated.wrongAnswerExplanations || null,
    formulaCard: template.formulaCard || null,
    videoHint: template.videoHint || null,
    isGenerated: true,
    templateId: template.id,
    seed
  };
}

/**
 * QuestionEngine — manages question pools, templates, and AI generation
 */
export class QuestionEngine {
  constructor() {
    this.staticQuestions = QUESTION_BANK;
    this.templates = QUESTION_TEMPLATES;
    this.generationCounter = Date.now();
    this._askedIds = new Set(); // Track what's been shown this session
  }

  /** Reset session tracking so all questions become available again */
  resetSession() {
    this._askedIds = new Set();
  }

  getStaticQuestions(section) {
    return this.staticQuestions[section] || [];
  }

  getTopicsForSection(section) {
    const topics = new Set();
    const statics = this.staticQuestions[section] || [];
    statics.forEach(q => topics.add(q.topic));
    const templates = this.templates.filter(t => t.section === section);
    templates.forEach(t => topics.add(t.topic));
    return [...topics];
  }

  /**
   * Generate N unique questions for a section
   * Mixes static, template, and AI-generated questions
   */
  generateQuestions(section, count = 10, options = {}) {
    const { topic = null, difficulty = null, excludeIds = [] } = options;
    const pool = [];
    const excludeSet = new Set([...excludeIds, ...this._askedIds]);

    // 1) Add static questions (not already shown)
    let statics = this.staticQuestions[section] || [];
    if (topic) statics = statics.filter(q => q.topic === topic);
    if (difficulty) statics = statics.filter(q => (q.difficulty || 2) === difficulty);
    statics.forEach(q => {
      if (!excludeSet.has(q.id)) pool.push({ ...q, isGenerated: false });
    });

    // 2) Generate from templates
    const sectionTemplates = this.templates.filter(t => {
      if (t.section !== section) return false;
      if (topic && t.topic !== topic) return false;
      if (difficulty && (t.difficulty || 2) !== difficulty) return false;
      return true;
    });

    const targetGenerated = Math.max(count * 3, 30);
    for (let i = 0; i < targetGenerated; i++) {
      if (sectionTemplates.length === 0) break;
      const template = sectionTemplates[i % sectionTemplates.length];
      const seed = this.generationCounter++;
      const q = generateFromTemplate(template, seed);
      if (!excludeSet.has(q.id)) pool.push(q);
    }

    // Shuffle and return
    const rng = seededRandom(Date.now());
    const shuffled = shuffle(pool, rng);

    // Mark returned questions as asked
    const result = shuffled.slice(0, count);
    result.forEach(q => this._askedIds.add(q.id));

    return result;
  }

  /**
   * Generate a single AI question using Gemini
   * Call this when you need a truly unique question beyond templates
   */
  async generateAIQuestion(section, topic = null) {
    try {
      const previouslyAsked = getAskedQuestions(section);
      const q = await generateQuestion(section, previouslyAsked);
      if (q) {
        recordAskedQuestion(section, q.text);
        this._askedIds.add(q.id);
        return q;
      }
    } catch (err) {
      console.warn(`[QuestionEngine] AI generation failed: ${err.message}`);
    }
    return null;
  }

  generateFocusQuestions(section, weakTopics, count = 10) {
    const questions = [];
    const perTopic = Math.ceil(count / weakTopics.length);

    for (const topic of weakTopics) {
      const topicQs = this.generateQuestions(section, perTopic, { topic });
      questions.push(...topicQs);
    }

    const rng = seededRandom(Date.now());
    return shuffle(questions, rng).slice(0, count);
  }

  getNextQuestion(section, topicWeights = {}) {
    const topics = this.getTopicsForSection(section);
    const rng = seededRandom(Date.now() + Math.random() * 10000);

    let selectedTopic;
    if (Object.keys(topicWeights).length > 0) {
      const entries = topics.map(t => ({
        topic: t,
        weight: topicWeights[t] || 0.5
      }));
      const totalWeight = entries.reduce((s, e) => s + e.weight, 0);
      let r = rng() * totalWeight;
      for (const entry of entries) {
        r -= entry.weight;
        if (r <= 0) { selectedTopic = entry.topic; break; }
      }
      if (!selectedTopic) selectedTopic = entries[entries.length - 1].topic;
    } else {
      selectedTopic = pickRandom(topics, rng);
    }

    const questions = this.generateQuestions(section, 1, { topic: selectedTopic });
    return questions[0] || null;
  }

  /**
   * Get next question with AI fallback
   * If templates run out, generates a fresh AI question
   */
  async getNextQuestionAsync(section, topicWeights = {}) {
    // Try template/static first
    const q = this.getNextQuestion(section, topicWeights);
    if (q) return q;

    // Fall back to AI
    return await this.generateAIQuestion(section);
  }

  getStats() {
    const stats = {};
    for (const section of [1, 2, 3, 4]) {
      const statics = (this.staticQuestions[section] || []).length;
      const templates = this.templates.filter(t => t.section === section).length;
      stats[section] = {
        staticQuestions: statics,
        templates: templates,
        estimatedTotal: statics + templates * 50 + '+ AI unlimited'
      };
    }
    return stats;
  }
}

export default new QuestionEngine();
