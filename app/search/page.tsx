"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {Search as SearchIcon,ArrowRight,Clock3,MapPinned,Phone,Wifi,ShieldCheck,ClipboardCheck,Shirt,Cigarette} from "lucide-react";
import {PageShell} from "@/components/PageShell";

const records=[
 ['/map','Campus Map','Find key campus locations at a glance.','map admin building guest house dining swimming pool sports entertainment smoking mosque police shop',MapPinned],
 ['/dining','Dining Information','Meal times and dining locations.','breakfast lunch dinner 07:00 09:00 12:00 14:00 19:00 21:00 mess cafeteria',Clock3],
 ['/accommodation','Your Accommodation','Room guidance and practical stay information.','room belongings electricity water maintenance Edhuru Hiya Guest House',ClipboardCheck],
 ['/pool','Swimming Pool','Hours, safety rules and pool guidance.','pool swimming 06:00 19:00 rules buddy',ShieldCheck],
 ['/entertainment','Entertainment & Common Room','Facilities, hours and shared-space guidance.','pool karaoke carrom games 08:00 23:00',ClipboardCheck],
 ['/wifi','Wi-Fi & Communication','Guest Wi-Fi information.','PII-Guest guest room information envelope',Wifi],
 ['/safety','Safety & Security','Campus safety and security guidance.','safety security surroundings staff security personnel',ShieldCheck],
 ['/contacts','Important Contacts','Campus, medical and emergency contacts.','doctor security campus contact emergency',Phone],
 ['/checkout','Before You Check Out','A quick checklist before departure.','checkout belongings keys access cards departure arrangements',ClipboardCheck],
 ['/dress-code','Dress Code','Clothing guidance for classes, activities, recreation and dining.','dress clothing classes official activities sports recreation dining shorts slippers professional',Shirt],
 ['/smoking','Smoking Areas','Designated smoking area and rules.','smoking Edhuru Hiya 1 Hut designated area cigarette',Cigarette],
 ['/police-shop','Police Shop','Shop location, hours and essentials.','cosmetics toiletries snacks 09:00 13:00 21:00 23:00',ClipboardCheck],
 ['/access','Entering & Leaving the Campus','Gate and entry/exit guidance.','gate officer identification entry exit register main emergency gate',MapPinned]
] as const;

export default function Search(){
 const [q,setQ]=useState('');
 const results=useMemo(()=>{const n=q.trim().toLowerCase();return n?records.filter(([,t,x,keywords])=>`${t} ${x} ${keywords}`.toLowerCase().includes(n)):[]},[q]);
 const suggestions=['pool','breakfast','Wi-Fi','dress code','smoking','contacts'];
 return <PageShell title="Search" eyebrow="Find it fast">
   <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-3 shadow-soft focus-within:border-ncple-300 focus-within:ring-4 focus-within:ring-ncple-50">
     <div className="flex items-center gap-3 px-2 py-1">
       <SearchIcon className="shrink-0 text-ncple-600" size={21}/>
       <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search the campus guide…" aria-label="Search the campus guide" className="min-w-0 flex-1 bg-transparent py-2 text-base text-slate-900 outline-none placeholder:text-slate-400"/>
       {q&&<button type="button" onClick={()=>setQ('')} className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100" aria-label="Clear search">Clear</button>}
     </div>
   </div>
   {!q&&<div className="mt-5"><p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400">Popular searches</p><div className="mt-3 flex flex-wrap gap-2">{suggestions.map(s=><button key={s} type="button" onClick={()=>setQ(s)} className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-ncple-300 hover:bg-ncple-50 hover:text-ncple-800">{s}</button>)}</div></div>}
   {q&&<div className="mt-6 flex items-center justify-between"><p className="text-sm font-semibold text-slate-700">{results.length} {results.length===1?'result':'results'}</p><button type="button" onClick={()=>setQ('')} className="text-sm font-semibold text-ncple-700">Clear</button></div>}
   <div className="mt-4 space-y-3">
    {q&&results.length===0&&<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><SearchIcon size={22}/></div><p className="mt-4 font-semibold text-slate-900">No matching guide section</p><p className="mt-1 text-sm text-slate-500">Try a broader term such as “pool”, “food”, “room” or “contact”.</p></div>}
    {results.map(([href,title,description,,Icon])=><Link key={href} href={href} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-ncple-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ncple-500 sm:p-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ncple-50 text-ncple-700 group-hover:bg-ncple-100"><Icon size={20}/></div><div className="min-w-0 flex-1"><p className="font-semibold text-slate-900">{title}</p><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></div><ArrowRight size={18} className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-ncple-600"/></Link>)}
   </div>
 </PageShell>
}
