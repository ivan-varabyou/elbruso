-- ================================
-- Блок 23: ДОПОЛНЕНИЕ - Критерии легкой атлетики
-- ================================
-- ID: 2200-2699 (500 дополнительных критериев)

-- ================================
-- СЕКЦИЯ 8: ПЕРВЕНСТВА РОССИИ ПО ВОЗРАСТАМ (ID: 2200-2349)
-- ================================

-- Участие команд мужчины (2200-2219)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2200, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U14_M', 'Участие в ПР U14 (М)', 'Спортсмены региона в Первенстве России U14 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.0, 3, 1, 1, TRUE),
(2201, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U16_M', 'Участие в ПР U16 (М)', 'Спортсмены региона в Первенстве России U16 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.2, 3, 1, 3, TRUE),
(2202, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U18_M', 'Участие в ПР U18 (М)', 'Спортсмены региона в Первенстве России U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.5, 3, 1, 4, TRUE),
(2203, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U20_M', 'Участие в ПР U20 (М)', 'Спортсмены региона в Первенстве России U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.8, 3, 1, 5, TRUE),
(2204, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U23_M', 'Участие в ПР U23 (М)', 'Спортсмены региона в Первенстве России U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 2.0, 3, 1, 6, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Участие команд женщины (2210-2219)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2210, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U14_W', 'Участие в ПР U14 (Ж)', 'Спортсмены региона в Первенстве России U14 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.0, 3, 2, 1, TRUE),
(2211, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U16_W', 'Участие в ПР U16 (Ж)', 'Спортсмены региона в Первенстве России U16 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.2, 3, 2, 3, TRUE),
(2212, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U18_W', 'Участие в ПР U18 (Ж)', 'Спортсмены региона в Первенстве России U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.5, 3, 2, 4, TRUE),
(2213, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U20_W', 'Участие в ПР U20 (Ж)', 'Спортсмены региона в Первенстве России U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.8, 3, 2, 5, TRUE),
(2214, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U23_W', 'Участие в ПР U23 (Ж)', 'Спортсмены региона в Первенстве России U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 2.0, 3, 2, 6, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Медали ПР мужчины (2220-2249)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2220, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U14_M', 'Бронза ПР U14 (М)', 'Бронзовые медали ПР U14 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.0, 3, 1, 1, TRUE),
(2221, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U14_M', 'Серебро ПР U14 (М)', 'Серебряные медали ПР U14 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.5, 3, 1, 1, TRUE),
(2222, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U14_M', 'Золото ПР U14 (М)', 'Золотые медали ПР U14 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 3, 1, 1, TRUE),
(2223, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U16_M', 'Бронза ПР U16 (М)', 'Бронзовые медали ПР U16 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.5, 3, 1, 3, TRUE),
(2224, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U16_M', 'Серебро ПР U16 (М)', 'Серебряные медали ПР U16 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 3, 1, 3, TRUE),
(2225, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U16_M', 'Золото ПР U16 (М)', 'Золотые медали ПР U16 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 3, 1, 3, TRUE),
(2226, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U18_M', 'Бронза ПР U18 (М)', 'Бронзовые медали ПР U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 3, 1, 4, TRUE),
(2227, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U18_M', 'Серебро ПР U18 (М)', 'Серебряные медали ПР U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 3, 1, 4, TRUE),
(2228, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U18_M', 'Золото ПР U18 (М)', 'Золотые медали ПР U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 3, 1, 4, TRUE),
(2229, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U20_M', 'Бронза ПР U20 (М)', 'Бронзовые медали ПР U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 3, 1, 5, TRUE),
(2230, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U20_M', 'Серебро ПР U20 (М)', 'Серебряные медали ПР U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 3, 1, 5, TRUE),
(2231, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U20_M', 'Золото ПР U20 (М)', 'Золотые медали ПР U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.5, 3, 1, 5, TRUE),
(2232, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U23_M', 'Бронза ПР U23 (М)', 'Бронзовые медали ПР U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 3, 1, 6, TRUE),
(2233, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U23_M', 'Серебро ПР U23 (М)', 'Серебряные медали ПР U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.5, 3, 1, 6, TRUE),
(2234, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U23_M', 'Золото ПР U23 (М)', 'Золотые медали ПР U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 3, 1, 6, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Медали ПР женщины (2240-2269)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2240, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U14_W', 'Бронза ПР U14 (Ж)', 'Бронзовые медали ПР U14 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.0, 3, 2, 1, TRUE),
(2241, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U14_W', 'Серебро ПР U14 (Ж)', 'Серебряные медали ПР U14 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.5, 3, 2, 1, TRUE),
(2242, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U14_W', 'Золото ПР U14 (Ж)', 'Золотые медали ПР U14 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 3, 2, 1, TRUE),
(2243, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U16_W', 'Бронза ПР U16 (Ж)', 'Бронзовые медали ПР U16 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.5, 3, 2, 3, TRUE),
(2244, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U16_W', 'Серебро ПР U16 (Ж)', 'Серебряные медали ПР U16 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 3, 2, 3, TRUE),
(2245, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U16_W', 'Золото ПР U16 (Ж)', 'Золотые медали ПР U16 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 3, 2, 3, TRUE),
(2246, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U18_W', 'Бронза ПР U18 (Ж)', 'Бронзовые медали ПР U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 3, 2, 4, TRUE),
(2247, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U18_W', 'Серебро ПР U18 (Ж)', 'Серебряные медали ПР U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 3, 2, 4, TRUE),
(2248, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U18_W', 'Золото ПР U18 (Ж)', 'Золотые медали ПР U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 3, 2, 4, TRUE),
(2249, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U20_W', 'Бронза ПР U20 (Ж)', 'Бронзовые медали ПР U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 3, 2, 5, TRUE),
(2250, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U20_W', 'Серебро ПР U20 (Ж)', 'Серебряные медали ПР U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 3, 2, 5, TRUE),
(2251, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U20_W', 'Золото ПР U20 (Ж)', 'Золотые медали ПР U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.5, 3, 2, 5, TRUE),
(2252, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U23_W', 'Бронза ПР U23 (Ж)', 'Бронзовые медали ПР U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 3, 2, 6, TRUE),
(2253, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U23_W', 'Серебро ПР U23 (Ж)', 'Серебряные медали ПР U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.5, 3, 2, 6, TRUE),
(2254, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U23_W', 'Золото ПР U23 (Ж)', 'Золотые медали ПР U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 3, 2, 6, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 9: ЧЕМПИОНАТЫ РОССИИ (ID: 2270-2299)
-- ================================

-- Медали ЧР мужчины (2270-2284)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES
(2270, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_CR_M', 'Бронза ЧР (М)', 'Бронзовые медали Чемпионата России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 3, 1, TRUE),
(2271, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_CR_M', 'Серебро ЧР (М)', 'Серебряные медали Чемпионата России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 6.0, 3, 1, TRUE),
(2272, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_CR_M', 'Золото ЧР (М)', 'Золотые медали Чемпионата России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 7.0, 3, 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Медали ЧР женщины (2273-2277)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES
(2273, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_CR_W', 'Бронза ЧР (Ж)', 'Бронзовые медали Чемпионата России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 3, 2, TRUE),
(2274, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_CR_W', 'Серебро ЧР (Ж)', 'Серебряные медали Чемпионата России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 6.0, 3, 2, TRUE),
(2275, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_CR_W', 'Золото ЧР (Ж)', 'Золотые медали Чемпионата России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 7.0, 3, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Медали Кубка России (2276-2281)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES
(2276, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_CUP_M', 'Бронза Кубка России (М)', 'Бронзовые медали Кубка России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 3, 1, TRUE),
(2277, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_CUP_M', 'Серебро Кубка России (М)', 'Серебряные медали Кубка России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 3, 1, TRUE),
(2278, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_CUP_M', 'Золото Кубка России (М)', 'Золотые медали Кубка России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 6.0, 3, 1, TRUE),
(2279, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_CUP_W', 'Бронза Кубка России (Ж)', 'Бронзовые медали Кубка России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 3, 2, TRUE),
(2280, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_CUP_W', 'Серебро Кубка России (Ж)', 'Серебряные медали Кубка России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 3, 2, TRUE),
(2281, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_CUP_W', 'Золото Кубка России (Ж)', 'Золотые медали Кубка России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 6.0, 3, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- СЕКЦИЯ 10: МЕЖДУНАРОДНЫЕ СОРЕВНОВАНИЯ (ID: 2300-2399)
-- ================================

-- Медали чемпионатов Европы (2300-2311)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2300, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U18_M', 'Бронза ЧЕ U18 (М)', 'Бронзовые медали ЧЕ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 8.0, 3, 1, 4, TRUE),
(2301, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U18_M', 'Серебро ЧЕ U18 (М)', 'Серебряные медали ЧЕ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.0, 3, 1, 4, TRUE),
(2302, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U18_M', 'Золото ЧЕ U18 (М)', 'Золотые медали ЧЕ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 3, 1, 4, TRUE),
(2303, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U20_M', 'Бронза ЧЕ U20 (М)', 'Бронзовые медали ЧЕ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.0, 3, 1, 5, TRUE),
(2304, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U20_M', 'Серебро ЧЕ U20 (М)', 'Серебряные медали ЧЕ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 3, 1, 5, TRUE),
(2305, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U20_M', 'Золото ЧЕ U20 (М)', 'Золотые медали ЧЕ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 3, 1, 5, TRUE),
(2306, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U23_M', 'Бронза ЧЕ U23 (М)', 'Бронзовые медали ЧЕ U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 3, 1, 6, TRUE),
(2307, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U23_M', 'Серебро ЧЕ U23 (М)', 'Серебряные медали ЧЕ U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 3, 1, 6, TRUE),
(2308, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U23_M', 'Золото ЧЕ U23 (М)', 'Золотые медали ЧЕ U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 3, 1, 6, TRUE),
(2309, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_SENIOR_M', 'Бронза ЧЕ (М)', 'Бронзовые медали ЧЕ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 3, 1, 8, TRUE),
(2310, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_SENIOR_M', 'Серебро ЧЕ (М)', 'Серебряные медали ЧЕ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 3, 1, 8, TRUE),
(2311, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_SENIOR_M', 'Золото ЧЕ (М)', 'Золотые медали ЧЕ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 3, 1, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Медали чемпионатов Европы женщины (2312-2323)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2312, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U18_W', 'Бронза ЧЕ U18 (Ж)', 'Бронзовые медали ЧЕ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 8.0, 3, 2, 4, TRUE),
(2313, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U18_W', 'Серебро ЧЕ U18 (Ж)', 'Серебряные медали ЧЕ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.0, 3, 2, 4, TRUE),
(2314, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U18_W', 'Золото ЧЕ U18 (Ж)', 'Золотые медали ЧЕ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 3, 2, 4, TRUE),
(2315, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U20_W', 'Бронза ЧЕ U20 (Ж)', 'Бронзовые медали ЧЕ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.0, 3, 2, 5, TRUE),
(2316, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U20_W', 'Серебро ЧЕ U20 (Ж)', 'Серебряные медали ЧЕ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 3, 2, 5, TRUE),
(2317, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U20_W', 'Золото ЧЕ U20 (Ж)', 'Золотые медали ЧЕ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 3, 2, 5, TRUE),
(2318, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U23_W', 'Бронза ЧЕ U23 (Ж)', 'Бронзовые медали ЧЕ U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 3, 2, 6, TRUE),
(2319, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U23_W', 'Серебро ЧЕ U23 (Ж)', 'Серебряные медали ЧЕ U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 3, 2, 6, TRUE),
(2320, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U23_W', 'Золото ЧЕ U23 (Ж)', 'Золотые медали ЧЕ U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 3, 2, 6, TRUE),
(2321, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_SENIOR_W', 'Бронза ЧЕ (Ж)', 'Бронзовые медали ЧЕ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 3, 2, 8, TRUE),
(2322, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_SENIOR_W', 'Серебро ЧЕ (Ж)', 'Серебряные медали ЧЕ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 3, 2, 8, TRUE),
(2323, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_SENIOR_W', 'Золото ЧЕ (Ж)', 'Золотые медали ЧЕ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 3, 2, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Медали чемпионатов мира (2330-2353)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES
(2330, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_U18_M', 'Бронза ЧМ U18 (М)', 'Бронзовые медали ЧМ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 3, 1, 4, TRUE),
(2331, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_U18_M', 'Серебро ЧМ U18 (М)', 'Серебряные медали ЧМ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 3, 1, 4, TRUE),
(2332, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_U18_M', 'Золото ЧМ U18 (М)', 'Золотые медали ЧМ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 3, 1, 4, TRUE),
(2333, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_U20_M', 'Бронза ЧМ U20 (М)', 'Бронзовые медали ЧМ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 3, 1, 5, TRUE),
(2334, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_U20_M', 'Серебро ЧМ U20 (М)', 'Серебряные медали ЧМ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 3, 1, 5, TRUE),
(2335, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_U20_M', 'Золото ЧМ U20 (М)', 'Золотые медали ЧМ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 25.0, 3, 1, 5, TRUE),
(2336, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_SENIOR_M', 'Бронза ЧМ (М)', 'Бронзовые медали ЧМ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 25.0, 3, 1, 8, TRUE),
(2337, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_SENIOR_M', 'Серебро ЧМ (М)', 'Серебряные медали ЧМ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 30.0, 3, 1, 8, TRUE),
(2338, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_SENIOR_M', 'Золото ЧМ (М)', 'Золотые медали ЧМ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 35.0, 3, 1, 8, TRUE),
(2339, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_U18_W', 'Бронза ЧМ U18 (Ж)', 'Бронзовые медали ЧМ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 3, 2, 4, TRUE),
(2340, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_U18_W', 'Серебро ЧМ U18 (Ж)', 'Серебряные медали ЧМ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 3, 2, 4, TRUE),
(2341, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_U18_W', 'Золото ЧМ U18 (Ж)', 'Золотые медали ЧМ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 3, 2, 4, TRUE),
(2342, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_U20_W', 'Бронза ЧМ U20 (Ж)', 'Бронзовые медали ЧМ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 3, 2, 5, TRUE),
(2343, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_U20_W', 'Серебро ЧМ U20 (Ж)', 'Серебряные медали ЧМ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 3, 2, 5, TRUE),
(2344, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_U20_W', 'Золото ЧМ U20 (Ж)', 'Золотые медали ЧМ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 25.0, 3, 2, 5, TRUE),
(2345, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_SENIOR_W', 'Бронза ЧМ (Ж)', 'Бронзовые медали ЧМ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 25.0, 3, 2, 8, TRUE),
(2346, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_SENIOR_W', 'Серебро ЧМ (Ж)', 'Серебряные медали ЧМ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 30.0, 3, 2, 8, TRUE),
(2347, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_SENIOR_W', 'Золото ЧМ (Ж)', 'Золотые медали ЧМ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 35.0, 3, 2, 8, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Медали Олимпийских игр (2350-2355)
INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES
(2350, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_OLYMPICS_M', 'Бронза ОИ (М)', 'Бронзовые медали Олимпийских игр (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 50.0, 3, 1, TRUE),
(2351, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_OLYMPICS_M', 'Серебро ОИ (М)', 'Серебряные медали Олимпийских игр (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 60.0, 3, 1, TRUE),
(2352, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_OLYMPICS_M', 'Золото ОИ (М)', 'Золотые медали Олимпийских игр (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 70.0, 3, 1, TRUE),
(2353, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_OLYMPICS_W', 'Бронза ОИ (Ж)', 'Бронзовые медали Олимпийских игр (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 50.0, 3, 2, TRUE),
(2354, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_OLYMPICS_W', 'Серебро ОИ (Ж)', 'Серебряные медали Олимпийских игр (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 60.0, 3, 2, TRUE),
(2355, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_OLYMPICS_W', 'Золото ОИ (Ж)', 'Золотые медали Олимпийских игр (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 70.0, 3, 2, TRUE)
ON CONFLICT (id) DO NOTHING;

SELECT setval('indicator_catalog_id_seq', 2500, false);

COMMENT ON TABLE indicator_catalog IS 
'Полный каталог критериев.
ID 1000-1499: Баскетбол РФБ (437 критериев).
ID 2000-2355: Легкая атлетика ФЛА (356 критериев).
ИТОГО: 793 критерия.';
