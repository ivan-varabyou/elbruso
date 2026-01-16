

# Руководство по динамическим таблицам

## Оглавление

1. [Установка](#установка)
2. [Быстрый старт](#быстрый-старт)
3. [Система прав доступа](#система-прав-доступа)
4. [История изменений](#история-изменений)
5. [Примеры использования](#примеры-использования)
6. [Лучшие практики](#лучшие-практики)

---

## Установка

### Предварительные требования

Перед установкой динамических таблиц должны быть выполнены:
- `01_reference_tables.sql` - Справочники
- `02_core_entities.sql` - Основные сущности
- `03_indicators_system.sql` - Система индикаторов

### Установка

```bash
psql -d your_database -f 00_install_dynamic_tables.sql
```

Или по отдельности:
```bash
psql -d your_database -f 25_dynamic_tables_core.sql
psql -d your_database -f 26_dynamic_tables_permissions.sql
psql -d your_database -f 27_dynamic_tables_history.sql
```

---

## Быстрый старт

### 1. Создание workspace

```sql
-- Создаем workspace для рейтинга регионов РФБ 2025
INSERT INTO workspaces (id, name, season_id, organization_id, sport_id, owner_id)
VALUES (
    gen_random_uuid(),
    'Рейтинг регионов РФБ 2025',
    (SELECT id FROM seasons WHERE code = '2025'),
    (SELECT id FROM organizations WHERE internal_code = 'RFB'),
    10,  -- Баскетбол
    'user-uuid'
) RETURNING id;
```

### 2. Создание группы таблиц

```sql
-- Создаем группу "Справочники"
INSERT INTO workspace_groups (workspace_id, name, color, sort_order)
VALUES (
    'workspace-uuid',
    'Справочники',
    '#3B82F6',
    10
);
```

### 3. Создание таблицы

```sql
-- Создаем таблицу "Население регионов"
INSERT INTO dynamic_tables (id, workspace_id, group_id, name, row_count, column_count, created_by)
VALUES (
    gen_random_uuid(),
    'workspace-uuid',
    'group-uuid',
    'Население регионов',
    85,  -- 85 регионов
    6,   -- 6 колонок
    'user-uuid'
) RETURNING id;
```

### 4. Создание версии

```sql
-- Создаем версию таблицы
INSERT INTO table_versions (table_id, version_number, columns, created_by)
VALUES (
    'table-uuid',
    1,
    '[
      {"index": 0, "name": "Регион", "type": "reference", "width": 250},
      {"index": 1, "name": "2020", "type": "number", "width": 100},
      {"index": 2, "name": "2021", "type": "number", "width": 100},
      {"index": 3, "name": "2022", "type": "number", "width": 100},
      {"index": 4, "name": "2023", "type": "number", "width": 100},
      {"index": 5, "name": "2024", "type": "number", "width": 100}
    ]'::jsonb,
    'user-uuid'
) RETURNING id;
```

### 5. Заполнение данных

```sql
-- Создаем reference_link на regions
INSERT INTO reference_links (dynamic_table_id, column_index, reference_type, reference_table, mapping_config)
VALUES (
    'table-uuid',
    0,
    'region',
    'regions',
    '{"display_field": "name_ru", "value_field": "id", "filter": {"federal_district_id": 7}}'::jsonb
);

-- Заполняем ячейки из region_population
INSERT INTO table_cells (version_id, row_index, col_index, cell_data, created_by)
SELECT 
  'version-uuid',
  ROW_NUMBER() OVER (ORDER BY r.id) - 1,
  CASE 
    WHEN col_num = 0 THEN jsonb_build_object(
      'value', r.id,
      'type', 'reference',
      'display_value', r.name_ru
    )
    ELSE jsonb_build_object(
      'value', rp.population,
      'type', 'number'
    )
  END,
  'user-uuid'
FROM regions r
LEFT JOIN region_population rp ON rp.region_id = r.id AND rp.year = 2019 + col_num
CROSS JOIN generate_series(0, 5) AS col_num
WHERE r.federal_district_id = 7;
```

---

## Система прав доступа

### Уровни прав

1. **Workspace-level** - права на весь workspace
2. **Table-level** - права на конкретную таблицу
3. **Cell-level** - права на диапазон ячеек

### Роли

- `system_admin` - Полный доступ ко всему
- `workspace_owner` - Владелец workspace
- `editor` - Редактор
- `viewer` - Наблюдатель

### Примеры

#### Выдать права организации на workspace

```sql
-- РФБ (головная) получает права owner
INSERT INTO workspace_permissions (
    workspace_id,
    organization_id,
    permission_level,
    can_share,
    can_create_tables,
    granted_by
) VALUES (
    'workspace-uuid',
    (SELECT id FROM organizations WHERE internal_code = 'RFB'),
    'owner',
    TRUE,
    TRUE,
    'admin-uuid'
);
```

#### Выдать права всем региональным федерациям

```sql
-- Все региональные федерации получают права editor
INSERT INTO workspace_permissions (
    workspace_id,
    organization_id,
    permission_level,
    can_create_tables,
    granted_by
)
SELECT 
    'workspace-uuid',
    o.id,
    'editor',
    FALSE,
    'rfb-admin-uuid'
FROM organizations o
WHERE o.parent_id = (SELECT id FROM organizations WHERE internal_code = 'RFB')
  AND o.type_id = (SELECT id FROM organization_types WHERE code = 'federation_regional');
```

#### Выдать права на ячейки только своего региона

```sql
-- Иркутская область может редактировать только свою строку
INSERT INTO cell_permissions (
    table_id,
    start_row,
    end_row,
    start_col,
    end_col,
    organization_id,
    can_read,
    can_write,
    access_condition,
    granted_by
) VALUES (
    'table-uuid',
    38,  -- Строка Иркутской области
    38,
    0,
    10,
    (SELECT id FROM organizations WHERE internal_code = 'RFB_IRK'),
    TRUE,
    TRUE,
    '{"type": "region_match", "field": "region_id", "match": "user.organization.region_id"}'::jsonb,
    'rfb-admin-uuid'
);
```

#### Проверка прав

```sql
-- Проверить права пользователя на workspace
SELECT check_workspace_permission(
    'workspace-uuid',
    'user-uuid',
    'editor'
);

-- Проверить права на ячейку
SELECT check_cell_permission(
    'table-uuid',
    38,  -- row
    2,   -- col
    'user-uuid',
    'write'
);
```

---

## История изменений

### Автоматическое логирование

Все изменения ячеек автоматически логируются в `cell_history`:

```sql
-- Посмотреть историю изменений ячейки
SELECT 
    action,
    old_value,
    new_value,
    u.name as changed_by,
    changed_at
FROM cell_history ch
JOIN users u ON u.id = ch.changed_by
WHERE version_id = 'version-uuid'
  AND row_index = 38
  AND col_index = 2
ORDER BY changed_at DESC;
```

### Откат изменений

```sql
-- Откатить одно изменение
SELECT rollback_cell_change('history-record-uuid');

-- Откатить группу изменений
SELECT rollback_batch_changes('batch-uuid');
```

### Снимки таблиц

```sql
-- Создать снимок
SELECT create_table_snapshot(
    'table-uuid',
    'Перед массовым обновлением',
    'before_major_change',
    'user-uuid'
);

-- Восстановить из снимка
SELECT restore_from_snapshot(
    'snapshot-uuid',
    'user-uuid'
);

-- Посмотреть все снимки
SELECT 
    snapshot_name,
    cell_count,
    created_at,
    u.name as created_by
FROM table_snapshots ts
JOIN users u ON u.id = ts.created_by
WHERE table_id = 'table-uuid'
ORDER BY created_at DESC;
```

### Аудит активности

```sql
-- Вся активность пользователя
SELECT * FROM v_user_activity
WHERE user_name = 'Иван Иванов'
ORDER BY changed_at DESC
LIMIT 50;

-- Последние изменения таблицы
SELECT * FROM v_table_recent_changes
WHERE table_id = 'table-uuid'
LIMIT 20;
```

---

## Примеры использования

### Пример 1: Таблица критериев из indicator_catalog

```sql
-- 1. Создаем таблицу
INSERT INTO dynamic_tables (id, workspace_id, name, created_by)
VALUES (gen_random_uuid(), 'workspace-uuid', 'Критерии баскетбол', 'user-uuid')
RETURNING id;

-- 2. Создаем версию
INSERT INTO table_versions (table_id, version_number, columns, created_by)
VALUES (
    'table-uuid',
    1,
    '[
      {"index": 0, "name": "Категория", "type": "reference"},
      {"index": 1, "name": "Код", "type": "text"},
      {"index": 2, "name": "Название", "type": "text"},
      {"index": 3, "name": "Вес", "type": "number"}
    ]'::jsonb,
    'user-uuid'
) RETURNING id;

-- 3. Создаем reference_link
INSERT INTO reference_links (dynamic_table_id, column_index, reference_type, reference_table)
VALUES ('table-uuid', 0, 'indicator_category', 'indicator_categories');

-- 4. Заполняем из indicator_catalog
INSERT INTO table_cells (version_id, row_index, col_index, cell_data, created_by)
SELECT 
  'version-uuid',
  ROW_NUMBER() OVER (ORDER BY ic.id) - 1,
  col_num,
  CASE col_num
    WHEN 0 THEN jsonb_build_object(
      'value', ic.category_id,
      'type', 'reference',
      'display_value', cat.name_ru
    )
    WHEN 1 THEN jsonb_build_object('value', ic.code, 'type', 'text')
    WHEN 2 THEN jsonb_build_object('value', ic.name_ru, 'type', 'text')
    WHEN 3 THEN jsonb_build_object('value', ic.default_weight, 'type', 'number')
  END,
  'user-uuid'
FROM indicator_catalog ic
JOIN indicator_categories cat ON ic.category_id = cat.id
CROSS JOIN generate_series(0, 3) AS col_num
WHERE ic.sport_id = 10 AND ic.is_active = TRUE;
```

### Пример 2: Таблица с формулами

```sql
-- Создаем таблицу "Коэффициенты"
-- Формула: ='Население регионов'!C{row}

INSERT INTO formula_templates (
    version_id,
    start_row,
    end_row,
    start_col,
    end_col,
    formula_template,
    created_by
) VALUES (
    'version-uuid',
    0,
    84,  -- Все строки
    1,
    5,   -- Колонки 1-5
    '=''Население регионов''!C{row}',
    'user-uuid'
);

-- Создаем table_link
INSERT INTO table_links (
    source_table_id,
    target_table_id,
    link_type,
    link_metadata
) VALUES (
    'coefficients-table-uuid',
    'population-table-uuid',
    'cell_reference',
    '{"formula_pattern": "=''Население регионов''!C{row}"}'::jsonb
);
```

---

## Лучшие практики

### 1. Права доступа

- **Используйте иерархию организаций** - выдавайте права головной организации, они автоматически распространятся на дочерние
- **Гранулярность** - используйте cell_permissions только когда действительно нужен доступ к конкретным ячейкам
- **Аудит** - регулярно проверяйте `permission_history` для отслеживания изменений прав

### 2. История изменений

- **Снимки** - создавайте снимки перед важными изменениями
- **Batch ID** - группируйте связанные изменения одним batch_id для массового отката
- **Архивация** - старые записи истории можно архивировать или кешировать в IndexedDB

### 3. Производительность

- **Sparse storage** - используется автоматически, хранятся только заполненные ячейки
- **Formula templates** - вместо 1000 формул создайте 1 шаблон
- **Formula cache** - кеш автоматически инвалидируется при изменении зависимостей
- **Индексы** - все необходимые индексы уже созданы

### 4. Версионирование

- **Замораживание версий** - используйте `is_frozen` для важных версий
- **Описание изменений** - всегда заполняйте `change_description` при создании версии
- **Откат** - используйте снимки для быстрого отката, а не ручное восстановление

### 5. Reference links

- **Auto-sync** - включайте `auto_sync = TRUE` для автоматического обновления display_value
- **Фильтрация** - используйте `mapping_config.filter` для ограничения данных
- **Дополнительные поля** - сохраняйте в `reference_data` все нужные поля для offline-работы

---

## Связанные файлы

- [SYSTEM_CONCEPT.md](file:///home/ivan/.gemini/antigravity/brain/37b23099-f8ee-479e-ba33-69c551108c0c/SYSTEM_CONCEPT.md) - Общая концепция системы
- [implementation_plan.md](file:///home/ivan/.gemini/antigravity/brain/37b23099-f8ee-479e-ba33-69c551108c0c/implementation_plan.md) - План реализации
- [existing_system_analysis.md](file:///home/ivan/.gemini/antigravity/brain/37b23099-f8ee-479e-ba33-69c551108c0c/existing_system_analysis.md) - Анализ существующей системы

---

**Версия:** 1.0  
**Дата:** 2026-01-15  
**Статус:** Готово к использованию
