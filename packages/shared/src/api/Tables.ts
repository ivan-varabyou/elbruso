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

import { CreateLinkDto, CreateVersionDto, UpdateTableDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";
import { apiClient } from "./client";

export class Tables<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }

  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerFindOne
   * @summary Get table by ID
   * @request GET:/tables/{id}
   * @secure
   */
  dynamicTablesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/tables/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerUpdate
   * @summary Update table
   * @request PATCH:/tables/{id}
   * @secure
   */
  dynamicTablesControllerUpdate = (id: string, data: UpdateTableDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/tables/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerDelete
   * @summary Delete table
   * @request DELETE:/tables/{id}
   * @secure
   */
  dynamicTablesControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/tables/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerCreateVersion
   * @summary Create new version
   * @request POST:/tables/{id}/versions
   * @secure
   */
  dynamicTablesControllerCreateVersion = (
    id: string,
    data: CreateVersionDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/tables/${id}/versions`,
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
   * @name DynamicTablesControllerGetVersionHistory
   * @summary Get version history
   * @request GET:/tables/{id}/versions
   * @secure
   */
  dynamicTablesControllerGetVersionHistory = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/tables/${id}/versions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerCreateLink
   * @summary Connect table to donor (another table or catalog)
   * @request POST:/tables/{id}/links
   * @secure
   */
  dynamicTablesControllerCreateLink = (
    id: string,
    data: CreateLinkDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/tables/${id}/links`,
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
   * @name DynamicTablesControllerGetDonorStatus
   * @summary Check if donor data has changed
   * @request GET:/tables/{id}/donor-status
   * @secure
   */
  dynamicTablesControllerGetDonorStatus = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/tables/${id}/donor-status`,
      method: "GET",
      secure: true,
      ...params,
    });
}
