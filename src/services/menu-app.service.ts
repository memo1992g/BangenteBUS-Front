import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class MenuAppService {
  static list() { return http<any>(endpoints.appMenu.list, "GET"); }
  static getById(id: number) { return http<any>(endpoints.appMenu.byId(id), "GET"); }
  static update(id: number, body: any) { return http<any>(endpoints.appMenu.byId(id), "PUT", body); }
  static profiles(id: number) { return http<any>(endpoints.appMenu.profiles(id), "GET"); }
  static updateProfile(id: number, body: any) { return http<any>(endpoints.appMenu.updateProfile(id), "PUT", body); }
}
