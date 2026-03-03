import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export class InvestmentService {
  static async listConvocatorias() {
    return http(endpoints.investmentConfig.convocatorias, "GET");
  }

  static async createConvocatoria(data: any) {
    return http(endpoints.investmentConfig.convocatorias, "POST", data);
  }

  static async listInstruments(convocatoriaId?: number) {
    const path = convocatoriaId
      ? `${endpoints.investmentConfig.instruments}?investmentPostId=${convocatoriaId}`
      : endpoints.investmentConfig.instruments;
    return http(path, "GET");
  }

  static async listRates() {
    return http(endpoints.investmentConfig.rates, "GET");
  }

  static async previewResults(csvContent: string) {
    return http(endpoints.investmentOps.resultsPreview, "POST", { csvContent });
  }

  static async processResults(data: any) {
    return http(endpoints.investmentOps.resultsProcess, "POST", data);
  }

  static async getCancelEligible(expirationDate: string) {
    return http(`${endpoints.investmentOps.cancelEligible}?expirationDate=${expirationDate}`, "GET");
  }

  static async executeCancel(data: any) {
    return http(endpoints.investmentOps.cancelExecute, "POST", data);
  }
}
