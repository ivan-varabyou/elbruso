/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../../users/services/users.service';
import { WorkspaceService } from '../../workspace/services/workspace.service';
import { EmailService } from '../../email/services/email.service';
import { DatabaseService } from '../../../database/database.service';
import { AuditService, AuditAction } from '../../audit/services/audit.service';
import {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyTokenDto,
} from '../dto';
import { JwtPayload, AuthResponse } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly workspaceService: WorkspaceService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
    private readonly emailService: EmailService,
    private readonly db: DatabaseService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    const userId = (user as any).id as string;

    await this.workspaceService.create(userId, {
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

    try {
      await this.emailService.sendWelcome(
        user as any,
        (dto as any).lang || 'ru',
      );
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }

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

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      return { message: 'If the email exists, a reset link has been sent' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await this.db.client
      .insertInto('password_reset_tokens')
      .values({
        user_id: (user as any).id,
        token: tokenHash,
        expires_at: expiresAt,
      })
      .execute();

    await this.emailService.sendPasswordReset(
      user as any,
      resetToken,
      dto.lang || 'ru',
    );

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const tokenHash = crypto
      .createHash('sha256')
      .update(dto.token)
      .digest('hex');

    const tokenRecord = await this.db.client
      .selectFrom('password_reset_tokens')
      .selectAll()
      .where('token', '=', tokenHash)
      .where('expires_at', '>', new Date())
      .where('used_at', 'is', null)
      .executeTakeFirst();

    if (!tokenRecord) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.db.client
      .updateTable('users')
      .set({ password: hashedPassword })
      .where('id', '=', (tokenRecord as any).user_id)
      .execute();

    await this.db.client
      .updateTable('password_reset_tokens')
      .set({ used_at: new Date() })
      .where('token', '=', tokenHash)
      .execute();

    const user = await this.usersService.findById((tokenRecord as any).user_id);

    await this.emailService.sendPasswordChanged(user as any, 'ru');

    return { message: 'Password successfully reset' };
  }

  async verifyResetToken(dto: VerifyTokenDto): Promise<{ valid: boolean }> {
    const tokenHash = crypto
      .createHash('sha256')
      .update(dto.token)
      .digest('hex');

    const tokenRecord = await this.db.client
      .selectFrom('password_reset_tokens')
      .select(['id'])
      .where('token', '=', tokenHash)
      .where('expires_at', '>', new Date())
      .where('used_at', 'is', null)
      .executeTakeFirst();

    return { valid: !!tokenRecord };
  }

  async changePassword(userId: string, dto: any): Promise<void> {
    const user = await this.usersService.findByEmailWithPassword(
      (await this.usersService.findById(userId)).email,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      (user as any).password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect current password');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.db.client
      .updateTable('users')
      .set({ password: hashedPassword })
      .where('id', '=', userId)
      .execute();
  }
}
