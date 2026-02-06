import { GenerateSeasonsDto } from '../dto';
import { SeasonsService } from '../services/seasons.service';
export declare class SeasonsController {
    private seasonsService;
    constructor(seasonsService: SeasonsService);
    findAll(): Promise<any[]>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<void>;
    generate(data: GenerateSeasonsDto): Promise<void>;
    findCurrent(): Promise<any>;
    findById(id: number): Promise<any>;
}
