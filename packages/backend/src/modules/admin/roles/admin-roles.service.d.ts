import { DatabaseService } from '@database/database.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class AdminRolesService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<{
        id: any;
        code: any;
        name: any;
        description: any;
        permissions: any[];
        is_system: boolean;
        created_at: any;
        updated_at: any;
    }[]>;
    create(dto: CreateRoleDto): Promise<{
        id: any;
        code: any;
        name: any;
        description: any;
        permissions: any[];
        is_system: boolean;
        created_at: any;
        updated_at: any;
    }>;
    findOne(id: string): Promise<{
        id: any;
        code: any;
        name: any;
        description: any;
        permissions: any[];
        is_system: boolean;
        created_at: any;
        updated_at: any;
    }>;
    update(id: string, dto: UpdateRoleDto): Promise<{
        id: any;
        code: any;
        name: any;
        description: any;
        permissions: any[];
        is_system: boolean;
        created_at: any;
        updated_at: any;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        id: string;
    }>;
    checkSystemRole(id: string): Promise<boolean>;
    private formatRole;
}
