"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { MenuIbService } from "@/services/menu-ib.service";

export function MenuIbScreen() {
  const [id, setId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [payload, setPayload] = useState("{}");
  const [result, setResult] = useState<any>(null);

  return <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
    <h3 className="text-lg font-semibold">Menú IB</h3>
    <div className="flex flex-wrap gap-2">
      <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="menu id" className="rounded-lg border px-3 py-2 text-sm" />
      <input value={roleId} onChange={(e)=>setRoleId(e.target.value)} placeholder="role id" className="rounded-lg border px-3 py-2 text-sm" />
      <button onClick={async()=>setResult(await MenuIbService.list())} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">List</button>
      <button onClick={async()=>setResult(await MenuIbService.getById(Number(id)))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Get</button>
      <button onClick={async()=>setResult(await MenuIbService.update(Number(id), JSON.parse(payload||"{}")))} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Put</button>
      <button onClick={async()=>setResult(await MenuIbService.roles(Number(id)))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Roles</button>
      <button onClick={async()=>setResult(await MenuIbService.addRole(Number(id), JSON.parse(payload||"{}")))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Add role</button>
      <button onClick={async()=>setResult(await MenuIbService.removeRole(Number(roleId)))} className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">Delete role</button>
    </div>
    <JsonEditor value={payload} onChange={setPayload} height={130} />
    <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
  </div>;
}
