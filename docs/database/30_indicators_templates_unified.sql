-- ================================
-- Блок 30: Унифицированные шаблоны индикаторов (ББ и ЛА)
-- ================================

-- Удаляем старые шаблоны ББ, если они были, чтобы перезаписать на новые с привязкой к ID
DELETE FROM indicator_generation_templates WHERE code IN ('BBL_PRIZE_PLACES', 'BBL_TEAM_PARTICIPATION', 'BBL_NATIONAL_TEAMS', 'BBL_REFEREES');

-- ================================
-- 1. БАСКЕТБОЛ (Sport ID: 10)
-- ================================

-- 1.1 Места в турнирах
INSERT INTO indicator_generation_templates (
    code, name_ru, description, category_id, sport_id, value_type, measurement_unit_id,
    base_weight, use_population, name_pattern, code_pattern
) VALUES (
    'BBL_PRIZE_PLACES_V2', 'Призовые места (баскетбол)', 'Генерация мест с привязкой к событиям',
    (SELECT id FROM indicator_categories WHERE code = 'achievements'), 10, 'number',
    (SELECT id FROM measurement_units WHERE code = 'places'), 5.0, FALSE,
    '{place} место: {event} ({age}, {gender}, {discipline})',
    'BBL_PLACE_{place}_{event}_{age}_{gender}_{discipline}'
);

INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES_V2'), 
 'place', 'place', '["1", "2", "3"]'::jsonb, '{"1": "* 1.0", "2": "* 0.6", "3": "* 0.4"}'::jsonb, 1),
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES_V2'), 
 'event_id', 'event_id', (SELECT jsonb_agg(id) FROM events_catalog WHERE sport_id = 10 AND code IN ('BBL_SUPERLEAGUE_M', 'BBL_SUPERLEAGUE_W', 'BBL_KES_BASKET', 'BBL_LOKOBASKET', 'BBL_ASB')), NULL, 2),
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES_V2'), 
 'gender', 'gender', '[1, 2]'::jsonb, NULL, 3),
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES_V2'), 
 'age_group', 'age', '[4, 5, 8]'::jsonb, NULL, 4),
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_PRIZE_PLACES_V2'), 
 'discipline', 'discipline', '[220, 219]'::jsonb, NULL, 5);

-- 1.2 Судьи
INSERT INTO indicator_generation_templates (
    code, name_ru, description, category_id, sport_id, value_type, measurement_unit_id,
    base_weight, use_population, name_pattern, code_pattern
) VALUES (
    'BBL_REFEREES_V2', 'Судьи по категориям (баскетбол)', 'Генерация судей с привязкой к категориям',
    (SELECT id FROM indicator_categories WHERE code = 'personnel'), 10, 'number',
    (SELECT id FROM measurement_units WHERE code = 'people'), 0.05, TRUE,
    'Судья {discipline}: {license}',
    'BBL_REF_{discipline}_{license}'
);

INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_REFEREES_V2'), 
 'discipline', 'discipline', '[220, 219]'::jsonb, NULL, 1),
((SELECT id FROM indicator_generation_templates WHERE code = 'BBL_REFEREES_V2'), 
 'license_category', 'license', (SELECT jsonb_agg(id) FROM referee_license_categories WHERE sport_id = 10 AND personnel_type = 'referee'), 
 '{"1": "* 1.0", "2": "* 1.5", "3": "* 2.0"}'::jsonb, 2);

-- ================================
-- 2. ЛЕГКАЯ АТЛЕТИКА (Sport ID: 3)
-- ================================

-- 2.1 Участие и медали
INSERT INTO indicator_generation_templates (
    code, name_ru, description, category_id, sport_id, value_type, measurement_unit_id,
    base_weight, use_population, name_pattern, code_pattern
) VALUES (
    'ATH_COMPETITIONS_V2', 'Соревнования (легкая атлетика)', 'Участие и призовые места в ЛА',
    (SELECT id FROM indicator_categories WHERE code = 'achievements'), 3, 'number',
    (SELECT id FROM measurement_units WHERE code = 'places'), 4.0, FALSE,
    '{place} место: {event} ({age}, {gender})',
    'ATH_PLACE_{place}_{event}_{age}_{gender}'
);

INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
((SELECT id FROM indicator_generation_templates WHERE code = 'ATH_COMPETITIONS_V2'), 
 'place', 'place', '["1", "2", "3"]'::jsonb, '{"1": "* 1.0", "2": "* 0.6", "3": "* 0.4"}'::jsonb, 1),
((SELECT id FROM indicator_generation_templates WHERE code = 'ATH_COMPETITIONS_V2'), 
 'event_id', 'event_id', (SELECT jsonb_agg(id) FROM events_catalog WHERE sport_id = 3 AND code LIKE 'ATH_PR%'), NULL, 2),
((SELECT id FROM indicator_generation_templates WHERE code = 'ATH_COMPETITIONS_V2'), 
 'gender', 'gender', '[1, 2]'::jsonb, NULL, 3),
((SELECT id FROM indicator_generation_templates WHERE code = 'ATH_COMPETITIONS_V2'), 
 'age_group', 'age', '[3, 4, 5, 6]'::jsonb, NULL, 4);

-- 2.2 Судьи ЛА
INSERT INTO indicator_generation_templates (
    code, name_ru, description, category_id, sport_id, value_type, measurement_unit_id,
    base_weight, use_population, name_pattern, code_pattern
) VALUES (
    'ATH_REFEREES_V2', 'Судьи (легкая атлетика)', 'Судьи ЛА по категориям',
    (SELECT id FROM indicator_categories WHERE code = 'personnel'), 3, 'number',
    (SELECT id FROM measurement_units WHERE code = 'people'), 0.04, TRUE,
    'Судья ЛА: {license}',
    'ATH_REF_{license}'
);

INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, sort_order) VALUES
((SELECT id FROM indicator_generation_templates WHERE code = 'ATH_REFEREES_V2'), 
 'license_category', 'license', (SELECT jsonb_agg(id) FROM referee_license_categories WHERE sport_id = 3 AND personnel_type = 'referee'), 1);
