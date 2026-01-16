-- ================================
-- Блок 21: Массовый баскетбол 5х5
-- ================================
-- ID: 1300-1399 (100 критериев)

-- ЛОКОБАСКЕТ (1300-1323) - 24 критерия
-- Участие мужчины (1300-1301)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1300, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_LOKOBASKET_REGIONAL_M', 'Команда в региональных соревнованиях Локобаскет (М)', 'Мужские команды в региональном этапе Локобаскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 1, TRUE),
(1301, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_LOKOBASKET_FINAL_M', 'Команда во Всероссийском финале Локобаскет (М)', 'Мужские команды во Всероссийском финале Локобаскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Участие женщины (1302-1303)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1302, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_LOKOBASKET_REGIONAL_W', 'Команда в региональных соревнованиях Локобаскет (Ж)', 'Женские команды в региональном этапе Локобаскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 2, TRUE),
(1303, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_LOKOBASKET_FINAL_W', 'Команда во Всероссийском финале Локобаскет (Ж)', 'Женские команды во Всероссийском финале Локобаскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Призовые места мужчины (1304-1309)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1304, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_LOKOBASKET_FO_M', '3 место в Финале ФО Локобаскет (М)', 'Мужская команда заняла 3 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE),
(1305, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_LOKOBASKET_FO_M', '2 место в Финале ФО Локобаскет (М)', 'Мужская команда заняла 2 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE),
(1306, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_LOKOBASKET_FO_M', '1 место в Финале ФО Локобаскет (М)', 'Мужская команда заняла 1 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE),
(1307, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_LOKOBASKET_RUSSIA_M', '3 место во Всероссийском финале Локобаскет (М)', 'Мужская команда заняла 3 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE),
(1308, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_LOKOBASKET_RUSSIA_M', '2 место во Всероссийском финале Локобаскет (М)', 'Мужская команда заняла 2 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE),
(1309, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_LOKOBASKET_RUSSIA_M', '1 место во Всероссийском финале Локобаскет (М)', 'Мужская команда заняла 1 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Призовые места женщины (1310-1315)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1310, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_LOKOBASKET_FO_W', '3 место в Финале ФО Локобаскет (Ж)', 'Женская команда заняла 3 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, FALSE),
(1311, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_LOKOBASKET_FO_W', '2 место в Финале ФО Локобаскет (Ж)', 'Женская команда заняла 2 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE),
(1312, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_LOKOBASKET_FO_W', '1 место в Финале ФО Локобаскет (Ж)', 'Женская команда заняла 1 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE),
(1313, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_LOKOBASKET_RUSSIA_W', '3 место во Всероссийском финале Локобаскет (Ж)', 'Женская команда заняла 3 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE),
(1314, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_LOKOBASKET_RUSSIA_W', '2 место во Всероссийском финале Локобаскет (Ж)', 'Женская команда заняла 2 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE),
(1315, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_LOKOBASKET_RUSSIA_W', '1 место во Всероссийском финале Локобаскет (Ж)', 'Женская команда заняла 1 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- КЭС-БАСКЕТ (1320-1343) - 24 критерия
-- Участие мужчины (1320-1321)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1320, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_KES_REGIONAL_M', 'Команда в региональных соревнованиях КЭС-Баскет (М)', 'Мужские команды в региональном этапе КЭС-Баскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.3, 10, 220, 1, TRUE),
(1321, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_KES_SUPERFINAL_M', 'Команда в Суперфинале КЭС-Баскет (М)', 'Мужские команды в Суперфинале КЭС-Баскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.3, 10, 220, 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Участие женщины (1322-1323)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1322, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_KES_REGIONAL_W', 'Команда в региональных соревнованиях КЭС-Баскет (Ж)', 'Женские команды в региональном этапе КЭС-Баскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.3, 10, 220, 2, TRUE),
(1323, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_KES_SUPERFINAL_W', 'Команда в Суперфинале КЭС-Баскет (Ж)', 'Женские команды в Суперфинале КЭС-Баскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.3, 10, 220, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Призовые места мужчины (1324-1329)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1324, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_KES_FO_M', '3 место в Финале ФО КЭС-Баскет (М)', 'Мужская команда заняла 3 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE),
(1325, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_KES_FO_M', '2 место в Финале ФО КЭС-Баскет (М)', 'Мужская команда заняла 2 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE),
(1326, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_KES_FO_M', '1 место в Финале ФО КЭС-Баскет (М)', 'Мужская команда заняла 1 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE),
(1327, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_KES_SUPERFINAL_M', '3 место в Суперфинале КЭС-Баскет (М)', 'Мужская команда заняла 3 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE),
(1328, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_KES_SUPERFINAL_M', '2 место в Суперфинале КЭС-Баскет (М)', 'Мужская команда заняла 2 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE),
(1329, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_KES_SUPERFINAL_M', '1 место в Суперфинале КЭС-Баскет (М)', 'Мужская команда заняла 1 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Призовые места женщины (1330-1335)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1330, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_KES_FO_W', '3 место в Финале ФО КЭС-Баскет (Ж)', 'Женская команда заняла 3 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE),
(1331, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_KES_FO_W', '2 место в Финале ФО КЭС-Баскет (Ж)', 'Женская команда заняла 2 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.5, 10, 220, 2, FALSE),
(1332, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_KES_FO_W', '1 место в Финале ФО КЭС-Баскет (Ж)', 'Женская команда заняла 1 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.7, 10, 220, 2, FALSE),
(1333, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_KES_SUPERFINAL_W', '3 место в Суперфинале КЭС-Баскет (Ж)', 'Женская команда заняла 3 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.7, 10, 220, 2, FALSE),
(1334, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_KES_SUPERFINAL_W', '2 место в Суперфинале КЭС-Баскет (Ж)', 'Женская команда заняла 2 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.7, 10, 220, 2, FALSE),
(1335, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_KES_SUPERFINAL_W', '1 место в Суперфинале КЭС-Баскет (Ж)', 'Женская команда заняла 1 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.7, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- АСБ (1340-1369) - 30 критериев
-- Дивизионы мужчины (1340-1342)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1340, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_START_DIV_M', 'Региональный дивизион Старт АСБ (М)', 'Наличие регионального дивизиона Старт АСБ (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.5, 10, 220, 1, FALSE),
(1341, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_BASE_DIV_M', 'Региональный дивизион Базовый АСБ (М)', 'Наличие регионального дивизиона Базовый АСБ (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 7.5, 10, 220, 1, FALSE),
(1342, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_TOP_DIV_M', 'Региональный дивизион Топ АСБ (М)', 'Наличие регионального дивизиона Топ АСБ (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 10.5, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Дивизионы женщины (1343-1345)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1343, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_START_DIV_W', 'Региональный дивизион Старт АСБ (Ж)', 'Наличие регионального дивизиона Старт АСБ (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.5, 10, 220, 2, FALSE),
(1344, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_BASE_DIV_W', 'Региональный дивизион Базовый АСБ (Ж)', 'Наличие регионального дивизиона Базовый АСБ (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 7.5, 10, 220, 2, FALSE),
(1345, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_TOP_DIV_W', 'Региональный дивизион Топ АСБ (Ж)', 'Наличие регионального дивизиона Топ АСБ (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 10.5, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Участие команд мужчины (1346-1349)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1346, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_REGIONAL_M', 'Команда в региональном дивизионе АСБ (М)', 'Мужские команды в региональном дивизионе АСБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 1, TRUE),
(1347, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_HIGHER_M', 'Команда в высшем дивизионе АСБ (М)', 'Мужские команды в высшем дивизионе АСБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 1, TRUE),
(1348, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_BELOV_M', 'Команда в Лиге Белова (М)', 'Мужские команды в Лиге Белова', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 1, TRUE),
(1349, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_RZD_M', 'Команда в СЛ РЖД (М)', 'Мужские команды в Студенческой лиге РЖД', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Участие команд женщины (1350-1353)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1350, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_REGIONAL_W', 'Команда в региональном дивизионе АСБ (Ж)', 'Женские команды в региональном дивизионе АСБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 2, TRUE),
(1351, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_HIGHER_W', 'Команда в высшем дивизионе АСБ (Ж)', 'Женские команды в высшем дивизионе АСБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 2, TRUE),
(1352, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_BELOV_W', 'Команда в Лиге Белова (Ж)', 'Женские команды в Лиге Белова', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 1.8, 10, 220, 2, TRUE),
(1353, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_RZD_W', 'Команда в СЛ РЖД (Ж)', 'Женские команды в Студенческой лиге РЖД', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Призовые места мужчины (1354-1362)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1354, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_HIGHER_M', '3 место в Высшем дивизионе АСБ (М)', 'Мужская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1355, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_HIGHER_M', '2 место в Высшем дивизионе АСБ (М)', 'Мужская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1356, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_HIGHER_M', '1 место в Высшем дивизионе АСБ (М)', 'Мужская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1357, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_RZD_M', '3 место в СЛ РЖД (М)', 'Мужская команда заняла 3 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1358, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_RZD_M', '2 место в СЛ РЖД (М)', 'Мужская команда заняла 2 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1359, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_RZD_M', '1 место в СЛ РЖД (М)', 'Мужская команда заняла 1 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1360, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_BELOV_M', '3 место в ЛБ (М)', 'Мужская команда заняла 3 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1361, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_BELOV_M', '2 место в ЛБ (М)', 'Мужская команда заняла 2 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1362, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_BELOV_M', '1 место в ЛБ (М)', 'Мужская команда заняла 1 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Призовые места женщины (1363-1371)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1363, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_HIGHER_W', '3 место в Высшем дивизионе АСБ (Ж)', 'Женская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1364, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_HIGHER_W', '2 место в Высшем дивизионе АСБ (Ж)', 'Женская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1365, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_HIGHER_W', '1 место в Высшем дивизионе АСБ (Ж)', 'Женская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1366, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_RZD_W', '3 место в СЛ РЖД (Ж)', 'Женская команда заняла 3 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1367, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_RZD_W', '2 место в СЛ РЖД (Ж)', 'Женская команда заняла 2 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1368, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_RZD_W', '1 место в СЛ РЖД (Ж)', 'Женская команда заняла 1 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1369, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_BELOV_W', '3 место в ЛБ (Ж)', 'Женская команда заняла 3 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1370, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_BELOV_W', '2 место в ЛБ (Ж)', 'Женская команда заняла 2 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1371, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_BELOV_W', '1 место в ЛБ (Ж)', 'Женская команда заняла 1 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- МЛБЛ + Ветераны (1372-1399) будут в следующем файле

SELECT setval('indicator_catalog_id_seq', 1500, false);

COMMENT ON TABLE indicator_catalog IS 
'ID 1300-1371: Массовый баскетбол - Локобаскет, КЭС-Баскет, АСБ (72 критерия).';
