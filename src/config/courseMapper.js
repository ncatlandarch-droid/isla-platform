/**
 * Canvas Course → ISLA Module Mapper
 * ═══════════════════════════════════════════════════════════════
 * Maps Canvas course codes/names to ISLA program module IDs.
 *
 * ECOSYSTEM PATTERN: This mapper is designed to be reusable across
 * all Think! platforms (AVA, EMMA, ISLA, etc.). Each platform
 * can define its own COURSE_MAPPINGS array.
 *
 * HOW IT WORKS:
 *   1. Each mapping rule has a regex pattern + target module ID
 *   2. We test both course_code and course name against each rule
 *   3. A course can match multiple modules (e.g., EDUC → all 3 Praxis)
 *   4. Returns de-duplicated list of matched module IDs
 *
 * CONFIGURATION:
 *   Add new mappings as NC A&T courses are identified.
 *   Patterns are tested case-insensitively.
 */

// ─── Mapping Rules ──────────────────────────────────────────
// Each rule: { pattern, module (string|string[]), college, label }
// `pattern` is tested against both course_code and course name
// `module` can be a single ID or array for broad matches
// `college` is the university.js college ID for grouping
// `label` is human-readable for the UI

const COURSE_MAPPINGS = [
  // ═══ College of Agriculture & Environmental Sciences (CAES) ═══

  // Landscape Architecture → LARE
  { pattern: /^LARC/i,                  module: 'lare', college: 'caes', label: 'Landscape Architecture' },
  { pattern: /landscape\s*architect/i,  module: 'lare', college: 'caes', label: 'Landscape Architecture' },
  { pattern: /LARE/i,                   module: 'lare', college: 'caes', label: 'LARE Exam Prep' },

  // ═══ College of Education (CEd) ═══

  // Specific Praxis Core matches
  { pattern: /praxis.*core.*read/i,       module: 'praxis-core-reading', college: 'ced', label: 'Praxis Core Reading' },
  { pattern: /praxis.*core.*writ/i,       module: 'praxis-core-writing', college: 'ced', label: 'Praxis Core Writing' },
  { pattern: /praxis.*core.*math/i,       module: 'praxis-core-math',    college: 'ced', label: 'Praxis Core Math' },

  // Education course codes → all 3 Praxis Core
  { pattern: /^EDUC\s*\d/i,   module: ['praxis-core-reading', 'praxis-core-writing', 'praxis-core-math'], college: 'ced', label: 'Education (Praxis Core)' },
  { pattern: /^ELED/i,        module: ['praxis-core-reading', 'praxis-core-writing', 'praxis-core-math'], college: 'ced', label: 'Elementary Education' },
  { pattern: /^SPED/i,        module: ['praxis-core-reading', 'praxis-core-writing', 'praxis-core-math'], college: 'ced', label: 'Special Education' },
  { pattern: /^CUIN/i,        module: ['praxis-core-reading', 'praxis-core-writing', 'praxis-core-math'], college: 'ced', label: 'Curriculum & Instruction' },
  { pattern: /teacher\s*(ed|prep|cert)/i, module: ['praxis-core-reading', 'praxis-core-writing', 'praxis-core-math'], college: 'ced', label: 'Teacher Education' },

  // ═══ College of Engineering (COE) — Future ═══
  // { pattern: /^ECEN/i, module: 'fe-electrical', college: 'coe', label: 'Electrical Engineering' },

  // ═══ College of Science & Technology (COST) — Future ═══
  // { pattern: /^NURS/i, module: 'nclex', college: 'cost', label: 'Nursing' },
];


// ─── Public API ─────────────────────────────────────────────

/**
 * Map an array of Canvas courses to ISLA module IDs.
 *
 * @param {Array} courses - Canvas course objects with { name, course_code }
 * @returns {{ modules: string[], matchDetails: Array<{course: string, modules: string[], label: string}> }}
 */
export function mapCoursesToModules(courses) {
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return { modules: [], matchDetails: [] };
  }

  const matchedModules = new Set();
  const matchDetails = [];

  for (const course of courses) {
    const courseCode = course.course_code || '';
    const courseName = course.name || '';
    const testString = `${courseCode} ${courseName}`;

    for (const rule of COURSE_MAPPINGS) {
      if (rule.pattern.test(testString)) {
        const modules = Array.isArray(rule.module) ? rule.module : [rule.module];
        modules.forEach(m => matchedModules.add(m));

        matchDetails.push({
          course: courseCode || courseName,
          courseName,
          modules,
          label: rule.label,
          college: rule.college,
        });

        break; // First match wins per course (most specific patterns first)
      }
    }
  }

  return {
    modules: [...matchedModules],
    matchDetails,
  };
}

/**
 * Check if a specific module ID is available for a set of Canvas courses.
 *
 * @param {Array} courses - Canvas course objects
 * @param {string} moduleId - ISLA module ID to check
 * @returns {boolean}
 */
export function isModuleAvailable(courses, moduleId) {
  const { modules } = mapCoursesToModules(courses);
  return modules.includes(moduleId);
}

/**
 * Get all mapping rules (for admin/debug UI).
 */
export function getMappingRules() {
  return COURSE_MAPPINGS.map(r => ({
    pattern: r.pattern.toString(),
    module: r.module,
    college: r.college,
    label: r.label,
  }));
}

export default { mapCoursesToModules, isModuleAvailable, getMappingRules };
