import { notFound } from "next/navigation";
import { modules } from "@/lib/config/modules";
import { ModuleShell } from "@/components/ops/ModuleShell";
import { ActionRunner } from "@/components/ops/ActionRunner";
import { MassPaymentUpload } from "@/components/ops/mass-payments/MassPaymentUpload";
import { SarenRelay } from "@/components/ops/saren/SarenRelay";
import { PaymentServicesConfig } from "@/components/ops/payment-services/PaymentServicesConfig";
import { InvestmentConfig } from "@/components/ops/investment/InvestmentConfig";
import { PublicityConfig } from "@/components/ops/publicity/PublicityConfig";
import { ParametersConfig } from "@/components/ops/parameters/ParametersConfig";
import { MessagesConfig } from "@/components/ops/messages/MessagesConfig";
import { TravelNoticesConfig } from "@/components/ops/travel-notices/TravelNoticesConfig";
import { ConsultasConfig } from "@/components/ops/consultas/ConsultasConfig";
import { SeguridadConfig } from "@/components/ops/seguridad/SeguridadConfig";
import { ReferenciasConfig } from "@/components/ops/referencias/ReferenciasConfig";
import { CertificacionesConfig } from "@/components/ops/certificaciones/CertificacionesConfig";
import { AperturaCuentasConfig } from "@/components/ops/apertura-cuentas/AperturaCuentasConfig";
import { ExchangeConfigScreen } from "@/components/ops/exchange/ExchangeConfigScreen";
import { ExchangeOpsScreen } from "@/components/ops/exchange/ExchangeOpsScreen";
import { ExchangeBcvScreen } from "@/components/ops/exchange/ExchangeBcvScreen";
import { ExchangeCatalogScreen } from "@/components/ops/exchange/ExchangeCatalogScreen";
import { InvestmentOpsScreen } from "@/components/ops/investment/InvestmentOpsScreen";
import { InvestmentSegmentsScreen } from "@/components/ops/investment/InvestmentSegmentsScreen";
import { AuditScreen } from "@/components/ops/audit/AuditScreen";
import { MenuIbScreen } from "@/components/ops/menu/MenuIbScreen";
import { MenuAppScreen } from "@/components/ops/menu/MenuAppScreen";
import { CallCenterScreen } from "@/components/ops/callcenter/CallCenterScreen";
import { ApprovalRulesScreen } from "@/components/ops/approval-rules/ApprovalRulesScreen";

type PageProps = {
  params: { moduleId: string };
  searchParams?: { view?: string };
};

function resolveScreen(moduleId: string, view?: string) {
  const v = view ?? null;
  switch (moduleId) {
    case "pago-masivo":
      return <MassPaymentUpload />;
    case "pago-servicios":
      return <PaymentServicesConfig />;
    case "saren":
      return <SarenRelay />;
    case "exchange-config":
      return <ExchangeConfigScreen view={v} />;
    case "exchange-ops":
      return <ExchangeOpsScreen view={v} />;
    case "exchange-bcv":
      return <ExchangeBcvScreen view={v} />;
    case "exchange-catalog":
      return <ExchangeCatalogScreen view={v} />;
    case "investment-config":
      return <InvestmentConfig />;
    case "investment-ops":
      return <InvestmentOpsScreen view={v} />;
    case "investment-segments":
      return <InvestmentSegmentsScreen view={v} />;
    case "publicity":
      return <PublicityConfig />;
    case "parameters":
      return <ParametersConfig />;
    case "system-messages":
      return <MessagesConfig />;
    case "travel-notices":
      return <TravelNoticesConfig />;
    case "consultas":
      return <ConsultasConfig />;
    case "seguridad":
      return <SeguridadConfig />;
    case "audit":
      return <AuditScreen />;
    case "menu-ib":
      return <MenuIbScreen />;
    case "menu-app":
      return <MenuAppScreen />;
    case "referencias":
      return <ReferenciasConfig />;
    case "certificaciones":
      return <CertificacionesConfig />;
    case "apertura-cuentas":
      return <AperturaCuentasConfig />;
    case "callcenter":
      return <CallCenterScreen />;
    case "approval-rules":
      return <ApprovalRulesScreen />;
    default:
      return null;
  }
}

export default function ModulePage({ params, searchParams }: PageProps) {
  const module = modules.find((m) => m.id === params.moduleId);
  if (!module) return notFound();

  const view = searchParams?.view ?? null;
  const screen = resolveScreen(params.moduleId, view ?? undefined);

  return (
    <ModuleShell title={module.title} description={module.description}>
      <div className="grid gap-4">
        {screen}

        <div className="mt-8 border-t border-slate-200 pt-8">
          <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-500">Endpoints disponibles</h4>
          <div className="grid gap-4">
            {module.actions.map((a) => (
              <ActionRunner key={a.id} action={a} />
            ))}
          </div>
        </div>
      </div>
    </ModuleShell>
  );
}
