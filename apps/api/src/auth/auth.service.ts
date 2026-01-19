/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    const userId = (user as any).id as string;

    await this.workspacesService.create(userId, {
      name: `${user.name}'s Workspace`,
      description: 'Personal workspace',
    });

    await this.auditService.log({
      userId,
      action: AuditAction.REGISTER,
      entityType: 'User',
      entityId: userId,
      details: { email: user.email },
    });

    return this.generateTokens(userId, user.email);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userId = (user as any).id as string;

    await this.auditService.log({
      userId,
      action: AuditAction.LOGIN,
      entityType: 'User',
      entityId: userId,
    });

    return this.generateTokens(userId, user.email);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      (user as any).password,
    );
    if (!isPasswordValid) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user as any;
    return userWithoutPassword;
  }

  async validateApiKey(apiKey: string) {
    return this.usersService.findByApiKey(apiKey);
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthResponse> {
    try {
      const payload: JwtPayload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const isValid = await this.usersService.validateRefreshToken(
        payload.sub,
        dto.refreshToken,
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      await this.usersService.revokeRefreshToken(payload.sub, dto.refreshToken);

      const tokens = await this.generateTokens(payload.sub, payload.email);

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

  private async generateTokens(
    userId: string,
    email: string,
  ): Promise<AuthResponse> {
    const payload: JwtPayload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    await this.usersService.saveRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '15m'),
    };
  }
}
