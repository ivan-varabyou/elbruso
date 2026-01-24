-- ================================
-- SQL Migration: Dimension-Linked Indicator Generation (V5)
-- ================================

-- Function to generate indicators with explicit dimension links (gender, age, discipline)
CREATE OR REPLACE FUNCTION generate_indicators_from_template_v5(
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
    
    v_gender_id INTEGER;
    v_gender_name TEXT;
    v_gender_code TEXT;
    
    v_age_group_id INTEGER;
    v_age_name TEXT;
    v_age_code TEXT;
    
    v_discipline_id INTEGER;
    v_discipline_name TEXT;
    v_discipline_code TEXT;
    
    v_event_name TEXT;
    v_param_value TEXT;
BEGIN
    -- 1. Fetch the template
    SELECT * INTO v_template
    FROM indicator_generation_templates
    WHERE id = p_template_id AND is_active = TRUE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Template % not found or inactive', p_template_id;
    END IF;
    
    -- 2. Generate all parameter combinations recursively
    WITH RECURSIVE param_combinations AS (
        SELECT 0 as level, '{}'::jsonb as combo
        UNION ALL
        SELECT t.current_level, pc.combo || jsonb_build_object(t.param_name, t.value)
        FROM param_combinations pc
        CROSS JOIN LATERAL (
            SELECT 
                tgp.param_name,
                v.value,
                (SELECT COUNT(*) FROM template_generation_params WHERE template_id = p_template_id AND sort_order <= tgp.sort_order) as current_level
            FROM template_generation_params tgp
            CROSS JOIN LATERAL jsonb_array_elements_text(tgp.param_values) as v(value)
            WHERE tgp.template_id = p_template_id
              AND (SELECT COUNT(*) FROM template_generation_params WHERE template_id = p_template_id AND sort_order < tgp.sort_order) = pc.level
        ) t
    )
    SELECT array_agg(combo) INTO v_combinations
    FROM param_combinations
    WHERE level = (SELECT COUNT(*) FROM template_generation_params WHERE template_id = p_template_id);
    
    -- 3. Process each combination
    FOREACH v_combo IN ARRAY v_combinations LOOP
        v_code := v_template.code_pattern;
        v_name := v_template.name_pattern;
        v_desc := COALESCE(v_template.description_pattern, '');
        v_weight := v_template.base_weight;
        
        v_gender_id := NULL;
        v_age_group_id := NULL;
        v_discipline_id := NULL;
        
        -- 3.1 Replacement: Gender
        IF v_combo ? 'gender' THEN
            v_gender_id := (v_combo->>'gender')::INTEGER;
            SELECT name_ru, code INTO v_gender_name, v_gender_code FROM genders WHERE id = v_gender_id;
            
            v_code := REPLACE(v_code, '{gender_code}', UPPER(v_gender_code));
            v_code := REPLACE(v_code, '{gender}', UPPER(SUBSTRING(v_gender_name FROM 1 FOR 1)));
            v_name := REPLACE(v_name, '{gender}', v_gender_name);
        END IF;
        
        -- 3.2 Replacement: Age Group
        IF v_combo ? 'age_group' THEN
            v_age_group_id := (v_combo->>'age_group')::INTEGER;
            SELECT name_ru, code INTO v_age_name, v_age_code FROM age_groups WHERE id = v_age_group_id;
            
            v_code := REPLACE(v_code, '{age_code}', UPPER(v_age_code));
            v_code := REPLACE(v_code, '{age}', UPPER(v_age_name));
            v_name := REPLACE(v_name, '{age}', v_age_name);
        END IF;
        
        -- 3.3 Replacement: Discipline
        IF v_combo ? 'discipline' THEN
            v_discipline_id := (v_combo->>'discipline')::INTEGER;
            SELECT name_ru, code INTO v_discipline_name, v_discipline_code FROM disciplines WHERE id = v_discipline_id;
            
            v_code := REPLACE(v_code, '{discipline_code}', UPPER(v_discipline_code));
            v_code := REPLACE(v_code, '{discipline}', UPPER(REPLACE(v_discipline_name, ' ', '_')));
            v_name := REPLACE(v_name, '{discipline}', v_discipline_name);
        END IF;
        
        -- 3.4 Replacement: Event / Custom / Place (simplified)
        IF v_combo ? 'event' THEN
            v_event_name := v_combo->>'event';
            v_code := REPLACE(v_code, '{event}', UPPER(v_event_name));
            v_name := REPLACE(v_name, '{event}', v_event_name);
        END IF;

        IF v_combo ? 'custom' THEN
            v_param_value := v_combo->>'custom';
            v_code := REPLACE(v_code, '{custom}', UPPER(v_param_value));
            v_name := REPLACE(v_name, '{custom}', v_param_value);
        END IF;
        
        IF v_combo ? 'place' THEN
            v_param_value := v_combo->>'place';
            v_code := REPLACE(v_code, '{place}', v_param_value);
            v_name := REPLACE(v_name, '{place}', v_param_value);
            
            FOR v_param IN SELECT * FROM template_generation_params WHERE template_id = p_template_id AND param_name = 'place' AND weight_formula IS NOT NULL LOOP
                IF v_param.weight_formula ? v_param_value THEN
                    EXECUTE 'SELECT ' || v_weight || ' ' || (v_param.weight_formula->>v_param_value) INTO v_weight;
                END IF;
            END LOOP;
        END IF;

        IF v_template.sport_id IS NOT NULL THEN
            DECLARE v_sport_name TEXT; v_sport_code TEXT; BEGIN
                SELECT name_ru, code INTO v_sport_name, v_sport_code FROM sports WHERE id = v_template.sport_id;
                v_code := REPLACE(v_code, '{sport_code}', UPPER(v_sport_code));
                v_name := REPLACE(v_name, '{sport}', v_sport_name);
            END;
        END IF;
        
        -- 4. Transactional Update/Insert
        SELECT id INTO v_indicator_id FROM indicator_catalog WHERE code = v_code;
        
        IF v_indicator_id IS NOT NULL THEN
            IF p_overwrite THEN
                UPDATE indicator_catalog SET
                    name_ru = v_name,
                    description = v_desc,
                    default_weight = v_weight,
                    gender_id = COALESCE(v_gender_id, gender_id),
                    age_group_id = COALESCE(v_age_group_id, age_group_id),
                    discipline_id = COALESCE(v_discipline_id, discipline_id),
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = v_indicator_id;
                action := 'UPDATE';
            ELSE
                action := 'SKIP';
            END IF;
        ELSE
            INSERT INTO indicator_catalog (
                category_id,
                sport_id,
                code,
                name_ru,
                description,
                value_type,
                measurement_unit_id,
                default_weight,
                use_population,
                gender_id,
                age_group_id,
                discipline_id,
                is_active,
                is_system
            ) VALUES (
                v_template.category_id,
                v_template.sport_id,
                v_code,
                v_name,
                v_desc,
                v_template.value_type,
                v_template.measurement_unit_id,
                v_weight,
                v_template.use_population,
                v_gender_id,
                v_age_group_id,
                v_discipline_id,
                TRUE,
                TRUE
            ) RETURNING id INTO v_indicator_id;
            
            INSERT INTO generated_indicators (template_id, indicator_catalog_id, generation_params)
            VALUES (p_template_id, v_indicator_id, v_combo);
            
            action := 'INSERT';
        END IF;

        indicator_code := v_code;
        indicator_name := v_name;
        params := v_combo;
        RETURN NEXT;
    END LOOP;
    
    UPDATE indicator_generation_templates SET last_generated_at = CURRENT_TIMESTAMP WHERE id = p_template_id;
END;
$$;
