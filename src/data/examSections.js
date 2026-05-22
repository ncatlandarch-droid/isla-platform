/**
 * LARE Exam Sections — Official CLARB Blueprint Data
 * Source: CLARB Exam Blueprint + NotebookLM LARE Preparation Notebook
 */

import { Briefcase, ClipboardCheck, PencilRuler, Mountain } from 'lucide-react';

export const AGGIE_BLUE = "#004684";
export const AGGIE_GOLD = "#FDB927";

export const EXAM_SECTIONS = [
  {
    id: 1,
    title: "Inventory, Analysis, and Project Management",
    shortTitle: "Management",
    icon: Briefcase,
    color: AGGIE_BLUE,
    totalItems: 100, // 90 scored + 10 pretest (CLARB Dec 2023)
    examDuration: 180, // 3 hours in minutes (official CLARB)
    examFormat: "Multiple-choice, multiple-response, hot spot, drag-and-place",
    videos: [
      { title: "Section 1 Overview — Inventory, Analysis & Project Management", url: "https://www.youtube.com/watch?v=cRzm6Iy0WH8", type: "overview" },
      { title: "Physical Analysis (39%)", url: "https://www.youtube.com/watch?v=PFJ_DFhirDc", type: "topic" },
      { title: "Inventory & Data Collection (21%)", url: "https://www.youtube.com/watch?v=PL_VThoKZM0", type: "topic" },
      { title: "Contextual Analysis (19%)", url: "https://www.youtube.com/watch?v=rsM52Y7qi0o", type: "topic" },
      { title: "Stakeholder Engagement (14%)", url: "https://www.youtube.com/watch?v=TOuC7ohW6a0", type: "topic" },
      { title: "Project Management (7%)", url: "https://www.youtube.com/watch?v=YBib3qMjLts", type: "topic" }
    ],
    topics: [
      { name: "Physical Analysis", weight: 39, description: "Slope, soils & geology (bearing capacity, boring logs), vegetation (halophytic/xerophytic), microclimates, Urban Heat Island, viewsheds, hydrology (LID), and McHarg overlay/GIS analysis" },
      { name: "Inventory & Data Collection", weight: 21, description: "Primary vs. secondary data, ALTA/NSPS surveys, Sanborn maps, comprehensive plans, FEMA/EPA/NEPA regulations, zoning ordinances, FAR calculations, and easements" },
      { name: "Contextual Analysis", weight: 19, description: "Environmental Impact Assessment (NEPA), ADA/PROWAG/I-Codes compliance, CPTED, clear sight triangle, Level of Service (LOS), FAR & density calculations, and noise mitigation" },
      { name: "Stakeholder Engagement", weight: 14, description: "Charrettes, facilitated meetings, consensus building, stakeholder identification, public participation techniques, and equity-based feedback synthesis" },
      { name: "Project Management", weight: 7, description: "Contract delivery (DBB, Design-Build, CM-at-Risk, IPD), RFP/RFQ, Critical Path Method, Gantt/PERT charts, earned value, and dispute resolution" }
    ]
  },
  {
    id: 2,
    title: "Planning and Design",
    shortTitle: "Design",
    icon: ClipboardCheck,
    color: AGGIE_BLUE,
    totalItems: 95, // 85 scored + 10 pretest (CLARB Dec 2023)
    examDuration: 180,
    examFormat: "Multiple-choice, multiple-response, hot spot, drag-and-place",
    videos: [
      { title: "Section 2 Overview — Planning and Design", url: "https://www.youtube.com/watch?v=hhTyLuIkUfU", type: "overview" },
      { title: "Master Planning (33%)", url: "https://www.youtube.com/watch?v=bE0l3rfeJc0", type: "topic" },
      { title: "Schematic Design (28%)", url: "https://www.youtube.com/watch?v=aKmhH4z-I9c", type: "topic" },
      { title: "Design Development (22%)", url: "https://www.youtube.com/watch?v=CXOfDLuY7JU", type: "topic" },
      { title: "Stewardship & Design Principles (17%)", url: "https://www.youtube.com/watch?v=s_jK6JKagWM", type: "topic" }
    ],
    topics: [
      { name: "Master Planning", weight: 33, description: "Large-scale land-use planning and spatial organization" },
      { name: "Schematic Design", weight: 28, description: "Development of preliminary design concepts and alternative layouts" },
      { name: "Design Development", weight: 22, description: "Refinement of designs into detailed plans" },
      { name: "Stewardship & Design Principles", weight: 17, description: "Sustainable design application and environmental ethics" }
    ]
  },
  {
    id: 3,
    title: "Construction Documentation and Administration",
    shortTitle: "Construction",
    icon: PencilRuler,
    color: AGGIE_BLUE,
    totalItems: 100, // 90 scored + 10 pretest (CLARB Dec 2023)
    examDuration: 180,
    examFormat: "Multiple-choice, multiple-response, hot spot, drag-and-place",
    videos: [
      { title: "Section 3 Overview — Construction Documentation & Administration", url: "https://www.youtube.com/watch?v=OFTnuKo98vQ", type: "overview" },
      { title: "Construction Plans & Details (50%)", url: "https://www.youtube.com/watch?v=R8AwRYMPszo", type: "topic" },
      { title: "Construction Administration (30%)", url: "https://www.youtube.com/watch?v=5lJQgurmZMs", type: "topic" },
      { title: "Construction Specifications & Bidding (20%)", url: "https://www.youtube.com/watch?v=5CSxJPylR1s", type: "topic" }
    ],
    topics: [
      { name: "Construction Plans & Details", weight: 50, description: "Layout plans, materials plans, and technical construction details" },
      { name: "Construction Administration", weight: 30, description: "Site visits, submittal reviews, and change order management" },
      { name: "Construction Specifications & Bidding", weight: 20, description: "Writing/interpreting specifications and contractor selection" }
    ]
  },
  {
    id: 4,
    title: "Grading, Drainage, and Stormwater Management",
    shortTitle: "Grading & Drainage",
    icon: Mountain,
    color: AGGIE_GOLD,
    totalItems: 80, // 70 scored + 10 pretest (CLARB Dec 2023)
    examDuration: 180,
    examFormat: "Multiple-choice, multiple-response, hot spot, drag-and-place",
    videos: [
      { title: "Section 4 Overview — Grading, Drainage & Stormwater Management", url: "https://www.youtube.com/watch?v=Dk5Z-_e_Ce4", type: "overview" },
      { title: "Grading & Earthwork (44%)", url: "https://www.youtube.com/watch?v=gRxoZJiGVjE", type: "topic" },
      { title: "Stormwater Management (39%)", url: "https://www.youtube.com/watch?v=QUAOjaDD9Lo", type: "topic" }
    ],
    topics: [
      { name: "Grading & Earthwork", weight: 44, description: "Creating grading plans that balance cut and fill with proper drainage" },
      { name: "Stormwater Management", weight: 39, description: "Designing systems to collect, treat, and convey stormwater runoff" },
      { name: "Drainage Systems", weight: 17, description: "Technical design of pipes, inlets, and drainage infrastructure" }
    ]
  }
];
