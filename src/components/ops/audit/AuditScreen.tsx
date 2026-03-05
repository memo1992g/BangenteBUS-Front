"use client";

import { useState } from "react";
import { AuditService } from "@/services/audit.service";

export function AuditScreen() {
  const [user, setUser] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
      <h3 className="text-lg font-semibold">Auditoría</h3>
      <div className="grid gap-2 sm:grid-cols-3">
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="adminUser" className="rounded-lg border px-3 py-2 text-sm" />
        <input value={from} onChange={(e) => setFrom(e.target.value)} type="date" className="rounded-lg border px-3 py-2 text-sm" />
        <input value={to} onChange={(e) => setTo(e.target.value)} type="date" className="rounded-lg border px-3 py-2 text-sm" />
      </div>
      <div className="flex gap-2">
        <button onClick={async()=>setResult(await AuditService.list())} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">List</button>
        <button onClick={async()=>{ try { setError(""); setResult(await AuditService.byUser(user)); } catch(e:any){setError(e.message);} }} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">By user</button>
        <button onClick={async()=>{ try { setError(""); setResult(await AuditService.byDate(from,to)); } catch(e:any){setError(e.message);} }} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">By date</button>
      </div>
      {error ? <div className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{error}</div> : null}
      <pre className="overflow-auto rounded-lg border bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
