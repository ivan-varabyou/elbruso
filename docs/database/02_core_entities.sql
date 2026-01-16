-- ================================
-- Блок 2: Основные сущности (Core Entities)
-- ================================
-- Создание основных таблиц для регионов, спорта, организаций и переводов

-- ================================
-- 1. Регионы
-- ================================
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    federal_district_id INTEGER REFERENCES federal_districts(id) ON DELETE SET NULL,
    region_type_id INTEGER REFERENCES region_types(id),
    code VARCHAR(10) NOT NULL,
    name_ru VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(country_id, code)
);

-- Индексы
CREATE INDEX idx_regions_country ON regions(country_id);
CREATE INDEX idx_regions_federal_district ON regions(federal_district_id);
CREATE INDEX idx_regions_code ON regions(code);
CREATE INDEX idx_regions_name_ru ON regions(name_ru);
CREATE INDEX idx_regions_active ON regions(is_active) WHERE is_active = TRUE;

-- ================================
-- 2. Население регионов
-- ================================
CREATE TABLE region_population (
    id SERIAL PRIMARY KEY,
    region_id INTEGER NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    population INTEGER NOT NULL,
    data_source_id INTEGER NOT NULL REFERENCES data_sources(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(region_id, year)
);

-- Индексы
CREATE INDEX idx_region_population_region ON region_population(region_id);
CREATE INDEX idx_region_population_year ON region_population(year);
CREATE INDEX idx_region_population_region_year ON region_population(region_id, year);
CREATE INDEX idx_region_population_data_source ON region_population(data_source_id);

-- ================================
-- 3. Виды спорта (международная таблица)
-- ================================
-- Переводы названий хранятся в таблице translations
CREATE TABLE sports (
    id SERIAL PRIMARY KEY,
    name_ru VARCHAR(100) NOT NULL UNIQUE,  -- Русское название (уникальное)
    olympic_category_id INTEGER REFERENCES olympic_categories(id),
    sport_type_id INTEGER REFERENCES sport_types(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_sports_name ON sports(name_ru);
CREATE INDEX idx_sports_olympic_category ON sports(olympic_category_id);
CREATE INDEX idx_sports_sport_type ON sports(sport_type_id);
CREATE INDEX idx_sports_active ON sports(is_active) WHERE is_active = TRUE;

-- ================================
-- 3a. Виды спорта по странам (национальные реестры)
-- ================================
-- Связывает международные виды спорта с национальными реестрами
-- Хранит коды из реестров конкретных стран (РФ, Беларусь, Казахстан и т.д.)
CREATE TABLE country_sports (
    id SERIAL PRIMARY KEY,
    sport_id INTEGER NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
    country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    registry_code VARCHAR(50),          -- Код из национального реестра: 152-000-1-4-1-1 (РФ)
    registry_number INTEGER,            -- Номер в реестре страны (1, 2, 3...)
    popularity_score INTEGER DEFAULT 0,
    data_source_id INTEGER REFERENCES data_sources(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sport_id, country_id),
    CONSTRAINT chk_popularity CHECK (popularity_score >= 0 AND popularity_score <= 100)
);

-- Индексы
CREATE INDEX idx_country_sports_sport ON country_sports(sport_id);
CREATE INDEX idx_country_sports_country ON country_sports(country_id);
CREATE INDEX idx_country_sports_registry_code ON country_sports(registry_code);
CREATE INDEX idx_country_sports_active ON country_sports(is_active) WHERE is_active = TRUE;

-- ПРИМЕЧАНИЕ: Данные видов спорта импортируются из файла 05_registry_import.sql
-- который генерируется автоматически из официального реестра Минспорта РФ

-- ================================
-- 4. Дисциплины (международная таблица)
-- ================================
-- Переводы названий хранятся в таблице translations
-- Дисциплины привязаны к country_sports (виду спорта в конкретной стране)
CREATE TABLE disciplines (
    id SERIAL PRIMARY KEY,
    country_sport_id INTEGER NOT NULL REFERENCES country_sports(id) ON DELETE CASCADE,
    name_ru VARCHAR(200) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(country_sport_id, name_ru)
);

-- Индексы
CREATE INDEX idx_disciplines_country_sport ON disciplines(country_sport_id);
CREATE INDEX idx_disciplines_name ON disciplines(name_ru);
CREATE INDEX idx_disciplines_active ON disciplines(is_active) WHERE is_active = TRUE;

-- ================================
-- 4a. Дисциплины по странам (национальные реестры)
-- ================================
-- Связывает международные дисциплины с национальными реестрами
CREATE TABLE country_disciplines (
    id SERIAL PRIMARY KEY,
    discipline_id INTEGER NOT NULL REFERENCES disciplines(id) ON DELETE CASCADE,
    country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    registry_code VARCHAR(50),          -- Код из национального реестра: 152-002-1-8-1-1 (РФ)
    data_source_id INTEGER REFERENCES data_sources(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(discipline_id, country_id)
);

-- Индексы
CREATE INDEX idx_country_disciplines_discipline ON country_disciplines(discipline_id);
CREATE INDEX idx_country_disciplines_country ON country_disciplines(country_id);
CREATE INDEX idx_country_disciplines_registry_code ON country_disciplines(registry_code);
CREATE INDEX idx_country_disciplines_active ON country_disciplines(is_active) WHERE is_active = TRUE;

-- ПРИМЕЧАНИЕ: Данные дисциплин импортируются из файла 05_registry_import.sql


-- ================================
-- 5. Организации
-- ================================
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    internal_code VARCHAR(100) UNIQUE,
    level_id INTEGER NOT NULL REFERENCES organization_levels(id),
    type_id INTEGER NOT NULL REFERENCES organization_types(id),
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    country_id INTEGER REFERENCES countries(id) ON DELETE SET NULL,
    region_id INTEGER REFERENCES regions(id) ON DELETE SET NULL,
    name_ru VARCHAR(200) NOT NULL,
    abbreviation_ru VARCHAR(50),
    parent_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
    founded_year INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT no_self_parent CHECK (id != parent_id)
);

-- Индексы
CREATE INDEX idx_organizations_internal_code ON organizations(internal_code);
CREATE INDEX idx_organizations_level ON organizations(level_id);
CREATE INDEX idx_organizations_type ON organizations(type_id);
CREATE INDEX idx_organizations_sport ON organizations(sport_id);
CREATE INDEX idx_organizations_country ON organizations(country_id);
CREATE INDEX idx_organizations_region ON organizations(region_id);
CREATE INDEX idx_organizations_parent ON organizations(parent_id);
CREATE INDEX idx_organizations_active ON organizations(is_active) WHERE is_active = TRUE;

-- ================================
-- 6. Федерации (связующая таблица)
-- ================================
CREATE TABLE federations (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    region_id INTEGER REFERENCES regions(id) ON DELETE SET NULL,
    sport_id INTEGER NOT NULL REFERENCES sports(id),
    discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
    name_ru VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(organization_id, sport_id, discipline_id)
);

-- Индексы
CREATE INDEX idx_federations_organization ON federations(organization_id);
CREATE INDEX idx_federations_region ON federations(region_id);
CREATE INDEX idx_federations_sport ON federations(sport_id);
CREATE INDEX idx_federations_discipline ON federations(discipline_id);
CREATE INDEX idx_federations_active ON federations(is_active) WHERE is_active = TRUE;

-- ================================
-- 7. Переводы
-- ================================
CREATE TABLE translations (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    field_name VARCHAR(50) NOT NULL,
    translation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(entity_type, entity_id, language_code, field_name)
);

-- Индексы
CREATE INDEX idx_translations_entity ON translations(entity_type, entity_id);
CREATE INDEX idx_translations_language ON translations(language_code);
CREATE INDEX idx_translations_lookup ON translations(entity_type, entity_id, language_code);

-- Комментарии к таблице переводов
COMMENT ON TABLE translations IS 'Универсальная таблица для переводов всех сущностей системы';
COMMENT ON COLUMN translations.entity_type IS 'Тип сущности: country, region, organization, sport, discipline, indicator_group, indicator';
COMMENT ON COLUMN translations.entity_id IS 'ID сущности в соответствующей таблице';
COMMENT ON COLUMN translations.language_code IS 'Код языка из таблицы languages';
COMMENT ON COLUMN translations.field_name IS 'Название поля: name, description, abbreviation и т.д.';
