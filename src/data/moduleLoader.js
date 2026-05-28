/**
 * Module Loader — Dynamic data loading for ISLA Universal Credentialing Engine
 * ═══════════════════════════════════════════════════════════════════════════════
 * Each program module exports the same shape:
 *   EXAM_SECTIONS, QUESTION_BANK, FLASHCARD_DATA, GLOSSARY_DATA,
 *   SECTION_INTROS, EXAM_META, AGGIE_BLUE, AGGIE_GOLD
 *
 * This loader maps program IDs (from university.js) to their data modules.
 */

// Static imports for all active modules
// (Vite requires static import paths for tree-shaking)
import * as lareModule from './examSections.js';
import { QUESTION_BANK as LARE_QB } from './questionBank.js';
import { FLASHCARD_DATA as LARE_FC, SECTION_INTROS as LARE_INTROS } from './flashcardData.js';
import { GLOSSARY_DATA as LARE_GL } from './glossaryData.js';

// Praxis Core modules
import * as praxisReading from './praxis-core-reading/index.js';
import * as praxisWriting from './praxis-core-writing/index.js';
import * as praxisMath from './praxis-core-math/index.js';

/**
 * Assembled LARE module (existing data, assembled into standard shape)
 */
const LARE_MODULE = {
  EXAM_SECTIONS: lareModule.EXAM_SECTIONS,
  QUESTION_BANK: LARE_QB,
  FLASHCARD_DATA: LARE_FC,
  GLOSSARY_DATA: LARE_GL,
  SECTION_INTROS: LARE_INTROS,
  EXAM_META: {
    name: 'LARE',
    fullName: 'Landscape Architect Registration Examination',
    testCode: 'LARE',
    passingScore: 'Varies by state',
    scoreRange: 'Pass/Fail per section',
    totalSections: 4,
    provider: 'CLARB',
    registrationUrl: 'https://www.clarb.org/',
  },
  AGGIE_BLUE: lareModule.AGGIE_BLUE,
  AGGIE_GOLD: lareModule.AGGIE_GOLD,
};

/**
 * Module registry — maps program IDs to their data modules
 */
const MODULE_REGISTRY = {
  lare: LARE_MODULE,
  'praxis-core-reading': praxisReading,
  'praxis-core-writing': praxisWriting,
  'praxis-core-math': praxisMath,
};

/**
 * Load a module by program ID
 * @param {string} programId — e.g., 'lare', 'praxis-core-reading'
 * @returns {object|null} Module data or null if not found
 */
export function loadModule(programId) {
  return MODULE_REGISTRY[programId] || null;
}

/**
 * Check if a module exists and is loadable
 * @param {string} programId
 * @returns {boolean}
 */
export function isModuleAvailable(programId) {
  return programId in MODULE_REGISTRY;
}

/**
 * Get list of all available module IDs
 * @returns {string[]}
 */
export function getAvailableModules() {
  return Object.keys(MODULE_REGISTRY);
}

export default loadModule;
