"use client";

import { useEffect, useState } from "react";
import { PaymentServicesService } from "@/services/payment-services.service";
import { JsonEditor } from "@/components/ops/JsonEditor";

export function PaymentServicesConfig() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idInput, setIdInput] = useState("");
  const [payload, setPayload] = useState('{\n  "operatorCode": "",\n  "amount": 0,\n  "active": true\n}');

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await PaymentServicesService.list();
      setRows(Array.isArray(res) ? res : []);
    } catch (e: any) {
      setError(e.message || "Error cargando montos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const parse = () => JSON.parse(payload || "{}");

  async function run(action: "create" | "getById" | "update" | "delete") {
    setError("");
    try {
      const id = Number(idInput);
      if ((action === "getById" || action === "update" || action === "delete") && !id) {
        throw new Error("ID requerido");
      }

      if (action === "create") await PaymentServicesService.create(parse());
      if (action === "getById") {
        const one = await PaymentServicesService.getById(id);
        setRows([one]);
      }
      if (action === "update") await PaymentServicesService.update(id, parse());
      if (action === "delete") await PaymentServicesService.remove(id);
      await load();
    } catch (e: any) {
      setError(e.message || "Error ejecutando acción");
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Pago Servicios</h3>
        <button onClick={load} className="text-sm text-slate-600 hover:text-slate-900">↻ Actualizar</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input value={idInput} onChange={(e) => setIdInput(e.target.value)} className="rounded-lg border px-3 py-2 text-sm" placeholder="ID (para GET/PUT/DELETE)" />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => run("create")} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Crear</button>
          <button onClick={() => run("getById")} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Get by ID</button>
          <button onClick={() => run("update")} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Actualizar</button>
          <button onClick={() => run("delete")} className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">Eliminar</button>
        </div>
      </div>

      <JsonEditor value={payload} onChange={setPayload} height={150} />

      {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}

      <div className="rounded-xl border p-3">
        {loading ? <div className="text-sm text-slate-500">Cargando...</div> : <pre className="overflow-auto text-xs">{JSON.stringify(rows, null, 2)}</pre>}
      </div>
    </div>
  );
}
