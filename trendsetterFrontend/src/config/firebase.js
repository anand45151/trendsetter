import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default Firebase configuration setup
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyTrendRadar2026_x890",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "trendradar-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "trendradar-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "trendradar-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "894028340129",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:894028340129:web:9042a8b71239c"
};

// Initialize Firebase instance safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Helper check to verify if actual keys are present vs fallback demo mode
export const isDemoConfig = !import.meta.env.VITE_FIREBASE_API_KEY;

export default app;
