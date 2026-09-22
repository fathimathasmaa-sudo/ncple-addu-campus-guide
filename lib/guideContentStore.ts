const FIRESTORE_TIMEOUT_MS = 10000;

function withTimeout<T>(promise: Promise<T>, operation: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => {
        reject(new Error(`Firebase ${operation} timed out after ${FIRESTORE_TIMEOUT_MS / 1000} seconds.`));
      }, FIRESTORE_TIMEOUT_MS);
    }),
  ]);
}

export async function loadGuideContent<T>() {
  const response = await withTimeout(fetch("/api/guide-content", { cache: "no-store" }), "read");
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error ?? `Guide content read failed (${response.status}).`);
  }

  return (payload?.content as T | null) ?? null;
}

export async function saveGuideContent(content: unknown) {
  const response = await withTimeout(
    fetch("/api/guide-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    }),
    "save",
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error ?? `Guide content save failed (${response.status}).`);
  }
}
