import { AdminLoginDto } from '../dto/admin-login.dto';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminJwtPayload } from '../strategies/admin-jwt.strategy';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    login(dto: AdminLoginDto): Promise<import("../services/admin-auth.service").AuthResponse>;
    logout(body: {
        refreshToken: string;
    }): Promise<{
        message: string;
    }>;
    refresh(body: {
        refreshToken: string;
    }): Promise<import("../services/admin-auth.service").AuthResponse>;
    getMe(req: {
        user: AdminJwtPayload;
    }): Promise<{
        email: string;
        name: string;
        role: string;
        created_at: Date;
        id: string;
        updated_at: Date;
    }>;
}
