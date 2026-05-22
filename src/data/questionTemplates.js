/**
 * Parametric Question Templates — Auto-generates unique questions
 * Each template can produce dozens of unique instances with randomized values
 */

export const QUESTION_TEMPLATES = [
  /* ============================================================
     SECTION 1: Inventory, Analysis & Project Management
     ============================================================ */
  {
    id: 'slope-calc-basic',
    section: 1,
    topic: 'Physical Analysis',
    difficulty: 1,
    formulaCard: { formula: 'Slope (%) = (Rise ÷ Run) × 100', name: 'Slope Percentage' },
    generate: (p, rng) => {
      const rise = p.rise;
      const run = p.run;
      const correctSlope = +((rise / run) * 100).toFixed(1);
      const wrongs = [
        +((run / rise) * 100).toFixed(1),
        +((rise * run) / 100).toFixed(1),
        +((rise + run) * 0.5).toFixed(1)
      ];
      const options = [correctSlope + '%', wrongs[0] + '%', wrongs[1] + '%', wrongs[2] + '%'];
      return {
        text: `A site has an elevation change of ${rise} feet over a horizontal distance of ${run} feet. What is the slope percentage?`,
        options, correct: 0,
        explanation: `Slope = (Rise ÷ Run) × 100 = (${rise} ÷ ${run}) × 100 = ${correctSlope}%.`,
        detailedSteps: [
          `Step 1: Identify Rise = ${rise} ft`,
          `Step 2: Identify Run = ${run} ft`,
          `Step 3: Apply formula: (${rise} ÷ ${run}) × 100`,
          `Step 4: Calculate: ${correctSlope}%`
        ],
        wrongAnswerExplanations: [
          null,
          `This reverses rise and run in the formula. Rise goes on top, run on bottom.`,
          `This multiplies rise × run and divides by 100, which is not the slope formula.`,
          `This averages rise and run, which doesn't calculate slope.`
        ]
      };
    },
    params: { rise: [1, 12], run: [20, 200] }
  },
  {
    id: 'soil-classification',
    section: 1,
    topic: 'Physical Analysis',
    difficulty: 2,
    generate: (p) => {
      const soilData = {
        'CH': { name: 'Fat Clay', issue: 'high shrink-swell potential', impact: 'foundations and hardscape structures' },
        'CL': { name: 'Lean Clay', issue: 'moderate plasticity', impact: 'pavement subgrades and compaction' },
        'SM': { name: 'Silty Sand', issue: 'variable drainage capacity', impact: 'infiltration-based stormwater systems' },
        'GP': { name: 'Poorly Graded Gravel', issue: 'high permeability', impact: 'drainage and foundation bearing' },
        'OH': { name: 'Organic Clay', issue: 'high compressibility', impact: 'settlement of structures and pavements' },
        'ML': { name: 'Silt', issue: 'frost susceptibility', impact: 'pavement design in cold climates' }
      };
      const soil = soilData[p.soilType];
      const wrongSoils = Object.entries(soilData).filter(([k]) => k !== p.soilType);
      const wrongOptions = wrongSoils.slice(0, 3).map(([, v]) => v.impact);
      return {
        text: `Soil boring reports classify a site's soil as ${p.soilType} (${soil.name}). This classification has the MOST significant impact on the design of:`,
        options: [soil.impact, ...wrongOptions],
        correct: 0,
        explanation: `${p.soilType} (${soil.name}) has ${soil.issue}, which most directly affects ${soil.impact}.`,
        detailedSteps: [
          `Step 1: Identify soil classification: ${p.soilType}`,
          `Step 2: Recall USCS characteristics: ${soil.name} — ${soil.issue}`,
          `Step 3: Determine primary design impact: ${soil.impact}`
        ]
      };
    },
    params: { soilType: ['CH', 'CL', 'SM', 'GP', 'OH', 'ML'] }
  },
  {
    id: 'phase1-esa',
    section: 1,
    topic: 'Inventory & Data Collection',
    difficulty: 2,
    generate: (p) => {
      const recs = {
        'underground storage tank': 'USTs indicate potential soil and groundwater contamination from petroleum products.',
        'stained soil near loading dock': 'Stained soil suggests chemical spills or leaks requiring further investigation.',
        'abandoned dry cleaning facility': 'Dry cleaners use chlorinated solvents (PCE/TCE) that contaminate soil and groundwater.',
        'former gas station': 'Gas stations involve petroleum storage posing soil and groundwater contamination risks.'
      };
      const nonRecs = [
        'A well-maintained community garden',
        'A mature native tree grove',
        'A residential home built in 2010',
        'A recently paved parking lot'
      ];
      const correct = recs[p.recType];
      return {
        text: `During a Phase I Environmental Site Assessment (ESA), which finding would be classified as a Recognized Environmental Condition (REC)?`,
        options: [`Evidence of a ${p.recType}`, nonRecs[0], nonRecs[1], nonRecs[2]],
        correct: 0,
        explanation: correct,
        detailedSteps: [
          `Step 1: Recall ASTM E1527 defines RECs as conditions indicating presence or likely presence of hazardous substances`,
          `Step 2: Evaluate each option for contamination potential`,
          `Step 3: "${p.recType}" — ${correct}`
        ]
      };
    },
    params: { recType: ['underground storage tank', 'stained soil near loading dock', 'abandoned dry cleaning facility', 'former gas station'] }
  },
  {
    id: 'project-delivery-method',
    section: 1,
    topic: 'Project Management',
    difficulty: 2,
    generate: (p) => {
      const methods = {
        'Design-Bid-Build': { desc: 'separates design from construction; the owner hires the designer first, then competitively bids construction', risk: 'Owner' },
        'Design-Build': { desc: 'a single entity handles both design and construction under one contract', risk: 'Contractor' },
        'Construction Manager at Risk (CM at Risk)': { desc: 'CM provides a Guaranteed Maximum Price and manages construction risk', risk: 'CM' },
        'Integrated Project Delivery (IPD)': { desc: 'all major parties share risk and reward through a multi-party agreement', risk: 'Shared' }
      };
      const method = methods[p.method];
      const wrongMethods = Object.entries(methods).filter(([k]) => k !== p.method);
      return {
        text: `A project delivery method where ${method.desc} is BEST described as:`,
        options: [p.method, ...wrongMethods.slice(0, 3).map(([k]) => k)],
        correct: 0,
        explanation: `${p.method}: ${method.desc}. Primary construction risk is borne by the ${method.risk}.`
      };
    },
    params: { method: ['Design-Bid-Build', 'Design-Build', 'Construction Manager at Risk (CM at Risk)', 'Integrated Project Delivery (IPD)'] }
  },
  {
    id: 'usgs-map-symbols',
    section: 1,
    topic: 'Inventory & Data Collection',
    difficulty: 1,
    generate: (p) => {
      const symbols = {
        'blue dashed lines': 'Intermittent streams',
        'blue solid lines': 'Perennial streams or rivers',
        'brown lines': 'Contour lines (topographic elevation)',
        'green tint areas': 'Woodland or forested areas',
        'black squares': 'Buildings or structures',
        'red lines': 'Major roads or highways'
      };
      const answer = symbols[p.symbol];
      const wrongs = Object.entries(symbols).filter(([k]) => k !== p.symbol).map(([, v]) => v);
      return {
        text: `On a USGS topographic map, ${p.symbol} represent:`,
        options: [answer, wrongs[0], wrongs[1], wrongs[2]],
        correct: 0,
        explanation: `On USGS maps, ${p.symbol} indicate ${answer.toLowerCase()}. Knowing these conventions is essential for site analysis.`
      };
    },
    params: { symbol: ['blue dashed lines', 'blue solid lines', 'brown lines', 'green tint areas'] }
  },

  /* ============================================================
     SECTION 2: Planning & Design
     ============================================================ */
  {
    id: 'ada-slope-requirements',
    section: 2,
    topic: 'Design Development',
    difficulty: 2,
    formulaCard: { formula: 'Max Accessible Route Slope: 1:20 (5%)\nMax Ramp Slope: 1:12 (8.33%)\nMax Cross Slope: 1:48 (2.08%)', name: 'ADA Slope Requirements' },
    generate: (p) => {
      const elements = {
        'accessible route': { slope: '1:20 (5.0%)', explain: 'Accessible routes cannot exceed 5% running slope. Steeper becomes a ramp.' },
        'ramp': { slope: '1:12 (8.33%)', explain: 'ADA ramps max at 8.33% with handrails and landings every 30 inches of rise.' },
        'cross slope on accessible route': { slope: '1:48 (2.08%)', explain: 'Cross slopes on accessible paths max at 2.08% to prevent wheelchair drift.' },
        'accessible parking space': { slope: '1:50 (2.0%)', explain: 'Accessible parking spaces must not exceed 2% slope in any direction.' }
      };
      const el = elements[p.element];
      const wrongs = Object.entries(elements).filter(([k]) => k !== p.element).map(([, v]) => v.slope);
      return {
        text: `According to ADA standards, the maximum slope allowed for a ${p.element} is:`,
        options: [el.slope, ...wrongs.slice(0, 3)],
        correct: 0,
        explanation: el.explain,
        detailedSteps: [
          `Step 1: Identify the element: ${p.element}`,
          `Step 2: Recall ADA requirement: ${el.slope}`,
          `Step 3: ${el.explain}`
        ]
      };
    },
    params: { element: ['accessible route', 'ramp', 'cross slope on accessible route', 'accessible parking space'] }
  },
  {
    id: 'lynch-elements',
    section: 2,
    topic: 'Schematic Design',
    difficulty: 1,
    generate: (p) => {
      const elements = {
        'Paths': 'channels along which people move — streets, walkways, transit lines',
        'Edges': 'linear elements not used as paths — shores, walls, boundaries between districts',
        'Districts': 'medium-to-large sections of the city with recognizable character',
        'Nodes': 'strategic points — junctions, crossings, gathering places',
        'Landmarks': 'external reference points — distinct physical objects used for wayfinding'
      };
      const desc = elements[p.element];
      const wrongs = Object.keys(elements).filter(k => k !== p.element);
      return {
        text: `In Kevin Lynch's "Image of the City," the element described as "${desc}" is called:`,
        options: [p.element, ...wrongs.slice(0, 3)],
        correct: 0,
        explanation: `Lynch defined ${p.element} as ${desc}. The five elements are Paths, Edges, Districts, Nodes, and Landmarks.`
      };
    },
    params: { element: ['Paths', 'Edges', 'Districts', 'Nodes', 'Landmarks'] }
  },
  {
    id: 'tod-planning',
    section: 2,
    topic: 'Master Planning',
    difficulty: 2,
    generate: (p) => {
      const features = {
        'highest residential density': { radius: '1/4 mile (5-min walk)', explain: 'The 1/4-mile radius represents comfortable pedestrian walking distance for highest density.' },
        'secondary mixed-use development': { radius: '1/2 mile (10-min walk)', explain: 'The 1/2-mile zone supports moderate density mixed-use as a transition zone.' },
        'regional commercial influence': { radius: '1 mile (20-min walk)', explain: 'The 1-mile radius represents the broader commercial influence area of a transit station.' }
      };
      const feat = features[p.feature];
      const wrongs = ['1/8 mile', '2 miles', '3/4 mile'].filter(v => v !== feat.radius);
      return {
        text: `In Transit-Oriented Development (TOD) planning, ${p.feature} is typically located within what radius of the transit station?`,
        options: [feat.radius, ...wrongs],
        correct: 0,
        explanation: feat.explain
      };
    },
    params: { feature: ['highest residential density', 'secondary mixed-use development', 'regional commercial influence'] }
  },
  {
    id: 'planting-design',
    section: 2,
    topic: 'Design Development',
    difficulty: 2,
    generate: (p) => {
      const terms = {
        'ecotone': 'the transition zone between two adjacent ecological communities, often with highest biodiversity',
        'allelopathy': 'the chemical inhibition of one plant species by another through toxic root or leaf compounds',
        'xeriscaping': 'landscape design that reduces or eliminates the need for supplemental irrigation',
        'phytoremediation': 'using plants to remove or stabilize contaminants in soil, water, or air',
        'succession': 'the natural process of ecological community change over time from pioneer to climax species'
      };
      const def = terms[p.term];
      const wrongs = Object.keys(terms).filter(k => k !== p.term);
      return {
        text: `In ecological design, the term "${p.term}" refers to:`,
        options: [def, ...wrongs.slice(0, 3).map(k => terms[k])],
        correct: 0,
        explanation: `"${p.term}" is defined as ${def}.`
      };
    },
    params: { term: ['ecotone', 'allelopathy', 'xeriscaping', 'phytoremediation', 'succession'] }
  },

  /* ============================================================
     SECTION 3: Construction Documentation & Administration
     ============================================================ */
  {
    id: 'csi-divisions',
    section: 3,
    topic: 'Construction Specifications & Bidding',
    difficulty: 1,
    generate: (p) => {
      const divisions = {
        '01': 'General Requirements',
        '02': 'Existing Conditions',
        '03': 'Concrete',
        '04': 'Masonry',
        '05': 'Metals',
        '22': 'Plumbing',
        '26': 'Electrical',
        '31': 'Earthwork',
        '32': 'Exterior Improvements',
        '33': 'Utilities'
      };
      const answer = divisions[p.division];
      const wrongs = Object.entries(divisions).filter(([k]) => k !== p.division).map(([, v]) => v);
      const shuffledWrongs = wrongs.sort(() => Math.random() - 0.5).slice(0, 3);
      return {
        text: `In CSI MasterFormat, Division ${p.division} covers:`,
        options: [answer, ...shuffledWrongs],
        correct: 0,
        explanation: `Division ${p.division} — ${answer}. Landscape architects primarily work with Division 32 (Exterior Improvements) and Division 31 (Earthwork).`
      };
    },
    params: { division: ['31', '32', '33', '01', '03'] }
  },
  {
    id: 'construction-admin-terms',
    section: 3,
    topic: 'Construction Administration',
    difficulty: 2,
    generate: (p) => {
      const terms = {
        'Substantial Completion': 'the stage when the work is sufficiently complete for the owner to use it for its intended purpose',
        'Notice to Proceed (NTP)': 'the formal document authorizing the contractor to begin work on a specific date',
        'Change Order': 'a written agreement to modify the contract after execution, changing scope, time, or cost',
        'Punch List': 'a list of minor items to be completed or corrected before final payment',
        'Retainage': 'a percentage of contract payments withheld until project completion to ensure performance',
        'Liquidated Damages': 'a predetermined amount of money the contractor pays for each day of delay beyond the completion date'
      };
      const def = terms[p.term];
      const wrongs = Object.entries(terms).filter(([k]) => k !== p.term).map(([, v]) => v);
      return {
        text: `In construction administration, "${p.term}" is BEST defined as:`,
        options: [def, ...wrongs.slice(0, 3)],
        correct: 0,
        explanation: `${p.term}: ${def}.`
      };
    },
    params: { term: ['Substantial Completion', 'Notice to Proceed (NTP)', 'Change Order', 'Punch List', 'Retainage', 'Liquidated Damages'] }
  },
  {
    id: 'material-specs',
    section: 3,
    topic: 'Construction Plans & Details',
    difficulty: 2,
    generate: (p) => {
      const materials = {
        'geotextile fabric': { purpose: 'Prevents fine soil particles from migrating into aggregate base', wrongPurposes: ['Waterproofing membrane for foundations', 'Root barrier for tree plantings', 'Vapor barrier under concrete slabs'] },
        'expansion joint': { purpose: 'Accommodates thermal expansion and contraction in rigid pavements', wrongPurposes: ['Prevents surface water infiltration', 'Provides structural reinforcement', 'Creates decorative pattern in concrete'] },
        'weep hole': { purpose: 'Allows hydrostatic pressure to drain from behind a retaining wall', wrongPurposes: ['Provides irrigation access point', 'Creates planting pockets for vines', 'Meets aesthetic pattern requirements'] },
        'rebar dowel': { purpose: 'Transfers load between adjacent concrete slabs at joints', wrongPurposes: ['Prevents trees from heaving pavement', 'Creates decorative texture in concrete', 'Serves as a marking for utility locations'] }
      };
      const mat = materials[p.material];
      return {
        text: `In landscape construction, the PRIMARY purpose of a ${p.material} is to:`,
        options: [mat.purpose, ...mat.wrongPurposes],
        correct: 0,
        explanation: `A ${p.material} ${mat.purpose.toLowerCase()}.`
      };
    },
    params: { material: ['geotextile fabric', 'expansion joint', 'weep hole', 'rebar dowel'] }
  },
  {
    id: 'bidding-documents',
    section: 3,
    topic: 'Construction Specifications & Bidding',
    difficulty: 2,
    generate: (p) => {
      const docs = {
        'Addendum': { timing: 'During the bidding period', purpose: 'to modify or clarify the original bid documents before bids are received' },
        'Bulletin': { timing: 'After contract award', purpose: 'to describe proposed changes that may result in a change order' },
        'Supplementary Conditions': { timing: 'As part of the contract documents', purpose: 'to modify the General Conditions for project-specific requirements' },
        'Invitation to Bid': { timing: 'Before bidding period', purpose: 'to formally invite contractors to submit competitive bids' }
      };
      const doc = docs[p.document];
      const wrongs = Object.entries(docs).filter(([k]) => k !== p.document);
      return {
        text: `A "${p.document}" is issued ${doc.timing} ${doc.purpose}. This document type is BEST described as:`,
        options: [p.document, ...wrongs.slice(0, 3).map(([k]) => k)],
        correct: 0,
        explanation: `A ${p.document} is issued ${doc.timing} ${doc.purpose}.`
      };
    },
    params: { document: ['Addendum', 'Bulletin', 'Supplementary Conditions', 'Invitation to Bid'] }
  },

  /* ============================================================
     SECTION 4: Grading, Drainage & Stormwater
     ============================================================ */
  {
    id: 'rational-method',
    section: 4,
    topic: 'Stormwater Management',
    difficulty: 2,
    formulaCard: { formula: 'Q = C × i × A\nQ = Peak runoff (cfs)\nC = Runoff coefficient\ni = Rainfall intensity (in/hr)\nA = Drainage area (acres)', name: 'Rational Method' },
    generate: (p) => {
      const C = p.C;
      const i = p.i;
      const A = p.A;
      const Q = +(C * i * A).toFixed(2);
      const wrongs = [+(C + i + A).toFixed(2), +(C * i / A).toFixed(2), +((C * A) / i).toFixed(2)];
      return {
        text: `Using the Rational Method (Q = CiA), calculate the peak runoff for a ${A}-acre site with a runoff coefficient of ${C} during a storm with intensity of ${i} in/hr.`,
        options: [`${Q} cfs`, `${wrongs[0]} cfs`, `${wrongs[1]} cfs`, `${wrongs[2]} cfs`],
        correct: 0,
        explanation: `Q = C × i × A = ${C} × ${i} × ${A} = ${Q} cfs.`,
        detailedSteps: [
          `Step 1: Identify C = ${C} (runoff coefficient)`,
          `Step 2: Identify i = ${i} in/hr (rainfall intensity)`,
          `Step 3: Identify A = ${A} acres (drainage area)`,
          `Step 4: Q = ${C} × ${i} × ${A} = ${Q} cfs`
        ],
        wrongAnswerExplanations: [
          null,
          `This adds the values instead of multiplying. Q = C × i × A, not C + i + A.`,
          `This divides by A instead of multiplying. All three factors multiply together.`,
          `This divides by i instead of multiplying. Intensity increases runoff, not decreases it.`
        ]
      };
    },
    params: { C: [0.15, 0.95], i: [2, 8], A: [1, 25] }
  },
  {
    id: 'contour-interpretation',
    section: 4,
    topic: 'Grading & Earthwork',
    difficulty: 1,
    generate: (p) => {
      const scenarios = {
        'V-shapes pointing uphill': { answer: 'A valley, swale, or drainage way', explain: 'Contour V\'s pointing uphill indicate valleys where water collects and flows downhill.' },
        'V-shapes pointing downhill': { answer: 'A ridge or crown', explain: 'Contour V\'s pointing downhill indicate ridges that shed water to both sides.' },
        'concentric circles': { answer: 'A hill or depression (depending on elevation labels)', explain: 'Concentric circles show either a hilltop or depression. Read elevation labels to determine which.' },
        'equally spaced parallel lines': { answer: 'A uniform slope', explain: 'Evenly spaced parallel contours indicate a consistent, uniform slope.' },
        'closely spaced lines': { answer: 'A steep slope', explain: 'Closely spaced contours indicate rapid elevation change — a steep slope.' }
      };
      const sc = scenarios[p.pattern];
      const wrongs = Object.entries(scenarios).filter(([k]) => k !== p.pattern).map(([, v]) => v.answer);
      return {
        text: `On a grading plan, contour lines that form ${p.pattern} indicate:`,
        options: [sc.answer, ...wrongs.slice(0, 3)],
        correct: 0,
        explanation: sc.explain
      };
    },
    params: { pattern: ['V-shapes pointing uphill', 'V-shapes pointing downhill', 'concentric circles', 'equally spaced parallel lines', 'closely spaced lines'] }
  },
  {
    id: 'elevation-calc',
    section: 4,
    topic: 'Grading & Earthwork',
    difficulty: 2,
    formulaCard: { formula: 'Elevation B = Elevation A ± (Slope × Distance)\nRise = Slope(%) × Run ÷ 100', name: 'Elevation at a Point' },
    generate: (p) => {
      const elevA = p.elevA;
      const slope = p.slope;
      const dist = p.dist;
      const direction = p.direction;
      const rise = +((slope / 100) * dist).toFixed(2);
      const elevB = direction === 'downhill'
        ? +(elevA - rise).toFixed(2)
        : +(elevA + rise).toFixed(2);
      const wrongs = [
        +(elevA + (direction === 'downhill' ? rise : -rise)).toFixed(2),
        +(elevA + (slope * dist)).toFixed(2),
        +(elevA - slope).toFixed(2)
      ];
      return {
        text: `Point A has an elevation of ${elevA} ft. A ${slope}% slope runs ${direction} for ${dist} feet to Point B. What is the elevation at Point B?`,
        options: [`${elevB} ft`, `${wrongs[0]} ft`, `${wrongs[1]} ft`, `${wrongs[2]} ft`],
        correct: 0,
        explanation: `Rise = (${slope}% × ${dist}) ÷ 100 = ${rise} ft. ${direction === 'downhill' ? 'Subtract' : 'Add'} from ${elevA}: ${elevB} ft.`,
        detailedSteps: [
          `Step 1: Calculate rise: (${slope}% ÷ 100) × ${dist} ft = ${rise} ft`,
          `Step 2: Direction is ${direction}, so ${direction === 'downhill' ? 'subtract' : 'add'} rise`,
          `Step 3: ${elevA} ${direction === 'downhill' ? '-' : '+'} ${rise} = ${elevB} ft`
        ],
        wrongAnswerExplanations: [
          null,
          `This goes in the wrong direction — ${direction} means you ${direction === 'downhill' ? 'subtract' : 'add'} the rise.`,
          `This doesn't convert slope percentage to decimal first. Divide slope by 100 before multiplying.`,
          `This simply subtracts the slope percentage value, which is not a calculation.`
        ]
      };
    },
    params: { elevA: [95, 110], slope: [1, 10], dist: [20, 150], direction: ['downhill', 'uphill'] }
  },
  {
    id: 'runoff-coefficient',
    section: 4,
    topic: 'Stormwater Management',
    difficulty: 1,
    generate: (p) => {
      const surfaces = {
        'concrete or asphalt pavement': { C: '0.90 – 0.95', category: 'near-impervious' },
        'flat roof': { C: '0.75 – 0.95', category: 'largely impervious' },
        'dense forest or woodland': { C: '0.10 – 0.20', category: 'highly permeable' },
        'maintained lawn on sandy soil': { C: '0.05 – 0.15', category: 'highly permeable' },
        'gravel parking lot': { C: '0.50 – 0.70', category: 'semi-permeable' },
        'maintained lawn on clay soil': { C: '0.25 – 0.40', category: 'moderately permeable' }
      };
      const surf = surfaces[p.surface];
      const wrongs = Object.entries(surfaces)
        .filter(([k]) => k !== p.surface)
        .filter(([, v]) => v.category !== surf.category)
        .slice(0, 3)
        .map(([, v]) => v.C);
      return {
        text: `In the Rational Method, the runoff coefficient (C) for ${p.surface} is approximately:`,
        options: [surf.C, ...wrongs],
        correct: 0,
        explanation: `${p.surface} is ${surf.category}, so C ≈ ${surf.C}. Higher C means more runoff; lower C means more infiltration.`
      };
    },
    params: { surface: ['concrete or asphalt pavement', 'dense forest or woodland', 'maintained lawn on sandy soil', 'gravel parking lot', 'maintained lawn on clay soil'] }
  },
  {
    id: 'pipe-sizing',
    section: 4,
    topic: 'Drainage Systems',
    difficulty: 3,
    generate: (p) => {
      const minSlopes = {
        4: '1.0%',
        6: '0.5%',
        8: '0.4%',
        10: '0.3%',
        12: '0.2%'
      };
      const slope = minSlopes[p.pipeSize];
      const wrongs = Object.entries(minSlopes).filter(([k]) => parseInt(k) !== p.pipeSize).map(([, v]) => v).slice(0, 3);
      return {
        text: `The MINIMUM recommended slope for a ${p.pipeSize}-inch diameter storm drain pipe to maintain self-cleaning velocity is approximately:`,
        options: [slope, ...wrongs],
        correct: 0,
        explanation: `A ${p.pipeSize}-inch pipe needs a minimum ${slope} slope to maintain approximately 2.5 fps self-cleaning velocity. Larger pipes require less slope.`
      };
    },
    params: { pipeSize: [4, 6, 8, 10, 12] }
  },
  {
    id: 'cut-fill-balance',
    section: 4,
    topic: 'Grading & Earthwork',
    difficulty: 3,
    generate: (p) => {
      const cut = p.cut;
      const fill = p.fill;
      const diff = Math.abs(cut - fill);
      const result = cut > fill ? 'excess' : 'deficit';
      const action = cut > fill ? 'soil must be exported off-site' : 'additional fill must be imported';
      return {
        text: `A grading plan calculates ${cut} cubic yards of cut and ${fill} cubic yards of fill. What is the earthwork balance?`,
        options: [
          `${diff} CY ${result} — ${action}`,
          `${diff} CY ${result === 'excess' ? 'deficit' : 'excess'} — ${result === 'excess' ? 'additional fill must be imported' : 'soil must be exported off-site'}`,
          `${cut + fill} CY total earthwork — balanced site`,
          `${Math.round(diff / 2)} CY ${result} — partially balanced`
        ],
        correct: 0,
        explanation: `Cut (${cut} CY) minus Fill (${fill} CY) = ${cut > fill ? '+' : '-'}${diff} CY. Since there's a ${result}, ${action}. Balanced earthwork minimizes cost.`,
        detailedSteps: [
          `Step 1: Cut volume = ${cut} CY`,
          `Step 2: Fill volume = ${fill} CY`,
          `Step 3: Balance = ${cut} - ${fill} = ${cut > fill ? '+' : '-'}${diff} CY`,
          `Step 4: ${result.charAt(0).toUpperCase() + result.slice(1)} means ${action}`
        ]
      };
    },
    params: { cut: [500, 5000], fill: [500, 5000] }
  },
  {
    id: 'swale-design',
    section: 4,
    topic: 'Drainage Systems',
    difficulty: 2,
    generate: (p) => {
      const slopes = {
        'vegetated swale': { min: '1%', max: '6%', explain: 'Below 1% causes ponding; above 6% causes erosion in vegetated channels.' },
        'concrete-lined channel': { min: '0.5%', max: '10%+', explain: 'Concrete can handle steeper slopes but still needs minimum slope for flow.' },
        'riprap-lined channel': { min: '1%', max: '20%', explain: 'Riprap provides erosion protection on steeper slopes up to 20%.' }
      };
      const ch = slopes[p.channelType];
      return {
        text: `The recommended longitudinal slope range for a ${p.channelType} is:`,
        options: [
          `${ch.min} to ${ch.max}`,
          `0.1% to 0.5%`,
          `10% to 25%`,
          `Slope does not matter for this channel type`
        ],
        correct: 0,
        explanation: `${p.channelType}: ${ch.min} to ${ch.max}. ${ch.explain}`
      };
    },
    params: { channelType: ['vegetated swale', 'concrete-lined channel', 'riprap-lined channel'] }
  }
];
