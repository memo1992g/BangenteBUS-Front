"use client";

import { useState } from "react";
import { ExchangeService } from "@/services/exchange.service";
import { StatusBadge } from "../StatusBadge";

export function ExchangeBalances() {
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<any>(null);
  const [error, setError] = useState("");

  const loadBalances = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await ExchangeService.getBalances();
      setBalances(data);
    } catch (e: any) {
      setError(e.message || "Error loading balances");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Balances de Exchange</h3>
        <button
          onClick={loadBalances}
          disabled={loading}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Cargar Balances"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {balances && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(balances).map(([key, value]: [string, any]) => (
            <div key={key} className="p-4 bg-slate-50 rounded-xl border">
              <div className="text-xs text-slate-500 uppercase tracking-wider">{key}</div>
              <div className="text-lg font-medium mt-1">{JSON.stringify(value)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
