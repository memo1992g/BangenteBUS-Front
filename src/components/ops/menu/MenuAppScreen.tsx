"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { MenuAppService } from "@/services/menu-app.service";

export function MenuAppScreen() {
  const [id, setId] = useState("");
  const [payload, setPayload] = useState("{}");
  const [result, setResult] = useState<any>(null);

  return <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
    <h3 className="text-lg font-semibold">Menú App</h3>
    <div className="flex flex-wrap gap-2">
      <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="id" className="rounded-lg border px-3 py-2 text-sm" />
      <button onClick={async()=>setResult(await MenuAppService.list())} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">List</button>
      <button onClick={async()=>setResult(await MenuAppService.getById(Number(id)))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Get</button>
      <button onClick={async()=>setResult(await MenuAppService.update(Number(id), JSON.parse(payload||"{}")))} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Put</button>
      <button onClick={async()=>setResult(await MenuAppService.profiles(Number(id)))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Profiles</button>
      <button onClick={async()=>setResult(await MenuAppService.updateProfile(Number(id), JSON.parse(payload||"{}")))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Update profile</button>
    </div>
    <JsonEditor value={payload} onChange={setPayload} height={130} />
    <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
  </div>;
}
