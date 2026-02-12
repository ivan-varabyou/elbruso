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

export class Health<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerCheck
   * @summary Overall health check
   * @request GET:/health
   */
  healthControllerCheck = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/health`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerLiveness
   * @summary Liveness probe
   * @request GET:/health/live
   */
  healthControllerLiveness = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/health/live`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerReadiness
   * @summary Readiness probe
   * @request GET:/health/ready
   */
  healthControllerReadiness = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/health/ready`,
      method: "GET",
      ...params,
    });
}
