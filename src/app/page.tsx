import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Bangente Ops UI</h1>
      <p className="mt-2 text-slate-600">
        Pantallas genéricas para validar/migrar equivalencia operativa contra Bangente BUS.
      </p>
      <div className="mt-6">
        <Link className="rounded-xl bg-slate-900 px-4 py-2 text-white" href="/ops">
          Ir a Operativo →
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-4 text-sm text-slate-700 shadow-sm">
        <div className="font-semibold">Config rápida</div>
        <ul className="mt-2 list-disc pl-5">
          <li>
            Copiá <span className="font-mono">.env.example</span> a{" "}
            <span className="font-mono">.env.local</span> y definí{" "}
            <span className="font-mono">NEXT_PUBLIC_WEB_API_URL</span>.
          </li>
          <li>
            Luego: <span className="font-mono">npm i</span> y{" "}
            <span className="font-mono">npm run dev</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
