import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiMapping, ApiMappingItem } from "./api-mapping";
import { ApiOperationIds, ApiTypes } from "./api-types";
import { applyParametersToAxiosRequestConfig, joinUrl, keys } from "./api-utils";
import {
  AddMemberDto,
  AdminLoginDto,
  AdminSetupDto,
  AdminUpdateUserDto,
  AnalyzeFormulaDto,
  BatchCellUpdate,
  BatchUpdateCellsDto,
  CellDataDto,
  ColumnDefinition,
  CreateAdminUserDto,
  CreateApiKeyDto,
  CreateBlockDto,
  CreateGroupDto,
  CreateIndicatorGroupDto,
  CreateLinkDto,
  CreatePageDto,
  CreateRoleDto,
  CreateTableDto,
  CreateVersionDto,
  CreateWorkspaceDto,
  ForgotPasswordDto,
  GenerateIndicatorsDto,
  GenerateSeasonsDto,
  LinkFieldMapping,
  LoginDto,
  MoveBlockDto,
  MovePageDto,
  RefreshTokenDto,
  RegisterDto,
  ReorderGroupsDto,
  ResetPasswordDto,
  UpdateAdminUserDto,
  UpdateBlockDto,
  UpdateGroupDto,
  UpdateIndicatorGroupDto,
  UpdateMemberRoleDto,
  UpdatePageDto,
  UpdateProfileDto,
  UpdateRoleDto,
  UpdateTableDto,
  UpdateWorkspaceDto,
} from "./data-contracts";

export function createApi(options: ApiOptions = {}): Api {
  options = Object.assign({}, defaultApiOptions, options);
  return keys(apiMapping).reduce(
    (api, operationId) => ({
      ...api,
      [operationId]: createApiFetchFunction(apiMapping[operationId], options),
    }),
    {} as Api,
  );
}

function createApiFetchFunction<K extends ApiOperationIds>(
  mappingItem: ApiMappingItem<K>,
  apiOptions: ApiOptions,
): ApiFetchFunction<K> {
  const url = joinUrl(apiOptions.baseUrl, mappingItem.url);
  return (parameters: ApiFetchParameters<K>) => {
    const axiosRequestConfig: AxiosRequestConfig = { url, method: mappingItem.method };
    applyParametersToAxiosRequestConfig(axiosRequestConfig, parameters);
    return axios(axiosRequestConfig);
  };
}

export type ApiParameters<K extends ApiOperationIds> = ApiTypes[K]["parameters"];

export type ApiResponses<K extends ApiOperationIds> = ApiTypes[K]["responses"];

export type ApiFetchParameters<K extends ApiOperationIds> = {
  [parameterType in keyof ApiParameters<K>]: ApiParameters<K>[parameterType];
};

export type ApiFetchFunction<K extends ApiOperationIds> = (
  parameters: ApiParameters<K>,
) => Promise<AxiosResponse<ApiResponses<K>["success"]>>;

export interface ApiOptions {
  baseUrl?: string;
}

const defaultApiOptions: ApiOptions = {};

export interface Api {
  /**
   * Register a new user
   */
  AuthController_register: (parameters: { body: RegisterDto }) => Promise<AxiosResponse<undefined>>;
  /**
   * Login with email and password
   */
  AuthController_login: (parameters: { body: LoginDto }) => Promise<AxiosResponse<undefined>>;
  /**
   * Refresh access token
   */
  AuthController_refresh: (parameters: {
    body: RefreshTokenDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Request password reset
   */
  AuthController_forgotPassword: (parameters: {
    body: ForgotPasswordDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Reset password with token
   */
  AuthController_resetPassword: (parameters: {
    body: ResetPasswordDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Verify if reset token is valid
   */
  AuthController_verifyResetToken: (parameters: {
    path: {
      token: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get current user profile
   */
  AuthController_getMe: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Change current user password
   */
  AuthController_changePassword: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get current user profile
   */
  UsersController_getProfile: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Update current user profile
   */
  UsersController_updateProfile: (parameters: {
    body: UpdateProfileDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * List all users (Admin only)
   */
  UsersController_findAll: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Update user by admin
   */
  UsersController_updateUserAdmin: (parameters: {
    body: AdminUpdateUserDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get user by ID
   */
  UsersController_findOne: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create API key for current user
   */
  UsersController_createApiKey: (parameters: {
    body: CreateApiKeyDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all workspaces for current user
   */
  WorkspacesController_findAll: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Create a new workspace
   */
  WorkspacesController_create: (parameters: {
    body: CreateWorkspaceDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get workspace by ID
   */
  WorkspacesController_findOne: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete workspace
   */
  WorkspacesController_delete: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update workspace
   */
  WorkspacesController_update: (parameters: {
    body: UpdateWorkspaceDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get workspace members
   */
  WorkspacesController_getMembers: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Add member to workspace
   */
  WorkspacesController_addMember: (parameters: {
    body: AddMemberDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Remove member from workspace
   */
  WorkspacesController_removeMember: (parameters: {
    path: {
      id: string;
      memberId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update member role
   */
  WorkspacesController_updateMemberRole: (parameters: {
    body: UpdateMemberRoleDto;
    path: {
      id: string;
      memberId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create the first SUPER_ADMIN user
   */
  AdminSetupController_setup: (parameters: {
    body: AdminSetupDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Admin login with email and password
   */
  AdminAuthController_login: (parameters: {
    body: AdminLoginDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Admin logout
   */
  AdminAuthController_logout: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Refresh admin access token
   */
  AdminAuthController_refresh: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get current admin user profile
   */
  AdminAuthController_getMe: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * List all admin users with pagination
   */
  AdminUsersController_findAll: (parameters: {
    query: {
      page: number;
      limit: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create new admin user
   */
  AdminUsersController_create: (parameters: {
    body: CreateAdminUserDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get admin user by ID
   */
  AdminUsersController_findOne: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete admin user
   */
  AdminUsersController_remove: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update admin user
   */
  AdminUsersController_update: (parameters: {
    body: UpdateAdminUserDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * List all roles
   */
  AdminRolesController_findAll: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Create new role
   */
  AdminRolesController_create: (parameters: {
    body: CreateRoleDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get role by ID
   */
  AdminRolesController_findOne: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete role (system roles cannot be deleted)
   */
  AdminRolesController_remove: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update role
   */
  AdminRolesController_update: (parameters: {
    body: UpdateRoleDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get page tree for workspace
   */
  PagesController_getTree: (parameters: {
    path: {
      workspaceId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create a new page in workspace
   */
  PagesController_create: (parameters: {
    body: CreatePageDto;
    path: {
      workspaceId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get page by ID
   */
  PagesController_findOne: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete page (soft delete)
   */
  PagesController_delete: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update page
   */
  PagesController_update: (parameters: {
    body: UpdatePageDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Move page to new parent or position
   */
  PagesController_move: (parameters: {
    body: MovePageDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all blocks for a page
   */
  BlocksController_findByPage: (parameters: {
    path: {
      pageId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create a new block in page
   */
  BlocksController_create: (parameters: {
    body: CreateBlockDto;
    path: {
      pageId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete block (soft delete)
   */
  BlocksController_delete: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update block content
   */
  BlocksController_update: (parameters: {
    body: UpdateBlockDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Move block to new position
   */
  BlocksController_move: (parameters: {
    body: MoveBlockDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all groups in workspace
   */
  WorkspaceGroupsController_findAll: (parameters: {
    path: {
      workspaceId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create a new group in workspace
   */
  WorkspaceGroupsController_create: (parameters: {
    body: CreateGroupDto;
    path: {
      workspaceId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete group
   */
  WorkspaceGroupsController_delete: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update group
   */
  WorkspaceGroupsController_update: (parameters: {
    body: UpdateGroupDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Reorder groups
   */
  WorkspaceGroupsController_reorder: (parameters: {
    body: ReorderGroupsDto;
    path: {
      workspaceId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Analyze formula and resolve external dependencies
   */
  FormulaController_analyze: (parameters: {
    body: AnalyzeFormulaDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all tables in workspace
   */
  DynamicTablesController_findAll: (parameters: {
    path: {
      workspaceId: string;
    };
    query: {
      groupId?: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create a new table in workspace
   */
  DynamicTablesController_create: (parameters: {
    body: CreateTableDto;
    path: {
      workspaceId: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get table by ID
   */
  DynamicTablesController_findOne: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete table
   */
  DynamicTablesController_delete: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update table
   */
  DynamicTablesController_update: (parameters: {
    body: UpdateTableDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get version history
   */
  DynamicTablesController_getVersionHistory: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create new version
   */
  DynamicTablesController_createVersion: (parameters: {
    body: CreateVersionDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Activate version
   */
  DynamicTablesController_activateVersion: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get cells with pagination
   */
  DynamicTablesController_getCells: (parameters: {
    path: {
      id: string;
    };
    query: {
      startRow?: number;
      endRow?: number;
      startCol?: number;
      endCol?: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update single cell
   */
  DynamicTablesController_updateCell: (parameters: {
    path: {
      id: string;
      rowIndex: number;
      colIndex: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Batch update cells
   */
  DynamicTablesController_batchUpdateCells: (parameters: {
    body: BatchUpdateCellsDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Insert a new row and shift following rows
   */
  DynamicTablesController_insertRow: (parameters: {
    path: {
      id: string;
      index: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete a row and shift following rows
   */
  DynamicTablesController_deleteRow: (parameters: {
    path: {
      id: string;
      index: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Insert a new column and shift following columns
   */
  DynamicTablesController_insertColumn: (parameters: {
    path: {
      id: string;
      index: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete a column and shift following columns
   */
  DynamicTablesController_deleteColumn: (parameters: {
    path: {
      id: string;
      index: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Connect table to donor (another table or catalog)
   */
  DynamicTablesController_createLink: (parameters: {
    body: CreateLinkDto;
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update range/matrix formulas for a version
   */
  DynamicTablesController_updateMatrixFormulas: (parameters: {
    body: string[];
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Check if donor data has changed
   */
  DynamicTablesController_getDonorStatus: (parameters: {
    path: {
      id: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all regions
   */
  RegionsController_findAll: (parameters: {
    query: {
      countryId?: number;
      federalDistrictId?: number;
      regionTypeId?: number;
      isActive?: boolean;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get region by ID
   */
  RegionsController_findById: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get regions by federal district
   */
  RegionsController_findByDistrict: (parameters: {
    path: {
      districtId: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get regions by country
   */
  RegionsController_findByCountry: (parameters: {
    path: {
      countryId: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all sports
   */
  SportsController_findAll: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get sport by ID
   */
  SportsController_findById: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get disciplines for a sport
   */
  SportsController_findDisciplines: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all indicators with filters
   */
  IndicatorsController_findAll: (parameters: {
    query: {
      sportId?: number;
      regionId?: number;
      groupId?: number;
      search?: string;
      scope?: string;
      scopes?: string[];
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create a manual indicator
   */
  IndicatorsController_create: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get indicator by ID
   */
  IndicatorsController_findById: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete indicator (mark as inactive)
   */
  IndicatorsController_delete: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update indicator
   */
  IndicatorsController_update: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get indicators for a sport
   */
  IndicatorsController_findBySport: (parameters: {
    path: {
      sportId: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get indicator generation templates
   */
  IndicatorsController_getTemplates: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Generate indicators (flexible)
   */
  IndicatorsController_generate: (parameters: {
    body: GenerateIndicatorsDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all indicator groups
   */
  IndicatorsController_getGroups: (parameters: {
    query: {
      sportId?: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Create indicator group
   */
  IndicatorsController_createGroup: (parameters: {
    body: CreateIndicatorGroupDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all genders
   */
  IndicatorsController_getGenders: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all age groups
   */
  IndicatorsController_getAgeGroups: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete indicator group
   */
  IndicatorsController_deleteGroup: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update indicator group
   */
  IndicatorsController_updateGroup: (parameters: {
    body: UpdateIndicatorGroupDto;
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all organizations
   */
  OrganizationsController_findAll: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get federations
   */
  OrganizationsController_findFederations: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get organization tree
   */
  OrganizationsController_getTree: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get organization hierarchy (flat list)
   */
  OrganizationsController_getHierarchy: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get organization by ID
   */
  OrganizationsController_findById: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all indicator groups
   */
  IndicatorGroupsController_findAll: (parameters: {
    query: {
      sportId?: number;
      regionId?: number;
      type?: "Unified" | "Legacy" | "Custom";
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get indicator group by ID
   */
  IndicatorGroupsController_findById: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get indicators for a specific group
   */
  IndicatorGroupsController_findIndicatorsByGroup: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all seasons
   */
  SeasonsController_findAll: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Create a new season
   */
  SeasonsController_create: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get season by ID
   */
  SeasonsController_findById: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Delete a season
   */
  SeasonsController_delete: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Update an existing season
   */
  SeasonsController_update: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Autogenerate seasons based on logic
   */
  SeasonsController_generate: (parameters: {
    body: GenerateSeasonsDto;
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get current season
   */
  SeasonsController_findCurrent: (parameters: {}) => Promise<AxiosResponse<undefined>>;
  /**
   * Get all events with filters
   */
  EventsController_findAll: (parameters: {
    query: {
      sportId?: number;
      regionId?: number;
      importance?: "High" | "Medium" | "Low";
    };
  }) => Promise<AxiosResponse<undefined>>;
  /**
   * Get event by ID
   */
  EventsController_findById: (parameters: {
    path: {
      id: number;
    };
  }) => Promise<AxiosResponse<undefined>>;
  CountriesController_findActive: (parameters: {
    query: {
      lang: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
  CountriesController_findAll: (parameters: {
    query: {
      lang: string;
    };
  }) => Promise<AxiosResponse<undefined>>;
}
