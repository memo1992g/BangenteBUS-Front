import { notFound } from "next/navigation";
import { modules } from "@/lib/config/modules";
import { ModuleShell } from "@/components/ops/ModuleShell";
import { ActionRunner } from "@/components/ops/ActionRunner";
import { MassPaymentUpload } from "@/components/ops/mass-payments/MassPaymentUpload";
import { ExchangeBalances } from "@/components/ops/exchange/ExchangeBalances";
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

const screenMap: Record<string, React.ComponentType> = {
  "pago-masivo": MassPaymentUpload,
  "exchange-config": ExchangeBalances,
  "exchange-ops": ExchangeBalances,
  "saren": SarenRelay,
  "pago-servicios": PaymentServicesConfig,
  "investment-config": InvestmentConfig,
  "publicity": PublicityConfig,
  "parameters": ParametersConfig,
  "system-messages": MessagesConfig,
  "travel-notices": TravelNoticesConfig,
  "consultas": ConsultasConfig,
  "seguridad": SeguridadConfig,
  "referencias": ReferenciasConfig,
  "certificaciones": CertificacionesConfig,
  "apertura-cuentas": AperturaCuentasConfig,
};

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = modules.find((m) => m.id === params.moduleId);
  if (!module) return notFound();

  const ScreenComponent = screenMap[params.moduleId];

  return (
    <ModuleShell title={module.title} description={module.description}>
      <div className="grid gap-4">
        {ScreenComponent && <ScreenComponent />}

        <div className="mt-8 pt-8 border-t border-slate-200">
          <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
            Endpoints disponibles
          </h4>
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
