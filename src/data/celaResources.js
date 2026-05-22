/**
 * CELA & Professional Development Resources
 * Sourced from NotebookLM LARE Preparation and Modern Learning Systems notebooks
 */

export const CELA_RESOURCES = {
  about: {
    name: "Council of Educators in Landscape Architecture (CELA)",
    description: "CELA provides academic, research, and professional development resources for landscape architecture students and faculty. Annual conferences feature cutting-edge research, pedagogical innovation, and professional networking.",
    ncatInvolvement: "NC A&T faculty regularly present at CELA — including research on AI in Construction Studios, Campus Digital Twins, and bridging the gap between education and practice."
  },
  conferences: [
    { year: 2025, location: "Portland, OR", topic: "AI in the Construction Studio: Learning Aid or Creative Crutch?" },
    { year: 2024, location: "St. Louis, MO", topic: "Collective Community Vision: Realigning Education with Practice" },
    { year: 2022, location: "San Antonio, TX", topic: "Bridging the Gap Between Education and Practice" }
  ],
  ncatNotebookUrl: "https://notebooklm.google.com/notebook/83107118-5703-45e3-98d9-102c67bc01ea"
};

export const CLARB_RESOURCES = {
  practiceExams: {
    title: "CLARB Official Practice Exams",
    price: "$25 per section",
    details: "50 retired questions per section, 3 attempts within 1 year, instant results with explanations",
    url: "https://www.clarb.org/take-the-exam"
  },
  freeDemo: {
    title: "Free Demo Exam",
    details: "Practice navigating the computer interface and tools before test day",
    url: "https://www.clarb.org/resources/demo-exam"
  },
  councilRecord: {
    title: "CLARB Council Record",
    details: "Secure, verified compilation of education, experience, exam results, and licensure history. Simplifies applications across jurisdictions.",
    url: "https://www.clarb.org/council-record"
  },
  examBlueprint: {
    title: "Exam Blueprint",
    details: "Official content outline for all 4 LARE sections with topic weights and descriptions",
    url: "https://www.clarb.org/resources/exam-blueprint"
  }
};

export const SGLA_RESOURCES = {
  name: "SGLA Technical Training (Third-Party Prep)",
  courses: [
    {
      section: "Section 1: Inventory, Analysis & Project Management",
      format: "Live Webinar + Study Materials",
      price: "$250",
      materialsOnly: "$175",
      description: "155-page syllabus with 150 practice questions (MC + AIT format). One intensive day reviewing CLARB's test specification topics."
    },
    {
      section: "Section 2: Planning & Design",
      format: "Live Webinar + Study Materials",
      price: "$400 (3-day course)",
      materialsOnly: "$175",
      description: "260-page syllabus with 185 practice questions plus 25 AIT design problems with solutions."
    },
    {
      section: "Section 3: Construction Documentation & Administration",
      format: "Live Webinar + Study Materials",
      price: "$250",
      materialsOnly: "$175",
      description: "Intensive review of construction documentation and contract administration per CLARB's specifications."
    },
    {
      section: "Section 4: Grading, Drainage & Stormwater",
      format: "Live Webinar + Study Materials",
      price: "$450 (3-day course)",
      materialsOnly: "$175",
      description: "200+ page syllabus with 110 test questions and 43 AIT problems. Focus on grading fundamentals, speed, and accuracy."
    }
  ],
  url: "https://www.sgla-online.com"
};

export const EXAM_TIMELINE = [
  { step: 1, title: "Create CLARB Record", description: "Register and submit education verification ($175)", icon: "FileText" },
  { step: 2, title: "Gain Experience", description: "4 years under licensed LA (LAAB graduates)", icon: "Briefcase" },
  { step: 3, title: "Register for Exam", description: "Select sections to take ($535 per section)", icon: "Calendar" },
  { step: 4, title: "Pass All 4 Sections", description: "L.A.R.E. Sections 1-4 (any order)", icon: "CheckCircle2" },
  { step: 5, title: "Apply to State Board", description: "Submit application, references, and fees", icon: "Globe" },
  { step: 6, title: "Licensed!", description: "Maintain with continuing education annually", icon: "Award" }
];
