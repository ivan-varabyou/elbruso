import axios from "axios";
import { create } from "zustand";

import { Admin } from "../api/admin.api";
import {
  AdminUsersListResponseDto,
  AdminUserListItemResponseDto,
  CreateAdminUserDto,
  UpdateAdminUserDto,
} from "../api/data-contracts";
import { ErrorHandler } from "../api/error";
import { AdminUser, AdminRole, AppError } from "../types";

const admin = new Admin();

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:7100";

async function updateMeApi(data: { name?: string; password?: string }) {
  const url = `${ADMIN_API_URL}/v1/admin/auth/me`;
  const response = await axios.patch(url, data, {
    withCredentials: true,
  });
  return response;
}

const customUsersApi = {
  getAll: async (params: { page: number; limit: number }): Promise<AdminUsersListResponseDto> => {
    const response = await admin.adminUsersControllerFindAll(params);
    return response.data as unknown as AdminUsersListResponseDto;
  },
  create: async (data: CreateAdminUserDto) => {
    const response = await admin.adminUsersControllerCreate(data);
    return response.data;
  },
  update: async (id: string, data: UpdateAdminUserDto) => {
    const response = await admin.adminUsersControllerUpdate(id, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await admin.adminUsersControllerRemove(id);
    return response.data;
  },
};

function mapDtoToAdminUser(dto: AdminUserListItemResponseDto): AdminUser {
  return {
    id: dto.id,
    email: dto.email,
    name: dto.name,
    role: dto.role as AdminRole,
    is_active: dto.is_active,
    created_at: dto.created_at,
    updated_at: dto.updated_at,
    last_login_at: dto.last_login_at ?? undefined,
  };
}

interface AdminSettingsState {
  users: AdminUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: AppError | null;

  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  createUser: (data: CreateAdminUserDto) => Promise<void>;
  updateUser: (id: string, data: UpdateAdminUserDto) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useAdminSettingsStore = create<AdminSettingsState>((set) => ({
  users: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: null,

  fetchUsers: async (page = 1, limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customUsersApi.getAll({ page, limit });
      // response is AdminUsersListResponseDto which is { success, data: { data, meta }, ... }
      const wrappedData = (response as any).data;
      const users = Array.isArray(wrappedData?.data) ? wrappedData.data.map(mapDtoToAdminUser) : [];
      const meta = wrappedData?.meta || { page, limit, total: 0, totalPages: 0 };
      set({ users, pagination: meta, isLoading: false });
    } catch (error) {
      set({ error: ErrorHandler.handle(error), isLoading: false });
    }
  },

  createUser: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await customUsersApi.create(data);
      const response = await customUsersApi.getAll({ page: 1, limit: 20 });
      const wrappedData = (response as any).data;
      const users = Array.isArray(wrappedData?.data) ? wrappedData.data.map(mapDtoToAdminUser) : [];
      const meta = wrappedData?.meta || { page: 1, limit: 20, total: 0, totalPages: 0 };
      set({ users, pagination: meta, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  updateUser: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await customUsersApi.update(id, data);
      const response = await customUsersApi.getAll({ page: 1, limit: 20 });
      const wrappedData = (response as any).data;
      const users = Array.isArray(wrappedData?.data) ? wrappedData.data.map(mapDtoToAdminUser) : [];
      const meta = wrappedData?.meta || { page: 1, limit: 20, total: 0, totalPages: 0 };
      set({ users, pagination: meta, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await customUsersApi.delete(id);
      const response = await customUsersApi.getAll({ page: 1, limit: 20 });
      const wrappedData = (response as any).data;
      const users = Array.isArray(wrappedData?.data) ? wrappedData.data.map(mapDtoToAdminUser) : [];
      const meta = wrappedData?.meta || { page: 1, limit: 20, total: 0, totalPages: 0 };
      set({ users, pagination: meta, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },
}));
