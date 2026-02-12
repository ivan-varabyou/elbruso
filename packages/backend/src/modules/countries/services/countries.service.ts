import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';

export interface Country {
  id: number;
  code: string;
  name: string;
  name_ru: string;
  code_alpha2: string;
  flag: string;
}

@Injectable()
export class CountriesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(lang: string = 'ru'): Promise<Country[]> {
    const countries = await this.db.client
      .selectFrom('countries')
      .select(['id', 'code_alpha2', 'name_ru'])
      .orderBy('name_ru', 'asc')
      .execute();

    return countries.map((c: any) => ({
      id: c.id,
      code: c.code_alpha2,
      code_alpha2: c.code_alpha2,
      name: c.name_ru,
      name_ru: c.name_ru,
      flag: this.getFlagEmoji(c.code_alpha2),
    }));
  }

  async findActive(lang: string = 'ru'): Promise<Country[]> {
    const countries = await this.db.client
      .selectFrom('countries')
      .select(['id', 'code_alpha2', 'name_ru'])
      .where('is_active', '=', true)
      .orderBy('name_ru', 'asc')
      .execute();

    return countries.map((c: any) => ({
      id: c.id,
      code: c.code_alpha2,
      code_alpha2: c.code_alpha2,
      name: c.name_ru,
      name_ru: c.name_ru,
      flag: this.getFlagEmoji(c.code_alpha2),
    }));
  }

  async findById(id: number): Promise<Country | null> {
    const country = await this.db.client
      .selectFrom('countries')
      .select(['id', 'code_alpha2', 'name_ru'])
      .where('id', '=', id)
      .executeTakeFirst();

    if (!country) return null;

    return {
      id: country.id,
      code: country.code_alpha2,
      code_alpha2: country.code_alpha2,
      name: country.name_ru,
      name_ru: country.name_ru,
      flag: this.getFlagEmoji(country.code_alpha2),
    };
  }

  private getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
}
