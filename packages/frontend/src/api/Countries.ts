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

import { CountryResponseDto } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Countries<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Countries
   * @name CountriesControllerFindActive
   * @summary Get all active countries
   * @request GET:/countries/active
   */
  countriesControllerFindActive = (
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryResponseDto[], any>({
      path: `/countries/active`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Countries
   * @name CountriesControllerFindAll
   * @summary Get all countries
   * @request GET:/countries
   */
  countriesControllerFindAll = (
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CountryResponseDto[], any>({
      path: `/countries`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
