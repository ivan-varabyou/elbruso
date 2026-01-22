-- ================================
-- Блок 25: Динамические таблицы - Workspace и таблицы
-- ================================
-- Создание слоя динамических таблиц для гибкого BI
-- Интеграция с существующей системой через reference_links

-- ================================
-- 1. ПОЛЬЗОВАТЕЛИ (если еще нет)
-- ================================

-- Проверяем существование таблицы users
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX idx_users_organization ON users(organization_id);
        CREATE INDEX idx_users_email ON users(email);
        CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = TRUE;
        
        COMMENT ON TABLE users IS 'Пользователи системы с привязкой к организациям';
    END IF;
END $$;

-- ================================
-- 2. WORKSPACE (Рабочие пространства)
-- ================================

CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Контекст workspace
    season_id INTEGER REFERENCES seasons(id) ON DELETE SET NULL,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
    sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
    
    -- Владелец
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Метаданные
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Статус
    is_active BOOLEAN DEFAULT TRUE,
    is_template BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workspaces_season ON workspaces(season_id);
CREATE INDEX idx_workspaces_organization ON workspaces(organization_id);
CREATE INDEX idx_workspaces_sport ON workspaces(sport_id);
CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);
CREATE INDEX idx_workspaces_active ON workspaces(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE workspaces IS 'Рабочие пространства для организации динамических таблиц';
COMMENT ON COLUMN workspaces.is_template IS 'Шаблон workspace для копирования';

-- ================================
-- 3. ГРУППЫ ТАБЛИЦ В WORKSPACE
-- ================================

CREATE TABLE IF NOT EXISTS workspace_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Визуальное оформление
    color VARCHAR(20),
    icon VARCHAR(50),
    
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workspace_groups_workspace ON workspace_groups(workspace_id);
CREATE INDEX idx_workspace_groups_sort ON workspace_groups(workspace_id, sort_order);

COMMENT ON TABLE workspace_groups IS 'Группы таблиц внутри workspace для организации';

-- ================================
-- 4. ДИНАМИЧЕСКИЕ ТАБЛИЦЫ
-- ================================

CREATE TABLE IF NOT EXISTS dynamic_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    group_id UUID REFERENCES workspace_groups(id) ON DELETE SET NULL,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Размеры
    row_count INTEGER DEFAULT 0,
    column_count INTEGER DEFAULT 0,
    
    -- Тип таблицы
    is_reference BOOLEAN DEFAULT FALSE,
    reference_type VARCHAR(50),  -- 'user_defined', 'system_linked', 'calculated'
    
    -- Метаданные
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Владелец
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dynamic_tables_workspace ON dynamic_tables(workspace_id);
CREATE INDEX idx_dynamic_tables_group ON dynamic_tables(group_id);
CREATE INDEX idx_dynamic_tables_created_by ON dynamic_tables(created_by);

COMMENT ON TABLE dynamic_tables IS 'Динамические таблицы пользователей';
COMMENT ON COLUMN dynamic_tables.is_reference IS 'Таблица-справочник (только для чтения из других таблиц)';

-- ================================
-- 5. ВЕРСИИ ТАБЛИЦ
-- ================================

CREATE TABLE IF NOT EXISTS table_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    
    -- Структура колонок
    columns JSONB NOT NULL,
    -- [
    --   {
    --     "index": 0,
    --     "name": "Регион",
    --     "type": "reference",
    --     "reference_table": "regions",
    --     "width": 200,
    --     "is_locked": false
    --   },
    --   {
    --     "index": 1,
    --     "name": "2024",
    --     "type": "number",
    --     "metadata": {"year": 2024}
    --   }
    -- ]
    
    -- Метаданные версии
    change_description TEXT,
    is_frozen BOOLEAN DEFAULT FALSE,
    frozen_at TIMESTAMP,
    
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(table_id, version_number)
);

CREATE INDEX idx_table_versions_table ON table_versions(table_id);
CREATE INDEX idx_table_versions_created_by ON table_versions(created_by);

COMMENT ON TABLE table_versions IS 'Версии таблиц для истории изменений структуры';
COMMENT ON COLUMN table_versions.is_frozen IS 'Замороженная версия (нельзя изменять)';

-- ================================
-- 6. ЯЧЕЙКИ (SPARSE STORAGE)
-- ================================

CREATE TABLE IF NOT EXISTS table_cells (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    
    -- Данные ячейки (JSONB для гибкости)
    cell_data JSONB NOT NULL,
    -- {
    --   "value": 61,
    --   "type": "reference",
    --   "display_value": "Иркутская область",
    --   "reference_data": {"code": "RU-IRK", "federal_district_id": 7},
    --   "style": {"bold": true, "color": "#FF0000"}
    -- }
    
    -- Защита ячейки
    is_locked BOOLEAN DEFAULT FALSE,
    locked_by UUID REFERENCES users(id) ON DELETE SET NULL,
    lock_reason TEXT,
    locked_at TIMESTAMP,
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(version_id, row_index, col_index)
);

CREATE INDEX idx_table_cells_version ON table_cells(version_id);
CREATE INDEX idx_table_cells_position ON table_cells(version_id, row_index, col_index);
CREATE INDEX idx_table_cells_locked ON table_cells(is_locked) WHERE is_locked = TRUE;
CREATE INDEX idx_table_cells_data_type ON table_cells((cell_data->>'type'));

COMMENT ON TABLE table_cells IS 'Ячейки таблиц (sparse storage - только заполненные)';
COMMENT ON COLUMN table_cells.cell_data IS 'JSONB с данными, типом, стилем и метаданными';

-- ================================
-- 7. ШАБЛОНЫ ФОРМУЛ
-- ================================

CREATE TABLE IF NOT EXISTS formula_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    
    -- Диапазон применения
    start_row INTEGER NOT NULL,
    end_row INTEGER NOT NULL,
    start_col INTEGER NOT NULL,
    end_col INTEGER NOT NULL,
    
    -- Формула (с подстановкой {row}, {col})
    formula_template TEXT NOT NULL,
    -- Примеры:
    -- "='Население регионов'!C{row}"
    -- "=D{row}*'Коэффициенты'!C{row}"
    -- "=SUM(B{row}:E{row})"
    
    priority INTEGER DEFAULT 0,
    
    -- Защита формулы
    is_protected BOOLEAN DEFAULT FALSE,
    protection_level VARCHAR(20) DEFAULT 'warning',  -- 'locked', 'admin_only', 'warning'
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_ft_range CHECK (start_row <= end_row AND start_col <= end_col),
    CONSTRAINT chk_ft_protection_level CHECK (protection_level IN ('locked', 'admin_only', 'warning'))
);

CREATE INDEX idx_formula_templates_version ON formula_templates(version_id);
CREATE INDEX idx_formula_templates_range ON formula_templates(version_id, start_row, end_row, start_col, end_col);
CREATE INDEX idx_formula_templates_protected ON formula_templates(is_protected) WHERE is_protected = TRUE;

COMMENT ON TABLE formula_templates IS 'Шаблоны формул для диапазонов ячеек';
COMMENT ON COLUMN formula_templates.formula_template IS 'Формула с подстановкой {row} и {col}';
COMMENT ON COLUMN formula_templates.protection_level IS 'Уровень защиты: locked (нельзя менять), admin_only (только админ), warning (предупреждение)';

-- ================================
-- 8. СВЯЗИ МЕЖДУ ТАБЛИЦАМИ
-- ================================

CREATE TABLE IF NOT EXISTS table_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    source_table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    source_version_id UUID REFERENCES table_versions(id) ON DELETE SET NULL,
    target_table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    
    link_type VARCHAR(50) NOT NULL,  -- 'cell_reference', 'lookup_reference', 'aggregation', 'shared_keys'
    link_metadata JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "formula_pattern": "='Население регионов'!C{row}",
    --   "source_column": "C",
    --   "target_column": "B"
    -- }
    
    -- Заморозка связи
    is_frozen BOOLEAN DEFAULT FALSE,
    frozen_at_version INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tl_link_type CHECK (link_type IN ('cell_reference', 'lookup_reference', 'aggregation', 'shared_keys'))
);

CREATE INDEX idx_table_links_source ON table_links(source_table_id);
CREATE INDEX idx_table_links_target ON table_links(target_table_id);
CREATE INDEX idx_table_links_type ON table_links(link_type);

COMMENT ON TABLE table_links IS 'Связи между динамическими таблицами';
COMMENT ON COLUMN table_links.is_frozen IS 'Замороженная связь (использует конкретную версию)';

-- ================================
-- 9. СВЯЗИ С СУЩЕСТВУЮЩИМИ ТАБЛИЦАМИ
-- ================================

CREATE TABLE IF NOT EXISTS reference_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Динамическая таблица
    dynamic_table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    column_index INTEGER NOT NULL,
    
    -- Системный справочник
    reference_type VARCHAR(50) NOT NULL,  -- 'region', 'organization', 'sport', 'discipline', 'indicator'
    reference_table VARCHAR(100) NOT NULL,  -- 'regions', 'organizations', 'indicator_catalog'
    
    -- Маппинг полей
    mapping_config JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "display_field": "name_ru",
    --   "value_field": "id",
    --   "filter": {"federal_district_id": 7},
    --   "additional_fields": ["code", "federal_district_id"]
    -- }
    
    -- Синхронизация
    auto_sync BOOLEAN DEFAULT TRUE,
    last_synced_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_rl_reference_type CHECK (reference_type IN ('region', 'organization', 'sport', 'discipline', 'indicator', 'event', 'season'))
);

CREATE INDEX idx_reference_links_table ON reference_links(dynamic_table_id);
CREATE INDEX idx_reference_links_type ON reference_links(reference_type);
CREATE INDEX idx_reference_links_auto_sync ON reference_links(auto_sync) WHERE auto_sync = TRUE;

COMMENT ON TABLE reference_links IS 'Связи динамических таблиц с существующими системными справочниками';
COMMENT ON COLUMN reference_links.auto_sync IS 'Автоматическое обновление display_value при изменении справочника';

-- ================================
-- 10. КЕШ ФОРМУЛ
-- ================================

CREATE TABLE IF NOT EXISTS formula_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    
    -- Кешированное значение
    cached_value JSONB,
    
    -- Зависимости
    dependencies JSONB,
    -- [
    --   {"table_id": "...", "version_id": "...", "row": 0, "col": 2},
    --   {"table_id": "...", "version_id": "...", "row": 0, "col": 3}
    -- ]
    
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_valid BOOLEAN DEFAULT TRUE,
    
    UNIQUE(version_id, row_index, col_index)
);

CREATE INDEX idx_formula_cache_version ON formula_cache(version_id);
CREATE INDEX idx_formula_cache_validity ON formula_cache(is_valid) WHERE is_valid = FALSE;

COMMENT ON TABLE formula_cache IS 'Кеш вычисленных значений формул для производительности';
COMMENT ON COLUMN formula_cache.is_valid IS 'FALSE если зависимости изменились';

-- ================================
-- ТРИГГЕРЫ ДЛЯ UPDATED_AT
-- ================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_workspaces_updated_at ON workspaces;
CREATE TRIGGER trg_workspaces_updated_at
    BEFORE UPDATE ON workspaces
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_dynamic_tables_updated_at ON dynamic_tables;
CREATE TRIGGER trg_dynamic_tables_updated_at
    BEFORE UPDATE ON dynamic_tables
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_table_cells_updated_at ON table_cells;
CREATE TRIGGER trg_table_cells_updated_at
    BEFORE UPDATE ON table_cells
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE workspaces IS 
'Рабочие пространства для организации динамических таблиц.
Каждый workspace может быть привязан к сезону, организации и виду спорта.
Пример: "Рейтинг регионов РФБ 2025"';

COMMENT ON TABLE workspace_groups IS 
'Группы таблиц внутри workspace для логической организации.
Пример: "Справочники", "Критерии", "Рейтинги"';

COMMENT ON TABLE dynamic_tables IS 
'Динамические таблицы пользователей.
Могут быть справочными (is_reference=true) или расчетными.
Используют sparse storage - хранятся только заполненные ячейки';

COMMENT ON TABLE table_versions IS 
'Версии таблиц для истории изменений структуры.
Позволяет откатываться к предыдущим версиям';

COMMENT ON TABLE table_cells IS 
'Ячейки таблиц (sparse storage).
Хранятся только заполненные ячейки в JSONB формате.
Поддерживает блокировку на уровне ячейки';

COMMENT ON TABLE formula_templates IS 
'Шаблоны формул для диапазонов ячеек.
Вместо 1000 одинаковых формул - 1 шаблон с подстановкой {row} и {col}';

COMMENT ON TABLE table_links IS 
'Связи между динамическими таблицами.
Отслеживает зависимости для пересчета формул';

COMMENT ON TABLE reference_links IS 
'Связи с существующими системными справочниками.
Позволяет динамическим таблицам ссылаться на regions, indicator_catalog и т.д.';

COMMENT ON TABLE formula_cache IS 
'Кеш вычисленных значений формул.
Инвалидируется при изменении зависимостей';
