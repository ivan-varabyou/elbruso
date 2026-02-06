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
var SportsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportsService = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const database_service_1 = require("../../../../../database/src/database.service");
let SportsService = SportsService_1 = class SportsService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(SportsService_1.name);
    }
    async onModuleInit() {
        try {
            this.logger.log('Categorizing sports with realistic data...');
            const mappings = [
                {
                    names: [
                        'Баскетбол',
                        'Волейбол',
                        ' футбол',
                        'Хоккей на траве',
                        'Гандбол',
                        'Регби',
                        'Бейсбол',
                        'Водное поло',
                        'Софтбол',
                        'Пляжный волейбол',
                    ],
                    cat: 1,
                    type: 1,
                },
                {
                    names: [
                        'Бокс',
                        'Спортивная борьба',
                        'Велосипедный спорт',
                        'Гольф',
                        'Гребля на байдарках и каноэ',
                        'Гребной слалом',
                        'Гребной спорт',
                        'Дзюдо',
                        'Каратэ',
                        'Легкая атлетика',
                        'Плавание',
                        'Прыжки в воду',
                        'Прыжки на батуте',
                        'Пулевая стрельба',
                        'Стендовая стрельба',
                        'Стрельба из лука',
                        'Теннис',
                        'Триатлон',
                        'Тхэквондо',
                        'Тяжелая атлетика',
                        'Фехтование',
                        'Спортивная гимнастика',
                        'Художественная гимнастика',
                        'Современное пятиборье',
                        'Скалолазание',
                        'Скейтбординг',
                        'Серфинг',
                    ],
                    cat: 1,
                    type: 2,
                },
                {
                    names: ['Бадминтон', 'Синхронное плавание'],
                    cat: 1,
                    type: 3,
                },
                {
                    names: ['Хоккей', 'Кёрлинг', 'Хоккей с мячом', 'Бобслей', 'Скелетон'],
                    cat: 2,
                    type: 1,
                },
                {
                    names: [
                        'Биатлон',
                        'Горнолыжный спорт',
                        'Конькобежный спорт',
                        'Лыжное двоеборье',
                        'Лыжные гонки',
                        'Прыжки на лыжах с трамплина',
                        'Санный спорт',
                        'Фигурное катание на коньках',
                        'Фристайл',
                        'Сноуборд',
                    ],
                    cat: 2,
                    type: 2,
                },
            ];
            await (0, kysely_1.sql) `UPDATE sports SET olympic_category_id = 4, sport_type_id = 2`.execute(this.db.client);
            for (const m of mappings) {
                await (0, kysely_1.sql) `
          UPDATE sports 
          SET olympic_category_id = ${m.cat}, sport_type_id = ${m.type} 
          WHERE name_ru = ANY(${m.names})
        `.execute(this.db.client);
            }
            this.logger.log('Sports categorization complete');
        }
        catch (error) {
            this.logger.error('Failed to categorize sports:', error);
        }
    }
    async findAll(filters) {
        let query = this.db.client.selectFrom('sports');
        if (filters?.olympicCategoryId) {
            query = query.where('olympic_category_id', '=', filters.olympicCategoryId);
        }
        if (filters?.sportTypeId) {
            query = query.where('sport_type_id', '=', filters.sportTypeId);
        }
        return query
            .selectAll()
            .where('is_active', '=', filters?.isActive ?? true)
            .orderBy('name_ru', 'asc')
            .execute();
    }
    async findById(id) {
        return this.db.client
            .selectFrom('sports')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();
    }
    async findDisciplines(sportId) {
        return this.db.client
            .selectFrom('disciplines')
            .selectAll()
            .where('country_sport_id', '=', sportId)
            .where('is_active', '=', true)
            .orderBy('name_ru', 'asc')
            .execute();
    }
};
exports.SportsService = SportsService;
exports.SportsService = SportsService = SportsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SportsService);
//# sourceMappingURL=sports.service.js.map