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

import { MoveBlockDto, UpdateBlockDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Blocks<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerUpdate
   * @summary Update block content
   * @request PATCH:/blocks/{id}
   * @secure
   */
  blocksControllerUpdate = (
    id: string,
    data: UpdateBlockDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/blocks/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerDelete
   * @summary Delete block (soft delete)
   * @request DELETE:/blocks/{id}
   * @secure
   */
  blocksControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/blocks/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerMove
   * @summary Move block to new position
   * @request POST:/blocks/{id}/move
   * @secure
   */
  blocksControllerMove = (
    id: string,
    data: MoveBlockDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/blocks/${id}/move`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
