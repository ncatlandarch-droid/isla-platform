/**
 * University Configuration — NC A&T State University
 * ═══════════════════════════════════════════════════
 * Swap this ONE file to rebrand ISLA for another university.
 * Each college lists its programs with exam/licensure associations.
 * status: 'active' = module built, 'coming-soon' = placeholder
 *
 * College icons, colors, and abbreviations match EMMA exactly.
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
      icon: '/college-icons/icon-agriculture-color.svg',
      color: '#95CB89',
      programs: [
        { id: 'lare', name: 'Landscape Architecture', degree: 'BSLA', exam: 'LARE', module: 'lare', status: 'active', icon: '🏗️' },
        { id: 'envs', name: 'Environmental Science', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🌍' },
        { id: 'anim', name: 'Animal Science', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🐄' },
        { id: 'agbu', name: 'Agribusiness', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🌾' },
        { id: 'bioe', name: 'Biological Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '🧬' },
        { id: 'fcsn', name: 'Food & Nutritional Sciences', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🍎' },
        { id: 'cdfs', name: 'Child Development & Family Studies', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '👶' },
        { id: 'aged', name: 'Agricultural Education', degree: 'BS', exam: 'Praxis', module: null, status: 'coming-soon', icon: '📖' },
      ]
    },
    {
      id: 'cobe',
      name: 'Willie A. Deese College of Business & Economics',
      shortName: 'CoBE',
      icon: '/college-icons/icon-business-color.svg',
      color: '#888890',
      programs: [
        { id: 'acct', name: 'Accounting', degree: 'BS', exam: 'CPA Exam', module: null, status: 'coming-soon', icon: '📊' },
        { id: 'fina', name: 'Finance', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '💰' },
        { id: 'mgmt', name: 'Management', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '📋' },
        { id: 'mktg', name: 'Marketing', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '📢' },
        { id: 'econ', name: 'Economics', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '📈' },
      ]
    },
    {
      id: 'coe',
      name: 'College of Engineering',
      shortName: 'CoE',
      icon: '/college-icons/icon-engineering-color.svg',
      color: '#BC5C45',
      programs: [
        { id: 'civl', name: 'Civil Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '🌉' },
        { id: 'mech', name: 'Mechanical Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '🔧' },
        { id: 'elec', name: 'Electrical Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '⚡' },
        { id: 'comp', name: 'Computer Engineering', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '💻' },
        { id: 'chme', name: 'Chemical Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '🧪' },
        { id: 'isen', name: 'Industrial & Systems Engineering', degree: 'BS', exam: 'FE Exam', module: null, status: 'coming-soon', icon: '📐' },
      ]
    },
    {
      id: 'chhs',
      name: 'Hairston College of Health & Human Sciences',
      shortName: 'CHHS',
      icon: '/college-icons/icon-health-color.svg',
      color: '#5CB8DC',
      programs: [
        { id: 'nurs', name: 'Nursing', degree: 'BSN', exam: 'NCLEX-RN', module: null, status: 'coming-soon', icon: '💉' },
        { id: 'kine', name: 'Kinesiology', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🏃' },
        { id: 'slpa', name: 'Speech-Language Pathology', degree: 'BS', exam: 'Praxis SLP', module: null, status: 'coming-soon', icon: '🗣️' },
        { id: 'socw', name: 'Social Work', degree: 'BSW', exam: 'ASWB', module: null, status: 'coming-soon', icon: '🤝' },
      ]
    },
    {
      id: 'cahss',
      name: 'College of Arts, Humanities & Social Sciences',
      shortName: 'CAHSS',
      icon: '/college-icons/icon-arts-color.svg',
      color: '#D9A9B0',
      programs: [
        { id: 'poli', name: 'Political Science', degree: 'BA', exam: 'LSAT Prep', module: null, status: 'coming-soon', icon: '⚖️' },
        { id: 'psyc', name: 'Psychology', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🧠' },
        { id: 'hist', name: 'History', degree: 'BA', exam: null, module: null, status: 'coming-soon', icon: '📜' },
        { id: 'engl', name: 'English', degree: 'BA', exam: null, module: null, status: 'coming-soon', icon: '✍️' },
        { id: 'musc', name: 'Music', degree: 'BA', exam: null, module: null, status: 'coming-soon', icon: '🎵' },
      ]
    },
    {
      id: 'ced',
      name: 'College of Education',
      shortName: 'CEd',
      icon: '/college-icons/icon-education-color.svg',
      color: '#FDB827',
      programs: [
        { id: 'praxis-core-reading', name: 'Praxis Core: Reading', degree: 'BS', exam: 'Praxis 5713', module: 'praxis-core-reading', status: 'active', icon: '📖' },
        { id: 'praxis-core-writing', name: 'Praxis Core: Writing', degree: 'BS', exam: 'Praxis 5723', module: 'praxis-core-writing', status: 'active', icon: '✍️' },
        { id: 'praxis-core-math', name: 'Praxis Core: Math', degree: 'BS', exam: 'Praxis 5733', module: 'praxis-core-math', status: 'active', icon: '🔢' },
        { id: 'eled', name: 'Elementary Education', degree: 'BS', exam: 'Praxis 5001', module: null, status: 'coming-soon', icon: '🎓' },
        { id: 'sped', name: 'Special Education', degree: 'BS', exam: 'Praxis 5354', module: null, status: 'coming-soon', icon: '🧩' },
        { id: 'plt-k6', name: 'PLT: Grades K-6', degree: 'BS', exam: 'Praxis 5622', module: null, status: 'coming-soon', icon: '📝' },
      ]
    },
    {
      id: 'cost',
      name: 'College of Science & Technology',
      shortName: 'CoST',
      icon: '/college-icons/icon-science-color.svg',
      color: '#9A86A9',
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
      icon: '/college-icons/icon-nano-color.svg',
      color: '#DF8738',
      programs: [
        { id: 'nano', name: 'Nanoengineering', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🔬' },
        { id: 'biom', name: 'Biomedical Engineering', degree: 'BS', exam: null, module: null, status: 'coming-soon', icon: '🫀' },
      ]
    }
  ]
};

export default UNIVERSITY;
