import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class InvestmentSegmentsService {
  static list() { return http<any>(endpoints.investmentSegments.list, "GET"); }
  static customerTypes() { return http<any>(endpoints.investmentSegments.customerTypes, "GET"); }
  static customers() { return http<any>(endpoints.investmentSegments.customers, "GET"); }
  static createCustomer(body: any) { return http<any>(endpoints.investmentSegments.customers, "POST", body); }
  static deleteCustomer(id: number) { return http<any>(endpoints.investmentSegments.customerById(id), "DELETE"); }
}
