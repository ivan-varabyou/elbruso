import { CreateBlockDto, UpdateBlockDto, MoveBlockDto } from '../dto';
import { BlocksService } from '../services/blocks.service';
export declare class BlocksController {
    private readonly blocksService;
    constructor(blocksService: BlocksService);
    create(pageId: string, dto: CreateBlockDto, req: any): Promise<import("@database/types").Blocks>;
    findByPage(pageId: string, req: any): Promise<import("@database/types").Blocks[]>;
    update(id: string, dto: UpdateBlockDto, req: any): Promise<import("@database/types").Blocks>;
    move(id: string, dto: MoveBlockDto, req: any): Promise<{
        message: string;
    }>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
