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
}

export interface LoginDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "password123" */
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ForgotPasswordDto {
  /** @example "user@example.com" */
  email: string;
  /** @example "ru" */
  lang?: string;
}

export interface ResetPasswordDto {
  token: string;
  /**
   * @minLength 8
   * @example "NewPassword123!"
   */
  newPassword: string;
}

export interface UpdateProfileDto {
  /** First name */
  first_name?: string;
  /** Last name */
  last_name?: string;
  /** Middle name */
  middle_name?: string;
}

export interface AdminUpdateUserDto {
  /** First name */
  first_name?: string;
  /** Last name */
  last_name?: string;
  /** Middle name */
  middle_name?: string;
  /** User role */
  role?: string;
  /** Organization ID */
  organization_id?: number;
  /** Email (only admin can change or just show) */
  email?: string;
}

export interface CreateApiKeyDto {
  /** @example "My API Key" */
  name: string;
  /** @example ["read:workspaces","write:tables"] */
  permissions: string[];
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

export interface AdminLoginDto {
  /** @example "admin@example.com" */
  email: string;
  /**
   * @minLength 6
   * @example "password123"
   */
  password: string;
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

export interface UpdateAdminUserDto {
  /** @example "Updated Name" */
  name?: string;
  role?: "ADMIN" | "MODERATOR" | "SUPER_ADMIN";
  /** @example false */
  is_active?: boolean;
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

export interface AnalyzeFormulaDto {
  /**
   * Formula to analyze
   * @example "=SUM([Revenue]!A1:A10)"
   */
  formula: string;
  /** Current workspace ID */
  workspaceId: string;
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
  /** Cell value */
  value?: object;
  /**
   * Cell formula
   * @example "=SUM(A1:A10)"
   */
  formula?: string;
  /** Cell type */
  type?: "string" | "number" | "boolean" | "formula";
  /**
   * Cell format
   * @example {"bold":true,"color":"#FF0000"}
   */
  format?: object;
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

export interface GenerateIndicatorsDto {
  /** Template IDs to generate from */
  templateIds?: string[];
  /** Sport ID filter */
  sportId?: number;
  /** Category filter */
  category?: string;
  /** Overwrite existing indicators */
  overwrite?: boolean;
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

export interface UpdateIndicatorGroupDto {
  /** Group name in Russian */
  name_ru?: string;
  /** Technical code */
  code?: string;
  /** Group description */
  description?: string;
  /** Sport ID */
  sport_id?: number;
  /** Sort order */
  sort_order?: number;
  /** Active status */
  is_active?: boolean;
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
