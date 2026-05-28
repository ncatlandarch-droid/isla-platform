/**
 * Praxis Core Writing (5723) — ISLA Exam Prep Data Module
 * Source: ETS Praxis Core Academic Skills for Educators: Writing (5723) Test Blueprint
 * 40 selected-response questions + 2 constructed-response essays
 * 100 minutes total (40 min selected-response, 60 min essays)
 */

import { Pencil, BookOpen } from 'lucide-react';

export const AGGIE_BLUE = "#004684";
export const AGGIE_GOLD = "#FDB927";

// ─────────────────────────────────────────────────────
// EXAM METADATA
// ─────────────────────────────────────────────────────
export const EXAM_META = {
  examName: "Praxis Core Academic Skills for Educators: Writing",
  testCode: "5723",
  totalSelectedResponse: 40,
  totalConstructedResponse: 2,
  totalDuration: 100,       // minutes
  srDuration: 40,           // minutes for selected-response
  crDuration: 60,           // minutes for constructed-response essays
  scoreRange: "100–200",
  passingScore: 162,        // typical; varies by state
  passingScoreNote: "Passing score varies by state — check your state's requirements.",
  format: "40 selected-response (multiple-choice) + 2 constructed-response essays (argumentative & informative/explanatory)",
  testProvider: "ETS (Educational Testing Service)"
};

// ─────────────────────────────────────────────────────
// EXAM SECTIONS
// ─────────────────────────────────────────────────────
export const EXAM_SECTIONS = [
  {
    id: 1,
    title: "Text Types, Purposes, and Production",
    shortTitle: "Writing Production",
    icon: Pencil,
    color: AGGIE_BLUE,
    totalItems: 20,   // ~50% of 40 selected-response questions
    examDuration: 40,  // shared across both sections (40 min SR total)
    examFormat: "Selected-response (multiple-choice) + 1 argumentative essay",
    videos: [],
    topics: [
      { name: "Argumentative Writing", weight: 20, description: "Constructing claims, counter-arguments, evidence-based reasoning, and persuasive appeals (ethos, pathos, logos)" },
      { name: "Informative/Explanatory Writing", weight: 15, description: "Organizing information logically, using definitions, examples, comparisons, and cause-effect structures" },
      { name: "Thesis Development & Organization", weight: 15, description: "Crafting effective thesis statements, essay structure, introductions, conclusions, and logical sequencing of ideas" }
    ]
  },
  {
    id: 2,
    title: "Language and Research Skills for Writing",
    shortTitle: "Language & Research",
    icon: BookOpen,
    color: AGGIE_BLUE,
    totalItems: 20,   // ~50% of 40 selected-response questions
    examDuration: 40,
    examFormat: "Selected-response (multiple-choice) + 1 informative/explanatory essay",
    videos: [],
    topics: [
      { name: "Grammar, Usage, and Mechanics", weight: 20, description: "Subject-verb agreement, pronoun-antecedent agreement, verb tense consistency, comma usage, semicolons, colons, apostrophes" },
      { name: "Sentence Structure and Revision", weight: 15, description: "Identifying and correcting fragments, run-ons, comma splices, dangling modifiers, parallel structure, and wordiness" },
      { name: "Research Skills and Citation", weight: 15, description: "Evaluating sources, integrating evidence, paraphrasing vs. quoting, avoiding plagiarism, and basic citation practices" }
    ]
  }
];

// ─────────────────────────────────────────────────────
// QUESTION BANK — 15 per section (30 total)
// ─────────────────────────────────────────────────────
export const QUESTION_BANK = {
  1: [
    {
      id: "pw1-1",
      topic: "Argumentative Writing",
      text: "A writer wants to argue that public schools should require media literacy courses. Which of the following would serve as the STRONGEST supporting evidence?",
      options: [
        "A personal anecdote about being fooled by a fake news article",
        "A peer-reviewed study showing students with media literacy training are 60% better at identifying misinformation",
        "A quote from a popular social media influencer endorsing the idea",
        "A dictionary definition of the term 'media literacy'"
      ],
      correct: 1,
      explanation: "Peer-reviewed research with specific, quantifiable findings provides the strongest evidence in an argumentative essay. Personal anecdotes and celebrity endorsements are weaker appeals; definitions provide no arguable support."
    },
    {
      id: "pw1-2",
      topic: "Argumentative Writing",
      text: "Read the following thesis statement: 'Schools should adopt year-round calendars.' Which revision BEST strengthens this thesis?",
      options: [
        "Schools should consider maybe switching to a year-round calendar if it seems right.",
        "Year-round school calendars reduce summer learning loss, improve student retention, and make more efficient use of public facilities.",
        "Some people think year-round calendars are a good idea, while others disagree.",
        "Year-round calendars have been discussed by many school boards across the country."
      ],
      correct: 1,
      explanation: "A strong thesis statement is specific, arguable, and previews the supporting reasons. Option B provides a clear claim with three concrete reasons, making the essay's direction and scope immediately clear to the reader."
    },
    {
      id: "pw1-3",
      topic: "Argumentative Writing",
      text: "Which of the following BEST describes the purpose of a counterargument in an argumentative essay?",
      options: [
        "To weaken the writer's own position and show uncertainty",
        "To acknowledge an opposing viewpoint and then refute it, thereby strengthening the writer's argument",
        "To change the essay's topic midway through the body paragraphs",
        "To provide an emotional appeal to gain the reader's sympathy"
      ],
      correct: 1,
      explanation: "A counterargument demonstrates the writer has considered multiple perspectives. By acknowledging and then refuting the opposing view, the writer strengthens credibility and shows the argument can withstand scrutiny."
    },
    {
      id: "pw1-4",
      topic: "Informative/Explanatory Writing",
      text: "A student is writing an informative essay about the water cycle. Which organizational pattern is MOST appropriate?",
      options: [
        "Compare and contrast",
        "Chronological/sequential order",
        "Problem and solution",
        "Order of importance"
      ],
      correct: 1,
      explanation: "The water cycle is a sequential, repeating process (evaporation → condensation → precipitation → collection). Chronological/sequential order best mirrors the natural progression of the phenomenon being explained."
    },
    {
      id: "pw1-5",
      topic: "Informative/Explanatory Writing",
      text: "Which of the following introductory strategies would be LEAST effective for an informative essay about the history of jazz music?",
      options: [
        "A vivid description of a 1920s New Orleans jazz club",
        "A compelling statistic about jazz's global influence on modern music",
        "A broad, vague statement such as 'Music has been around for a long time'",
        "A brief quotation from a renowned jazz musician"
      ],
      correct: 2,
      explanation: "Overly broad, generic openings ('Since the beginning of time…', 'Music has been around for a long time…') fail to engage the reader or establish the essay's specific focus. Effective introductions are precise and immediately relevant."
    },
    {
      id: "pw1-6",
      topic: "Thesis Development & Organization",
      text: "Read the following passage:\n\n'Urban gardens provide fresh produce to food deserts. ______ they create green spaces that reduce the urban heat island effect.'\n\nWhich transitional word or phrase BEST fills the blank?",
      options: [
        "However,",
        "In addition,",
        "On the other hand,",
        "Nevertheless,"
      ],
      correct: 1,
      explanation: "'In addition' is an additive transition that connects two complementary benefits of urban gardens. 'However,' 'On the other hand,' and 'Nevertheless' all signal contrast, which is inappropriate when both sentences support the same point."
    },
    {
      id: "pw1-7",
      topic: "Thesis Development & Organization",
      text: "A student's essay contains the following paragraph:\n\n'Dogs make great pets. They are loyal companions. My neighbor has three cats. Dogs can also be trained to perform helpful tasks.'\n\nWhat is the PRIMARY problem with this paragraph?",
      options: [
        "It lacks a topic sentence",
        "It contains a sentence that breaks paragraph unity",
        "It uses too many transitional phrases",
        "It is too short to develop the idea"
      ],
      correct: 1,
      explanation: "The sentence 'My neighbor has three cats' is off-topic and breaks the paragraph's unity. Every sentence in a paragraph should directly support or develop the controlling idea established in the topic sentence."
    },
    {
      id: "pw1-8",
      topic: "Thesis Development & Organization",
      text: "Which of the following is the MOST effective concluding strategy for an argumentative essay?",
      options: [
        "Introducing a completely new argument not discussed in the body",
        "Restating the thesis word-for-word from the introduction",
        "Synthesizing key points and connecting them to a broader implication or call to action",
        "Ending with 'In conclusion, those are all the reasons I believe this'"
      ],
      correct: 2,
      explanation: "Effective conclusions synthesize (not merely restate) the argument's key points and extend the discussion to broader implications or a call to action. Introducing new arguments or using formulaic closings weakens the essay."
    },
    {
      id: "pw1-9",
      topic: "Argumentative Writing",
      text: "Which rhetorical appeal does the following sentence primarily use?\n\n'If we fail to act on climate change now, our children will inherit a planet scarred by floods, droughts, and extinctions.'",
      options: [
        "Ethos (credibility)",
        "Pathos (emotional appeal)",
        "Logos (logical reasoning)",
        "Kairos (timeliness)"
      ],
      correct: 1,
      explanation: "This sentence appeals to emotion (pathos) by invoking concern for children and fear of environmental devastation. Effective arguments use a combination of ethos, pathos, and logos, but this sentence is primarily pathetic appeal."
    },
    {
      id: "pw1-10",
      topic: "Informative/Explanatory Writing",
      text: "A writer is explaining how solar panels convert sunlight into electricity. Which type of supporting detail would be MOST appropriate?",
      options: [
        "The writer's personal opinion about the aesthetics of solar panels",
        "A step-by-step explanation of the photovoltaic process",
        "A comparison of solar panel brands and prices",
        "An emotional appeal about the beauty of sunlight"
      ],
      correct: 1,
      explanation: "Informative/explanatory writing aims to increase the reader's understanding. A process explanation directly addresses how solar panels work, which is the stated purpose. Opinions and emotional appeals are inappropriate for informative writing."
    },
    {
      id: "pw1-11",
      topic: "Thesis Development & Organization",
      text: "Which of the following thesis statements is MOST appropriate for an informative/explanatory essay?",
      options: [
        "The government must immediately ban all single-use plastics to save the ocean.",
        "Single-use plastics are destroying marine ecosystems and should be illegal.",
        "Single-use plastics enter ocean ecosystems through runoff, break into microplastics, and accumulate in marine food chains.",
        "I think single-use plastics are the worst invention in human history."
      ],
      correct: 2,
      explanation: "An informative/explanatory thesis explains a process or phenomenon without taking a persuasive stance. Option C objectively describes what happens to single-use plastics. Options A, B, and D all contain argumentative or opinion-based language."
    },
    {
      id: "pw1-12",
      topic: "Argumentative Writing",
      text: "A student writes: 'Everyone knows that homework is bad for students.' Which logical fallacy does this statement BEST represent?",
      options: [
        "Ad hominem",
        "Hasty generalization",
        "Bandwagon (appeal to popularity)",
        "Straw man"
      ],
      correct: 2,
      explanation: "'Everyone knows' is a bandwagon fallacy (argumentum ad populum) — it assumes something is true because it is widely believed. Sound arguments rely on evidence, not appeals to popularity or assumed consensus."
    },
    {
      id: "pw1-13",
      topic: "Informative/Explanatory Writing",
      text: "Which of the following BEST describes the difference between a summary and a paraphrase?",
      options: [
        "A summary uses the author's exact words; a paraphrase uses different words",
        "A summary condenses the main ideas of a longer passage; a paraphrase restates a specific passage in the writer's own words at roughly the same length",
        "A summary is always one sentence; a paraphrase is always one paragraph",
        "There is no meaningful difference between a summary and a paraphrase"
      ],
      correct: 1,
      explanation: "A summary is a condensed version of the main ideas of a longer text. A paraphrase restates a specific passage in the writer's own words at approximately the same length. Both require citation to avoid plagiarism."
    },
    {
      id: "pw1-14",
      topic: "Thesis Development & Organization",
      text: "A writer's outline includes the following body paragraph topics:\n\nI. Health benefits of walking\nII. Best hiking shoes for beginners\nIII. Mental health improvements from walking\nIV. Walking as accessible exercise for all ages\n\nWhich topic does NOT fit the essay's apparent focus?",
      options: [
        "I. Health benefits of walking",
        "II. Best hiking shoes for beginners",
        "III. Mental health improvements from walking",
        "IV. Walking as accessible exercise for all ages"
      ],
      correct: 1,
      explanation: "Topics I, III, and IV all address benefits of walking as exercise. Topic II — hiking shoe recommendations — shifts to a consumer/gear focus that disrupts the essay's coherence. Maintaining unity means removing tangential topics."
    },
    {
      id: "pw1-15",
      topic: "Argumentative Writing",
      text: "Which of the following sentences BEST demonstrates effective use of a qualifying word to strengthen an argument?",
      options: [
        "Standardized tests always fail to measure a student's true abilities.",
        "Standardized tests never provide any useful information about students.",
        "Research suggests that standardized tests may not fully capture the range of student abilities.",
        "Standardized tests are completely useless and should be abolished immediately."
      ],
      correct: 2,
      explanation: "Qualifiers like 'suggests,' 'may,' and 'not fully' make arguments more credible by avoiding absolute claims. Absolute terms like 'always,' 'never,' and 'completely' are easily refuted and weaken an argument's credibility."
    }
  ],

  2: [
    {
      id: "pw2-1",
      topic: "Grammar, Usage, and Mechanics",
      text: "Select the sentence that contains a subject-verb agreement error.",
      options: [
        "The committee has reached its decision after careful deliberation.",
        "Each of the students have completed their assignments on time.",
        "Neither the teacher nor the students were aware of the schedule change.",
        "The flock of birds flies south every autumn."
      ],
      correct: 1,
      explanation: "'Each' is a singular indefinite pronoun and requires a singular verb. The correct form is 'Each of the students has completed.' The prepositional phrase 'of the students' does not affect subject-verb agreement."
    },
    {
      id: "pw2-2",
      topic: "Grammar, Usage, and Mechanics",
      text: "Which sentence correctly uses a semicolon?",
      options: [
        "The students studied hard; however, the test was still difficult.",
        "The students studied hard; and they passed the test.",
        "The students; who studied hard, passed the test.",
        "The students studied; math, science, and English."
      ],
      correct: 0,
      explanation: "A semicolon correctly joins two independent clauses, especially when followed by a conjunctive adverb (however, therefore, moreover) and a comma. Option A follows this pattern correctly."
    },
    {
      id: "pw2-3",
      topic: "Grammar, Usage, and Mechanics",
      text: "Which sentence contains a pronoun-antecedent agreement error?",
      options: [
        "The orchestra tuned their instruments before the performance.",
        "Every student must bring his or her textbook to class.",
        "A teacher should always prepare their lessons in advance.",
        "The dogs wagged their tails when their owner arrived."
      ],
      correct: 2,
      explanation: "'A teacher' is a singular antecedent, so the pronoun must also be singular. In formal, standard written English tested on the Praxis, 'A teacher should always prepare his or her lessons' is the grammatically correct form."
    },
    {
      id: "pw2-4",
      topic: "Sentence Structure and Revision",
      text: "Which of the following is a sentence fragment?",
      options: [
        "Running through the park on a sunny afternoon.",
        "She ran through the park on a sunny afternoon.",
        "Although it was sunny, she ran through the park.",
        "The park was sunny, and she decided to go running."
      ],
      correct: 0,
      explanation: "A sentence fragment lacks a subject, a verb, or a complete thought. 'Running through the park on a sunny afternoon' is a participial phrase with no independent subject or main verb — it cannot stand alone as a sentence."
    },
    {
      id: "pw2-5",
      topic: "Sentence Structure and Revision",
      text: "Which sentence contains a dangling modifier?",
      options: [
        "After finishing the exam, the students left the classroom.",
        "Walking to school, the rain began to fall heavily.",
        "Because she studied all night, Maria passed the test.",
        "The tired runner, having completed the marathon, collapsed at the finish line."
      ],
      correct: 1,
      explanation: "'Walking to school' modifies the subject that immediately follows the comma. Since 'the rain' cannot walk to school, this is a dangling modifier. Corrected: 'Walking to school, the students got caught in the rain.'"
    },
    {
      id: "pw2-6",
      topic: "Sentence Structure and Revision",
      text: "Identify the sentence that contains a comma splice.",
      options: [
        "The lecture was fascinating, so the students took detailed notes.",
        "The lecture was fascinating, the students took detailed notes.",
        "The lecture was fascinating; the students took detailed notes.",
        "Because the lecture was fascinating, the students took detailed notes."
      ],
      correct: 1,
      explanation: "A comma splice occurs when two independent clauses are joined by only a comma without a coordinating conjunction. Fix with a period, semicolon, or by adding a conjunction (and, so, but)."
    },
    {
      id: "pw2-7",
      topic: "Sentence Structure and Revision",
      text: "Which revision BEST eliminates wordiness while preserving the original meaning?\n\nOriginal: 'Due to the fact that the weather was extremely cold in temperature, the school made the decision to cancel classes for the day.'",
      options: [
        "Because the weather was extremely cold in temperature, the school decided to cancel classes.",
        "Due to the fact that it was cold, they canceled school for the entire day.",
        "Because of the extreme cold, the school canceled classes for the day.",
        "The school made the decision to cancel classes due to the fact that it was cold outside."
      ],
      correct: 2,
      explanation: "'Due to the fact that' → 'Because'; 'extremely cold in temperature' → 'extreme cold'; 'made the decision to cancel' → 'canceled.' Concise writing eliminates wordy phrases without losing meaning."
    },
    {
      id: "pw2-8",
      topic: "Grammar, Usage, and Mechanics",
      text: "Which sentence uses the apostrophe correctly?",
      options: [
        "The dog wagged it's tail happily.",
        "Its' been a long day at the office.",
        "The children's playground was recently renovated.",
        "The teacher's lounge belong's to the staff."
      ],
      correct: 2,
      explanation: "'Children' is an irregular plural that doesn't end in 's,' so the possessive is formed by adding 's: children's. 'It's' is a contraction of 'it is' (not possessive). 'Its' (no apostrophe) is the possessive form."
    },
    {
      id: "pw2-9",
      topic: "Grammar, Usage, and Mechanics",
      text: "Select the sentence with correct comma usage.",
      options: [
        "Before the assembly began the principal addressed, the parents and teachers.",
        "Before the assembly began, the principal addressed the parents and teachers.",
        "Before, the assembly began the principal addressed the parents and teachers.",
        "Before the assembly began the principal, addressed the parents and teachers."
      ],
      correct: 1,
      explanation: "A comma is placed after an introductory dependent clause ('Before the assembly began') to separate it from the main clause. No comma separates a verb from its direct object."
    },
    {
      id: "pw2-10",
      topic: "Sentence Structure and Revision",
      text: "Which sentence demonstrates correct parallel structure?",
      options: [
        "The coach told the players to stretch, running laps, and they should practice free throws.",
        "The coach told the players to stretch, run laps, and practice free throws.",
        "The coach told the players to stretch, to be running laps, and practicing free throws.",
        "The coach told the players stretching, to run laps, and practice free throws."
      ],
      correct: 1,
      explanation: "Parallel structure requires that items in a series share the same grammatical form. 'To stretch, run laps, and practice free throws' uses parallel infinitive phrases. Mixing gerunds, infinitives, and clauses breaks parallelism."
    },
    {
      id: "pw2-11",
      topic: "Research Skills and Citation",
      text: "A student is writing a research paper and finds a relevant article on an anonymous blog with no author, publication date, or cited sources. How should the student handle this source?",
      options: [
        "Use it freely since all internet sources are equally valid",
        "Cite it as an anonymous source and include the URL",
        "Avoid using it because it lacks credibility markers (author, date, cited sources) and seek a more reliable source",
        "Copy the content directly since no author is listed to claim ownership"
      ],
      correct: 2,
      explanation: "Credible sources have identifiable authors, publication dates, and cited evidence. An anonymous blog without these markers fails basic source evaluation criteria (currency, relevance, authority, accuracy, purpose — the CRAAP test)."
    },
    {
      id: "pw2-12",
      topic: "Research Skills and Citation",
      text: "Which of the following constitutes plagiarism?",
      options: [
        "Paraphrasing a source's ideas in your own words and including a proper citation",
        "Using a direct quotation with quotation marks and a proper citation",
        "Restating an author's ideas in your own words without providing any citation",
        "Citing a source in both in-text citations and the reference list"
      ],
      correct: 2,
      explanation: "Plagiarism occurs when a writer presents another's ideas as their own without attribution. Even paraphrased content requires citation. Only common knowledge (widely known facts) does not need citation."
    },
    {
      id: "pw2-13",
      topic: "Grammar, Usage, and Mechanics",
      text: "Which sentence correctly uses a colon?",
      options: [
        "The recipe calls for: flour, sugar, and eggs.",
        "She had one goal: to finish the marathon before sunset.",
        "The students were: tired, hungry, and frustrated.",
        "My favorite colors are: blue, green, and red."
      ],
      correct: 1,
      explanation: "A colon follows a complete independent clause and introduces an explanation, list, or elaboration. 'She had one goal' is a complete clause. Options A, C, and D incorrectly place the colon after a verb or preposition, breaking the clause."
    },
    {
      id: "pw2-14",
      topic: "Sentence Structure and Revision",
      text: "Which of the following sentences is a run-on?",
      options: [
        "The students finished their exams, and they celebrated afterward.",
        "Although the rain continued, the game was not canceled.",
        "The library closed early the students had to find another place to study.",
        "Running through the hallway is prohibited during school hours."
      ],
      correct: 2,
      explanation: "A run-on sentence (fused sentence) joins two independent clauses with no punctuation or conjunction. 'The library closed early' and 'the students had to find another place to study' are both independent clauses with nothing joining them."
    },
    {
      id: "pw2-15",
      topic: "Research Skills and Citation",
      text: "When integrating a direct quotation into a research paper, which of the following is the BEST practice?",
      options: [
        "Drop the quotation into the paragraph without any introduction or context",
        "Introduce the quotation with a signal phrase, provide the quote in quotation marks, cite the source, and follow with analysis",
        "Paraphrase the quote but still put it in quotation marks",
        "Use as many direct quotations as possible to fill the required page count"
      ],
      correct: 1,
      explanation: "The 'quote sandwich' method — introduce with a signal phrase, present the quoted material with proper punctuation and citation, then analyze or explain its relevance — is the most effective way to integrate direct quotations into academic writing."
    }
  ]
};

// ─────────────────────────────────────────────────────
// FLASHCARD DATA — 12 per section (24 total)
// ─────────────────────────────────────────────────────
export const FLASHCARD_DATA = {
  1: [
    { front: "Thesis Statement", back: "A clear, specific, arguable sentence (usually at the end of the introduction) that states the essay's main claim and previews its supporting points. Strong theses are debatable and provide direction." },
    { front: "Counterargument", back: "An opposing viewpoint acknowledged and then refuted within an argumentative essay. Including counterarguments strengthens credibility by showing the writer has considered multiple perspectives." },
    { front: "Ethos, Pathos, Logos", back: "The three rhetorical appeals. Ethos = credibility/authority. Pathos = emotional appeal. Logos = logic/evidence. Effective arguments use a strategic combination of all three." },
    { front: "Bandwagon Fallacy", back: "A logical error that argues something is true or good because 'everyone' believes or does it. Example: 'Everyone knows homework is harmful.' Always demand evidence over assumed consensus." },
    { front: "Hasty Generalization", back: "Drawing a broad conclusion from insufficient evidence. Example: 'I failed one math test, so I'm bad at math.' Sound arguments are supported by adequate, representative evidence." },
    { front: "Transitional Words: Addition", back: "Transitions that ADD information: in addition, furthermore, moreover, also, similarly. Use these to connect supporting points that build on each other." },
    { front: "Transitional Words: Contrast", back: "Transitions that show CONTRAST: however, nevertheless, on the other hand, conversely, although, in contrast. Use these when acknowledging counterarguments or introducing opposing evidence." },
    { front: "Topic Sentence", back: "The first sentence of a body paragraph that states the paragraph's main idea. Every subsequent sentence in the paragraph should support or develop this controlling idea." },
    { front: "Paragraph Unity", back: "Every sentence in a paragraph must support the topic sentence. Off-topic sentences (no matter how interesting) break unity and should be removed or relocated." },
    { front: "Compare/Contrast Organization", back: "Two methods: Block (discuss all of Subject A, then all of Subject B) or Point-by-Point (alternate between A and B for each criterion). Point-by-point is usually stronger for analysis." },
    { front: "Effective Conclusions", back: "Synthesize (don't just restate) key points and connect to broader implications, a call to action, or a thought-provoking question. NEVER introduce new arguments in the conclusion." },
    { front: "Qualifiers in Arguments", back: "Words like 'suggests,' 'may,' 'often,' and 'generally' make arguments more credible by avoiding absolute claims. Absolutes like 'always' and 'never' are easily refuted." }
  ],

  2: [
    { front: "Subject-Verb Agreement", back: "The verb must match its subject in number. Common traps: prepositional phrases between subject and verb ('Each of the students HAS'), and indefinite pronouns (everyone, nobody, each = singular)." },
    { front: "Pronoun-Antecedent Agreement", back: "Pronouns must agree in number with their antecedents. 'A student' is singular → 'his or her' (formal standard). Collective nouns (team, jury) are usually singular in American English." },
    { front: "Comma Splice", back: "Incorrectly joining two independent clauses with only a comma. Fix with: (1) a period, (2) a semicolon, (3) a comma + coordinating conjunction (FANBOYS: for, and, nor, but, or, yet, so)." },
    { front: "Sentence Fragment", back: "A group of words punctuated as a sentence but lacking a subject, a verb, or a complete thought. Common fragments: dependent clauses alone, participial phrases, and appositives." },
    { front: "Dangling Modifier", back: "A modifying phrase that doesn't clearly attach to the word it modifies. 'Walking to school, the rain began' → the rain wasn't walking. Fix: 'Walking to school, the students got caught in the rain.'" },
    { front: "Parallel Structure", back: "Items in a series or comparison must share the same grammatical form. Correct: 'to read, to write, and to think.' Incorrect: 'to read, writing, and thinking.'" },
    { front: "Semicolon Usage", back: "Use semicolons to: (1) join two related independent clauses, or (2) separate items in a series that already contain commas. Always check that both sides of the semicolon can stand alone." },
    { front: "Colon Usage", back: "A colon follows a COMPLETE independent clause and introduces a list, explanation, or elaboration. NEVER place a colon after a verb or preposition. Wrong: 'The colors are: red, blue.' Right: 'She wanted three things: rest, food, and quiet.'" },
    { front: "Apostrophe Rules", back: "'It's' = it is (contraction). 'Its' = possessive (no apostrophe). Singular possessive: dog's. Plural possessive: dogs'. Irregular plural: children's, women's." },
    { front: "Concision in Writing", back: "Replace wordy phrases: 'due to the fact that' → 'because'; 'at this point in time' → 'now'; 'made the decision to' → 'decided'; 'in the event that' → 'if.' Eliminate redundancy." },
    { front: "CRAAP Test for Sources", back: "Evaluate sources using Currency, Relevance, Authority, Accuracy, and Purpose. Peer-reviewed journal articles and official data are strongest; anonymous blogs and social media are weakest." },
    { front: "Plagiarism Prevention", back: "ALL borrowed ideas require citation — even paraphrased content. Only common knowledge (widely known facts like 'water freezes at 32°F') is exempt. Use the 'quote sandwich': introduce, quote, analyze." }
  ]
};

// ─────────────────────────────────────────────────────
// GLOSSARY DATA — 12 per section (24 total)
// ─────────────────────────────────────────────────────
export const GLOSSARY_DATA = {
  1: [
    { term: "Thesis Statement", definition: "A concise, arguable claim that expresses the main argument or central idea of an essay and typically appears at the end of the introduction" },
    { term: "Counterargument", definition: "An opposing viewpoint presented in an argumentative essay, followed by a rebuttal, to demonstrate the writer has considered and can address alternative perspectives" },
    { term: "Rhetorical Appeals", definition: "Three persuasive strategies: ethos (credibility), pathos (emotional appeal), and logos (logical reasoning/evidence) used to convince an audience" },
    { term: "Claim", definition: "An assertion or statement that the writer argues is true and supports with evidence and reasoning throughout the essay" },
    { term: "Evidence", definition: "Facts, statistics, expert testimony, examples, or research findings used to support claims in argumentative or informative writing" },
    { term: "Warrant", definition: "The logical connection between a claim and its evidence; the reasoning that explains why the evidence supports the claim" },
    { term: "Logical Fallacy", definition: "A flaw in reasoning that undermines the logic of an argument, such as ad hominem, straw man, bandwagon, hasty generalization, or false dilemma" },
    { term: "Transitional Expression", definition: "A word or phrase that connects ideas within and between paragraphs, signaling relationships like addition, contrast, cause-effect, or sequence" },
    { term: "Topic Sentence", definition: "The sentence — usually first — in a body paragraph that states the paragraph's controlling idea and connects to the thesis" },
    { term: "Coherence", definition: "The logical flow and connectedness of ideas within and between paragraphs, achieved through transitions, consistent point of view, and logical ordering" },
    { term: "Unity", definition: "A quality of effective paragraphs in which every sentence directly supports or develops the paragraph's topic sentence without tangential material" },
    { term: "Informative/Explanatory Writing", definition: "Writing that increases the reader's knowledge of a topic by conveying information, explaining processes, or clarifying concepts without expressing personal opinions or arguments" }
  ],

  2: [
    { term: "Subject-Verb Agreement", definition: "A grammatical rule requiring the verb to match its subject in number: singular subjects take singular verbs, plural subjects take plural verbs" },
    { term: "Pronoun-Antecedent Agreement", definition: "A grammatical rule requiring a pronoun to agree in number, gender, and person with the noun (antecedent) it replaces or refers to" },
    { term: "Comma Splice", definition: "A grammatical error in which two independent clauses are joined with only a comma, without a coordinating conjunction or appropriate punctuation" },
    { term: "Sentence Fragment", definition: "An incomplete sentence that is punctuated as if it were complete, lacking a subject, a predicate, or a complete thought" },
    { term: "Run-on Sentence", definition: "Two or more independent clauses joined without proper punctuation or a conjunction; also called a fused sentence" },
    { term: "Dangling Modifier", definition: "A modifying word or phrase that does not clearly or logically refer to the word it is intended to modify, creating ambiguity or unintended meaning" },
    { term: "Parallel Structure", definition: "The use of consistent grammatical forms for elements in a series, list, or comparison to create balanced, clear, and rhythmic prose" },
    { term: "Active Voice", definition: "A sentence construction in which the subject performs the action of the verb ('The teacher graded the exams'), preferred over passive voice for clarity and directness" },
    { term: "Paraphrase", definition: "Restating a specific passage from a source in the writer's own words and sentence structure, at approximately the same length, while crediting the original source" },
    { term: "Summary", definition: "A brief, condensed version of a longer text's main ideas, written in the writer's own words and significantly shorter than the original" },
    { term: "Signal Phrase", definition: "An introductory phrase that attributes information to its source (e.g., 'According to Smith...' or 'Johnson argues that...'), used before quotations or paraphrases" },
    { term: "Plagiarism", definition: "Presenting another person's words, ideas, or research as one's own without proper attribution, whether intentional or unintentional" }
  ]
};

// ─────────────────────────────────────────────────────
// SECTION INTROS — ISLA coaching voice
// ─────────────────────────────────────────────────────
export const SECTION_INTROS = {
  1: "Welcome to Section 1 — Text Types, Purposes, and Production. This is where we master the craft of building strong, purposeful essays. Here's the breakdown: Argumentative Writing makes up about 20% — that's constructing clear claims, supporting them with solid evidence, acknowledging counterarguments, and using rhetorical appeals effectively. Informative and Explanatory Writing is 15% — organizing information with clarity, using definitions, examples, and logical structures like compare-contrast or cause-effect. Thesis Development and Organization rounds out at 15% — crafting specific thesis statements, structuring essays with cohesive introductions and conclusions, and using transitions that guide your reader. Remember, on test day you'll also write a full argumentative essay, so practice building arguments under timed conditions. Let's sharpen those writing skills.",

  2: "Section 2 — Language and Research Skills for Writing. This is where grammar precision and research savvy come together. Grammar, Usage, and Mechanics leads at 20% — subject-verb agreement, pronoun-antecedent agreement, verb tense consistency, and correct use of commas, semicolons, colons, and apostrophes. Sentence Structure and Revision is 15% — identifying and fixing fragments, run-ons, comma splices, dangling modifiers, parallel structure issues, and wordy prose. And Research Skills and Citation at 15% — evaluating source credibility with the CRAAP test, integrating evidence using the quote sandwich method, paraphrasing versus quoting, and avoiding plagiarism. Knowing the rules of standard written English cold will give you a massive edge. Let's get precise."
};
