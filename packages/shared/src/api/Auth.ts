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
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  constructor() {
    super({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7100",
    });
  }

  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerRegister
   * @summary Register a new user
   * @request POST:/auth/register
   */
  authControllerRegister = (data: RegisterDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerLogin
   * @summary Login with email and password
   * @request POST:/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerRefresh
   * @summary Refresh access token
   * @request POST:/auth/refresh
   */
  authControllerRefresh = (data: RefreshTokenDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerForgotPassword
   * @summary Request password reset
   * @request POST:/auth/forgot-password
   */
  authControllerForgotPassword = (data: ForgotPasswordDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/auth/forgot-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerResetPassword
   * @summary Reset password with token
   * @request POST:/auth/reset-password
   */
  authControllerResetPassword = (data: ResetPasswordDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/reset-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerVerifyResetToken
   * @summary Verify if reset token is valid
   * @request GET:/auth/verify-reset-token/{token}
   */
  authControllerVerifyResetToken = (token: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/auth/verify-reset-token/${token}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerGetMe
   * @summary Get current user profile
   * @request GET:/auth/me
   */
  authControllerGetMe = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/auth/me`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerChangePassword
   * @summary Change current user password
   * @request POST:/auth/change-password
   */
  authControllerChangePassword = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/auth/change-password`,
      method: "POST",
      ...params,
    });
}
