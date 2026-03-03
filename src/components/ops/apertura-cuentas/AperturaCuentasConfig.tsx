"use client";

import { useState } from "react";
import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import { StatusBadge } from "../StatusBadge";

export function AperturaCuentasConfig() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Usamos fetch directamente porque http() está configurado para application/json por defecto
      const token = sessionStorage.getItem("jwt_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_API_URL}${endpoints.accountOpening.batch}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al procesar el archivo");
      
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Apertura Masiva de Cuentas</h3>
      <p className="text-sm text-slate-500 mb-6">
        Carga de archivo para la creación masiva de cuentas bancarias.
        Equivalente a <strong>AperturaCuentaController</strong> en canales-main.
      </p>

      <div className="max-w-md">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Archivo de Carga (.txt / .csv)
        </label>
        <div className="flex gap-3">
          <input
            type="file"
            accept=".txt,.csv"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-slate-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-100"
            onChange={handleFileChange}
          />
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Cargar Archivo"}
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
            <StatusBadge ok={true} />
            <span className="text-sm font-medium">Resultado de Carga</span>
          </div>
          <pre className="overflow-auto rounded-lg bg-white p-3 text-xs border">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
