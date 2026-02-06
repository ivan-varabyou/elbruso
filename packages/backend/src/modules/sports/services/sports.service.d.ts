import { OnModuleInit } from '@nestjs/common';
import { Sports, Disciplines } from '@database';
import { DatabaseService } from '@database/database.service';
import { SportFiltersDto } from '../dto/sport-filters.dto';
export declare class SportsService implements OnModuleInit {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    onModuleInit(): Promise<void>;
    findAll(filters?: SportFiltersDto): Promise<Sports[]>;
    findById(id: number): Promise<Sports | undefined>;
    findDisciplines(sportId: number): Promise<Disciplines[]>;
}
