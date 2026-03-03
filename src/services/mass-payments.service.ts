import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export class MassPaymentsService {
  static async validate(file: File, additionalData: Record<string, any>) {
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    return http(endpoints.massPayments.validate, "POST", formData, {
      headers: {
        // Fetch will automatically set the correct Content-Type for FormData
        "Content-Type": undefined as any,
      },
    });
  }

  static async process(file: File, additionalData: Record<string, any>) {
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    return http(endpoints.massPayments.process, "POST", formData, {
      headers: {
        "Content-Type": undefined as any,
      },
    });
  }

  static async list(params?: Record<string, any>) {
    const query = params ? new URLSearchParams(params).toString() : "";
    const path = query ? `${endpoints.massPayments.list}?${query}` : endpoints.massPayments.list;
    return http(path, "GET");
  }
}
