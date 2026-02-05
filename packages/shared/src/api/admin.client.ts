import axios, { AxiosError, AxiosInstance } from "axios";

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:7100/v1/admin";

export function setAdminTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("adminAccessToken", accessToken);
  localStorage.setItem("adminRefreshToken", refreshToken);
}

export function clearAdminTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("adminAccessToken");
  localStorage.removeItem("adminRefreshToken");
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("adminAccessToken");
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminAccessToken");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminRefreshToken");
}

export const adminApiClient: AxiosInstance = axios.create({
  baseURL: ADMIN_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

adminApiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminAccessToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

adminApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          return Promise.reject(error);
        }
        const { data } = await axios.post(`${ADMIN_API_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = data?.accessToken || data?.access_token;
        const newRefreshToken = data?.refreshToken || data?.refresh_token || refreshToken;
        if (newAccessToken) {
          setAdminTokens(newAccessToken, newRefreshToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return adminApiClient(originalRequest);
        }
      } catch {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
