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

import { AdminUpdateUserDto, CreateApiKeyDto, UpdateProfileDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";
import { apiClient } from "./client";

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }

  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerGetProfile
   * @summary Get current user profile
   * @request GET:/users/me
   * @secure
   */
  usersControllerGetProfile = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerUpdateProfile
   * @summary Update current user profile
   * @request PATCH:/users/profile
   * @secure
   */
  usersControllerUpdateProfile = (data: UpdateProfileDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users/profile`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindAll
   * @summary List all users (Admin only)
   * @request GET:/users
   * @secure
   */
  usersControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerUpdateUserAdmin
   * @summary Update user by admin
   * @request PATCH:/users/{id}/admin
   * @secure
   */
  usersControllerUpdateUserAdmin = (
    id: string,
    data: AdminUpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/users/${id}/admin`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindOne
   * @summary Get user by ID
   * @request GET:/users/{id}
   * @secure
   */
  usersControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerCreateApiKey
   * @summary Create API key for current user
   * @request POST:/users/api-keys
   * @secure
   */
  usersControllerCreateApiKey = (data: CreateApiKeyDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users/api-keys`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
