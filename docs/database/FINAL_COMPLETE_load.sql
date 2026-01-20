-- ================================
-- FINAL COMPLETE UNIFIED INDICATORS LOAD
-- ================================
BEGIN;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_WEBSITE', 'Наличие активного официального сайта', 'Федерация имеет работающий сайт или страницу на сайте национальной федерации', 'boolean', 0.04, NULL, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_LOGO', 'Наличие собственного логотипа', 'Федерация имеет уникальный логотип', 'boolean', 0.01, NULL, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_BRAND_STYLE', 'Наличие фирменного стиля', 'Федерация имеет разработанный фирменный стиль', 'boolean', 0.02, NULL, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_VK_ACTIVE', 'Активное сообщество ВКонтакте', 'Федерация ведет активное сообщество ВК (минимум 1 пост в неделю)', 'boolean', 0.05, NULL, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_TG_ACTIVE', 'Активный Telegram-канал', 'Федерация ведет активный Telegram-канал', 'boolean', 0.05, NULL, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_SOCIAL_FOLLOWERS', 'Количество подписчиков в соцсетях', 'Общее количество подписчиков во всех соцсетях', 'number', 0.03, NULL, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_ACCREDITATION', 'Наличие аккредитации', 'Федерация имеет действующую аккредитацию', 'boolean', 0.0005, NULL, FALSE, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_DEVELOPMENT_PROGRAM', 'Наличие программы развития', 'Федерация имеет утвержденную программу развития вида спорта', 'boolean', 0.005, NULL, FALSE, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_BRANCHES_COUNT', 'Количество отделений федерации', 'Количество территориальных отделений региональной федерации', 'number', 0.001, NULL, TRUE, (SELECT id FROM measurement_units WHERE code = 'отделений'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_MEMBERS_COUNT', 'Количество членов федерации', 'Количество членов региональной федерации', 'number', 0.001, NULL, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_ANTIDOPING', 'Наличие антидопинговой работы', 'Федерация проводит антидопинговую работу', 'boolean', 0.001, NULL, FALSE, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_COUNCIL', 'Наличие попечительского совета', 'Федерация имеет действующий попечительский совет', 'boolean', 0.005, NULL, FALSE, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'finance'), 'FIN_BUDGET_VOLUME', 'Объем бюджета федерации', 'number', 0.002, NULL, (SELECT id FROM measurement_units WHERE code = 'рублей'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'finance'), 'FIN_GRANT_NATIONAL', 'Получение гранта национальной федерации', 'boolean', 0.003, NULL, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'finance'), 'FIN_GRANT_OTHER', 'Получение грантов помимо национальной федерации', 'boolean', 0.002, NULL, (SELECT id FROM measurement_units WHERE code = 'да/нет'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, discipline_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_INDOOR_STANDARD', 'Стандартные крытые площадки', 'Крытые баскетбольные площадки в реестре спортивных объектов', 'number', 0.10, 10, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'площадок'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, discipline_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_INDOOR_1000', 'Крытые площадки 1000+ мест', 'Крытые площадки с трибунами на 1000+ зрителей', 'number', 0.15, 10, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'площадок'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, discipline_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_INDOOR_5000', 'Крытые площадки 5000+ мест', 'Крытые площадки с трибунами на 5000+ зрителей', 'number', 0.25, 10, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'площадок'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, discipline_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_OUTDOOR_12', 'Уличные площадки (1-2 кольца)', 'Уличные площадки с 1-2 баскетбольными кольцами', 'number', 0.05, 10, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'площадок'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, discipline_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'BBL_COURTS_3X3', 'Площадки 3х3 (ЦУБы)', 'Центры уличного баскетбола с 3+ кольцами', 'number', 0.10, 10, 219, TRUE, (SELECT id FROM measurement_units WHERE code = 'площадок'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_LOCAL_PLAYERS_PRO', 'Воспитанники в профессиональных клубах', 'Количество воспитанников региона в местных профессиональных клубах', 'number', 0.50, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_MEMBERS', 'Члены сборной России', 'Количество спортсменов региона в сборных командах России', 'number', 1.00, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAMS_PROFESSIONAL', 'Профессиональные команды', 'Количество профессиональных команд региона', 'number', 0.30, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'команд'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREES_RFB', 'Судьи с лицензией РФБ', 'number', 0.05, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREES_FIBA', 'Судьи с лицензией FIBA', 'number', 0.10, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_STATISTICIANS_RFB', 'Статистики с лицензией РФБ', 'number', 0.02, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONERS_FIBA', 'Комиссары FIBA', 'number', 0.15, 10, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_INDOOR_ARENAS', 'Легкоатлетические манежи', 'Крытые легкоатлетические манежи', 'number', 0.30, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'манежей'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_STADIUMS_TRACK', 'Стадионы с беговыми дорожками', 'Стадионы с легкоатлетическими дорожками', 'number', 0.20, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'стадионов'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_SECTORS_JUMP', 'Секторы для прыжков', 'Секторы для прыжков в длину/высоту', 'number', 0.10, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'секторов'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_SECTORS_THROW', 'Секторы для метаний', 'Секторы для метания диска/копья/молота', 'number', 0.10, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'секторов'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_MEMBERS', 'Члены сборной России', 'Количество легкоатлетов региона в сборной России', 'number', 2.00, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_CHAMPIONSHIP', 'Медали на Чемпионате России', 'Количество медалей на ЧР по легкой атлетике', 'number', 1.50, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'медалей'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, description, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_RECORDS_RUSSIA', 'Рекорды России', 'Количество действующих рекордов России', 'number', 5.00, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'рекордов'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREES_NATIONAL', 'Судьи всероссийской категории', 'number', 0.08, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREES_INTERNATIONAL', 'Судьи международной категории', 'number', 0.15, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (category_id, code, name_ru, value_type, default_weight, sport_id, use_population, measurement_unit_id) VALUES ((SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_COACHES_HONORED', 'Заслуженные тренеры', 'number', 0.20, 60, TRUE, (SELECT id FROM measurement_units WHERE code = 'человек'))
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    value_type = EXCLUDED.value_type,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1000, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_ACCREDITATION', 'Есть аккредитация', 'Наличие аккредитации региональной федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.0005, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1001, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_PROGRAM', 'Есть программа развития', 'Наличие программы развития баскетбола в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.005, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1002, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_BRANCHES', 'Количество отделений региональной федерации', 'Количество отделений баскетбола помимо основного регионального', 'number', (SELECT id FROM measurement_units WHERE code = 'organizations'), 0.005, 10, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1003, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_MEMBERS', 'Количество членов федерации', 'Общее количество членов региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.008, 10, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1004, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_ANTIDOPING', 'Наличие антидопинговой работы федерации', 'Ведение антидопинговой работы в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.008, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1005, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'BBL_FED_BUDGET', 'Объем бюджета федерации', 'Общий объем бюджета региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'rubles'), 0.01, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1006, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'BBL_FED_DEFICIT_DETAIL', 'Понимание детального дефицита бюджета', 'Детальное описание дефицита бюджета федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.01, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1007, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'BBL_FED_GRANT_RFB', 'Получение гранта РФБ', 'Получение гранта от Российской Федерации Баскетбола', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.02, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1008, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'BBL_FED_GRANTS_OTHER', 'Получение грантов помимо РФБ', 'Получение грантов из других источников', 'number', (SELECT id FROM measurement_units WHERE code = 'grants'), 0.03, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1009, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'BBL_FED_BOARD', 'Наличие попечительского совета', 'Наличие попечительского совета при федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.03, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1010, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_FED_WEBSITE', 'Федерация с активным официальным сайтом', 'Наличие активного сайта или страницы на сайте РФБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1011, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_FED_BRAND', 'Федерация с фирменным стилем', 'Наличие фирменного стиля региональной федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1012, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_FED_VK', 'Федерация с активным сообществом ВКонтакте', 'Активное сообщество ВК (500+ человек, 2+ поста/месяц)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.05, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1013, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_FED_TELEGRAM', 'Федерация с активным Telegram-каналом', 'Активный Telegram-канал (2+ поста/месяц)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.1, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1014, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_BASE_SPORT', 'Базовый вид спорта', 'Баскетбол является базовым видом спорта в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.1, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1015, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_PARTICIPANTS', 'Количество занимающихся в регионе', 'Количество занимающихся баскетболом по данным Минспорта', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.1, 10, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1030, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U14', 'Сборная 5х5 U14 (мужчины)', 'Члены мужской сборной России 5х5 U14', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 10, 220, 1, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1031, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U15', 'Сборная 5х5 U15 (мужчины)', 'Члены мужской сборной России 5х5 U15', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 10, 220, 1, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1032, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U16', 'Сборная 5х5 U16 (мужчины)', 'Члены мужской сборной России 5х5 U16', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 10, 220, 1, 10, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1033, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U17', 'Сборная 5х5 U17 (мужчины)', 'Члены мужской сборной России 5х5 U17', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 10, 220, 1, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1034, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U18', 'Сборная 5х5 U18 (мужчины)', 'Члены мужской сборной России 5х5 U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.27, 10, 220, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1035, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U19', 'Сборная 5х5 U19 (мужчины)', 'Члены мужской сборной России 5х5 U19', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.3, 10, 220, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1036, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_U20', 'Сборная 5х5 U20 (мужчины)', 'Члены мужской сборной России 5х5 U20', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.33, 10, 220, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1037, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_STUDENT', 'Студенческая сборная 5х5 (мужчины)', 'Члены мужской студенческой сборной России 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.33, 10, 220, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1038, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_M_SENIOR', 'Национальная сборная 5х5 (мужчины)', 'Члены мужской национальной сборной России 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 10, 220, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1039, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U14', 'Сборная 5х5 U14 (женщины)', 'Члены женской сборной России 5х5 U14', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 10, 220, 2, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1040, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U15', 'Сборная 5х5 U15 (женщины)', 'Члены женской сборной России 5х5 U15', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 10, 220, 2, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1041, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U16', 'Сборная 5х5 U16 (женщины)', 'Члены женской сборной России 5х5 U16', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 10, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1042, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U17', 'Сборная 5х5 U17 (женщины)', 'Члены женской сборной России 5х5 U17', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1043, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U18', 'Сборная 5х5 U18 (женщины)', 'Члены женской сборной России 5х5 U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1044, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U19', 'Сборная 5х5 U19 (женщины)', 'Члены женской сборной России 5х5 U19', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1045, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_U20', 'Сборная 5х5 U20 (женщины)', 'Члены женской сборной России 5х5 U20', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1046, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_STUDENT', 'Студенческая сборная 5х5 (женщины)', 'Члены женской студенческой сборной России 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1047, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_5X5_W_SENIOR', 'Национальная сборная 5х5 (женщины)', 'Члены женской национальной сборной России 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 220, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1050, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_M_U18', 'Сборная 3х3 U18 (мужчины)', 'Члены мужской сборной России 3х3 U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1051, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_M_U21', 'Сборная 3х3 U21 (мужчины)', 'Члены мужской сборной России 3х3 U21', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1052, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_M_U23', 'Сборная 3х3 U23 (мужчины)', 'Члены мужской сборной России 3х3 U23', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1053, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_M_SENIOR', 'Национальная сборная 3х3 (мужчины)', 'Члены мужской национальной сборной России 3х3', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1054, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_W_U18', 'Сборная 3х3 U18 (женщины)', 'Члены женской сборной России 3х3 U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1055, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_W_U21', 'Сборная 3х3 U21 (женщины)', 'Члены женской сборной России 3х3 U21', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1056, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_W_U23', 'Сборная 3х3 U23 (женщины)', 'Члены женской сборной России 3х3 U23', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1057, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_NATIONAL_TEAM_3X3_W_SENIOR', 'Национальная сборная 3х3 (женщины)', 'Члены женской национальной сборной России 3х3', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 219, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (1100, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_LOCAL_PLAYERS_PRO_M', 'Воспитанники мужчины в местных проф клубах', 'Воспитанники региона (мужчины) в местных профессиональных клубах', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (1101, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_LOCAL_PLAYERS_PRO_W', 'Воспитанники женщины в местных проф клубах', 'Воспитанники региона (женщины) в местных профессиональных клубах', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 10, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1102, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_WEBSITE', 'Клуб с активным официальным сайтом', 'Профессиональный клуб с активным сайтом', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.5, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1103, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_BRAND', 'Клуб с фирменным стилем', 'Профессиональный клуб с фирменным стилем', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.5, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1104, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_VK', 'Клуб с активным сообществом ВКонтакте', 'Профессиональный клуб с активным ВК', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.53, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1105, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_TELEGRAM', 'Клуб с активным Telegram-каналом', 'Профессиональный клуб с активным Telegram', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.6, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1106, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_TICKETS', 'Клуб с билетной программой', 'Профессиональный клуб с онлайн-продажей билетов', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.6, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1107, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'BBL_CLUB_PARTNER', 'Клуб с взаимодействием с крупным партнером', 'Профессиональный клуб с крупным партнером', 'number', (SELECT id FROM measurement_units WHERE code = 'clubs'), 0.6, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1110, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_INTERREGIONAL_M', 'Команда в проф межрегиональных соревнованиях (М)', 'Мужская команда в межрегиональных соревнованиях', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.6, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1111, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_HIGHER_LEAGUE_M', 'Команда в Высшей лиге (М)', 'Мужская команда в Высшей лиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.6, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1112, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_SUPERLEAGUE_M', 'Команда в Суперлиге (М)', 'Мужская команда в Суперлиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.6, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1113, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_CUP_RUSSIA_M', 'Команда в Кубке России (М)', 'Мужская команда в Кубке России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.15, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1114, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_VTB_M', 'Команда в ЕЛ ВТБ (М)', 'Мужская команда в Единой лиге ВТБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.7, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1115, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_FIBA_EUROPE_CUP_M', 'Команда в Кубке Европы ФИБА (М)', 'Мужская команда в Кубке Европы ФИБА', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.7, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1116, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_EUROCUP_M', 'Команда в Еврокубке (М)', 'Мужская команда в Еврокубке', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.75, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1117, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_FIBA_CHAMPIONS_M', 'Команда в Лиге Чемпионов ФИБА (М)', 'Мужская команда в Лиге Чемпионов ФИБА', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.75, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1118, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_EUROLEAGUE_M', 'Команда в Евролиге (М)', 'Мужская команда в Евролиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.75, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1120, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_INTERREGIONAL_W', 'Команда в проф межрегиональных соревнованиях (Ж)', 'Женская команда в межрегиональных соревнованиях', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1121, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_HIGHER_LEAGUE_W', 'Команда в Высшей лиге (Ж)', 'Женская команда в Высшей лиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1122, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_SUPERLEAGUE_W', 'Команда в Суперлиге (Ж)', 'Женская команда в Суперлиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1123, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_CUP_RUSSIA_W', 'Команда в Кубке России (Ж)', 'Женская команда в Кубке России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1124, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_PREMIER_LEAGUE_W', 'Команда в Премьер-лиге (Ж)', 'Женская команда в Премьер-лиге', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1125, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_FIBA_EUROCUP_W', 'Команда в Еврокубке ФИБА (Ж)', 'Женская команда в Еврокубке ФИБА', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1126, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_TEAM_FIBA_EUROLEAGUE_W', 'Команда в Евролиге ФИБА (Ж)', 'Женская команда в Евролиге ФИБА', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 0.8, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1130, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_TARAKANOV_M', '3 место в Кубке Тараканова (М)', 'Мужская команда заняла 3 место в Кубке Тараканова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.8, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1131, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_TARAKANOV_M', '2 место в Кубке Тараканова (М)', 'Мужская команда заняла 2 место в Кубке Тараканова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1132, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_TARAKANOV_M', '1 место в Кубке Тараканова (М)', 'Мужская команда заняла 1 место в Кубке Тараканова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1133, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_INTERREGIONAL_M', '3 место в проф межрегиональных (М)', 'Мужская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1134, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_INTERREGIONAL_M', '2 место в проф межрегиональных (М)', 'Мужская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1135, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_INTERREGIONAL_M', '1 место в проф межрегиональных (М)', 'Мужская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1136, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_HIGHER_LEAGUE_M', '3 место в Высшей лиге (М)', 'Мужская команда заняла 3 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1137, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_HIGHER_LEAGUE_M', '2 место в Высшей лиге (М)', 'Мужская команда заняла 2 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1138, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_HIGHER_LEAGUE_M', '1 место в Высшей лиге (М)', 'Мужская команда заняла 1 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1139, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_SUPERLEAGUE_M', '3 место в Суперлиге (М)', 'Мужская команда заняла 3 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1140, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_SUPERLEAGUE_M', '2 место в Суперлиге (М)', 'Мужская команда заняла 2 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1141, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_SUPERLEAGUE_M', '1 место в Суперлиге (М)', 'Мужская команда заняла 1 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1142, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_CUP_RUSSIA_M', '3 место в Кубке России (М)', 'Мужская команда заняла 3 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1143, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_CUP_RUSSIA_M', '2 место в Кубке России (М)', 'Мужская команда заняла 2 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1144, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_CUP_RUSSIA_M', '1 место в Кубке России (М)', 'Мужская команда заняла 1 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1145, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_SUPERCUP_M', '1 место в Суперкубке (М)', 'Мужская команда заняла 1 место в Суперкубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1146, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_VTB_M', '3 место в ЕЛ ВТБ (М)', 'Мужская команда заняла 3 место в ЕЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1147, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_VTB_M', '2 место в ЕЛ ВТБ (М)', 'Мужская команда заняла 2 место в ЕЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1148, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_VTB_M', '1 место в ЕЛ ВТБ (М)', 'Мужская команда заняла 1 место в ЕЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1149, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_FIBA_EUROPE_CUP_M', '3 место в Кубке Европы ФИБА (М)', 'Мужская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1150, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_FIBA_EUROPE_CUP_M', '2 место в Кубке Европы ФИБА (М)', 'Мужская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1151, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_FIBA_EUROPE_CUP_M', '1 место в Кубке Европы ФИБА (М)', 'Мужская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1152, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_EUROCUP_M', '3 место в Еврокубке (М)', 'Мужская команда заняла 3 место в Еврокубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1153, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_EUROCUP_M', '2 место в Еврокубке (М)', 'Мужская команда заняла 2 место в Еврокубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1154, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_EUROCUP_M', '1 место в Еврокубке (М)', 'Мужская команда заняла 1 место в Еврокубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1155, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_FIBA_CHAMPIONS_M', '3 место в Лиге Чемпионов ФИБА (М)', 'Мужская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1156, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_FIBA_CHAMPIONS_M', '2 место в Лиге Чемпионов ФИБА (М)', 'Мужская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1157, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_FIBA_CHAMPIONS_M', '1 место в Лиге Чемпионов ФИБА (М)', 'Мужская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1158, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_EUROLEAGUE_M', '3 место в Евролиге (М)', 'Мужская команда заняла 3 место в Евролиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1159, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_EUROLEAGUE_M', '2 место в Евролиге (М)', 'Мужская команда заняла 2 место в Евролиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1160, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_EUROLEAGUE_M', '1 место в Евролиге (М)', 'Мужская команда заняла 1 место в Евролиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1170, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_BERLIN_W', '3 место в Кубке Берлина (Ж)', 'Женская команда заняла 3 место в Кубке Берлина', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1171, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_BERLIN_W', '2 место в Кубке Берлина (Ж)', 'Женская команда заняла 2 место в Кубке Берлина', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1172, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_BERLIN_W', '1 место в Кубке Берлина (Ж)', 'Женская команда заняла 1 место в Кубке Берлина', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1173, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_INTERREGIONAL_W', '3 место в проф межрегиональных (Ж)', 'Женская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.2, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1174, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_INTERREGIONAL_W', '2 место в проф межрегиональных (Ж)', 'Женская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.6, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1175, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_INTERREGIONAL_W', '1 место в проф межрегиональных (Ж)', 'Женская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.3, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1176, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_HIGHER_LEAGUE_W', '3 место в Высшей лиге (Ж)', 'Женская команда заняла 3 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.3, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1177, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_HIGHER_LEAGUE_W', '2 место в Высшей лиге (Ж)', 'Женская команда заняла 2 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1178, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_HIGHER_LEAGUE_W', '1 место в Высшей лиге (Ж)', 'Женская команда заняла 1 место в Высшей лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1179, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_SUPERLEAGUE_W', '3 место в Суперлиге (Ж)', 'Женская команда заняла 3 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1180, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_SUPERLEAGUE_W', '2 место в Суперлиге (Ж)', 'Женская команда заняла 2 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1181, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_SUPERLEAGUE_W', '1 место в Суперлиге (Ж)', 'Женская команда заняла 1 место в Суперлиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1182, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_CUP_RUSSIA_W', '3 место в Кубке России (Ж)', 'Женская команда заняла 3 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1183, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_CUP_RUSSIA_W', '2 место в Кубке России (Ж)', 'Женская команда заняла 2 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.6, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1184, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_CUP_RUSSIA_W', '1 место в Кубке России (Ж)', 'Женская команда заняла 1 место в Кубке России', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.6, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1185, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_SUPERCUP_W', '1 место в Суперкубке (Ж)', 'Женская команда заняла 1 место в Суперкубке', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.6, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1186, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PREMIER_LEAGUE_W', '3 место в Премьер-лиге (Ж)', 'Женская команда заняла 3 место в Премьер-лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.6, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1187, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PREMIER_LEAGUE_W', '2 место в Премьер-лиге (Ж)', 'Женская команда заняла 2 место в Премьер-лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1188, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PREMIER_LEAGUE_W', '1 место в Премьер-лиге (Ж)', 'Женская команда заняла 1 место в Премьер-лиге', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1189, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_FIBA_EUROCUP_W', '3 место в Еврокубке ФИБА (Ж)', 'Женская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1190, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_FIBA_EUROCUP_W', '2 место в Еврокубке ФИБА (Ж)', 'Женская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1191, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_FIBA_EUROCUP_W', '1 место в Еврокубке ФИБА (Ж)', 'Женская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1192, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_FIBA_EUROLEAGUE_W', '3 место в Евролиге ФИБА (Ж)', 'Женская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1193, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_FIBA_EUROLEAGUE_W', '2 место в Евролиге ФИБА (Ж)', 'Женская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1194, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_FIBA_EUROLEAGUE_W', '1 место в Евролиге ФИБА (Ж)', 'Женская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 1.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (1200, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_YOUTH_PRO_M', 'Воспитанник из региона, играющий за проф команды (М)', 'Воспитанники региона в профессиональных командах (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.7, 10, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (1201, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_YOUTH_PRO_W', 'Воспитанник из региона, играющий за проф команды (Ж)', 'Воспитанники региона в профессиональных командах (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.08, 10, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1210, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_INTERREGIONAL_M', 'Команды в ПР юноши U14-16 (межрегиональный этап)', 'Мужские команды U14-16 на межрегиональном этапе', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 1.8, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1211, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R1_M', 'Команды в ПР юноши U14-16 (1-й раунд полуфинала)', 'Мужские команды U14-16 в 1-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 1.8, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1212, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R2_M', 'Команды в ПР юноши U14-16 (2-й раунд полуфинала)', 'Мужские команды U14-16 во 2-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 1.8, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1213, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R3_M', 'Команды в ПР юноши U14-16 (3-й раунд полуфинала)', 'Мужские команды U14-16 в 3-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1214, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_FINAL_M', 'Команды в ПР юноши U14-16 (финал)', 'Мужские команды U14-16 в финале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1215, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_INTERREGIONAL_M', 'Команды в ПР юноши U17-18 (межрегиональный этап)', 'Мужские команды U17-18 на межрегиональном этапе', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1216, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_SEMIFINAL_M', 'Команды в ПР юноши U17-18 (полуфинал)', 'Мужские команды U17-18 в полуфинале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1217, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_FINAL_M', 'Команды в ПР юноши U17-18 (финал)', 'Мужские команды U17-18 в финале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1220, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_DYUBL_PRELIMINARY_M', 'Команды в предварительном этапе ДЮБЛ (М)', 'Мужские команды в предварительном этапе ДЮБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1221, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_DYUBL_FINAL_M', 'Команды в финале ДЮБЛ (М)', 'Мужские команды в финале ДЮБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1222, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_YML_VTB_REGULAR_M', 'Команды в регулярном чемпионате U21 (ЕМЛ ВТБ)', 'Мужские команды U21 в регулярном чемпионате ЕМЛ ВТБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1223, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_YML_VTB_FINAL_M', 'Команды в финале чемпионата U21 ЕМЛ ВТБ', 'Мужские команды U21 в финале ЕМЛ ВТБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1230, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_INTERREGIONAL_W', 'Команды в ПР девушки U14-16 (межрегиональный этап)', 'Женские команды U14-16 на межрегиональном этапе', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1231, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R1_W', 'Команды в ПР девушки U14-16 (1-й раунд полуфинала)', 'Женские команды U14-16 в 1-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1232, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R2_W', 'Команды в ПР девушки U14-16 (2-й раунд полуфинала)', 'Женские команды U14-16 во 2-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1233, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_SEMIFINAL_R3_W', 'Команды в ПР девушки U14-16 (3-й раунд полуфинала)', 'Женские команды U14-16 в 3-м раунде полуфинала', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1234, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U14_16_FINAL_W', 'Команды в ПР девушки U14-16 (финал)', 'Женские команды U14-16 в финале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1235, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_INTERREGIONAL_W', 'Команды в ПР юниорки U17-18 (межрегиональный этап)', 'Женские команды U17-18 на межрегиональном этапе', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1236, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_SEMIFINAL_W', 'Команды в ПР юниорки U17-18 (полуфинал)', 'Женские команды U17-18 в полуфинале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1237, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PR_U17_18_FINAL_W', 'Команды в ПР юниорки U17-18 (финал)', 'Женские команды U17-18 в финале', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1240, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_DYUBL_PRELIMINARY_W', 'Команды в предварительном этапе ДЮБЛ (Ж)', 'Женские команды в предварительном этапе ДЮБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.4, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1241, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_DYUBL_FINAL_W', 'Команды в финале ДЮБЛ (Ж)', 'Женские команды в финале ДЮБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 2.4, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1250, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U14_M', '3 место в ПР юноши U14', 'Мужская команда заняла 3 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.4, 10, 220, 1, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1251, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U14_M', '2 место в ПР юноши U14', 'Мужская команда заняла 2 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.4, 10, 220, 1, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1252, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U14_M', '1 место в ПР юноши U14', 'Мужская команда заняла 1 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.4, 10, 220, 1, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1253, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U15_M', '3 место в ПР юноши U15', 'Мужская команда заняла 3 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.0, 10, 220, 1, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1254, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U15_M', '2 место в ПР юноши U15', 'Мужская команда заняла 2 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1255, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U15_M', '1 место в ПР юноши U15', 'Мужская команда заняла 1 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1256, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U16_M', '3 место в ПР юноши U16', 'Мужская команда заняла 3 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1257, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U16_M', '2 место в ПР юноши U16', 'Мужская команда заняла 2 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1258, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U16_M', '1 место в ПР юноши U16', 'Мужская команда заняла 1 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1259, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U17_M', '3 место в ПР юноши U17', 'Мужская команда заняла 3 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1260, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U17_M', '2 место в ПР юноши U17', 'Мужская команда заняла 2 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1261, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U17_M', '1 место в ПР юноши U17', 'Мужская команда заняла 1 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1262, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U18_M', '3 место в ПР юноши U18', 'Мужская команда заняла 3 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 4, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1263, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U18_M', '2 место в ПР юноши U18', 'Мужская команда заняла 2 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 4, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1264, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U18_M', '1 место в ПР юноши U18', 'Мужская команда заняла 1 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 4, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1265, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_DYUBL_M', '3 место в ДЮБЛ (М)', 'Мужская команда заняла 3 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1266, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_DYUBL_M', '2 место в ДЮБЛ (М)', 'Мужская команда заняла 2 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 2.5, 10, 220, 1, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1267, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_DYUBL_M', '1 место в ДЮБЛ (М)', 'Мужская команда заняла 1 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1268, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_YML_VTB_M', '3 место в ЕМЛ ВТБ (М)', 'Мужская команда заняла 3 место в ЕМЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1269, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_YML_VTB_M', '2 место в ЕМЛ ВТБ (М)', 'Мужская команда заняла 2 место в ЕМЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1270, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_YML_VTB_M', '1 место в ЕМЛ ВТБ (М)', 'Мужская команда заняла 1 место в ЕМЛ ВТБ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1280, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U14_W', '3 место в ПР девушки U14', 'Женская команда заняла 3 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1281, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U14_W', '2 место в ПР девушки U14', 'Женская команда заняла 2 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1282, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U14_W', '1 место в ПР девушки U14', 'Женская команда заняла 1 место в ПР U14', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1283, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U15_W', '3 место в ПР девушки U15', 'Женская команда заняла 3 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1284, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U15_W', '2 место в ПР девушки U15', 'Женская команда заняла 2 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1285, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U15_W', '1 место в ПР девушки U15', 'Женская команда заняла 1 место в ПР U15', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1286, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U16_W', '3 место в ПР девушки U16', 'Женская команда заняла 3 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1287, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U16_W', '2 место в ПР девушки U16', 'Женская команда заняла 2 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1288, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U16_W', '1 место в ПР девушки U16', 'Женская команда заняла 1 место в ПР U16', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1289, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U17_W', '3 место в ПР девушки U17', 'Женская команда заняла 3 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1290, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U17_W', '2 место в ПР девушки U17', 'Женская команда заняла 2 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1291, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U17_W', '1 место в ПР девушки U17', 'Женская команда заняла 1 место в ПР U17', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1292, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_PR_U18_W', '3 место в ПР девушки U18', 'Женская команда заняла 3 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 4, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1293, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_PR_U18_W', '2 место в ПР девушки U18', 'Женская команда заняла 2 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 4, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1294, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_PR_U18_W', '1 место в ПР девушки U18', 'Женская команда заняла 1 место в ПР U18', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 4, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1295, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_DYUBL_W', '3 место в ДЮБЛ (Ж)', 'Женская команда заняла 3 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1296, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_DYUBL_W', '2 место в ДЮБЛ (Ж)', 'Женская команда заняла 2 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, age_group_id, use_population) VALUES (1297, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_DYUBL_W', '1 место в ДЮБЛ (Ж)', 'Женская команда заняла 1 место в ДЮБЛ', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, 5, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1300, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_LOKOBASKET_REGIONAL_M', 'Команда в региональных соревнованиях Локобаскет (М)', 'Мужские команды в региональном этапе Локобаскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1301, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_LOKOBASKET_FINAL_M', 'Команда во Всероссийском финале Локобаскет (М)', 'Мужские команды во Всероссийском финале Локобаскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1302, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_LOKOBASKET_REGIONAL_W', 'Команда в региональных соревнованиях Локобаскет (Ж)', 'Женские команды в региональном этапе Локобаскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1303, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_LOKOBASKET_FINAL_W', 'Команда во Всероссийском финале Локобаскет (Ж)', 'Женские команды во Всероссийском финале Локобаскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1304, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_LOKOBASKET_FO_M', '3 место в Финале ФО Локобаскет (М)', 'Мужская команда заняла 3 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1305, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_LOKOBASKET_FO_M', '2 место в Финале ФО Локобаскет (М)', 'Мужская команда заняла 2 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1306, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_LOKOBASKET_FO_M', '1 место в Финале ФО Локобаскет (М)', 'Мужская команда заняла 1 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1307, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_LOKOBASKET_RUSSIA_M', '3 место во Всероссийском финале Локобаскет (М)', 'Мужская команда заняла 3 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1308, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_LOKOBASKET_RUSSIA_M', '2 место во Всероссийском финале Локобаскет (М)', 'Мужская команда заняла 2 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1309, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_LOKOBASKET_RUSSIA_M', '1 место во Всероссийском финале Локобаскет (М)', 'Мужская команда заняла 1 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1310, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_LOKOBASKET_FO_W', '3 место в Финале ФО Локобаскет (Ж)', 'Женская команда заняла 3 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1311, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_LOKOBASKET_FO_W', '2 место в Финале ФО Локобаскет (Ж)', 'Женская команда заняла 2 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1312, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_LOKOBASKET_FO_W', '1 место в Финале ФО Локобаскет (Ж)', 'Женская команда заняла 1 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1313, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_LOKOBASKET_RUSSIA_W', '3 место во Всероссийском финале Локобаскет (Ж)', 'Женская команда заняла 3 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1314, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_LOKOBASKET_RUSSIA_W', '2 место во Всероссийском финале Локобаскет (Ж)', 'Женская команда заняла 2 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1315, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_LOKOBASKET_RUSSIA_W', '1 место во Всероссийском финале Локобаскет (Ж)', 'Женская команда заняла 1 место во Всероссийском финале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1320, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_KES_REGIONAL_M', 'Команда в региональных соревнованиях КЭС-Баскет (М)', 'Мужские команды в региональном этапе КЭС-Баскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.3, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1321, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_KES_SUPERFINAL_M', 'Команда в Суперфинале КЭС-Баскет (М)', 'Мужские команды в Суперфинале КЭС-Баскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.3, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1322, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_KES_REGIONAL_W', 'Команда в региональных соревнованиях КЭС-Баскет (Ж)', 'Женские команды в региональном этапе КЭС-Баскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.3, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1323, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_KES_SUPERFINAL_W', 'Команда в Суперфинале КЭС-Баскет (Ж)', 'Женские команды в Суперфинале КЭС-Баскет', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.3, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1324, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_KES_FO_M', '3 место в Финале ФО КЭС-Баскет (М)', 'Мужская команда заняла 3 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1325, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_KES_FO_M', '2 место в Финале ФО КЭС-Баскет (М)', 'Мужская команда заняла 2 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1326, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_KES_FO_M', '1 место в Финале ФО КЭС-Баскет (М)', 'Мужская команда заняла 1 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1327, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_KES_SUPERFINAL_M', '3 место в Суперфинале КЭС-Баскет (М)', 'Мужская команда заняла 3 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1328, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_KES_SUPERFINAL_M', '2 место в Суперфинале КЭС-Баскет (М)', 'Мужская команда заняла 2 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1329, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_KES_SUPERFINAL_M', '1 место в Суперфинале КЭС-Баскет (М)', 'Мужская команда заняла 1 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1330, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_KES_FO_W', '3 место в Финале ФО КЭС-Баскет (Ж)', 'Женская команда заняла 3 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.3, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1331, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_KES_FO_W', '2 место в Финале ФО КЭС-Баскет (Ж)', 'Женская команда заняла 2 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1332, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_KES_FO_W', '1 место в Финале ФО КЭС-Баскет (Ж)', 'Женская команда заняла 1 место в Финале ФО', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1333, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_KES_SUPERFINAL_W', '3 место в Суперфинале КЭС-Баскет (Ж)', 'Женская команда заняла 3 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1334, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_KES_SUPERFINAL_W', '2 место в Суперфинале КЭС-Баскет (Ж)', 'Женская команда заняла 2 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1335, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_KES_SUPERFINAL_W', '1 место в Суперфинале КЭС-Баскет (Ж)', 'Женская команда заняла 1 место в Суперфинале', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.7, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1340, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_START_DIV_M', 'Региональный дивизион Старт АСБ (М)', 'Наличие регионального дивизиона Старт АСБ (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.5, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1341, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_BASE_DIV_M', 'Региональный дивизион Базовый АСБ (М)', 'Наличие регионального дивизиона Базовый АСБ (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 7.5, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1342, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_TOP_DIV_M', 'Региональный дивизион Топ АСБ (М)', 'Наличие регионального дивизиона Топ АСБ (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 10.5, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1343, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_START_DIV_W', 'Региональный дивизион Старт АСБ (Ж)', 'Наличие регионального дивизиона Старт АСБ (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 3.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1344, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_BASE_DIV_W', 'Региональный дивизион Базовый АСБ (Ж)', 'Наличие регионального дивизиона Базовый АСБ (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 7.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1345, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_ASB_TOP_DIV_W', 'Региональный дивизион Топ АСБ (Ж)', 'Наличие регионального дивизиона Топ АСБ (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 10.5, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1346, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_REGIONAL_M', 'Команда в региональном дивизионе АСБ (М)', 'Мужские команды в региональном дивизионе АСБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1347, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_HIGHER_M', 'Команда в высшем дивизионе АСБ (М)', 'Мужские команды в высшем дивизионе АСБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1348, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_BELOV_M', 'Команда в Лиге Белова (М)', 'Мужские команды в Лиге Белова', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1349, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_RZD_M', 'Команда в СЛ РЖД (М)', 'Мужские команды в Студенческой лиге РЖД', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1350, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_REGIONAL_W', 'Команда в региональном дивизионе АСБ (Ж)', 'Женские команды в региональном дивизионе АСБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1351, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_HIGHER_W', 'Команда в высшем дивизионе АСБ (Ж)', 'Женские команды в высшем дивизионе АСБ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 4.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1352, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_BELOV_W', 'Команда в Лиге Белова (Ж)', 'Женские команды в Лиге Белова', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 1.8, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1353, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_ASB_RZD_W', 'Команда в СЛ РЖД (Ж)', 'Женские команды в Студенческой лиге РЖД', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 3.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1354, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_HIGHER_M', '3 место в Высшем дивизионе АСБ (М)', 'Мужская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1355, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_HIGHER_M', '2 место в Высшем дивизионе АСБ (М)', 'Мужская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1356, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_HIGHER_M', '1 место в Высшем дивизионе АСБ (М)', 'Мужская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1357, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_RZD_M', '3 место в СЛ РЖД (М)', 'Мужская команда заняла 3 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1358, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_RZD_M', '2 место в СЛ РЖД (М)', 'Мужская команда заняла 2 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1359, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_RZD_M', '1 место в СЛ РЖД (М)', 'Мужская команда заняла 1 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1360, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_BELOV_M', '3 место в ЛБ (М)', 'Мужская команда заняла 3 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1361, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_BELOV_M', '2 место в ЛБ (М)', 'Мужская команда заняла 2 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1362, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_BELOV_M', '1 место в ЛБ (М)', 'Мужская команда заняла 1 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1363, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_HIGHER_W', '3 место в Высшем дивизионе АСБ (Ж)', 'Женская команда заняла 3 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1364, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_HIGHER_W', '2 место в Высшем дивизионе АСБ (Ж)', 'Женская команда заняла 2 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1365, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_HIGHER_W', '1 место в Высшем дивизионе АСБ (Ж)', 'Женская команда заняла 1 место', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1366, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_RZD_W', '3 место в СЛ РЖД (Ж)', 'Женская команда заняла 3 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1367, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_RZD_W', '2 место в СЛ РЖД (Ж)', 'Женская команда заняла 2 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1368, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_RZD_W', '1 место в СЛ РЖД (Ж)', 'Женская команда заняла 1 место в СЛ РЖД', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1369, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_3_ASB_BELOV_W', '3 место в ЛБ (Ж)', 'Женская команда заняла 3 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1370, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_2_ASB_BELOV_W', '2 место в ЛБ (Ж)', 'Женская команда заняла 2 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1371, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_PLACE_1_ASB_BELOV_W', '1 место в ЛБ (Ж)', 'Женская команда заняла 1 место в Лиге Белова', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1372, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_MLBL_REGIONAL_LEAGUE_M', 'Региональная зимняя/летняя лига МЛБЛ (М)', 'Наличие региональной любительской лиги (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1373, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_MLBL_REGIONAL_LEAGUE_W', 'Региональная зимняя/летняя лига МЛБЛ (Ж)', 'Наличие региональной любительской лиги (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 5.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1374, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_MLBL_REGIONAL_DIV_M', 'Региональный мужской дивизион МЛБЛ', 'Региональный дивизион МЛБЛ (мужчины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 10.0, 10, 220, 1, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1375, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_MLBL_REGIONAL_DIV_W', 'Региональный женский дивизион МЛБЛ', 'Региональный дивизион МЛБЛ (женщины)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 10.0, 10, 220, 2, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1376, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_REGIONAL_M', 'Команда в региональном дивизионе МЛБЛ (М)', 'Мужские команды в региональном дивизионе МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1377, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_FO_M', 'Команда в финале ФО или 1 лиге МЛБЛ (М)', 'Мужские команды в финале ФО МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1378, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_SUPERFINAL_M', 'Команда в Суперфинале МЛБЛ (М)', 'Мужские команды в Суперфинале МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1379, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_REGIONAL_W', 'Команда в региональном дивизионе МЛБЛ (Ж)', 'Женские команды в региональном дивизионе МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1380, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_FO_W', 'Команда в финале ФО или 1 лиге МЛБЛ (Ж)', 'Женские команды в финале ФО МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1381, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_TEAMS_SUPERFINAL_W', 'Команда в Суперфинале МЛБЛ (Ж)', 'Женские команды в Суперфинале МЛБЛ', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1382, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_MATCHES_M', 'Сыгранные мужские матчи МЛБЛ', 'Количество сыгранных матчей МЛБЛ (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'matches'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1383, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_MLBL_MATCHES_W', 'Сыгранные женские матчи МЛБЛ', 'Количество сыгранных матчей МЛБЛ (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'matches'), 5.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1384, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_40_M', 'Команда ветеранов 40+ (М)', 'Команда ветеранов 40+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1385, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_45_M', 'Команда ветеранов 45+ (М)', 'Команда ветеранов 45+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1386, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_50_M', 'Команда ветеранов 50+ (М)', 'Команда ветеранов 50+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1387, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_55_M', 'Команда ветеранов 55+ (М)', 'Команда ветеранов 55+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1388, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_60_M', 'Команда ветеранов 60+ (М)', 'Команда ветеранов 60+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1389, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_65_M', 'Команда ветеранов 65+ (М)', 'Команда ветеранов 65+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1390, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_40_W', 'Команда ветеранов 40+ (Ж)', 'Команда ветеранов 40+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.0, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1391, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_VETERANS_45_W', 'Команда ветеранов 45+ (Ж)', 'Команда ветеранов 45+ в Первенстве России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 5.5, 10, 220, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1400, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_CUP_RUSSIA_M', 'Команда 3х3 в Кубке России (М)', 'Мужская команда 3х3 в Кубке России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1401, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_CUP_RUSSIA_W', 'Команда 3х3 в Кубке России (Ж)', 'Женская команда 3х3 в Кубке России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1402, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_CHAMPIONSHIP_M', 'Команда 3х3 в ЧР (М)', 'Мужская команда 3х3 в Чемпионате России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1403, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_CHAMPIONSHIP_W', 'Команда 3х3 в ЧР (Ж)', 'Женская команда 3х3 в Чемпионате России', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1404, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_3X3_TEAM_WORLD_TOUR_M', 'Команда 3х3 в Мировом туре (М)', 'Мужская команда 3х3 в Мировом туре', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 10.0, 10, 219, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1405, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_3X3_TEAM_U18_M', 'Команда U18 3х3 (М)', 'Команды U18 в соревнованиях 3х3', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 15.0, 10, 219, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, gender_id, use_population) VALUES (1406, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_3X3_TEAM_U18_W', 'Команда U18 3х3 (Ж)', 'Команды U18 в соревнованиях 3х3', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 15.0, 10, 219, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1450, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_5_BASKET', 'Судья 5 корзины', 'Судьи 5 корзины (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 8.0, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1451, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_1_3_BASKET', 'Судья 1-3 корзины по рейтингу', 'Судьи 1-3 корзины (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 8.0, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1452, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_FIBA', 'Судья FIBA', 'Судьи с лицензией FIBA (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 8.3, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1453, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_FIBA_APPOINTMENT', 'Назначение судьи на игру FIBA', 'Судья получил назначение на международную игру FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 9.0, 10, 220, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1454, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_REFEREE_SEMINAR', 'Судейский очный семинар 5х5 с инструктором РФБ', 'Проведение судейского семинара 5х5', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 9.0, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1455, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONER_5_BASKET', 'Комиссар 5 корзины', 'Комиссары 5 корзины (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 9.0, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1456, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONER_1_3_BASKET', 'Комиссар 1-3 корзины по рейтингу', 'Комиссары 1-3 корзины (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 9.0, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1457, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONER_FIBA', 'Комиссар FIBA', 'Комиссары с лицензией FIBA (5х5)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 10.0, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1458, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_COMMISSIONER_FIBA_APPOINTMENT', 'Назначение комиссара на игру FIBA', 'Комиссар получил назначение на международную игру FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 10.0, 10, 220, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1459, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_STATISTICIAN_RFB', 'Статистик с лицензией РФБ', 'Статистики с лицензией РФБ', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 7.5, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1460, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_SECRETARY_RFB', 'Секретарь с лицензией РФБ', 'Секретари с лицензией РФБ', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 7.5, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1461, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_STATISTICIAN_FIBA', 'Статистик с лицензией FIBA', 'Статистики с лицензией FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 7.5, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1462, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_SECRETARY_FIBA', 'Секретарь с лицензией FIBA', 'Секретари с лицензией FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 7.5, 10, 220, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1465, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_SEMINAR', 'Судейский очный семинар 3х3 с инструктором РФБ', 'Проведение судейского семинара 3х3', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 33.3, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1466, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_REFEREE_B', 'Судья 3х3 (Лицензия Б)', 'Судьи 3х3 с лицензией Б', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 33.3, 10, 219, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1467, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_SECRETARY_LICENSE', 'Лицо, имеющее лицензию судьи-секретаря Play.Fiba 3x3', 'Судья-секретарь с лицензией Play.Fiba 3x3', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 35.0, 10, 219, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1468, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_REFEREE_B_APPOINTMENT', 'Судья с лицензией Б, получивший назначение от РФБ', 'Судья 3х3 (Лицензия Б) с назначением', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1469, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_REFEREE_A', 'Судья ЧР 3х3 (Лицензия А)', 'Судья Чемпионата России 3х3 с лицензией А', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1470, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_CHIEF_REFEREE_A', 'Главный судья ЧР 3х3 (Лицензия А)', 'Главный судья Чемпионата России 3х3 с лицензией А', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1471, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_A', 'Судья с категорией А FIBA', 'Судья 3х3 с международной категорией А FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1472, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_B', 'Судья с категорией B FIBA', 'Судья 3х3 с международной категорией B FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 40.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1473, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_C', 'Судья с категорией C FIBA', 'Судья 3х3 с международной категорией C FIBA', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 45.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1474, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_APPOINTMENT_5_6', 'Назначение на международные турниры 5-6 цвета', 'Назначение судьи 3х3 на международные турниры 5-6 цвета', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 45.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1475, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_APPOINTMENT_7_8', 'Назначение на международные турниры 7-8 цвета', 'Назначение судьи 3х3 на международные турниры 7-8 цвета', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 45.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, discipline_id, use_population) VALUES (1476, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'BBL_3X3_FIBA_APPOINTMENT_9_10', 'Назначение на международные турниры 9-10 цвета', 'Назначение судьи 3х3 на международные турниры 9-10 цвета', 'number', (SELECT id FROM measurement_units WHERE code = 'appointments'), 45.0, 10, 219, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    discipline_id = EXCLUDED.discipline_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1480, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_DEAF_TEAM', 'Команда в ЧР по баскетболу среди глухих', 'Участие команды в Чемпионате России среди глухих', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 45.0, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1481, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_DISABLED_TEAM', 'Команда в ЧР по баскетболу среди ЛИН', 'Участие команды в Чемпионате России среди лиц с интеллектуальными нарушениями', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 45.0, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1482, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_WHEELCHAIR_TEAM', 'Команда в ЧР по баскетболу на колясках', 'Участие команды в Чемпионате России на колясках', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 50.0, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1483, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_INTERACTIVE_TEAM_CHAMPIONSHIP', 'Команда в ЧР по интерактивному баскетболу', 'Участие команды в Чемпионате России по интерактивному баскетболу', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 50.0, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1484, (SELECT id FROM indicator_categories WHERE code = 'development'), 'BBL_INTERACTIVE_TEAM_CUP', 'Команда в КР по интерактивному баскетболу', 'Участие команды в Кубке России по интерактивному баскетболу', 'number', (SELECT id FROM measurement_units WHERE code = 'teams'), 50.0, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (1485, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'BBL_EVENT_HOSTING', 'Принятие тура/соревнований', 'Проведение официальных туров или соревнований в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 50.0, 10, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2000, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_ACCREDITATION', 'Есть аккредитация', 'Наличие аккредитации региональной федерации легкой атлетики', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.0005, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2001, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_PROGRAM', 'Есть программа развития', 'Наличие программы развития легкой атлетики в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.005, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2002, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_BRANCHES', 'Количество отделений региональной федерации', 'Количество отделений легкой атлетики помимо основного регионального', 'number', (SELECT id FROM measurement_units WHERE code = 'organizations'), 0.005, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2003, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_MEMBERS', 'Количество членов федерации', 'Общее количество членов региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.008, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2004, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_ANTIDOPING', 'Наличие антидопинговой работы федерации', 'Ведение антидопинговой работы в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.008, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2005, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'ATH_FED_BUDGET', 'Объем бюджета федерации', 'Общий объем бюджета региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'rubles'), 0.01, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2006, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'ATH_FED_DEFICIT_DETAIL', 'Понимание детального дефицита бюджета', 'Детальное описание дефицита бюджета федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.01, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2007, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'ATH_FED_GRANT_FLA', 'Получение гранта ФЛА', 'Получение гранта от Всероссийской Федерации Легкой Атлетики', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.02, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2008, (SELECT id FROM indicator_categories WHERE code = 'finance'), 'ATH_FED_GRANTS_OTHER', 'Получение грантов помимо ФЛА', 'Получение грантов из других источников', 'number', (SELECT id FROM measurement_units WHERE code = 'grants'), 0.03, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2009, (SELECT id FROM indicator_categories WHERE code = 'federation'), 'ATH_FED_BOARD', 'Наличие попечительского совета', 'Наличие попечительского совета при федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.03, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2010, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'ATH_FED_WEBSITE', 'Федерация с активным официальным сайтом', 'Наличие активного сайта или страницы на сайте ФЛА', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2011, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'ATH_FED_BRAND', 'Федерация с фирменным стилем', 'Наличие фирменного стиля региональной федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2012, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'ATH_FED_VK', 'Федерация с активным сообществом ВКонтакте', 'Активное сообщество ВК (500+ человек, 2+ поста/месяц)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.05, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2013, (SELECT id FROM indicator_categories WHERE code = 'marketing'), 'ATH_FED_TELEGRAM', 'Федерация с активным Telegram-каналом', 'Активный Telegram-канал (2+ поста/месяц)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.1, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2014, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_BASE_SPORT', 'Базовый вид спорта', 'Легкая атлетика является базовым видом спорта в регионе', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.1, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2015, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_PARTICIPANTS', 'Количество занимающихся в регионе', 'Количество занимающихся легкой атлетикой по данным Минспорта', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.1, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2024, (SELECT id FROM indicator_categories WHERE code = 'infrastructure'), 'ATH_TRACKS_OUTDOOR', 'Открытые беговые дорожки', 'Открытые легкоатлетические дорожки', 'number', (SELECT id FROM measurement_units WHERE code = 'tracks'), 0.15, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2030, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U14', 'Сборная U14 (мужчины)', 'Члены мужской сборной России по легкой атлетике U14', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 60, 1, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2031, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U16', 'Сборная U16 (мужчины)', 'Члены мужской сборной России по легкой атлетике U16', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.2, 60, 1, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2032, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U18', 'Сборная U18 (мужчины)', 'Члены мужской сборной России по легкой атлетике U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.27, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2033, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U20', 'Сборная U20 (мужчины)', 'Члены мужской сборной России по легкой атлетике U20', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.33, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2034, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_U23', 'Сборная U23 (мужчины)', 'Члены мужской сборной России по легкой атлетике U23', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.35, 60, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2035, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_M_SENIOR', 'Национальная сборная (мужчины)', 'Члены мужской национальной сборной России по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 60, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2040, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U14', 'Сборная U14 (женщины)', 'Члены женской сборной России по легкой атлетике U14', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.4, 60, 2, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2041, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U16', 'Сборная U16 (женщины)', 'Члены женской сборной России по легкой атлетике U16', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 60, 2, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2042, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U18', 'Сборная U18 (женщины)', 'Члены женской сборной России по легкой атлетике U18', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2043, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U20', 'Сборная U20 (женщины)', 'Члены женской сборной России по легкой атлетике U20', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2044, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_U23', 'Сборная U23 (женщины)', 'Члены женской сборной России по легкой атлетике U23', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 60, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2045, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_NATIONAL_TEAM_W_SENIOR', 'Национальная сборная (женщины)', 'Члены женской национальной сборной России по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.5, 60, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2060, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_CHAMPIONSHIP_RUSSIA', 'Медали на Чемпионате России', 'Количество медалей на ЧР по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 1.50, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2061, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_CUP_RUSSIA', 'Медали на Кубке России', 'Количество медалей на Кубке России по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 1.20, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2062, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_EUROPE', 'Медали на чемпионатах Европы', 'Количество медалей на чемпионатах Европы', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.00, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2063, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_WORLD', 'Медали на чемпионатах мира', 'Количество медалей на чемпионатах мира', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.00, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2064, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDALS_OLYMPICS', 'Медали на Олимпийских играх', 'Количество медалей на Олимпийских играх', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.00, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2071, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_RECORDS_EUROPE', 'Рекорды Европы', 'Количество действующих рекордов Европы', 'number', (SELECT id FROM measurement_units WHERE code = 'records'), 8.00, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2072, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_RECORDS_WORLD', 'Рекорды мира', 'Количество действующих мировых рекордов', 'number', (SELECT id FROM measurement_units WHERE code = 'records'), 15.00, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2100, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_3_CATEGORY', 'Судьи 3 категории', 'Судьи 3 категории по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.05, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2101, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_2_CATEGORY', 'Судьи 2 категории', 'Судьи 2 категории по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.06, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2102, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_1_CATEGORY', 'Судьи 1 категории', 'Судьи 1 категории по легкой атлетике', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.07, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2103, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_NATIONAL', 'Судьи всероссийской категории', 'Судьи всероссийской категории', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.08, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2104, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_REFEREE_INTERNATIONAL', 'Судьи международной категории', 'Судьи международной категории', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.15, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2110, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_COACH_QUALIFIED', 'Тренеры с квалификацией', 'Тренеры с квалификационной категорией', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.10, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2111, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_COACH_HONORED', 'Заслуженные тренеры', 'Заслуженные тренеры России', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.20, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2112, (SELECT id FROM indicator_categories WHERE code = 'personnel'), 'ATH_COACH_NATIONAL_TEAM', 'Тренеры сборных команд', 'Тренеры сборных команд России', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.30, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2130, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_MASS_EVENTS', 'Массовые легкоатлетические мероприятия', 'Количество массовых легкоатлетических мероприятий в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 0.50, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2131, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_MASS_PARTICIPANTS', 'Участники массовых мероприятий', 'Количество участников массовых мероприятий', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.01, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2132, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_PARKRUN', 'Паркраны', 'Количество регулярных паркранов в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 1.00, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2133, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_MARATHON', 'Марафоны', 'Количество марафонов в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 2.00, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2134, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_HALF_MARATHON', 'Полумарафоны', 'Количество полумарафонов в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 1.50, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2160, (SELECT id FROM indicator_categories WHERE code = 'development'), 'ATH_PARA_ATHLETES', 'Спортсмены-паралимпийцы', 'Количество спортсменов-паралимпийцев', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 2.00, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2161, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PARA_MEDALS', 'Медали паралимпийцев', 'Количество медалей паралимпийцев', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.00, 60, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, use_population) VALUES (2162, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_EVENT_HOSTING', 'Принятие соревнований', 'Проведение официальных соревнований в регионе', 'number', (SELECT id FROM measurement_units WHERE code = 'events'), 3.00, 60, FALSE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2200, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U14_M', 'Участие в ПР U14 (М)', 'Спортсмены региона в Первенстве России U14 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.0, 60, 1, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2201, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U16_M', 'Участие в ПР U16 (М)', 'Спортсмены региона в Первенстве России U16 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.2, 60, 1, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2202, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U18_M', 'Участие в ПР U18 (М)', 'Спортсмены региона в Первенстве России U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.5, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2203, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U20_M', 'Участие в ПР U20 (М)', 'Спортсмены региона в Первенстве России U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.8, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2204, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U23_M', 'Участие в ПР U23 (М)', 'Спортсмены региона в Первенстве России U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 2.0, 60, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2210, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U14_W', 'Участие в ПР U14 (Ж)', 'Спортсмены региона в Первенстве России U14 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.0, 60, 2, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2211, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U16_W', 'Участие в ПР U16 (Ж)', 'Спортсмены региона в Первенстве России U16 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.2, 60, 2, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2212, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U18_W', 'Участие в ПР U18 (Ж)', 'Спортсмены региона в Первенстве России U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.5, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2213, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U20_W', 'Участие в ПР U20 (Ж)', 'Спортсмены региона в Первенстве России U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 1.8, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2214, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_PR_U23_W', 'Участие в ПР U23 (Ж)', 'Спортсмены региона в Первенстве России U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 2.0, 60, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2220, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U14_M', 'Бронза ПР U14 (М)', 'Бронзовые медали ПР U14 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.0, 60, 1, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2221, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U14_M', 'Серебро ПР U14 (М)', 'Серебряные медали ПР U14 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.5, 60, 1, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2222, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U14_M', 'Золото ПР U14 (М)', 'Золотые медали ПР U14 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 60, 1, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2223, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U16_M', 'Бронза ПР U16 (М)', 'Бронзовые медали ПР U16 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.5, 60, 1, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2224, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U16_M', 'Серебро ПР U16 (М)', 'Серебряные медали ПР U16 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 60, 1, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2225, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U16_M', 'Золото ПР U16 (М)', 'Золотые медали ПР U16 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 60, 1, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2226, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U18_M', 'Бронза ПР U18 (М)', 'Бронзовые медали ПР U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2227, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U18_M', 'Серебро ПР U18 (М)', 'Серебряные медали ПР U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2228, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U18_M', 'Золото ПР U18 (М)', 'Золотые медали ПР U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2229, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U20_M', 'Бронза ПР U20 (М)', 'Бронзовые медали ПР U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2230, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U20_M', 'Серебро ПР U20 (М)', 'Серебряные медали ПР U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2231, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U20_M', 'Золото ПР U20 (М)', 'Золотые медали ПР U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.5, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2232, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U23_M', 'Бронза ПР U23 (М)', 'Бронзовые медали ПР U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 60, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2233, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U23_M', 'Серебро ПР U23 (М)', 'Серебряные медали ПР U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.5, 60, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2234, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U23_M', 'Золото ПР U23 (М)', 'Золотые медали ПР U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 60, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2240, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U14_W', 'Бронза ПР U14 (Ж)', 'Бронзовые медали ПР U14 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.0, 60, 2, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2241, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U14_W', 'Серебро ПР U14 (Ж)', 'Серебряные медали ПР U14 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.5, 60, 2, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2242, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U14_W', 'Золото ПР U14 (Ж)', 'Золотые медали ПР U14 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 60, 2, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2243, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U16_W', 'Бронза ПР U16 (Ж)', 'Бронзовые медали ПР U16 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 2.5, 60, 2, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2244, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U16_W', 'Серебро ПР U16 (Ж)', 'Серебряные медали ПР U16 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 60, 2, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2245, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U16_W', 'Золото ПР U16 (Ж)', 'Золотые медали ПР U16 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 60, 2, 3, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2246, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U18_W', 'Бронза ПР U18 (Ж)', 'Бронзовые медали ПР U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.0, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2247, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U18_W', 'Серебро ПР U18 (Ж)', 'Серебряные медали ПР U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2248, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U18_W', 'Золото ПР U18 (Ж)', 'Золотые медали ПР U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2249, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U20_W', 'Бронза ПР U20 (Ж)', 'Бронзовые медали ПР U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 3.5, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2250, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U20_W', 'Серебро ПР U20 (Ж)', 'Серебряные медали ПР U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2251, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U20_W', 'Золото ПР U20 (Ж)', 'Золотые медали ПР U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.5, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2252, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_PR_U23_W', 'Бронза ПР U23 (Ж)', 'Бронзовые медали ПР U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 60, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2253, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_PR_U23_W', 'Серебро ПР U23 (Ж)', 'Серебряные медали ПР U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.5, 60, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2254, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_PR_U23_W', 'Золото ПР U23 (Ж)', 'Золотые медали ПР U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 60, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2270, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_CR_M', 'Бронза ЧР (М)', 'Бронзовые медали Чемпионата России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2271, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_CR_M', 'Серебро ЧР (М)', 'Серебряные медали Чемпионата России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 6.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2272, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_CR_M', 'Золото ЧР (М)', 'Золотые медали Чемпионата России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 7.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2273, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_CR_W', 'Бронза ЧР (Ж)', 'Бронзовые медали Чемпионата России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2274, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_CR_W', 'Серебро ЧР (Ж)', 'Серебряные медали Чемпионата России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 6.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2275, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_CR_W', 'Золото ЧР (Ж)', 'Золотые медали Чемпионата России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 7.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2276, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_CUP_M', 'Бронза Кубка России (М)', 'Бронзовые медали Кубка России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2277, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_CUP_M', 'Серебро Кубка России (М)', 'Серебряные медали Кубка России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2278, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_CUP_M', 'Золото Кубка России (М)', 'Золотые медали Кубка России (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 6.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2279, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_CUP_W', 'Бронза Кубка России (Ж)', 'Бронзовые медали Кубка России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 4.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2280, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_CUP_W', 'Серебро Кубка России (Ж)', 'Серебряные медали Кубка России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 5.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2281, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_CUP_W', 'Золото Кубка России (Ж)', 'Золотые медали Кубка России (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 6.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2300, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U18_M', 'Бронза ЧЕ U18 (М)', 'Бронзовые медали ЧЕ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 8.0, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2301, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U18_M', 'Серебро ЧЕ U18 (М)', 'Серебряные медали ЧЕ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.0, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2302, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U18_M', 'Золото ЧЕ U18 (М)', 'Золотые медали ЧЕ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2303, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U20_M', 'Бронза ЧЕ U20 (М)', 'Бронзовые медали ЧЕ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.0, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2304, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U20_M', 'Серебро ЧЕ U20 (М)', 'Серебряные медали ЧЕ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2305, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U20_M', 'Золото ЧЕ U20 (М)', 'Золотые медали ЧЕ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2306, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U23_M', 'Бронза ЧЕ U23 (М)', 'Бронзовые медали ЧЕ U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 60, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2307, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U23_M', 'Серебро ЧЕ U23 (М)', 'Серебряные медали ЧЕ U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 60, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2308, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U23_M', 'Золото ЧЕ U23 (М)', 'Золотые медали ЧЕ U23 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 60, 1, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2309, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_SENIOR_M', 'Бронза ЧЕ (М)', 'Бронзовые медали ЧЕ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 60, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2310, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_SENIOR_M', 'Серебро ЧЕ (М)', 'Серебряные медали ЧЕ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 60, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2311, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_SENIOR_M', 'Золото ЧЕ (М)', 'Золотые медали ЧЕ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 60, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2312, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U18_W', 'Бронза ЧЕ U18 (Ж)', 'Бронзовые медали ЧЕ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 8.0, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2313, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U18_W', 'Серебро ЧЕ U18 (Ж)', 'Серебряные медали ЧЕ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.0, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2314, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U18_W', 'Золото ЧЕ U18 (Ж)', 'Золотые медали ЧЕ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2315, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U20_W', 'Бронза ЧЕ U20 (Ж)', 'Бронзовые медали ЧЕ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 10.0, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2316, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U20_W', 'Серебро ЧЕ U20 (Ж)', 'Серебряные медали ЧЕ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2317, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U20_W', 'Золото ЧЕ U20 (Ж)', 'Золотые медали ЧЕ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2318, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_U23_W', 'Бронза ЧЕ U23 (Ж)', 'Бронзовые медали ЧЕ U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 12.0, 60, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2319, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_U23_W', 'Серебро ЧЕ U23 (Ж)', 'Серебряные медали ЧЕ U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 60, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2320, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_U23_W', 'Золото ЧЕ U23 (Ж)', 'Золотые медали ЧЕ U23 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 60, 2, 6, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2321, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_EUROPE_SENIOR_W', 'Бронза ЧЕ (Ж)', 'Бронзовые медали ЧЕ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 60, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2322, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_EUROPE_SENIOR_W', 'Серебро ЧЕ (Ж)', 'Серебряные медали ЧЕ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 60, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2323, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_EUROPE_SENIOR_W', 'Золото ЧЕ (Ж)', 'Золотые медали ЧЕ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 60, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2330, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_U18_M', 'Бронза ЧМ U18 (М)', 'Бронзовые медали ЧМ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2331, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_U18_M', 'Серебро ЧМ U18 (М)', 'Серебряные медали ЧМ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2332, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_U18_M', 'Золото ЧМ U18 (М)', 'Золотые медали ЧМ U18 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 60, 1, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2333, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_U20_M', 'Бронза ЧМ U20 (М)', 'Бронзовые медали ЧМ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2334, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_U20_M', 'Серебро ЧМ U20 (М)', 'Серебряные медали ЧМ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2335, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_U20_M', 'Золото ЧМ U20 (М)', 'Золотые медали ЧМ U20 (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 25.0, 60, 1, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2336, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_SENIOR_M', 'Бронза ЧМ (М)', 'Бронзовые медали ЧМ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 25.0, 60, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2337, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_SENIOR_M', 'Серебро ЧМ (М)', 'Серебряные медали ЧМ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 30.0, 60, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2338, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_SENIOR_M', 'Золото ЧМ (М)', 'Золотые медали ЧМ взрослые (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 35.0, 60, 1, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2339, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_U18_W', 'Бронза ЧМ U18 (Ж)', 'Бронзовые медали ЧМ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 15.0, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2340, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_U18_W', 'Серебро ЧМ U18 (Ж)', 'Серебряные медали ЧМ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2341, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_U18_W', 'Золото ЧМ U18 (Ж)', 'Золотые медали ЧМ U18 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 60, 2, 4, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2342, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_U20_W', 'Бронза ЧМ U20 (Ж)', 'Бронзовые медали ЧМ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 18.0, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2343, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_U20_W', 'Серебро ЧМ U20 (Ж)', 'Серебряные медали ЧМ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 20.0, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2344, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_U20_W', 'Золото ЧМ U20 (Ж)', 'Золотые медали ЧМ U20 (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 25.0, 60, 2, 5, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2345, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_WORLD_SENIOR_W', 'Бронза ЧМ (Ж)', 'Бронзовые медали ЧМ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 25.0, 60, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2346, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_WORLD_SENIOR_W', 'Серебро ЧМ (Ж)', 'Серебряные медали ЧМ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 30.0, 60, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, age_group_id, use_population) VALUES (2347, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_WORLD_SENIOR_W', 'Золото ЧМ (Ж)', 'Золотые медали ЧМ взрослые (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 35.0, 60, 2, 8, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    age_group_id = EXCLUDED.age_group_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2350, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_OLYMPICS_M', 'Бронза ОИ (М)', 'Бронзовые медали Олимпийских игр (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 50.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2351, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_OLYMPICS_M', 'Серебро ОИ (М)', 'Серебряные медали Олимпийских игр (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 60.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2352, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_OLYMPICS_M', 'Золото ОИ (М)', 'Золотые медали Олимпийских игр (мужчины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 70.0, 60, 1, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2353, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_BRONZE_OLYMPICS_W', 'Бронза ОИ (Ж)', 'Бронзовые медали Олимпийских игр (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 50.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2354, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_SILVER_OLYMPICS_W', 'Серебро ОИ (Ж)', 'Серебряные медали Олимпийских игр (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 60.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO indicator_catalog (id, category_id, code, name_ru, description, value_type, measurement_unit_id, default_weight, sport_id, gender_id, use_population) VALUES (2355, (SELECT id FROM indicator_categories WHERE code = 'achievements'), 'ATH_MEDAL_GOLD_OLYMPICS_W', 'Золото ОИ (Ж)', 'Золотые медали Олимпийских игр (женщины)', 'number', (SELECT id FROM measurement_units WHERE code = 'medals'), 70.0, 60, 2, TRUE)
ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    value_type = EXCLUDED.value_type,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    sport_id = EXCLUDED.sport_id,
    gender_id = EXCLUDED.gender_id,
    use_population = EXCLUDED.use_population,
    updated_at = CURRENT_TIMESTAMP;

COMMIT;
-- Total indicators: 496