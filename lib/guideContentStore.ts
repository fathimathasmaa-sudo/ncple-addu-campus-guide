import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "./firebase";

export const guideContentRef = doc(getFirestore(firebaseApp), "guideContent", "main");

const FIREBASE_TIMEOUT_MS = 10000;

function withTimeout<T>(promise: Promise<T>, operation: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => {
        reject(new Error(`Firebase ${operation} timed out after ${FIREBASE_TIMEOUT_MS / 1000} seconds.`));
      }, FIREBASE_TIMEOUT_MS);
    }),
  ]);
}

export async function loadGuideContent<T>() {
  const snapshot = await withTimeout(getDoc(guideContentRef), "read");
  return snapshot.exists() ? (snapshot.data().content as T) : null;
}

export async function saveGuideContent(content: unknown) {
  await withTimeout(
    setDoc(guideContentRef, { content, updatedAt: new Date().toISOString() }, { merge: true }),
    "save",
  );
}
