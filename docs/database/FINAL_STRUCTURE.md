# Финальная структура универсальной системы индикаторов

## Обзор изменений

Файл `03_indicators_system.sql` полностью переработан и теперь включает все улучшения из универсальной системы.

## Структура таблиц

### 📊 Справочники (Reference Tables)

```
indicator_categories        - Категории индикаторов
├── federation             - Федерация
├── marketing              - Маркетинг
├── infrastructure         - Инфраструктура
├── achievements           - Достижения
├── personnel              - Кадры
├── finance                - Финансы
├── development            - Развитие
└── other                  - Прочее

measurement_units          - Единицы измерения
├── people                 - человек
├── teams                  - команд
├── courts                 - площадок
├── medals                 - медалей
└── ... (30+ единиц)

event_types                - Типы событий
├── championship           - Чемпионат
├── cup                    - Кубок
├── league                 - Лига
└── ... (10+ типов)

event_levels               - Уровни событий
├── international          - Международный
├── national               - Национальный
├── regional               - Региональный
└── ... (8 уровней)

event_stages               - Этапы событий
├── qualification          - Квалификация
├── semifinal              - Полуфинал
├── final                  - Финал
└── ... (11 этапов)

data_sources               - Источники данных
├── manual                 - Ручной ввод
├── registry               - Реестр объектов
├── event                  - Результаты событий
└── ... (8 источников)

seasons                    - Сезоны
├── 2024                   - Календарный
├── 2024/25                - Спортивный
└── ...
```

### 🗂️ Группы и индикаторы

```
indicator_groups_catalog                  - Каталог групп
├── id, code, name_ru
├── sport_id (NULL = универсальная)
└── Без жесткой иерархии!

indicator_group_relationships             - Связи групп (Many-to-Many)
├── parent_group_id
├── child_group_id
└── Одна группа → несколько родителей

indicator_catalog                         - Каталог индикаторов
├── category_id → indicator_categories
├── measurement_unit_id → measurement_units
├── sport_id (NULL = универсальный)
└── default_weight

indicator_catalog_groups                  - Связь индикаторов с группами (M2M)
├── indicator_catalog_id
└── group_catalog_id
```

### 🏢 Данные организаций

```
organization_indicators                   - Активные индикаторы
├── organization_id
├── indicator_catalog_id
├── custom_weight (переопределение)
└── is_enabled

organization_indicator_values             - Значения индикаторов
├── organization_id
├── indicator_catalog_id
├── season_id
├── value_number / value_boolean / value_text
├── data_source_id
└── event_result_id (если из события)

organization_scores                       - Рассчитанные баллы
├── organization_id
├── season_id
├── score_federation
├── score_marketing
├── ... (по категориям)
└── total_score
```

### 🏆 События и турниры

```
events_catalog                            - Каталог событий
├── parent_event_id (иерархия)
├── event_type_id → event_types
├── level_id → event_levels
├── stage_id → event_stages
├── sport_id, discipline_id
└── organizer_id

event_results                             - Результаты в событиях
├── event_id
├── organization_id
├── season_id
├── place, points, team_count
└── metadata

event_indicator_mapping                   - Связь событий с индикаторами
├── event_id
├── indicator_catalog_id
├── place_from, place_to
└── weight_multiplier
```

## Ключевые возможности

### ✅ Many-to-Many связи групп

```sql
-- Маркетинг принадлежит нескольким группам
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id) VALUES
  ((SELECT id FROM indicator_groups_catalog WHERE code = 'professional_sport'),
   (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING')),
  
  ((SELECT id FROM indicator_groups_catalog WHERE code = 'regional_general'),
   (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING'));
```

### ✅ Универсальные индикаторы

```sql
-- Один индикатор для всех видов спорта
INSERT INTO indicator_catalog (
    category_id, code, name_ru, sport_id
) VALUES (
    (SELECT id FROM indicator_categories WHERE code = 'marketing'),
    'MARKETING_WEBSITE',
    'Наличие сайта',
    NULL  -- NULL = для всех видов спорта
);
```

### ✅ Специфичные индикаторы

```sql
-- Только для баскетбола
INSERT INTO indicator_catalog (
    category_id, code, name_ru, sport_id
) VALUES (
    (SELECT id FROM indicator_categories WHERE code = 'infrastructure'),
    'BBL_COURTS_3X3',
    'Площадки 3х3',
    10  -- Только баскетбол
);
```

### ✅ Нормализация через справочники

```sql
-- Вместо VARCHAR используем ссылки
INSERT INTO indicator_catalog (
    category_id,              -- Вместо category VARCHAR
    measurement_unit_id,      -- Вместо measurement_unit VARCHAR
    ...
) VALUES (
    (SELECT id FROM indicator_categories WHERE code = 'marketing'),
    (SELECT id FROM measurement_units WHERE code = 'yes_no'),
    ...
);
```

## Порядок установки файлов

### Вариант 1: Новая установка

```bash
# 1. Базовые справочники и таблицы (если еще не созданы)
psql -f 01_reference_tables.sql
psql -f 02_core_entities.sql

# 2. Обновленная система индикаторов
psql -f 03_indicators_system.sql

# 3. Наполнение справочников
psql -f 11_reference_tables.sql

# 4. Связи групп (many-to-many)
psql -f 12_group_relationships.sql

# 5. Утилиты для сезонов
psql -f 10_seasons_utilities.sql

# 6. Примеры данных
psql -f 09_universal_indicators_system.sql
```

### Вариант 2: Обновление существующей системы

```bash
# 1. Создаем справочные таблицы
psql -f 11_reference_tables.sql

# 2. Создаем связи групп
psql -f 12_group_relationships.sql

# 3. Обновляем основные таблицы
# ВНИМАНИЕ: Это пересоздаст таблицы!
# Сделайте резервную копию перед выполнением
psql -f 03_indicators_system.sql
```

## Миграция данных

Если у вас уже есть данные в старой структуре:

```sql
-- 1. Миграция категорий
UPDATE indicator_catalog ic
SET category_id = icat.id
FROM indicator_categories icat
WHERE ic.category = icat.code;  -- Если было поле category VARCHAR

-- 2. Миграция единиц измерения
UPDATE indicator_catalog ic
SET measurement_unit_id = mu.id
FROM measurement_units mu
WHERE ic.measurement_unit = mu.code;  -- Если было поле measurement_unit VARCHAR

-- 3. Миграция связей групп из parent_id
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order)
SELECT parent_id, id, sort_order
FROM indicator_groups_catalog
WHERE parent_id IS NOT NULL
ON CONFLICT DO NOTHING;
```

## Преимущества новой структуры

| Возможность | Старая система | Новая система |
|-------------|----------------|---------------|
| Группа в нескольких местах | ❌ Нет | ✅ Да (M2M) |
| Универсальные индикаторы | ❌ Дублирование | ✅ Один индикатор |
| Нормализация справочников | ❌ VARCHAR | ✅ Отдельные таблицы |
| Иерархия событий | ❌ Нет | ✅ parent_event_id |
| Автоопределение сезона | ❌ Нет | ✅ Триггеры |
| Связь событий с индикаторами | ❌ Нет | ✅ event_indicator_mapping |
| История изменений | ❌ Нет | ✅ indicator_versions |

## Примеры использования

### Создание универсального индикатора

```sql
INSERT INTO indicator_catalog (
    category_id,
    code,
    name_ru,
    value_type,
    default_weight,
    measurement_unit_id,
    sport_id
) VALUES (
    (SELECT id FROM indicator_categories WHERE code = 'marketing'),
    'MARKETING_VK_ACTIVE',
    'Активное сообщество ВКонтакте',
    'boolean',
    0.05,
    (SELECT id FROM measurement_units WHERE code = 'yes_no'),
    NULL  -- Универсальный
);
```

### Создание специфичного индикатора

```sql
INSERT INTO indicator_catalog (
    category_id,
    code,
    name_ru,
    value_type,
    default_weight,
    measurement_unit_id,
    sport_id,
    discipline_id
) VALUES (
    (SELECT id FROM indicator_categories WHERE code = 'infrastructure'),
    'BBL_COURTS_3X3',
    'Площадки 3х3',
    'number',
    0.10,
    (SELECT id FROM measurement_units WHERE code = 'courts'),
    10,   -- Баскетбол
    219   -- Дисциплина 3х3
);
```

### Связывание группы с несколькими родителями

```sql
-- Маркетинг важен и в "Профессиональном спорте" и в "Общих показателях"
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order) VALUES
  ((SELECT id FROM indicator_groups_catalog WHERE code = 'professional_sport'),
   (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING'), 10),
  
  ((SELECT id FROM indicator_groups_catalog WHERE code = 'regional_general'),
   (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING'), 20);
```

### Создание события с иерархией

```sql
-- Родительское событие
INSERT INTO events_catalog (
    code, name_ru, event_type_id, level_id, sport_id
) VALUES (
    'BBL_SUPERLEAGUE_M',
    'Суперлига (мужчины)',
    (SELECT id FROM event_types WHERE code = 'league'),
    (SELECT id FROM event_levels WHERE code = 'national'),
    10
) RETURNING id;  -- Допустим, вернул 100

-- Дочернее событие
INSERT INTO events_catalog (
    parent_event_id, code, name_ru, event_type_id, level_id, stage_id, sport_id
) VALUES (
    100,  -- Родитель
    'BBL_SUPERLEAGUE_M_PLAYOFF',
    'Суперлига. Плей-офф',
    (SELECT id FROM event_types WHERE code = 'league'),
    (SELECT id FROM event_levels WHERE code = 'national'),
    (SELECT id FROM event_stages WHERE code = 'playoff'),
    10
);
```

## Следующие шаги

1. ✅ Установить обновленный `03_indicators_system.sql`
2. ✅ Установить справочные таблицы `11_reference_tables.sql`
3. ✅ Установить связи групп `12_group_relationships.sql`
4. ✅ Установить утилиты сезонов `10_seasons_utilities.sql`
5. ⏳ Наполнить справочники данными
6. ⏳ Создать группы индикаторов
7. ⏳ Создать индикаторы в каталоге
8. ⏳ Активировать индикаторы для организаций
9. ⏳ Внести данные за текущий сезон

## Поддержка

Документация:
- **UNIVERSAL_SYSTEM_README.md** - Порядок установки
- **UNIVERSAL_SYSTEM_GUIDE.md** - Полное руководство
- **IMPROVED_INDICATORS_PROPOSAL.md** - Детальные примеры

SQL файлы:
- **03_indicators_system.sql** - Основные таблицы (обновлено)
- **09_universal_indicators_system.sql** - Примеры данных
- **10_seasons_utilities.sql** - Утилиты для сезонов
- **11_reference_tables.sql** - Справочные таблицы
- **12_group_relationships.sql** - Связи групп M2M
