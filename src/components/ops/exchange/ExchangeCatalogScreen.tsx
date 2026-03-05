"use client";

import Link from "next/link";
import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { ExchangeCatalogService } from "@/services/exchange-catalog.service";

const views = ["sessions", "markets", "balances", "modalities", "products", "currencies"] as const;

export function ExchangeCatalogScreen({ view }: { view?: string | null }) {
  const current = views.includes((view as any) || "sessions") ? (view as any) : "sessions";
  const [idInput, setIdInput] = useState("");
  const [payload, setPayload] = useState("{}");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const list = async () => { try { setError(""); setResult(await ExchangeCatalogService.list(current)); } catch (e:any) { setError(e.message); } };
  const create = async () => { try { setError(""); setResult(await ExchangeCatalogService.create(current as any, JSON.parse(payload || "{}"))); } catch (e:any) { setError(e.message); } };
  const update = async () => { try { setError(""); setResult(await ExchangeCatalogService.update(current as any, Number(idInput), JSON.parse(payload || "{}"))); } catch (e:any) { setError(e.message); } };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{views.map((v) => <Link key={v} href={`/ops/exchange-catalog?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>{v}</Link>)}</div>
      <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap gap-2">
          <button onClick={list} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">GET</button>
          {current !== "balances" ? <button onClick={create} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">POST</button> : null}
          <input value={idInput} onChange={(e) => setIdInput(e.target.value)} className="rounded-lg border px-3 py-2 text-sm" placeholder="id para PUT" />
          <button onClick={update} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">PUT</button>
        </div>
        <JsonEditor value={payload} onChange={setPayload} height={150} />
        {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
        <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}
