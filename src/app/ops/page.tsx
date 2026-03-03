import Link from "next/link";
import { modules } from "@/lib/config/modules";

export default function OpsHome() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Operativo</h1>
      <p className="mt-2 text-sm text-slate-600">
        Selecciona un módulo y ejecuta acciones para validar contrato, errores y respuestas.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Link
            key={m.id}
            href={`/ops/${m.id}`}
            className="rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50"
          >
            <div className="text-sm font-semibold">{m.title}</div>
            <div className="mt-1 text-xs text-slate-600">{m.description}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
