import { EventsCatalog } from '@database';
import { DatabaseService } from '@database/database.service';
import { EventFiltersDto } from '../dto';
export declare class EventsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(filters: EventFiltersDto): Promise<EventsCatalog[]>;
    findById(id: number): Promise<EventsCatalog | undefined>;
}
