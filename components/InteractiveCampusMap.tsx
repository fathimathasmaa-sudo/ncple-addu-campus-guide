"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";

const locations = [
  [1, "Flag Square"], [2, "Central Administration Building"], [3, "Staff Parking Area"], [4, "Stadium & Running Track"],
  [5, "Noosandha Clinic"], [6, "Garage"], [7, "Shooting Range"], [8, "Drill Shed"],
  [9, "Auditorium"], [10, "Outdoor Training Ground"], [11, "Volleyball Ground"], [12, "Futsal Field"],
  [13, "Rappelling Tower & Rock Climbing"], [14, "Mosque"], [15, "Pump House"], [16, "Uniform Office"],
  [17, "Hair Salon"], [18, "Police Shop"], [19, "Power House"], [20, "Edhuru Villa 1"],
  [21, "Edhuru Villa 2"], [22, "Edhuru Villa 3"], [23, "Edhuru Villa 4"], [24, "Swimming Pool"],
  [25, "Edhuri Hiya 1"], [26, "Edhuru Hiya 2"], [27, "Dharivarunge Hiya 1"], [28, "Dharivarunge Hiya 2"],
  [29, "Guest House"], [30, "Garden Area"], [31, "Security Post 2"], [32, "Security Post 1"],
] as const;

type Location = (typeof locations)[number];

const hotspotPositions: Record<number, { left: string; top: string }> = {
  1: { left: "45.8%", top: "40%" }, 2: { left: "41.8%", top: "35%" }, 3: { left: "28.7%", top: "46%" }, 4: { left: "17.2%", top: "34%" },
  5: { left: "13.5%", top: "44%" }, 6: { left: "10.7%", top: "28%" }, 7: { left: "7.4%", top: "39%" }, 8: { left: "22.2%", top: "43%" },
  9: { left: "53.8%", top: "36%" }, 10: { left: "58.5%", top: "40%" }, 11: { left: "62.8%", top: "40%" }, 12: { left: "66.4%", top: "40%" },
  13: { left: "69.5%", top: "42%" }, 14: { left: "61.7%", top: "49%" }, 15: { left: "64.5%", top: "34%" }, 16: { left: "72.5%", top: "42%" },
  17: { left: "75.5%", top: "42%" }, 18: { left: "78.5%", top: "42%" }, 19: { left: "84%", top: "35%" }, 20: { left: "70%", top: "48%" },
  21: { left: "74%", top: "48%" }, 22: { left: "78%", top: "47%" }, 23: { left: "82%", top: "45%" }, 24: { left: "87.5%", top: "40%" },
  25: { left: "85.5%", top: "51%" }, 26: { left: "91%", top: "36%" }, 27: { left: "89%", top: "55%" }, 28: { left: "94%", top: "31%" },
  29: { left: "95%", top: "23%" }, 30: { left: "88%", top: "34%" }, 31: { left: "98%", top: "52%" }, 32: { left: "47.5%", top: "43%" },
};

function locationInfo(location: Location) {
  const [number, name] = location;
  const details: Record<number, { category: string; description: string; href?: string }> = {
    2: { category: "Administration", description: "Reception, administration offices, classrooms, syndicate rooms, computer lab, library, cafeteria and multipurpose hall." },
    5: { category: "Health", description: "Campus clinic." },
    14: { category: "Worship", description: "Campus mosque." },
    18: { category: "Services", description: "Police Shop for everyday essentials." },
    24: { category: "Recreation", description: "Swimming pool. See the pool guidance and authorised hours.", href: "/pool" },
    25: { category: "Accommodation", description: "Edhuri Hiya 1. This is also the designated smoking-area location referenced by the campus guide.", href: "/smoking" },
    29: { category: "Accommodation", description: "Campus guest house.", href: "/accommodation" },
    30: { category: "Outdoor", description: "Campus garden area." },
    31: { category: "Security", description: "Security Post 2." },
    32: { category: "Security", description: "Security Post 1." },
  };
  return details[number] ?? { category: "Campus location", description: name };
}

export function InteractiveCampusMap() {
  const [selected, setSelected] = useState<Location | null>(null);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => locations.filter(([, name]) => name.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  const info = selected ? locationInfo(selected) : null;

  function selectLocation(location: Location) {
    setSelected(location);
    setQuery(location[1]);
    window.setTimeout(() => document.getElementById("selected-location")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 0);
  }

  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Find a campus location</p>
            <p className="mt-1 text-xs text-slate-500">Tap a numbered location on the map or search below.</p>
          </div>
          <label className="relative block w-full md:max-w-sm">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search locations…" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-ncple-500 focus:bg-white focus:ring-2 focus:ring-ncple-100" />
            {query && <button type="button" onClick={() => { setQuery(""); setSelected(null); }} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"><X size={17} /></button>}
          </label>
        </div>
        {query && filtered.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filtered.slice(0, 8).map((location) => <button key={location[0]} type="button" onClick={() => selectLocation(location)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-ncple-500 hover:text-ncple-700">{String(location[0]).padStart(2, "0")} · {location[1]}</button>)}
          </div>
        )}
        {query && filtered.length === 0 && <p className="mt-3 text-sm text-slate-500">No campus locations match “{query}”.</p>}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <div className="overflow-auto bg-slate-100 p-2 md:p-4">
          <div className="relative mx-auto min-w-[720px] w-full max-w-[1400px]">
            <img src="/Campus Map.svg" alt="Official NCPLE Addu Campus map showing numbered campus locations" className="block h-auto w-full select-none" draggable={false} />
            {locations.map((location) => {
              const [number, name] = location;
              const position = hotspotPositions[number];
              const isSelected = selected?.[0] === number;
              return <button key={number} type="button" onClick={() => selectLocation(location)} aria-label={`${String(number).padStart(2, "0")} — ${name}`} title={name} className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[11px] font-extrabold shadow-md transition focus:outline-none focus:ring-4 focus:ring-ncple-200 md:h-10 md:w-10 ${isSelected ? "scale-110 border-white bg-ncple-700 text-white ring-4 ring-ncple-200" : "border-white bg-white/95 text-ncple-800 hover:scale-110 hover:bg-ncple-700 hover:text-white"}`} style={position}>{String(number).padStart(2, "0")}</button>;
            })}
          </div>
        </div>
        <p className="border-t border-slate-100 px-4 py-3 text-center text-xs text-slate-500">On smaller screens, swipe horizontally to explore the full map.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft md:p-6">
          <div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-slate-900">Campus locations</p><p className="mt-1 text-xs text-slate-500">Select a location to see more information.</p></div><span className="rounded-full bg-ncple-50 px-3 py-1 text-xs font-bold text-ncple-700">32 locations</span></div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {locations.map((location) => <button key={location[0]} type="button" onClick={() => selectLocation(location)} className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition ${selected?.[0] === location[0] ? "border-ncple-500 bg-ncple-50" : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white"}`}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-extrabold text-ncple-700 shadow-sm">{String(location[0]).padStart(2, "0")}</span><span className="pt-1 text-sm font-semibold text-slate-800">{location[1]}</span></button>)}
          </div>
        </div>

        <div id="selected-location" className="h-fit rounded-3xl border border-ncple-100 bg-ncple-50 p-5 shadow-soft md:p-6 lg:sticky lg:top-24">
          {selected && info ? <>
            <div className="flex items-start justify-between gap-3"><div><span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-ncple-700"><MapPin size={14} /> {String(selected[0]).padStart(2, "0")}</span><h2 className="mt-4 text-2xl font-bold text-ncple-950">{selected[1]}</h2><p className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-ncple-500">{info.category}</p></div><button type="button" onClick={() => setSelected(null)} aria-label="Close location details" className="rounded-xl bg-white p-2 text-slate-400 hover:text-slate-700"><X size={18} /></button></div>
            <p className="mt-5 text-sm leading-6 text-slate-600">{info.description}</p>
            {info.href && <a href={info.href} className="mt-5 inline-flex rounded-xl bg-ncple-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-ncple-800">View related guide</a>}
          </> : <div className="py-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ncple-700"><MapPin size={23} /></div><h2 className="mt-4 text-xl font-bold text-ncple-950">Select a location</h2><p className="mt-2 text-sm leading-6 text-slate-600">Choose a numbered location on the map or from the list to view details here.</p></div>}
        </div>
      </div>
    </div>
  );
}
