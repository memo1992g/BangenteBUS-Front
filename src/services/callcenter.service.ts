import { endpoints } from "@/lib/endpoints";
import { http } from "@/lib/http";

export class CallCenterService {
  static questions() { return http<any>(endpoints.callcenter.questions, "GET"); }
  static absence(body: any) { return http<any>(endpoints.callcenter.absence, "POST", body); }
}
