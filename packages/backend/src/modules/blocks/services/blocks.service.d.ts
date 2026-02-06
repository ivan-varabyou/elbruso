import { Blocks } from '@database';
import { AuditService } from '@backend/modules/audit/services/audit.service';
import { PagesService } from '@backend/modules/pages/services/pages.service';
import { DatabaseService } from '@database/database.service';
import { CreateBlockDto, UpdateBlockDto, MoveBlockDto } from '../dto';
export declare class BlocksService {
    private readonly db;
    private readonly pagesService;
    private readonly auditService;
    constructor(db: DatabaseService, pagesService: PagesService, auditService: AuditService);
    create(pageId: string, dto: CreateBlockDto, userId: string): Promise<Blocks>;
    findByPage(pageId: string, userId: string): Promise<Blocks[]>;
    update(id: string, dto: UpdateBlockDto, userId: string): Promise<Blocks>;
    move(id: string, dto: MoveBlockDto, userId: string): Promise<{
        message: string;
    }>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
    private validateBlockContent;
    private calculateSortOrder;
}
