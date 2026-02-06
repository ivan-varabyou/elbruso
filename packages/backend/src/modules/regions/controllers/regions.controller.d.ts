import { RegionFiltersDto } from '../dto/region-filters.dto';
import { RegionsService } from '../services/regions.service';
export declare class RegionsController {
    private regionsService;
    constructor(regionsService: RegionsService);
    findAll(filters: RegionFiltersDto): Promise<import("@database/types").Regions[]>;
    findById(id: number): Promise<import("@database/types").Regions>;
    findByDistrict(districtId: number): Promise<import("@database/types").Regions[]>;
    findByCountry(countryId: number): Promise<import("@database/types").Regions[]>;
}
