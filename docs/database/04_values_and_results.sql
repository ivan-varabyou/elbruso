-- ================================
-- Блок 4: Значения и результаты (Values & Results)
-- ================================
-- Создание таблиц для хранения фактических значений показателей и расчетных результатов

-- ================================
-- 1. Значения показателей
-- ================================
CREATE TABLE indicator_values (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    federation_id INTEGER REFERENCES federations(id) ON DELETE CASCADE,
    region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
    indicator_id INTEGER NOT NULL REFERENCES indicators(id) ON DELETE CASCADE,
    season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
    value NUMERIC(14,4),
    value_text TEXT,
    comment TEXT,
    data_source_id INTEGER REFERENCES data_sources(id),
    verified BOOLEAN DEFAULT FALSE,
    verified_by VARCHAR(200),
    verified_at TIMESTAMP,
    created_by VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(200),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_entity_link CHECK (
        (organization_id IS NOT NULL AND federation_id IS NULL AND region_id IS NULL) OR 
        (organization_id IS NULL AND federation_id IS NOT NULL AND region_id IS NULL) OR
        (organization_id IS NULL AND federation_id IS NULL AND region_id IS NOT NULL)
    ),
    UNIQUE(organization_id, indicator_id, season_id),
    UNIQUE(federation_id, indicator_id, season_id),
    UNIQUE(region_id, indicator_id, season_id)
);

-- Индексы
CREATE INDEX idx_indicator_values_organization ON indicator_values(organization_id);
CREATE INDEX idx_indicator_values_federation ON indicator_values(federation_id);
CREATE INDEX idx_indicator_values_region ON indicator_values(region_id);
CREATE INDEX idx_indicator_values_indicator ON indicator_values(indicator_id);
CREATE INDEX idx_indicator_values_season ON indicator_values(season_id);
CREATE INDEX idx_indicator_values_lookup_org ON indicator_values(organization_id, season_id);
CREATE INDEX idx_indicator_values_lookup_fed ON indicator_values(federation_id, season_id);
CREATE INDEX idx_indicator_values_lookup_reg ON indicator_values(region_id, season_id);

-- Комментарии
COMMENT ON TABLE indicator_values IS 'Фактические значения показателей по регионам/федерациям и сезонам (замена Excel)';
COMMENT ON COLUMN indicator_values.value IS 'Числовое значение показателя';
COMMENT ON COLUMN indicator_values.value_text IS 'Текстовое значение (для показателей типа text)';
COMMENT ON COLUMN indicator_values.verified IS 'Проверено ли значение администратором';
COMMENT ON COLUMN indicator_values.comment IS 'Комментарий к значению';

-- ================================
-- 2. Итоговые баллы федераций
-- ================================
CREATE TABLE federation_scores (
    id SERIAL PRIMARY KEY,
    federation_id INTEGER REFERENCES federations(id) ON DELETE CASCADE,
    region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
    season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
    total_score NUMERIC(14,4) NOT NULL DEFAULT 0,
    total_score_normalized NUMERIC(14,4),
    rank_overall INTEGER,
    rank_in_district INTEGER,
    population INTEGER,
    coefficient NUMERIC(10,6),
    metadata JSONB DEFAULT '{}'::jsonb,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_fed_score_federation_or_region CHECK (
        (federation_id IS NOT NULL AND region_id IS NULL) OR 
        (federation_id IS NULL AND region_id IS NOT NULL)
    ),
    UNIQUE(federation_id, season_id),
    UNIQUE(region_id, season_id)
);

-- Индексы
CREATE INDEX idx_federation_scores_federation ON federation_scores(federation_id);
CREATE INDEX idx_federation_scores_region ON federation_scores(region_id);
CREATE INDEX idx_federation_scores_season ON federation_scores(season_id);
CREATE INDEX idx_federation_scores_total ON federation_scores(total_score DESC);
CREATE INDEX idx_federation_scores_rank ON federation_scores(rank_overall);

-- Комментарии
COMMENT ON TABLE federation_scores IS 'Итоговые расчетные баллы и рейтинги федераций/регионов по сезонам';
COMMENT ON COLUMN federation_scores.total_score IS 'Общая сумма баллов';
COMMENT ON COLUMN federation_scores.total_score_normalized IS 'Нормализованная сумма (с учетом населения)';
COMMENT ON COLUMN federation_scores.rank_overall IS 'Место в общем рейтинге';
COMMENT ON COLUMN federation_scores.rank_in_district IS 'Место в рейтинге федерального округа';
COMMENT ON COLUMN federation_scores.coefficient IS 'Коэффициент (балл на 100k населения)';
COMMENT ON COLUMN federation_scores.metadata IS 'JSON с детализацией по группам показателей';

-- ================================
-- 3. Детализация баллов по группам
-- ================================
CREATE TABLE federation_score_details (
    id SERIAL PRIMARY KEY,
    federation_score_id INTEGER NOT NULL REFERENCES federation_scores(id) ON DELETE CASCADE,
    indicator_group_id INTEGER NOT NULL REFERENCES indicator_groups(id) ON DELETE CASCADE,
    score NUMERIC(14,4) NOT NULL DEFAULT 0,
    score_normalized NUMERIC(14,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(federation_score_id, indicator_group_id)
);

-- Индексы
CREATE INDEX idx_federation_score_details_score ON federation_score_details(federation_score_id);
CREATE INDEX idx_federation_score_details_group ON federation_score_details(indicator_group_id);

-- Комментарии
COMMENT ON TABLE federation_score_details IS 'Детализация баллов федерации по группам показателей';
COMMENT ON COLUMN federation_score_details.score IS 'Сумма баллов по данной группе показателей';
COMMENT ON COLUMN federation_score_details.score_normalized IS 'Нормализованная сумма (с учетом населения)';

-- ================================
-- 4. Аудит изменений (опционально)
-- ================================
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    changed_by VARCHAR(200),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    CONSTRAINT chk_action CHECK (action IN ('INSERT', 'UPDATE', 'DELETE'))
);

-- Индексы
CREATE INDEX idx_audit_log_table ON audit_log(table_name);
CREATE INDEX idx_audit_log_record ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_changed_by ON audit_log(changed_by);
CREATE INDEX idx_audit_log_changed_at ON audit_log(changed_at DESC);
CREATE INDEX idx_audit_log_action ON audit_log(action);

-- Комментарии
COMMENT ON TABLE audit_log IS 'Лог всех изменений в системе для аудита и отслеживания';
COMMENT ON COLUMN audit_log.table_name IS 'Название таблицы где произошло изменение';
COMMENT ON COLUMN audit_log.record_id IS 'ID записи которая была изменена';
COMMENT ON COLUMN audit_log.action IS 'Тип операции: INSERT, UPDATE, DELETE';
COMMENT ON COLUMN audit_log.old_values IS 'Старые значения полей (для UPDATE и DELETE)';
COMMENT ON COLUMN audit_log.new_values IS 'Новые значения полей (для INSERT и UPDATE)';

-- ================================
-- Триггер-функция для автоматического аудита (пример)
-- ================================
CREATE OR REPLACE FUNCTION audit_trigger_func() 
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', row_to_json(NEW), current_user);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW), current_user);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD), current_user);
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Пример подключения триггера к таблице indicator_values
-- CREATE TRIGGER audit_indicator_values
--     AFTER INSERT OR UPDATE OR DELETE ON indicator_values
--     FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

-- ================================
-- Функция для расчета баллов федерации
-- ================================
CREATE OR REPLACE FUNCTION calculate_federation_score(
    p_federation_id INTEGER,
    p_season_id INTEGER
) RETURNS NUMERIC AS $$
DECLARE
    v_total_score NUMERIC(14,4) := 0;
    v_population INTEGER;
    v_region_id INTEGER;
BEGIN
    -- Получаем регион и население федерации
    SELECT f.region_id INTO v_region_id
    FROM federations f
    WHERE f.id = p_federation_id;
    
    IF v_region_id IS NOT NULL THEN
        SELECT rp.population INTO v_population
        FROM region_population rp
        WHERE rp.region_id = v_region_id
          AND rp.year = (SELECT EXTRACT(YEAR FROM s.start_date)::INTEGER 
                         FROM seasons s WHERE s.id = p_season_id)
        LIMIT 1;
    END IF;
    
    -- Суммируем баллы по всем показателям
    SELECT COALESCE(SUM(
        CASE 
            WHEN i.use_population AND v_population > 0 THEN
                (iv.value * COALESCE(fi.custom_weight, i.weight) / v_population * 100000)
            ELSE
                (iv.value * COALESCE(fi.custom_weight, i.weight))
        END
    ), 0) INTO v_total_score
    FROM indicator_values iv
    JOIN indicators i ON i.id = iv.indicator_id
    LEFT JOIN federation_indicators fi ON fi.federation_id = p_federation_id 
        AND fi.indicator_id = i.id
    WHERE iv.federation_id = p_federation_id
      AND iv.season_id = p_season_id
      AND i.is_active = true
      AND (fi.is_enabled IS NULL OR fi.is_enabled = true);
    
    RETURN v_total_score;
END;
$$ LANGUAGE plpgsql;

-- Комментарии к функции
COMMENT ON FUNCTION calculate_federation_score IS 'Расчет итогового балла федерации с учетом весов показателей и населения региона';
