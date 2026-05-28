/**
 * Firebase Configuration for LARE LAB
 * 
 * INSTRUCTIONS: Replace the placeholder values below with your actual
 * Firebase project credentials from the Firebase Console:
 *   1. Go to https://console.firebase.google.com
 *   2. Select your project (or create one)
 *   3. Go to Project Settings > General > Your apps > Web app
 *   4. Copy the firebaseConfig object values here
 *   5. Enable Email/Password auth in Authentication > Sign-in method
 *   6. Create a Firestore database in Cloud Firestore
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

// ─── Firebase Config (via environment variables) ────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// ─── Initialize ─────────────────────────────────────────────
let app, auth, db;
let firebaseReady = false;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  firebaseReady = true;
} catch (e) {
  console.warn('[Firebase] Init failed — running in local-only mode:', e.message);
}

// ─── Auth Functions ─────────────────────────────────────────

/**
 * Sign in with email + password
 */
export async function loginUser(email, password) {
  if (!firebaseReady) throw new Error('Firebase not configured');
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

/**
 * Create a new account
 */
export async function registerUser(email, password, displayName) {
  if (!firebaseReady) throw new Error('Firebase not configured');
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }
  // Initialize user document in Firestore
  await setDoc(doc(db, 'users', cred.user.uid), {
    displayName: displayName || email.split('@')[0],
    email,
    createdAt: serverTimestamp(),
    progress: { streak: 0, mastery: 0, solved: 0, lastStudyDate: '' },
    quizHistory: [],
    sectionProgress: { 1: 0, 2: 0, 3: 0, 4: 0 }
  });
  return cred.user;
}

/**
 * Sign out
 */
export async function logoutUser() {
  if (!firebaseReady) return;
  await signOut(auth);
}

/**
 * Sign in with Google (one-click popup)
 */
export async function signInWithGoogle() {
  if (!firebaseReady) throw new Error('Firebase not configured');
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  // Create/update user doc in Firestore on first Google login
  const userRef = doc(db, 'users', cred.user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      displayName: cred.user.displayName || cred.user.email.split('@')[0],
      email: cred.user.email,
      createdAt: serverTimestamp(),
      progress: { streak: 0, mastery: 0, solved: 0, lastStudyDate: '' },
      quizHistory: [],
      sectionProgress: { 1: 0, 2: 0, 3: 0, 4: 0 }
    });
  }
  return cred.user;
}

/**
 * Listen for auth state changes
 */
export function onAuthChange(callback) {
  if (!firebaseReady) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// ─── Firestore User Data ────────────────────────────────────

/**
 * Get user progress from Firestore
 */
export async function getUserProgress(uid) {
  if (!firebaseReady || !uid) return null;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      return snap.data().progress || { streak: 0, mastery: 0, solved: 0, lastStudyDate: '' };
    }
  } catch (e) {
    console.warn('[Firestore] Failed to load progress:', e.message);
  }
  return null;
}

/**
 * Save user progress to Firestore
 */
export async function saveUserProgress(uid, progress) {
  if (!firebaseReady || !uid) return;
  try {
    await updateDoc(doc(db, 'users', uid), {
      progress,
      lastUpdated: serverTimestamp()
    });
  } catch (e) {
    // Document might not exist yet — create it
    try {
      await setDoc(doc(db, 'users', uid), {
        progress,
        lastUpdated: serverTimestamp()
      }, { merge: true });
    } catch (e2) {
      console.warn('[Firestore] Failed to save progress:', e2.message);
    }
  }
}

/**
 * Record a quiz result
 */
export async function saveQuizResult(uid, result) {
  if (!firebaseReady || !uid) return;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    const data = snap.exists() ? snap.data() : {};
    const history = data.quizHistory || [];
    
    // Keep last 100 results to avoid bloat
    history.push({
      ...result,
      timestamp: new Date().toISOString()
    });
    if (history.length > 100) history.splice(0, history.length - 100);

    await updateDoc(userRef, {
      quizHistory: history,
      lastUpdated: serverTimestamp()
    });
  } catch (e) {
    console.warn('[Firestore] Failed to save quiz result:', e.message);
  }
}

/**
 * Get user profile data
 */
export async function getUserProfile(uid) {
  if (!firebaseReady || !uid) return null;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.warn('[Firestore] Failed to load profile:', e.message);
    return null;
  }
}

// ─── Canvas LMS Integration ────────────────────────────────

/**
 * Save Canvas enrollment data to Firestore user document.
 * Called after successful Canvas OAuth + course mapping.
 *
 * @param {string} uid - Firebase user ID
 * @param {Object} canvasData - { canvasUserId, modules, courses, matchDetails }
 */
export async function saveCanvasEnrollment(uid, canvasData) {
  if (!firebaseReady || !uid) return;
  try {
    await setDoc(doc(db, 'users', uid), {
      canvas: {
        userId: canvasData.canvasUserId || null,
        enrolledModules: canvasData.modules || [],
        matchDetails: canvasData.matchDetails || [],
        courseCount: canvasData.courses?.length || 0,
        lastSync: new Date().toISOString(),
        loginMethod: 'canvas',
      },
      lastUpdated: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    console.warn('[Firestore] Failed to save Canvas enrollment:', e.message);
  }
}

/**
 * Get stored Canvas enrollment data for a user.
 * Returns null if no Canvas data exists.
 *
 * @param {string} uid - Firebase user ID
 * @returns {Object|null} Canvas enrollment data
 */
export async function getCanvasEnrollment(uid) {
  if (!firebaseReady || !uid) return null;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists() && snap.data().canvas) {
      return snap.data().canvas;
    }
  } catch (e) {
    console.warn('[Firestore] Failed to load Canvas enrollment:', e.message);
  }
  return null;
}

/**
 * Create or merge a Firebase user document for a Canvas-authenticated user.
 * Uses the Canvas email to find/create the Firebase user doc.
 *
 * @param {string} uid - Firebase user ID
 * @param {Object} canvasUser - { id, name, email, avatar_url }
 */
export async function linkCanvasToFirebase(uid, canvasUser) {
  if (!firebaseReady || !uid) return;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      // First-time Canvas user — create full document
      await setDoc(userRef, {
        displayName: canvasUser.name || canvasUser.email?.split('@')[0] || 'Aggie Student',
        email: canvasUser.email || '',
        canvasUserId: canvasUser.id,
        avatarUrl: canvasUser.avatar_url || null,
        loginMethod: 'canvas',
        createdAt: serverTimestamp(),
        progress: { streak: 0, mastery: 0, solved: 0, lastStudyDate: '' },
        quizHistory: [],
        sectionProgress: {},
      });
    } else {
      // Existing user — merge Canvas fields
      await updateDoc(userRef, {
        canvasUserId: canvasUser.id,
        avatarUrl: canvasUser.avatar_url || snap.data().avatarUrl || null,
        loginMethod: 'canvas',
        lastUpdated: serverTimestamp(),
      });
    }
  } catch (e) {
    console.warn('[Firestore] Failed to link Canvas to Firebase:', e.message);
  }
}

// ─── Exports ────────────────────────────────────────────────
export { auth, db, firebaseReady };

