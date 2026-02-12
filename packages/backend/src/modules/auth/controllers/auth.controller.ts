import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse,ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
} from "../dto";
import {
  LoginResponseDto,
  MeResponseDto,
  MessageResponseDto,
  RefreshTokenResponseDto,
  RegisterResponseDto,
  TokenValidityResponseDto,
} from "../dto/responses";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RequestWithUser } from "../interfaces";
import { AuthService } from "../services/auth.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({
    status: 201,
    description: "User successfully registered",
    type: RegisterResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    const result = await this.authService.register(dto);
    return plainToInstance(RegisterResponseDto, result);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login with email and password" })
  @ApiResponse({
    status: 200,
    description: "Successfully logged in",
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    const result = await this.authService.login(dto);
    return plainToInstance(LoginResponseDto, result);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({
    status: 200,
    description: "Token successfully refreshed",
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({ status: 401, description: "Invalid refresh token" })
  async refresh(@Body() dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    const result = await this.authService.refreshToken(dto);
    return plainToInstance(RefreshTokenResponseDto, result);
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Request password reset" })
  @ApiResponse({
    status: 200,
    description: "Password reset email sent if user exists",
    type: MessageResponseDto,
  })
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<{ message: string }> {
    return this.authService.forgotPassword(dto);
  }

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset password with token" })
  @ApiResponse({
    status: 200,
    description: "Password successfully reset",
    type: MessageResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid or expired token" })
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<{ message: string }> {
    return this.authService.resetPassword(dto);
  }

  @Get("verify-reset-token/:token")
  @ApiOperation({ summary: "Verify if reset token is valid" })
  @ApiResponse({
    status: 200,
    description: "Token validity status",
    type: TokenValidityResponseDto,
  })
  async verifyResetToken(@Param("token") token: string): Promise<{ valid: boolean }> {
    return this.authService.verifyResetToken({ token });
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOperation({ summary: "Get current user profile" })
  @ApiResponse({
    status: 200,
    description: "Current user profile",
    type: MeResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getMe(@Req() req: RequestWithUser): Promise<MeResponseDto> {
    const user = await this.authService.getMe(req.user.sub);
    return plainToInstance(MeResponseDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post("change-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Change current user password" })
  @ApiResponse({
    status: 200,
    description: "Password successfully changed",
    type: MessageResponseDto,
  })
  async changePassword(@Req() req: RequestWithUser, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.sub, dto);
  }
}
