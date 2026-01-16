import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { WorkspacesService } from '../workspaces/workspaces.service';
import { AuditService, AuditAction } from '../common/audit/audit.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { JwtPayload, AuthResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly workspacesService: WorkspacesService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Создаем пользователя
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    // Создаем default workspace
    await this.workspacesService.create(user.id, {
      name: `${user.name}'s Workspace`,
      description: 'Personal workspace',
      icon: '🏠',
    });

    // Log registration
    await this.auditService.log({
      userId: user.id,
      action: AuditAction.REGISTER,
      entityType: 'User',
      entityId: user.id,
      details: { email: user.email },
    });

    // Генерируем токены
    return this.generateTokens(user.id, user.email);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Log login
    await this.auditService.log({
      userId: user.id,
      action: AuditAction.LOGIN,
      entityType: 'User',
      entityId: user.id,
    });

    return this.generateTokens(user.id, user.email);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthResponse> {
    try {
      const payload: JwtPayload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Validate token exists in database (rotation/security check)
      const isValid = await this.usersService.validateRefreshToken(
        payload.sub,
        dto.refreshToken,
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      // Revoke the old token (rotation)
      await this.usersService.revokeRefreshToken(payload.sub, dto.refreshToken);

      // Issue new tokens
      const tokens = await this.generateTokens(payload.sub, payload.email);

      // Log token refresh
      await this.auditService.log({
        userId: payload.sub,
        action: AuditAction.TOKEN_REFRESH,
        entityType: 'Session',
      });

      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateApiKey(apiKey: string) {
    return this.usersService.findByApiKey(apiKey);
  }

  private async generateTokens(
    userId: string,
    email: string,
  ): Promise<AuthResponse> {
    const payload: JwtPayload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    // Сохраняем refresh token в БД
    await this.usersService.saveRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '15m'),
    };
  }
}
