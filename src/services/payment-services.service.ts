import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class PaymentServicesService {
  static list() { return http<any[]>(endpoints.paymentServices.list, "GET"); }
  static create(body: any) { return http<any>(endpoints.paymentServices.create, "POST", body); }
  static getById(id: number) { return http<any>(endpoints.paymentServices.byId(id), "GET"); }
  static update(id: number, body: any) { return http<any>(endpoints.paymentServices.byId(id), "PUT", body); }
  static remove(id: number) { return http<any>(endpoints.paymentServices.byId(id), "DELETE"); }
}
