"use client";

import { useMemo, useRef, useState } from "react";
import { MapPin, Search, X } from "lucide-react";

const locations = [
  [1, "Flag Square"], [2, "Central Administration Building"], [3, "Staff Parking Area"], [4, "Gymnasium"],
  [5, "Stadium & Running Track"], [6, "Noosandha Clinic"], [7, "Shooting Range"], [8, "Drill Shed"],
  [9, "Auditorium"], [10, "Agility Ground"], [11, "Volleyball Ground"], [12, "Futsal Field"],
  [13, "Rappelling Tower & Rock Climbing Wall"], [14, "Mosque"], [15, "Police Shop"], [16, "Edhuru Villa 4"],
  [17, "Edhuru Villa 3"], [18, "Edhuru Villa 2"], [19, "Edhuru Villa 1"], [20, "Swimming Pool"],
  [21, "Edhuri Hiya 1"], [22, "Edhuru Hiya 2"], [23, "Dharivarunge Hiya 1"], [24, "Dharivarunge Hiya 2"],
  [25, "Guest House"], [26, "Garden Area"],
] as const;

const gates = [["A", "Gate 1"], ["B", "Gate 2"], ["C", "Gate 3"]] as const;
type Location = (typeof locations)[number];
type Gate = (typeof gates)[number];
type SelectedItem = { kind: "location"; item: Location } | { kind: "gate"; item: Gate };
type LocationInfo = { category: string; description: string; href?: string };

const hotspotPositions: Record<number, { left: string; top: string }> = {
  1: { left: "45.62%", top: "47.71%" }, 2: { left: "39.34%", top: "48.12%" }, 3: { left: "40.80%", top: "43.90%" },
  4: { left: "27.66%", top: "54.98%" }, 5: { left: "27.88%", top: "39.85%" }, 6: { left: "18.14%", top: "50.75%" },
  7: { left: "14.00%", top: "40.43%" }, 8: { left: "9.53%", top: "51.45%" }, 9: { left: "50.44%", top: "47.73%" },
  10: { left: "55.03%", top: "43.89%" }, 11: { left: "55.03%", top: "49.15%" }, 12: { left: "55.06%", top: "53.75%" },
  13: { left: "57.20%", top: "54.72%" }, 14: { left: "60.30%", top: "52.86%" }, 15: { left: "66.31%", top: "55.18%" },
  16: { left: "70.02%", top: "54.72%" }, 17: { left: "72.08%", top: "56.46%" }, 18: { left: "74.05%", top: "57.59%" },
  19: { left: "76.21%", top: "56.77%" }, 20: { left: "79.39%", top: "53.77%" }, 21: { left: "82.98%", top: "64.73%" },
  22: { left: "83.52%", top: "49.23%" }, 23: { left: "89.13%", top: "68.86%" }, 24: { left: "91.80%", top: "48.95%" },
  25: { left: "87.57%", top: "47.77%" }, 26: { left: "88.32%", top: "58.27%" },
};
const gatePositions: Record<string, { left: string; top: string }> = { A: { left: "45.83%", top: "61.47%" }, B: { left: "93.07%", top: "77.94%" }, C: { left: "17.17%", top: "62.35%" } };

function locationInfo(location: Location): LocationInfo {
  const [number, name] = location;
  const details: Record<number, LocationInfo> = {
    2: { category: "Administration", description: "Reception & waiting area, Executive Director's Office, administration and centre offices, classrooms and syndicate rooms, computer lab and library, cafeteria and multipurpose hall, and conference room." },
    6: { category: "Health", description: "Campus clinic." },
    14: { category: "Worship", description: "Campus mosque." },
    15: { category: "Services", description: "Police Shop." },
    20: { category: "Recreation", description: "Swimming pool." },
    21: { category: "Accommodation", description: "Edhuri Hiya 1 — Staff Messroom and Hut Area. This is also the designated smoking-area location referenced by the campus guide.", href: "/smoking" },
    25: { category: "Accommodation", description: "Campus guest house.", href: "/accommodation" },
    26: { category: "Outdoor", description: "Campus garden area." },
  };
  return details[number] ?? { category: "Campus location", description: name };
}
function gateInfo(gate: Gate): LocationInfo { return { category: "Campus access", description: `${gate[1]} — campus access point.` }; }

export function InteractiveCampusMap() {
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [query, setQuery] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => locations.filter(([, name]) => name.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  const info: LocationInfo | null = selected ? selected.kind === "location" ? locationInfo(selected.item) : gateInfo(selected.item) : null;

  function focusMapSelection(kind: "location" | "gate", key: number | string) {
    window.setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => document.getElementById(`map-hotspot-${kind}-${key}`)?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), 250);
    }, 0);
  }
  function selectLocation(location: Location) { setSelected({ kind: "location", item: location }); setQuery(""); focusMapSelection("location", location[0]); }
  function selectGate(gate: Gate) { setSelected({ kind: "gate", item: gate }); setQuery(""); focusMapSelection("gate", gate[0]); }

  const selectedPanel = <div id="selected-location" className="h-fit rounded-3xl border border-ncple-100 bg-ncple-50 p-5 shadow-soft md:p-6 lg:sticky lg:top-24">
    {selected && info ? <>
      <div className="flex items-start justify-between gap-3"><div><span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-ncple-700"><MapPin size={14} /> {selected.kind === "location" ? String(selected.item[0]).padStart(2, "0") : selected.item[0]}</span><h2 className="mt-4 text-2xl font-bold text-ncple-950">{selected.item[1]}</h2><p className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-ncple-500">{info.category}</p></div><button type="button" onClick={() => setSelected(null)} aria-label="Close location details" className="rounded-xl bg-white p-2 text-slate-400 hover:text-slate-700"><X size={18} /></button></div>
      <p className="mt-5 text-sm leading-6 text-slate-600">{info.description}</p>
      {info.href && <a href={info.href} className="mt-5 inline-flex rounded-xl bg-ncple-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-ncple-800">View related guide</a>}
    </> : <div className="py-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ncple-700"><MapPin size={23} /></div><h2 className="mt-4 text-xl font-bold text-ncple-950">Select a location</h2><p className="mt-2 text-sm leading-6 text-slate-600">Choose a numbered location or gate on the map or from the list to view details here.</p></div>}
  </div>;

  return <div className="mt-6 space-y-5">
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-bold text-slate-900">Find a campus location</p><p className="mt-1 text-xs text-slate-500">Tap a numbered location or gate on the map, or search below.</p></div><label className="relative block w-full md:max-w-sm"><Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search locations…" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-ncple-500 focus:bg-white focus:ring-2 focus:ring-ncple-100" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"><X size={17} /></button>}</label></div>
      {query && filtered.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{filtered.slice(0, 8).map((location) => <button key={location[0]} type="button" onClick={() => selectLocation(location)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-ncple-500 hover:text-ncple-700">{String(location[0]).padStart(2, "0")} · {location[1]}</button>)}</div>}
      {query && filtered.length === 0 && <p className="mt-3 text-sm text-slate-500">No campus locations match “{query}”.</p>}
    </div>

    <div ref={mapRef} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"><div className="overflow-auto bg-slate-100 p-2 md:p-4"><div className="relative mx-auto min-w-[720px] w-full max-w-[1400px]" style={{ aspectRatio: "3405.26 / 1100" }}><div className="absolute inset-0 overflow-hidden rounded-2xl"><img src="/Campus Map.svg" alt="Official NCPLE Addu Campus map showing numbered campus locations and gates" className="block h-auto w-full select-none" draggable={false} /></div>{locations.map((location) => { const [number, name] = location; const position = hotspotPositions[number]; const isSelected = selected?.kind === "location" && selected.item[0] === number; return <button id={`map-hotspot-location-${number}`} key={number} type="button" onClick={() => selectLocation(location)} aria-label={`${String(number).padStart(2, "0")} — ${name}`} title={name} className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-ncple-300" style={position}><span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[9px] font-extrabold shadow-sm transition md:h-6 md:w-6 md:text-[10px] ${isSelected ? "scale-125 border-white bg-ncple-700 text-white ring-2 ring-ncple-200" : "border-white/90 bg-white/90 text-ncple-800 hover:scale-110 hover:bg-ncple-700 hover:text-white"}`}>{String(number).padStart(2, "0")}</span></button>; })}{gates.map((gate) => { const position = gatePositions[gate[0]]; const isSelected = selected?.kind === "gate" && selected.item[0] === gate[0]; return <button id={`map-hotspot-gate-${gate[0]}`} key={gate[0]} type="button" onClick={() => selectGate(gate)} aria-label={`${gate[0]} — ${gate[1]}`} title={gate[1]} className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-ncple-300" style={position}><span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[9px] font-extrabold shadow-sm transition md:h-6 md:w-6 md:text-[10px] ${isSelected ? "scale-125 border-white bg-ncple-700 text-white ring-2 ring-ncple-200" : "border-white/90 bg-white/90 text-ncple-800 hover:scale-110 hover:bg-ncple-700 hover:text-white"}`}>{gate[0]}</span></button>; })}</div></div><p className="border-t border-slate-100 px-4 py-3 text-center text-xs text-slate-500">On smaller screens, swipe horizontally to explore the full map.</p></div>

    <div className="lg:grid lg:grid-cols-[1.2fr_.8fr] lg:gap-5">
      <div className="space-y-5 lg:col-start-1 lg:row-start-1">
        <div className="lg:hidden">{selectedPanel}</div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft md:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-slate-900">Campus locations</p><p className="mt-1 text-xs text-slate-500">Select a location to see more information.</p></div><span className="rounded-full bg-ncple-50 px-3 py-1 text-xs font-bold text-ncple-700">26 locations · 3 gates</span></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{locations.map((location) => <button key={location[0]} type="button" onClick={() => selectLocation(location)} className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition ${selected?.kind === "location" && selected.item[0] === location[0] ? "border-ncple-500 bg-ncple-50" : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white"}`}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-extrabold text-ncple-700 shadow-sm">{String(location[0]).padStart(2, "0")}</span><span className="pt-1 text-sm font-semibold text-slate-800">{location[1]}</span></button>)}</div><div className="mt-4 border-t border-slate-100 pt-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-slate-500">Gates</p><div className="mt-2 flex flex-wrap gap-2">{gates.map((gate) => <button key={gate[0]} type="button" onClick={() => selectGate(gate)} className={`rounded-xl border px-3 py-2 text-sm font-semibold ${selected?.kind === "gate" && selected.item[0] === gate[0] ? "border-ncple-500 bg-ncple-50 text-ncple-700" : "border-slate-100 bg-slate-50 text-slate-700"}`}>{gate[0]} · {gate[1]}</button>)}</div></div></div>
      </div>
      <div className="hidden lg:block lg:col-start-2 lg:row-start-1">{selectedPanel}</div>
    </div>
  </div>;
}
