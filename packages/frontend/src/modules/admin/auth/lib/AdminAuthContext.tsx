"use client";

import { isAdminAuthenticated } from "@frontend/api/admin/client";
import { useAdminAuthStore } from "@frontend/stores/useAdminAuth.store";
import { AdminUser } from "@frontend/types";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";

export interface AdminAuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AdminAuthContextType extends AdminAuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    name?: string;
    email?: string;
    password?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => Promise<void>;
  clearError: () => void;
  setUser: (user: AdminUser | null) => void;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: storeLogin,
    logout: storeLogout,
    fetchMe,
    updateProfile,
    setUser,
    clearError,
  } = useAdminAuthStore();

  // Initial fetch to sync with cookies
  useEffect(() => {
    if (!user && isAdminAuthenticated()) {
      fetchMe();
    }
  }, [user, fetchMe]);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      await storeLogin(credentials);
    },
    [storeLogin],
  );

  const logout = useCallback(async () => {
    await storeLogout();
    router.push("/login");
  }, [storeLogout, router]);

  const value = useMemo(
    () => ({
      user: user as AdminUser | null,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
      updateProfile,
      clearError,
      setUser: setUser as (user: AdminUser | null) => void,
    }),
    [user, isAuthenticated, isLoading, error, login, logout, updateProfile, clearError, setUser],
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
