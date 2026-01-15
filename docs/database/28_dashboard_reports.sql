-- ================================
-- Блок 28: Dashboard & Reports - Страницы и блоки
-- ================================
-- Система отчетов и дашбордов в стиле Notion

-- ================================
-- 1. СТРАНИЦЫ
-- ================================

CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    
    -- Иерархия страниц (для вложенности)
    parent_page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    
    -- Основная информация
    title VARCHAR(500) NOT NULL,
    icon VARCHAR(50),  -- emoji или icon name
    cover_image TEXT,  -- URL обложки
    
    -- Тип страницы
    page_type VARCHAR(50) DEFAULT 'document',  -- 'document', 'dashboard', 'report', 'presentation'
    
    -- Публикация
    is_public BOOLEAN DEFAULT FALSE,
    public_url VARCHAR(255) UNIQUE,
    public_password VARCHAR(255),
    
    -- Настройки
    metadata JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "layout": "full-width" | "centered",
    --   "theme": "light" | "dark",
    --   "presentation_mode": true,
    --   "slide_transition": "fade" | "slide",
    --   "auto_play": false
    -- }
    
    -- Владелец
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Сортировка
    sort_order INTEGER DEFAULT 0,
    
    -- Статистика
    view_count INTEGER DEFAULT 0,
    last_viewed_at TIMESTAMP,
    
    CONSTRAINT chk_page_type CHECK (page_type IN ('document', 'dashboard', 'report', 'presentation'))
);

CREATE INDEX idx_pages_workspace ON pages(workspace_id);
CREATE INDEX idx_pages_parent ON pages(parent_page_id);
CREATE INDEX idx_pages_created_by ON pages(created_by);
CREATE INDEX idx_pages_public ON pages(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_pages_type ON pages(page_type);
CREATE INDEX idx_pages_sort ON pages(workspace_id, sort_order);

COMMENT ON TABLE pages IS 'Страницы с блоками контента (документы, дашборды, отчеты, презентации)';
COMMENT ON COLUMN pages.public_url IS 'Уникальный URL для публичного доступа';

-- ================================
-- 2. БЛОКИ КОНТЕНТА
-- ================================

CREATE TABLE IF NOT EXISTS blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    
    -- Иерархия блоков (для вложенности и колонок)
    parent_block_id UUID REFERENCES blocks(id) ON DELETE CASCADE,
    
    -- Тип блока
    block_type VARCHAR(50) NOT NULL,
    -- 'text', 'heading', 'chart', 'table', 'kpi', 'image', 'divider',
    -- 'code', 'quote', 'callout', 'toggle', 'columns', 'embed'
    
    -- Содержимое блока
    content JSONB NOT NULL,
    -- Для text: {"text": "...", "format": {"bold": true, "italic": false}}
    -- Для heading: {"text": "...", "level": 1}
    -- Для chart: {"chartId": "uuid"}
    -- Для table: {"tableId": "uuid", "columns": [...], "filters": {...}}
    -- Для kpi: {"metric": "total_score", "aggregation": "avg", "format": "number", "prefix": "", "suffix": ""}
    -- Для image: {"url": "...", "caption": "...", "width": 500}
    -- Для code: {"code": "...", "language": "sql"}
    -- Для embed: {"url": "...", "type": "youtube" | "figma" | "miro"}
    
    -- Настройки блока
    settings JSONB DEFAULT '{}'::jsonb,
    -- {
    --   "width": "full" | "half" | "third",
    --   "alignment": "left" | "center" | "right",
    --   "backgroundColor": "#fff",
    --   "padding": "normal" | "compact",
    --   "border": true
    -- }
    
    -- Позиция
    sort_order INTEGER DEFAULT 0,
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_block_type CHECK (block_type IN (
        'text', 'heading', 'chart', 'table', 'kpi', 'image', 'divider',
        'code', 'quote', 'callout', 'toggle', 'columns', 'embed', 'video'
    ))
);

CREATE INDEX idx_blocks_page ON blocks(page_id);
CREATE INDEX idx_blocks_parent ON blocks(parent_block_id);
CREATE INDEX idx_blocks_type ON blocks(block_type);
CREATE INDEX idx_blocks_sort ON blocks(page_id, sort_order);
CREATE INDEX idx_blocks_created_by ON blocks(created_by);

COMMENT ON TABLE blocks IS 'Блоки контента на страницах (Notion-style)';
COMMENT ON COLUMN blocks.parent_block_id IS 'Для вложенных блоков (например, блоки внутри колонок)';

-- ================================
-- 3. ГРАФИКИ
-- ================================

CREATE TABLE IF NOT EXISTS charts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    
    -- Название графика (для переиспользования)
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Источник данных
    data_source_type VARCHAR(50) NOT NULL,  -- 'table', 'query', 'api'
    data_source_id UUID,  -- ID таблицы или saved_query
    
    -- Тип графика
    chart_type VARCHAR(50) NOT NULL,
    -- 'bar', 'line', 'pie', 'area', 'scatter', 'radar', 'heatmap',
    -- 'treemap', 'funnel', 'gauge', 'sankey', 'waterfall'
    
    -- Конфигурация
    config JSONB NOT NULL,
    -- {
    --   "xAxis": {"column": "region_name", "label": "Регион", "type": "category"},
    --   "yAxis": {"column": "total_score", "label": "Балл", "type": "value", "min": 0, "max": 100},
    --   "series": [
    --     {"column": "score_2024", "label": "2024", "color": "#3B82F6", "type": "bar"},
    --     {"column": "score_2025", "label": "2025", "color": "#10B981", "type": "line"}
    --   ],
    --   "filters": {"federal_district_id": 7},
    --   "sort": {"column": "total_score", "order": "desc"},
    --   "limit": 10,
    --   "legend": {"show": true, "position": "bottom"},
    --   "tooltip": {"show": true},
    --   "grid": {"show": true}
    -- }
    
    -- Кеш данных (для быстрой загрузки)
    cached_data JSONB,
    cache_updated_at TIMESTAMP,
    cache_ttl INTEGER DEFAULT 3600,  -- TTL в секундах
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_chart_type CHECK (chart_type IN (
        'bar', 'line', 'pie', 'area', 'scatter', 'radar', 'heatmap',
        'treemap', 'funnel', 'gauge', 'sankey', 'waterfall', 'boxplot'
    )),
    CONSTRAINT chk_data_source_type CHECK (data_source_type IN ('table', 'query', 'api'))
);

CREATE INDEX idx_charts_workspace ON charts(workspace_id);
CREATE INDEX idx_charts_data_source ON charts(data_source_type, data_source_id);
CREATE INDEX idx_charts_created_by ON charts(created_by);
CREATE INDEX idx_charts_type ON charts(chart_type);

COMMENT ON TABLE charts IS 'Конфигурация графиков (переиспользуемые)';
COMMENT ON COLUMN charts.cached_data IS 'Кешированные данные для быстрой загрузки';

-- ================================
-- 4. СВЯЗЬ БЛОКОВ С ГРАФИКАМИ
-- ================================

CREATE TABLE IF NOT EXISTS block_charts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
    chart_id UUID NOT NULL REFERENCES charts(id) ON DELETE CASCADE,
    
    -- Переопределение настроек для конкретного блока
    override_config JSONB,
    -- {
    --   "width": 800,
    --   "height": 400,
    --   "theme": "dark"
    -- }
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(block_id, chart_id)
);

CREATE INDEX idx_block_charts_block ON block_charts(block_id);
CREATE INDEX idx_block_charts_chart ON block_charts(chart_id);

COMMENT ON TABLE block_charts IS 'Связь блоков с графиками (один график может быть в нескольких блоках)';

-- ================================
-- 5. СОХРАНЕННЫЕ ЗАПРОСЫ
-- ================================

CREATE TABLE IF NOT EXISTS saved_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Тип запроса
    query_type VARCHAR(50) NOT NULL,  -- 'sql', 'aggregation', 'formula'
    
    -- Конфигурация запроса
    query_config JSONB NOT NULL,
    -- Для SQL:
    -- {
    --   "sql": "SELECT region_name, AVG(score) as avg_score FROM ...",
    --   "parameters": [{"name": "year", "type": "number", "default": 2025}]
    -- }
    -- Для aggregation:
    -- {
    --   "tables": ["table-uuid-1"],
    --   "columns": ["region_name", "total_score"],
    --   "aggregations": [{"column": "score", "function": "avg", "alias": "avg_score"}],
    --   "groupBy": ["region_name"],
    --   "filters": {"year": 2025},
    --   "sort": {"column": "avg_score", "order": "desc"}
    -- }
    
    -- Кеш результата
    cached_result JSONB,
    cache_updated_at TIMESTAMP,
    cache_ttl INTEGER DEFAULT 3600,  -- TTL в секундах
    
    -- Метаданные
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_query_type CHECK (query_type IN ('sql', 'aggregation', 'formula'))
);

CREATE INDEX idx_saved_queries_workspace ON saved_queries(workspace_id);
CREATE INDEX idx_saved_queries_type ON saved_queries(query_type);
CREATE INDEX idx_saved_queries_created_by ON saved_queries(created_by);

COMMENT ON TABLE saved_queries IS 'Сохраненные запросы для графиков и отчетов';
COMMENT ON COLUMN saved_queries.cached_result IS 'Кешированный результат запроса';

-- ================================
-- 6. ПРАВА НА СТРАНИЦЫ
-- ================================

CREATE TABLE IF NOT EXISTS page_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    
    -- Субъект прав
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Права
    can_read BOOLEAN DEFAULT TRUE,
    can_write BOOLEAN DEFAULT FALSE,
    can_comment BOOLEAN DEFAULT FALSE,
    can_share BOOLEAN DEFAULT FALSE,
    
    granted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    CONSTRAINT chk_pp_subject CHECK (
        (user_id IS NOT NULL AND role_id IS NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NOT NULL AND organization_id IS NULL) OR
        (user_id IS NULL AND role_id IS NULL AND organization_id IS NOT NULL)
    )
);

CREATE INDEX idx_page_permissions_page ON page_permissions(page_id);
CREATE INDEX idx_page_permissions_user ON page_permissions(user_id);
CREATE INDEX idx_page_permissions_role ON page_permissions(role_id);
CREATE INDEX idx_page_permissions_organization ON page_permissions(organization_id);

COMMENT ON TABLE page_permissions IS 'Права доступа к страницам';

-- ================================
-- 7. КОММЕНТАРИИ К БЛОКАМ
-- ================================

CREATE TABLE IF NOT EXISTS block_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
    
    -- Комментарий
    content TEXT NOT NULL,
    
    -- Ответ на комментарий
    parent_comment_id UUID REFERENCES block_comments(id) ON DELETE CASCADE,
    
    -- Статус
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP,
    
    -- Автор
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_block_comments_block ON block_comments(block_id);
CREATE INDEX idx_block_comments_parent ON block_comments(parent_comment_id);
CREATE INDEX idx_block_comments_created_by ON block_comments(created_by);
CREATE INDEX idx_block_comments_resolved ON block_comments(is_resolved) WHERE is_resolved = FALSE;

COMMENT ON TABLE block_comments IS 'Комментарии к блокам (для совместной работы)';

-- ================================
-- ТРИГГЕРЫ
-- ================================

-- Триггер для updated_at
DROP TRIGGER IF EXISTS trg_pages_updated_at ON pages;
CREATE TRIGGER trg_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_blocks_updated_at ON blocks;
CREATE TRIGGER trg_blocks_updated_at
    BEFORE UPDATE ON blocks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_charts_updated_at ON charts;
CREATE TRIGGER trg_charts_updated_at
    BEFORE UPDATE ON charts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_saved_queries_updated_at ON saved_queries;
CREATE TRIGGER trg_saved_queries_updated_at
    BEFORE UPDATE ON saved_queries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- ФУНКЦИИ
-- ================================

-- Функция: Получить данные для графика
CREATE OR REPLACE FUNCTION get_chart_data(p_chart_id UUID)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
    v_chart RECORD;
    v_result JSONB;
BEGIN
    -- Получаем график
    SELECT * INTO v_chart
    FROM charts
    WHERE id = p_chart_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Chart not found: %', p_chart_id;
    END IF;
    
    -- Проверяем кеш
    IF v_chart.cached_data IS NOT NULL 
       AND v_chart.cache_updated_at IS NOT NULL
       AND v_chart.cache_updated_at > NOW() - (v_chart.cache_ttl || ' seconds')::INTERVAL THEN
        RETURN v_chart.cached_data;
    END IF;
    
    -- Получаем данные в зависимости от типа источника
    IF v_chart.data_source_type = 'table' THEN
        -- Получаем данные из динамической таблицы
        -- TODO: Реализовать получение данных из table_cells
        v_result := '[]'::jsonb;
        
    ELSIF v_chart.data_source_type = 'query' THEN
        -- Выполняем сохраненный запрос
        SELECT cached_result INTO v_result
        FROM saved_queries
        WHERE id = v_chart.data_source_id;
    END IF;
    
    -- Обновляем кеш
    UPDATE charts
    SET cached_data = v_result,
        cache_updated_at = NOW()
    WHERE id = p_chart_id;
    
    RETURN v_result;
END;
$$;

COMMENT ON FUNCTION get_chart_data IS 'Получает данные для графика с кешированием';

-- Функция: Инвалидация кеша графиков при изменении таблицы
CREATE OR REPLACE FUNCTION invalidate_chart_cache()
RETURNS TRIGGER AS $$
BEGIN
    -- Инвалидируем кеш всех графиков, использующих эту таблицу
    UPDATE charts
    SET cache_updated_at = NULL
    WHERE data_source_type = 'table'
      AND data_source_id IN (
          SELECT table_id FROM table_versions WHERE id = NEW.version_id
      );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер на изменение ячеек
DROP TRIGGER IF EXISTS trg_invalidate_chart_cache ON table_cells;
CREATE TRIGGER trg_invalidate_chart_cache
    AFTER INSERT OR UPDATE OR DELETE ON table_cells
    FOR EACH ROW
    EXECUTE FUNCTION invalidate_chart_cache();

-- ================================
-- ПРЕДСТАВЛЕНИЯ
-- ================================

-- Представление: Страницы с количеством блоков
CREATE OR REPLACE VIEW v_pages_with_stats AS
SELECT 
    p.*,
    COUNT(DISTINCT b.id) as block_count,
    COUNT(DISTINCT CASE WHEN b.block_type = 'chart' THEN b.id END) as chart_count,
    u.name as created_by_name
FROM pages p
LEFT JOIN blocks b ON b.page_id = p.id
LEFT JOIN users u ON u.id = p.created_by
GROUP BY p.id, u.name;

COMMENT ON VIEW v_pages_with_stats IS 'Страницы со статистикой блоков';

-- Представление: Популярные графики
CREATE OR REPLACE VIEW v_popular_charts AS
SELECT 
    c.*,
    COUNT(DISTINCT bc.block_id) as usage_count,
    u.name as created_by_name
FROM charts c
LEFT JOIN block_charts bc ON bc.chart_id = c.id
LEFT JOIN users u ON u.id = c.created_by
GROUP BY c.id, u.name
ORDER BY usage_count DESC;

COMMENT ON VIEW v_popular_charts IS 'Популярные графики по количеству использований';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE pages IS 
'Страницы с блоками контента.
Типы страниц:
- document: обычный документ
- dashboard: дашборд с графиками
- report: отчет
- presentation: презентация (блоки как слайды)

Поддерживает:
- Иерархию страниц (parent_page_id)
- Публичный доступ (is_public, public_url)
- Режим презентации (metadata.presentation_mode)';

COMMENT ON TABLE blocks IS 
'Блоки контента на страницах (Notion-style).
Поддерживает:
- Вложенность (parent_block_id)
- Drag & drop (sort_order)
- Различные типы контента
- Кастомные настройки (settings)';

COMMENT ON TABLE charts IS 
'Переиспользуемые графики.
Один график может быть использован в нескольких блоках.
Поддерживает кеширование данных для производительности.';

COMMENT ON TABLE saved_queries IS 
'Сохраненные запросы для графиков.
Поддерживает:
- SQL запросы
- Агрегации
- Формулы
- Кеширование результатов';
