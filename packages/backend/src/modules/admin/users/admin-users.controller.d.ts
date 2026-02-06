import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
export declare class AdminUsersController {
    private readonly adminUsersService;
    constructor(adminUsersService: AdminUsersService);
    findAll(page?: number, limit?: number): Promise<{
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
}
