-- ================================
-- Блок 11: Справочные таблицы для нормализации
-- ================================
-- Вынос категорий, типов событий, уровней и других справочников

-- ================================
-- 1. КАТЕГОРИИ ИНДИКАТОРОВ
-- ================================

CREATE TABLE indicator_categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ic_code ON indicator_categories(code);
CREATE INDEX idx_ic_active ON indicator_categories(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE indicator_categories IS 'Справочник категорий индикаторов';

-- Базовые категории
INSERT INTO indicator_categories (code, name_ru, name_en, description, sort_order) VALUES
('federation', 'Федерация', 'Federation', 'Показатели деятельности федерации', 10),
('marketing', 'Маркетинг', 'Marketing', 'Маркетинговые и медиа-активности', 20),
('infrastructure', 'Инфраструктура', 'Infrastructure', 'Спортивные объекты и сооружения', 30),
('achievements', 'Достижения', 'Achievements', 'Спортивные результаты и достижения', 40),
('personnel', 'Кадры', 'Personnel', 'Судьи, тренеры, специалисты', 50),
('finance', 'Финансы', 'Finance', 'Финансовые показатели', 60),
('development', 'Развитие', 'Development', 'Программы развития и подготовки', 70),
('other', 'Прочее', 'Other', 'Прочие показатели', 999);

-- ================================
-- 2. ЕДИНИЦЫ ИЗМЕРЕНИЯ
-- ================================

CREATE TABLE measurement_units (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    short_name_ru VARCHAR(20),
    short_name_en VARCHAR(20),
    unit_type VARCHAR(20) NOT NULL,  -- 'count', 'boolean', 'currency', 'percent', 'other'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_mu_unit_type CHECK (unit_type IN ('count', 'boolean', 'currency', 'percent', 'time', 'other'))
);

CREATE INDEX idx_mu_code ON measurement_units(code);
CREATE INDEX idx_mu_type ON measurement_units(unit_type);

COMMENT ON TABLE measurement_units IS 'Справочник единиц измерения';

-- Базовые единицы измерения
INSERT INTO measurement_units (code, name_ru, name_en, short_name_ru, short_name_en, unit_type) VALUES
-- Счетные
('people', 'человек', 'people', 'чел.', 'ppl', 'count'),
('teams', 'команд', 'teams', 'ком.', 'teams', 'count'),
('organizations', 'организаций', 'organizations', 'орг.', 'org', 'count'),
('facilities', 'объектов', 'facilities', 'объ.', 'fac', 'count'),
('courts', 'площадок', 'courts', 'пл.', 'courts', 'count'),
('stadiums', 'стадионов', 'stadiums', 'стад.', 'stad', 'count'),
('arenas', 'манежей', 'arenas', 'ман.', 'aren', 'count'),
('medals', 'медалей', 'medals', 'мед.', 'med', 'count'),
('events', 'мероприятий', 'events', 'мер.', 'evt', 'count'),
('branches', 'отделений', 'branches', 'отд.', 'br', 'count'),
('referees', 'судей', 'referees', 'суд.', 'ref', 'count'),
('coaches', 'тренеров', 'coaches', 'трен.', 'coach', 'count'),
('athletes', 'спортсменов', 'athletes', 'спорт.', 'ath', 'count'),
('followers', 'подписчиков', 'followers', 'подп.', 'fol', 'count'),
('records', 'рекордов', 'records', 'рек.', 'rec', 'count'),

-- Булевы
('yes_no', 'да/нет', 'yes/no', 'да/нет', 'y/n', 'boolean'),

-- Валюта
('rubles', 'рублей', 'rubles', 'руб.', 'RUB', 'currency'),
('thousands_rubles', 'тыс. рублей', 'thousand rubles', 'тыс. руб.', 'K RUB', 'currency'),
('millions_rubles', 'млн. рублей', 'million rubles', 'млн. руб.', 'M RUB', 'currency'),

-- Проценты
('percent', 'процентов', 'percent', '%', '%', 'percent'),

-- Время
('hours', 'часов', 'hours', 'ч.', 'h', 'time'),
('days', 'дней', 'days', 'дн.', 'd', 'time'),

-- Прочее
('points', 'баллов', 'points', 'балл.', 'pts', 'other'),
('places', 'мест', 'places', 'м.', 'pl', 'other');

-- ================================
-- 3. ТИПЫ СОБЫТИЙ
-- ================================

CREATE TABLE event_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_et_code ON event_types(code);

COMMENT ON TABLE event_types IS 'Справочник типов спортивных событий';

-- Базовые типы событий
INSERT INTO event_types (code, name_ru, name_en, description, sort_order) VALUES
('championship', 'Чемпионат', 'Championship', 'Первенство или чемпионат', 10),
('cup', 'Кубок', 'Cup', 'Кубковые соревнования', 20),
('league', 'Лига', 'League', 'Лиговые соревнования', 30),
('tournament', 'Турнир', 'Tournament', 'Турнирные соревнования', 40),
('qualifier', 'Отборочные', 'Qualifier', 'Отборочные соревнования', 50),
('series', 'Серия', 'Series', 'Серия соревнований', 60),
('festival', 'Фестиваль', 'Festival', 'Спортивный фестиваль', 70),
('super_cup', 'Суперкубок', 'Super Cup', 'Суперкубок', 80),
('friendly', 'Товарищеский', 'Friendly', 'Товарищеские матчи', 90),
('exhibition', 'Показательный', 'Exhibition', 'Показательные выступления', 100);

-- ================================
-- 4. УРОВНИ СОБЫТИЙ
-- ================================

CREATE TABLE event_levels (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_el_code ON event_levels(code);

COMMENT ON TABLE event_levels IS 'Справочник уровней спортивных событий';

-- Базовые уровни событий
INSERT INTO event_levels (code, name_ru, name_en, description, sort_order) VALUES
('international', 'Международный', 'International', 'Международные соревнования', 10),
('continental', 'Континентальный', 'Continental', 'Континентальные соревнования (Европа, Азия и т.д.)', 20),
('national', 'Национальный', 'National', 'Всероссийские соревнования', 30),
('federal_district', 'Федеральный округ', 'Federal District', 'Соревнования федерального округа', 40),
('interregional', 'Межрегиональный', 'Interregional', 'Межрегиональные соревнования', 50),
('regional', 'Региональный', 'Regional', 'Региональные соревнования', 60),
('municipal', 'Муниципальный', 'Municipal', 'Муниципальные соревнования', 70),
('local', 'Местный', 'Local', 'Местные соревнования', 80);

-- ================================
-- 5. ЭТАПЫ СОБЫТИЙ
-- ================================

CREATE TABLE event_stages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_es_code ON event_stages(code);

COMMENT ON TABLE event_stages IS 'Справочник этапов спортивных событий';

-- Базовые этапы событий
INSERT INTO event_stages (code, name_ru, name_en, description, sort_order) VALUES
('qualification', 'Квалификация', 'Qualification', 'Квалификационный этап', 10),
('preliminary', 'Предварительный этап', 'Preliminary', 'Предварительный этап', 20),
('group_stage', 'Групповой этап', 'Group Stage', 'Групповой этап', 30),
('round_16', '1/8 финала', 'Round of 16', '1/8 финала', 40),
('quarterfinal', 'Четвертьфинал', 'Quarterfinal', 'Четвертьфинал', 50),
('semifinal', 'Полуфинал', 'Semifinal', 'Полуфинал', 60),
('third_place', 'Матч за 3 место', 'Third Place', 'Матч за третье место', 70),
('final', 'Финал', 'Final', 'Финальный этап', 80),
('playoff', 'Плей-офф', 'Playoff', 'Плей-офф', 90),
('regular_season', 'Регулярный сезон', 'Regular Season', 'Регулярный чемпионат', 100),
('interregional', 'Межрегиональный этап', 'Interregional Stage', 'Межрегиональный этап', 110);

-- ================================
-- 6. ИСТОЧНИКИ ДАННЫХ
-- ================================

CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    description TEXT,
    is_automated BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ds_code ON data_sources(code);

COMMENT ON TABLE data_sources IS 'Справочник источников данных для индикаторов';

-- Базовые источники данных
INSERT INTO data_sources (code, name_ru, name_en, description, is_automated) VALUES
('manual', 'Ручной ввод', 'Manual Entry', 'Данные введены вручную', FALSE),
('registry', 'Реестр объектов', 'Registry', 'Данные из реестра спортивных объектов', TRUE),
('event', 'Результаты событий', 'Event Results', 'Данные из результатов спортивных событий', TRUE),
('calculated', 'Расчетные', 'Calculated', 'Данные рассчитаны автоматически', TRUE),
('import', 'Импорт', 'Import', 'Данные импортированы из внешней системы', TRUE),
('api', 'API', 'API', 'Данные получены через API', TRUE),
('federation', 'Данные федерации', 'Federation Data', 'Данные предоставлены федерацией', FALSE),
('ministry', 'Минспорт', 'Ministry of Sport', 'Данные из Министерства спорта', TRUE);

-- ================================
-- 7. ОБНОВЛЕНИЕ ТАБЛИЦЫ indicator_catalog
-- ================================

-- Добавляем внешние ключи вместо VARCHAR полей
ALTER TABLE indicator_catalog 
    DROP CONSTRAINT IF EXISTS chk_ic_category,
    ADD COLUMN category_id INTEGER REFERENCES indicator_categories(id),
    ADD COLUMN measurement_unit_id INTEGER REFERENCES measurement_units(id);

-- Создаем индексы
CREATE INDEX idx_ic_category_id ON indicator_catalog(category_id);
CREATE INDEX idx_ic_measurement_unit_id ON indicator_catalog(measurement_unit_id);

-- Миграция данных из старого поля category в category_id
UPDATE indicator_catalog ic
SET category_id = icat.id
FROM indicator_categories icat
WHERE ic.category = icat.code;

-- Миграция данных из старого поля measurement_unit в measurement_unit_id
UPDATE indicator_catalog ic
SET measurement_unit_id = mu.id
FROM measurement_units mu
WHERE ic.measurement_unit = mu.code;

-- Теперь можно удалить старые поля (опционально)
-- ALTER TABLE indicator_catalog DROP COLUMN category;
-- ALTER TABLE indicator_catalog DROP COLUMN measurement_unit;

COMMENT ON COLUMN indicator_catalog.category_id IS 'Категория индикатора (ссылка на справочник)';
COMMENT ON COLUMN indicator_catalog.measurement_unit_id IS 'Единица измерения (ссылка на справочник)';

-- ================================
-- 8. ОБНОВЛЕНИЕ ТАБЛИЦЫ events_catalog
-- ================================

-- Добавляем внешние ключи вместо VARCHAR полей
ALTER TABLE events_catalog 
    DROP CONSTRAINT IF EXISTS chk_ec_event_type,
    DROP CONSTRAINT IF EXISTS chk_ec_level,
    DROP CONSTRAINT IF EXISTS chk_ec_stage,
    ADD COLUMN event_type_id INTEGER REFERENCES event_types(id),
    ADD COLUMN level_id INTEGER REFERENCES event_levels(id),
    ADD COLUMN stage_id INTEGER REFERENCES event_stages(id);

-- Создаем индексы
CREATE INDEX idx_ec_event_type_id ON events_catalog(event_type_id);
CREATE INDEX idx_ec_level_id ON events_catalog(level_id);
CREATE INDEX idx_ec_stage_id ON events_catalog(stage_id);

-- Миграция данных
UPDATE events_catalog ec
SET event_type_id = et.id
FROM event_types et
WHERE ec.event_type = et.code;

UPDATE events_catalog ec
SET level_id = el.id
FROM event_levels el
WHERE ec.level = el.code;

UPDATE events_catalog ec
SET stage_id = es.id
FROM event_stages es
WHERE ec.stage = es.code;

-- Теперь можно удалить старые поля (опционально)
-- ALTER TABLE events_catalog DROP COLUMN event_type;
-- ALTER TABLE events_catalog DROP COLUMN level;
-- ALTER TABLE events_catalog DROP COLUMN stage;

COMMENT ON COLUMN events_catalog.event_type_id IS 'Тип события (ссылка на справочник)';
COMMENT ON COLUMN events_catalog.level_id IS 'Уровень события (ссылка на справочник)';
COMMENT ON COLUMN events_catalog.stage_id IS 'Этап события (ссылка на справочник)';

-- ================================
-- 9. ОБНОВЛЕНИЕ ТАБЛИЦЫ organization_indicator_values
-- ================================

-- Добавляем внешний ключ для источника данных
ALTER TABLE organization_indicator_values 
    ADD COLUMN data_source_id INTEGER REFERENCES data_sources(id);

CREATE INDEX idx_oiv_data_source_id ON organization_indicator_values(data_source_id);

-- Миграция данных
UPDATE organization_indicator_values oiv
SET data_source_id = ds.id
FROM data_sources ds
WHERE oiv.source = ds.code;

-- Теперь можно удалить старое поле (опционально)
-- ALTER TABLE organization_indicator_values DROP COLUMN source;

COMMENT ON COLUMN organization_indicator_values.data_source_id IS 'Источник данных (ссылка на справочник)';

-- ================================
-- 10. ПРЕДСТАВЛЕНИЯ ДЛЯ УДОБНОГО ДОСТУПА
-- ================================

-- Индикаторы с развернутыми справочниками
CREATE OR REPLACE VIEW v_indicator_catalog_full AS
SELECT 
    ic.id,
    ic.code,
    ic.name_ru,
    ic.description,
    ic.value_type,
    ic.default_weight,
    ic.use_population,
    
    -- Категория
    icat.code as category_code,
    icat.name_ru as category_name,
    
    -- Единица измерения
    mu.code as measurement_unit_code,
    mu.name_ru as measurement_unit_name,
    mu.short_name_ru as measurement_unit_short,
    
    -- Спорт
    s.name_ru as sport_name,
    d.name_ru as discipline_name,
    
    ic.is_active
FROM indicator_catalog ic
LEFT JOIN indicator_categories icat ON icat.id = ic.category_id
LEFT JOIN measurement_units mu ON mu.id = ic.measurement_unit_id
LEFT JOIN sports s ON s.id = ic.sport_id
LEFT JOIN disciplines d ON d.id = ic.discipline_id;

COMMENT ON VIEW v_indicator_catalog_full IS 'Индикаторы с развернутыми справочниками';

-- События с развернутыми справочниками
CREATE OR REPLACE VIEW v_events_catalog_full AS
SELECT 
    ec.id,
    ec.code,
    ec.name_ru,
    ec.short_name_ru,
    
    -- Тип события
    et.code as event_type_code,
    et.name_ru as event_type_name,
    
    -- Уровень
    el.code as level_code,
    el.name_ru as level_name,
    
    -- Этап
    es.code as stage_code,
    es.name_ru as stage_name,
    
    -- Спорт
    s.name_ru as sport_name,
    d.name_ru as discipline_name,
    g.name_ru as gender_name,
    ag.name_ru as age_group_name,
    
    -- Организатор
    o.name_ru as organizer_name,
    
    -- Родительское событие
    parent.name_ru as parent_event_name,
    
    ec.is_active
FROM events_catalog ec
LEFT JOIN event_types et ON et.id = ec.event_type_id
LEFT JOIN event_levels el ON el.id = ec.level_id
LEFT JOIN event_stages es ON es.id = ec.stage_id
LEFT JOIN sports s ON s.id = ec.sport_id
LEFT JOIN disciplines d ON d.id = ec.discipline_id
LEFT JOIN genders g ON g.id = ec.gender_id
LEFT JOIN age_groups ag ON ag.id = ec.age_group_id
LEFT JOIN organizations o ON o.id = ec.organizer_id
LEFT JOIN events_catalog parent ON parent.id = ec.parent_event_id;

COMMENT ON VIEW v_events_catalog_full IS 'События с развернутыми справочниками';

-- Значения индикаторов с развернутыми справочниками
CREATE OR REPLACE VIEW v_indicator_values_full AS
SELECT 
    oiv.id,
    
    -- Организация
    o.name_ru as organization_name,
    
    -- Индикатор
    ic.code as indicator_code,
    ic.name_ru as indicator_name,
    icat.name_ru as category_name,
    
    -- Значение
    CASE 
        WHEN ic.value_type = 'boolean' THEN CASE WHEN oiv.value_boolean THEN 'Да' ELSE 'Нет' END
        WHEN ic.value_type = 'number' THEN oiv.value_number::TEXT
        WHEN ic.value_type = 'decimal' THEN oiv.value_number::TEXT
        WHEN ic.value_type = 'text' THEN oiv.value_text
    END as value_display,
    
    oiv.value_number,
    oiv.value_boolean,
    oiv.value_text,
    
    -- Единица измерения
    mu.short_name_ru as unit,
    
    -- Сезон
    s.code as season_code,
    s.name_ru as season_name,
    
    -- Источник
    ds.name_ru as data_source_name,
    ds.is_automated,
    
    oiv.notes,
    oiv.created_at,
    oiv.updated_at
FROM organization_indicator_values oiv
JOIN organizations o ON o.id = oiv.organization_id
JOIN indicator_catalog ic ON ic.id = oiv.indicator_catalog_id
LEFT JOIN indicator_categories icat ON icat.id = ic.category_id
LEFT JOIN measurement_units mu ON mu.id = ic.measurement_unit_id
JOIN seasons s ON s.id = oiv.season_id
LEFT JOIN data_sources ds ON ds.id = oiv.data_source_id;

COMMENT ON VIEW v_indicator_values_full IS 'Значения индикаторов с развернутыми справочниками';

-- ================================
-- 11. ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
-- ================================

-- Пример 1: Создание индикатора с использованием справочников
/*
INSERT INTO indicator_catalog (
    category_id, 
    code, 
    name_ru, 
    value_type, 
    default_weight, 
    measurement_unit_id,
    sport_id
) VALUES (
    (SELECT id FROM indicator_categories WHERE code = 'infrastructure'),
    'BBL_COURTS_INDOOR',
    'Крытые баскетбольные площадки',
    'number',
    0.10,
    (SELECT id FROM measurement_units WHERE code = 'courts'),
    10  -- Баскетбол
);
*/

-- Пример 2: Создание события с использованием справочников
/*
INSERT INTO events_catalog (
    code,
    name_ru,
    short_name_ru,
    event_type_id,
    level_id,
    sport_id
) VALUES (
    'BBL_SUPERLEAGUE_2025',
    'Чемпионат России. Суперлига 2025',
    'Суперлига 2025',
    (SELECT id FROM event_types WHERE code = 'league'),
    (SELECT id FROM event_levels WHERE code = 'national'),
    10
);
*/

-- Пример 3: Запрос индикаторов по категории
/*
SELECT 
    code,
    name_ru,
    category_name,
    measurement_unit_name,
    default_weight
FROM v_indicator_catalog_full
WHERE category_code = 'marketing'
ORDER BY code;
*/

-- Пример 4: Запрос событий по уровню
/*
SELECT 
    code,
    name_ru,
    event_type_name,
    level_name,
    stage_name,
    sport_name
FROM v_events_catalog_full
WHERE level_code = 'national'
  AND sport_name = 'Баскетбол'
ORDER BY name_ru;
*/

-- Пример 5: Добавление новой категории
/*
INSERT INTO indicator_categories (code, name_ru, name_en, description, sort_order)
VALUES ('education', 'Образование', 'Education', 'Образовательные программы', 75);
*/

-- Пример 6: Добавление новой единицы измерения
/*
INSERT INTO measurement_units (code, name_ru, name_en, short_name_ru, short_name_en, unit_type)
VALUES ('licenses', 'лицензий', 'licenses', 'лиц.', 'lic', 'count');
*/

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_categories IS 'Справочник категорий индикаторов (федерация, маркетинг, инфраструктура и т.д.)';
COMMENT ON TABLE measurement_units IS 'Справочник единиц измерения (человек, команд, площадок и т.д.)';
COMMENT ON TABLE event_types IS 'Справочник типов событий (чемпионат, кубок, лига и т.д.)';
COMMENT ON TABLE event_levels IS 'Справочник уровней событий (международный, национальный, региональный и т.д.)';
COMMENT ON TABLE event_stages IS 'Справочник этапов событий (квалификация, полуфинал, финал и т.д.)';
COMMENT ON TABLE data_sources IS 'Справочник источников данных (ручной ввод, реестр, API и т.д.)';
