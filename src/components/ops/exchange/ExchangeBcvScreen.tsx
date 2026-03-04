"use client";

import Link from "next/link";
import { PendingIntegrationPanel } from "@/components/ops/shared/PendingIntegrationPanel";

const views = ["report", "interventions", "substitutions"] as const;

export function ExchangeBcvScreen({ view }: { view?: string | null }) {
  const current = views.includes((view as any) || "report") ? (view as any) : "report";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {views.map((v) => (
          <Link key={v} href={`/ops/exchange-bcv?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>
            {v}
          </Link>
        ))}
      </div>
      <PendingIntegrationPanel title={`Exchange BCV · ${current}`} />
    </div>
  );
}
