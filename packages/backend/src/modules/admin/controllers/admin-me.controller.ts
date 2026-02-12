import { Controller, Get, Patch, Body, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { AdminJwtAuthGuard } from "../guards/admin-jwt-auth.guard";
import { AdminUsersService } from "../users/admin-users.service";
import { UpdateAdminMeDto } from "../users/dto/update-admin-me.dto";
import {
  AdminMeResponseDto,
  UpdateAdminMeResponseDto,
} from "../dto/responses/admin-me.response.dto";

@ApiTags("Admin Profile")
@Controller("admin")
@UseGuards(AdminJwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class AdminMeController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get("me")
  @ApiOperation({ summary: "Get current admin profile" })
  @ApiResponse({ status: 200, type: AdminMeResponseDto })
  async getMe(@Request() req: any) {
    const entity = await this.adminUsersService.findOne(req.user.sub);
    return plainToInstance(AdminMeResponseDto, entity);
  }

  @Patch("me")
  @ApiOperation({ summary: "Update current admin profile" })
  @ApiResponse({ status: 200, type: UpdateAdminMeResponseDto })
  async updateMe(@Request() req: any, @Body() dto: UpdateAdminMeDto) {
    const entity = await this.adminUsersService.updateMe(req.user.sub, dto);
    return plainToInstance(UpdateAdminMeResponseDto, entity);
  }
}
