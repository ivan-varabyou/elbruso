export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  organization_id: number | null;
  organization_name: string | null;
  role: "ADMIN" | "MANAGER" | "VIEWER";
  is_active: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string | null;
  workspaces?: { id: string; name: string; role: string }[];
}

export interface Organization {
  id: number;
  name_ru: string;
}

export interface UsersFilters {
  search?: string;
  organization_id?: number;
  role?: string;
  is_active?: boolean;
  is_approved?: boolean;
}

export interface CreateUserData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  organization_id: string;
  role: string;
  workspaces?: { id: string; role: string }[];
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  organization_id?: string;
  role?: string;
  is_active?: boolean;
  is_approved?: boolean;
  workspaces?: { id: string; role: string }[];
}

export type UserStatus = "all" | "active" | "pending" | "blocked";
