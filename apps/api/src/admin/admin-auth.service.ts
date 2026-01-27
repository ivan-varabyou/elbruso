import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminJwtPayload } from './strategies/admin-jwt.strategy';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
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

interface AdminSession {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_at: Date;
  created_at: Date;
}

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly db: DatabaseService,
  ) {}

  async validateAdmin(
    email: string,
    password: string,
  ): Promise<Omit<AdminUser, 'password_hash'> | null> {
    const adminUser = await this.db.client
      .selectFrom('admin_users')
      .selectAll()
      .where('email', '=', email)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!adminUser) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      (adminUser as AdminUser).password_hash,
    );
    if (!isPasswordValid) {
      return null;
    }

    const { password_hash: _, ...userWithoutPassword } = adminUser as AdminUser;
    return userWithoutPassword;
  }

  async login(dto: AdminLoginDto): Promise<AuthResponse> {
    const adminUser = await this.validateAdmin(dto.email, dto.password);
    if (!adminUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(adminUser);

    return {
      ...tokens,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
    };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.db.client
      .deleteFrom('admin_sessions')
      .where('refresh_token', '=', refreshToken)
      .execute();
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    const session = await this.validateRefreshToken(refreshToken);
    if (!session) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    await this.db.client
      .deleteFrom('admin_sessions')
      .where('id', '=', session.id)
      .execute();

    const adminUser = await this.db.client
      .selectFrom('admin_users')
      .selectAll()
      .where('id', '=', session.user_id)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!adminUser) {
      throw new UnauthorizedException('Admin user not found');
    }

    const { password_hash: _, ...userWithoutPassword } = adminUser as AdminUser;
    const tokens = await this.generateTokens(userWithoutPassword);

    return {
      ...tokens,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
    };
  }

  async validateRefreshToken(token: string): Promise<AdminSession | null> {
    try {
      const payload: AdminJwtPayload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('ADMIN_JWT_SECRET'),
      });

      const session = await this.db.client
        .selectFrom('admin_sessions')
        .selectAll()
        .where('user_id', '=', payload.sub)
        .where('refresh_token', '=', token)
        .where('expires_at', '>', new Date())
        .executeTakeFirst();

      return session as AdminSession | null;
    } catch {
      return null;
    }
  }

  async getMe(adminUserId: string) {
    const adminUser = await this.db.client
      .selectFrom('admin_users')
      .select(['id', 'email', 'name', 'role', 'created_at', 'updated_at'])
      .where('id', '=', adminUserId)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!adminUser) {
      throw new NotFoundException('Admin user not found');
    }

    return adminUser;
  }

  private async generateTokens(
    adminUser: Omit<AdminUser, 'password_hash'>,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: string }> {
    const payload: AdminJwtPayload = {
      sub: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(
        'ADMIN_JWT_REFRESH_EXPIRES_IN',
        '7d',
      ),
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.db.client
      .insertInto('admin_sessions')
      .values({
        user_id: adminUser.id,
        refresh_token: refreshToken,
        expires_at: expiresAt,
        created_at: new Date(),
      })
      .execute();

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('ADMIN_JWT_EXPIRES_IN', '15m'),
    };
  }
}
