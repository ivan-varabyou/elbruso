import { apiClient } from "@frontend/api";

import { CreateUserData, UpdateUserData, UsersFilters } from "../types/users.types";

export const usersApi = {
  async findAll(filters?: UsersFilters) {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.organization_id) params.append("organization_id", String(filters.organization_id));
    if (filters?.role) params.append("role", filters.role);
    if (filters?.is_active !== undefined) params.append("is_active", String(filters.is_active));
    if (filters?.is_approved !== undefined)
      params.append("is_approved", String(filters.is_approved));

    const query = params.toString();
    const url = query ? `users?${query}` : "users";
    const response = await apiClient.get(url);
    return response.data;
  },

  async findById(id: string) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  async create(data: CreateUserData) {
    const response = await apiClient.post("/users", data);
    return response.data;
  },

  async update(id: string, data: UpdateUserData) {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },

  async approve(id: string) {
    const response = await apiClient.patch(`/users/${id}/approve`);
    return response.data;
  },

  async block(id: string, block: boolean = true) {
    const response = await apiClient.patch(`/users/${id}/block`, { block });
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },

  async getOrganizations() {
    const response = await apiClient.get("/reference/organizations");
    return response.data;
  },
};
