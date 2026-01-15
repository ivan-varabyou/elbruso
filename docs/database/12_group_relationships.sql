-- ================================
-- Блок 12: Связи групп индикаторов (Many-to-Many)
-- ================================
-- Позволяет одной группе принадлежать нескольким родительским группам
-- Например, "Маркетинг" может быть и в "Профессиональный спорт" и в "Общие региональные показатели"

-- ================================
-- 1. ТАБЛИЦА СВЯЗЕЙ ГРУПП (Many-to-Many)
-- ================================

CREATE TABLE indicator_group_relationships (
    id SERIAL PRIMARY KEY,
    parent_group_id INTEGER NOT NULL REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    child_group_id INTEGER NOT NULL REFERENCES indicator_groups_catalog(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Нельзя связать группу саму с собой
    CONSTRAINT chk_igr_not_self CHECK (parent_group_id != child_group_id),
    
    -- Уникальная связь
    UNIQUE(parent_group_id, child_group_id)
);

CREATE INDEX idx_igr_parent ON indicator_group_relationships(parent_group_id);
CREATE INDEX idx_igr_child ON indicator_group_relationships(child_group_id);
CREATE INDEX idx_igr_active ON indicator_group_relationships(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE indicator_group_relationships IS 'Связи между группами индикаторов (many-to-many). Позволяет одной группе принадлежать нескольким родительским группам';

-- ================================
-- 2. ФУНКЦИЯ: Проверка циклических зависимостей
-- ================================

CREATE OR REPLACE FUNCTION check_group_cycle(
    p_parent_id INTEGER,
    p_child_id INTEGER
)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_cycle_exists BOOLEAN;
BEGIN
    -- Проверяем, не создаст ли новая связь цикл
    -- Цикл возникает, если p_parent_id является потомком p_child_id
    WITH RECURSIVE group_tree AS (
        -- Начинаем с предполагаемого потомка
        SELECT child_group_id as group_id, 1 as level
        FROM indicator_group_relationships
        WHERE parent_group_id = p_child_id
        
        UNION ALL
        
        -- Рекурсивно идем вниз по дереву
        SELECT igr.child_group_id, gt.level + 1
        FROM indicator_group_relationships igr
        JOIN group_tree gt ON gt.group_id = igr.parent_group_id
        WHERE gt.level < 10  -- Ограничение глубины для безопасности
    )
    SELECT EXISTS(
        SELECT 1 FROM group_tree WHERE group_id = p_parent_id
    ) INTO v_cycle_exists;
    
    RETURN v_cycle_exists;
END;
$$;

COMMENT ON FUNCTION check_group_cycle IS 'Проверяет, создаст ли новая связь циклическую зависимость';

-- ================================
-- 3. ТРИГГЕР: Предотвращение циклов
-- ================================

CREATE OR REPLACE FUNCTION prevent_group_cycle()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF check_group_cycle(NEW.parent_group_id, NEW.child_group_id) THEN
        RAISE EXCEPTION 'Создание связи между группами % и % приведет к циклической зависимости',
            NEW.parent_group_id, NEW.child_group_id;
    END IF;
    
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_group_cycle ON indicator_group_relationships;
CREATE TRIGGER trg_prevent_group_cycle
    BEFORE INSERT OR UPDATE ON indicator_group_relationships
    FOR EACH ROW
    EXECUTE FUNCTION prevent_group_cycle();

-- ================================
-- 4. ПРИМЕРЫ СВЯЗЕЙ ГРУПП
-- ================================

-- Пример 1: Маркетинг принадлежит и "Профессиональному спорту" и "Общим региональным показателям"
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order) VALUES
-- Маркетинг (id=11) -> Профессиональный спорт (id=5)
((SELECT id FROM indicator_groups_catalog WHERE code = 'professional_sport'),
 (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING'),
 10),

-- Маркетинг (id=11) -> Общие региональные показатели (id=2)
((SELECT id FROM indicator_groups_catalog WHERE code = 'regional_general'),
 (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING'),
 20)
ON CONFLICT (parent_group_id, child_group_id) DO NOTHING;

-- Пример 2: Федерация может быть в нескольких местах
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order) VALUES
-- Федерация -> Общие региональные показатели
((SELECT id FROM indicator_groups_catalog WHERE code = 'regional_general'),
 (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_FEDERATION'),
 10)
ON CONFLICT (parent_group_id, child_group_id) DO NOTHING;

-- ================================
-- 5. ПРЕДСТАВЛЕНИЕ: Все связи групп
-- ================================

CREATE OR REPLACE VIEW v_group_relationships AS
SELECT 
    igr.id,
    
    -- Родительская группа
    pg.id as parent_id,
    pg.code as parent_code,
    pg.name_ru as parent_name,
    
    -- Дочерняя группа
    cg.id as child_id,
    cg.code as child_code,
    cg.name_ru as child_name,
    
    igr.sort_order,
    igr.is_active
FROM indicator_group_relationships igr
JOIN indicator_groups_catalog pg ON pg.id = igr.parent_group_id
JOIN indicator_groups_catalog cg ON cg.id = igr.child_group_id
WHERE igr.is_active = TRUE
ORDER BY pg.name_ru, igr.sort_order, cg.name_ru;

COMMENT ON VIEW v_group_relationships IS 'Все активные связи между группами индикаторов';

-- ================================
-- 6. ФУНКЦИЯ: Получить все родительские группы
-- ================================

CREATE OR REPLACE FUNCTION get_parent_groups(p_group_id INTEGER)
RETURNS TABLE (
    group_id INTEGER,
    group_code VARCHAR,
    group_name VARCHAR,
    level INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE parent_tree AS (
        -- Прямые родители
        SELECT 
            igr.parent_group_id as group_id,
            ig.code as group_code,
            ig.name_ru as group_name,
            1 as level
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.parent_group_id
        WHERE igr.child_group_id = p_group_id
          AND igr.is_active = TRUE
        
        UNION ALL
        
        -- Родители родителей
        SELECT 
            igr.parent_group_id,
            ig.code,
            ig.name_ru,
            pt.level + 1
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.parent_group_id
        JOIN parent_tree pt ON pt.group_id = igr.child_group_id
        WHERE igr.is_active = TRUE
          AND pt.level < 10  -- Ограничение глубины
    )
    SELECT DISTINCT * FROM parent_tree
    ORDER BY level, group_name;
END;
$$;

COMMENT ON FUNCTION get_parent_groups IS 'Получает все родительские группы (включая родителей родителей)';

-- ================================
-- 7. ФУНКЦИЯ: Получить все дочерние группы
-- ================================

CREATE OR REPLACE FUNCTION get_child_groups(p_group_id INTEGER)
RETURNS TABLE (
    group_id INTEGER,
    group_code VARCHAR,
    group_name VARCHAR,
    level INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE child_tree AS (
        -- Прямые потомки
        SELECT 
            igr.child_group_id as group_id,
            ig.code as group_code,
            ig.name_ru as group_name,
            1 as level
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.child_group_id
        WHERE igr.parent_group_id = p_group_id
          AND igr.is_active = TRUE
        
        UNION ALL
        
        -- Потомки потомков
        SELECT 
            igr.child_group_id,
            ig.code,
            ig.name_ru,
            ct.level + 1
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.child_group_id
        JOIN child_tree ct ON ct.group_id = igr.parent_group_id
        WHERE igr.is_active = TRUE
          AND ct.level < 10  -- Ограничение глубины
    )
    SELECT DISTINCT * FROM child_tree
    ORDER BY level, group_name;
END;
$$;

COMMENT ON FUNCTION get_child_groups IS 'Получает все дочерние группы (включая потомков потомков)';

-- ================================
-- 8. ФУНКЦИЯ: Получить полное дерево группы
-- ================================

CREATE OR REPLACE FUNCTION get_group_tree(p_group_id INTEGER)
RETURNS TABLE (
    group_id INTEGER,
    group_code VARCHAR,
    group_name VARCHAR,
    path TEXT,
    level INTEGER,
    is_current BOOLEAN
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE group_tree AS (
        -- Корень (текущая группа)
        SELECT 
            ig.id as group_id,
            ig.code as group_code,
            ig.name_ru as group_name,
            ig.name_ru::TEXT as path,
            0 as level,
            TRUE as is_current
        FROM indicator_groups_catalog ig
        WHERE ig.id = p_group_id
        
        UNION ALL
        
        -- Дочерние группы
        SELECT 
            igr.child_group_id,
            ig.code,
            ig.name_ru,
            gt.path || ' > ' || ig.name_ru,
            gt.level + 1,
            FALSE
        FROM indicator_group_relationships igr
        JOIN indicator_groups_catalog ig ON ig.id = igr.child_group_id
        JOIN group_tree gt ON gt.group_id = igr.parent_group_id
        WHERE igr.is_active = TRUE
          AND gt.level < 10
    )
    SELECT * FROM group_tree
    ORDER BY level, group_name;
END;
$$;

COMMENT ON FUNCTION get_group_tree IS 'Получает полное дерево группы (текущая группа + все потомки)';

-- ================================
-- 9. ПРЕДСТАВЛЕНИЕ: Индикаторы с учетом связей групп
-- ================================

CREATE OR REPLACE VIEW v_indicators_with_group_paths AS
WITH RECURSIVE group_paths AS (
    -- Прямая связь индикатора с группой
    SELECT 
        icg.indicator_catalog_id,
        icg.group_catalog_id,
        ig.code as group_code,
        ig.name_ru as group_name,
        ig.name_ru::TEXT as path,
        0 as level
    FROM indicator_catalog_groups icg
    JOIN indicator_groups_catalog ig ON ig.id = icg.group_catalog_id
    
    UNION ALL
    
    -- Родительские группы
    SELECT 
        gp.indicator_catalog_id,
        igr.parent_group_id,
        ig.code,
        ig.name_ru,
        ig.name_ru || ' > ' || gp.path,
        gp.level + 1
    FROM group_paths gp
    JOIN indicator_group_relationships igr ON igr.child_group_id = gp.group_catalog_id
    JOIN indicator_groups_catalog ig ON ig.id = igr.parent_group_id
    WHERE igr.is_active = TRUE
      AND gp.level < 10
)
SELECT 
    ic.id as indicator_id,
    ic.code as indicator_code,
    ic.name_ru as indicator_name,
    gp.group_catalog_id,
    gp.group_code,
    gp.group_name,
    gp.path,
    gp.level
FROM indicator_catalog ic
JOIN group_paths gp ON gp.indicator_catalog_id = ic.id
ORDER BY ic.code, gp.level DESC, gp.path;

COMMENT ON VIEW v_indicators_with_group_paths IS 'Индикаторы со всеми путями групп (включая родительские)';

-- ================================
-- 10. ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
-- ================================

-- Пример 1: Какие родительские группы у "Маркетинг"?
/*
SELECT * FROM get_parent_groups(
    (SELECT id FROM indicator_groups_catalog WHERE code = 'UNIVERSAL_MARKETING')
);

Результат:
group_id | group_code           | group_name                       | level
---------|----------------------|----------------------------------|-------
    5    | professional_sport   | Профессиональный спорт          | 1
    2    | regional_general     | Общие региональные показатели   | 1
*/

-- Пример 2: Какие дочерние группы у "Профессиональный спорт"?
/*
SELECT * FROM get_child_groups(
    (SELECT id FROM indicator_groups_catalog WHERE code = 'professional_sport')
);

Результат:
group_id | group_code           | group_name    | level
---------|----------------------|---------------|-------
   11    | UNIVERSAL_MARKETING  | Маркетинг     | 1
*/

-- Пример 3: Полное дерево "Профессиональный спорт"
/*
SELECT 
    REPEAT('  ', level) || group_name as hierarchy,
    path
FROM get_group_tree(
    (SELECT id FROM indicator_groups_catalog WHERE code = 'professional_sport')
);

Результат:
hierarchy                      | path
-------------------------------|----------------------------------
Профессиональный спорт         | Профессиональный спорт
  Маркетинг                    | Профессиональный спорт > Маркетинг
*/

-- Пример 4: Все связи групп
/*
SELECT 
    parent_name,
    child_name,
    sort_order
FROM v_group_relationships
ORDER BY parent_name, sort_order;

Результат:
parent_name                     | child_name | sort_order
--------------------------------|------------|------------
Общие региональные показатели   | Маркетинг  | 20
Общие региональные показатели   | Федерация  | 10
Профессиональный спорт          | Маркетинг  | 10
*/

-- Пример 5: Индикатор "Наличие сайта" в каких группах?
/*
SELECT DISTINCT
    group_name,
    path,
    level
FROM v_indicators_with_group_paths
WHERE indicator_code = 'MARKETING_WEBSITE'
ORDER BY level DESC, path;

Результат:
group_name                      | path                                                    | level
--------------------------------|---------------------------------------------------------|-------
Профессиональный спорт          | Профессиональный спорт > Маркетинг                     | 1
Общие региональные показатели   | Общие региональные показатели > Маркетинг              | 1
Маркетинг                       | Маркетинг                                              | 0
*/

-- ================================
-- 11. МИГРАЦИЯ СУЩЕСТВУЮЩИХ ДАННЫХ
-- ================================

-- Если у вас уже есть группы с parent_id, можно мигрировать их в новую систему
/*
INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order)
SELECT 
    parent_id,
    id,
    sort_order
FROM indicator_groups_catalog
WHERE parent_id IS NOT NULL
ON CONFLICT (parent_group_id, child_group_id) DO NOTHING;
*/

-- ================================
-- 12. ФУНКЦИЯ: Добавить связь с проверкой цикла
-- ================================

CREATE OR REPLACE FUNCTION add_group_relationship(
    p_parent_code VARCHAR,
    p_child_code VARCHAR,
    p_sort_order INTEGER DEFAULT 0
)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    v_parent_id INTEGER;
    v_child_id INTEGER;
    v_result TEXT;
BEGIN
    -- Получаем ID групп
    SELECT id INTO v_parent_id FROM indicator_groups_catalog WHERE code = p_parent_code;
    SELECT id INTO v_child_id FROM indicator_groups_catalog WHERE code = p_child_code;
    
    IF v_parent_id IS NULL THEN
        RETURN 'ERROR: Родительская группа ' || p_parent_code || ' не найдена';
    END IF;
    
    IF v_child_id IS NULL THEN
        RETURN 'ERROR: Дочерняя группа ' || p_child_code || ' не найдена';
    END IF;
    
    -- Проверяем цикл
    IF check_group_cycle(v_parent_id, v_child_id) THEN
        RETURN 'ERROR: Создание связи приведет к циклической зависимости';
    END IF;
    
    -- Добавляем связь
    INSERT INTO indicator_group_relationships (parent_group_id, child_group_id, sort_order)
    VALUES (v_parent_id, v_child_id, p_sort_order)
    ON CONFLICT (parent_group_id, child_group_id) DO UPDATE
    SET sort_order = p_sort_order;
    
    RETURN 'SUCCESS: Связь создана между ' || p_parent_code || ' и ' || p_child_code;
END;
$$;

COMMENT ON FUNCTION add_group_relationship IS 'Безопасно добавляет связь между группами с проверкой циклов';

-- Пример использования:
/*
SELECT add_group_relationship('professional_sport', 'UNIVERSAL_MARKETING', 10);
SELECT add_group_relationship('regional_general', 'UNIVERSAL_MARKETING', 20);
*/

-- ================================
-- 13. ПРЕДСТАВЛЕНИЕ: Граф групп для визуализации
-- ================================

CREATE OR REPLACE VIEW v_group_graph AS
SELECT 
    igr.id,
    pg.code as from_code,
    pg.name_ru as from_name,
    cg.code as to_code,
    cg.name_ru as to_name,
    igr.sort_order,
    'parent_child' as relationship_type
FROM indicator_group_relationships igr
JOIN indicator_groups_catalog pg ON pg.id = igr.parent_group_id
JOIN indicator_groups_catalog cg ON cg.id = igr.child_group_id
WHERE igr.is_active = TRUE;

COMMENT ON VIEW v_group_graph IS 'Граф связей групп для визуализации (например, в GraphViz)';

-- ================================
-- КОММЕНТАРИИ
-- ================================

COMMENT ON TABLE indicator_group_relationships IS 
'Связи между группами индикаторов (many-to-many). 
Позволяет одной группе принадлежать нескольким родительским группам.
Например, "Маркетинг" может быть и в "Профессиональный спорт" и в "Общие региональные показатели"';

-- ================================
-- ПРИМЕРЫ РЕАЛЬНЫХ КЕЙСОВ
-- ================================

/*
КЕЙС 1: Маркетинг важен везде
-------------------------------
Группа "Маркетинг" должна отображаться в:
- Профессиональный спорт (маркетинг клубов)
- Общие региональные показатели (маркетинг федерации)
- Массовый спорт (маркетинг любительских лиг)

Решение:
SELECT add_group_relationship('professional_sport', 'UNIVERSAL_MARKETING', 10);
SELECT add_group_relationship('regional_general', 'UNIVERSAL_MARKETING', 20);
SELECT add_group_relationship('mass_sport', 'UNIVERSAL_MARKETING', 30);


КЕЙС 2: Инфраструктура в разных контекстах
-------------------------------------------
Группа "Спортивные объекты" нужна в:
- Общие региональные показатели (все объекты региона)
- Профессиональный спорт (арены для проф команд)
- Резерв (базы подготовки)

Решение:
SELECT add_group_relationship('regional_general', 'infrastructure', 10);
SELECT add_group_relationship('professional_sport', 'infrastructure', 20);
SELECT add_group_relationship('reserve', 'infrastructure', 30);


КЕЙС 3: Финансы на разных уровнях
----------------------------------
Группа "Финансы" важна для:
- Федерация (бюджет федерации)
- Профессиональный спорт (бюджеты клубов)

Решение:
SELECT add_group_relationship('UNIVERSAL_FEDERATION', 'UNIVERSAL_FINANCE', 10);
SELECT add_group_relationship('professional_sport', 'UNIVERSAL_FINANCE', 20);
*/
