-- ================================
-- Блок 29: Привязка индикаторов к сущностям (Events, License Categories)
-- ================================

-- 1. Добавление колонок в indicator_catalog для явной связи
ALTER TABLE indicator_catalog 
ADD COLUMN IF NOT EXISTS event_id INTEGER REFERENCES events_catalog(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS license_category_id INTEGER REFERENCES referee_license_categories(id) ON DELETE SET NULL;

COMMENT ON COLUMN indicator_catalog.event_id IS 'Связь с конкретным событием из каталога (для автогенерируемых индикаторов)';
COMMENT ON COLUMN indicator_catalog.license_category_id IS 'Связь с категорией лицензии персонала (для автогенерируемых индикаторов)';

-- 2. Добавление недостающих событий в events_catalog для баскетбола
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id, discipline_id) VALUES
('BBL_KES_BASKET', 'КЭС-Баскет', 'КЭС', 
 (SELECT id FROM event_types WHERE code = 'tournament'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220),
('BBL_LOKOBASKET', 'Локобаскет', 'Локобаскет', 
 (SELECT id FROM event_types WHERE code = 'tournament'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220),
('BBL_ASB', 'Чемпионат АСБ', 'АСБ', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220),
('BBL_MLBL', 'МЛБЛ', 'МЛБЛ', 
 (SELECT id FROM event_types WHERE code = 'league'),
 (SELECT id FROM event_levels WHERE code = 'national'), 10, 220)
ON CONFLICT (code) DO NOTHING;

-- 3. Добавление событий для легкой атлетики
INSERT INTO events_catalog (code, name_ru, short_name_ru, event_type_id, level_id, sport_id) VALUES
('ATH_CHAMPIONSHIP_RUSSIA', 'Чемпионат России по легкой атлетике', 'ЧР ЛА', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 3),
('ATH_CUP_RUSSIA', 'Кубок России по легкой атлетике', 'КР ЛА', 
 (SELECT id FROM event_types WHERE code = 'cup'),
 (SELECT id FROM event_levels WHERE code = 'national'), 3),
('ATH_PR_U14', 'Первенство России U14', 'ПР U14', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 3),
('ATH_PR_U16', 'Первенство России U16', 'ПР U16', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 3),
('ATH_PR_U18', 'Первенство России U18', 'ПР U18', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 3),
('ATH_PR_U20', 'Первенство России U20', 'ПР U20', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 3),
('ATH_PR_U23', 'Первенство России U23', 'ПР U23', 
 (SELECT id FROM event_types WHERE code = 'championship'),
 (SELECT id FROM event_levels WHERE code = 'national'), 3)
ON CONFLICT (code) DO NOTHING;
