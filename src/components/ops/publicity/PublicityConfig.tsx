"use client";

import { useState, useEffect } from "react";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export function PublicityConfig() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const res = await http<any[]>(endpoints.campaigns.list, "GET");
      setCampaigns(res || []);
    } catch (e: any) {
      setError(e.message || "Error cargando campañas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Campañas de Publicidad</h3>
        <div className="flex gap-3">
          <button className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800">
            + Nueva Campaña
          </button>
          <button
            onClick={loadCampaigns}
            className="text-sm text-slate-600 hover:text-slate-900 px-2"
          >
            ↻ Actualizar
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Gestión de banners y campañas publicitarias.
        Equivalente a <strong>PublicidadController</strong> en canales-main.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-slate-500 py-4">Cargando campañas...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-lg">ID</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Fechas</th>
                <th className="px-4 py-3 font-medium rounded-tr-lg">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No hay campañas registradas
                  </td>
                </tr>
              ) : (
                campaigns.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">{item.id}</td>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {item.startDate} - {item.endDate}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                        {item.active ? 'Activa' : 'Inactiva'}
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
