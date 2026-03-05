import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class MessagesService {
  static list() { return http<any[]>(endpoints.systemMessages.list, "GET"); }
  static create(body: any) { return http<any>(endpoints.systemMessages.create, "POST", body); }
  static getById(id: number) { return http<any>(endpoints.systemMessages.byId(id), "GET"); }
  static update(id: number, body: any) { return http<any>(endpoints.systemMessages.byId(id), "PUT", body); }
  static remove(id: number) { return http<any>(endpoints.systemMessages.byId(id), "DELETE"); }
}
