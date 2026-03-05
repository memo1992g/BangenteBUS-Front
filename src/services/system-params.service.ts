import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class SystemParamsService {
  static list() { return http<any[]>(endpoints.systemParams.list, "GET"); }
  static create(body: any) { return http<any>(endpoints.systemParams.create, "POST", body); }
  static getById(id: number) { return http<any>(endpoints.systemParams.byId(id), "GET"); }
  static update(id: number, body: any) { return http<any>(endpoints.systemParams.byId(id), "PUT", body); }
  static remove(id: number) { return http<any>(endpoints.systemParams.byId(id), "DELETE"); }
}
