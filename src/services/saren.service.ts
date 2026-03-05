import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class SarenService {
  static relay(date: string) { return http<any>(endpoints.saren.relay, "POST", { date }); }
}
