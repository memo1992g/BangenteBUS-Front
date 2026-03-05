import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class AbsenceService {
  static list(document: string) { return http<any>(`${endpoints.notifications.absenceList}?document=${document}`, "GET"); }
  static create(body: any) { return http<any>(endpoints.notifications.absenceCreate, "POST", body); }
  static remove(id: number) { return http<any>(endpoints.notifications.absenceById(id), "DELETE"); }
}
