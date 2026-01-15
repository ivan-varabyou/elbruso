-- ================================
-- Продолжение: Остальные критерии баскетбола
-- ================================
-- ID: 1100-1499 (400 критериев)

-- ================================
-- СЕКЦИЯ 5: ПРОФЕССИОНАЛЬНЫЙ БАСКЕТБОЛ 5х5 (ID: 1100-1249)
-- ================================

-- 5.1. Воспитанники (1100-1101)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES
(1100, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_LOCAL_PLAYERS_PRO_M', 'Воспитанники мужчины в местных проф клубах', 'Воспитанники региона (мужчины) в местных профессиональных клубах', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 1, TRUE),
(1101, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_LOCAL_PLAYERS_PRO_W', 'Воспитанники женщины в местных проф клубах', 'Воспитанники региона (женщины) в местных профессиональных клубах', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 5.2. Маркетинг клубов (1102-1107)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES
(1102, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_WEBSITE', 'Клуб с активным официальным сайтом', 'Профессиональный клуб с активным сайтом', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.5, 10, FALSE),
(1103, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_BRAND', 'Клуб с фирменным стилем', 'Профессиональный клуб с фирменным стилем', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.5, 10, FALSE),
(1104, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_VK', 'Клуб с активным сообществом ВКонтакте', 'Профессиональный клуб с активным ВК', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.53, 10, FALSE),
(1105, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_TELEGRAM', 'Клуб с активным Telegram-каналом', 'Профессиональный клуб с активным Telegram', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.6, 10, FALSE),
(1106, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_TICKETS', 'Клуб с билетной программой', 'Профессиональный клуб с онлайн-продажей билетов', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.6, 10, FALSE),
(1107, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_PARTNER', 'Клуб с взаимодействием с крупным партнером', 'Профессиональный клуб с крупным партнером', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.6, 10, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 5.3. Участие команд мужчины (1110-1118)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1110, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_INTERREGIONAL_M', 'Команда в проф межрегиональных соревнованиях (М)', 'Мужская команда в межрегиональных соревнованиях', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.6, 10, 220, 1, TRUE),
(1111, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_HIGHER_LEAGUE_M', 'Команда в Высшей лиге (М)', 'Мужская команда в Высшей лиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.6, 10, 220, 1, TRUE),
(1112, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_SUPERLEAGUE_M', 'Команда в Суперлиге (М)', 'Мужская команда в Суперлиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.6, 10, 220, 1, TRUE),
(1113, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_CUP_RUSSIA_M', 'Команда в Кубке России (М)', 'Мужская команда в Кубке России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.15, 10, 220, 1, TRUE),
(1114, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_VTB_M', 'Команда в ЕЛ ВТБ (М)', 'Мужская команда в Единой лиге ВТБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.7, 10, 220, 1, TRUE),
(1115, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_FIBA_EUROPE_CUP_M', 'Команда в Кубке Европы ФИБА (М)', 'Мужская команда в Кубке Европы ФИБА', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.7, 10, 220, 1, TRUE),
(1116, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_EUROCUP_M', 'Команда в Еврокубке (М)', 'Мужская команда в Еврокубке', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.75, 10, 220, 1, TRUE),
(1117, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_FIBA_CHAMPIONS_M', 'Команда в Лиге Чемпионов ФИБА (М)', 'Мужская команда в Лиге Чемпионов ФИБА', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.75, 10, 220, 1, TRUE),
(1118, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_EUROLEAGUE_M', 'Команда в Евролиге (М)', 'Мужская команда в Евролиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.75, 10, 220, 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 5.4. Участие команд женщины (1120-1126)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1120, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_INTERREGIONAL_W', 'Команда в проф межрегиональных соревнованиях (Ж)', 'Женская команда в межрегиональных соревнованиях', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE),
(1121, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_HIGHER_LEAGUE_W', 'Команда в Высшей лиге (Ж)', 'Женская команда в Высшей лиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE),
(1122, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_SUPERLEAGUE_W', 'Команда в Суперлиге (Ж)', 'Женская команда в Суперлиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE),
(1123, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_CUP_RUSSIA_W', 'Команда в Кубке России (Ж)', 'Женская команда в Кубке России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE),
(1124, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_PREMIER_LEAGUE_W', 'Команда в Премьер-лиге (Ж)', 'Женская команда в Премьер-лиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE),
(1125, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_FIBA_EUROCUP_W', 'Команда в Еврокубке ФИБА (Ж)', 'Женская команда в Еврокубке ФИБА', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE),
(1126, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_FIBA_EUROLEAGUE_W', 'Команда в Евролиге ФИБА (Ж)', 'Женская команда в Евролиге ФИБА', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 5.5. Призовые места мужчины (1130-1183) - 54 критерия
-- Кубок Тараканова (1130-1132)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1130, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_TARAKANOV_M', '3 место в Кубке Тараканова (М)', 'Мужская команда заняла 3 место в Кубке Тараканова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.8, 10, 220, 1, FALSE),
(1131, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_TARAKANOV_M', '2 место в Кубке Тараканова (М)', 'Мужская команда заняла 2 место в Кубке Тараканова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1132, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_TARAKANOV_M', '1 место в Кубке Тараканова (М)', 'Мужская команда заняла 1 место в Кубке Тараканова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Межрегиональные (1133-1135)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1133, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_INTERREGIONAL_M', '3 место в проф межрегиональных (М)', 'Мужская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1134, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_INTERREGIONAL_M', '2 место в проф межрегиональных (М)', 'Мужская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1135, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_INTERREGIONAL_M', '1 место в проф межрегиональных (М)', 'Мужская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Высшая лига (1136-1138)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1136, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_HIGHER_LEAGUE_M', '3 место в Высшей лиге (М)', 'Мужская команда заняла 3 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1137, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_HIGHER_LEAGUE_M', '2 место в Высшей лиге (М)', 'Мужская команда заняла 2 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1138, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_HIGHER_LEAGUE_M', '1 место в Высшей лиге (М)', 'Мужская команда заняла 1 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Суперлига (1139-1141)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1139, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_SUPERLEAGUE_M', '3 место в Суперлиге (М)', 'Мужская команда заняла 3 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1140, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_SUPERLEAGUE_M', '2 место в Суперлиге (М)', 'Мужская команда заняла 2 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1141, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_SUPERLEAGUE_M', '1 место в Суперлиге (М)', 'Мужская команда заняла 1 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Кубок России (1142-1144)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1142, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_CUP_RUSSIA_M', '3 место в Кубке России (М)', 'Мужская команда заняла 3 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1143, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_CUP_RUSSIA_M', '2 место в Кубке России (М)', 'Мужская команда заняла 2 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1144, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_CUP_RUSSIA_M', '1 место в Кубке России (М)', 'Мужская команда заняла 1 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Суперкубок (1145)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1145, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_SUPERCUP_M', '1 место в Суперкубке (М)', 'Мужская команда заняла 1 место в Суперкубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- ЕЛ ВТБ (1146-1148)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1146, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_VTB_M', '3 место в ЕЛ ВТБ (М)', 'Мужская команда заняла 3 место в ЕЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1147, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_VTB_M', '2 место в ЕЛ ВТБ (М)', 'Мужская команда заняла 2 место в ЕЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1148, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_VTB_M', '1 место в ЕЛ ВТБ (М)', 'Мужская команда заняла 1 место в ЕЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Кубок Европы ФИБА (1149-1151)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1149, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_FIBA_EUROPE_CUP_M', '3 место в Кубке Европы ФИБА (М)', 'Мужская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1150, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_FIBA_EUROPE_CUP_M', '2 место в Кубке Европы ФИБА (М)', 'Мужская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1151, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_FIBA_EUROPE_CUP_M', '1 место в Кубке Европы ФИБА (М)', 'Мужская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Еврокубок (1152-1154)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1152, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_EUROCUP_M', '3 место в Еврокубке (М)', 'Мужская команда заняла 3 место в Еврокубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1153, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_EUROCUP_M', '2 место в Еврокубке (М)', 'Мужская команда заняла 2 место в Еврокубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1154, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_EUROCUP_M', '1 место в Еврокубке (М)', 'Мужская команда заняла 1 место в Еврокубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Лига Чемпионов ФИБА (1155-1157)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1155, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_FIBA_CHAMPIONS_M', '3 место в Лиге Чемпионов ФИБА (М)', 'Мужская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1156, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_FIBA_CHAMPIONS_M', '2 место в Лиге Чемпионов ФИБА (М)', 'Мужская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1157, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_FIBA_CHAMPIONS_M', '1 место в Лиге Чемпионов ФИБА (М)', 'Мужская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Евролига (1158-1160)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1158, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_EUROLEAGUE_M', '3 место в Евролиге (М)', 'Мужская команда заняла 3 место в Евролиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1159, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_EUROLEAGUE_M', '2 место в Евролиге (М)', 'Мужская команда заняла 2 место в Евролиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE),
(1160, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_EUROLEAGUE_M', '1 место в Евролиге (М)', 'Мужская команда заняла 1 место в Евролиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 5.6. Призовые места женщины (1170-1220) - 51 критерий
-- Кубок Берлина (1170-1172)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1170, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_BERLIN_W', '3 место в Кубке Берлина (Ж)', 'Женская команда заняла 3 место в Кубке Берлина', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 2, FALSE),
(1171, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_BERLIN_W', '2 место в Кубке Берлина (Ж)', 'Женская команда заняла 2 место в Кубке Берлина', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 2, FALSE),
(1172, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_BERLIN_W', '1 место в Кубке Берлина (Ж)', 'Женская команда заняла 1 место в Кубке Берлина', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Межрегиональные (1173-1175)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1173, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_INTERREGIONAL_W', '3 место в проф межрегиональных (Ж)', 'Женская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 2, FALSE),
(1174, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_INTERREGIONAL_W', '2 место в проф межрегиональных (Ж)', 'Женская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.6, 10, 220, 2, FALSE),
(1175, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_INTERREGIONAL_W', '1 место в проф межрегиональных (Ж)', 'Женская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.3, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Высшая лига (1176-1178)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1176, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_HIGHER_LEAGUE_W', '3 место в Высшей лиге (Ж)', 'Женская команда заняла 3 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.3, 10, 220, 2, FALSE),
(1177, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_HIGHER_LEAGUE_W', '2 место в Высшей лиге (Ж)', 'Женская команда заняла 2 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE),
(1178, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_HIGHER_LEAGUE_W', '1 место в Высшей лиге (Ж)', 'Женская команда заняла 1 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Суперлига (1179-1181)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1179, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_SUPERLEAGUE_W', '3 место в Суперлиге (Ж)', 'Женская команда заняла 3 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE),
(1180, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_SUPERLEAGUE_W', '2 место в Суперлиге (Ж)', 'Женская команда заняла 2 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE),
(1181, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_SUPERLEAGUE_W', '1 место в Суперлиге (Ж)', 'Женская команда заняла 1 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Кубок России (1182-1184)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1182, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_CUP_RUSSIA_W', '3 место в Кубке России (Ж)', 'Женская команда заняла 3 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE),
(1183, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_CUP_RUSSIA_W', '2 место в Кубке России (Ж)', 'Женская команда заняла 2 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.6, 10, 220, 2, FALSE),
(1184, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_CUP_RUSSIA_W', '1 место в Кубке России (Ж)', 'Женская команда заняла 1 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.6, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Суперкубок (1185)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1185, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_SUPERCUP_W', '1 место в Суперкубке (Ж)', 'Женская команда заняла 1 место в Суперкубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.6, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Премьер-лига (1186-1188)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1186, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PREMIER_LEAGUE_W', '3 место в Премьер-лиге (Ж)', 'Женская команда заняла 3 место в Премьер-лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.6, 10, 220, 2, FALSE),
(1187, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PREMIER_LEAGUE_W', '2 место в Премьер-лиге (Ж)', 'Женская команда заняла 2 место в Премьер-лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE),
(1188, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PREMIER_LEAGUE_W', '1 место в Премьер-лиге (Ж)', 'Женская команда заняла 1 место в Премьер-лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Еврокубок ФИБА (1189-1191)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1189, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_FIBA_EUROCUP_W', '3 место в Еврокубке ФИБА (Ж)', 'Женская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE),
(1190, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_FIBA_EUROCUP_W', '2 место в Еврокубке ФИБА (Ж)', 'Женская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE),
(1191, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_FIBA_EUROCUP_W', '1 место в Еврокубке ФИБА (Ж)', 'Женская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Евролига ФИБА (1192-1194)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES
(1192, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_FIBA_EUROLEAGUE_W', '3 место в Евролиге ФИБА (Ж)', 'Женская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE),
(1193, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_FIBA_EUROLEAGUE_W', '2 место в Евролиге ФИБА (Ж)', 'Женская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE),
(1194, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_FIBA_EUROLEAGUE_W', '1 место в Евролиге ФИБА (Ж)', 'Женская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- Обновление SEQUENCE
-- ================================

SELECT setval('indicator_catalog_id_seq', 1500, false);

-- ================================
-- ИТОГО СОЗДАНО
-- ================================
-- ID 1000-1057: Федеративные, инфраструктура, сборные (58)
-- ID 1100-1194: Профессиональный баскетбол (95)
-- ВСЕГО: 153 критерия

COMMENT ON TABLE indicator_catalog IS 
'Каталог критериев баскетбола РФБ.
ID 1000-1194: 153 критерия (федеративные, инфраструктура, сборные, профессиональный баскетбол).
Осталось создать: ~347 критериев (резерв, массовый, 3х3, судьи, прочее).';
