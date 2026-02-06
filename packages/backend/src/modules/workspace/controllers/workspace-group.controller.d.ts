import { CreateGroupDto, UpdateGroupDto, ReorderGroupsDto } from '../dto/workspace-group.dto';
import { WorkspaceGroupService } from '../services/workspace-group.service';
export declare class WorkspaceGroupController {
    private readonly groupService;
    constructor(groupService: WorkspaceGroupService);
    create(workspaceId: string, dto: CreateGroupDto, req: any): Promise<{
        name: string;
        description: string;
        created_at: Date;
        id: string;
        is_active: boolean;
        icon: string;
        workspace_id: string;
        color: string;
        sort_order: number;
    }>;
    findAll(workspaceId: string, req: any): Promise<{
        name: string;
        description: string;
        created_at: Date;
        id: string;
        is_active: boolean;
        icon: string;
        workspace_id: string;
        color: string;
        sort_order: number;
    }[]>;
    update(id: string, dto: UpdateGroupDto, req: any): Promise<{
        name: string;
        description: string;
        created_at: Date;
        id: string;
        is_active: boolean;
        icon: string;
        workspace_id: string;
        color: string;
        sort_order: number;
    }>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
    reorder(workspaceId: string, dto: ReorderGroupsDto, req: any): Promise<{
        message: string;
    }>;
}
