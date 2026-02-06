import { EventFiltersDto } from '../dto';
import { EventsService } from '../services/events.service';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    findAll(filters: EventFiltersDto): Promise<import("@database/types").EventsCatalog[]>;
    findById(id: number): Promise<import("@database/types").EventsCatalog>;
}
