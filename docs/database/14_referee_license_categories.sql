-- ================================
-- Блок 14: Категории лицензий судей и персонала
-- ================================
-- Справочник для автогенерации критериев судей, тренеров, комиссаров

-- ================================
-- 1. КАТЕГОРИИ ЛИЦЕНЗИЙ СУДЕЙ
-- ================================

CREATE TABLE IF NOT EXISTS referee_license_categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ru VARCHAR(100) NOT NULL,
    short_name_ru VARCHAR(50),
    
    -- Уровень категории (для сортировки)
    level INTEGER NOT NULL,
    
    -- Привязка к спорту
    sport_id INTEGER REFERENCES sports(id) ON DELETE CASCADE,
    discipline_id INTEGER REFERENCES disciplines(id) ON DELETE SET NULL,
    
    -- Тип персонала
    personnel_type VARCHAR(50) NOT NULL,  -- 'referee', 'commissioner', 'statistician', 'secretary'
    
    -- Метаданные
    description TEXT,
    requirements TEXT,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_rlc_personnel_type CHECK (personnel_type IN ('referee', 'commissioner', 'statistician', 'secretary', 'trainer', 'other'))
);

CREATE INDEX idx_rlc_sport ON referee_license_categories(sport_id);
CREATE INDEX idx_rlc_discipline ON referee_license_categories(discipline_id);
CREATE INDEX idx_rlc_type ON referee_license_categories(personnel_type);
CREATE INDEX idx_rlc_level ON referee_license_categories(level);

COMMENT ON TABLE referee_license_categories IS 'Категории лицензий судей, комиссаров и другого персонала';
COMMENT ON COLUMN referee_license_categories.level IS 'Уровень категории: 1=начальный, 5=международный';
COMMENT ON COLUMN referee_license_categories.personnel_type IS 'Тип персонала: referee, commissioner, statistician, secretary, trainer';

-- ================================
-- 2. КАТЕГОРИИ ДЛЯ БАСКЕТБОЛА
-- ================================

-- Судьи баскетбола 5х5
INSERT INTO referee_license_categories (code, name_ru, short_name_ru, level, sport_id, discipline_id, personnel_type, description) VALUES
('BBL_5X5_REF_5_BASKETS', '5 корзины', '5 корз.', 1, 10, 220, 'referee', 'Судья начальной категории 5х5'),
('BBL_5X5_REF_1_3_BASKETS', '1-3 корзины по рейтингу', '1-3 корз.', 2, 10, 220, 'referee', 'Судья средней категории 5х5'),
('BBL_5X5_REF_RFB', 'Лицензия РФБ', 'РФБ', 3, 10, 220, 'referee', 'Судья с лицензией РФБ 5х5'),
('BBL_5X5_REF_FIBA', 'Лицензия FIBA', 'FIBA', 4, 10, 220, 'referee', 'Судья международной категории FIBA 5х5');

-- Судьи баскетбола 3х3
INSERT INTO referee_license_categories (code, name_ru, short_name_ru, level, sport_id, discipline_id, personnel_type, description) VALUES
('BBL_3X3_REF_B', 'Лицензия Б', 'Б', 1, 10, 219, 'referee', 'Судья категории Б 3х3'),
('BBL_3X3_REF_A', 'Лицензия А', 'А', 2, 10, 219, 'referee', 'Судья категории А 3х3'),
('BBL_3X3_REF_RFB', 'Лицензия РФБ', 'РФБ', 3, 10, 219, 'referee', 'Судья с лицензией РФБ 3х3'),
('BBL_3X3_REF_FIBA', 'Лицензия FIBA', 'FIBA', 4, 10, 219, 'referee', 'Судья международной категории FIBA 3х3');

-- Комиссары баскетбола 5х5
INSERT INTO referee_license_categories (code, name_ru, short_name_ru, level, sport_id, discipline_id, personnel_type, description) VALUES
('BBL_5X5_COMM_5_BASKETS', 'Комиссар 5 корзины', 'Комиссар 5 корз.', 1, 10, 220, 'commissioner', 'Комиссар начальной категории'),
('BBL_5X5_COMM_1_3_BASKETS', 'Комиссар 1-3 корзины', 'Комиссар 1-3 корз.', 2, 10, 220, 'commissioner', 'Комиссар средней категории'),
('BBL_5X5_COMM_FIBA', 'Комиссар FIBA', 'Комиссар FIBA', 3, 10, 220, 'commissioner', 'Комиссар международной категории');

-- Статистики и секретари баскетбола
INSERT INTO referee_license_categories (code, name_ru, short_name_ru, level, sport_id, personnel_type, description) VALUES
('BBL_STAT_RFB', 'Статистик РФБ', 'Стат. РФБ', 1, 10, 'statistician', 'Статистик с лицензией РФБ'),
('BBL_STAT_FIBA', 'Статистик FIBA', 'Стат. FIBA', 2, 10, 'statistician', 'Статистик с лицензией FIBA'),
('BBL_SEC_RFB', 'Секретарь РФБ', 'Секр. РФБ', 1, 10, 'secretary', 'Секретарь с лицензией РФБ'),
('BBL_SEC_FIBA', 'Секретарь FIBA', 'Секр. FIBA', 2, 10, 'secretary', 'Секретарь с лицензией FIBA');

-- ================================
-- 3. КАТЕГОРИИ ДЛЯ ЛЕГКОЙ АТЛЕТИКИ
-- ================================

-- Судьи легкой атлетики
INSERT INTO referee_license_categories (code, name_ru, short_name_ru, level, sport_id, personnel_type, description) VALUES
('ATH_REF_3_CAT', 'Судья 3 категории', '3 кат.', 1, 3, 'referee', 'Судья третьей категории'),
('ATH_REF_2_CAT', 'Судья 2 категории', '2 кат.', 2, 3, 'referee', 'Судья второй категории'),
('ATH_REF_1_CAT', 'Судья 1 категории', '1 кат.', 3, 3, 'referee', 'Судья первой категории'),
('ATH_REF_NATIONAL', 'Судья всероссийской категории', 'Всерос.', 4, 3, 'referee', 'Судья всероссийской категории'),
('ATH_REF_INTERNATIONAL', 'Судья международной категории', 'Междунар.', 5, 3, 'referee', 'Судья международной категории (IAAF)');

-- Тренеры легкой атлетики
INSERT INTO referee_license_categories (code, name_ru, short_name_ru, level, sport_id, personnel_type, description) VALUES
('ATH_COACH', 'Тренер', 'Тренер', 1, 3, 'trainer', 'Тренер по легкой атлетике'),
('ATH_COACH_HIGH', 'Тренер высшей категории', 'Тренер ВК', 2, 3, 'trainer', 'Тренер высшей категории'),
('ATH_COACH_HONORED_RUS', 'Заслуженный тренер России', 'ЗТР', 3, 3, 'trainer', 'Заслуженный тренер России'),
('ATH_COACH_HONORED_USSR', 'Заслуженный тренер СССР', 'ЗТ СССР', 4, 3, 'trainer', 'Заслуженный тренер СССР');

-- ================================
-- 4. ПРЕДСТАВЛЕНИЯ
-- ================================

-- Категории по видам спорта
CREATE OR REPLACE VIEW v_referee_categories_by_sport AS
SELECT 
    s.name_ru as sport_name,
    d.name_ru as discipline_name,
    rlc.personnel_type,
    rlc.name_ru as category_name,
    rlc.level,
    rlc.code,
    rlc.is_active
FROM referee_license_categories rlc
LEFT JOIN sports s ON s.id = rlc.sport_id
LEFT JOIN disciplines d ON d.id = rlc.discipline_id
ORDER BY s.name_ru, rlc.personnel_type, rlc.level;

COMMENT ON VIEW v_referee_categories_by_sport IS 'Категории лицензий по видам спорта';

-- Статистика категорий
CREATE OR REPLACE VIEW v_referee_categories_stats AS
SELECT 
    s.name_ru as sport_name,
    rlc.personnel_type,
    COUNT(*) as categories_count,
    MIN(rlc.level) as min_level,
    MAX(rlc.level) as max_level
FROM referee_license_categories rlc
LEFT JOIN sports s ON s.id = rlc.sport_id
WHERE rlc.is_active = TRUE
GROUP BY s.name_ru, rlc.personnel_type
ORDER BY s.name_ru, rlc.personnel_type;

COMMENT ON VIEW v_referee_categories_stats IS 'Статистика категорий по видам спорта и типам персонала';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE referee_license_categories IS 
'Справочник категорий лицензий для судей, комиссаров, статистиков и другого персонала.
Используется для автогенерации критериев типа "Судья 3х3 (Лицензия Б)".
Каждая категория имеет уровень (1-5) для определения иерархии.';
