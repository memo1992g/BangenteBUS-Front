import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class ExchangeOpsService {
  static orders() { return http<any>(endpoints.exchangeOps.orders, "GET"); }
  static intervention(body: any) { return http<any>(endpoints.exchangeOps.intervention, "POST", body); }
  static retail(body: any) { return http<any>(endpoints.exchangeOps.retail, "POST", body); }
  static desk(body: any) { return http<any>(endpoints.exchangeOps.desk, "POST", body); }
  static substitution(body: any) { return http<any>(endpoints.exchangeOps.substitution, "POST", body); }
  static reception(body: any) { return http<any>(endpoints.exchangeOps.reception, "POST", body); }
}
