// Auto-generated types from PostgreSQL schema
// This file will be generated using kysely-codegen

import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

// Core reference tables
export interface Languages {
  id: Generated<number>;
  code: string;
  name: string;
}

export interface Organizations {
  id: Generated<number>;
  name: string;
  internal_code: string | null;
  organization_type_id: number | null;
  parent_organization_id: number | null;
  region_id: number | null;
  sport_id: number | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Users {
  id: Generated<string>; // UUID
  email: string;
  name: string;
  password: string;
  organization_id: number | null;
  is_active: Generated<boolean>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Sessions {
  id: Generated<string>; // UUID
  user_id: string;
  refresh_token: string;
  expires_at: Timestamp;
  created_at: Generated<Timestamp>;
}

export interface ApiKeys {
  id: Generated<string>; // UUID
  user_id: string;
  name: string;
  key_hash: string;
  permissions: string; // JSON
  is_active: Generated<boolean>;
  created_at: Generated<Timestamp>;
  last_used_at: Timestamp | null;
}

// Workspaces and dynamic tables
export interface Workspaces {
  id: Generated<string>; // UUID
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  is_active: Generated<boolean>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface WorkspaceGroups {
  id: Generated<string>; // UUID
  workspace_id: string;
  name: string;
  description: string | null;
  sort_order: Generated<number>;
  created_at: Generated<Timestamp>;
}

export interface DynamicTables {
  id: Generated<string>; // UUID
  workspace_id: string;
  group_id: string | null;
  name: string;
  description: string | null;
  row_count: Generated<number>;
  column_count: Generated<number>;
  created_by: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface TableVersions {
  id: Generated<string>; // UUID
  table_id: string;
  version_number: Generated<number>;
  column_definitions: string; // JSONB
  is_active: Generated<boolean>;
  created_by: string;
  created_at: Generated<Timestamp>;
}

export interface TableCells {
  id: Generated<string>; // UUID
  version_id: string;
  row_index: number;
  col_index: number;
  cell_data: string; // JSONB
  created_by: string;
  updated_by: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

// Permissions
export interface Roles {
  id: Generated<string>; // UUID
  name: string;
  description: string | null;
  is_system_role: Generated<boolean>;
  created_at: Generated<Timestamp>;
}

export interface WorkspacePermissions {
  id: Generated<string>; // UUID
  workspace_id: string;
  user_id: string;
  role: string; // owner, admin, write, read
  created_at: Generated<Timestamp>;
}

// Dashboard & Reports
export interface Pages {
  id: Generated<string>; // UUID
  workspace_id: string;
  parent_page_id: string | null;
  title: string;
  icon: string | null;
  cover_image: string | null;
  page_type: Generated<string>;
  is_public: Generated<boolean>;
  public_url: string | null;
  metadata: string | null; // JSONB
  created_by: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  sort_order: Generated<number>;
}

export interface Blocks {
  id: Generated<string>; // UUID
  page_id: string;
  parent_block_id: string | null;
  block_type: string;
  content: string; // JSONB
  settings: string | null; // JSONB
  sort_order: Generated<number>;
  created_by: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Charts {
  id: Generated<string>; // UUID
  workspace_id: string;
  name: string;
  description: string | null;
  data_source_type: string;
  data_source_id: string | null;
  chart_type: string;
  config: string; // JSONB
  cached_data: string | null; // JSONB
  cache_updated_at: Timestamp | null;
  cache_ttl: Generated<number>;
  created_by: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

// Database type combining all tables
export interface Database {
  languages: Languages;
  organizations: Organizations;
  users: Users;
  sessions: Sessions;
  api_keys: ApiKeys;
  workspaces: Workspaces;
  workspace_groups: WorkspaceGroups;
  dynamic_tables: DynamicTables;
  table_versions: TableVersions;
  table_cells: TableCells;
  roles: Roles;
  workspace_permissions: WorkspacePermissions;
  pages: Pages;
  blocks: Blocks;
  charts: Charts;
}
