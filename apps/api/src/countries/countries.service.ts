import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface Country {
    id: number;
    code: string;
    name: string;
    flag: string;
}

@Injectable()
export class CountriesService {
    constructor(private readonly db: DatabaseService) { }

    async findAll(lang: string = 'ru'): Promise<Country[]> {
        const countries = await this.db.client
            .selectFrom('countries')
            .select(['id', 'code_alpha2 as code', 'name_ru'])
            .orderBy('name_ru', 'asc')
            .execute();

        return countries.map((c: any) => ({
            id: c.id,
            code: c.code,
            name: c.name_ru,
            flag: this.getFlagEmoji(c.code),
        }));
    }

    async findActive(lang: string = 'ru'): Promise<Country[]> {
        const countries = await this.db.client
            .selectFrom('countries')
            .select(['id', 'code_alpha2 as code', 'name_ru'])
            .where('is_active', '=', true)
            .orderBy('name_ru', 'asc')
            .execute();

        return countries.map((c: any) => ({
            id: c.id,
            code: c.code,
            name: c.name_ru,
            flag: this.getFlagEmoji(c.code),
        }));
    }

    async findById(id: number): Promise<Country | null> {
        const country = await this.db.client
            .selectFrom('countries')
            .select(['id', 'code_alpha2 as code', 'name_ru'])
            .where('id', '=', id)
            .executeTakeFirst();

        if (!country) return null;

        return {
            id: (country as any).id,
            code: (country as any).code,
            name: (country as any).name_ru,
            flag: this.getFlagEmoji((country as any).code),
        };
    }

    private getFlagEmoji(countryCode: string): string {
        // Convert country code to flag emoji
        // RU -> 🇷🇺, US -> 🇺🇸, etc.
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }
}
