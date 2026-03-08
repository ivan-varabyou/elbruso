-- 1. Превращаем одну из рабочих областей в Шаблон и меняем владельца на тестового юзера
UPDATE workspaces 
SET 
    is_template = true, 
    name = 'Шаблон Физкультура и Спорт',
    organization_id = 1, 
    sport_id = 120,
    owner_id = '4ef90c31-fcf7-47f0-8114-b6ac41ba97f6', -- test@elbruso.ru
    description = 'Системный шаблон для спортивных федераций'
WHERE id = '83acf2d1-9208-47b2-a354-9ff4c7be80ae';

-- Даем права тестовому пользователю на эту область
INSERT INTO workspace_permissions (workspace_id, user_id, permission_level)
VALUES ('83acf2d1-9208-47b2-a354-9ff4c7be80ae', '4ef90c31-fcf7-47f0-8114-b6ac41ba97f6', 'owner')
ON CONFLICT DO NOTHING;

-- 2. Создаем группу в этом шаблоне (убираем updated_at)
INSERT INTO workspace_groups (id, workspace_id, name, created_at)
VALUES (
    'a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab', 
    '83acf2d1-9208-47b2-a354-9ff4c7be80ae', 
    'Основные отчеты', 
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- 3. Привязываем существующие таблицы к этому шаблону и группе
UPDATE spreadsheets 
SET 
    workspace_id = '83acf2d1-9208-47b2-a354-9ff4c7be80ae',
    group_id = 'a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab',
    is_template = true,
    type = 'table'
WHERE workspace_id IS NULL OR workspace_id = '';

-- 4. Создаем демонстрационные Справочник и Показатель
INSERT INTO spreadsheets (id, name, description, workspace_id, group_id, type, is_template, status, created_at, updated_at)
VALUES 
(
    gen_random_uuid(), 
    'Список судей (Справочник)', 
    'Единый реестр судей федерации', 
    '83acf2d1-9208-47b2-a354-9ff4c7be80ae', 
    'a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab', 
    'reference', 
    true, 
    'published', 
    NOW(), 
    NOW()
),
(
    gen_random_uuid(), 
    'Количество спортсменов (Показатель)', 
    'Динамика численности спортсменов', 
    '83acf2d1-9208-47b2-a354-9ff4c7be80ae', 
    NULL, 
    'indicator', 
    true, 
    'published', 
    NOW(), 
    NOW()
) ON CONFLICT DO NOTHING;

-- 5. Также сделаем и другие рабочие области доступными для теста, чтобы навигатор не был пустым
INSERT INTO workspace_permissions (workspace_id, user_id, permission_level)
SELECT id, '4ef90c31-fcf7-47f0-8114-b6ac41ba97f6', 'owner'
FROM workspaces
WHERE id != '83acf2d1-9208-47b2-a354-9ff4c7be80ae'
ON CONFLICT DO NOTHING;
