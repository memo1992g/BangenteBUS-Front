"use client";

import { useState } from "react";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export function TravelNoticesConfig() {
  const [document, setDocument] = useState("");
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const searchNotices = async () => {
    if (!document) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await http<any[]>(`${endpoints.notifications.absenceList}?document=${document}`, "GET");
      setNotices(res || []);
    } catch (e: any) {
      setError(e.message || "Error buscando notificaciones");
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Notificaciones de Ausencia (Avisos de Viaje)</h3>
        <button className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800">
          Exportar Reporte
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Consulta y gestión de avisos de viaje de clientes.
        Equivalente a <strong>NotificacionAusenciaController</strong> en canales-main.
      </p>

      <div className="max-w-md mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Documento de Identidad del Cliente
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ej. V12345678"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchNotices()}
          />
          <button
            onClick={searchNotices}
            disabled={!document || loading}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-50"
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

      {searched && !loading && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-lg">ID</th>
                <th className="px-4 py-3 font-medium">Destino</th>
                <th className="px-4 py-3 font-medium">Desde</th>
                <th className="px-4 py-3 font-medium">Hasta</th>
                <th className="px-4 py-3 font-medium rounded-tr-lg">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No se encontraron notificaciones para este documento
                  </td>
                </tr>
              ) : (
                notices.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">{item.id}</td>
                    <td className="px-4 py-3 font-medium">{item.destination}</td>
                    <td className="px-4 py-3">{item.startDate}</td>
                    <td className="px-4 py-3">{item.endDate}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {item.status || 'Activo'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
