"use client";

import Link from "next/link";
import { PendingIntegrationPanel } from "@/components/ops/shared/PendingIntegrationPanel";

const views = ["segments", "customer-types", "customers"] as const;

export function InvestmentSegmentsScreen({ view }: { view?: string | null }) {
  const current = views.includes((view as any) || "segments") ? (view as any) : "segments";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {views.map((v) => (
          <Link key={v} href={`/ops/investment-segments?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>
            {v}
          </Link>
        ))}
      </div>
      <PendingIntegrationPanel title={`Investment Segments · ${current}`} />
    </div>
  );
}
