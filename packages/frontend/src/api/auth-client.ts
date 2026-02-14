import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7100/v1";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});

// Add 401 interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        clearTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

const LOGGED_IN_KEY = "logged_in";

export function getTokens(): { accessToken: string | null; refreshToken: string | null } {
  // Tokens are now handled by HttpOnly cookies, so we don't access them here
  return { accessToken: null, refreshToken: null };
}

export function setTokens(_accessToken: string, _refreshToken: string): void {
  if (typeof window === "undefined") return;
  // Tokens are set via Set-Cookie header from backend
  localStorage.setItem(LOGGED_IN_KEY, "true");
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOGGED_IN_KEY);
  // Cookies are cleared by backend logout
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LOGGED_IN_KEY) === "true";
}
