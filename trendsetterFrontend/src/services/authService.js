import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db, isDemoConfig } from '../config/firebase';

export async function signInWithGoogle() {
  try {
    if (isDemoConfig) {
      // Demo simulated Google Sign-In when Firebase API key is mock
      const mockGoogleUser = {
        uid: 'google-user-' + Math.floor(1000 + Math.random() * 9000),
        displayName: 'Alex Riviera (Google)',
        email: 'alex.riviera.dev@gmail.com',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        operatorLevel: 'S_ADMIN_LV_3',
        provider: 'google.com',
        isDemoMode: true
      };
      localStorage.setItem('trendradar_user', JSON.stringify(mockGoogleUser));
      return { user: mockGoogleUser, error: null };
    }

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Sync Google user profile to Firestore database
    await syncUserToFirestore(user);

    return { user, error: null };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return { user: null, error: error.message };
  }
}

export async function syncUserToFirestore(user) {
  if (isDemoConfig || !user) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        operatorLevel: 'LVL_01_OPERATOR',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    } else {
      await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
    }
  } catch (err) {
    console.warn('Firestore user sync warning:', err);
  }
}

export async function logoutUser() {
  try {
    localStorage.removeItem('trendradar_user');
    if (!isDemoConfig) {
      await signOut(auth);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export function subscribeToAuth(callback) {
  // Check local storage demo user first
  const stored = localStorage.getItem('trendradar_user');
  if (stored) {
    callback(JSON.parse(stored));
  }

  if (!isDemoConfig) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          operatorLevel: 'S_ADMIN_LV_3',
          provider: 'google.com'
        });
      } else if (!stored) {
        callback(null);
      }
    });
  }

  return () => {};
}
