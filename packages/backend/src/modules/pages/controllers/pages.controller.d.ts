import { CreatePageDto, UpdatePageDto, MovePageDto } from '../dto';
import { PagesService } from '../services/pages.service';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    create(workspaceId: string, dto: CreatePageDto, req: any): Promise<{
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
    getTree(workspaceId: string, req: any): Promise<import("../services/pages.service").PageTreeNode[]>;
    findOne(id: string, req: any): Promise<{
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
    update(id: string, dto: UpdatePageDto, req: any): Promise<{
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
    move(id: string, dto: MovePageDto, req: any): Promise<{
        message: string;
    }>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
