"use client";

import Link from "next/link";
import { ReactNode } from "react";

export function ModuleShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        </div>
        <Link href="/ops" className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
          ← Volver
        </Link>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
