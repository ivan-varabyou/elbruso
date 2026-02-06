import * as crypto from 'crypto';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  AuditService,
  AuditAction,
} from '@backend/modules/audit/services/audit.service';
import { EmailService } from '@backend/modules/email/services/email.service';
import { UsersService } from '@backend/modules/users/services/users.service';
import { WorkspaceService } from '@backend/modules/workspace/services/workspace.service';
import { DatabaseService } from '@database/database.service';
import {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyTokenDto,
  ChangePasswordDto,
} from '../dto';
import { JwtPayload, AuthResponse, User } from '../interfaces';

interface PasswordResetTokenRecord {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  used_at: Date | null;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _workspaceService: WorkspaceService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
    private readonly _auditService: AuditService,
    private readonly _emailService: EmailService,
    private readonly _db: DatabaseService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const createdUser = await this._usersService.create({
      ...dto,
      password: hashedPassword,
    });

    const userId = String(createdUser.id);
    const user: User = {
      id: userId,
      email: String(createdUser.email),
      name: String(createdUser.first_name),
    };

    await this._workspaceService.create(userId, {
      name: `${user.name}'s Workspace`,
      description: 'Personal workspace',
    });

    await this._auditService.log({
      userId,
      action: AuditAction.REGISTER,
      entityType: 'User',
      entityId: userId,
      details: { email: user.email },
    });

    try {
      await this._emailService.sendWelcome(user, dto.lang || 'ru');
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

    const userId = String(user.id);

    await this._auditService.log({
      userId,
      action: AuditAction.LOGIN,
      entityType: 'User',
      entityId: userId,
    });

    return this.generateTokens(userId, String(user.email));
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this._usersService.findByEmailWithPassword(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      String(user.password),
    );
    if (!isPasswordValid) {
      return null;
    }

    const { password: _password, ...userWithoutPassword } = user;
    return {
      id: String(userWithoutPassword.id),
      email: String(userWithoutPassword.email),
      name: String(userWithoutPassword.first_name),
    };
  }

  async validateApiKey(apiKey: string) {
    return this._usersService.findByApiKey(apiKey);
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthResponse> {
    try {
      const payload: JwtPayload = this._jwtService.verify(dto.refreshToken, {
        secret: this._configService.get<string>('JWT_SECRET'),
      });

      const isValid = await this._usersService.validateRefreshToken(
        payload.sub,
        dto.refreshToken,
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      await this._usersService.revokeRefreshToken(
        payload.sub,
        dto.refreshToken,
      );

      const tokens = await this.generateTokens(payload.sub, payload.email);

      await this._auditService.log({
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
    const user = await this._usersService.findById(userId);
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

    const accessToken = this._jwtService.sign(payload);
    const refreshToken = this._jwtService.sign(payload, {
      expiresIn: this._configService.get<string>(
        'JWT_REFRESH_EXPIRES_IN',
        '7d',
      ),
    });

    await this._usersService.saveRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: this._configService.get<string>('JWT_EXPIRES_IN', '15m'),
    };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this._usersService.findByEmail(dto.email);

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

    await this._db.client
      .insertInto('password_reset_tokens')
      .values({
        user_id: String(user.id),
        token: tokenHash,
        expires_at: expiresAt,
      })
      .execute();

    const emailUser: User = {
      id: String(user.id),
      email: String(user.email),
      name: String(user.first_name),
    };

    await this._emailService.sendPasswordReset(
      emailUser,
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

    const tokenRecord = await this._db.client
      .selectFrom('password_reset_tokens')
      .selectAll()
      .where('token', '=', tokenHash)
      .where('expires_at', '>', new Date())
      .where('used_at', 'is', null)
      .executeTakeFirst();

    if (!tokenRecord) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const tokenUserId = String(tokenRecord.user_id);

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this._db.client
      .updateTable('users')
      .set({ password: hashedPassword })
      .where('id', '=', tokenUserId)
      .execute();

    await this._db.client
      .updateTable('password_reset_tokens')
      .set({ used_at: new Date() })
      .where('token', '=', tokenHash)
      .execute();

    const user = await this._usersService.findById(tokenUserId);

    if (user) {
      const emailUser: User = {
        id: String(user.id),
        email: String(user.email),
        name: String(user.first_name),
      };
      await this._emailService.sendPasswordChanged(emailUser, 'ru');
    }

    return { message: 'Password successfully reset' };
  }

  async verifyResetToken(dto: VerifyTokenDto): Promise<{ valid: boolean }> {
    const tokenHash = crypto
      .createHash('sha256')
      .update(dto.token)
      .digest('hex');

    const tokenRecord = await this._db.client
      .selectFrom('password_reset_tokens')
      .select(['id'])
      .where('token', '=', tokenHash)
      .where('expires_at', '>', new Date())
      .where('used_at', 'is', null)
      .executeTakeFirst();

    return { valid: !!tokenRecord };
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const currentUser = await this._usersService.findById(userId);
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    const user = await this._usersService.findByEmailWithPassword(
      currentUser.email,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      String(user.password),
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect current password');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this._db.client
      .updateTable('users')
      .set({ password: hashedPassword })
      .where('id', '=', userId)
      .execute();
  }
}
