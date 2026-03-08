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

import {
  AddMemberDto,
  AdminLoginDto,
  AdminLoginResponseDto,
  AdminLogoutResponseDto,
  AdminMeResponseDto,
  AdminRefreshResponseDto,
  AdminResetDto,
  AdminResetResponseDto,
  AdminSetupDto,
  AdminSetupResponseDto,
  AdminUserResponseDto,
  AdminUsersListResponseDto,
  AnalyzeFormulaDto,
  ApiKeyResponseDto,
  BatchUpdateCellsDto,
  BlockResponseDto,
  BlocksListResponseDto,
  CellsResponseDto,
  ChangePasswordDto,
  CountryResponseDto,
  CreateAdminUserDto,
  CreateApiKeyDto,
  CreateBlockDto,
  CreateEventDto,
  CreateGroupDto,
  CreateIndicatorGroupDto,
  CreateIndicatorTemplateDto,
  CreateLicenseCategoryDto,
  CreateLinkDto,
  CreateOrganizationDto,
  CreatePageDto,
  CreateReferenceTableDto,
  CreateRoleDto,
  CreateTableDto,
  CreateUserDto,
  CreateVersionDto,
  CreateWorkspaceDto,
  CreateWorkspaceTemplateDto,
  DeleteAdminUserResponseDto,
  DeleteRoleResponseDto,
  DeleteWorkspaceResponseDto,
  DeleteWorkspaceTemplateResponseDto,
  EventResponseDto,
  EventsListResponseDto,
  ForgotPasswordDto,
  FormulaAnalysisResponseDto,
  GenerateIndicatorsDto,
  GenerateSeasonsDto,
  GroupsListResponseDto,
  IndicatorGroupResponseDto,
  IndicatorResponseDto,
  IndicatorsListResponseDto,
  LoginDto,
  LoginResponseDto,
  MeResponseDto,
  MessageResponseDto,
  MoveBlockDto,
  MoveOrganizationDto,
  MovePageDto,
  OrganizationLevelResponseDto,
  OrganizationResponseDto,
  OrganizationsListResponseDto,
  OrganizationTypeResponseDto,
  PageResponseDto,
  PageTreeResponseDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
  RegionResponseDto,
  RegionsListResponseDto,
  RegisterDto,
  RegisterResponseDto,
  ReorderGroupsDto,
  ResetPasswordDto,
  RoleResponseDto,
  RolesListResponseDto,
  SeasonResponseDto,
  SeasonsListResponseDto,
  SportResponseDto,
  SportsListResponseDto,
  TableResponseDto,
  TablesListResponseDto,
  TemplateResponseDto,
  TemplatesListResponseDto,
  TokenValidityResponseDto,
  UpdateAdminMeDto,
  UpdateAdminMeResponseDto,
  UpdateAdminUserDto,
  UpdateBlockDto,
  UpdateEventDto,
  UpdateGroupDto,
  UpdateIndicatorTemplateDto,
  UpdateLicenseCategoryDto,
  UpdateMemberRoleDto,
  UpdateOrganizationDto,
  UpdatePageDto,
  UpdateProfileDto,
  UpdateRoleDto,
  UpdateTableDto,
  UpdateUserDto,
  UpdateWorkspaceDto,
  UpdateWorkspaceTemplateDto,
  UserApprovedResponseDto,
  UserBlockedResponseDto,
  UserCreatedResponseDto,
  UserDeletedResponseDto,
  UserResponseDto,
  UsersListResponseDto,
  UserUpdatedResponseDto,
  WorkspaceGroupResponseDto,
  WorkspaceResponseDto,
  WorkspacesListResponseDto,
  WorkspaceTemplateResponseDto,
  WorkspaceTemplatesListResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V1<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerRegister
   * @summary Register a new user
   * @request POST:/v1/auth/register
   */
  authControllerRegister = (data: RegisterDto, params: RequestParams = {}) =>
    this.request<RegisterResponseDto, void>({
      path: `/v1/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerLogin
   * @summary Login with email and password
   * @request POST:/v1/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.request<LoginResponseDto, void>({
      path: `/v1/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerRefresh
   * @summary Refresh access token
   * @request POST:/v1/auth/refresh
   */
  authControllerRefresh = (data: RefreshTokenDto, params: RequestParams = {}) =>
    this.request<RefreshTokenResponseDto, void>({
      path: `/v1/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerForgotPassword
   * @summary Request password reset
   * @request POST:/v1/auth/forgot-password
   */
  authControllerForgotPassword = (
    data: ForgotPasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<MessageResponseDto, any>({
      path: `/v1/auth/forgot-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerResetPassword
   * @summary Reset password with token
   * @request POST:/v1/auth/reset-password
   */
  authControllerResetPassword = (
    data: ResetPasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<MessageResponseDto, void>({
      path: `/v1/auth/reset-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerVerifyResetToken
   * @summary Verify if reset token is valid
   * @request GET:/v1/auth/verify-reset-token/{token}
   */
  authControllerVerifyResetToken = (
    token: string,
    params: RequestParams = {},
  ) =>
    this.request<TokenValidityResponseDto, any>({
      path: `/v1/auth/verify-reset-token/${token}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerGetMe
   * @summary Get current user profile
   * @request GET:/v1/auth/me
   */
  authControllerGetMe = (params: RequestParams = {}) =>
    this.request<MeResponseDto, void>({
      path: `/v1/auth/me`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerChangePassword
   * @summary Change current user password
   * @request POST:/v1/auth/change-password
   */
  authControllerChangePassword = (
    data: ChangePasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<MessageResponseDto, any>({
      path: `/v1/auth/change-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerGetProfile
   * @summary Get current user profile
   * @request GET:/v1/users/me
   * @secure
   */
  usersControllerGetProfile = (params: RequestParams = {}) =>
    this.request<UserResponseDto, any>({
      path: `/v1/users/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerUpdateProfile
   * @summary Update current user profile
   * @request PATCH:/v1/users/profile
   * @secure
   */
  usersControllerUpdateProfile = (
    data: UpdateProfileDto,
    params: RequestParams = {},
  ) =>
    this.request<UserResponseDto, any>({
      path: `/v1/users/profile`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindAll
   * @summary List all users
   * @request GET:/v1/users
   * @secure
   */
  usersControllerFindAll = (
    query?: {
      search?: string;
      organization_id?: string;
      role?: string;
      is_active?: string;
      page?: string;
      limit?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UsersListResponseDto, any>({
      path: `/v1/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerCreate
   * @summary Create user
   * @request POST:/v1/users
   * @secure
   */
  usersControllerCreate = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<UserCreatedResponseDto, any>({
      path: `/v1/users`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindOne
   * @summary Get user by ID
   * @request GET:/v1/users/{id}
   * @secure
   */
  usersControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<UserResponseDto, any>({
      path: `/v1/users/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerUpdate
   * @summary Update user
   * @request PATCH:/v1/users/{id}
   * @secure
   */
  usersControllerUpdate = (
    id: string,
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.request<UserUpdatedResponseDto, any>({
      path: `/v1/users/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerRemove
   * @summary Delete user
   * @request DELETE:/v1/users/{id}
   * @secure
   */
  usersControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<UserDeletedResponseDto, any>({
      path: `/v1/users/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerApprove
   * @summary Approve user
   * @request PATCH:/v1/users/{id}/approve
   * @secure
   */
  usersControllerApprove = (id: string, params: RequestParams = {}) =>
    this.request<UserApprovedResponseDto, any>({
      path: `/v1/users/${id}/approve`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerBlock
   * @summary Block/unblock user
   * @request PATCH:/v1/users/{id}/block
   * @secure
   */
  usersControllerBlock = (id: string, params: RequestParams = {}) =>
    this.request<UserBlockedResponseDto, any>({
      path: `/v1/users/${id}/block`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerCreateApiKey
   * @summary Create API key for current user
   * @request POST:/v1/users/api-keys
   * @secure
   */
  usersControllerCreateApiKey = (
    data: CreateApiKeyDto,
    params: RequestParams = {},
  ) =>
    this.request<ApiKeyResponseDto, any>({
      path: `/v1/users/api-keys`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerGetPermissionsTree
   * @summary Get permissions tree for admin or user
   * @request GET:/v1/rbac/permissions/tree
   * @secure
   */
  rbacControllerGetPermissionsTree = (
    query: {
      appType: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/rbac/permissions/tree`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerGetAdminRoles
   * @summary Get all admin roles
   * @request GET:/v1/rbac/admin/roles
   * @secure
   */
  rbacControllerGetAdminRoles = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/admin/roles`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerCreateAdminRole
   * @summary Create new admin role
   * @request POST:/v1/rbac/admin/roles
   * @secure
   */
  rbacControllerCreateAdminRole = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/admin/roles`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerGetAdminRole
   * @summary Get admin role by ID
   * @request GET:/v1/rbac/admin/roles/{id}
   * @secure
   */
  rbacControllerGetAdminRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/admin/roles/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerUpdateAdminRole
   * @summary Update admin role
   * @request PUT:/v1/rbac/admin/roles/{id}
   * @secure
   */
  rbacControllerUpdateAdminRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/admin/roles/${id}`,
      method: "PUT",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerDeleteAdminRole
   * @summary Delete admin role
   * @request DELETE:/v1/rbac/admin/roles/{id}
   * @secure
   */
  rbacControllerDeleteAdminRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/admin/roles/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerUpdateAdminRolePermissions
   * @summary Update admin role permissions
   * @request PUT:/v1/rbac/admin/roles/{id}/permissions
   * @secure
   */
  rbacControllerUpdateAdminRolePermissions = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/rbac/admin/roles/${id}/permissions`,
      method: "PUT",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerGetUserRoles
   * @summary Get all user roles
   * @request GET:/v1/rbac/user/roles
   * @secure
   */
  rbacControllerGetUserRoles = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/user/roles`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerCreateUserRole
   * @summary Create new user role
   * @request POST:/v1/rbac/user/roles
   * @secure
   */
  rbacControllerCreateUserRole = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/user/roles`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerGetUserRole
   * @summary Get user role by ID
   * @request GET:/v1/rbac/user/roles/{id}
   * @secure
   */
  rbacControllerGetUserRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/user/roles/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerUpdateUserRole
   * @summary Update user role
   * @request PUT:/v1/rbac/user/roles/{id}
   * @secure
   */
  rbacControllerUpdateUserRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/user/roles/${id}`,
      method: "PUT",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerDeleteUserRole
   * @summary Delete user role
   * @request DELETE:/v1/rbac/user/roles/{id}
   * @secure
   */
  rbacControllerDeleteUserRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/user/roles/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerUpdateUserRolePermissions
   * @summary Update user role permissions
   * @request PUT:/v1/rbac/user/roles/{id}/permissions
   * @secure
   */
  rbacControllerUpdateUserRolePermissions = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/rbac/user/roles/${id}/permissions`,
      method: "PUT",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerGetUserRoleAssignment
   * @summary Get user role assignment
   * @request GET:/v1/rbac/user/{userId}/role
   * @secure
   */
  rbacControllerGetUserRoleAssignment = (
    userId: string,
    query: {
      appType: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/rbac/user/${userId}/role`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerAssignUserRole
   * @summary Assign role to user
   * @request PUT:/v1/rbac/user/{userId}/role
   * @secure
   */
  rbacControllerAssignUserRole = (userId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/rbac/user/${userId}/role`,
      method: "PUT",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerCreate
   * @summary Create a new workspace
   * @request POST:/v1/workspaces
   * @secure
   */
  workspaceControllerCreate = (
    data: CreateWorkspaceDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceResponseDto, void>({
      path: `/v1/workspaces`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerFindAll
   * @summary Get all workspaces for current user
   * @request GET:/v1/workspaces
   * @secure
   */
  workspaceControllerFindAll = (params: RequestParams = {}) =>
    this.request<WorkspacesListResponseDto, void>({
      path: `/v1/workspaces`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerFindOne
   * @summary Get workspace by ID
   * @request GET:/v1/workspaces/{id}
   * @secure
   */
  workspaceControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<WorkspaceResponseDto, void>({
      path: `/v1/workspaces/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerUpdate
   * @summary Update workspace
   * @request PATCH:/v1/workspaces/{id}
   * @secure
   */
  workspaceControllerUpdate = (
    id: string,
    data: UpdateWorkspaceDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceResponseDto, void>({
      path: `/v1/workspaces/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerDelete
   * @summary Delete workspace
   * @request DELETE:/v1/workspaces/{id}
   * @secure
   */
  workspaceControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/workspaces/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerAddMember
   * @summary Add member to workspace
   * @request POST:/v1/workspaces/{id}/members
   * @secure
   */
  workspaceControllerAddMember = (
    id: string,
    data: AddMemberDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/workspaces/${id}/members`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerGetMembers
   * @summary Get workspace members
   * @request GET:/v1/workspaces/{id}/members
   * @secure
   */
  workspaceControllerGetMembers = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/workspaces/${id}/members`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerUpdateMemberRole
   * @summary Update member role
   * @request PATCH:/v1/workspaces/{id}/members/{memberId}
   * @secure
   */
  workspaceControllerUpdateMemberRole = (
    id: string,
    memberId: string,
    data: UpdateMemberRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/workspaces/${id}/members/${memberId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerRemoveMember
   * @summary Remove member from workspace
   * @request DELETE:/v1/workspaces/{id}/members/{memberId}
   * @secure
   */
  workspaceControllerRemoveMember = (
    id: string,
    memberId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/workspaces/${id}/members/${memberId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupControllerCreate
   * @summary Create a new group in workspace
   * @request POST:/v1/workspaces/{workspaceId}/groups
   * @secure
   */
  workspaceGroupControllerCreate = (
    workspaceId: string,
    data: CreateGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceGroupResponseDto, void>({
      path: `/v1/workspaces/${workspaceId}/groups`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupControllerFindAll
   * @summary Get all groups in workspace
   * @request GET:/v1/workspaces/{workspaceId}/groups
   * @secure
   */
  workspaceGroupControllerFindAll = (
    workspaceId: string,
    params: RequestParams = {},
  ) =>
    this.request<GroupsListResponseDto, void>({
      path: `/v1/workspaces/${workspaceId}/groups`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupControllerUpdate
   * @summary Update group
   * @request PATCH:/v1/groups/{id}
   * @secure
   */
  workspaceGroupControllerUpdate = (
    id: string,
    data: UpdateGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceGroupResponseDto, void>({
      path: `/v1/groups/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupControllerDelete
   * @summary Delete group
   * @request DELETE:/v1/groups/{id}
   * @secure
   */
  workspaceGroupControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/groups/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupControllerReorder
   * @summary Reorder groups
   * @request POST:/v1/workspaces/{workspaceId}/groups/reorder
   * @secure
   */
  workspaceGroupControllerReorder = (
    workspaceId: string,
    data: ReorderGroupsDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/workspaces/${workspaceId}/groups/reorder`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Templates
   * @name WorkspaceTemplateControllerFindAll
   * @summary List all available workspace templates
   * @request GET:/v1/workspace-templates
   * @secure
   */
  workspaceTemplateControllerFindAll = (
    query?: {
      organization_id?: number;
      sport_id?: number;
      country_id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TemplatesListResponseDto, any>({
      path: `/v1/workspace-templates`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Templates
   * @name WorkspaceTemplateControllerFindOne
   * @summary Get template details
   * @request GET:/v1/workspace-templates/{id}
   * @secure
   */
  workspaceTemplateControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<TemplateResponseDto, any>({
      path: `/v1/workspace-templates/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Setup
   * @name AdminSetupControllerSetup
   * @summary Create the first SUPER_ADMIN user
   * @request POST:/v1/admin/setup
   */
  adminSetupControllerSetup = (
    data: AdminSetupDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminSetupResponseDto, void>({
      path: `/v1/admin/setup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Setup
   * @name AdminSetupControllerResetAdmin
   * @summary Reset admin password (development only)
   * @request POST:/v1/admin/reset-admin
   */
  adminSetupControllerResetAdmin = (
    data: AdminResetDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminResetResponseDto, any>({
      path: `/v1/admin/reset-admin`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Workspaces
   * @name AdminWorkspaceControllerFindAll
   * @summary Get all workspaces (Admin only)
   * @request GET:/v1/admin/workspaces
   * @secure
   */
  adminWorkspaceControllerFindAll = (params: RequestParams = {}) =>
    this.request<WorkspacesListResponseDto, any>({
      path: `/v1/admin/workspaces`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Workspaces
   * @name AdminWorkspaceControllerCreate
   * @summary Create a new workspace/template as admin
   * @request POST:/v1/admin/workspaces
   * @secure
   */
  adminWorkspaceControllerCreate = (
    data: CreateWorkspaceDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceResponseDto, any>({
      path: `/v1/admin/workspaces`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Workspaces
   * @name AdminWorkspaceControllerUpdate
   * @summary Update any workspace
   * @request PATCH:/v1/admin/workspaces/{id}
   * @secure
   */
  adminWorkspaceControllerUpdate = (
    id: string,
    data: UpdateWorkspaceDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceResponseDto, any>({
      path: `/v1/admin/workspaces/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Workspaces
   * @name AdminWorkspaceControllerDelete
   * @summary Delete any workspace
   * @request DELETE:/v1/admin/workspaces/{id}
   * @secure
   */
  adminWorkspaceControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<DeleteWorkspaceResponseDto, any>({
      path: `/v1/admin/workspaces/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Workspace Templates
   * @name AdminWorkspaceTemplateControllerFindAll
   * @summary List all workspace templates
   * @request GET:/v1/admin/workspace-templates
   * @secure
   */
  adminWorkspaceTemplateControllerFindAll = (
    query?: {
      organization_id?: number;
      sport_id?: number;
      country_id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceTemplatesListResponseDto, any>({
      path: `/v1/admin/workspace-templates`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Workspace Templates
   * @name AdminWorkspaceTemplateControllerCreate
   * @summary Create a new workspace template
   * @request POST:/v1/admin/workspace-templates
   * @secure
   */
  adminWorkspaceTemplateControllerCreate = (
    data: CreateWorkspaceTemplateDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceTemplateResponseDto, any>({
      path: `/v1/admin/workspace-templates`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Workspace Templates
   * @name AdminWorkspaceTemplateControllerUpdate
   * @summary Update workspace template
   * @request PATCH:/v1/admin/workspace-templates/{id}
   * @secure
   */
  adminWorkspaceTemplateControllerUpdate = (
    id: string,
    data: UpdateWorkspaceTemplateDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceTemplateResponseDto, any>({
      path: `/v1/admin/workspace-templates/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Workspace Templates
   * @name AdminWorkspaceTemplateControllerDelete
   * @summary Delete workspace template
   * @request DELETE:/v1/admin/workspace-templates/{id}
   * @secure
   */
  adminWorkspaceTemplateControllerDelete = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<DeleteWorkspaceTemplateResponseDto, any>({
      path: `/v1/admin/workspace-templates/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Profile
   * @name AdminMeControllerGetMe
   * @summary Get current admin profile
   * @request GET:/v1/admin/me
   * @secure
   */
  adminMeControllerGetMe = (params: RequestParams = {}) =>
    this.request<AdminMeResponseDto, any>({
      path: `/v1/admin/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Profile
   * @name AdminMeControllerUpdateMe
   * @summary Update current admin profile
   * @request PATCH:/v1/admin/me
   * @secure
   */
  adminMeControllerUpdateMe = (
    data: UpdateAdminMeDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateAdminMeResponseDto, any>({
      path: `/v1/admin/me`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Authentication
   * @name AdminAuthControllerLogin
   * @summary Admin login with email and password
   * @request POST:/v1/admin/auth/login
   */
  adminAuthControllerLogin = (
    data: AdminLoginDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminLoginResponseDto, void>({
      path: `/v1/admin/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Authentication
   * @name AdminAuthControllerLogout
   * @summary Admin logout
   * @request POST:/v1/admin/auth/logout
   */
  adminAuthControllerLogout = (params: RequestParams = {}) =>
    this.request<AdminLogoutResponseDto, void>({
      path: `/v1/admin/auth/logout`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Authentication
   * @name AdminAuthControllerRefresh
   * @summary Refresh admin session
   * @request POST:/v1/admin/auth/refresh
   */
  adminAuthControllerRefresh = (params: RequestParams = {}) =>
    this.request<AdminRefreshResponseDto, void>({
      path: `/v1/admin/auth/refresh`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Users
   * @name AdminUsersControllerFindAll
   * @summary List all admin users with pagination
   * @request GET:/v1/admin/users
   * @secure
   */
  adminUsersControllerFindAll = (
    query: {
      page: number;
      limit: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<AdminUsersListResponseDto, any>({
      path: `/v1/admin/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Users
   * @name AdminUsersControllerCreate
   * @summary Create new admin user
   * @request POST:/v1/admin/users
   * @secure
   */
  adminUsersControllerCreate = (
    data: CreateAdminUserDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminUserResponseDto, void>({
      path: `/v1/admin/users`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Users
   * @name AdminUsersControllerFindOne
   * @summary Get admin user by ID
   * @request GET:/v1/admin/users/{id}
   * @secure
   */
  adminUsersControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<AdminUserResponseDto, void>({
      path: `/v1/admin/users/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Users
   * @name AdminUsersControllerUpdate
   * @summary Update admin user
   * @request PATCH:/v1/admin/users/{id}
   * @secure
   */
  adminUsersControllerUpdate = (
    id: string,
    data: UpdateAdminUserDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminUserResponseDto, void>({
      path: `/v1/admin/users/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Users
   * @name AdminUsersControllerRemove
   * @summary Delete admin user
   * @request DELETE:/v1/admin/users/{id}
   * @secure
   */
  adminUsersControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<DeleteAdminUserResponseDto, void>({
      path: `/v1/admin/users/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Roles
   * @name AdminRolesControllerFindAll
   * @summary List all roles
   * @request GET:/v1/admin/roles
   * @secure
   */
  adminRolesControllerFindAll = (params: RequestParams = {}) =>
    this.request<RolesListResponseDto, any>({
      path: `/v1/admin/roles`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Roles
   * @name AdminRolesControllerCreate
   * @summary Create new role
   * @request POST:/v1/admin/roles
   * @secure
   */
  adminRolesControllerCreate = (
    data: CreateRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<RoleResponseDto, any>({
      path: `/v1/admin/roles`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Roles
   * @name AdminRolesControllerFindOne
   * @summary Get role by ID
   * @request GET:/v1/admin/roles/{id}
   * @secure
   */
  adminRolesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<RoleResponseDto, any>({
      path: `/v1/admin/roles/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Roles
   * @name AdminRolesControllerUpdate
   * @summary Update role
   * @request PATCH:/v1/admin/roles/{id}
   * @secure
   */
  adminRolesControllerUpdate = (
    id: string,
    data: UpdateRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<RoleResponseDto, any>({
      path: `/v1/admin/roles/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Roles
   * @name AdminRolesControllerRemove
   * @summary Delete role (system roles cannot be deleted)
   * @request DELETE:/v1/admin/roles/{id}
   * @secure
   */
  adminRolesControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<DeleteRoleResponseDto, any>({
      path: `/v1/admin/roles/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerCreate
   * @summary Create a new page in workspace
   * @request POST:/v1/workspaces/{workspaceId}/pages
   * @secure
   */
  pagesControllerCreate = (
    workspaceId: string,
    data: CreatePageDto,
    params: RequestParams = {},
  ) =>
    this.request<PageResponseDto, void>({
      path: `/v1/workspaces/${workspaceId}/pages`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerGetTree
   * @summary Get page tree for workspace
   * @request GET:/v1/workspaces/{workspaceId}/pages
   * @secure
   */
  pagesControllerGetTree = (workspaceId: string, params: RequestParams = {}) =>
    this.request<PageTreeResponseDto, void>({
      path: `/v1/workspaces/${workspaceId}/pages`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerFindOne
   * @summary Get page by ID
   * @request GET:/v1/pages/{id}
   * @secure
   */
  pagesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<PageResponseDto, void>({
      path: `/v1/pages/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerUpdate
   * @summary Update page
   * @request PATCH:/v1/pages/{id}
   * @secure
   */
  pagesControllerUpdate = (
    id: string,
    data: UpdatePageDto,
    params: RequestParams = {},
  ) =>
    this.request<PageResponseDto, void>({
      path: `/v1/pages/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerDelete
   * @summary Delete page (soft delete)
   * @request DELETE:/v1/pages/{id}
   * @secure
   */
  pagesControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/pages/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerMove
   * @summary Move page to new parent or position
   * @request POST:/v1/pages/{id}/move
   * @secure
   */
  pagesControllerMove = (
    id: string,
    data: MovePageDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/pages/${id}/move`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerCreate
   * @summary Create a new block in page
   * @request POST:/v1/pages/{pageId}/blocks
   * @secure
   */
  blocksControllerCreate = (
    pageId: string,
    data: CreateBlockDto,
    params: RequestParams = {},
  ) =>
    this.request<BlockResponseDto, void>({
      path: `/v1/pages/${pageId}/blocks`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerFindByPage
   * @summary Get all blocks for a page
   * @request GET:/v1/pages/{pageId}/blocks
   * @secure
   */
  blocksControllerFindByPage = (pageId: string, params: RequestParams = {}) =>
    this.request<BlocksListResponseDto, void>({
      path: `/v1/pages/${pageId}/blocks`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerFindOne
   * @summary Get block by ID
   * @request GET:/v1/blocks/{id}
   * @secure
   */
  blocksControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<BlockResponseDto, void>({
      path: `/v1/blocks/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerUpdate
   * @summary Update block content
   * @request PATCH:/v1/blocks/{id}
   * @secure
   */
  blocksControllerUpdate = (
    id: string,
    data: UpdateBlockDto,
    params: RequestParams = {},
  ) =>
    this.request<BlockResponseDto, void>({
      path: `/v1/blocks/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerDelete
   * @summary Delete block (soft delete)
   * @request DELETE:/v1/blocks/{id}
   * @secure
   */
  blocksControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/blocks/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerMove
   * @summary Move block to new position
   * @request POST:/v1/blocks/{id}/move
   * @secure
   */
  blocksControllerMove = (
    id: string,
    data: MoveBlockDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/blocks/${id}/move`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerCreate
   * @summary Create a new table in workspace
   * @request POST:/v1/tables/workspaces/{workspaceId}/tables
   * @secure
   */
  tablesControllerCreate = (
    workspaceId: string,
    data: CreateTableDto,
    params: RequestParams = {},
  ) =>
    this.request<TableResponseDto, void>({
      path: `/v1/tables/workspaces/${workspaceId}/tables`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerFindAll
   * @summary Get all tables in workspace
   * @request GET:/v1/tables/workspaces/{workspaceId}/tables
   * @secure
   */
  tablesControllerFindAll = (
    workspaceId: string,
    query?: {
      groupId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TablesListResponseDto, void>({
      path: `/v1/tables/workspaces/${workspaceId}/tables`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerFindOne
   * @summary Get table by ID
   * @request GET:/v1/tables/tables/{id}
   * @secure
   */
  tablesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<TableResponseDto, void>({
      path: `/v1/tables/tables/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerUpdate
   * @summary Update table
   * @request PATCH:/v1/tables/tables/{id}
   * @secure
   */
  tablesControllerUpdate = (
    id: string,
    data: UpdateTableDto,
    params: RequestParams = {},
  ) =>
    this.request<TableResponseDto, void>({
      path: `/v1/tables/tables/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerDelete
   * @summary Delete table
   * @request DELETE:/v1/tables/tables/{id}
   * @secure
   */
  tablesControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/tables/tables/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerCreateVersion
   * @summary Create new version
   * @request POST:/v1/tables/tables/{id}/versions
   * @secure
   */
  tablesControllerCreateVersion = (
    id: string,
    data: CreateVersionDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/tables/${id}/versions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerGetVersionHistory
   * @summary Get version history
   * @request GET:/v1/tables/tables/{id}/versions
   * @secure
   */
  tablesControllerGetVersionHistory = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/tables/${id}/versions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerActivateVersion
   * @summary Activate version
   * @request POST:/v1/tables/versions/{id}/activate
   * @secure
   */
  tablesControllerActivateVersion = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/tables/versions/${id}/activate`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerGetCells
   * @summary Get cells with pagination
   * @request GET:/v1/tables/versions/{id}/cells
   * @secure
   */
  tablesControllerGetCells = (
    id: string,
    query?: {
      /**
       * Start row (0-based)
       * @example 0
       */
      startRow?: number;
      /**
       * End row (0-based)
       * @example 99
       */
      endRow?: number;
      /**
       * Start column (0-based)
       * @example 0
       */
      startCol?: number;
      /**
       * End column (0-based)
       * @example 9
       */
      endCol?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CellsResponseDto, void>({
      path: `/v1/tables/versions/${id}/cells`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerUpdateCell
   * @summary Update single cell
   * @request PATCH:/v1/tables/versions/{id}/cells/{rowIndex}/{colIndex}
   * @secure
   */
  tablesControllerUpdateCell = (
    id: string,
    rowIndex: number,
    colIndex: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/versions/${id}/cells/${rowIndex}/${colIndex}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerBatchUpdateCells
   * @summary Batch update cells
   * @request POST:/v1/tables/versions/{id}/cells/batch
   * @secure
   */
  tablesControllerBatchUpdateCells = (
    id: string,
    data: BatchUpdateCellsDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/versions/${id}/cells/batch`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerDeleteRow
   * @summary Delete a row and shift following rows
   * @request DELETE:/v1/tables/versions/{id}/rows/{index}
   * @secure
   */
  tablesControllerDeleteRow = (
    id: string,
    index: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/versions/${id}/rows/${index}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerInsertRow
   * @summary Insert a new row and shift following rows
   * @request POST:/v1/tables/versions/{id}/rows/{index}
   * @secure
   */
  tablesControllerInsertRow = (
    id: string,
    index: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/versions/${id}/rows/${index}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerDeleteColumn
   * @summary Delete a column and shift following columns
   * @request DELETE:/v1/tables/versions/{id}/columns/{index}
   * @secure
   */
  tablesControllerDeleteColumn = (
    id: string,
    index: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/versions/${id}/columns/${index}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerInsertColumn
   * @summary Insert a new column and shift following columns
   * @request POST:/v1/tables/versions/{id}/columns/{index}
   * @secure
   */
  tablesControllerInsertColumn = (
    id: string,
    index: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/versions/${id}/columns/${index}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerCreateLink
   * @summary Connect table to donor (another table or catalog)
   * @request POST:/v1/tables/tables/{id}/links
   * @secure
   */
  tablesControllerCreateLink = (
    id: string,
    data: CreateLinkDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/tables/${id}/links`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerUpdateMatrixFormulas
   * @summary Update range/matrix formulas for a version
   * @request PATCH:/v1/tables/versions/{id}/matrix-formulas
   * @secure
   */
  tablesControllerUpdateMatrixFormulas = (
    id: string,
    data: string[],
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/tables/versions/${id}/matrix-formulas`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerGetDonorStatus
   * @summary Check if donor data has changed
   * @request GET:/v1/tables/tables/{id}/donor-status
   * @secure
   */
  tablesControllerGetDonorStatus = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/v1/tables/tables/${id}/donor-status`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Formulas
   * @name FormulaControllerAnalyze
   * @summary Analyze formula and resolve external dependencies
   * @request POST:/v1/formulas/analyze
   * @secure
   */
  formulaControllerAnalyze = (
    data: AnalyzeFormulaDto,
    params: RequestParams = {},
  ) =>
    this.request<FormulaAnalysisResponseDto, any>({
      path: `/v1/formulas/analyze`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindAll
   * @summary Get all regions
   * @request GET:/v1/admin/reference/regions
   */
  regionsControllerFindAll = (
    query?: {
      /** Filter by country ID */
      countryId?: number;
      /** Filter by federal district ID */
      federalDistrictId?: number;
      /** Filter by region type ID */
      regionTypeId?: number;
      /**
       * Filter by active status
       * @default true
       */
      isActive?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<RegionsListResponseDto, any>({
      path: `/v1/admin/reference/regions`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindAll2
   * @summary Get all regions
   * @request GET:/v1/reference/regions
   * @originalName regionsControllerFindAll
   * @duplicate
   */
  regionsControllerFindAll2 = (
    query?: {
      /** Filter by country ID */
      countryId?: number;
      /** Filter by federal district ID */
      federalDistrictId?: number;
      /** Filter by region type ID */
      regionTypeId?: number;
      /**
       * Filter by active status
       * @default true
       */
      isActive?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<RegionsListResponseDto, any>({
      path: `/v1/reference/regions`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindById
   * @summary Get region by ID
   * @request GET:/v1/admin/reference/regions/{id}
   */
  regionsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<RegionResponseDto, void>({
      path: `/v1/admin/reference/regions/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindById2
   * @summary Get region by ID
   * @request GET:/v1/reference/regions/{id}
   * @originalName regionsControllerFindById
   * @duplicate
   */
  regionsControllerFindById2 = (id: number, params: RequestParams = {}) =>
    this.request<RegionResponseDto, void>({
      path: `/v1/reference/regions/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindByDistrict
   * @summary Get regions by federal district
   * @request GET:/v1/admin/reference/regions/by-district/{districtId}
   */
  regionsControllerFindByDistrict = (
    districtId: number,
    params: RequestParams = {},
  ) =>
    this.request<RegionResponseDto[], any>({
      path: `/v1/admin/reference/regions/by-district/${districtId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindByDistrict2
   * @summary Get regions by federal district
   * @request GET:/v1/reference/regions/by-district/{districtId}
   * @originalName regionsControllerFindByDistrict
   * @duplicate
   */
  regionsControllerFindByDistrict2 = (
    districtId: number,
    params: RequestParams = {},
  ) =>
    this.request<RegionResponseDto[], any>({
      path: `/v1/reference/regions/by-district/${districtId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindByCountry
   * @summary Get regions by country
   * @request GET:/v1/admin/reference/regions/by-country/{countryId}
   */
  regionsControllerFindByCountry = (
    countryId: number,
    params: RequestParams = {},
  ) =>
    this.request<RegionResponseDto[], any>({
      path: `/v1/admin/reference/regions/by-country/${countryId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindByCountry2
   * @summary Get regions by country
   * @request GET:/v1/reference/regions/by-country/{countryId}
   * @originalName regionsControllerFindByCountry
   * @duplicate
   */
  regionsControllerFindByCountry2 = (
    countryId: number,
    params: RequestParams = {},
  ) =>
    this.request<RegionResponseDto[], any>({
      path: `/v1/reference/regions/by-country/${countryId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindAll
   * @summary Get all sports
   * @request GET:/v1/admin/reference/sports
   */
  sportsControllerFindAll = (params: RequestParams = {}) =>
    this.request<SportsListResponseDto, any>({
      path: `/v1/admin/reference/sports`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindAll2
   * @summary Get all sports
   * @request GET:/v1/reference/sports
   * @originalName sportsControllerFindAll
   * @duplicate
   */
  sportsControllerFindAll2 = (params: RequestParams = {}) =>
    this.request<SportsListResponseDto, any>({
      path: `/v1/reference/sports`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindById
   * @summary Get sport by ID
   * @request GET:/v1/admin/reference/sports/{id}
   */
  sportsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<SportResponseDto, void>({
      path: `/v1/admin/reference/sports/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindById2
   * @summary Get sport by ID
   * @request GET:/v1/reference/sports/{id}
   * @originalName sportsControllerFindById
   * @duplicate
   */
  sportsControllerFindById2 = (id: number, params: RequestParams = {}) =>
    this.request<SportResponseDto, void>({
      path: `/v1/reference/sports/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindDisciplines
   * @summary Get disciplines for a sport
   * @request GET:/v1/admin/reference/sports/{id}/disciplines
   */
  sportsControllerFindDisciplines = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/admin/reference/sports/${id}/disciplines`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindDisciplines2
   * @summary Get disciplines for a sport
   * @request GET:/v1/reference/sports/{id}/disciplines
   * @originalName sportsControllerFindDisciplines
   * @duplicate
   */
  sportsControllerFindDisciplines2 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/sports/${id}/disciplines`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerFindAll
   * @summary Get all indicators with filters
   * @request GET:/v1/reference/indicators
   * @secure
   */
  indicatorsControllerFindAll = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
      /** Filter by region ID */
      regionId?: number;
      /** Filter by indicator group ID */
      groupId?: number;
      /** Search query */
      search?: string;
      /** Scope filters (global, sport, federation, personal) */
      scope?: string;
      /** Multiple scopes */
      scopes?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<IndicatorsListResponseDto, any>({
      path: `/v1/reference/indicators`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerCreate
   * @summary Create a manual indicator
   * @request POST:/v1/reference/indicators
   * @secure
   */
  indicatorsControllerCreate = (params: RequestParams = {}) =>
    this.request<IndicatorResponseDto, any>({
      path: `/v1/reference/indicators`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerCreateGroup
   * @summary Create indicator group
   * @request POST:/v1/reference/indicators/groups
   * @secure
   */
  indicatorsControllerCreateGroup = (
    data: CreateIndicatorGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<IndicatorGroupResponseDto, any>({
      path: `/v1/reference/indicators/groups`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetGroups
   * @summary Get all indicator groups
   * @request GET:/v1/reference/indicators/groups
   * @secure
   */
  indicatorsControllerGetGroups = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GroupsListResponseDto, any>({
      path: `/v1/reference/indicators/groups`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetGenders
   * @summary Get all genders
   * @request GET:/v1/reference/indicators/genders
   * @secure
   */
  indicatorsControllerGetGenders = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/genders`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetAgeGroups
   * @summary Get all age groups
   * @request GET:/v1/reference/indicators/age-groups
   * @secure
   */
  indicatorsControllerGetAgeGroups = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/age-groups`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetTemplates
   * @summary Get indicator generation templates
   * @request GET:/v1/reference/indicators/generation/templates
   * @secure
   */
  indicatorsControllerGetTemplates = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/generation/templates`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerCreateTemplate
   * @summary Create indicator generation template
   * @request POST:/v1/reference/indicators/generation/templates
   * @secure
   */
  indicatorsControllerCreateTemplate = (
    data: CreateIndicatorTemplateDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/generation/templates`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerUpdateTemplate
   * @summary Update indicator generation template
   * @request PATCH:/v1/reference/indicators/generation/templates/{id}
   * @secure
   */
  indicatorsControllerUpdateTemplate = (
    id: number,
    data: UpdateIndicatorTemplateDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/generation/templates/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerDeleteTemplate
   * @summary Delete indicator generation template
   * @request DELETE:/v1/reference/indicators/generation/templates/{id}
   * @secure
   */
  indicatorsControllerDeleteTemplate = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/generation/templates/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetTemplateParams
   * @summary Get parameters for a specific template
   * @request GET:/v1/reference/indicators/generation/templates/{id}/params
   * @secure
   */
  indicatorsControllerGetTemplateParams = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/generation/templates/${id}/params`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGenerate
   * @summary Generate indicators (flexible)
   * @request POST:/v1/reference/indicators/generation/generate
   * @secure
   */
  indicatorsControllerGenerate = (
    data: GenerateIndicatorsDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/generation/generate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerFindBySport
   * @summary Get indicators for a sport
   * @request GET:/v1/reference/indicators/by-sport/{sportId}
   * @secure
   */
  indicatorsControllerFindBySport = (
    sportId: number,
    params: RequestParams = {},
  ) =>
    this.request<IndicatorsListResponseDto, any>({
      path: `/v1/reference/indicators/by-sport/${sportId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerUpdate
   * @summary Update indicator
   * @request PATCH:/v1/reference/indicators/{id}
   * @secure
   */
  indicatorsControllerUpdate = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/${id}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerDelete
   * @summary Delete indicator (mark as inactive)
   * @request DELETE:/v1/reference/indicators/{id}
   * @secure
   */
  indicatorsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/indicators/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerFindById
   * @summary Get indicator by ID
   * @request GET:/v1/reference/indicators/{id}
   * @secure
   */
  indicatorsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<IndicatorResponseDto, void>({
      path: `/v1/reference/indicators/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindAll
   * @summary Get all indicator groups
   * @request GET:/v1/admin/reference/indicator-groups
   * @secure
   */
  indicatorGroupsControllerFindAll = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
      /** Filter by region ID */
      regionId?: number;
      /** Filter by group type */
      type?: "Unified" | "Legacy" | "Custom";
    },
    params: RequestParams = {},
  ) =>
    this.request<GroupsListResponseDto, any>({
      path: `/v1/admin/reference/indicator-groups`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindAll2
   * @summary Get all indicator groups
   * @request GET:/v1/reference/indicator-groups
   * @originalName indicatorGroupsControllerFindAll
   * @duplicate
   * @secure
   */
  indicatorGroupsControllerFindAll2 = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
      /** Filter by region ID */
      regionId?: number;
      /** Filter by group type */
      type?: "Unified" | "Legacy" | "Custom";
    },
    params: RequestParams = {},
  ) =>
    this.request<GroupsListResponseDto, any>({
      path: `/v1/reference/indicator-groups`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindById
   * @summary Get indicator group by ID
   * @request GET:/v1/admin/reference/indicator-groups/{id}
   * @secure
   */
  indicatorGroupsControllerFindById = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<IndicatorGroupResponseDto, void>({
      path: `/v1/admin/reference/indicator-groups/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindById2
   * @summary Get indicator group by ID
   * @request GET:/v1/reference/indicator-groups/{id}
   * @originalName indicatorGroupsControllerFindById
   * @duplicate
   * @secure
   */
  indicatorGroupsControllerFindById2 = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<IndicatorGroupResponseDto, void>({
      path: `/v1/reference/indicator-groups/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindIndicatorsByGroup
   * @summary Get indicators for a specific group
   * @request GET:/v1/admin/reference/indicator-groups/{id}/indicators
   * @secure
   */
  indicatorGroupsControllerFindIndicatorsByGroup = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<IndicatorsListResponseDto, any>({
      path: `/v1/admin/reference/indicator-groups/${id}/indicators`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindIndicatorsByGroup2
   * @summary Get indicators for a specific group
   * @request GET:/v1/reference/indicator-groups/{id}/indicators
   * @originalName indicatorGroupsControllerFindIndicatorsByGroup
   * @duplicate
   * @secure
   */
  indicatorGroupsControllerFindIndicatorsByGroup2 = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<IndicatorsListResponseDto, any>({
      path: `/v1/reference/indicator-groups/${id}/indicators`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags License Categories
   * @name LicenseCategoriesControllerFindAll
   * @summary Get all license categories
   * @request GET:/v1/reference/license-categories
   * @secure
   */
  licenseCategoriesControllerFindAll = (
    query: {
      sportId: number;
      type: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/license-categories`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags License Categories
   * @name LicenseCategoriesControllerCreate
   * @summary Create new category
   * @request POST:/v1/reference/license-categories
   * @secure
   */
  licenseCategoriesControllerCreate = (
    data: CreateLicenseCategoryDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/license-categories`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags License Categories
   * @name LicenseCategoriesControllerFindById
   * @summary Get category by ID
   * @request GET:/v1/reference/license-categories/{id}
   * @secure
   */
  licenseCategoriesControllerFindById = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/license-categories/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags License Categories
   * @name LicenseCategoriesControllerUpdate
   * @summary Update category
   * @request PATCH:/v1/reference/license-categories/{id}
   * @secure
   */
  licenseCategoriesControllerUpdate = (
    id: number,
    data: UpdateLicenseCategoryDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/license-categories/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags License Categories
   * @name LicenseCategoriesControllerDelete
   * @summary Delete category
   * @request DELETE:/v1/reference/license-categories/{id}
   * @secure
   */
  licenseCategoriesControllerDelete = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/license-categories/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerFindAllTypes
   * @summary Get all organization types
   * @request GET:/v1/admin/organizations/types
   * @secure
   */
  adminOrganizationsControllerFindAllTypes = (params: RequestParams = {}) =>
    this.request<OrganizationTypeResponseDto[], any>({
      path: `/v1/admin/organizations/types`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerFindAllLevels
   * @summary Get all organization levels
   * @request GET:/v1/admin/organizations/levels
   * @secure
   */
  adminOrganizationsControllerFindAllLevels = (params: RequestParams = {}) =>
    this.request<OrganizationLevelResponseDto[], any>({
      path: `/v1/admin/organizations/levels`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerFindCountries
   * @summary Get countries for reference
   * @request GET:/v1/admin/organizations/reference/countries
   * @secure
   */
  adminOrganizationsControllerFindCountries = (params: RequestParams = {}) =>
    this.request<CountryResponseDto[], any>({
      path: `/v1/admin/organizations/reference/countries`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerFindRegions
   * @summary Get regions for reference
   * @request GET:/v1/admin/organizations/reference/regions
   * @secure
   */
  adminOrganizationsControllerFindRegions = (params: RequestParams = {}) =>
    this.request<RegionResponseDto[], any>({
      path: `/v1/admin/organizations/reference/regions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerFindSports
   * @summary Get sports for reference
   * @request GET:/v1/admin/organizations/reference/sports
   * @secure
   */
  adminOrganizationsControllerFindSports = (params: RequestParams = {}) =>
    this.request<SportResponseDto[], any>({
      path: `/v1/admin/organizations/reference/sports`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerFindAll
   * @summary List all organizations (including inactive for admin)
   * @request GET:/v1/admin/organizations
   * @secure
   */
  adminOrganizationsControllerFindAll = (params: RequestParams = {}) =>
    this.request<OrganizationsListResponseDto, any>({
      path: `/v1/admin/organizations`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerCreate
   * @summary Create new organization
   * @request POST:/v1/admin/organizations
   * @secure
   */
  adminOrganizationsControllerCreate = (
    data: CreateOrganizationDto,
    params: RequestParams = {},
  ) =>
    this.request<OrganizationResponseDto, void>({
      path: `/v1/admin/organizations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerGetTree
   * @summary Get organization tree
   * @request GET:/v1/admin/organizations/{id}/tree
   * @secure
   */
  adminOrganizationsControllerGetTree = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/admin/organizations/${id}/tree`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerUpdate
   * @summary Update organization
   * @request PATCH:/v1/admin/organizations/{id}
   * @secure
   */
  adminOrganizationsControllerUpdate = (
    id: number,
    data: UpdateOrganizationDto,
    params: RequestParams = {},
  ) =>
    this.request<OrganizationResponseDto, void>({
      path: `/v1/admin/organizations/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerRemove
   * @summary Delete organization (soft delete)
   * @request DELETE:/v1/admin/organizations/{id}
   * @secure
   */
  adminOrganizationsControllerRemove = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/v1/admin/organizations/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerMove
   * @summary Move organization to new parent
   * @request PUT:/v1/admin/organizations/{id}/move
   * @secure
   */
  adminOrganizationsControllerMove = (
    id: number,
    data: MoveOrganizationDto,
    params: RequestParams = {},
  ) =>
    this.request<OrganizationResponseDto, void>({
      path: `/v1/admin/organizations/${id}/move`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindAll
   * @summary Get all organizations
   * @request GET:/v1/admin/reference/organizations
   */
  organizationsControllerFindAll = (params: RequestParams = {}) =>
    this.request<OrganizationsListResponseDto, any>({
      path: `/v1/admin/reference/organizations`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindAll2
   * @summary Get all organizations
   * @request GET:/v1/reference/organizations
   * @originalName organizationsControllerFindAll
   * @duplicate
   */
  organizationsControllerFindAll2 = (params: RequestParams = {}) =>
    this.request<OrganizationsListResponseDto, any>({
      path: `/v1/reference/organizations`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindFederations
   * @summary Get federations
   * @request GET:/v1/admin/reference/organizations/federations
   */
  organizationsControllerFindFederations = (params: RequestParams = {}) =>
    this.request<OrganizationsListResponseDto, any>({
      path: `/v1/admin/reference/organizations/federations`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindFederations2
   * @summary Get federations
   * @request GET:/v1/reference/organizations/federations
   * @originalName organizationsControllerFindFederations
   * @duplicate
   */
  organizationsControllerFindFederations2 = (params: RequestParams = {}) =>
    this.request<OrganizationsListResponseDto, any>({
      path: `/v1/reference/organizations/federations`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerGetTree
   * @summary Get organization tree
   * @request GET:/v1/admin/reference/organizations/{id}/tree
   */
  organizationsControllerGetTree = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/admin/reference/organizations/${id}/tree`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerGetTree2
   * @summary Get organization tree
   * @request GET:/v1/reference/organizations/{id}/tree
   * @originalName organizationsControllerGetTree
   * @duplicate
   */
  organizationsControllerGetTree2 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/organizations/${id}/tree`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerGetHierarchy
   * @summary Get organization hierarchy (flat list)
   * @request GET:/v1/admin/reference/organizations/{id}/hierarchy
   */
  organizationsControllerGetHierarchy = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/organizations/${id}/hierarchy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerGetHierarchy2
   * @summary Get organization hierarchy (flat list)
   * @request GET:/v1/reference/organizations/{id}/hierarchy
   * @originalName organizationsControllerGetHierarchy
   * @duplicate
   */
  organizationsControllerGetHierarchy2 = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/organizations/${id}/hierarchy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindById
   * @summary Get organization by ID
   * @request GET:/v1/admin/reference/organizations/{id}
   */
  organizationsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<OrganizationResponseDto, void>({
      path: `/v1/admin/reference/organizations/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindById2
   * @summary Get organization by ID
   * @request GET:/v1/reference/organizations/{id}
   * @originalName organizationsControllerFindById
   * @duplicate
   */
  organizationsControllerFindById2 = (id: number, params: RequestParams = {}) =>
    this.request<OrganizationResponseDto, void>({
      path: `/v1/reference/organizations/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Countries
   * @name CountriesControllerFindActive
   * @summary Get all active countries
   * @request GET:/v1/admin/countries/active
   */
  countriesControllerFindActive = (
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryResponseDto[], any>({
      path: `/v1/admin/countries/active`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Countries
   * @name CountriesControllerFindActive2
   * @summary Get all active countries
   * @request GET:/v1/countries/active
   * @originalName countriesControllerFindActive
   * @duplicate
   */
  countriesControllerFindActive2 = (
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryResponseDto[], any>({
      path: `/v1/countries/active`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Countries
   * @name CountriesControllerFindAll
   * @summary Get all countries
   * @request GET:/v1/admin/countries
   */
  countriesControllerFindAll = (
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryResponseDto[], any>({
      path: `/v1/admin/countries`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Countries
   * @name CountriesControllerFindAll2
   * @summary Get all countries
   * @request GET:/v1/countries
   * @originalName countriesControllerFindAll
   * @duplicate
   */
  countriesControllerFindAll2 = (
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryResponseDto[], any>({
      path: `/v1/countries`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerCheck
   * @summary Overall health check
   * @request GET:/v1/health
   */
  healthControllerCheck = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/health`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerLiveness
   * @summary Liveness probe
   * @request GET:/v1/health/live
   */
  healthControllerLiveness = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/health/live`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerReadiness
   * @summary Readiness probe
   * @request GET:/v1/health/ready
   */
  healthControllerReadiness = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/health/ready`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindAll
   * @summary Get all seasons
   * @request GET:/v1/admin/reference/seasons
   */
  seasonsControllerFindAll = (params: RequestParams = {}) =>
    this.request<SeasonsListResponseDto, any>({
      path: `/v1/admin/reference/seasons`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerCreate
   * @summary Create a new season
   * @request POST:/v1/admin/reference/seasons
   */
  seasonsControllerCreate = (params: RequestParams = {}) =>
    this.request<SeasonResponseDto, any>({
      path: `/v1/admin/reference/seasons`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindAll2
   * @summary Get all seasons
   * @request GET:/v1/reference/seasons
   * @originalName seasonsControllerFindAll
   * @duplicate
   */
  seasonsControllerFindAll2 = (params: RequestParams = {}) =>
    this.request<SeasonsListResponseDto, any>({
      path: `/v1/reference/seasons`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerCreate2
   * @summary Create a new season
   * @request POST:/v1/reference/seasons
   * @originalName seasonsControllerCreate
   * @duplicate
   */
  seasonsControllerCreate2 = (params: RequestParams = {}) =>
    this.request<SeasonResponseDto, any>({
      path: `/v1/reference/seasons`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerUpdate
   * @summary Update an existing season
   * @request PATCH:/v1/admin/reference/seasons/{id}
   */
  seasonsControllerUpdate = (id: number, params: RequestParams = {}) =>
    this.request<SeasonResponseDto, any>({
      path: `/v1/admin/reference/seasons/${id}`,
      method: "PATCH",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerDelete
   * @summary Delete a season
   * @request DELETE:/v1/admin/reference/seasons/{id}
   */
  seasonsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/admin/reference/seasons/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindById
   * @summary Get season by ID
   * @request GET:/v1/admin/reference/seasons/{id}
   */
  seasonsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<SeasonResponseDto, void>({
      path: `/v1/admin/reference/seasons/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerUpdate2
   * @summary Update an existing season
   * @request PATCH:/v1/reference/seasons/{id}
   * @originalName seasonsControllerUpdate
   * @duplicate
   */
  seasonsControllerUpdate2 = (id: number, params: RequestParams = {}) =>
    this.request<SeasonResponseDto, any>({
      path: `/v1/reference/seasons/${id}`,
      method: "PATCH",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerDelete2
   * @summary Delete a season
   * @request DELETE:/v1/reference/seasons/{id}
   * @originalName seasonsControllerDelete
   * @duplicate
   */
  seasonsControllerDelete2 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/seasons/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindById2
   * @summary Get season by ID
   * @request GET:/v1/reference/seasons/{id}
   * @originalName seasonsControllerFindById
   * @duplicate
   */
  seasonsControllerFindById2 = (id: number, params: RequestParams = {}) =>
    this.request<SeasonResponseDto, void>({
      path: `/v1/reference/seasons/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerGenerate
   * @summary Autogenerate seasons based on logic
   * @request POST:/v1/admin/reference/seasons/generate
   */
  seasonsControllerGenerate = (
    data: GenerateSeasonsDto,
    params: RequestParams = {},
  ) =>
    this.request<SeasonResponseDto[], any>({
      path: `/v1/admin/reference/seasons/generate`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerGenerate2
   * @summary Autogenerate seasons based on logic
   * @request POST:/v1/reference/seasons/generate
   * @originalName seasonsControllerGenerate
   * @duplicate
   */
  seasonsControllerGenerate2 = (
    data: GenerateSeasonsDto,
    params: RequestParams = {},
  ) =>
    this.request<SeasonResponseDto[], any>({
      path: `/v1/reference/seasons/generate`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindCurrent
   * @summary Get current season
   * @request GET:/v1/admin/reference/seasons/current
   */
  seasonsControllerFindCurrent = (params: RequestParams = {}) =>
    this.request<SeasonResponseDto, void>({
      path: `/v1/admin/reference/seasons/current`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindCurrent2
   * @summary Get current season
   * @request GET:/v1/reference/seasons/current
   * @originalName seasonsControllerFindCurrent
   * @duplicate
   */
  seasonsControllerFindCurrent2 = (params: RequestParams = {}) =>
    this.request<SeasonResponseDto, void>({
      path: `/v1/reference/seasons/current`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerFindAll
   * @summary Get all events with filters
   * @request GET:/v1/admin/events
   */
  eventsControllerFindAll = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
      /** Filter by region ID */
      regionId?: number;
      /** Filter by importance */
      importance?: "High" | "Medium" | "Low";
    },
    params: RequestParams = {},
  ) =>
    this.request<EventsListResponseDto, any>({
      path: `/v1/admin/events`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerCreate
   * @summary Create a new event
   * @request POST:/v1/admin/events
   */
  eventsControllerCreate = (data: CreateEventDto, params: RequestParams = {}) =>
    this.request<EventResponseDto, any>({
      path: `/v1/admin/events`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerFindAll2
   * @summary Get all events with filters
   * @request GET:/v1/events
   * @originalName eventsControllerFindAll
   * @duplicate
   */
  eventsControllerFindAll2 = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
      /** Filter by region ID */
      regionId?: number;
      /** Filter by importance */
      importance?: "High" | "Medium" | "Low";
    },
    params: RequestParams = {},
  ) =>
    this.request<EventsListResponseDto, any>({
      path: `/v1/events`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerCreate2
   * @summary Create a new event
   * @request POST:/v1/events
   * @originalName eventsControllerCreate
   * @duplicate
   */
  eventsControllerCreate2 = (
    data: CreateEventDto,
    params: RequestParams = {},
  ) =>
    this.request<EventResponseDto, any>({
      path: `/v1/events`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerFindById
   * @summary Get event by ID
   * @request GET:/v1/admin/events/{id}
   */
  eventsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<EventResponseDto, void>({
      path: `/v1/admin/events/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerUpdate
   * @summary Update an existing event
   * @request PATCH:/v1/admin/events/{id}
   */
  eventsControllerUpdate = (
    id: number,
    data: UpdateEventDto,
    params: RequestParams = {},
  ) =>
    this.request<EventResponseDto, any>({
      path: `/v1/admin/events/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerDelete
   * @summary Delete an event
   * @request DELETE:/v1/admin/events/{id}
   */
  eventsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/admin/events/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerFindById2
   * @summary Get event by ID
   * @request GET:/v1/events/{id}
   * @originalName eventsControllerFindById
   * @duplicate
   */
  eventsControllerFindById2 = (id: number, params: RequestParams = {}) =>
    this.request<EventResponseDto, void>({
      path: `/v1/events/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerUpdate2
   * @summary Update an existing event
   * @request PATCH:/v1/events/{id}
   * @originalName eventsControllerUpdate
   * @duplicate
   */
  eventsControllerUpdate2 = (
    id: number,
    data: UpdateEventDto,
    params: RequestParams = {},
  ) =>
    this.request<EventResponseDto, any>({
      path: `/v1/events/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerDelete2
   * @summary Delete an event
   * @request DELETE:/v1/events/{id}
   * @originalName eventsControllerDelete
   * @duplicate
   */
  eventsControllerDelete2 = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/events/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerGetAvailableTables
   * @summary Get all available reference tables
   * @request GET:/v1/admin/reference/data/tables
   * @secure
   */
  referenceDataControllerGetAvailableTables = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/admin/reference/data/tables`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerGetAvailableTables2
   * @summary Get all available reference tables
   * @request GET:/v1/reference/data/tables
   * @originalName referenceDataControllerGetAvailableTables
   * @duplicate
   * @secure
   */
  referenceDataControllerGetAvailableTables2 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/reference/data/tables`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerFindAll
   * @summary List all records from a reference table
   * @request GET:/v1/admin/reference/data/{table}
   * @secure
   */
  referenceDataControllerFindAll = (
    table: string,
    query?: {
      /** Search query */
      search?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/data/${table}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerCreate
   * @summary Create a new record in a reference table
   * @request POST:/v1/admin/reference/data/{table}
   * @secure
   */
  referenceDataControllerCreate = (table: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/admin/reference/data/${table}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerFindAll2
   * @summary List all records from a reference table
   * @request GET:/v1/reference/data/{table}
   * @originalName referenceDataControllerFindAll
   * @duplicate
   * @secure
   */
  referenceDataControllerFindAll2 = (
    table: string,
    query?: {
      /** Search query */
      search?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/data/${table}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerCreate2
   * @summary Create a new record in a reference table
   * @request POST:/v1/reference/data/{table}
   * @originalName referenceDataControllerCreate
   * @duplicate
   * @secure
   */
  referenceDataControllerCreate2 = (
    table: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/data/${table}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerFindById
   * @summary Get a single record by ID
   * @request GET:/v1/admin/reference/data/{table}/{id}
   * @secure
   */
  referenceDataControllerFindById = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/data/${table}/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerUpdate
   * @summary Update a record by ID
   * @request PATCH:/v1/admin/reference/data/{table}/{id}
   * @secure
   */
  referenceDataControllerUpdate = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/data/${table}/${id}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerDelete
   * @summary Delete (or deactivate) a record by ID
   * @request DELETE:/v1/admin/reference/data/{table}/{id}
   * @secure
   */
  referenceDataControllerDelete = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/data/${table}/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerFindById2
   * @summary Get a single record by ID
   * @request GET:/v1/reference/data/{table}/{id}
   * @originalName referenceDataControllerFindById
   * @duplicate
   * @secure
   */
  referenceDataControllerFindById2 = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/data/${table}/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerUpdate2
   * @summary Update a record by ID
   * @request PATCH:/v1/reference/data/{table}/{id}
   * @originalName referenceDataControllerUpdate
   * @duplicate
   * @secure
   */
  referenceDataControllerUpdate2 = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/data/${table}/${id}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerDelete2
   * @summary Delete (or deactivate) a record by ID
   * @request DELETE:/v1/reference/data/{table}/{id}
   * @originalName referenceDataControllerDelete
   * @duplicate
   * @secure
   */
  referenceDataControllerDelete2 = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/reference/data/${table}/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Management
   * @name ReferenceManagementControllerGetMetadata
   * @summary Get all dynamic reference tables
   * @request GET:/v1/admin/reference/management
   * @secure
   */
  referenceManagementControllerGetMetadata = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/admin/reference/management`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Management
   * @name ReferenceManagementControllerCreateTable
   * @summary Create a new dynamic reference table
   * @request POST:/v1/admin/reference/management
   * @secure
   */
  referenceManagementControllerCreateTable = (
    data: CreateReferenceTableDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/management`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Management
   * @name ReferenceManagementControllerGetTableMetadata
   * @summary Get table metadata
   * @request GET:/v1/admin/reference/management/{key}
   * @secure
   */
  referenceManagementControllerGetTableMetadata = (
    key: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/management/${key}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Management
   * @name ReferenceManagementControllerUpdateTable
   * @summary Update table schema/metadata
   * @request PATCH:/v1/admin/reference/management/{key}
   * @secure
   */
  referenceManagementControllerUpdateTable = (
    key: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/management/${key}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Management
   * @name ReferenceManagementControllerDeleteTable
   * @summary Delete a dynamic reference table
   * @request DELETE:/v1/admin/reference/management/{key}
   * @secure
   */
  referenceManagementControllerDeleteTable = (
    key: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v1/admin/reference/management/${key}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
