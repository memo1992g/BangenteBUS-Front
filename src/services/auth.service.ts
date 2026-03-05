import { endpoints } from "@/lib/endpoints";
import { http, removeAuthToken, setAuthToken } from "@/lib/http";

export function extractTokenFromAuthResponse(payload: any): string | null {
  if (!payload) return null;

  if (typeof payload.token === "string" && payload.token) return payload.token;
  if (typeof payload.access_token === "string" && payload.access_token) return payload.access_token;
  if (typeof payload?.data?.token === "string" && payload.data.token) return payload.data.token;
  if (typeof payload?.data?.access_token === "string" && payload.data.access_token)
    return payload.data.access_token;

  return null;
}

export class AuthService {
  static async login(username: string, password: string) {
    const res = await http<any>(endpoints.auth.login, "POST", { username, password });
    const token = extractTokenFromAuthResponse(res);
    if (token) setAuthToken(token);
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
