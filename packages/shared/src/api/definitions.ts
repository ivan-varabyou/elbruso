export interface RegisterDto {
  email: string;
  name: string;
  password: string;
  organizationId?: string;
  countryId?: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ForgotPasswordDto {
  email: string;
  lang?: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface UpdateProfileDto {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
}

export interface AdminUpdateUserDto {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  role?: string;
  organization_id?: number;
  email?: string;
}

export interface CreateApiKeyDto {
  name: string;
  permissions: string[];
}

export interface CreateWorkspaceDto {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateWorkspaceDto {
  name?: string;
  description?: string;
  icon?: string;
}

export interface AddMemberDto {
  email: string;
  role: 'owner' | 'editor' | 'viewer';
}

export interface UpdateMemberRoleDto {
  role: 'owner' | 'editor' | 'viewer';
}

export interface AdminSetupDto {
  email: string;
  password: string;
  name: string;
}

export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface CreateAdminUserDto {
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'MODERATOR' | 'SUPER_ADMIN';
}

export interface UpdateAdminUserDto {
  name?: string;
  role?: 'ADMIN' | 'MODERATOR' | 'SUPER_ADMIN';
  is_active?: boolean;
}

export interface CreateRoleDto {
  code: string;
  name: string;
  description?: string;
  permissions: string[];
}

export interface UpdateRoleDto {
  code?: string;
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface CreatePageDto {
  parentPageId?: string;
  title: string;
  icon?: string;
  coverImage?: string;
}

export interface UpdatePageDto {
  title?: string;
  icon?: string;
  coverImage?: string;
}

export interface MovePageDto {
  parentPageId?: string;
  afterPageId?: string;
}

export interface CreateBlockDto {
  type: 'text' | 'table' | 'chart' | 'divider' | 'image';
  content: {};
  afterBlockId?: string;
}

export interface UpdateBlockDto {
  content?: {};
}

export interface MoveBlockDto {
  afterBlockId?: string;
}

export interface CreateGroupDto {
  name: string;
  description?: string;
}

export interface UpdateGroupDto {
  name?: string;
  description?: string;
}

export interface ReorderGroupsDto {
  groupIds: string[];
}

export interface AnalyzeFormulaDto {
  formula: string;
  workspaceId: string;
}

export interface CreateTableDto {
  name: string;
  description?: string;
  groupId?: string;
  initialRows?: number;
  initialColumns?: number;
}

export interface UpdateTableDto {
  name?: string;
  description?: string;
  groupId?: string;
}

export interface ColumnDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  width?: number;
}

export interface CreateVersionDto {
  columnDefinitions: ColumnDefinition[];
  copyDataFromVersion?: string;
}

export interface CellDataDto {
  value?: {};
  formula?: string;
  type?: 'string' | 'number' | 'boolean' | 'formula';
  format?: {};
}

export interface BatchCellUpdate {
  rowIndex: number;
  colIndex: number;
  cellData: any;
}

export interface BatchUpdateCellsDto {
  cells: BatchCellUpdate[];
}

export interface LinkFieldMapping {
  sourceField: string;
  targetColIndex: number;
}

export interface LinkMetadata {
  sourceColumn?: string;
  targetColumn?: string;
  mappings?: LinkFieldMapping[];
  filter?: {};
}

export interface CreateLinkDto {
  sourceTableId?: string;
  sourceSystemEntity?: string;
  linkType: 'cell_reference' | 'lookup_reference' | 'aggregation' | 'shared_keys';
  metadata?: LinkMetadata;
}

export interface GenerateIndicatorsDto {
  templateIds?: string[];
  sportId?: number;
  category?: string;
  overwrite?: boolean;
}

export interface CreateIndicatorGroupDto {
  name_ru: string;
  code: string;
  description?: string;
  sport_id?: number;
  sort_order?: number;
  is_active?: boolean;
}

export interface UpdateIndicatorGroupDto {
  name_ru?: string;
  code?: string;
  description?: string;
  sport_id?: number;
  sort_order?: number;
  is_active?: boolean;
}

export interface GenerateSeasonsDto {
  startYear: number;
  endYear: number;
  sportId?: number;
}
