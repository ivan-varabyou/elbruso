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
  TemplateResponseDto,
  TemplatesListResponseDto,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class WorkspaceTemplates<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Workspace Templates
   * @name WorkspaceTemplateControllerFindAll
   * @summary List all available workspace templates
   * @request GET:/workspace-templates
   */
  workspaceTemplateControllerFindAll = (
    query?: {
      organization_id?: number;
      sport_id?: number;
      country_id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TemplatesListResponseDto, any>({
      path: `/workspace-templates`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Workspace Templates
   * @name WorkspaceTemplateControllerFindOne
   * @summary Get template details
   * @request GET:/workspace-templates/{id}
   */
  workspaceTemplateControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<TemplateResponseDto, any>({
      path: `/workspace-templates/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
