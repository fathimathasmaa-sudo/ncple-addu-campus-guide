"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Save, RotateCcw } from "lucide-react";
import { guide } from "@/data/campusGuide";
import { loadGuideContent, saveGuideContent } from "@/lib/guideContentStore";

const sections = [
  ["hours", "Opening Hours"],
  ["facilities", "Facilities"],
  ["contacts", "Contacts"],
  ["accommodationChecklist", "Accommodation"],
  ["dining", "Dining"],
  ["poolRules", "Swimming Pool Rules"],
  ["entertainmentRules", "Entertainment Rules"],
  ["dressCode", "Dress Code"],
  ["smoking", "Smoking Areas"],
  ["campusAccess", "Campus Access"],
  ["gates", "Gates"],
  ["safety", "Safety"],
  ["wifi", "Wi-Fi"],
  ["checkout", "Checkout"],
  ["mapLocations", "Map Locations"],
] as const;

type Content = Record<string, unknown>;

function pretty(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export default function AdminPage() {
  const [content, setContent] = useState<Content>(() => JSON.parse(JSON.stringify(guide)));
  const [active, setActive] = useState<string>(sections[0][0]);
  const [status, setStatus] = useState("Loading…");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadGuideContent<Content>()
      .then((saved) => {
        if (saved) setContent(saved);
        setStatus(saved ? "Loaded saved content" : "Using current guide content — save to create the database copy");
      })
      .catch(() => setStatus("Could not connect to Firebase. Check Firestore setup."));
  }, []);

  const activeValue = content[active];
  const activeLabel = useMemo(() => sections.find(([id]) => id === active)?.[1] ?? active, [active]);

  function updateSection(value: string) {
    try {
      const parsed = JSON.parse(value);
      setContent((current) => ({ ...current, [active]: parsed }));
      setStatus("Unsaved changes");
    } catch {
      setStatus("Invalid JSON — fix the text before saving");
    }
  }

  async function save() {
    setSaving(true);
    setStatus("Saving…");
    try {
      await saveGuideContent(content);
      setStatus(`Saved ${new Date().toLocaleTimeString()}`);
    } catch {
      setStatus("Save failed. Check that Firestore is enabled and its rules allow this admin panel.");
    } finally {
      setSaving(false);
    }
  }

  function resetSection() {
    setContent((current) => ({ ...current, [active]: JSON.parse(JSON.stringify((guide as Content)[active])) }));
    setStatus("Section restored from the current code version — save to keep it");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-ncple-500">NCPLE Addu Campus Guide</p>
              <h1 className="mt-2 text-3xl font-bold text-ncple-950">Content Manager</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Edit guide information here and save it to Firebase. The existing public guide is not modified by this page.</p>
            </div>
            <button type="button" onClick={save} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ncple-700 px-5 py-3 text-sm font-bold text-white hover:bg-ncple-800 disabled:opacity-60"><Save size={17} />{saving ? "Saving…" : "Save changes"}</button>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"><span className={`h-2 w-2 rounded-full ${status.startsWith("Could") || status.includes("failed") ? "bg-red-500" : status === "Unsaved changes" ? "bg-amber-500" : "bg-emerald-500"}`} />{status}</div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-3 shadow-soft lg:h-fit lg:sticky lg:top-6">
            <p className="px-3 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-slate-400">Guide sections</p>
            <div className="grid grid-cols-2 gap-1 lg:grid-cols-1">
              {sections.map(([id, label]) => <button key={id} type="button" onClick={() => setActive(id)} className={`rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${active === id ? "bg-ncple-50 text-ncple-700" : "text-slate-600 hover:bg-slate-50"}`}>{label}</button>)}
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft md:p-7">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
              <div><h2 className="text-xl font-bold text-slate-900">{activeLabel}</h2><p className="mt-1 text-xs text-slate-500">Edit the section data below. Keep the JSON structure intact when changing values.</p></div>
              <button type="button" onClick={resetSection} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"><RotateCcw size={14} />Restore</button>
            </div>
            <textarea value={pretty(activeValue)} onChange={(e) => updateSection(e.target.value)} spellCheck={false} className="mt-5 min-h-[520px] w-full rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100 outline-none focus:border-ncple-500 focus:ring-2 focus:ring-ncple-100" />
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><Check size={14} className="text-emerald-600" />Changes are held in this page until you press Save changes.</div>
          </section>
        </div>
      </div>
    </main>
  );
}
