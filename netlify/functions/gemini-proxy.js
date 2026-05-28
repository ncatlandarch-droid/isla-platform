/**
 * Gemini API Proxy — Server-Side Key Protection
 * ═══════════════════════════════════════════════════════════════
 * Proxies all Gemini API calls through Netlify Functions so the
 * API key NEVER reaches the browser.
 *
 * Supports both:
 *  - Text generation (chat AI)
 *  - TTS audio generation (ISLA voice)
 *
 * Environment variable: GEMINI_API_KEY (set in Netlify dashboard)
 */

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ error: 'GEMINI_API_KEY not configured in Netlify environment variables.' }),
    };
  }

  try {
    const { model, body: requestBody } = JSON.parse(event.body || '{}');

    if (!model || !requestBody) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing "model" or "body" in request.' }),
      };
    }

    // Proxy to Gemini API with server-side key
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const responseData = await geminiResponse.text();

    return {
      statusCode: geminiResponse.status,
      headers: {
        ...headers,
        'Content-Type': geminiResponse.headers.get('content-type') || 'application/json',
      },
      body: responseData,
    };
  } catch (err) {
    console.error('[gemini-proxy] Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Proxy error', message: err.message }),
    };
  }
}
