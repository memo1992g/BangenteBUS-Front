import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class InvestmentOpsService {
  static resultsPreview(body: any) { return http<any>(endpoints.investmentOps.resultsPreview, "POST", body); }
  static resultsProcess(body: any) { return http<any>(endpoints.investmentOps.resultsProcess, "POST", body); }
  static cancelEligible(expirationDate?: string) {
    const path = expirationDate ? `${endpoints.investmentOps.cancelEligible}?expirationDate=${expirationDate}` : endpoints.investmentOps.cancelEligible;
    return http<any>(path, "GET");
  }
  static cancelExecute(body: any) { return http<any>(endpoints.investmentOps.cancelExecute, "POST", body); }
  static precancel() { return http<any>(endpoints.investmentOps.precancel, "GET"); }
  static precancelUpdate(orderId: number, body: any) { return http<any>(endpoints.investmentOps.precancelById(orderId), "PUT", body); }
}
