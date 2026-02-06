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
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../../database/src/database.service");
let CountriesService = class CountriesService {
    constructor(db) {
        this.db = db;
    }
    async findAll(lang = 'ru') {
        const countries = await this.db.client
            .selectFrom('countries')
            .select(['id', 'code_alpha2 as code', 'name_ru'])
            .orderBy('name_ru', 'asc')
            .execute();
        return countries.map((c) => ({
            id: c.id,
            code: c.code,
            name: c.name_ru,
            flag: this.getFlagEmoji(c.code),
        }));
    }
    async findActive(lang = 'ru') {
        const countries = await this.db.client
            .selectFrom('countries')
            .select(['id', 'code_alpha2 as code', 'name_ru'])
            .where('is_active', '=', true)
            .orderBy('name_ru', 'asc')
            .execute();
        return countries.map((c) => ({
            id: c.id,
            code: c.code,
            name: c.name_ru,
            flag: this.getFlagEmoji(c.code),
        }));
    }
    async findById(id) {
        const country = await this.db.client
            .selectFrom('countries')
            .select(['id', 'code_alpha2 as code', 'name_ru'])
            .where('id', '=', id)
            .executeTakeFirst();
        if (!country)
            return null;
        return {
            id: country.id,
            code: country.code,
            name: country.name_ru,
            flag: this.getFlagEmoji(country.code),
        };
    }
    getFlagEmoji(countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CountriesService);
//# sourceMappingURL=countries.service.js.map