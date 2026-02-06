import { DatabaseService } from '@database/database.service';
import { CreateGroupDto, UpdateGroupDto, ReorderGroupsDto } from '../dto/workspace-group.dto';
import { WorkspaceService } from './workspace.service';
export declare class WorkspaceGroupService {
    private readonly _db;
    private readonly _workspaceService;
    constructor(_db: DatabaseService, _workspaceService: WorkspaceService);
    create(workspaceId: string, dto: CreateGroupDto, userId: string): Promise<{
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
    findAll(workspaceId: string, userId: string): Promise<{
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
    findById(groupId: string, userId: string): Promise<{
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
    update(groupId: string, dto: UpdateGroupDto, userId: string): Promise<{
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
    delete(groupId: string, userId: string): Promise<{
        message: string;
    }>;
    reorder(workspaceId: string, dto: ReorderGroupsDto, userId: string): Promise<{
        message: string;
    }>;
}
