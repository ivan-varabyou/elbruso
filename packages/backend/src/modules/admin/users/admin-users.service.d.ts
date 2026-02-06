import { DatabaseService } from '@database/database.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
interface PaginationParams {
    page?: number;
    limit?: number;
}
export declare class AdminUsersService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(pagination?: PaginationParams): Promise<{
        data: {
            email: string;
            name: string;
            role: string;
            created_at: Date;
            id: string;
            is_active: boolean;
            updated_at: Date;
            last_login_at: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(dto: CreateAdminUserDto): Promise<any>;
    findOne(id: string): Promise<{
        email: string;
        name: string;
        role: string;
        created_at: Date;
        id: string;
        is_active: boolean;
        updated_at: Date;
        last_login_at: Date;
    }>;
    update(id: string, dto: UpdateAdminUserDto): Promise<any>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    checkLastSuperAdmin(id: string): Promise<boolean>;
    private findByEmail;
    private countSuperAdmins;
    private sanitizeUser;
}
export {};
