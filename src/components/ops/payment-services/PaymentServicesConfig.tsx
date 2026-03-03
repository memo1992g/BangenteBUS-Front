"use client";

import { useState, useEffect } from "react";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export function PaymentServicesConfig() {
  const [amounts, setAmounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAmounts = async () => {
    setLoading(true);
    try {
      const res = await http<any[]>(endpoints.paymentServices.list, "GET") as any;
      setAmounts(Array.isArray(res) ? res : []);
    } catch (e: any) {
      setError(e.message || "Error cargando montos de recarga");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAmounts();
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Configuración de Montos de Recarga</h3>
        <button
          onClick={loadAmounts}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ↻ Actualizar
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Gestión de montos permitidos para recargas de servicios (Movistar, Digitel, Movilnet).
        Equivalente a <strong>PagoServiciosController</strong> en canales-main.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-slate-500 py-4">Cargando montos...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-lg">ID</th>
                <th className="px-4 py-3 font-medium">Operadora</th>
                <th className="px-4 py-3 font-medium">Monto (Bs)</th>
                <th className="px-4 py-3 font-medium rounded-tr-lg">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {amounts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    No hay montos configurados
                  </td>
                </tr>
              ) : (
                amounts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">{item.id}</td>
                    <td className="px-4 py-3 font-medium">{item.operatorCode}</td>
                    <td className="px-4 py-3">{item.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                        {item.active ? 'Activo' : 'Inactivo'}
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
