"use client";

import { useState } from "react";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export function ConsultasConfig() {
  const [document, setDocument] = useState("");
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchClient = async () => {
    if (!document) return;
    setLoading(true);
    setError("");
    setClientData(null);
    try {
      const res = await http<any>(`${endpoints.clients.list}?document=${document}`, "GET");
      setClientData(res);
    } catch (e: any) {
      setError(e.message || "Error buscando cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Consulta de Clientes</h3>
      <p className="text-sm text-slate-500 mb-6">
        Búsqueda de información de clientes.
        Equivalente a <strong>Consulta Clientes</strong> en canales-main.
      </p>

      <div className="max-w-md mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Documento de Identidad
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ej. V12345678"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchClient()}
          />
          <button
            onClick={searchClient}
            disabled={!document || loading}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {clientData && (
        <div className="rounded-xl bg-slate-50 p-4 border">
          <pre className="overflow-auto text-xs">
            {JSON.stringify(clientData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
