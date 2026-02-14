import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { API_URL, API_VERSION } from "./config.constant";

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_URL}/${API_VERSION}`,
  timeout: 30000,
  withCredentials: true, // Send cookies (including adminAccessToken) with requests
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken(config);
    if (token && config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      typeof response.data === "object" &&
      "success" in response.data &&
      "data" in response.data
    ) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: Error) => void }> = [];

const processQueue = (error: Error | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

function isAdminRequest(config: InternalAxiosRequestConfig): boolean {
  return config.url?.includes("/admin/") ?? false;
}

function getAccessToken(config?: InternalAxiosRequestConfig): string | null {
  if (typeof window === "undefined") return null;
  // Admin API uses separate axios instance with cookies (admin/client.ts)
  // This client is only for web app user auth
  return localStorage.getItem("accessToken");
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

// Admin tokens are now handled by HttpOnly cookies, not localStorage
// See: packages/frontend/src/api/admin/client.ts

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then((token) => {
            originalRequest.headers?.set("Authorization", `Bearer ${token}`);
            return apiClient(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          isRefreshing = false;
          processQueue(new Error("No refresh token"), null);
          clearTokens();
          if (typeof window !== "undefined") window.location.href = "/login";
          return Promise.reject(error);
        }

        const isAdmin = isAdminRequest(originalRequest);

        if (isAdmin) {
          // Admin API uses separate axios instance with cookies
          // Redirect to login if admin session expired
          isRefreshing = false;
          processQueue(new Error("Admin session expired"), null);
          if (typeof window !== "undefined") window.location.href = "/login";
          return Promise.reject(error);
        } else {
          // Для веб - обычный refresh
          const response = await axios.post(`${API_URL}/${API_VERSION}/auth/refresh`, {
            refreshToken,
          });
          const data = response.data?.data || response.data;
          const newAccessToken = data?.accessToken || data?.access_token;
          const newRefreshToken = data?.refreshToken || data?.refresh_token || refreshToken;
          setTokens(newAccessToken, newRefreshToken);
          isRefreshing = false;
          processQueue(null, newAccessToken);
          originalRequest.headers?.set("Authorization", `Bearer ${newAccessToken}`);
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError as Error, null);
        clearTokens();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
