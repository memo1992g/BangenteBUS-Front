import { endpoints } from "@/lib/endpoints";
import type { ModuleConfig } from "@/lib/types";

export const modules: ModuleConfig[] = [
  {
    id: "pago-masivo",
    title: "Pagos Masivos",
    description: "Carga, validación y procesamiento de archivos de pago masivo.",
    actions: [
      { id: "list", label: "Listar Pagos (GET)", method: "GET", path: endpoints.massPayments.list },
      { id: "validate", label: "Validar Archivo (POST)", method: "POST", path: endpoints.massPayments.validate, requestTemplate: {} },
      { id: "process", label: "Procesar Archivo (POST)", method: "POST", path: endpoints.massPayments.process, requestTemplate: {} },
    ],
  },
  {
    id: "pago-servicios",
    title: "Pagos de Servicios (Montos Recarga)",
    description: "CRUD de montos de recarga permitidos por operadora.",
    actions: [
      { id: "list", label: "Listar Montos (GET)", method: "GET", path: endpoints.paymentServices.list },
      { id: "create", label: "Crear Monto (POST)", method: "POST", path: endpoints.paymentServices.create, requestTemplate: { operatorCode: "", amount: 0, active: true } },
    ],
  },
  {
    id: "saren",
    title: "Contingencia SAREN",
    description: "Envío de archivo de contingencia a SAREN por fecha.",
    actions: [
      { id: "relay", label: "Enviar Archivo (POST)", method: "POST", path: endpoints.saren.relay, requestTemplate: { date: "" } },
    ],
  },
  {
    id: "exchange-config",
    title: "Divisas - Configuración",
    description: "Gestión de balances, tasas, comisiones, canales y parámetros de divisas.",
    actions: [
      { id: "balances", label: "Balances (GET)", method: "GET", path: endpoints.exchange.balances },
      { id: "rates", label: "Tasas (GET)", method: "GET", path: endpoints.exchange.rates },
      { id: "commissions", label: "Comisiones (GET)", method: "GET", path: endpoints.exchange.commissions },
      { id: "channels", label: "Canales (GET)", method: "GET", path: endpoints.exchange.channels },
      { id: "parameters", label: "Parámetros (GET)", method: "GET", path: endpoints.exchange.parameters },
    ],
  },
  {
    id: "exchange-ops",
    title: "Divisas - Operaciones",
    description: "Intervención, menudeo, mesa de cambio, sustituciones y recepción.",
    actions: [
      { id: "orders", label: "Órdenes (GET)", method: "GET", path: endpoints.exchangeOps.orders },
      { id: "intervention", label: "Intervención (POST)", method: "POST", path: endpoints.exchangeOps.intervention, requestTemplate: {} },
      { id: "retail", label: "Menudeo (POST)", method: "POST", path: endpoints.exchangeOps.retail, requestTemplate: {} },
      { id: "desk", label: "Mesa de Cambio (POST)", method: "POST", path: endpoints.exchangeOps.desk, requestTemplate: {} },
      { id: "substitution", label: "Sustitución (POST)", method: "POST", path: endpoints.exchangeOps.substitution, requestTemplate: {} },
      { id: "reception", label: "Recepción (POST)", method: "POST", path: endpoints.exchangeOps.reception, requestTemplate: {} },
    ],
  },
  {
    id: "exchange-bcv",
    title: "Divisas - Reportes BCV",
    description: "Reportes al BCV, intervenciones y sustituciones.",
    actions: [
      { id: "report", label: "Reporte BCV (GET)", method: "GET", path: endpoints.exchangeBcv.report },
      { id: "interventions", label: "Intervenciones BCV (GET)", method: "GET", path: endpoints.exchangeBcv.interventions },
      { id: "substitutions", label: "Sustituciones BCV (GET)", method: "GET", path: endpoints.exchangeBcv.substitutions },
    ],
  },
  {
    id: "exchange-catalog",
    title: "Divisas - Tablas / Catálogo",
    description: "Sesiones, mercados, modalidades, productos, monedas.",
    actions: [
      { id: "sessions", label: "Sesiones (GET)", method: "GET", path: endpoints.exchangeCatalog.sessions },
      { id: "markets", label: "Exchange Markets (GET)", method: "GET", path: endpoints.exchangeCatalog.markets },
      { id: "balances", label: "Balances Catálogo (GET)", method: "GET", path: endpoints.exchangeCatalog.balances },
      { id: "modalities", label: "Modalidades (GET)", method: "GET", path: endpoints.exchangeCatalog.modalities },
      { id: "products", label: "Productos (GET)", method: "GET", path: endpoints.exchangeCatalog.products },
      { id: "currencies", label: "Monedas (GET)", method: "GET", path: endpoints.exchangeCatalog.currencies },
    ],
  },
  {
    id: "investment-config",
    title: "Inversiones - Convocatorias",
    description: "Crear, editar y finalizar convocatorias de títulos de cobertura.",
    actions: [
      { id: "convocatorias", label: "Convocatorias (GET)", method: "GET", path: endpoints.investmentConfig.convocatorias },
      { id: "create-convocatoria", label: "Crear Convocatoria (POST)", method: "POST", path: endpoints.investmentConfig.convocatorias, requestTemplate: {} },
      { id: "instruments", label: "Instrumentos (GET)", method: "GET", path: endpoints.investmentConfig.instruments },
      { id: "rates", label: "Tasas (GET)", method: "GET", path: endpoints.investmentConfig.rates },
      { id: "create-rate", label: "Crear Tasa (POST)", method: "POST", path: endpoints.investmentConfig.rates, requestTemplate: {} },
    ],
  },
  {
    id: "investment-ops",
    title: "Inversiones - Operaciones",
    description: "Preview/carga de resultados, cancelación y pre-cancelación.",
    actions: [
      { id: "results-preview", label: "Preview Resultados (POST)", method: "POST", path: endpoints.investmentOps.resultsPreview, requestTemplate: {} },
      { id: "results-process", label: "Procesar Resultados (POST)", method: "POST", path: endpoints.investmentOps.resultsProcess, requestTemplate: {} },
      { id: "cancel-eligible", label: "Órdenes Cancelables (GET)", method: "GET", path: endpoints.investmentOps.cancelEligible },
      { id: "cancel-execute", label: "Ejecutar Cancelación (POST)", method: "POST", path: endpoints.investmentOps.cancelExecute, requestTemplate: {} },
      { id: "precancel", label: "Pre-Cancelar (GET)", method: "GET", path: endpoints.investmentOps.precancel },
    ],
  },
  {
    id: "investment-segments",
    title: "Inversiones - Segmentación",
    description: "Segmentos, tipos de cliente y clientes asignados.",
    actions: [
      { id: "segments", label: "Segmentos (GET)", method: "GET", path: endpoints.investmentSegments.list },
      { id: "customer-types", label: "Tipos de Cliente (GET)", method: "GET", path: endpoints.investmentSegments.customerTypes },
      { id: "customers", label: "Clientes por Segmento (GET)", method: "GET", path: endpoints.investmentSegments.customers },
    ],
  },
  {
    id: "publicity",
    title: "Publicidad / Campañas",
    description: "CRUD de campañas publicitarias y banners.",
    actions: [
      { id: "list", label: "Listar Campañas (GET)", method: "GET", path: endpoints.campaigns.list },
      { id: "create", label: "Crear Campaña (POST)", method: "POST", path: endpoints.campaigns.create, requestTemplate: {} },
    ],
  },
  {
    id: "parameters",
    title: "Parámetros del Sistema",
    description: "CRUD de parámetros globales del sistema.",
    actions: [
      { id: "list", label: "Listar Parámetros (GET)", method: "GET", path: endpoints.systemParams.list },
      { id: "create", label: "Crear Parámetro (POST)", method: "POST", path: endpoints.systemParams.create, requestTemplate: { key: "", value: "", description: "" } },
    ],
  },
  {
    id: "system-messages",
    title: "Mensajes del Sistema",
    description: "CRUD de mensajes de error y notificaciones.",
    actions: [
      { id: "list", label: "Listar Mensajes (GET)", method: "GET", path: endpoints.systemMessages.list },
      { id: "create", label: "Crear Mensaje (POST)", method: "POST", path: endpoints.systemMessages.create, requestTemplate: {} },
    ],
  },
  {
    id: "travel-notices",
    title: "Notificaciones de Ausencia (Avisos de Viaje)",
    description: "Consulta, creación y exportación de avisos de viaje.",
    actions: [
      { id: "list", label: "Listar (GET)", method: "GET", path: `${endpoints.notifications.absenceList}?document=V12345678` },
      { id: "create", label: "Crear (POST)", method: "POST", path: endpoints.notifications.absenceCreate, requestTemplate: {} },
      { id: "export", label: "Exportar (GET)", method: "GET", path: endpoints.notifications.absenceExport },
    ],
  },
  {
    id: "consultas",
    title: "Consultas - Clientes",
    description: "Búsqueda de clientes y gestión de usuarios IB.",
    actions: [
      { id: "clientes", label: "Consulta Clientes (GET)", method: "GET", path: endpoints.clients.list },
      { id: "statistics", label: "Estadísticas Usuarios (GET)", method: "GET", path: endpoints.users.statistics },
    ],
  },
  {
    id: "audit",
    title: "Bitácora / Auditoría",
    description: "Log de acciones administrativas.",
    actions: [
      { id: "list", label: "Listar Auditoría (GET)", method: "GET", path: endpoints.audit.list },
      { id: "by-date", label: "Por Fecha (GET)", method: "GET", path: endpoints.audit.byDate },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad y Accesos",
    description: "Perfiles de acceso y preguntas de desafío.",
    actions: [
      { id: "profiles", label: "Perfiles (GET)", method: "GET", path: endpoints.profiles.list },
      { id: "modules", label: "Módulos Disponibles (GET)", method: "GET", path: endpoints.profiles.modules },
      { id: "preguntas", label: "Preguntas Desafío (GET)", method: "GET", path: endpoints.securityQuestions.list },
    ],
  },
  {
    id: "menu-ib",
    title: "Menú Internet Banking",
    description: "Gestión de opciones del menú de Internet Banking.",
    actions: [
      { id: "list", label: "Listar Opciones (GET)", method: "GET", path: endpoints.menu.list },
    ],
  },
  {
    id: "menu-app",
    title: "Menú App Móvil",
    description: "Gestión de opciones del menú de la app móvil.",
    actions: [
      { id: "list", label: "Listar Opciones (GET)", method: "GET", path: endpoints.appMenu.list },
    ],
  },
  {
    id: "referencias",
    title: "Referencias Bancarias",
    description: "Consulta de referencias bancarias por documento.",
    actions: [
      { id: "search", label: "Buscar por Documento (GET)", method: "GET", path: endpoints.references.byDocument("V12345678") },
    ],
  },
  {
    id: "certificaciones",
    title: "Certificación de Cuenta",
    description: "Consulta de certificaciones de cuenta por documento.",
    actions: [
      { id: "search", label: "Buscar por Documento (GET)", method: "GET", path: endpoints.certifications.byDocument("V12345678") },
    ],
  },
  {
    id: "apertura-cuentas",
    title: "Apertura de Cuentas",
    description: "Carga masiva de archivos para apertura de cuentas.",
    actions: [
      { id: "batch", label: "Carga Masiva (POST)", method: "POST", path: endpoints.accountOpening.batch, requestTemplate: {} },
    ],
  },
  {
    id: "callcenter",
    title: "Call Center",
    description: "Preguntas de seguridad y ausencias para call center.",
    actions: [
      { id: "questions", label: "Preguntas (GET)", method: "GET", path: endpoints.callcenter.questions },
      { id: "absence", label: "Crear Ausencia (POST)", method: "POST", path: endpoints.callcenter.absence, requestTemplate: {} },
    ],
  },
  {
    id: "approval-rules",
    title: "Reglas de Aprobación",
    description: "Gestión de reglas de aprobación y usuarios empresariales.",
    actions: [
      { id: "list", label: "Listar Reglas (GET)", method: "GET", path: endpoints.approvalRules.list },
      { id: "enterprise-users", label: "Usuarios Empresariales (GET)", method: "GET", path: endpoints.approvalRules.enterpriseUsers },
      { id: "create", label: "Crear Regla (POST)", method: "POST", path: endpoints.approvalRules.create, requestTemplate: {} },
    ],
  },
];
