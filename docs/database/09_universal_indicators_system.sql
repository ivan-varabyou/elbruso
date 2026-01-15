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
