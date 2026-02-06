import { Organizations } from '@database';
import { DatabaseService } from '@database/database.service';
import { OrganizationFiltersDto } from '../dto/organization-filters.dto';
export declare class OrganizationsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(filters: OrganizationFiltersDto): Promise<Organizations[]>;
    findById(id: number): Promise<Organizations | undefined>;
    findFederations(filters: OrganizationFiltersDto): Promise<Organizations[]>;
    getHierarchy(orgId: number): Promise<Organizations[]>;
    getTree(orgId: number): Promise<any>;
    getAncestors(orgId: number): Promise<Organizations[]>;
}
