"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Auth, setTokens, clearTokens, isAuthenticated as checkAuth } from "@/shared/api";
import type { LoginDto, RegisterDto } from "@/shared/api";

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

  useEffect(() => {
    if (!state.isAuthenticated) return;

    const checkAndRefresh = async () => {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!token || !refreshToken) return;

      try {
        const payload = decodeJwt(token);
        if (!payload || !payload.exp) return;

        const expiryTime = payload.exp * 1000;
        const now = Date.now();
        const timeUntilExpiry = expiryTime - now;

        if (timeUntilExpiry < 120000) {
          await authApi.authControllerRefresh({ refreshToken });
        }
      } catch (error) {
        console.error("Silent refresh failed:", error);
      }
    };

    const interval = setInterval(checkAndRefresh, 60000);
    checkAndRefresh();

    return () => clearInterval(interval);
  }, [state.isAuthenticated]);

  const login = useCallback(async (credentials: LoginDto) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const loginResponse = (await authApi.authControllerLogin(credentials)) as unknown as {
        data: { accessToken?: string; refreshToken?: string };
      };

      if (loginResponse?.data?.accessToken && loginResponse?.data?.refreshToken) {
        setTokens(loginResponse.data.accessToken, loginResponse.data.refreshToken);
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

  const logout = useCallback(() => {
    clearTokens();
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
