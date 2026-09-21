import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { InteractiveCampusMap } from "@/components/InteractiveCampusMap";

export default function MapPage() {
  return (
    <PageShell title="Campus Map" eyebrow="Find your way">
      <InteractiveCampusMap />
      <Link href="/explore" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ncple-700">
        Back to Explore <ArrowRight size={16} />
      </Link>
    </PageShell>
  );
}
