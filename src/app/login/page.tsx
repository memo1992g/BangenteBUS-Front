"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { http, setAuthToken } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await http<any>(endpoints.auth.login, "POST", {
        username,
        password,
      });

      if (res.success && res.token) {
        setAuthToken(res.token);
        router.push("/ops");
      } else {
        setError(res.message || "Error de autenticación");
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Bangente Backoffice</h1>
        
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Usuario LDAP
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors mt-6"
          >
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}
