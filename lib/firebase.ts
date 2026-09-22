import { getApps, initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredConfig: Array<[string, string | undefined]> = [
  ["NEXT_PUBLIC_FIREBASE_API_KEY", firebaseConfig.apiKey],
  ["NEXT_PUBLIC_FIREBASE_PROJECT_ID", firebaseConfig.projectId],
  ["NEXT_PUBLIC_FIREBASE_APP_ID", firebaseConfig.appId],
];

const missingConfig = requiredConfig
  .filter(([, value]) => !value?.trim())
  .map(([name]) => name);

if (missingConfig.length) {
  throw new Error(`Firebase configuration is missing: ${missingConfig.join(", ")}. Add these values to the Vercel environment variables and redeploy.`);
}

export const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

// Auto-detect networks where Firestore's preferred WebChannel transport is blocked.
// This only changes the Firebase client transport; it does not alter the public guide UI.
export const firestoreDb = getApps().length === 1 && getApps()[0] === firebaseApp
  ? (() => {
      try {
        return initializeFirestore(firebaseApp, { experimentalAutoDetectLongPolling: true });
      } catch {
        return getFirestore(firebaseApp);
      }
    })()
  : getFirestore(firebaseApp);
