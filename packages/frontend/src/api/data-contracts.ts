/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RegisterDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "John Doe" */
  name: string;
  /**
   * @minLength 8
   * @example "Password123!"
   */
  password: string;
  organizationId?: string;
  /** @example 1 */
  countryId?: number;
  /** @example "ru" */
  lang?: string;
}

export interface RegisterResponseDto {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  accessToken: string;
  /** @example "def50200a3b7..." */
  refreshToken: string;
  /** @example "15m" */
  expiresIn: string;
}

export interface LoginDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "password123" */
  password: string;
}

export interface LoginResponseDto {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  accessToken: string;
  /** @example "def50200a3b7..." */
  refreshToken: string;
  /** @example "15m" */
  expiresIn: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  accessToken: string;
  /** @example "def50200a3b7..." */
  refreshToken: string;
  /** @example "15m" */
  expiresIn: string;
}

export interface ForgotPasswordDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "ru" */
  lang?: string;
}

export interface MessageResponseDto {
  /** @example "Operation completed successfully" */
  message: string;
}

export interface ResetPasswordDto {
  token: string;
  /**
   * @minLength 8
   * @example "NewPassword123!"
   */
  newPassword: string;
}

export interface TokenValidityResponseDto {
  /** @example true */
  valid: boolean;
}

export interface MeResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "user@example.com" */
  email: string;
  /** @example "Иван" */
  first_name: string;
  /** @example "Иванов" */
  last_name: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example 1 */
  organization_id?: number;
  /** @example "user" */
  role: "admin" | "manager" | "viewer" | "user";
  /** @example true */
  is_active: boolean;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  /**
   * @minLength 8
   * @example "NewPassword123!"
   */
  newPassword: string;
}

export interface UserResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "ivan@example.com" */
  email: string;
  /** @example "Иван" */
  first_name: string;
  /** @example "Иванов" */
  last_name: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example 1 */
  organization_id?: number;
  /** @example "Organization Name" */
  organization_name?: string;
  /** @example "user" */
  role: "admin" | "manager" | "viewer" | "user";
  /** @example true */
  is_active: boolean;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
  workspaces?: any[];
}

export interface UpdateProfileDto {
  /** First name */
  first_name?: string;
  /** Last name */
  last_name?: string;
  /** Middle name */
  middle_name?: string;
}

export interface UserListItemDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "ivan@example.com" */
  email: string;
  /** @example "Иван" */
  first_name: string;
  /** @example "Иванов" */
  last_name: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example 1 */
  organization_id?: number;
  /** @example "Organization Name" */
  organization_name?: string;
  /** @example "user" */
  role: "admin" | "manager" | "viewer" | "user";
  /** @example true */
  is_active: boolean;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface UsersListResponseDto {
  data: UserListItemDto[];
  /** @example 100 */
  total: number;
  /** @example 1 */
  page: number;
  /** @example 10 */
  limit: number;
  /** @example 10 */
  totalPages: number;
}

export interface CreateUserDto {
  /** @example "ivan@example.com" */
  email: string;
  /** @example "securePassword123" */
  password: string;
  /** @example "Иван" */
  first_name: string;
  /** @example "Иванов" */
  last_name: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example "1" */
  organization_id?: string;
  /** @example "VIEWER" */
  role?: "ADMIN" | "MANAGER" | "VIEWER";
}

export interface UserCreatedResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "ivan@example.com" */
  email: string;
  /** @example "Иван" */
  first_name: string;
  /** @example "Иванов" */
  last_name: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example 1 */
  organization_id?: number;
  /** @example "user" */
  role: "admin" | "manager" | "viewer" | "user";
  /** @example false */
  is_active: boolean;
}

export interface UpdateUserDto {
  /** @example "Иван" */
  first_name?: string;
  /** @example "Иванов" */
  last_name?: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example "1" */
  organization_id?: string;
  role?: "ADMIN" | "MANAGER" | "VIEWER";
  /** @example true */
  is_active?: boolean;
  /** @example true */
  is_approved?: boolean;
  workspaces?: any[];
}

export interface UserUpdatedResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "ivan@example.com" */
  email: string;
  /** @example "Иван" */
  first_name: string;
  /** @example "Иванов" */
  last_name: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example 1 */
  organization_id?: number;
  /** @example "Organization Name" */
  organization_name?: string;
  /** @example "user" */
  role: "admin" | "manager" | "viewer" | "user";
  /** @example true */
  is_active: boolean;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface UserApprovedResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "ivan@example.com" */
  email: string;
  /** @example "Иван" */
  first_name: string;
  /** @example "Иванов" */
  last_name: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example 1 */
  organization_id?: number;
  /** @example "Organization Name" */
  organization_name?: string;
  /** @example "user" */
  role: "admin" | "manager" | "viewer" | "user";
  /** @example true */
  is_active: boolean;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface UserBlockedResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "ivan@example.com" */
  email: string;
  /** @example "Иван" */
  first_name: string;
  /** @example "Иванов" */
  last_name: string;
  /** @example "Иванович" */
  middle_name?: string;
  /** @example 1 */
  organization_id?: number;
  /** @example "Organization Name" */
  organization_name?: string;
  /** @example "user" */
  role: "admin" | "manager" | "viewer" | "user";
  /** @example false */
  is_active: boolean;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface UserDeletedResponseDto {
  /** @example true */
  success: boolean;
}

export interface CreateApiKeyDto {
  /** @example "My API Key" */
  name: string;
  /** @example ["read:workspaces","write:tables"] */
  permissions: string[];
}

export interface ApiKeyResponseDto {
  /** @example "elk_abc123..." */
  apiKey: string;
  /** @example "My API Key" */
  name: string;
}

export interface CreateWorkspaceDto {
  /**
   * Workspace name
   * @minLength 1
   * @maxLength 100
   * @example "My Workspace"
   */
  name: string;
  /**
   * Workspace description
   * @maxLength 500
   * @example "Team collaboration workspace"
   */
  description?: string;
  /**
   * Workspace icon (emoji or URL)
   * @example "🚀"
   */
  icon?: string;
  /**
   * Is this workspace a template
   * @example false
   */
  is_template?: boolean;
}

export interface WorkspaceMemberResponseDto {
  /** @format uuid */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: string;
  /** @format date-time */
  joinedAt: string;
}

export interface WorkspaceResponseDto {
  id: string;
  name: string;
  description: string | null;
  is_template: boolean;
  owner_id: string;
  owner_email: string | null;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  is_active: boolean;
  metadata: object | null;
  organization_id: number | null;
  sport_id: number | null;
}

export interface WorkspacesListResponseDto {
  data: WorkspaceResponseDto[];
}

export interface UpdateWorkspaceDto {
  /**
   * Workspace name
   * @minLength 1
   * @maxLength 100
   * @example "Updated Workspace"
   */
  name?: string;
  /**
   * Workspace description
   * @maxLength 500
   */
  description?: string;
  /** Workspace icon */
  icon?: string;
  /** Is this workspace a template */
  is_template?: boolean;
}

export interface AddMemberDto {
  /**
   * Member email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * Member role
   * @example "editor"
   */
  role: "owner" | "editor" | "viewer";
}

export interface UpdateMemberRoleDto {
  /**
   * New member role
   * @example "editor"
   */
  role: "owner" | "editor" | "viewer";
}

export interface CreateGroupDto {
  /**
   * Group name
   * @maxLength 255
   * @example "Financial Reports"
   */
  name: string;
  /**
   * Group description
   * @example "Tables for financial analysis and reporting"
   */
  description?: string;
}

export interface WorkspaceGroupResponseDto {
  /** @format uuid */
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  /** @format uuid */
  workspaceId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface GroupsListResponseDto {
  /** List of indicator groups */
  data: IndicatorGroupResponseDto[];
  /** Total count of groups */
  total: number;
}

export interface UpdateGroupDto {
  /**
   * Group name
   * @maxLength 255
   */
  name?: string;
  /** Group description */
  description?: string;
}

export interface ReorderGroupsDto {
  /**
   * Ordered array of group IDs
   * @example ["uuid1","uuid2","uuid3"]
   */
  groupIds: string[];
}

export interface TemplatePageResponseDto {
  /** @format uuid */
  id: string;
  title: string;
  content: string;
  order: number;
  children?: TemplatePageResponseDto[];
}

export interface TemplateResponseDto {
  /** @format uuid */
  id: string;
  name: string;
  description: string;
  category: string;
  previewImageUrl: string;
  pages: TemplatePageResponseDto[];
  organizationId: number;
  sportId: number;
  countryId: number;
  isDefault: boolean;
  isActive: boolean;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface TemplatesListResponseDto {
  templates: TemplateResponseDto[];
  total: number;
}

export interface AdminSetupDto {
  /** @example "admin@example.com" */
  email: string;
  /**
   * @minLength 6
   * @example "securePassword123"
   */
  password: string;
  /** @example "Super Admin" */
  name: string;
}

export interface AdminCreatedResponseDto {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AdminSetupResponseDto {
  message: string;
  admin: AdminCreatedResponseDto;
}

export interface AdminResetDto {
  /** @example "admin@example.com" */
  email: string;
  /**
   * @minLength 6
   * @example "securePassword123"
   */
  password: string;
  /** @example "Super Admin" */
  name?: string;
}

export interface AdminResetResponseDto {
  message: string;
  updated: string;
}

export interface DeleteWorkspaceResponseDto {
  message: string;
}

export interface WorkspaceTemplateResponseDto {
  id: string;
  name: string;
  description: string | null;
  is_template: boolean;
  owner_id: string;
  owner_email: string | null;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  is_active: boolean;
  metadata: object | null;
  organization_id: number | null;
  sport_id: number | null;
  country_id: number | null;
}

export interface WorkspaceTemplatesListResponseDto {
  data: WorkspaceTemplateResponseDto[];
}

export interface CreateWorkspaceTemplateDto {
  /**
   * Template name
   * @minLength 1
   * @maxLength 100
   * @example "Regional Organization Template"
   */
  name: string;
  /**
   * Template description
   * @maxLength 500
   * @example "Standard workspace for regional organizations"
   */
  description?: string;
  /**
   * Template icon (emoji or URL)
   * @example "🏢"
   */
  icon?: string;
  /** Organization ID linking */
  organization_id?: number;
  /** Sport ID linking */
  sport_id?: number;
  /** Country ID linking (stored in metadata) */
  country_id?: number;
}

export interface UpdateWorkspaceTemplateDto {
  /**
   * Template name
   * @minLength 1
   * @maxLength 100
   */
  name?: string;
  /**
   * Template description
   * @maxLength 500
   */
  description?: string;
  /** Template icon */
  icon?: string;
  /** Organization ID linking */
  organization_id?: number;
  /** Sport ID linking */
  sport_id?: number;
  /** Country ID linking (stored in metadata) */
  country_id?: number;
}

export interface DeleteWorkspaceTemplateResponseDto {
  message: string;
}

export interface AdminMeResponseDto {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  /** @format date-time */
  last_login_at: string | null;
}

export interface UpdateAdminMeDto {
  /** @example "Updated Name" */
  name?: string;
  /** @example "newpassword123" */
  password?: string;
}

export interface UpdateAdminMeResponseDto {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  /** @format date-time */
  last_login_at: string | null;
}

export interface AdminLoginDto {
  /** @example "admin@example.com" */
  email: string;
  /**
   * @minLength 6
   * @example "password123"
   */
  password: string;
}

export interface AdminLoginResponseDto {
  access_token: string;
  user: adminUserResponseDto;
}

export interface AdminLogoutResponseDto {
  message: string;
}

export interface AdminRefreshResponseDto {
  access_token: string;
}

export interface AdminUserListItemResponseDto {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  /** @format date-time */
  last_login_at: string | null;
}

export interface PaginationMetaResponseDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminUsersListResponseDto {
  data: AdminUserListItemResponseDto[];
  meta: PaginationMetaResponseDto;
}

export interface CreateAdminUserDto {
  /** @example "admin@example.com" */
  email: string;
  /**
   * @minLength 6
   * @example "password123"
   */
  password: string;
  /** @example "Admin Name" */
  name: string;
  role: "ADMIN" | "MODERATOR" | "SUPER_ADMIN";
}

export interface AdminUserResponseDto {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  /** @format date-time */
  last_login_at: string | null;
}

export interface UpdateAdminUserDto {
  /** @example "Updated Name" */
  name?: string;
  role?: "ADMIN" | "MODERATOR" | "SUPER_ADMIN";
  /** @example false */
  is_active?: boolean;
  /** @example "newpassword123" */
  password?: string;
}

export interface DeleteAdminUserResponseDto {
  message: string;
}

export interface RoleResponseDto {
  id: string;
  code: string;
  name: string;
  description: string | null;
  permissions: string[];
  is_system: boolean;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface RolesListResponseDto {
  data: RoleResponseDto[];
}

export interface CreateRoleDto {
  /** @example "MODERATOR" */
  code: string;
  /** @example "Moderator" */
  name: string;
  /** @example "Can moderate content" */
  description?: string;
  /** @example ["read:users","write:posts"] */
  permissions: string[];
}

export interface UpdateRoleDto {
  /** @example "MODERATOR" */
  code?: string;
  /** @example "Moderator" */
  name?: string;
  /** @example "Can moderate content" */
  description?: string;
  /** @example ["read:users","write:posts"] */
  permissions?: string[];
}

export interface DeleteRoleResponseDto {
  success: boolean;
  id: string;
}

export interface CreatePageDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  parentPageId?: string;
  /** @example "My Page" */
  title: string;
  /** @example "📄" */
  icon?: string;
  /** @example "https://example.com/cover.jpg" */
  coverImage?: string;
}

export interface PageResponseDto {
  /** @format uuid */
  id: string;
  title: string;
  content: string;
  icon: string;
  coverImageUrl: string;
  isPublished: boolean;
  isFavorite: boolean;
  /** @format uuid */
  parentId: string;
  /** @format uuid */
  groupId: string;
  /** @format uuid */
  workspaceId: string;
  order: number;
  createdBy: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface PageTreeItemResponseDto {
  /** @format uuid */
  id: string;
  title: string;
  icon: string;
  order: number;
  isPublished: boolean;
  children: PageTreeItemResponseDto[];
}

export interface PageTreeResponseDto {
  tree: PageTreeItemResponseDto[];
  total: number;
}

export interface UpdatePageDto {
  /** @example "Updated Title" */
  title?: string;
  /** @example "📈" */
  icon?: string;
  /** @example "https://example.com/new-cover.jpg" */
  coverImage?: string;
}

export interface MovePageDto {
  /**
   * New parent page ID. Null for root level.
   * @example "550e8400-e29b-41d4-a716-446655440002"
   */
  parentPageId?: string;
  /**
   * Insert after this page. Null for first position.
   * @example "550e8400-e29b-41d4-a716-446655440003"
   */
  afterPageId?: string;
}

export interface CreateBlockDto {
  /** @example "text" */
  type: "text" | "table" | "chart" | "divider" | "image";
  /**
   * Block content (structure depends on type)
   * @example {"text":"# Welcome","format":"markdown"}
   */
  content: object;
  /**
   * Insert after this block. Null for first position.
   * @example "550e8400-e29b-41d4-a716-446655440001"
   */
  afterBlockId?: string;
}

export interface BlockResponseDto {
  /**
   * Block ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * Page ID that contains this block
   * @example "550e8400-e29b-41d4-a716-446655440001"
   */
  pageId: string;
  /**
   * Block type
   * @example "text"
   */
  type: "text" | "table" | "chart" | "divider" | "image";
  /**
   * Block content (structure depends on type)
   * @example {"text":"# Welcome","format":"markdown"}
   */
  content: object;
  /**
   * Block position order
   * @example 0
   */
  position: number;
  /**
   * Whether block is deleted (soft delete)
   * @example false
   */
  isDeleted: boolean;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updatedAt: string;
  /**
   * Creator user ID
   * @example "550e8400-e29b-41d4-a716-446655440002"
   */
  createdBy: string;
}

export interface BlocksListResponseDto {
  /** List of blocks */
  blocks: BlockResponseDto[];
  /**
   * Total number of blocks
   * @example 10
   */
  total: number;
}

export interface UpdateBlockDto {
  /** @example {"text":"# Updated Content","format":"markdown"} */
  content?: object;
}

export interface MoveBlockDto {
  /**
   * Insert after this block. Null for first position.
   * @example "550e8400-e29b-41d4-a716-446655440002"
   */
  afterBlockId?: string;
}

export interface CreateTableDto {
  /**
   * Table name
   * @maxLength 255
   * @example "Q1 Sales Data"
   */
  name: string;
  /**
   * Table description
   * @example "Sales data for Q1 2024"
   */
  description?: string;
  /**
   * Group ID to organize table
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  groupId?: string;
  /**
   * Initial number of rows
   * @default 10
   * @example 10
   */
  initialRows?: number;
  /**
   * Initial number of columns
   * @default 5
   * @example 5
   */
  initialColumns?: number;
}

export interface TableResponseDto {
  /**
   * Table ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;
  /**
   * Workspace ID that contains this table
   * @example "550e8400-e29b-41d4-a716-446655440001"
   */
  workspaceId: string;
  /**
   * Table name
   * @example "Sales Report"
   */
  name: string;
  /**
   * Table description
   * @example "Monthly sales data"
   */
  description: string;
  /**
   * Number of columns
   * @example 5
   */
  columnsCount: number;
  /**
   * Number of rows
   * @example 100
   */
  rowsCount: number;
  /**
   * Active version ID
   * @example "550e8400-e29b-41d4-a716-446655440002"
   */
  activeVersionId: string;
  /**
   * Group ID for organization
   * @example "550e8400-e29b-41d4-a716-446655440003"
   */
  groupId: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updatedAt: string;
  /**
   * Creator user ID
   * @example "550e8400-e29b-41d4-a716-446655440004"
   */
  createdBy: string;
}

export interface TablesListResponseDto {
  /** List of tables */
  tables: TableResponseDto[];
  /**
   * Total number of tables
   * @example 15
   */
  total: number;
}

export interface UpdateTableDto {
  /**
   * Table name
   * @maxLength 255
   */
  name?: string;
  /** Table description */
  description?: string;
  /** Group ID */
  groupId?: string;
}

export interface ColumnDefinition {
  /** @example "Product Name" */
  name: string;
  /** @example "string" */
  type: "string" | "number" | "boolean" | "date";
  /** @example 150 */
  width?: number;
}

export interface CreateVersionDto {
  /** Column definitions for this version */
  columnDefinitions: ColumnDefinition[];
  /**
   * Copy data from this version ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  copyDataFromVersion?: string;
}

export interface CellDataDto {
  /**
   * Raw cell value
   * @example 1500
   */
  value: object;
  /**
   * Cell formula (if any)
   * @example "=SUM(A1:A10)"
   */
  formula: string;
  /**
   * Cell format type
   * @example "currency"
   */
  format: string;
}

export interface CellResponseDto {
  /**
   * Row index
   * @example 0
   */
  rowIndex: number;
  /**
   * Column index
   * @example 0
   */
  colIndex: number;
  /**
   * Column name
   * @example "A"
   */
  colName: string;
  /** Cell data */
  data: CellDataDto;
}

export interface CellsResponseDto {
  /**
   * Version ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  versionId: string;
  /** List of cells */
  cells: CellResponseDto[];
  /**
   * Total number of rows
   * @example 100
   */
  totalRows: number;
  /**
   * Total number of columns
   * @example 5
   */
  totalColumns: number;
  /**
   * Current page number
   * @example 1
   */
  page: number;
  /**
   * Page size
   * @example 50
   */
  pageSize: number;
  /**
   * Total number of cells
   * @example 5000
   */
  total: number;
}

export interface BatchCellUpdate {
  /**
   * Row index
   * @example 0
   */
  rowIndex: number;
  /**
   * Column index
   * @example 0
   */
  colIndex: number;
  /** Cell data */
  cellData: CellDataDto;
}

export interface BatchUpdateCellsDto {
  /** Array of cell updates */
  cells: BatchCellUpdate[];
}

export interface LinkFieldMapping {
  /** Source field name from catalog */
  sourceField: string;
  /** Target column index in dynamic table */
  targetColIndex: number;
}

export interface LinkMetadata {
  /** Source column identifier (legacy) */
  sourceColumn?: string;
  /** Target column identifier (legacy) */
  targetColumn?: string;
  /** Field to column mappings */
  mappings?: LinkFieldMapping[];
  /** Filter criteria for link */
  filter?: object;
}

export interface CreateLinkDto {
  /** Donor table ID */
  sourceTableId?: string;
  /** Donor system entity (e.g. regions) */
  sourceSystemEntity?: string;
  linkType:
    | "cell_reference"
    | "lookup_reference"
    | "aggregation"
    | "shared_keys";
  metadata?: LinkMetadata;
}

export interface AnalyzeFormulaDto {
  /**
   * Formula to analyze
   * @example "=SUM([Revenue]!A1:A10)"
   */
  formula: string;
  /** Current workspace ID */
  workspaceId: string;
}

export interface ExternalRefResponseDto {
  /**
   * Full reference string
   * @example "[Revenue]!A1:A10"
   */
  fullReference: string;
  /**
   * Target workspace ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  workspaceId?: string;
  /**
   * Target table ID
   * @example "550e8400-e29b-41d4-a716-446655440001"
   */
  tableId: string;
  /**
   * Target table name
   * @example "Revenue"
   */
  tableName: string;
  /**
   * Cell range
   * @example "A1:A10"
   */
  range: string;
  /**
   * Whether user has access to the referenced table
   * @example true
   */
  hasAccess: boolean;
}

export interface FormulaAnalysisResponseDto {
  /**
   * Whether formula is syntactically valid
   * @example true
   */
  valid: boolean;
  /**
   * Error message if formula is invalid
   * @example "Unexpected token"
   */
  error?: string;
  /** List of external dependencies */
  externalDependencies: ExternalRefResponseDto[];
}

export interface RegionResponseDto {
  /**
   * Region ID
   * @example 1
   */
  id: number;
  /**
   * Region code
   * @example "moscow"
   */
  code: string;
  /**
   * Region name in Russian
   * @example "Москва"
   */
  name: string;
  /**
   * Country ID
   * @example 1
   */
  countryId: number | null;
  /**
   * Federal district ID
   * @example 1
   */
  districtId: number | null;
  /**
   * Whether region is active
   * @example true
   */
  isActive: boolean;
}

export interface RegionsListResponseDto {
  /** List of regions */
  items: RegionResponseDto[];
  /**
   * Total number of regions
   * @example 100
   */
  total: number;
}

export interface SportResponseDto {
  /**
   * Sport ID
   * @example 1
   */
  id: number;
  /**
   * Sport name in Russian
   * @example "Футбол"
   */
  name: string;
  /**
   * Olympic category ID
   * @example 1
   */
  olympicCategoryId: number | null;
  /**
   * Sport type ID
   * @example 1
   */
  sportTypeId: number | null;
  /**
   * Whether sport is active
   * @example true
   */
  isActive: boolean;
}

export interface SportsListResponseDto {
  /** List of sports */
  items: SportResponseDto[];
  /**
   * Total number of sports
   * @example 100
   */
  total: number;
}

export interface IndicatorResponseDto {
  /** Indicator ID */
  id: number;
  /** Indicator name in Russian */
  name_ru: string;
  /** Technical code */
  code: string;
  /** Indicator description */
  description?: string | null;
  /** Source hint */
  source_hint?: string | null;
  /** Calculation formula */
  calculation_formula?: string | null;
  /** Value type */
  value_type: string;
  /** Default weight */
  default_weight?: number | null;
  /** Category ID */
  category_id?: number | null;
  /** Sport ID */
  sport_id?: number | null;
  /** Gender ID */
  gender_id?: number | null;
  /** Age group ID */
  age_group_id?: number | null;
  /** Discipline ID */
  discipline_id?: number | null;
  /** Measurement unit ID */
  measurement_unit_id?: number | null;
  /** Organization ID */
  organization_id?: number | null;
  /** Created by user ID */
  created_by?: string | null;
  /** System indicator flag */
  is_system: boolean;
  /** Normalize by population */
  use_population: boolean;
  /** Active status */
  is_active: boolean;
  /** Metadata (JSON) */
  metadata?: object | null;
  /**
   * Creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   */
  updated_at: string;
  /** Gender name in Russian */
  gender_name?: string | null;
  /** Age group name in Russian */
  age_group_name?: string | null;
  /** Discipline name in Russian */
  discipline_name?: string | null;
  /** Sport name in Russian */
  sport_name?: string | null;
  /** Measurement unit name in Russian */
  unit_name?: string | null;
}

export interface IndicatorsListResponseDto {
  /** List of indicators */
  data: IndicatorResponseDto[];
  /** Total count of indicators */
  total: number;
}

export interface CreateIndicatorGroupDto {
  /** Group name in Russian */
  name_ru: string;
  /** Technical code */
  code: string;
  /** Group description */
  description?: string;
  /** Sport ID */
  sport_id?: number;
  /** Sort order */
  sort_order?: number;
  /** Active status */
  is_active?: boolean;
}

export interface IndicatorGroupResponseDto {
  /** Group ID */
  id: number;
  /** Group name in Russian */
  name_ru: string;
  /** Technical code */
  code: string;
  /** Group description */
  description?: string | null;
  /** Sport ID */
  sport_id?: number | null;
  /** Sort order */
  sort_order?: number | null;
  /** Active status */
  is_active: boolean;
  /**
   * Creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   */
  updated_at: string;
}

export interface CreateIndicatorTemplateDto {
  name_ru: string;
  name_pattern: string;
  code_pattern: string;
  description?: string;
  description_pattern?: string;
  sport_id?: number;
  category_id?: number;
  measurement_unit_id?: number;
  base_weight?: number;
  value_type?: string;
  use_population?: boolean;
  is_active?: boolean;
  generation_config?: object;
}

export interface UpdateIndicatorTemplateDto {
  name_ru: string;
  name_pattern: string;
  code_pattern: string;
  description?: string;
  description_pattern?: string;
  sport_id?: number;
  category_id?: number;
  measurement_unit_id?: number;
  base_weight?: number;
  value_type?: string;
  use_population?: boolean;
  is_active?: boolean;
  generation_config?: object;
}

export interface GenerateIndicatorsDto {
  /** Template IDs to generate from */
  templateIds?: string[];
  /** Sport ID filter */
  sportId?: number;
  /** Category filter */
  category?: string;
  /** Overwrite existing indicators */
  overwrite?: boolean;
  /** Filters for template parameters */
  filters?: object;
}

export interface CreateLicenseCategoryDto {
  /** Sport ID */
  sport_id: number;
  /** Category name in Russian */
  name_ru: string;
  /** Short name in Russian */
  short_name_ru?: string;
  /** Unique code */
  code: string;
  /** Description */
  description?: string;
  /** Level (numeric value for sorting/logic) */
  level: number;
  /** Personnel type (e.g., referee, coach) */
  personnel_type: string;
  /** Requirements text */
  requirements?: string;
  /** Discipline ID */
  discipline_id?: number;
  /**
   * Is active status
   * @default true
   */
  is_active?: boolean;
}

export interface UpdateLicenseCategoryDto {
  /** Category name in Russian */
  name_ru?: string;
  /** Short name in Russian */
  short_name_ru?: string;
  /** Description */
  description?: string;
  /** Level */
  level?: number;
  /** Requirements text */
  requirements?: string;
  /** Is active status */
  is_active?: boolean;
}

export interface OrganizationTypeResponseDto {
  /** Type ID */
  id: number;
  /** Type name in Russian */
  name_ru: string;
  /** Type code */
  code: string;
  /** Sort order */
  sort_order?: number;
}

export interface OrganizationLevelResponseDto {
  /** Level ID */
  id: number;
  /** Level name in Russian */
  name_ru: string;
  /** Level code */
  code: string;
  /** Sort order */
  sort_order: number;
}

export interface CountryResponseDto {
  /**
   * Country ID
   * @example 1
   */
  id: number;
  /**
   * Country code (ISO 3166-1 alpha-2)
   * @example "RU"
   */
  code: string;
  /**
   * Country name in Russian
   * @example "Россия"
   */
  name: string;
  /**
   * Flag emoji
   * @example "🇷🇺"
   */
  flag: string;
}

export interface OrganizationResponseDto {
  /** Organization ID */
  id: number;
  /** Organization name in Russian */
  name_ru: string;
  /** Abbreviation in Russian */
  abbreviation_ru?: string | null;
  /** Internal code */
  internal_code?: string | null;
  /** Organization type ID */
  type_id: number;
  /** Parent organization ID */
  parent_id?: number | null;
  /** Sport ID */
  sport_id?: number | null;
  /** Region ID */
  region_id?: number | null;
  /** Country ID */
  country_id?: number | null;
  /** Organization level ID */
  level_id: number;
  /** Founded year */
  founded_year?: number | null;
  /** Active status */
  is_active: boolean;
  /** Metadata (JSON) */
  metadata?: object | null;
  /**
   * Creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   */
  updated_at: string;
}

export interface OrganizationsListResponseDto {
  /** List of organizations */
  data: OrganizationResponseDto[];
  /** Total count of organizations */
  total: number;
}

export interface CreateOrganizationDto {
  /** Organization name in Russian */
  name_ru: string;
  /** Abbreviation in Russian */
  abbreviation_ru?: string | null;
  /** Internal code */
  internal_code?: string | null;
  /** Organization type ID */
  type_id: number;
  /** Parent organization ID */
  parent_id?: number | null;
  /** Sport ID */
  sport_id?: number | null;
  /** Region ID */
  region_id?: number | null;
  /** Country ID */
  country_id?: number | null;
  /** Organization level ID */
  level_id: number;
  /** Founded year */
  founded_year?: number | null;
  /**
   * Active status
   * @default true
   */
  is_active?: boolean;
  /** Metadata (JSON) */
  metadata?: object | null;
}

export interface UpdateOrganizationDto {
  /** Organization name in Russian */
  name_ru?: string;
  /** Abbreviation in Russian */
  abbreviation_ru?: string | null;
  /** Internal code */
  internal_code?: string | null;
  /** Organization type ID */
  type_id?: number;
  /** Parent organization ID */
  parent_id?: number | null;
  /** Sport ID */
  sport_id?: number | null;
  /** Region ID */
  region_id?: number | null;
  /** Country ID */
  country_id?: number | null;
  /** Organization level ID */
  level_id?: number;
  /** Founded year */
  founded_year?: number | null;
  /**
   * Active status
   * @default true
   */
  is_active?: boolean;
  /** Metadata (JSON) */
  metadata?: object | null;
}

export interface MoveOrganizationDto {
  /** New parent organization ID (null for root level) */
  parent_id: number | null;
}

export interface SportReferenceDto {
  /**
   * Sport ID
   * @example 1
   */
  id: number;
  /**
   * Sport name
   * @example "Football"
   */
  name: string;
}

export interface SeasonResponseDto {
  /**
   * Season ID
   * @example 1
   */
  id: number;
  /**
   * Season code
   * @example "CY_2024_25"
   */
  code: string;
  /**
   * Season name in Russian
   * @example "Сезон 2024/2025"
   */
  name: string;
  /**
   * Season year
   * @example 2024
   */
  seasonYear: number | null;
  /**
   * Season type
   * @example "cross_year"
   */
  seasonType: string | null;
  /**
   * Season start date
   * @format date-time
   * @example "2024-09-01"
   */
  startDate: string;
  /**
   * Season end date
   * @format date-time
   * @example "2025-08-31"
   */
  endDate: string;
  /**
   * Whether season is active
   * @example true
   */
  isActive: boolean;
  /** Sports associated with season */
  sports: SportReferenceDto[] | null;
}

export interface SeasonsListResponseDto {
  /** List of seasons */
  items: SeasonResponseDto[];
  /**
   * Total number of seasons
   * @example 100
   */
  total: number;
}

export interface GenerateSeasonsDto {
  /**
   * Start year for generation
   * @example 2024
   */
  startYear: number;
  /**
   * End year for generation
   * @example 2030
   */
  endYear: number;
  /** Specific sport ID (optional) */
  sportId?: number;
}

export interface EventResponseDto {
  /** Event ID */
  id: number;
  /** Parent event ID */
  parent_event_id?: number;
  /** Unique code */
  code: string;
  /** Full name in Russian */
  name_ru: string;
  /** Short name in Russian */
  short_name_ru?: string;
  /** Event type ID */
  event_type_id?: number;
  /** Event level ID */
  level_id?: number;
  /** Event stage ID */
  stage_id?: number;
  /** Sport ID */
  sport_id?: number;
  /** Discipline ID */
  discipline_id?: number;
  /** Gender ID */
  gender_id?: number;
  /** Age group ID */
  age_group_id?: number;
  /** Organizer ID */
  organizer_id?: number;
  /** Description */
  description?: string;
  /** Metadata (JSON) */
  metadata?: object;
  /** Active status */
  is_active: boolean;
  /**
   * Creation date
   * @format date-time
   */
  createdAt: string;
  /**
   * Last update date
   * @format date-time
   */
  updatedAt: string;
}

export interface EventsListResponseDto {
  /** List of events */
  events: EventResponseDto[];
  /**
   * Total number of events
   * @example 25
   */
  total: number;
}

export interface CreateEventDto {
  /** Sport ID */
  sport_id: number;
  /** Unique code */
  code: string;
  /** Full name in Russian */
  name_ru: string;
  /** Short name in Russian */
  short_name_ru?: string;
  /** Description */
  description?: string;
  /** Event type ID */
  event_type_id?: number;
  /** Event level ID */
  level_id?: number;
  /** Stage ID */
  stage_id?: number;
  /** Discipline ID */
  discipline_id?: number;
  /** Age group ID */
  age_group_id?: number;
  /** Gender ID */
  gender_id?: number;
  /** Organizer ID */
  organizer_id?: number;
  /** Parent event ID */
  parent_event_id?: number;
  /**
   * Is active
   * @default true
   */
  is_active?: boolean;
}

export interface UpdateEventDto {
  /** Sport ID */
  sport_id?: number;
  /** Unique code */
  code?: string;
  /** Full name in Russian */
  name_ru?: string;
  /** Short name in Russian */
  short_name_ru?: string;
  /** Description */
  description?: string;
  /** Event type ID */
  event_type_id?: number;
  /** Event level ID */
  level_id?: number;
  /** Stage ID */
  stage_id?: number;
  /** Discipline ID */
  discipline_id?: number;
  /** Age group ID */
  age_group_id?: number;
  /** Gender ID */
  gender_id?: number;
  /** Organizer ID */
  organizer_id?: number;
  /** Parent event ID */
  parent_event_id?: number;
  /**
   * Is active
   * @default true
   */
  is_active?: boolean;
}

export interface DynamicColumnDefinition {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  editable?: boolean;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  relation?: object;
}

export interface CreateReferenceTableDto {
  tableKey: string;
  label: string;
  icon?: string;
  category?: string;
  columns: DynamicColumnDefinition[];
  hasIsActive?: boolean;
  hasIsSystem?: boolean;
  hasSortOrder?: boolean;
  permissionCode?: string;
  /** @default "user" */
  type?: "system" | "user";
  accessLevelId?: number;
}
