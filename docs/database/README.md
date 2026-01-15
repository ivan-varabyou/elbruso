# База данных SBA (Система оценки развития спорта)

## Описание

Полная схема базы данных для централизованной системы оценки развития баскетбола (и других видов спорта) по регионам. Система заменяет Excel-таблицы нормализованной структурой данных с поддержкой:

- Справочников (страны, регионы, виды спорта, организации)
- Системы показателей с группами и весами
- Сезонности и версионирования
- Нормализации на население
- Кастомизации для федераций
- Аудита изменений

## Структура файлов

```
docs/database/
├── 00_master_install.sql      # Мастер-скрипт установки
├── 01_reference_tables.sql    # Справочники
├── 02_core_entities.sql       # Основные сущности
├── 03_indicators_system.sql   # Система показателей
├── 04_values_and_results.sql  # Значения и результаты
└── README.md                  # Этот файл
```

## Быстрый старт

### Установка полной схемы

```bash
# Создать базу данных
createdb sba

# Установить все таблицы
psql -d sba -f docs/database/00_master_install.sql
```

### Установка по блокам (опционально)

```bash
psql -d sba -f docs/database/01_reference_tables.sql
psql -d sba -f docs/database/02_core_entities.sql
psql -d sba -f docs/database/03_indicators_system.sql
psql -d sba -f docs/database/04_values_and_results.sql
```

## Блоки таблиц

### Блок 1: Справочники (12 таблиц)

**Базовые:**
- `languages` — языки (ru, en)
- `genders` — пол (M, F)
- `age_groups` — возрастные группы (U14, U15, U18, Adult, Veterans)

**География:**
- `region_types` — типы регионов
- `countries` — страны (RU, BY, KZ)
- `federal_districts` — федеральные округа

**Спорт:**
- `olympic_categories` — олимпийские категории
- `sport_types` — типы спорта (командный/индивидуальный)

**Организации:**
- `organization_levels` — уровни (международный, национальный, региональный)
- `organization_types` — типы (федерация, лига, клуб)

**Данные:**
- `data_source_categories` — категории источников
- `data_sources` — источники данных (Росстат, Минспорт)

### Блок 2: Основные сущности (7 таблиц)

- `regions` — регионы/субъекты РФ
- `region_population` — население по годам
- `sports` — виды спорта
- `disciplines` — дисциплины (5x5, 3x3)
- `organizations` — организации (IOC → FIBA → РФБ → региональные)
- `federations` — спортивные федерации
- `translations` — переводы на разные языки

### Блок 3: Система показателей (5 таблиц)

- `seasons` — сезоны (2023, 2024, 2023/24)
- `indicator_groups` — группы показателей
- `indicators` — показатели/критерии (400+ из Excel)
- `indicator_versions` — версии показателей
- `federation_indicators` — кастомизация для федераций

### Блок 4: Значения и результаты (4 таблицы)

- `indicator_values` — фактические значения (замена Excel)
- `federation_scores` — итоговые баллы и рейтинги
- `federation_score_details` — детализация по группам
- `audit_log` — журнал изменений

## Ключевые возможности

### 1. Нормализация на население

Показатели с флагом `use_population = true` автоматически нормализуются на население региона:

```sql
SELECT calculate_federation_score(federation_id, season_id);
```

### 2. Версионирование показателей

Изменение весов без потери истории:

```sql
INSERT INTO indicator_versions (indicator_id, version, weight, valid_from)
VALUES (1, 2, 15.0000, '2025-01-01');
```

### 3. Кастомизация для федераций

Каждая федерация может:
- Включать/выключать показатели
- Переопределять веса
- Переименовывать показатели

```sql
INSERT INTO federation_indicators (federation_id, indicator_id, custom_weight, is_enabled)
VALUES (1, 5, 20.0000, true);
```

### 4. Аудит изменений

Автоматическое логирование всех изменений:

```sql
-- Подключить аудит к таблице
CREATE TRIGGER audit_indicator_values
    AFTER INSERT OR UPDATE OR DELETE ON indicator_values
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();
```

## Примеры использования

### Добавить значение показателя

```sql
INSERT INTO indicator_values (
    federation_id, indicator_id, season_id, value, created_by
) VALUES (
    1, 1, 3, 5, 'ivanov@example.com'
);
```

### Получить рейтинг регионов

```sql
SELECT 
    r.name_ru,
    fs.total_score,
    fs.rank_overall,
    fs.coefficient
FROM federation_scores fs
JOIN federations f ON f.id = fs.federation_id
JOIN regions r ON r.id = f.region_id
WHERE fs.season_id = 3
ORDER BY fs.rank_overall;
```

### Детализация по группам показателей

```sql
SELECT 
    ig.name_ru as группа,
    fsd.score as баллы
FROM federation_score_details fsd
JOIN indicator_groups ig ON ig.id = fsd.indicator_group_id
WHERE fsd.federation_score_id = 1
ORDER BY fsd.score DESC;
```

### Автогенерация показателей по шаблону

**Создать шаблон:**

```sql
INSERT INTO indicator_templates (
    group_id, sport_id, discipline_id, gender_id, age_group_id,
    result_type, range_from, range_to, base_weight,
    name_pattern, code_pattern
) VALUES (
    10,  -- ID группы "Сборные команды России 5x5"
    2,   -- баскетбол
    1,   -- 5x5
    1,   -- мужчины
    3,   -- U16
    'place',  -- тип: места
    1,    -- от 1 места
    8,    -- до 8 места
    5.0,  -- вес
    '{place} место сборной {age_group_name} ({gender_name}) в {discipline_name}',
    'BBL_{discipline_code}_{gender_code}_{age_group_code}_PLACE_{place}'
);
```

**Сгенерировать показатели из шаблона:**

```sql
-- Генерация по одному шаблону (8 показателей для мест 1-8)
SELECT * FROM generate_indicators_from_template(1);

-- Результат:
-- action | indicator_code                    | indicator_name
-- -------|-----------------------------------|------------------------------------------
-- INSERT | BBL_5X5_M_U16_PLACE_1            | 1 место сборной До 16 лет (Мужской) в Баскетбол 5x5
-- INSERT | BBL_5X5_M_U16_PLACE_2            | 2 место сборной До 16 лет (Мужской) в Баскетбол 5x5
-- ...    | ...                               | ...
```

**Массовая генерация для всех шаблонов:**

```sql
SELECT * FROM generate_all_indicators();

-- Результат:
-- template_id | total_generated | total_updated | total_skipped
-- ------------|-----------------|---------------|---------------
-- 1           | 8               | 0             | 0
-- 2           | 3               | 0             | 0
```

**Обновить существующие показатели:**

```sql
-- С перезаписью (если показатели уже существуют)
SELECT * FROM generate_indicators_from_template(1, true);
```

## Naming Conventions

- **Таблицы**: snake_case, множественное число (`indicator_groups`, `regions`)
- **Поля**: snake_case (`name_ru`, `is_active`)
- **Foreign Keys**: `table_id` (`country_id`, `region_id`)
- **Индексы**: `idx_table_column` (`idx_regions_country`)
- **Коды**: UPPER_CASE (`RU_CFO`, `REGIONAL_FEDERATION`)

## Технические детали

- **СУБД**: PostgreSQL 12+
- **Кодировка**: UTF-8
- **Язык данных**: Русский (с поддержкой переводов)
- **Версионирование**: Поддержка исторических данных
- **Аудит**: Опциональный через triggers

## Следующие шаги

1. **Заполнение данных**: Импорт регионов, организаций, показателей
2. **Миграция из Excel**: Скрипты для переноса данных
3. **API**: REST API для доступа к данным
4. **UI**: Админ-панель и формы ввода данных
5. **BI**: Подключение PowerBI/Tableau

## Контакты

Документация: `/docs`
ERD: `/docs/ERD.md`
Бизнес-требования: `/docs/BI.md`
