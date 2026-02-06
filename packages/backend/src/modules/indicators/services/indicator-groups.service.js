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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorGroupsService = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const database_service_1 = require("../../../../../database/src/database.service");
let IndicatorGroupsService = class IndicatorGroupsService {
    constructor(db) {
        this.db = db;
    }
    async findAll(filters) {
        let query = this.db.client.selectFrom('indicator_groups_catalog');
        if (filters.sportId) {
            query = query.where('sport_id', '=', filters.sportId);
        }
        return query
            .selectAll()
            .where('is_active', '=', true)
            .execute();
    }
    async findById(id) {
        return this.db.client
            .selectFrom('indicator_groups_catalog')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst();
    }
    async findIndicatorsByGroup(groupId) {
        const result = await (0, kysely_1.sql) `
      SELECT ic.* 
      FROM indicator_catalog ic
      JOIN indicator_catalog_groups icg ON ic.id = icg.indicator_id
      WHERE icg.group_id = ${groupId} AND ic.is_active = true
    `.execute(this.db.client);
        return result.rows;
    }
};
exports.IndicatorGroupsService = IndicatorGroupsService;
exports.IndicatorGroupsService = IndicatorGroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], IndicatorGroupsService);
//# sourceMappingURL=indicator-groups.service.js.map