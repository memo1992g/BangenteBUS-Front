"use client";

import { useMemo, useState } from "react";
import { http, ApiError } from "@/lib/http";
import { JsonEditor } from "./JsonEditor";
import { StatusBadge } from "./StatusBadge";
import type { ModuleAction, RunnerResult } from "@/lib/types";

export function ActionRunner({ action }: { action: ModuleAction }) {
  const [payload, setPayload] = useState<string>(() =>
    JSON.stringify(action.requestTemplate ?? {}, null, 2)
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RunnerResult | null>(null);

  const parsed = useMemo(() => {
    try {
      return { ok: true, value: JSON.parse(payload) };
    } catch (e: any) {
      return { ok: false, error: e?.message || "JSON inválido" };
    }
  }, [payload]);

  async function run() {
    setLoading(true);
    setResult(null);
    try {
      const body =
        action.method === "GET" || action.method === "DELETE"
          ? undefined
          : parsed.ok
          ? parsed.value
          : undefined;

      const data = await http<any>(action.path, action.method, body);
      setResult({ ok: true, data });
    } catch (e: any) {
      if (e instanceof ApiError) {
        setResult({ ok: false, status: e.status, data: e.body, error: e.message });
      } else {
        setResult({ ok: false, error: e?.message || "Error desconocido" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{action.label}</div>
          <div className="mt-1 text-xs text-slate-600">
            <span className="font-mono">{action.method}</span>{" "}
            <span className="font-mono">{action.path}</span>
          </div>
          {action.notes ? <div className="mt-2 text-xs text-slate-600">{action.notes}</div> : null}
        </div>
        <button
          onClick={run}
          disabled={loading || (action.method !== "GET" && action.method !== "DELETE" && !parsed.ok)}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Ejecutando..." : "Ejecutar"}
        </button>
      </div>

      {action.method !== "GET" && action.method !== "DELETE" ? (
        <div className="mt-4">
          <div className="mb-2 text-xs font-semibold text-slate-700">Request JSON</div>
          {!parsed.ok ? (
            <div className="mb-2 text-xs text-rose-700">JSON inválido: {parsed.error}</div>
          ) : null}
          <JsonEditor value={payload} onChange={setPayload} />
        </div>
      ) : null}

      {result ? (
        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <div className="flex items-center justify-between">
            <StatusBadge ok={result.ok} />
            {typeof result.status === "number" ? (
              <span className="text-xs text-slate-600">HTTP {result.status}</span>
            ) : null}
          </div>
          {result.error ? <div className="mt-2 text-sm text-rose-700">{result.error}</div> : null}
          <pre className="mt-3 overflow-auto rounded-xl bg-white p-3 text-xs">
            {JSON.stringify(result.data ?? null, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
