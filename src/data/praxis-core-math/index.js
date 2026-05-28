/**
 * Praxis Core Math (5733) — Exam Data Module
 * Source: ETS Praxis Core Academic Skills for Educators: Mathematics (5733)
 * 56 selected-response & numeric-entry questions | 90 minutes | On-screen calculator
 * Passing score: 150 (varies by state) | Score range: 100–200
 */

import { Calculator, BarChart3, Triangle } from 'lucide-react';

export const AGGIE_BLUE = "#004684";
export const AGGIE_GOLD = "#FDB927";

// ─── EXAM META ──────────────────────────────────────────────────────────────────
export const EXAM_META = {
  examName: "Praxis Core Academic Skills for Educators: Mathematics",
  testCode: "5733",
  totalQuestions: 56,
  examDuration: 90, // minutes
  questionFormat: "Selected-response (multiple choice) and numeric entry",
  passingScore: 150,
  scoreRange: "100–200",
  passingNote: "Passing score varies by state — check your state's requirements.",
  calculator: "On-screen calculator available for the entire test",
  penalty: "No penalty for guessing — answer every question",
  sections: 3,
  provider: "ETS (Educational Testing Service)"
};

// ─── EXAM SECTIONS ──────────────────────────────────────────────────────────────
export const EXAM_SECTIONS = [
  {
    id: 1,
    title: "Number & Quantity",
    shortTitle: "Number & Qty",
    icon: Calculator,
    color: AGGIE_BLUE,
    totalItems: 19, // ~33% of 56
    examDuration: 90,
    examFormat: "Selected-response (multiple choice) and numeric entry",
    videos: [],
    topics: [
      { name: "Order of Operations & Properties", weight: 10, description: "PEMDAS, commutative, associative, and distributive properties applied to integers, decimals, and fractions" },
      { name: "Fractions, Decimals & Percentages", weight: 8, description: "Converting between fractions, decimals, and percentages; operations with fractions; percent increase/decrease" },
      { name: "Ratios & Proportions", weight: 7, description: "Setting up and solving proportions, unit rates, scale factors, and direct/inverse variation" },
      { name: "Number Properties", weight: 5, description: "Absolute value, scientific notation, factors, multiples, primes, even/odd, and number line concepts" },
      { name: "Estimation & Reasonableness", weight: 3, description: "Rounding, estimating calculations, and evaluating whether answers are reasonable" }
    ]
  },
  {
    id: 2,
    title: "Data Interpretation, Statistics & Probability",
    shortTitle: "Data & Stats",
    icon: BarChart3,
    color: AGGIE_BLUE,
    totalItems: 19, // ~33% of 56
    examDuration: 90,
    examFormat: "Selected-response (multiple choice) and numeric entry",
    videos: [],
    topics: [
      { name: "Reading & Interpreting Data", weight: 10, description: "Bar graphs, line graphs, circle graphs (pie charts), histograms, scatterplots, tables, and two-way frequency tables" },
      { name: "Measures of Center & Spread", weight: 8, description: "Mean, median, mode, range, standard deviation concepts, and effects of outliers on measures" },
      { name: "Probability", weight: 8, description: "Simple probability, compound events, independent/dependent events, expected value, and counting principles" },
      { name: "Statistical Claims & Reasoning", weight: 7, description: "Interpreting survey results, correlation vs. causation, sampling bias, and evaluating statistical arguments" }
    ]
  },
  {
    id: 3,
    title: "Algebra & Geometry",
    shortTitle: "Algebra & Geo",
    icon: Triangle,
    color: AGGIE_BLUE,
    totalItems: 18, // ~34% of 56 (rounds to 18 for remaining)
    examDuration: 90,
    examFormat: "Selected-response (multiple choice) and numeric entry",
    videos: [],
    topics: [
      { name: "Linear Equations & Inequalities", weight: 9, description: "Solving one- and two-step equations, systems of equations, graphing linear functions, slope-intercept form" },
      { name: "Algebraic Expressions & Patterns", weight: 8, description: "Simplifying expressions, evaluating expressions, identifying patterns, and function notation" },
      { name: "Geometry: Shapes, Area & Volume", weight: 9, description: "Properties of triangles, quadrilaterals, circles; area, perimeter, surface area, volume; composite figures" },
      { name: "Coordinate Geometry & Transformations", weight: 8, description: "Pythagorean theorem, distance/midpoint formulas, reflections, rotations, translations, and symmetry" }
    ]
  }
];

// ─── QUESTION BANK ──────────────────────────────────────────────────────────────
export const QUESTION_BANK = {
  1: [
    {
      id: "pm-q1-1",
      topic: "Order of Operations & Properties",
      text: "What is the value of 3 + 4 × 2 − (6 ÷ 3)?",
      options: ["9", "12", "7", "8"],
      correct: 0,
      explanation: "Following PEMDAS: parentheses first: 6 ÷ 3 = 2. Then multiplication: 4 × 2 = 8. Then left to right: 3 + 8 − 2 = 9."
    },
    {
      id: "pm-q1-2",
      topic: "Fractions, Decimals & Percentages",
      text: "A shirt originally priced at $80 is on sale for 25% off. What is the sale price?",
      options: ["$55", "$60", "$65", "$20"],
      correct: 1,
      explanation: "25% of $80 = 0.25 × 80 = $20 discount. Sale price = $80 − $20 = $60."
    },
    {
      id: "pm-q1-3",
      topic: "Ratios & Proportions",
      text: "If 3 pencils cost $1.50, how much do 10 pencils cost at the same rate?",
      options: ["$4.50", "$5.00", "$5.50", "$6.00"],
      correct: 1,
      explanation: "Unit price = $1.50 ÷ 3 = $0.50 per pencil. 10 pencils × $0.50 = $5.00."
    },
    {
      id: "pm-q1-4",
      topic: "Number Properties",
      text: "What is |−7| − |3 − 8|?",
      options: ["12", "2", "−2", "−12"],
      correct: 1,
      explanation: "|−7| = 7. |3 − 8| = |−5| = 5. So 7 − 5 = 2."
    },
    {
      id: "pm-q1-5",
      topic: "Order of Operations & Properties",
      text: "Which property is illustrated by 5(x + 3) = 5x + 15?",
      options: ["Commutative property", "Associative property", "Distributive property", "Identity property"],
      correct: 2,
      explanation: "The distributive property states that a(b + c) = ab + ac. Here, 5 is distributed over (x + 3) to give 5x + 15."
    },
    {
      id: "pm-q1-6",
      topic: "Fractions, Decimals & Percentages",
      text: "What is 3/4 + 2/3?",
      options: ["5/7", "17/12", "5/12", "1"],
      correct: 1,
      explanation: "Find a common denominator: LCD of 4 and 3 is 12. 3/4 = 9/12, 2/3 = 8/12. 9/12 + 8/12 = 17/12 (or 1 5/12)."
    },
    {
      id: "pm-q1-7",
      topic: "Ratios & Proportions",
      text: "A map uses a scale of 1 inch = 25 miles. Two cities are 3.5 inches apart on the map. What is the actual distance?",
      options: ["75 miles", "87.5 miles", "82.5 miles", "100 miles"],
      correct: 1,
      explanation: "Multiply the map distance by the scale factor: 3.5 × 25 = 87.5 miles."
    },
    {
      id: "pm-q1-8",
      topic: "Number Properties",
      text: "Which of the following numbers is written in scientific notation?",
      options: ["45.2 × 10³", "4.52 × 10⁴", "0.452 × 10⁵", "452 × 10²"],
      correct: 1,
      explanation: "In scientific notation, the coefficient must be ≥ 1 and < 10. Only 4.52 × 10⁴ meets this criterion. 45.2, 0.452, and 452 are all outside the [1, 10) range."
    },
    {
      id: "pm-q1-9",
      topic: "Fractions, Decimals & Percentages",
      text: "A population grows from 8,000 to 10,000. What is the percent increase?",
      options: ["20%", "25%", "80%", "2%"],
      correct: 1,
      explanation: "Percent increase = (change ÷ original) × 100 = (2,000 ÷ 8,000) × 100 = 25%."
    },
    {
      id: "pm-q1-10",
      topic: "Order of Operations & Properties",
      text: "Evaluate: (−2)³ + 4²",
      options: ["8", "0", "24", "−24"],
      correct: 0,
      explanation: "(−2)³ = −8, and 4² = 16. So −8 + 16 = 8."
    },
    {
      id: "pm-q1-11",
      topic: "Estimation & Reasonableness",
      text: "A teacher buys 28 notebooks at $3.89 each. Which is the best estimate of the total cost?",
      options: ["$80", "$90", "$120", "$150"],
      correct: 2,
      explanation: "Round: 28 ≈ 30, $3.89 ≈ $4. 30 × $4 = $120. The actual answer is $108.92, so $120 is the closest reasonable estimate."
    },
    {
      id: "pm-q1-12",
      topic: "Ratios & Proportions",
      text: "If a car travels 240 miles on 8 gallons of gas, what is the unit rate in miles per gallon?",
      options: ["28 mpg", "30 mpg", "32 mpg", "35 mpg"],
      correct: 1,
      explanation: "Unit rate = 240 miles ÷ 8 gallons = 30 miles per gallon."
    },
    {
      id: "pm-q1-13",
      topic: "Fractions, Decimals & Percentages",
      text: "Convert 5/8 to a decimal.",
      options: ["0.585", "0.625", "0.658", "0.875"],
      correct: 1,
      explanation: "Divide 5 by 8: 5 ÷ 8 = 0.625. You can also note that 1/8 = 0.125, so 5/8 = 5 × 0.125 = 0.625."
    },
    {
      id: "pm-q1-14",
      topic: "Number Properties",
      text: "What is the greatest common factor (GCF) of 36 and 48?",
      options: ["6", "8", "12", "24"],
      correct: 2,
      explanation: "Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. Factors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48. The greatest common factor is 12."
    },
    {
      id: "pm-q1-15",
      topic: "Order of Operations & Properties",
      text: "Simplify: 12 ÷ 4 + 3 × (5 − 2)²",
      options: ["30", "12", "27", "36"],
      correct: 0,
      explanation: "Parentheses: (5 − 2) = 3. Exponent: 3² = 9. Multiplication: 3 × 9 = 27. Division: 12 ÷ 4 = 3. Addition: 3 + 27 = 30."
    }
  ],

  2: [
    {
      id: "pm-q2-1",
      topic: "Reading & Interpreting Data",
      text: "A bar graph shows that School A has 450 students, School B has 600, and School C has 350. What fraction of the total students attend School B?",
      options: ["6/14", "3/7", "6/13", "12/28"],
      correct: 0,
      explanation: "Total = 450 + 600 + 350 = 1,400. School B's fraction = 600/1,400 = 6/14 = 3/7. Both 6/14 and 3/7 are equivalent, but 6/14 is the unreduced answer shown."
    },
    {
      id: "pm-q2-2",
      topic: "Measures of Center & Spread",
      text: "Find the median of the data set: 12, 7, 3, 14, 9, 3, 8",
      options: ["7", "8", "9", "3"],
      correct: 1,
      explanation: "Arrange in order: 3, 3, 7, 8, 9, 12, 14. The middle value (4th of 7) is 8."
    },
    {
      id: "pm-q2-3",
      topic: "Probability",
      text: "A bag contains 4 red, 3 blue, and 5 green marbles. What is the probability of randomly drawing a blue marble?",
      options: ["3/12", "1/3", "3/5", "1/4"],
      correct: 3,
      explanation: "Total marbles = 4 + 3 + 5 = 12. P(blue) = 3/12 = 1/4. Both 3/12 and 1/4 are equivalent; 1/4 is the simplified form."
    },
    {
      id: "pm-q2-4",
      topic: "Statistical Claims & Reasoning",
      text: "A survey of 50 students at one school finds that 80% prefer pizza for lunch. A news report claims 'Most students nationwide prefer pizza.' This conclusion is flawed PRIMARILY because:",
      options: [
        "The sample size is too small",
        "The sample is not representative of students nationwide",
        "80% is not a majority",
        "The question was biased"
      ],
      correct: 1,
      explanation: "A sample from one school cannot represent students nationwide. The sample is not representative — different schools, regions, and demographics could yield very different preferences."
    },
    {
      id: "pm-q2-5",
      topic: "Measures of Center & Spread",
      text: "The test scores for 5 students are: 70, 80, 85, 90, 100. What is the mean?",
      options: ["80", "85", "82", "87"],
      correct: 1,
      explanation: "Mean = sum ÷ count = (70 + 80 + 85 + 90 + 100) ÷ 5 = 425 ÷ 5 = 85."
    },
    {
      id: "pm-q2-6",
      topic: "Reading & Interpreting Data",
      text: "A circle graph shows that 30% of a school's budget goes to salaries, 25% to facilities, 20% to supplies, and the rest to other expenses. If the total budget is $500,000, how much goes to 'other expenses'?",
      options: ["$100,000", "$125,000", "$150,000", "$175,000"],
      correct: 1,
      explanation: "Other = 100% − 30% − 25% − 20% = 25%. 25% of $500,000 = 0.25 × 500,000 = $125,000."
    },
    {
      id: "pm-q2-7",
      topic: "Probability",
      text: "Two fair coins are flipped. What is the probability that both land on heads?",
      options: ["1/2", "1/3", "1/4", "1/8"],
      correct: 2,
      explanation: "Each coin has P(heads) = 1/2. For independent events, multiply: 1/2 × 1/2 = 1/4. The sample space is {HH, HT, TH, TT} — one outcome out of four."
    },
    {
      id: "pm-q2-8",
      topic: "Statistical Claims & Reasoning",
      text: "A study finds that cities with more ice cream shops also have higher crime rates. Which statement is MOST accurate?",
      options: [
        "Ice cream shops cause crime",
        "Crime causes ice cream shops to open",
        "There is a correlation, but not necessarily causation — a third variable (like population) may explain both",
        "There is no relationship between the two variables"
      ],
      correct: 2,
      explanation: "Correlation does not imply causation. Both variables likely increase with population (a confounding variable). Larger cities have more of everything — ice cream shops and crime alike."
    },
    {
      id: "pm-q2-9",
      topic: "Measures of Center & Spread",
      text: "A data set has values: 10, 10, 10, 10, 50. Which measure of central tendency is MOST affected by the outlier?",
      options: ["Median", "Mode", "Mean", "None — all are equally affected"],
      correct: 2,
      explanation: "The mean is pulled toward outliers. Here, mean = 90 ÷ 5 = 18. Without the outlier, mean = 40 ÷ 4 = 10. The median (10) and mode (10) are not affected."
    },
    {
      id: "pm-q2-10",
      topic: "Reading & Interpreting Data",
      text: "A scatterplot shows a strong negative linear relationship between hours of TV watched per day and GPA. This means:",
      options: [
        "Watching TV causes lower GPAs",
        "Students with higher GPAs watch more TV",
        "As TV hours increase, GPA tends to decrease",
        "There is no predictable pattern between the variables"
      ],
      correct: 2,
      explanation: "A negative linear relationship means as one variable increases, the other tends to decrease. This does NOT prove causation — only a trend in the data."
    },
    {
      id: "pm-q2-11",
      topic: "Probability",
      text: "A standard deck of 52 cards has 4 aces. If you draw one card, what is the probability of NOT drawing an ace?",
      options: ["1/13", "4/52", "48/52", "12/13"],
      correct: 3,
      explanation: "P(not ace) = 1 − P(ace) = 1 − 4/52 = 48/52 = 12/13. The complement rule: P(not A) = 1 − P(A)."
    },
    {
      id: "pm-q2-12",
      topic: "Measures of Center & Spread",
      text: "The range of the data set {15, 22, 8, 31, 17} is:",
      options: ["17", "23", "15", "39"],
      correct: 1,
      explanation: "Range = maximum − minimum = 31 − 8 = 23."
    },
    {
      id: "pm-q2-13",
      topic: "Reading & Interpreting Data",
      text: "A two-way table shows that 40 out of 100 males exercise daily and 55 out of 100 females exercise daily. What percent of all 200 people surveyed exercise daily?",
      options: ["40%", "47.5%", "55%", "95%"],
      correct: 1,
      explanation: "Total who exercise daily = 40 + 55 = 95 out of 200. 95 ÷ 200 = 0.475 = 47.5%."
    },
    {
      id: "pm-q2-14",
      topic: "Probability",
      text: "A spinner has 5 equal sections numbered 1–5. What is the probability of spinning an even number?",
      options: ["1/5", "2/5", "3/5", "1/2"],
      correct: 1,
      explanation: "Even numbers from 1–5 are: 2 and 4. That's 2 favorable outcomes out of 5 total. P(even) = 2/5."
    },
    {
      id: "pm-q2-15",
      topic: "Statistical Claims & Reasoning",
      text: "A researcher wants to determine the average height of 7th graders in a state. Which sampling method would produce the MOST representative results?",
      options: [
        "Measuring all students in one school",
        "Measuring students who volunteer for the study",
        "Randomly selecting students from multiple schools across the state",
        "Measuring the tallest student in each school"
      ],
      correct: 2,
      explanation: "A random sample from multiple schools provides the most representative data. One school or volunteers introduce selection bias. Measuring only the tallest is not representative at all."
    }
  ],

  3: [
    {
      id: "pm-q3-1",
      topic: "Linear Equations & Inequalities",
      text: "Solve for x: 3x − 7 = 14",
      options: ["x = 3", "x = 7", "x = 21", "x = −7"],
      correct: 1,
      explanation: "Add 7 to both sides: 3x = 21. Divide by 3: x = 7."
    },
    {
      id: "pm-q3-2",
      topic: "Geometry: Shapes, Area & Volume",
      text: "What is the area of a triangle with a base of 10 cm and a height of 6 cm?",
      options: ["60 cm²", "30 cm²", "16 cm²", "36 cm²"],
      correct: 1,
      explanation: "Area of a triangle = ½ × base × height = ½ × 10 × 6 = 30 cm²."
    },
    {
      id: "pm-q3-3",
      topic: "Coordinate Geometry & Transformations",
      text: "A right triangle has legs of 6 and 8. What is the length of the hypotenuse?",
      options: ["14", "10", "12", "48"],
      correct: 1,
      explanation: "Pythagorean theorem: a² + b² = c². 6² + 8² = 36 + 64 = 100. √100 = 10."
    },
    {
      id: "pm-q3-4",
      topic: "Algebraic Expressions & Patterns",
      text: "If f(x) = 2x² − 3x + 1, what is f(3)?",
      options: ["10", "28", "19", "4"],
      correct: 0,
      explanation: "f(3) = 2(3)² − 3(3) + 1 = 2(9) − 9 + 1 = 18 − 9 + 1 = 10."
    },
    {
      id: "pm-q3-5",
      topic: "Linear Equations & Inequalities",
      text: "What is the slope of the line passing through points (2, 5) and (6, 13)?",
      options: ["4", "2", "8", "1/2"],
      correct: 1,
      explanation: "Slope = (y₂ − y₁) ÷ (x₂ − x₁) = (13 − 5) ÷ (6 − 2) = 8 ÷ 4 = 2."
    },
    {
      id: "pm-q3-6",
      topic: "Geometry: Shapes, Area & Volume",
      text: "A rectangular box has dimensions 4 cm × 5 cm × 3 cm. What is its volume?",
      options: ["12 cm³", "60 cm³", "24 cm³", "94 cm³"],
      correct: 1,
      explanation: "Volume = length × width × height = 4 × 5 × 3 = 60 cm³."
    },
    {
      id: "pm-q3-7",
      topic: "Coordinate Geometry & Transformations",
      text: "Point A is at (3, 4) and point B is at (7, 4). What is the distance between them?",
      options: ["3", "4", "7", "10"],
      correct: 1,
      explanation: "Since the y-coordinates are the same, this is a horizontal distance: |7 − 3| = 4. (Or use the distance formula: √[(7−3)² + (4−4)²] = √16 = 4.)"
    },
    {
      id: "pm-q3-8",
      topic: "Algebraic Expressions & Patterns",
      text: "A sequence begins: 2, 6, 18, 54, … What is the next term?",
      options: ["72", "108", "162", "216"],
      correct: 2,
      explanation: "Each term is multiplied by 3 (geometric sequence with common ratio 3). 54 × 3 = 162."
    },
    {
      id: "pm-q3-9",
      topic: "Linear Equations & Inequalities",
      text: "Which inequality is represented by 'a number decreased by 4 is at most 12'?",
      options: ["x − 4 > 12", "x − 4 ≥ 12", "x − 4 < 12", "x − 4 ≤ 12"],
      correct: 3,
      explanation: "'Decreased by 4' translates to x − 4. 'At most 12' means ≤ 12. So x − 4 ≤ 12."
    },
    {
      id: "pm-q3-10",
      topic: "Geometry: Shapes, Area & Volume",
      text: "The circumference of a circle is 31.4 cm. What is the approximate diameter? (Use π ≈ 3.14)",
      options: ["5 cm", "10 cm", "15 cm", "20 cm"],
      correct: 1,
      explanation: "Circumference = πd. So d = C ÷ π = 31.4 ÷ 3.14 = 10 cm."
    },
    {
      id: "pm-q3-11",
      topic: "Coordinate Geometry & Transformations",
      text: "If triangle ABC is reflected over the y-axis, point (4, −2) maps to:",
      options: ["(−4, −2)", "(4, 2)", "(−4, 2)", "(2, −4)"],
      correct: 0,
      explanation: "A reflection over the y-axis negates the x-coordinate: (x, y) → (−x, y). So (4, −2) → (−4, −2)."
    },
    {
      id: "pm-q3-12",
      topic: "Linear Equations & Inequalities",
      text: "A line has the equation y = 3x − 5. What is the y-intercept?",
      options: ["3", "−5", "5", "−3"],
      correct: 1,
      explanation: "In slope-intercept form y = mx + b, b is the y-intercept. Here b = −5, so the line crosses the y-axis at (0, −5)."
    },
    {
      id: "pm-q3-13",
      topic: "Geometry: Shapes, Area & Volume",
      text: "Two angles are supplementary. One angle measures 65°. What is the measure of the other angle?",
      options: ["25°", "115°", "295°", "35°"],
      correct: 1,
      explanation: "Supplementary angles add to 180°. 180° − 65° = 115°."
    },
    {
      id: "pm-q3-14",
      topic: "Algebraic Expressions & Patterns",
      text: "Simplify: 4(2x − 3) + 5x",
      options: ["13x − 12", "8x − 12", "13x − 3", "8x − 3"],
      correct: 0,
      explanation: "Distribute: 4(2x) − 4(3) + 5x = 8x − 12 + 5x = 13x − 12."
    },
    {
      id: "pm-q3-15",
      topic: "Geometry: Shapes, Area & Volume",
      text: "A cylinder has a radius of 3 cm and a height of 7 cm. What is the approximate volume? (Use π ≈ 3.14)",
      options: ["65.94 cm³", "131.88 cm³", "197.82 cm³", "263.76 cm³"],
      correct: 2,
      explanation: "Volume of a cylinder = πr²h = 3.14 × 3² × 7 = 3.14 × 9 × 7 = 3.14 × 63 = 197.82 cm³."
    }
  ]
};

// ─── FLASHCARD DATA ─────────────────────────────────────────────────────────────
export const FLASHCARD_DATA = {
  1: [
    { front: "PEMDAS (Order of Operations)", back: "Parentheses → Exponents → Multiplication/Division (left to right) → Addition/Subtraction (left to right). Remember: multiplication and division have EQUAL priority — work left to right." },
    { front: "Distributive Property", back: "a(b + c) = ab + ac. Multiply the outside term by EACH inside term. Example: 5(x + 3) = 5x + 15." },
    { front: "Percent Change Formula", back: "Percent Change = (New − Original) ÷ Original × 100. If the result is positive, it's an increase; if negative, it's a decrease." },
    { front: "Converting Fractions ↔ Decimals", back: "Fraction to decimal: divide numerator by denominator (3/4 = 0.75). Decimal to fraction: use place value (0.6 = 6/10 = 3/5)." },
    { front: "Absolute Value", back: "The distance of a number from zero on the number line. Always non-negative. |−5| = 5, |5| = 5, |0| = 0." },
    { front: "Scientific Notation", back: "A number written as a × 10ⁿ, where 1 ≤ a < 10. Example: 45,200 = 4.52 × 10⁴. Coefficient must be between 1 and 10." },
    { front: "Proportion Setup", back: "Set two equivalent ratios equal: a/b = c/d. Cross multiply to solve: a × d = b × c. Ensure matching units are in matching positions." },
    { front: "Unit Rate", back: "A ratio with a denominator of 1. Example: 240 miles ÷ 8 gallons = 30 miles per gallon. Divide to find the rate per ONE unit." },
    { front: "GCF vs. LCM", back: "GCF (Greatest Common Factor): the largest number that divides into both. LCM (Least Common Multiple): the smallest number both divide into. GCF is for simplifying; LCM is for common denominators." },
    { front: "Prime Numbers to 30", back: "2, 3, 5, 7, 11, 13, 17, 19, 23, 29. Note: 2 is the ONLY even prime. 1 is NOT prime." },
    { front: "Adding/Subtracting Fractions", back: "Must have a common denominator. Find the LCD, convert each fraction, then add/subtract the numerators. Example: 1/4 + 1/3 = 3/12 + 4/12 = 7/12." },
    { front: "Estimation Strategy", back: "Round numbers to convenient values before computing. Use to check if your exact answer is reasonable. Example: 28 × $3.89 ≈ 30 × $4 = $120." }
  ],

  2: [
    { front: "Mean (Average)", back: "Sum of all values ÷ number of values. MOST affected by outliers. Example: {70, 80, 85, 90, 100} → mean = 425 ÷ 5 = 85." },
    { front: "Median", back: "The middle value when data is ordered. If even count, average the two middle values. RESISTANT to outliers — use when data is skewed." },
    { front: "Mode", back: "The most frequently occurring value. A set can have no mode, one mode, or multiple modes (bimodal, multimodal)." },
    { front: "Range", back: "Maximum value − minimum value. Measures the total spread. Simple but sensitive to outliers." },
    { front: "Standard Deviation (Concept)", back: "Measures how spread out data is from the mean. LOW SD = data clustered near mean. HIGH SD = data widely spread. You won't calculate SD — just interpret it." },
    { front: "Simple Probability", back: "P(event) = favorable outcomes ÷ total outcomes. Always between 0 (impossible) and 1 (certain). P(not A) = 1 − P(A)." },
    { front: "Independent Events", back: "Events where one doesn't affect the other. For independent events, multiply probabilities: P(A and B) = P(A) × P(B). Example: two coin flips." },
    { front: "Correlation vs. Causation", back: "Correlation means two variables move together. Causation means one CAUSES the other. Correlation does NOT imply causation — watch for confounding variables!" },
    { front: "Representative Sampling", back: "A good sample is random and representative of the whole population. Bias occurs when certain groups are over- or under-represented." },
    { front: "Reading Circle Graphs", back: "Each sector shows a percentage of the whole. All sectors must add to 100%. To find the actual amount: multiply the percentage by the total." },
    { front: "Scatterplot Trends", back: "Positive trend: both variables increase together. Negative trend: one increases as the other decreases. No trend: no visible pattern. Look at the overall direction." },
    { front: "Two-Way Frequency Tables", back: "Show data for two categorical variables. Read across rows and down columns. Can calculate joint, marginal, and conditional frequencies." }
  ],

  3: [
    { front: "Slope Formula", back: "m = (y₂ − y₁) ÷ (x₂ − x₁). Rise over run. Positive slope = line goes up left to right. Negative slope = line goes down." },
    { front: "Slope-Intercept Form", back: "y = mx + b, where m = slope and b = y-intercept (where the line crosses the y-axis)." },
    { front: "Pythagorean Theorem", back: "a² + b² = c², where c is the hypotenuse (longest side, opposite the right angle). Common triples: 3-4-5, 5-12-13, 8-15-17." },
    { front: "Area of a Triangle", back: "A = ½ × base × height. The height must be PERPENDICULAR to the base." },
    { front: "Area & Circumference of a Circle", back: "Area = πr². Circumference = 2πr = πd. Remember: area uses radius SQUARED; circumference is linear." },
    { front: "Volume of a Rectangular Prism", back: "V = length × width × height. Also written as V = lwh or V = Bh where B = area of the base." },
    { front: "Volume of a Cylinder", back: "V = πr²h. It's the area of the circular base (πr²) times the height." },
    { front: "Supplementary & Complementary Angles", back: "Supplementary = add to 180°. Complementary = add to 90°. Memory trick: 'S' for Straight (180°), 'C' for Corner (90°)." },
    { front: "Reflection Over Axes", back: "Over x-axis: (x, y) → (x, −y). Over y-axis: (x, y) → (−x, y). The coordinate that matches the axis stays the same." },
    { front: "Distance Formula", back: "d = √[(x₂ − x₁)² + (y₂ − y₁)²]. It's derived from the Pythagorean theorem — the distance is the hypotenuse." },
    { front: "Solving Two-Step Equations", back: "Undo operations in reverse order: (1) Add or subtract to isolate the variable term, (2) Multiply or divide to solve. Example: 3x − 7 = 14 → 3x = 21 → x = 7." },
    { front: "Translating Word Problems", back: "'At most' → ≤. 'At least' → ≥. 'More than' → >. 'Less than' → <. 'Is' / 'equals' → =. 'Decreased by' → subtraction." }
  ]
};

// ─── GLOSSARY DATA ──────────────────────────────────────────────────────────────
export const GLOSSARY_DATA = {
  1: [
    { term: "Integer", definition: "Any positive or negative whole number, including zero. Examples: −3, 0, 7, 142. Does NOT include fractions or decimals." },
    { term: "Rational Number", definition: "Any number that can be expressed as a fraction a/b where a and b are integers and b ≠ 0. Includes terminating and repeating decimals." },
    { term: "Irrational Number", definition: "A number that cannot be written as a simple fraction. Its decimal form is non-terminating and non-repeating. Examples: π, √2, √3." },
    { term: "Absolute Value", definition: "The distance of a number from zero on the number line, always non-negative. Written as |x|. Example: |−8| = 8." },
    { term: "Scientific Notation", definition: "A way to express very large or very small numbers as a product of a coefficient (1 ≤ a < 10) and a power of 10. Example: 6,500,000 = 6.5 × 10⁶." },
    { term: "Proportion", definition: "An equation stating that two ratios are equal. Example: 3/4 = 6/8. Solved by cross-multiplication." },
    { term: "Unit Rate", definition: "A rate that compares a quantity to one unit of another quantity. Example: 60 miles per 1 hour = 60 mph." },
    { term: "Greatest Common Factor (GCF)", definition: "The largest positive integer that divides two or more numbers without a remainder. Used to simplify fractions." },
    { term: "Least Common Multiple (LCM)", definition: "The smallest positive integer that is a multiple of two or more numbers. Used to find common denominators." },
    { term: "Percent", definition: "A ratio that compares a number to 100. 'Per cent' literally means 'per hundred.' 45% = 45/100 = 0.45." },
    { term: "Reciprocal", definition: "The reciprocal of a number a/b is b/a. To divide by a fraction, multiply by its reciprocal. The reciprocal of 3 is 1/3." },
    { term: "Prime Number", definition: "A natural number greater than 1 that has exactly two factors: 1 and itself. The number 2 is the only even prime number." }
  ],

  2: [
    { term: "Mean (Arithmetic Average)", definition: "The sum of all data values divided by the number of values. Sensitive to extreme values (outliers)." },
    { term: "Median", definition: "The middle value in an ordered data set. For an even number of values, it is the average of the two middle values. Resistant to outliers." },
    { term: "Mode", definition: "The value(s) that appear most frequently in a data set. A set may have no mode, one mode, or multiple modes." },
    { term: "Range", definition: "The difference between the maximum and minimum values in a data set. A simple measure of spread." },
    { term: "Standard Deviation", definition: "A measure of how spread out data values are from the mean. A small standard deviation means values are clustered near the mean." },
    { term: "Outlier", definition: "A data value that is significantly different from other values in the set. Outliers can strongly affect the mean and range but have little effect on the median." },
    { term: "Probability", definition: "The likelihood of an event occurring, expressed as a number between 0 (impossible) and 1 (certain). P(event) = favorable outcomes ÷ total outcomes." },
    { term: "Independent Events", definition: "Two events are independent if the outcome of one does not affect the outcome of the other. P(A and B) = P(A) × P(B)." },
    { term: "Correlation", definition: "A statistical relationship between two variables. Positive correlation: both increase together. Negative correlation: one increases as the other decreases." },
    { term: "Confounding Variable", definition: "A hidden variable that influences both the independent and dependent variables, creating a false impression of a direct relationship between them." },
    { term: "Sample Bias", definition: "Systematic error in a survey or study caused by a non-representative sample. Volunteers, convenience samples, or single-location surveys often introduce bias." },
    { term: "Scatterplot", definition: "A graph that displays the relationship between two numerical variables as plotted points on a coordinate plane. Used to identify trends and correlations." }
  ],

  3: [
    { term: "Variable", definition: "A letter or symbol used to represent an unknown value in a mathematical expression or equation. Common variables: x, y, n." },
    { term: "Slope", definition: "The measure of steepness of a line: rise over run = (y₂ − y₁) / (x₂ − x₁). Positive slope rises left to right; negative slope falls." },
    { term: "Y-Intercept", definition: "The point where a line crosses the y-axis, represented by 'b' in slope-intercept form (y = mx + b). At this point, x = 0." },
    { term: "Linear Equation", definition: "An equation whose graph is a straight line. Standard form: Ax + By = C. Slope-intercept form: y = mx + b." },
    { term: "Inequality", definition: "A mathematical statement comparing two expressions using <, >, ≤, or ≥. Solved similarly to equations, but the sign flips when multiplying/dividing by a negative." },
    { term: "Pythagorean Theorem", definition: "In a right triangle, a² + b² = c², where c is the hypotenuse. Used to find unknown side lengths and distances." },
    { term: "Perimeter", definition: "The total distance around the outside of a two-dimensional shape. For a rectangle: P = 2l + 2w." },
    { term: "Area", definition: "The measure of the space inside a two-dimensional figure, expressed in square units. Rectangle: A = lw. Triangle: A = ½bh. Circle: A = πr²." },
    { term: "Volume", definition: "The measure of space inside a three-dimensional figure, expressed in cubic units. Rectangular prism: V = lwh. Cylinder: V = πr²h." },
    { term: "Supplementary Angles", definition: "Two angles whose measures add up to 180°. Example: 65° and 115° are supplementary." },
    { term: "Complementary Angles", definition: "Two angles whose measures add up to 90°. Example: 30° and 60° are complementary." },
    { term: "Transformation", definition: "A change in position, size, or orientation of a figure. Types: translation (slide), reflection (flip), rotation (turn), and dilation (resize)." }
  ]
};

// ─── SECTION INTROS (from ISLA) ─────────────────────────────────────────────────
export const SECTION_INTROS = {
  1: "Welcome to Number & Quantity — this is the foundation of your Praxis Core Math exam. About one-third of the test lives right here. Let's break it down: Order of Operations and Number Properties are your bread and butter — PEMDAS, exponents, absolute value, and knowing your commutative, associative, and distributive properties inside and out. Fractions, Decimals, and Percentages are heavily tested — you need to convert between them fluently and handle percent change problems confidently. Ratios and Proportions show up everywhere, from unit rates to scale factor problems. And don't sleep on Estimation — the test loves asking if an answer is 'reasonable.' Here's the great news: you have an on-screen calculator for the entire test, so use it! But know your number properties so you don't waste time on things the calculator can't help with. There's no penalty for guessing, so never leave a question blank. Let's build that number sense.",

  2: "Data Interpretation, Statistics, and Probability — another third of your exam. This section is all about reading information accurately and thinking critically about data. Reading and Interpreting Data is the biggest piece: bar graphs, pie charts, histograms, scatterplots, and tables. Practice reading them carefully — the test loves to include extra information to trip you up. Measures of Center and Spread will ask about mean, median, mode, and range. Know which measure is best for different situations — especially that the mean is pulled by outliers while the median is resistant. Probability covers simple events, compound events, and the complement rule. Remember: P(not A) = 1 − P(A). And Statistical Claims and Reasoning is critical — you'll need to spot sampling bias, understand that correlation doesn't equal causation, and evaluate whether conclusions are supported by the data. Use your calculator for the number crunching and save your brainpower for the analysis. You've got this.",

  3: "Algebra and Geometry — the final third and the section that brings it all together. Linear Equations and Inequalities are core: solving two-step equations, graphing lines, understanding slope-intercept form (y = mx + b), and translating word problems into math. Know your inequality symbols — 'at most' means ≤, 'at least' means ≥. Algebraic Expressions and Patterns will test simplifying, evaluating functions, and identifying sequences. Geometry is big here: area, perimeter, volume, angle relationships, and the Pythagorean theorem (a² + b² = c²). Memorize the common Pythagorean triples — 3-4-5 and 5-12-13 will save you time. Coordinate Geometry covers distance, midpoint, and transformations like reflections and translations. The on-screen calculator handles the arithmetic, so focus on setting up problems correctly. Remember: every question counts the same, there's no penalty for guessing, and you've got the tools to crush this. Let's go."
};
