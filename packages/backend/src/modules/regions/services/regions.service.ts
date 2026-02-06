import { Injectable } from '@nestjs/common';
import { Regions } from '@database';
import { DatabaseService } from '@database/database.service';
import { RegionFiltersDto } from '../dto/region-filters.dto';

@Injectable()
export class RegionsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(filters: RegionFiltersDto): Promise<Regions[]> {
    let query = this.db.client.selectFrom('regions');

    if (filters.countryId) {
      query = query.where('country_id', '=', filters.countryId);
    }

    if (filters.federalDistrictId) {
      query = query.where(
        'federal_district_id',
        '=',
        filters.federalDistrictId,
      );
    }

    return query.selectAll().execute() as unknown as Regions[];
  }

  async findById(id: number): Promise<Regions | undefined> {
    return this.db.client
      .selectFrom('regions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst() as unknown as Regions | undefined;
  }

  async findByDistrict(districtId: number): Promise<Regions[]> {
    return this.db.client
      .selectFrom('regions')
      .selectAll()
      .where('federal_district_id', '=', districtId)
      .execute() as unknown as Regions[];
  }

  async findByCountry(countryId: number): Promise<Regions[]> {
    return this.db.client
      .selectFrom('regions')
      .selectAll()
      .where('country_id', '=', countryId)
      .execute() as unknown as Regions[];
  }
}
