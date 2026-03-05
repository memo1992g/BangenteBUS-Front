"use client";

import { useEffect, useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { CampaignsService } from "@/services/campaigns.service";

export function PublicityConfig() {
  const [items, setItems] = useState<any[]>([]);
  const [idInput, setIdInput] = useState("");
  const [payload, setPayload] = useState('{\n  "name": "",\n  "active": true\n}');
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const res = await CampaignsService.list();
      setItems(Array.isArray(res) ? res : []);
    } catch (e: any) {
      setError(e.message || "Error cargando campañas");
    }
  };

  useEffect(() => { load(); }, []);

  const run = async (action: "create" | "get" | "update" | "delete") => {
    try {
      setError("");
      const id = Number(idInput);
      if (action !== "create" && !id) throw new Error("ID requerido");
      if (action === "create") await CampaignsService.create(JSON.parse(payload || "{}"));
      if (action === "get") setItems([await CampaignsService.getById(id)]);
      if (action === "update") await CampaignsService.update(id, JSON.parse(payload || "{}"));
      if (action === "delete") await CampaignsService.remove(id);
      await load();
    } catch (e: any) { setError(e.message || "Error ejecutando acción"); }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-semibold">Publicidad / Campañas</h3>
      <div className="flex flex-wrap gap-2">
        <input value={idInput} onChange={(e) => setIdInput(e.target.value)} className="rounded-lg border px-3 py-2 text-sm" placeholder="ID opcional" />
        <button onClick={() => run("create")} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Crear</button>
        <button onClick={() => run("get")} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Get by ID</button>
        <button onClick={() => run("update")} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Actualizar</button>
        <button onClick={() => run("delete")} className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">Eliminar</button>
        <button onClick={load} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Listar</button>
      </div>
      <JsonEditor value={payload} onChange={setPayload} height={140} />
      {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
      <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
