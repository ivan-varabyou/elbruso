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

import { UpdateGroupDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client.service";
import { apiClient } from "./client";

export class Groups<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupsControllerUpdate
   * @summary Update group
   * @request PATCH:/groups/{id}
   * @secure
   */
  workspaceGroupsControllerUpdate = (
    id: string,
    data: UpdateGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/groups/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupsControllerDelete
   * @summary Delete group
   * @request DELETE:/groups/{id}
   * @secure
   */
  workspaceGroupsControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/groups/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
