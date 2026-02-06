import { DatabaseService } from '@database/database.service';
export interface Country {
    id: number;
    code: string;
    name: string;
    flag: string;
}
export declare class CountriesService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(lang?: string): Promise<Country[]>;
    findActive(lang?: string): Promise<Country[]>;
    findById(id: number): Promise<Country | null>;
    private getFlagEmoji;
}
