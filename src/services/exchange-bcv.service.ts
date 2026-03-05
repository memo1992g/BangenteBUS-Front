import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class ExchangeBcvService {
  static report() { return http<any>(endpoints.exchangeBcv.report, "GET"); }
  static summary() { return http<any>(endpoints.exchangeBcv.summary, "GET"); }
  static interventions() { return http<any>(endpoints.exchangeBcv.interventions, "GET"); }
  static substitutions() { return http<any>(endpoints.exchangeBcv.substitutions, "GET"); }
  static exportData() { return http<any>(endpoints.exchangeBcv.export, "GET"); }
  static exclude(orderReference: string) { return http<any>(endpoints.exchangeBcv.exclude(orderReference), "POST"); }
}
