/**
 * Flashcard Data — Key concepts per LARE section
 * Each card has a front (term/concept) and back (definition/explanation)
 * Content aligned with CLARB exam blueprint topic areas
 */

export const FLASHCARD_DATA = {
  1: [
    { front: "Phase I ESA (ASTM E-1527)", back: "A records review and visual inspection to identify Recognized Environmental Conditions (RECs). Does NOT include soil or groundwater sampling — that's Phase II." },
    { front: "Recognized Environmental Condition (REC)", back: "The presence or likely presence of hazardous substances or petroleum products in, on, or at a property. Examples: underground storage tanks, stained soil, chemical storage." },
    { front: "Floor Area Ratio (FAR)", back: "FAR = Total Building Floor Area ÷ Lot Area. A FAR of 2.0 on a 10,000 sq ft lot allows 20,000 sq ft of building floor area." },
    { front: "Conditional Use Permit", back: "Allows a use not normally permitted in a zoning district but deemed compatible. Example: a nursery in a residential zone. Different from a variance (granted for hardship)." },
    { front: "Earned Value (BCWP)", back: "Budgeted Cost of Work Performed. BCWP = (% complete / % planned) × budget. When ACWP > BCWP, the project is over budget." },
    { front: "Critical Path Method (CPM)", back: "A scheduling method showing dependent, interconnected tasks. The critical path is the longest sequence determining minimum project duration." },
    { front: "Finish-to-Start Dependency", back: "The most common scheduling dependency: Task B cannot start until Task A finishes. Example: excavation must finish before foundation work begins." },
    { front: "Guaranteed Maximum Price (GMP)", back: "A fee structure setting a maximum cost ceiling. The contractor bears risk for overruns, and savings may be shared with the owner." },
    { front: "Mediation vs. Arbitration", back: "Mediation: neutral facilitator helps parties negotiate — outcome is NON-BINDING. Arbitration: produces a BINDING decision. Partnering prevents disputes proactively." },
    { front: "USGS Blue Dashed Lines", back: "On a USGS topographic map, blue dashed lines represent intermittent streams — waterways that flow seasonally. These may be jurisdictional waters requiring review." },
    { front: "Partnering", back: "Facilitator-led team-building sessions before and during a project to establish common goals and improve communication. NOT a legal agreement." },
    { front: "Discipline Check", back: "A quality control review by an expert NOT on the project team. This fresh perspective catches errors the project team may miss due to familiarity." },
    { front: "Design-Bid-Build vs. Design-Build", back: "Design-Bid-Build (DBB): two separate contracts — design team and construction team. Most common in public sector. Design-Build: single contract covers both — 20-30% faster, can fast-track construction." },
    { front: "ALTA/NSPS Land Title Survey", back: "Comprehensive survey documenting boundaries, improvements, right-of-way, easements, and restrictions. Required by developers, builders, and lenders. Follows strict national standards." },
    { front: "Comprehensive Plan", back: "Long-range (5+ years) plan covering an entire city/county. Elements: Land Use, Transportation, Community Facilities, Housing, Economic Development, Critical Areas. Revised every 15-25 years." },
    { front: "Sanborn Insurance Maps", back: "19th-20th century maps created for fire insurance companies. Show detailed historical building footprints and land use. Found at city libraries/archives — invaluable for site history research." },
    { front: "Charrette", back: "Focused, collaborative design session bringing stakeholders together. Includes site tour, public meetings, design alternatives, and feedback. Most effective for generating broad community consensus." },
    { front: "McHarg Overlay Analysis", back: "Ian McHarg's method: assign relative value to site features (soils, slopes, vegetation), overlay on transparent layers to find land-use suitability patterns. Now done with GIS." },
    { front: "Plant Classification by Habitat", back: "Halophytic = salt-tolerant. Xerophytic = dry soils. Mesophytic = moderate moisture. Hydrophytic = wet soils/floating. Know these habitat preference categories for plant analysis." },
    { front: "CPTED", back: "Crime Prevention Through Environmental Design. Three strategies: natural surveillance (clear sightlines), access control (defined entry points), territorial reinforcement (landscape cues showing ownership)." },
    { front: "Clear Sight Triangle", back: "Area at intersections where nothing should block visibility between drivers and pedestrians. No tall plants, structures, or signs allowed within the triangle for safety." },
    { front: "Geotechnical Report", back: "Summary of subsurface soils for construction. Includes soil boring logs showing bearing capacity and soil classification. Will be tested on Sections 1, 3, and 4." },
    { front: "Fertilizer Calculation (N-P-K)", back: "Desired rate ÷ percentage of nutrient = lbs needed. Example: 3 lbs N per 1,000 sf with 20-10-5 fertilizer → 3 ÷ 0.20 = 15 lbs. N-P-K = Nitrogen-Phosphorus-Potassium." },
    { front: "FAR + 1 Acre = 43,560 sf", back: "FAR = Total Floor Area ÷ Lot Area. MEMORIZE: 1 acre = 43,560 sf. Example: 5-story, 10,000 sf footprint on 1 acre → 50,000 ÷ 43,560 = FAR 1.15." },
    { front: "Bearing Capacity Rankings", back: "Weakest → Strongest: Clay (1-2 tons/sf) → Silt (1.5-3) → Sand loose (2-3) → Gravel loose (4) → Compact sand/gravel (6-10) → Sedimentary rock (15) → Massive bedrock (100 tons/sf)." },
    { front: "ADA vs. PROWAG Path Width", back: "ADA: 36\" minimum. PROWAG: 48\" minimum (wider in public right-of-way!). Both require 60\" × 60\" passing space every 200 ft. Cross slope max: 1:48 (≈ 2.1%)." },
    { front: "Plasticity Index (PI)", back: "Measures shrink-swell potential of soils. PI > 20 = expansive. PI > 40 = highly expansive. PI = Liquid Limit − Plastic Limit. Expansive soils are hard when dry, sticky like peanut butter when wet." },
    { front: "Fire Defensible Zones", back: "Intermediate (5-30 ft from structure): 18 ft between tree tops. Extended (30-60 ft): 12 ft. Extended (60-100 ft): 6 ft. Closer to structure = more spacing required." },
    { front: "Density (DU/Acre)", back: "Dwelling Units per Acre. Example: zoning allows 30 DU/acre for 5-story building. On a 2-acre lot → 30 × 2 = 60 units max. Single-family subdivisions typically 4-5 DU/acre." },
    { front: "Soil Particle Sizes", back: "Largest → Smallest: Coarse Sand (0.5-2.0 mm) → Fine Sand (0.05-0.5 mm) → Silt (0.002-0.05 mm) → Clay (< 0.002 mm). Clay holds most water/nutrients but drains worst." },
    { front: "Vertical Lapse Rate", back: "Temperature drops 3.5°F per 1,000 ft of elevation gain. Higher elevations = cooler. Affects plant selection, microclimate, and comfort planning." },
    { front: "ADA Ramp & Walkway Slopes", back: "Walkway max: 5%. Ramp max: 8.33% (1:12). Cross slope max: 2.1% (1:48). ADA applies to sites open to public. PROWAG applies to public right-of-way." }
  ],

  2: [
    { front: "Carrying Capacity", back: "The amount of use a resource can sustain without unacceptable ecological or experiential degradation. Central to sustainable recreation planning." },
    { front: "Desire Lines", back: "Paths created by pedestrian traffic showing natural movement patterns. Good design responds to desire lines rather than forcing arbitrary circulation." },
    { front: "ADA Accessible Route Slope", back: "Maximum running slope: 1:20 (5%). Slopes steeper than 1:20 are classified as RAMPS and require handrails, landings, and edge protection." },
    { front: "ADA Ramp Requirements", back: "Max slope: 1:12 (8.33%). Max rise before landing: 30 inches. Min clear width: 36 inches. Landings: 60\" long, 60\"×60\" at direction changes." },
    { front: "ADA Cross-Slope", back: "Maximum cross-slope on accessible walking surfaces: 1:50 (2%). Greater slopes cause wheelchair instability." },
    { front: "Comfortable Stair Formula", back: "2R + T = 26–27 inches, where R = riser height and T = tread depth. Produces a comfortable walking rhythm for outdoor stairs." },
    { front: "Kevin Lynch's 5 Urban Elements", back: "Paths, Edges, Districts, Nodes, and Landmarks. NOT textures. These elements form the 'imageability' of a city." },
    { front: "Ecotone", back: "The transitional boundary between two biological communities (e.g., forest to meadow). These zones often have the HIGHEST biodiversity." },
    { front: "Transit-Oriented Development (TOD)", back: "Highest density land uses placed within ¼ mile (5-minute walk) of a transit station." },
    { front: "Biomimicry in Stormwater", back: "Applying nature's strategies to design. Example: constructed wetlands that filter runoff like natural ecosystems — filtration, absorption, and habitat." },
    { front: "Sustainable Design Hierarchy", back: "Preservation (protect what exists) → Conservation (maintain resources) → Regeneration (restore degraded systems)." },
    { front: "Universal Design vs. ADA", back: "Universal design goes BEYOND ADA minimums — designs for the broadest range of users (toddlers to elderly) without adaptation or specialized design." }
  ],

  3: [
    { front: "Division 32 (CSI MasterFormat)", back: "Exterior Improvements — the primary division for landscape architecture specs: paving, landscaping, irrigation, fencing, and site furnishings." },
    { front: "Weep Holes", back: "Openings in a retaining wall that relieve hydrostatic pressure from behind the wall. Without them, water pressure can cause structural failure." },
    { front: "Substantial Completion", back: "The project is sufficiently complete for the owner to use it for its intended purpose, even if minor punch list items remain. Triggers important obligations." },
    { front: "Observation vs. Supervision", back: "'Supervision' implies the designer directs the contractor's work, increasing liability. Always use 'observation' — monitoring conformance with design intent." },
    { front: "Addendum vs. Change Order", back: "Addendum: issued DURING bidding to modify bid documents. Change Order: issued DURING construction to modify the contract scope, price, and/or schedule." },
    { front: "Request for Information (RFI)", back: "Issued by the CONTRACTOR to the design team for clarification of construction documents. Creates a formal paper trail." },
    { front: "Shop Drawing Review", back: "The LA reviews shop drawings to confirm the fabricator's interpretation matches design intent. Does NOT transfer liability or approve means/methods." },
    { front: "Geotextile Fabric", back: "Placed between aggregate base and subgrade to prevent fine soil particles from migrating into the base. Maintains structural performance over time." },
    { front: "Punch List", back: "Created near substantial completion. Documents remaining minor items the contractor must complete or correct before final payment and project close-out." },
    { front: "As-Built Drawings", back: "Record actual constructed conditions, including field modifications. Essential for maintenance, renovation planning, and utility location." },
    { front: "Existing vs. Proposed Contours", back: "Standard convention: existing contours = DASHED lines. Proposed contours = SOLID lines." },
    { front: "O.C. (On Center)", back: "Spacing measured center-to-center. Example: '#4 rebar @ 12\" O.C.' means bars spaced every 12 inches from center of one to center of the next." }
  ],

  4: [
    { front: "Slope Formula", back: "Slope (%) = (Rise ÷ Run) × 100. Example: 2 ft rise over 50 ft run = (2/50) × 100 = 4% slope." },
    { front: "Rational Method (Q = CiA)", back: "Q = peak runoff (cfs). C = runoff coefficient (0–1). i = rainfall intensity (in/hr). A = drainage area (acres). Impervious C ≈ 0.95, forest C ≈ 0.15." },
    { front: "Time of Concentration (Tc)", back: "Time for runoff to travel from the most hydraulically remote point in a watershed to the outlet. Determines peak flow timing." },
    { front: "Contour V-Shapes", back: "V's pointing UPHILL = valleys/swales (water collects). V's pointing DOWNHILL = ridges." },
    { front: "Manning's n for Concrete Pipe", back: "Concrete pipe ≤24\": n = 0.013. Pipe >24\": n = 0.012. Corrugated metal pipe: n = 0.024 (nearly double the roughness)." },
    { front: "Balanced Site (Grading)", back: "Cut volume equals fill volume — the most economical solution since no soil needs to be imported or exported." },
    { front: "Bulking Factor", back: "Soil expands when excavated due to air voids. A factor of 1.25 means 1 cubic yard in-place becomes 1.25 cubic yards when dug up." },
    { front: "Maximum Mowing Slope", back: "3:1 maximum (3 horizontal : 1 vertical), with 4:1 preferred for safety. Steeper slopes risk mower tipping." },
    { front: "ADA Parking Slope", back: "Accessible parking and access aisles: maximum 2% slope in all directions for wheelchair stability and safe vehicle transfer." },
    { front: "Bioretention Drain Time", back: "Must drain within 48 hours to prevent mosquito breeding. Mosquito larvae require standing water for 48–72 hours to develop." },
    { front: "Bioretention Cell Size", back: "Typically requires 5–10% of the catchment surface area. Uses highly permeable soils and native vegetation." },
    { front: "Orifice Coefficient", back: "For sharp-edged orifice: C = 0.6. Accounts for the vena contracta effect where flow contracts through the opening. Q = CA√(2gh)." }
  ]
};

/** Perry's section-specific introductions */
export const PERRY_INTROS = {
  1: "Welcome to Section 1 — Inventory, Analysis, and Project Management. This is where every great project begins, Aggie. Here's how this section breaks down on the exam: Physical Analysis is the heavyweight at 39% — that's soils, slopes, viewsheds, microclimates, and McHarg overlay analysis. Inventory and Data Collection comes in at 21% — surveys, Sanborn maps, FEMA, zoning, and knowing the difference between inventory and analysis. Contextual Analysis is 19% — environmental impact assessments, CPTED, code compliance, and FAR calculations. Stakeholder Engagement is 14% — charrettes, public participation, and building consensus. And Project Management rounds it out at 7% — contracts, scheduling, CPM, and earned value. Master all five and you own this section. Let's get after it.",
  2: "Section 2 — Planning and Design. This is the heart of what we do as landscape architects, Aggie. Master Planning leads at 33% — large-scale land-use planning, program development, and spatial organization. Schematic Design is 28% — developing preliminary design concepts, alternative layouts, and site circulation. Design Development comes in at 22% — refining designs with materials, grading concepts, and detailed plans. And Stewardship and Design Principles at 17% — sustainable design, environmental ethics, and universal design. Know your ADA slopes, your stair formulas, Kevin Lynch's five elements, and your design principles. I believe in you, Aggie.",
  3: "Section 3 — Construction Documentation and Administration. This is where design meets the real world, Aggie. Construction Plans and Details dominate at 50% — layout plans, materials, technical details, and knowing your line types. Construction Administration is 30% — site observation, submittals, RFIs, shop drawings, punch lists, and change orders. And Construction Specifications and Bidding at 20% — CSI MasterFormat Division 32, writing specs, and contractor selection. Remember: we observe, we never supervise. That one word can change your liability. Let's build something.",
  4: "Welcome to the Widowmaker — Section 4, Grading, Drainage, and Stormwater Management. Grading and Earthwork leads at 44% — slope formula, contour manipulation, cut and fill, and knowing that contour V's point uphill in valleys. Stormwater Management is 39% — the Rational Method Q equals C-i-A, time of concentration, bioretention, and LID strategies. And Drainage Systems at 17% — Manning's equation, pipe sizing, inlet design, and subsurface drainage. This section separates the good from the great. Master the math, understand the water, and you've got this, Aggie."
};
