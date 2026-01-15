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
