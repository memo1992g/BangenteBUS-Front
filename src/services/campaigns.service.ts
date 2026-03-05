import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class CampaignsService {
  static list() { return http<any[]>(endpoints.campaigns.list, "GET" ); }
  static create(body: any) { return http<any>(endpoints.campaigns.create, "POST", body ); }
  static getById(id: number) { return http<any>(endpoints.campaigns.byId(id), "GET" ); }
  static update(id: number, body: any) { return http<any>(endpoints.campaigns.byId(id), "PUT", body ); }
  static remove(id: number) { return http<any>(endpoints.campaigns.byId(id), "DELETE" ); }
}
