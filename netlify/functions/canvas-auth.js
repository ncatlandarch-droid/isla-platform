/**
 * Canvas LMS OAuth2 Token Exchange
 * ═══════════════════════════════════════════════════════════════
 * Netlify serverless function — exchanges an authorization code
 * for an access token. Keeps CLIENT_SECRET server-side.
 *
 * Ecosystem-ready: works for any Instructure Canvas instance.
 * Set CANVAS_BASE_URL, CANVAS_CLIENT_ID, CANVAS_CLIENT_SECRET
 * in Netlify environment variables.
 *
 * Flow: Frontend gets auth code via popup → sends to this function
 *       → we exchange it for an access token → return to frontend
 */

export async function handler(event) {
  // CORS headers for cross-origin requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { code, redirect_uri } = JSON.parse(event.body || '{}');

    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Authorization code is required' }),
      };
    }

    // Canvas OAuth2 credentials from environment
    const CANVAS_BASE_URL = process.env.CANVAS_BASE_URL || 'https://ncat.instructure.com';
    const CLIENT_ID = process.env.CANVAS_CLIENT_ID;
    const CLIENT_SECRET = process.env.CANVAS_CLIENT_SECRET;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: 'Canvas integration not configured',
          message: 'CANVAS_CLIENT_ID and CANVAS_CLIENT_SECRET must be set in Netlify environment variables.',
        }),
      };
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch(`${CANVAS_BASE_URL}/login/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirect_uri || `${event.headers.origin}/canvas-callback`,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('[canvas-auth] Token exchange failed:', tokenResponse.status, errorText);
      return {
        statusCode: tokenResponse.status,
        headers,
        body: JSON.stringify({
          error: 'Canvas token exchange failed',
          details: tokenResponse.status === 400
            ? 'Invalid or expired authorization code. Please try signing in again.'
            : `Canvas returned status ${tokenResponse.status}`,
        }),
      };
    }

    const tokenData = await tokenResponse.json();

    // Return only what the frontend needs (never expose refresh_token to client)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        access_token: tokenData.access_token,
        token_type: tokenData.token_type || 'Bearer',
        expires_in: tokenData.expires_in,
        user: tokenData.user || null,  // Canvas includes basic user info
      }),
    };
  } catch (err) {
    console.error('[canvas-auth] Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: err.message }),
    };
  }
}
