"use client";

import { useState, useEffect } from "react";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export function SeguridadConfig() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const res = await http<any[]>(endpoints.profiles.list, "GET");
      setProfiles(res || []);
    } catch (e: any) {
      setError(e.message || "Error cargando perfiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Administración de Accesos</h3>
        <button
          onClick={loadProfiles}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ↻ Actualizar
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Gestión de perfiles y accesos de usuarios administradores.
        Equivalente a <strong>PerfilesAdmin</strong> en canales-main.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-slate-500 py-4">Cargando perfiles...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-lg">ID</th>
                <th className="px-4 py-3 font-medium">Nombre de Perfil</th>
                <th className="px-4 py-3 font-medium">Descripción</th>
                <th className="px-4 py-3 font-medium rounded-tr-lg">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    No hay perfiles configurados
                  </td>
                </tr>
              ) : (
                profiles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">{item.id}</td>
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-slate-500">{item.description}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Activo
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
