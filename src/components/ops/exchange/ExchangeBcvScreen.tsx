"use client";

import Link from "next/link";
import { useState } from "react";
import { ExchangeBcvService } from "@/services/exchange-bcv.service";

const views = ["report", "summary", "interventions", "substitutions", "export", "exclude"] as const;

export function ExchangeBcvScreen({ view }: { view?: string | null }) {
  const current = views.includes((view as any) || "report") ? (view as any) : "report";
  const [orderReference, setOrderReference] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const run = async () => {
    try {
      setError("");
      const r = current === "report" ? await ExchangeBcvService.report()
        : current === "summary" ? await ExchangeBcvService.summary()
        : current === "interventions" ? await ExchangeBcvService.interventions()
        : current === "substitutions" ? await ExchangeBcvService.substitutions()
        : current === "export" ? await ExchangeBcvService.exportData()
        : await ExchangeBcvService.exclude(orderReference);
      setResult(r);
    } catch (e: any) { setError(e.message || "Error ejecutando vista BCV"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{views.map((v) => <Link key={v} href={`/ops/exchange-bcv?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>{v}</Link>)}</div>
      <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        {current === "exclude" ? <input value={orderReference} onChange={(e) => setOrderReference(e.target.value)} placeholder="orderReference" className="rounded-lg border px-3 py-2 text-sm" /> : null}
        <button onClick={run} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">{current === "exclude" ? "POST" : "GET"}</button>
        {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
        <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}
