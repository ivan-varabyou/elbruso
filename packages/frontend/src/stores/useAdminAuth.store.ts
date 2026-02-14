import { Admin } from "@frontend/api";
import { clearAdminTokens, setAdminTokens } from "@frontend/api/admin/client";
import { AdminUser } from "@frontend/types";
import { create } from "zustand";

interface AdminAuthStore {
  // State
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  setUser: (user: AdminUser | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  fetchMe: (force?: boolean) => Promise<void>;
  updateProfile: (data: {
    name?: string;
    email?: string;
    password?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => Promise<void>;
  clearError: () => void;
}

const adminApi = new Admin();

export const useAdminAuthStore = create<AdminAuthStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await adminApi.adminAuthControllerLogin(credentials);
      // Backend returns: { success: true, data: { user: AdminUser }, error: null, meta: {...} }
      const userData = response.data?.data?.user;

      if (userData) {
        set({ user: userData, isAuthenticated: true, isLoading: false });
        // Set the logged_in flag for isAdminAuthenticated() checks
        setAdminTokens("", "");
      } else {
        throw new Error("Не удалось получить данные пользователя");
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      const message = axiosError.response?.data?.message || axiosError.message || "Ошибка входа";
      set({ error: message, isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await adminApi.adminAuthControllerLogout();
    } catch {
      // Ignore errors - user is still logging out
    } finally {
      clearAdminTokens();
      set({ user: null, isAuthenticated: false, error: null });
    }
  },

  fetchMe: async (force = false) => {
    const { isInitialized, isLoading, user } = useAdminAuthStore.getState();

    // Skip if already loading
    if (isLoading) return;

    // Skip if already initialized and not forced, and we have a user
    if (isInitialized && !force && user) return;

    set({ isLoading: true });
    try {
      const response = await adminApi.instance.get("/me");
      const userData = response.data?.data as AdminUser;

      if (userData) {
        set({ user: userData, isAuthenticated: true, isLoading: false, isInitialized: true });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false, isInitialized: true });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false, isInitialized: true });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      // Map frontend fields (e.g. newPassword) to backend expected 'password'
      const updateData = {
        name: data.name,
        password: data.newPassword || data.password,
      };

      const response = await adminApi.instance.patch("/admin/me", updateData);
      const userData = response.data;

      if (userData) {
        set({ user: userData, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      const message =
        axiosError.response?.data?.message || axiosError.message || "Ошибка обновления профиля";
      set({ error: message, isLoading: false });
      throw error;
    }
  },
}));
