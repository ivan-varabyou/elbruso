# Улучшенная система индикаторов - Детальное предложение

## Выявленные недостатки текущей системы

### 1. **Дублирование данных**
- Маркетинговые критерии (сайт, соцсети) повторяются для каждого вида спорта
- Одинаковые турниры создаются как отдельные индикаторы
- Нет переиспользования между видами спорта

### 2. **Отсутствие гибкости**
- Организация не может выбрать только нужные критерии
- Нельзя отключить ненужные критерии без удаления
- Сложно добавить новый вид спорта

### 3. **Смешение сущностей**
- События (турниры) и критерии оценки в одной таблице
- Результаты и критерии не разделены
- Сложно анализировать межспортивные данные

### 4. **Проблемы масштабирования**
- Каждый новый вид спорта требует дублирования всех универсальных критериев
- Изменение веса требует обновления во всех местах
- Нет истории изменений весов

### 5. **Отсутствие иерархии событий**
- Нет связи между этапами турнира (отбор → полуфинал → финал)
- Сложно отследить путь команды в турнире
- Нет группировки событий по уровням

## Предлагаемая архитектура

### Новая структура таблиц

```sql
-- ================================
-- 1. СПРАВОЧНИК КРИТЕРИЕВ (Catalog)
-- ================================

CREATE TABLE indicator_catalog (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,  -- 'federation', 'marketing', 'infrastructure', 'achievements', 'personnel'
    code VARCHAR(100) NOT NULL UNIQUE,
    name_ru TEXT NOT NULL,
    description TEXT,
    value_type VARCHAR(20) NOT NULL DEFAULT 'number',
    default_weight NUMERIC(10,4) DEFAULT 0,
    use_population BOOLEAN DEFAULT FALSE,
    
    -- Привязка к спорту (NULL = универсальный)
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
    
    -- Метаданные
    measurement_unit VARCHAR(50),  -- 'команд', 'человек', 'площадок'
    source_hint TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_value_type CHECK (value_type IN ('number', 'boolean', 'decimal', 'text'))
);

-- Индексы
CREATE INDEX idx_indicator_catalog_category ON indicator_catalog(category);
CREATE INDEX idx_indicator_catalog_sport ON indicator_catalog(sport_id);
CREATE INDEX idx_indicator_catalog_active ON indicator_catalog(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE indicator_catalog IS 'Справочник всех возможных критериев оценки (универсальный каталог)';
COMMENT ON COLUMN indicator_catalog.sport_id IS 'NULL = применимо ко всем видам спорта';

-- ================================
-- 2. ГРУППЫ КРИТЕРИЕВ В КАТАЛОГЕ
-- ================================

CREATE TABLE indicator_groups_catalog (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES indicator_groups_catalog(id) ON DELETE SET NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(200) NOT NULL,
    description TEXT,
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE indicator_catalog_groups (
    indicator_catalog_id INTEGER REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    group_catalog_id INTEGER REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (indicator_catalog_id, group_catalog_id)
);

-- ================================
-- 3. АКТИВНЫЕ КРИТЕРИИ ОРГАНИЗАЦИИ
-- ================================

CREATE TABLE organization_indicators (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    
    -- Кастомизация
    custom_weight NUMERIC(10,4),  -- NULL = использовать default_weight из каталога
    custom_name_ru TEXT,           -- NULL = использовать name_ru из каталога
    is_enabled BOOLEAN DEFAULT TRUE,
    
    -- Метаданные организации
    notes TEXT,
    custom_metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, indicator_catalog_id)
);

CREATE INDEX idx_org_indicators_org ON organization_indicators(organization_id);
CREATE INDEX idx_org_indicators_enabled ON organization_indicators(is_enabled) WHERE is_enabled = TRUE;

COMMENT ON TABLE organization_indicators IS 'Критерии, активированные конкретной организацией с возможностью переопределения';

-- ================================
-- 4. СПРАВОЧНИК СОБЫТИЙ/ТУРНИРОВ
-- ================================

CREATE TABLE events_catalog (
    id SERIAL PRIMARY KEY,
    parent_event_id INTEGER REFERENCES events_catalog(id) ON DELETE SET NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    name_ru TEXT NOT NULL,
    short_name_ru VARCHAR(100),
    
    -- Тип и уровень
    event_type VARCHAR(50) NOT NULL,  -- 'championship', 'cup', 'league', 'tournament', 'qualifier'
    level VARCHAR(50) NOT NULL,       -- 'international', 'national', 'federal_district', 'regional', 'local'
    stage VARCHAR(50),                -- 'qualification', 'group_stage', 'playoff', 'semifinal', 'final'
    
    -- Привязка к спорту
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
    gender_id INTEGER REFERENCES genders(id) ON DELETE SET NULL,
    age_group_id INTEGER REFERENCES age_groups(id) ON DELETE SET NULL,
    
    -- Организатор
    organizer_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
    
    -- Метаданные
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_event_type CHECK (event_type IN ('championship', 'cup', 'league', 'tournament', 'qualifier', 'series')),
    CONSTRAINT chk_level CHECK (level IN ('international', 'national', 'federal_district', 'regional', 'local'))
);

CREATE INDEX idx_events_catalog_sport ON events_catalog(sport_id);
CREATE INDEX idx_events_catalog_parent ON events_catalog(parent_event_id);
CREATE INDEX idx_events_catalog_type ON events_catalog(event_type);

COMMENT ON TABLE events_catalog IS 'Справочник всех спортивных событий, турниров и соревнований';
COMMENT ON COLUMN events_catalog.parent_event_id IS 'Связь с родительским событием (например, Финал ЧР -> ЧР)';

-- ================================
-- 5. РЕЗУЛЬТАТЫ В СОБЫТИЯХ
-- ================================

CREATE TABLE event_results (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events_catalog(id) ON DELETE CASCADE,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    season_id INTEGER REFERENCES seasons(id) ON DELETE SET NULL,
    
    -- Результаты
    place INTEGER,
    points NUMERIC(10,2),
    team_count INTEGER,
    participants_count INTEGER,
    
    -- Метаданные
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(event_id, organization_id, season_id)
);

CREATE INDEX idx_event_results_event ON event_results(event_id);
CREATE INDEX idx_event_results_org ON event_results(organization_id);
CREATE INDEX idx_event_results_season ON event_results(season_id);

COMMENT ON TABLE event_results IS 'Результаты организаций в спортивных событиях';

-- ================================
-- 6. СВЯЗЬ СОБЫТИЙ С КРИТЕРИЯМИ
-- ================================

CREATE TABLE event_indicator_mapping (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events_catalog(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    
    -- Условия начисления
    place_from INTEGER,  -- Начисляется за места с
    place_to INTEGER,    -- Начисляется за места по
    
    -- Коэффициент
    weight_multiplier NUMERIC(10,4) DEFAULT 1.0,
    
    UNIQUE(event_id, indicator_catalog_id)
);

COMMENT ON TABLE event_indicator_mapping IS 'Связь событий с критериями оценки (какие события дают какие баллы)';
```

## Примеры использования

### Пример 1: Универсальные маркетинговые критерии

```sql
-- ================================
-- СОЗДАНИЕ УНИВЕРСАЛЬНЫХ КРИТЕРИЕВ
-- ================================

-- 1. Критерий "Наличие сайта" (для всех видов спорта)
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight, 
    sport_id, measurement_unit
) VALUES (
    'marketing',
    'MARKETING_WEBSITE',
    'Наличие активного официального сайта',
    'boolean',
    0.04,
    NULL,  -- NULL = для всех видов спорта
    'да/нет'
);

-- 2. Критерий "Активное сообщество ВКонтакте"
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, measurement_unit
) VALUES (
    'marketing',
    'MARKETING_VK_ACTIVE',
    'Активное сообщество ВКонтакте',
    'boolean',
    0.05,
    NULL,
    'да/нет'
);

-- 3. Критерий "Количество подписчиков в соцсетях"
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, use_population, measurement_unit
) VALUES (
    'marketing',
    'MARKETING_SOCIAL_FOLLOWERS',
    'Количество подписчиков в соцсетях',
    'number',
    0.03,
    NULL,
    TRUE,  -- Нормализация на население
    'человек'
);

-- ================================
-- РФБ АКТИВИРУЕТ ЭТИ КРИТЕРИИ
-- ================================

-- РФБ использует все маркетинговые критерии с базовыми весами
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 
    1,  -- РФБ (id=1)
    id,
    true
FROM indicator_catalog
WHERE category = 'marketing' AND sport_id IS NULL;

-- ================================
-- ВЛФА АКТИВИРУЕТ С ДРУГИМИ ВЕСАМИ
-- ================================

-- Всероссийская легкоатлетическая федерация (ВЛФА) использует те же критерии,
-- но с другими весами
INSERT INTO organization_indicators (
    organization_id, indicator_catalog_id, is_enabled, custom_weight, notes
)
SELECT 
    2,  -- ВЛФА (id=2)
    id,
    true,
    default_weight * 1.5,  -- ВЛФА дает больший вес маркетингу
    'Увеличенный вес для маркетинга'
FROM indicator_catalog
WHERE category = 'marketing' AND sport_id IS NULL;
```

### Пример 2: Специфичные критерии для баскетбола

```sql
-- ================================
-- БАСКЕТБОЛЬНЫЕ КРИТЕРИИ
-- ================================

-- 1. Площадки 3х3 (только для баскетбола)
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, discipline_id, use_population, measurement_unit
) VALUES (
    'infrastructure',
    'BBL_COURTS_3X3',
    'Количество площадок 3х3',
    'number',
    0.1,
    10,   -- Баскетбол
    219,  -- Дисциплина 3х3
    TRUE,
    'площадок'
);

-- 2. Крытые площадки с 5000+ мест
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, use_population, measurement_unit
) VALUES (
    'infrastructure',
    'BBL_INDOOR_5000_SEATS',
    'Крытые площадки с 5 000+ посадочных мест',
    'number',
    0.25,
    10,   -- Баскетбол
    TRUE,
    'площадок'
);

-- 3. Воспитанники в профессиональных клубах
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, use_population, measurement_unit
) VALUES (
    'achievements',
    'BBL_LOCAL_PLAYERS_PRO',
    'Воспитанники региона в местных профессиональных клубах',
    'number',
    0.5,
    10,   -- Баскетбол
    TRUE,
    'человек'
);

-- РФБ активирует эти критерии
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true
FROM indicator_catalog
WHERE sport_id = 10;
```

### Пример 3: Специфичные критерии для легкой атлетики

```sql
-- ================================
-- КРИТЕРИИ ЛЕГКОЙ АТЛЕТИКИ
-- ================================

-- 1. Легкоатлетические манежи
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, use_population, measurement_unit
) VALUES (
    'infrastructure',
    'ATH_INDOOR_ARENAS',
    'Легкоатлетические манежи',
    'number',
    0.3,
    3,    -- Легкая атлетика (предположим id=3)
    TRUE,
    'манежей'
);

-- 2. Стадионы с беговыми дорожками
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, use_population, measurement_unit
) VALUES (
    'infrastructure',
    'ATH_STADIUMS_TRACK',
    'Стадионы с легкоатлетическими дорожками',
    'number',
    0.2,
    3,
    TRUE,
    'стадионов'
);

-- 3. Спортсмены в сборной России
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, use_population, measurement_unit
) VALUES (
    'achievements',
    'ATH_NATIONAL_TEAM_ATHLETES',
    'Спортсмены региона в сборной России',
    'number',
    1.0,
    3,
    TRUE,
    'человек'
);

-- ВЛФА активирует эти критерии
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 2, id, true
FROM indicator_catalog
WHERE sport_id = 3;
```

### Пример 4: События и турниры (Баскетбол)

```sql
-- ================================
-- ИЕРАРХИЯ СОБЫТИЙ БАСКЕТБОЛА
-- ================================

-- 1. Суперлига (родительское событие)
INSERT INTO events_catalog (
    code, name_ru, short_name_ru, event_type, level,
    sport_id, discipline_id, gender_id, organizer_id
) VALUES (
    'BBL_SUPERLEAGUE_M_5X5',
    'Чемпионат России. Суперлига (мужчины)',
    'Суперлига М',
    'league',
    'national',
    10,   -- Баскетбол
    220,  -- 5х5
    1,    -- Мужчины
    1     -- РФБ
) RETURNING id;  -- Допустим, вернул id=100

-- 2. Регулярный сезон Суперлиги (дочернее событие)
INSERT INTO events_catalog (
    parent_event_id, code, name_ru, short_name_ru, 
    event_type, level, stage, sport_id, discipline_id, gender_id
) VALUES (
    100,  -- Родитель: Суперлига
    'BBL_SUPERLEAGUE_M_5X5_REGULAR',
    'Суперлига. Регулярный сезон (мужчины)',
    'Суперлига М (регулярка)',
    'league',
    'national',
    'group_stage',
    10, 220, 1
);

-- 3. Плей-офф Суперлиги
INSERT INTO events_catalog (
    parent_event_id, code, name_ru, short_name_ru,
    event_type, level, stage, sport_id, discipline_id, gender_id
) VALUES (
    100,
    'BBL_SUPERLEAGUE_M_5X5_PLAYOFF',
    'Суперлига. Плей-офф (мужчины)',
    'Суперлига М (плей-офф)',
    'league',
    'national',
    'playoff',
    10, 220, 1
);

-- 4. Первенство России U18
INSERT INTO events_catalog (
    code, name_ru, short_name_ru, event_type, level,
    sport_id, discipline_id, gender_id, age_group_id, organizer_id
) VALUES (
    'BBL_CHAMPIONSHIP_U18_M_5X5',
    'Первенство России U18 (юноши)',
    'ПР U18 М',
    'championship',
    'national',
    10, 220, 1, 4,  -- age_group_id=4 (U18)
    1
) RETURNING id;  -- Допустим, id=101

-- 5. Межрегиональный этап ПР U18
INSERT INTO events_catalog (
    parent_event_id, code, name_ru, short_name_ru,
    event_type, level, stage, sport_id, discipline_id, gender_id, age_group_id
) VALUES (
    101,
    'BBL_CHAMPIONSHIP_U18_M_5X5_INTERREGIONAL',
    'ПР U18. Межрегиональный этап (юноши)',
    'ПР U18 М (межрегион)',
    'championship',
    'national',
    'qualification',
    10, 220, 1, 4
);

-- 6. Финал ПР U18
INSERT INTO events_catalog (
    parent_event_id, code, name_ru, short_name_ru,
    event_type, level, stage, sport_id, discipline_id, gender_id, age_group_id
) VALUES (
    101,
    'BBL_CHAMPIONSHIP_U18_M_5X5_FINAL',
    'ПР U18. Финал (юноши)',
    'ПР U18 М (финал)',
    'championship',
    'national',
    'final',
    10, 220, 1, 4
);

-- ================================
-- КРИТЕРИИ ДЛЯ СОБЫТИЙ
-- ================================

-- Создаем критерий "Участие в Суперлиге"
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, measurement_unit
) VALUES (
    'achievements',
    'BBL_SUPERLEAGUE_PARTICIPATION',
    'Команда участвует в Суперлиге',
    'number',
    0.6,
    10,
    'команд'
) RETURNING id;  -- Допустим, id=200

-- Связываем событие с критерием
INSERT INTO event_indicator_mapping (
    event_id, indicator_catalog_id, weight_multiplier
) VALUES (
    100,  -- Суперлига
    200,  -- Критерий участия
    1.0
);

-- Создаем критерий "Призовое место в Суперлиге"
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, measurement_unit
) VALUES (
    'achievements',
    'BBL_SUPERLEAGUE_PRIZE',
    'Призовое место в Суперлиге',
    'number',
    1.0,
    10,
    'мест'
) RETURNING id;  -- Допустим, id=201

-- Призовые места (1-3) дают баллы
INSERT INTO event_indicator_mapping (
    event_id, indicator_catalog_id, place_from, place_to, weight_multiplier
) VALUES (
    100,  -- Суперлига
    201,  -- Критерий призовых мест
    1, 3, -- Места с 1 по 3
    1.0
);

-- ================================
-- ФИКСИРУЕМ РЕЗУЛЬТАТЫ
-- ================================

-- Московская область заняла 3 место в Суперлиге 2024
INSERT INTO event_results (
    event_id, organization_id, season_id, place
) VALUES (
    100,  -- Суперлига
    50,   -- Московская область
    3,    -- Сезон 2024
    3     -- 3 место
);

-- Московская область участвовала в ПР U18 (финал)
INSERT INTO event_results (
    event_id, organization_id, season_id, place, team_count
) VALUES (
    (SELECT id FROM events_catalog WHERE code = 'BBL_CHAMPIONSHIP_U18_M_5X5_FINAL'),
    50,
    3,
    1,    -- 1 место
    1     -- 1 команда
);
```

### Пример 5: События легкой атлетики

```sql
-- ================================
-- СОБЫТИЯ ЛЕГКОЙ АТЛЕТИКИ
-- ================================

-- 1. Чемпионат России (взрослые)
INSERT INTO events_catalog (
    code, name_ru, short_name_ru, event_type, level,
    sport_id, age_group_id, organizer_id
) VALUES (
    'ATH_CHAMPIONSHIP_RUSSIA',
    'Чемпионат России по легкой атлетике',
    'ЧР ЛА',
    'championship',
    'national',
    3,    -- Легкая атлетика
    8,    -- Взрослые
    2     -- ВЛФА
) RETURNING id;  -- Допустим, id=150

-- 2. Первенство России U20
INSERT INTO events_catalog (
    code, name_ru, short_name_ru, event_type, level,
    sport_id, age_group_id, organizer_id
) VALUES (
    'ATH_CHAMPIONSHIP_U20',
    'Первенство России U20',
    'ПР U20 ЛА',
    'championship',
    'national',
    3,
    5,    -- U20
    2
);

-- Критерий "Медалисты ЧР"
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight,
    sport_id, use_population, measurement_unit
) VALUES (
    'achievements',
    'ATH_CHAMPIONSHIP_MEDALS',
    'Медали на Чемпионате России',
    'number',
    2.0,
    3,
    TRUE,
    'медалей'
) RETURNING id;  -- id=250

-- Связываем с событием
INSERT INTO event_indicator_mapping (
    event_id, indicator_catalog_id, place_from, place_to, weight_multiplier
) VALUES (
    150,  -- ЧР
    250,  -- Критерий медалей
    1, 3, -- Места 1-3 (медали)
    1.0
);

-- Результат: Москва получила 15 медалей на ЧР 2024
INSERT INTO event_results (
    event_id, organization_id, season_id, points
) VALUES (
    150,  -- ЧР
    40,   -- Москва
    3,    -- 2024
    15    -- 15 медалей (в points)
);
```

### Пример 6: Организация выбирает критерии

```sql
-- ================================
-- РФБ ВЫБИРАЕТ СВОЙ НАБОР КРИТЕРИЕВ
-- ================================

-- 1. Все универсальные маркетинговые
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true
FROM indicator_catalog
WHERE category = 'marketing' AND sport_id IS NULL;

-- 2. Все баскетбольные критерии инфраструктуры
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true
FROM indicator_catalog
WHERE category = 'infrastructure' AND sport_id = 10;

-- 3. Все баскетбольные достижения
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true
FROM indicator_catalog
WHERE category = 'achievements' AND sport_id = 10;

-- 4. РФБ НЕ использует критерии легкой атлетики
-- (просто не добавляем в organization_indicators)

-- 5. РФБ переопределяет вес для "Воспитанники в проф клубах"
UPDATE organization_indicators
SET custom_weight = 0.8,  -- Вместо 0.5
    notes = 'Увеличен вес для стимулирования работы с молодежью'
WHERE organization_id = 1 
  AND indicator_catalog_id = (
      SELECT id FROM indicator_catalog WHERE code = 'BBL_LOCAL_PLAYERS_PRO'
  );

-- ================================
-- ВЛФА ВЫБИРАЕТ СВОЙ НАБОР
-- ================================

-- 1. Универсальные маркетинговые (с увеличенным весом)
INSERT INTO organization_indicators (
    organization_id, indicator_catalog_id, is_enabled, custom_weight
)
SELECT 
    2,  -- ВЛФА
    id, 
    true,
    default_weight * 1.5
FROM indicator_catalog
WHERE category = 'marketing' AND sport_id IS NULL;

-- 2. Все критерии легкой атлетики
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 2, id, true
FROM indicator_catalog
WHERE sport_id = 3;

-- 3. ВЛФА НЕ использует баскетбольные критерии
```

## Преимущества новой системы

### ✅ Устранение дублирования
- Один критерий "Наличие сайта" используется и РФБ, и ВЛФА
- События создаются один раз и переиспользуются

### ✅ Гибкость для организаций
- Каждая организация выбирает нужные критерии
- Можно переопределить веса
- Можно отключить ненужные критерии

### ✅ Разделение сущностей
- События отдельно от критериев
- Результаты отдельно от оценки
- Четкая иерархия турниров

### ✅ Масштабируемость
- Новый вид спорта: создаем специфичные критерии + активируем универсальные
- Изменение веса: меняем в одном месте (каталог или организация)
- История изменений через updated_at

### ✅ Межспортивный анализ
- Можно сравнить маркетинг РФБ и ВЛФА
- Можно увидеть общие критерии
- Можно анализировать результаты разных видов спорта

### ✅ Иерархия событий
- Видна структура турнира (отбор → полуфинал → финал)
- Можно отследить путь команды
- Группировка по уровням и типам

## Запросы для анализа

### Какие критерии использует РФБ?
```sql
SELECT 
    ic.code,
    ic.name_ru,
    COALESCE(oi.custom_weight, ic.default_weight) as weight,
    ic.category,
    CASE WHEN ic.sport_id IS NULL THEN 'Универсальный' ELSE s.name_ru END as sport
FROM organization_indicators oi
JOIN indicator_catalog ic ON ic.id = oi.indicator_catalog_id
LEFT JOIN sports s ON s.id = ic.sport_id
WHERE oi.organization_id = 1 AND oi.is_enabled = true
ORDER BY ic.category, weight DESC;
```

### Какие универсальные критерии используют обе организации?
```sql
SELECT 
    ic.code,
    ic.name_ru,
    ic.category,
    ic.default_weight,
    COALESCE(oi_rfb.custom_weight, ic.default_weight) as rfb_weight,
    COALESCE(oi_vlfa.custom_weight, ic.default_weight) as vlfa_weight
FROM indicator_catalog ic
JOIN organization_indicators oi_rfb ON oi_rfb.indicator_catalog_id = ic.id AND oi_rfb.organization_id = 1
JOIN organization_indicators oi_vlfa ON oi_vlfa.indicator_catalog_id = ic.id AND oi_vlfa.organization_id = 2
WHERE ic.sport_id IS NULL
ORDER BY ic.category;
```

### Результаты Московской области в баскетбольных событиях
```sql
SELECT 
    ec.name_ru as event_name,
    s.name_ru as season,
    er.place,
    er.points,
    er.team_count
FROM event_results er
JOIN events_catalog ec ON ec.id = er.event_id
JOIN seasons s ON s.id = er.season_id
WHERE er.organization_id = 50  -- Московская область
  AND ec.sport_id = 10  -- Баскетбол
ORDER BY s.start_date DESC, ec.name_ru;
```

### Иерархия событий Суперлиги
```sql
WITH RECURSIVE event_tree AS (
    SELECT id, parent_event_id, code, name_ru, stage, 0 as level
    FROM events_catalog
    WHERE code = 'BBL_SUPERLEAGUE_M_5X5'
    
    UNION ALL
    
    SELECT ec.id, ec.parent_event_id, ec.code, ec.name_ru, ec.stage, et.level + 1
    FROM events_catalog ec
    JOIN event_tree et ON ec.parent_event_id = et.id
)
SELECT 
    REPEAT('  ', level) || name_ru as event_hierarchy,
    stage,
    code
FROM event_tree
ORDER BY level, code;
```

## Миграция данных

```sql
-- 1. Перенос уникальных критериев в каталог
INSERT INTO indicator_catalog (category, code, name_ru, value_type, default_weight, sport_id, use_population)
SELECT DISTINCT
    CASE 
        WHEN code LIKE '%MARKETING%' THEN 'marketing'
        WHEN code LIKE '%COURT%' OR code LIKE '%STADIUM%' THEN 'infrastructure'
        WHEN code LIKE '%TEAM%' OR code LIKE '%PLACE%' THEN 'achievements'
        ELSE 'other'
    END as category,
    code,
    name_ru,
    value_type,
    weight as default_weight,
    sport_id,
    use_population
FROM indicators
WHERE organization_id IS NULL;  -- Только системные

-- 2. Активация критериев для организаций
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 
    i.organization_id,
    ic.id,
    true
FROM indicators i
JOIN indicator_catalog ic ON ic.code = i.code
WHERE i.organization_id IS NOT NULL;

-- 3. Перенос событий из indicators
INSERT INTO events_catalog (code, name_ru, event_type, level, sport_id, discipline_id, gender_id)
SELECT DISTINCT
    code,
    name_ru,
    CASE 
        WHEN name_ru LIKE '%Чемпионат%' THEN 'championship'
        WHEN name_ru LIKE '%Кубок%' THEN 'cup'
        WHEN name_ru LIKE '%Лига%' THEN 'league'
        ELSE 'tournament'
    END,
    CASE 
        WHEN name_ru LIKE '%Мировой%' OR name_ru LIKE '%Европ%' THEN 'international'
        WHEN name_ru LIKE '%России%' THEN 'national'
        WHEN name_ru LIKE '%Регион%' THEN 'regional'
        ELSE 'local'
    END,
    sport_id,
    discipline_id,
    gender_id
FROM indicators
WHERE code LIKE '%LEAGUE%' OR code LIKE '%CHAMPIONSHIP%' OR code LIKE '%CUP%';
```

## Следующие шаги

1. ✅ Создать таблицы новой структуры
2. ✅ Наполнить indicator_catalog универсальными критериями
3. ✅ Наполнить indicator_catalog специфичными критериями (баскетбол, легкая атлетика)
4. ✅ Создать events_catalog для основных турниров
5. ✅ Настроить organization_indicators для РФБ и ВЛФА
6. ⏳ Создать представления (views) для удобного доступа
7. ⏳ Написать функции расчета баллов
8. ⏳ Миграция исторических данных
