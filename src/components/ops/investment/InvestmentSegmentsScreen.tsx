"use client";

import Link from "next/link";
import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { InvestmentSegmentsService } from "@/services/investment-segments.service";

const views = ["segments", "customer-types", "customers"] as const;

export function InvestmentSegmentsScreen({ view }: { view?: string | null }) {
  const current = views.includes((view as any) || "segments") ? (view as any) : "segments";
  const [idInput, setIdInput] = useState("");
  const [payload, setPayload] = useState("{}");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const get = async () => {
    try {
      setError("");
      const r = current === "segments" ? await InvestmentSegmentsService.list()
        : current === "customer-types" ? await InvestmentSegmentsService.customerTypes()
        : await InvestmentSegmentsService.customers();
      setResult(r);
    } catch (e:any) { setError(e.message); }
  };

  const create = async () => { try { setError(""); setResult(await InvestmentSegmentsService.createCustomer(JSON.parse(payload || "{}"))); } catch (e:any) { setError(e.message); } };
  const remove = async () => { try { setError(""); setResult(await InvestmentSegmentsService.deleteCustomer(Number(idInput))); } catch (e:any) { setError(e.message); } };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{views.map((v) => <Link key={v} href={`/ops/investment-segments?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>{v}</Link>)}</div>
      <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap gap-2">
          <button onClick={get} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">GET</button>
          {current === "customers" ? <button onClick={create} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">POST</button> : null}
          {current === "customers" ? <><input value={idInput} onChange={(e) => setIdInput(e.target.value)} placeholder="id para DELETE" className="rounded-lg border px-3 py-2 text-sm" /><button onClick={remove} className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">DELETE</button></> : null}
        </div>
        {current === "customers" ? <JsonEditor value={payload} onChange={setPayload} height={150} /> : null}
        {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
        <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}
