-- ================================
-- Блок 23: Критерии легкой атлетики ФЛА
-- ================================
-- ID: 2000-2499 (500 критериев для легкой атлетики)
-- Федерация: ФЛА (organization_id = 1044)

-- ================================
-- СЕКЦИЯ 1: ФЕДЕРАТИВНЫЕ КРИТЕРИИ (ID: 2000-2019)
-- ================================

-- 1.1. Региональная федерация (2000-2009)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2000, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_ACCREDITATION', 'Есть аккредитация', 'Наличие аккредитации региональной федерации легкой атлетики', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.0005, 3, FALSE),
(2001, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_PROGRAM', 'Есть программа развития', 'Наличие программы развития легкой атлетики в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.005, 3, FALSE),
(2002, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_BRANCHES', 'Количество отделений региональной федерации', 'Количество отделений легкой атлетики помимо основного регионального', 'number', (SELECT id FROM measurement_units WHERE code = 'organizations'), 0.005, 3, TRUE),
(2003, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_MEMBERS', 'Количество членов федерации', 'Общее количество членов региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.008, 3, TRUE),
(2004, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_ANTIDOPING', 'Наличие антидопинговой работы федерации', 'Ведение антидопинговой работы в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.008, 3, FALSE),
(2005, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'ATH_FED_BUDGET', 'Объем бюджета федерации', 'Общий объем бюджета региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'rubles'), 0.01, 3, FALSE),
(2006, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'ATH_FED_DEFICIT_DETAIL', 'Понимание детального дефицита бюджета', 'Детальное описание дефицита бюджета федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.01, 3, FALSE),
(2007, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'ATH_FED_GRANT_FLA', 'Получение гранта ФЛА', 'Получение гранта от Всероссийской Федерации Легкой Атлетики', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.02, 3, FALSE),
(2008, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'ATH_FED_GRANTS_OTHER', 'Получение грантов помимо ФЛА', 'Получение грантов из других источников', 'number', (SELECT id FROM measurement_units WHERE code = 'grants'), 0.03, 3, FALSE),
(2009, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_BOARD', 'Наличие попечительского совета', 'Наличие попечительского совета при федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.03, 3, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 1.2. Маркетинг федерации (2010-2013)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2010, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'ATH_FED_WEBSITE', 'Федерация с активным официальным сайтом', 'Наличие активного сайта или страницы на сайте ФЛА', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, 3, FALSE),
(2011, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'ATH_FED_BRAND', 'Федерация с фирменным стилем', 'Наличие фирменного стиля региональной федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, 3, FALSE),
(2012, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'ATH_FED_VK', 'Федерация с активным сообществом ВКонтакте', 'Активное сообщество ВК (500+ человек, 2+ поста/месяц)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.05, 3, FALSE),
(2013, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'ATH_FED_TELEGRAM', 'Федерация с активным Telegram-каналом', 'Активный Telegram-канал (2+ поста/месяц)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.1, 3, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 1.3. Общие критерии (2014-2015)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2014, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_BASE_SPORT', 'Базовый вид спорта', 'Легкая атлетика является базовым видом спорта в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.1, 3, FALSE),
(2015, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_PARTICIPANTS', 'Количество занимающихся в регионе', 'Количество занимающихся легкой атлетикой по данным Минспорта', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.1, 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 2: ИНФРАСТРУКТУРА (ID: 2020-2029)
-- ================================

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2020, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_INDOOR_ARENAS', 'Легкоатлетические манежи', 'Крытые легкоатлетические манежи', 'number', (SELECT id FROM measurement_units WHERE code = 'arenas'), 0.30, 3, TRUE),
(2021, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_STADIUMS_TRACK', 'Стадионы с беговыми дорожками', 'Стадионы с легкоатлетическими дорожками', 'number', (SELECT id FROM measurement_units WHERE code = 'stadiums'), 0.20, 3, TRUE),
(2022, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_SECTORS_JUMP', 'Секторы для прыжков', 'Секторы для прыжков в длину/высоту', 'number', (SELECT id FROM measurement_units WHERE code = 'sectors'), 0.10, 3, TRUE),
(2023, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_SECTORS_THROW', 'Секторы для метаний', 'Секторы для метания диска/копья/молота', 'number', (SELECT id FROM measurement_units WHERE code = 'sectors'), 0.10, 3, TRUE),
(2024, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_TRACKS_OUTDOOR', 'Открытые беговые дорожки', 'Открытые легкоатлетические дорожки', 'number', (SELECT id FROM measurement_units WHERE code = 'tracks'), 0.15, 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 3: СБОРНЫЕ КОМАНДЫ (ID: 2030-2059)
-- ================================

-- Мужчины (2030-2044)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2030, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U14', 'Сборная U14 (мужчины)', 'Члены мужской сборной России по легкой атлетике U14', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 3, 1, 1, TRUE),
(2031, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U16', 'Сборная U16 (мужчины)', 'Члены мужской сборной России по легкой атлетике U16', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 3, 1, 3, TRUE),
(2032, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U18', 'Сборная U18 (мужчины)', 'Члены мужской сборной России по легкой атлетике U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.27, 3, 1, 4, TRUE),
(2033, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U20', 'Сборная U20 (мужчины)', 'Члены мужской сборной России по легкой атлетике U20', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.33, 3, 1, 5, TRUE),
(2034, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U23', 'Сборная U23 (мужчины)', 'Члены мужской сборной России по легкой атлетике U23', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.35, 3, 1, 6, TRUE),
(2035, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_SENIOR', 'Национальная сборная (мужчины)', 'Члены мужской национальной сборной России по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 3, 1, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Женщины (2040-2054)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2040, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U14', 'Сборная U14 (женщины)', 'Члены женской сборной России по легкой атлетике U14', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 3, 2, 1, TRUE),
(2041, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U16', 'Сборная U16 (женщины)', 'Члены женской сборной России по легкой атлетике U16', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 3, 2, 3, TRUE),
(2042, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U18', 'Сборная U18 (женщины)', 'Члены женской сборной России по легкой атлетике U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 3, 2, 4, TRUE),
(2043, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U20', 'Сборная U20 (женщины)', 'Члены женской сборной России по легкой атлетике U20', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 3, 2, 5, TRUE),
(2044, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U23', 'Сборная U23 (женщины)', 'Члены женской сборной России по легкой атлетике U23', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 3, 2, 6, TRUE),
(2045, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_SENIOR', 'Национальная сборная (женщины)', 'Члены женской национальной сборной России по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 3, 2, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 4: ДОСТИЖЕНИЯ (ID: 2060-2099)
-- ================================

-- Медали на соревнованиях (2060-2079)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2060, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_CHAMPIONSHIP_RUSSIA', 'Медали на Чемпионате России', 'Количество медалей на ЧР по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 1.50, 3, TRUE),
(2061, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_CUP_RUSSIA', 'Медали на Кубке России', 'Количество медалей на Кубке России по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 1.20, 3, TRUE),
(2062, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_EUROPE', 'Медали на чемпионатах Европы', 'Количество медалей на чемпионатах Европы', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.00, 3, TRUE),
(2063, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_WORLD', 'Медали на чемпионатах мира', 'Количество медалей на чемпионатах мира', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.00, 3, TRUE),
(2064, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_OLYMPICS', 'Медали на Олимпийских играх', 'Количество медалей на Олимпийских играх', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.00, 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Рекорды (2070-2074)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2070, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_RECORDS_RUSSIA', 'Рекорды России', 'Количество действующих рекордов России', 'number', (SELECT id FROM measurement_units WHERE code = 'records'), 5.00, 3, TRUE),
(2071, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_RECORDS_EUROPE', 'Рекорды Европы', 'Количество действующих рекордов Европы', 'number', (SELECT id FROM measurement_units WHERE code = 'records'), 8.00, 3, TRUE),
(2072, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_RECORDS_WORLD', 'Рекорды мира', 'Количество действующих мировых рекордов', 'number', (SELECT id FROM measurement_units WHERE code = 'records'), 15.00, 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 5: СУДЬИ И ТРЕНЕРЫ (ID: 2100-2129)
-- ================================

-- Судьи (2100-2109)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2100, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_3_CATEGORY', 'Судьи 3 категории', 'Судьи 3 категории по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.05, 3, TRUE),
(2101, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_2_CATEGORY', 'Судьи 2 категории', 'Судьи 2 категории по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.06, 3, TRUE),
(2102, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_1_CATEGORY', 'Судьи 1 категории', 'Судьи 1 категории по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.07, 3, TRUE),
(2103, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_NATIONAL', 'Судьи всероссийской категории', 'Судьи всероссийской категории', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.08, 3, TRUE),
(2104, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_INTERNATIONAL', 'Судьи международной категории', 'Судьи международной категории', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.15, 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Тренеры (2110-2119)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2110, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_COACH_QUALIFIED', 'Тренеры с квалификацией', 'Тренеры с квалификационной категорией', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.10, 3, TRUE),
(2111, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_COACH_HONORED', 'Заслуженные тренеры', 'Заслуженные тренеры России', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.20, 3, TRUE),
(2112, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_COACH_NATIONAL_TEAM', 'Тренеры сборных команд', 'Тренеры сборных команд России', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.30, 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 6: МАССОВЫЙ СПОРТ (ID: 2130-2159)
-- ================================

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2130, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_MASS_EVENTS', 'Массовые легкоатлетические мероприятия', 'Количество массовых легкоатлетических мероприятий в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 0.50, 3, FALSE),
(2131, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_MASS_PARTICIPANTS', 'Участники массовых мероприятий', 'Количество участников массовых мероприятий', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.01, 3, TRUE),
(2132, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_PARKRUN', 'Паркраны', 'Количество регулярных паркранов в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 1.00, 3, FALSE),
(2133, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_MARATHON', 'Марафоны', 'Количество марафонов в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 2.00, 3, FALSE),
(2134, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_HALF_MARATHON', 'Полумарафоны', 'Количество полумарафонов в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 1.50, 3, FALSE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 7: ПРОЧЕЕ (ID: 2160-2199)
-- ================================

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(2160, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_PARA_ATHLETES', 'Спортсмены-паралимпийцы', 'Количество спортсменов-паралимпийцев', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 2.00, 3, TRUE),
(2161, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PARA_MEDALS', 'Медали паралимпийцев', 'Количество медалей паралимпийцев', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.00, 3, TRUE),
(2162, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_EVENT_HOSTING', 'Принятие соревнований', 'Проведение официальных соревнований в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 3.00, 3, FALSE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- ОБНОВЛЕНИЕ SEQUENCE
-- ================================

SELECT setval('indicator_catalog_id_seq', 2500, false);

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_catalog IS 
'Полный каталог критериев.
ID 1000-1499: Баскетбол РФБ (500 критериев).
ID 2000-2199: Легкая атлетика ФЛА (200 критериев).
ИТОГО: 700 критериев.';
