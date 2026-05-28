/**
 * IslaVoice — Hybrid Static + Gemini TTS for ISLA
 * 
 * Architecture:
 *  - SCRIPTED lines → static pre-recorded WAV files (instant, consistent, zero API calls)
 *  - DYNAMIC chat responses → Gemini TTS API (only place with network delay)
 *  - Never falls back to robotic browser TTS
 *
 * Voice: Aoede (Gemini) — calm, warm, soothing female coaching voice
 * Pronunciation: ISLA = /ˈis.la/ (EES-lah)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const ISLA_VOICE = 'Aoede';

/**
 * Map of scripted text keys → static audio file paths.
 * These WAV files are pre-generated and served from /audio/isla/
 * Falls back to /audio/perry/ if isla files don't exist yet.
 */
const STATIC_AUDIO = {
  'landing':       '/audio/isla/landing.wav',
  'welcome':       '/audio/isla/welcome.wav',
  'intro-1':       '/audio/isla/intro-1.wav',
  'intro-2':       '/audio/isla/intro-2.wav',
  'intro-3':       '/audio/isla/intro-3.wav',
  'intro-4':       '/audio/isla/intro-4.wav',
  'quiz-great':    '/audio/isla/quiz-great.wav',
  'quiz-good':     '/audio/isla/quiz-good.wav',
  'quiz-try':      '/audio/isla/quiz-try.wav',
  'exam-great':    '/audio/isla/exam-great.wav',
  'exam-good':     '/audio/isla/exam-good.wav',
  'exam-try':      '/audio/isla/exam-try.wav',
  'chat-default':  '/audio/isla/chat-default.wav',
  'chat-grading':  '/audio/isla/chat-grading.wav',
  'chat-section1': '/audio/isla/chat-section1.wav',
  'chat-section4': '/audio/isla/chat-section4.wav',
  'chat-hello':    '/audio/isla/chat-hello.wav',
};

// Fallback paths in case isla/ WAVs haven't been generated yet
const FALLBACK_AUDIO = {
  'landing':       '/audio/perry/landing.wav',
  'welcome':       '/audio/perry/welcome.wav',
  'intro-1':       '/audio/perry/intro-1.wav',
  'intro-2':       '/audio/perry/intro-2.wav',
  'intro-3':       '/audio/perry/intro-3.wav',
  'intro-4':       '/audio/perry/intro-4.wav',
  'quiz-great':    '/audio/perry/quiz-great.wav',
  'quiz-good':     '/audio/perry/quiz-good.wav',
  'quiz-try':      '/audio/perry/quiz-try.wav',
  'exam-great':    '/audio/perry/exam-great.wav',
  'exam-good':     '/audio/perry/exam-good.wav',
  'exam-try':      '/audio/perry/exam-try.wav',
  'chat-default':  '/audio/perry/chat-default.wav',
  'chat-grading':  '/audio/perry/chat-grading.wav',
  'chat-section1': '/audio/perry/chat-section1.wav',
  'chat-section4': '/audio/perry/chat-section4.wav',
  'chat-hello':    '/audio/perry/chat-hello.wav',
};

class IslaVoice {
  constructor() {
    this.isSpeaking = false;
    this.isMuted = false;
    this.currentAudio = null;
    this.onSpeakStart = null;
    this.onSpeakEnd = null;
    this._cancelRequested = false;
    this._dynamicCache = new Map();  // text → Blob for dynamic TTS caching

    try {
      this.isMuted = localStorage.getItem('lare-perry-muted') === 'true';
    } catch (e) {}
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) this.stop();
    try { localStorage.setItem('lare-perry-muted', String(this.isMuted)); } catch (e) {}
    return this.isMuted;
  }

  stop() {
    this._cancelRequested = true;
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = '';
      this.currentAudio = null;
    }
    this._setNotSpeaking();
  }

  /**
   * Play a pre-recorded scripted line by key. Instant — no API call.
   * Falls back to old perry/ directory if isla/ WAVs don't exist yet.
   * @param {string} key - One of the STATIC_AUDIO keys (e.g. 'welcome', 'intro-1')
   */
  playStatic(key) {
    if (this.isMuted) return;
    const audioPath = STATIC_AUDIO[key];
    const fallbackPath = FALLBACK_AUDIO[key];
    if (!audioPath) {
      console.warn(`[IslaVoice] No static audio for key: "${key}"`);
      return;
    }

    this.stop();
    this._cancelRequested = false;
    this._callId = (this._callId || 0) + 1;
    const callId = this._callId;

    this._setSpeaking();
    const audio = new Audio(audioPath);
    this.currentAudio = audio;

    audio.onended = () => {
      this.currentAudio = null;
      if (!this._isStale(callId)) this._setNotSpeaking();
    };
    audio.onerror = () => {
      // Try fallback to perry/ directory
      if (fallbackPath && audioPath !== fallbackPath) {
        console.warn(`[IslaVoice] isla/ WAV not found for "${key}", falling back to perry/`);
        const fallback = new Audio(fallbackPath);
        this.currentAudio = fallback;
        fallback.onended = () => {
          this.currentAudio = null;
          if (!this._isStale(callId)) this._setNotSpeaking();
        };
        fallback.onerror = () => {
          this.currentAudio = null;
          this._setNotSpeaking();
        };
        fallback.play().catch(() => {
          this.currentAudio = null;
          this._setNotSpeaking();
        });
      } else {
        this.currentAudio = null;
        this._setNotSpeaking();
      }
    };

    audio.play().catch(e => {
      console.warn(`[IslaVoice] Static play() rejected for "${key}":`, e.message);
      // Try fallback
      if (fallbackPath && audioPath !== fallbackPath) {
        const fallback = new Audio(fallbackPath);
        this.currentAudio = fallback;
        fallback.onended = () => {
          this.currentAudio = null;
          if (!this._isStale(callId)) this._setNotSpeaking();
        };
        fallback.onerror = () => {
          this.currentAudio = null;
          this._setNotSpeaking();
        };
        fallback.play().catch(() => {
          this.currentAudio = null;
          this._setNotSpeaking();
        });
      } else {
        this.currentAudio = null;
        this._setNotSpeaking();
      }
    });
  }

  /**
   * Speak dynamic text via Gemini TTS API. Used ONLY for live chat responses.
   * Caches results so repeated text is instant on replay.
   * @param {string} text - Dynamic text to speak
   */
  speak(text) {
    if (this.isMuted || !text?.trim()) return;
    this.stop();
    this._cancelRequested = false;
    this._callId = (this._callId || 0) + 1;
    this._doSpeak(text, this._callId).catch(() => {});
  }

  /** Preload is now a no-op — all scripted audio is static files */
  preload() {}

  /** Check if this call is still the active one */
  _isStale(callId) {
    return callId !== this._callId || this._cancelRequested;
  }

  async _doSpeak(text, callId) {
    this._setSpeaking();

    // Check dynamic cache first
    const cachedBlob = this._dynamicCache.get(text);
    if (cachedBlob) {
      console.log('[IslaVoice] Playing dynamic from cache');
      try {
        await this._playBlob(cachedBlob, callId);
        if (!this._isStale(callId)) this._setNotSpeaking();
        return;
      } catch (e) {
        console.warn('[IslaVoice] Cache playback failed:', e.message);
      }
    }

    // Gemini TTS API — only for dynamic chat responses
    if (!GEMINI_API_KEY) {
      console.warn('[IslaVoice] No Gemini API key — silent');
      this._setNotSpeaking();
      return;
    }

    try {
      const audioBlob = await this._fetchGeminiAudio(text);
      this._dynamicCache.set(text, audioBlob);

      if (this._isStale(callId)) { this._setNotSpeaking(); return; }

      await this._playBlob(audioBlob, callId);
      if (!this._isStale(callId)) this._setNotSpeaking();
      return;
    } catch (err) {
      console.warn(`[IslaVoice] Gemini TTS error: ${err.message}`);
    }

    // Silent fail — no robotic voice, ever
    if (!this._isStale(callId)) this._setNotSpeaking();
  }

  /**
   * Fetch audio from Gemini TTS API (dynamic chat only)
   */
  async _fetchGeminiAudio(text) {
    if (!GEMINI_API_KEY) throw new Error('No API key');

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const styledText = `Say in a warm, confident, encouraging female coaching voice: "${text}"`;

    const response = await Promise.race([
      fetch(url, {
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
      }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('Gemini TTS timeout (20s)')), 20000))
    ]);

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status}: ${errBody.slice(0, 200)}`);
    }

    const data = await response.json();
    const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioData) throw new Error('No audio data in response');

    // Gemini returns base64 PCM → convert to WAV
    const pcmBytes = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
    const wavBlob = this._pcmToWavBlob(pcmBytes, 24000, 1, 16);

    if (wavBlob.size < 100) throw new Error('Audio too small');
    return wavBlob;
  }

  _pcmToWavBlob(pcmData, sampleRate, numChannels, bitsPerSample) {
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataSize = pcmData.length;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    const writeString = (offset, str) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    new Uint8Array(buffer).set(pcmData, 44);
    return new Blob([buffer], { type: 'audio/wav' });
  }

  _playBlob(blob, callId) {
    const audioUrl = URL.createObjectURL(blob);
    return new Promise((resolve, reject) => {
      if (this._isStale(callId)) { URL.revokeObjectURL(audioUrl); resolve(); return; }

      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = () => {
        this.currentAudio = null;
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };

      audio.play().catch(e => {
        this.currentAudio = null;
        URL.revokeObjectURL(audioUrl);
        reject(e);
      });
    });
  }

  _setSpeaking() {
    if (!this.isSpeaking) {
      this.isSpeaking = true;
      if (this.onSpeakStart) this.onSpeakStart();
    }
  }

  _setNotSpeaking() {
    if (this.isSpeaking) {
      this.isSpeaking = false;
      if (this.onSpeakEnd) this.onSpeakEnd();
    }
  }
}

// Keep the export name as perryVoice for backward compat in imports,
// but the class is now IslaVoice with Kore voice
const perryVoice = new IslaVoice();
export default perryVoice;
