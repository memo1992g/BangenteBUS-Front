"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { ApprovalRulesService } from "@/services/approval-rules.service";

export function ApprovalRulesScreen() {
  const [id, setId] = useState("");
  const [payload, setPayload] = useState("{}");
  const [result, setResult] = useState<any>(null);

  return <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
    <h3 className="text-lg font-semibold">Reglas de Aprobación</h3>
    <div className="flex flex-wrap gap-2">
      <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="id" className="rounded-lg border px-3 py-2 text-sm" />
      <button onClick={async()=>setResult(await ApprovalRulesService.list())} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">List</button>
      <button onClick={async()=>setResult(await ApprovalRulesService.create(JSON.parse(payload||"{}")))} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Create</button>
      <button onClick={async()=>setResult(await ApprovalRulesService.update(Number(id), JSON.parse(payload||"{}")))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Update</button>
      <button onClick={async()=>setResult(await ApprovalRulesService.remove(Number(id)))} className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">Delete</button>
      <button onClick={async()=>setResult(await ApprovalRulesService.enterpriseUsers())} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Enterprise users</button>
      <button onClick={async()=>setResult(await ApprovalRulesService.assignRole(JSON.parse(payload||"{}")))} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Assign role</button>
    </div>
    <JsonEditor value={payload} onChange={setPayload} height={130} />
    <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
  </div>;
}
