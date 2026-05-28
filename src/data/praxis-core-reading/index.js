/**
 * Praxis Core Reading (5713) — ETS Exam Blueprint Data
 * Source: ETS Praxis Core Academic Skills for Educators: Reading (5713)
 * Format mirrors LARE LAB v.2 data structures for ISLA platform compatibility
 */

import { BookOpen, FileText, Layers } from 'lucide-react';

export const AGGIE_BLUE = "#004684";
export const AGGIE_GOLD = "#FDB927";

// ─────────────────────────────────────────────
// EXAM META
// ─────────────────────────────────────────────
export const EXAM_META = {
  examName: "Praxis Core Academic Skills for Educators: Reading",
  testCode: "5713",
  totalQuestions: 56,
  scoredQuestions: 56,
  examDuration: 85,
  passingScore: 156,
  passingScoreNote: "Passing score varies by state; 156 is the most common requirement",
  scoreRange: "100–200",
  format: "Selected-response (multiple-choice)",
  sections: 3,
  provider: "ETS (Educational Testing Service)",
  purpose: "Measures academic reading skills for prospective educators",
  url: "https://www.ets.org/praxis/prepare/materials/5713"
};

// ─────────────────────────────────────────────
// EXAM SECTIONS
// ─────────────────────────────────────────────
export const EXAM_SECTIONS = [
  {
    id: 1,
    title: "Key Ideas and Details",
    shortTitle: "Key Ideas",
    icon: BookOpen,
    color: AGGIE_BLUE,
    totalItems: 22, // ~40% of 56 questions
    examDuration: 85, // shared exam time
    examFormat: "Selected-response (multiple-choice)",
    videos: [],
    topics: [
      { name: "Main Idea Identification", weight: 12, description: "Identifying the main idea or primary purpose of a passage, distinguishing central themes from supporting details" },
      { name: "Drawing Inferences", weight: 10, description: "Making logical inferences and drawing conclusions based on textual evidence, reading between the lines" },
      { name: "Supporting Evidence", weight: 10, description: "Identifying details, facts, and examples that support a claim, argument, or main idea within a passage" },
      { name: "Summarizing Passages", weight: 8, description: "Condensing passage content into accurate, concise summaries that capture essential information without distortion" }
    ]
  },
  {
    id: 2,
    title: "Craft, Structure, and Language Skills",
    shortTitle: "Craft & Structure",
    icon: FileText,
    color: AGGIE_BLUE,
    totalItems: 17, // ~30% of 56 questions
    examDuration: 85,
    examFormat: "Selected-response (multiple-choice)",
    videos: [],
    topics: [
      { name: "Author's Tone and Attitude", weight: 8, description: "Determining the author's tone, mood, attitude, and point of view as conveyed through word choice and style" },
      { name: "Word Meaning in Context", weight: 8, description: "Determining the meaning of words and phrases as used in context, including figurative language and domain-specific vocabulary" },
      { name: "Passage Organization", weight: 7, description: "Analyzing how a passage is structured and organized, including chronological, cause-effect, compare-contrast, and problem-solution patterns" },
      { name: "Rhetorical Strategies", weight: 7, description: "Identifying rhetorical devices and persuasive techniques authors use to advance their arguments, including ethos, pathos, and logos" }
    ]
  },
  {
    id: 3,
    title: "Integration of Knowledge and Ideas",
    shortTitle: "Integration",
    icon: Layers,
    color: AGGIE_BLUE,
    totalItems: 17, // ~30% of 56 questions
    examDuration: 85,
    examFormat: "Selected-response (multiple-choice)",
    videos: [],
    topics: [
      { name: "Synthesizing Information", weight: 8, description: "Combining information from multiple passages or sources to draw broader conclusions and make connections" },
      { name: "Evaluating Arguments", weight: 8, description: "Assessing the strength, validity, and logical soundness of arguments presented in passages" },
      { name: "Comparing Perspectives", weight: 7, description: "Analyzing how two or more authors approach the same topic differently, comparing viewpoints, assumptions, and conclusions" },
      { name: "Assessing Evidence", weight: 7, description: "Judging the relevance, sufficiency, and quality of evidence used to support claims within a passage" }
    ]
  }
];

// ─────────────────────────────────────────────
// QUESTION BANK — 15 per section (45 total)
// ─────────────────────────────────────────────
export const QUESTION_BANK = {
  1: [
    {
      id: "pcr1-1",
      topic: "Main Idea Identification",
      text: "A passage describes how honeybees communicate the location of food sources through a series of movements known as the waggle dance, noting that the angle and duration of the dance convey both direction and distance. Which of the following best states the main idea of the passage?",
      options: [
        "Honeybees are social insects that live in complex colonies",
        "Honeybees use a specific dance pattern to communicate the location of food to other bees",
        "The waggle dance was first discovered by Karl von Frisch in the 1960s",
        "Bee colonies depend on nectar for survival during winter months"
      ],
      correct: 1,
      explanation: "The main idea captures the central point of the passage — that honeybees communicate food-source locations through the waggle dance. The other options are either too broad, too specific, or not supported by the passage."
    },
    {
      id: "pcr1-2",
      topic: "Drawing Inferences",
      text: "A passage states: 'Although the town council approved funding for a new community park, several members expressed concerns about the timeline, and one member abstained from voting, citing insufficient environmental review.' What can most reasonably be inferred from this passage?",
      options: [
        "The majority of the town council opposed the new park",
        "The environmental review was completed and found no issues",
        "There was not unanimous enthusiasm for the park project as approved",
        "The community park will not be built due to environmental concerns"
      ],
      correct: 2,
      explanation: "The concerns expressed and the abstention suggest the approval was not met with universal enthusiasm. The passage says funding was approved (so it wasn't opposed by the majority) and doesn't say the park won't be built."
    },
    {
      id: "pcr1-3",
      topic: "Supporting Evidence",
      text: "An author argues that early childhood music education improves cognitive development. Which of the following would provide the STRONGEST support for this claim?",
      options: [
        "A testimonial from a parent whose child enjoys playing the piano",
        "A peer-reviewed longitudinal study showing higher test scores in children with music training",
        "A list of famous musicians who began studying music as children",
        "An opinion editorial by a music teacher advocating for more funding"
      ],
      correct: 1,
      explanation: "A peer-reviewed longitudinal study provides empirical, research-based evidence — the strongest form of support for a causal claim about cognitive development. Testimonials, anecdotes, and opinion pieces are weaker forms of evidence."
    },
    {
      id: "pcr1-4",
      topic: "Summarizing Passages",
      text: "A passage describes the process by which glaciers form: snow accumulates over many years, compresses into dense ice under its own weight, and eventually begins to flow slowly downhill due to gravity. Which of the following is the most accurate summary?",
      options: [
        "Glaciers are large bodies of ice found only at the North and South Poles",
        "Snow turns into glaciers when temperatures drop below freezing for extended periods",
        "Glaciers form through a gradual process of snow accumulation, compression into ice, and gravity-driven movement",
        "The movement of glaciers causes significant erosion and reshapes mountain landscapes"
      ],
      correct: 2,
      explanation: "An accurate summary captures the key steps described: accumulation, compression, and movement. The other options introduce information not in the passage or omit critical steps."
    },
    {
      id: "pcr1-5",
      topic: "Main Idea Identification",
      text: "A passage discusses how urban gardens provide fresh produce in neighborhoods with limited access to grocery stores, reduce stress among participants, and foster community bonds. The author's primary purpose is to:",
      options: [
        "Explain the agricultural techniques used in urban gardening",
        "Argue that urban gardens should replace traditional farms",
        "Highlight the multiple benefits of urban gardens for communities",
        "Compare urban gardens to suburban landscaping practices"
      ],
      correct: 2,
      explanation: "The passage covers multiple benefits — food access, stress reduction, and community building — making the primary purpose to highlight the various advantages of urban gardens."
    },
    {
      id: "pcr1-6",
      topic: "Drawing Inferences",
      text: "A historian writes: 'By 1850, the railroad had connected dozens of previously isolated towns, and merchants who once waited weeks for shipments could now receive goods in days.' What can be inferred about life before the railroad?",
      options: [
        "Most towns were located along major rivers for transportation",
        "Commerce and trade were significantly slower due to limited transportation options",
        "Merchants preferred slower shipping methods because they were more reliable",
        "The railroad was unpopular with merchants when it was first introduced"
      ],
      correct: 1,
      explanation: "The contrast between 'weeks' and 'days' implies that before the railroad, commerce was much slower. The passage describes previously isolated towns, directly supporting this inference."
    },
    {
      id: "pcr1-7",
      topic: "Supporting Evidence",
      text: "A passage argues that recess is essential for elementary students' academic performance. The author states that students who have regular recess breaks show improved focus in afternoon classes. This statement functions primarily as:",
      options: [
        "A counterargument to the main claim",
        "Background information about school scheduling",
        "Evidence supporting the author's argument about the value of recess",
        "An anecdotal aside unrelated to the main point"
      ],
      correct: 2,
      explanation: "The statement about improved focus directly supports the claim that recess is essential for academic performance. It serves as evidence within the author's argument."
    },
    {
      id: "pcr1-8",
      topic: "Main Idea Identification",
      text: "A science article explains that coral reefs support approximately 25% of all marine species despite covering less than 1% of the ocean floor. The article details threats from ocean warming, acidification, and pollution, then describes conservation efforts underway. The central idea of this article is that:",
      options: [
        "Ocean pollution is the greatest threat to marine biodiversity",
        "Coral reefs are disproportionately important to marine biodiversity but face serious threats",
        "Conservation efforts have successfully reversed coral reef decline worldwide",
        "Marine species cannot survive without coral reef habitats"
      ],
      correct: 1,
      explanation: "The article emphasizes both the outsized ecological importance of coral reefs and the significant threats they face, making their importance-despite-threats the central idea."
    },
    {
      id: "pcr1-9",
      topic: "Drawing Inferences",
      text: "A passage about early American education states: 'In colonial New England, education was closely tied to religious instruction. Children learned to read primarily so they could study Scripture, and most schoolmasters were also clergymen.' What inference is best supported by this passage?",
      options: [
        "Colonial children had no interest in learning to read",
        "Secular subjects like mathematics were not taught in colonial schools",
        "Religious institutions played a central role in colonial education",
        "Colonial education was available equally to all children regardless of gender"
      ],
      correct: 2,
      explanation: "The connection between education and religious instruction, plus the fact that schoolmasters were clergymen, strongly supports the inference that religious institutions were central to colonial education."
    },
    {
      id: "pcr1-10",
      topic: "Summarizing Passages",
      text: "A passage explains that the water cycle consists of evaporation from bodies of water, condensation into clouds, precipitation as rain or snow, and collection in rivers and oceans, which then begins the cycle again. Which is the best summary?",
      options: [
        "Rain falls from clouds and collects in rivers",
        "The water cycle is a continuous process of evaporation, condensation, precipitation, and collection",
        "Water evaporates from the ocean and becomes clouds",
        "The water cycle is responsible for all weather patterns on Earth"
      ],
      correct: 1,
      explanation: "The best summary captures all four stages of the cycle (evaporation, condensation, precipitation, collection) and notes it is continuous. Partial or overly broad summaries are less accurate."
    },
    {
      id: "pcr1-11",
      topic: "Supporting Evidence",
      text: "An author claims that bilingual children develop stronger problem-solving skills than monolingual children. Which of the following details from the passage would LEAST support this claim?",
      options: [
        "Bilingual children scored 15% higher on nonverbal reasoning tasks in a controlled study",
        "Brain imaging shows increased activity in the prefrontal cortex of bilingual children during complex tasks",
        "Bilingual children are exposed to two different cultural traditions at home",
        "A meta-analysis of 30 studies found consistent cognitive advantages for bilingual youth"
      ],
      correct: 2,
      explanation: "Exposure to two cultural traditions, while interesting, does not directly support the specific claim about problem-solving skills. The other options provide direct cognitive or empirical evidence."
    },
    {
      id: "pcr1-12",
      topic: "Main Idea Identification",
      text: "A passage discusses how the invention of the printing press in the 15th century made books affordable, increased literacy rates, standardized languages, and enabled the rapid spread of scientific and political ideas across Europe. The passage primarily serves to:",
      options: [
        "Describe the mechanical workings of the printing press",
        "Compare the printing press to modern digital publishing",
        "Explain the broad cultural and intellectual impact of the printing press",
        "Argue that the printing press was the most important invention in history"
      ],
      correct: 2,
      explanation: "The passage focuses on the wide-ranging effects — affordability, literacy, standardization, and idea dissemination — making its primary purpose to explain the cultural and intellectual impact."
    },
    {
      id: "pcr1-13",
      topic: "Drawing Inferences",
      text: "A nutritionist writes: 'While vitamin supplements can address specific deficiencies, they should not be viewed as substitutes for a balanced diet. Whole foods provide a complex combination of nutrients, fiber, and phytochemicals that supplements cannot replicate.' It can be inferred that the author believes:",
      options: [
        "Vitamin supplements are dangerous and should be avoided entirely",
        "A balanced diet provides nutritional benefits beyond what supplements can offer",
        "All people should stop taking supplements immediately",
        "Phytochemicals are more important than vitamins for human health"
      ],
      correct: 1,
      explanation: "The author acknowledges supplements have a role (for specific deficiencies) but emphasizes that whole foods offer a complexity of benefits supplements can't match, supporting inference B."
    },
    {
      id: "pcr1-14",
      topic: "Summarizing Passages",
      text: "A passage describes how migrating monarch butterflies travel up to 3,000 miles from Canada to central Mexico each fall. Scientists have discovered that monarchs use the position of the sun and Earth's magnetic field to navigate. The journey takes multiple generations to complete in the return trip northward. The most accurate summary is:",
      options: [
        "Monarch butterflies are the only insects that migrate long distances",
        "Monarchs migrate thousands of miles using solar and magnetic navigation, with the return journey spanning multiple generations",
        "Scientists recently discovered why monarch butterflies travel to Mexico",
        "The monarch butterfly population has declined due to habitat loss along migration routes"
      ],
      correct: 1,
      explanation: "The best summary captures the key facts: distance, navigation methods (sun and magnetic field), and the multigenerational return trip. Other options are too narrow, unsupported, or inaccurate."
    },
    {
      id: "pcr1-15",
      topic: "Supporting Evidence",
      text: "A passage argues that public libraries remain essential community resources in the digital age. Which of the following statements from the passage serves as the strongest evidence for this claim?",
      options: [
        "Many libraries were built with Carnegie Foundation funding in the early 1900s",
        "Library card applications have decreased by 5% nationally over the past decade",
        "Libraries now provide free internet access, job training, and social services to underserved communities",
        "The Dewey Decimal System was replaced by digital catalogs in most libraries"
      ],
      correct: 2,
      explanation: "The fact that libraries provide internet access, job training, and social services directly supports the claim that they remain essential — especially for underserved communities in the digital age."
    }
  ],

  2: [
    {
      id: "pcr2-1",
      topic: "Author's Tone and Attitude",
      text: "A reviewer writes: 'While the director's ambition is commendable, the film's overwrought dialogue and heavy-handed symbolism ultimately undermine what could have been a compelling narrative.' The tone of this passage is best described as:",
      options: [
        "Enthusiastically positive",
        "Critically measured",
        "Bitterly hostile",
        "Completely neutral"
      ],
      correct: 1,
      explanation: "The reviewer acknowledges something positive (ambition is 'commendable') but identifies specific weaknesses, demonstrating a balanced, critically measured tone — neither purely positive nor hostile."
    },
    {
      id: "pcr2-2",
      topic: "Word Meaning in Context",
      text: "In the sentence, 'The politician's speech was deliberately opaque, leaving voters uncertain about her actual position on the issue,' the word 'opaque' most nearly means:",
      options: [
        "Transparent and clear",
        "Difficult to understand or deliberately unclear",
        "Offensive and inflammatory",
        "Lengthy and detailed"
      ],
      correct: 1,
      explanation: "Context clues — 'deliberately' and 'leaving voters uncertain' — indicate that 'opaque' means unclear or hard to understand. In this context it describes language designed to obscure the speaker's position."
    },
    {
      id: "pcr2-3",
      topic: "Passage Organization",
      text: "A passage first describes the declining bee population, then identifies pesticide use and habitat loss as causes, and finally proposes solutions such as banning certain chemicals and creating pollinator habitats. This passage is organized primarily as:",
      options: [
        "Chronological narrative",
        "Compare and contrast",
        "Problem-cause-solution",
        "Spatial description"
      ],
      correct: 2,
      explanation: "The passage follows a problem-cause-solution structure: it states the problem (declining bees), identifies causes (pesticides, habitat loss), and proposes solutions (banning chemicals, creating habitats)."
    },
    {
      id: "pcr2-4",
      topic: "Rhetorical Strategies",
      text: "An author writes: 'If we do not invest in our crumbling infrastructure today, we will pay tenfold tomorrow when bridges collapse and water systems fail.' This statement primarily employs which rhetorical strategy?",
      options: [
        "Appeal to authority (ethos)",
        "Appeal to emotion and fear (pathos)",
        "Use of statistical evidence (logos)",
        "Ad hominem attack"
      ],
      correct: 1,
      explanation: "The vivid imagery of collapsing bridges and failing water systems is designed to evoke fear and urgency — a classic appeal to emotion (pathos) to motivate action."
    },
    {
      id: "pcr2-5",
      topic: "Author's Tone and Attitude",
      text: "A biographer writes about a historical figure: 'Despite her critics' relentless efforts to diminish her legacy, she remained steadfast in her convictions and ultimately transformed the field forever.' The author's attitude toward the subject is best described as:",
      options: [
        "Skeptical and questioning",
        "Admiring and respectful",
        "Detached and objective",
        "Condescending and dismissive"
      ],
      correct: 1,
      explanation: "Words like 'steadfast,' 'convictions,' and 'transformed the field forever' convey admiration. The framing of critics as 'relentless' in trying to 'diminish' further shows the author's respect for the subject."
    },
    {
      id: "pcr2-6",
      topic: "Word Meaning in Context",
      text: "The passage states: 'The archaeological findings corroborated the historian's theory that the settlement predated European contact.' In this context, 'corroborated' most nearly means:",
      options: [
        "Contradicted",
        "Confirmed or supported with evidence",
        "Complicated",
        "Originated"
      ],
      correct: 1,
      explanation: "In context, the archaeological findings provide supporting evidence for the historian's theory. 'Corroborated' means to confirm or support with additional evidence."
    },
    {
      id: "pcr2-7",
      topic: "Passage Organization",
      text: "A passage describes life in rural and urban America in the 1920s. It discusses how farmers struggled with falling crop prices while city dwellers enjoyed economic prosperity and new consumer goods. The organizational pattern of this passage is:",
      options: [
        "Cause and effect",
        "Chronological order",
        "Compare and contrast",
        "Classification"
      ],
      correct: 2,
      explanation: "The passage places two subjects side by side — rural vs. urban life — and highlights their differences (struggle vs. prosperity), following a compare-and-contrast organizational pattern."
    },
    {
      id: "pcr2-8",
      topic: "Rhetorical Strategies",
      text: "An environmental author writes: 'Dr. Jane Martinez, who has studied Arctic ice patterns for 30 years and published over 200 peer-reviewed papers, warns that current melting rates are unprecedented.' This passage primarily relies on which rhetorical appeal?",
      options: [
        "Pathos (emotional appeal)",
        "Logos (logical reasoning and data)",
        "Ethos (credibility and authority)",
        "Kairos (timeliness)"
      ],
      correct: 2,
      explanation: "The author establishes credibility by citing Dr. Martinez's 30 years of study and 200+ publications. This is ethos — using the expert's authority and credentials to persuade."
    },
    {
      id: "pcr2-9",
      topic: "Author's Tone and Attitude",
      text: "A food critic writes: 'The restaurant's attempt at fusion cuisine produced an unfortunate collision of flavors — as if Thai basil and Italian ragu had been introduced at a party where neither wanted to attend.' The critic's tone is best described as:",
      options: [
        "Warmly supportive",
        "Witty and critical",
        "Professionally neutral",
        "Angrily hostile"
      ],
      correct: 1,
      explanation: "The humorous metaphor of flavors 'at a party where neither wanted to attend' shows wit, while the overall assessment is negative ('unfortunate collision'). This creates a witty and critical tone."
    },
    {
      id: "pcr2-10",
      topic: "Word Meaning in Context",
      text: "The passage states: 'The novel's protagonist undergoes a profound metamorphosis, evolving from a timid clerk into a bold advocate for social justice.' In this context, 'metamorphosis' most nearly means:",
      options: [
        "Physical relocation to a new city",
        "Dramatic transformation or change",
        "Brief period of confusion",
        "Gradual decline in health"
      ],
      correct: 1,
      explanation: "Context clues — 'evolving from a timid clerk into a bold advocate' — indicate a dramatic transformation. 'Metamorphosis' here means a fundamental change in character."
    },
    {
      id: "pcr2-11",
      topic: "Passage Organization",
      text: "A passage begins by describing the symptoms of a disease, then explains how the pathogen enters the body and attacks cells, and finally details the immune system's response. This passage follows which organizational structure?",
      options: [
        "Problem-solution",
        "Spatial order",
        "Sequential/process",
        "Compare and contrast"
      ],
      correct: 2,
      explanation: "The passage follows a sequential/process structure, tracing a step-by-step progression: symptoms appear → pathogen enters and attacks → immune system responds."
    },
    {
      id: "pcr2-12",
      topic: "Rhetorical Strategies",
      text: "A writer argues: 'Last year alone, 1.3 million tons of plastic entered the ocean. At this rate, by 2050 there will be more plastic than fish by weight in the world's oceans.' This passage primarily uses which rhetorical approach?",
      options: [
        "Anecdotal evidence from personal experience",
        "Appeal to tradition and historical precedent",
        "Logos — statistical evidence to build a logical argument",
        "Ethos — establishing the author's personal credibility"
      ],
      correct: 2,
      explanation: "The use of specific statistics (1.3 million tons, the 2050 projection) represents logos — building an argument through data and logical reasoning rather than emotion or personal credibility."
    },
    {
      id: "pcr2-13",
      topic: "Word Meaning in Context",
      text: "The passage reads: 'The CEO's equivocal response to questions about the company's environmental practices only fueled further public suspicion.' The word 'equivocal' most nearly means:",
      options: [
        "Enthusiastic and supportive",
        "Intentionally ambiguous or evasive",
        "Factually accurate and detailed",
        "Emotionally charged and passionate"
      ],
      correct: 1,
      explanation: "The context — the response 'fueled further public suspicion' — indicates the CEO's answer was deliberately vague or evasive. 'Equivocal' means open to more than one interpretation, often intentionally so."
    },
    {
      id: "pcr2-14",
      topic: "Rhetorical Strategies",
      text: "A speech begins: 'Ask yourselves — do we want our children to inherit a world of polluted rivers and barren landscapes? Or do we want them to run through clean meadows and drink from pure streams?' This passage primarily uses:",
      options: [
        "A rhetorical question combined with emotional appeal",
        "An appeal to established authority",
        "Deductive reasoning from a general principle",
        "A concession to the opposing viewpoint"
      ],
      correct: 0,
      explanation: "The speaker uses rhetorical questions (not expecting literal answers) combined with vivid emotional imagery contrasting polluted vs. clean environments — a classic pathos strategy with rhetorical questioning."
    },
    {
      id: "pcr2-15",
      topic: "Author's Tone and Attitude",
      text: "A journalist writes: 'The new policy, enacted with little public input and even less transparency, represents a troubling departure from the democratic principles this institution once championed.' The author's tone is best described as:",
      options: [
        "Celebratory and optimistic",
        "Concerned and critical",
        "Indifferent and detached",
        "Confused and uncertain"
      ],
      correct: 1,
      explanation: "Words like 'little public input,' 'less transparency,' and 'troubling departure' clearly convey concern and criticism. The author views the policy negatively while maintaining a professional register."
    }
  ],

  3: [
    {
      id: "pcr3-1",
      topic: "Synthesizing Information",
      text: "Passage 1 argues that remote work increases employee productivity by eliminating commute time. Passage 2 reports that remote workers often struggle with work-life boundaries and experience higher burnout rates. Taken together, these passages suggest that:",
      options: [
        "Remote work is universally beneficial for all employees",
        "Remote work has no measurable effect on productivity",
        "Remote work offers productivity gains but may come with personal well-being trade-offs",
        "Employers should eliminate all remote work options immediately"
      ],
      correct: 2,
      explanation: "Synthesizing both passages reveals a nuanced picture: remote work can boost productivity (Passage 1) while also creating personal challenges (Passage 2). The balanced conclusion acknowledges both perspectives."
    },
    {
      id: "pcr3-2",
      topic: "Evaluating Arguments",
      text: "An author argues: 'Social media should be banned for children under 13 because a recent survey found that 70% of parents believe it is harmful.' Which of the following identifies the primary weakness in this argument?",
      options: [
        "The author fails to define what 'social media' includes",
        "The argument relies on popular opinion rather than empirical evidence of harm",
        "The author does not address children over 13",
        "The survey sample size is not mentioned"
      ],
      correct: 1,
      explanation: "The argument commits the bandwagon fallacy — using popular opinion (what parents believe) as evidence of actual harm. A strong argument would cite empirical research on the effects of social media on children."
    },
    {
      id: "pcr3-3",
      topic: "Comparing Perspectives",
      text: "Author A argues that standardized testing provides an objective measure of student achievement across schools. Author B contends that standardized tests are culturally biased and fail to measure critical thinking. These authors primarily disagree about:",
      options: [
        "Whether schools should have any form of assessment",
        "Whether standardized tests are valid and fair measures of achievement",
        "Whether students should study for tests",
        "Whether schools need more funding for test preparation"
      ],
      correct: 1,
      explanation: "The core disagreement is about the validity and fairness of standardized tests as measures of achievement. Author A sees them as objective; Author B sees them as biased and limited."
    },
    {
      id: "pcr3-4",
      topic: "Assessing Evidence",
      text: "A passage claims that a new reading program significantly improves third-grade literacy rates. The only evidence provided is that one school saw a 10% increase in reading scores after implementing the program for one semester. This evidence is BEST described as:",
      options: [
        "Conclusive proof that the program works for all schools",
        "Insufficient because it is based on a single school over a short time period",
        "Strong because a 10% increase is a large improvement",
        "Irrelevant to the claim being made"
      ],
      correct: 1,
      explanation: "Evidence from a single school over one semester is insufficient to support a broad claim about the program's effectiveness. The sample is too small and the timeframe too short to be conclusive."
    },
    {
      id: "pcr3-5",
      topic: "Synthesizing Information",
      text: "Article 1 discusses how electric vehicles reduce carbon emissions from transportation. Article 2 examines how the mining of lithium for EV batteries causes significant environmental damage in developing countries. A reader synthesizing these articles would most reasonably conclude that:",
      options: [
        "Electric vehicles are worse for the environment than gasoline cars",
        "The environmental benefits of EVs must be weighed against the environmental costs of battery production",
        "Lithium mining should be banned immediately to protect the environment",
        "Transportation is not a significant source of carbon emissions"
      ],
      correct: 1,
      explanation: "Synthesizing both articles reveals that EVs offer environmental benefits (reduced emissions) but also have environmental costs (lithium mining). A complete assessment must weigh both factors."
    },
    {
      id: "pcr3-6",
      topic: "Evaluating Arguments",
      text: "A commentator argues: 'Dr. Williams, who supports the new curriculum, also owns stock in the textbook company that would supply the materials. Therefore, the new curriculum must be ineffective.' This argument is flawed because it:",
      options: [
        "Attacks the person's motives rather than evaluating the curriculum on its merits",
        "Fails to mention Dr. Williams' academic qualifications",
        "Does not explain how stock ownership works",
        "Assumes all textbook companies produce the same quality materials"
      ],
      correct: 0,
      explanation: "This is an ad hominem fallacy — attacking the advocate's potential conflict of interest rather than evaluating the curriculum itself. A person's motives don't automatically make their position wrong."
    },
    {
      id: "pcr3-7",
      topic: "Comparing Perspectives",
      text: "Economist A argues that raising the minimum wage will reduce poverty by increasing workers' purchasing power. Economist B argues that raising the minimum wage will increase unemployment because small businesses cannot afford higher labor costs. Both economists agree that:",
      options: [
        "The minimum wage should not be changed under any circumstances",
        "Small businesses are more important than worker welfare",
        "Wage policy has significant economic consequences",
        "Poverty is not a serious problem in the current economy"
      ],
      correct: 2,
      explanation: "Despite their opposing conclusions, both economists acknowledge that changing the minimum wage has significant economic impacts — one sees positive effects on purchasing power, the other sees negative effects on employment."
    },
    {
      id: "pcr3-8",
      topic: "Assessing Evidence",
      text: "An author claims that classical music improves students' concentration. To support this, the author cites a study in which students who listened to Mozart scored higher on a spatial reasoning task immediately afterward. Which of the following is the most valid criticism of this evidence?",
      options: [
        "The study used Mozart instead of Beethoven",
        "The study measured only immediate short-term effects on one type of task, not sustained concentration",
        "The study was conducted by music researchers",
        "Students might have already liked classical music before the study"
      ],
      correct: 1,
      explanation: "The study only measured immediate effects on spatial reasoning — a narrow task — not the broader, sustained concentration the author claims. The evidence doesn't fully support the broader claim."
    },
    {
      id: "pcr3-9",
      topic: "Synthesizing Information",
      text: "A textbook chapter explains that photosynthesis converts carbon dioxide and water into glucose and oxygen. A separate article discusses how deforestation reduces the Earth's capacity to absorb atmospheric carbon dioxide. Combining these sources, which conclusion is best supported?",
      options: [
        "Deforestation leads to increased levels of glucose in the atmosphere",
        "Deforestation reduces carbon absorption because fewer trees are available to perform photosynthesis",
        "Photosynthesis is the only process that removes carbon dioxide from the atmosphere",
        "Planting more trees would have no effect on atmospheric carbon levels"
      ],
      correct: 1,
      explanation: "Connecting the two sources: photosynthesis absorbs CO₂ (source 1), and deforestation removes trees that perform photosynthesis (source 2), logically leading to reduced carbon absorption."
    },
    {
      id: "pcr3-10",
      topic: "Evaluating Arguments",
      text: "An editorial argues: 'Our school district should adopt year-round schooling because students in Japan attend school for 243 days per year and consistently outperform American students in math and science.' This argument is potentially flawed because it:",
      options: [
        "Does not mention specific test scores",
        "Assumes that more school days are the primary cause of Japan's higher performance, ignoring other cultural and educational factors",
        "Fails to explain what year-round schooling means",
        "Does not address the cost of year-round schooling"
      ],
      correct: 1,
      explanation: "The argument assumes a causal relationship between school days and performance without considering other factors (cultural values, teaching methods, curriculum design) that contribute to Japan's results. This is a correlation-causation fallacy."
    },
    {
      id: "pcr3-11",
      topic: "Comparing Perspectives",
      text: "Passage 1 advocates for technology integration in classrooms, arguing that digital tools personalize learning. Passage 2 cautions that excessive screen time harms children's attention spans and social development. A key difference between the authors is that:",
      options: [
        "Author 1 is an educator while Author 2 is a parent",
        "Author 1 focuses on academic benefits while Author 2 focuses on developmental risks",
        "Both authors agree that technology should be banned from schools",
        "Author 2 supports more technology in schools than Author 1"
      ],
      correct: 1,
      explanation: "The key difference in perspective is their focus: Author 1 emphasizes academic benefits of technology, while Author 2 emphasizes developmental risks — each prioritizing different aspects of children's experience."
    },
    {
      id: "pcr3-12",
      topic: "Assessing Evidence",
      text: "A health article claims that drinking green tea prevents cancer. The article cites a single observational study of 200 people in one region of Japan. Which of the following most accurately evaluates the strength of this evidence?",
      options: [
        "The evidence is strong because it involves real people in a real setting",
        "The evidence is conclusive because Japan is known for high green tea consumption",
        "The evidence is weak because observational studies cannot prove causation and the sample is limited to one region",
        "The evidence is irrelevant because green tea is a food, not a medicine"
      ],
      correct: 2,
      explanation: "Observational studies show correlation, not causation. The limited sample (200 people from one region) cannot be generalized to support the broad claim that green tea 'prevents' cancer."
    },
    {
      id: "pcr3-13",
      topic: "Synthesizing Information",
      text: "Source 1 reports that average global temperatures have risen 1.1°C since pre-industrial times. Source 2 documents that Arctic ice coverage has decreased by 13% per decade since 1979. Taken together, these sources most strongly support which conclusion?",
      options: [
        "Climate change is caused entirely by human industrial activity",
        "Arctic ice loss is unrelated to temperature changes",
        "Rising global temperatures and declining Arctic ice are consistent with broader climate change trends",
        "Global temperatures will decrease once Arctic ice is gone"
      ],
      correct: 2,
      explanation: "The two data points — rising temperatures and declining ice — are consistent with and mutually reinforce the broader pattern of global climate change, without making causal claims beyond what the data supports."
    },
    {
      id: "pcr3-14",
      topic: "Evaluating Arguments",
      text: "An author argues: 'Handwriting instruction should continue in schools because humans have been writing by hand for thousands of years.' This argument is weakened by which logical observation?",
      options: [
        "Handwriting is difficult for some students with motor difficulties",
        "The length of time a practice has existed does not inherently prove its current value or necessity",
        "Most adults prefer typing to handwriting in professional settings",
        "Schools already teach handwriting in early grades"
      ],
      correct: 1,
      explanation: "This is an appeal to tradition fallacy — the argument assumes that because something has been done for a long time, it should continue. Longevity alone doesn't establish current educational value."
    },
    {
      id: "pcr3-15",
      topic: "Assessing Evidence",
      text: "A researcher claims that listening to podcasts while exercising improves workout performance. The evidence provided is the researcher's personal experience of running faster on days when she listens to podcasts. This evidence is limited primarily because:",
      options: [
        "Podcasts are not a valid form of media",
        "Running is only one form of exercise",
        "Personal anecdotal evidence from the researcher herself is subject to bias and cannot be generalized",
        "The researcher did not specify which podcasts she listened to"
      ],
      correct: 2,
      explanation: "Self-reported anecdotal evidence is the weakest form of evidence. It is subject to confirmation bias, cannot be controlled for other variables, and a single person's experience cannot be generalized."
    }
  ]
};

// ─────────────────────────────────────────────
// FLASHCARD DATA — 12 per section (36 total)
// ─────────────────────────────────────────────
export const FLASHCARD_DATA = {
  1: [
    { front: "Main Idea vs. Topic", back: "The topic is the general subject (e.g., 'pollution'). The main idea is the specific point the author makes about the topic (e.g., 'Air pollution in cities is primarily caused by vehicle emissions'). The main idea is always a complete thought." },
    { front: "Explicit vs. Implicit Information", back: "Explicit information is directly stated in the text. Implicit information is implied — you must infer it from clues. The Praxis tests BOTH: look for what the passage says AND what it suggests." },
    { front: "Making an Inference", back: "An inference is a logical conclusion based on evidence in the text PLUS your reasoning. It must be supported by the passage — not just your opinion. The best inference is the one most strongly supported by textual evidence." },
    { front: "Supporting Details", back: "Supporting details are facts, examples, statistics, anecdotes, or expert opinions that back up the main idea. On the Praxis, you'll be asked to identify WHICH detail supports a specific claim." },
    { front: "Primary Purpose", back: "The primary purpose is WHY the author wrote the passage: to inform, to persuade, to entertain, to describe, or to explain. Look at the overall structure and tone — not just one sentence — to determine purpose." },
    { front: "Summary vs. Paraphrase", back: "A summary condenses the ENTIRE passage into key points (shorter than the original). A paraphrase restates a SPECIFIC section in your own words (similar length). Praxis tests summary skills by asking for the 'best summary.'" },
    { front: "Textual Evidence", back: "Textual evidence is any information from the passage that supports an answer. When a question asks 'according to the passage' or 'which detail supports,' go back to the text — don't rely on memory or outside knowledge." },
    { front: "Central Theme", back: "The central theme is the underlying message or lesson of a passage. It is broader than the main idea and often applies beyond the specific text. Example: 'Perseverance leads to success' could be the theme of many different stories." },
    { front: "Fact vs. Opinion", back: "A fact can be verified or proven (e.g., 'Water boils at 100°C'). An opinion is a belief or judgment (e.g., 'Water is the best beverage'). Signal words for opinion: believe, feel, should, best, worst, important." },
    { front: "Drawing Conclusions", back: "Drawing a conclusion means combining information from the passage with logical reasoning. The correct conclusion is the one that MUST be true based on the evidence — avoid conclusions that MIGHT be true but aren't directly supported." },
    { front: "Identifying Author's Claim", back: "The author's claim is the main argument or position they are advocating. It is often stated in the introduction or conclusion. Supporting evidence is provided throughout the passage to strengthen this claim." },
    { front: "Distractor Answer Choices", back: "Praxis uses four common distractors: (1) too broad — goes beyond the passage, (2) too narrow — covers only one detail, (3) opposite — contradicts the passage, (4) off-topic — introduces unrelated information. Eliminate these systematically." }
  ],

  2: [
    { front: "Tone vs. Mood", back: "Tone is the AUTHOR's attitude toward the subject (critical, admiring, sarcastic). Mood is the READER's emotional response to the text (anxious, hopeful, gloomy). Praxis primarily tests tone — look at word choice for clues." },
    { front: "Context Clues for Vocabulary", back: "Four types of context clues: (1) Definition — the word is directly defined, (2) Synonym — a similar word appears nearby, (3) Antonym — a contrasting word gives the meaning, (4) Example — an illustration clarifies meaning. Look at the sentence AROUND the word." },
    { front: "Denotation vs. Connotation", back: "Denotation is a word's dictionary definition. Connotation is the emotional association. Example: 'thrifty' (positive) vs. 'cheap' (negative) both denote saving money. Authors choose words deliberately for their connotations." },
    { front: "Figurative Language", back: "Common types: Simile (like/as comparison), Metaphor (direct comparison), Personification (human traits to non-human), Hyperbole (exaggeration), Irony (opposite of expected meaning). Praxis tests your ability to interpret, not just identify." },
    { front: "Organizational Patterns", back: "Key patterns: Chronological (time order), Cause-Effect (why things happen), Compare-Contrast (similarities/differences), Problem-Solution (issue + fix), Classification (grouping), Sequence/Process (step-by-step). Signal words help identify each pattern." },
    { front: "Signal Words: Cause-Effect", back: "Because, therefore, consequently, as a result, due to, since, thus, leads to, so. These words indicate that one event or condition causes another." },
    { front: "Signal Words: Compare-Contrast", back: "Compare: similarly, likewise, both, in the same way, also. Contrast: however, but, on the other hand, whereas, unlike, although, in contrast, while. These words signal the organizational pattern." },
    { front: "Ethos, Pathos, Logos", back: "Ethos = credibility/authority ('As a 30-year veteran...'). Pathos = emotion ('Imagine your child...'). Logos = logic/evidence ('Studies show a 40% increase...'). Authors often use all three — identify the PRIMARY appeal." },
    { front: "Author's Point of View", back: "First person (I, we) — personal, subjective. Second person (you) — instructional, direct. Third person (he, she, they) — objective, analytical. Point of view affects how information is presented and perceived." },
    { front: "Rhetorical Question", back: "A question asked for effect, not expecting an answer. Example: 'How can we stand by while children go hungry?' Purpose: engage the reader, emphasize a point, or transition to a new idea. Common in persuasive writing." },
    { front: "Transition Words and Flow", back: "Transitions connect ideas: Addition (furthermore, moreover), Contrast (however, yet), Sequence (first, next, finally), Example (for instance, such as), Conclusion (therefore, in summary). They reveal the author's organizational logic." },
    { front: "Audience and Purpose", back: "Audience = who the author is writing FOR. Purpose = why they are writing. These two factors shape word choice, tone, detail level, and structure. A medical journal article differs from a health blog because of different audiences and purposes." }
  ],

  3: [
    { front: "Synthesizing Multiple Passages", back: "Synthesis means COMBINING information from two or more sources to form a new understanding. It's not just summarizing each source — it's finding connections, contradictions, or complementary ideas between them." },
    { front: "Evaluating an Argument", back: "Check for: (1) Is the claim clear? (2) Is there sufficient evidence? (3) Is the evidence relevant? (4) Is the reasoning logical? (5) Are there logical fallacies? A strong argument has all five; a weak one is missing at least one." },
    { front: "Common Logical Fallacies", back: "Ad Hominem (attack the person), Straw Man (misrepresent the argument), False Dilemma (only two options), Slippery Slope (extreme chain of events), Bandwagon (everyone does it), Appeal to Tradition (we've always done it), Circular Reasoning (conclusion = premise)." },
    { front: "Correlation vs. Causation", back: "Correlation: two things happen together. Causation: one thing CAUSES the other. Just because A and B are related doesn't mean A causes B. Example: Ice cream sales and drowning rates both rise in summer — but ice cream doesn't cause drowning." },
    { front: "Bias and Objectivity", back: "Bias is a systematic leaning toward one perspective. Indicators: loaded language, one-sided evidence, missing counterarguments, emotional appeals without facts. Objective writing presents multiple viewpoints with balanced evidence." },
    { front: "Primary vs. Secondary Sources", back: "Primary sources: original, firsthand (diaries, interviews, data, speeches). Secondary sources: analysis of primary sources (textbooks, reviews, commentaries). Primary sources are generally stronger evidence because they are unfiltered." },
    { front: "Comparing Author Perspectives", back: "When comparing two authors: identify each author's claim, note their evidence, find points of agreement AND disagreement, and consider WHY they differ (different values, data, or audiences). The Praxis often asks what both authors agree on." },
    { front: "Sufficient vs. Insufficient Evidence", back: "Sufficient evidence is enough to support a claim convincingly — multiple sources, large samples, controlled studies. Insufficient evidence is too limited — single anecdotes, small samples, or one study from one location." },
    { front: "Relevance of Evidence", back: "Relevant evidence directly relates to and supports the specific claim being made. Irrelevant evidence may be factually true but doesn't connect to the argument. Ask: 'Does this evidence actually prove the author's point?'" },
    { front: "Generalizations and Overgeneralizations", back: "A valid generalization is a broad statement supported by sufficient evidence. An overgeneralization extends beyond what the evidence supports. Watch for words like 'all,' 'never,' 'always,' 'everyone' — these often signal overgeneralization." },
    { front: "Counterarguments", back: "A counterargument is an opposing viewpoint the author addresses. Strong writers acknowledge counterarguments and then refute them. The presence of counterarguments typically STRENGTHENS an argument by showing the author has considered other perspectives." },
    { front: "Fact-Check Strategy for Praxis", back: "For evidence assessment questions: (1) Identify the claim, (2) Examine each piece of evidence, (3) Ask 'Is it relevant?', (4) Ask 'Is it sufficient?', (5) Ask 'Is it from a credible source?', (6) Check for logical fallacies. Eliminate answers that fail any test." }
  ]
};

// ─────────────────────────────────────────────
// GLOSSARY DATA — 12 per section (36 total)
// ─────────────────────────────────────────────
export const GLOSSARY_DATA = {
  1: [
    { term: "Main Idea", definition: "The central point or most important concept the author communicates in a passage; the key message the entire passage supports" },
    { term: "Supporting Detail", definition: "A fact, example, statistic, anecdote, or piece of evidence that reinforces or proves the main idea of a passage" },
    { term: "Inference", definition: "A logical conclusion drawn from evidence and reasoning in the text, even though it is not explicitly stated by the author" },
    { term: "Theme", definition: "The underlying message, lesson, or central insight of a text that applies broadly beyond the specific passage — often expressed as a universal truth" },
    { term: "Summary", definition: "A brief, accurate restatement of a passage's main points and essential information, shorter than the original and free of personal opinion" },
    { term: "Paraphrase", definition: "Restating a specific passage or sentence in your own words while preserving the original meaning; approximately the same length as the original" },
    { term: "Textual Evidence", definition: "Specific words, phrases, sentences, or data from a passage that directly support an interpretation, inference, or answer" },
    { term: "Author's Purpose", definition: "The reason an author writes a text — typically to inform, persuade, entertain, describe, or explain; determined by analyzing tone and content" },
    { term: "Explicit Information", definition: "Information that is directly and clearly stated in the text, requiring no interpretation or inference to understand" },
    { term: "Implicit Information", definition: "Information that is suggested or implied by the text but not directly stated, requiring the reader to read between the lines" },
    { term: "Central Argument", definition: "The primary claim or thesis an author presents and defends throughout a passage, supported by evidence and reasoning" },
    { term: "Context", definition: "The surrounding text, situation, or background information that helps determine the meaning of a word, phrase, or passage" }
  ],

  2: [
    { term: "Tone", definition: "The author's attitude toward the subject or audience, conveyed through word choice, sentence structure, and stylistic elements (e.g., critical, sarcastic, admiring)" },
    { term: "Connotation", definition: "The emotional or cultural associations a word carries beyond its literal dictionary definition (e.g., 'home' connotes warmth and comfort; 'house' is neutral)" },
    { term: "Denotation", definition: "The literal, dictionary definition of a word, without any emotional or cultural associations attached to it" },
    { term: "Figurative Language", definition: "Language that uses figures of speech — such as metaphors, similes, personification, and hyperbole — to convey meaning beyond the literal interpretation" },
    { term: "Rhetorical Strategy", definition: "A technique an author uses to persuade, inform, or engage readers, including appeals to logic (logos), emotion (pathos), and credibility (ethos)" },
    { term: "Ethos", definition: "A rhetorical appeal based on the author's credibility, character, or authority on the subject; establishes trust with the audience" },
    { term: "Pathos", definition: "A rhetorical appeal to the audience's emotions — such as fear, sympathy, anger, or hope — to persuade or motivate action" },
    { term: "Logos", definition: "A rhetorical appeal based on logic, reasoning, and evidence — including statistics, facts, and structured arguments — to persuade through rational demonstration" },
    { term: "Organizational Pattern", definition: "The structural framework an author uses to arrange ideas in a passage, such as chronological, cause-effect, compare-contrast, or problem-solution" },
    { term: "Point of View", definition: "The perspective from which a text is written: first person (I/we), second person (you), or third person (he/she/they), affecting the reader's relationship to the content" },
    { term: "Diction", definition: "An author's deliberate word choice, which shapes tone, conveys attitude, and influences the reader's perception of the subject" },
    { term: "Syntax", definition: "The arrangement of words and phrases to create sentences; sentence structure affects pacing, emphasis, and tone in a passage" }
  ],

  3: [
    { term: "Synthesis", definition: "The process of combining information from multiple sources or passages to form a new, integrated understanding or conclusion" },
    { term: "Argument", definition: "A claim supported by evidence and reasoning, intended to persuade the reader of a particular position or conclusion" },
    { term: "Counterargument", definition: "An opposing viewpoint or objection that challenges the author's main claim; strong writers acknowledge and refute counterarguments" },
    { term: "Logical Fallacy", definition: "An error in reasoning that weakens an argument, such as ad hominem attacks, false dilemmas, straw man arguments, or appeals to tradition" },
    { term: "Ad Hominem", definition: "A logical fallacy that attacks the person making an argument rather than addressing the argument itself (Latin: 'to the person')" },
    { term: "Correlation vs. Causation", definition: "Correlation means two variables are related; causation means one directly causes the other. Confusing the two is a common logical error" },
    { term: "Bias", definition: "A systematic inclination toward a particular perspective that may distort objectivity; indicated by one-sided evidence, loaded language, or missing counterarguments" },
    { term: "Primary Source", definition: "An original, firsthand document or artifact — such as a diary, interview, speech, or dataset — created during the time period being studied" },
    { term: "Secondary Source", definition: "A source that analyzes, interprets, or comments on primary sources — such as textbooks, review articles, biographies, or literary criticism" },
    { term: "Credibility", definition: "The trustworthiness and reliability of a source, determined by the author's expertise, the publication's reputation, evidence quality, and potential bias" },
    { term: "Overgeneralization", definition: "A broad claim that extends beyond what the evidence supports, often signaled by absolute words like 'all,' 'never,' 'always,' or 'everyone'" },
    { term: "Relevance", definition: "The degree to which a piece of evidence directly relates to and supports the specific claim being made; irrelevant evidence weakens an argument" }
  ]
};

// ─────────────────────────────────────────────
// SECTION INTROS — ISLA coaching voice
// ─────────────────────────────────────────────
export const SECTION_INTROS = {
  1: "Welcome to Key Ideas and Details — the biggest chunk of the Reading exam at 40%. This is where you prove you can dig into a passage and pull out the gold. Main Idea Identification is about 12% — can you tell me what the author's real point is, not just the topic? Drawing Inferences comes in at 10% — this is reading between the lines, connecting dots the author didn't spell out. Supporting Evidence is another 10% — you need to find the specific detail that backs up a claim. And Summarizing Passages is 8% — can you boil it all down without adding your own spin? The key skill here is going BACK to the passage. Every answer lives in the text. Trust the words on the page, not what you think you know. Let's lock this section down.",

  2: "Welcome to Craft, Structure, and Language Skills — this is 30% of your exam, and it's all about HOW authors write, not just WHAT they say. Author's Tone and Attitude is about 8% — you need to pick up on those subtle word choices that reveal whether an author is critical, admiring, sarcastic, or neutral. Word Meaning in Context is another 8% — forget what you think a word means and focus on how it's used RIGHT HERE in THIS sentence. Passage Organization at 7% asks you to identify the blueprint — is it cause-and-effect, compare-contrast, problem-solution, or chronological? And Rhetorical Strategies at 7% — know your ethos, pathos, and logos. Authors are always trying to persuade you, and this section tests whether you can see their playbook. Pay attention to word choice — it reveals everything.",

  3: "Welcome to Integration of Knowledge and Ideas — the final 30% and arguably the most challenging section. This is where you go beyond individual passages and start thinking critically. Synthesizing Information at 8% means combining ideas from two or more passages to see the bigger picture. Evaluating Arguments at 8% means asking: Is this reasoning actually sound, or is there a logical fallacy hiding in there? Comparing Perspectives at 7% — when two authors tackle the same topic differently, you need to identify where they agree, where they clash, and why. And Assessing Evidence at 7% — is the evidence sufficient? Relevant? Or is it just one person's opinion dressed up as fact? This section rewards critical thinking. Don't just accept what you read — question it. That's what strong readers do."
};
