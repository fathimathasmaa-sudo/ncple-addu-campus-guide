import Link from "next/link";
import { ArrowRight, Map, Building2, LifeBuoy, Phone, ClipboardCheck, Shirt, Cigarette } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const sections = [
  { href: "/map", title: "Campus Map", description: "Find key campus locations.", icon: Map },
  { href: "/facilities", title: "Facilities", description: "Explore accommodation, dining and recreation facilities.", icon: Building2 },
  { href: "/dress-code", title: "Dress Code", description: "Guidance for classes, official activities, recreation and dining.", icon: Shirt },
  { href: "/smoking", title: "Smoking Areas", description: "Find the designated smoking area and campus smoking guidance.", icon: Cigarette },
  { href: "/essentials", title: "Campus Essentials", description: "Wi-Fi, access, safety and other useful information.", icon: LifeBuoy },
  { href: "/contacts", title: "Important Contacts", description: "Reach campus and emergency contacts quickly.", icon: Phone },
  { href: "/checkout", title: "Checkout Checklist", description: "Make sure everything is ready before departure.", icon: ClipboardCheck },
];

export default function Explore() {
  return (
    <PageShell title="Explore" eyebrow="NCPLE Addu Campus">
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-ncple-500 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ncple-50 text-ncple-700">
              <Icon size={22} />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-slate-900">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
              </div>
              <ArrowRight size={18} className="mt-1 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-ncple-700" />
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
