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
  CreateAdminUserDto,
  CreateRoleDto,
  CreateWorkspaceDto,
  CreateWorkspaceTemplateDto,
  DeleteAdminUserResponseDto,
  DeleteRoleResponseDto,
  DeleteWorkspaceResponseDto,
  DeleteWorkspaceTemplateResponseDto,
  RoleResponseDto,
  RolesListResponseDto,
  UpdateAdminMeDto,
  UpdateAdminMeResponseDto,
  UpdateAdminUserDto,
  UpdateRoleDto,
  UpdateWorkspaceDto,
  UpdateWorkspaceTemplateDto,
  WorkspaceResponseDto,
  WorkspacesListResponseDto,
  WorkspaceTemplateResponseDto,
  WorkspaceTemplatesListResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Admin<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Admin Setup
   * @name AdminSetupControllerSetup
   * @summary Create the first SUPER_ADMIN user
   * @request POST:/admin/setup
   */
  adminSetupControllerSetup = (
    data: AdminSetupDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminSetupResponseDto, void>({
      path: `/admin/setup`,
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
   * @request POST:/admin/reset-admin
   */
  adminSetupControllerResetAdmin = (
    data: AdminResetDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminResetResponseDto, any>({
      path: `/admin/reset-admin`,
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
   * @request GET:/admin/workspaces
   * @secure
   */
  adminWorkspaceControllerFindAll = (params: RequestParams = {}) =>
    this.request<WorkspacesListResponseDto, any>({
      path: `/admin/workspaces`,
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
   * @request POST:/admin/workspaces
   * @secure
   */
  adminWorkspaceControllerCreate = (
    data: CreateWorkspaceDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceResponseDto, any>({
      path: `/admin/workspaces`,
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
   * @request PATCH:/admin/workspaces/{id}
   * @secure
   */
  adminWorkspaceControllerUpdate = (
    id: string,
    data: UpdateWorkspaceDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceResponseDto, any>({
      path: `/admin/workspaces/${id}`,
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
   * @request DELETE:/admin/workspaces/{id}
   * @secure
   */
  adminWorkspaceControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<DeleteWorkspaceResponseDto, any>({
      path: `/admin/workspaces/${id}`,
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
   * @request GET:/admin/workspace-templates
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
      path: `/admin/workspace-templates`,
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
   * @request POST:/admin/workspace-templates
   * @secure
   */
  adminWorkspaceTemplateControllerCreate = (
    data: CreateWorkspaceTemplateDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceTemplateResponseDto, any>({
      path: `/admin/workspace-templates`,
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
   * @request PATCH:/admin/workspace-templates/{id}
   * @secure
   */
  adminWorkspaceTemplateControllerUpdate = (
    id: string,
    data: UpdateWorkspaceTemplateDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceTemplateResponseDto, any>({
      path: `/admin/workspace-templates/${id}`,
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
   * @request DELETE:/admin/workspace-templates/{id}
   * @secure
   */
  adminWorkspaceTemplateControllerDelete = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<DeleteWorkspaceTemplateResponseDto, any>({
      path: `/admin/workspace-templates/${id}`,
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
   * @request GET:/admin/me
   * @secure
   */
  adminMeControllerGetMe = (params: RequestParams = {}) =>
    this.request<AdminMeResponseDto, any>({
      path: `/admin/me`,
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
   * @request PATCH:/admin/me
   * @secure
   */
  adminMeControllerUpdateMe = (
    data: UpdateAdminMeDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateAdminMeResponseDto, any>({
      path: `/admin/me`,
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
   * @request POST:/admin/auth/login
   */
  adminAuthControllerLogin = (
    data: AdminLoginDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminLoginResponseDto, void>({
      path: `/admin/auth/login`,
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
   * @request POST:/admin/auth/logout
   */
  adminAuthControllerLogout = (params: RequestParams = {}) =>
    this.request<AdminLogoutResponseDto, void>({
      path: `/admin/auth/logout`,
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
   * @request POST:/admin/auth/refresh
   */
  adminAuthControllerRefresh = (params: RequestParams = {}) =>
    this.request<AdminRefreshResponseDto, void>({
      path: `/admin/auth/refresh`,
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
   * @request GET:/admin/users
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
      path: `/admin/users`,
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
   * @request POST:/admin/users
   * @secure
   */
  adminUsersControllerCreate = (
    data: CreateAdminUserDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminUserResponseDto, void>({
      path: `/admin/users`,
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
   * @request GET:/admin/users/{id}
   * @secure
   */
  adminUsersControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<AdminUserResponseDto, void>({
      path: `/admin/users/${id}`,
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
   * @request PATCH:/admin/users/{id}
   * @secure
   */
  adminUsersControllerUpdate = (
    id: string,
    data: UpdateAdminUserDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminUserResponseDto, void>({
      path: `/admin/users/${id}`,
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
   * @request DELETE:/admin/users/{id}
   * @secure
   */
  adminUsersControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<DeleteAdminUserResponseDto, void>({
      path: `/admin/users/${id}`,
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
   * @request GET:/admin/roles
   * @secure
   */
  adminRolesControllerFindAll = (params: RequestParams = {}) =>
    this.request<RolesListResponseDto, any>({
      path: `/admin/roles`,
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
   * @request POST:/admin/roles
   * @secure
   */
  adminRolesControllerCreate = (
    data: CreateRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<RoleResponseDto, any>({
      path: `/admin/roles`,
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
   * @request GET:/admin/roles/{id}
   * @secure
   */
  adminRolesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<RoleResponseDto, any>({
      path: `/admin/roles/${id}`,
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
   * @request PATCH:/admin/roles/{id}
   * @secure
   */
  adminRolesControllerUpdate = (
    id: string,
    data: UpdateRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<RoleResponseDto, any>({
      path: `/admin/roles/${id}`,
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
   * @request DELETE:/admin/roles/{id}
   * @secure
   */
  adminRolesControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<DeleteRoleResponseDto, any>({
      path: `/admin/roles/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
}
