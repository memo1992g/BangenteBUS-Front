"use client";

import Link from "next/link";
import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { ExchangeOpsService } from "@/services/exchange-ops.service";

const views = ["orders", "intervention", "retail", "desk", "substitution", "reception"] as const;

export function ExchangeOpsScreen({ view }: { view?: string | null }) {
  const current = views.includes((view as any) || "orders") ? (view as any) : "orders";
  const [payload, setPayload] = useState("{}");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const run = async () => {
    try {
      setError("");
      const body = JSON.parse(payload || "{}");
      const r = current === "orders"
        ? await ExchangeOpsService.orders()
        : current === "intervention"
          ? await ExchangeOpsService.intervention(body)
          : current === "retail"
            ? await ExchangeOpsService.retail(body)
            : current === "desk"
              ? await ExchangeOpsService.desk(body)
              : current === "substitution"
                ? await ExchangeOpsService.substitution(body)
                : await ExchangeOpsService.reception(body);
      setResult(r);
    } catch (e: any) { setError(e.message || "Error ejecutando operación"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{views.map((v) => <Link key={v} href={`/ops/exchange-ops?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>{v}</Link>)}</div>
      <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        <button onClick={run} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">{current === "orders" ? "GET" : "POST"}</button>
        {current !== "orders" ? <JsonEditor value={payload} onChange={setPayload} height={150} /> : null}
        {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
        <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}
