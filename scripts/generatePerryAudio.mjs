/**
 * Pre-generate Perry's scripted audio files using Gemini TTS
 * Run: node scripts/generatePerryAudio.mjs
 * 
 * Voice: Charon — consistent deep masculine voice across ALL lines
 * Outputs WAV files to public/audio/perry/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio', 'perry');
const API_KEY = 'AIzaSyACKUvV4R7Vu_Zl3truT3hmjC99W7JZiig';
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const VOICE = 'Charon';  // Deep, consistent masculine voice

// All scripted lines Coach Perry says
const LINES = {
  // Landing page welcome (before login)
  'landing': `Welcome to the LARE LAAB — the most advanced LARE exam prep platform built by Aggies, for Aggies. I'm Coach Perry, and I'm here to get you licensed. Sign in to begin your journey.`,

  // Post-login welcome
  'welcome': `Welcome to the LARE LAAB. I'm Coach Perry, your licensure mentor. Pick a module to get started, or ask me anything right here in the chat. Let's get after it, Aggie.`,

  // Section intros
  'intro-1': `Welcome to Section 1 — Inventory, Analysis, and Project Management. This is where every great project begins, Aggie. Physical Analysis is the heavyweight at 39 percent — that's soils, slopes, viewsheds, microclimates, and McHarg overlay analysis. Inventory and Data Collection comes in at 21 percent. Contextual Analysis is 19 percent. Stakeholder Engagement is 14 percent. And Project Management rounds it out at 7 percent. Master all five and you own this section. Let's get after it.`,

  'intro-2': `Section 2 — Planning and Design. This is the heart of what we do as landscape architects, Aggie. Master Planning leads at 33 percent. Schematic Design is 28 percent. Design Development comes in at 22 percent. And Stewardship and Design Principles at 17 percent. Know your ADA slopes, your stair formulas, Kevin Lynch's five elements, and your design principles. Coach Perry believes in you.`,

  'intro-3': `Section 3 — Construction Documentation and Administration. This is where design meets the real world, Aggie. Construction Plans and Details dominate at 50 percent. Construction Administration is 30 percent. And Construction Specifications and Bidding at 20 percent. Remember: we observe, we never supervise. That one word can change your liability. Let's build something.`,

  'intro-4': `Welcome to the Widowmaker — Section 4, Grading, Drainage, and Stormwater Management. Grading and Earthwork leads at 44 percent. Stormwater Management is 39 percent. And Drainage Systems at 17 percent. This section separates the good from the great. Master the math, understand the water, and you've got this, Aggie.`,

  // Quiz results
  'quiz-great': `Exceptional work, Aggie! That's well above passing. Keep this momentum going!`,
  'quiz-good': `Good effort! That's solid progress. Focus on your weak topics to push even higher.`,
  'quiz-try': `Every question you answer makes you stronger. Review the topics below and try Focus Mode for targeted practice.`,

  // Exam results
  'exam-great': `Outstanding exam performance, Aggie! That's well above passing.`,
  'exam-good': `Good work! That's a passing score. Keep refining your weak areas.`,
  'exam-try': `Don't give up, Aggie. Review the topics you missed and try again. Every attempt makes you stronger.`,

  // Fallback chat replies
  'chat-default': `Great question! Every challenge in landscape architecture starts with understanding the site. What specific topic can I help you break down?`,
  'chat-grading': `Slope percent equals rise divided by run, times one hundred. For swales, stay between 2 and 10 percent. Section 4 is 44 percent grading — master this formula and you'll dominate that section.`,
  'chat-section1': `Section 1 is 39 percent Physical Analysis. Focus on soil classification, hydrology, and ASTM Phase 1 ESA. Know your USGS symbols!`,
  'chat-section4': `Section 4 is the Widowmaker — 44 percent Grading, 39 percent Stormwater. Master the Rational Method: Q equals C times i times A.`,
  'chat-hello': `Good to see you, Aggie! Let's get after it. What section are you studying today?`,
};

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

async function generateAudio(key, text) {
  const outFile = path.join(OUTPUT_DIR, `${key}.wav`);
  if (fs.existsSync(outFile)) {
    console.log(`  ✅ ${key}.wav already exists — skipping`);
    return;
  }

  const styledText = `Say in a warm, confident, encouraging coaching voice: "${text}"`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${API_KEY}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: styledText }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: VOICE }
          }
        }
      }
    })
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error(`  ❌ ${key}: HTTP ${resp.status} — ${err.slice(0, 200)}`);
    return;
  }

  const data = await resp.json();
  const audioB64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audioB64) {
    console.error(`  ❌ ${key}: No audio data in response`);
    return;
  }

  const pcm = Buffer.from(audioB64, 'base64');
  const wav = pcmToWav(pcm);
  fs.writeFileSync(outFile, wav);
  console.log(`  ✅ ${key}.wav — ${(wav.length / 1024).toFixed(1)} KB`);
}

async function main() {
  console.log(`\n🎙️ Generating Coach Perry audio files...`);
  console.log(`   Model: ${TTS_MODEL}`);
  console.log(`   Voice: ${VOICE}`);
  console.log(`   Output: ${OUTPUT_DIR}\n`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const entries = Object.entries(LINES);
  for (let i = 0; i < entries.length; i++) {
    const [key, text] = entries[i];
    console.log(`[${i + 1}/${entries.length}] ${key}...`);
    await generateAudio(key, text);
    // Slight delay to avoid rate limiting
    if (i < entries.length - 1) await new Promise(r => setTimeout(r, 1500));
  }

  console.log(`\n✅ Done! ${entries.length} audio files generated with ${VOICE} voice.\n`);
}

main();
