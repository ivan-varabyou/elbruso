-- ================================
-- Блок 16: Уникальные критерии баскетбола (ручное добавление)
-- ================================
-- Критерии, которые НЕ могут быть автоматически сгенерированы

-- ================================
-- 1. ФЕДЕРАТИВНЫЕ КРИТЕРИИ
-- ================================
-- Используют универсальные критерии из indicator_catalog
-- (уже созданы в 09_universal_indicators_system.sql)

-- ================================
-- 2. МАРКЕТИНГОВЫЕ КРИТЕРИИ
-- ================================
-- Используют универсальные критерии из indicator_catalog
-- (уже созданы в 09_universal_indicators_system.sql)

-- ================================
-- 3. ИНФРАСТРУКТУРНЫЕ КРИТЕРИИ БАСКЕТБОЛА
-- ================================

INSERT INTO indicator_catalog (
    category_id, code, name_ru, description,
    value_type, measurement_unit_id, default_weight,
    sport_id, discipline_id, use_population
) VALUES
-- Крытые площадки
((SELECT id FROM indicator_categories WHERE code = 'infrastructure'),
 'BBL_COURTS_INDOOR_STANDARD',
 'Стандартные крытые баскетбольные площадки',
 'Крытые баскетбольные площадки, входящие в единый реестр объектов спорта',
 'number',
 (SELECT id FROM measurement_units WHERE code = 'courts'),
 0.10, 10, NULL, TRUE),

((SELECT id FROM indicator_categories WHERE code = 'infrastructure'),
 'BBL_COURTS_INDOOR_1000',
 'Крытые площадки с 1000+ посадочных мест',
 'Крытые баскетбольные площадки с трибунами на 1000 и более зрителей',
 'number',
 (SELECT id FROM measurement_units WHERE code = 'courts'),
 0.15, 10, NULL, TRUE),

((SELECT id FROM indicator_categories WHERE code = 'infrastructure'),
 'BBL_COURTS_INDOOR_5000',
 'Крытые площадки с 5000+ посадочных мест',
 'Крытые баскетбольные площадки с трибунами на 5000 и более зрителей',
 'number',
 (SELECT id FROM measurement_units WHERE code = 'courts'),
 0.25, 10, NULL, TRUE),

-- Уличные площадки
((SELECT id FROM indicator_categories WHERE code = 'infrastructure'),
 'BBL_COURTS_OUTDOOR_12',
 'Уличные площадки с 1-2 кольцами',
 'Уличные баскетбольные площадки с 1-2 баскетбольными кольцами',
 'number',
 (SELECT id FROM measurement_units WHERE code = 'courts'),
 0.05, 10, NULL, TRUE),

((SELECT id FROM indicator_categories WHERE code = 'infrastructure'),
 'BBL_COURTS_3X3',
 'Центры уличного баскетбола (ЦУБы)',
 'Площадки 3х3 с 3 и более баскетбольными кольцами',
 'number',
 (SELECT id FROM measurement_units WHERE code = 'courts'),
 0.10, 10, 219, TRUE)

ON CONFLICT (code) DO NOTHING;

-- ================================
-- 4. ДОСТИЖЕНИЯ (не автогенерируемые)
-- ================================

INSERT INTO indicator_catalog (
    category_id, code, name_ru, description,
    value_type, measurement_unit_id, default_weight,
    sport_id, use_population
) VALUES
-- Воспитанники в профессиональных клубах
((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_LOCAL_PLAYERS_PRO_M',
 'Воспитанники мужчины в местных профессиональных клубах',
 'Количество воспитанников региона (мужчины) в местных профессиональных клубах',
 'number',
 (SELECT id FROM measurement_units WHERE code = 'people'),
 0.50, 10, TRUE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_LOCAL_PLAYERS_PRO_W',
 'Воспитанники женщины в местных профессиональных клубах',
 'Количество воспитанников региона (женщины) в местных профессиональных клубах',
 'number',
 (SELECT id FROM measurement_units WHERE code = 'people'),
 0.50, 10, TRUE),

-- Члены сборных (общий критерий, не по возрастам)
((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_NATIONAL_TEAM_MEMBERS',
 'Члены сборных команд России',
 'Общее количество спортсменов региона в сборных командах России (все возраста)',
 'number',
 (SELECT id FROM measurement_units WHERE code = 'people'),
 1.00, 10, TRUE)

ON CONFLICT (code) DO NOTHING;

-- ================================
-- 5. КАДРЫ (не автогенерируемые)
-- ================================

INSERT INTO indicator_catalog (
    category_id, code, name_ru, description,
    value_type, measurement_unit_id, default_weight,
    sport_id, use_population
) VALUES
-- Члены комитетов и комиссий
((SELECT id FROM indicator_categories WHERE code = 'personnel'),
 'BBL_REFEREE_COMMITTEE',
 'Участник судейского комитета',
 'Представитель региона в судейском комитете РФБ',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 10.0, 10, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'personnel'),
 'BBL_APPOINTMENT_COMMITTEE',
 'Участник комиссии по назначению',
 'Представитель региона в комиссии по назначению судей',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 10.0, 10, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'personnel'),
 'BBL_DISCIPLINARY_COMMITTEE',
 'Участник дисциплинарной комиссии',
 'Представитель региона в дисциплинарной комиссии',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 10.0, 10, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'personnel'),
 'BBL_SCOUTING_COMMITTEE',
 'Участник просмотровой комиссии',
 'Представитель региона в просмотровой комиссии',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 10.0, 10, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'personnel'),
 'BBL_METHODICAL_COMMITTEE',
 'Участник учебно-методической комиссии',
 'Представитель региона в учебно-методической комиссии',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 10.0, 10, FALSE)

ON CONFLICT (code) DO NOTHING;

-- ================================
-- 6. МЕРОПРИЯТИЯ (не автогенерируемые)
-- ================================

INSERT INTO indicator_catalog (
    category_id, code, name_ru, description,
    value_type, measurement_unit_id, default_weight,
    sport_id, discipline_id, use_population
) VALUES
-- Проведение матчей и туров
((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_NATIONAL_TEAM_MATCH',
 'Матч или тур национальной сборной',
 'Проведение матча или тура национальной сборной в регионе',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.0, 10, NULL, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_ALL_STAR_VTB',
 'Матч звезд ЕЛ ВТБ',
 'Проведение матча звезд Единой лиги ВТБ в регионе',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.0, 10, 220, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_ALL_STAR_ASB',
 'Матч звезд АСБ',
 'Проведение матча звезд Ассоциации студенческого баскетбола',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.5, 10, 220, FALSE),

-- Финалы турниров
((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_LOKOBASKET_FINAL_FO',
 'Финал Федерального округа Локобаскет',
 'Проведение финала ФО турнира Локобаскет',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.0, 10, 220, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_LOKOBASKET_SUPERFINAL',
 'Суперфинал Локобаскет',
 'Проведение суперфинала турнира Локобаскет',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.0, 10, 220, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_KES_FINAL_FO',
 'Финал Федерального округа КЭС-Баскет',
 'Проведение финала ФО турнира КЭС-Баскет',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.0, 10, 220, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_KES_SUPERFINAL',
 'Суперфинал КЭС-Баскет',
 'Проведение суперфинала турнира КЭС-Баскет',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.0, 10, 220, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_ASB_FINAL',
 'Финал высшего дивизиона АСБ',
 'Проведение финала высшего дивизиона АСБ',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.5, 10, 220, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_ASB_SUPERFINAL',
 'Суперфинал АСБ',
 'Проведение суперфинала АСБ',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.5, 10, 220, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_MLBL_FINAL_FO',
 'Финал ФО или 1 лиги МЛБЛ',
 'Проведение финала федерального округа или 1 лиги МЛБЛ',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.5, 10, 220, FALSE),

((SELECT id FROM indicator_categories WHERE code = 'achievements'),
 'BBL_MLBL_SUPERFINAL',
 'Суперфинал МЛБЛ',
 'Проведение суперфинала МЛБЛ',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 7.5, 10, 220, FALSE),

-- Семинары
((SELECT id FROM indicator_categories WHERE code = 'personnel'),
 'BBL_REFEREE_SEMINAR_5X5',
 'Судейский очный семинар 5х5 с инструктором РФБ',
 'Проведение очного судейского семинара 5х5',
 'boolean',
 (SELECT id FROM measurement_units WHERE code = 'yes_no'),
 9.0, 10, 220, FALSE)

ON CONFLICT (code) DO NOTHING;

-- ================================
-- 7. СВЯЗЬ С ГРУППАМИ
-- ================================

-- Инфраструктура → группа BBL_INFRASTRUCTURE
INSERT INTO indicator_catalog_groups (indicator_catalog_id, group_catalog_id, sort_order)
SELECT 
    ic.id,
    (SELECT id FROM indicator_groups_catalog WHERE code = 'BBL_INFRASTRUCTURE'),
    10
FROM indicator_catalog ic
WHERE ic.code IN (
    'BBL_COURTS_INDOOR_STANDARD',
    'BBL_COURTS_INDOOR_1000',
    'BBL_COURTS_INDOOR_5000',
    'BBL_COURTS_OUTDOOR_12',
    'BBL_COURTS_3X3'
)
ON CONFLICT DO NOTHING;

-- Достижения → группа BBL_ACHIEVEMENTS
INSERT INTO indicator_catalog_groups (indicator_catalog_id, group_catalog_id, sort_order)
SELECT 
    ic.id,
    (SELECT id FROM indicator_groups_catalog WHERE code = 'BBL_ACHIEVEMENTS'),
    10
FROM indicator_catalog ic
WHERE ic.code IN (
    'BBL_LOCAL_PLAYERS_PRO_M',
    'BBL_LOCAL_PLAYERS_PRO_W',
    'BBL_NATIONAL_TEAM_MEMBERS'
)
ON CONFLICT DO NOTHING;

-- Кадры → группа BBL_PERSONNEL
INSERT INTO indicator_catalog_groups (indicator_catalog_id, group_catalog_id, sort_order)
SELECT 
    ic.id,
    (SELECT id FROM indicator_groups_catalog WHERE code = 'BBL_PERSONNEL'),
    10
FROM indicator_catalog ic
WHERE ic.code IN (
    'BBL_REFEREE_COMMITTEE',
    'BBL_APPOINTMENT_COMMITTEE',
    'BBL_DISCIPLINARY_COMMITTEE',
    'BBL_SCOUTING_COMMITTEE',
    'BBL_METHODICAL_COMMITTEE',
    'BBL_REFEREE_SEMINAR_5X5'
)
ON CONFLICT DO NOTHING;

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_catalog IS 
'Справочник индикаторов. Содержит как универсальные (sport_id=NULL),
так и специфичные для баскетбола критерии.
Уникальные критерии добавляются вручную, остальные генерируются автоматически.';
