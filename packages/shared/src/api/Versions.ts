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

import { BatchUpdateCellsDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";
import { apiClient } from "./client";

export class Versions<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }

  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerActivateVersion
   * @summary Activate version
   * @request POST:/versions/{id}/activate
   * @secure
   */
  dynamicTablesControllerActivateVersion = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/versions/${id}/activate`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerGetCells
   * @summary Get cells with pagination
   * @request GET:/versions/{id}/cells
   * @secure
   */
  dynamicTablesControllerGetCells = (
    id: string,
    query?: {
      /**
       * Start row (0-based)
       * @example 0
       */
      startRow?: number;
      /**
       * End row (0-based)
       * @example 99
       */
      endRow?: number;
      /**
       * Start column (0-based)
       * @example 0
       */
      startCol?: number;
      /**
       * End column (0-based)
       * @example 9
       */
      endCol?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/versions/${id}/cells`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerUpdateCell
   * @summary Update single cell
   * @request PATCH:/versions/{id}/cells/{rowIndex}/{colIndex}
   * @secure
   */
  dynamicTablesControllerUpdateCell = (
    id: string,
    rowIndex: number,
    colIndex: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/versions/${id}/cells/${rowIndex}/${colIndex}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerBatchUpdateCells
   * @summary Batch update cells
   * @request POST:/versions/{id}/cells/batch
   * @secure
   */
  dynamicTablesControllerBatchUpdateCells = (
    id: string,
    data: BatchUpdateCellsDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/versions/${id}/cells/batch`,
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
   * @name DynamicTablesControllerDeleteRow
   * @summary Delete a row and shift following rows
   * @request DELETE:/versions/{id}/rows/{index}
   * @secure
   */
  dynamicTablesControllerDeleteRow = (id: string, index: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/versions/${id}/rows/${index}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerInsertRow
   * @summary Insert a new row and shift following rows
   * @request POST:/versions/{id}/rows/{index}
   * @secure
   */
  dynamicTablesControllerInsertRow = (id: string, index: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/versions/${id}/rows/${index}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerDeleteColumn
   * @summary Delete a column and shift following columns
   * @request DELETE:/versions/{id}/columns/{index}
   * @secure
   */
  dynamicTablesControllerDeleteColumn = (id: string, index: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/versions/${id}/columns/${index}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerInsertColumn
   * @summary Insert a new column and shift following columns
   * @request POST:/versions/{id}/columns/{index}
   * @secure
   */
  dynamicTablesControllerInsertColumn = (id: string, index: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/versions/${id}/columns/${index}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Dynamic Tables
   * @name DynamicTablesControllerUpdateMatrixFormulas
   * @summary Update range/matrix formulas for a version
   * @request PATCH:/versions/{id}/matrix-formulas
   * @secure
   */
  dynamicTablesControllerUpdateMatrixFormulas = (
    id: string,
    data: string[],
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/versions/${id}/matrix-formulas`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
