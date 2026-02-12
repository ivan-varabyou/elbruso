import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { AdminLoginDto } from "../dto/admin-login.dto";
import { AdminAuthService } from "../services/admin-auth.service";
import { AdminUsersService } from "../users/admin-users.service";
import {
  AdminLoginResponseDto,
  AdminLogoutResponseDto,
  AdminRefreshResponseDto,
} from "../dto/responses/admin-auth.response.dto";

@ApiTags("Admin Authentication")
@Controller("admin/auth")
export class AdminAuthController {
  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly adminUsersService: AdminUsersService,
  ) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Admin login with email and password" })
  @ApiResponse({
    status: 200,
    type: AdminLoginResponseDto,
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(
    @Body() dto: AdminLoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip = (req.ip || req.headers["x-forwarded-for"]?.toString()) as string | undefined;
    const userAgent = req.headers["user-agent"] as string | undefined;
    const result = await this.adminAuthService.login(dto, ip, userAgent);

    res.cookie("adminAccessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15m
    });

    res.cookie("adminRefreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return plainToInstance(AdminLoginResponseDto, {
      access_token: result.accessToken,
      user: result.user,
    });
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Admin logout" })
  @ApiResponse({
    status: 200,
    type: AdminLogoutResponseDto,
  })
  @ApiResponse({ status: 401, description: "Invalid refresh token" })
  async logout(@Body() body: { refreshToken?: string }, @Res({ passthrough: true }) res: Response) {
    const refreshToken = body.refreshToken || "";
    if (refreshToken) {
      await this.adminAuthService.logout(refreshToken);
    }
    res.clearCookie("adminAccessToken");
    res.clearCookie("adminRefreshToken");
    return plainToInstance(AdminLogoutResponseDto, { message: "Successfully logged out" });
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh admin session" })
  @ApiResponse({
    status: 200,
    type: AdminRefreshResponseDto,
  })
  @ApiResponse({ status: 401, description: "Invalid refresh token" })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: { refreshToken?: string },
  ) {
    const refreshToken = body.refreshToken || req.cookies?.adminRefreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token missing");
    }

    const ip = (req.ip || req.headers["x-forwarded-for"]?.toString()) as string | undefined;
    const userAgent = req.headers["user-agent"] as string | undefined;
    const result = await this.adminAuthService.refresh(refreshToken, ip, userAgent);

    res.cookie("adminAccessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("adminRefreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return plainToInstance(AdminRefreshResponseDto, { access_token: result.accessToken });
  }
}
