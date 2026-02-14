import type {
  ApiResponse,
  AssignUserRoleDto,
  CreateRoleDto,
  PermissionsTree,
  RbacRole,
} from "@frontend/types/rbac";

const ADMIN_API_URL = typeof window !== "undefined" 
  ? (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:7100")
  : "http://localhost:7100";

// Normalize URL: remove trailing slashes and any API path suffixes to get the base API endpoint
const BASE_URL = ADMIN_API_URL.replace(/\/$/, "").replace(/\/v1\/admin\/?$/, "").replace(/\/v1\/?$/, "");

const API_BASE = `${BASE_URL}/v1/rbac`;

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const rbacApi = {
  getPermissionsTree: (
    appType: "admin" | "user" = "admin",
  ): Promise<ApiResponse<PermissionsTree>> =>
    request(`${API_BASE}/permissions/tree?appType=${appType}`),

  getAdminRoles: (): Promise<ApiResponse<RbacRole[]>> => request(`${API_BASE}/admin/roles`),

  getAdminRole: (id: string): Promise<ApiResponse<RbacRole>> =>
    request(`${API_BASE}/admin/roles/${id}`),

  createAdminRole: (data: CreateRoleDto): Promise<ApiResponse<RbacRole>> =>
    request(`${API_BASE}/admin/roles`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateAdminRole: (id: string, data: Partial<CreateRoleDto>): Promise<ApiResponse<RbacRole>> =>
    request(`${API_BASE}/admin/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updateAdminRolePermissions: (
    id: string,
    permissions: Record<string, string[]>,
  ): Promise<ApiResponse<RbacRole>> => {
    return request(`${API_BASE}/admin/roles/${id}/permissions`, {
      method: "PUT",
      body: JSON.stringify(permissions),
    });
  },

  deleteAdminRole: (id: string): Promise<ApiResponse<{ success: boolean }>> =>
    request(`${API_BASE}/admin/roles/${id}`, { method: "DELETE" }),

  getUserRoles: (): Promise<ApiResponse<RbacRole[]>> => request(`${API_BASE}/user/roles`),

  getUserRole: (id: string): Promise<ApiResponse<RbacRole>> =>
    request(`${API_BASE}/user/roles/${id}`),

  createUserRole: (data: CreateRoleDto): Promise<ApiResponse<RbacRole>> =>
    request(`${API_BASE}/user/roles`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateUserRole: (id: string, data: Partial<CreateRoleDto>): Promise<ApiResponse<RbacRole>> =>
    request(`${API_BASE}/user/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updateUserRolePermissions: (
    id: string,
    permissions: Record<string, string[]>,
  ): Promise<ApiResponse<RbacRole>> =>
    request(`${API_BASE}/user/roles/${id}/permissions`, {
      method: "PUT",
      body: JSON.stringify(permissions),
    }),

  deleteUserRole: (id: string): Promise<ApiResponse<{ success: boolean }>> =>
    request(`${API_BASE}/user/roles/${id}`, { method: "DELETE" }),

  getUserRoleAssignment: (
    userId: string,
    appType: "admin" | "webapp" = "webapp",
  ): Promise<ApiResponse<RbacRole>> =>
    request(`${API_BASE}/user/${userId}/role?appType=${appType}`),

  assignUserRole: (
    userId: string,
    data: AssignUserRoleDto,
  ): Promise<ApiResponse<{ success: boolean }>> =>
    request(`${API_BASE}/user/${userId}/role`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
