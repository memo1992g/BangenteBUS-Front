"use client";

import { useState } from "react";
import { SarenService } from "@/services/saren.service";
import { StatusBadge } from "../StatusBadge";

export function SarenRelay() {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!date) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await SarenService.relay(date);
      setResult(res);
    } catch (e: any) {
      setError(e.message || "Error enviando archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Contingencia SAREN</h3>
      <p className="text-sm text-slate-500 mb-6">POST /api/admin/saren/relay</p>

      <div className="max-w-sm">
        <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de Operación</label>
        <div className="flex gap-3">
          <input type="date" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" value={date} onChange={(e) => setDate(e.target.value)} />
          <button onClick={handleSend} disabled={!date || loading} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50">
            {loading ? "Enviando..." : "Enviar Archivo"}
          </button>
        </div>
      </div>

      {error ? <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 max-w-sm">{error}</div> : null}
      {result ? (
        <div className="mt-4 rounded-xl bg-slate-50 p-4 max-w-sm">
          <div className="mb-2 flex items-center gap-2"><StatusBadge ok={true} /><span className="text-sm font-medium">Respuesta SAREN</span></div>
          <pre className="overflow-auto rounded-lg bg-white p-3 text-xs border">{JSON.stringify(result, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
}
