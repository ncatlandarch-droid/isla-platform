/**
 * LARE Knowledge Base — Sourced from NotebookLM "LARE Preparation" notebook (105 sources)
 *
 * This data is injected into Gemini prompts so AI-generated questions are
 * grounded in the actual LARE exam content, formulas, and standards.
 */

export const LARE_KNOWLEDGE = {
  1: {
    title: 'Inventory, Analysis, and Project Management',
    scoredItems: 90,
    blueprint: {
      'Physical Analysis': '39%',
      'Inventory and Data Collection': '21%',
      'Contextual Analysis': '19%',
      'Stakeholder Engagement Process': '14%',
      'Project Management': '7%'
    },
    keyConceptsAndFacts: `
## PROJECT MANAGEMENT (7%)

### Contract Delivery Methods
- Design-Bid-Build (General Contract): two separate contracts — one with design team, one with construction. Most common in public sector. Owner gets clear final cost before construction. Also called DBB.
- Design-Build: single contract covers design AND construction by the same company. 20-30% faster than General Contract. Can fast-track by starting sitework while design continues.
- Construction Management (CM): owner hires a firm with construction expertise to act as their agent. CM may fast-track scheduling.
- Construction Management At Risk: CM bears responsibility for completing on time and within budget.
- Self-Performance: owner performs some or all work in-house.
- Integrated Project Delivery (IPD): collaborative approach where all stakeholders work from a unified digital model (BIM) from the start. Minimizes costly late changes.
- On the LARE, ALWAYS assume the landscape architect is the prime consultant.

### Proposals & Procurement
- RFP (Request for Proposals): describes location and scope; firms respond with scope, fee, and qualifications
- RFQ (Request for Qualifications): develops a pre-qualified list ("bench") for 1-3 years
- Competitive bidding: required in public sector, jobs announced publicly
- Deciding factor for evaluating consultant proposals: scope and fee

### Fee Structures
- Lump Sum / Fixed Price: fixed fee, must have tightly written scope. Best for well-defined projects.
- Time & Materials with GMP (Guaranteed Maximum Price): provides owner more security, caps cost
- Cost Plus Fixed Fee: costs reimbursed, profit margin is a fixed negotiated amount
- Work Breakdown Structure (WBS): planning tool that defines tasks, hours, and budget per task

### Scheduling Methods
- Milestone List: simple chronological list of critical due dates
- Bar Chart (Gantt): shows task durations and overlaps, can show critical path in red
- Critical Path Method (CPM): shows dependent, interconnected tasks. Critical path = longest path = shortest possible project duration.
- PERT Chart: graphic diagram of milestones and projected durations
- Any delay on the critical path directly delays the project

### Task Dependencies
- Finish-to-Start (FS): most common — Task B cannot start until Task A finishes
- Start-to-Start (SS): tasks start at the same time
- Finish-to-Finish (FF): tasks finish at the same time
- Start-to-Finish (SF): one finishes when the other starts
- "Lag": time delay between dependent tasks

### Financial Tracking (Earned Value)
- ACWP (Actual Cost of Work Performed): actual money/hours spent
- BCWP (Budgeted Cost of Work Performed): earned value = (% complete / % planned) × budget
- BCWS (Budgeted Cost of Work Scheduled): estimated/planned cost
- Negative Variance: ACWP > BCWP → project running over budget
- Example: 100 hours budgeted for 30% phase. Spent 120 hours, only 20% complete. BCWP = (20%/30%) × 100 = 67 hours.

### Risk & Dispute Resolution
- Risk strategies: Prevention, Transference, Mitigation, Contingency Planning
- Partnering: facilitator-led team-building BEFORE construction to establish common goals
- Mediation: neutral third-party, NON-BINDING
- Arbitration: BINDING decision by third party

### Quality Control & Ethics
- Discipline Check: expert NOT on the project reviews work
- Interdisciplinary Check: cross-discipline review
- TQM: firm-wide quality culture, management leads by example
- AVOID risky words: "certify," "guarantee," "ensure," "insure," "maximize," "optimize," "supervise" — these expand liability beyond standard of care

---

## INVENTORY & DATA COLLECTION (21%)

### Key Distinction
- Inventory = documenting FACTS (what exists on/off site)
- Analysis = assigning VALUE to those facts based on project program
- These are distinct, separate steps

### Survey Types
- ALTA/NSPS Land Title Survey: comprehensive survey documenting boundaries, improvements, right-of-way, easements, and restrictions. Used by developers, builders, lenders. Follows strict national standards.
- Construction Staking: puts stakes in ground to show contractors where features should be built
- As-Built Survey: compares proposed drawings to actual construction. Uses laser scanning and drone data.
- Boundary Survey: establishes legal property boundaries

### Data Sources
- Primary Data: collected in person — interviews, windshield surveys, transects, site visits (tree ID, views, access points, soil conditions, wetland limits)
- Secondary Data: existing maps, aerial photos, USGS quads, demographic data, Sanborn Insurance Maps
- Sanborn Maps: 19th-20th century maps created for fire insurance companies. Found at city libraries/archives. Show historical land use.
- Assessor's Parcel Maps: reveal setbacks, easements, built elements along property lines

### Long-Range Planning
- Comprehensive Plan (APA terminology): long-range (5+ years), comprehensive (entire city/county), includes standard elements
- Elements include: Land Use, Transportation, Community Facilities, Housing, Economic Development, Critical and Sensitive Areas
- Revised on 15-25 year cycle, used as blueprint for zoning amendments
- Regional Plans: large scale, may cross state lines
- Neighborhood Plans: smaller scale, part of a city

### Policy & Regulations
- FEMA: maps and sets standards for development in flood-prone areas. Zone A = 100-year flood, Zone X = 500-year flood
- EPA: sets environmental policy at federal level, enforcement delegated to states
- Clean Water Act Section 404: regulates wetlands, requires USACE permits
- NEPA: Environmental Impact Statement (EIS) may be required
- Endangered Species Act: requires biological opinion
- National Historic Preservation Act Section 106: review for projects near historic properties
- ASTM Phase I ESA (E-1527): records review and visual inspection — does NOT include sampling

### Zoning & Land Use
- Zoning Ordinances: regulate use of buildings/structures/land, signs, setbacks, height, intensity
- First US zoning ordinance: New York City, 1916
- Floor Area Ratio (FAR) = gross floor area ÷ lot area. FAR 2.0 on 10,000 sf lot = 20,000 sf allowed
- Variance: granted due to unique hardship
- Conditional Use Permit: allows compatible nonconforming use
- Planned Unit Development (PUD): mix of residential, commercial, institutional
- Restrictive Covenant: agreement attached to deed limiting future use, enforced by HOAs
- Non-Conforming Use: any use that doesn't conform to current zoning
- Eminent Domain: government takes private property for public use with just compensation
- Regulatory Taking: government restriction prevents full use without compensation — owners can sue

---

## STAKEHOLDER ENGAGEMENT (14%)

### Public Participation Techniques
- Charrette: focused, collaborative design sessions. Includes site tour, stakeholder meetings, public input, design alternatives, and feedback. Most effective for generating broad consensus.
- Town Hall Meeting: open public forum
- Technical Advisory Committee: expert-led review group
- Facilitated Meetings: best for highly politicized projects where conflict is likely
- Dot-voting: democratic prioritization tool used in breakout groups

### Key Concepts
- Identify stakeholders BEFORE design development
- Synthesis of feedback using criteria: safety, equity, feasibility, environmental impact, economic efficiency, reliability
- Building consensus among diverse/conflicting groups
- Social equity examples: parks within 10-min walking distance, public transit within 5-min walk

---

## PHYSICAL ANALYSIS (39%)

### Analysis Techniques
- McHarg Overlay / GIS: assign relative value to site features, overlay on transparent sheets or digital layers to find patterns. Based on Ian McHarg's Design with Nature.
- Slope Analysis: % slope = (rise / run) × 100
- Viewshed Analysis: on-site and off-site views. Consider time of year, vegetation. Views can be assets or liabilities. Screen or enhance.
- Geotechnical Reports: summary of subsurface soils for construction purposes. Includes soil boring logs showing bearing capacity and classification. WILL be tested.

### Soils & Geology
- USDA Soil Classification, pH, organic matter, macro/micro nutrients
- Soil test: old model = amend soil for plants. New model = tailor planting to existing soils
- Angle of repose: angle at which loose soil is stable (sand 33%, boulders 45%, loam 45%, clay 65%). Saturated clay as low as 15°.
- Plasticity Index (PI): measures shrink-swell potential. PI > 20 = expansive. PI > 40 = highly expansive.
- Permeability: ability to transfer water
- Hydric soils: highly saturated, little usable oxygen (anaerobic)
- Liquid Limit: minimum moisture content at which soil flows under its own weight
- Soil particle sizes: Coarse Sand (0.5-2.0 mm), Fine Sand (0.05-0.5 mm), Silt (0.002-0.05 mm), Clay (< 0.002 mm)
- pH: 7 = neutral. Below 7 = acidic. Above 7 = alkaline/basic. Best nutrient availability around pH 7.
- Disturbed soils must be restored to minimum 12" depth (SITES credit requirement)

### Bearing Capacity (MEMORIZE relative rankings)
- Clay: 1-2 tons/sf (WEAKEST)
- Silt: 1.5-3 tons/sf
- Sand (loose): 2-3 tons/sf
- Gravel (loose): 4 tons/sf
- Sand-gravel (compact): 6 tons/sf
- Well-graded, well-compacted clayey sand/gravel: 10 tons/sf
- Sedimentary rock: 15 tons/sf
- Foliated metamorphic rock: 40 tons/sf
- Massive bedrock: 100 tons/sf (STRONGEST)
- Focus on RELATIVE strength — "which soil is best for..." questions

### Plant Classification by Habitat
- Halophytic: tolerates high-salt soils
- Xerophytic: tolerates dry soils
- Mesophytic: prefers moderately moist soils
- Hydrophytic: prefers wet soils or floats in water
- USDA Plant Hardiness Zones: based on average annual minimum temperature

### Ecology Concepts
- Patch: intact area of consistent ecological character
- Matrix: background ecological system of a landscape
- Corridor: linear habitat connecting patches
- Connectivity: how easily organisms move through landscape
- Fragmentation: breaking up of ecosystems into isolated patches
- Ecotone: transition zone between two communities (highest biodiversity)

### Environmental Variables
- Microclimates: unique climate within a smaller area. Affected by prevailing winds, building shadows, wind towers, frost pockets, fog.
- Urban Heat Island: cities 3-8°F warmer due to pavement/buildings replacing trees. Mitigation: trees, reflective surfaces, green roofs.
- Albedo / Solar Reflectance Index (SRI): measure of surface reflectivity. Low SRI = absorbs more heat. LEED/SITES credit limit: SRI ≥ 29.
- Insolation: density of solar radiation hitting a surface
- Vertical Lapse Rate: temperature drops 3.5°F per 1,000 ft elevation gain
- Fire Risk: determined by fuel, topography, and weather. Fire risk is inherently cultural (proximity to structures).
- Fire Defensible Zones: Intermediate zone (5-30 ft) = 18 ft between tree tops. Extended zone (30-60 ft) = 12 ft. Extended zone (60-100 ft) = 6 ft.
- Site Lighting: most outdoor = 0.5-5 footcandles (5-50 lux). Standard for walks/parking = 1 fc (10 lux). Brighter is NOT always better.

### Hydrology
- Watersheds, floodplains, surface/sub-surface drainage
- Low Impact Development (LID): emulate pre-development hydrology
- Rational Method: q = CiA for runoff calculations

### ADA & PROWAG Dimensions (MUST MEMORIZE)
- ADA path of travel: 36" minimum width
- PROWAG path of travel: 48" minimum width (wider in public right-of-way!)
- Passing space: 60" × 60" every 200 feet (both ADA and PROWAG)
- Cross slope max: 1:48 (≈ 2.1%) for both
- ADA walkway max slope: 5%. Ramp max: 8.33% (1:12)
- PROWAG: sidewalks must slope with streets, no path of travel maximum
- Perpendicular parking access aisles: 60" min for cars, 96" min for vans
- PROWAG parallel parking: 24 ft long × 13 ft wide minimum

### Key Formulas & Calculations
- FAR = Total Floor Area ÷ Lot Area. Example: 15,000 sf lot × FAR 2.0 = 30,000 sf allowed. Divided by 4 stories = 7,500 sf per floor.
- MEMORIZE: 1 acre = 43,560 sf. Example: 5-story building, 10,000 sf footprint = 50,000 sf total on 1-acre lot → FAR = 50,000 ÷ 43,560 = 1.15
- Density: DU/acre. Example: 30 DU/acre × 2 acres = 60 units allowed
- Fertilizer: desired rate ÷ % nutrient = pounds needed. Example: 3 lbs N per 1,000 sf with 20-10-5 fertilizer → 3 ÷ 0.20 = 15 lbs fertilizer
- N-P-K = Nitrogen-Phosphorus-Potassium (macronutrients). Remaining % is inert filler.

### Circulation Analysis
- Multi-modal: pedestrian, vehicular, bicycle, transit
- Level of Service (LOS): A (free flow) through F (forced flow/gridlock)
- Clear Sight Triangle: nothing should block views at street/driveway intersections for pedestrian safety
- ADA parking: close to main entry, connected along continuous barrier-free accessible route
- Separate site access circulation from parking aisles

### Public Land Survey System (PLSS)
- Township: divided into 36 Sections
- Each Section = 1 mile × 1 mile = 640 acres
- Numbered in zigzag pattern (must know the numbering order)

---

## CONTEXTUAL ANALYSIS (19%)

### Environmental Impact Assessment
- NEPA requires assessment of impacts from development
- Impact categories: air quality, noise, water resources, transportation, utilities, solid/hazardous waste, cultural resources
- An impact must be measurable
- Environmental Impact Assessment specifies site resources and development impacts

### Code Compliance
- ADA: applies to commercial/institutional sites open to public
- PROWAG (Public Right of Way Accessibility Guidelines): applies to sidewalks, crosswalks, public infrastructure
- I-Codes: International Code Council suite (Building, Fire, Plumbing, Residential, Zoning, etc.)
- Building Envelope: total space available for structure after setbacks and zoning restrictions applied
- Focus on codes that drive layout at master planning level

### Contextual Design Concepts
- CPTED (Crime Prevention Through Environmental Design): design strategies that reduce crime through natural surveillance, access control, territorial reinforcement
- Constraints: physiographic (water, wetlands, steep topo), microclimates, natural hazards, legal/cultural constraints, circulation conflicts
- Opportunities: connectivity, views, existing infrastructure, solar access
- Noise mitigation: walls most effective in narrow (15') buffers; berms, fences with vines, and dense tree buffers are alternatives
- Density: dwelling units per acre (DU/acre) for residential yield calculations

### Key Formulas
- FAR = Total Floor Area ÷ Lot Area (calculate max building area given FAR and lot size)
- Density yield = DU/acre × site acreage
- Fertilizer application: desired rate ÷ percentage of nutrient = pounds per 1000 sf
`
  },

  2: {
    title: 'Planning and Design',
    scoredItems: 85,
    blueprint: {
      'Master Planning': '33%',
      'Schematic Design': '28%',
      'Design Development': '22%',
      'Stewardship and Design Principles': '17%'
    },
    keyConceptsAndFacts: `
## Design Hierarchy
"Design with nature and culture" — preservation → conservation → regeneration

## Ecosystem Services
Sites can protect, sustain, and provide critical ecosystem services: air/water cleansing, water supply/regulation, productive soil. Design should maximize and mimic ecosystem services.

## Planting Design
- Right Plant, Right Place: select vegetation adapted to site's soil, hydrology, and climate
- Preserve existing healthy vegetative communities
- Utilize native plants and restore native communities
- Control invasive species
- Understand soil texture's effect on plant-available water (loams = most available water)

## Sustainable Sites Framework
- Prerequisites limit impacts on prime farmland, wetlands, and productive landscapes
- Protect critical areas during construction
- Credits for greater proportion of native plants and restoring ecoregion-native communities

## Universal Design Principles
- Provide equity and simplicity in access
- Avoid segregating users — multiple but equal points of access
- Designing beyond "average person" — consider toddlers to elderly
- ADA compliance: ramps max slope 1:12, cross slope max 1:50 (2%), min 36" clear width
- Landings: min 60" long, 60x60" if direction changes
- Maximum rise of 30" before landing required
- Stair formula: 2R + T = 26-27 inches

## Key Reference Texts
- Site Planning & Design Handbook (Russ) — primary for master planning and schematic design
- Landscape Architectural Graphic Standards (Hopper) — design principles
- Sustainable Sites Handbook (Calkins) — ecological design
- Site Analysis, 3rd Ed (LaGro) — physical and contextual analysis

## Master Planning
- Land use, connectivity, TOD, programming
- Spatial organization and relationship of site elements

## Schematic Design
- Preliminary design concepts
- Alternative site layouts
- Climate response, views, circulation
`
  },

  3: {
    title: 'Construction Documentation and Administration',
    scoredItems: 90,
    blueprint: {
      'Construction Plans and Details': '50%',
      'Construction Specifications and Bidding': '20%',
      'Construction Administration': '30%'
    },
    keyConceptsAndFacts: `
## Construction Plans and Details (50%)
- Layout plans (horizontal control): buildings, streets, parking, walkways, utilities relative to boundaries
- Grading plans (vertical control): existing contours (dashed), proposed contours (solid), spot elevations
- Materials plans and technical construction details
- Integration of materials, engineering, specifications, and construction techniques

## Construction Specifications and Bidding (20%)
- CSI MasterFormat: standardized numbering system for specifications
- Division 32: Exterior Improvements (landscape-specific)
- Preparing general contract and bidding specifications
- Understanding addenda, alternates, and substitutions

## Construction Administration (30%)
- Site visits and observation (NOT supervision — this increases liability)
- Tagging plants and materials
- Monitoring construction vs. design documents
- RFIs (Requests for Information): contractor asks for clarification
- Submittals: contractor provides product data, samples, shop drawings for approval
- Change Orders: formal modifications to the contract scope/price
- Substantial completion: project is sufficiently complete for owner to use
- Punch list: list of remaining items to complete
- Close-out procedures: final documentation, as-built drawings, warranties

## Key Concepts
- Designer is not the contractor's supervisor
- "Observation" not "supervision" or "inspection" — these words increase liability
- Shop drawings are contractor's responsibility, reviewed by designer for design intent
- Substitutions must be equal to or better than specified products
`
  },

  4: {
    title: 'Grading, Drainage, and Stormwater Management',
    scoredItems: 70,
    blueprint: {
      'Grading and Earthwork': '44%',
      'Stormwater Management': '39%',
      'Drainage Systems': '17%'
    },
    keyConceptsAndFacts: `
## KEY FORMULAS

### Rational Method: Q = CiA
- Q = Peak discharge (cubic feet per second, cfs)
- C = Runoff coefficient (ratio of runoff to rainfall, based on surface type)
- i = Rainfall intensity (inches/hour) for time of concentration
- A = Drainage area (acres)
- Used for small watersheds; subdivide for different surfaces

### Manning's Equation: V = (1.49/n)(a/p)^(2/3)(s)^(1/2)
- V = Velocity (feet per second)
- n = Coefficient of roughness (0.013 for concrete pipe 24" and under, 0.024 for galv. corrugated)
- a = Cross-section area (ft²)
- p = Wetted perimeter
- s = Slope (%)

### Flow Through an Orifice: Q = CA√(2gh)
- C = Coefficient of contraction (0.6 for sharp-edged orifice)
- A = Area of opening (ft²)
- g = Acceleration of gravity (32.2 ft/s²)
- h = Head above orifice (feet)

### Emergency Spillway: Q = CLH^(3/2)
- C = Coefficient for spillway surface (3.1 for grass)
- L = Length of spillway
- H = Height of water over invert

### Discharge: Q = V × a (velocity × cross-sectional area)

## Grading and Earthwork
- Existing contours: dashed lines; Proposed contours: solid lines
- Balanced site: cut volume = fill volume (most economical)
- Average-end method for volume calculations
- Bulking factor: soil expands when disturbed
- Mowed slopes: max 3:1 (4:1 preferred)
- New cut/fill slopes: max 2:1
- Reverse bench on slopes > 15 ft high: 5:1 reverse slope
- Grading should mimic natural terrain

## ADA Grading Requirements
- Ramp slopes: max 1:12 to 1:16 with 30" max rise or 30' max run
- Flatter ramps (1:16 to 1:20): max run 40', max rise 30"
- Cross slope: max 1:50 (2%)
- Min clear width: 36" (915mm)
- Landings: min 60" clear, 60x60" if direction changes
- No water accumulation on walking surfaces

## Low-Impact Development (LID)
- "Start at the source" — minimize impervious surfaces
- Emulate pre-development hydrology: slow it down, spread it out, soak it in
- Design to match site's undisturbed hydrologic conditions

## Best Management Practices (BMPs) & First Flush
- First flush: first 0.5 to 1.5 inches of rainfall carries ~75% of pollutants
- 95th percentile storm: 0.7 to 1.8 inches depending on region
- Nonpoint source pollutants: heavy metals, grease, sediment

## Bioretention (Rain Gardens)
- Shallow upland basins (6-12" water depth)
- Use highly permeable soils and native vegetation
- Must drain within 48 hours (mosquito prevention)
- In situ soils need min 0.5 in/hr infiltration rate
- Consume 5-10% of catchment surface area
- Remove sediments, nutrients, metals, solids

## Vegetated Swales
- Encourage infiltration, filter water, reduce velocity
- Safe velocities: 2-4 fps
- Min 20% freeboard (or 6" minimum)
- Cost ~$12/LF less than pipes
- Use Manning's formula for design

## Pipe Sizing (Manning's Equation)
- Manning's n values: concrete pipes ≤24" = 0.013; >24" = 0.012; corrugated metal = 0.024
- Open channels: concrete = 0.011-0.02; rip rap = 0.02-0.035; vegetation 2-3" = 0.045-0.06

## Erosion and Sediment Control
- SWPPPs (Stormwater Pollution Prevention Plans)
- Construction sequencing to minimize exposed soil
- Sediment traps and basins
- Compost blankets and silt fences
`
  }
};

export default LARE_KNOWLEDGE;
