import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { sql } from 'kysely';
import { Sports, Disciplines } from '@database';
import { DatabaseService } from '@database/database.service';
import { SportFiltersDto } from '../dto/sport-filters.dto';

@Injectable()
export class SportsService implements OnModuleInit {
  private readonly logger = new Logger(SportsService.name);

  constructor(private readonly db: DatabaseService) {}

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

      // 1. Default all to None (4) / Individual (2)
      await sql`UPDATE sports SET olympic_category_id = 4, sport_type_id = 2`.execute(
        this.db.client,
      );

      // 2. Apply specific mappings
      for (const m of mappings) {
        await sql`
          UPDATE sports 
          SET olympic_category_id = ${m.cat}, sport_type_id = ${m.type} 
          WHERE name_ru = ANY(${m.names})
        `.execute(this.db.client);
      }
      this.logger.log('Sports categorization complete');
    } catch (error) {
      this.logger.error('Failed to categorize sports:', error);
    }
  }

  async findAll(filters?: SportFiltersDto): Promise<Sports[]> {
    let query = this.db.client.selectFrom('sports');

    if (filters?.olympicCategoryId) {
      query = query.where(
        'olympic_category_id',
        '=',
        filters.olympicCategoryId,
      );
    }

    if (filters?.sportTypeId) {
      query = query.where('sport_type_id', '=', filters.sportTypeId);
    }

    return query
      .selectAll()
      .where('is_active', '=', filters?.isActive ?? true)
      .orderBy('name_ru', 'asc')
      .execute() as unknown as Sports[];
  }

  async findById(id: number): Promise<Sports | undefined> {
    return this.db.client
      .selectFrom('sports')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst() as unknown as Sports | undefined;
  }

  async findDisciplines(sportId: number): Promise<Disciplines[]> {
    return this.db.client
      .selectFrom('disciplines')
      .selectAll()
      .where('country_sport_id', '=', sportId)
      .where('is_active', '=', true)
      .orderBy('name_ru', 'asc')
      .execute() as unknown as Disciplines[];
  }
}
