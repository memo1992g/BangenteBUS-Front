"use client";

import { useState, useEffect } from "react";
import { InvestmentService } from "@/services/investment.service";

export function InvestmentConfig() {
  const [convocatorias, setConvocatorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadConvocatorias = async () => {
    setLoading(true);
    try {
      const res = await InvestmentService.listConvocatorias();
      setConvocatorias(Array.isArray(res) ? res : []);
    } catch (e: any) {
      setError(e.message || "Error cargando convocatorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConvocatorias();
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Convocatorias de Inversión</h3>
        <button
          onClick={loadConvocatorias}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ↻ Actualizar
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Gestión de Títulos de Cobertura y convocatorias activas.
        Equivalente a <strong>TituloCoberturaController</strong> en canales-main.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-slate-500 py-4">Cargando convocatorias...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-lg">Código</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Moneda</th>
                <th className="px-4 py-3 font-medium">Fecha Valor</th>
                <th className="px-4 py-3 font-medium rounded-tr-lg">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {convocatorias.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No hay convocatorias registradas
                  </td>
                </tr>
              ) : (
                convocatorias.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs">{item.code || item.id}</td>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3">{item.currencyCode}</td>
                    <td className="px-4 py-3">{item.valueDate}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {item.statusId || 'Activa'}
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
