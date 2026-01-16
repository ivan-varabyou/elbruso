-- ================================
-- Блок 27: История изменений для динамических таблиц
-- ================================
-- Полная история изменений с возможностью отката
-- Оптимизировано для хранения в БД и кеширования в IndexedDB

-- ================================
-- 1. ИСТОРИЯ ИЗМЕНЕНИЙ ЯЧЕЕК
-- ================================

CREATE TABLE IF NOT EXISTS cell_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    
    -- Изменение
    action VARCHAR(20) NOT NULL,  -- 'insert', 'update', 'delete'
    
    -- Старое и новое значение
    old_value JSONB,
    new_value JSONB,
    
    -- Метаданные изменения
    change_type VARCHAR(50),  -- 'manual', 'formula', 'import', 'sync', 'api'
    change_reason TEXT,
    
    -- Кто и когда
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Для группировки изменений
    batch_id UUID,
    session_id VARCHAR(100),
    
    CONSTRAINT chk_ch_action CHECK (action IN ('insert', 'update', 'delete'))
);

CREATE INDEX idx_cell_history_version ON cell_history(version_id);
CREATE INDEX idx_cell_history_position ON cell_history(version_id, row_index, col_index);
CREATE INDEX idx_cell_history_changed_by ON cell_history(changed_by);
CREATE INDEX idx_cell_history_changed_at ON cell_history(changed_at DESC);
CREATE INDEX idx_cell_history_batch ON cell_history(batch_id);

COMMENT ON TABLE cell_history IS 'История изменений ячеек с возможностью отката';
COMMENT ON COLUMN cell_history.batch_id IS 'ID группы изменений (например, массовое обновление)';
COMMENT ON COLUMN cell_history.session_id IS 'ID сессии пользователя для группировки';

-- ================================
-- 2. ИСТОРИЯ ИЗМЕНЕНИЙ ФОРМУЛ
-- ================================

CREATE TABLE IF NOT EXISTS formula_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES formula_templates(id) ON DELETE SET NULL,
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    
    -- Диапазон
    start_row INTEGER NOT NULL,
    end_row INTEGER NOT NULL,
    start_col INTEGER NOT NULL,
    end_col INTEGER NOT NULL,
    
    -- Изменение
    action VARCHAR(20) NOT NULL,  -- 'create', 'update', 'delete'
    
    -- Старая и новая формула
    old_formula TEXT,
    new_formula TEXT,
    
    -- Влияние изменения
    affected_cells_count INTEGER,
    recalculation_time_ms INTEGER,
    
    -- Кто и когда
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Причина
    change_reason TEXT,
    
    CONSTRAINT chk_fh_action CHECK (action IN ('create', 'update', 'delete'))
);

CREATE INDEX idx_formula_history_template ON formula_history(template_id);
CREATE INDEX idx_formula_history_version ON formula_history(version_id);
CREATE INDEX idx_formula_history_changed_by ON formula_history(changed_by);
CREATE INDEX idx_formula_history_changed_at ON formula_history(changed_at DESC);

COMMENT ON TABLE formula_history IS 'История изменений формул для аудита и отката';
COMMENT ON COLUMN formula_history.affected_cells_count IS 'Количество ячеек, затронутых изменением';

-- ================================
-- 3. ИСТОРИЯ ИЗМЕНЕНИЙ СТРУКТУРЫ
-- ================================

CREATE TABLE IF NOT EXISTS structure_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    version_id UUID REFERENCES table_versions(id) ON DELETE SET NULL,
    
    -- Тип изменения
    change_type VARCHAR(50) NOT NULL,  -- 'add_column', 'remove_column', 'rename_column', 'reorder_columns', 'add_row', 'remove_row'
    
    -- Детали изменения
    change_details JSONB NOT NULL,
    -- {
    --   "column_index": 3,
    --   "old_name": "2023",
    --   "new_name": "2024",
    --   "column_type": "number"
    -- }
    
    -- Старая и новая структура (для отката)
    old_structure JSONB,
    new_structure JSONB,
    
    -- Кто и когда
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_sh_change_type CHECK (change_type IN (
        'add_column', 'remove_column', 'rename_column', 'reorder_columns', 
        'add_row', 'remove_row', 'resize_table'
    ))
);

CREATE INDEX idx_structure_history_table ON structure_history(table_id);
CREATE INDEX idx_structure_history_version ON structure_history(version_id);
CREATE INDEX idx_structure_history_changed_by ON structure_history(changed_by);
CREATE INDEX idx_structure_history_changed_at ON structure_history(changed_at DESC);

COMMENT ON TABLE structure_history IS 'История изменений структуры таблиц';

-- ================================
-- 4. ИСТОРИЯ ИЗМЕНЕНИЙ ПРАВ
-- ================================

CREATE TABLE IF NOT EXISTS permission_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Объект
    object_type VARCHAR(50) NOT NULL,  -- 'workspace', 'table', 'cell_range'
    object_id UUID NOT NULL,
    
    -- Изменение
    action VARCHAR(20) NOT NULL,  -- 'grant', 'revoke', 'modify'
    
    -- Субъект
    subject_type VARCHAR(50),  -- 'user', 'role', 'organization'
    subject_id VARCHAR(100),
    
    -- Старые и новые права
    old_permissions JSONB,
    new_permissions JSONB,
    
    -- Кто и когда
    changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_ph_object_type CHECK (object_type IN ('workspace', 'table', 'cell_range')),
    CONSTRAINT chk_ph_action CHECK (action IN ('grant', 'revoke', 'modify')),
    CONSTRAINT chk_ph_subject_type CHECK (subject_type IN ('user', 'role', 'organization'))
);

CREATE INDEX idx_permission_history_object ON permission_history(object_type, object_id);
CREATE INDEX idx_permission_history_subject ON permission_history(subject_type, subject_id);
CREATE INDEX idx_permission_history_changed_by ON permission_history(changed_by);
CREATE INDEX idx_permission_history_changed_at ON permission_history(changed_at DESC);

COMMENT ON TABLE permission_history IS 'История изменений прав доступа для аудита';

-- ================================
-- 5. СНИМКИ ТАБЛИЦ (SNAPSHOTS)
-- ================================

CREATE TABLE IF NOT EXISTS table_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES dynamic_tables(id) ON DELETE CASCADE,
    version_id UUID NOT NULL REFERENCES table_versions(id) ON DELETE CASCADE,
    
    snapshot_name VARCHAR(255),
    description TEXT,
    
    -- Данные снимка (сжатые)
    snapshot_data JSONB,
    -- {
    --   "cells": [...],
    --   "formulas": [...],
    --   "structure": {...}
    -- }
    
    -- Метаданные
    cell_count INTEGER,
    compressed_size_bytes INTEGER,
    
    -- Тип снимка
    snapshot_type VARCHAR(50) DEFAULT 'manual',  -- 'manual', 'auto', 'before_major_change'
    
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Срок хранения
    expires_at TIMESTAMP
);

CREATE INDEX idx_table_snapshots_table ON table_snapshots(table_id);
CREATE INDEX idx_table_snapshots_version ON table_snapshots(version_id);
CREATE INDEX idx_table_snapshots_created_at ON table_snapshots(created_at DESC);
CREATE INDEX idx_table_snapshots_expires ON table_snapshots(expires_at) WHERE expires_at IS NOT NULL;

COMMENT ON TABLE table_snapshots IS 'Снимки состояния таблиц для быстрого отката';
COMMENT ON COLUMN table_snapshots.snapshot_type IS 'auto - автоматический (каждый день), manual - ручной, before_major_change - перед важным изменением';

-- ================================
-- 6. ФУНКЦИЯ: Откат изменений ячейки
-- ================================

CREATE OR REPLACE FUNCTION rollback_cell_change(
    p_history_id UUID
)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
    v_history RECORD;
    v_result JSONB;
BEGIN
    -- Получаем запись истории
    SELECT * INTO v_history
    FROM cell_history
    WHERE id = p_history_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'History record not found');
    END IF;
    
    -- Откатываем изменение
    IF v_history.action = 'insert' THEN
        -- Удаляем вставленную ячейку
        DELETE FROM table_cells
        WHERE version_id = v_history.version_id
          AND row_index = v_history.row_index
          AND col_index = v_history.col_index;
          
    ELSIF v_history.action = 'update' THEN
        -- Восстанавливаем старое значение
        UPDATE table_cells
        SET cell_data = v_history.old_value,
            updated_at = CURRENT_TIMESTAMP
        WHERE version_id = v_history.version_id
          AND row_index = v_history.row_index
          AND col_index = v_history.col_index;
          
    ELSIF v_history.action = 'delete' THEN
        -- Восстанавливаем удаленную ячейку
        INSERT INTO table_cells (version_id, row_index, col_index, cell_data)
        VALUES (v_history.version_id, v_history.row_index, v_history.col_index, v_history.old_value)
        ON CONFLICT (version_id, row_index, col_index) DO UPDATE
        SET cell_data = v_history.old_value;
    END IF;
    
    -- Инвалидируем кеш формул
    UPDATE formula_cache
    SET is_valid = FALSE
    WHERE version_id = v_history.version_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'action', v_history.action,
        'row', v_history.row_index,
        'col', v_history.col_index
    );
END;
$$;

COMMENT ON FUNCTION rollback_cell_change IS 'Откатывает одно изменение ячейки по ID из истории';

-- ================================
-- 7. ФУНКЦИЯ: Откат группы изменений
-- ================================

CREATE OR REPLACE FUNCTION rollback_batch_changes(
    p_batch_id UUID
)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
    v_count INTEGER;
    v_history RECORD;
BEGIN
    v_count := 0;
    
    -- Откатываем все изменения в обратном порядке
    FOR v_history IN 
        SELECT * FROM cell_history
        WHERE batch_id = p_batch_id
        ORDER BY changed_at DESC
    LOOP
        PERFORM rollback_cell_change(v_history.id);
        v_count := v_count + 1;
    END LOOP;
    
    RETURN jsonb_build_object(
        'success', true,
        'rolled_back_count', v_count
    );
END;
$$;

COMMENT ON FUNCTION rollback_batch_changes IS 'Откатывает группу изменений (например, массовое обновление)';

-- ================================
-- 8. ФУНКЦИЯ: Создание снимка таблицы
-- ================================

CREATE OR REPLACE FUNCTION create_table_snapshot(
    p_table_id UUID,
    p_snapshot_name VARCHAR DEFAULT NULL,
    p_snapshot_type VARCHAR DEFAULT 'manual',
    p_created_by UUID DEFAULT NULL
)
RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
    v_snapshot_id UUID;
    v_version_id UUID;
    v_snapshot_data JSONB;
    v_cell_count INTEGER;
BEGIN
    -- Получаем текущую версию
    SELECT id INTO v_version_id
    FROM table_versions
    WHERE table_id = p_table_id
    ORDER BY version_number DESC
    LIMIT 1;
    
    -- Собираем данные снимка
    SELECT jsonb_build_object(
        'cells', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'row', row_index,
                    'col', col_index,
                    'data', cell_data
                )
            )
            FROM table_cells
            WHERE version_id = v_version_id
        ),
        'formulas', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'start_row', start_row,
                    'end_row', end_row,
                    'start_col', start_col,
                    'end_col', end_col,
                    'formula', formula_template
                )
            )
            FROM formula_templates
            WHERE version_id = v_version_id
        ),
        'structure', (
            SELECT columns
            FROM table_versions
            WHERE id = v_version_id
        )
    ) INTO v_snapshot_data;
    
    -- Подсчитываем ячейки
    SELECT COUNT(*) INTO v_cell_count
    FROM table_cells
    WHERE version_id = v_version_id;
    
    -- Создаем снимок
    INSERT INTO table_snapshots (
        table_id,
        version_id,
        snapshot_name,
        snapshot_data,
        cell_count,
        compressed_size_bytes,
        snapshot_type,
        created_by
    ) VALUES (
        p_table_id,
        v_version_id,
        COALESCE(p_snapshot_name, 'Snapshot ' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYY-MM-DD HH24:MI:SS')),
        v_snapshot_data,
        v_cell_count,
        LENGTH(v_snapshot_data::text),
        p_snapshot_type,
        p_created_by
    ) RETURNING id INTO v_snapshot_id;
    
    RETURN v_snapshot_id;
END;
$$;

COMMENT ON FUNCTION create_table_snapshot IS 'Создает снимок текущего состояния таблицы';

-- ================================
-- 9. ФУНКЦИЯ: Восстановление из снимка
-- ================================

CREATE OR REPLACE FUNCTION restore_from_snapshot(
    p_snapshot_id UUID,
    p_restored_by UUID DEFAULT NULL
)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
    v_snapshot RECORD;
    v_new_version_id UUID;
    v_cell JSONB;
    v_formula JSONB;
BEGIN
    -- Получаем снимок
    SELECT * INTO v_snapshot
    FROM table_snapshots
    WHERE id = p_snapshot_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Snapshot not found');
    END IF;
    
    -- Создаем новую версию
    INSERT INTO table_versions (
        table_id,
        version_number,
        columns,
        change_description,
        created_by
    ) VALUES (
        v_snapshot.table_id,
        (SELECT COALESCE(MAX(version_number), 0) + 1 FROM table_versions WHERE table_id = v_snapshot.table_id),
        v_snapshot.snapshot_data->'structure',
        'Restored from snapshot: ' || v_snapshot.snapshot_name,
        p_restored_by
    ) RETURNING id INTO v_new_version_id;
    
    -- Восстанавливаем ячейки
    FOR v_cell IN SELECT * FROM jsonb_array_elements(v_snapshot.snapshot_data->'cells')
    LOOP
        INSERT INTO table_cells (version_id, row_index, col_index, cell_data, created_by)
        VALUES (
            v_new_version_id,
            (v_cell->>'row')::INTEGER,
            (v_cell->>'col')::INTEGER,
            v_cell->'data',
            p_restored_by
        );
    END LOOP;
    
    -- Восстанавливаем формулы
    FOR v_formula IN SELECT * FROM jsonb_array_elements(v_snapshot.snapshot_data->'formulas')
    LOOP
        INSERT INTO formula_templates (
            version_id,
            start_row,
            end_row,
            start_col,
            end_col,
            formula_template,
            created_by
        ) VALUES (
            v_new_version_id,
            (v_formula->>'start_row')::INTEGER,
            (v_formula->>'end_row')::INTEGER,
            (v_formula->>'start_col')::INTEGER,
            (v_formula->>'end_col')::INTEGER,
            v_formula->>'formula',
            p_restored_by
        );
    END LOOP;
    
    RETURN jsonb_build_object(
        'success', true,
        'new_version_id', v_new_version_id,
        'cells_restored', jsonb_array_length(v_snapshot.snapshot_data->'cells')
    );
END;
$$;

COMMENT ON FUNCTION restore_from_snapshot IS 'Восстанавливает таблицу из снимка (создает новую версию)';

-- ================================
-- 10. ПРЕДСТАВЛЕНИЯ ДЛЯ АУДИТА
-- ================================

-- История изменений пользователя
CREATE OR REPLACE VIEW v_user_activity AS
SELECT 
    u.email,
    u.name as user_name,
    'cell_change' as activity_type,
    ch.action,
    dt.name as table_name,
    ch.row_index,
    ch.col_index,
    ch.changed_at,
    ch.change_reason
FROM cell_history ch
JOIN users u ON u.id = ch.changed_by
JOIN table_versions tv ON tv.id = ch.version_id
JOIN dynamic_tables dt ON dt.id = tv.table_id

UNION ALL

SELECT 
    u.email,
    u.name,
    'formula_change',
    fh.action,
    dt.name,
    fh.start_row,
    fh.start_col,
    fh.changed_at,
    fh.change_reason
FROM formula_history fh
JOIN users u ON u.id = fh.changed_by
JOIN table_versions tv ON tv.id = fh.version_id
JOIN dynamic_tables dt ON dt.id = tv.table_id

ORDER BY changed_at DESC;

COMMENT ON VIEW v_user_activity IS 'Вся активность пользователей для аудита';

-- Последние изменения таблицы
CREATE OR REPLACE VIEW v_table_recent_changes AS
SELECT 
    dt.id as table_id,
    dt.name as table_name,
    'cell' as change_type,
    ch.action,
    ch.row_index,
    ch.col_index,
    u.name as changed_by_name,
    ch.changed_at
FROM dynamic_tables dt
JOIN table_versions tv ON tv.table_id = dt.id
JOIN cell_history ch ON ch.version_id = tv.id
JOIN users u ON u.id = ch.changed_by

UNION ALL

SELECT 
    dt.id,
    dt.name,
    'formula',
    fh.action,
    fh.start_row,
    fh.start_col,
    u.name,
    fh.changed_at
FROM dynamic_tables dt
JOIN table_versions tv ON tv.table_id = dt.id
JOIN formula_history fh ON fh.version_id = tv.id
JOIN users u ON u.id = fh.changed_by

ORDER BY changed_at DESC
LIMIT 100;

COMMENT ON VIEW v_table_recent_changes IS 'Последние 100 изменений по всем таблицам';

-- ================================
-- ТРИГГЕРЫ ДЛЯ АВТОМАТИЧЕСКОЙ ИСТОРИИ
-- ================================

-- Триггер для автоматического логирования изменений ячеек
CREATE OR REPLACE FUNCTION log_cell_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO cell_history (
            version_id, row_index, col_index, action,
            old_value, new_value, changed_by, change_type
        ) VALUES (
            NEW.version_id, NEW.row_index, NEW.col_index, 'insert',
            NULL, NEW.cell_data, NEW.created_by, 'manual'
        );
        
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO cell_history (
            version_id, row_index, col_index, action,
            old_value, new_value, changed_by, change_type
        ) VALUES (
            NEW.version_id, NEW.row_index, NEW.col_index, 'update',
            OLD.cell_data, NEW.cell_data, NEW.updated_by, 'manual'
        );
        
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO cell_history (
            version_id, row_index, col_index, action,
            old_value, new_value, changed_by, change_type
        ) VALUES (
            OLD.version_id, OLD.row_index, OLD.col_index, 'delete',
            OLD.cell_data, NULL, CURRENT_USER::UUID, 'manual'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_log_cell_change ON table_cells;
CREATE TRIGGER trg_log_cell_change
    AFTER INSERT OR UPDATE OR DELETE ON table_cells
    FOR EACH ROW
    EXECUTE FUNCTION log_cell_change();

COMMENT ON FUNCTION log_cell_change IS 'Автоматически логирует все изменения ячеек';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE cell_history IS 
'История всех изменений ячеек.
Позволяет:
- Откатывать изменения
- Аудит действий пользователей
- Анализ активности
- Восстановление данных

Оптимизация: старые записи можно архивировать или кешировать в IndexedDB';

COMMENT ON TABLE table_snapshots IS 
'Снимки состояния таблиц для быстрого отката.
Типы снимков:
- manual: создан пользователем
- auto: автоматический (например, раз в день)
- before_major_change: перед важным изменением

Рекомендуется хранить в БД только последние 10 снимков,
остальные можно архивировать';
