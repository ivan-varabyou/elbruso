-- ================================
-- Блок 13: Система автогенерации критериев
-- ================================
-- Создание множества критериев из одного шаблона на основе комбинаций параметров

-- ================================
-- 1. ШАБЛОНЫ ГЕНЕРАЦИИ
-- ================================

CREATE TABLE indicator_generation_templates (
    id SERIAL PRIMARY KEY,
    name_ru VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Базовые параметры
    category_id INTEGER REFERENCES indicator_categories(id),
    sport_id INTEGER REFERENCES sports(id),
    value_type VARCHAR(20) NOT NULL DEFAULT 'number',
    measurement_unit_id INTEGER REFERENCES measurement_units(id),
    
    -- Базовый вес
    base_weight NUMERIC(10,4) DEFAULT 1.0,
    use_population BOOLEAN DEFAULT FALSE,
    
    -- Шаблоны для генерации
    name_pattern TEXT NOT NULL,           -- "{place} место {event} {age} ({gender})"
    code_pattern VARCHAR(200) NOT NULL,   -- "BBL_{event}_{age}_{gender}_PLACE_{place}"
    description_pattern TEXT,
    
    -- Конфигурация генерации (JSON)
    generation_config JSONB DEFAULT '{}'::jsonb,
    
    -- Статус
    is_active BOOLEAN DEFAULT TRUE,
    last_generated_at TIMESTAMP,
    generated_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_igt_value_type CHECK (value_type IN ('number', 'boolean', 'decimal', 'text'))
);

CREATE INDEX idx_igt_category ON indicator_generation_templates(category_id);
CREATE INDEX idx_igt_sport ON indicator_generation_templates(sport_id);
CREATE INDEX idx_igt_active ON indicator_generation_templates(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE indicator_generation_templates IS 'Шаблоны для автоматической генерации множества критериев';

-- ================================
-- 2. ПАРАМЕТРЫ ГЕНЕРАЦИИ
-- ================================

CREATE TABLE template_generation_params (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL REFERENCES indicator_generation_templates(id) ON DELETE CASCADE,
    
    -- Тип параметра
    param_type VARCHAR(50) NOT NULL,  -- 'gender', 'age_group', 'discipline', 'event', 'place', 'custom'
    param_name VARCHAR(100) NOT NULL, -- Имя для подстановки в шаблон
    
    -- Значения параметра (JSON массив ID или значений)
    param_values JSONB NOT NULL,      -- [1, 2] для gender_id или ['1', '2', '3'] для мест
    
    -- Формула веса (опционально)
    weight_formula JSONB,             -- {"1": "* 1.0", "2": "* 0.6", "3": "* 0.4"}
    
    -- Обязательность
    is_required BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tgp_param_type CHECK (param_type IN ('gender', 'age_group', 'discipline', 'event', 'place', 'league', 'custom'))
);

CREATE INDEX idx_tgp_template ON template_generation_params(template_id);
CREATE INDEX idx_tgp_type ON template_generation_params(param_type);

COMMENT ON TABLE template_generation_params IS 'Параметры для генерации критериев (пол, возраст, места и т.д.)';

-- ================================
-- 3. СГЕНЕРИРОВАННЫЕ КРИТЕРИИ
-- ================================

CREATE TABLE generated_indicators (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL REFERENCES indicator_generation_templates(id) ON DELETE CASCADE,
    indicator_catalog_id INTEGER NOT NULL REFERENCES indicator_catalog(id) ON DELETE CASCADE,
    
    -- Параметры, с которыми был создан критерий
    generation_params JSONB NOT NULL,  -- {"gender_id": 1, "age_group_id": 4, "place": "1", ...}
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(template_id, indicator_catalog_id)
);

CREATE INDEX idx_gi_template ON generated_indicators(template_id);
CREATE INDEX idx_gi_indicator ON generated_indicators(indicator_catalog_id);

COMMENT ON TABLE generated_indicators IS 'Связь сгенерированных критериев с шаблонами';

-- ================================
-- 4. ФУНКЦИЯ: Генерация критериев из шаблона
-- ================================

CREATE OR REPLACE FUNCTION generate_indicators_from_template_v2(
    p_template_id INTEGER,
    p_overwrite BOOLEAN DEFAULT FALSE
)
RETURNS TABLE (
    action TEXT,
    indicator_code VARCHAR,
    indicator_name TEXT,
    params JSONB
) LANGUAGE plpgsql AS $$
DECLARE
    v_template RECORD;
    v_param RECORD;
    v_combinations JSONB[];
    v_combo JSONB;
    v_code VARCHAR;
    v_name TEXT;
    v_desc TEXT;
    v_weight NUMERIC;
    v_indicator_id INTEGER;
    v_gender_name TEXT;
    v_age_name TEXT;
    v_discipline_name TEXT;
    v_event_name TEXT;
    v_param_value TEXT;
BEGIN
    -- Получаем шаблон
    SELECT * INTO v_template
    FROM indicator_generation_templates
    WHERE id = p_template_id AND is_active = TRUE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Шаблон % не найден или неактивен', p_template_id;
    END IF;
    
    -- Получаем все комбинации параметров
    WITH RECURSIVE param_combinations AS (
        -- Начальная комбинация (пустая)
        SELECT 
            1 as level,
            '{}'::jsonb as combo
        
        UNION ALL
        
        -- Добавляем следующий параметр
        SELECT 
            pc.level + 1,
            pc.combo || jsonb_build_object(
                tgp.param_name,
                value
            )
        FROM param_combinations pc
        CROSS JOIN template_generation_params tgp
        CROSS JOIN LATERAL jsonb_array_elements_text(tgp.param_values) as value
        WHERE tgp.template_id = p_template_id
          AND pc.level = (
              SELECT COUNT(*) 
              FROM template_generation_params 
              WHERE template_id = p_template_id 
                AND sort_order < tgp.sort_order
          )
          AND pc.level < (
              SELECT COUNT(*) 
              FROM template_generation_params 
              WHERE template_id = p_template_id
          ) + 1
    )
    SELECT array_agg(combo) INTO v_combinations
    FROM param_combinations
    WHERE level = (
        SELECT COUNT(*) + 1
        FROM template_generation_params
        WHERE template_id = p_template_id
    );
    
    -- Генерируем критерии для каждой комбинации
    FOREACH v_combo IN ARRAY v_combinations LOOP
        -- Подготавливаем подстановки
        v_code := v_template.code_pattern;
        v_name := v_template.name_pattern;
        v_desc := COALESCE(v_template.description_pattern, '');
        v_weight := v_template.base_weight;
        
        -- Получаем названия для подстановки
        IF v_combo ? 'gender' THEN
            SELECT name_ru INTO v_gender_name 
            FROM genders 
            WHERE id = (v_combo->>'gender')::INTEGER;
            
            v_code := REPLACE(v_code, '{gender}', UPPER(SUBSTRING(v_gender_name FROM 1 FOR 1)));
            v_name := REPLACE(v_name, '{gender}', v_gender_name);
        END IF;
        
        IF v_combo ? 'age_group' THEN
            SELECT name_ru, code INTO v_age_name 
            FROM age_groups 
            WHERE id = (v_combo->>'age_group')::INTEGER;
            
            v_code := REPLACE(v_code, '{age}', UPPER(v_age_name));
            v_name := REPLACE(v_name, '{age}', v_age_name);
        END IF;
        
        IF v_combo ? 'discipline' THEN
            SELECT name_ru INTO v_discipline_name 
            FROM disciplines 
            WHERE id = (v_combo->>'discipline')::INTEGER;
            
            v_code := REPLACE(v_code, '{discipline}', UPPER(REPLACE(v_discipline_name, ' ', '_')));
            v_name := REPLACE(v_name, '{discipline}', v_discipline_name);
        END IF;
        
        IF v_combo ? 'event' THEN
            v_event_name := v_combo->>'event';
            v_code := REPLACE(v_code, '{event}', UPPER(v_event_name));
            v_name := REPLACE(v_name, '{event}', v_event_name);
        END IF;
        
        IF v_combo ? 'place' THEN
            v_param_value := v_combo->>'place';
            v_code := REPLACE(v_code, '{place}', v_param_value);
            v_name := REPLACE(v_name, '{place}', v_param_value);
            
            -- Применяем формулу веса для места
            FOR v_param IN 
                SELECT * FROM template_generation_params 
                WHERE template_id = p_template_id 
                  AND param_name = 'place'
                  AND weight_formula IS NOT NULL
            LOOP
                IF v_param.weight_formula ? v_param_value THEN
                    EXECUTE 'SELECT ' || v_weight || ' ' || (v_param.weight_formula->>v_param_value)
                    INTO v_weight;
                END IF;
            END LOOP;
        END IF;
        
        -- Проверяем существование
        SELECT id INTO v_indicator_id 
        FROM indicator_catalog 
        WHERE code = v_code;
        
        IF v_indicator_id IS NOT NULL THEN
            IF p_overwrite THEN
                UPDATE indicator_catalog SET
                    name_ru = v_name,
                    description = v_desc,
                    default_weight = v_weight,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = v_indicator_id;
                
                action := 'UPDATE';
                indicator_code := v_code;
                indicator_name := v_name;
                params := v_combo;
                RETURN NEXT;
            ELSE
                action := 'SKIP';
                indicator_code := v_code;
                indicator_name := v_name;
                params := v_combo;
                RETURN NEXT;
            END IF;
        ELSE
            -- Создаем новый индикатор
            INSERT INTO indicator_catalog (
                category_id,
                sport_id,
                code,
                name_ru,
                description,
                value_type,
                measurement_unit_id,
                default_weight,
                use_population
            ) VALUES (
                v_template.category_id,
                v_template.sport_id,
                v_code,
                v_name,
                v_desc,
                v_template.value_type,
                v_template.measurement_unit_id,
                v_weight,
                v_template.use_population
            ) RETURNING id INTO v_indicator_id;
            
            -- Записываем связь
            INSERT INTO generated_indicators (
                template_id,
                indicator_catalog_id,
                generation_params
            ) VALUES (
                p_template_id,
                v_indicator_id,
                v_combo
            );
            
            action := 'INSERT';
            indicator_code := v_code;
            indicator_name := v_name;
            params := v_combo;
            RETURN NEXT;
        END IF;
    END LOOP;
    
    -- Обновляем статистику шаблона
    UPDATE indicator_generation_templates
    SET last_generated_at = CURRENT_TIMESTAMP,
        generated_count = (
            SELECT COUNT(*) 
            FROM generated_indicators 
            WHERE template_id = p_template_id
        )
    WHERE id = p_template_id;
END;
$$;

COMMENT ON FUNCTION generate_indicators_from_template_v2 IS 'Генерирует критерии из шаблона на основе комбинаций параметров';

-- ================================
-- 5. ПРИМЕРЫ ШАБЛОНОВ
-- ================================

-- Пример 1: Призовые места в чемпионатах
INSERT INTO indicator_generation_templates (
    name_ru,
    description,
    category_id,
    sport_id,
    value_type,
    measurement_unit_id,
    base_weight,
    name_pattern,
    code_pattern,
    description_pattern
) VALUES (
    'Призовые места в чемпионатах (баскетбол)',
    'Автогенерация критериев для призовых мест в различных чемпионатах',
    (SELECT id FROM indicator_categories WHERE code = 'achievements'),
    10,  -- Баскетбол
    'number',
    (SELECT id FROM measurement_units WHERE code = 'places'),
    5.0,
    '{place} место {event} {age} ({gender}) {discipline}',
    'BBL_{event}_{age}_{gender}_{discipline}_PLACE_{place}',
    'Призовое место в чемпионате'
) RETURNING id;  -- Допустим, вернул id=1

-- Параметры для примера 1
INSERT INTO template_generation_params (template_id, param_type, param_name, param_values, weight_formula, sort_order) VALUES
-- Пол
(1, 'gender', 'gender', '[1, 2]'::jsonb, NULL, 1),

-- Возраст
(1, 'age_group', 'age', '[1, 2, 3, 4, 5]'::jsonb, 
 '{"1": "* 0.8", "2": "* 0.9", "3": "* 1.0", "4": "* 1.1", "5": "* 1.2"}'::jsonb, 2),

-- Дисциплина
(1, 'discipline', 'discipline', '[219, 220]'::jsonb, NULL, 3),

-- Событие
(1, 'custom', 'event', '["ЧР", "ПР", "КР"]'::jsonb, 
 '{"ЧР": "* 1.2", "ПР": "* 1.0", "КР": "* 0.9"}'::jsonb, 4),

-- Место
(1, 'place', 'place', '["1", "2", "3"]'::jsonb, 
 '{"1": "* 1.0", "2": "* 0.6", "3": "* 0.4"}'::jsonb, 5);

-- Генерация
-- SELECT * FROM generate_indicators_from_template_v2(1, FALSE);
-- Создаст: 2 пола × 5 возрастов × 2 дисциплины × 3 события × 3 места = 180 критериев!

-- ================================
-- 6. ПРЕДСТАВЛЕНИЯ
-- ================================

-- Шаблоны с количеством сгенерированных критериев
CREATE OR REPLACE VIEW v_generation_templates AS
SELECT 
    igt.id,
    igt.name_ru,
    igt.description,
    icat.name_ru as category_name,
    s.name_ru as sport_name,
    igt.base_weight,
    igt.generated_count,
    igt.last_generated_at,
    igt.is_active,
    
    -- Количество параметров
    (SELECT COUNT(*) FROM template_generation_params WHERE template_id = igt.id) as params_count,
    
    -- Потенциальное количество комбинаций
    (SELECT 
        CASE 
            WHEN COUNT(*) = 0 THEN 0
            ELSE (
                SELECT EXP(SUM(LN(jsonb_array_length(param_values))))::INTEGER
                FROM template_generation_params
                WHERE template_id = igt.id
            )
        END
     FROM template_generation_params WHERE template_id = igt.id
    ) as potential_combinations
    
FROM indicator_generation_templates igt
LEFT JOIN indicator_categories icat ON icat.id = igt.category_id
LEFT JOIN sports s ON s.id = igt.sport_id
ORDER BY igt.created_at DESC;

COMMENT ON VIEW v_generation_templates IS 'Шаблоны генерации с статистикой';

-- Сгенерированные критерии с параметрами
CREATE OR REPLACE VIEW v_generated_indicators AS
SELECT 
    gi.id,
    igt.name_ru as template_name,
    ic.code as indicator_code,
    ic.name_ru as indicator_name,
    ic.default_weight,
    gi.generation_params,
    gi.created_at
FROM generated_indicators gi
JOIN indicator_generation_templates igt ON igt.id = gi.template_id
JOIN indicator_catalog ic ON ic.id = gi.indicator_catalog_id
ORDER BY igt.name_ru, ic.code;

COMMENT ON VIEW v_generated_indicators IS 'Сгенерированные критерии с параметрами';

-- ================================
-- 7. ФУНКЦИЯ: Удаление сгенерированных критериев
-- ================================

CREATE OR REPLACE FUNCTION delete_generated_indicators(p_template_id INTEGER)
RETURNS TABLE (
    deleted_count INTEGER,
    indicator_codes TEXT[]
) LANGUAGE plpgsql AS $$
DECLARE
    v_codes TEXT[];
    v_count INTEGER;
BEGIN
    -- Собираем коды удаляемых критериев
    SELECT array_agg(ic.code) INTO v_codes
    FROM generated_indicators gi
    JOIN indicator_catalog ic ON ic.id = gi.indicator_catalog_id
    WHERE gi.template_id = p_template_id;
    
    -- Удаляем критерии
    DELETE FROM indicator_catalog
    WHERE id IN (
        SELECT indicator_catalog_id 
        FROM generated_indicators 
        WHERE template_id = p_template_id
    );
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    -- Обновляем статистику шаблона
    UPDATE indicator_generation_templates
    SET generated_count = 0,
        last_generated_at = NULL
    WHERE id = p_template_id;
    
    deleted_count := v_count;
    indicator_codes := v_codes;
    RETURN NEXT;
END;
$$;

COMMENT ON FUNCTION delete_generated_indicators IS 'Удаляет все критерии, сгенерированные из шаблона';

-- ================================
-- 8. ФУНКЦИЯ: Предпросмотр генерации
-- ================================

CREATE OR REPLACE FUNCTION preview_generation(p_template_id INTEGER, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
    indicator_code VARCHAR,
    indicator_name TEXT,
    weight NUMERIC,
    params JSONB
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (result).indicator_code,
        (result).indicator_name,
        ic.default_weight,
        (result).params
    FROM generate_indicators_from_template_v2(p_template_id, FALSE) as result
    LEFT JOIN indicator_catalog ic ON ic.code = (result).indicator_code
    LIMIT p_limit;
END;
$$;

COMMENT ON FUNCTION preview_generation IS 'Предпросмотр первых N критериев, которые будут сгенерированы';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_generation_templates IS 
'Шаблоны для автоматической генерации множества критериев.
Один шаблон может создать сотни критериев на основе комбинаций параметров.
Пример: 2 пола × 5 возрастов × 3 места = 30 критериев из одного шаблона';

COMMENT ON TABLE template_generation_params IS 
'Параметры для генерации (пол, возраст, места и т.д.).
Система создает декартово произведение всех параметров.
Поддерживает формулы для расчета весов';

COMMENT ON TABLE generated_indicators IS 
'Связь сгенерированных критериев с шаблонами.
Позволяет отслеживать, какие критерии из какого шаблона созданы';
