import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class MenuIbService {
  static list() { return http<any>(endpoints.menu.list, "GET"); }
  static getById(id: number) { return http<any>(endpoints.menu.byId(id), "GET"); }
  static update(id: number, body: any) { return http<any>(endpoints.menu.byId(id), "PUT", body); }
  static roles(id: number) { return http<any>(endpoints.menu.roles(id), "GET"); }
  static addRole(id: number, body: any) { return http<any>(endpoints.menu.roles(id), "POST", body); }
  static removeRole(roleId: number) { return http<any>(endpoints.menu.removeRole(roleId), "DELETE"); }
}
