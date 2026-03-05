import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class ExchangeCatalogService {
  static list(view: keyof typeof endpoints.exchangeCatalog) { return http<any>(endpoints.exchangeCatalog[view], "GET"); }
  static create(view: "sessions"|"markets"|"modalities"|"products"|"currencies", body: any) { return http<any>(endpoints.exchangeCatalog[view], "POST", body); }
  static update(view: keyof typeof endpoints.exchangeCatalog, id: number, body: any) { return http<any>(`${endpoints.exchangeCatalog[view]}/${id}`, "PUT", body); }
}
