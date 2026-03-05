import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class AuditService {
  static list() { return http<any>(endpoints.audit.list, "GET"); }
  static byUser(adminUser: string) { return http<any>(endpoints.audit.byUser(adminUser), "GET"); }
  static byDate(from?: string, to?: string) {
    const query = new URLSearchParams({ ...(from ? { from } : {}), ...(to ? { to } : {}) }).toString();
    return http<any>(query ? `${endpoints.audit.byDate}?${query}` : endpoints.audit.byDate, "GET");
  }
}
