import { LoginDto, RegisterDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from '../dto';
import { AuthResponse, RequestWithUser } from '../interfaces';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    refresh(dto: RefreshTokenDto): Promise<AuthResponse>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyResetToken(token: string): Promise<{
        valid: boolean;
    }>;
    getMe(req: RequestWithUser): Promise<{
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
    changePassword(req: RequestWithUser, dto: ChangePasswordDto): Promise<void>;
}
