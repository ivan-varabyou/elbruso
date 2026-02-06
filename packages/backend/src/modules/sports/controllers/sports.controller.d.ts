import { SportsService } from '../services/sports.service';
export declare class SportsController {
    private sportsService;
    constructor(sportsService: SportsService);
    findAll(): Promise<import("@database/types").Sports[]>;
    findById(id: number): Promise<import("@database/types").Sports>;
    findDisciplines(id: number): Promise<import("@database/types").Disciplines[]>;
}
