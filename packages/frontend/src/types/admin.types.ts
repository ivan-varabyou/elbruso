import { ApiResponse, PaginatedResponse } from "./api-response";
import { AdminRole } from "./enums";

export { AdminRole };

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string;
}

export interface AdminAuthResponse extends ApiResponse<{ user: AdminUser }> {}

export interface AdminMeResponse extends ApiResponse<AdminUser> {}

export interface AdminUsersListResponse extends PaginatedResponse<AdminUser> {}
