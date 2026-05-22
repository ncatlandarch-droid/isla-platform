/**
 * LARE Question Bank — Practice Questions by Section
 * Content informed by CLARB exam blueprint topic areas and NotebookLM research
 * Each question tagged to an official CLARB topic area
 */

export const QUESTION_BANK = {
  1: [
    {
      id: "q1-1",
      topic: "Project Management",
      text: "Which of the following documents is typically required for a contractor to receive final payment on a landscape architecture project?",
      options: [
        "Lien waivers from all subcontractors",
        "A preliminary design sketch",
        "The initial bid bond",
        "A Notice to Proceed"
      ],
      correct: 0,
      explanation: "Lien waivers ensure the owner is protected from claims by subcontractors before closing the contract. This is a standard requirement in construction administration."
    },
    {
      id: "q1-2",
      topic: "Physical Analysis",
      text: "A site analysis reveals a high water table at 18 inches below grade. Which of the following design responses is MOST appropriate?",
      options: [
        "Install deep-rooted shade trees with 36-inch root balls",
        "Design a rain garden with native hydric species",
        "Specify a 4-foot deep detention basin",
        "Recommend below-grade parking structures"
      ],
      correct: 1,
      explanation: "A high water table at 18 inches limits deep excavation. Rain gardens with native hydric (water-loving) species work with the existing condition rather than against it."
    },
    {
      id: "q1-3",
      topic: "Inventory & Data Collection",
      text: "During a Phase I Environmental Site Assessment (ESA), which of these would be classified as a Recognized Environmental Condition (REC)?",
      options: [
        "The presence of a mature oak tree on the property line",
        "Evidence of an underground storage tank on the site",
        "A residential home constructed in 2005",
        "A well-maintained community garden"
      ],
      correct: 1,
      explanation: "Underground storage tanks (USTs) represent potential soil and groundwater contamination, which is the primary concern of a Phase I ESA under ASTM E1527."
    },
    {
      id: "q1-4",
      topic: "Contextual Analysis",
      text: "A landscape architect is evaluating a site adjacent to a nationally listed historic district. Which federal regulation MOST directly affects the project scope?",
      options: [
        "Americans with Disabilities Act (ADA)",
        "Section 106 of the National Historic Preservation Act",
        "Clean Water Act Section 404",
        "Coastal Zone Management Act"
      ],
      correct: 1,
      explanation: "Section 106 requires federal agencies to consider the effects of undertakings on historic properties. Adjacency to a historic district triggers this review process."
    },
    {
      id: "q1-5",
      topic: "Stakeholder Engagement",
      text: "During a public charrette, which facilitation technique is MOST effective for generating broad community input in least time?",
      options: [
        "Individual written surveys distributed by mail",
        "Small breakout groups with dot-voting on priorities",
        "A formal lecture presentation by the design team",
        "One-on-one interviews with elected officials only"
      ],
      correct: 1,
      explanation: "Breakout groups with dot-voting allow democratic prioritization, encourage diverse participation, and efficiently synthesize community values within a limited timeframe."
    },
    {
      id: "q1-6",
      topic: "Physical Analysis",
      text: "Soil boring logs indicate a site has expansive clay soils (CH classification). This MOST directly impacts the design of:",
      options: [
        "Plant selection for pollinators",
        "Signage and wayfinding systems",
        "Foundation systems and hardscape structures",
        "Irrigation controller programming"
      ],
      correct: 2,
      explanation: "Expansive clay (CH) soils shrink and swell with moisture changes, directly impacting foundations, walls, and hardscape. Design must account for differential movement."
    },
    {
      id: "q1-7",
      topic: "Project Management",
      text: "A client requests significant scope additions after the construction documents are 80% complete. The landscape architect should FIRST:",
      options: [
        "Incorporate all changes immediately to maintain the relationship",
        "Refuse the changes since CDs are nearly complete",
        "Document the request and issue an additional services proposal",
        "Contact the contractor to negotiate a reduced fee"
      ],
      correct: 2,
      explanation: "Professional practice requires written documentation of scope changes. An additional services proposal protects both the client and the firm by clarifying cost and schedule impacts."
    },
    {
      id: "q1-8",
      topic: "Inventory & Data Collection",
      text: "A USGS topographic map indicates blue dashed lines crossing a project site. These MOST likely represent:",
      options: [
        "Property boundaries",
        "Intermittent streams",
        "Underground utilities",
        "Contour lines at 2-foot intervals"
      ],
      correct: 1,
      explanation: "On USGS topographic maps, blue dashed lines represent intermittent streams — waterways that flow seasonally. These may be jurisdictional waters requiring regulatory review."
    },
    {
      id: "q1-9",
      topic: "Project Management",
      text: "A civil engineering group budgeted 100 hours for the 30% design phase. They have spent 120 hours but only completed 20% of the work. What is the earned value (BCWP)?",
      options: ["100 hours", "120 hours", "67 hours", "80 hours"],
      correct: 2,
      explanation: "BCWP (Earned Value) = (% complete / % planned) × budget. (20%/30%) × 100 = 67 hours. This shows the group is significantly over budget relative to work completed."
    },
    {
      id: "q1-10",
      topic: "Project Management",
      text: "When ACWP exceeds BCWP, this indicates the project is:",
      options: ["Under budget", "Over budget", "Ahead of schedule", "At break-even"],
      correct: 1,
      explanation: "When Actual Cost of Work Performed (ACWP) exceeds Budgeted Cost of Work Performed (BCWP/Earned Value), a negative variance exists — the project is running over budget."
    },
    {
      id: "q1-11",
      topic: "Project Management",
      text: "Which fee structure establishes a maximum cost the client will pay, with any savings shared or retained by the contractor?",
      options: ["Lump Sum", "Time & Materials", "Guaranteed Maximum Price (GMP)", "Cost Plus Fixed Fee"],
      correct: 2,
      explanation: "GMP sets a maximum price ceiling. The contractor bears risk for overruns, while savings may be shared. Unlike T&M, it protects the owner from unlimited cost exposure."
    },
    {
      id: "q1-12",
      topic: "Project Management",
      text: "In a Critical Path Method (CPM) schedule, a 'Finish-to-Start' dependency means:",
      options: ["Both tasks must finish at the same time", "Task B cannot start until Task A finishes", "Both tasks must start simultaneously", "Task A finishes when Task B starts"],
      correct: 1,
      explanation: "Finish-to-Start (FS) is the most common dependency: the predecessor must finish before the successor can start. Example: excavation must finish before foundation placement begins."
    },
    {
      id: "q1-13",
      topic: "Project Management",
      text: "Which scheduling method BEST shows the critical path and interdependent task relationships?",
      options: ["Milestone list", "Bar chart (Gantt)", "Critical Path Method (CPM)", "Simple to-do list"],
      correct: 2,
      explanation: "CPM networks show dependent, interconnected tasks and identify the critical path — the longest sequence of tasks determining minimum project duration. Gantt charts show durations but not dependencies."
    },
    {
      id: "q1-14",
      topic: "Project Management",
      text: "A landscape architect's contract contains the word 'guarantee' regarding plant survival. This language is problematic because it:",
      options: ["Is too vague for enforcement", "Expands the designer's liability beyond standard of care", "Reduces the contractor's responsibility", "Is required by most state licensing boards"],
      correct: 1,
      explanation: "Words like 'guarantee,' 'certify,' 'ensure,' 'insure,' 'maximize,' and 'supervise' expand liability beyond the standard of care. Professional practice recommends avoiding these terms in contracts."
    },
    {
      id: "q1-15",
      topic: "Project Management",
      text: "Which dispute resolution method involves a neutral facilitator helping parties negotiate but does NOT produce a binding decision?",
      options: ["Arbitration", "Mediation", "Litigation", "Partnering"],
      correct: 1,
      explanation: "Mediation uses a neutral third-party facilitator to help parties negotiate a resolution, but the outcome is non-binding. Arbitration produces a binding decision. Partnering prevents disputes proactively."
    },
    {
      id: "q1-16",
      topic: "Project Management",
      text: "In project management, 'partnering' is BEST described as:",
      options: ["A binding legal agreement between owner and contractor", "Facilitator-led team sessions to establish common goals before construction", "A method of selecting contractors through competitive bidding", "An insurance policy against construction defects"],
      correct: 1,
      explanation: "Partnering involves facilitator-led team-building sessions before and during a project to establish common goals, improve communication, and avoid the 'us-against-them' mentality."
    },
    {
      id: "q1-17",
      topic: "Project Management",
      text: "A 'Discipline Check' in quality control involves:",
      options: ["Reviewing work with the project team members who created it", "Having an expert NOT on the project review the work", "Sending documents to the client for approval", "Cross-referencing drawings with the contractor's schedule"],
      correct: 1,
      explanation: "A Discipline Check is reviewed by an expert NOT on the project (often department heads). This fresh perspective catches errors the project team may overlook due to familiarity."
    },
    {
      id: "q1-18",
      topic: "Contextual Analysis",
      text: "A Floor Area Ratio (FAR) of 2.0 on a 10,000 sq ft lot means the maximum building floor area is:",
      options: ["5,000 sq ft", "10,000 sq ft", "20,000 sq ft", "40,000 sq ft"],
      correct: 2,
      explanation: "FAR = total building floor area ÷ lot area. FAR 2.0 × 10,000 sq ft = 20,000 sq ft of building floor area. This could be a 2-story building covering the full lot or 4 stories at 50% coverage."
    },
    {
      id: "q1-19",
      topic: "Contextual Analysis",
      text: "A property owner seeks to use their residentially-zoned land for a small commercial nursery. They should apply for a:",
      options: ["Variance", "Conditional use permit", "Rezoning to industrial", "Building permit only"],
      correct: 1,
      explanation: "Conditional use permits allow nonconforming but compatible uses in a zone. A variance is granted for hardship. A nursery in a residential zone is a classic conditional use scenario."
    },
    {
      id: "q1-20",
      topic: "Inventory & Data Collection",
      text: "A Phase I ESA under ASTM E-1527 does NOT include:",
      options: ["Review of historical ownership records", "Visual site inspection", "Soil and groundwater sampling", "Review of regulatory databases"],
      correct: 2,
      explanation: "Phase I ESA is a records review and visual inspection — it does NOT involve physical testing. Soil/groundwater sampling is Phase II, triggered only if Phase I identifies Recognized Environmental Conditions."
    },
    {
      id: "q1-21",
      topic: "Physical Analysis",
      text: "A geotechnical report for a proposed building site shows a soil boring log with a bearing capacity of 1,500 psf at 4 feet. This information is MOST useful for determining:",
      options: ["Plant species selection for the landscape plan", "Foundation design and structural support requirements", "Irrigation system pipe sizing", "The aesthetic character of the hardscape materials"],
      correct: 1,
      explanation: "Geotechnical reports summarize subsurface soil conditions for construction. Bearing capacity directly determines what foundation systems will support the proposed structures safely."
    },
    {
      id: "q1-22",
      topic: "Physical Analysis",
      text: "Ian McHarg's overlay analysis method is MOST accurately described as:",
      options: ["A construction document review process", "A method of assigning relative value to site features and layering them to reveal patterns for land-use suitability", "A technique for calculating cut and fill volumes", "A public engagement strategy for gathering community input"],
      correct: 1,
      explanation: "McHarg's Design with Nature introduced overlay mapping — assigning values to features like soils, slopes, and vegetation, then layering transparencies (now done with GIS) to identify the most suitable areas for development."
    },
    {
      id: "q1-23",
      topic: "Physical Analysis",
      text: "The three key factors that determine fire risk in a landscape are:",
      options: ["Soil type, vegetation density, and rainfall", "Fuel, topography, and weather", "Slope percentage, aspect, and altitude", "Building materials, zoning, and wind speed"],
      correct: 1,
      explanation: "Fire risk is calculated based on fuel (vegetation type and density), topography (steep slopes accelerate fire), and weather (wind, humidity, temperature). Fire risk is inherently cultural — proximity to structures determines priority."
    },
    {
      id: "q1-24",
      topic: "Physical Analysis",
      text: "Plants classified as 'xerophytic' are adapted to:",
      options: ["High-salt soils", "Dry soils with low moisture", "Moderately moist soils", "Wet soils or standing water"],
      correct: 1,
      explanation: "Xerophytic plants tolerate dry soils. The full habitat classification: halophytic (salt), xerophytic (dry), mesophytic (moderate moisture), hydrophytic (wet/floating)."
    },
    {
      id: "q1-25",
      topic: "Inventory & Data Collection",
      text: "An ALTA/NSPS Land Title Survey is PRIMARILY used to:",
      options: ["Determine the fire rating of existing structures", "Document boundaries, easements, improvements, and restrictions for developers and lenders", "Establish planting zones based on USDA hardiness", "Calculate stormwater runoff coefficients"],
      correct: 1,
      explanation: "ALTA/NSPS surveys follow strict national standards to document all site characteristics — boundaries, right-of-way, easements, restrictions, and improvements. They are required by developers, builders, and lenders."
    },
    {
      id: "q1-26",
      topic: "Inventory & Data Collection",
      text: "A Comprehensive Plan, as defined by the American Planning Association, includes all of the following elements EXCEPT:",
      options: ["Land Use Element", "Transportation Element", "Construction Specifications Element", "Housing Element"],
      correct: 2,
      explanation: "Comprehensive Plans include Land Use, Transportation, Community Facilities, Housing, Economic Development, and Critical/Sensitive Areas elements. Construction Specifications belong to construction documents, not planning."
    },
    {
      id: "q1-27",
      topic: "Inventory & Data Collection",
      text: "Sanborn Insurance Maps are valuable for site inventory because they:",
      options: ["Show current utility locations and capacities", "Document historical land use and building footprints from the 19th-20th centuries", "Provide current FEMA flood zone designations", "Indicate USDA soil classifications"],
      correct: 1,
      explanation: "Sanborn Maps were created for fire insurance companies and document detailed historical building footprints and land use. They are found at city libraries and archives and are invaluable for understanding a site's development history."
    },
    {
      id: "q1-28",
      topic: "Stakeholder Engagement",
      text: "A design 'charrette' is BEST described as:",
      options: ["A formal bidding process for construction contracts", "A focused, collaborative design session that brings stakeholders together to develop alternatives through public input", "A legal document establishing project scope and fee", "A quality control review performed by an outside expert"],
      correct: 1,
      explanation: "A charrette brings all stakeholders together for intensive, focused design sessions. It includes site tours, public meetings, design development, and feedback — the most effective technique for generating broad community consensus."
    },
    {
      id: "q1-29",
      topic: "Contextual Analysis",
      text: "CPTED (Crime Prevention Through Environmental Design) strategies include all of the following EXCEPT:",
      options: ["Natural surveillance through clear sightlines", "Access control through defined entry points", "Territorial reinforcement through landscape design", "Increasing building height to maximize density"],
      correct: 3,
      explanation: "CPTED uses three main strategies: natural surveillance (sightlines), access control (defined entries), and territorial reinforcement (landscape cues showing ownership). Building height maximization is a zoning/density concept, not a crime prevention strategy."
    },
    {
      id: "q1-30",
      topic: "Contextual Analysis",
      text: "The 'clear sight triangle' at a street intersection is designed to:",
      options: ["Maximize parking capacity near the intersection", "Ensure unobstructed visibility for pedestrian and driver safety", "Create shade for pedestrians waiting to cross", "Reduce stormwater runoff from impervious surfaces"],
      correct: 1,
      explanation: "The clear sight triangle prohibits visual obstructions (tall plants, structures, signs) within the triangle area at intersections. This ensures drivers and pedestrians can see each other, preventing accidents."
    },
    {
      id: "q1-31",
      topic: "Physical Analysis",
      text: "To apply 3 lbs of nitrogen per 1,000 sf using a 20-10-5 fertilizer, how many pounds of fertilizer are needed?",
      options: ["10 lbs", "15 lbs", "20 lbs", "60 lbs"],
      correct: 1,
      explanation: "Divide the desired rate by the percentage of the nutrient: 3 ÷ 0.20 = 15 lbs. The 20 in '20-10-5' means 20% nitrogen by weight. The remaining weight is inert filler."
    },
    {
      id: "q1-32",
      topic: "Contextual Analysis",
      text: "A five-story building with a 10,000 sf footprint on a one-acre lot has a Floor Area Ratio (FAR) of approximately:",
      options: ["0.87", "1.15", "2.30", "5.00"],
      correct: 1,
      explanation: "Total floor area = 10,000 sf × 5 stories = 50,000 sf. 1 acre = 43,560 sf (MEMORIZE this). FAR = 50,000 ÷ 43,560 = 1.15."
    },
    {
      id: "q1-33",
      topic: "Physical Analysis",
      text: "Based on a soils map, which soil type would be BEST suited as subgrade for a proposed high-rise building?",
      options: ["Clay", "Loose sand", "Well-graded, well-compacted sand and gravel", "Silt"],
      correct: 2,
      explanation: "Bearing capacity rankings: Clay (1-2 tons/sf) is weakest. Well-graded, compacted sand/gravel (10 tons/sf) is the best common soil for building support. Focus on RELATIVE strength for exam questions."
    },
    {
      id: "q1-34",
      topic: "Contextual Analysis",
      text: "The minimum path of travel width under PROWAG vs. ADA standards is:",
      options: ["36 inches for both", "48 inches for PROWAG, 36 inches for ADA", "60 inches for PROWAG, 48 inches for ADA", "36 inches for PROWAG, 48 inches for ADA"],
      correct: 1,
      explanation: "PROWAG requires 48\" minimum in the public right-of-way. ADA requires 36\" minimum on accessible routes. In the public realm, you need more space. Both require 60\" × 60\" passing spaces every 200 feet."
    },
    {
      id: "q1-35",
      topic: "Physical Analysis",
      text: "A soil with a Plasticity Index (PI) of 35 would be classified as:",
      options: ["Non-expansive", "Slightly expansive", "Expansive", "Highly expansive"],
      correct: 2,
      explanation: "The Plasticity Index measures shrink-swell potential. PI > 20 = expansive. PI > 40 = highly expansive. A PI of 35 falls in the expansive range — these soils swell when wet and shrink when dry, causing structural damage."
    },
    {
      id: "q1-36",
      topic: "Physical Analysis",
      text: "In the intermediate fire defensible zone (5 to 30 feet from a structure), the minimum spacing between tree tops should be:",
      options: ["6 feet", "12 feet", "18 feet", "30 feet"],
      correct: 2,
      explanation: "Fire defensible zones: Intermediate (5-30 ft) = 18 ft between tree tops. Extended (30-60 ft) = 12 ft. Extended (60-100 ft) = 6 ft. Spacing increases closer to structures to reduce fire spread risk."
    },
    {
      id: "q1-37",
      topic: "Inventory & Data Collection",
      text: "A zoning chart allows 30 DU/acre for a five-story building. On a 2-acre site, the maximum number of dwelling units is:",
      options: ["30 units", "45 units", "60 units", "150 units"],
      correct: 2,
      explanation: "Density = DU/acre × site acreage. 30 DU/acre × 2 acres = 60 dwelling units. The building height determines which density tier applies from the zoning chart."
    },
    {
      id: "q1-38",
      topic: "Physical Analysis",
      text: "Soil particles classified as 'silt' have a particle size range of:",
      options: ["0.5-2.0 mm", "0.05-0.5 mm", "0.002-0.05 mm", "Less than 0.002 mm"],
      correct: 2,
      explanation: "Soil particle sizes from largest to smallest: Coarse Sand (0.5-2.0 mm), Fine Sand (0.05-0.5 mm), Silt (0.002-0.05 mm), Clay (< 0.002 mm). Clay particles are the smallest."
    },
    {
      id: "q1-39",
      topic: "Physical Analysis",
      text: "The vertical lapse rate means that for every 1,000 feet of elevation gain, temperature typically:",
      options: ["Increases by 3.5°F", "Drops by 3.5°F", "Drops by 10°F", "Remains unchanged"],
      correct: 1,
      explanation: "The vertical lapse rate is typically -3.5°F per 1,000 feet of elevation gain. This affects microclimate planning — higher sites are cooler, which influences plant selection and comfort."
    },
    {
      id: "q1-40",
      topic: "Contextual Analysis",
      text: "Under ADA standards, the maximum running slope for a ramp is:",
      options: ["2.1% (1:48)", "5% (1:20)", "8.33% (1:12)", "12.5% (1:8)"],
      correct: 2,
      explanation: "ADA walkways cannot exceed 5%. ADA ramps cannot exceed 8.33% (1:12). Cross slopes for both ADA and PROWAG max at 1:48 (≈ 2.1%). These dimensional standards are frequently tested."
    }
  ],

  2: [
    {
      id: "q2-1",
      topic: "Stewardship & Design Principles",
      text: "The 'carrying capacity' of a recreational site refers MOST accurately to:",
      options: [
        "The maximum structural load on bedrock",
        "The amount of use a resource can sustain without unacceptable degradation",
        "The total parking capacity based on Floor Area Ratio",
        "The peak flow volume of the primary watershed"
      ],
      correct: 1,
      explanation: "Carrying capacity defines the limit of human use an environment can handle before ecological or experiential degradation occurs. It is central to sustainable recreation planning."
    },
    {
      id: "q2-2",
      topic: "Master Planning",
      text: "In a campus master plan, a 'desire line' analysis reveals heavy pedestrian traffic cutting diagonally across a maintained lawn. The BEST design response is to:",
      options: [
        "Install fencing to prevent lawn damage",
        "Post signage directing pedestrians to existing sidewalks",
        "Formalize the diagonal path with appropriate paving",
        "Replant with a more durable turf species"
      ],
      correct: 2,
      explanation: "Desire lines reveal natural movement patterns. Good master planning responds to observed user behavior rather than forcing users into arbitrary circulation patterns."
    },
    {
      id: "q2-3",
      topic: "Schematic Design",
      text: "When designing a public plaza in a hot-arid climate, which spatial strategy MOST effectively creates thermal comfort?",
      options: [
        "Maximize open lawn areas for air circulation",
        "Create a sequence of shaded courtyards with water features",
        "Orient all seating areas facing south for maximum sun exposure",
        "Use light-colored concrete exclusively for all surfaces"
      ],
      correct: 1,
      explanation: "Shaded courtyards with water features combine evaporative cooling with solar protection — the most effective passive cooling strategies in hot-arid climates."
    },
    {
      id: "q2-4",
      topic: "Design Development",
      text: "The ADA requires accessible routes to have a maximum running slope of:",
      options: [
        "1:8 (12.5%)",
        "1:12 (8.33%)",
        "1:20 (5.0%)",
        "1:48 (2.08%)"
      ],
      correct: 2,
      explanation: "ADA accessible routes require a maximum running slope of 1:20 (5%). Slopes steeper than 1:20 are classified as ramps and require handrails, landings, and edge protection."
    },
    {
      id: "q2-5",
      topic: "Master Planning",
      text: "A Transit-Oriented Development (TOD) typically designates the highest density land uses within what radius of a transit station?",
      options: [
        "1/8 mile",
        "1/4 mile",
        "1 mile",
        "2 miles"
      ],
      correct: 1,
      explanation: "The 1/4-mile radius (approximately a 5-minute walk) is the standard planning threshold for highest density in TODs, representing a comfortable pedestrian walking distance."
    },
    {
      id: "q2-6",
      topic: "Stewardship & Design Principles",
      text: "Which design approach BEST exemplifies biomimicry in stormwater management?",
      options: [
        "Concrete-lined channels for maximum flow velocity",
        "Constructed wetlands that filter runoff like natural ecosystems",
        "Oversized underground detention vaults",
        "Increasing impervious surface to direct flow to drains"
      ],
      correct: 1,
      explanation: "Biomimicry applies nature's strategies to solve design problems. Constructed wetlands mimic natural wetland processes for filtration, absorption, and habitat creation."
    },
    {
      id: "q2-7",
      topic: "Schematic Design",
      text: "Kevin Lynch's 'Image of the City' identifies five urban elements. Which is NOT one of them?",
      options: [
        "Paths",
        "Edges",
        "Textures",
        "Nodes"
      ],
      correct: 2,
      explanation: "Lynch's five elements are Paths, Edges, Districts, Nodes, and Landmarks. 'Textures' is not one of the five elements of urban imageability."
    },
    {
      id: "q2-8",
      topic: "Design Development",
      text: "In a planting design, the term 'ecotone' refers to:",
      options: [
        "A species-specific growing zone based on USDA hardiness",
        "The transition zone between two adjacent ecological communities",
        "The optimum soil pH for native plant establishment",
        "A tree's maximum canopy spread at maturity"
      ],
      correct: 1,
      explanation: "An ecotone is the transitional boundary between two biological communities (e.g., forest to meadow). These zones often have the highest biodiversity."
    },
    {
      id: "q2-9",
      topic: "Design Development",
      text: "According to ADA standards, the maximum slope for an accessible ramp is:",
      options: ["1:8 (12.5%)", "1:12 (8.33%)", "1:16 (6.25%)", "1:20 (5.0%)"],
      correct: 1,
      explanation: "ADA requires ramps to have a maximum running slope of 1:12 (8.33%). Flatter slopes (1:16 to 1:20) are preferred and allow longer runs before landings."
    },
    {
      id: "q2-10",
      topic: "Design Development",
      text: "The minimum clear width for an ADA-compliant accessible ramp is:",
      options: ["24 inches", "36 inches", "48 inches", "60 inches"],
      correct: 1,
      explanation: "ADA requires a minimum clear width of 36 inches (915mm) for accessible ramps, measured between handrails."
    },
    {
      id: "q2-11",
      topic: "Design Development",
      text: "An ADA-compliant ramp with a slope of 1:12 requires a level landing after a maximum rise of:",
      options: ["12 inches", "24 inches", "30 inches", "48 inches"],
      correct: 2,
      explanation: "ADA requires a landing after a maximum 30-inch rise (or 30-foot run). Landings must be at least 60 inches long, and 60×60 inches if the ramp changes direction."
    },
    {
      id: "q2-12",
      topic: "Design Development",
      text: "The comfortable stair formula used in landscape architecture is:",
      options: ["R + T = 17-18 inches", "2R + T = 26-27 inches", "R × T = 75", "3R + T = 32 inches"],
      correct: 1,
      explanation: "The standard stair formula is 2R + T = 26-27 inches, where R = riser height and T = tread depth. This produces a comfortable walking rhythm for outdoor stairs."
    },
    {
      id: "q2-13",
      topic: "Design Development",
      text: "The maximum cross-slope allowed on an ADA-accessible walking surface is:",
      options: ["1:100 (1%)", "1:50 (2%)", "1:20 (5%)", "1:12 (8.33%)"],
      correct: 1,
      explanation: "ADA restricts cross-slopes to a maximum of 1:50 (2%) on accessible routes and walking surfaces. Greater cross-slopes can cause wheelchair instability."
    },
    {
      id: "q2-14",
      topic: "Stewardship & Design Principles",
      text: "The sustainable design hierarchy prioritizes actions in which order?",
      options: ["Regeneration → Conservation → Preservation", "Preservation → Conservation → Regeneration", "Conservation → Preservation → Regeneration", "Regeneration → Preservation → Conservation"],
      correct: 1,
      explanation: "'Design with nature and culture' follows the hierarchy: Preservation (protect what exists) → Conservation (maintain resources) → Regeneration (restore degraded systems)."
    },
    {
      id: "q2-15",
      topic: "Stewardship & Design Principles",
      text: "Which soil texture provides the MOST plant-available water?",
      options: ["Sand", "Clay", "Loam", "Gravel"],
      correct: 2,
      explanation: "Loam soils provide the most plant-available water because they balance drainage (like sand) with water retention (like clay). Pure clay holds water tightly, making it less available to plants."
    },
    {
      id: "q2-16",
      topic: "Ecological Design",
      text: "The primary principle of 'Right Plant, Right Place' in sustainable planting design is to:",
      options: ["Choose the most visually dramatic species", "Select vegetation adapted to the site's soil, hydrology, and climate", "Use only cultivated varieties for disease resistance", "Match plant color to the client's corporate branding"],
      correct: 1,
      explanation: "Right Plant, Right Place means selecting plants adapted to existing site conditions — soil type, moisture, sun exposure, and climate. This reduces maintenance, irrigation, and plant failure."
    },
    {
      id: "q2-17",
      topic: "Ecological Design",
      text: "Under the Sustainable Sites Initiative, which type of land is a prerequisite to AVOID developing?",
      options: ["Previously developed commercial sites", "Prime farmland, wetlands, and productive landscapes", "Urban infill parcels", "Brownfield sites"],
      correct: 1,
      explanation: "Sustainable Sites prerequisites protect prime farmland, wetlands, floodplains, and productive landscapes from development. These lands provide critical ecosystem services."
    },
    {
      id: "q2-18",
      topic: "Design Development",
      text: "Universal design differs from ADA compliance in that it:",
      options: ["Only applies to public buildings", "Designs for the broadest range of users beyond minimum code", "Eliminates the need for ramps", "Is only required in federally funded projects"],
      correct: 1,
      explanation: "Universal design goes beyond ADA minimums to create environments usable by all people, from toddlers to elderly, without the need for adaptation or specialized design."
    },
    {
      id: "q2-19",
      topic: "Stewardship & Design Principles",
      text: "Ecosystem services provided by well-designed landscapes include all EXCEPT:",
      options: ["Air and water cleansing", "Carbon sequestration", "Productive soil generation", "Municipal tax revenue generation"],
      correct: 3,
      explanation: "Ecosystem services include air/water cleansing, water supply/regulation, productive soil, carbon sequestration, and habitat. Tax revenue is an economic benefit, not an ecosystem service."
    },
    {
      id: "q2-20",
      topic: "Master Planning",
      text: "Which reference text is considered the primary resource for site planning and master planning in landscape architecture?",
      options: ["Landscape Architectural Graphic Standards (Hopper)", "Site Planning & Design Handbook (Russ)", "Sustainable Sites Handbook (Calkins)", "Site Analysis, 3rd Ed (LaGro)"],
      correct: 1,
      explanation: "The Site Planning & Design Handbook by Russ is the primary reference for master planning and schematic design. Hopper covers graphic standards, Calkins covers sustainability, LaGro covers analysis."
    }
  ],

  3: [
    {
      id: "q3-1",
      topic: "Construction Plans & Details",
      text: "In a landscape construction detail, a 'weep hole' in a retaining wall serves PRIMARILY to:",
      options: [
        "Provide access for irrigation lines",
        "Allow hydrostatic pressure to drain from behind the wall",
        "Create planting pockets for trailing vines",
        "Meet aesthetic pattern requirements"
      ],
      correct: 1,
      explanation: "Weep holes relieve hydrostatic pressure that builds up behind retaining walls. Without them, water pressure can cause structural failure."
    },
    {
      id: "q3-2",
      topic: "Construction Specifications & Bidding",
      text: "In CSI MasterFormat, Division 32 covers:",
      options: [
        "Mechanical systems and HVAC",
        "Exterior improvements including paving, fencing, and planting",
        "Electrical and lighting systems",
        "General requirements and project conditions"
      ],
      correct: 1,
      explanation: "Division 32 — Exterior Improvements — is the primary division for landscape architecture specifications, covering site paving, landscaping, irrigation, and site furnishings."
    },
    {
      id: "q3-3",
      topic: "Construction Administration",
      text: "During construction observation, the landscape architect notices the contractor has substituted a different tree species without approval. The CORRECT response is to:",
      options: [
        "Accept the substitution if the tree appears healthy",
        "Issue a Request for Information (RFI) to the contractor",
        "Document the non-conformance and issue a field report noting the deviation",
        "Contact the nursery supplier directly to resolve the issue"
      ],
      correct: 2,
      explanation: "Unauthorized material substitutions require formal documentation. A field report creates a written record and requires the contractor to address the non-conformance through proper channels."
    },
    {
      id: "q3-4",
      topic: "Construction Plans & Details",
      text: "The minimum depth of compacted aggregate base for a vehicular-rated concrete paver system in expansive soils is TYPICALLY:",
      options: [
        "2 inches",
        "4 inches",
        "6-8 inches",
        "12-18 inches"
      ],
      correct: 2,
      explanation: "Vehicular-rated paver systems typically require 6-8 inches of compacted aggregate base minimum, potentially more in expansive soils. This distributes wheel loads and provides drainage."
    },
    {
      id: "q3-5",
      topic: "Construction Specifications & Bidding",
      text: "An 'Addendum' to project bid documents is issued:",
      options: [
        "After the contract is awarded to clarify scope",
        "During the bidding period to modify or clarify the contract documents",
        "At substantial completion to list remaining punch list items",
        "Only when the owner requests a cost reduction"
      ],
      correct: 1,
      explanation: "Addenda are issued during the bidding period to modify, clarify, or correct the original bid documents. They become part of the contract documents."
    },
    {
      id: "q3-6",
      topic: "Construction Administration",
      text: "The term 'substantial completion' in a construction contract means:",
      options: [
        "100% of all work is finished with no exceptions",
        "The work is sufficiently complete for the owner to use it for its intended purpose",
        "All change orders have been processed and approved",
        "The landscape architect has completed final inspection"
      ],
      correct: 1,
      explanation: "Substantial completion means the project is complete enough for the owner's intended use, even if minor punch list items remain. It triggers important contractual obligations."
    },
    {
      id: "q3-7",
      topic: "Construction Plans & Details",
      text: "A geotextile fabric is placed between aggregate base and subgrade soil PRIMARILY to:",
      options: [
        "Prevent roots from penetrating the base course",
        "Add structural strength equivalent to 6 inches of concrete",
        "Prevent fine soil particles from migrating into the aggregate base",
        "Serve as a waterproofing membrane"
      ],
      correct: 2,
      explanation: "Geotextile separation fabric prevents the infiltration of subgrade fines into the aggregate base, maintaining the structural performance of the base course over time."
    },
    {
      id: "q3-8",
      topic: "Construction Administration",
      text: "A 'Shop Drawing' submitted by a contractor is reviewed by the landscape architect to:",
      options: [
        "Replace the original construction documents",
        "Confirm the fabricator's interpretation matches the design intent",
        "Transfer liability from the designer to the contractor",
        "Provide final approval for payment"
      ],
      correct: 1,
      explanation: "Shop drawings show how the contractor/fabricator intends to build specific elements. The LA reviews them to confirm conformance with design intent, not to approve means and methods."
    },
    {
      id: "q3-9",
      topic: "Construction Administration",
      text: "During construction, a landscape architect should use the term 'observation' rather than 'supervision' because:",
      options: ["Observation is more detailed than supervision", "Using 'supervision' can increase the designer's legal liability", "Owners prefer the term observation", "There is no practical difference between the terms"],
      correct: 1,
      explanation: "The term 'supervision' implies the designer is directing the contractor's work, which significantly increases liability. 'Observation' correctly reflects the designer's role: monitoring conformance with design intent."
    },
    {
      id: "q3-10",
      topic: "Construction Administration",
      text: "A Request for Information (RFI) is issued by the:",
      options: ["Owner to the landscape architect", "Landscape architect to the owner", "Contractor to the design team for clarification", "Building inspector to the contractor"],
      correct: 2,
      explanation: "RFIs are issued by the contractor to the design team when construction documents need clarification. They create a formal paper trail for design decisions made during construction."
    },
    {
      id: "q3-11",
      topic: "Construction Administration",
      text: "A 'Change Order' during construction formally modifies the:",
      options: ["Design team's professional license", "Contract scope, price, and/or schedule", "Zoning requirements for the property", "The contractor's insurance policy"],
      correct: 1,
      explanation: "Change Orders are formal written modifications to the construction contract that can affect scope of work, contract price, and/or project schedule. They require owner approval."
    },
    {
      id: "q3-12",
      topic: "Construction Administration",
      text: "A punch list is created:",
      options: ["Before the bid opening", "At the start of construction", "Near substantial completion to document remaining items", "Only if the project is over budget"],
      correct: 2,
      explanation: "The punch list is created near substantial completion. It documents remaining minor items the contractor must complete or correct before final payment and project close-out."
    },
    {
      id: "q3-13",
      topic: "Construction Administration",
      text: "Close-out procedures for a landscape project typically include all of the following EXCEPT:",
      options: ["As-built drawings", "Warranty documentation", "Redesigning the original concept", "Final lien waivers"],
      correct: 2,
      explanation: "Close-out includes as-built drawings, warranties, O&M manuals, final lien waivers, and certificate of substantial completion. Redesigning the concept is a design phase activity."
    },
    {
      id: "q3-14",
      topic: "Construction Specifications & Bidding",
      text: "In CSI MasterFormat, landscape irrigation systems fall under:",
      options: ["Division 22 — Plumbing", "Division 31 — Earthwork", "Division 32 — Exterior Improvements", "Division 33 — Utilities"],
      correct: 2,
      explanation: "Division 32 — Exterior Improvements covers landscape-related specifications including irrigation, planting, paving, fencing, and site furnishings."
    },
    {
      id: "q3-15",
      topic: "Construction Specifications & Bidding",
      text: "A contractor proposes a material substitution during construction. The substitution must be:",
      options: ["Cheaper than the specified material", "Equal to or better than the specified product", "Approved by the local building inspector only", "From the same manufacturer as originally specified"],
      correct: 1,
      explanation: "Substitutions must be equal to or better than the originally specified products in quality, performance, and appearance. The designer reviews substitution requests for compliance with design intent."
    },
    {
      id: "q3-16",
      topic: "Construction Plans & Details",
      text: "On a grading plan, existing contours are typically shown as:",
      options: ["Solid lines", "Dashed lines", "Dotted lines", "Bold red lines"],
      correct: 1,
      explanation: "Standard convention: existing contours are shown as dashed lines, while proposed contours are shown as solid lines. This allows clear distinction between existing and proposed grades."
    },
    {
      id: "q3-17",
      topic: "Construction Plans & Details",
      text: "A layout plan provides which type of dimensional control?",
      options: ["Vertical control with spot elevations", "Horizontal control with distances from reference points", "Structural load calculations", "Planting spacing dimensions only"],
      correct: 1,
      explanation: "Layout plans provide horizontal control — they show buildings, walks, parking, and site features dimensioned relative to property boundaries, benchmarks, and other reference points."
    },
    {
      id: "q3-18",
      topic: "Construction Administration",
      text: "As-built drawings are important because they:",
      options: ["Replace the original construction documents", "Record actual field conditions and deviations from the design", "Are required before bidding can begin", "Transfer design liability to the contractor"],
      correct: 1,
      explanation: "As-built drawings document actual constructed conditions, including any field modifications. They are essential for future maintenance, renovation planning, and utility location."
    },
    {
      id: "q3-19",
      topic: "Construction Specifications & Bidding",
      text: "The 'General Conditions' section of a project manual covers:",
      options: ["Specific material specifications for planting", "Rights, responsibilities, and relationships between owner, contractor, and architect", "Detailed construction methods and sequencing", "Plant spacing and irrigation schedules"],
      correct: 1,
      explanation: "General Conditions establish the contractual framework — roles, responsibilities, payment procedures, insurance, dispute resolution, and other project-wide legal and administrative requirements."
    },
    {
      id: "q3-20",
      topic: "Construction Plans & Details",
      text: "A construction detail showing a seat wall indicates '#4 rebar @ 12 inches O.C.' The 'O.C.' stands for:",
      options: ["Outside corner", "On center", "Offset clearance", "Original condition"],
      correct: 1,
      explanation: "O.C. means 'On Center' — the spacing measured from the center of one rebar to the center of the next. #4 rebar at 12\" O.C. means reinforcing bars spaced every 12 inches."
    }
  ],

  4: [
    {
      id: "q4-1",
      topic: "Grading & Earthwork",
      text: "The formula for calculating slope percentage is:",
      options: [
        "(Run ÷ Rise) × 100",
        "(Rise ÷ Run) × 100",
        "(Rise × Run) ÷ 100",
        "(Rise + Run) × 100"
      ],
      correct: 1,
      explanation: "Slope (%) = (Rise ÷ Run) × 100. This is the fundamental grading formula. For example, a 2-foot rise over a 50-foot run = (2/50) × 100 = 4% slope."
    },
    {
      id: "q4-2",
      topic: "Stormwater Management",
      text: "The Rational Method formula Q = CiA is used to calculate peak runoff. In this formula, 'C' represents:",
      options: [
        "The velocity coefficient of the drainage channel",
        "The runoff coefficient based on surface type and soil",
        "The concentration time in minutes",
        "The cost factor per cubic foot of storage"
      ],
      correct: 1,
      explanation: "In Q=CiA, C is the runoff coefficient (0-1) representing the fraction of rainfall that becomes runoff. Impervious surfaces like concrete have C≈0.95; forests have C≈0.15."
    },
    {
      id: "q4-3",
      topic: "Grading & Earthwork",
      text: "On a grading plan, contour lines that form V-shapes pointing UPHILL indicate:",
      options: [
        "A ridge or crown",
        "A valley, swale, or drainage way",
        "A level terrace",
        "An area of zero slope"
      ],
      correct: 1,
      explanation: "Contour V's pointing uphill (toward higher elevations) indicate valleys or swales where water collects and flows downhill. V's pointing downhill indicate ridges."
    },
    {
      id: "q4-4",
      topic: "Drainage Systems",
      text: "The MINIMUM recommended slope for a 6-inch storm drain pipe is:",
      options: [
        "0.10%",
        "0.50%",
        "2.00%",
        "5.00%"
      ],
      correct: 1,
      explanation: "A minimum 0.5% slope is generally recommended for 6-inch storm drain pipes to maintain self-cleaning velocity (approximately 2.5 fps) and prevent sediment accumulation."
    },
    {
      id: "q4-5",
      topic: "Stormwater Management",
      text: "A bioretention cell (rain garden) is designed to treat stormwater PRIMARILY through which process?",
      options: [
        "Rapid conveyance to the storm sewer system",
        "Infiltration, filtration, and biological uptake",
        "Chemical treatment with added coagulants",
        "Mechanical aeration and UV treatment"
      ],
      correct: 1,
      explanation: "Bioretention cells treat stormwater through natural processes: infiltration into engineered soil media, filtration by soil particles and microbes, and biological uptake by plants."
    },
    {
      id: "q4-6",
      topic: "Grading & Earthwork",
      text: "When grading a parking lot, the recommended cross-slope for ADA-compliant accessible parking spaces is:",
      options: [
        "0.5% maximum",
        "2.0% maximum in any direction",
        "5.0% maximum in the direction of travel",
        "8.33% maximum"
      ],
      correct: 1,
      explanation: "ADA requires accessible parking spaces and access aisles to have a maximum 2% slope in all directions. This ensures wheelchair stability and safe vehicle transfer."
    },
    {
      id: "q4-7",
      topic: "Stormwater Management",
      text: "The 'Time of Concentration' (Tc) for a watershed is defined as:",
      options: [
        "The time required for the soil to reach saturation",
        "The time for runoff to travel from the hydraulically most distant point to the outlet",
        "The duration of the design storm event",
        "The average time between rainfall events in a region"
      ],
      correct: 1,
      explanation: "Time of concentration is the time for runoff to travel from the most hydraulically remote point in a watershed to the point of interest (outlet). It determines peak flow timing."
    },
    {
      id: "q4-8",
      topic: "Drainage Systems",
      text: "A French drain system uses a perforated pipe surrounded by aggregate and wrapped in filter fabric. The filter fabric PRIMARILY serves to:",
      options: [
        "Increase the structural capacity of the pipe",
        "Prevent fine soil particles from clogging the aggregate and pipe",
        "Prevent tree roots from entering the pipe",
        "Reduce the velocity of water entering the pipe"
      ],
      correct: 1,
      explanation: "Filter fabric (geotextile) in a French drain prevents migration of fine soil particles into the stone aggregate, maintaining the system's drainage capacity over time."
    },
    {
      id: "q4-9",
      topic: "Stormwater Management",
      text: "In Manning's Equation, the 'n' value for concrete pipe 24 inches and under is:",
      options: ["0.009", "0.013", "0.024", "0.045"],
      correct: 1,
      explanation: "Manning's roughness coefficient (n) for concrete pipe ≤24\" is 0.013. For pipe >24\" it's 0.012. Corrugated metal pipe has n=0.024, which is much rougher."
    },
    {
      id: "q4-10",
      topic: "Stormwater Management",
      text: "The Manning's roughness coefficient (n) for galvanized corrugated metal pipe is:",
      options: ["0.011", "0.013", "0.024", "0.045"],
      correct: 2,
      explanation: "Corrugated metal pipe has Manning's n=0.024 due to its rough interior surface. This is nearly double the roughness of concrete pipe (n=0.013), resulting in lower flow velocity."
    },
    {
      id: "q4-11",
      topic: "Stormwater Management",
      text: "The formula for flow through a sharp-edged orifice is Q = CA√(2gh). The coefficient of contraction (C) for a sharp-edged orifice is typically:",
      options: ["0.3", "0.6", "0.9", "1.0"],
      correct: 1,
      explanation: "The coefficient of contraction for a sharp-edged orifice is typically 0.6. This accounts for the vena contracta effect where flow contracts as it passes through the opening."
    },
    {
      id: "q4-12",
      topic: "Stormwater Management",
      text: "The emergency spillway equation Q = CLH^(3/2) uses a coefficient C of approximately 3.1 when the spillway surface is:",
      options: ["Concrete", "Grass", "Rip-rap", "Steel"],
      correct: 1,
      explanation: "For grass-lined emergency spillways, the weir coefficient C ≈ 3.1. L is the spillway length and H is the depth of water over the spillway invert."
    },
    {
      id: "q4-13",
      topic: "Grading & Earthwork",
      text: "A 'balanced site' in grading means:",
      options: ["All slopes are the same percentage", "The cut volume equals the fill volume", "No retaining walls are needed", "The site drains to a single point"],
      correct: 1,
      explanation: "A balanced site means earthwork cut volume equals fill volume — the most economical grading solution since no soil needs to be imported or exported from the site."
    },
    {
      id: "q4-14",
      topic: "Grading & Earthwork",
      text: "The 'bulking factor' in earthwork refers to the fact that:",
      options: ["Soil compresses when loaded", "Soil expands when excavated and disturbed", "Clay soils shrink when dried", "Frozen soil cannot be excavated"],
      correct: 1,
      explanation: "When soil is excavated, it expands (bulks) because air voids are introduced. A bulking factor of 1.25 means 1 cubic yard in-place becomes 1.25 cubic yards when excavated."
    },
    {
      id: "q4-15",
      topic: "Grading & Earthwork",
      text: "The maximum slope for lawn areas that will be mowed with standard equipment is:",
      options: ["2:1", "3:1 (4:1 preferred)", "6:1", "10:1"],
      correct: 1,
      explanation: "Mowed slopes should not exceed 3:1 (3 horizontal : 1 vertical), with 4:1 preferred for safety. Steeper slopes risk mower tipping and are difficult to maintain."
    },
    {
      id: "q4-16",
      topic: "Grading & Earthwork",
      text: "New cut or fill slopes should not exceed a maximum slope of:",
      options: ["1:1", "2:1", "4:1", "6:1"],
      correct: 1,
      explanation: "New cut and fill slopes should not exceed 2:1 (2 horizontal : 1 vertical). Steeper slopes require structural stabilization or retaining walls."
    },
    {
      id: "q4-17",
      topic: "Stormwater Management",
      text: "A bioretention cell should drain completely within how many hours to prevent mosquito breeding?",
      options: ["12 hours", "24 hours", "48 hours", "72 hours"],
      correct: 2,
      explanation: "Bioretention cells must drain within 48 hours to prevent mosquito breeding. Mosquito larvae require standing water for 48-72 hours to develop."
    },
    {
      id: "q4-18",
      topic: "Stormwater Management",
      text: "Bioretention cells (rain gardens) typically require what percentage of catchment surface area?",
      options: ["1-2%", "5-10%", "15-20%", "25-30%"],
      correct: 1,
      explanation: "Bioretention cells consume 5-10% of the catchment surface area. They use highly permeable soils and native vegetation to remove sediments, nutrients, metals, and solids."
    },
    {
      id: "q4-19",
      topic: "Stormwater Management",
      text: "The 'first flush' in stormwater management refers to:",
      options: ["The initial test of a new pipe system", "The first 0.5-1.5 inches of rainfall that carries ~75% of pollutants", "The maximum flow rate during a 100-year storm", "The first time a detention basin fills to capacity"],
      correct: 1,
      explanation: "First flush is the initial 0.5 to 1.5 inches of rainfall that washes approximately 75% of accumulated pollutants (heavy metals, grease, sediment) from impervious surfaces."
    },
    {
      id: "q4-20",
      topic: "Stormwater Management",
      text: "Low-Impact Development (LID) is based on the principle of:",
      options: ["Maximizing pipe conveyance capacity", "Emulating pre-development hydrology — slow it down, spread it out, soak it in", "Directing all stormwater to regional detention facilities", "Increasing impervious surfaces for faster drainage"],
      correct: 1,
      explanation: "LID starts at the source and emulates pre-development hydrologic conditions by slowing runoff, spreading it across the landscape, and infiltrating it into the soil."
    }
  ]
};
