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

import { CreateBlockDto, MovePageDto, UpdatePageDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Pages<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerFindOne
   * @summary Get page by ID
   * @request GET:/pages/{id}
   * @secure
   */
  pagesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/pages/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerUpdate
   * @summary Update page
   * @request PATCH:/pages/{id}
   * @secure
   */
  pagesControllerUpdate = (
    id: string,
    data: UpdatePageDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/pages/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerDelete
   * @summary Delete page (soft delete)
   * @request DELETE:/pages/{id}
   * @secure
   */
  pagesControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/pages/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Pages
   * @name PagesControllerMove
   * @summary Move page to new parent or position
   * @request POST:/pages/{id}/move
   * @secure
   */
  pagesControllerMove = (
    id: string,
    data: MovePageDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/pages/${id}/move`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerCreate
   * @summary Create a new block in page
   * @request POST:/pages/{pageId}/blocks
   * @secure
   */
  blocksControllerCreate = (
    pageId: string,
    data: CreateBlockDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/pages/${pageId}/blocks`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Blocks
   * @name BlocksControllerFindByPage
   * @summary Get all blocks for a page
   * @request GET:/pages/{pageId}/blocks
   * @secure
   */
  blocksControllerFindByPage = (pageId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/pages/${pageId}/blocks`,
      method: "GET",
      secure: true,
      ...params,
    });
}
