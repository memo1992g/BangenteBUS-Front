export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ApiError extends Error {
  constructor(message: string, public status: number, public body?: unknown) {
    super(message);
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

if (!BASE_URL) {
  // eslint-disable-next-line no-console
  console.warn("NEXT_PUBLIC_WEB_API_URL is not set");
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("jwt_token");
}

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("jwt_token", token);
  }
}

export function removeAuthToken() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("jwt_token");
  }
}

export async function http<T>(
  path: string,
  method: HttpMethod,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const token = getAuthToken();
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...((init?.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined,
    cache: "no-store",
    ...init,
  });

  if (res.status === 401 && typeof window !== "undefined" && !path.includes("/api/auth/login")) {
    removeAuthToken();
    window.location.href = "/login";
  }

  const text = await res.text();
  const parsed = text ? safeJsonParse(text) : undefined;

  if (!res.ok) {
    throw new ApiError((parsed as any)?.message || `HTTP ${res.status}`, res.status, parsed ?? text);
  }

  return (parsed as T) ?? (undefined as T);
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
