"use client";

import { useState, useEffect } from "react";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export function MessagesConfig() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await http<any[]>(endpoints.systemMessages.list, "GET");
      setMessages(res || []);
    } catch (e: any) {
      setError(e.message || "Error cargando mensajes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Mensajes del Sistema</h3>
        <div className="flex gap-3">
          <button className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800">
            + Nuevo Mensaje
          </button>
          <button
            onClick={loadMessages}
            className="text-sm text-slate-600 hover:text-slate-900 px-2"
          >
            ↻ Actualizar
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Gestión de mensajes de error, notificaciones y textos de la aplicación.
        Equivalente a <strong>MensajesController</strong> en canales-main.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-slate-500 py-4">Cargando mensajes...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-lg">Código</th>
                <th className="px-4 py-3 font-medium">Mensaje (ES)</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    No hay mensajes configurados
                  </td>
                </tr>
              ) : (
                messages.map((item) => (
                  <tr key={item.code || item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs font-medium">{item.code}</td>
                    <td className="px-4 py-3">{item.messageEs || item.text}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {item.type || 'General'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Editar</button>
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
