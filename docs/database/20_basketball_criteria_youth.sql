-- ================================
-- Блок 20: Критерии резерва 5х5
-- ================================
-- ID: 1200-1349 (150 критериев)

-- ================================
-- СЕКЦИЯ 6: РЕЗЕРВ 5х5
-- ================================

-- 6.1. Воспитанники в профессиональных командах (1200-1201)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES
(1200, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_YOUTH_PRO_M', 'Воспитанник из региона, играющий за проф команды (М)', 'Воспитанники региона в профессиональных командах (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.7, 10, 1, TRUE),
(1201, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_YOUTH_PRO_W', 'Воспитанник из региона, играющий за проф команды (Ж)', 'Воспитанники региона в профессиональных командах (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.08, 10, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 6.2. Первенство России участие команд мужчины (1210-1219)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1210, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_INTERREGIONAL_M', 'Команды в ПР юноши U14-16 (межрегиональный этап)', 'Мужские команды U14-16 на межрегиональном этапе', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 1.8, 10, 220, 1, TRUE),
(1211, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R1_M', 'Команды в ПР юноши U14-16 (1-й раунд полуфинала)', 'Мужские команды U14-16 в 1-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 1.8, 10, 220, 1, TRUE),
(1212, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R2_M', 'Команды в ПР юноши U14-16 (2-й раунд полуфинала)', 'Мужские команды U14-16 во 2-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 1.8, 10, 220, 1, TRUE),
(1213, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R3_M', 'Команды в ПР юноши U14-16 (3-й раунд полуфинала)', 'Мужские команды U14-16 в 3-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE),
(1214, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_FINAL_M', 'Команды в ПР юноши U14-16 (финал)', 'Мужские команды U14-16 в финале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE),
(1215, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_INTERREGIONAL_M', 'Команды в ПР юноши U17-18 (межрегиональный этап)', 'Мужские команды U17-18 на межрегиональном этапе', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE),
(1216, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_SEMIFINAL_M', 'Команды в ПР юноши U17-18 (полуфинал)', 'Мужские команды U17-18 в полуфинале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE),
(1217, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_FINAL_M', 'Команды в ПР юноши U17-18 (финал)', 'Мужские команды U17-18 в финале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 6.3. ДЮБЛ мужчины (1220-1221)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1220, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_DYUBL_PRELIMINARY_M', 'Команды в предварительном этапе ДЮБЛ (М)', 'Мужские команды в предварительном этапе ДЮБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE),
(1221, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_DYUBL_FINAL_M', 'Команды в финале ДЮБЛ (М)', 'Мужские команды в финале ДЮБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 6.4. ЕМЛ ВТБ мужчины (1222-1223)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1222, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_YML_VTB_REGULAR_M', 'Команды в регулярном чемпионате U21 (ЕМЛ ВТБ)', 'Мужские команды U21 в регулярном чемпионате ЕМЛ ВТБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE),
(1223, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_YML_VTB_FINAL_M', 'Команды в финале чемпионата U21 ЕМЛ ВТБ', 'Мужские команды U21 в финале ЕМЛ ВТБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 6.5. Первенство России участие команд женщины (1230-1237)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1230, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_INTERREGIONAL_W', 'Команды в ПР девушки U14-16 (межрегиональный этап)', 'Женские команды U14-16 на межрегиональном этапе', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE),
(1231, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R1_W', 'Команды в ПР девушки U14-16 (1-й раунд полуфинала)', 'Женские команды U14-16 в 1-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE),
(1232, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R2_W', 'Команды в ПР девушки U14-16 (2-й раунд полуфинала)', 'Женские команды U14-16 во 2-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE),
(1233, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R3_W', 'Команды в ПР девушки U14-16 (3-й раунд полуфинала)', 'Женские команды U14-16 в 3-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE),
(1234, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_FINAL_W', 'Команды в ПР девушки U14-16 (финал)', 'Женские команды U14-16 в финале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE),
(1235, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_INTERREGIONAL_W', 'Команды в ПР юниорки U17-18 (межрегиональный этап)', 'Женские команды U17-18 на межрегиональном этапе', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE),
(1236, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_SEMIFINAL_W', 'Команды в ПР юниорки U17-18 (полуфинал)', 'Женские команды U17-18 в полуфинале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE),
(1237, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_FINAL_W', 'Команды в ПР юниорки U17-18 (финал)', 'Женские команды U17-18 в финале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 6.6. ДЮБЛ женщины (1240-1241)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1240, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_DYUBL_PRELIMINARY_W', 'Команды в предварительном этапе ДЮБЛ (Ж)', 'Женские команды в предварительном этапе ДЮБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.4, 10, 220, 2, TRUE),
(1241, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_DYUBL_FINAL_W', 'Команды в финале ДЮБЛ (Ж)', 'Женские команды в финале ДЮБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.4, 10, 220, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 6.7. Призовые места ПР мужчины (1250-1276) - 27 критериев
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES
-- U14
(1250, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U14_M', '3 место в ПР юноши U14', 'Мужская команда заняла 3 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.4, 10, 220, 1, 1, FALSE),
(1251, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U14_M', '2 место в ПР юноши U14', 'Мужская команда заняла 2 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.4, 10, 220, 1, 1, FALSE),
(1252, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U14_M', '1 место в ПР юноши U14', 'Мужская команда заняла 1 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.4, 10, 220, 1, 1, FALSE),
-- U15
(1253, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U15_M', '3 место в ПР юноши U15', 'Мужская команда заняла 3 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.0, 10, 220, 1, 2, FALSE),
(1254, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U15_M', '2 место в ПР юноши U15', 'Мужская команда заняла 2 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE),
(1255, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U15_M', '1 место в ПР юноши U15', 'Мужская команда заняла 1 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE),
-- U16
(1256, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U16_M', '3 место в ПР юноши U16', 'Мужская команда заняла 3 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 3, FALSE),
(1257, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U16_M', '2 место в ПР юноши U16', 'Мужская команда заняла 2 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 3, FALSE),
(1258, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U16_M', '1 место в ПР юноши U16', 'Мужская команда заняла 1 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 3, FALSE),
-- U17
(1259, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U17_M', '3 место в ПР юноши U17', 'Мужская команда заняла 3 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE),
(1260, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U17_M', '2 место в ПР юноши U17', 'Мужская команда заняла 2 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE),
(1261, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U17_M', '1 место в ПР юноши U17', 'Мужская команда заняла 1 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE),
-- U18
(1262, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U18_M', '3 место в ПР юноши U18', 'Мужская команда заняла 3 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 4, FALSE),
(1263, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U18_M', '2 место в ПР юноши U18', 'Мужская команда заняла 2 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 4, FALSE),
(1264, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U18_M', '1 место в ПР юноши U18', 'Мужская команда заняла 1 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 4, FALSE),
-- ДЮБЛ
(1265, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_DYUBL_M', '3 место в ДЮБЛ (М)', 'Мужская команда заняла 3 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 5, FALSE),
(1266, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_DYUBL_M', '2 место в ДЮБЛ (М)', 'Мужская команда заняла 2 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 5, FALSE),
(1267, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_DYUBL_M', '1 место в ДЮБЛ (М)', 'Мужская команда заняла 1 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, 5, FALSE),
-- ЕМЛ ВТБ
(1268, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_YML_VTB_M', '3 место в ЕМЛ ВТБ (М)', 'Мужская команда заняла 3 место в ЕМЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, 5, FALSE),
(1269, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_YML_VTB_M', '2 место в ЕМЛ ВТБ (М)', 'Мужская команда заняла 2 место в ЕМЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, 5, FALSE),
(1270, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_YML_VTB_M', '1 место в ЕМЛ ВТБ (М)', 'Мужская команда заняла 1 место в ЕМЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, 5, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 6.8. Призовые места ПР женщины (1280-1306) - 27 критериев
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES
-- U14
(1280, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U14_W', '3 место в ПР девушки U14', 'Женская команда заняла 3 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 1, FALSE),
(1281, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U14_W', '2 место в ПР девушки U14', 'Женская команда заняла 2 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 1, FALSE),
(1282, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U14_W', '1 место в ПР девушки U14', 'Женская команда заняла 1 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 1, FALSE),
-- U15
(1283, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U15_W', '3 место в ПР девушки U15', 'Женская команда заняла 3 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE),
(1284, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U15_W', '2 место в ПР девушки U15', 'Женская команда заняла 2 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE),
(1285, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U15_W', '1 место в ПР девушки U15', 'Женская команда заняла 1 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE),
-- U16
(1286, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U16_W', '3 место в ПР девушки U16', 'Женская команда заняла 3 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 3, FALSE),
(1287, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U16_W', '2 место в ПР девушки U16', 'Женская команда заняла 2 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 3, FALSE),
(1288, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U16_W', '1 место в ПР девушки U16', 'Женская команда заняла 1 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 3, FALSE),
-- U17
(1289, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U17_W', '3 место в ПР девушки U17', 'Женская команда заняла 3 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE),
(1290, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U17_W', '2 место в ПР девушки U17', 'Женская команда заняла 2 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE),
(1291, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U17_W', '1 место в ПР девушки U17', 'Женская команда заняла 1 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE),
-- U18
(1292, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U18_W', '3 место в ПР девушки U18', 'Женская команда заняла 3 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 4, FALSE),
(1293, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U18_W', '2 место в ПР девушки U18', 'Женская команда заняла 2 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 4, FALSE),
(1294, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U18_W', '1 место в ПР девушки U18', 'Женская команда заняла 1 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 4, FALSE),
-- ДЮБЛ
(1295, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_DYUBL_W', '3 место в ДЮБЛ (Ж)', 'Женская команда заняла 3 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 5, FALSE),
(1296, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_DYUBL_W', '2 место в ДЮБЛ (Ж)', 'Женская команда заняла 2 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 5, FALSE),
(1297, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_DYUBL_W', '1 место в ДЮБЛ (Ж)', 'Женская команда заняла 1 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 5, FALSE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- ИТОГО СОЗДАНО В ЭТОМ ФАЙЛЕ
-- ================================
-- ID 1200-1297: Резерв 5х5 (98 критериев)

SELECT setval('indicator_catalog_id_seq', 1500, false);

COMMENT ON TABLE indicator_catalog IS 
'Каталог критериев баскетбола РФБ.
ID 1200-1297: Резерв 5х5 (98 критериев).
Всего создано: 251 критерий.
Осталось: ~249 критериев.';
