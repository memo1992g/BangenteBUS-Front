"use client";

import { useState } from "react";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import { StatusBadge } from "../StatusBadge";

export function ReferenciasConfig() {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleValidate = async () => {
    if (!reference) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await http(endpoints.references.byDocument(reference), "GET");
      setResult(res);
    } catch (e: any) {
      setError(e.message || "Error al validar la referencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Validación de Referencias Bancarias</h3>
      <p className="text-sm text-slate-500 mb-6">
        Herramienta para validar la autenticidad de referencias bancarias emitidas.
        Equivalente a <strong>ReferenciasController</strong> en canales-main.
      </p>

      <div className="max-w-md">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Código de Referencia
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ingrese el código"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
          />
          <button
            onClick={handleValidate}
            disabled={!reference || loading}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Validando..." : "Validar"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 max-w-md">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4 max-w-md border">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge ok={result.valid !== false} />
            <span className="text-sm font-medium">Resultado de Validación</span>
          </div>
          <pre className="overflow-auto rounded-lg bg-white p-3 text-xs border">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
