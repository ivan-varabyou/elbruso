import { OrganizationsService } from '@backend/modules/organizations/services/organizations.service';
import { UsersService } from '@backend/modules/users/services/users.service';
import { DatabaseService } from '@database/database.service';
import { GenerateIndicatorsDto } from '../dto/generate-indicators.dto';
import { IndicatorFiltersDto } from '../dto/indicator-filters.dto';
import { CreateIndicatorGroupDto, UpdateIndicatorGroupDto, GetIndicatorGroupsDto } from '../dto/indicator-group.dto';
import { IndicatorsService } from '../services/indicators.service';
export declare class IndicatorsController {
    private indicatorsService;
    private usersService;
    private organizationsService;
    private db;
    constructor(indicatorsService: IndicatorsService, usersService: UsersService, organizationsService: OrganizationsService, db: DatabaseService);
    findAll(req: any, filters: IndicatorFiltersDto): Promise<import("@database/types").IndicatorCatalog[]>;
    create(req: any, data: any): Promise<import("@database/types").IndicatorCatalog>;
    update(id: number, data: any): Promise<import("@database/types").IndicatorCatalog>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<import("@database/types").IndicatorCatalog>;
    findBySport(sportId: number): Promise<import("@database/types").IndicatorCatalog[]>;
    getTemplates(): Promise<unknown[]>;
    generate(dto: GenerateIndicatorsDto): Promise<unknown[]>;
    getGroups(dto: GetIndicatorGroupsDto): Promise<unknown[]>;
    getGenders(): Promise<unknown[]>;
    getAgeGroups(): Promise<unknown[]>;
    createGroup(data: CreateIndicatorGroupDto): Promise<unknown>;
    updateGroup(id: number, data: UpdateIndicatorGroupDto): Promise<unknown>;
    deleteGroup(id: number): Promise<void>;
}
