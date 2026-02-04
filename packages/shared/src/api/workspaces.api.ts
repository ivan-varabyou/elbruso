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
  CreateGroupDto,
  CreatePageDto,
  CreateTableDto,
  CreateWorkspaceDto,
  ReorderGroupsDto,
  UpdateMemberRoleDto,
  UpdateWorkspaceDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client.service";
import { apiClient } from "./client";

export class Workspaces<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }

  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspacesControllerCreate
   * @summary Create a new workspace
   * @request POST:/workspaces
   * @secure
   */
  workspacesControllerCreate = (data: CreateWorkspaceDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/workspaces`,
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
   * @name WorkspacesControllerFindAll
   * @summary Get all workspaces for current user
   * @request GET:/workspaces
   * @secure
   */
  workspacesControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/workspaces`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspacesControllerFindOne
   * @summary Get workspace by ID
   * @request GET:/workspaces/{id}
   * @secure
   */
  workspacesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/workspaces/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspacesControllerUpdate
   * @summary Update workspace
   * @request PATCH:/workspaces/{id}
   * @secure
   */
  workspacesControllerUpdate = (id: string, data: UpdateWorkspaceDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/workspaces/${id}`,
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
   * @name WorkspacesControllerDelete
   * @summary Delete workspace
   * @request DELETE:/workspaces/{id}
   * @secure
   */
  workspacesControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/workspaces/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspacesControllerAddMember
   * @summary Add member to workspace
   * @request POST:/workspaces/{id}/members
   * @secure
   */
  workspacesControllerAddMember = (id: string, data: AddMemberDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/workspaces/${id}/members`,
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
   * @name WorkspacesControllerGetMembers
   * @summary Get workspace members
   * @request GET:/workspaces/{id}/members
   * @secure
   */
  workspacesControllerGetMembers = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/workspaces/${id}/members`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspacesControllerUpdateMemberRole
   * @summary Update member role
   * @request PATCH:/workspaces/{id}/members/{memberId}
   * @secure
   */
  workspacesControllerUpdateMemberRole = (
    id: string,
    memberId: string,
    data: UpdateMemberRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/workspaces/${id}/members/${memberId}`,
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
   * @name WorkspacesControllerRemoveMember
   * @summary Remove member from workspace
   * @request DELETE:/workspaces/{id}/members/{memberId}
   * @secure
   */
  workspacesControllerRemoveMember = (id: string, memberId: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/workspaces/${id}/members/${memberId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerCreate
   * @summary Create a new page in workspace
   * @request POST:/workspaces/{workspaceId}/pages
   * @secure
   */
  pagesControllerCreate = (workspaceId: string, data: CreatePageDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/workspaces/${workspaceId}/pages`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerGetTree
   * @summary Get page tree for workspace
   * @request GET:/workspaces/{workspaceId}/pages
   * @secure
   */
  pagesControllerGetTree = (workspaceId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/workspaces/${workspaceId}/pages`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupsControllerCreate
   * @summary Create a new group in workspace
   * @request POST:/workspaces/{workspaceId}/groups
   * @secure
   */
  workspaceGroupsControllerCreate = (
    workspaceId: string,
    data: CreateGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/workspaces/${workspaceId}/groups`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupsControllerFindAll
   * @summary Get all groups in workspace
   * @request GET:/workspaces/{workspaceId}/groups
   * @secure
   */
  workspaceGroupsControllerFindAll = (workspaceId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/workspaces/${workspaceId}/groups`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupsControllerReorder
   * @summary Reorder groups
   * @request POST:/workspaces/{workspaceId}/groups/reorder
   * @secure
   */
  workspaceGroupsControllerReorder = (
    workspaceId: string,
    data: ReorderGroupsDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/workspaces/${workspaceId}/groups/reorder`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerCreate
   * @summary Create a new table in workspace
   * @request POST:/workspaces/{workspaceId}/tables
   * @secure
   */
  dynamicTablesControllerCreate = (
    workspaceId: string,
    data: CreateTableDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/workspaces/${workspaceId}/tables`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerFindAll
   * @summary Get all tables in workspace
   * @request GET:/workspaces/{workspaceId}/tables
   * @secure
   */
  dynamicTablesControllerFindAll = (
    workspaceId: string,
    query?: {
      groupId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/workspaces/${workspaceId}/tables`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
