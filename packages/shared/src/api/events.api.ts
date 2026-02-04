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

import { HttpClient, RequestParams } from "./http-client.service";
import { apiClient } from "./client";

export class Events<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerFindAll
   * @summary Get all events with filters
   * @request GET:/events
   */
  eventsControllerFindAll = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
      /** Filter by region ID */
      regionId?: number;
      /** Filter by importance */
      importance?: "High" | "Medium" | "Low";
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/events`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name EventsControllerFindById
   * @summary Get event by ID
   * @request GET:/events/{id}
   */
  eventsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/events/${id}`,
      method: "GET",
      ...params,
    });
}
