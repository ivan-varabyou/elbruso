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

import { AnalyzeFormulaDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";
import { apiClient } from "./client";

export class Formulas<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }
  /**
   * No description
   *
   * @tags Formulas
   * @name FormulaControllerAnalyze
   * @summary Analyze formula and resolve external dependencies
   * @request POST:/formulas/analyze
   * @secure
   */
  formulaControllerAnalyze = (data: AnalyzeFormulaDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/formulas/analyze`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
