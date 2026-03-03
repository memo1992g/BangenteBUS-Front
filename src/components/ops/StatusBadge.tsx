"use client";

export function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium " +
        (ok ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800")
      }
    >
      {ok ? "OK" : "ERROR"}
    </span>
  );
}
