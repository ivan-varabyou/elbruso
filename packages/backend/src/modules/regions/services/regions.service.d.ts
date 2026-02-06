import { Regions } from '@database';
import { DatabaseService } from '@database/database.service';
import { RegionFiltersDto } from '../dto/region-filters.dto';
export declare class RegionsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(filters: RegionFiltersDto): Promise<Regions[]>;
    findById(id: number): Promise<Regions | undefined>;
    findByDistrict(districtId: number): Promise<Regions[]>;
    findByCountry(countryId: number): Promise<Regions[]>;
}
