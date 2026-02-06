import { RequestWithUser } from '@backend/modules/auth/interfaces/auth.interface';
import { CreateApiKeyDto } from '../dto';
import { UpdateProfileDto, AdminUpdateUserDto } from '../dto/user-settings.dto';
import { UsersService } from '../services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: RequestWithUser): Promise<{
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
    updateProfile(req: RequestWithUser, dto: UpdateProfileDto): Promise<{
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
    findAll(req: RequestWithUser): Promise<{
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
    updateUserAdmin(req: RequestWithUser, id: string, dto: AdminUpdateUserDto): Promise<{
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
    findOne(id: string): Promise<{
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
    createApiKey(req: RequestWithUser, dto: CreateApiKeyDto): Promise<{
        apiKey: string;
        name: string;
    }>;
}
