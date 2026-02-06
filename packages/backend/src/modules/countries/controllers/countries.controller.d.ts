import { CountriesService } from '../services/countries.service';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    findActive(lang?: string): Promise<import("../services/countries.service").Country[]>;
    findAll(lang?: string): Promise<import("../services/countries.service").Country[]>;
}
