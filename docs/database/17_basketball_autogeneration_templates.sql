-- ================================
-- Блок 17: Шаблоны автогенерации для баскетбола
-- ================================
-- Создание шаблонов для автоматической генерации критериев

-- ================================
-- 1. ШАБЛОН: Призовые места в соревнованиях
-- ================================

INSERT INTO indicator_generation_templates (
    code, name_ru, description,
    category_id, sport_id, value_type, measurement_unit_id,
    base_weight, use_population,
    name_pattern, code_pattern, description_pattern
) VALUES (
    'BBL_PRIZE_PLACES',
    'Призовые места в соревнованиях (баскетбол)',
    'Автогенерация критериев для призовых мест в турнирах и лигах',
    (SELECT id FROM indicator_categories WHERE code = 'achievements'),
    10,  -- Баскетбол
    'number',
    (SELECT id FROM measurement_units WHERE code = 'places'),
    5.0,  -- Базовый вес
    FALSE,
    '{place} место в {event} {discipline} {age} {gender}',
    'BBL_{event}_{discipline}_{age}_{gender}_PLACE_{place}',
    'Команда заняла {place} место в соревновании {event}'
) ON CONFLICT (code) DO NOTHING;

-- Параметры шаблона "Призовые места"
INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
-- Места (диапазон 1-7)
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES'),
 'place', 'place', 
 '{"type": "range", "from": 1, "to": 7}'::jsonb,
 '{"1": "* 1.0", "2": "* 0.8", "3": "* 0.6", "4": "* 0.4", "5": "* 0.3", "6": "* 0.2", "7": "* 0.1"}'::jsonb,
 1),

-- События (выбор основных турниров)
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES'),
 'event', 'event',
 '["SUPERLEAGUE", "HIGHER_LEAGUE", "CHAMPIONSHIP_U18", "CHAMPIONSHIP_U20", "3X3_CHAMPIONSHIP", "3X3_CHAMPIONSHIP_U18", "3X3_CHAMPIONSHIP_U23"]'::jsonb,
 NULL,
 2),

-- Дисциплина (опционально)
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES'),
 'discipline', 'discipline',
 '[220, 219]'::jsonb,  -- 5х5, 3х3
 NULL,
 3),

-- Пол (опционально)
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES'),
 'gender', 'gender',
 '[1, 2]'::jsonb,  -- М, Ж
 NULL,
 4),

-- Возраст (опционально)
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES'),
 'age_group', 'age',
 '[4, 5, 8]'::jsonb,  -- U18, U20, Взрослые
 NULL,
 5)

ON CONFLICT DO NOTHING;

-- ================================
-- 2. ШАБЛОН: Участие команд в лигах/турнирах
-- ================================

INSERT INTO indicator_generation_templates (
    code, name_ru, description,
    category_id, sport_id, value_type, measurement_unit_id,
    base_weight, use_population,
    name_pattern, code_pattern, description_pattern
) VALUES (
    'BBL_TEAM_PARTICIPATION',
    'Участие команд в лигах и турнирах (баскетбол)',
    'Автогенерация критериев для участия команд в соревнованиях',
    (SELECT id FROM indicator_categories WHERE code = 'achievements'),
    10,
    'number',
    (SELECT id FROM measurement_units WHERE code = 'teams'),
    3.0,
    TRUE,  -- Нормализация на население
    'Команда {discipline} в {event} {age} {gender}',
    'BBL_TEAM_{event}_{discipline}_{age}_{gender}',
    'Количество команд региона в соревновании {event}'
) ON CONFLICT (code) DO NOTHING;

-- Параметры шаблона "Участие команд"
INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, sort_order) VALUES
-- События
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_TEAM_PARTICIPATION'),
 'event', 'event',
 '["SUPERLEAGUE", "HIGHER_LEAGUE", "PREMIER_LEAGUE", "INTERREGIONAL", "KES_BASKET", "LOKOBASKET", "ASB", "MLBL", "3X3_SPARTAKIADA"]'::jsonb,
 1),

-- Дисциплина
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_TEAM_PARTICIPATION'),
 'discipline', 'discipline',
 '[220, 219]'::jsonb,
 2),

-- Пол (опционально)
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_TEAM_PARTICIPATION'),
 'gender', 'gender',
 '[1, 2]'::jsonb,
 3),

-- Возраст (опционально)
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_TEAM_PARTICIPATION'),
 'age_group', 'age',
 '[1, 3, 4, 5]'::jsonb,  -- U14, U16, U18, U20
 4)

ON CONFLICT DO NOTHING;

-- ================================
-- 3. ШАБЛОН: Члены сборных команд
-- ================================

INSERT INTO indicator_generation_templates (
    code, name_ru, description,
    category_id, sport_id, value_type, measurement_unit_id,
    base_weight, use_population,
    name_pattern, code_pattern, description_pattern
) VALUES (
    'BBL_NATIONAL_TEAMS',
    'Члены сборных команд России (баскетбол)',
    'Автогенерация критериев для членов сборных по возрастам',
    (SELECT id FROM indicator_categories WHERE code = 'achievements'),
    10,
    'number',
    (SELECT id FROM measurement_units WHERE code = 'people'),
    10.0,
    TRUE,
    'Сборная {discipline} {age} {gender}',
    'BBL_NATIONAL_TEAM_{discipline}_{age}_{gender}',
    'Члены сборной команды России {discipline} {age} {gender}'
) ON CONFLICT (code) DO NOTHING;

-- Параметры шаблона "Сборные"
INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
-- Дисциплина
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_NATIONAL_TEAMS'),
 'discipline', 'discipline',
 '[220, 219]'::jsonb,
 '{"220": "* 1.0", "219": "* 0.8"}'::jsonb,  -- 5х5 весит больше
 1),

-- Возраст
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_NATIONAL_TEAMS'),
 'age_group', 'age',
 '[1, 2, 3, 4, 5, 6, 8]'::jsonb,  -- U14, U15, U16, U18, U20, U23, Взрослые
 '{"8": "* 1.5", "6": "* 1.2", "5": "* 1.0", "4": "* 0.8", "3": "* 0.6", "2": "* 0.5", "1": "* 0.4"}'::jsonb,
 2),

-- Пол
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_NATIONAL_TEAMS'),
 'gender', 'gender',
 '[1, 2]'::jsonb,
 NULL,
 3)

ON CONFLICT DO NOTHING;

-- ================================
-- 4. ШАБЛОН: Судьи по категориям
-- ================================

INSERT INTO indicator_generation_templates (
    code, name_ru, description,
    category_id, sport_id, value_type, measurement_unit_id,
    base_weight, use_population,
    name_pattern, code_pattern, description_pattern
) VALUES (
    'BBL_REFEREES',
    'Судьи по категориям (баскетбол)',
    'Автогенерация критериев для судей разных категорий',
    (SELECT id FROM indicator_categories WHERE code = 'personnel'),
    10,
    'number',
    (SELECT id FROM measurement_units WHERE code = 'people'),
    0.05,
    TRUE,
    'Судья {discipline} ({license})',
    'BBL_REFEREE_{discipline}_{license}',
    'Количество судей {discipline} с лицензией {license}'
) ON CONFLICT (code) DO NOTHING;

-- Параметры шаблона "Судьи"
INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
-- Дисциплина
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_REFEREES'),
 'discipline', 'discipline',
 '[220, 219]'::jsonb,
 NULL,
 1),

-- Категория лицензии (из referee_license_categories)
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_REFEREES'),
 'license_category', 'license',
 (SELECT jsonb_agg(id) FROM referee_license_categories WHERE sport_id = 10 AND personnel_type = 'referee'),
 '{"1": "* 1.0", "2": "* 1.5", "3": "* 2.0", "4": "* 3.0"}'::jsonb,  -- Вес по уровню
 2)

ON CONFLICT DO NOTHING;

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_generation_templates IS 
'Шаблоны для автогенерации критериев баскетбола.
Каждый шаблон определяет паттерн для создания множества критериев
через комбинации параметров (события, места, возраста, пола и т.д.).';
