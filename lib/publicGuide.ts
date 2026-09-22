import { guide as fallbackGuide } from "@/data/campusGuide";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "adducampusguide";
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/guideContent/main`;

type FirestoreValue =
  | { nullValue: null }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { stringValue: string }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type FirestoreDocument = { fields?: Record<string, FirestoreValue> };

function fromFirestoreValue(value: FirestoreValue): unknown {
  if ("nullValue" in value) return null;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("stringValue" in value) return value.stringValue;
  if ("arrayValue" in value) return (value.arrayValue.values ?? []).map(fromFirestoreValue);
  if ("mapValue" in value) {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value.mapValue.fields ?? {})) result[key] = fromFirestoreValue(item);
    return result;
  }
  return null;
}

export async function getPublicGuide() {
  try {
    const response = await fetch(FIRESTORE_URL, { cache: "no-store" });
    if (!response.ok) return fallbackGuide;
    const payload = (await response.json()) as FirestoreDocument;
    const content = payload.fields?.content;
    if (!content) return fallbackGuide;
    return fromFirestoreValue(content) as typeof fallbackGuide;
  } catch {
    return fallbackGuide;
  }
}
