"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SeasonsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonsService = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const database_service_1 = require("../../../../../database/src/database.service");
let SeasonsService = SeasonsService_1 = class SeasonsService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(SeasonsService_1.name);
    }
    async onModuleInit() {
        try {
            this.logger.log('Updating seasons schema to support multiple sports...');
            await (0, kysely_1.sql) `
        CREATE TABLE IF NOT EXISTS season_sports (
          season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
          sport_id INTEGER NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
          PRIMARY KEY (season_id, sport_id)
        );
      `.execute(this.db.client);
            await (0, kysely_1.sql) `
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
            await (0, kysely_1.sql) `
        ALTER TABLE seasons ADD COLUMN IF NOT EXISTS season_year INTEGER;
        ALTER TABLE seasons ADD COLUMN IF NOT EXISTS season_type VARCHAR(20);
      `.execute(this.db.client);
            await (0, kysely_1.sql) `
        DO $$
        BEGIN
            IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='seasons' AND column_name='name') 
               AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='seasons' AND column_name='name_ru') THEN
                ALTER TABLE seasons RENAME COLUMN name TO name_ru;
            END IF;
        END $$;
      `.execute(this.db.client);
            this.logger.log('Seasons schema updated');
        }
        catch (error) {
            this.logger.error('Failed to update seasons schema:', error);
        }
    }
    async findAll() {
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
        if (rows.length === 0)
            return [];
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
    async findById(id) {
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
        if (rows.length === 0)
            return undefined;
        const firstRow = rows[0];
        const season = {
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
    async findCurrent() {
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
        if (rows.length === 0)
            return undefined;
        const firstRow = rows[0];
        const season = {
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
    async create(data) {
        const { sportIds, ...seasonData } = data;
        const season = await this.db.client
            .insertInto('seasons')
            .values(seasonData)
            .returningAll()
            .executeTakeFirstOrThrow();
        if (sportIds && Array.isArray(sportIds) && sportIds.length > 0) {
            const values = sportIds.map((sportId) => ({
                season_id: season.id,
                sport_id: sportId,
            }));
            await this.db.client
                .insertInto('season_sports')
                .values(values)
                .execute();
        }
        return {
            ...season,
            sports: sportIds?.map((id) => ({ id })) || [],
        };
    }
    async update(id, data) {
        const { sportIds, ...seasonData } = data;
        if (Object.keys(seasonData).length > 0) {
            await this.db.client
                .updateTable('seasons')
                .set(seasonData)
                .where('id', '=', id)
                .execute();
        }
        if (sportIds && Array.isArray(sportIds)) {
            await this.db.client
                .deleteFrom('season_sports')
                .where('season_id', '=', id)
                .execute();
            if (sportIds.length > 0) {
                const values = sportIds.map((sportId) => ({
                    season_id: id,
                    sport_id: sportId,
                }));
                await this.db.client
                    .insertInto('season_sports')
                    .values(values)
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
            sports: sportIds?.map((sid) => ({ id: sid })) || [],
        };
    }
    async delete(id) {
        await this.db.client.deleteFrom('seasons').where('id', '=', id).execute();
    }
    async generate(startYear, endYear, sportId) {
        this.logger.log('TRUNCATING seasons table to start fresh...');
        try {
            await (0, kysely_1.sql) `TRUNCATE TABLE seasons RESTART IDENTITY CASCADE`.execute(this.db.client);
            this.logger.log('SUCCESS: Table seasons truncated');
        }
        catch (e) {
            this.logger.warn('Truncate failed, attempting manual delete: ' + e.message);
            try {
                await this.db.client.deleteFrom('season_sports').execute();
                await (0, kysely_1.sql) `UPDATE workspaces SET season_id = NULL`.execute(this.db.client);
                await (0, kysely_1.sql) `UPDATE event_results SET season_id = NULL`.execute(this.db.client);
                await (0, kysely_1.sql) `DELETE FROM indicator_values`.execute(this.db.client);
                await (0, kysely_1.sql) `DELETE FROM organization_scores`.execute(this.db.client);
                await this.db.client.deleteFrom('seasons').execute();
                this.logger.log('SUCCESS: Manual delete completed');
            }
            catch (me) {
            }
        }
        const allSports = await this.db.client
            .selectFrom('sports')
            .selectAll()
            .where((eb) => {
            if (sportId)
                return eb('id', '=', sportId);
            return eb.val(true);
        })
            .execute();
        if (allSports.length === 0)
            return;
        const crossYearSports = allSports.filter((s) => s.sport_type_id === 1 || s.olympic_category_id === 2);
        const calendarYearSports = allSports.filter((s) => s.sport_type_id !== 1 && s.olympic_category_id !== 2);
        for (let year = startYear; year <= endYear; year++) {
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
                        start_date: startDate,
                        end_date: endDate,
                        season_year: year,
                        season_type: 'cross_year',
                        is_active: true,
                    })
                        .returning('id')
                        .executeTakeFirstOrThrow();
                }
                const values = crossYearSports.map((s) => ({
                    season_id: season.id,
                    sport_id: s.id,
                }));
                await this.db.client
                    .insertInto('season_sports')
                    .values(values)
                    .onConflict((oc) => oc.doNothing())
                    .execute();
            }
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
                        start_date: startDate,
                        end_date: endDate,
                        season_year: year,
                        season_type: 'calendar_year',
                        is_active: true,
                    })
                        .returning('id')
                        .executeTakeFirstOrThrow();
                }
                const values = calendarYearSports.map((s) => ({
                    season_id: season.id,
                    sport_id: s.id,
                }));
                await this.db.client
                    .insertInto('season_sports')
                    .values(values)
                    .onConflict((oc) => oc.doNothing())
                    .execute();
            }
        }
        this.logger.log(`Generated seasons for years ${startYear}-${endYear}`);
    }
};
exports.SeasonsService = SeasonsService;
exports.SeasonsService = SeasonsService = SeasonsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SeasonsService);
//# sourceMappingURL=seasons.service.js.map