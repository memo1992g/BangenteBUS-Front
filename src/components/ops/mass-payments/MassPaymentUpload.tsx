"use client";

import { useState } from "react";
import { MassPaymentsService } from "@/services/mass-payments.service";
import { StatusBadge } from "../StatusBadge";

export function MassPaymentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    userId: "1",
    channelId: "1",
    identificationType: "1",
    identification: "",
    debitAccount: "",
    conventionCode: "1",
    sendFile: "0",
    isPayrollPayment: "1",
  });

  const handleList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await MassPaymentsService.list();
      setListData(res);
      setResult(null);
    } catch (e: any) {
      setError(e.message || "Error listando pagos");
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await MassPaymentsService.validate(file, formData);
      setResult(res);
    } catch (e: any) {
      setError(e.message || "Error al validar");
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await MassPaymentsService.process(file, formData);
      setResult(res);
    } catch (e: any) {
      setError(e.message || "Error al procesar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Carga de Archivo</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Identificación</label>
          <input 
            type="text" 
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={formData.identification}
            onChange={e => setFormData({...formData, identification: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cuenta Débito</label>
          <input 
            type="text" 
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={formData.debitAccount}
            onChange={e => setFormData({...formData, debitAccount: e.target.value})}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Archivo CSV</label>
          <input 
            type="file" 
            accept=".csv"
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleList}
          disabled={loading}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Listar"}
        </button>
        <button
          onClick={handleValidate}
          disabled={!file || loading}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Validar"}
        </button>
        <button
          onClick={handleProcess}
          disabled={!file || loading}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Procesando..." : "Procesar"}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {listData && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <div className="text-sm font-medium mb-2">Listado</div>
          <pre className="overflow-auto rounded-lg bg-white p-3 text-xs border">
            {JSON.stringify(listData, null, 2)}
          </pre>
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge ok={true} />
            <span className="text-sm font-medium">Resultado</span>
          </div>
          <pre className="overflow-auto rounded-lg bg-white p-3 text-xs border">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
