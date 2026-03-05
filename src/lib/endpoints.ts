export const endpoints = {
  auth: {
    login: "/api/auth/login",
    refresh: "/api/auth/refresh",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
    info: "/api/auth/info",
    test: "/api/auth/test",
  },

  // MassPaymentsAdminRestController → /api/admin/mass-payments
  massPayments: {
    list: "/api/admin/mass-payments",                // GET
    validate: "/api/admin/mass-payments/validate",   // POST
    process: "/api/admin/mass-payments/process",     // POST
  },

  // PaymentServicesAdminRestController → /api/admin/payment-services (CRUD montos recarga)
  paymentServices: {
    list: "/api/admin/payment-services",             // GET
    create: "/api/admin/payment-services",           // POST
    byId: (id: number) => `/api/admin/payment-services/${id}` as const, // GET, PUT, DELETE
  },

  // SarenAdminRestController → /api/admin/saren
  saren: {
    relay: "/api/admin/saren/relay",                 // POST
  },

  // ExchangeAdminRestController → /api/admin/exchange
  exchange: {
    balances: "/api/admin/exchange/balances",         // GET, PUT
    rates: "/api/admin/exchange/rates",               // GET, PUT
    commissions: "/api/admin/exchange/commissions",   // GET, PUT
    channels: "/api/admin/exchange/channels",         // GET, PUT
    parameters: "/api/admin/exchange/parameters",     // GET, PUT
  },

  // ExchangeOpsAdminRestController → /api/admin/exchange-ops
  exchangeOps: {
    intervention: "/api/admin/exchange-ops/intervention",   // POST
    retail: "/api/admin/exchange-ops/retail",               // POST
    desk: "/api/admin/exchange-ops/desk",                   // POST
    substitution: "/api/admin/exchange-ops/substitution",   // POST
    orders: "/api/admin/exchange-ops/orders",               // GET
    reception: "/api/admin/exchange-ops/reception",         // POST
  },

  // ExchangeBcvAdminRestController → /api/admin/exchange/bcv
  exchangeBcv: {
    report: "/api/admin/exchange/bcv/report",                              // GET
    summary: "/api/admin/exchange/bcv/summary",                             // GET
    interventions: "/api/admin/exchange/bcv/interventions",                 // GET
    substitutions: "/api/admin/exchange/bcv/substitutions",                 // GET
    export: "/api/admin/exchange/bcv/export",                               // GET
    exclude: (ref: string) => `/api/admin/exchange/bcv/exclude/${ref}` as const, // POST
  },

  // ExchangeCatalogAdminRestController → /api/admin/exchange/catalog
  exchangeCatalog: {
    sessions: "/api/admin/exchange/catalog/sessions",       // GET, POST, PUT /{id}
    markets: "/api/admin/exchange/catalog/markets",         // GET, POST, PUT /{id}
    balances: "/api/admin/exchange/catalog/balances",       // GET, PUT /{id}
    modalities: "/api/admin/exchange/catalog/modalities",   // GET, POST, PUT /{id}
    products: "/api/admin/exchange/catalog/products",       // GET, POST, PUT /{id}
    currencies: "/api/admin/exchange/catalog/currencies",   // GET, POST, PUT /{id}
  },

  // InvestmentAdminExtendedRestController → /api/admin/investment/config
  investmentConfig: {
    convocatorias: "/api/admin/investment/config/convocatorias",   // GET, POST
    convocatoriaById: (id: number) => `/api/admin/investment/config/convocatorias/${id}` as const, // PUT
    finalizeConvocatoria: (id: number) => `/api/admin/investment/config/convocatorias/${id}/finalize` as const, // POST
    instruments: "/api/admin/investment/config/instruments",       // GET
    instrumentById: (id: number) => `/api/admin/investment/config/instruments/${id}` as const, // PUT
    rates: "/api/admin/investment/config/rates",                   // GET, POST
    rateById: (id: number) => `/api/admin/investment/config/rates/${id}` as const, // PUT
  },

  // InvestmentOrderOpsAdminRestController → /api/admin/investment/order-ops
  investmentOps: {
    resultsPreview: "/api/admin/investment/order-ops/results/preview",     // POST
    resultsProcess: "/api/admin/investment/order-ops/results/process",     // POST
    cancelEligible: "/api/admin/investment/order-ops/cancel/eligible",     // GET
    cancelExecute: "/api/admin/investment/order-ops/cancel/execute",       // POST
    precancel: "/api/admin/investment/order-ops/precancel",                // GET
    precancelById: (id: number) => `/api/admin/investment/order-ops/precancel/${id}` as const, // PUT
  },

  // InvestmentSegmentAdminRestController → /api/admin/investment/segments
  investmentSegments: {
    list: "/api/admin/investment/segments",                    // GET
    customerTypes: "/api/admin/investment/segments/customer-types", // GET
    customers: "/api/admin/investment/segments/customers",     // GET, POST
    customerById: (id: number) => `/api/admin/investment/segments/customers/${id}` as const, // DELETE
  },

  // CampaignsAdminRestController → /api/admin/campaigns
  campaigns: {
    list: "/api/admin/campaigns",                             // GET
    create: "/api/admin/campaigns",                           // POST
    byId: (id: number) => `/api/admin/campaigns/${id}` as const, // GET, PUT, DELETE
  },

  // SystemParamsAdminRestController → /api/admin/system-params
  systemParams: {
    list: "/api/admin/system-params",                         // GET
    create: "/api/admin/system-params",                       // POST
    byId: (id: number) => `/api/admin/system-params/${id}` as const, // GET, PUT, DELETE
  },

  // SystemMessagesAdminRestController → /api/admin/messages
  systemMessages: {
    list: "/api/admin/messages",                              // GET
    create: "/api/admin/messages",                            // POST
    byId: (id: number) => `/api/admin/messages/${id}` as const, // GET, PUT, DELETE
  },

  // NotificationAdminRestController → /api/admin/notifications
  notifications: {
    absenceList: "/api/admin/notifications/absence",          // GET
    absenceCreate: "/api/admin/notifications/absence",        // POST
    absenceExport: "/api/admin/notifications/absence/export", // GET
    absenceById: (id: number) => `/api/admin/notifications/absence/${id}` as const, // DELETE
    menuList: "/api/admin/notifications/menu",                // GET
    menuCreate: "/api/admin/notifications/menu",              // POST
    menuById: (id: number) => `/api/admin/notifications/menu/${id}` as const, // DELETE
  },

  // AdminAuditRestController → /api/admin/audit
  audit: {
    list: "/api/admin/audit",                                 // GET
    byUser: (user: string) => `/api/admin/audit/by-user/${user}` as const, // GET
    byDate: "/api/admin/audit/by-date",                       // GET (query params)
  },

  // AdminProfileRestController → /api/admin/profiles
  profiles: {
    list: "/api/admin/profiles",                              // GET
    create: "/api/admin/profiles",                            // POST
    byId: (id: number) => `/api/admin/profiles/${id}` as const, // GET, PUT, DELETE
    modules: "/api/admin/profiles/modules",                   // GET
    assignModules: (id: number) => `/api/admin/profiles/${id}/modules` as const, // PUT
    assignParameters: (id: number) => `/api/admin/profiles/${id}/parameters` as const, // PUT
  },

  // ClientAdminRestController → /api/admin/clients
  clients: {
    list: "/api/admin/clients",                               // GET
    search: "/api/admin/clients",                             // POST (search by criteria)
  },

  // UserMgmtAdminRestController → /api/admin/users
  users: {
    byDocument: (doc: string) => `/api/admin/users/by-document/${doc}` as const, // GET
    limits: (keycloakId: string) => `/api/admin/users/${keycloakId}/limits` as const, // PUT
    status: (keycloakId: string) => `/api/admin/users/${keycloakId}/status` as const, // PUT
    logs: (keycloakId: string) => `/api/admin/users/${keycloakId}/logs` as const, // GET
    statistics: "/api/admin/users/statistics",                // GET
    export: "/api/admin/users/export",                        // POST
  },

  // SecurityQuestionsAdminRestController → /api/admin/security-questions
  securityQuestions: {
    list: "/api/admin/security-questions",                    // GET
    create: "/api/admin/security-questions",                  // POST
    byId: (id: number) => `/api/admin/security-questions/${id}` as const, // GET, PUT
  },

  // MenuAdminRestController → /api/admin/menu
  menu: {
    list: "/api/admin/menu",                                  // GET
    byId: (id: number) => `/api/admin/menu/${id}` as const,   // GET, PUT
    roles: (id: number) => `/api/admin/menu/${id}/roles` as const, // GET, POST
    removeRole: (roleId: number) => `/api/admin/menu/roles/${roleId}` as const, // DELETE
  },

  // AppMenuAdminRestController → /api/admin/app-menu
  appMenu: {
    list: "/api/admin/app-menu",                              // GET
    byId: (id: number) => `/api/admin/app-menu/${id}` as const, // GET, PUT
    profiles: (id: number) => `/api/admin/app-menu/${id}/profiles` as const, // GET
    updateProfile: (id: number) => `/api/admin/app-menu/profiles/${id}` as const, // PUT
  },

  // ReferencesAdminRestController → /api/admin/references
  references: {
    byDocument: (doc: string) => `/api/admin/references/by-document/${doc}` as const, // GET
  },

  // CertificationsAdminRestController → /api/admin/certifications
  certifications: {
    byDocument: (doc: string) => `/api/admin/certifications/by-document/${doc}` as const, // GET
  },

  // AccountOpeningAdminRestController → /api/admin/account-opening
  accountOpening: {
    batch: "/api/admin/account-opening/batch",                // POST
  },

  // CallCenterRestController → /api/admin/callcenter
  callcenter: {
    questions: "/api/admin/callcenter/questions",             // GET
    absence: "/api/admin/callcenter/absence",                 // POST
  },

  // ApprovalRulesAdminRestController → /api/admin/approval-rules
  approvalRules: {
    list: "/api/admin/approval-rules",                        // GET
    create: "/api/admin/approval-rules",                      // POST
    byId: (id: number) => `/api/admin/approval-rules/${id}` as const, // PUT, DELETE
    enterpriseUsers: "/api/admin/approval-rules/enterprise-users", // GET
    assignRole: "/api/admin/approval-rules/assign-role",      // POST
  },
} as const;
