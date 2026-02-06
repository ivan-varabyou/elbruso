import { AuditService } from '@backend/modules/audit/services/audit.service';
import { WorkspaceService } from '@backend/modules/workspace/services/workspace.service';
import { DatabaseService } from '@database/database.service';
import { CreatePageDto, UpdatePageDto, MovePageDto } from '../dto';
export interface PageTreeNode {
    id: string;
    workspace_id: string;
    parent_page_id: string | null;
    title: string;
    icon: string | null;
    cover_image: string | null;
    sort_order: number;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    children: PageTreeNode[];
}
export declare class PagesService {
    private readonly db;
    private readonly workspaceService;
    private readonly auditService;
    constructor(db: DatabaseService, workspaceService: WorkspaceService, auditService: AuditService);
    create(workspaceId: string, dto: CreatePageDto, userId: string): Promise<{
        title: string;
        created_at: Date;
        id: string;
        is_active: boolean;
        updated_at: Date;
        icon: string;
        metadata: string | number | boolean | import("@database/types").JsonArray | import("@database/types").JsonObject;
        workspace_id: string;
        sort_order: number;
        created_by: string;
        cover_image: string;
        is_public: boolean;
        last_viewed_at: Date;
        page_type: string;
        parent_page_id: string;
        public_password: string;
        public_url: string;
        updated_by: string;
        view_count: number;
    }>;
    findById(id: string, userId: string): Promise<{
        title: string;
        created_at: Date;
        id: string;
        is_active: boolean;
        updated_at: Date;
        icon: string;
        metadata: string | number | boolean | import("@database/types").JsonArray | import("@database/types").JsonObject;
        workspace_id: string;
        sort_order: number;
        created_by: string;
        cover_image: string;
        is_public: boolean;
        last_viewed_at: Date;
        page_type: string;
        parent_page_id: string;
        public_password: string;
        public_url: string;
        updated_by: string;
        view_count: number;
    }>;
    getPageTree(workspaceId: string, userId: string): Promise<PageTreeNode[]>;
    private buildTree;
    update(id: string, dto: UpdatePageDto, userId: string): Promise<{
        title: string;
        created_at: Date;
        id: string;
        is_active: boolean;
        updated_at: Date;
        icon: string;
        metadata: string | number | boolean | import("@database/types").JsonArray | import("@database/types").JsonObject;
        workspace_id: string;
        sort_order: number;
        created_by: string;
        cover_image: string;
        is_public: boolean;
        last_viewed_at: Date;
        page_type: string;
        parent_page_id: string;
        public_password: string;
        public_url: string;
        updated_by: string;
        view_count: number;
    }>;
    move(id: string, dto: MovePageDto, userId: string): Promise<{
        message: string;
    }>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
    private isDescendant;
    private calculateSortOrder;
}
