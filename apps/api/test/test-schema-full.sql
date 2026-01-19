-- ================================
-- Блок 1: Справочники (Reference Tables)
-- ================================
-- Создание базовых справочных таблиц для системы оценки развития спорта
-- Используются стандартные naming conventions PostgreSQL

-- ================================
-- 1. Языки
-- ================================
CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(5) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO languages (id, code, name) VALUES
(1, 'ru', 'Русский'),
(2, 'en', 'English');

-- ================================
-- 2. Пол
-- ================================
CREATE TABLE genders (
    id SERIAL PRIMARY KEY,
    code VARCHAR(5) NOT NULL UNIQUE,
    name_ru VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO genders (id, code, name_ru) VALUES
(1, 'M', 'Мужской'),
(2, 'F', 'Женский');

-- ================================
-- 3. Возрастные группы
-- ================================
CREATE TABLE age_groups (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    min_age INTEGER,
    max_age INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO age_groups (id, code, name_ru, min_age, max_age) VALUES
(1, 'U14', 'До 14 лет', NULL, 14),
(2, 'U15', 'До 15 лет', NULL, 15),
(3, 'U16', 'До 16 лет', NULL, 16),
(4, 'U18', 'До 18 лет', NULL, 18),
(5, 'U20', 'До 20 лет', NULL, 20),
(6, 'U23', 'До 23 лет', NULL, 23),
(7, 'ADULT', 'Взрослые', 18, NULL),
(8, 'VETERANS_35', 'Ветераны 35+', 35, NULL),
(9, 'VETERANS_40', 'Ветераны 40+', 40, NULL),
(10, 'VETERANS_45', 'Ветераны 45+', 45, NULL),
(11, 'VETERANS_50', 'Ветераны 50+', 50, NULL),
(12, 'STUDENTS', 'Студенты', 17, 25);

-- ================================
-- 4. Типы регионов
-- ================================
CREATE TABLE region_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name_ru VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO region_types (id, code, name_ru) VALUES
(1, 'federal_city', 'город федерального значения'),
(2, 'oblast', 'область'),
(3, 'krai', 'край'),
(4, 'republic', 'республика'),
(5, 'autonomous_okrug', 'автономный округ'),
(6, 'autonomous_oblast', 'автономная область');

-- ================================
-- 5. Страны
-- ================================
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    code_alpha2 VARCHAR(2) NOT NULL UNIQUE,
    code_alpha3 VARCHAR(3) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    capital_city_code VARCHAR(10),
    phone_code VARCHAR(10),
    currency_code VARCHAR(3),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO countries (id, code_alpha2, code_alpha3, name_ru, capital_city_code, phone_code, currency_code) VALUES
(1, 'RU', 'RUS', 'Россия', 'MOW', '+7', 'RUB'),
(2, 'BY', 'BLR', 'Беларусь', 'MIN', '+375', 'BYN'),
(3, 'KZ', 'KAZ', 'Казахстан', 'AST', '+7', 'KZT');

-- ================================
-- 6. Федеральные округа
-- ================================
CREATE TABLE federal_districts (
    id SERIAL PRIMARY KEY,
    country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO federal_districts (id, country_id, code, name_ru) VALUES
-- Россия
(1, 1, 'RU_CFO', 'Центральный федеральный округ'),
(2, 1, 'RU_SZO', 'Северо-Западный федеральный округ'),
(3, 1, 'RU_YFO', 'Южный федеральный округ'),
(4, 1, 'RU_SKFO', 'Северо-Кавказский федеральный округ'),
(5, 1, 'RU_PFO', 'Приволжский федеральный округ'),
(6, 1, 'RU_UFO', 'Уральский федеральный округ'),
(7, 1, 'RU_SFO', 'Сибирский федеральный округ'),
(8, 1, 'RU_DFO', 'Дальневосточный федеральный округ'),
-- Беларусь
(9, 2, 'BY_ZAP', 'Западный'),
(10, 2, 'BY_YUS', 'Южный'),
(11, 2, 'BY_VES', 'Восточный'),
(12, 2, 'BY_SVO', 'Столичный'),
-- Казахстан
(13, 3, 'KZ_CEN', 'Центральный'),
(14, 3, 'KZ_NVO', 'Северный'),
(15, 3, 'KZ_YUS', 'Южный'),
(16, 3, 'KZ_ZAP', 'Западный'),
(17, 3, 'KZ_VES', 'Восточный'),
(18, 3, 'KZ_STO', 'Столичный');

-- ================================
-- 7. Олимпийские категории
-- ================================
CREATE TABLE olympic_categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name_ru VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO olympic_categories (id, code, name_ru) VALUES
(1, 'summer', 'Летние'),
(2, 'winter', 'Зимние'),
(3, 'both', 'Оба сезона'),
(4, 'none', 'Неолимпийский');

-- ================================
-- 8. Типы спорта
-- ================================
CREATE TABLE sport_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name_ru VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO sport_types (id, code, name_ru) VALUES
(1, 'team', 'Командный'),
(2, 'individual', 'Индивидуальный'),
(3, 'mixed', 'Смешанный');

-- ================================
-- 9. Уровни организаций
-- ================================
CREATE TABLE organization_levels (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name_ru VARCHAR(50) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO organization_levels (id, code, name_ru, sort_order) VALUES
(1, 'INTERNATIONAL', 'Международный', 10),
(2, 'CONTINENTAL', 'Континентальный', 20),
(3, 'UNION', 'Союз', 25),
(4, 'NATIONAL', 'Национальный', 30),
(5, 'DEPARTMENT', 'Департамент', 35),
(6, 'REGIONAL', 'Региональный', 40),
(7, 'ASSOCIATION', 'Ассоциация', 45),
(8, 'LOCAL', 'Локальный', 50),
(9, 'CLUB', 'Клуб', 60),
(10, 'TEAM', 'Команда', 70);

-- ================================
-- 10. Типы организаций
-- ================================
CREATE TABLE organization_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO organization_types (id, code, name_ru, description, sort_order) VALUES
(1, 'government', 'Государственный орган', 'Министерство, департамент', 10),
(2, 'federation_national', 'Национальная федерация', 'Федерация на уровне страны', 20),
(3, 'federation_regional', 'Региональная федерация', 'Федерация в регионе/субъекте', 30),
(4, 'federation_city', 'Городская федерация', 'Федерация на уровне города', 40),
(5, 'league_professional', 'Профессиональная лига', 'Профессиональные соревнования', 50),
(6, 'league_amateur', 'Любительская лига', 'Любительские соревнования', 60),
(7, 'sports_club', 'Спортивный клуб', 'Клуб или команда', 70),
(8, 'sports_school', 'Спортивная школа', 'ДЮСШ, СДЮШОР', 80),
(9, 'committee', 'Комитет', 'Комитет, совет', 90);

-- ================================
-- 11. Категории источников данных
-- ================================
CREATE TABLE data_source_categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO data_source_categories (id, code, name_ru, description, sort_order) VALUES
(1, 'population', 'Демография и население', 'Данные о численности населения, демографические показатели', 10),
(2, 'economics', 'Экономика и финансы', 'Экономические показатели, бюджет, финансирование', 20),
(3, 'sport', 'Спорт', 'Данные о спорте, федерациях, результатах', 30),
(4, 'education', 'Образование', 'Данные об образовательных учреждениях', 40),
(5, 'health', 'Здравоохранение', 'Медицинская статистика', 50),
(6, 'infrastructure', 'Инфраструктура', 'Данные об объектах инфраструктуры', 60),
(7, 'government', 'Государственное управление', 'Официальные государственные данные', 70),
(8, 'analytics', 'Аналитика и исследования', 'Аналитические отчеты и исследования', 80),
(9, 'media', 'СМИ и пресса', 'Средства массовой информации', 90);

-- ================================
-- 12. Источники данных
-- ================================
CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(200) NOT NULL,
    country_id INTEGER REFERENCES countries(id) ON DELETE SET NULL,
    category_id INTEGER REFERENCES data_source_categories(id) ON DELETE SET NULL,
    url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO data_sources (id, code, name_ru, country_id, category_id, url) VALUES
-- Демография (category_id: 1)
(1, 'ROSSTAT', 'Федеральная служба государственной статистики РФ', 1, 1, 'https://rosstat.gov.ru'),
(2, 'BELSTAT', 'Национальный статистический комитет Республики Беларусь', 2, 1, 'https://www.belstat.gov.by'),
(3, 'KAZSTAT', 'Бюро национальной статистики Республики Казахстан', 3, 1, 'https://stat.gov.kz'),
-- Спорт (category_id: 3)
(4, 'MINSPORT_RF', 'Министерство спорта Российской Федерации', 1, 3, 'https://minsport.gov.ru'),
(5, 'MINSPORT_RB', 'Министерство спорта и туризма Республики Беларусь', 2, 3, 'https://mst.by'),
(6, 'MINSPORT_RK', 'Министерство культуры и спорта Республики Казахстан', 3, 3, 'https://www.gov.kz/memleket/entities/msk'),
(7, 'RFB', 'Российская федерация баскетбола', 1, 3, 'https://basketball.ru'),
(8, 'VFLA', 'Всероссийская федерация легкой атлетики', 1, 3, 'https://rusathletics.ru'),
-- Экономика (category_id: 2)
(9, 'MINFIN_RF', 'Министерство финансов Российской Федерации', 1, 2, 'https://minfin.gov.ru'),
(10, 'MINFIN_RB', 'Министерство финансов Республики Беларусь', 2, 2, 'https://www.minfin.gov.by'),
(11, 'MINFIN_RK', 'Министерство финансов Республики Казахстан', 3, 2, 'https://www.gov.kz/memleket/entities/minfin'),
(12, 'CBRF', 'Центральный банк Российской Федерации', 1, 2, 'https://cbr.ru'),
-- Государственное управление (category_id: 7)
(13, 'MOSCOW_GOV', 'Правительство Москвы', 1, 7, 'https://www.mos.ru'),
(14, 'SPB_GOV', 'Правительство Санкт-Петербурга', 1, 7, 'https://www.gov.spb.ru'),
-- Реестры видов спорта (category_id: 3)
(15, 'SPORTS_REGISTRY_RF_2025', 'Всероссийский реестр видов спорта', 1, 3, 'https://minsport.gov.ru/activity/government-regulation/priznanie-vidov-sporta-i-sportivnyh-discziplin-vserossijskij-reestr-vidov-sporta/');

-- ================================
-- Индексы
-- ================================
CREATE INDEX idx_federal_districts_country ON federal_districts(country_id);
CREATE INDEX idx_data_sources_country ON data_sources(country_id);
CREATE INDEX idx_data_sources_category ON data_sources(category_id);
CREATE INDEX idx_data_sources_active ON data_sources(is_active) WHERE is_active = TRUE;
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
-- ================================
-- Блок 3: Универсальная система показателей (Indicators System)
-- ================================
-- Обновленная версия с поддержкой многоуровневых связей и межспортивного переиспользования
-- Дата обновления: 2026-01-13

-- ================================
-- 1. СЕЗОНЫ
-- ================================

CREATE TABLE IF NOT EXISTS seasons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seasons_active ON seasons(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_seasons_dates ON seasons(start_date, end_date);

COMMENT ON TABLE seasons IS 'Спортивные сезоны (календарные и спортивные)';

-- ================================
-- 2. СПРАВОЧНЫЕ ТАБЛИЦЫ
-- ================================

-- 2.1. Категории индикаторов
CREATE TABLE IF NOT EXISTS indicator_categories (
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

-- 2.2. Единицы измерения
CREATE TABLE IF NOT EXISTS measurement_units (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    short_name_ru VARCHAR(20),
    short_name_en VARCHAR(20),
    unit_type VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_mu_unit_type CHECK (unit_type IN ('count', 'boolean', 'currency', 'percent', 'time', 'other'))
);

CREATE INDEX idx_mu_code ON measurement_units(code);

-- 2.3. Типы событий
CREATE TABLE IF NOT EXISTS event_types (
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

-- 2.4. Уровни событий
CREATE TABLE IF NOT EXISTS event_levels (
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

-- 2.5. Этапы событий
CREATE TABLE IF NOT EXISTS event_stages (
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

-- 2.6. Источники данных
CREATE TABLE IF NOT EXISTS data_sources (
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

-- ================================
-- 3. ГРУППЫ ИНДИКАТОРОВ
-- ================================

CREATE TABLE IF NOT EXISTS indicator_groups_catalog (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(200) NOT NULL,
    description TEXT,
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_igc_sport ON indicator_groups_catalog(sport_id);
CREATE INDEX idx_igc_code ON indicator_groups_catalog(code);

COMMENT ON TABLE indicator_groups_catalog IS 'Каталог групп индикаторов (без жесткой иерархии)';

-- 3.1. Связи между группами (Many-to-Many)
CREATE TABLE IF NOT EXISTS indicator_group_relationships (
    id SERIAL PRIMARY KEY,
    parent_group_id INTEGER NOT NULL REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    child_group_id INTEGER NOT NULL REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_igr_not_self CHECK (parent_group_id != child_group_id),
    UNIQUE(parent_group_id, child_group_id)
);

CREATE INDEX idx_igr_parent ON indicator_group_relationships(parent_group_id);
CREATE INDEX idx_igr_child ON indicator_group_relationships(child_group_id);

COMMENT ON TABLE indicator_group_relationships IS 'Связи между группами (many-to-many). Одна группа может принадлежать нескольким родителям';

-- ================================
-- 4. СПРАВОЧНИК ИНДИКАТОРОВ
-- ================================

CREATE TABLE IF NOT EXISTS indicator_catalog (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES indicator_categories(id),
    code VARCHAR(100) NOT NULL UNIQUE,
    name_ru TEXT NOT NULL,
    description TEXT,
    
    -- Тип значения
    value_type VARCHAR(20) NOT NULL DEFAULT 'number',
    measurement_unit_id INTEGER REFERENCES measurement_units(id),
    
    -- Вес по умолчанию
    default_weight NUMERIC(10,4) DEFAULT 0,
    use_population BOOLEAN DEFAULT FALSE,
    
    -- Привязка к спорту (NULL = универсальный)
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
    
    -- Метаданные
    source_hint TEXT,
    calculation_formula TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_ic_value_type CHECK (value_type IN ('number', 'boolean', 'decimal', 'text'))
);

CREATE INDEX idx_ic_category ON indicator_catalog(category_id);
CREATE INDEX idx_ic_sport ON indicator_catalog(sport_id);
CREATE INDEX idx_ic_active ON indicator_catalog(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_ic_code ON indicator_catalog(code);

COMMENT ON TABLE indicator_catalog IS 'Справочник всех возможных индикаторов. sport_id=NULL означает универсальность для всех видов спорта';

-- 4.1. Связь индикаторов с группами (Many-to-Many)
CREATE TABLE IF NOT EXISTS indicator_catalog_groups (
    indicator_catalog_id INTEGER REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    group_catalog_id INTEGER REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (indicator_catalog_id, group_catalog_id)
);

CREATE INDEX idx_icg_indicator ON indicator_catalog_groups(indicator_catalog_id);
CREATE INDEX idx_icg_group ON indicator_catalog_groups(group_catalog_id);

-- ================================
-- 5. АКТИВНЫЕ ИНДИКАТОРЫ ОРГАНИЗАЦИИ
-- ================================

CREATE TABLE IF NOT EXISTS organization_indicators (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    
    -- Кастомизация
    custom_weight NUMERIC(10,4),
    custom_name_ru TEXT,
    is_enabled BOOLEAN DEFAULT TRUE,
    
    -- Метаданные организации
    notes TEXT,
    custom_metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, indicator_catalog_id)
);

CREATE INDEX idx_oi_org ON organization_indicators(organization_id);
CREATE INDEX idx_oi_catalog ON organization_indicators(indicator_catalog_id);
CREATE INDEX idx_oi_enabled ON organization_indicators(is_enabled) WHERE is_enabled = TRUE;

COMMENT ON TABLE organization_indicators IS 'Индикаторы, активированные организацией с возможностью переопределения весов';

-- ================================
-- 6. СПРАВОЧНИК СОБЫТИЙ/ТУРНИРОВ
-- ================================

CREATE TABLE IF NOT EXISTS events_catalog (
    id SERIAL PRIMARY KEY,
    parent_event_id INTEGER REFERENCES events_catalog(id) ON DELETE SET NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    name_ru TEXT NOT NULL,
    short_name_ru VARCHAR(100),
    
    -- Тип и уровень (через справочники)
    event_type_id INTEGER REFERENCES event_types(id),
    level_id INTEGER REFERENCES event_levels(id),
    stage_id INTEGER REFERENCES event_stages(id),
    
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ec_sport ON events_catalog(sport_id);
CREATE INDEX idx_ec_parent ON events_catalog(parent_event_id);
CREATE INDEX idx_ec_type ON events_catalog(event_type_id);
CREATE INDEX idx_ec_level ON events_catalog(level_id);
CREATE INDEX idx_ec_organizer ON events_catalog(organizer_id);

COMMENT ON TABLE events_catalog IS 'Справочник спортивных событий. parent_event_id создает иерархию';

-- ================================
-- 7. РЕЗУЛЬТАТЫ ОРГАНИЗАЦИЙ В СОБЫТИЯХ
-- ================================

CREATE TABLE IF NOT EXISTS event_results (
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

CREATE INDEX idx_er_event ON event_results(event_id);
CREATE INDEX idx_er_org ON event_results(organization_id);
CREATE INDEX idx_er_season ON event_results(season_id);

COMMENT ON TABLE event_results IS 'Результаты организаций в спортивных событиях по сезонам';

-- ================================
-- 8. СВЯЗЬ СОБЫТИЙ С ИНДИКАТОРАМИ
-- ================================

CREATE TABLE IF NOT EXISTS event_indicator_mapping (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events_catalog(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    
    -- Условия начисления
    place_from INTEGER,
    place_to INTEGER,
    
    -- Коэффициент
    weight_multiplier NUMERIC(10,4) DEFAULT 1.0,
    
    notes TEXT,
    
    UNIQUE(event_id, indicator_catalog_id, place_from, place_to)
);

CREATE INDEX idx_eim_event ON event_indicator_mapping(event_id);
CREATE INDEX idx_eim_indicator ON event_indicator_mapping(indicator_catalog_id);

COMMENT ON TABLE event_indicator_mapping IS 'Связь событий с индикаторами (какие события дают баллы)';

-- ================================
-- 9. ЗНАЧЕНИЯ ИНДИКАТОРОВ ОРГАНИЗАЦИЙ
-- ================================

CREATE TABLE IF NOT EXISTS organization_indicator_values (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
    
    -- Значение
    value_number NUMERIC(15,4),
    value_boolean BOOLEAN,
    value_text TEXT,
    
    -- Источник данных
    data_source_id INTEGER REFERENCES data_sources(id),
    event_result_id INTEGER REFERENCES event_results(id) ON DELETE SET NULL,
    
    -- Метаданные
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, indicator_catalog_id, season_id)
);

CREATE INDEX idx_oiv_org ON organization_indicator_values(organization_id);
CREATE INDEX idx_oiv_indicator ON organization_indicator_values(indicator_catalog_id);
CREATE INDEX idx_oiv_season ON organization_indicator_values(season_id);
CREATE INDEX idx_oiv_event_result ON organization_indicator_values(event_result_id);
CREATE INDEX idx_oiv_data_source ON organization_indicator_values(data_source_id);

COMMENT ON TABLE organization_indicator_values IS 'Фактические значения индикаторов организаций по сезонам';

-- ================================
-- 10. РАСЧЕТНЫЕ БАЛЛЫ ОРГАНИЗАЦИЙ
-- ================================

CREATE TABLE IF NOT EXISTS organization_scores (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
    
    -- Баллы по категориям
    score_federation NUMERIC(15,4) DEFAULT 0,
    score_marketing NUMERIC(15,4) DEFAULT 0,
    score_infrastructure NUMERIC(15,4) DEFAULT 0,
    score_achievements NUMERIC(15,4) DEFAULT 0,
    score_personnel NUMERIC(15,4) DEFAULT 0,
    score_finance NUMERIC(15,4) DEFAULT 0,
    score_development NUMERIC(15,4) DEFAULT 0,
    score_other NUMERIC(15,4) DEFAULT 0,
    
    -- Общий балл
    total_score NUMERIC(15,4) DEFAULT 0,
    
    -- Метаданные расчета
    calculation_date TIMESTAMP,
    calculation_metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, season_id)
);

CREATE INDEX idx_os_org ON organization_scores(organization_id);
CREATE INDEX idx_os_season ON organization_scores(season_id);
CREATE INDEX idx_os_total_score ON organization_scores(total_score DESC);

COMMENT ON TABLE organization_scores IS 'Рассчитанные баллы организаций по категориям и сезонам';

-- ================================
-- 11. ШАБЛОНЫ ДЛЯ АВТОГЕНЕРАЦИИ (опционально)
-- ================================

CREATE TABLE IF NOT EXISTS indicator_templates (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
    gender_id INTEGER REFERENCES genders(id) ON DELETE SET NULL,
    age_group_id INTEGER REFERENCES age_groups(id) ON DELETE SET NULL,
    result_type VARCHAR(20) NOT NULL,
    range_from INTEGER NOT NULL,
    range_to INTEGER NOT NULL,
    base_weight NUMERIC(10,4) NOT NULL,
    name_pattern TEXT NOT NULL,
    code_pattern VARCHAR(200) NOT NULL,
    description_pattern TEXT,
    use_population BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_it_result_type CHECK (result_type IN ('place', 'medal', 'participation', 'score', 'boolean')),
    CONSTRAINT chk_it_range CHECK (range_from <= range_to)
);

COMMENT ON TABLE indicator_templates IS 'Шаблоны для автоматической генерации индикаторов';

-- ================================
-- 12. ВЕРСИИ ИНДИКАТОРОВ (для истории изменений)
-- ================================

CREATE TABLE IF NOT EXISTS indicator_versions (
    id SERIAL PRIMARY KEY,
    indicator_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    weight NUMERIC(10,4) NOT NULL,
    name_ru TEXT,
    description TEXT,
    valid_from DATE NOT NULL,
    valid_to DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(indicator_id, version)
);

CREATE INDEX idx_iv_indicator ON indicator_versions(indicator_id);
CREATE INDEX idx_iv_dates ON indicator_versions(valid_from, valid_to);

COMMENT ON TABLE indicator_versions IS 'История изменений индикаторов (весов, названий)';

-- ================================
-- КОММЕНТАРИИ К ТАБЛИЦАМ
-- ================================

COMMENT ON TABLE seasons IS 'Спортивные сезоны (календарные: 2024, 2025 и спортивные: 2024/25)';
COMMENT ON TABLE indicator_categories IS 'Категории индикаторов (федерация, маркетинг, инфраструктура и т.д.)';
COMMENT ON TABLE measurement_units IS 'Единицы измерения (человек, команд, площадок и т.д.)';
COMMENT ON TABLE event_types IS 'Типы событий (чемпионат, кубок, лига и т.д.)';
COMMENT ON TABLE event_levels IS 'Уровни событий (международный, национальный, региональный и т.д.)';
COMMENT ON TABLE event_stages IS 'Этапы событий (квалификация, полуфинал, финал и т.д.)';
COMMENT ON TABLE data_sources IS 'Источники данных (ручной ввод, реестр, API и т.д.)';
COMMENT ON TABLE indicator_groups_catalog IS 'Каталог групп индикаторов без жесткой иерархии';
COMMENT ON TABLE indicator_catalog_groups IS 'Связь индикаторов с группами (many-to-many)';
-- ================================
-- Блок 9: Универсальная система индикаторов
-- ================================
-- Система с разделением на справочники и данные организаций
-- Поддержка межспортивного переиспользования

-- ================================
-- 1. СЕЗОНЫ (расширенная версия)
-- ================================

CREATE TABLE IF NOT EXISTS seasons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seasons_active ON seasons(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_seasons_dates ON seasons(start_date, end_date);

COMMENT ON TABLE seasons IS 'Спортивные сезоны для привязки результатов';

-- Базовые сезоны
INSERT INTO seasons (code, name_ru, start_date, end_date, is_active) VALUES
('2022', 'Сезон 2022', '2022-01-01', '2022-12-31', FALSE),
('2023', 'Сезон 2023', '2023-01-01', '2023-12-31', FALSE),
('2024', 'Сезон 2024', '2024-01-01', '2024-12-31', TRUE),
('2025', 'Сезон 2025', '2025-01-01', '2025-12-31', TRUE),
('2023/24', 'Сезон 2023/2024', '2023-09-01', '2024-08-31', FALSE),
('2024/25', 'Сезон 2024/2025', '2024-09-01', '2025-08-31', TRUE),
('2025/26', 'Сезон 2025/2026', '2025-09-01', '2026-08-31', TRUE)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 2. СПРАВОЧНИК ИНДИКАТОРОВ (КАТАЛОГ)
-- ================================

CREATE TABLE indicator_catalog (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    name_ru TEXT NOT NULL,
    description TEXT,
    
    -- Тип значения
    value_type VARCHAR(20) NOT NULL DEFAULT 'number',
    measurement_unit VARCHAR(50),
    
    -- Вес по умолчанию
    default_weight NUMERIC(10,4) DEFAULT 0,
    use_population BOOLEAN DEFAULT FALSE,
    
    -- Привязка к спорту (NULL = универсальный)
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
    
    -- Метаданные
    source_hint TEXT,
    calculation_formula TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_ic_value_type CHECK (value_type IN ('number', 'boolean', 'decimal', 'text')),
    CONSTRAINT chk_ic_category CHECK (category IN ('federation', 'marketing', 'infrastructure', 'achievements', 'personnel', 'finance', 'other'))
);

CREATE INDEX idx_ic_category ON indicator_catalog(category);
CREATE INDEX idx_ic_sport ON indicator_catalog(sport_id);
CREATE INDEX idx_ic_active ON indicator_catalog(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_ic_code ON indicator_catalog(code);

COMMENT ON TABLE indicator_catalog IS 'Справочник всех возможных индикаторов (универсальный каталог)';
COMMENT ON COLUMN indicator_catalog.sport_id IS 'NULL = применимо ко всем видам спорта';
COMMENT ON COLUMN indicator_catalog.use_population IS 'Нормализация на население региона';

-- ================================
-- 3. ГРУППЫ ИНДИКАТОРОВ В КАТАЛОГЕ
-- ================================

CREATE TABLE indicator_groups_catalog (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES indicator_groups_catalog(id) ON DELETE SET NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(200) NOT NULL,
    description TEXT,
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_igc_parent ON indicator_groups_catalog(parent_id);
CREATE INDEX idx_igc_sport ON indicator_groups_catalog(sport_id);

COMMENT ON TABLE indicator_groups_catalog IS 'Иерархия групп индикаторов в каталоге';

-- Связь индикаторов с группами (многие ко многим)
CREATE TABLE indicator_catalog_groups (
    indicator_catalog_id INTEGER REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    group_catalog_id INTEGER REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (indicator_catalog_id, group_catalog_id)
);

-- ================================
-- 4. АКТИВНЫЕ ИНДИКАТОРЫ ОРГАНИЗАЦИИ
-- ================================

CREATE TABLE organization_indicators (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    
    -- Кастомизация
    custom_weight NUMERIC(10,4),
    custom_name_ru TEXT,
    is_enabled BOOLEAN DEFAULT TRUE,
    
    -- Метаданные организации
    notes TEXT,
    custom_metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, indicator_catalog_id)
);

CREATE INDEX idx_oi_org ON organization_indicators(organization_id);
CREATE INDEX idx_oi_catalog ON organization_indicators(indicator_catalog_id);
CREATE INDEX idx_oi_enabled ON organization_indicators(is_enabled) WHERE is_enabled = TRUE;

COMMENT ON TABLE organization_indicators IS 'Индикаторы, активированные организацией с возможностью переопределения весов';

-- ================================
-- 5. СПРАВОЧНИК СОБЫТИЙ/ТУРНИРОВ
-- ================================

CREATE TABLE events_catalog (
    id SERIAL PRIMARY KEY,
    parent_event_id INTEGER REFERENCES events_catalog(id) ON DELETE SET NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    name_ru TEXT NOT NULL,
    short_name_ru VARCHAR(100),
    
    -- Тип и уровень
    event_type VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    stage VARCHAR(50),
    
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
    
    CONSTRAINT chk_ec_event_type CHECK (event_type IN ('championship', 'cup', 'league', 'tournament', 'qualifier', 'series', 'festival')),
    CONSTRAINT chk_ec_level CHECK (level IN ('international', 'national', 'federal_district', 'regional', 'local')),
    CONSTRAINT chk_ec_stage CHECK (stage IS NULL OR stage IN ('qualification', 'group_stage', 'playoff', 'semifinal', 'final', 'regular_season'))
);

CREATE INDEX idx_ec_sport ON events_catalog(sport_id);
CREATE INDEX idx_ec_parent ON events_catalog(parent_event_id);
CREATE INDEX idx_ec_type ON events_catalog(event_type);
CREATE INDEX idx_ec_level ON events_catalog(level);
CREATE INDEX idx_ec_organizer ON events_catalog(organizer_id);

COMMENT ON TABLE events_catalog IS 'Справочник спортивных событий, турниров и соревнований';
COMMENT ON COLUMN events_catalog.parent_event_id IS 'Иерархия событий (например, Финал -> ЧР)';

-- ================================
-- 6. РЕЗУЛЬТАТЫ ОРГАНИЗАЦИЙ В СОБЫТИЯХ
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

CREATE INDEX idx_er_event ON event_results(event_id);
CREATE INDEX idx_er_org ON event_results(organization_id);
CREATE INDEX idx_er_season ON event_results(season_id);

COMMENT ON TABLE event_results IS 'Результаты организаций в спортивных событиях по сезонам';

-- ================================
-- 7. СВЯЗЬ СОБЫТИЙ С ИНДИКАТОРАМИ
-- ================================

CREATE TABLE event_indicator_mapping (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events_catalog(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    
    -- Условия начисления
    place_from INTEGER,
    place_to INTEGER,
    
    -- Коэффициент
    weight_multiplier NUMERIC(10,4) DEFAULT 1.0,
    
    notes TEXT,
    
    UNIQUE(event_id, indicator_catalog_id, place_from, place_to)
);

CREATE INDEX idx_eim_event ON event_indicator_mapping(event_id);
CREATE INDEX idx_eim_indicator ON event_indicator_mapping(indicator_catalog_id);

COMMENT ON TABLE event_indicator_mapping IS 'Связь событий с индикаторами (какие события дают баллы по каким критериям)';

-- ================================
-- 8. ЗНАЧЕНИЯ ИНДИКАТОРОВ ОРГАНИЗАЦИЙ
-- ================================

CREATE TABLE organization_indicator_values (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
    
    -- Значение
    value_number NUMERIC(15,4),
    value_boolean BOOLEAN,
    value_text TEXT,
    
    -- Источник данных
    source VARCHAR(100),
    event_result_id INTEGER REFERENCES event_results(id) ON DELETE SET NULL,
    
    -- Метаданные
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, indicator_catalog_id, season_id)
);

CREATE INDEX idx_oiv_org ON organization_indicator_values(organization_id);
CREATE INDEX idx_oiv_indicator ON organization_indicator_values(indicator_catalog_id);
CREATE INDEX idx_oiv_season ON organization_indicator_values(season_id);
CREATE INDEX idx_oiv_event_result ON organization_indicator_values(event_result_id);

COMMENT ON TABLE organization_indicator_values IS 'Фактические значения индикаторов организаций по сезонам';

-- ================================
-- 9. РАСЧЕТНЫЕ БАЛЛЫ ОРГАНИЗАЦИЙ
-- ================================

CREATE TABLE organization_scores (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
    
    -- Баллы по категориям
    score_federation NUMERIC(15,4) DEFAULT 0,
    score_marketing NUMERIC(15,4) DEFAULT 0,
    score_infrastructure NUMERIC(15,4) DEFAULT 0,
    score_achievements NUMERIC(15,4) DEFAULT 0,
    score_personnel NUMERIC(15,4) DEFAULT 0,
    score_finance NUMERIC(15,4) DEFAULT 0,
    score_other NUMERIC(15,4) DEFAULT 0,
    
    -- Общий балл
    total_score NUMERIC(15,4) DEFAULT 0,
    
    -- Метаданные расчета
    calculation_date TIMESTAMP,
    calculation_metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, season_id)
);

CREATE INDEX idx_os_org ON organization_scores(organization_id);
CREATE INDEX idx_os_season ON organization_scores(season_id);
CREATE INDEX idx_os_total_score ON organization_scores(total_score DESC);

COMMENT ON TABLE organization_scores IS 'Рассчитанные баллы организаций по категориям и сезонам';

-- ================================
-- 10. ПРИМЕРЫ ДАННЫХ
-- ================================

-- ================================
-- 10.1. УНИВЕРСАЛЬНЫЕ ИНДИКАТОРЫ (для всех видов спорта)
-- ================================

-- Группы универсальных индикаторов
INSERT INTO indicator_groups_catalog (id, parent_id, code, name_ru, description, sport_id, sort_order) VALUES
(1, NULL, 'UNIVERSAL_FEDERATION', 'Федерация', 'Показатели федерации', NULL, 10),
(2, NULL, 'UNIVERSAL_MARKETING', 'Маркетинг', 'Маркетинговые показатели', NULL, 20),
(3, NULL, 'UNIVERSAL_FINANCE', 'Финансы', 'Финансовые показатели', NULL, 30)
ON CONFLICT (code) DO NOTHING;

-- Маркетинговые индикаторы (универсальные)
INSERT INTO indicator_catalog (category, code, name_ru, description, value_type, default_weight, sport_id, measurement_unit) VALUES
('marketing', 'MARKETING_WEBSITE', 'Наличие активного официального сайта', 'Федерация имеет работающий сайт или страницу на сайте национальной федерации', 'boolean', 0.04, NULL, 'да/нет'),
('marketing', 'MARKETING_LOGO', 'Наличие собственного логотипа', 'Федерация имеет уникальный логотип', 'boolean', 0.01, NULL, 'да/нет'),
('marketing', 'MARKETING_BRAND_STYLE', 'Наличие фирменного стиля', 'Федерация имеет разработанный фирменный стиль', 'boolean', 0.02, NULL, 'да/нет'),
('marketing', 'MARKETING_VK_ACTIVE', 'Активное сообщество ВКонтакте', 'Федерация ведет активное сообщество ВК (минимум 1 пост в неделю)', 'boolean', 0.05, NULL, 'да/нет'),
('marketing', 'MARKETING_TG_ACTIVE', 'Активный Telegram-канал', 'Федерация ведет активный Telegram-канал', 'boolean', 0.05, NULL, 'да/нет'),
('marketing', 'MARKETING_SOCIAL_FOLLOWERS', 'Количество подписчиков в соцсетях', 'Общее количество подписчиков во всех соцсетях', 'number', 0.03, NULL, 'человек')
ON CONFLICT (code) DO NOTHING;

-- Федеративные индикаторы (универсальные)
INSERT INTO indicator_catalog (category, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit) VALUES
('federation', 'FED_ACCREDITATION', 'Наличие аккредитации', 'Федерация имеет действующую аккредитацию', 'boolean', 0.0005, NULL, FALSE, 'да/нет'),
('federation', 'FED_DEVELOPMENT_PROGRAM', 'Наличие программы развития', 'Федерация имеет утвержденную программу развития вида спорта', 'boolean', 0.005, NULL, FALSE, 'да/нет'),
('federation', 'FED_BRANCHES_COUNT', 'Количество отделений федерации', 'Количество территориальных отделений региональной федерации', 'number', 0.001, NULL, TRUE, 'отделений'),
('federation', 'FED_MEMBERS_COUNT', 'Количество членов федерации', 'Количество членов региональной федерации', 'number', 0.001, NULL, TRUE, 'человек'),
('federation', 'FED_ANTIDOPING', 'Наличие антидопинговой работы', 'Федерация проводит антидопинговую работу', 'boolean', 0.001, NULL, FALSE, 'да/нет'),
('federation', 'FED_COUNCIL', 'Наличие попечительского совета', 'Федерация имеет действующий попечительский совет', 'boolean', 0.005, NULL, FALSE, 'да/нет')
ON CONFLICT (code) DO NOTHING;

-- Финансовые индикаторы (универсальные)
INSERT INTO indicator_catalog (category, code, name_ru, value_type, default_weight, sport_id, measurement_unit) VALUES
('finance', 'FIN_BUDGET_VOLUME', 'Объем бюджета федерации', 'number', 0.002, NULL, 'рублей'),
('finance', 'FIN_GRANT_NATIONAL', 'Получение гранта национальной федерации', 'boolean', 0.003, NULL, 'да/нет'),
('finance', 'FIN_GRANT_OTHER', 'Получение грантов помимо национальной федерации', 'boolean', 0.002, NULL, 'да/нет')
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 10.2. ИНДИКАТОРЫ БАСКЕТБОЛА
-- ================================

-- Группы баскетбольных индикаторов
INSERT INTO indicator_groups_catalog (id, parent_id, code, name_ru, description, sport_id, sort_order) VALUES
(100, NULL, 'BBL_INFRASTRUCTURE', 'Инфраструктура баскетбола', 'Площадки и объекты', 10, 100),
(101, NULL, 'BBL_ACHIEVEMENTS', 'Достижения в баскетболе', 'Результаты команд и спортсменов', 10, 110),
(102, NULL, 'BBL_PERSONNEL', 'Кадры баскетбола', 'Судьи, тренеры, специалисты', 10, 120)
ON CONFLICT (code) DO NOTHING;

-- Инфраструктурные индикаторы баскетбола
INSERT INTO indicator_catalog (category, code, name_ru, description, value_type, default_weight, sport_id, discipline_id, use_population, measurement_unit) VALUES
('infrastructure', 'BBL_COURTS_INDOOR_STANDARD', 'Стандартные крытые площадки', 'Крытые баскетбольные площадки в реестре спортивных объектов', 'number', 0.10, 10, NULL, TRUE, 'площадок'),
('infrastructure', 'BBL_COURTS_INDOOR_1000', 'Крытые площадки 1000+ мест', 'Крытые площадки с трибунами на 1000+ зрителей', 'number', 0.15, 10, NULL, TRUE, 'площадок'),
('infrastructure', 'BBL_COURTS_INDOOR_5000', 'Крытые площадки 5000+ мест', 'Крытые площадки с трибунами на 5000+ зрителей', 'number', 0.25, 10, NULL, TRUE, 'площадок'),
('infrastructure', 'BBL_COURTS_OUTDOOR_12', 'Уличные площадки (1-2 кольца)', 'Уличные площадки с 1-2 баскетбольными кольцами', 'number', 0.05, 10, NULL, TRUE, 'площадок'),
('infrastructure', 'BBL_COURTS_3X3', 'Площадки 3х3 (ЦУБы)', 'Центры уличного баскетбола с 3+ кольцами', 'number', 0.10, 10, 219, TRUE, 'площадок')
ON CONFLICT (code) DO NOTHING;

-- Достижения в баскетболе
INSERT INTO indicator_catalog (category, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit) VALUES
('achievements', 'BBL_LOCAL_PLAYERS_PRO', 'Воспитанники в профессиональных клубах', 'Количество воспитанников региона в местных профессиональных клубах', 'number', 0.50, 10, TRUE, 'человек'),
('achievements', 'BBL_NATIONAL_TEAM_MEMBERS', 'Члены сборной России', 'Количество спортсменов региона в сборных командах России', 'number', 1.00, 10, TRUE, 'человек'),
('achievements', 'BBL_TEAMS_PROFESSIONAL', 'Профессиональные команды', 'Количество профессиональных команд региона', 'number', 0.30, 10, TRUE, 'команд')
ON CONFLICT (code) DO NOTHING;

-- Кадры баскетбола
INSERT INTO indicator_catalog (category, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit) VALUES
('personnel', 'BBL_REFEREES_RFB', 'Судьи с лицензией РФБ', 'number', 0.05, 10, TRUE, 'человек'),
('personnel', 'BBL_REFEREES_FIBA', 'Судьи с лицензией FIBA', 'number', 0.10, 10, TRUE, 'человек'),
('personnel', 'BBL_STATISTICIANS_RFB', 'Статистики с лицензией РФБ', 'number', 0.02, 10, TRUE, 'человек'),
('personnel', 'BBL_COMMISSIONERS_FIBA', 'Комиссары FIBA', 'number', 0.15, 10, TRUE, 'человек')
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 10.3. ИНДИКАТОРЫ ЛЕГКОЙ АТЛЕТИКИ
-- ================================

-- Группы индикаторов легкой атлетики
INSERT INTO indicator_groups_catalog (id, parent_id, code, name_ru, description, sport_id, sort_order) VALUES
(200, NULL, 'ATH_INFRASTRUCTURE', 'Инфраструктура легкой атлетики', 'Манежи, стадионы, дорожки', 3, 200),
(201, NULL, 'ATH_ACHIEVEMENTS', 'Достижения в легкой атлетике', 'Результаты спортсменов', 3, 210),
(202, NULL, 'ATH_PERSONNEL', 'Кадры легкой атлетики', 'Судьи, тренеры', 3, 220)
ON CONFLICT (code) DO NOTHING;

-- Инфраструктурные индикаторы легкой атлетики
INSERT INTO indicator_catalog (category, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit) VALUES
('infrastructure', 'ATH_INDOOR_ARENAS', 'Легкоатлетические манежи', 'Крытые легкоатлетические манежи', 'number', 0.30, 3, TRUE, 'манежей'),
('infrastructure', 'ATH_STADIUMS_TRACK', 'Стадионы с беговыми дорожками', 'Стадионы с легкоатлетическими дорожками', 'number', 0.20, 3, TRUE, 'стадионов'),
('infrastructure', 'ATH_SECTORS_JUMP', 'Секторы для прыжков', 'Секторы для прыжков в длину/высоту', 'number', 0.10, 3, TRUE, 'секторов'),
('infrastructure', 'ATH_SECTORS_THROW', 'Секторы для метаний', 'Секторы для метания диска/копья/молота', 'number', 0.10, 3, TRUE, 'секторов')
ON CONFLICT (code) DO NOTHING;

-- Достижения в легкой атлетике
INSERT INTO indicator_catalog (category, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit) VALUES
('achievements', 'ATH_NATIONAL_TEAM_MEMBERS', 'Члены сборной России', 'Количество легкоатлетов региона в сборной России', 'number', 2.00, 3, TRUE, 'человек'),
('achievements', 'ATH_MEDALS_CHAMPIONSHIP', 'Медали на Чемпионате России', 'Количество медалей на ЧР по легкой атлетике', 'number', 1.50, 3, TRUE, 'медалей'),
('achievements', 'ATH_RECORDS_RUSSIA', 'Рекорды России', 'Количество действующих рекордов России', 'number', 5.00, 3, TRUE, 'рекордов')
ON CONFLICT (code) DO NOTHING;

-- Кадры легкой атлетики
INSERT INTO indicator_catalog (category, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit) VALUES
('personnel', 'ATH_REFEREES_NATIONAL', 'Судьи всероссийской категории', 'number', 0.08, 3, TRUE, 'человек'),
('personnel', 'ATH_REFEREES_INTERNATIONAL', 'Судьи международной категории', 'number', 0.15, 3, TRUE, 'человек'),
('personnel', 'ATH_COACHES_HONORED', 'Заслуженные тренеры', 'number', 0.20, 3, TRUE, 'человек')
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 10.4. СОБЫТИЯ БАСКЕТБОЛА
-- ================================

-- Суперлига 5х5 мужчины
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type, level, sport_id, discipline_id, gender_id, organizer_id) VALUES
('BBL_SUPERLEAGUE_M_5X5', 'Чемпионат России. Суперлига (мужчины)', 'Суперлига М', 'league', 'national', 10, 220, 1, 1)
ON CONFLICT (code) DO NOTHING;

-- Регулярный сезон Суперлиги
INSERT INTO events_catalog (parent_event_id, code, name_ru, short_name_ru, event_type, level, stage, sport_id, discipline_id, gender_id) VALUES
((SELECT id FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M_5X5'), 'BBL_SUPERLEAGUE_M_5X5_REGULAR', 'Суперлига. Регулярный сезон', 'Суперлига М (рег.)', 'league', 'national', 'regular_season', 10, 220, 1)
ON CONFLICT (code) DO NOTHING;

-- Плей-офф Суперлиги
INSERT INTO events_catalog (parent_event_id, code, name_ru, short_name_ru, event_type, level, stage, sport_id, discipline_id, gender_id) VALUES
((SELECT id FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M_5X5'), 'BBL_SUPERLEAGUE_M_5X5_PLAYOFF', 'Суперлига. Плей-офф', 'Суперлига М (п/о)', 'league', 'national', 'playoff', 10, 220, 1)
ON CONFLICT (code) DO NOTHING;

-- Высшая лига 5х5 мужчины
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type, level, sport_id, discipline_id, gender_id, organizer_id) VALUES
('BBL_HIGHER_LEAGUE_M_5X5', 'Высшая лига (мужчины)', 'Высшая лига М', 'league', 'national', 10, 220, 1, 1)
ON CONFLICT (code) DO NOTHING;

-- Первенство России U18 юноши
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type, level, sport_id, discipline_id, gender_id, age_group_id, organizer_id) VALUES
('BBL_CHAMPIONSHIP_U18_M', 'Первенство России U18 (юноши)', 'ПР U18 М', 'championship', 'national', 10, 220, 1, 4, 1)
ON CONFLICT (code) DO NOTHING;

-- Межрегиональный этап ПР U18
INSERT INTO events_catalog (parent_event_id, code, name_ru, short_name_ru, event_type, level, stage, sport_id, discipline_id, gender_id, age_group_id) VALUES
((SELECT id FROM events_catalog WHERE code = 'BBL_CHAMPIONSHIP_U18_M'), 'BBL_CHAMPIONSHIP_U18_M_INTER', 'ПР U18. Межрегиональный этап', 'ПР U18 М (межрег.)', 'championship', 'national', 'qualification', 10, 220, 1, 4)
ON CONFLICT (code) DO NOTHING;

-- Финал ПР U18
INSERT INTO events_catalog (parent_event_id, code, name_ru, short_name_ru, event_type, level, stage, sport_id, discipline_id, gender_id, age_group_id) VALUES
((SELECT id FROM events_catalog WHERE code = 'BBL_CHAMPIONSHIP_U18_M'), 'BBL_CHAMPIONSHIP_U18_M_FINAL', 'ПР U18. Финал', 'ПР U18 М (финал)', 'championship', 'national', 'final', 10, 220, 1, 4)
ON CONFLICT (code) DO NOTHING;

-- Чемпионат России 3х3
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type, level, sport_id, discipline_id, organizer_id) VALUES
('BBL_CHAMPIONSHIP_3X3', 'Чемпионат России 3х3', 'ЧР 3х3', 'championship', 'national', 10, 219, 1)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 10.5. СОБЫТИЯ ЛЕГКОЙ АТЛЕТИКИ
-- ================================

-- Чемпионат России (взрослые)
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type, level, sport_id, age_group_id, organizer_id) VALUES
('ATH_CHAMPIONSHIP_RUSSIA', 'Чемпионат России по легкой атлетике', 'ЧР ЛА', 'championship', 'national', 3, 8, 2)
ON CONFLICT (code) DO NOTHING;

-- Первенство России U20
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type, level, sport_id, age_group_id, organizer_id) VALUES
('ATH_CHAMPIONSHIP_U20', 'Первенство России U20', 'ПР U20 ЛА', 'championship', 'national', 3, 5, 2)
ON CONFLICT (code) DO NOTHING;

-- Первенство России U18
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type, level, sport_id, age_group_id, organizer_id) VALUES
('ATH_CHAMPIONSHIP_U18', 'Первенство России U18', 'ПР U18 ЛА', 'championship', 'national', 3, 4, 2)
ON CONFLICT (code) DO NOTHING;

-- Кубок России
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type, level, sport_id, organizer_id) VALUES
('ATH_CUP_RUSSIA', 'Кубок России по легкой атлетике', 'КР ЛА', 'cup', 'national', 3, 2)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 10.6. СВЯЗЬ СОБЫТИЙ С ИНДИКАТОРАМИ
-- ================================

-- Участие в Суперлиге дает баллы
INSERT INTO event_indicator_mapping (event_id, indicator_catalog_id, weight_multiplier) VALUES
((SELECT id FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M_5X5'),
 (SELECT id FROM indicator_catalog WHERE code = 'BBL_TEAMS_PROFESSIONAL'),
 1.0)
ON CONFLICT DO NOTHING;

-- Призовые места в Суперлиге (1-3 место)
INSERT INTO event_indicator_mapping (event_id, indicator_catalog_id, place_from, place_to, weight_multiplier) VALUES
((SELECT id FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M_5X5'),
 (SELECT id FROM indicator_catalog WHERE code = 'BBL_TEAMS_PROFESSIONAL'),
 1, 3, 2.0)
ON CONFLICT DO NOTHING;

-- Медали на ЧР по легкой атлетике
INSERT INTO event_indicator_mapping (event_id, indicator_catalog_id, place_from, place_to, weight_multiplier) VALUES
((SELECT id FROM events_catalog WHERE code = 'ATH_CHAMPIONSHIP_RUSSIA'),
 (SELECT id FROM indicator_catalog WHERE code = 'ATH_MEDALS_CHAMPIONSHIP'),
 1, 3, 1.0)
ON CONFLICT DO NOTHING;

-- ================================
-- 10.7. РФБ АКТИВИРУЕТ ИНДИКАТОРЫ
-- ================================

-- РФБ использует все универсальные маркетинговые индикаторы
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled, notes)
SELECT 
    1,  -- РФБ
    id,
    true,
    'Универсальный маркетинговый индикатор'
FROM indicator_catalog
WHERE category = 'marketing' AND sport_id IS NULL
ON CONFLICT (organization_id, indicator_catalog_id) DO NOTHING;

-- РФБ использует все универсальные федеративные индикаторы
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true
FROM indicator_catalog
WHERE category = 'federation' AND sport_id IS NULL
ON CONFLICT (organization_id, indicator_catalog_id) DO NOTHING;

-- РФБ использует все баскетбольные индикаторы
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true
FROM indicator_catalog
WHERE sport_id = 10
ON CONFLICT (organization_id, indicator_catalog_id) DO NOTHING;

-- РФБ переопределяет вес для "Воспитанники в проф клубах"
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled, custom_weight, notes)
VALUES (
    1,
    (SELECT id FROM indicator_catalog WHERE code = 'BBL_LOCAL_PLAYERS_PRO'),
    true,
    0.80,  -- Вместо 0.50
    'Увеличен вес для стимулирования работы с молодежью'
)
ON CONFLICT (organization_id, indicator_catalog_id) 
DO UPDATE SET custom_weight = 0.80, notes = 'Увеличен вес для стимулирования работы с молодежью';

-- ================================
-- 10.8. ВЛФА АКТИВИРУЕТ ИНДИКАТОРЫ
-- ================================

-- ВЛФА использует универсальные маркетинговые с увеличенным весом
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled, custom_weight, notes)
SELECT 
    2,  -- ВЛФА
    id,
    true,
    default_weight * 1.5,
    'Увеличенный вес для маркетинга'
FROM indicator_catalog
WHERE category = 'marketing' AND sport_id IS NULL
ON CONFLICT (organization_id, indicator_catalog_id) DO NOTHING;

-- ВЛФА использует универсальные федеративные индикаторы
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 2, id, true
FROM indicator_catalog
WHERE category = 'federation' AND sport_id IS NULL
ON CONFLICT (organization_id, indicator_catalog_id) DO NOTHING;

-- ВЛФА использует все индикаторы легкой атлетики
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 2, id, true
FROM indicator_catalog
WHERE sport_id = 3
ON CONFLICT (organization_id, indicator_catalog_id) DO NOTHING;

-- ================================
-- 10.9. ПРИМЕРЫ РЕЗУЛЬТАТОВ В СОБЫТИЯХ
-- ================================

-- Московская область: 3 место в Суперлиге 2024
INSERT INTO event_results (event_id, organization_id, season_id, place, team_count) VALUES
((SELECT id FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M_5X5'),
 50,  -- Московская область (предположим id=50)
 (SELECT id FROM seasons WHERE code = '2024'),
 3,
 1)
ON CONFLICT (event_id, organization_id, season_id) DO NOTHING;

-- Московская область: 1 место в финале ПР U18
INSERT INTO event_results (event_id, organization_id, season_id, place, team_count) VALUES
((SELECT id FROM events_catalog WHERE code = 'BBL_CHAMPIONSHIP_U18_M_FINAL'),
 50,
 (SELECT id FROM seasons WHERE code = '2024'),
 1,
 1)
ON CONFLICT (event_id, organization_id, season_id) DO NOTHING;

-- Москва: 15 медалей на ЧР по легкой атлетике 2024
INSERT INTO event_results (event_id, organization_id, season_id, points, participants_count) VALUES
((SELECT id FROM events_catalog WHERE code = 'ATH_CHAMPIONSHIP_RUSSIA'),
 40,  -- Москва (предположим id=40)
 (SELECT id FROM seasons WHERE code = '2024'),
 15,  -- 15 медалей
 45)  -- 45 участников
ON CONFLICT (event_id, organization_id, season_id) DO NOTHING;

-- ================================
-- 10.10. ПРИМЕРЫ ЗНАЧЕНИЙ ИНДИКАТОРОВ
-- ================================

-- Московская область: маркетинговые показатели 2024
INSERT INTO organization_indicator_values (organization_id, indicator_catalog_id, season_id, value_boolean, source) VALUES
(50, (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_WEBSITE'), (SELECT id FROM seasons WHERE code = '2024'), true, 'manual'),
(50, (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_VK_ACTIVE'), (SELECT id FROM seasons WHERE code = '2024'), true, 'manual'),
(50, (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_TG_ACTIVE'), (SELECT id FROM seasons WHERE code = '2024'), true, 'manual')
ON CONFLICT (organization_id, indicator_catalog_id, season_id) DO NOTHING;

-- Московская область: количество подписчиков 2024
INSERT INTO organization_indicator_values (organization_id, indicator_catalog_id, season_id, value_number, source) VALUES
(50, (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_SOCIAL_FOLLOWERS'), (SELECT id FROM seasons WHERE code = '2024'), 25000, 'manual')
ON CONFLICT (organization_id, indicator_catalog_id, season_id) DO NOTHING;

-- Московская область: инфраструктура баскетбола 2024
INSERT INTO organization_indicator_values (organization_id, indicator_catalog_id, season_id, value_number, source) VALUES
(50, (SELECT id FROM indicator_catalog WHERE code = 'BBL_COURTS_INDOOR_STANDARD'), (SELECT id FROM seasons WHERE code = '2024'), 45, 'registry'),
(50, (SELECT id FROM indicator_catalog WHERE code = 'BBL_COURTS_INDOOR_1000'), (SELECT id FROM seasons WHERE code = '2024'), 8, 'registry'),
(50, (SELECT id FROM indicator_catalog WHERE code = 'BBL_COURTS_INDOOR_5000'), (SELECT id FROM seasons WHERE code = '2024'), 3, 'registry'),
(50, (SELECT id FROM indicator_catalog WHERE code = 'BBL_COURTS_OUTDOOR_12'), (SELECT id FROM seasons WHERE code = '2024'), 120, 'manual'),
(50, (SELECT id FROM indicator_catalog WHERE code = 'BBL_COURTS_3X3'), (SELECT id FROM seasons WHERE code = '2024'), 15, 'manual')
ON CONFLICT (organization_id, indicator_catalog_id, season_id) DO NOTHING;

-- Московская область: воспитанники в проф клубах 2024
INSERT INTO organization_indicator_values (organization_id, indicator_catalog_id, season_id, value_number, source) VALUES
(50, (SELECT id FROM indicator_catalog WHERE code = 'BBL_LOCAL_PLAYERS_PRO'), (SELECT id FROM seasons WHERE code = '2024'), 12, 'manual')
ON CONFLICT (organization_id, indicator_catalog_id, season_id) DO NOTHING;

-- Москва: инфраструктура легкой атлетики 2024
INSERT INTO organization_indicator_values (organization_id, indicator_catalog_id, season_id, value_number, source) VALUES
(40, (SELECT id FROM indicator_catalog WHERE code = 'ATH_INDOOR_ARENAS'), (SELECT id FROM seasons WHERE code = '2024'), 5, 'registry'),
(40, (SELECT id FROM indicator_catalog WHERE code = 'ATH_STADIUMS_TRACK'), (SELECT id FROM seasons WHERE code = '2024'), 12, 'registry'),
(40, (SELECT id FROM indicator_catalog WHERE code = 'ATH_NATIONAL_TEAM_MEMBERS'), (SELECT id FROM seasons WHERE code = '2024'), 28, 'manual')
ON CONFLICT (organization_id, indicator_catalog_id, season_id) DO NOTHING;

-- ================================
-- КОММЕНТАРИИ К ТАБЛИЦАМ
-- ================================

COMMENT ON TABLE indicator_catalog IS 'Справочник всех возможных индикаторов (универсальный каталог). sport_id=NULL означает применимость ко всем видам спорта';
COMMENT ON TABLE organization_indicators IS 'Индикаторы, активированные конкретной организацией. Организация может переопределить вес через custom_weight';
COMMENT ON TABLE events_catalog IS 'Справочник спортивных событий. parent_event_id создает иерархию (например, Финал -> ЧР -> Межрегиональный этап)';
COMMENT ON TABLE event_results IS 'Фактические результаты организаций в событиях по сезонам';
COMMENT ON TABLE event_indicator_mapping IS 'Связь событий с индикаторами. Определяет, какие события дают баллы по каким критериям';
COMMENT ON TABLE organization_indicator_values IS 'Фактические значения индикаторов организаций по сезонам. Источник данных может быть manual, registry, calculated, event';
COMMENT ON TABLE organization_scores IS 'Рассчитанные баллы организаций по категориям индикаторов и сезонам';
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
-- ================================
-- Блок 12: Связи групп индикаторов (Many-to-Many)
-- ================================
-- Позволяет одной группе принадлежать нескольким родительским группам
-- Например, "Маркетинг" может быть и в "Профессиональный спорт" и в "Общие региональные показатели"

-- ================================
-- 1. ТАБЛИЦА СВЯЗЕЙ ГРУПП (Many-to-Many)
-- ================================

CREATE TABLE indicator_group_relationships (
    id SERIAL PRIMARY KEY,
    parent_group_id INTEGER NOT NULL REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    child_group_id INTEGER NOT NULL REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Нельзя связать группу саму с собой
    CONSTRAINT chk_igr_not_self CHECK (parent_group_id != child_group_id),
    
    -- Уникальная связь
    UNIQUE(parent_group_id, child_group_id)
);

CREATE INDEX idx_igr_parent ON indicator_group_relationships(parent_group_id);
CREATE INDEX idx_igr_child ON indicator_group_relationships(child_group_id);
CREATE INDEX idx_igr_active ON indicator_group_relationships(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE indicator_group_relationships IS 'Связи между группами индикаторов (many-to-many). Позволяет одной группе принадлежать нескольким родительским группам';

-- ================================
-- 2. ФУНКЦИЯ: Проверка циклических зависимостей
-- ================================

CREATE OR REPLACE FUNCTION check_group_cycle(
    p_parent_id INTEGER,
    p_child_id INTEGER
)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_cycle_exists BOOLEAN;
BEGIN
    -- Проверяем, не создаст ли новая связь цикл
    -- Цикл возникает, если p_parent_id является потомком p_child_id
    WITH RECURSIVE group_tree AS (
        -- Начинаем с предполагаемого потомка
        SELECT child_group_id as group_id, 1 as level
        FROM indicator_group_relationships
        WHERE parent_group_id = p_child_id
        
        UNION ALL
        
        -- Рекурсивно идем вниз по дереву
        SELECT igr.child_group_id, gt.level + 1
        FROM indicator_group_relationships igr
        JOIN group_tree gt ON gt.group_id = igr.parent_group_id
        WHERE gt.level < 10  -- Ограничение глубины для безопасности
    )
    SELECT EXISTS(
        SELECT 1 FROM group_tree WHERE group_id = p_parent_id
    ) INTO v_cycle_exists;
    
    RETURN v_cycle_exists;
END;
$$;

COMMENT ON FUNCTION check_group_cycle IS 'Проверяет, создаст ли новая связь циклическую зависимость';

-- ================================
-- 3. ТРИГГЕР: Предотвращение циклов
-- ================================

CREATE OR REPLACE FUNCTION prevent_group_cycle()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF check_group_cycle(NEW.parent_group_id, NEW.child_group_id) THEN
        RAISE EXCEPTION 'Создание связи между группами % и % приведет к циклической зависимости',
            NEW.parent_group_id, NEW.child_group_id;
    END IF;
    
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_group_cycle ON indicator_group_relationships;
CREATE TRIGGER trg_prevent_group_cycle
    BEFORE INSERT OR UPDATE ON indicator_group_relationships
    FOR EACH ROW
    EXECUTE FUNCTION prevent_group_cycle();

-- ================================
-- 4. ПРИМЕРЫ СВЯЗЕЙ ГРУПП
-- ================================

-- Пример 1: Маркетинг принадлежит и "Профессиональному спорту" и "Общим региональным показателям"
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order) VALUES
-- Маркетинг (id=11) -> Профессиональный спорт (id=5)
((SELECT id FROM indicator_groups_catalog WHERE code = 'professional_sport'),
 (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING'),
 10),

-- Маркетинг (id=11) -> Общие региональные показатели (id=2)
((SELECT id FROM indicator_groups_catalog WHERE code = 'regional_general'),
 (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING'),
 20)
ON CONFLICT (parent_group_id, child_group_id) DO NOTHING;

-- Пример 2: Федерация может быть в нескольких местах
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order) VALUES
-- Федерация -> Общие региональные показатели
((SELECT id FROM indicator_groups_catalog WHERE code = 'regional_general'),
 (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_FEDERATION'),
 10)
ON CONFLICT (parent_group_id, child_group_id) DO NOTHING;

-- ================================
-- 5. ПРЕДСТАВЛЕНИЕ: Все связи групп
-- ================================

CREATE OR REPLACE VIEW v_group_relationships AS
SELECT 
    igr.id,
    
    -- Родительская группа
    pg.id as parent_id,
    pg.code as parent_code,
    pg.name_ru as parent_name,
    
    -- Дочерняя группа
    cg.id as child_id,
    cg.code as child_code,
    cg.name_ru as child_name,
    
    igr.sort_order,
    igr.is_active
FROM indicator_group_relationships igr
JOIN indicator_groups_catalog pg ON pg.id = igr.parent_group_id
JOIN indicator_groups_catalog cg ON cg.id = igr.child_group_id
WHERE igr.is_active = TRUE
ORDER BY pg.name_ru, igr.sort_order, cg.name_ru;

COMMENT ON VIEW v_group_relationships IS 'Все активные связи между группами индикаторов';

-- ================================
-- 6. ФУНКЦИЯ: Получить все родительские группы
-- ================================

CREATE OR REPLACE FUNCTION get_parent_groups(p_group_id INTEGER)
RETURNS TABLE (
    group_id INTEGER,
    group_code VARCHAR,
    group_name VARCHAR,
    level INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE parent_tree AS (
        -- Прямые родители
        SELECT 
            igr.parent_group_id as group_id,
            ig.code as group_code,
            ig.name_ru as group_name,
            1 as level
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.parent_group_id
        WHERE igr.child_group_id = p_group_id
          AND igr.is_active = TRUE
        
        UNION ALL
        
        -- Родители родителей
        SELECT 
            igr.parent_group_id,
            ig.code,
            ig.name_ru,
            pt.level + 1
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.parent_group_id
        JOIN parent_tree pt ON pt.group_id = igr.child_group_id
        WHERE igr.is_active = TRUE
          AND pt.level < 10  -- Ограничение глубины
    )
    SELECT DISTINCT * FROM parent_tree
    ORDER BY level, group_name;
END;
$$;

COMMENT ON FUNCTION get_parent_groups IS 'Получает все родительские группы (включая родителей родителей)';

-- ================================
-- 7. ФУНКЦИЯ: Получить все дочерние группы
-- ================================

CREATE OR REPLACE FUNCTION get_child_groups(p_group_id INTEGER)
RETURNS TABLE (
    group_id INTEGER,
    group_code VARCHAR,
    group_name VARCHAR,
    level INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE child_tree AS (
        -- Прямые потомки
        SELECT 
            igr.child_group_id as group_id,
            ig.code as group_code,
            ig.name_ru as group_name,
            1 as level
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.child_group_id
        WHERE igr.parent_group_id = p_group_id
          AND igr.is_active = TRUE
        
        UNION ALL
        
        -- Потомки потомков
        SELECT 
            igr.child_group_id,
            ig.code,
            ig.name_ru,
            ct.level + 1
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.child_group_id
        JOIN child_tree ct ON ct.group_id = igr.parent_group_id
        WHERE igr.is_active = TRUE
          AND ct.level < 10  -- Ограничение глубины
    )
    SELECT DISTINCT * FROM child_tree
    ORDER BY level, group_name;
END;
$$;

COMMENT ON FUNCTION get_child_groups IS 'Получает все дочерние группы (включая потомков потомков)';

-- ================================
-- 8. ФУНКЦИЯ: Получить полное дерево группы
-- ================================

CREATE OR REPLACE FUNCTION get_group_tree(p_group_id INTEGER)
RETURNS TABLE (
    group_id INTEGER,
    group_code VARCHAR,
    group_name VARCHAR,
    path TEXT,
    level INTEGER,
    is_current BOOLEAN
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE group_tree AS (
        -- Корень (текущая группа)
        SELECT 
            ig.id as group_id,
            ig.code as group_code,
            ig.name_ru as group_name,
            ig.name_ru::TEXT as path,
            0 as level,
            TRUE as is_current
        FROM indicator_groups_catalog ig
        WHERE ig.id = p_group_id
        
        UNION ALL
        
        -- Дочерние группы
        SELECT 
            igr.child_group_id,
            ig.code,
            ig.name_ru,
            gt.path || ' > ' || ig.name_ru,
            gt.level + 1,
            FALSE
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.child_group_id
        JOIN group_tree gt ON gt.group_id = igr.parent_group_id
        WHERE igr.is_active = TRUE
          AND gt.level < 10
    )
    SELECT * FROM group_tree
    ORDER BY level, group_name;
END;
$$;

COMMENT ON FUNCTION get_group_tree IS 'Получает полное дерево группы (текущая группа + все потомки)';

-- ================================
-- 9. ПРЕДСТАВЛЕНИЕ: Индикаторы с учетом связей групп
-- ================================

CREATE OR REPLACE VIEW v_indicators_with_group_paths AS
WITH RECURSIVE group_paths AS (
    -- Прямая связь индикатора с группой
    SELECT 
        icg.indicator_catalog_id,
        icg.group_catalog_id,
        ig.code as group_code,
        ig.name_ru as group_name,
        ig.name_ru::TEXT as path,
        0 as level
    FROM indicator_catalog_groups icg
    JOIN indicator_groups_catalog ig ON ig.id = icg.group_catalog_id
    
    UNION ALL
    
    -- Родительские группы
    SELECT 
        gp.indicator_catalog_id,
        igr.parent_group_id,
        ig.code,
        ig.name_ru,
        ig.name_ru || ' > ' || gp.path,
        gp.level + 1
    FROM group_paths gp
    JOIN indicator_group_relationships igr ON igr.child_group_id = gp.group_catalog_id
    JOIN indicator_groups_catalog ig ON ig.id = igr.parent_group_id
    WHERE igr.is_active = TRUE
      AND gp.level < 10
)
SELECT 
    ic.id as indicator_id,
    ic.code as indicator_code,
    ic.name_ru as indicator_name,
    gp.group_catalog_id,
    gp.group_code,
    gp.group_name,
    gp.path,
    gp.level
FROM indicator_catalog ic
JOIN group_paths gp ON gp.indicator_catalog_id = ic.id
ORDER BY ic.code, gp.level DESC, gp.path;

COMMENT ON VIEW v_indicators_with_group_paths IS 'Индикаторы со всеми путями групп (включая родительские)';

-- ================================
-- 10. ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
-- ================================

-- Пример 1: Какие родительские группы у "Маркетинг"?
/*
SELECT * FROM get_parent_groups(
    (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING')
);

Результат:
group_id | group_code           | group_name                       | level
---------|----------------------|----------------------------------|-------
    5    | professional_sport   | Профессиональный спорт          | 1
    2    | regional_general     | Общие региональные показатели   | 1
*/

-- Пример 2: Какие дочерние группы у "Профессиональный спорт"?
/*
SELECT * FROM get_child_groups(
    (SELECT id FROM indicator_groups_catalog WHERE code = 'professional_sport')
);

Результат:
group_id | group_code           | group_name    | level
---------|----------------------|---------------|-------
   11    | UNIVERSAL_MARKETING  | Маркетинг     | 1
*/

-- Пример 3: Полное дерево "Профессиональный спорт"
/*
SELECT 
    REPEAT('  ', level) || group_name as hierarchy,
    path
FROM get_group_tree(
    (SELECT id FROM indicator_groups_catalog WHERE code = 'professional_sport')
);

Результат:
hierarchy                      | path
-------------------------------|----------------------------------
Профессиональный спорт         | Профессиональный спорт
  Маркетинг                    | Профессиональный спорт > Маркетинг
*/

-- Пример 4: Все связи групп
/*
SELECT 
    parent_name,
    child_name,
    sort_order
FROM v_group_relationships
ORDER BY parent_name, sort_order;

Результат:
parent_name                     | child_name | sort_order
--------------------------------|------------|------------
Общие региональные показатели   | Маркетинг  | 20
Общие региональные показатели   | Федерация  | 10
Профессиональный спорт          | Маркетинг  | 10
*/

-- Пример 5: Индикатор "Наличие сайта" в каких группах?
/*
SELECT DISTINCT
    group_name,
    path,
    level
FROM v_indicators_with_group_paths
WHERE indicator_code = 'MARKETING_WEBSITE'
ORDER BY level DESC, path;

Результат:
group_name                      | path                                                    | level
--------------------------------|---------------------------------------------------------|-------
Профессиональный спорт          | Профессиональный спорт > Маркетинг                     | 1
Общие региональные показатели   | Общие региональные показатели > Маркетинг              | 1
Маркетинг                       | Маркетинг                                              | 0
*/

-- ================================
-- 11. МИГРАЦИЯ СУЩЕСТВУЮЩИХ ДАННЫХ
-- ================================

-- Если у вас уже есть группы с parent_id, можно мигрировать их в новую систему
/*
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order)
SELECT 
    parent_id,
    id,
    sort_order
FROM indicator_groups_catalog
WHERE parent_id IS NOT NULL
ON CONFLICT (parent_group_id, child_group_id) DO NOTHING;
*/

-- ================================
-- 12. ФУНКЦИЯ: Добавить связь с проверкой цикла
-- ================================

CREATE OR REPLACE FUNCTION add_group_relationship(
    p_parent_code VARCHAR,
    p_child_code VARCHAR,
    p_sort_order INTEGER DEFAULT 0
)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    v_parent_id INTEGER;
    v_child_id INTEGER;
    v_result TEXT;
BEGIN
    -- Получаем ID групп
    SELECT id INTO v_parent_id FROM indicator_groups_catalog WHERE code = p_parent_code;
    SELECT id INTO v_child_id FROM indicator_groups_catalog WHERE code = p_child_code;
    
    IF v_parent_id IS NULL THEN
        RETURN 'ERROR: Родительская группа ' || p_parent_code || ' не найдена';
    END IF;
    
    IF v_child_id IS NULL THEN
        RETURN 'ERROR: Дочерняя группа ' || p_child_code || ' не найдена';
    END IF;
    
    -- Проверяем цикл
    IF check_group_cycle(v_parent_id, v_child_id) THEN
        RETURN 'ERROR: Создание связи приведет к циклической зависимости';
    END IF;
    
    -- Добавляем связь
    INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order)
    VALUES (v_parent_id, v_child_id, p_sort_order)
    ON CONFLICT (parent_group_id, child_group_id) DO UPDATE
    SET sort_order = p_sort_order;
    
    RETURN 'SUCCESS: Связь создана между ' || p_parent_code || ' и ' || p_child_code;
END;
$$;

COMMENT ON FUNCTION add_group_relationship IS 'Безопасно добавляет связь между группами с проверкой циклов';

-- Пример использования:
/*
SELECT add_group_relationship('professional_sport', 'UNIVERSAL_MARKETING', 10);
SELECT add_group_relationship('regional_general', 'UNIVERSAL_MARKETING', 20);
*/

-- ================================
-- 13. ПРЕДСТАВЛЕНИЕ: Граф групп для визуализации
-- ================================

CREATE OR REPLACE VIEW v_group_graph AS
SELECT 
    igr.id,
    pg.code as from_code,
    pg.name_ru as from_name,
    cg.code as to_code,
    cg.name_ru as to_name,
    igr.sort_order,
    'parent_child' as relationship_type
FROM indicator_group_relationships igr
JOIN indicator_groups_catalog pg ON pg.id = igr.parent_group_id
JOIN indicator_groups_catalog cg ON cg.id = igr.child_group_id
WHERE igr.is_active = TRUE;

COMMENT ON VIEW v_group_graph IS 'Граф связей групп для визуализации (например, в GraphViz)';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_group_relationships IS 
'Связи между группами индикаторов (many-to-many). 
Позволяет одной группе принадлежать нескольким родительским группам.
Например, "Маркетинг" может быть и в "Профессиональный спорт" и в "Общие региональные показатели"';

-- ================================
-- ПРИМЕРЫ РЕАЛЬНЫХ КЕЙСОВ
-- ================================

/*
КЕЙС 1: Маркетинг важен везде
-------------------------------
Группа "Маркетинг" должна отображаться в:
- Профессиональный спорт (маркетинг клубов)
- Общие региональные показатели (маркетинг федерации)
- Массовый спорт (маркетинг любительских лиг)

Решение:
SELECT add_group_relationship('professional_sport', 'UNIVERSAL_MARKETING', 10);
SELECT add_group_relationship('regional_general', 'UNIVERSAL_MARKETING', 20);
SELECT add_group_relationship('mass_sport', 'UNIVERSAL_MARKETING', 30);


КЕЙС 2: Инфраструктура в разных контекстах
-------------------------------------------
Группа "Спортивные объекты" нужна в:
- Общие региональные показатели (все объекты региона)
- Профессиональный спорт (арены для проф команд)
- Резерв (базы подготовки)

Решение:
SELECT add_group_relationship('regional_general', 'infrastructure', 10);
SELECT add_group_relationship('professional_sport', 'infrastructure', 20);
SELECT add_group_relationship('reserve', 'infrastructure', 30);


КЕЙС 3: Финансы на разных уровнях
----------------------------------
Группа "Финансы" важна для:
- Федерация (бюджет федерации)
- Профессиональный спорт (бюджеты клубов)

Решение:
SELECT add_group_relationship('UNIVERSAL_FEDERATION', 'UNIVERSAL_FINANCE', 10);
SELECT add_group_relationship('professional_sport', 'UNIVERSAL_FINANCE', 20);
*/
-- ================================
-- Блок 13: Система автогенерации критериев
-- ================================
-- Создание множества критериев из одного шаблона на основе комбинаций параметров

-- ================================
-- 1. ШАБЛОНЫ ГЕНЕРАЦИИ
-- ================================

CREATE TABLE indicator_generation_templates (
    id SERIAL PRIMARY KEY,
    name_ru VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Базовые параметры
    category_id INTEGER REFERENCES indicator_categories(id),
    sport_id INTEGER REFERENCES sports(id),
    value_type VARCHAR(20) NOT NULL DEFAULT 'number',
    measurement_unit_id INTEGER REFERENCES measurement_units(id),
    
    -- Базовый вес
    base_weight NUMERIC(10,4) DEFAULT 1.0,
    use_population BOOLEAN DEFAULT FALSE,
    
    -- Шаблоны для генерации
    name_pattern TEXT NOT NULL,           -- "{place} место {event} {age} ({gender})"
    code_pattern VARCHAR(200) NOT NULL,   -- "BBL_{event}_{age}_{gender}_PLACE_{place}"
    description_pattern TEXT,
    
    -- Конфигурация генерации (JSON)
    generation_config JSONB DEFAULT '{}'::jsonb,
    
    -- Статус
    is_active BOOLEAN DEFAULT TRUE,
    last_generated_at TIMESTAMP,
    generated_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_igt_value_type CHECK (value_type IN ('number', 'boolean', 'decimal', 'text'))
);

CREATE INDEX idx_igt_category ON indicator_generation_templates(category_id);
CREATE INDEX idx_igt_sport ON indicator_generation_templates(sport_id);
CREATE INDEX idx_igt_active ON indicator_generation_templates(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE indicator_generation_templates IS 'Шаблоны для автоматической генерации множества критериев';

-- ================================
-- 2. ПАРАМЕТРЫ ГЕНЕРАЦИИ
-- ================================

CREATE TABLE template_generation_params (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL REFERENCES indicator_generation_templates(id) ON DELETE CASCADE,
    
    -- Тип параметра
    param_type VARCHAR(50) NOT NULL,  -- 'gender', 'age_group', 'discipline', 'event', 'place', 'custom'
    param_name VARCHAR(100) NOT NULL, -- Имя для подстановки в шаблон
    
    -- Значения параметра (JSON массив ID или значений)
    param_values JSONB NOT NULL,      -- [1, 2] для gender_id или ['1', '2', '3'] для мест
    
    -- Формула веса (опционально)
    weight_formula JSONB,             -- {"1": "* 1.0", "2": "* 0.6", "3": "* 0.4"}
    
    -- Обязательность
    is_required BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tgp_param_type CHECK (param_type IN ('gender', 'age_group', 'discipline', 'event', 'place', 'league', 'custom'))
);

CREATE INDEX idx_tgp_template ON template_generation_params(template_id);
CREATE INDEX idx_tgp_type ON template_generation_params(param_type);

COMMENT ON TABLE template_generation_params IS 'Параметры для генерации критериев (пол, возраст, места и т.д.)';

-- ================================
-- 3. СГЕНЕРИРОВАННЫЕ КРИТЕРИИ
-- ================================

CREATE TABLE generated_indicators (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL REFERENCES indicator_generation_templates(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    
    -- Параметры, с которыми был создан критерий
    generation_params JSONB NOT NULL,  -- {"gender_id": 1, "age_group_id": 4, "place": "1", ...}
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(template_id, indicator_catalog_id)
);

CREATE INDEX idx_gi_template ON generated_indicators(template_id);
CREATE INDEX idx_gi_indicator ON generated_indicators(indicator_catalog_id);

COMMENT ON TABLE generated_indicators IS 'Связь сгенерированных критериев с шаблонами';

-- ================================
-- 4. ФУНКЦИЯ: Генерация критериев из шаблона
-- ================================

CREATE OR REPLACE FUNCTION generate_indicators_from_template_v2(
    p_template_id INTEGER,
    p_overwrite BOOLEAN DEFAULT FALSE
)
RETURNS TABLE (
    action TEXT,
    indicator_code VARCHAR,
    indicator_name TEXT,
    params JSONB
) LANGUAGE plpgsql AS $$
DECLARE
    v_template RECORD;
    v_param RECORD;
    v_combinations JSONB[];
    v_combo JSONB;
    v_code VARCHAR;
    v_name TEXT;
    v_desc TEXT;
    v_weight NUMERIC;
    v_indicator_id INTEGER;
    v_gender_name TEXT;
    v_age_name TEXT;
    v_discipline_name TEXT;
    v_event_name TEXT;
    v_param_value TEXT;
BEGIN
    -- Получаем шаблон
    SELECT * INTO v_template
    FROM indicator_generation_templates
    WHERE id = p_template_id AND is_active = TRUE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Шаблон % не найден или неактивен', p_template_id;
    END IF;
    
    -- Получаем все комбинации параметров
    WITH RECURSIVE param_combinations AS (
        -- Начальная комбинация (пустая)
        SELECT 
            1 as level,
            '{}'::jsonb as combo
        
        UNION ALL
        
        -- Добавляем следующий параметр
        SELECT 
            pc.level + 1,
            pc.combo || jsonb_build_object(
                tgp.param_name,
                value
            )
        FROM param_combinations pc
        CROSS JOIN template_generation_params tgp
        CROSS JOIN LATERAL jsonb_array_elements_text(tgp.param_values) as value
        WHERE tgp.template_id = p_template_id
          AND pc.level = (
              SELECT COUNT(*) 
              FROM template_generation_params 
              WHERE template_id = p_template_id 
                AND sort_order < tgp.sort_order
          )
          AND pc.level < (
              SELECT COUNT(*) 
              FROM template_generation_params 
              WHERE template_id = p_template_id
          ) + 1
    )
    SELECT array_agg(combo) INTO v_combinations
    FROM param_combinations
    WHERE level = (
        SELECT COUNT(*) + 1
        FROM template_generation_params
        WHERE template_id = p_template_id
    );
    
    -- Генерируем критерии для каждой комбинации
    FOREACH v_combo IN ARRAY v_combinations LOOP
        -- Подготавливаем подстановки
        v_code := v_template.code_pattern;
        v_name := v_template.name_pattern;
        v_desc := COALESCE(v_template.description_pattern, '');
        v_weight := v_template.base_weight;
        
        -- Получаем названия для подстановки
        IF v_combo ? 'gender' THEN
            SELECT name_ru INTO v_gender_name 
            FROM genders 
            WHERE id = (v_combo->>'gender')::INTEGER;
            
            v_code := REPLACE(v_code, '{gender}', UPPER(SUBSTRING(v_gender_name FROM 1 FOR 1)));
            v_name := REPLACE(v_name, '{gender}', v_gender_name);
        END IF;
        
        IF v_combo ? 'age_group' THEN
            SELECT name_ru, code INTO v_age_name 
            FROM age_groups 
            WHERE id = (v_combo->>'age_group')::INTEGER;
            
            v_code := REPLACE(v_code, '{age}', UPPER(v_age_name));
            v_name := REPLACE(v_name, '{age}', v_age_name);
        END IF;
        
        IF v_combo ? 'discipline' THEN
            SELECT name_ru INTO v_discipline_name 
            FROM disciplines 
            WHERE id = (v_combo->>'discipline')::INTEGER;
            
            v_code := REPLACE(v_code, '{discipline}', UPPER(REPLACE(v_discipline_name, ' ', '_')));
            v_name := REPLACE(v_name, '{discipline}', v_discipline_name);
        END IF;
        
        IF v_combo ? 'event' THEN
            v_event_name := v_combo->>'event';
            v_code := REPLACE(v_code, '{event}', UPPER(v_event_name));
            v_name := REPLACE(v_name, '{event}', v_event_name);
        END IF;
        
        IF v_combo ? 'place' THEN
            v_param_value := v_combo->>'place';
            v_code := REPLACE(v_code, '{place}', v_param_value);
            v_name := REPLACE(v_name, '{place}', v_param_value);
            
            -- Применяем формулу веса для места
            FOR v_param IN 
                SELECT * FROM template_generation_params 
                WHERE template_id = p_template_id 
                  AND param_name = 'place'
                  AND weight_formula IS NOT NULL
            LOOP
                IF v_param.weight_formula ? v_param_value THEN
                    EXECUTE 'SELECT ' || v_weight || ' ' || (v_param.weight_formula->>v_param_value)
                    INTO v_weight;
                END IF;
            END LOOP;
        END IF;
        
        -- Проверяем существование
        SELECT id INTO v_indicator_id 
        FROM indicator_catalog 
        WHERE code = v_code;
        
        IF v_indicator_id IS NOT NULL THEN
            IF p_overwrite THEN
                UPDATE indicator_catalog SET
                    name_ru = v_name,
                    description = v_desc,
                    default_weight = v_weight,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = v_indicator_id;
                
                action := 'UPDATE';
                indicator_code := v_code;
                indicator_name := v_name;
                params := v_combo;
                RETURN NEXT;
            ELSE
                action := 'SKIP';
                indicator_code := v_code;
                indicator_name := v_name;
                params := v_combo;
                RETURN NEXT;
            END IF;
        ELSE
            -- Создаем новый индикатор
            INSERT INTO indicator_catalog (
                category_id,
                sport_id,
                code,
                name_ru,
                description,
                value_type,
                measurement_unit_id,
                default_weight,
                use_population
            ) VALUES (
                v_template.category_id,
                v_template.sport_id,
                v_code,
                v_name,
                v_desc,
                v_template.value_type,
                v_template.measurement_unit_id,
                v_weight,
                v_template.use_population
            ) RETURNING id INTO v_indicator_id;
            
            -- Записываем связь
            INSERT INTO generated_indicators (
                template_id,
                indicator_catalog_id,
                generation_params
            ) VALUES (
                p_template_id,
                v_indicator_id,
                v_combo
            );
            
            action := 'INSERT';
            indicator_code := v_code;
            indicator_name := v_name;
            params := v_combo;
            RETURN NEXT;
        END IF;
    END LOOP;
    
    -- Обновляем статистику шаблона
    UPDATE indicator_generation_templates
    SET last_generated_at = CURRENT_TIMESTAMP,
        generated_count = (
            SELECT COUNT(*) 
            FROM generated_indicators 
            WHERE template_id = p_template_id
        )
    WHERE id = p_template_id;
END;
$$;

COMMENT ON FUNCTION generate_indicators_from_template_v2 IS 'Генерирует критерии из шаблона на основе комбинаций параметров';

-- ================================
-- 5. ПРИМЕРЫ ШАБЛОНОВ
-- ================================

-- Пример 1: Призовые места в чемпионатах
INSERT INTO indicator_generation_templates (
    name_ru,
    description,
    category_id,
    sport_id,
    value_type,
    measurement_unit_id,
    base_weight,
    name_pattern,
    code_pattern,
    description_pattern
) VALUES (
    'Призовые места в чемпионатах (баскетбол)',
    'Автогенерация критериев для призовых мест в различных чемпионатах',
    (SELECT id FROM indicator_categories WHERE code = 'achievements'),
    10,  -- Баскетбол
    'number',
    (SELECT id FROM measurement_units WHERE code = 'places'),
    5.0,
    '{place} место {event} {age} ({gender}) {discipline}',
    'BBL_{event}_{age}_{gender}_{discipline}_PLACE_{place}',
    'Призовое место в чемпионате'
) RETURNING id;  -- Допустим, вернул id=1

-- Параметры для примера 1
INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
-- Пол
(1, 'gender', 'gender', '[1, 2]'::jsonb, NULL, 1),

-- Возраст
(1, 'age_group', 'age', '[1, 2, 3, 4, 5]'::jsonb, 
 '{"1": "* 0.8", "2": "* 0.9", "3": "* 1.0", "4": "* 1.1", "5": "* 1.2"}'::jsonb, 2),

-- Дисциплина
(1, 'discipline', 'discipline', '[219, 220]'::jsonb, NULL, 3),

-- Событие
(1, 'custom', 'event', '["ЧР", "ПР", "КР"]'::jsonb, 
 '{"ЧР": "* 1.2", "ПР": "* 1.0", "КР": "* 0.9"}'::jsonb, 4),

-- Место
(1, 'place', 'place', '["1", "2", "3"]'::jsonb, 
 '{"1": "* 1.0", "2": "* 0.6", "3": "* 0.4"}'::jsonb, 5);

-- Генерация
-- SELECT * FROM generate_indicators_from_template_v2(1, FALSE);
-- Создаст: 2 пола × 5 возрастов × 2 дисциплины × 3 события × 3 места = 180 критериев!

-- ================================
-- 6. ПРЕДСТАВЛЕНИЯ
-- ================================

-- Шаблоны с количеством сгенерированных критериев
CREATE OR REPLACE VIEW v_generation_templates AS
SELECT 
    igt.id,
    igt.name_ru,
    igt.description,
    icat.name_ru as category_name,
    s.name_ru as sport_name,
    igt.base_weight,
    igt.generated_count,
    igt.last_generated_at,
    igt.is_active,
    
    -- Количество параметров
    (SELECT COUNT(*) FROM template_generation_params WHERE template_id = igt.id) as params_count,
    
    -- Потенциальное количество комбинаций
    (SELECT 
        CASE 
            WHEN COUNT(*) = 0 THEN 0
            ELSE (
                SELECT EXP(SUM(LN(jsonb_array_length(param_values))))::INTEGER
                FROM template_generation_params
                WHERE template_id = igt.id
            )
        END
     FROM template_generation_params WHERE template_id = igt.id
    ) as potential_combinations
    
FROM indicator_generation_templates igt
LEFT JOIN indicator_categories icat ON icat.id = igt.category_id
LEFT JOIN sports s ON s.id = igt.sport_id
ORDER BY igt.created_at DESC;

COMMENT ON VIEW v_generation_templates IS 'Шаблоны генерации с статистикой';

-- Сгенерированные критерии с параметрами
CREATE OR REPLACE VIEW v_generated_indicators AS
SELECT 
    gi.id,
    igt.name_ru as template_name,
    ic.code as indicator_code,
    ic.name_ru as indicator_name,
    ic.default_weight,
    gi.generation_params,
    gi.created_at
FROM generated_indicators gi
JOIN indicator_generation_templates igt ON igt.id = gi.template_id
JOIN indicator_catalog ic ON ic.id = gi.indicator_catalog_id
ORDER BY igt.name_ru, ic.code;

COMMENT ON VIEW v_generated_indicators IS 'Сгенерированные критерии с параметрами';

-- ================================
-- 7. ФУНКЦИЯ: Удаление сгенерированных критериев
-- ================================

CREATE OR REPLACE FUNCTION delete_generated_indicators(p_template_id INTEGER)
RETURNS TABLE (
    deleted_count INTEGER,
    indicator_codes TEXT[]
) LANGUAGE plpgsql AS $$
DECLARE
    v_codes TEXT[];
    v_count INTEGER;
BEGIN
    -- Собираем коды удаляемых критериев
    SELECT array_agg(ic.code) INTO v_codes
    FROM generated_indicators gi
    JOIN indicator_catalog ic ON ic.id = gi.indicator_catalog_id
    WHERE gi.template_id = p_template_id;
    
    -- Удаляем критерии
    DELETE FROM indicator_catalog
    WHERE id IN (
        SELECT indicator_catalog_id 
        FROM generated_indicators 
        WHERE template_id = p_template_id
    );
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    -- Обновляем статистику шаблона
    UPDATE indicator_generation_templates
    SET generated_count = 0,
        last_generated_at = NULL
    WHERE id = p_template_id;
    
    deleted_count := v_count;
    indicator_codes := v_codes;
    RETURN NEXT;
END;
$$;

COMMENT ON FUNCTION delete_generated_indicators IS 'Удаляет все критерии, сгенерированные из шаблона';

-- ================================
-- 8. ФУНКЦИЯ: Предпросмотр генерации
-- ================================

CREATE OR REPLACE FUNCTION preview_generation(p_template_id INTEGER, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
    indicator_code VARCHAR,
    indicator_name TEXT,
    weight NUMERIC,
    params JSONB
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (result).indicator_code,
        (result).indicator_name,
        ic.default_weight,
        (result).params
    FROM generate_indicators_from_template_v2(p_template_id, FALSE) as result
    LEFT JOIN indicator_catalog ic ON ic.code = (result).indicator_code
    LIMIT p_limit;
END;
$$;

COMMENT ON FUNCTION preview_generation IS 'Предпросмотр первых N критериев, которые будут сгенерированы';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_generation_templates IS 
'Шаблоны для автоматической генерации множества критериев.
Один шаблон может создать сотни критериев на основе комбинаций параметров.
Пример: 2 пола × 5 возрастов × 3 места = 30 критериев из одного шаблона';

COMMENT ON TABLE template_generation_params IS 
'Параметры для генерации (пол, возраст, места и т.д.).
Система создает декартово произведение всех параметров.
Поддерживает формулы для расчета весов';

COMMENT ON TABLE generated_indicators IS 
'Связь сгенерированных критериев с шаблонами.
Позволяет отслеживать, какие критерии из какого шаблона созданы';
-- ================================
-- Блок 25: Динамические таблицы - Workspace и таблицы
-- ================================
-- Создание слоя динамических таблиц для гибкого BI
-- Интеграция с существующей системой через reference_links

-- ================================
-- 1. ПОЛЬЗОВАТЕЛИ (если еще нет)
-- ================================

-- Проверяем существование таблицы users
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX idx_users_organization ON users(organization_id);
        CREATE INDEX idx_users_email ON users(email);
        CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = TRUE;
        
        COMMENT ON TABLE users IS 'Пользователи системы с привязкой к организациям';
    END IF;
END $$;

-- ================================
-- 2. WORKSPACE (Рабочие пространства)
-- ================================

CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Контекст workspace
    season_id INTEGER REFERENCES seasons(id) ON DELETE SET NULL,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    
    -- Владелец
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Метаданные
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Статус
    is_active BOOLEAN DEFAULT TRUE,
    is_template BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workspaces_season ON workspaces(season_id);
CREATE INDEX idx_workspaces_organization ON workspaces(organization_id);
CREATE INDEX idx_workspaces_sport ON workspaces(sport_id);
CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);
CREATE INDEX idx_workspaces_active ON workspaces(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE workspaces IS 'Рабочие пространства для организации динамических таблиц';
COMMENT ON COLUMN workspaces.is_template IS 'Шаблон workspace для копирования';

-- ================================
-- 3. ГРУППЫ ТАБЛИЦ В WORKSPACE
-- ================================

CREATE TABLE IF NOT EXISTS workspace_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Визуальное оформление
    color VARCHAR(20),
    icon VARCHAR(50),
    
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workspace_groups_workspace ON workspace_groups(workspace_id);
CREATE INDEX idx_workspace_groups_sort ON workspace_groups(workspace_id, sort_order);

COMMENT ON TABLE workspace_groups IS 'Группы таблиц внутри workspace для организации';

-- ================================
-- 4. ДИНАМИЧЕСКИЕ ТАБЛИЦЫ
-- ================================

CREATE TABLE IF NOT EXISTS dynamic_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    group_id UUID REFERENCES workspace_groups(id) ON DELETE SET NULL,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Размеры
    row_count INTEGER DEFAULT 0,
    column_count INTEGER DEFAULT 0,
    
    -- Тип таблицы
    is_reference BOOLEAN DEFAULT FALSE,
    reference_type VARCHAR(50),  -- 'user_defined', 'system_linked', 'calculated'
    
    -- Метаданные
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Владелец
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dynamic_tables_workspace ON dynamic_tables(workspace_id);
CREATE INDEX idx_dynamic_tables_group ON dynamic_tables(group_id);
CREATE INDEX idx_dynamic_tables_created_by ON dynamic_tables(created_by);

COMMENT ON TABLE dynamic_tables IS 'Динамические таблицы пользователей';
COMMENT ON COLUMN dynamic_tables.is_reference IS 'Таблица-справочник (только для чтения из других таблиц)';

-- ================================
-- 5. ВЕРСИИ ТАБЛИЦ
-- ================================

CREATE TABLE IF NOT EXISTS table_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    
    -- Структура колонок
    columns JSONB NOT NULL,
    -- [
    --   {
    --     "index": 0,
    --     "name": "Регион",
    --     "type": "reference",
    --     "reference_table": "regions",
    --     "width": 200,
    --     "is_locked": false
    --   },
    --   {
    --     "index": 1,
    --     "name": "2024",
    --     "type": "number",
    --     "metadata": {"year": 2024}
    --   }
    -- ]
    
    -- Метаданные версии
    change_description TEXT,
    is_frozen BOOLEAN DEFAULT FALSE,
    frozen_at TIMESTAMP,
    
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(table_id, version_number)
);

CREATE INDEX idx_table_versions_table ON table_versions(table_id);
CREATE INDEX idx_table_versions_created_by ON table_versions(created_by);

COMMENT ON TABLE table_versions IS 'Версии таблиц для истории изменений структуры';
COMMENT ON COLUMN table_versions.is_frozen IS 'Замороженная версия (нельзя изменять)';

-- ================================
-- 6. ЯЧЕЙКИ (SPARSE STORAGE)
-- ================================

CREATE TABLE IF NOT EXISTS table_cells (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    
    -- Данные ячейки (JSONB для гибкости)
    cell_data JSONB NOT NULL,
    -- {
    --   "value": 61,
    --   "type": "reference",
    --   "display_value": "Иркутская область",
    --   "reference_data": {"code": "RU-IRK", "federal_district_id": 7},
    --   "style": {"bold": true, "color": "#FF0000"}
    -- }
    
    -- Защита ячейки
    is_locked BOOLEAN DEFAULT FALSE,
    locked_by UUID REFERENCES users(id) ON DELETE SET NULL,
    lock_reason TEXT,
    locked_at TIMESTAMP,
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(version_id, row_index, col_index)
);

CREATE INDEX idx_table_cells_version ON table_cells(version_id);
CREATE INDEX idx_table_cells_position ON table_cells(version_id, row_index, col_index);
CREATE INDEX idx_table_cells_locked ON table_cells(is_locked) WHERE is_locked = TRUE;
CREATE INDEX idx_table_cells_data_type ON table_cells((cell_data->>'type'));

COMMENT ON TABLE table_cells IS 'Ячейки таблиц (sparse storage - только заполненные)';
COMMENT ON COLUMN table_cells.cell_data IS 'JSONB с данными, типом, стилем и метаданными';

-- ================================
-- 7. ШАБЛОНЫ ФОРМУЛ
-- ================================

CREATE TABLE IF NOT EXISTS formula_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    
    -- Диапазон применения
    start_row INTEGER NOT NULL,
    end_row INTEGER NOT NULL,
    start_col INTEGER NOT NULL,
    end_col INTEGER NOT NULL,
    
    -- Формула (с подстановкой {row}, {col})
    formula_template TEXT NOT NULL,
    -- Примеры:
    -- "='Население регионов'!C{row}"
    -- "=D{row}*'Коэффициенты'!C{row}"
    -- "=SUM(B{row}:E{row})"
    
    priority INTEGER DEFAULT 0,
    
    -- Защита формулы
    is_protected BOOLEAN DEFAULT FALSE,
    protection_level VARCHAR(20) DEFAULT 'warning',  -- 'locked', 'admin_only', 'warning'
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_ft_range CHECK (start_row <= end_row AND start_col <= end_col),
    CONSTRAINT chk_ft_protection_level CHECK (protection_level IN ('locked', 'admin_only', 'warning'))
);

CREATE INDEX idx_formula_templates_version ON formula_templates(version_id);
CREATE INDEX idx_formula_templates_range ON formula_templates(version_id, start_row, end_row, start_col, end_col);
CREATE INDEX idx_formula_templates_protected ON formula_templates(is_protected) WHERE is_protected = TRUE;

COMMENT ON TABLE formula_templates IS 'Шаблоны формул для диапазонов ячеек';
COMMENT ON COLUMN formula_templates.formula_template IS 'Формула с подстановкой {row} и {col}';
COMMENT ON COLUMN formula_templates.protection_level IS 'Уровень защиты: locked (нельзя менять), admin_only (только админ), warning (предупреждение)';

-- ================================
-- 8. СВЯЗИ МЕЖДУ ТАБЛИЦАМИ
-- ================================

CREATE TABLE IF NOT EXISTS table_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    source_table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    source_version_id UUID REFERENCES table_versions(id) ON DELETE SET NULL,
    target_table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    
    link_type VARCHAR(50) NOT NULL,  -- 'cell_reference', 'lookup_reference', 'aggregation', 'shared_keys'
    link_metadata JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "formula_pattern": "='Население регионов'!C{row}",
    --   "source_column": "C",
    --   "target_column": "B"
    -- }
    
    -- Заморозка связи
    is_frozen BOOLEAN DEFAULT FALSE,
    frozen_at_version INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tl_link_type CHECK (link_type IN ('cell_reference', 'lookup_reference', 'aggregation', 'shared_keys'))
);

CREATE INDEX idx_table_links_source ON table_links(source_table_id);
CREATE INDEX idx_table_links_target ON table_links(target_table_id);
CREATE INDEX idx_table_links_type ON table_links(link_type);

COMMENT ON TABLE table_links IS 'Связи между динамическими таблицами';
COMMENT ON COLUMN table_links.is_frozen IS 'Замороженная связь (использует конкретную версию)';

-- ================================
-- 9. СВЯЗИ С СУЩЕСТВУЮЩИМИ ТАБЛИЦАМИ
-- ================================

CREATE TABLE IF NOT EXISTS reference_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Динамическая таблица
    dynamic_table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    column_index INTEGER NOT NULL,
    
    -- Системный справочник
    reference_type VARCHAR(50) NOT NULL,  -- 'region', 'organization', 'sport', 'discipline', 'indicator'
    reference_table VARCHAR(100) NOT NULL,  -- 'regions', 'organizations', 'indicator_catalog'
    
    -- Маппинг полей
    mapping_config JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "display_field": "name_ru",
    --   "value_field": "id",
    --   "filter": {"federal_district_id": 7},
    --   "additional_fields": ["code", "federal_district_id"]
    -- }
    
    -- Синхронизация
    auto_sync BOOLEAN DEFAULT TRUE,
    last_synced_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_rl_reference_type CHECK (reference_type IN ('region', 'organization', 'sport', 'discipline', 'indicator', 'event', 'season'))
);

CREATE INDEX idx_reference_links_table ON reference_links(dynamic_table_id);
CREATE INDEX idx_reference_links_type ON reference_links(reference_type);
CREATE INDEX idx_reference_links_auto_sync ON reference_links(auto_sync) WHERE auto_sync = TRUE;

COMMENT ON TABLE reference_links IS 'Связи динамических таблиц с существующими системными справочниками';
COMMENT ON COLUMN reference_links.auto_sync IS 'Автоматическое обновление display_value при изменении справочника';

-- ================================
-- 10. КЕШ ФОРМУЛ
-- ================================

CREATE TABLE IF NOT EXISTS formula_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    
    -- Кешированное значение
    cached_value JSONB,
    
    -- Зависимости
    dependencies JSONB,
    -- [
    --   {"table_id": "...", "version_id": "...", "row": 0, "col": 2},
    --   {"table_id": "...", "version_id": "...", "row": 0, "col": 3}
    -- ]
    
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_valid BOOLEAN DEFAULT TRUE,
    
    UNIQUE(version_id, row_index, col_index)
);

CREATE INDEX idx_formula_cache_version ON formula_cache(version_id);
CREATE INDEX idx_formula_cache_validity ON formula_cache(is_valid) WHERE is_valid = FALSE;

COMMENT ON TABLE formula_cache IS 'Кеш вычисленных значений формул для производительности';
COMMENT ON COLUMN formula_cache.is_valid IS 'FALSE если зависимости изменились';

-- ================================
-- ТРИГГЕРЫ ДЛЯ UPDATED_AT
-- ================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_workspaces_updated_at ON workspaces;
CREATE TRIGGER trg_workspaces_updated_at
    BEFORE UPDATE ON workspaces
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_dynamic_tables_updated_at ON dynamic_tables;
CREATE TRIGGER trg_dynamic_tables_updated_at
    BEFORE UPDATE ON dynamic_tables
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_table_cells_updated_at ON table_cells;
CREATE TRIGGER trg_table_cells_updated_at
    BEFORE UPDATE ON table_cells
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE workspaces IS 
'Рабочие пространства для организации динамических таблиц.
Каждый workspace может быть привязан к сезону, организации и виду спорта.
Пример: "Рейтинг регионов РФБ 2025"';

COMMENT ON TABLE workspace_groups IS 
'Группы таблиц внутри workspace для логической организации.
Пример: "Справочники", "Критерии", "Рейтинги"';

COMMENT ON TABLE dynamic_tables IS 
'Динамические таблицы пользователей.
Могут быть справочными (is_reference=true) или расчетными.
Используют sparse storage - хранятся только заполненные ячейки';

COMMENT ON TABLE table_versions IS 
'Версии таблиц для истории изменений структуры.
Позволяет откатываться к предыдущим версиям';

COMMENT ON TABLE table_cells IS 
'Ячейки таблиц (sparse storage).
Хранятся только заполненные ячейки в JSONB формате.
Поддерживает блокировку на уровне ячейки';

COMMENT ON TABLE formula_templates IS 
'Шаблоны формул для диапазонов ячеек.
Вместо 1000 одинаковых формул - 1 шаблон с подстановкой {row} и {col}';

COMMENT ON TABLE table_links IS 
'Связи между динамическими таблицами.
Отслеживает зависимости для пересчета формул';

COMMENT ON TABLE reference_links IS 
'Связи с существующими системными справочниками.
Позволяет динамическим таблицам ссылаться на regions, indicator_catalog и т.д.';

COMMENT ON TABLE formula_cache IS 
'Кеш вычисленных значений формул.
Инвалидируется при изменении зависимостей';
-- ================================
-- Блок 26: Система прав доступа для динамических таблиц
-- ================================
-- Многоуровневая система прав с поддержкой иерархии организаций

-- ================================
-- 1. РОЛИ
-- ================================

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Права роли
    permissions JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "workspaces": {"create": true, "delete": false},
    --   "tables": {"create": true, "edit": true, "delete": false},
    --   "cells": {"edit": true, "lock": false},
    --   "formulas": {"edit": true, "protect": false},
    --   "permissions": {"manage": false}
    -- }
    
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_roles_code ON roles(code);

COMMENT ON TABLE roles IS 'Роли пользователей с набором прав';

-- Базовые роли
INSERT INTO roles (code, name, description, permissions, is_system) VALUES
('system_admin', 'Системный администратор', 'Полный доступ ко всему', 
 '{"workspaces": {"create": true, "delete": true}, "tables": {"create": true, "edit": true, "delete": true}, "cells": {"edit": true, "lock": true}, "formulas": {"edit": true, "protect": true}, "permissions": {"manage": true}}'::jsonb, 
 TRUE),
 
('workspace_owner', 'Владелец workspace', 'Полный доступ к своему workspace',
 '{"workspaces": {"create": true, "delete": true}, "tables": {"create": true, "edit": true, "delete": true}, "cells": {"edit": true, "lock": true}, "formulas": {"edit": true, "protect": true}, "permissions": {"manage": true}}'::jsonb,
 TRUE),
 
('editor', 'Редактор', 'Может редактировать таблицы и ячейки',
 '{"workspaces": {"create": false, "delete": false}, "tables": {"create": true, "edit": true, "delete": false}, "cells": {"edit": true, "lock": false}, "formulas": {"edit": true, "protect": false}, "permissions": {"manage": false}}'::jsonb,
 TRUE),
 
('viewer', 'Наблюдатель', 'Только просмотр',
 '{"workspaces": {"create": false, "delete": false}, "tables": {"create": false, "edit": false, "delete": false}, "cells": {"edit": false, "lock": false}, "formulas": {"edit": false, "protect": false}, "permissions": {"manage": false}}'::jsonb,
 TRUE)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 2. ПРАВА НА WORKSPACE
-- ================================

CREATE TABLE IF NOT EXISTS workspace_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    
    -- Субъект прав (один из трех)
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Уровень доступа
    permission_level VARCHAR(20) NOT NULL,  -- 'owner', 'editor', 'viewer'
    
    -- Дополнительные права
    can_share BOOLEAN DEFAULT FALSE,
    can_export BOOLEAN DEFAULT TRUE,
    can_create_tables BOOLEAN DEFAULT FALSE,
    
    -- Наследование прав
    inherit_to_tables BOOLEAN DEFAULT TRUE,
    
    granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    CONSTRAINT chk_wp_permission_level CHECK (permission_level IN ('owner', 'editor', 'viewer')),
    CONSTRAINT chk_wp_subject CHECK (
        (user_id IS NOT NULL AND role_id IS NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NOT NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NULL AND organization_id IS NOT NULL)
    )
);

CREATE INDEX idx_workspace_permissions_workspace ON workspace_permissions(workspace_id);
CREATE INDEX idx_workspace_permissions_user ON workspace_permissions(user_id);
CREATE INDEX idx_workspace_permissions_role ON workspace_permissions(role_id);
CREATE INDEX idx_workspace_permissions_organization ON workspace_permissions(organization_id);
CREATE INDEX idx_workspace_permissions_level ON workspace_permissions(permission_level);

COMMENT ON TABLE workspace_permissions IS 'Права доступа к workspace на уровне пользователя, роли или организации';
COMMENT ON COLUMN workspace_permissions.inherit_to_tables IS 'Наследовать права на все таблицы в workspace';

-- ================================
-- 3. ПРАВА НА ТАБЛИЦЫ
-- ================================

CREATE TABLE IF NOT EXISTS table_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    
    -- Субъект прав
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Права
    can_read BOOLEAN DEFAULT TRUE,
    can_write BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    can_lock_cells BOOLEAN DEFAULT FALSE,
    can_edit_formulas BOOLEAN DEFAULT FALSE,
    
    granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    CONSTRAINT chk_tp_subject CHECK (
        (user_id IS NOT NULL AND role_id IS NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NOT NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NULL AND organization_id IS NOT NULL)
    )
);

CREATE INDEX idx_table_permissions_table ON table_permissions(table_id);
CREATE INDEX idx_table_permissions_user ON table_permissions(user_id);
CREATE INDEX idx_table_permissions_role ON table_permissions(role_id);
CREATE INDEX idx_table_permissions_organization ON table_permissions(organization_id);

COMMENT ON TABLE table_permissions IS 'Права доступа к конкретным таблицам';

-- ================================
-- 4. ПРАВА НА ЯЧЕЙКИ (ДИАПАЗОНЫ)
-- ================================

CREATE TABLE IF NOT EXISTS cell_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    
    -- Диапазон ячеек
    start_row INTEGER,
    end_row INTEGER,
    start_col INTEGER,
    end_col INTEGER,
    
    -- Субъект прав
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Права
    can_read BOOLEAN DEFAULT TRUE,
    can_write BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    
    -- Условия доступа (опционально)
    access_condition JSONB,
    -- {
    --   "type": "region_match",
    --   "field": "region_id",
    --   "match": "user.organization.region_id"
    -- }
    
    granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    CONSTRAINT chk_cp_range CHECK (
        (start_row IS NULL AND end_row IS NULL AND start_col IS NULL AND end_col IS NULL) OR
        (start_row IS NOT NULL AND end_row IS NOT NULL AND start_col IS NOT NULL AND end_col IS NOT NULL AND
         start_row <= end_row AND start_col <= end_col)
    ),
    CONSTRAINT chk_cp_subject CHECK (
        (user_id IS NOT NULL AND role_id IS NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NOT NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NULL AND organization_id IS NOT NULL)
    )
);

CREATE INDEX idx_cell_permissions_table ON cell_permissions(table_id);
CREATE INDEX idx_cell_permissions_user ON cell_permissions(user_id);
CREATE INDEX idx_cell_permissions_role ON cell_permissions(role_id);
CREATE INDEX idx_cell_permissions_organization ON cell_permissions(organization_id);
CREATE INDEX idx_cell_permissions_range ON cell_permissions(table_id, start_row, end_row, start_col, end_col);

COMMENT ON TABLE cell_permissions IS 'Права доступа к диапазонам ячеек';
COMMENT ON COLUMN cell_permissions.access_condition IS 'Условия доступа (например, только к своему региону)';

-- ================================
-- 5. ФУНКЦИЯ: Проверка прав на workspace
-- ================================

CREATE OR REPLACE FUNCTION check_workspace_permission(
    p_workspace_id UUID,
    p_user_id UUID,
    p_required_level VARCHAR
)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_user_org_id INTEGER;
    v_parent_org_id INTEGER;
    v_has_permission BOOLEAN := FALSE;
BEGIN
    -- Получаем организацию пользователя
    SELECT organization_id INTO v_user_org_id
    FROM users
    WHERE id = p_user_id;
    
    -- Проверяем прямые права пользователя
    SELECT EXISTS(
        SELECT 1 FROM workspace_permissions
        WHERE workspace_id = p_workspace_id
          AND user_id = p_user_id
          AND permission_level >= p_required_level
          AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
    ) INTO v_has_permission;
    
    IF v_has_permission THEN
        RETURN TRUE;
    END IF;
    
    -- Проверяем права организации
    SELECT EXISTS(
        SELECT 1 FROM workspace_permissions
        WHERE workspace_id = p_workspace_id
          AND organization_id = v_user_org_id
          AND permission_level >= p_required_level
          AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
    ) INTO v_has_permission;
    
    IF v_has_permission THEN
        RETURN TRUE;
    END IF;
    
    -- Проверяем права родительской организации
    SELECT parent_id INTO v_parent_org_id
    FROM organizations
    WHERE id = v_user_org_id;
    
    IF v_parent_org_id IS NOT NULL THEN
        SELECT EXISTS(
            SELECT 1 FROM workspace_permissions
            WHERE workspace_id = p_workspace_id
              AND organization_id = v_parent_org_id
              AND permission_level >= p_required_level
              AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
        ) INTO v_has_permission;
    END IF;
    
    RETURN v_has_permission;
END;
$$;

COMMENT ON FUNCTION check_workspace_permission IS 'Проверяет права пользователя на workspace с учетом иерархии организаций';

-- ================================
-- 6. ФУНКЦИЯ: Проверка прав на ячейку
-- ================================

CREATE OR REPLACE FUNCTION check_cell_permission(
    p_table_id UUID,
    p_row INTEGER,
    p_col INTEGER,
    p_user_id UUID,
    p_permission_type VARCHAR  -- 'read', 'write', 'delete'
)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_user_org_id INTEGER;
    v_has_permission BOOLEAN := FALSE;
    v_workspace_id UUID;
BEGIN
    -- Получаем workspace_id таблицы
    SELECT workspace_id INTO v_workspace_id
    FROM dynamic_tables
    WHERE id = p_table_id;
    
    -- Проверяем права на workspace
    IF check_workspace_permission(v_workspace_id, p_user_id, 'editor') THEN
        RETURN TRUE;
    END IF;
    
    -- Получаем организацию пользователя
    SELECT organization_id INTO v_user_org_id
    FROM users
    WHERE id = p_user_id;
    
    -- Проверяем права на ячейку
    SELECT EXISTS(
        SELECT 1 FROM cell_permissions
        WHERE table_id = p_table_id
          AND (
              (start_row IS NULL) OR 
              (p_row >= start_row AND p_row <= end_row AND p_col >= start_col AND p_col <= end_col)
          )
          AND (user_id = p_user_id OR organization_id = v_user_org_id)
          AND (
              (p_permission_type = 'read' AND can_read = TRUE) OR
              (p_permission_type = 'write' AND can_write = TRUE) OR
              (p_permission_type = 'delete' AND can_delete = TRUE)
          )
          AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)
    ) INTO v_has_permission;
    
    RETURN v_has_permission;
END;
$$;

COMMENT ON FUNCTION check_cell_permission IS 'Проверяет права пользователя на конкретную ячейку';

-- ================================
-- 7. ПРЕДСТАВЛЕНИЕ: Права пользователя
-- ================================

CREATE OR REPLACE VIEW v_user_permissions AS
SELECT 
    u.id as user_id,
    u.email,
    u.name as user_name,
    o.name_ru as organization_name,
    
    -- Workspace permissions
    wp.workspace_id,
    w.name as workspace_name,
    wp.permission_level as workspace_permission,
    wp.can_share,
    wp.can_export,
    wp.can_create_tables,
    
    -- Table permissions
    tp.table_id,
    dt.name as table_name,
    tp.can_read as table_can_read,
    tp.can_write as table_can_write,
    tp.can_delete as table_can_delete
    
FROM users u
LEFT JOIN organizations o ON o.id = u.organization_id
LEFT JOIN workspace_permissions wp ON wp.user_id = u.id
LEFT JOIN workspaces w ON w.id = wp.workspace_id
LEFT JOIN table_permissions tp ON tp.user_id = u.id
LEFT JOIN dynamic_tables dt ON dt.id = tp.table_id
WHERE u.is_active = TRUE;

COMMENT ON VIEW v_user_permissions IS 'Все права пользователей';

-- ================================
-- ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
-- ================================

-- Пример 1: Выдать права организации на workspace
/*
INSERT INTO workspace_permissions (
    workspace_id,
    organization_id,
    permission_level,
    can_share,
    can_create_tables,
    granted_by
) VALUES (
    'workspace-uuid',
    (SELECT id FROM organizations WHERE internal_code = 'RFB'),  -- РФБ
    'editor',
    TRUE,
    TRUE,
    'admin-user-uuid'
);
*/

-- Пример 2: Выдать права региональной федерации только на свои строки
/*
INSERT INTO cell_permissions (
    table_id,
    start_row,
    end_row,
    start_col,
    end_col,
    organization_id,
    can_read,
    can_write,
    access_condition,
    granted_by
) VALUES (
    'table-uuid',
    0,
    84,  -- Все строки
    0,
    10,  -- Все колонки
    (SELECT id FROM organizations WHERE internal_code = 'RFB_IRK'),  -- Иркутская область
    TRUE,
    TRUE,
    '{"type": "region_match", "field": "region_id", "match": "user.organization.region_id"}'::jsonb,
    'admin-user-uuid'
);
*/

-- Пример 3: Головная организация выдает права дочерним
/*
-- РФБ (головная) выдает права всем региональным федерациям
INSERT INTO workspace_permissions (
    workspace_id,
    organization_id,
    permission_level,
    can_create_tables,
    granted_by
)
SELECT 
    'workspace-uuid',
    o.id,
    'editor',
    FALSE,
    'rfb-admin-uuid'
FROM organizations o
WHERE o.parent_id = (SELECT id FROM organizations WHERE internal_code = 'RFB')
  AND o.type_id = (SELECT id FROM organization_types WHERE code = 'federation_regional');
*/

COMMENT ON TABLE workspace_permissions IS 
'Права доступа к workspace.
Поддерживает 3 типа субъектов:
1. user_id - конкретный пользователь
2. role_id - все пользователи с ролью
3. organization_id - все пользователи организации

Уровни доступа:
- owner: полный контроль
- editor: редактирование
- viewer: только просмотр

Наследование: права на workspace могут наследоваться на все таблицы';

COMMENT ON TABLE table_permissions IS 
'Права доступа к конкретным таблицам.
Переопределяют права workspace для конкретной таблицы';

COMMENT ON TABLE cell_permissions IS 
'Права доступа к диапазонам ячеек.
Самый гранулярный уровень прав.
Поддерживает условный доступ (например, только к своему региону)';
-- ================================
-- Блок 27: История изменений для динамических таблиц
-- ================================
-- Полная история изменений с возможностью отката
-- Оптимизировано для хранения в БД и кеширования в IndexedDB

-- ================================
-- 1. ИСТОРИЯ ИЗМЕНЕНИЙ ЯЧЕЕК
-- ================================

CREATE TABLE IF NOT EXISTS cell_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    
    -- Изменение
    action VARCHAR(20) NOT NULL,  -- 'insert', 'update', 'delete'
    
    -- Старое и новое значение
    old_value JSONB,
    new_value JSONB,
    
    -- Метаданные изменения
    change_type VARCHAR(50),  -- 'manual', 'formula', 'import', 'sync', 'api'
    change_reason TEXT,
    
    -- Кто и когда
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Для группировки изменений
    batch_id UUID,
    session_id VARCHAR(100),
    
    CONSTRAINT chk_ch_action CHECK (action IN ('insert', 'update', 'delete'))
);

CREATE INDEX idx_cell_history_version ON cell_history(version_id);
CREATE INDEX idx_cell_history_position ON cell_history(version_id, row_index, col_index);
CREATE INDEX idx_cell_history_changed_by ON cell_history(changed_by);
CREATE INDEX idx_cell_history_changed_at ON cell_history(changed_at DESC);
CREATE INDEX idx_cell_history_batch ON cell_history(batch_id);

COMMENT ON TABLE cell_history IS 'История изменений ячеек с возможностью отката';
COMMENT ON COLUMN cell_history.batch_id IS 'ID группы изменений (например, массовое обновление)';
COMMENT ON COLUMN cell_history.session_id IS 'ID сессии пользователя для группировки';

-- ================================
-- 2. ИСТОРИЯ ИЗМЕНЕНИЙ ФОРМУЛ
-- ================================

CREATE TABLE IF NOT EXISTS formula_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES formula_templates(id) ON DELETE SET NULL,
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    
    -- Диапазон
    start_row INTEGER NOT NULL,
    end_row INTEGER NOT NULL,
    start_col INTEGER NOT NULL,
    end_col INTEGER NOT NULL,
    
    -- Изменение
    action VARCHAR(20) NOT NULL,  -- 'create', 'update', 'delete'
    
    -- Старая и новая формула
    old_formula TEXT,
    new_formula TEXT,
    
    -- Влияние изменения
    affected_cells_count INTEGER,
    recalculation_time_ms INTEGER,
    
    -- Кто и когда
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Причина
    change_reason TEXT,
    
    CONSTRAINT chk_fh_action CHECK (action IN ('create', 'update', 'delete'))
);

CREATE INDEX idx_formula_history_template ON formula_history(template_id);
CREATE INDEX idx_formula_history_version ON formula_history(version_id);
CREATE INDEX idx_formula_history_changed_by ON formula_history(changed_by);
CREATE INDEX idx_formula_history_changed_at ON formula_history(changed_at DESC);

COMMENT ON TABLE formula_history IS 'История изменений формул для аудита и отката';
COMMENT ON COLUMN formula_history.affected_cells_count IS 'Количество ячеек, затронутых изменением';

-- ================================
-- 3. ИСТОРИЯ ИЗМЕНЕНИЙ СТРУКТУРЫ
-- ================================

CREATE TABLE IF NOT EXISTS structure_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    version_id UUID REFERENCES table_versions(id) ON DELETE SET NULL,
    
    -- Тип изменения
    change_type VARCHAR(50) NOT NULL,  -- 'add_column', 'remove_column', 'rename_column', 'reorder_columns', 'add_row', 'remove_row'
    
    -- Детали изменения
    change_details JSONB NOT NULL,
    -- {
    --   "column_index": 3,
    --   "old_name": "2023",
    --   "new_name": "2024",
    --   "column_type": "number"
    -- }
    
    -- Старая и новая структура (для отката)
    old_structure JSONB,
    new_structure JSONB,
    
    -- Кто и когда
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_sh_change_type CHECK (change_type IN (
        'add_column', 'remove_column', 'rename_column', 'reorder_columns', 
        'add_row', 'remove_row', 'resize_table'
    ))
);

CREATE INDEX idx_structure_history_table ON structure_history(table_id);
CREATE INDEX idx_structure_history_version ON structure_history(version_id);
CREATE INDEX idx_structure_history_changed_by ON structure_history(changed_by);
CREATE INDEX idx_structure_history_changed_at ON structure_history(changed_at DESC);

COMMENT ON TABLE structure_history IS 'История изменений структуры таблиц';

-- ================================
-- 4. ИСТОРИЯ ИЗМЕНЕНИЙ ПРАВ
-- ================================

CREATE TABLE IF NOT EXISTS permission_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Объект
    object_type VARCHAR(50) NOT NULL,  -- 'workspace', 'table', 'cell_range'
    object_id UUID NOT NULL,
    
    -- Изменение
    action VARCHAR(20) NOT NULL,  -- 'grant', 'revoke', 'modify'
    
    -- Субъект
    subject_type VARCHAR(50),  -- 'user', 'role', 'organization'
    subject_id VARCHAR(100),
    
    -- Старые и новые права
    old_permissions JSONB,
    new_permissions JSONB,
    
    -- Кто и когда
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_ph_object_type CHECK (object_type IN ('workspace', 'table', 'cell_range')),
    CONSTRAINT chk_ph_action CHECK (action IN ('grant', 'revoke', 'modify')),
    CONSTRAINT chk_ph_subject_type CHECK (subject_type IN ('user', 'role', 'organization'))
);

CREATE INDEX idx_permission_history_object ON permission_history(object_type, object_id);
CREATE INDEX idx_permission_history_subject ON permission_history(subject_type, subject_id);
CREATE INDEX idx_permission_history_changed_by ON permission_history(changed_by);
CREATE INDEX idx_permission_history_changed_at ON permission_history(changed_at DESC);

COMMENT ON TABLE permission_history IS 'История изменений прав доступа для аудита';

-- ================================
-- 5. СНИМКИ ТАБЛИЦ (SNAPSHOTS)
-- ================================

CREATE TABLE IF NOT EXISTS table_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    
    snapshot_name VARCHAR(255),
    description TEXT,
    
    -- Данные снимка (сжатые)
    snapshot_data JSONB,
    -- {
    --   "cells": [...],
    --   "formulas": [...],
    --   "structure": {...}
    -- }
    
    -- Метаданные
    cell_count INTEGER,
    compressed_size_bytes INTEGER,
    
    -- Тип снимка
    snapshot_type VARCHAR(50) DEFAULT 'manual',  -- 'manual', 'auto', 'before_major_change'
    
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Срок хранения
    expires_at TIMESTAMP
);

CREATE INDEX idx_table_snapshots_table ON table_snapshots(table_id);
CREATE INDEX idx_table_snapshots_version ON table_snapshots(version_id);
CREATE INDEX idx_table_snapshots_created_at ON table_snapshots(created_at DESC);
CREATE INDEX idx_table_snapshots_expires ON table_snapshots(expires_at) WHERE expires_at IS NOT NULL;

COMMENT ON TABLE table_snapshots IS 'Снимки состояния таблиц для быстрого отката';
COMMENT ON COLUMN table_snapshots.snapshot_type IS 'auto - автоматический (каждый день), manual - ручной, before_major_change - перед важным изменением';

-- ================================
-- 6. ФУНКЦИЯ: Откат изменений ячейки
-- ================================

CREATE OR REPLACE FUNCTION rollback_cell_change(
    p_history_id UUID
)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
    v_history RECORD;
    v_result JSONB;
BEGIN
    -- Получаем запись истории
    SELECT * INTO v_history
    FROM cell_history
    WHERE id = p_history_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'History record not found');
    END IF;
    
    -- Откатываем изменение
    IF v_history.action = 'insert' THEN
        -- Удаляем вставленную ячейку
        DELETE FROM table_cells
        WHERE version_id = v_history.version_id
          AND row_index = v_history.row_index
          AND col_index = v_history.col_index;
          
    ELSIF v_history.action = 'update' THEN
        -- Восстанавливаем старое значение
        UPDATE table_cells
        SET cell_data = v_history.old_value,
            updated_at = CURRENT_TIMESTAMP
        WHERE version_id = v_history.version_id
          AND row_index = v_history.row_index
          AND col_index = v_history.col_index;
          
    ELSIF v_history.action = 'delete' THEN
        -- Восстанавливаем удаленную ячейку
        INSERT INTO table_cells (version_id, row_index, col_index, cell_data)
        VALUES (v_history.version_id, v_history.row_index, v_history.col_index, v_history.old_value)
        ON CONFLICT (version_id, row_index, col_index) DO UPDATE
        SET cell_data = v_history.old_value;
    END IF;
    
    -- Инвалидируем кеш формул
    UPDATE formula_cache
    SET is_valid = FALSE
    WHERE version_id = v_history.version_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'action', v_history.action,
        'row', v_history.row_index,
        'col', v_history.col_index
    );
END;
$$;

COMMENT ON FUNCTION rollback_cell_change IS 'Откатывает одно изменение ячейки по ID из истории';

-- ================================
-- 7. ФУНКЦИЯ: Откат группы изменений
-- ================================

CREATE OR REPLACE FUNCTION rollback_batch_changes(
    p_batch_id UUID
)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
    v_count INTEGER;
    v_history RECORD;
BEGIN
    v_count := 0;
    
    -- Откатываем все изменения в обратном порядке
    FOR v_history IN 
        SELECT * FROM cell_history
        WHERE batch_id = p_batch_id
        ORDER BY changed_at DESC
    LOOP
        PERFORM rollback_cell_change(v_history.id);
        v_count := v_count + 1;
    END LOOP;
    
    RETURN jsonb_build_object(
        'success', true,
        'rolled_back_count', v_count
    );
END;
$$;

COMMENT ON FUNCTION rollback_batch_changes IS 'Откатывает группу изменений (например, массовое обновление)';

-- ================================
-- 8. ФУНКЦИЯ: Создание снимка таблицы
-- ================================

CREATE OR REPLACE FUNCTION create_table_snapshot(
    p_table_id UUID,
    p_snapshot_name VARCHAR DEFAULT NULL,
    p_snapshot_type VARCHAR DEFAULT 'manual',
    p_created_by UUID DEFAULT NULL
)
RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
    v_snapshot_id UUID;
    v_version_id UUID;
    v_snapshot_data JSONB;
    v_cell_count INTEGER;
BEGIN
    -- Получаем текущую версию
    SELECT id INTO v_version_id
    FROM table_versions
    WHERE table_id = p_table_id
    ORDER BY version_number DESC
    LIMIT 1;
    
    -- Собираем данные снимка
    SELECT jsonb_build_object(
        'cells', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'row', row_index,
                    'col', col_index,
                    'data', cell_data
                )
            )
            FROM table_cells
            WHERE version_id = v_version_id
        ),
        'formulas', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'start_row', start_row,
                    'end_row', end_row,
                    'start_col', start_col,
                    'end_col', end_col,
                    'formula', formula_template
                )
            )
            FROM formula_templates
            WHERE version_id = v_version_id
        ),
        'structure', (
            SELECT columns
            FROM table_versions
            WHERE id = v_version_id
        )
    ) INTO v_snapshot_data;
    
    -- Подсчитываем ячейки
    SELECT COUNT(*) INTO v_cell_count
    FROM table_cells
    WHERE version_id = v_version_id;
    
    -- Создаем снимок
    INSERT INTO table_snapshots (
        table_id,
        version_id,
        snapshot_name,
        snapshot_data,
        cell_count,
        compressed_size_bytes,
        snapshot_type,
        created_by
    ) VALUES (
        p_table_id,
        v_version_id,
        COALESCE(p_snapshot_name, 'Snapshot ' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYY-MM-DD HH24:MI:SS')),
        v_snapshot_data,
        v_cell_count,
        LENGTH(v_snapshot_data::text),
        p_snapshot_type,
        p_created_by
    ) RETURNING id INTO v_snapshot_id;
    
    RETURN v_snapshot_id;
END;
$$;

COMMENT ON FUNCTION create_table_snapshot IS 'Создает снимок текущего состояния таблицы';

-- ================================
-- 9. ФУНКЦИЯ: Восстановление из снимка
-- ================================

CREATE OR REPLACE FUNCTION restore_from_snapshot(
    p_snapshot_id UUID,
    p_restored_by UUID DEFAULT NULL
)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
    v_snapshot RECORD;
    v_new_version_id UUID;
    v_cell JSONB;
    v_formula JSONB;
BEGIN
    -- Получаем снимок
    SELECT * INTO v_snapshot
    FROM table_snapshots
    WHERE id = p_snapshot_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Snapshot not found');
    END IF;
    
    -- Создаем новую версию
    INSERT INTO table_versions (
        table_id,
        version_number,
        columns,
        change_description,
        created_by
    ) VALUES (
        v_snapshot.table_id,
        (SELECT COALESCE(MAX(version_number), 0) + 1 FROM table_versions WHERE table_id = v_snapshot.table_id),
        v_snapshot.snapshot_data->'structure',
        'Restored from snapshot: ' || v_snapshot.snapshot_name,
        p_restored_by
    ) RETURNING id INTO v_new_version_id;
    
    -- Восстанавливаем ячейки
    FOR v_cell IN SELECT * FROM jsonb_array_elements(v_snapshot.snapshot_data->'cells')
    LOOP
        INSERT INTO table_cells (version_id, row_index, col_index, cell_data, created_by)
        VALUES (
            v_new_version_id,
            (v_cell->>'row')::INTEGER,
            (v_cell->>'col')::INTEGER,
            v_cell->'data',
            p_restored_by
        );
    END LOOP;
    
    -- Восстанавливаем формулы
    FOR v_formula IN SELECT * FROM jsonb_array_elements(v_snapshot.snapshot_data->'formulas')
    LOOP
        INSERT INTO formula_templates (
            version_id,
            start_row,
            end_row,
            start_col,
            end_col,
            formula_template,
            created_by
        ) VALUES (
            v_new_version_id,
            (v_formula->>'start_row')::INTEGER,
            (v_formula->>'end_row')::INTEGER,
            (v_formula->>'start_col')::INTEGER,
            (v_formula->>'end_col')::INTEGER,
            v_formula->>'formula',
            p_restored_by
        );
    END LOOP;
    
    RETURN jsonb_build_object(
        'success', true,
        'new_version_id', v_new_version_id,
        'cells_restored', jsonb_array_length(v_snapshot.snapshot_data->'cells')
    );
END;
$$;

COMMENT ON FUNCTION restore_from_snapshot IS 'Восстанавливает таблицу из снимка (создает новую версию)';

-- ================================
-- 10. ПРЕДСТАВЛЕНИЯ ДЛЯ АУДИТА
-- ================================

-- История изменений пользователя
CREATE OR REPLACE VIEW v_user_activity AS
SELECT 
    u.email,
    u.name as user_name,
    'cell_change' as activity_type,
    ch.action,
    dt.name as table_name,
    ch.row_index,
    ch.col_index,
    ch.changed_at,
    ch.change_reason
FROM cell_history ch
JOIN users u ON u.id = ch.changed_by
JOIN table_versions tv ON tv.id = ch.version_id
JOIN dynamic_tables dt ON dt.id = tv.table_id

UNION ALL

SELECT 
    u.email,
    u.name,
    'formula_change',
    fh.action,
    dt.name,
    fh.start_row,
    fh.start_col,
    fh.changed_at,
    fh.change_reason
FROM formula_history fh
JOIN users u ON u.id = fh.changed_by
JOIN table_versions tv ON tv.id = fh.version_id
JOIN dynamic_tables dt ON dt.id = tv.table_id

ORDER BY changed_at DESC;

COMMENT ON VIEW v_user_activity IS 'Вся активность пользователей для аудита';

-- Последние изменения таблицы
CREATE OR REPLACE VIEW v_table_recent_changes AS
SELECT 
    dt.id as table_id,
    dt.name as table_name,
    'cell' as change_type,
    ch.action,
    ch.row_index,
    ch.col_index,
    u.name as changed_by_name,
    ch.changed_at
FROM dynamic_tables dt
JOIN table_versions tv ON tv.table_id = dt.id
JOIN cell_history ch ON ch.version_id = tv.id
JOIN users u ON u.id = ch.changed_by

UNION ALL

SELECT 
    dt.id,
    dt.name,
    'formula',
    fh.action,
    fh.start_row,
    fh.start_col,
    u.name,
    fh.changed_at
FROM dynamic_tables dt
JOIN table_versions tv ON tv.table_id = dt.id
JOIN formula_history fh ON fh.version_id = tv.id
JOIN users u ON u.id = fh.changed_by

ORDER BY changed_at DESC
LIMIT 100;

COMMENT ON VIEW v_table_recent_changes IS 'Последние 100 изменений по всем таблицам';

-- ================================
-- ТРИГГЕРЫ ДЛЯ АВТОМАТИЧЕСКОЙ ИСТОРИИ
-- ================================

-- Триггер для автоматического логирования изменений ячеек
CREATE OR REPLACE FUNCTION log_cell_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO cell_history (
            version_id, row_index, col_index, action,
            old_value, new_value, changed_by, change_type
        ) VALUES (
            NEW.version_id, NEW.row_index, NEW.col_index, 'insert',
            NULL, NEW.cell_data, NEW.created_by, 'manual'
        );
        
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO cell_history (
            version_id, row_index, col_index, action,
            old_value, new_value, changed_by, change_type
        ) VALUES (
            NEW.version_id, NEW.row_index, NEW.col_index, 'update',
            OLD.cell_data, NEW.cell_data, NEW.updated_by, 'manual'
        );
        
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO cell_history (
            version_id, row_index, col_index, action,
            old_value, new_value, changed_by, change_type
        ) VALUES (
            OLD.version_id, OLD.row_index, OLD.col_index, 'delete',
            OLD.cell_data, NULL, CURRENT_USER::UUID, 'manual'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_cell_change ON table_cells;
CREATE TRIGGER trg_log_cell_change
    AFTER INSERT OR UPDATE OR DELETE ON table_cells
    FOR EACH ROW
    EXECUTE FUNCTION log_cell_change();

COMMENT ON FUNCTION log_cell_change IS 'Автоматически логирует все изменения ячеек';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE cell_history IS 
'История всех изменений ячеек.
Позволяет:
- Откатывать изменения
- Аудит действий пользователей
- Анализ активности
- Восстановление данных

Оптимизация: старые записи можно архивировать или кешировать в IndexedDB';

COMMENT ON TABLE table_snapshots IS 
'Снимки состояния таблиц для быстрого отката.
Типы снимков:
- manual: создан пользователем
- auto: автоматический (например, раз в день)
- before_major_change: перед важным изменением

Рекомендуется хранить в БД только последние 10 снимков,
остальные можно архивировать';
-- ================================
-- Блок 28: Dashboard & Reports - Страницы и блоки
-- ================================
-- Система отчетов и дашбордов в стиле Notion

-- ================================
-- 1. СТРАНИЦЫ
-- ================================

CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    
    -- Иерархия страниц (для вложенности)
    parent_page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    
    -- Основная информация
    title VARCHAR(500) NOT NULL,
    icon VARCHAR(50),  -- emoji или icon name
    cover_image TEXT,  -- URL обложки
    
    -- Тип страницы
    page_type VARCHAR(50) DEFAULT 'document',  -- 'document', 'dashboard', 'report', 'presentation'
    
    -- Публикация
    is_public BOOLEAN DEFAULT FALSE,
    public_url VARCHAR(255) UNIQUE,
    public_password VARCHAR(255),
    
    -- Настройки
    metadata JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "layout": "full-width" | "centered",
    --   "theme": "light" | "dark",
    --   "presentation_mode": true,
    --   "slide_transition": "fade" | "slide",
    --   "auto_play": false
    -- }
    
    -- Владелец
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Сортировка
    sort_order INTEGER DEFAULT 0,
    
    -- Статистика
    view_count INTEGER DEFAULT 0,
    last_viewed_at TIMESTAMP,
    
    CONSTRAINT chk_page_type CHECK (page_type IN ('document', 'dashboard', 'report', 'presentation'))
);

CREATE INDEX idx_pages_workspace ON pages(workspace_id);
CREATE INDEX idx_pages_parent ON pages(parent_page_id);
CREATE INDEX idx_pages_created_by ON pages(created_by);
CREATE INDEX idx_pages_public ON pages(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_pages_type ON pages(page_type);
CREATE INDEX idx_pages_sort ON pages(workspace_id, sort_order);

COMMENT ON TABLE pages IS 'Страницы с блоками контента (документы, дашборды, отчеты, презентации)';
COMMENT ON COLUMN pages.public_url IS 'Уникальный URL для публичного доступа';

-- ================================
-- 2. БЛОКИ КОНТЕНТА
-- ================================

CREATE TABLE IF NOT EXISTS blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    
    -- Иерархия блоков (для вложенности и колонок)
    parent_block_id UUID REFERENCES blocks(id) ON DELETE CASCADE,
    
    -- Тип блока
    block_type VARCHAR(50) NOT NULL,
    -- 'text', 'heading', 'chart', 'table', 'kpi', 'image', 'divider',
    -- 'code', 'quote', 'callout', 'toggle', 'columns', 'embed'
    
    -- Содержимое блока
    content JSONB NOT NULL,
    -- Для text: {"text": "...", "format": {"bold": true, "italic": false}}
    -- Для heading: {"text": "...", "level": 1}
    -- Для chart: {"chartId": "uuid"}
    -- Для table: {"tableId": "uuid", "columns": [...], "filters": {...}}
    -- Для kpi: {"metric": "total_score", "aggregation": "avg", "format": "number", "prefix": "", "suffix": ""}
    -- Для image: {"url": "...", "caption": "...", "width": 500}
    -- Для code: {"code": "...", "language": "sql"}
    -- Для embed: {"url": "...", "type": "youtube" | "figma" | "miro"}
    
    -- Настройки блока
    settings JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "width": "full" | "half" | "third",
    --   "alignment": "left" | "center" | "right",
    --   "backgroundColor": "#fff",
    --   "padding": "normal" | "compact",
    --   "border": true
    -- }
    
    -- Позиция
    sort_order INTEGER DEFAULT 0,
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_block_type CHECK (block_type IN (
        'text', 'heading', 'chart', 'table', 'kpi', 'image', 'divider',
        'code', 'quote', 'callout', 'toggle', 'columns', 'embed', 'video'
    ))
);

CREATE INDEX idx_blocks_page ON blocks(page_id);
CREATE INDEX idx_blocks_parent ON blocks(parent_block_id);
CREATE INDEX idx_blocks_type ON blocks(block_type);
CREATE INDEX idx_blocks_sort ON blocks(page_id, sort_order);
CREATE INDEX idx_blocks_created_by ON blocks(created_by);

COMMENT ON TABLE blocks IS 'Блоки контента на страницах (Notion-style)';
COMMENT ON COLUMN blocks.parent_block_id IS 'Для вложенных блоков (например, блоки внутри колонок)';

-- ================================
-- 3. ГРАФИКИ
-- ================================

CREATE TABLE IF NOT EXISTS charts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    
    -- Название графика (для переиспользования)
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Источник данных
    data_source_type VARCHAR(50) NOT NULL,  -- 'table', 'query', 'api'
    data_source_id UUID,  -- ID таблицы или saved_query
    
    -- Тип графика
    chart_type VARCHAR(50) NOT NULL,
    -- 'bar', 'line', 'pie', 'area', 'scatter', 'radar', 'heatmap',
    -- 'treemap', 'funnel', 'gauge', 'sankey', 'waterfall'
    
    -- Конфигурация
    config JSONB NOT NULL,
    -- {
    --   "xAxis": {"column": "region_name", "label": "Регион", "type": "category"},
    --   "yAxis": {"column": "total_score", "label": "Балл", "type": "value", "min": 0, "max": 100},
    --   "series": [
    --     {"column": "score_2024", "label": "2024", "color": "#3B82F6", "type": "bar"},
    --     {"column": "score_2025", "label": "2025", "color": "#10B981", "type": "line"}
    --   ],
    --   "filters": {"federal_district_id": 7},
    --   "sort": {"column": "total_score", "order": "desc"},
    --   "limit": 10,
    --   "legend": {"show": true, "position": "bottom"},
    --   "tooltip": {"show": true},
    --   "grid": {"show": true}
    -- }
    
    -- Кеш данных (для быстрой загрузки)
    cached_data JSONB,
    cache_updated_at TIMESTAMP,
    cache_ttl INTEGER DEFAULT 3600,  -- TTL в секундах
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_chart_type CHECK (chart_type IN (
        'bar', 'line', 'pie', 'area', 'scatter', 'radar', 'heatmap',
        'treemap', 'funnel', 'gauge', 'sankey', 'waterfall', 'boxplot'
    )),
    CONSTRAINT chk_data_source_type CHECK (data_source_type IN ('table', 'query', 'api'))
);

CREATE INDEX idx_charts_workspace ON charts(workspace_id);
CREATE INDEX idx_charts_data_source ON charts(data_source_type, data_source_id);
CREATE INDEX idx_charts_created_by ON charts(created_by);
CREATE INDEX idx_charts_type ON charts(chart_type);

COMMENT ON TABLE charts IS 'Конфигурация графиков (переиспользуемые)';
COMMENT ON COLUMN charts.cached_data IS 'Кешированные данные для быстрой загрузки';

-- ================================
-- 4. СВЯЗЬ БЛОКОВ С ГРАФИКАМИ
-- ================================

CREATE TABLE IF NOT EXISTS block_charts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
    chart_id UUID NOT NULL REFERENCES charts(id) ON DELETE CASCADE,
    
    -- Переопределение настроек для конкретного блока
    override_config JSONB,
    -- {
    --   "width": 800,
    --   "height": 400,
    --   "theme": "dark"
    -- }
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(block_id, chart_id)
);

CREATE INDEX idx_block_charts_block ON block_charts(block_id);
CREATE INDEX idx_block_charts_chart ON block_charts(chart_id);

COMMENT ON TABLE block_charts IS 'Связь блоков с графиками (один график может быть в нескольких блоках)';

-- ================================
-- 5. СОХРАНЕННЫЕ ЗАПРОСЫ
-- ================================

CREATE TABLE IF NOT EXISTS saved_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Тип запроса
    query_type VARCHAR(50) NOT NULL,  -- 'sql', 'aggregation', 'formula'
    
    -- Конфигурация запроса
    query_config JSONB NOT NULL,
    -- Для SQL:
    -- {
    --   "sql": "SELECT region_name, AVG(score) as avg_score FROM ...",
    --   "parameters": [{"name": "year", "type": "number", "default": 2025}]
    -- }
    -- Для aggregation:
    -- {
    --   "tables": ["table-uuid-1"],
    --   "columns": ["region_name", "total_score"],
    --   "aggregations": [{"column": "score", "function": "avg", "alias": "avg_score"}],
    --   "groupBy": ["region_name"],
    --   "filters": {"year": 2025},
    --   "sort": {"column": "avg_score", "order": "desc"}
    -- }
    
    -- Кеш результата
    cached_result JSONB,
    cache_updated_at TIMESTAMP,
    cache_ttl INTEGER DEFAULT 3600,  -- TTL в секундах
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_query_type CHECK (query_type IN ('sql', 'aggregation', 'formula'))
);

CREATE INDEX idx_saved_queries_workspace ON saved_queries(workspace_id);
CREATE INDEX idx_saved_queries_type ON saved_queries(query_type);
CREATE INDEX idx_saved_queries_created_by ON saved_queries(created_by);

COMMENT ON TABLE saved_queries IS 'Сохраненные запросы для графиков и отчетов';
COMMENT ON COLUMN saved_queries.cached_result IS 'Кешированный результат запроса';

-- ================================
-- 6. ПРАВА НА СТРАНИЦЫ
-- ================================

CREATE TABLE IF NOT EXISTS page_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    
    -- Субъект прав
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Права
    can_read BOOLEAN DEFAULT TRUE,
    can_write BOOLEAN DEFAULT FALSE,
    can_comment BOOLEAN DEFAULT FALSE,
    can_share BOOLEAN DEFAULT FALSE,
    
    granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    CONSTRAINT chk_pp_subject CHECK (
        (user_id IS NOT NULL AND role_id IS NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NOT NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NULL AND organization_id IS NOT NULL)
    )
);

CREATE INDEX idx_page_permissions_page ON page_permissions(page_id);
CREATE INDEX idx_page_permissions_user ON page_permissions(user_id);
CREATE INDEX idx_page_permissions_role ON page_permissions(role_id);
CREATE INDEX idx_page_permissions_organization ON page_permissions(organization_id);

COMMENT ON TABLE page_permissions IS 'Права доступа к страницам';

-- ================================
-- 7. КОММЕНТАРИИ К БЛОКАМ
-- ================================

CREATE TABLE IF NOT EXISTS block_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
    
    -- Комментарий
    content TEXT NOT NULL,
    
    -- Ответ на комментарий
    parent_comment_id UUID REFERENCES block_comments(id) ON DELETE CASCADE,
    
    -- Статус
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP,
    
    -- Автор
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_block_comments_block ON block_comments(block_id);
CREATE INDEX idx_block_comments_parent ON block_comments(parent_comment_id);
CREATE INDEX idx_block_comments_created_by ON block_comments(created_by);
CREATE INDEX idx_block_comments_resolved ON block_comments(is_resolved) WHERE is_resolved = FALSE;

COMMENT ON TABLE block_comments IS 'Комментарии к блокам (для совместной работы)';

-- ================================
-- ТРИГГЕРЫ
-- ================================

-- Триггер для updated_at
DROP TRIGGER IF EXISTS trg_pages_updated_at ON pages;
CREATE TRIGGER trg_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_blocks_updated_at ON blocks;
CREATE TRIGGER trg_blocks_updated_at
    BEFORE UPDATE ON blocks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_charts_updated_at ON charts;
CREATE TRIGGER trg_charts_updated_at
    BEFORE UPDATE ON charts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_saved_queries_updated_at ON saved_queries;
CREATE TRIGGER trg_saved_queries_updated_at
    BEFORE UPDATE ON saved_queries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- ФУНКЦИИ
-- ================================

-- Функция: Получить данные для графика
CREATE OR REPLACE FUNCTION get_chart_data(p_chart_id UUID)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
    v_chart RECORD;
    v_result JSONB;
BEGIN
    -- Получаем график
    SELECT * INTO v_chart
    FROM charts
    WHERE id = p_chart_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Chart not found: %', p_chart_id;
    END IF;
    
    -- Проверяем кеш
    IF v_chart.cached_data IS NOT NULL 
       AND v_chart.cache_updated_at IS NOT NULL
       AND v_chart.cache_updated_at > NOW() - (v_chart.cache_ttl || ' seconds')::INTERVAL THEN
        RETURN v_chart.cached_data;
    END IF;
    
    -- Получаем данные в зависимости от типа источника
    IF v_chart.data_source_type = 'table' THEN
        -- Получаем данные из динамической таблицы
        -- TODO: Реализовать получение данных из table_cells
        v_result := '[]'::jsonb;
        
    ELSIF v_chart.data_source_type = 'query' THEN
        -- Выполняем сохраненный запрос
        SELECT cached_result INTO v_result
        FROM saved_queries
        WHERE id = v_chart.data_source_id;
    END IF;
    
    -- Обновляем кеш
    UPDATE charts
    SET cached_data = v_result,
        cache_updated_at = NOW()
    WHERE id = p_chart_id;
    
    RETURN v_result;
END;
$$;

COMMENT ON FUNCTION get_chart_data IS 'Получает данные для графика с кешированием';

-- Функция: Инвалидация кеша графиков при изменении таблицы
CREATE OR REPLACE FUNCTION invalidate_chart_cache()
RETURNS TRIGGER AS $$
BEGIN
    -- Инвалидируем кеш всех графиков, использующих эту таблицу
    UPDATE charts
    SET cache_updated_at = NULL
    WHERE data_source_type = 'table'
      AND data_source_id IN (
          SELECT table_id FROM table_versions WHERE id = NEW.version_id
      );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер на изменение ячеек
DROP TRIGGER IF EXISTS trg_invalidate_chart_cache ON table_cells;
CREATE TRIGGER trg_invalidate_chart_cache
    AFTER INSERT OR UPDATE OR DELETE ON table_cells
    FOR EACH ROW
    EXECUTE FUNCTION invalidate_chart_cache();

-- ================================
-- ПРЕДСТАВЛЕНИЯ
-- ================================

-- Представление: Страницы с количеством блоков
CREATE OR REPLACE VIEW v_pages_with_stats AS
SELECT 
    p.*,
    COUNT(DISTINCT b.id) as block_count,
    COUNT(DISTINCT CASE WHEN b.block_type = 'chart' THEN b.id END) as chart_count,
    u.name as created_by_name
FROM pages p
LEFT JOIN blocks b ON b.page_id = p.id
LEFT JOIN users u ON u.id = p.created_by
GROUP BY p.id, u.name;

COMMENT ON VIEW v_pages_with_stats IS 'Страницы со статистикой блоков';

-- Представление: Популярные графики
CREATE OR REPLACE VIEW v_popular_charts AS
SELECT 
    c.*,
    COUNT(DISTINCT bc.block_id) as usage_count,
    u.name as created_by_name
FROM charts c
LEFT JOIN block_charts bc ON bc.chart_id = c.id
LEFT JOIN users u ON u.id = c.created_by
GROUP BY c.id, u.name
ORDER BY usage_count DESC;

COMMENT ON VIEW v_popular_charts IS 'Популярные графики по количеству использований';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE pages IS 
'Страницы с блоками контента.
Типы страниц:
- document: обычный документ
- dashboard: дашборд с графиками
- report: отчет
- presentation: презентация (блоки как слайды)

Поддерживает:
- Иерархию страниц (parent_page_id)
- Публичный доступ (is_public, public_url)
- Режим презентации (metadata.presentation_mode)';

COMMENT ON TABLE blocks IS 
'Блоки контента на страницах (Notion-style).
Поддерживает:
- Вложенность (parent_block_id)
- Drag & drop (sort_order)
- Различные типы контента
- Кастомные настройки (settings)';

COMMENT ON TABLE charts IS 
'Переиспользуемые графики.
Один график может быть использован в нескольких блоках.
Поддерживает кеширование данных для производительности.';

COMMENT ON TABLE saved_queries IS 
'Сохраненные запросы для графиков.
Поддерживает:
- SQL запросы
- Агрегации
- Формулы
- Кеширование результатов';
