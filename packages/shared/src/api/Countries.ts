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

import { HttpClient, RequestParams } from "./http-client";

export class Countries<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name CountriesControllerFindActive
   * @request GET:/countries/active
   */
  countriesControllerFindActive = (
    query: {
      lang: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/countries/active`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @name CountriesControllerFindAll
   * @request GET:/countries
   */
  countriesControllerFindAll = (
    query: {
      lang: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/countries`,
      method: "GET",
      query: query,
      ...params,
    });
}
