import { RequestWithUser } from '@backend/modules/auth/interfaces';
import { CreateWorkspaceDto, UpdateWorkspaceDto, AddMemberDto, UpdateMemberRoleDto } from '../dto';
import { WorkspaceService } from '../services/workspace.service';
export declare class WorkspaceController {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    create(req: RequestWithUser, dto: CreateWorkspaceDto): Promise<{
        userRole: import("../dto/workspace.dto").WorkspaceRole;
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
    findAll(req: RequestWithUser): Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        userRole: string;
    }[]>;
    findOne(req: RequestWithUser, id: string): Promise<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        userRole: string;
    }>;
    update(req: RequestWithUser, id: string, dto: UpdateWorkspaceDto): Promise<{
        userRole: import("../dto/workspace.dto").WorkspaceRole;
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
    delete(req: RequestWithUser, id: string): Promise<{
        message: string;
    }>;
    addMember(req: RequestWithUser, id: string, dto: AddMemberDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../dto/workspace.dto").WorkspaceRole.EDITOR | import("../dto/workspace.dto").WorkspaceRole.VIEWER;
    }>;
    getMembers(req: RequestWithUser, id: string): Promise<{
        [x: string]: any;
    }[]>;
    updateMemberRole(req: RequestWithUser, id: string, memberId: string, dto: UpdateMemberRoleDto): Promise<{
        message: string;
    }>;
    removeMember(req: RequestWithUser, id: string, memberId: string): Promise<{
        message: string;
    }>;
}
