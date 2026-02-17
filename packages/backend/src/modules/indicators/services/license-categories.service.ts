import { RefereeLicenseCategories } from '@database';
import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';

import { CreateLicenseCategoryDto, UpdateLicenseCategoryDto } from '../dto/license-category.dto';

@Injectable()
export class LicenseCategoriesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(filters: { sportId?: number; type?: string }): Promise<RefereeLicenseCategories[]> {
    let query = this.db.client.selectFrom('referee_license_categories');

    if (filters.sportId) {
      query = query.where('sport_id', '=', filters.sportId);
    }
    if (filters.type) {
      query = query.where('personnel_type', '=', filters.type);
    }

    return query
      .selectAll()
      .where('is_active', '=', true)
      .orderBy('level', 'asc')
      .execute() as unknown as RefereeLicenseCategories[];
  }

  async findById(id: number): Promise<RefereeLicenseCategories | undefined> {
    return this.db.client
      .selectFrom('referee_license_categories')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst() as unknown as RefereeLicenseCategories | undefined;
  }

  async create(dto: CreateLicenseCategoryDto): Promise<RefereeLicenseCategories> {
    return this.db.client
      .insertInto('referee_license_categories')
      .values({
        ...dto,
        is_active: true,
      })
      .returningAll()
      .executeTakeFirstOrThrow() as unknown as RefereeLicenseCategories;
  }

  async update(id: number, dto: UpdateLicenseCategoryDto): Promise<RefereeLicenseCategories> {
    return this.db.client
      .updateTable('referee_license_categories')
      .set({
        ...dto as any,
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow() as unknown as RefereeLicenseCategories;
  }

  async delete(id: number): Promise<void> {
    await this.db.client
      .updateTable('referee_license_categories')
      .set({ is_active: false })
      .where('id', '=', id)
      .execute();
  }
}
