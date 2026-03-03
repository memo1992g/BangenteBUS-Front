import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BangenteBUS-Front",
  description: "Pantallas genéricas para validar equivalencia operativa contra Bangente BUS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
