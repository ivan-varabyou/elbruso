import { OnModuleInit } from '@nestjs/common';
import { IndicatorCatalog } from '@database';
import { DatabaseService } from '@database/database.service';
import { GenerateIndicatorsDto } from '../dto/generate-indicators.dto';
import { IndicatorFiltersDto } from '../dto/indicator-filters.dto';
export declare class IndicatorsService implements OnModuleInit {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    onModuleInit(): Promise<void>;
    findAll(filters: IndicatorFiltersDto): Promise<IndicatorCatalog[]>;
    findById(id: number): Promise<IndicatorCatalog | undefined>;
    findBySport(sportId: number): Promise<IndicatorCatalog[]>;
    create(data: Record<string, unknown>): Promise<IndicatorCatalog>;
    update(id: number, data: Record<string, unknown>): Promise<IndicatorCatalog>;
    delete(id: number): Promise<void>;
    getTemplates(): Promise<unknown[]>;
    generate(dto: GenerateIndicatorsDto): Promise<unknown[]>;
    generateAll(): Promise<unknown>;
    getGroups(sportId?: number): Promise<unknown[]>;
    getGenders(): Promise<unknown[]>;
    getAgeGroups(): Promise<unknown[]>;
    createGroup(data: Record<string, unknown>): Promise<unknown>;
    updateGroup(id: number, data: Record<string, unknown>): Promise<unknown>;
    deleteGroup(id: number): Promise<void>;
}
