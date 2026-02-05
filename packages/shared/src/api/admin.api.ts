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
  AdminSetupDto,
  CreateAdminUserDto,
  CreateRoleDto,
  UpdateAdminUserDto,
  UpdateRoleDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client.service";
import { adminApiClient } from "./admin.client";

export class Admin<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = adminApiClient;
  }
  /**
   * No description
   *
   * @tags Admin Setup
   * @name AdminSetupControllerSetup
   * @summary Create the first SUPER_ADMIN user
   * @request POST:/admin/setup
   */
  adminSetupControllerSetup = (data: AdminSetupDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/setup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
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
  adminAuthControllerLogin = (data: AdminLoginDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
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
    this.request<void, void>({
      path: `/auth/logout`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Authentication
   * @name AdminAuthControllerRefresh
   * @summary Refresh admin access token
   * @request POST:/admin/auth/refresh
   */
  adminAuthControllerRefresh = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/refresh`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin Authentication
   * @name AdminAuthControllerGetMe
   * @summary Get current admin user profile
   * @request GET:/admin/auth/me
   */
  adminAuthControllerGetMe = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/me`,
      method: "GET",
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
    this.request<void, any>({
      path: `/users`,
      method: "GET",
      query: query,
      secure: true,
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
  adminUsersControllerCreate = (data: CreateAdminUserDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/users`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
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
    this.request<void, void>({
      path: `/users/${id}`,
      method: "GET",
      secure: true,
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
  adminUsersControllerUpdate = (id: string, data: UpdateAdminUserDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/users/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
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
    this.request<void, void>({
      path: `/users/${id}`,
      method: "DELETE",
      secure: true,
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
    this.request<void, any>({
      path: `/roles`,
      method: "GET",
      secure: true,
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
  adminRolesControllerCreate = (data: CreateRoleDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/roles`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
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
    this.request<void, any>({
      path: `/roles/${id}`,
      method: "GET",
      secure: true,
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
  adminRolesControllerUpdate = (id: string, data: UpdateRoleDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/roles/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
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
    this.request<void, any>({
      path: `/roles/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
