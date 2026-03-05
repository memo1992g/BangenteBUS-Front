"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/ops/JsonEditor";

export function PendingIntegrationPanel({ title }: { title: string }) {
  const [payload, setPayload] = useState('{\n  "example": true\n}');
  const [message, setMessage] = useState("");

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-amber-700">Pendiente de integrar endpoint</p>
      <div className="mt-4">
        <JsonEditor value={payload} onChange={setPayload} height={180} />
      </div>
      <button
        className="mt-3 rounded-xl bg-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        onClick={() => setMessage("Endpoint pendiente")}
      >
        Ejecutar
      </button>
      {message ? <div className="mt-3 rounded-lg bg-amber-50 p-2 text-sm text-amber-800">{message}</div> : null}
    </div>
  );
}
