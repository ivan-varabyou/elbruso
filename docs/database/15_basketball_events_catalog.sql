-- ================================
-- Блок 15: Каталог событий баскетбола
-- ================================
-- Все турниры, лиги и соревнования для автогенерации критериев

-- ================================
-- 1. ПРОФЕССИОНАЛЬНЫЕ ЛИГИ 5х5
-- ================================

-- Суперлига мужчины
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, gender_id) VALUES
('BBL_SUPERLEAGUE_M', 'Суперлига (мужчины)', 'Суперлига М', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 1)
ON CONFLICT (code) DO NOTHING;

-- Суперлига женщины
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, gender_id) VALUES
('BBL_SUPERLEAGUE_W', 'Суперлига (женщины)', 'Суперлига Ж', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 2)
ON CONFLICT (code) DO NOTHING;

-- Высшая лига мужчины
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, gender_id) VALUES
('BBL_HIGHER_LEAGUE_M', 'Высшая лига (мужчины)', 'Высшая лига М', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 1)
ON CONFLICT (code) DO NOTHING;

-- Высшая лига женщины
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, gender_id) VALUES
('BBL_HIGHER_LEAGUE_W', 'Высшая лига (женщины)', 'Высшая лига Ж', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 2)
ON CONFLICT (code) DO NOTHING;

-- Премьер-лига женщины
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, gender_id) VALUES
('BBL_PREMIER_LEAGUE_W', 'Премьер-лига (женщины)', 'Премьер-лига Ж', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 2)
ON CONFLICT (code) DO NOTHING;

-- Межрегиональные соревнования
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_INTERREGIONAL', 'Межрегиональные соревнования', 'Межрегион.', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'federal_district'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 2. КУБКИ И ЧЕМПИОНАТЫ 5х5
-- ================================

-- Кубок России
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_CUP_RUSSIA', 'Кубок России', 'КР', 
 (SELECT id FROM event_types WHERE code = 'cup'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- Суперкубок
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_SUPERCUP', 'Суперкубок России', 'Суперкубок', 
 (SELECT id FROM event_types WHERE code = 'cup'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 3. МЕЖДУНАРОДНЫЕ ТУРНИРЫ 5х5
-- ================================

-- Евролига
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_EUROLEAGUE', 'Евролига', 'Евролига', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'international'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- Еврокубок
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_EUROCUP', 'Еврокубок', 'Еврокубок', 
 (SELECT id FROM event_types WHERE code = 'cup'),
 (SELECT id FROM event_levels WHERE code = 'international'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- ЕЛ ВТБ
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_VTB_LEAGUE', 'Единая лига ВТБ', 'ЕЛ ВТБ', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'international'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- FIBA Europe Cup
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_FIBA_EUROPE_CUP', 'Кубок Европы FIBA', 'FIBA Europe Cup', 
 (SELECT id FROM event_types WHERE code = 'cup'),
 (SELECT id FROM event_levels WHERE code = 'international'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- FIBA Champions League
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_FIBA_CHAMPIONS', 'Лига Чемпионов FIBA', 'FIBA Champions', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'international'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 4. МОЛОДЕЖНЫЕ ТУРНИРЫ 5х5
-- ================================

-- Первенство России U14
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, age_group_id) VALUES
('BBL_CHAMPIONSHIP_U14', 'Первенство России U14', 'ПР U14', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 1)
ON CONFLICT (code) DO NOTHING;

-- Первенство России U16
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, age_group_id) VALUES
('BBL_CHAMPIONSHIP_U16', 'Первенство России U16', 'ПР U16', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 3)
ON CONFLICT (code) DO NOTHING;

-- Первенство России U18
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, age_group_id) VALUES
('BBL_CHAMPIONSHIP_U18', 'Первенство России U18', 'ПР U18', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 4)
ON CONFLICT (code) DO NOTHING;

-- Первенство России U20
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, age_group_id) VALUES
('BBL_CHAMPIONSHIP_U20', 'Первенство России U20', 'ПР U20', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 5)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 5. ШКОЛЬНЫЕ И СТУДЕНЧЕСКИЕ ТУРНИРЫ 5х5
-- ================================

-- КЭС-Баскет
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_KES_BASKET', 'КЭС-Баскет', 'КЭС', 
 (SELECT id FROM event_types WHERE code = 'tournament'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- Локобаскет
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_LOKOBASKET', 'Локобаскет', 'Локобаскет', 
 (SELECT id FROM event_types WHERE code = 'tournament'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- АСБ (Ассоциация студенческого баскетбола)
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_ASB', 'Чемпионат АСБ', 'АСБ', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- Лига Белова
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_BELOV_LEAGUE', 'Лига Белова', 'ЛБ', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- СЛ РЖД
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_SL_RZD', 'Студенческая лига РЖД', 'СЛ РЖД', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 6. ЛЮБИТЕЛЬСКИЕ ЛИГИ 5х5
-- ================================

-- МЛБЛ (Мужская лига любительского баскетбола)
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, gender_id) VALUES
('BBL_MLBL_M', 'МЛБЛ (мужчины)', 'МЛБЛ М', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 1)
ON CONFLICT (code) DO NOTHING;

-- МЛБЛ женщины
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, gender_id) VALUES
('BBL_MLBL_W', 'МЛБЛ (женщины)', 'МЛБЛ Ж', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220, 2)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- 7. ТУРНИРЫ 3х3
-- ================================

-- Чемпионат России 3х3
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_3X3_CHAMPIONSHIP', 'Чемпионат России 3х3', 'ЧР 3х3', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 219)
ON CONFLICT (code) DO NOTHING;

-- Кубок России 3х3
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_3X3_CUP', 'Кубок России 3х3', 'КР 3х3', 
 (SELECT id FROM event_types WHERE code = 'cup'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 219)
ON CONFLICT (code) DO NOTHING;

-- Первенство России 3х3 U18
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, age_group_id) VALUES
('BBL_3X3_CHAMPIONSHIP_U18', 'Первенство России 3х3 U18', 'ПР 3х3 U18', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 219, 4)
ON CONFLICT (code) DO NOTHING;

-- Первенство России 3х3 U23
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id, age_group_id) VALUES
('BBL_3X3_CHAMPIONSHIP_U23', 'Первенство России 3х3 U23', 'ПР 3х3 U23', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 219, 6)
ON CONFLICT (code) DO NOTHING;

-- Спартакиада сильнейших спортсменов 3х3
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_3X3_SPARTAKIADA', 'Спартакиада сильнейших спортсменов 3х3', 'Спартакиада 3х3', 
 (SELECT id FROM event_types WHERE code = 'tournament'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 219)
ON CONFLICT (code) DO NOTHING;

-- Мировой тур 3х3
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_3X3_WORLD_TOUR', 'Мировой тур 3х3', 'World Tour 3х3', 
 (SELECT id FROM event_types WHERE code = 'series'),
 (SELECT id FROM event_levels WHERE code = 'international'), 10, 219)
ON CONFLICT (code) DO NOTHING;

-- Челленджер 3х3
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_3X3_CHALLENGER', 'Челленджер 3х3', 'Challenger 3х3', 
 (SELECT id FROM event_types WHERE code = 'tournament'),
 (SELECT id FROM event_levels WHERE code = 'international'), 10, 219)
ON CONFLICT (code) DO NOTHING;

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE events_catalog IS 
'Каталог всех баскетбольных событий для автогенерации критериев.
Включает профессиональные лиги, молодежные турниры, любительские соревнования,
международные турниры и события 3х3.';
