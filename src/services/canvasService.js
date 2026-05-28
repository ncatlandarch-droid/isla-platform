/**
 * Canvas LMS Integration Service
 * ═══════════════════════════════════════════════════════════════
 * Frontend handler for Canvas OAuth2 login and course enrollment
 * fetching. Works with Netlify Functions backend.
 *
 * ECOSYSTEM PATTERN: Reusable across all Think! platforms.
 * Only CANVAS_BASE_URL and CLIENT_ID change per institution.
 *
 * FLOW:
 *   1. User clicks "Sign in with Canvas"
 *   2. OAuth popup opens to Canvas login
 *   3. Canvas redirects back with auth code
 *   4. We send code to Netlify Function for token exchange
 *   5. We use token to fetch courses via Netlify Function
 *   6. courseMapper maps courses → ISLA modules
 *
 * SETUP REQUIRED:
 *   1. Create a Canvas Developer Key (Admin → Developer Keys → + Developer Key)
 *      - Key Name: "ISLA Study Platform"
 *      - Redirect URI: https://thinkisla.app/canvas-callback
 *      - Scopes: url:GET|/api/v1/users/:user_id/courses
 *                url:GET|/api/v1/users/:user_id/profile
 *   2. Set VITE_CANVAS_CLIENT_ID in .env.local
 *   3. Set CANVAS_CLIENT_SECRET in Netlify env vars (never in frontend!)
 */

import { mapCoursesToModules } from '../config/courseMapper.js';

// ─── Configuration ──────────────────────────────────────────
const CANVAS_BASE_URL = import.meta.env.VITE_CANVAS_BASE_URL || 'https://ncat.instructure.com';
const CANVAS_CLIENT_ID = import.meta.env.VITE_CANVAS_CLIENT_ID || '';
const REDIRECT_URI = `${window.location.origin}/canvas-callback`;

// ─── State ──────────────────────────────────────────────────
let _accessToken = null;  // In-memory only, never persisted
let _canvasUser = null;
let _canvasCourses = [];
let _mappedModules = { modules: [], matchDetails: [] };

// ─── Public API ─────────────────────────────────────────────

/**
 * Check if Canvas integration is configured.
 * Returns false if no CLIENT_ID is set (dev/staging without Canvas).
 */
export function isCanvasConfigured() {
  return Boolean(CANVAS_CLIENT_ID);
}

/**
 * Initiate Canvas OAuth2 login via popup window.
 * Returns a Promise that resolves with { user, courses, modules }
 * or rejects on error/cancel.
 */
export function startCanvasLogin() {
  return new Promise((resolve, reject) => {
    if (!CANVAS_CLIENT_ID) {
      reject(new Error('Canvas integration not configured. Set VITE_CANVAS_CLIENT_ID in your environment.'));
      return;
    }

    // Build OAuth2 authorization URL
    const authUrl = new URL(`${CANVAS_BASE_URL}/login/oauth2/auth`);
    authUrl.searchParams.set('client_id', CANVAS_CLIENT_ID);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.set('scope', '');  // Default scopes from Developer Key
    authUrl.searchParams.set('state', crypto.randomUUID());  // CSRF protection

    // Open popup
    const width = 500;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      authUrl.toString(),
      'canvas-oauth',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );

    if (!popup) {
      reject(new Error('Popup blocked. Please allow popups for this site.'));
      return;
    }

    // Listen for the callback message from the popup
    const messageHandler = async (event) => {
      if (event.origin !== window.location.origin) return;
      if (!event.data || event.data.type !== 'canvas-oauth-callback') return;

      window.removeEventListener('message', messageHandler);
      clearInterval(pollTimer);

      if (event.data.error) {
        reject(new Error(event.data.error_description || event.data.error));
        return;
      }

      try {
        const code = event.data.code;

        // Step 1: Exchange code for token via Netlify Function
        const tokenResult = await exchangeCodeForToken(code);
        _accessToken = tokenResult.access_token;
        _canvasUser = tokenResult.user;

        // Step 2: Fetch courses via Netlify Function
        const courseResult = await fetchCourses(_accessToken);
        _canvasCourses = courseResult.courses;
        if (courseResult.user) _canvasUser = courseResult.user;

        // Step 3: Map courses to ISLA modules
        _mappedModules = mapCoursesToModules(_canvasCourses);

        resolve({
          user: _canvasUser,
          courses: _canvasCourses,
          modules: _mappedModules.modules,
          matchDetails: _mappedModules.matchDetails,
        });
      } catch (err) {
        reject(err);
      }
    };

    window.addEventListener('message', messageHandler);

    // Poll to detect if popup was closed without completing
    const pollTimer = setInterval(() => {
      if (popup.closed) {
        clearInterval(pollTimer);
        window.removeEventListener('message', messageHandler);
        reject(new Error('Sign-in window was closed.'));
      }
    }, 500);
  });
}

/**
 * Get the current Canvas session state (without triggering login).
 */
export function getCanvasState() {
  return {
    isAuthenticated: Boolean(_accessToken),
    user: _canvasUser,
    courses: _canvasCourses,
    modules: _mappedModules.modules,
    matchDetails: _mappedModules.matchDetails,
  };
}

/**
 * Clear Canvas session (on logout).
 */
export function clearCanvasSession() {
  _accessToken = null;
  _canvasUser = null;
  _canvasCourses = [];
  _mappedModules = { modules: [], matchDetails: [] };
}


// ─── Internal Helpers ───────────────────────────────────────

async function exchangeCodeForToken(code) {
  const response = await fetch('/.netlify/functions/canvas-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirect_uri: REDIRECT_URI }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Token exchange failed (${response.status})`);
  }

  return response.json();
}

async function fetchCourses(accessToken) {
  const response = await fetch('/.netlify/functions/canvas-courses', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Course fetch failed (${response.status})`);
  }

  return response.json();
}


// ─── Default Export ─────────────────────────────────────────
export default {
  isCanvasConfigured,
  startCanvasLogin,
  getCanvasState,
  clearCanvasSession,
};
