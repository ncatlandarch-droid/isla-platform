/**
 * IslaVoice — Hybrid Static + Gemini TTS for ISLA
 * 
 * Architecture:
 *  - SCRIPTED lines → static pre-recorded WAV files (instant, zero API calls)
 *  - DYNAMIC chat responses → Gemini TTS API via server-side proxy
 *  - Never falls back to robotic browser TTS
 *
 * Voice: Aoede (Gemini) — calm, warm, soothing female coaching voice
 * Pronunciation: ISLA = /ˈis.la/ (EES-lah)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_PROXY = '/.netlify/functions/gemini-proxy';
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const ISLA_VOICE = 'Aoede';

/**
 * Map of scripted text keys → static audio file paths.
 * Pre-recorded with Aoede voice (calm, warm, soothing female)
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

class IslaVoice {
  constructor() {
    this.isSpeaking = false;
    this.isMuted = false;
    this.currentAudio = null;
    this.onSpeakStart = null;
    this.onSpeakEnd = null;
    this._cancelRequested = false;
    this._dynamicCache = new Map();

    try {
      const oldVal = localStorage.getItem('lare-perry-muted');
      if (oldVal !== null) {
        localStorage.setItem('isla-voice-muted', oldVal);
        localStorage.removeItem('lare-perry-muted');
      }
      this.isMuted = localStorage.getItem('isla-voice-muted') === 'true';
    } catch (e) {}
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) this.stop();
    try { localStorage.setItem('isla-voice-muted', String(this.isMuted)); } catch (e) {}
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
   */
  playStatic(key) {
    if (this.isMuted) return;
    const audioPath = STATIC_AUDIO[key];
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
      console.warn(`[IslaVoice] Playback error for "${key}"`);
      this.currentAudio = null;
      this._setNotSpeaking();
    };

    audio.play().catch(e => {
      console.warn(`[IslaVoice] play() rejected for "${key}":`, e.message);
      this.currentAudio = null;
      this._setNotSpeaking();
    });
  }

  /**
   * Speak dynamic text via Gemini TTS API through server-side proxy.
   * Used ONLY for live chat responses. Caches results.
   */
  speak(text) {
    if (this.isMuted || !text?.trim()) return;
    this.stop();
    this._cancelRequested = false;
    this._callId = (this._callId || 0) + 1;
    this._doSpeak(text, this._callId).catch(() => {});
  }

  preload() {}

  _isStale(callId) {
    return callId !== this._callId || this._cancelRequested;
  }

  async _doSpeak(text, callId) {
    this._setSpeaking();

    const cachedBlob = this._dynamicCache.get(text);
    if (cachedBlob) {
      try {
        await this._playBlob(cachedBlob, callId);
        if (!this._isStale(callId)) this._setNotSpeaking();
        return;
      } catch (e) {}
    }

    try {
      const audioBlob = await this._fetchGeminiAudio(text);
      this._dynamicCache.set(text, audioBlob);
      if (this._isStale(callId)) { this._setNotSpeaking(); return; }
      await this._playBlob(audioBlob, callId);
      if (!this._isStale(callId)) this._setNotSpeaking();
      return;
    } catch (err) {
      console.warn(`[IslaVoice] TTS error: ${err.message}`);
    }

    if (!this._isStale(callId)) this._setNotSpeaking();
  }

  async _fetchGeminiAudio(text) {
    const styledText = `Say in a calm, warm, soothing female coaching voice: "${text}"`;

    const requestBody = {
      contents: [{ parts: [{ text: styledText }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: ISLA_VOICE }
          }
        }
      }
    };

    let response;
    try {
      response = await Promise.race([
        fetch(GEMINI_PROXY, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: TTS_MODEL, body: requestBody })
        }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('Proxy timeout')), 20000))
      ]);
    } catch (proxyErr) {
      if (!GEMINI_API_KEY) throw new Error('No proxy and no API key');
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
    }

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status}: ${errBody.slice(0, 200)}`);
    }

    const data = await response.json();
    const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioData) throw new Error('No audio data in response');

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
    const w = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); view.setUint32(4, 36 + dataSize, true);
    w(8, 'WAVE'); w(12, 'fmt ');
    view.setUint32(16, 16, true); view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true); view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true); view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true); w(36, 'data');
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
      audio.onended = () => { this.currentAudio = null; URL.revokeObjectURL(audioUrl); resolve(); };
      audio.onerror = () => { this.currentAudio = null; URL.revokeObjectURL(audioUrl); reject(new Error('Playback failed')); };
      audio.play().catch(e => { this.currentAudio = null; URL.revokeObjectURL(audioUrl); reject(e); });
    });
  }

  _setSpeaking() {
    if (!this.isSpeaking) { this.isSpeaking = true; if (this.onSpeakStart) this.onSpeakStart(); }
  }

  _setNotSpeaking() {
    if (this.isSpeaking) { this.isSpeaking = false; if (this.onSpeakEnd) this.onSpeakEnd(); }
  }
}

const islaVoice = new IslaVoice();
export default islaVoice;
