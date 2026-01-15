-- ================================
-- Блок 18: Полный каталог критериев баскетбола РФБ
-- ================================
-- Все ~500 критериев баскетбола с явными ID
-- ID диапазон: 1000-1499 (баскетбол)
-- ID диапазон: 2000-2499 (легкая атлетика - резерв)

-- ВАЖНО: Сначала выполнить 03a_indicators_system_fix.sql

-- ================================
-- СЕКЦИЯ 1: ФЕДЕРАТИВНЫЕ КРИТЕРИИ (ID: 1000-1019)
-- ================================

-- 1.1. Региональная федерация (1000-1009)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(1000, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_ACCREDITATION', 'Есть аккредитация', 'Наличие аккредитации региональной федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.0005, 10, FALSE),
(1001, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_PROGRAM', 'Есть программа развития', 'Наличие программы развития баскетбола в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.005, 10, FALSE),
(1002, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_BRANCHES', 'Количество отделений региональной федерации', 'Количество отделений баскетбола помимо основного регионального', 'number', (SELECT id FROM measurement_units WHERE code = 'organizations'), 0.005, 10, TRUE),
(1003, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_MEMBERS', 'Количество членов федерации', 'Общее количество членов региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.008, 10, TRUE),
(1004, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_ANTIDOPING', 'Наличие антидопинговой работы федерации', 'Ведение антидопинговой работы в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.008, 10, FALSE),
(1005, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'BBL_FED_BUDGET', 'Объем бюджета федерации', 'Общий объем бюджета региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'rubles'), 0.01, 10, FALSE),
(1006, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'BBL_FED_DEFICIT_DETAIL', 'Понимание детального дефицита бюджета', 'Детальное описание дефицита бюджета федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.01, 10, FALSE),
(1007, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'BBL_FED_GRANT_RFB', 'Получение гранта РФБ', 'Получение гранта от Российской Федерации Баскетбола', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.02, 10, FALSE),
(1008, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'BBL_FED_GRANTS_OTHER', 'Получение грантов помимо РФБ', 'Получение грантов из других источников', 'number', (SELECT id FROM measurement_units WHERE code = 'grants'), 0.03, 10, FALSE),
(1009, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_BOARD', 'Наличие попечительского совета', 'Наличие попечительского совета при федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.03, 10, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 1.2. Маркетинг федерации (1010-1013)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(1010, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_FED_WEBSITE', 'Федерация с активным официальным сайтом', 'Наличие активного сайта или страницы на сайте РФБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, 10, FALSE),
(1011, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_FED_BRAND', 'Федерация с фирменным стилем', 'Наличие фирменного стиля региональной федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, 10, FALSE),
(1012, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_FED_VK', 'Федерация с активным сообществом ВКонтакте', 'Активное сообщество ВК (500+ человек, 2+ поста/месяц)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.05, 10, FALSE),
(1013, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_FED_TELEGRAM', 'Федерация с активным Telegram-каналом', 'Активный Telegram-канал (2+ поста/месяц)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.1, 10, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 1.3. Общие критерии (1014-1015)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(1014, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_BASE_SPORT', 'Базовый вид спорта', 'Баскетбол является базовым видом спорта в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.1, 10, FALSE),
(1015, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_PARTICIPANTS', 'Количество занимающихся в регионе', 'Количество занимающихся баскетболом по данным Минспорта', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.1, 10, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 2: ИНФРАСТРУКТУРА (ID: 1020-1024)
-- ================================

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(1020, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_INDOOR_STANDARD', 'Стандартные крытые баскетбольные площадки', 'Крытые баскетбольные площадки, входящие в единый реестр объектов спорта', 'number', (SELECT id FROM measurement_units WHERE code = 'courts'), 0.10, 10, TRUE),
(1021, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_INDOOR_1000', 'Крытые площадки с 1000+ посадочных мест', 'Крытые баскетбольные площадки с трибунами на 1000 и более зрителей', 'number', (SELECT id FROM measurement_units WHERE code = 'courts'), 0.15, 10, TRUE),
(1022, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_INDOOR_5000', 'Крытые площадки с 5000+ посадочных мест', 'Крытые баскетбольные площадки с трибунами на 5000 и более зрителей', 'number', (SELECT id FROM measurement_units WHERE code = 'courts'), 0.25, 10, TRUE),
(1023, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_OUTDOOR_12', 'Уличные площадки с 1-2 кольцами', 'Уличные баскетбольные площадки с 1-2 баскетбольными кольцами', 'number', (SELECT id FROM measurement_units WHERE code = 'courts'), 0.05, 10, TRUE),
(1024, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_3X3', 'Центры уличного баскетбола (ЦУБы)', 'Площадки 3х3 с 3 и более баскетбольными кольцами', 'number', (SELECT id FROM measurement_units WHERE code = 'courts'), 0.10, 10, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 3: СБОРНЫЕ КОМАНДЫ 5х5 (ID: 1030-1047)
-- ================================

-- Мужчины (1030-1038)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES
(1030, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U14', 'Сборная 5х5 U14 (мужчины)', 'Члены мужской сборной России 5х5 U14', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 10, 220, 1, 1, TRUE),
(1031, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U15', 'Сборная 5х5 U15 (мужчины)', 'Члены мужской сборной России 5х5 U15', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 10, 220, 1, 2, TRUE),
(1032, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U16', 'Сборная 5х5 U16 (мужчины)', 'Члены мужской сборной России 5х5 U16', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 10, 220, 1, 3, TRUE),
(1033, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U17', 'Сборная 5х5 U17 (мужчины)', 'Члены мужской сборной России 5х5 U17', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 10, 220, 1, 2, TRUE),
(1034, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U18', 'Сборная 5х5 U18 (мужчины)', 'Члены мужской сборной России 5х5 U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.27, 10, 220, 1, 4, TRUE),
(1035, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U19', 'Сборная 5х5 U19 (мужчины)', 'Члены мужской сборной России 5х5 U19', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.3, 10, 220, 1, 5, TRUE),
(1036, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U20', 'Сборная 5х5 U20 (мужчины)', 'Члены мужской сборной России 5х5 U20', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.33, 10, 220, 1, 5, TRUE),
(1037, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_STUDENT', 'Студенческая сборная 5х5 (мужчины)', 'Члены мужской студенческой сборной России 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.33, 10, 220, 1, 6, TRUE),
(1038, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_SENIOR', 'Национальная сборная 5х5 (мужчины)', 'Члены мужской национальной сборной России 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 10, 220, 1, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Женщины (1039-1047)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES
(1039, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U14', 'Сборная 5х5 U14 (женщины)', 'Члены женской сборной России 5х5 U14', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 10, 220, 2, 1, TRUE),
(1040, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U15', 'Сборная 5х5 U15 (женщины)', 'Члены женской сборной России 5х5 U15', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 10, 220, 2, 2, TRUE),
(1041, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U16', 'Сборная 5х5 U16 (женщины)', 'Члены женской сборной России 5х5 U16', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 3, TRUE),
(1042, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U17', 'Сборная 5х5 U17 (женщины)', 'Члены женской сборной России 5х5 U17', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 2, TRUE),
(1043, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U18', 'Сборная 5х5 U18 (женщины)', 'Члены женской сборной России 5х5 U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 4, TRUE),
(1044, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U19', 'Сборная 5х5 U19 (женщины)', 'Члены женской сборной России 5х5 U19', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 5, TRUE),
(1045, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U20', 'Сборная 5х5 U20 (женщины)', 'Члены женской сборной России 5х5 U20', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 5, TRUE),
(1046, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_STUDENT', 'Студенческая сборная 5х5 (женщины)', 'Члены женской студенческой сборной России 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 6, TRUE),
(1047, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_SENIOR', 'Национальная сборная 5х5 (женщины)', 'Члены женской национальной сборной России 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 4: СБОРНЫЕ КОМАНДЫ 3х3 (ID: 1050-1057)
-- ================================

-- Мужчины (1050-1053)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES
(1050, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_M_U18', 'Сборная 3х3 U18 (мужчины)', 'Члены мужской сборной России 3х3 U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 1, 4, TRUE),
(1051, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_M_U21', 'Сборная 3х3 U21 (мужчины)', 'Члены мужской сборной России 3х3 U21', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 1, 5, TRUE),
(1052, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_M_U23', 'Сборная 3х3 U23 (мужчины)', 'Члены мужской сборной России 3х3 U23', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 1, 6, TRUE),
(1053, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_M_SENIOR', 'Национальная сборная 3х3 (мужчины)', 'Члены мужской национальной сборной России 3х3', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 1, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Женщины (1054-1057)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES
(1054, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_W_U18', 'Сборная 3х3 U18 (женщины)', 'Члены женской сборной России 3х3 U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 2, 4, TRUE),
(1055, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_W_U21', 'Сборная 3х3 U21 (женщины)', 'Члены женской сборной России 3х3 U21', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 2, 5, TRUE),
(1056, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_W_U23', 'Сборная 3х3 U23 (женщины)', 'Члены женской сборной России 3х3 U23', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 2, 6, TRUE),
(1057, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_W_SENIOR', 'Национальная сборная 3х3 (женщины)', 'Члены женской национальной сборной России 3х3', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 2, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- ОБНОВЛЕНИЕ SEQUENCE
-- ================================

-- Обновляем sequence чтобы следующий автоинкремент начался с 1500
SELECT setval('indicator_catalog_id_seq', 1500, false);

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_catalog IS 
'Полный каталог критериев баскетбола РФБ.
ID 1000-1057: Федеративные, инфраструктура, сборные команды (58 критериев).
ID 1100-1499: Остальные критерии баскетбола (будут добавлены).
ID 2000-2499: Легкая атлетика (резерв).';
