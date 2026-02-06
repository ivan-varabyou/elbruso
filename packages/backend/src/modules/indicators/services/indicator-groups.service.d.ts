import { IndicatorGroupsCatalog, IndicatorCatalog } from '@database';
import { DatabaseService } from '@database/database.service';
import { IndicatorGroupFiltersDto } from '../dto/indicator-group-filters.dto';
export declare class IndicatorGroupsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(filters: IndicatorGroupFiltersDto): Promise<IndicatorGroupsCatalog[]>;
    findById(id: number): Promise<IndicatorGroupsCatalog | undefined>;
    findIndicatorsByGroup(groupId: number): Promise<IndicatorCatalog[]>;
}
