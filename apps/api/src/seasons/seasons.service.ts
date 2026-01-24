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
    const seasons = await this.db.client
      .selectFrom('seasons')
      .selectAll()
      .orderBy('start_date', 'desc')
      .execute();

    if (seasons.length === 0) return [];

    const seasonSports = await this.db.client
      .selectFrom('season_sports' as any)
      .innerJoin('sports', 'sports.id', 'season_sports.sport_id')
      .select(['season_sports.season_id', 'sports.id', 'sports.name_ru'])
      .where('season_sports.season_id', 'in', seasons.map(s => s.id) as any)
      .execute();



    return seasons.map(season => {
      const sports = seasonSports
        .filter(ss => Number(ss.season_id) === Number(season.id))
        .map(ss => ({ id: ss.id, name_ru: ss.name_ru }));
      
      return {
        ...season,
        sports
      };
    });
  }

  async findById(id: number): Promise<any | undefined> {
    const season = await this.db.client
      .selectFrom('seasons')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!season) return undefined;

    const sports = await this.db.client
      .selectFrom('season_sports' as any)
      .innerJoin('sports', 'sports.id', 'season_sports.sport_id')
      .select(['sports.id', 'sports.name_ru'])
      .where('season_sports.season_id', '=', id as any)
      .execute();

    return { ...season, sports };
  }


  async findCurrent(): Promise<any | undefined> {
    const now = new Date();
    const season = await this.db.client
      .selectFrom('seasons')
      .selectAll()
      .where('start_date', '<=', now)
      .where('end_date', '>=', now)
      .where('is_active', '=', true)
      .orderBy('start_date', 'desc')
      .executeTakeFirst();

    if (!season) return undefined;
    return this.findById(season.id);
  }






  async create(data: any): Promise<any> {
    const { sportIds, ...seasonData } = data;
    
    const season = await this.db.client
      .insertInto('seasons')
      .values(seasonData as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    if (sportIds && Array.isArray(sportIds) && sportIds.length > 0) {
      const values = sportIds.map(sportId => ({
        season_id: season.id,
        sport_id: sportId
      }));
      await this.db.client
        .insertInto('season_sports' as any)
        .values(values as any)
        .execute();
    }

    return this.findById(season.id);
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
        const values = sportIds.map(sportId => ({
          season_id: id,
          sport_id: sportId
        }));
        await this.db.client
          .insertInto('season_sports' as any)
          .values(values as any)
          .execute();
      }
    }

    return this.findById(id);
  }


  async delete(id: number): Promise<void> {
    await this.db.client
      .deleteFrom('seasons')
      .where('id', '=', id)
      .execute();
  }

  async generate(startYear: number, endYear: number, sportId?: number): Promise<void> {
    // 0. Wipe old data as requested
    this.logger.log('TRUNCATING seasons table to start fresh...');
    try {
      await sql`TRUNCATE TABLE seasons RESTART IDENTITY CASCADE`.execute(this.db.client);
      this.logger.log('SUCCESS: Table seasons truncated');
    } catch (e: any) {
      this.logger.warn('Truncate failed, attempting manual delete: ' + e.message);
      
      try {
        await this.db.client.deleteFrom('season_sports' as any).execute();
        await sql`UPDATE workspaces SET season_id = NULL`.execute(this.db.client);
        await sql`UPDATE event_results SET season_id = NULL`.execute(this.db.client);
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
    const crossYearSports = allSports.filter(s => s.sport_type_id === 1 || s.olympic_category_id === 2);
    const calendarYearSports = allSports.filter(s => s.sport_type_id !== 1 && s.olympic_category_id !== 2);

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
        const values = crossYearSports.map(s => ({ season_id: season!.id, sport_id: s.id }));
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
        const values = calendarYearSports.map(s => ({ season_id: season!.id, sport_id: s.id }));
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

