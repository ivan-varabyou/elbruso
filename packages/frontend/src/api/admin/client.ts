import axios from "axios";

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:7100/v1/admin/";

export const apiClient = axios.create({
  baseURL: ADMIN_API_URL,
  withCredentials: true,
});

// Add 401 interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        clearAdminTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

const ADMIN_LOGGED_IN_KEY = "admin_logged_in";

export function getAdminTokens(): { accessToken: string | null; refreshToken: string | null } {
  // Tokens are now handled by HttpOnly cookies, so we don't access them here
  return { accessToken: null, refreshToken: null };
}

export function setAdminTokens(_accessToken: string, _refreshToken: string): void {
  if (typeof window === "undefined") return;
  // Tokens are set via Set-Cookie header from backend
  localStorage.setItem(ADMIN_LOGGED_IN_KEY, "true");
}

export function clearAdminTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_LOGGED_IN_KEY);
  // Cookies are cleared by backend logout, or manually if needed via document.cookie (if not HttpOnly)
  // But our tokens are HttpOnly, so backend MUST clear them.
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_LOGGED_IN_KEY) === "true";
}

export async function adminRefreshToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const baseUrl = ADMIN_API_URL.replace(/\/+$/, "");
  // Ensure we don't double up /v1/admin
  let path = "/v1/admin/auth/refresh";
  if (baseUrl.endsWith("/v1/admin")) {
    path = "/auth/refresh";
  } else if (baseUrl.endsWith("/v1")) {
    path = "/admin/auth/refresh";
  }

  const url = `${baseUrl}${path}`.replace(/([^:])\/\//g, "$1/");

  const { data } = await axios.post(
    url,
    {}, // Refresh token is now in cookies
    { withCredentials: true },
  );

  const responseData = data;

  return {
    accessToken: responseData.accessToken || responseData.access_token,
    refreshToken: responseData.refreshToken || responseData.refresh_token || refreshToken,
  };
}
