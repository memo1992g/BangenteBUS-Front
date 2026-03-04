"use client";

import Link from "next/link";
import { ExchangeBalances } from "@/components/ops/exchange/ExchangeBalances";
import { PendingIntegrationPanel } from "@/components/ops/shared/PendingIntegrationPanel";

const views = ["balances", "rates", "commissions", "channels", "parameters"] as const;

export function ExchangeConfigScreen({ view }: { view?: string | null }) {
  const current = views.includes((view as any) || "balances") ? (view as any) : "balances";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {views.map((v) => (
          <Link key={v} href={`/ops/exchange-config?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>
            {v}
          </Link>
        ))}
      </div>
      {current === "balances" ? <ExchangeBalances /> : <PendingIntegrationPanel title={`Exchange Config · ${current}`} />}
    </div>
  );
}
