import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@database/database.service';
import { AdminLoginDto } from '../dto/admin-login.dto';
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
export declare class AdminAuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly db;
    constructor(jwtService: JwtService, configService: ConfigService, db: DatabaseService);
    validateAdmin(email: string, password: string): Promise<Omit<AdminUser, 'password_hash'> | null>;
    login(dto: AdminLoginDto): Promise<AuthResponse>;
    logout(refreshToken: string): Promise<void>;
    refresh(refreshToken: string): Promise<AuthResponse>;
    validateRefreshToken(token: string): Promise<AdminSession | null>;
    getMe(adminUserId: string): Promise<{
        email: string;
        name: string;
        role: string;
        created_at: Date;
        id: string;
        updated_at: Date;
    }>;
    private generateTokens;
}
export {};
