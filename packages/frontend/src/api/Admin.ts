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
  CountryResponseDto,
  CreateAdminUserDto,
  CreateEventDto,
  CreateOrganizationDto,
  CreateReferenceTableDto,
  CreateRoleDto,
  CreateWorkspaceDto,
  CreateWorkspaceTemplateDto,
  DeleteAdminUserResponseDto,
  DeleteRoleResponseDto,
  DeleteWorkspaceResponseDto,
  DeleteWorkspaceTemplateResponseDto,
  EventResponseDto,
  EventsListResponseDto,
  GenerateSeasonsDto,
  GroupsListResponseDto,
  IndicatorGroupResponseDto,
  IndicatorsListResponseDto,
  MoveOrganizationDto,
  OrganizationLevelResponseDto,
  OrganizationResponseDto,
  OrganizationsListResponseDto,
  OrganizationTypeResponseDto,
  RegionResponseDto,
  RegionsListResponseDto,
  RoleResponseDto,
  RolesListResponseDto,
  SeasonResponseDto,
  SeasonsListResponseDto,
  SportResponseDto,
  SportsListResponseDto,
  UpdateAdminMeDto,
  UpdateAdminMeResponseDto,
  UpdateAdminUserDto,
  UpdateEventDto,
  UpdateOrganizationDto,
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
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindAll
   * @summary Get all regions
   * @request GET:/admin/reference/regions
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
      path: `/admin/reference/regions`,
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
   * @request GET:/admin/reference/regions/{id}
   */
  regionsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<RegionResponseDto, void>({
      path: `/admin/reference/regions/${id}`,
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
   * @request GET:/admin/reference/regions/by-district/{districtId}
   */
  regionsControllerFindByDistrict = (
    districtId: number,
    params: RequestParams = {},
  ) =>
    this.request<RegionResponseDto[], any>({
      path: `/admin/reference/regions/by-district/${districtId}`,
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
   * @request GET:/admin/reference/regions/by-country/{countryId}
   */
  regionsControllerFindByCountry = (
    countryId: number,
    params: RequestParams = {},
  ) =>
    this.request<RegionResponseDto[], any>({
      path: `/admin/reference/regions/by-country/${countryId}`,
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
   * @request GET:/admin/reference/sports
   */
  sportsControllerFindAll = (params: RequestParams = {}) =>
    this.request<SportsListResponseDto, any>({
      path: `/admin/reference/sports`,
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
   * @request GET:/admin/reference/sports/{id}
   */
  sportsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<SportResponseDto, void>({
      path: `/admin/reference/sports/${id}`,
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
   * @request GET:/admin/reference/sports/{id}/disciplines
   */
  sportsControllerFindDisciplines = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/reference/sports/${id}/disciplines`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindAll
   * @summary Get all indicator groups
   * @request GET:/admin/reference/indicator-groups
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
      path: `/admin/reference/indicator-groups`,
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
   * @request GET:/admin/reference/indicator-groups/{id}
   * @secure
   */
  indicatorGroupsControllerFindById = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<IndicatorGroupResponseDto, void>({
      path: `/admin/reference/indicator-groups/${id}`,
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
   * @request GET:/admin/reference/indicator-groups/{id}/indicators
   * @secure
   */
  indicatorGroupsControllerFindIndicatorsByGroup = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<IndicatorsListResponseDto, any>({
      path: `/admin/reference/indicator-groups/${id}/indicators`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Organizations
   * @name AdminOrganizationsControllerFindAllTypes
   * @summary Get all organization types
   * @request GET:/admin/organizations/types
   * @secure
   */
  adminOrganizationsControllerFindAllTypes = (params: RequestParams = {}) =>
    this.request<OrganizationTypeResponseDto[], any>({
      path: `/admin/organizations/types`,
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
   * @request GET:/admin/organizations/levels
   * @secure
   */
  adminOrganizationsControllerFindAllLevels = (params: RequestParams = {}) =>
    this.request<OrganizationLevelResponseDto[], any>({
      path: `/admin/organizations/levels`,
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
   * @request GET:/admin/organizations/reference/countries
   * @secure
   */
  adminOrganizationsControllerFindCountries = (params: RequestParams = {}) =>
    this.request<CountryResponseDto[], any>({
      path: `/admin/organizations/reference/countries`,
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
   * @request GET:/admin/organizations/reference/regions
   * @secure
   */
  adminOrganizationsControllerFindRegions = (params: RequestParams = {}) =>
    this.request<RegionResponseDto[], any>({
      path: `/admin/organizations/reference/regions`,
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
   * @request GET:/admin/organizations/reference/sports
   * @secure
   */
  adminOrganizationsControllerFindSports = (params: RequestParams = {}) =>
    this.request<SportResponseDto[], any>({
      path: `/admin/organizations/reference/sports`,
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
   * @request GET:/admin/organizations
   * @secure
   */
  adminOrganizationsControllerFindAll = (params: RequestParams = {}) =>
    this.request<OrganizationsListResponseDto, any>({
      path: `/admin/organizations`,
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
   * @request POST:/admin/organizations
   * @secure
   */
  adminOrganizationsControllerCreate = (
    data: CreateOrganizationDto,
    params: RequestParams = {},
  ) =>
    this.request<OrganizationResponseDto, void>({
      path: `/admin/organizations`,
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
   * @request GET:/admin/organizations/{id}/tree
   * @secure
   */
  adminOrganizationsControllerGetTree = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/admin/organizations/${id}/tree`,
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
   * @request PATCH:/admin/organizations/{id}
   * @secure
   */
  adminOrganizationsControllerUpdate = (
    id: number,
    data: UpdateOrganizationDto,
    params: RequestParams = {},
  ) =>
    this.request<OrganizationResponseDto, void>({
      path: `/admin/organizations/${id}`,
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
   * @request DELETE:/admin/organizations/{id}
   * @secure
   */
  adminOrganizationsControllerRemove = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/admin/organizations/${id}`,
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
   * @request PUT:/admin/organizations/{id}/move
   * @secure
   */
  adminOrganizationsControllerMove = (
    id: number,
    data: MoveOrganizationDto,
    params: RequestParams = {},
  ) =>
    this.request<OrganizationResponseDto, void>({
      path: `/admin/organizations/${id}/move`,
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
   * @request GET:/admin/reference/organizations
   */
  organizationsControllerFindAll = (params: RequestParams = {}) =>
    this.request<OrganizationsListResponseDto, any>({
      path: `/admin/reference/organizations`,
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
   * @request GET:/admin/reference/organizations/federations
   */
  organizationsControllerFindFederations = (params: RequestParams = {}) =>
    this.request<OrganizationsListResponseDto, any>({
      path: `/admin/reference/organizations/federations`,
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
   * @request GET:/admin/reference/organizations/{id}/tree
   */
  organizationsControllerGetTree = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/reference/organizations/${id}/tree`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerGetHierarchy
   * @summary Get organization hierarchy (flat list)
   * @request GET:/admin/reference/organizations/{id}/hierarchy
   */
  organizationsControllerGetHierarchy = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/reference/organizations/${id}/hierarchy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindById
   * @summary Get organization by ID
   * @request GET:/admin/reference/organizations/{id}
   */
  organizationsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<OrganizationResponseDto, void>({
      path: `/admin/reference/organizations/${id}`,
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
   * @request GET:/admin/countries/active
   */
  countriesControllerFindActive = (
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryResponseDto[], any>({
      path: `/admin/countries/active`,
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
   * @request GET:/admin/countries
   */
  countriesControllerFindAll = (
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryResponseDto[], any>({
      path: `/admin/countries`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindAll
   * @summary Get all seasons
   * @request GET:/admin/reference/seasons
   */
  seasonsControllerFindAll = (params: RequestParams = {}) =>
    this.request<SeasonsListResponseDto, any>({
      path: `/admin/reference/seasons`,
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
   * @request POST:/admin/reference/seasons
   */
  seasonsControllerCreate = (params: RequestParams = {}) =>
    this.request<SeasonResponseDto, any>({
      path: `/admin/reference/seasons`,
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
   * @request PATCH:/admin/reference/seasons/{id}
   */
  seasonsControllerUpdate = (id: number, params: RequestParams = {}) =>
    this.request<SeasonResponseDto, any>({
      path: `/admin/reference/seasons/${id}`,
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
   * @request DELETE:/admin/reference/seasons/{id}
   */
  seasonsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/reference/seasons/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindById
   * @summary Get season by ID
   * @request GET:/admin/reference/seasons/{id}
   */
  seasonsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<SeasonResponseDto, void>({
      path: `/admin/reference/seasons/${id}`,
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
   * @request POST:/admin/reference/seasons/generate
   */
  seasonsControllerGenerate = (
    data: GenerateSeasonsDto,
    params: RequestParams = {},
  ) =>
    this.request<SeasonResponseDto[], any>({
      path: `/admin/reference/seasons/generate`,
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
   * @request GET:/admin/reference/seasons/current
   */
  seasonsControllerFindCurrent = (params: RequestParams = {}) =>
    this.request<SeasonResponseDto, void>({
      path: `/admin/reference/seasons/current`,
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
   * @request GET:/admin/events
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
      path: `/admin/events`,
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
   * @request POST:/admin/events
   */
  eventsControllerCreate = (data: CreateEventDto, params: RequestParams = {}) =>
    this.request<EventResponseDto, any>({
      path: `/admin/events`,
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
   * @request GET:/admin/events/{id}
   */
  eventsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<EventResponseDto, void>({
      path: `/admin/events/${id}`,
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
   * @request PATCH:/admin/events/{id}
   */
  eventsControllerUpdate = (
    id: number,
    data: UpdateEventDto,
    params: RequestParams = {},
  ) =>
    this.request<EventResponseDto, any>({
      path: `/admin/events/${id}`,
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
   * @request DELETE:/admin/events/{id}
   */
  eventsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/events/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Reference Data
   * @name ReferenceDataControllerGetAvailableTables
   * @summary Get all available reference tables
   * @request GET:/admin/reference/data/tables
   * @secure
   */
  referenceDataControllerGetAvailableTables = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/reference/data/tables`,
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
   * @request GET:/admin/reference/data/{table}
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
      path: `/admin/reference/data/${table}`,
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
   * @request POST:/admin/reference/data/{table}
   * @secure
   */
  referenceDataControllerCreate = (table: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/reference/data/${table}`,
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
   * @request GET:/admin/reference/data/{table}/{id}
   * @secure
   */
  referenceDataControllerFindById = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/reference/data/${table}/${id}`,
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
   * @request PATCH:/admin/reference/data/{table}/{id}
   * @secure
   */
  referenceDataControllerUpdate = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/reference/data/${table}/${id}`,
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
   * @request DELETE:/admin/reference/data/{table}/{id}
   * @secure
   */
  referenceDataControllerDelete = (
    table: string,
    id: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/reference/data/${table}/${id}`,
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
   * @request GET:/admin/reference/management
   * @secure
   */
  referenceManagementControllerGetMetadata = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/reference/management`,
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
   * @request POST:/admin/reference/management
   * @secure
   */
  referenceManagementControllerCreateTable = (
    data: CreateReferenceTableDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/reference/management`,
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
   * @request GET:/admin/reference/management/{key}
   * @secure
   */
  referenceManagementControllerGetTableMetadata = (
    key: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/reference/management/${key}`,
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
   * @request PATCH:/admin/reference/management/{key}
   * @secure
   */
  referenceManagementControllerUpdateTable = (
    key: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/reference/management/${key}`,
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
   * @request DELETE:/admin/reference/management/{key}
   * @secure
   */
  referenceManagementControllerDeleteTable = (
    key: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/reference/management/${key}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
