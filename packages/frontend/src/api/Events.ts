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

import { EventResponseDto, EventsListResponseDto } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Events<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
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
    this.request<EventsListResponseDto, any>({
      path: `/events`,
      method: "GET",
      query: query,
      format: "json",
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
    this.request<EventResponseDto, void>({
      path: `/events/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
