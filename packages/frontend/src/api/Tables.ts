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
  BatchUpdateCellsDto,
  CellsResponseDto,
  CreateLinkDto,
  CreateTableDto,
  CreateVersionDto,
  TableResponseDto,
  TablesListResponseDto,
  UpdateTableDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Tables<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerCreate
   * @summary Create a new table in workspace
   * @request POST:/tables/workspaces/{workspaceId}/tables
   * @secure
   */
  tablesControllerCreate = (
    workspaceId: string,
    data: CreateTableDto,
    params: RequestParams = {},
  ) =>
    this.request<TableResponseDto, void>({
      path: `/tables/workspaces/${workspaceId}/tables`,
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
   * @tags Tables
   * @name TablesControllerFindAll
   * @summary Get all tables in workspace
   * @request GET:/tables/workspaces/{workspaceId}/tables
   * @secure
   */
  tablesControllerFindAll = (
    workspaceId: string,
    query?: {
      groupId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<TablesListResponseDto, void>({
      path: `/tables/workspaces/${workspaceId}/tables`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerFindOne
   * @summary Get table by ID
   * @request GET:/tables/tables/{id}
   * @secure
   */
  tablesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<TableResponseDto, void>({
      path: `/tables/tables/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerUpdate
   * @summary Update table
   * @request PATCH:/tables/tables/{id}
   * @secure
   */
  tablesControllerUpdate = (
    id: string,
    data: UpdateTableDto,
    params: RequestParams = {},
  ) =>
    this.request<TableResponseDto, void>({
      path: `/tables/tables/${id}`,
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
   * @tags Tables
   * @name TablesControllerDelete
   * @summary Delete table
   * @request DELETE:/tables/tables/{id}
   * @secure
   */
  tablesControllerDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/tables/tables/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerCreateVersion
   * @summary Create new version
   * @request POST:/tables/tables/{id}/versions
   * @secure
   */
  tablesControllerCreateVersion = (
    id: string,
    data: CreateVersionDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/tables/${id}/versions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerGetVersionHistory
   * @summary Get version history
   * @request GET:/tables/tables/{id}/versions
   * @secure
   */
  tablesControllerGetVersionHistory = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/tables/${id}/versions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerActivateVersion
   * @summary Activate version
   * @request POST:/tables/versions/{id}/activate
   * @secure
   */
  tablesControllerActivateVersion = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/tables/versions/${id}/activate`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerGetCells
   * @summary Get cells with pagination
   * @request GET:/tables/versions/{id}/cells
   * @secure
   */
  tablesControllerGetCells = (
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
    this.request<CellsResponseDto, void>({
      path: `/tables/versions/${id}/cells`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerUpdateCell
   * @summary Update single cell
   * @request PATCH:/tables/versions/{id}/cells/{rowIndex}/{colIndex}
   * @secure
   */
  tablesControllerUpdateCell = (
    id: string,
    rowIndex: number,
    colIndex: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/versions/${id}/cells/${rowIndex}/${colIndex}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerBatchUpdateCells
   * @summary Batch update cells
   * @request POST:/tables/versions/{id}/cells/batch
   * @secure
   */
  tablesControllerBatchUpdateCells = (
    id: string,
    data: BatchUpdateCellsDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/versions/${id}/cells/batch`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerDeleteRow
   * @summary Delete a row and shift following rows
   * @request DELETE:/tables/versions/{id}/rows/{index}
   * @secure
   */
  tablesControllerDeleteRow = (
    id: string,
    index: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/versions/${id}/rows/${index}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerInsertRow
   * @summary Insert a new row and shift following rows
   * @request POST:/tables/versions/{id}/rows/{index}
   * @secure
   */
  tablesControllerInsertRow = (
    id: string,
    index: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/versions/${id}/rows/${index}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerDeleteColumn
   * @summary Delete a column and shift following columns
   * @request DELETE:/tables/versions/{id}/columns/{index}
   * @secure
   */
  tablesControllerDeleteColumn = (
    id: string,
    index: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/versions/${id}/columns/${index}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerInsertColumn
   * @summary Insert a new column and shift following columns
   * @request POST:/tables/versions/{id}/columns/{index}
   * @secure
   */
  tablesControllerInsertColumn = (
    id: string,
    index: number,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/versions/${id}/columns/${index}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerCreateLink
   * @summary Connect table to donor (another table or catalog)
   * @request POST:/tables/tables/{id}/links
   * @secure
   */
  tablesControllerCreateLink = (
    id: string,
    data: CreateLinkDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/tables/${id}/links`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerUpdateMatrixFormulas
   * @summary Update range/matrix formulas for a version
   * @request PATCH:/tables/versions/{id}/matrix-formulas
   * @secure
   */
  tablesControllerUpdateMatrixFormulas = (
    id: string,
    data: string[],
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/tables/versions/${id}/matrix-formulas`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tables
   * @name TablesControllerGetDonorStatus
   * @summary Check if donor data has changed
   * @request GET:/tables/tables/{id}/donor-status
   * @secure
   */
  tablesControllerGetDonorStatus = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/tables/tables/${id}/donor-status`,
      method: "GET",
      secure: true,
      ...params,
    });
}
