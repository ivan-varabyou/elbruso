import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Seasons } from '@elbruso/database';
import { sql } from 'kysely';

@Injectable()
export class SeasonsService implements OnModuleInit {
  private readonly logger = new Logger(SeasonsService.name);

  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    try {
      this.logger.log('Updating seasons schema to support multiple sports...');

      // 1. Create join table
      await sql`
        CREATE TABLE IF NOT EXISTS season_sports (
          season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
          sport_id INTEGER NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
          PRIMARY KEY (season_id, sport_id)
        );
      `.execute(this.db.client);

      // 2. Migrate existing data if sport_id exists
      await sql`
        DO $$
        BEGIN
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='seasons' AND column_name='sport_id') THEN
                INSERT INTO season_sports (season_id, sport_id)
                SELECT id, sport_id FROM seasons WHERE sport_id IS NOT NULL
                ON CONFLICT DO NOTHING;
                
                ALTER TABLE seasons DROP COLUMN sport_id;
            END IF;
        END $$;
      `.execute(this.db.client);

      // 3. Add other columns if missing
      await sql`
        ALTER TABLE seasons ADD COLUMN IF NOT EXISTS season_year INTEGER;
        ALTER TABLE seasons ADD COLUMN IF NOT EXISTS season_type VARCHAR(20);
      `.execute(this.db.client);

      // 4. Handle name_ru rename
      await sql`
        DO $$
        BEGIN
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='seasons' AND column_name='name') 
               AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='seasons' AND column_name='name_ru') THEN
                ALTER TABLE seasons RENAME COLUMN name TO name_ru;
            END IF;
        END $$;
      `.execute(this.db.client);

      this.logger.log('Seasons schema updated');
    } catch (error) {
      this.logger.error('Failed to update seasons schema:', error);
    }
  }

  async findAll(): Promise<any[]> {
    const rows = await this.db.client
      .selectFrom('seasons as s')
      .leftJoin('season_sports as ss', 's.id', 'ss.season_id')
      .leftJoin('sports as sp', 'ss.sport_id', 'sp.id')
      .select([
        's.id',
        's.code',
        's.name_ru',
        's.start_date',
        's.end_date',
        's.season_year',
        's.season_type',
        's.is_active',
        's.created_at',
        's.updated_at',
        'ss.sport_id',
        'sp.name_ru as sport_name',
      ])
      .orderBy('s.start_date', 'desc')
      .execute();

    if (rows.length === 0) return [];

    const seasonsMap = new Map();

    for (const row of rows) {
      if (!seasonsMap.has(row.id)) {
        seasonsMap.set(row.id, {
          id: row.id,
          code: row.code,
          name_ru: row.name_ru,
          start_date: row.start_date,
          end_date: row.end_date,
          season_year: row.season_year,
          season_type: row.season_type,
          is_active: row.is_active,
          created_at: row.created_at,
          updated_at: row.updated_at,
          sports: [],
        });
      }

      if (row.sport_id) {
        const season = seasonsMap.get(row.id);
        if (!season.sports.find((s) => s.id === row.sport_id)) {
          season.sports.push({
            id: row.sport_id,
            name_ru: row.sport_name,
          });
        }
      }
    }

    return Array.from(seasonsMap.values());
  }

  async findById(id: number): Promise<any | undefined> {
    const rows = await this.db.client
      .selectFrom('seasons as s')
      .leftJoin('season_sports as ss', 's.id', 'ss.season_id')
      .leftJoin('sports as sp', 'ss.sport_id', 'sp.id')
      .select([
        's.id',
        's.code',
        's.name_ru',
        's.start_date',
        's.end_date',
        's.season_year',
        's.season_type',
        's.is_active',
        's.created_at',
        's.updated_at',
        'ss.sport_id',
        'sp.name_ru as sport_name',
      ])
      .where('s.id', '=', id)
      .execute();

    if (rows.length === 0) return undefined;

    const firstRow = rows[0];

    const season: any = {
      id: firstRow.id,
      code: firstRow.code,
      name_ru: firstRow.name_ru,
      start_date: firstRow.start_date,
      end_date: firstRow.end_date,
      season_year: firstRow.season_year,
      season_type: firstRow.season_type,
      is_active: firstRow.is_active,
      created_at: firstRow.created_at,
      updated_at: firstRow.updated_at,
      sports: [],
    };

    for (const row of rows) {
      if (row.sport_id && !season.sports.find((s) => s.id === row.sport_id)) {
        season.sports.push({
          id: row.sport_id,
          name_ru: row.sport_name,
        });
      }
    }

    return season;
  }

  async findCurrent(): Promise<any | undefined> {
    const now = new Date();

    const rows = await this.db.client
      .selectFrom('seasons as s')
      .leftJoin('season_sports as ss', 's.id', 'ss.season_id')
      .leftJoin('sports as sp', 'ss.sport_id', 'sp.id')
      .select([
        's.id',
        's.code',
        's.name_ru',
        's.start_date',
        's.end_date',
        's.season_year',
        's.season_type',
        's.is_active',
        's.created_at',
        's.updated_at',
        'ss.sport_id',
        'sp.name_ru as sport_name',
      ])
      .where('s.start_date', '<=', now)
      .where('s.end_date', '>=', now)
      .where('s.is_active', '=', true)
      .orderBy('s.start_date', 'desc')
      .limit(1)
      .execute();

    if (rows.length === 0) return undefined;

    const firstRow = rows[0];

    const season: any = {
      id: firstRow.id,
      code: firstRow.code,
      name_ru: firstRow.name_ru,
      start_date: firstRow.start_date,
      end_date: firstRow.end_date,
      season_year: firstRow.season_year,
      season_type: firstRow.season_type,
      is_active: firstRow.is_active,
      created_at: firstRow.created_at,
      updated_at: firstRow.updated_at,
      sports: [],
    };

    for (const row of rows) {
      if (row.sport_id && !season.sports.find((s) => s.id === row.sport_id)) {
        season.sports.push({
          id: row.sport_id,
          name_ru: row.sport_name,
        });
      }
    }

    return season;
  }

  async create(data: any): Promise<any> {
    const { sportIds, ...seasonData } = data;

    const season = await this.db.client
      .insertInto('seasons')
      .values(seasonData as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    if (sportIds && Array.isArray(sportIds) && sportIds.length > 0) {
      const values = sportIds.map((sportId) => ({
        season_id: season.id,
        sport_id: sportId,
      }));
      await this.db.client
        .insertInto('season_sports' as any)
        .values(values as any)
        .execute();
    }

    return {
      ...season,
      sports: sportIds?.map((id: number) => ({ id })) || [],
    };
  }

  async update(id: number, data: any): Promise<any> {
    const { sportIds, ...seasonData } = data;

    if (Object.keys(seasonData).length > 0) {
      await this.db.client
        .updateTable('seasons')
        .set(seasonData as any)
        .where('id', '=', id)
        .execute();
    }

    if (sportIds && Array.isArray(sportIds)) {
      await this.db.client
        .deleteFrom('season_sports' as any)
        .where('season_id', '=', id)
        .execute();

      if (sportIds.length > 0) {
        const values = sportIds.map((sportId) => ({
          season_id: id,
          sport_id: sportId,
        }));
        await this.db.client
          .insertInto('season_sports' as any)
          .values(values as any)
          .execute();
      }
    }

    const updatedSeason = await this.db.client
      .selectFrom('seasons')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    return {
      ...updatedSeason,
      sports: sportIds?.map((sid: number) => ({ id: sid })) || [],
    };
  }

  async delete(id: number): Promise<void> {
    await this.db.client.deleteFrom('seasons').where('id', '=', id).execute();
  }

  async generate(
    startYear: number,
    endYear: number,
    sportId?: number,
  ): Promise<void> {
    // 0. Wipe old data as requested
    this.logger.log('TRUNCATING seasons table to start fresh...');
    try {
      await sql`TRUNCATE TABLE seasons RESTART IDENTITY CASCADE`.execute(
        this.db.client,
      );
      this.logger.log('SUCCESS: Table seasons truncated');
    } catch (e: any) {
      this.logger.warn(
        'Truncate failed, attempting manual delete: ' + e.message,
      );

      try {
        await this.db.client.deleteFrom('season_sports' as any).execute();
        await sql`UPDATE workspaces SET season_id = NULL`.execute(
          this.db.client,
        );
        await sql`UPDATE event_results SET season_id = NULL`.execute(
          this.db.client,
        );
        await sql`DELETE FROM indicator_values`.execute(this.db.client);
        await sql`DELETE FROM organization_scores`.execute(this.db.client);
        await this.db.client.deleteFrom('seasons').execute();
        this.logger.log('SUCCESS: Manual delete completed');
      } catch (me: any) {
        // me
      }
    }

    // 1. Fetch relevant sports

    const allSports = await this.db.client

      .selectFrom('sports')
      .selectAll()
      .where((eb) => {
        if (sportId) return eb('id', '=', sportId);
        return eb.val(true);
      })
      .execute();

    if (allSports.length === 0) return;

    // 2. Group sports by their season pattern
    // pattern 1: Cross-year (Team or Winter)
    // pattern 2: Calendar-year (Others)
    const crossYearSports = allSports.filter(
      (s) => s.sport_type_id === 1 || s.olympic_category_id === 2,
    );
    const calendarYearSports = allSports.filter(
      (s) => s.sport_type_id !== 1 && s.olympic_category_id !== 2,
    );

    for (let year = startYear; year <= endYear; year++) {
      // Handle Cross-Year Season
      if (crossYearSports.length > 0) {
        const code = `CY_${year}_${(year + 1) % 100}`;
        const nameRu = `Спортивный сезон ${year}/${(year + 1) % 100}`;
        const startDate = `${year}-09-01`;
        const endDate = `${year + 1}-08-31`;

        let season = await this.db.client
          .selectFrom('seasons')
          .select('id')
          .where('code', '=', code)
          .executeTakeFirst();

        if (!season) {
          season = await this.db.client
            .insertInto('seasons')
            .values({
              code,
              name_ru: nameRu,
              start_date: startDate as any,
              end_date: endDate as any,
              season_year: year,
              season_type: 'cross_year',
              is_active: true,
            } as any)
            .returning('id')
            .executeTakeFirstOrThrow();
        }

        // Link sports
        const values = crossYearSports.map((s) => ({
          season_id: season!.id,
          sport_id: s.id,
        }));
        await this.db.client
          .insertInto('season_sports' as any)
          .values(values as any)
          .onConflict((oc) => oc.doNothing())
          .execute();
      }

      // Handle Calendar-Year Season
      if (calendarYearSports.length > 0) {
        const code = `CAL_${year}`;
        const nameRu = `Календарный сезон ${year}`;
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;

        let season = await this.db.client
          .selectFrom('seasons')
          .select('id')
          .where('code', '=', code)
          .executeTakeFirst();

        if (!season) {
          season = await this.db.client
            .insertInto('seasons')
            .values({
              code,
              name_ru: nameRu,
              start_date: startDate as any,
              end_date: endDate as any,
              season_year: year,
              season_type: 'calendar_year',
              is_active: true,
            } as any)
            .returning('id')
            .executeTakeFirstOrThrow();
        }

        // Link sports
        const values = calendarYearSports.map((s) => ({
          season_id: season!.id,
          sport_id: s.id,
        }));
        await this.db.client
          .insertInto('season_sports' as any)
          .values(values as any)
          .onConflict((oc) => oc.doNothing())
          .execute();
      }
    }

    this.logger.log(`Generated seasons for years ${startYear}-${endYear}`);
  }
}
