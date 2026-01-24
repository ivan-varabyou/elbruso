-- Сортировка и очистка перед сидом
DELETE FROM template_generation_params;
DELETE FROM indicator_generation_templates;

-- 1. Шаблон: Призовые места (Сборные)
INSERT INTO indicator_generation_templates (
    id, name_ru, description, category_id, sport_id, value_type, measurement_unit_id,
    base_weight, name_pattern, code_pattern, is_active
) VALUES (
    1, 
    'Призовые места в сборных (Мужчины/Женщины)', 
    'Автогенерация мест 1-3 для национальных сборных', 
    4, -- Достижения
    10, -- Баскетбол
    'number', 
    24, -- мест
    10.0, 
    '{place} место сборной {age} ({gender}) в {discipline}', 
    'BBL_{discipline_code}_{gender}_{age_code}_NAT_PLACE_{place}',
    TRUE
);

-- Параметры для шаблона 1
INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
-- Пол (Мужчины/Женщины)
(1, 'gender', 'gender', '[1, 2]'::jsonb, NULL, 1),
-- Возраст (U18, Взрослые)
(1, 'age_group', 'age_group', '[4, 8]'::jsonb, '{"4": "* 0.8", "8": "* 1.2"}'::jsonb, 2),
-- Дисциплина (5x5)
(1, 'discipline', 'discipline', '[220]'::jsonb, NULL, 3),
-- Место (1, 2, 3)
(1, 'place', 'place', '["1", "2", "3"]'::jsonb, '{"1": "* 1.0", "2": "* 0.6", "3": "* 0.4"}'::jsonb, 4);


-- 2. Шаблон: Воспитанники в проф клубах
INSERT INTO indicator_generation_templates (
    id, name_ru, description, category_id, sport_id, value_type, measurement_unit_id,
    base_weight, name_pattern, code_pattern, is_active
) VALUES (
    2, 
    'Воспитанники в профессиональных клубах', 
    'Количество воспитанников региона в проф клубах', 
    4, -- Достижения
    10, -- Баскетбол
    'number', 
    1, -- человек
    5.0, 
    'Воспитанники ({gender}) в проф лигах ({discipline})', 
    'BBL_{discipline_code}_{gender}_PRO_PLAYERS',
    TRUE
);

-- Параметры для шаблона 2
INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
(2, 'gender', 'gender', '[1, 2]'::jsonb, NULL, 1),
(2, 'discipline', 'discipline', '[220]'::jsonb, NULL, 2);

-- Сброс сиквенсов
SELECT setval('indicator_generation_templates_id_seq', (SELECT MAX(id) FROM indicator_generation_templates));
