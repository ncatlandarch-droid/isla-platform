/**
 * AI Question Generator — Gemini-powered unlimited LARE questions
 * 
 * Generates unique practice questions using Gemini 2.5 Flash.
 * Tracks previously asked questions to avoid duplicates.
 * Falls back gracefully if API is unavailable.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const MODEL = 'gemini-2.5-flash';

// Import the NotebookLM-sourced knowledge base for grounded question generation
import { LARE_KNOWLEDGE } from '../data/lareKnowledge.js';

// Section topic details for targeted question generation
const SECTION_TOPICS = {
  1: {
    name: 'Project & Construction Management',
    topics: [
      'Project Management (contracts, scope, fees, scheduling, risk management)',
      'Physical Analysis (soils, hydrology, topography, climate, geology)',
      'Inventory & Data Collection (site survey, GIS, aerial photos, Phase I ESA)',
      'Contextual Analysis (zoning, historic preservation, environmental regulations)',
      'Stakeholder Engagement (charrettes, public meetings, community participation)',
      'Legal & Regulatory (ADA, building codes, NEPA, CEQA, permitting)',
      'Professional Practice (liability, standard of care, ethics, licensing)'
    ]
  },
  2: {
    name: 'Design',
    topics: [
      'Stewardship & Design Principles (sustainability, biomimicry, carrying capacity)',
      'Master Planning (land use, TOD, connectivity, programming)',
      'Schematic Design (spatial organization, circulation, views, climate response)',
      'Design Development (materials, planting design, ADA compliance, detailing)',
      'Kevin Lynch urban elements, wayfinding, sense of place',
      'Ecological design (native plants, habitat, ecotones, restoration)',
      'Universal design and accessibility beyond code minimum'
    ]
  },
  3: {
    name: 'Construction Documents & Administration',
    topics: [
      'Construction Plans & Details (grading plans, planting plans, detailing)',
      'Construction Specifications & Bidding (CSI MasterFormat, Division 32, addenda)',
      'Construction Administration (site observation, RFIs, submittals, change orders)',
      'Materials selection (pavers, aggregates, geotextiles, soils)',
      'Structural elements (retaining walls, footings, seat walls)',
      'Substantial completion, punch lists, close-out procedures',
      'Shop drawings, submittals, and substitution review'
    ]
  },
  4: {
    name: 'Grading, Drainage & Stormwater Management',
    topics: [
      'Grading & Earthwork (slope calculations, cut/fill, spot elevations)',
      'Stormwater Management (Rational Method Q=CiA, BMPs, LID, bioretention)',
      'Drainage Systems (French drains, catch basins, pipe sizing, inlets)',
      'Contour interpretation and manipulation',
      'ADA grading requirements (parking, accessible routes, ramps)',
      'Erosion and sediment control (SWPPPs, stabilization, construction sequencing)',
      'Hydrologic calculations (Tc, curve numbers, storage volume)'
    ]
  }
};

/**
 * Call Gemini API and parse the question response.
 * @private
 */
async function callGemini(prompt, maxTokens = 1500) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.8,
          responseMimeType: 'application/json'
        }
      })
    }
  );

  if (!response.ok) throw new Error(`API ${response.status}`);

  const data = await response.json();
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No content from API');

  console.log('[QuestionGen] Raw API response:', text.substring(0, 300));

  // Clean up response — remove markdown code fences if present
  text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

  // Attempt to parse and repair JSON
  let question;
  try {
    question = JSON.parse(text);
  } catch (parseErr) {
    let repaired = text;
    const quoteCount = (repaired.match(/"/g) || []).length;
    if (quoteCount % 2 !== 0) repaired += '"';
    const openBrackets = (repaired.match(/\[/g) || []).length - (repaired.match(/\]/g) || []).length;
    const openBraces = (repaired.match(/\{/g) || []).length - (repaired.match(/\}/g) || []).length;
    for (let i = 0; i < openBrackets; i++) repaired += ']';
    for (let i = 0; i < openBraces; i++) repaired += '}';
    question = JSON.parse(repaired);
  }

  return question;
}

/**
 * Validate and normalize a question object from Gemini.
 * @private
 */
function validateQuestion(question, section, topic) {
  // Auto-fill missing fields with defaults
  if (!question.topic) question.topic = topic || 'General';
  if (!question.explanation) question.explanation = 'Review your LARE study materials for more detail on this topic.';

  // Core validation — must have text, 4 options, and correct index
  if (!question.text) return null;
  if (!question.options || !Array.isArray(question.options)) return null;
  // Accept 3+ options, pad to 4 if needed
  while (question.options.length < 4) question.options.push('None of the above');
  if (question.options.length > 4) question.options = question.options.slice(0, 4);
  if (typeof question.correct !== 'number' || question.correct < 0 || question.correct > 3) {
    question.correct = 0; // Default to A if missing/invalid
  }

  question.id = `ai-${section}-${Date.now()}`;
  question.isAI = true;
  return question;
}

/**
 * Generate a new AI question for the given section.
 * Tries with full knowledge context first, then retries with simpler prompt.
 * @param {number} section - Section number (1-4)
 * @param {string[]} previousQuestions - Array of previously asked question texts to avoid
 * @returns {Promise<Object|null>} Question object or null if generation fails
 */
export async function generateQuestion(section, previousQuestions = []) {
  const sectionInfo = SECTION_TOPICS[section];
  if (!sectionInfo) return null;

  const topic = sectionInfo.topics[Math.floor(Math.random() * sectionInfo.topics.length)];
  const recentQs = previousQuestions.slice(-5).map((q, i) => `${i + 1}. ${q}`).join('\n');
  const avoidClause = recentQs
    ? `\nDO NOT repeat these recent questions:\n${recentQs}`
    : '';

  // Build knowledge context (trimmed to avoid huge prompts)
  const knowledge = LARE_KNOWLEDGE[section];
  const blueprintStr = knowledge
    ? Object.entries(knowledge.blueprint).map(([k, v]) => `${k}: ${v}`).join(', ')
    : '';
  // Only include first ~1500 chars of knowledge to keep prompt manageable
  const knowledgeSnippet = knowledge?.keyConceptsAndFacts
    ? knowledge.keyConceptsAndFacts.substring(0, 1500)
    : '';

  const jsonFormat = `{"topic":"...","text":"Question?","options":["A","B","C","D"],"correct":0,"explanation":"Why A is correct."}`;

  // Attempt 1: Full prompt with knowledge context
  const fullPrompt = `Generate 1 LARE exam question for Section ${section}: ${sectionInfo.name}.
Topic: ${topic}
Blueprint: ${blueprintStr}

Key study material:
${knowledgeSnippet}

Rules: 4 options (A-D), 1 correct (0-indexed), include explanation. Test understanding with real scenarios.${avoidClause}

Respond as JSON: ${jsonFormat}`;

  try {
    const q = await callGemini(fullPrompt);
    const valid = validateQuestion(q, section, topic.split('(')[0].trim());
    if (valid) {
      console.log('[QuestionGen] ✅ Generated AI question:', valid.text.substring(0, 60));
      return valid;
    }
    throw new Error('Validation failed on attempt 1');
  } catch (err1) {
    console.warn(`[QuestionGen] Attempt 1 failed: ${err1.message}`);

    // Attempt 2: Simpler prompt without knowledge context
    const simplePrompt = `Create a multiple-choice LARE exam question about "${topic}" for Section ${section}: ${sectionInfo.name}.

Return JSON only: ${jsonFormat}

"correct" is 0-based index (0=A,1=B,2=C,3=D). Include "explanation".${avoidClause}`;

    try {
      const q2 = await callGemini(simplePrompt, 800);
      const valid2 = validateQuestion(q2, section, topic.split('(')[0].trim());
      if (valid2) {
        console.log('[QuestionGen] ✅ Generated AI question (attempt 2):', valid2.text.substring(0, 60));
        return valid2;
      }
      throw new Error('Validation failed on attempt 2');
    } catch (err2) {
      console.warn(`[QuestionGen] Attempt 2 failed: ${err2.message}`);
      return null;
    }
  }
}

/**
 * Get the list of previously asked question texts from localStorage
 */
export function getAskedQuestions(section) {
  try {
    const data = JSON.parse(localStorage.getItem('lare-asked-questions') || '{}');
    return data[section] || [];
  } catch (e) {
    return [];
  }
}

/**
 * Record a question as asked
 */
export function recordAskedQuestion(section, questionText) {
  try {
    const data = JSON.parse(localStorage.getItem('lare-asked-questions') || '{}');
    if (!data[section]) data[section] = [];
    if (!data[section].includes(questionText)) {
      data[section].push(questionText);
      // Keep last 100 per section to avoid localStorage bloat
      if (data[section].length > 100) data[section] = data[section].slice(-100);
    }
    localStorage.setItem('lare-asked-questions', JSON.stringify(data));
  } catch (e) {}
}
