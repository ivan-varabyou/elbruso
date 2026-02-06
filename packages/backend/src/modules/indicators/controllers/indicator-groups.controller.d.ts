import { IndicatorGroupFiltersDto } from '../dto/indicator-group-filters.dto';
import { IndicatorGroupsService } from '../services/indicator-groups.service';
export declare class IndicatorGroupsController {
    private indicatorGroupsService;
    constructor(indicatorGroupsService: IndicatorGroupsService);
    findAll(filters: IndicatorGroupFiltersDto): Promise<import("@database/types").IndicatorGroupsCatalog[]>;
    findById(id: number): Promise<import("@database/types").IndicatorGroupsCatalog>;
    findIndicatorsByGroup(id: number): Promise<import("@database/types").IndicatorCatalog[]>;
}
