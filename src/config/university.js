/**
 * University Configuration — NC A&T State University
 * ═══════════════════════════════════════════════════
 * Swap this ONE file to rebrand ISLA for another university.
 * Each college lists its programs with exam/licensure associations.
 * status: 'active' = module built, 'coming-soon' = placeholder
 */

const UNIVERSITY = {
  name: 'North Carolina A&T State University',
  shortName: 'NC A&T',
  logo: '/ncat-logo.png',
  mascot: {
    name: 'ISLA',
    avatar: '/Perry.png',
    role: 'Your Study Coach',
  },
  colors: {
    primary: '#004684',
    accent: '#FDB927',
  },
  tagline: 'NC A&T STATE UNIVERSITY',

  colleges: [
    {
      id: 'caes',
      name: 'College of Agriculture & Environmental Sciences',
      shortName: 'CAES',
      icon: '🌿',
      color: '#2E8B57',
      programs: [
        { id: 'lare', name: 'Landscape Architecture', degree: 'BSLA', exam: 'LARE', module: 'lare', status: 'active', icon: '🏗️' },
        { id: 'envs', name: 'Environmental Science', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🌍' },
        { id: 'anim', name: 'Animal Science', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🐄' },
        { id: 'agbu', name: 'Agricultural Business', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🌾' },
        { id: 'fcsn', name: 'Food & Nutritional Sciences', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🍎' },
        { id: 'cdfs', name: 'Child Development & Family Studies', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '👶' },
      ]
    },
    {
      id: 'coe',
      name: 'College of Engineering',
      shortName: 'CoE',
      icon: '⚙️',
      color: '#2563eb',
      programs: [
        { id: 'civl', name: 'Civil Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '🌉' },
        { id: 'mech', name: 'Mechanical Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '🔧' },
        { id: 'elec', name: 'Electrical Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '⚡' },
        { id: 'comp', name: 'Computer Engineering', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '💻' },
        { id: 'chme', name: 'Chemical Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '🧪' },
        { id: 'isen', name: 'Industrial & Systems Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '📊' },
      ]
    },
    {
      id: 'chhs',
      name: 'College of Health & Human Sciences',
      shortName: 'CHHS',
      icon: '🏥',
      color: '#dc2626',
      programs: [
        { id: 'nurs', name: 'Nursing', degree: 'BSN', exam: 'NCLEX-RN', module: null, status: 'coming-soon', icon: '💉' },
        { id: 'kine', name: 'Kinesiology', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🏃' },
        { id: 'slpa', name: 'Speech-Language Pathology', degree: 'BS', exam: 'Praxis SLP', module: null, status: 'coming-soon', icon: '🗣️' },
        { id: 'socw', name: 'Social Work', degree: 'BSW', exam: 'ASWB', module: null, status: 'coming-soon', icon: '🤝' },
      ]
    },
    {
      id: 'cobe',
      name: 'College of Business & Economics',
      shortName: 'COBE',
      icon: '💼',
      color: '#7c3aed',
      programs: [
        { id: 'acct', name: 'Accounting', degree: 'BS', exam: 'CPA Exam', module: null, status: 'coming-soon', icon: '📊' },
        { id: 'fina', name: 'Finance', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '💰' },
        { id: 'mgmt', name: 'Management', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '📋' },
        { id: 'mktg', name: 'Marketing', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '📢' },
        { id: 'econ', name: 'Economics', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '📈' },
      ]
    },
    {
      id: 'soe',
      name: 'School of Education',
      shortName: 'SoE',
      icon: '📚',
      color: '#ea580c',
      programs: [
        { id: 'eled', name: 'Elementary Education', degree: 'BS', exam: 'Praxis', module: null, status: 'coming-soon', icon: '🎓' },
        { id: 'sped', name: 'Special Education', degree: 'BS', exam: 'Praxis', module: null, status: 'coming-soon', icon: '🧩' },
        { id: 'cuin', name: 'Curriculum & Instruction', degree: 'BS', exam: 'Praxis', module: null, status: 'coming-soon', icon: '📝' },
      ]
    },
    {
      id: 'cahss',
      name: 'College of Arts, Humanities & Social Sciences',
      shortName: 'CAHSS',
      icon: '🎭',
      color: '#0891b2',
      programs: [
        { id: 'poli', name: 'Political Science', degree: 'BA', exam: 'LSAT Prep', module: null, status: 'coming-soon', icon: '⚖️' },
        { id: 'psyc', name: 'Psychology', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🧠' },
        { id: 'hist', name: 'History', degree: 'BA', exam: null, module: null, status: 'coming-soon', icon: '📜' },
        { id: 'engl', name: 'English', degree: 'BA', exam: null, module: null, status: 'coming-soon', icon: '✍️' },
        { id: 'musc', name: 'Music', degree: 'BA', exam: null, module: null, status: 'coming-soon', icon: '🎵' },
      ]
    },
    {
      id: 'cost',
      name: 'College of Science & Technology',
      shortName: 'COST',
      icon: '🔬',
      color: '#059669',
      programs: [
        { id: 'biol', name: 'Biology', degree: 'BS', exam: 'MCAT Prep', module: null, status: 'coming-soon', icon: '🧬' },
        { id: 'chem', name: 'Chemistry', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '⚗️' },
        { id: 'math', name: 'Mathematics', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🔢' },
        { id: 'csci', name: 'Computer Science', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🖥️' },
        { id: 'phys', name: 'Physics', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '⚛️' },
      ]
    },
    {
      id: 'jsnn',
      name: 'Joint School of Nanoscience & Nanoengineering',
      shortName: 'JSNN',
      icon: '🔭',
      color: '#4f46e5',
      programs: [
        { id: 'nano', name: 'Nanoengineering', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🔬' },
        { id: 'biom', name: 'Biomedical Engineering', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🫀' },
      ]
    }
  ]
};

export default UNIVERSITY;
