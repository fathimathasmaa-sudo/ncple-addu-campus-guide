import Link from "next/link";
import { ArrowRight, Clock3, Map, Utensils, BedDouble, Waves, Gamepad2, Wifi, ShieldCheck, Phone, ClipboardCheck, Search, Sparkles } from "lucide-react";
import { getPublicGuide } from "@/lib/publicGuide";
import { LiveStatus } from "@/components/LiveStatus";

const quick = [
  ["/map", "Campus Map", Map], ["/dining", "Dining", Utensils], ["/accommodation", "Accommodation", BedDouble], ["/pool", "Swimming Pool", Waves], ["/entertainment", "Entertainment Room", Gamepad2], ["/wifi", "Wi-Fi", Wifi],
  ["/safety", "Safety", ShieldCheck], ["/contacts", "Important Contacts", Phone], ["/checkout", "Checkout", ClipboardCheck]
] as const;

export default async function Home() {
  const guide = await getPublicGuide();
  const hours = guide.hours.filter(x => x.featured);
  return <main className="mx-auto max-w-6xl px-4 py-5 md:px-8 md:py-10">
    <header className="relative overflow-hidden rounded-[2rem] bg-ncple-900 p-6 text-white shadow-soft md:p-10 lg:p-12">
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[42px] border-white/5" />
      <div className="pointer-events-none absolute -bottom-40 right-16 h-72 w-72 rounded-full bg-ncple-700/60 blur-3xl" />
      <div className="relative flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-4 md:gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-2 ring-1 ring-white/15 backdrop-blur md:h-24 md:w-24">
            <img src="/NCPLE%20White.svg" alt="NCPLE official logo" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[.16em] text-blue-100 md:text-xs">National College of Policing and Law Enforcement</p>
            <p className="mt-2 text-sm font-medium text-blue-100">Addu Campus · Welcome Guide</p>
          </div>
        </div>
        <div className="hidden shrink-0 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-extrabold tracking-[.12em] backdrop-blur sm:block">ADDU CAMPUS</div>
      </div>
      <div className="relative mt-10 max-w-3xl md:mt-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50 backdrop-blur"><Sparkles size={14}/> Your campus, at a glance</div>
        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">Welcome to NCPLE Addu Campus</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50 md:text-lg">Your digital guide to a comfortable, safe and enjoyable stay.</p>
      </div>
      <Link href="/search" className="relative mt-9 flex max-w-2xl items-center gap-3 rounded-2xl bg-white p-4 text-slate-600 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white">
        <Search size={20} className="shrink-0 text-ncple-700"/><span className="flex-1 text-sm font-medium">Search the campus guide…</span><span className="hidden rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500 sm:block">Search</span><ArrowRight size={18} className="shrink-0"/>
      </Link>
    </header>

    <section className="mt-10 md:mt-12">
      <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-ncple-500">Quick Access</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-ncple-950 md:text-3xl">Find what you need</h2></div><Link href="/explore" className="hidden items-center gap-1 text-sm font-semibold text-ncple-700 sm:flex">View all<ArrowRight size={16}/></Link></div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{quick.map(([href, label, Icon]) => <Link href={href} key={href} className="group rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-ncple-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ncple-500 md:p-5"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ncple-50 text-ncple-700 transition group-hover:bg-ncple-100"><Icon size={21}/></div><div className="mt-4 flex items-center justify-between gap-2"><span className="text-sm font-semibold leading-5 text-slate-800">{label}</span><ArrowRight size={16} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-ncple-600"/></div></Link>)}</div>
    </section>

    <section className="mt-11 md:mt-14">
      <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ncple-50 text-ncple-700"><Clock3 size={20}/></div><div><p className="text-xs font-bold uppercase tracking-[.16em] text-ncple-500">Today at Campus</p><h2 className="text-2xl font-bold tracking-tight text-ncple-950">Hours at a glance</h2></div></div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{hours.map(item => <div key={item.id} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold text-slate-900">{item.name}</p><p className="mt-1 text-sm text-slate-500">{item.timeLabel}</p>{item.location && <p className="mt-3 text-xs font-medium text-slate-400">{item.location}</p>}</div><LiveStatus item={item}/></div></div>)}</div>
    </section>

    <section className="mt-10 rounded-2xl border border-ncple-100 bg-ncple-50/70 p-5 md:mt-12 md:p-6"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-ncple-700" size={21}/><div><h2 className="font-semibold text-ncple-950">Need help?</h2><p className="mt-1 text-sm leading-6 text-slate-600">Find campus contacts and important assistance information whenever you need it.</p><Link href="/contacts" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-ncple-700">Important Contacts <ArrowRight size={15}/></Link></div></div></section>
  </main>;
}
