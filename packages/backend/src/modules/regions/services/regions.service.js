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
exports.RegionsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../../database/src/database.service");
let RegionsService = class RegionsService {
    constructor(db) {
        this.db = db;
    }
    async findAll(filters) {
        let query = this.db.client.selectFrom('regions');
        if (filters.countryId) {
            query = query.where('country_id', '=', filters.countryId);
        }
        if (filters.federalDistrictId) {
            query = query.where('federal_district_id', '=', filters.federalDistrictId);
        }
        return query.selectAll().execute();
    }
    async findById(id) {
        return this.db.client
            .selectFrom('regions')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();
    }
    async findByDistrict(districtId) {
        return this.db.client
            .selectFrom('regions')
            .selectAll()
            .where('federal_district_id', '=', districtId)
            .execute();
    }
    async findByCountry(countryId) {
        return this.db.client
            .selectFrom('regions')
            .selectAll()
            .where('country_id', '=', countryId)
            .execute();
    }
};
exports.RegionsService = RegionsService;
exports.RegionsService = RegionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RegionsService);
//# sourceMappingURL=regions.service.js.map