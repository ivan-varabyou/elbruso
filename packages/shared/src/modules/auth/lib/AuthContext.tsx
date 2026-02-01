"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { LoginDto, RegisterDto } from "../../../api";
import { Auth, clearTokens, isAuthenticated as checkAuth, setTokens } from "../../../api";
import { disconnectProfileSocket, getProfileSocket } from "../../../api/websocket";

// Feature flags - controlled via environment variables
const CONFIG = {
  // WebSocket connection on login (for real-time profile updates)
  WEBSOCKET_ENABLED: process.env.NEXT_PUBLIC_WEBSOCKET_ENABLED === "true",
  // Automatic token refresh before expiry
  TOKEN_REFRESH_ENABLED: process.env.NEXT_PUBLIC_TOKEN_REFRESH_ENABLED !== "false",
};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  role?: string;
  organization_id?: number | null;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginDto) => Promise<void>;
  register: (userData: RegisterDto) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

const authApi = new Auth();
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initAuth = async () => {
      const authenticated = checkAuth();
      if (authenticated) {
        try {
          const response = await authApi.authControllerGetMe();
          setState((prev) => ({
            ...prev,
            user: response.data as unknown as User,
            isAuthenticated: true,
            isLoading: false,
          }));
        } catch (error) {
          console.error("Failed to initialize auth:", error);
          clearTokens();
          setState((prev) => ({
            ...prev,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          }));
        }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    disconnectProfileSocket();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const setUser = useCallback((user: User | null) => {
    setState((prev) => ({ ...prev, user }));
  }, []);

  useEffect(() => {
    if (!state.isAuthenticated) return;

    // Skip token refresh if disabled via config
    if (!CONFIG.TOKEN_REFRESH_ENABLED) return;

    let isRefreshing = false;
    let refreshTimeout: NodeJS.Timeout;

    const scheduleRefresh = (token: string) => {
      try {
        const payload = decodeJwt(token);
        if (!payload || !payload.exp) return;

        const expiryTime = payload.exp * 1000;
        const now = Date.now();
        const timeUntilExpiry = expiryTime - now;

        if (timeUntilExpiry <= 0) {
          doRefresh();
          return;
        }

        const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 30000);
        refreshTimeout = setTimeout(() => {
          doRefresh();
        }, refreshTime);
      } catch (error) {
        console.error("Schedule refresh error:", error);
      }
    };

    const doRefresh = async () => {
      if (isRefreshing) return;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          logout();
          return;
        }

        const response = (await authApi.authControllerRefresh({ refreshToken })) as unknown as {
          data: { accessToken?: string; refreshToken?: string };
        };
        const data = response.data;

        if (data.accessToken) {
          setTokens(data.accessToken, data.refreshToken || refreshToken);
          scheduleRefresh(data.accessToken);
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        logout();
      } finally {
        isRefreshing = false;
      }
    };

    const token = localStorage.getItem("accessToken");
    if (token) {
      scheduleRefresh(token);
    }

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, [state.isAuthenticated, logout]);

  const login = useCallback(async (credentials: LoginDto) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const loginResponse = (await authApi.authControllerLogin(credentials)) as unknown as {
        data: { accessToken?: string; refreshToken?: string };
      };

      if (loginResponse?.data?.accessToken && loginResponse?.data?.refreshToken) {
        setTokens(loginResponse.data.accessToken, loginResponse.data.refreshToken);
      }

      const accessToken = loginResponse.data.accessToken || localStorage.getItem("accessToken");

      if (accessToken && CONFIG.WEBSOCKET_ENABLED) {
        try {
          getProfileSocket(accessToken);
        } catch (wsError) {
          console.warn("WebSocket connection failed, falling back to REST:", wsError);
        }
      }

      const response = await authApi.authControllerGetMe();

      setState({
        user: response.data as unknown as User,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: RegisterDto) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const registerResponse = (await authApi.authControllerRegister(userData)) as unknown as {
        data: { accessToken?: string; refreshToken?: string };
      };

      if (registerResponse?.data?.accessToken && registerResponse?.data?.refreshToken) {
        setTokens(registerResponse.data.accessToken, registerResponse.data.refreshToken);
      }

      const accessToken = registerResponse.data.accessToken || localStorage.getItem("accessToken");

      if (accessToken && CONFIG.WEBSOCKET_ENABLED) {
        try {
          getProfileSocket(accessToken);
        } catch (wsError) {
          console.warn("WebSocket connection failed, falling back to REST:", wsError);
        }
      }

      const response = await authApi.authControllerGetMe();

      setState({
        user: response.data as unknown as User,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function decodeJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
