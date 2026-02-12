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
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  LoginResponseDto,
  MeResponseDto,
  MessageResponseDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
  RegisterDto,
  RegisterResponseDto,
  ResetPasswordDto,
  TokenValidityResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Authentication
   * @name AuthControllerRegister
   * @summary Register a new user
   * @request POST:/auth/register
   */
  authControllerRegister = (data: RegisterDto, params: RequestParams = {}) =>
    this.request<RegisterResponseDto, void>({
      path: `/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
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
    this.request<LoginResponseDto, void>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
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
    this.request<RefreshTokenResponseDto, void>({
      path: `/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
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
  authControllerForgotPassword = (
    data: ForgotPasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<MessageResponseDto, any>({
      path: `/auth/forgot-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
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
  authControllerResetPassword = (
    data: ResetPasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<MessageResponseDto, void>({
      path: `/auth/reset-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
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
  authControllerVerifyResetToken = (
    token: string,
    params: RequestParams = {},
  ) =>
    this.request<TokenValidityResponseDto, any>({
      path: `/auth/verify-reset-token/${token}`,
      method: "GET",
      format: "json",
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
    this.request<MeResponseDto, void>({
      path: `/auth/me`,
      method: "GET",
      format: "json",
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
  authControllerChangePassword = (
    data: ChangePasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<MessageResponseDto, any>({
      path: `/auth/change-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
