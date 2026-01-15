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
