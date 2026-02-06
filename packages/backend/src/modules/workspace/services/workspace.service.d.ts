import { AuditService } from '@backend/modules/audit/services/audit.service';
import { UsersService } from '@backend/modules/users/services/users.service';
import { DatabaseService } from '@database/database.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto, AddMemberDto, UpdateMemberRoleDto, WorkspaceRole } from '../dto/workspace.dto';
export declare class WorkspaceService {
    private readonly _db;
    private readonly _usersService;
    private readonly _auditService;
    constructor(_db: DatabaseService, _usersService: UsersService, _auditService: AuditService);
    create(userId: string, dto: CreateWorkspaceDto): Promise<{
        userRole: WorkspaceRole;
        name: string;
        description: string;
        organization_id: number;
        created_at: Date;
        id: string;
        is_active: boolean;
        updated_at: Date;
        is_template: boolean;
        metadata: string | number | boolean | import("@database/types").JsonArray | import("@database/types").JsonObject;
        owner_id: string;
        season_id: number;
        sport_id: number;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        userRole: string;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        userRole: string;
    }>;
    update(id: string, userId: string, dto: UpdateWorkspaceDto): Promise<{
        userRole: WorkspaceRole;
        name: string;
        description: string;
        organization_id: number;
        created_at: Date;
        id: string;
        is_active: boolean;
        updated_at: Date;
        is_template: boolean;
        metadata: string | number | boolean | import("@database/types").JsonArray | import("@database/types").JsonObject;
        owner_id: string;
        season_id: number;
        sport_id: number;
    }>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
    addMember(id: string, userId: string, dto: AddMemberDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: WorkspaceRole.EDITOR | WorkspaceRole.VIEWER;
    }>;
    getMembers(id: string, userId: string): Promise<{
        [x: string]: any;
    }[]>;
    updateMemberRole(id: string, userId: string, memberId: string, dto: UpdateMemberRoleDto): Promise<{
        message: string;
    }>;
    removeMember(id: string, userId: string, memberId: string): Promise<{
        message: string;
    }>;
    checkPermission(workspaceId: string, userId: string, requiredRole: WorkspaceRole): Promise<void>;
    private getUserRole;
}
