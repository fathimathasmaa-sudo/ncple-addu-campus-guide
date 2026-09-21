import { Cigarette, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { guide } from "@/data/campusGuide";

export default function Smoking() {
  return (
    <PageShell title="Smoking Areas" eyebrow="Designated area only">
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ncple-50 text-ncple-700">
          <Cigarette size={25} />
        </div>
        <p className="mt-6 text-base leading-7 text-slate-600">
          Smoking is permitted only in the designated smoking area shown on the campus map ({guide.smoking.location}). Please ask a member of campus staff if you require directions.
        </p>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-ncple-100 bg-ncple-50 p-4">
          <MapPin size={20} className="mt-0.5 shrink-0 text-ncple-700" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[.14em] text-ncple-500">Designated Smoking Area</p>
            <p className="mt-1 font-semibold text-ncple-950">{guide.smoking.location}</p>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {guide.smoking.rules.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <span className="mr-2 text-ncple-700">•</span>{item}
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
