import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuditService } from '@backend/modules/audit/services/audit.service';
import { EmailService } from '@backend/modules/email/services/email.service';
import { UsersService } from '@backend/modules/users/services/users.service';
import { WorkspaceService } from '@backend/modules/workspace/services/workspace.service';
import { DatabaseService } from '@database/database.service';
import { LoginDto, RegisterDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, VerifyTokenDto, ChangePasswordDto } from '../dto';
import { AuthResponse, User } from '../interfaces';
export declare class AuthService {
    private readonly _usersService;
    private readonly _workspaceService;
    private readonly _jwtService;
    private readonly _configService;
    private readonly _auditService;
    private readonly _emailService;
    private readonly _db;
    constructor(_usersService: UsersService, _workspaceService: WorkspaceService, _jwtService: JwtService, _configService: ConfigService, _auditService: AuditService, _emailService: EmailService, _db: DatabaseService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    validateUser(email: string, password: string): Promise<User | null>;
    validateApiKey(apiKey: string): Promise<{
        country_id: import("@database/types").Generated<number | null>;
        created_at: import("@database/types").Generated<import("@database/types").Timestamp | null>;
        email: string;
        first_name: string | null;
        id: import("@database/types").Generated<string>;
        is_active: import("@database/types").Generated<boolean | null>;
        last_name: string | null;
        middle_name: string | null;
        organization_id: number | null;
        role: import("@database/types").Generated<string | null>;
        updated_at: import("@database/types").Generated<import("@database/types").Timestamp | null>;
    }>;
    refreshToken(dto: RefreshTokenDto): Promise<AuthResponse>;
    getMe(userId: string): Promise<{
        country_id: import("@database/types").Generated<number | null>;
        created_at: import("@database/types").Generated<import("@database/types").Timestamp | null>;
        email: string;
        first_name: string | null;
        id: import("@database/types").Generated<string>;
        is_active: import("@database/types").Generated<boolean | null>;
        last_name: string | null;
        middle_name: string | null;
        organization_id: number | null;
        role: import("@database/types").Generated<string | null>;
        updated_at: import("@database/types").Generated<import("@database/types").Timestamp | null>;
    }>;
    private generateTokens;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyResetToken(dto: VerifyTokenDto): Promise<{
        valid: boolean;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<void>;
}
