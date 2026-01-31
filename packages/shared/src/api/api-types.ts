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

export enum ParameterType {
  BODY = "body",
  QUERY = "query",
  FORM_DATA = "formData",
  PATH = "path",
}

export type ApiOperationIds = keyof ApiTypes;

export interface ApiTypes {
  AuthController_register: {
    tag: "Authentication";
    parameters: {
      body: RegisterDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AuthController_login: {
    tag: "Authentication";
    parameters: {
      body: LoginDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AuthController_refresh: {
    tag: "Authentication";
    parameters: {
      body: RefreshTokenDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AuthController_forgotPassword: {
    tag: "Authentication";
    parameters: {
      body: ForgotPasswordDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AuthController_resetPassword: {
    tag: "Authentication";
    parameters: {
      body: ResetPasswordDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AuthController_verifyResetToken: {
    tag: "Authentication";
    parameters: {
      path: {
        token: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AuthController_getMe: {
    tag: "Authentication";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AuthController_changePassword: {
    tag: "Authentication";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  UsersController_getProfile: {
    tag: "Users";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  UsersController_updateProfile: {
    tag: "Users";
    parameters: {
      body: UpdateProfileDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  UsersController_findAll: {
    tag: "Users";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  UsersController_updateUserAdmin: {
    tag: "Users";
    parameters: {
      body: AdminUpdateUserDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  UsersController_findOne: {
    tag: "Users";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  UsersController_createApiKey: {
    tag: "Users";
    parameters: {
      body: CreateApiKeyDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_findAll: {
    tag: "Workspaces";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_create: {
    tag: "Workspaces";
    parameters: {
      body: CreateWorkspaceDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_findOne: {
    tag: "Workspaces";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_delete: {
    tag: "Workspaces";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_update: {
    tag: "Workspaces";
    parameters: {
      body: UpdateWorkspaceDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_getMembers: {
    tag: "Workspaces";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_addMember: {
    tag: "Workspaces";
    parameters: {
      body: AddMemberDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_removeMember: {
    tag: "Workspaces";
    parameters: {
      path: {
        id: string;
        memberId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspacesController_updateMemberRole: {
    tag: "Workspaces";
    parameters: {
      body: UpdateMemberRoleDto;
      path: {
        id: string;
        memberId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminSetupController_setup: {
    tag: "Admin Setup";
    parameters: {
      body: AdminSetupDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminAuthController_login: {
    tag: "Admin Authentication";
    parameters: {
      body: AdminLoginDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminAuthController_logout: {
    tag: "Admin Authentication";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminAuthController_refresh: {
    tag: "Admin Authentication";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminAuthController_getMe: {
    tag: "Admin Authentication";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminUsersController_findAll: {
    tag: "Admin Users";
    parameters: {
      query: {
        page: number;
        limit: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminUsersController_create: {
    tag: "Admin Users";
    parameters: {
      body: CreateAdminUserDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminUsersController_findOne: {
    tag: "Admin Users";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminUsersController_remove: {
    tag: "Admin Users";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminUsersController_update: {
    tag: "Admin Users";
    parameters: {
      body: UpdateAdminUserDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminRolesController_findAll: {
    tag: "Admin Roles";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminRolesController_create: {
    tag: "Admin Roles";
    parameters: {
      body: CreateRoleDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminRolesController_findOne: {
    tag: "Admin Roles";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminRolesController_remove: {
    tag: "Admin Roles";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  AdminRolesController_update: {
    tag: "Admin Roles";
    parameters: {
      body: UpdateRoleDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  PagesController_getTree: {
    tag: "Pages";
    parameters: {
      path: {
        workspaceId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  PagesController_create: {
    tag: "Pages";
    parameters: {
      body: CreatePageDto;
      path: {
        workspaceId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  PagesController_findOne: {
    tag: "Pages";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  PagesController_delete: {
    tag: "Pages";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  PagesController_update: {
    tag: "Pages";
    parameters: {
      body: UpdatePageDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  PagesController_move: {
    tag: "Pages";
    parameters: {
      body: MovePageDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  BlocksController_findByPage: {
    tag: "Blocks";
    parameters: {
      path: {
        pageId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  BlocksController_create: {
    tag: "Blocks";
    parameters: {
      body: CreateBlockDto;
      path: {
        pageId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  BlocksController_delete: {
    tag: "Blocks";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  BlocksController_update: {
    tag: "Blocks";
    parameters: {
      body: UpdateBlockDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  BlocksController_move: {
    tag: "Blocks";
    parameters: {
      body: MoveBlockDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspaceGroupsController_findAll: {
    tag: "Workspace Groups";
    parameters: {
      path: {
        workspaceId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspaceGroupsController_create: {
    tag: "Workspace Groups";
    parameters: {
      body: CreateGroupDto;
      path: {
        workspaceId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspaceGroupsController_delete: {
    tag: "Workspace Groups";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspaceGroupsController_update: {
    tag: "Workspace Groups";
    parameters: {
      body: UpdateGroupDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  WorkspaceGroupsController_reorder: {
    tag: "Workspace Groups";
    parameters: {
      body: ReorderGroupsDto;
      path: {
        workspaceId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  FormulaController_analyze: {
    tag: "Formulas";
    parameters: {
      body: AnalyzeFormulaDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_findAll: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        workspaceId: string;
      };
      query: {
        groupId?: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_create: {
    tag: "Dynamic Tables";
    parameters: {
      body: CreateTableDto;
      path: {
        workspaceId: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_findOne: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_delete: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_update: {
    tag: "Dynamic Tables";
    parameters: {
      body: UpdateTableDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_getVersionHistory: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_createVersion: {
    tag: "Dynamic Tables";
    parameters: {
      body: CreateVersionDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_activateVersion: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_getCells: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
      };
      query: {
        startRow?: number;
        endRow?: number;
        startCol?: number;
        endCol?: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_updateCell: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
        rowIndex: number;
        colIndex: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_batchUpdateCells: {
    tag: "Dynamic Tables";
    parameters: {
      body: BatchUpdateCellsDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_insertRow: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
        index: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_deleteRow: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
        index: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_insertColumn: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
        index: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_deleteColumn: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
        index: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_createLink: {
    tag: "Dynamic Tables";
    parameters: {
      body: CreateLinkDto;
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_updateMatrixFormulas: {
    tag: "Dynamic Tables";
    parameters: {
      body: string[];
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  DynamicTablesController_getDonorStatus: {
    tag: "Dynamic Tables";
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  RegionsController_findAll: {
    tag: "Regions";
    parameters: {
      query: {
        countryId?: number;
        federalDistrictId?: number;
        regionTypeId?: number;
        isActive?: boolean;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  RegionsController_findById: {
    tag: "Regions";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  RegionsController_findByDistrict: {
    tag: "Regions";
    parameters: {
      path: {
        districtId: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  RegionsController_findByCountry: {
    tag: "Regions";
    parameters: {
      path: {
        countryId: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SportsController_findAll: {
    tag: "Sports";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SportsController_findById: {
    tag: "Sports";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SportsController_findDisciplines: {
    tag: "Sports";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_findAll: {
    tag: "Indicators";
    parameters: {
      query: {
        sportId?: number;
        regionId?: number;
        groupId?: number;
        search?: string;
        scope?: string;
        scopes?: string[];
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_create: {
    tag: "Indicators";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_findById: {
    tag: "Indicators";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_delete: {
    tag: "Indicators";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_update: {
    tag: "Indicators";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_findBySport: {
    tag: "Indicators";
    parameters: {
      path: {
        sportId: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_getTemplates: {
    tag: "Indicators";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_generate: {
    tag: "Indicators";
    parameters: {
      body: GenerateIndicatorsDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_getGroups: {
    tag: "Indicators";
    parameters: {
      query: {
        sportId?: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_createGroup: {
    tag: "Indicators";
    parameters: {
      body: CreateIndicatorGroupDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_getGenders: {
    tag: "Indicators";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_getAgeGroups: {
    tag: "Indicators";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_deleteGroup: {
    tag: "Indicators";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorsController_updateGroup: {
    tag: "Indicators";
    parameters: {
      body: UpdateIndicatorGroupDto;
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  OrganizationsController_findAll: {
    tag: "Organizations";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  OrganizationsController_findFederations: {
    tag: "Organizations";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  OrganizationsController_getTree: {
    tag: "Organizations";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  OrganizationsController_getHierarchy: {
    tag: "Organizations";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  OrganizationsController_findById: {
    tag: "Organizations";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorGroupsController_findAll: {
    tag: "Indicator Groups";
    parameters: {
      query: {
        sportId?: number;
        regionId?: number;
        type?: "Unified" | "Legacy" | "Custom";
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorGroupsController_findById: {
    tag: "Indicator Groups";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  IndicatorGroupsController_findIndicatorsByGroup: {
    tag: "Indicator Groups";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SeasonsController_findAll: {
    tag: "Seasons";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SeasonsController_create: {
    tag: "Seasons";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SeasonsController_findById: {
    tag: "Seasons";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SeasonsController_delete: {
    tag: "Seasons";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SeasonsController_update: {
    tag: "Seasons";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SeasonsController_generate: {
    tag: "Seasons";
    parameters: {
      body: GenerateSeasonsDto;
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  SeasonsController_findCurrent: {
    tag: "Seasons";
    parameters: {};
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  EventsController_findAll: {
    tag: "Events";
    parameters: {
      query: {
        sportId?: number;
        regionId?: number;
        importance?: "High" | "Medium" | "Low";
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  EventsController_findById: {
    tag: "Events";
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  CountriesController_findActive: {
    tag: any;
    parameters: {
      query: {
        lang: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
  CountriesController_findAll: {
    tag: any;
    parameters: {
      query: {
        lang: string;
      };
    };
    responses: {
      success: undefined;
      error: undefined;
    };
  };
}
