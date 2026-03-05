"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExchangeService, type ExchangeConfigView } from "@/services/exchange.service";
import { JsonEditor } from "@/components/ops/JsonEditor";

const views: ExchangeConfigView[] = ["balances", "rates", "commissions", "channels", "parameters"];

export function ExchangeConfigScreen({ view }: { view?: string | null }) {
  const current = useMemo(() => (views.includes((view as ExchangeConfigView) || "balances") ? (view as ExchangeConfigView) : "balances"), [view]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [payload, setPayload] = useState("{}");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await ExchangeService.getConfig(current);
      setData(res);
      setPayload(JSON.stringify(res ?? {}, null, 2));
    } catch (e: any) {
      setError(e.message || "Error cargando vista");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [current]);

  const update = async () => {
    setLoading(true);
    setError("");
    try {
      const body = JSON.parse(payload || "{}");
      await ExchangeService.updateConfig(current, body);
      await load();
    } catch (e: any) {
      setError(e.message || "Error actualizando");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {views.map((v) => (
          <Link key={v} href={`/ops/exchange-config?view=${v}`} className={`rounded-lg px-3 py-2 text-sm ${current === v ? "bg-slate-900 text-white" : "bg-slate-100"}`}>{v}</Link>
        ))}
      </div>
      <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        <div className="flex gap-2">
          <button onClick={load} disabled={loading} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">GET</button>
          <button onClick={update} disabled={loading} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">PUT</button>
        </div>
        <JsonEditor value={payload} onChange={setPayload} height={180} />
        {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
        <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
