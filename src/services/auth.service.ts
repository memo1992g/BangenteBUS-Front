import { endpoints } from "@/lib/endpoints";
import { http, removeAuthToken, setAuthToken } from "@/lib/http";

export class AuthService {
  static async login(username: string, password: string) {
    const res = await http<any>(endpoints.auth.login, "POST", { username, password });
    if (res?.token) setAuthToken(res.token);
    return res;
  }

  static async refresh(refreshToken?: string) {
    return http<any>(endpoints.auth.refresh, "POST", refreshToken ? { refreshToken } : undefined);
  }

  static async logout() {
    const res = await http<any>(endpoints.auth.logout, "POST");
    removeAuthToken();
    return res;
  }

  static async me() {
    return http<any>(endpoints.auth.me, "GET");
  }

  static async info() {
    return http<any>(endpoints.auth.info, "GET");
  }

  static async test() {
    return http<any>(endpoints.auth.test, "GET");
  }
}
