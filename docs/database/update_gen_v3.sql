CREATE OR REPLACE FUNCTION generate_indicators_from_template_v3(
    p_template_id INTEGER,
    p_context JSONB DEFAULT '{}'::jsonb,
    p_overwrite BOOLEAN DEFAULT FALSE
)
RETURNS TABLE (
    action TEXT,
    indicator_code VARCHAR,
    indicator_name TEXT,
    params JSONB
) LANGUAGE plpgsql AS $$
DECLARE
    v_sport_id INTEGER;
    v_category_id INTEGER;
    v_name_pattern TEXT;
    v_code_pattern TEXT;
    v_unit_id INTEGER;
    v_is_higher_better BOOLEAN;
    v_param RECORD;
    v_inst_name TEXT;
    v_inst_code TEXT;
    v_param_json JSONB;
    v_existing_id INTEGER;
    v_year TEXT;
    v_season TEXT;
BEGIN
    -- Get template details
    SELECT sport_id, category_id, name_pattern, code_pattern, unit_id, is_higher_better
    INTO v_sport_id, v_category_id, v_name_pattern, v_code_pattern, v_unit_id, v_is_higher_better
    FROM indicator_generation_templates
    WHERE id = p_template_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Template % not found', p_template_id;
    END IF;

    -- Extract context
    v_year := COALESCE(p_context->>'year', '');
    v_season := COALESCE(p_context->>'season', '');

    -- Loop through all parameter combinations for this template
    FOR v_param IN (
        SELECT 
            gp.gender,
            gp.age_min,
            gp.age_max,
            gp.place_id,
            p.name as place_name,
            p.code as place_code
        FROM template_generation_params gp
        LEFT JOIN places p ON gp.place_id = p.id
        WHERE gp.template_id = p_template_id
    ) LOOP
        -- Build instance name and code
        v_inst_name := v_name_pattern;
        v_inst_code := v_code_pattern;

        -- Replace patterns
        v_inst_name := REPLACE(v_inst_name, '{gender}', COALESCE(v_param.gender, ''));
        v_inst_name := REPLACE(v_inst_name, '{age}', 
            CASE 
                WHEN v_param.age_min IS NOT NULL AND v_param.age_max IS NOT NULL THEN v_param.age_min::TEXT || '-' || v_param.age_max::TEXT
                WHEN v_param.age_min IS NOT NULL THEN v_param.age_min::TEXT || '+'
                WHEN v_param.age_max IS NOT NULL THEN 'up to ' || v_param.age_max::TEXT
                ELSE ''
            END
        );
        v_inst_name := REPLACE(v_inst_name, '{place}', COALESCE(v_param.place_name, ''));
        v_inst_name := REPLACE(v_inst_name, '{year}', v_year);
        v_inst_name := REPLACE(v_inst_name, '{season}', v_season);
        
        -- Clean up extra spaces
        v_inst_name := REGEXP_REPLACE(v_inst_name, '\s+', ' ', 'g');
        v_inst_name := TRIM(v_inst_name);

        -- Analogous for code
        v_inst_code := REPLACE(v_inst_code, '{gender}', 
            CASE 
                WHEN v_param.gender = 'Male' THEN 'M'
                WHEN v_param.gender = 'Female' THEN 'F'
                ELSE 'U'
            END
        );
        v_inst_code := REPLACE(v_inst_code, '{age}', 
            CASE 
                WHEN v_param.age_min IS NOT NULL AND v_param.age_max IS NOT NULL THEN v_param.age_min::TEXT || '_' || v_param.age_max::TEXT
                WHEN v_param.age_min IS NOT NULL THEN v_param.age_min::TEXT || 'P'
                WHEN v_param.age_max IS NOT NULL THEN 'U' || v_param.age_max::TEXT
                ELSE 'ALL'
            END
        );
        v_inst_code := REPLACE(v_inst_code, '{place}', COALESCE(v_param.place_code, 'UN'));
        v_inst_code := REPLACE(v_inst_code, '{year}', v_year);
        v_inst_code := REPLACE(v_inst_code, '{season}', 
            CASE 
                WHEN UPPER(v_season) = 'SUMMER' THEN 'S'
                WHEN UPPER(v_season) = 'WINTER' THEN 'W'
                ELSE SUBSTRING(v_season, 1, 1)
            END
        );
        
        v_inst_code := UPPER(v_inst_code);
        v_inst_code := REGEXP_REPLACE(v_inst_code, '[^A-Z0-9_]', '', 'g');

        v_param_json := jsonb_build_object(
            'gender', v_param.gender,
            'age_min', v_param.age_min,
            'age_max', v_param.age_max,
            'place_id', v_param.place_id
        );

        -- Check if exists
        SELECT id INTO v_existing_id FROM indicator_catalog WHERE code = v_inst_code;

        IF v_existing_id IS NOT NULL THEN
            IF p_overwrite THEN
                UPDATE indicator_catalog 
                SET 
                    name = v_inst_name,
                    sport_id = v_sport_id,
                    category_id = v_category_id,
                    unit_id = v_unit_id,
                    is_higher_better = v_is_higher_better,
                    updated_at = NOW()
                WHERE id = v_existing_id;
                
                action := 'UPDATED';
            ELSE
                action := 'SKIPPED_EXISTS';
            END IF;
        ELSE
            INSERT INTO indicator_catalog (
                code, name, sport_id, category_id, unit_id, is_higher_better, is_system
            ) VALUES (
                v_inst_code, v_inst_name, v_sport_id, v_category_id, v_unit_id, v_is_higher_better, TRUE
            ) RETURNING id INTO v_existing_id;

            action := 'CREATED';
        END IF;

        -- Record generation link
        INSERT INTO generated_indicators (indicator_id, template_id, generation_params)
        VALUES (v_existing_id, p_template_id, v_param_json)
        ON CONFLICT (indicator_id) DO UPDATE 
        SET template_id = p_template_id, generation_params = v_param_json;

        indicator_code := v_inst_code;
        indicator_name := v_inst_name;
        params := v_param_json;
        RETURN NEXT;
    END LOOP;
END;
$$;
