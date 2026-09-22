import { NextResponse } from "next/server";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "adducampusguide";
const DOCUMENT_PATH = "guideContent/main";
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${DOCUMENT_PATH}`;
const TIMEOUT_MS = 8000;

type FirestoreValue =
  | { nullValue: null }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { stringValue: string }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type FirestoreDocument = {
  fields?: Record<string, FirestoreValue>;
};

function toFirestoreValue(value: unknown): FirestoreValue {
  if (value === null) return { nullValue: null };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestoreValue) } };
  }
  if (typeof value === "object") {
    const fields: Record<string, FirestoreValue> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      fields[key] = toFirestoreValue(item);
    }
    return { mapValue: { fields } };
  }
  throw new Error(`Unsupported content value: ${typeof value}`);
}

function fromFirestoreValue(value: FirestoreValue): unknown {
  if ("nullValue" in value) return null;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("stringValue" in value) return value.stringValue;
  if ("arrayValue" in value) return (value.arrayValue.values ?? []).map(fromFirestoreValue);
  if ("mapValue" in value) {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value.mapValue.fields ?? {})) {
      result[key] = fromFirestoreValue(item);
    }
    return result;
  }
  return null;
}

async function firestoreRequest(init?: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(FIRESTORE_URL, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...(init?.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  try {
    const response = await firestoreRequest();
    const payload = (await response.json().catch(() => null)) as FirestoreDocument & { error?: { message?: string } } | null;

    if (response.status === 404) {
      return NextResponse.json({ content: null });
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error?.message || `Firestore returned HTTP ${response.status}.` },
        { status: response.status },
      );
    }

    const contentField = payload?.fields?.content;
    return NextResponse.json({ content: contentField ? fromFirestoreValue(contentField) : null });
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError"
      ? "Firestore request timed out."
      : error instanceof Error
        ? error.message
        : "Could not connect to Firestore.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { content?: unknown };

    if (!("content" in body)) {
      return NextResponse.json({ error: "Missing content in request." }, { status: 400 });
    }

    const document: FirestoreDocument = {
      fields: {
        content: toFirestoreValue(body.content),
        updatedAt: { stringValue: new Date().toISOString() },
      },
    };

    const response = await firestoreRequest({
      method: "PATCH",
      body: JSON.stringify(document),
    });
    const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;

    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error?.message || `Firestore returned HTTP ${response.status}.` },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError"
      ? "Firestore request timed out."
      : error instanceof Error
        ? error.message
        : "Could not save to Firestore.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
