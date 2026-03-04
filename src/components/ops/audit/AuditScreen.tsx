"use client";

import { PendingIntegrationPanel } from "@/components/ops/shared/PendingIntegrationPanel";

export function AuditScreen() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Auditoría</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Usuario" />
          <input className="rounded-lg border px-3 py-2 text-sm" type="date" />
          <input className="rounded-lg border px-3 py-2 text-sm" type="date" />
        </div>
        <div className="mt-4 rounded-lg border border-dashed p-4 text-sm text-slate-500">Sin resultados (placeholder)</div>
      </div>
      <PendingIntegrationPanel title="Audit · Query" />
    </div>
  );
}
