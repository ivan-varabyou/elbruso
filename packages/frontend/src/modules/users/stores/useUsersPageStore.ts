import { RbacRole } from "@frontend/types/rbac";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { usersApi } from "../api/users.api";
import {
  CreateUserData,
  Organization,
  UpdateUserData,
  User,
  UsersFilters,
  UserStatus,
} from "../types/users.types";

interface UsersPageState {
  users: User[];
  organizations: Organization[];
  filters: UsersFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  selectedStatus: UserStatus;
  roles: RbacRole[];
  allWorkspaces: any[];
  isEditorOpen: boolean;

  // Actions
  fetchUsers: () => Promise<void>;
  fetchOrganizations: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  fetchWorkspaces: () => Promise<void>;
  setEditorOpen: (open: boolean) => void;
  createUser: (data: CreateUserData) => Promise<void>;
  updateUser: (id: string, data: UpdateUserData) => Promise<void>;
  approveUser: (id: string) => Promise<void>;
  blockUser: (id: string, block: boolean) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setFilters: (filters: UsersFilters) => void;
  setSelectedStatus: (status: UserStatus) => void;
  setSelectedUser: (user: User | null) => void;
}

const initialState = {
  users: [],
  organizations: [],
  filters: {},
  pagination: { page: 1, limit: 20, total: 0 },
  loading: false,
  error: null,
  selectedUser: null,
  selectedStatus: "all" as UserStatus,
  roles: [],
  allWorkspaces: [],
  isEditorOpen: false,
};

export const useUsersPageStore = create<UsersPageState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        fetchUsers: async () => {
          set({ loading: true, error: null });
          try {
            const { selectedStatus, filters } = get();

            const apiFilters: UsersFilters = { ...filters };

            switch (selectedStatus) {
              case "active":
                apiFilters.is_active = true;
                apiFilters.is_approved = true;
                break;
              case "pending":
                apiFilters.is_active = false;
                apiFilters.is_approved = false;
                break;
              case "blocked":
                apiFilters.is_active = false;
                apiFilters.is_approved = true;
                break;
            }

            const response = await usersApi.findAll(apiFilters);
            const data = (response as any).data || response;
            set({ users: Array.isArray(data) ? data : [], loading: false });
          } catch (error: any) {
            set({ error: error.message, loading: false });
          }
        },

        fetchOrganizations: async () => {
          try {
            const response = await usersApi.getOrganizations();
            const data = (response as any).data || response;
            set({ organizations: Array.isArray(data) ? data : [] });
          } catch (error) {
            console.error("Failed to fetch organizations:", error);
          }
        },

        fetchRoles: async () => {
          try {
            const response = await usersApi.getRoles();
            const data = (response as any).data || response;
            set({ roles: Array.isArray(data) ? data : [] });
          } catch (error) {
            console.error("Failed to fetch roles:", error);
          }
        },

        fetchWorkspaces: async () => {
          try {
            const response = await usersApi.getWorkspaces();
            const data = (response as any).data || response;
            set({ allWorkspaces: Array.isArray(data) ? data : [] });
          } catch (error) {
            console.error("Failed to fetch workspaces:", error);
          }
        },

        setEditorOpen: (open: boolean) => {
          set({ isEditorOpen: open });
        },

        createUser: async (data: CreateUserData) => {
          set({ loading: true, error: null });
          try {
            await usersApi.create(data);
            await get().fetchUsers();
            set({ loading: false });
          } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
          }
        },

        updateUser: async (id: string, data: UpdateUserData) => {
          set({ loading: true, error: null });
          try {
            await usersApi.update(id, data);
            await get().fetchUsers();
            set({ loading: false, selectedUser: null });
          } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
          }
        },

        approveUser: async (id: string) => {
          set({ loading: true, error: null });
          try {
            await usersApi.approve(id);
            await get().fetchUsers();
            set({ loading: false });
          } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
          }
        },

        blockUser: async (id: string, block: boolean) => {
          set({ loading: true, error: null });
          try {
            await usersApi.block(id, block);
            await get().fetchUsers();
            set({ loading: false });
          } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
          }
        },

        deleteUser: async (id: string) => {
          set({ loading: true, error: null });
          try {
            await usersApi.delete(id);
            await get().fetchUsers();
            set({ loading: false });
          } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
          }
        },

        setFilters: (filters: UsersFilters) => {
          set({ filters, pagination: { ...get().pagination, page: 1 } });
          get().fetchUsers();
        },

        setSelectedStatus: (status: UserStatus) => {
          set({ selectedStatus: status, pagination: { ...get().pagination, page: 1 } });
          get().fetchUsers();
        },

        setSelectedUser: (user: User | null) => {
          set({ selectedUser: user });
        },
      }),
      {
        name: "users-page-storage",
        partialize: (state) => ({ filters: state.filters, selectedStatus: state.selectedStatus }),
      },
    ),
    { name: "UsersPageStore" },
  ),
);
