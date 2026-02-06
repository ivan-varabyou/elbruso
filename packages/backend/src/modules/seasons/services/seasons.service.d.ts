import { OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
export declare class SeasonsService implements OnModuleInit {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    onModuleInit(): Promise<void>;
    findAll(): Promise<any[]>;
    findById(id: number): Promise<any | undefined>;
    findCurrent(): Promise<any | undefined>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<void>;
    generate(startYear: number, endYear: number, sportId?: number): Promise<void>;
}
