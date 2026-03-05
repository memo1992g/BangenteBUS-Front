import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class ApprovalRulesService {
  static list() { return http<any>(endpoints.approvalRules.list, "GET"); }
  static create(body: any) { return http<any>(endpoints.approvalRules.create, "POST", body); }
  static update(id: number, body: any) { return http<any>(endpoints.approvalRules.byId(id), "PUT", body); }
  static remove(id: number) { return http<any>(endpoints.approvalRules.byId(id), "DELETE"); }
  static enterpriseUsers() { return http<any>(endpoints.approvalRules.enterpriseUsers, "GET"); }
  static assignRole(body: any) { return http<any>(endpoints.approvalRules.assignRole, "POST", body); }
}
