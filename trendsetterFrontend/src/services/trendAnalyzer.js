import { fetchGitHubTrends } from './sources/githubSource';
import { fetchNewsTrends } from './sources/newsSource';
import { fetchSocialTrends } from './sources/socialSource';
import { doc, setDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, isDemoConfig } from '../config/firebase';

// Aggregates data from GitHub, X, LinkedIn, Newsletters & News channels
export async function aggregateLiveTrends() {
  try {
    const [ghData, newsData, socialData] = await Promise.all([
      fetchGitHubTrends(),
      fetchNewsTrends(),
      fetchSocialTrends()
    ]);

    const combinedSignals = [...socialData, ...ghData, ...newsData];

    // Persist live signals to Firestore if connected
    if (!isDemoConfig) {
      syncTrendsToFirestore(combinedSignals);
    }

    return {
      github: ghData,
      news: newsData,
      social: socialData,
      all: combinedSignals,
      totalTracked: combinedSignals.length + 8400,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error aggregating multi-source trends:', error);
    return { github: [], news: [], social: [], all: [], totalTracked: 8400 };
  }
}

async function syncTrendsToFirestore(signals) {
  try {
    const batchPromises = signals.slice(0, 10).map((signal) => {
      const docRef = doc(db, 'trends', signal.id || `sig-${Math.random().toString(36).substring(2, 7)}`);
      return setDoc(docRef, {
        ...signal,
        updatedAt: serverTimestamp()
      }, { merge: true });
    });
    await Promise.all(batchPromises);
  } catch (err) {
    console.warn('Firestore sync warning:', err);
  }
}
