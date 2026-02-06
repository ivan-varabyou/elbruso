import { OrganizationFiltersDto } from '../dto/organization-filters.dto';
import { OrganizationsService } from '../services/organizations.service';
export declare class OrganizationsController {
    private organizationsService;
    constructor(organizationsService: OrganizationsService);
    findAll(filters: OrganizationFiltersDto): Promise<import("@database/types").Organizations[]>;
    findFederations(filters: OrganizationFiltersDto): Promise<import("@database/types").Organizations[]>;
    getTree(id: number): Promise<any>;
    getHierarchy(id: number): Promise<import("@database/types").Organizations[]>;
    findById(id: number): Promise<import("@database/types").Organizations>;
}
