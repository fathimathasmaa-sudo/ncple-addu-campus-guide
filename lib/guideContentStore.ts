import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "./firebase";

export const guideContentRef = doc(getFirestore(firebaseApp), "guideContent", "main");

export async function loadGuideContent<T>() {
  const snapshot = await getDoc(guideContentRef);
  return snapshot.exists() ? (snapshot.data().content as T) : null;
}

export async function saveGuideContent(content: unknown) {
  await setDoc(guideContentRef, { content, updatedAt: new Date().toISOString() }, { merge: true });
}
