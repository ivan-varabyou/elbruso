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
  CreateWorkspaceDto,
  GroupsListResponseDto,
  PageResponseDto,
  PageTreeResponseDto,
  ReorderGroupsDto,
  UpdateMemberRoleDto,
  UpdateWorkspaceDto,
  WorkspaceGroupResponseDto,
  WorkspaceResponseDto,
  WorkspacesListResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Workspaces<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Workspaces
   * @name WorkspaceControllerCreate
   * @summary Create a new workspace
   * @request POST:/workspaces
   * @secure
   */
  workspaceControllerCreate = (
    data: CreateWorkspaceDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceResponseDto, void>({
      path: `/workspaces`,
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
   * @request GET:/workspaces
   * @secure
   */
  workspaceControllerFindAll = (params: RequestParams = {}) =>
    this.request<WorkspacesListResponseDto, void>({
      path: `/workspaces`,
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
   * @request GET:/workspaces/{id}
   * @secure
   */
  workspaceControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<WorkspaceResponseDto, void>({
      path: `/workspaces/${id}`,
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
   * @request PATCH:/workspaces/{id}
   * @secure
   */
  workspaceControllerUpdate = (
    id: string,
    data: UpdateWorkspaceDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceResponseDto, void>({
      path: `/workspaces/${id}`,
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
   * @request DELETE:/workspaces/{id}
   * @secure
   */
  workspaceControllerDelete = (id: string, params: RequestParams = {}) =>
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
   * @name WorkspaceControllerAddMember
   * @summary Add member to workspace
   * @request POST:/workspaces/{id}/members
   * @secure
   */
  workspaceControllerAddMember = (
    id: string,
    data: AddMemberDto,
    params: RequestParams = {},
  ) =>
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
   * @name WorkspaceControllerGetMembers
   * @summary Get workspace members
   * @request GET:/workspaces/{id}/members
   * @secure
   */
  workspaceControllerGetMembers = (id: string, params: RequestParams = {}) =>
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
   * @name WorkspaceControllerUpdateMemberRole
   * @summary Update member role
   * @request PATCH:/workspaces/{id}/members/{memberId}
   * @secure
   */
  workspaceControllerUpdateMemberRole = (
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
   * @name WorkspaceControllerRemoveMember
   * @summary Remove member from workspace
   * @request DELETE:/workspaces/{id}/members/{memberId}
   * @secure
   */
  workspaceControllerRemoveMember = (
    id: string,
    memberId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/workspaces/${id}/members/${memberId}`,
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
   * @request POST:/workspaces/{workspaceId}/groups
   * @secure
   */
  workspaceGroupControllerCreate = (
    workspaceId: string,
    data: CreateGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceGroupResponseDto, void>({
      path: `/workspaces/${workspaceId}/groups`,
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
   * @request GET:/workspaces/{workspaceId}/groups
   * @secure
   */
  workspaceGroupControllerFindAll = (
    workspaceId: string,
    params: RequestParams = {},
  ) =>
    this.request<GroupsListResponseDto, void>({
      path: `/workspaces/${workspaceId}/groups`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupControllerReorder
   * @summary Reorder groups
   * @request POST:/workspaces/{workspaceId}/groups/reorder
   * @secure
   */
  workspaceGroupControllerReorder = (
    workspaceId: string,
    data: ReorderGroupsDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
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
   * @tags Pages
   * @name PagesControllerCreate
   * @summary Create a new page in workspace
   * @request POST:/workspaces/{workspaceId}/pages
   * @secure
   */
  pagesControllerCreate = (
    workspaceId: string,
    data: CreatePageDto,
    params: RequestParams = {},
  ) =>
    this.request<PageResponseDto, void>({
      path: `/workspaces/${workspaceId}/pages`,
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
   * @request GET:/workspaces/{workspaceId}/pages
   * @secure
   */
  pagesControllerGetTree = (workspaceId: string, params: RequestParams = {}) =>
    this.request<PageTreeResponseDto, void>({
      path: `/workspaces/${workspaceId}/pages`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
