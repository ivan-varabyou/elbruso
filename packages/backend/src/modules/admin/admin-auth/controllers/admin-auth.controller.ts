import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminAuthService } from "../services/admin-auth.service";
import { AdminLoginDto } from "../dto/login.dto";
import { AdminLoginResponseDto } from "../../dto/responses/admin-auth.response.dto";

@ApiTags("admin-auth")
@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Admin login" })
  @ApiResponse({ status: 201, type: AdminLoginResponseDto })
  async login(@Body() dto: AdminLoginDto) {
    return this.adminAuthService.login(dto.email, dto.password);
  }
}
