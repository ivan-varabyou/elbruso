-- ================================
-- МАСТЕР-УСТАНОВКА: Динамические таблицы
-- ================================
-- Установка полного слоя динамических таблиц для BI-системы
-- Версия: 1.0
-- Дата: 2026-01-15

\echo '================================'
\echo 'Установка динамических таблиц'
\echo '================================'
\echo ''

-- Проверка существования необходимых таблиц
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'seasons') THEN
        RAISE EXCEPTION 'Таблица seasons не найдена. Сначала выполните 03_indicators_system.sql';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'organizations') THEN
        RAISE EXCEPTION 'Таблица organizations не найдена. Сначала выполните 02_core_entities.sql';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'indicator_catalog') THEN
        RAISE EXCEPTION 'Таблица indicator_catalog не найдена. Сначала выполните 03_indicators_system.sql';
    END IF;
    
    RAISE NOTICE 'Все необходимые таблицы найдены ✓';
END $$;

\echo ''
\echo 'Шаг 1/3: Создание основных таблиц...'
\i 25_dynamic_tables_core.sql
\echo '✓ Основные таблицы созданы'
\echo ''

\echo 'Шаг 2/3: Создание системы прав доступа...'
\i 26_dynamic_tables_permissions.sql
\echo '✓ Система прав создана'
\echo ''

\echo 'Шаг 3/3: Создание системы истории изменений...'
\i 27_dynamic_tables_history.sql
\echo '✓ История изменений настроена'
\echo ''

\echo '================================'
\echo 'Установка завершена успешно!'
\echo '================================'
\echo ''
\echo 'Созданные таблицы:'
\echo '  - workspaces (рабочие пространства)'
\echo '  - workspace_groups (группы таблиц)'
\echo '  - dynamic_tables (динамические таблицы)'
\echo '  - table_versions (версии таблиц)'
\echo '  - table_cells (ячейки)'
\echo '  - formula_templates (шаблоны формул)'
\echo '  - table_links (связи между таблицами)'
\echo '  - reference_links (связи с существующими таблицами)'
\echo '  - formula_cache (кеш формул)'
\echo ''
\echo 'Система прав:'
\echo '  - roles (роли)'
\echo '  - workspace_permissions (права на workspace)'
\echo '  - table_permissions (права на таблицы)'
\echo '  - cell_permissions (права на ячейки)'
\echo ''
\echo 'История изменений:'
\echo '  - cell_history (история ячеек)'
\echo '  - formula_history (история формул)'
\echo '  - structure_history (история структуры)'
\echo '  - permission_history (история прав)'
\echo '  - table_snapshots (снимки таблиц)'
\echo ''
\echo 'Следующие шаги:'
\echo '  1. Создайте пользователей в таблице users'
\echo '  2. Создайте workspace через INSERT INTO workspaces'
\echo '  3. Выдайте права через workspace_permissions'
\echo '  4. Создайте таблицы через dynamic_tables'
\echo ''
\echo 'Документация: см. DYNAMIC_TABLES_GUIDE.md'
\echo '================================'

-- Проверка установки
DO $$
DECLARE
    v_table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_table_count
    FROM information_schema.tables
    WHERE table_name IN (
        'workspaces', 'workspace_groups', 'dynamic_tables', 'table_versions',
        'table_cells', 'formula_templates', 'table_links', 'reference_links',
        'roles', 'workspace_permissions', 'table_permissions', 'cell_permissions',
        'cell_history', 'formula_history', 'structure_history', 'table_snapshots'
    );
    
    IF v_table_count < 16 THEN
        RAISE WARNING 'Установлено только % из 16 таблиц. Проверьте логи.', v_table_count;
    ELSE
        RAISE NOTICE 'Все 16 таблиц успешно установлены ✓';
    END IF;
END $$;
