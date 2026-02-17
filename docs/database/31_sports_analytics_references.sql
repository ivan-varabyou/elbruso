-- ================================
-- Блок 31: Дополнительные справочники для спортивной аналитики
-- ================================
-- Расширение справочной системы: спортивные объекты, разряды, экономика регионов

-- ================================
-- 1. ТИПЫ СПОРТИВНЫХ ОБЪЕКТОВ
-- ================================
CREATE TABLE IF NOT EXISTS venue_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO venue_types (code, name_ru, description, sort_order) VALUES
('stadium', 'Стадион', 'Открытый стадион для легкой атлетики, футбола и т.д.', 1),
('indoor_arena', 'Крытая арена', 'Крытая арена / дворец спорта', 2),
('pool', 'Бассейн', 'Плавательный бассейн', 3),
('gym', 'Спортивный зал', 'Универсальный спортивный зал', 4),
('ice_rink', 'Ледовая арена', 'Крытый каток / ледовый дворец', 5),
('court', 'Корт', 'Теннисный, баскетбольный и т.д.', 6),
('track', 'Трасса', 'Лыжная, велосипедная, автомобильная трасса', 7),
('shooting_range', 'Стрельбище', 'Стрелковый тир / стрельбище', 8),
('equestrian', 'Манеж', 'Конный манеж', 9),
('open_water', 'Открытая вода', 'Гребной канал, акватория', 10),
('multisport', 'Многофункциональный комплекс', 'Многопрофильный спортивный комплекс', 11),
('other', 'Другое', 'Другой тип спортивного объекта', 99)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 2. СПОРТИВНЫЕ ОБЪЕКТЫ / ПЛОЩАДКИ
-- ================================
CREATE TABLE IF NOT EXISTS sports_venues (
    id SERIAL PRIMARY KEY,
    name_ru VARCHAR(200) NOT NULL,
    venue_type_id INTEGER NOT NULL REFERENCES venue_types(id),
    region_id INTEGER REFERENCES regions(id) ON DELETE SET NULL,
    country_id INTEGER REFERENCES countries(id) ON DELETE SET NULL,
    city VARCHAR(100),
    address TEXT,
    capacity INTEGER,                    -- вместимость зрителей
    year_built INTEGER,
    year_renovated INTEGER,
    surface_type VARCHAR(50),            -- тип покрытия
    indoor BOOLEAN DEFAULT FALSE,
    meets_standards BOOLEAN DEFAULT TRUE, -- соответствие стандартам
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    data_source_id INTEGER REFERENCES data_sources(id),
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sports_venues_type ON sports_venues(venue_type_id);
CREATE INDEX idx_sports_venues_region ON sports_venues(region_id);
CREATE INDEX idx_sports_venues_country ON sports_venues(country_id);
CREATE INDEX idx_sports_venues_sport ON sports_venues(sport_id);
CREATE INDEX idx_sports_venues_active ON sports_venues(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE sports_venues IS 'Справочник спортивных объектов (стадионы, арены, бассейны и т.д.)';

-- ================================
-- 3. СПОРТИВНЫЕ РАЗРЯДЫ И ЗВАНИЯ
-- ================================
CREATE TABLE IF NOT EXISTS sports_ranks (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    short_name_ru VARCHAR(30),
    level INTEGER NOT NULL,              -- 1=начальный, 10=высший
    rank_type VARCHAR(30) NOT NULL,      -- 'rank' = разряд, 'title' = звание
    country_id INTEGER REFERENCES countries(id) ON DELETE SET NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_rank_type CHECK (rank_type IN ('rank', 'title'))
);

CREATE INDEX idx_sports_ranks_type ON sports_ranks(rank_type);
CREATE INDEX idx_sports_ranks_level ON sports_ranks(level);
CREATE INDEX idx_sports_ranks_country ON sports_ranks(country_id);

COMMENT ON TABLE sports_ranks IS 'Справочник спортивных разрядов и званий (ЗМС, МСМК, МС, КМС, разряды)';

-- Российская система спортивных разрядов и званий
INSERT INTO sports_ranks (code, name_ru, short_name_ru, level, rank_type, country_id, sort_order) VALUES
('ZMS', 'Заслуженный мастер спорта', 'ЗМС', 10, 'title', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 1),
('MSMK', 'Мастер спорта международного класса', 'МСМК', 9, 'title', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 2),
('MS', 'Мастер спорта', 'МС', 8, 'title', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 3),
('KMS', 'Кандидат в мастера спорта', 'КМС', 7, 'rank', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 4),
('RANK_1', 'Первый спортивный разряд', 'I разряд', 6, 'rank', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 5),
('RANK_2', 'Второй спортивный разряд', 'II разряд', 5, 'rank', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 6),
('RANK_3', 'Третий спортивный разряд', 'III разряд', 4, 'rank', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 7),
('RANK_1_YOUTH', 'Первый юношеский разряд', 'I юн.', 3, 'rank', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 8),
('RANK_2_YOUTH', 'Второй юношеский разряд', 'II юн.', 2, 'rank', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 9),
('RANK_3_YOUTH', 'Третий юношеский разряд', 'III юн.', 1, 'rank', (SELECT id FROM countries WHERE code_alpha2='RU' LIMIT 1), 10),
('NO_RANK', 'Без разряда', 'б/р', 0, 'rank', NULL, 99)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 4. КАТЕГОРИИ СОРЕВНОВАНИЙ
-- ================================
CREATE TABLE IF NOT EXISTS competition_categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    description TEXT,
    level INTEGER NOT NULL DEFAULT 0,     -- вес/значимость
    sort_order INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO competition_categories (code, name_ru, level, sort_order) VALUES
('olympic_games', 'Олимпийские игры', 10, 1),
('world_championship', 'Чемпионат мира', 9, 2),
('european_championship', 'Чемпионат Европы', 8, 3),
('continental_cup', 'Кубок континента', 7, 4),
('national_championship', 'Чемпионат России', 6, 5),
('national_cup', 'Кубок России', 5, 6),
('national_primacy', 'Первенство России', 4, 7),
('federal_district', 'Первенство/ЧП федерального округа', 3, 8),
('regional', 'Региональное первенство', 2, 9),
('municipal', 'Муниципальные соревнования', 1, 10),
('friendly', 'Товарищеские соревнования', 0, 11)
ON CONFLICT (code) DO NOTHING;

COMMENT ON TABLE competition_categories IS 'Категории/уровни соревнований для расчета весов и приоритетов';

-- ================================
-- 5. ЭКОНОМИЧЕСКИЕ ДАННЫЕ РЕГИОНОВ
-- ================================
CREATE TABLE IF NOT EXISTS region_economics (
    id SERIAL PRIMARY KEY,
    region_id INTEGER NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    budget_total NUMERIC(18,2),           -- общий бюджет региона
    budget_sports NUMERIC(18,2),          -- бюджет на спорт
    budget_per_capita NUMERIC(12,2),      -- бюджет на спорт на душу населения
    avg_salary NUMERIC(12,2),             -- средняя зарплата
    grp NUMERIC(18,2),                    -- валовый региональный продукт
    unemployment_rate NUMERIC(5,2),       -- уровень безработицы %
    data_source_id INTEGER REFERENCES data_sources(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(region_id, year)
);

CREATE INDEX idx_region_economics_region ON region_economics(region_id);
CREATE INDEX idx_region_economics_year ON region_economics(year);
CREATE INDEX idx_region_economics_region_year ON region_economics(region_id, year);

COMMENT ON TABLE region_economics IS 'Экономические показатели регионов по годам для аудита и аналитики';

-- ================================
-- 6. ТИПЫ ТРЕНИРОВОЧНЫХ ПРОГРАММ
-- ================================
CREATE TABLE IF NOT EXISTS training_program_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO training_program_types (code, name_ru, description, sort_order) VALUES
('sport_reserve', 'Спортивный резерв', 'Программа подготовки спортивного резерва', 1),
('sport_improvement', 'Спортивное совершенствование', 'Программа спортивного совершенствования', 2),
('high_performance', 'Высшее спортивное мастерство', 'Программа подготовки спортсменов высокого класса', 3),
('initial_training', 'Начальная подготовка', 'Программа начальной спортивной подготовки', 4),
('training_stage', 'Тренировочный этап', 'Основной тренировочный этап', 5),
('health_improvement', 'Спортивно-оздоровительная', 'Программа спортивно-оздоровительного направления', 6),
('adaptive_sport', 'Адаптивный спорт', 'Программа адаптивного спорта', 7)
ON CONFLICT (code) DO NOTHING;

COMMENT ON TABLE training_program_types IS 'Типы программ спортивной подготовки (для учета в организациях)';
