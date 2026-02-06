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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const database_service_1 = require("../../../../../database/src/database.service");
let OrganizationsService = class OrganizationsService {
    constructor(db) {
        this.db = db;
    }
    async findAll(filters) {
        let query = this.db.client.selectFrom('organizations');
        if (filters.typeId) {
            query = query.where('type_id', '=', filters.typeId);
        }
        if (filters.sportId) {
            query = query.where('sport_id', '=', filters.sportId);
        }
        if (filters.regionId) {
            query = query.where('region_id', '=', filters.regionId);
        }
        if (filters.parentId) {
            query = query.where('parent_id', '=', filters.parentId);
        }
        if (filters.countryId) {
            query = query.where('country_id', '=', filters.countryId);
        }
        return query
            .selectAll()
            .where('is_active', '=', true)
            .execute();
    }
    async findById(id) {
        return this.db.client
            .selectFrom('organizations')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst();
    }
    async findFederations(filters) {
        let query = this.db.client
            .selectFrom('organizations')
            .where('type_id', 'in', [2, 3]);
        if (filters.sportId) {
            query = query.where('sport_id', '=', filters.sportId);
        }
        if (filters.regionId) {
            query = query.where('region_id', '=', filters.regionId);
        }
        return query
            .selectAll()
            .where('is_active', '=', true)
            .execute();
    }
    async getHierarchy(orgId) {
        const result = await (0, kysely_1.sql) `
      WITH RECURSIVE org_hierarchy AS (
        SELECT * FROM organizations WHERE id = ${orgId}
        UNION ALL
        SELECT o.* FROM organizations o
        JOIN org_hierarchy oh ON o.parent_id = oh.id
      )
      SELECT * FROM org_hierarchy WHERE is_active = true
    `.execute(this.db.client);
        return result.rows;
    }
    async getTree(orgId) {
        const flat = await this.getHierarchy(orgId);
        const buildTree = (parentId) => {
            return flat
                .filter((org) => org.parent_id === parentId)
                .map((org) => ({
                ...org,
                children: buildTree(org.id),
            }));
        };
        const root = flat.find((o) => o.id === orgId);
        if (!root)
            return null;
        return {
            ...root,
            children: buildTree(orgId),
        };
    }
    async getAncestors(orgId) {
        const result = await (0, kysely_1.sql) `
      WITH RECURSIVE org_ancestors AS (
        SELECT * FROM organizations WHERE id = ${orgId}
        UNION ALL
        SELECT o.* FROM organizations o
        JOIN org_ancestors oa ON oa.parent_id = o.id
      )
      SELECT * FROM org_ancestors WHERE is_active = true
    `.execute(this.db.client);
        return result.rows;
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map