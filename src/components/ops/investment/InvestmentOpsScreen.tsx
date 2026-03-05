"use client";

import Link from "next/link";
import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { InvestmentOpsService } from "@/services/investment-ops.service";

const views = ["results-preview", "results-process", "cancel-eligible", "cancel-execute", "precancel", "precancel-update"] as const;

export function InvestmentOpsScreen({ view }: { view?: string | null }) {
  const current = views.includes((view as any) || "results-preview") ? (view as any) : "results-preview";
  const [payload, setPayload] = useState("{}");
  const [idInput, setIdInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const run = async () => {
    try {
      setError("");
      const body = JSON.parse(payload || "{}");
      const r = current === "results-preview" ? await InvestmentOpsService.resultsPreview(body)
        : current === "results-process" ? await InvestmentOpsService.resultsProcess(body)
        : current === "cancel-eligible" ? await InvestmentOpsService.cancelEligible(body?.expirationDate)
        : current === "cancel-execute" ? await InvestmentOpsService.cancelExecute(body)
        : current === "precancel" ? await InvestmentOpsService.precancel()
        : await InvestmentOpsService.precancelUpdate(Number(idInput), body);
      setResult(r);
    } catch (e: any) { setError(e.message || "Error ejecutando inversión ops"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{views.map((v) => <Link key={v} href={`/ops/investment-ops?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>{v}</Link>)}</div>
      <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        {current === "precancel-update" ? <input value={idInput} onChange={(e) => setIdInput(e.target.value)} className="rounded-lg border px-3 py-2 text-sm" placeholder="orderId" /> : null}
        {current !== "precancel" ? <JsonEditor value={payload} onChange={setPayload} height={150} /> : null}
        <button onClick={run} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">{["cancel-eligible","precancel"].includes(current) ? "GET" : current === "precancel-update" ? "PUT" : "POST"}</button>
        {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
        <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}
