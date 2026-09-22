import { Shirt } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getPublicGuide } from "@/lib/publicGuide";

export default async function DressCode() {
  const guide = await getPublicGuide();
  return (
    <PageShell title="Dress Code" eyebrow="Campus standards">
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ncple-50 text-ncple-700"><Shirt size={25} /></div>
        <div className="mt-6"><p className="text-base leading-7 text-slate-600">NCPLE is a professional learning and training environment. Participants and guests are expected to dress appropriately at all times.</p>
          <div className="mt-7 space-y-4">{guide.dressCode.map((item) => <section key={item.title} className="rounded-2xl bg-slate-50 p-5"><h2 className="font-semibold text-slate-900">{item.title}</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600"><li>{item.body}</li></ul></section>)}</div>
        </div>
      </div>
    </PageShell>
  );
}
