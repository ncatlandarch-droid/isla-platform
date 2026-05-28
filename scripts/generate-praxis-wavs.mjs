/**
 * Praxis Intro WAV Generator
 * ═══════════════════════════════════════════════════════════
 * Generates pre-recorded section intro WAVs for all Praxis modules
 * using Gemini TTS with the Aoede voice (ISLA's voice).
 *
 * Run: node scripts/generate-praxis-wavs.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function loadApiKey() {
  for (const envFile of ['.env.local', '.env']) {
    const path = join(ROOT, envFile);
    if (existsSync(path)) {
      const content = readFileSync(path, 'utf8');
      const lines = content.split('\n').reverse(); // last match wins
      for (const line of lines) {
        const match = line.match(/^VITE_GEMINI_API_KEY=(.+)/);
        if (match?.[1]?.trim()) return match[1].trim();
      }
    }
  }
  throw new Error('No VITE_GEMINI_API_KEY found');
}

const API_KEY = loadApiKey();
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const ISLA_VOICE = 'Aoede';
const OUTPUT_DIR = join(ROOT, 'public', 'audio', 'isla');

// ─── Praxis Section Intro Scripts ───────────────────────────

const PRAXIS_SCRIPTS = {
  // Praxis Reading 5713
  'praxis-reading-intro-1': `Welcome to Key Ideas and Details — the biggest chunk of the Reading exam at 40%. This is where you prove you can dig into a passage and pull out the gold. Main Idea Identification is about 12% — can you tell me what the author's real point is, not just the topic? Drawing Inferences comes in at 10% — this is reading between the lines, connecting dots the author didn't spell out. Supporting Evidence is another 10% — you need to find the specific detail that backs up a claim. And Summarizing Passages is 8% — can you boil it all down without adding your own spin? The key skill here is going BACK to the passage. Every answer lives in the text. Trust the words on the page, not what you think you know. Let's lock this section down.`,

  'praxis-reading-intro-2': `Welcome to Craft, Structure, and Language Skills — this is 30% of your exam, and it's all about HOW authors write, not just WHAT they say. Author's Tone and Attitude is about 8% — you need to pick up on those subtle word choices that reveal whether an author is critical, admiring, sarcastic, or neutral. Word Meaning in Context is another 8% — forget what you think a word means and focus on how it's used RIGHT HERE in THIS sentence. Passage Organization at 7% asks you to identify the blueprint — is it cause-and-effect, compare-contrast, problem-solution, or chronological? And Rhetorical Strategies at 7% — know your ethos, pathos, and logos. Authors are always trying to persuade you, and this section tests whether you can see their playbook. Pay attention to word choice — it reveals everything.`,

  'praxis-reading-intro-3': `Welcome to Integration of Knowledge and Ideas — the final 30% and arguably the most challenging section. This is where you go beyond individual passages and start thinking critically. Synthesizing Information at 8% means combining ideas from two or more passages to see the bigger picture. Evaluating Arguments at 8% means asking: Is this reasoning actually sound, or is there a logical fallacy hiding in there? Comparing Perspectives at 7% — when two authors tackle the same topic differently, you need to identify where they agree, where they clash, and why. And Assessing Evidence at 7% — is the evidence sufficient? Relevant? Or is it just one person's opinion dressed up as fact? This section rewards critical thinking. Don't just accept what you read — question it. That's what strong readers do.`,

  // Praxis Writing 5723
  'praxis-writing-intro-1': `Welcome to Section 1 — Text Types, Purposes, and Production. This is where we master the craft of building strong, purposeful essays. Here's the breakdown: Argumentative Writing makes up about 20% — that's constructing clear claims, supporting them with solid evidence, acknowledging counterarguments, and using rhetorical appeals effectively. Informative and Explanatory Writing is 15% — organizing information with clarity, using definitions, examples, and logical structures like compare-contrast or cause-effect. Thesis Development and Organization rounds out at 15% — crafting specific thesis statements, structuring essays with cohesive introductions and conclusions, and using transitions that guide your reader. Remember, on test day you'll also write a full argumentative essay, so practice building arguments under timed conditions. Let's sharpen those writing skills.`,

  'praxis-writing-intro-2': `Section 2 — Language and Research Skills for Writing. This is where grammar precision and research savvy come together. Grammar, Usage, and Mechanics leads at 20% — subject-verb agreement, pronoun-antecedent agreement, verb tense consistency, and correct use of commas, semicolons, colons, and apostrophes. Sentence Structure and Revision is 15% — identifying and fixing fragments, run-ons, comma splices, dangling modifiers, parallel structure issues, and wordy prose. And Research Skills and Citation at 15% — evaluating source credibility with the CRAAP test, integrating evidence using the quote sandwich method, paraphrasing versus quoting, and avoiding plagiarism. Knowing the rules of standard written English cold will give you a massive edge. Let's get precise.`,

  // Praxis Math 5733
  'praxis-math-intro-1': `Welcome to Number and Quantity — this is the foundation of your Praxis Core Math exam. About one-third of the test lives right here. Let's break it down: Order of Operations and Number Properties are your bread and butter — PEMDAS, exponents, absolute value, and knowing your commutative, associative, and distributive properties inside and out. Fractions, Decimals, and Percentages are heavily tested — you need to convert between them fluently and handle percent change problems confidently. Ratios and Proportions show up everywhere, from unit rates to scale factor problems. And don't sleep on Estimation — the test loves asking if an answer is reasonable. Here's the great news: you have an on-screen calculator for the entire test, so use it! But know your number properties so you don't waste time on things the calculator can't help with. There's no penalty for guessing, so never leave a question blank. Let's build that number sense.`,

  'praxis-math-intro-2': `Data Interpretation, Statistics, and Probability — another third of your exam. This section is all about reading information accurately and thinking critically about data. Reading and Interpreting Data is the biggest piece: bar graphs, pie charts, histograms, scatterplots, and tables. Practice reading them carefully — the test loves to include extra information to trip you up. Measures of Center and Spread will ask about mean, median, mode, and range. Know which measure is best for different situations — especially that the mean is pulled by outliers while the median is resistant. Probability covers simple events, compound events, and the complement rule. Remember: P of not A equals 1 minus P of A. And Statistical Claims and Reasoning is critical — you'll need to spot sampling bias, understand that correlation doesn't equal causation, and evaluate whether conclusions are supported by the data. Use your calculator for the number crunching and save your brainpower for the analysis. You've got this.`,

  'praxis-math-intro-3': `Algebra and Geometry — the final third and the section that brings it all together. Linear Equations and Inequalities are core: solving two-step equations, graphing lines, understanding slope-intercept form y equals mx plus b, and translating word problems into math. Know your inequality symbols — at most means less than or equal to, at least means greater than or equal to. Algebraic Expressions and Patterns will test simplifying, evaluating functions, and identifying sequences. Geometry is big here: area, perimeter, volume, angle relationships, and the Pythagorean theorem — a squared plus b squared equals c squared. Memorize the common Pythagorean triples — 3-4-5 and 5-12-13 will save you time. Coordinate Geometry covers distance, midpoint, and transformations like reflections and translations. The on-screen calculator handles the arithmetic, so focus on setting up problems correctly. Remember: every question counts the same, there's no penalty for guessing, and you've got the tools to crush this. Let's go.`,
};

// ─── WAV Generation ─────────────────────────────────────────

function pcmToWav(pcmData, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  pcmData.copy(buffer, 44);
  return buffer;
}

async function generateWav(key, text) {
  const styledText = `Say in a warm, confident, encouraging female coaching voice with clear pronunciation: "${text}"`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: styledText }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: ISLA_VOICE }
          }
        }
      }
    })
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status}: ${errBody.slice(0, 200)}`);
  }

  const data = await response.json();
  const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audioData) throw new Error('No audio data');

  const pcmBytes = Buffer.from(audioData, 'base64');
  const wavBuffer = pcmToWav(pcmBytes);

  const outputPath = join(OUTPUT_DIR, `${key}.wav`);
  writeFileSync(outputPath, wavBuffer);
  console.log(`  ✅ ${key}.wav (${(wavBuffer.length / 1024).toFixed(1)} KB)`);
  return outputPath;
}

async function main() {
  console.log('🎓 Praxis Intro WAV Generator');
  console.log(`   Voice: ${ISLA_VOICE} (Gemini TTS)`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   Files: ${Object.keys(PRAXIS_SCRIPTS).length}\n`);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  let success = 0, failed = 0;
  for (const [key, text] of Object.entries(PRAXIS_SCRIPTS)) {
    try {
      await generateWav(key, text);
      success++;
      await new Promise(r => setTimeout(r, 2000)); // Rate limiting
    } catch (err) {
      console.error(`  ❌ ${key}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🐾 Done! ${success} generated, ${failed} failed.`);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
