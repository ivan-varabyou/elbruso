-- ================================
-- Блок 10: Утилиты для работы с сезонами
-- ================================
-- Автоматическая генерация сезонов и определение текущего сезона

-- ================================
-- 1. ФУНКЦИЯ: Генерация календарных сезонов
-- ================================

CREATE OR REPLACE FUNCTION generate_calendar_seasons(
    p_start_year INTEGER,
    p_end_year INTEGER
)
RETURNS TABLE (
    season_code VARCHAR,
    season_name VARCHAR,
    start_date DATE,
    end_date DATE,
    action TEXT
) LANGUAGE plpgsql AS $$
DECLARE
    v_year INTEGER;
    v_code VARCHAR;
    v_name VARCHAR;
    v_start DATE;
    v_end DATE;
    v_exists BOOLEAN;
BEGIN
    FOR v_year IN p_start_year..p_end_year LOOP
        v_code := v_year::TEXT;
        v_name := 'Сезон ' || v_year::TEXT;
        v_start := (v_year || '-01-01')::DATE;
        v_end := (v_year || '-12-31')::DATE;
        
        -- Проверяем существование
        SELECT EXISTS(SELECT 1 FROM seasons WHERE code = v_code) INTO v_exists;
        
        IF NOT v_exists THEN
            INSERT INTO seasons (code, name_ru, start_date, end_date, is_active)
            VALUES (v_code, v_name, v_start, v_end, v_year >= EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER);
            
            season_code := v_code;
            season_name := v_name;
            start_date := v_start;
            end_date := v_end;
            action := 'CREATED';
            RETURN NEXT;
        ELSE
            season_code := v_code;
            season_name := v_name;
            start_date := v_start;
            end_date := v_end;
            action := 'EXISTS';
            RETURN NEXT;
        END IF;
    END LOOP;
END;
$$;

COMMENT ON FUNCTION generate_calendar_seasons IS 'Генерация календарных сезонов (январь-декабрь) за указанный диапазон лет';

-- ================================
-- 2. ФУНКЦИЯ: Генерация спортивных сезонов
-- ================================

CREATE OR REPLACE FUNCTION generate_sport_seasons(
    p_start_year INTEGER,
    p_end_year INTEGER,
    p_season_start_month INTEGER DEFAULT 9,  -- Сентябрь
    p_season_start_day INTEGER DEFAULT 1
)
RETURNS TABLE (
    season_code VARCHAR,
    season_name VARCHAR,
    start_date DATE,
    end_date DATE,
    action TEXT
) LANGUAGE plpgsql AS $$
DECLARE
    v_year INTEGER;
    v_code VARCHAR;
    v_name VARCHAR;
    v_start DATE;
    v_end DATE;
    v_exists BOOLEAN;
BEGIN
    FOR v_year IN p_start_year..p_end_year LOOP
        v_code := v_year::TEXT || '/' || (v_year + 1)::TEXT;
        v_name := 'Сезон ' || v_year::TEXT || '/' || (v_year + 1)::TEXT;
        v_start := (v_year || '-' || LPAD(p_season_start_month::TEXT, 2, '0') || '-' || LPAD(p_season_start_day::TEXT, 2, '0'))::DATE;
        v_end := ((v_year + 1) || '-' || LPAD((p_season_start_month - 1)::TEXT, 2, '0') || '-' || 
                  EXTRACT(DAY FROM (((v_year + 1) || '-' || LPAD(p_season_start_month::TEXT, 2, '0') || '-01')::DATE - INTERVAL '1 day'))::TEXT)::DATE;
        
        -- Проверяем существование
        SELECT EXISTS(SELECT 1 FROM seasons WHERE code = v_code) INTO v_exists;
        
        IF NOT v_exists THEN
            INSERT INTO seasons (code, name_ru, start_date, end_date, is_active)
            VALUES (v_code, v_name, v_start, v_end, CURRENT_DATE BETWEEN v_start AND v_end OR v_start > CURRENT_DATE);
            
            season_code := v_code;
            season_name := v_name;
            start_date := v_start;
            end_date := v_end;
            action := 'CREATED';
            RETURN NEXT;
        ELSE
            season_code := v_code;
            season_name := v_name;
            start_date := v_start;
            end_date := v_end;
            action := 'EXISTS';
            RETURN NEXT;
        END IF;
    END LOOP;
END;
$$;

COMMENT ON FUNCTION generate_sport_seasons IS 'Генерация спортивных сезонов (например, сентябрь-август) за указанный диапазон лет';

-- ================================
-- 3. ФУНКЦИЯ: Определение текущего сезона
-- ================================

CREATE OR REPLACE FUNCTION get_current_season(
    p_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
    season_id INTEGER,
    season_code VARCHAR,
    season_name VARCHAR,
    start_date DATE,
    end_date DATE
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.code,
        s.name_ru,
        s.start_date,
        s.end_date
    FROM seasons s
    WHERE p_date BETWEEN s.start_date AND s.end_date
      AND s.is_active = TRUE
    ORDER BY s.start_date DESC
    LIMIT 1;
END;
$$;

COMMENT ON FUNCTION get_current_season IS 'Определяет текущий активный сезон на указанную дату';

-- ================================
-- 4. ФУНКЦИЯ: Определение сезона по дате
-- ================================

CREATE OR REPLACE FUNCTION get_season_by_date(
    p_date DATE,
    p_prefer_sport_season BOOLEAN DEFAULT TRUE
)
RETURNS TABLE (
    season_id INTEGER,
    season_code VARCHAR,
    season_name VARCHAR,
    start_date DATE,
    end_date DATE,
    season_type TEXT
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.code,
        s.name_ru,
        s.start_date,
        s.end_date,
        CASE 
            WHEN s.code LIKE '%/%' THEN 'sport'
            ELSE 'calendar'
        END as season_type
    FROM seasons s
    WHERE p_date BETWEEN s.start_date AND s.end_date
    ORDER BY 
        CASE 
            WHEN p_prefer_sport_season AND s.code LIKE '%/%' THEN 1
            WHEN NOT p_prefer_sport_season AND s.code NOT LIKE '%/%' THEN 1
            ELSE 2
        END,
        s.start_date DESC;
END;
$$;

COMMENT ON FUNCTION get_season_by_date IS 'Находит все сезоны, в которые попадает указанная дата';

-- ================================
-- 5. ФУНКЦИЯ: Автоматическое обновление статуса сезонов
-- ================================

CREATE OR REPLACE FUNCTION update_seasons_status()
RETURNS TABLE (
    season_code VARCHAR,
    old_status BOOLEAN,
    new_status BOOLEAN,
    action TEXT
) LANGUAGE plpgsql AS $$
DECLARE
    v_season RECORD;
    v_new_status BOOLEAN;
BEGIN
    FOR v_season IN SELECT * FROM seasons LOOP
        -- Определяем новый статус
        v_new_status := CURRENT_DATE <= v_season.end_date;
        
        IF v_season.is_active != v_new_status THEN
            UPDATE seasons 
            SET is_active = v_new_status,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = v_season.id;
            
            season_code := v_season.code;
            old_status := v_season.is_active;
            new_status := v_new_status;
            action := CASE WHEN v_new_status THEN 'ACTIVATED' ELSE 'DEACTIVATED' END;
            RETURN NEXT;
        END IF;
    END LOOP;
END;
$$;

COMMENT ON FUNCTION update_seasons_status IS 'Автоматически обновляет статус is_active для всех сезонов на основе текущей даты';

-- ================================
-- 6. VIEW: Текущие активные сезоны
-- ================================

CREATE OR REPLACE VIEW v_current_seasons AS
SELECT 
    s.id,
    s.code,
    s.name_ru,
    s.start_date,
    s.end_date,
    CASE 
        WHEN s.code LIKE '%/%' THEN 'Спортивный'
        ELSE 'Календарный'
    END as season_type,
    CURRENT_DATE - s.start_date as days_elapsed,
    s.end_date - CURRENT_DATE as days_remaining,
    ROUND(
        (CURRENT_DATE - s.start_date)::NUMERIC / 
        NULLIF((s.end_date - s.start_date)::NUMERIC, 0) * 100, 
        2
    ) as completion_percent
FROM seasons s
WHERE CURRENT_DATE BETWEEN s.start_date AND s.end_date
  AND s.is_active = TRUE
ORDER BY s.start_date;

COMMENT ON VIEW v_current_seasons IS 'Текущие активные сезоны с расчетом прогресса';

-- ================================
-- 7. VIEW: Статистика по сезонам
-- ================================

CREATE OR REPLACE VIEW v_seasons_statistics AS
SELECT 
    s.id,
    s.code,
    s.name_ru,
    s.start_date,
    s.end_date,
    s.is_active,
    CASE 
        WHEN s.code LIKE '%/%' THEN 'Спортивный'
        ELSE 'Календарный'
    END as season_type,
    
    -- Статистика по результатам событий
    COUNT(DISTINCT er.id) as events_count,
    COUNT(DISTINCT er.organization_id) as organizations_count,
    
    -- Статистика по значениям индикаторов
    COUNT(DISTINCT oiv.id) as indicator_values_count,
    COUNT(DISTINCT oiv.indicator_catalog_id) as unique_indicators_count,
    
    -- Статистика по баллам
    COUNT(DISTINCT os.id) as scored_organizations_count,
    AVG(os.total_score) as avg_total_score,
    MAX(os.total_score) as max_total_score
    
FROM seasons s
LEFT JOIN event_results er ON er.season_id = s.id
LEFT JOIN organization_indicator_values oiv ON oiv.season_id = s.id
LEFT JOIN organization_scores os ON os.season_id = s.id
GROUP BY s.id, s.code, s.name_ru, s.start_date, s.end_date, s.is_active
ORDER BY s.start_date DESC;

COMMENT ON VIEW v_seasons_statistics IS 'Статистика по сезонам: количество событий, организаций, индикаторов и баллов';

-- ================================
-- 8. ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
-- ================================

-- Генерация календарных сезонов с 2020 по 2030
-- SELECT * FROM generate_calendar_seasons(2020, 2030);

-- Генерация спортивных сезонов (сентябрь-август) с 2020/21 по 2029/30
-- SELECT * FROM generate_sport_seasons(2020, 2029);

-- Получить текущий сезон
-- SELECT * FROM get_current_season();

-- Получить сезон на конкретную дату
-- SELECT * FROM get_season_by_date('2024-10-15');

-- Обновить статусы всех сезонов
-- SELECT * FROM update_seasons_status();

-- Посмотреть текущие активные сезоны
-- SELECT * FROM v_current_seasons;

-- Посмотреть статистику по всем сезонам
-- SELECT * FROM v_seasons_statistics;

-- ================================
-- 9. АВТОМАТИЧЕСКАЯ ГЕНЕРАЦИЯ СЕЗОНОВ ПРИ ИНИЦИАЛИЗАЦИИ
-- ================================

-- Генерируем календарные сезоны с 2020 по 2030
DO $$
BEGIN
    PERFORM generate_calendar_seasons(2020, 2030);
    RAISE NOTICE 'Календарные сезоны 2020-2030 созданы';
END $$;

-- Генерируем спортивные сезоны с 2020/21 по 2029/30
DO $$
BEGIN
    PERFORM generate_sport_seasons(2020, 2029);
    RAISE NOTICE 'Спортивные сезоны 2020/21-2029/30 созданы';
END $$;

-- ================================
-- 10. ТРИГГЕР: Автоматическое определение сезона при вставке результата
-- ================================

CREATE OR REPLACE FUNCTION auto_assign_season()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
    v_season_id INTEGER;
    v_event_date DATE;
BEGIN
    -- Если сезон уже указан, ничего не делаем
    IF NEW.season_id IS NOT NULL THEN
        RETURN NEW;
    END IF;
    
    -- Пытаемся определить сезон по текущей дате или дате из метаданных
    v_event_date := COALESCE(
        (NEW.metadata->>'event_date')::DATE,
        CURRENT_DATE
    );
    
    -- Ищем подходящий сезон (предпочитаем спортивный)
    SELECT season_id INTO v_season_id
    FROM get_season_by_date(v_event_date, TRUE)
    LIMIT 1;
    
    -- Если нашли, присваиваем
    IF v_season_id IS NOT NULL THEN
        NEW.season_id := v_season_id;
        RAISE NOTICE 'Автоматически присвоен сезон % для даты %', v_season_id, v_event_date;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Применяем триггер к event_results
DROP TRIGGER IF EXISTS trg_event_results_auto_season ON event_results;
CREATE TRIGGER trg_event_results_auto_season
    BEFORE INSERT ON event_results
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_season();

-- Применяем триггер к organization_indicator_values
DROP TRIGGER IF EXISTS trg_indicator_values_auto_season ON organization_indicator_values;
CREATE TRIGGER trg_indicator_values_auto_season
    BEFORE INSERT ON organization_indicator_values
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_season();

COMMENT ON FUNCTION auto_assign_season IS 'Автоматически определяет и присваивает сезон при вставке записи, если сезон не указан';

-- ================================
-- 11. ФУНКЦИЯ: Получить активный сезон для организации
-- ================================

CREATE OR REPLACE FUNCTION get_organization_active_season(
    p_organization_id INTEGER,
    p_prefer_sport_season BOOLEAN DEFAULT TRUE
)
RETURNS TABLE (
    season_id INTEGER,
    season_code VARCHAR,
    season_name VARCHAR,
    has_data BOOLEAN,
    events_count BIGINT,
    indicators_count BIGINT
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    WITH current_seasons AS (
        SELECT * FROM get_season_by_date(CURRENT_DATE, p_prefer_sport_season)
    )
    SELECT 
        cs.season_id,
        cs.season_code,
        cs.season_name,
        COALESCE(COUNT(DISTINCT er.id) > 0 OR COUNT(DISTINCT oiv.id) > 0, FALSE) as has_data,
        COUNT(DISTINCT er.id) as events_count,
        COUNT(DISTINCT oiv.id) as indicators_count
    FROM current_seasons cs
    LEFT JOIN event_results er ON er.season_id = cs.season_id AND er.organization_id = p_organization_id
    LEFT JOIN organization_indicator_values oiv ON oiv.season_id = cs.season_id AND oiv.organization_id = p_organization_id
    GROUP BY cs.season_id, cs.season_code, cs.season_name
    ORDER BY has_data DESC, cs.start_date DESC
    LIMIT 1;
END;
$$;

COMMENT ON FUNCTION get_organization_active_season IS 'Определяет активный сезон для организации с учетом наличия данных';

-- ================================
-- 12. ПРИМЕРЫ ЗАПРОСОВ
-- ================================

-- Пример 1: Какой сейчас сезон?
/*
SELECT * FROM get_current_season();

Результат (если сейчас январь 2025):
season_id | season_code | season_name  | start_date | end_date
----------|-------------|--------------|------------|----------
    5     | 2025        | Сезон 2025   | 2025-01-01 | 2025-12-31
    8     | 2024/25     | Сезон 2024/25| 2024-09-01 | 2025-08-31
*/

-- Пример 2: Генерация сезонов
/*
SELECT * FROM generate_calendar_seasons(2025, 2027);

Результат:
season_code | season_name  | start_date | end_date   | action
------------|--------------|------------|------------|--------
2025        | Сезон 2025   | 2025-01-01 | 2025-12-31 | EXISTS
2026        | Сезон 2026   | 2026-01-01 | 2026-12-31 | CREATED
2027        | Сезон 2027   | 2027-01-01 | 2027-12-31 | CREATED
*/

-- Пример 3: Текущие активные сезоны с прогрессом
/*
SELECT 
    code,
    name_ru,
    season_type,
    completion_percent || '%' as progress,
    days_remaining || ' дней осталось' as remaining
FROM v_current_seasons;

Результат (январь 2025):
code    | name_ru       | season_type  | progress | remaining
--------|---------------|--------------|----------|------------------
2025    | Сезон 2025    | Календарный  | 3.56%    | 351 дней осталось
2024/25 | Сезон 2024/25 | Спортивный   | 36.89%   | 230 дней осталось
*/

-- Пример 4: В какой сезон попадает дата?
/*
SELECT * FROM get_season_by_date('2024-10-15', TRUE);

Результат:
season_id | season_code | season_name   | start_date | end_date   | season_type
----------|-------------|---------------|------------|------------|-------------
    8     | 2024/25     | Сезон 2024/25 | 2024-09-01 | 2025-08-31 | sport
    4     | 2024        | Сезон 2024    | 2024-01-01 | 2024-12-31 | calendar
*/

-- Пример 5: Автоматическое присвоение сезона
/*
-- При вставке результата без указания сезона
INSERT INTO event_results (event_id, organization_id, place)
VALUES (1, 50, 3);
-- Сезон будет присвоен автоматически на основе текущей даты

-- Можно указать дату события в метаданных
INSERT INTO event_results (event_id, organization_id, place, metadata)
VALUES (1, 50, 3, '{"event_date": "2024-10-15"}');
-- Сезон будет определен на основе даты из метаданных
*/
