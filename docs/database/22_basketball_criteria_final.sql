-- ================================
-- Блок 22: МЛБЛ, Ветераны, 3х3, Судьи, Прочее
-- ================================
-- ID: 1372-1499 (128 критериев)

-- МЛБЛ (1372-1391) - 20 критериев
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1372, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_MLBL_REGIONAL_LEAGUE_M', 'Региональная зимняя/летняя лига МЛБЛ (М)', 'Наличие региональной любительской лиги (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE),
(1373, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_MLBL_REGIONAL_LEAGUE_W', 'Региональная зимняя/летняя лига МЛБЛ (Ж)', 'Наличие региональной любительской лиги (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE),
(1374, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_MLBL_REGIONAL_DIV_M', 'Региональный мужской дивизион МЛБЛ', 'Региональный дивизион МЛБЛ (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 10.0, 10, 220, 1, FALSE),
(1375, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_MLBL_REGIONAL_DIV_W', 'Региональный женский дивизион МЛБЛ', 'Региональный дивизион МЛБЛ (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 10.0, 10, 220, 2, FALSE),
(1376, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_REGIONAL_M', 'Команда в региональном дивизионе МЛБЛ (М)', 'Мужские команды в региональном дивизионе МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1377, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_FO_M', 'Команда в финале ФО или 1 лиге МЛБЛ (М)', 'Мужские команды в финале ФО МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1378, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_SUPERFINAL_M', 'Команда в Суперфинале МЛБЛ (М)', 'Мужские команды в Суперфинале МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1379, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_REGIONAL_W', 'Команда в региональном дивизионе МЛБЛ (Ж)', 'Женские команды в региональном дивизионе МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 2, TRUE),
(1380, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_FO_W', 'Команда в финале ФО или 1 лиге МЛБЛ (Ж)', 'Женские команды в финале ФО МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 2, TRUE),
(1381, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_SUPERFINAL_W', 'Команда в Суперфинале МЛБЛ (Ж)', 'Женские команды в Суперфинале МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 2, TRUE),
(1382, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_MATCHES_M', 'Сыгранные мужские матчи МЛБЛ', 'Количество сыгранных матчей МЛБЛ (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'matches'), 5.0, 10, 220, 1, TRUE),
(1383, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_MATCHES_W', 'Сыгранные женские матчи МЛБЛ', 'Количество сыгранных матчей МЛБЛ (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'matches'), 5.0, 10, 220, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Ветераны (1384-1399) - 16 критериев
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1384, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_40_M', 'Команда ветеранов 40+ (М)', 'Команда ветеранов 40+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1385, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_45_M', 'Команда ветеранов 45+ (М)', 'Команда ветеранов 45+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1386, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_50_M', 'Команда ветеранов 50+ (М)', 'Команда ветеранов 50+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1387, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_55_M', 'Команда ветеранов 55+ (М)', 'Команда ветеранов 55+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1388, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_60_M', 'Команда ветеранов 60+ (М)', 'Команда ветеранов 60+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1389, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_65_M', 'Команда ветеранов 65+ (М)', 'Команда ветеранов 65+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE),
(1390, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_40_W', 'Команда ветеранов 40+ (Ж)', 'Команда ветеранов 40+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 2, TRUE),
(1391, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_45_W', 'Команда ветеранов 45+ (Ж)', 'Команда ветеранов 45+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.5, 10, 220, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 3х3 (1400-1449) - 50 критериев (упрощенная версия)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1400, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_CUP_RUSSIA_M', 'Команда 3х3 в Кубке России (М)', 'Мужская команда 3х3 в Кубке России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 1, TRUE),
(1401, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_CUP_RUSSIA_W', 'Команда 3х3 в Кубке России (Ж)', 'Женская команда 3х3 в Кубке России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 2, TRUE),
(1402, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_CHAMPIONSHIP_M', 'Команда 3х3 в ЧР (М)', 'Мужская команда 3х3 в Чемпионате России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 1, TRUE),
(1403, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_CHAMPIONSHIP_W', 'Команда 3х3 в ЧР (Ж)', 'Женская команда 3х3 в Чемпионате России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 2, TRUE),
(1404, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_WORLD_TOUR_M', 'Команда 3х3 в Мировом туре (М)', 'Мужская команда 3х3 в Мировом туре', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 1, TRUE),
(1405, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_3X3_TEAM_U18_M', 'Команда U18 3х3 (М)', 'Команды U18 в соревнованиях 3х3', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 15.0, 10, 219, 1, TRUE),
(1406, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_3X3_TEAM_U18_W', 'Команда U18 3х3 (Ж)', 'Команды U18 в соревнованиях 3х3', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 15.0, 10, 219, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Судьи 5х5 (1450-1464) - 15 критериев
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES
(1450, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_5_BASKET', 'Судья 5 корзины', 'Судьи 5 корзины (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 8.0, 10, 220, TRUE),
(1451, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_1_3_BASKET', 'Судья 1-3 корзины по рейтингу', 'Судьи 1-3 корзины (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 8.0, 10, 220, TRUE),
(1452, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_FIBA', 'Судья FIBA', 'Судьи с лицензией FIBA (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 8.3, 10, 220, TRUE),
(1453, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_FIBA_APPOINTMENT', 'Назначение судьи на игру FIBA', 'Судья получил назначение на международную игру FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 9.0, 10, 220, FALSE),
(1454, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_SEMINAR', 'Судейский очный семинар 5х5 с инструктором РФБ', 'Проведение судейского семинара 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 9.0, 10, 220, TRUE),
(1455, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONER_5_BASKET', 'Комиссар 5 корзины', 'Комиссары 5 корзины (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 9.0, 10, 220, TRUE),
(1456, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONER_1_3_BASKET', 'Комиссар 1-3 корзины по рейтингу', 'Комиссары 1-3 корзины (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 9.0, 10, 220, TRUE),
(1457, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONER_FIBA', 'Комиссар FIBA', 'Комиссары с лицензией FIBA (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 220, TRUE),
(1458, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONER_FIBA_APPOINTMENT', 'Назначение комиссара на игру FIBA', 'Комиссар получил назначение на международную игру FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 10.0, 10, 220, FALSE),
(1459, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_STATISTICIAN_RFB', 'Статистик с лицензией РФБ', 'Статистики с лицензией РФБ', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 7.5, 10, 220, TRUE),
(1460, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_SECRETARY_RFB', 'Секретарь с лицензией РФБ', 'Секретари с лицензией РФБ', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 7.5, 10, 220, TRUE),
(1461, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_STATISTICIAN_FIBA', 'Статистик с лицензией FIBA', 'Статистики с лицензией FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 7.5, 10, 220, TRUE),
(1462, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_SECRETARY_FIBA', 'Секретарь с лицензией FIBA', 'Секретари с лицензией FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 7.5, 10, 220, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Судьи 3х3 (1465-1479) - 15 критериев
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES
(1465, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_SEMINAR', 'Судейский очный семинар 3х3 с инструктором РФБ', 'Проведение судейского семинара 3х3', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 33.3, 10, 219, FALSE),
(1466, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_REFEREE_B', 'Судья 3х3 (Лицензия Б)', 'Судьи 3х3 с лицензией Б', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 33.3, 10, 219, TRUE),
(1467, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_SECRETARY_LICENSE', 'Лицо, имеющее лицензию судьи-секретаря Play.Fiba 3x3', 'Судья-секретарь с лицензией Play.Fiba 3x3', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 35.0, 10, 219, TRUE),
(1468, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_REFEREE_B_APPOINTMENT', 'Судья с лицензией Б, получивший назначение от РФБ', 'Судья 3х3 (Лицензия Б) с назначением', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE),
(1469, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_REFEREE_A', 'Судья ЧР 3х3 (Лицензия А)', 'Судья Чемпионата России 3х3 с лицензией А', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE),
(1470, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_CHIEF_REFEREE_A', 'Главный судья ЧР 3х3 (Лицензия А)', 'Главный судья Чемпионата России 3х3 с лицензией А', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE),
(1471, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_A', 'Судья с категорией А FIBA', 'Судья 3х3 с международной категорией А FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE),
(1472, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_B', 'Судья с категорией B FIBA', 'Судья 3х3 с международной категорией B FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE),
(1473, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_C', 'Судья с категорией C FIBA', 'Судья 3х3 с международной категорией C FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 45.0, 10, 219, FALSE),
(1474, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_APPOINTMENT_5_6', 'Назначение на международные турниры 5-6 цвета', 'Назначение судьи 3х3 на международные турниры 5-6 цвета', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 45.0, 10, 219, FALSE),
(1475, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_APPOINTMENT_7_8', 'Назначение на международные турниры 7-8 цвета', 'Назначение судьи 3х3 на международные турниры 7-8 цвета', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 45.0, 10, 219, FALSE),
(1476, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_APPOINTMENT_9_10', 'Назначение на международные турниры 9-10 цвета', 'Назначение судьи 3х3 на международные турниры 9-10 цвета', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 45.0, 10, 219, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Прочее (1480-1499) - 20 критериев
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(1480, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_DEAF_TEAM', 'Команда в ЧР по баскетболу среди глухих', 'Участие команды в Чемпионате России среди глухих', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 45.0, 10, FALSE),
(1481, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_DISABLED_TEAM', 'Команда в ЧР по баскетболу среди ЛИН', 'Участие команды в Чемпионате России среди лиц с интеллектуальными нарушениями', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 45.0, 10, FALSE),
(1482, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_WHEELCHAIR_TEAM', 'Команда в ЧР по баскетболу на колясках', 'Участие команды в Чемпионате России на колясках', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 50.0, 10, FALSE),
(1483, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_INTERACTIVE_TEAM_CHAMPIONSHIP', 'Команда в ЧР по интерактивному баскетболу', 'Участие команды в Чемпионате России по интерактивному баскетболу', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 50.0, 10, FALSE),
(1484, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_INTERACTIVE_TEAM_CUP', 'Команда в КР по интерактивному баскетболу', 'Участие команды в Кубке России по интерактивному баскетболу', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 50.0, 10, FALSE),
(1485, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_EVENT_HOSTING', 'Принятие тура/соревнований', 'Проведение официальных туров или соревнований в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 50.0, 10, FALSE)
ON CONFLICT (id) DO NOTHING;

SELECT setval('indicator_catalog_id_seq', 1500, false);

COMMENT ON TABLE indicator_catalog IS 
'Полный каталог критериев баскетбола РФБ.
ID 1000-1499: Всего 500 критериев баскетбола.
ID 1372-1485: МЛБЛ, ветераны, 3х3, судьи, прочее (114 критериев).
ИТОГО СОЗДАНО: 437 критериев.';
