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

import { HttpClient, RequestParams } from "./http-client";

export class Rbac<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags RBAC
   * @name RbacControllerGetPermissionsTree
   * @summary Get permissions tree for admin or user
   * @request GET:/rbac/permissions/tree
   * @secure
   */
  rbacControllerGetPermissionsTree = (
    query: {
      appType: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/rbac/permissions/tree`,
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
   * @request GET:/rbac/admin/roles
   * @secure
   */
  rbacControllerGetAdminRoles = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/admin/roles`,
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
   * @request POST:/rbac/admin/roles
   * @secure
   */
  rbacControllerCreateAdminRole = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/admin/roles`,
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
   * @request GET:/rbac/admin/roles/{id}
   * @secure
   */
  rbacControllerGetAdminRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/admin/roles/${id}`,
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
   * @request PUT:/rbac/admin/roles/{id}
   * @secure
   */
  rbacControllerUpdateAdminRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/admin/roles/${id}`,
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
   * @request DELETE:/rbac/admin/roles/{id}
   * @secure
   */
  rbacControllerDeleteAdminRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/admin/roles/${id}`,
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
   * @request PUT:/rbac/admin/roles/{id}/permissions
   * @secure
   */
  rbacControllerUpdateAdminRolePermissions = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/rbac/admin/roles/${id}/permissions`,
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
   * @request GET:/rbac/user/roles
   * @secure
   */
  rbacControllerGetUserRoles = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/user/roles`,
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
   * @request POST:/rbac/user/roles
   * @secure
   */
  rbacControllerCreateUserRole = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/user/roles`,
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
   * @request GET:/rbac/user/roles/{id}
   * @secure
   */
  rbacControllerGetUserRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/user/roles/${id}`,
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
   * @request PUT:/rbac/user/roles/{id}
   * @secure
   */
  rbacControllerUpdateUserRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/user/roles/${id}`,
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
   * @request DELETE:/rbac/user/roles/{id}
   * @secure
   */
  rbacControllerDeleteUserRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/user/roles/${id}`,
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
   * @request PUT:/rbac/user/roles/{id}/permissions
   * @secure
   */
  rbacControllerUpdateUserRolePermissions = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/rbac/user/roles/${id}/permissions`,
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
   * @request GET:/rbac/user/{userId}/role
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
      path: `/rbac/user/${userId}/role`,
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
   * @request PUT:/rbac/user/{userId}/role
   * @secure
   */
  rbacControllerAssignUserRole = (userId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/rbac/user/${userId}/role`,
      method: "PUT",
      secure: true,
      ...params,
    });
}
