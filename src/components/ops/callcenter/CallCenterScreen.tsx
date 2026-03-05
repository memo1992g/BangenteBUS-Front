"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";
import { CallCenterService } from "@/services/callcenter.service";

export function CallCenterScreen() {
  const [payload, setPayload] = useState("{}");
  const [result, setResult] = useState<any>(null);

  return <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
    <h3 className="text-lg font-semibold">Call Center</h3>
    <div className="flex gap-2">
      <button onClick={async()=>setResult(await CallCenterService.questions())} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">Questions (GET)</button>
      <button onClick={async()=>setResult(await CallCenterService.absence(JSON.parse(payload||"{}")))} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Absence (POST)</button>
    </div>
    <JsonEditor value={payload} onChange={setPayload} height={120} />
    <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
  </div>;
}
