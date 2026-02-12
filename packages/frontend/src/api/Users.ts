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
  ApiKeyResponseDto,
  CreateApiKeyDto,
  CreateUserDto,
  UpdateProfileDto,
  UpdateUserDto,
  UserApprovedResponseDto,
  UserBlockedResponseDto,
  UserCreatedResponseDto,
  UserDeletedResponseDto,
  UserResponseDto,
  UsersListResponseDto,
  UserUpdatedResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
    this.request<UserResponseDto, any>({
      path: `/users/me`,
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
   * @request PATCH:/users/profile
   * @secure
   */
  usersControllerUpdateProfile = (
    data: UpdateProfileDto,
    params: RequestParams = {},
  ) =>
    this.request<UserResponseDto, any>({
      path: `/users/profile`,
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
   * @request GET:/users
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
      path: `/users`,
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
   * @request POST:/users
   * @secure
   */
  usersControllerCreate = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<UserCreatedResponseDto, any>({
      path: `/users`,
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
   * @request GET:/users/{id}
   * @secure
   */
  usersControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<UserResponseDto, any>({
      path: `/users/${id}`,
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
   * @request PATCH:/users/{id}
   * @secure
   */
  usersControllerUpdate = (
    id: string,
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.request<UserUpdatedResponseDto, any>({
      path: `/users/${id}`,
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
   * @request DELETE:/users/{id}
   * @secure
   */
  usersControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<UserDeletedResponseDto, any>({
      path: `/users/${id}`,
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
   * @request PATCH:/users/{id}/approve
   * @secure
   */
  usersControllerApprove = (id: string, params: RequestParams = {}) =>
    this.request<UserApprovedResponseDto, any>({
      path: `/users/${id}/approve`,
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
   * @request PATCH:/users/{id}/block
   * @secure
   */
  usersControllerBlock = (id: string, params: RequestParams = {}) =>
    this.request<UserBlockedResponseDto, any>({
      path: `/users/${id}/block`,
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
   * @request POST:/users/api-keys
   * @secure
   */
  usersControllerCreateApiKey = (
    data: CreateApiKeyDto,
    params: RequestParams = {},
  ) =>
    this.request<ApiKeyResponseDto, any>({
      path: `/users/api-keys`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
