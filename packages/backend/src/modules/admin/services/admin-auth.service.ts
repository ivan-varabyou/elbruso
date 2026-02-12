import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import { DatabaseService } from "@database/database.service";

import { AdminLoginDto } from "../dto/admin-login.dto";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  password_hash: string;
}

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(
    email: string,
    password: string,
  ): Promise<Omit<AdminUser, "password_hash"> | null> {
    const adminUser = await this.db.client
      .selectFrom("admin_users")
      .selectAll()
      .where("email", "=", email)
      .where("is_active", "=", true)
      .executeTakeFirst();

    if (!adminUser) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, (adminUser as AdminUser).password_hash);
    if (!isPasswordValid) {
      return null;
    }

    const { password_hash: _, ...userWithoutPassword } = adminUser as AdminUser;
    return userWithoutPassword;
  }

  async login(dto: AdminLoginDto, ip?: string, userAgent?: string): Promise<AuthResponse> {
    const adminUser = await this.validateAdmin(dto.email, dto.password);
    if (!adminUser) {
      throw new UnauthorizedException("Неверные учетные данные");
    }

    const refreshToken = randomUUID();
    const hashedToken = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.db.client
      .insertInto("admin_sessions")
      .values({
        user_id: adminUser.id,
        refresh_token: hashedToken,
        expires_at: expiresAt,
        ip_address: ip || null,
        user_agent: userAgent || null,
        created_at: new Date(),
      })
      .execute();

    const payload = {
      sub: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
    };
  }

  async logout(refreshToken: string): Promise<void> {
    const sessions = await this.db.client.selectFrom("admin_sessions").selectAll().execute();

    for (const session of sessions) {
      const isValid = await bcrypt.compare(refreshToken, session.refresh_token);
      if (isValid) {
        await this.db.client.deleteFrom("admin_sessions").where("id", "=", session.id).execute();
        break;
      }
    }
  }

  async refresh(refreshToken: string, ip?: string, userAgent?: string): Promise<AuthResponse> {
    const sessions = await this.db.client.selectFrom("admin_sessions").selectAll().execute();

    let validSession: { id: string; user_id: string; expires_at: Date; refresh_token: string } | null = null;

    for (const session of sessions) {
      if (new Date(session.expires_at) < new Date()) continue;

      const isValid = await bcrypt.compare(refreshToken, session.refresh_token);
      if (isValid) {
        validSession = session;
        break;
      }
    }

    if (!validSession) {
      throw new UnauthorizedException("Сессия недействительна");
    }

    await this.db.client.deleteFrom("admin_sessions").where("id", "=", validSession.id).execute();

    const newRefreshToken = randomUUID();
    const newHashedToken = await bcrypt.hash(newRefreshToken, 10);
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);

    await this.db.client
      .insertInto("admin_sessions")
      .values({
        user_id: validSession.user_id,
        refresh_token: newHashedToken,
        expires_at: newExpiresAt,
        ip_address: ip || null,
        user_agent: userAgent || null,
        created_at: new Date(),
      })
      .execute();

    const adminUser = await this.db.client
      .selectFrom("admin_users")
      .selectAll()
      .where("id", "=", validSession.user_id)
      .where("is_active", "=", true)
      .executeTakeFirst();

    if (!adminUser) {
      throw new UnauthorizedException("Пользователь не найден");
    }

    const payload = {
      sub: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
    };
  }

  async getMe(adminUserId: string) {
    const adminUser = await this.db.client
      .selectFrom("admin_users")
      .select(["id", "email", "name", "role", "created_at", "updated_at"])
      .where("id", "=", adminUserId)
      .where("is_active", "=", true)
      .executeTakeFirst();

    if (!adminUser) {
      throw new NotFoundException("Admin user not found");
    }

    return adminUser;
  }
}
