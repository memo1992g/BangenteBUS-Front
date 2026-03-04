"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type NavItem = { label: string; href: string };
type NavSection = { title: string; items: NavItem[] };

const sections: NavSection[] = [
  { title: "Consultas", items: [{ label: "Consulta Clientes", href: "/ops/consultas" }] },
  { title: "Seguridad", items: [{ label: "Accesos y Preguntas", href: "/ops/seguridad" }] },
  {
    title: "Mantenimiento",
    items: [
      { label: "Publicidad", href: "/ops/publicity" },
      { label: "Parameters", href: "/ops/parameters" },
      { label: "System Messages", href: "/ops/system-messages" },
      { label: "Menú IB", href: "/ops/menu-ib" },
      { label: "Menú App", href: "/ops/menu-app" },
    ],
  },
  {
    title: "Mantenimiento Divisas · Configuración",
    items: [
      { label: "Balances", href: "/ops/exchange-config?view=balances" },
      { label: "Rates", href: "/ops/exchange-config?view=rates" },
      { label: "Commissions", href: "/ops/exchange-config?view=commissions" },
      { label: "Channels", href: "/ops/exchange-config?view=channels" },
      { label: "Parameters", href: "/ops/exchange-config?view=parameters" },
    ],
  },
  {
    title: "Mantenimiento Divisas · Operaciones",
    items: [
      { label: "Orders", href: "/ops/exchange-ops?view=orders" },
      { label: "Intervention", href: "/ops/exchange-ops?view=intervention" },
      { label: "Retail", href: "/ops/exchange-ops?view=retail" },
      { label: "Desk", href: "/ops/exchange-ops?view=desk" },
      { label: "Substitution", href: "/ops/exchange-ops?view=substitution" },
      { label: "Reception", href: "/ops/exchange-ops?view=reception" },
    ],
  },
  {
    title: "Mantenimiento Divisas · BCV",
    items: [
      { label: "Report", href: "/ops/exchange-bcv?view=report" },
      { label: "Interventions", href: "/ops/exchange-bcv?view=interventions" },
      { label: "Substitutions", href: "/ops/exchange-bcv?view=substitutions" },
    ],
  },
  {
    title: "Mantenimiento Divisas · Catálogo",
    items: [
      { label: "Sessions", href: "/ops/exchange-catalog?view=sessions" },
      { label: "Markets", href: "/ops/exchange-catalog?view=markets" },
      { label: "Balances", href: "/ops/exchange-catalog?view=balances" },
      { label: "Modalities", href: "/ops/exchange-catalog?view=modalities" },
      { label: "Products", href: "/ops/exchange-catalog?view=products" },
      { label: "Currencies", href: "/ops/exchange-catalog?view=currencies" },
    ],
  },
  {
    title: "Mantenimiento Inversiones · Config",
    items: [
      { label: "Convocatorias", href: "/ops/investment-config?view=convocatorias" },
      { label: "Instruments", href: "/ops/investment-config?view=instruments" },
      { label: "Rates", href: "/ops/investment-config?view=rates" },
    ],
  },
  {
    title: "Mantenimiento Inversiones · Operaciones",
    items: [
      { label: "Results Preview", href: "/ops/investment-ops?view=results-preview" },
      { label: "Results Process", href: "/ops/investment-ops?view=results-process" },
      { label: "Cancel Eligible", href: "/ops/investment-ops?view=cancel-eligible" },
      { label: "Cancel Execute", href: "/ops/investment-ops?view=cancel-execute" },
      { label: "Precancel", href: "/ops/investment-ops?view=precancel" },
    ],
  },
  {
    title: "Mantenimiento Inversiones · Segmentación",
    items: [
      { label: "Segments", href: "/ops/investment-segments?view=segments" },
      { label: "Customer Types", href: "/ops/investment-segments?view=customer-types" },
      { label: "Customers", href: "/ops/investment-segments?view=customers" },
    ],
  },
  {
    title: "Resto",
    items: [
      { label: "Auditoría", href: "/ops/audit" },
      { label: "Notificación de Viaje", href: "/ops/travel-notices" },
      { label: "Referencias", href: "/ops/referencias" },
      { label: "Certificación", href: "/ops/certificaciones" },
      { label: "Pagos Servicios", href: "/ops/pago-servicios" },
      { label: "Apertura de Cuentas", href: "/ops/apertura-cuentas" },
      { label: "Contingencia Saren", href: "/ops/saren" },
      { label: "Pagos Masivos", href: "/ops/pago-masivo" },
      { label: "Call Center", href: "/ops/callcenter" },
      { label: "Reglas de Aprobación", href: "/ops/approval-rules" },
    ],
  },
];

function isActive(href: string, pathname: string, query: string) {
  const [path, qs] = href.split("?");
  if (pathname !== path) return false;
  if (!qs) return true;
  return query.includes(qs);
}

export function OpsSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return (
    <aside className="h-screen overflow-y-auto border-r bg-white p-4">
      <Link href="/ops" className="mb-4 block rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">
        Bangente Ops
      </Link>
      <nav className="space-y-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href, pathname, query);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
