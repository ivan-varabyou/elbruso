import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AdminAuthService } from "../services/admin-auth.service";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
  constructor(
    configService: ConfigService,
    private readonly adminAuthService: AdminAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("ADMIN_JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    // JWT already decoded by Passport.js
    // Validate payload structure
    if (!payload.sub || !payload.email || !payload.role) {
      throw new UnauthorizedException("Invalid token payload");
    }

    // Return user data for request.user
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
