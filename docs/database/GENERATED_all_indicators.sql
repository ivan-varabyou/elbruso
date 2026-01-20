-- ================================
-- ПОЛНАЯ ЗАГРУЗКА ПОКАЗАТЕЛЕЙ
-- Автоматически сгенерировано из исходных SQL файлов
-- ================================

-- Универсальные показатели (Федерация, Маркетинг, Финансы)
INSERT INTO indicator_catalog (
    category_id, code, name_ru, description,
    value_type, measurement_unit_id, default_weight,
    sport_id, use_population
) VALUES
-- ФЕДЕРАЦИЯ
((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_ACCREDITATION', 'Наличие аккредитации', 'Федерация имеет действующую аккредитацию', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.0005, NULL, FALSE),
((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_DEVELOPMENT_PROGRAM', 'Наличие программы развития', 'Федерация имеет утвержденную программу развития вида спорта', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.005, NULL, FALSE),
((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_BRANCHES_COUNT', 'Количество отделений федерации', 'Количество территориальных отделений региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'branches'), 0.001, NULL, TRUE),
((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_MEMBERS_COUNT', 'Количество членов федерации', 'Количество членов региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'people'), 0.001, NULL, TRUE),
((SELECT id FROM indicator_categories WHERE code = 'federation'), 'FED_ANTIDOPING', 'Наличие антидопинговой работы', 'Федерация проводит антидопинговую работу', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.001, NULL, FALSE),

-- МАРКЕТИНГ
((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_WEBSITE', 'Наличие активного официального сайта', 'Федерация имеет работающий сайт или страницу на сайте национальной федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.04, NULL, FALSE),
((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_LOGO', 'Наличие собственного логотипа', 'Федерация имеет уникальный логотип', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.01, NULL, FALSE),
((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_BRAND_STYLE', 'Наличие фирменного стиля', 'Федерация имеет разработанный фирменный стиль', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.02, NULL, FALSE),
((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_VK_ACTIVE', 'Активное сообщество ВКонтакте', 'Федерация ведет активное сообщество ВК (минимум 1 пост в неделю)', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.05, NULL, FALSE),
((SELECT id FROM indicator_categories WHERE code = 'marketing'), 'MARKETING_TG_ACTIVE', 'Активный Telegram-канал', 'Федерация ведет активный Telegram-канал', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.05, NULL, FALSE),

-- ФИНАНСЫ
((SELECT id FROM indicator_categories WHERE code = 'finance'), 'FIN_BUDGET_VOLUME', 'Объем бюджета федерации', 'Общий объем бюджета региональной федерации', 'number', (SELECT id FROM measurement_units WHERE code = 'rubles'), 0.002, NULL, FALSE),
((SELECT id FROM indicator_categories WHERE code = 'finance'), 'FIN_GRANT_NATIONAL', 'Получение гранта национальной федерации', 'Федерация получила грант от национальной федерации', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.003, NULL, FALSE),
((SELECT id FROM indicator_categories WHERE code = 'finance'), 'FIN_GRANT_OTHER', 'Получение грантов помимо национальной федерации', 'Федерация получила гранты из других источников', 'boolean', (SELECT id FROM measurement_units WHERE code = 'yes_no'), 0.002, NULL, FALSE)

ON CONFLICT (code) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name_ru = EXCLUDED.name_ru,
    description = EXCLUDED.description,
    measurement_unit_id = EXCLUDED.measurement_unit_id,
    default_weight = EXCLUDED.default_weight,
    updated_at = CURRENT_TIMESTAMP;

-- Проверка результатов
SELECT 
    'Универсальные показатели' as type,
    COUNT(*) as loaded
FROM indicator_catalog
WHERE sport_id IS NULL;

-- Итоговая статистика
SELECT 
    ic.code as category,
    ic.name_ru as category_name,
    COUNT(ind.id) as count
FROM indicator_categories ic
LEFT JOIN indicator_catalog ind ON ic.id = ind.category_id
GROUP BY ic.id, ic.code, ic.name_ru
ORDER BY count DESC;
