/**
 * ISLA Voice WAV Generator
 * ═══════════════════════════════════════════════════════════════
 * Generates all 17 pre-recorded WAV files for ISLA using
 * Gemini TTS API with the Kore voice (warm, confident female).
 *
 * Run: node scripts/generate-isla-wavs.mjs
 *
 * Requires: VITE_GEMINI_API_KEY in .env or .env.local
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Load API key from .env.local or .env
function loadApiKey() {
  for (const envFile of ['.env.local', '.env']) {
    const path = join(ROOT, envFile);
    if (existsSync(path)) {
      const content = readFileSync(path, 'utf8');
      const match = content.match(/VITE_GEMINI_API_KEY=(.+)/);
      if (match?.[1]?.trim()) return match[1].trim();
    }
  }
  throw new Error('No VITE_GEMINI_API_KEY found in .env.local or .env');
}

const API_KEY = loadApiKey();
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const ISLA_VOICE = 'Kore';  // Warm, confident, versatile female voice
const OUTPUT_DIR = join(ROOT, 'public', 'audio', 'isla');

// ─── Scripted Lines ─────────────────────────────────────────
// These are the exact words ISLA will say in each WAV file.
// SSML pronunciation: ISLA = "EES-lah"

const SCRIPTS = {
  'landing': `¡Hola! I'm ISLA — your Interactive Study and Licensure Assistant. I'm here to help you prepare for your professional exams with confidence. Log in to get started, Aggie!`,

  'welcome': `Welcome back! I'm so glad you're here. Every study session brings you closer to your goal. Let's make this one count. What would you like to work on today?`,

  'intro-1': `Welcome to Section 1 — Inventory, Analysis, and Project Management. This is where every great project begins, Aggie. Physical Analysis is the heavyweight at 39% — that's soils, slopes, viewsheds, microclimates, and overlay analysis. Inventory and Data Collection comes in at 21%, Contextual Analysis is 19%, Stakeholder Engagement is 14%, and Project Management rounds it out at 7%. Master all five and you own this section. Let's get after it!`,

  'intro-2': `Section 2 — Planning and Design. This is the heart of what we do as landscape architects. Master Planning leads at 33%, Schematic Design is 28%, Design Development comes in at 22%, and Stewardship and Design Principles at 17%. Know your ADA slopes, your stair formulas, Kevin Lynch's five elements, and your design principles. I believe in you, Aggie!`,

  'intro-3': `Section 3 — Construction Documentation and Administration. This is where design meets the real world, Aggie. Construction Plans and Details dominate at 50%, Construction Administration is 30%, and Construction Specifications and Bidding at 20%. Remember: we observe, we never supervise. That one word can change your liability. Let's build something!`,

  'intro-4': `Welcome to the challenge — Section 4, Grading, Drainage, and Stormwater Management. Grading and Earthwork leads at 44%, Stormwater Management is 39%, and Drainage Systems at 17%. This section separates the good from the great. Master the math, understand the water, and you've got this, Aggie!`,

  'quiz-great': `Outstanding work! You absolutely crushed that quiz. Your dedication is really showing. Keep this momentum going, Aggie!`,

  'quiz-good': `Nice job! You're building strong knowledge here. Review the ones you missed and try again — I know you can improve even more!`,

  'quiz-try': `Don't worry — every attempt is a learning opportunity. Review the explanations carefully and try again. You've got this, Aggie. I'm right here with you!`,

  'exam-great': `Incredible! That's an exam-ready performance. You should be so proud of how far you've come. You're going to do amazing on test day!`,

  'exam-good': `Solid performance! You're on the right track. Focus your review on the areas you missed and you'll be exam-ready in no time!`,

  'exam-try': `This is just practice — and practice is how we grow. Take a deep breath, review the material, and come back stronger. I believe in you!`,

  'chat-default': `Great question! Every challenge in landscape architecture starts with understanding the site. What specific topic can I help you break down?`,

  'chat-grading': `The slope formula is key: slope percent equals rise divided by run, times 100. For swales, stay between 2% and 10%. Section 4 is 44% grading — master this formula and you'll dominate that section!`,

  'chat-section1': `Section 1 is all about inventory and analysis. Know your McHarg overlay method, understand soil classification, and practice reading topographic maps. Physical Analysis is 39% of this section — it's the big one!`,

  'chat-section4': `Section 4 — the Widowmaker! Remember the Rational Method: Q equals C times i times A. Time of concentration determines your peak flow. Bioretention must drain within 48 hours. Master the math and the water!`,

  'chat-hello': `Hey there, Aggie! I'm ISLA, your study coach. I'm here to help you prepare and succeed. What would you like to study today?`,
};

// ─── WAV Generation ─────────────────────────────────────────

function pcmToWav(pcmData, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);  // PCM
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
  if (!audioData) throw new Error('No audio data in Gemini response');

  const pcmBytes = Buffer.from(audioData, 'base64');
  const wavBuffer = pcmToWav(pcmBytes);

  const outputPath = join(OUTPUT_DIR, `${key}.wav`);
  writeFileSync(outputPath, wavBuffer);
  const sizeKb = (wavBuffer.length / 1024).toFixed(1);
  console.log(`  ✅ ${key}.wav (${sizeKb} KB)`);
  return outputPath;
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log('🏝️  ISLA Voice WAV Generator');
  console.log(`   Voice: ${ISLA_VOICE} (Gemini TTS)`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   Files: ${Object.keys(SCRIPTS).length}\n`);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const keys = Object.keys(SCRIPTS);
  let success = 0;
  let failed = 0;

  for (const key of keys) {
    try {
      await generateWav(key, SCRIPTS[key]);
      success++;
      // Rate limiting — small delay between calls
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(`  ❌ ${key}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🐾 Done! ${success} generated, ${failed} failed.`);
  if (success > 0) {
    console.log(`\n📁 WAV files saved to: public/audio/isla/`);
    console.log(`   Update PerryVoice.js → IslaVoice.js paths from /audio/perry/ to /audio/isla/`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
