"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { Admin } from "@frontend/api";
import { clearAdminTokens, isAdminAuthenticated, setAdminTokens } from "@frontend/api/admin.client";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminAuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AdminAuthContextType extends AdminAuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: AdminUser | null) => void;
}

const adminApi = new Admin();

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAuthenticated: isAdminAuthenticated(),
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await adminApi.adminAuthControllerLogin(credentials);
      const data = response.data as unknown as {
        accessToken?: string;
        refreshToken?: string;
        user?: AdminUser;
      };

      if (data?.accessToken && data?.refreshToken) {
        setAdminTokens(data.accessToken, data.refreshToken);
      }

      const userData = data?.user || null;

      setState({
        user: userData,
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

  const logout = useCallback(() => {
    clearAdminTokens();
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

  const setUser = useCallback((user: AdminUser | null) => {
    setState((prev) => ({ ...prev, user }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      clearError,
      setUser,
    }),
    [state, login, logout, clearError, setUser],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
