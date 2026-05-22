/**
 * State Licensure Requirements — Verified from NotebookLM LARE Preparation Sources
 * Primary sources: NCBOLA rules, CLARB records, LATC CSE plan, SGLA resources
 */

export const STATE_REQUIREMENTS = {
  "North Carolina": {
    board: "North Carolina Board of Landscape Architects (NCBOLA)",
    age: "18+",
    education: "LAAB Accredited Degree (BLA or MLA)",
    experience: "4 years under licensed LA",
    alternativePath: "10 years combined education & experience (portfolio required, 10 pages max)",
    fees: {
      application: "$100",
      licenseCertification: "$250",
      annualRenewal: "$100",
      latePenalty: "$50",
      clarbRecord: "$175 initial + $165/year"
    },
    continuingEd: "10 contact hours per year (all HSW-related)",
    references: "3 references required (1 must be a licensed LA)",
    extra: "NC requires the full Individual Application even with a CLARB Council Record. CLARB no longer provides references — applicants must have references email the Board directly at contact@ncbola.org. Board meets quarterly; submit applications 30 business days prior.",
    link: "ncbola.org",
    examInfo: "Uses L.A.R.E. via CLARB. Graduates with LAAB degree can register for exam directly through CLARB."
  },
  "California": {
    board: "Landscape Architects Technical Committee (LATC)",
    age: "18+",
    education: "Various pathways available",
    experience: "Up to 6 years depending on education",
    alternativePath: "Multiple education + experience combinations accepted",
    fees: {
      application: "Varies",
      licenseCertification: "Varies",
      annualRenewal: "Varies",
      clarbRecord: "$175 initial + $165/year"
    },
    continuingEd: "Varies by renewal cycle",
    references: "Per LATC requirements",
    extra: "California requires a mandatory California Supplemental Examination (CSE) in addition to all 4 L.A.R.E. sections. The CSE covers CA-specific job activities, laws, and hazards. Weighted areas: Site Design (35%), Conservation (25%), Site Inventory (15%), Construction Docs (10%), Regulatory (5%), Construction Admin (5%).",
    link: "cab.ca.gov",
    examInfo: "Must pass all 4 LARE sections PLUS the California Supplemental Exam (CSE)."
  },
  "Florida": {
    board: "Dept. of Business & Professional Regulation (DBPR)",
    age: "18+",
    education: "LAAB Accredited Degree",
    experience: "1–2 years typically",
    alternativePath: "Contact DBPR for alternative experience paths",
    fees: {
      application: "Per DBPR schedule",
      annualRenewal: "Per DBPR schedule",
      clarbRecord: "$175 initial + $165/year"
    },
    continuingEd: "Per state requirements",
    references: "Per DBPR requirements",
    extra: "Registration handled via DBPR. ASLA Florida offers a review course for the state-specific component. John Denson's Florida study guide is also recommended as a preparation resource.",
    link: "myfloridalicense.com",
    examInfo: "Uses L.A.R.E. via CLARB plus state-specific requirements."
  },
  "Texas": {
    board: "Texas Board of Architectural Examiners (TBAE)",
    age: "18+",
    education: "LAAB Accredited Degree",
    experience: "2 years minimum",
    alternativePath: "Contact TBAE for non-accredited paths",
    fees: {
      application: "Per TBAE schedule",
      annualRenewal: "Per TBAE schedule",
      clarbRecord: "$175 initial + $165/year"
    },
    continuingEd: "Per state requirements",
    references: "Per TBAE requirements",
    extra: "TBAE requires a separate jurisprudence exam covering specific Texas state laws and administrative rules unique to landscape architecture practice in Texas.",
    link: "tbae.state.tx.us",
    examInfo: "Must pass all 4 LARE sections plus Texas jurisprudence exam."
  },
  "Georgia": {
    board: "Georgia Board of Landscape Architects",
    age: "18+",
    education: "LAAB Accredited Degree",
    experience: "Per state board requirements",
    alternativePath: "Contact state board",
    fees: {
      application: "Per state schedule",
      annualRenewal: "Per state schedule",
      clarbRecord: "$175 initial + $165/year"
    },
    continuingEd: "Per state requirements",
    references: "Per state requirements",
    extra: "The University of Georgia sells a state-specific study guide for the Georgia licensing requirements. Check with UGA for current availability.",
    link: "sos.ga.gov",
    examInfo: "Uses L.A.R.E. via CLARB."
  },
  "Louisiana": {
    board: "Louisiana Horticulture Commission",
    age: "18+",
    education: "LAAB Accredited Degree",
    experience: "Per state board requirements",
    alternativePath: "Contact state board",
    fees: {
      application: "Per state schedule",
      annualRenewal: "Per state schedule",
      clarbRecord: "$175 initial + $165/year"
    },
    continuingEd: "Per state requirements",
    references: "Per state requirements",
    extra: "Louisiana's state licensing page offers extensive resources for landscape architecture candidates. Visit the state board website for complete licensure information.",
    link: "ldaf.state.la.us",
    examInfo: "Uses L.A.R.E. via CLARB."
  }
};

/**
 * CLARB Fees for 2026 (Applicable nationwide)
 */
export const CLARB_FEES = {
  initialRecord: { label: "Initial CLARB Record", amount: "$175" },
  annualMaintenance: { label: "Annual Maintenance Fee", amount: "$165" },
  examSection: { label: "L.A.R.E. Section Registration (each)", amount: "$535" },
  practiceExam: { label: "Practice Exam (per section, 3 attempts)", amount: "$25" },
  transmittal: { label: "Transmittal to State Board", amount: "$80" },
  cancellation: { label: "Cancellation/Registration Change", amount: "$100" },
  expeditedTransmittal: { label: "Expedited Transmittal (1-2 days)", amount: "Additional fee" }
};
