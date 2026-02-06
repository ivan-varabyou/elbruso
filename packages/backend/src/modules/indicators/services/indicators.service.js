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
var IndicatorsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorsService = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const database_service_1 = require("../../../../../database/src/database.service");
let IndicatorsService = IndicatorsService_1 = class IndicatorsService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(IndicatorsService_1.name);
    }
    async onModuleInit() {
        try {
            this.logger.log('Updating indicator_catalog schema for access control...');
            await (0, kysely_1.sql) `
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL;
      `.execute(this.db.client);
            await (0, kysely_1.sql) `
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS created_by UUID;
      `.execute(this.db.client);
            try {
                await (0, kysely_1.sql) `
          ALTER TABLE indicator_catalog
          ADD CONSTRAINT fk_indicator_created_by
          FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
        `.execute(this.db.client);
            }
            catch (_) { }
            await (0, kysely_1.sql) `
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS is_system BOOLEAN DEFAULT TRUE;
      `.execute(this.db.client);
            this.logger.log('Indicator schema updated');
        }
        catch (error) {
            this.logger.error('Failed to update indicator schema:', error);
        }
    }
    async findAll(filters) {
        let query = this.db.client.selectFrom('indicator_catalog');
        if (filters.userRole !== 'ADMIN') {
            const { userId, userOrganizationId, userSportId, ancestorOrgIds, scopes, scope, } = filters;
            const activeScopes = scopes || (scope ? scope.split(',') : []);
            query = query.where((eb) => {
                const conditions = [];
                const globalCond = eb.and([
                    eb('organization_id', 'is', null),
                    eb('sport_id', 'is', null),
                ]);
                const sportCond = userSportId
                    ? eb.and([
                        eb('organization_id', 'is', null),
                        eb('sport_id', '=', userSportId),
                    ])
                    : null;
                const fedOrgs = Array.from(new Set([
                    ...(ancestorOrgIds || []),
                    ...(userOrganizationId ? [userOrganizationId] : []),
                ]));
                const federationCond = fedOrgs.length > 0 ? eb('organization_id', 'in', fedOrgs) : null;
                const personalCond = userId ? eb('created_by', '=', userId) : null;
                if (activeScopes.length === 0) {
                    conditions.push(globalCond);
                    if (sportCond)
                        conditions.push(sportCond);
                    if (federationCond)
                        conditions.push(federationCond);
                    if (personalCond)
                        conditions.push(personalCond);
                }
                else {
                    if (activeScopes.includes('global'))
                        conditions.push(globalCond);
                    if (activeScopes.includes('sport') && sportCond)
                        conditions.push(sportCond);
                    if (activeScopes.includes('federation') && federationCond)
                        conditions.push(federationCond);
                    if (activeScopes.includes('personal') && personalCond)
                        conditions.push(personalCond);
                }
                return conditions.length > 0 ? eb.or(conditions) : eb.val(false);
            });
        }
        if (filters.sportId) {
            query = query.where('sport_id', '=', filters.sportId);
        }
        if (filters.groupId) {
            query = query
                .innerJoin('indicator_catalog_groups as icg', (eb) => eb.on('indicator_catalog.id', '=', (0, kysely_1.sql) `icg.indicator_id`))
                .where('icg.group_catalog_id', '=', filters.groupId);
        }
        if (filters.search) {
            query = query.where('indicator_catalog.name_ru', 'ilike', `%${filters.search}%`);
        }
        return query
            .leftJoin('genders', 'genders.id', 'indicator_catalog.gender_id')
            .leftJoin('age_groups', 'age_groups.id', 'indicator_catalog.age_group_id')
            .leftJoin('disciplines', 'disciplines.id', 'indicator_catalog.discipline_id')
            .leftJoin('sports', 'sports.id', 'indicator_catalog.sport_id')
            .leftJoin('measurement_units', 'measurement_units.id', 'indicator_catalog.measurement_unit_id')
            .selectAll('indicator_catalog')
            .select([
            'genders.name_ru as gender_name',
            'age_groups.name_ru as age_group_name',
            'disciplines.name_ru as discipline_name',
            'sports.name_ru as sport_name',
            'measurement_units.name_ru as unit_name',
        ])
            .where('indicator_catalog.is_active', '=', true)
            .orderBy('indicator_catalog.name_ru', 'asc')
            .execute();
    }
    async findById(id) {
        return this.db.client
            .selectFrom('indicator_catalog')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst();
    }
    async findBySport(sportId) {
        return this.db.client
            .selectFrom('indicator_catalog')
            .selectAll()
            .where('sport_id', '=', sportId)
            .where('is_active', '=', true)
            .execute();
    }
    async create(data) {
        return this.db.client
            .insertInto('indicator_catalog')
            .values({
            ...data,
            is_active: true,
        })
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async update(id, data) {
        return this.db.client
            .updateTable('indicator_catalog')
            .set(data)
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async delete(id) {
        await this.db.client
            .updateTable('indicator_catalog')
            .set({ is_active: false })
            .where('id', '=', id)
            .execute();
    }
    async getTemplates() {
        return this.db.client
            .selectFrom('indicator_generation_templates')
            .selectAll()
            .where('is_active', '=', true)
            .execute();
    }
    async generate(dto) {
        const { templateIds, sportId, category, overwrite } = dto;
        let templates = [];
        let templatesQuery = this.db.client
            .selectFrom('indicator_generation_templates')
            .select(['id']);
        if (templateIds && templateIds.length > 0) {
            templatesQuery = templatesQuery.where('id', 'in', templateIds);
        }
        else {
            if (sportId) {
                templatesQuery = templatesQuery.where('sport_id', '=', sportId);
            }
            if (category) {
                if (!isNaN(Number(category))) {
                    templatesQuery = templatesQuery.where('category_id', '=', Number(category));
                }
            }
        }
        templates = await templatesQuery.where('is_active', '=', true).execute();
        this.logger.log(`Found ${templates.length} templates for generation`);
        const results = [];
        for (const template of templates) {
            try {
                const result = await (0, kysely_1.sql) `SELECT * FROM generate_indicators_from_template_v5(${template.id}, ${overwrite || false})`.execute(this.db.client);
                results.push(...result.rows);
            }
            catch (err) {
                const error = err;
                this.logger.error(`Failed to generate from template ${template.id}: ${error.message}`);
            }
        }
        return results;
    }
    async generateAll() {
        const result = await (0, kysely_1.sql) `SELECT * FROM generate_all_indicators()`.execute(this.db.client);
        return result.rows;
    }
    async getGroups(sportId) {
        let query = this.db.client
            .selectFrom('indicator_groups_catalog')
            .selectAll();
        if (sportId) {
            query = query.where('sport_id', '=', sportId);
        }
        return query
            .where('is_active', '=', true)
            .orderBy((0, kysely_1.sql) `sort_order`, 'asc')
            .execute();
    }
    async getGenders() {
        return this.db.client
            .selectFrom('genders')
            .selectAll()
            .orderBy((0, kysely_1.sql) `sort_order`, 'asc')
            .execute();
    }
    async getAgeGroups() {
        return this.db.client
            .selectFrom('age_groups')
            .selectAll()
            .orderBy((0, kysely_1.sql) `sort_order`, 'asc')
            .execute();
    }
    async createGroup(data) {
        return this.db.client
            .insertInto('indicator_groups_catalog')
            .values({
            ...data,
            is_active: true,
        })
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async updateGroup(id, data) {
        return this.db.client
            .updateTable('indicator_groups_catalog')
            .set({
            ...data,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async deleteGroup(id) {
        await this.db.client
            .updateTable('indicator_groups_catalog')
            .set({ is_active: false })
            .where('id', '=', id)
            .execute();
    }
};
exports.IndicatorsService = IndicatorsService;
exports.IndicatorsService = IndicatorsService = IndicatorsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], IndicatorsService);
//# sourceMappingURL=indicators.service.js.map