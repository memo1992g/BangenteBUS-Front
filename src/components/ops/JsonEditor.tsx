"use client";

export function JsonEditor({
  value,
  onChange,
  height = 220,
}: {
  value: string;
  onChange: (v: string) => void;
  height?: number;
}) {
  return (
    <textarea
      className="w-full rounded-xl border bg-white p-3 font-mono text-xs leading-5 outline-none focus:ring-2 focus:ring-slate-200"
      style={{ height }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
    />
  );
}
//
