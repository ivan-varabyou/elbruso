import { Users } from '@database';
import { DatabaseService } from '@database/database.service';
import { CreateUserDto } from '../dto';
import { UpdateProfileDto, AdminUpdateUserDto } from '../dto/user-settings.dto';
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    create(dto: CreateUserDto): Promise<{
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
    findByEmail(email: string): Promise<{
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
    findByEmailWithPassword(email: string): Promise<Users>;
    findById(id: string): Promise<{
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
    findByApiKey(apiKey: string): Promise<{
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
    saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
    validateRefreshToken(userId: string, refreshToken: string): Promise<boolean>;
    revokeRefreshToken(userId: string, refreshToken: string): Promise<void>;
    createApiKey(userId: string, name: string, permissions: string[]): Promise<{
        apiKey: string;
        name: string;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
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
    findAll(): Promise<{
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        middle_name: string;
        role: string;
        organization_id: number;
        country_id: number;
        created_at: Date;
        id: string;
        is_active: boolean;
        updated_at: Date;
    }[]>;
    updateUserAdmin(userId: string, dto: AdminUpdateUserDto): Promise<{
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
    private sanitizeUser;
}
