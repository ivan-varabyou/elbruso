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
  CreateIndicatorGroupDto,
  GenerateIndicatorsDto,
  GenerateSeasonsDto,
  UpdateIndicatorGroupDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";
import { apiClient } from "./client";

export class Reference<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super();
    this.instance = apiClient;
  }

  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindAll
   * @summary Get all regions
   * @request GET:/reference/regions
   */
  regionsControllerFindAll = (
    query?: {
      /** Filter by country ID */
      countryId?: number;
      /** Filter by federal district ID */
      federalDistrictId?: number;
      /** Filter by region type ID */
      regionTypeId?: number;
      /**
       * Filter by active status
       * @default true
       */
      isActive?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/reference/regions`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindById
   * @summary Get region by ID
   * @request GET:/reference/regions/{id}
   */
  regionsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/reference/regions/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindByDistrict
   * @summary Get regions by federal district
   * @request GET:/reference/regions/by-district/{districtId}
   */
  regionsControllerFindByDistrict = (districtId: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/regions/by-district/${districtId}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Regions
   * @name RegionsControllerFindByCountry
   * @summary Get regions by country
   * @request GET:/reference/regions/by-country/{countryId}
   */
  regionsControllerFindByCountry = (countryId: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/regions/by-country/${countryId}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindAll
   * @summary Get all sports
   * @request GET:/reference/sports
   */
  sportsControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/sports`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindById
   * @summary Get sport by ID
   * @request GET:/reference/sports/{id}
   */
  sportsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/reference/sports/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Sports
   * @name SportsControllerFindDisciplines
   * @summary Get disciplines for a sport
   * @request GET:/reference/sports/{id}/disciplines
   */
  sportsControllerFindDisciplines = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/sports/${id}/disciplines`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerFindAll
   * @summary Get all indicators with filters
   * @request GET:/reference/indicators
   * @secure
   */
  indicatorsControllerFindAll = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
      /** Filter by region ID */
      regionId?: number;
      /** Filter by indicator group ID */
      groupId?: number;
      /** Search query */
      search?: string;
      /** Scope filters (global, sport, federation, personal) */
      scope?: string;
      /** Multiple scopes */
      scopes?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/reference/indicators`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerCreate
   * @summary Create a manual indicator
   * @request POST:/reference/indicators
   * @secure
   */
  indicatorsControllerCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerUpdate
   * @summary Update indicator
   * @request PATCH:/reference/indicators/{id}
   * @secure
   */
  indicatorsControllerUpdate = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/${id}`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerDelete
   * @summary Delete indicator (mark as inactive)
   * @request DELETE:/reference/indicators/{id}
   * @secure
   */
  indicatorsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerFindById
   * @summary Get indicator by ID
   * @request GET:/reference/indicators/{id}
   * @secure
   */
  indicatorsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/reference/indicators/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerFindBySport
   * @summary Get indicators for a sport
   * @request GET:/reference/indicators/by-sport/{sportId}
   * @secure
   */
  indicatorsControllerFindBySport = (sportId: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/by-sport/${sportId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetTemplates
   * @summary Get indicator generation templates
   * @request GET:/reference/indicators/generation/templates
   * @secure
   */
  indicatorsControllerGetTemplates = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/generation/templates`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGenerate
   * @summary Generate indicators (flexible)
   * @request POST:/reference/indicators/generation/generate
   * @secure
   */
  indicatorsControllerGenerate = (data: GenerateIndicatorsDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/generation/generate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetGroups
   * @summary Get all indicator groups
   * @request GET:/reference/indicators/groups
   * @secure
   */
  indicatorsControllerGetGroups = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/reference/indicators/groups`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerCreateGroup
   * @summary Create indicator group
   * @request POST:/reference/indicators/groups
   * @secure
   */
  indicatorsControllerCreateGroup = (data: CreateIndicatorGroupDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/groups`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetGenders
   * @summary Get all genders
   * @request GET:/reference/indicators/genders
   * @secure
   */
  indicatorsControllerGetGenders = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/genders`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerGetAgeGroups
   * @summary Get all age groups
   * @request GET:/reference/indicators/age-groups
   * @secure
   */
  indicatorsControllerGetAgeGroups = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/age-groups`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerUpdateGroup
   * @summary Update indicator group
   * @request PATCH:/reference/indicators/groups/{id}
   * @secure
   */
  indicatorsControllerUpdateGroup = (
    id: number,
    data: UpdateIndicatorGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/reference/indicators/groups/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicators
   * @name IndicatorsControllerDeleteGroup
   * @summary Delete indicator group
   * @request DELETE:/reference/indicators/groups/{id}
   * @secure
   */
  indicatorsControllerDeleteGroup = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicators/groups/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindAll
   * @summary Get all organizations
   * @request GET:/reference/organizations
   */
  organizationsControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/organizations`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindFederations
   * @summary Get federations
   * @request GET:/reference/organizations/federations
   */
  organizationsControllerFindFederations = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/organizations/federations`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerGetTree
   * @summary Get organization tree
   * @request GET:/reference/organizations/{id}/tree
   */
  organizationsControllerGetTree = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/organizations/${id}/tree`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerGetHierarchy
   * @summary Get organization hierarchy (flat list)
   * @request GET:/reference/organizations/{id}/hierarchy
   */
  organizationsControllerGetHierarchy = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/organizations/${id}/hierarchy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Organizations
   * @name OrganizationsControllerFindById
   * @summary Get organization by ID
   * @request GET:/reference/organizations/{id}
   */
  organizationsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/reference/organizations/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindAll
   * @summary Get all indicator groups
   * @request GET:/reference/indicator-groups
   */
  indicatorGroupsControllerFindAll = (
    query?: {
      /** Filter by sport ID */
      sportId?: number;
      /** Filter by region ID */
      regionId?: number;
      /** Filter by group type */
      type?: "Unified" | "Legacy" | "Custom";
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/reference/indicator-groups`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindById
   * @summary Get indicator group by ID
   * @request GET:/reference/indicator-groups/{id}
   */
  indicatorGroupsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/reference/indicator-groups/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Indicator Groups
   * @name IndicatorGroupsControllerFindIndicatorsByGroup
   * @summary Get indicators for a specific group
   * @request GET:/reference/indicator-groups/{id}/indicators
   */
  indicatorGroupsControllerFindIndicatorsByGroup = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/indicator-groups/${id}/indicators`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindAll
   * @summary Get all seasons
   * @request GET:/reference/seasons
   */
  seasonsControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/seasons`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerCreate
   * @summary Create a new season
   * @request POST:/reference/seasons
   */
  seasonsControllerCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/seasons`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerUpdate
   * @summary Update an existing season
   * @request PATCH:/reference/seasons/{id}
   */
  seasonsControllerUpdate = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/seasons/${id}`,
      method: "PATCH",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerDelete
   * @summary Delete a season
   * @request DELETE:/reference/seasons/{id}
   */
  seasonsControllerDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/seasons/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindById
   * @summary Get season by ID
   * @request GET:/reference/seasons/{id}
   */
  seasonsControllerFindById = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/reference/seasons/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerGenerate
   * @summary Autogenerate seasons based on logic
   * @request POST:/reference/seasons/generate
   */
  seasonsControllerGenerate = (data: GenerateSeasonsDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/reference/seasons/generate`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Seasons
   * @name SeasonsControllerFindCurrent
   * @summary Get current season
   * @request GET:/reference/seasons/current
   */
  seasonsControllerFindCurrent = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/reference/seasons/current`,
      method: "GET",
      ...params,
    });
}
