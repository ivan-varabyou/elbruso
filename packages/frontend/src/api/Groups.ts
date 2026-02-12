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

import { UpdateGroupDto, WorkspaceGroupResponseDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Groups<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Workspace Groups
   * @name WorkspaceGroupControllerUpdate
   * @summary Update group
   * @request PATCH:/groups/{id}
   * @secure
   */
  workspaceGroupControllerUpdate = (
    id: string,
    data: UpdateGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<WorkspaceGroupResponseDto, void>({
      path: `/groups/${id}`,
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
   * @request DELETE:/groups/{id}
   * @secure
   */
  workspaceGroupControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/groups/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
