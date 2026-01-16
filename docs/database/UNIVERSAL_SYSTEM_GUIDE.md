# Универсальная система индикаторов - Полное руководство

## Обзор системы

Система разработана для универсального использования между разными видами спорта с возможностью:
- ✅ Переиспользования критериев между видами спорта
- ✅ Гибкой настройки весов для каждой организации
- ✅ Автоматического определения сезонов
- ✅ Иерархии событий и турниров
- ✅ Разделения справочников и данных организаций

## Архитектура

### 1. Справочники (Catalogs)

```
indicator_catalog          - Каталог всех возможных индикаторов
├── Универсальные (sport_id = NULL)
│   ├── Маркетинг (сайт, соцсети, логотип)
│   ├── Федерация (аккредитация, программа развития)
│   └── Финансы (бюджет, гранты)
└── Специфичные для спорта
    ├── Баскетбол (площадки, воспитанники, судьи)
    └── Легкая атлетика (манежи, стадионы, медали)

events_catalog             - Каталог событий и турниров
├── Иерархия (parent_event_id)
│   ├── Суперлига
│   │   ├── Регулярный сезон
│   │   └── Плей-офф
│   └── Первенство России U18
│       ├── Межрегиональный этап
│       └── Финал
└── Метаданные (тип, уровень, этап)

seasons                    - Сезоны
├── Календарные (2024, 2025)
└── Спортивные (2024/25, 2025/26)
```

### 2. Данные организаций

```
organization_indicators           - Активные индикаторы организации
├── Выбор из каталога
├── Переопределение весов (custom_weight)
└── Включение/отключение (is_enabled)

organization_indicator_values     - Значения индикаторов
├── По сезонам
├── Разные типы (number, boolean, text)
└── Источник данных (manual, registry, event)

event_results                     - Результаты в событиях
├── По сезонам
├── Места, баллы, количество команд
└── Связь с индикаторами

organization_scores               - Рассчитанные баллы
├── По категориям
├── По сезонам
└── Общий балл
```

## Основные кейсы использования

### Кейс 1: Универсальные маркетинговые критерии

**Проблема:** Критерии "Наличие сайта", "Активность в соцсетях" одинаковы для всех видов спорта

**Решение:**
```sql
-- 1. Создаем ОДИН раз в каталоге (sport_id = NULL)
INSERT INTO indicator_catalog (category, code, name_ru, value_type, default_weight, sport_id)
VALUES ('marketing', 'MARKETING_WEBSITE', 'Наличие сайта', 'boolean', 0.04, NULL);

-- 2. РФБ активирует
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
VALUES (1, (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_WEBSITE'), true);

-- 3. ВЛФА тоже активирует, но с другим весом
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled, custom_weight)
VALUES (2, (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_WEBSITE'), true, 0.06);

-- 4. Обе организации вносят данные
INSERT INTO organization_indicator_values (organization_id, indicator_catalog_id, season_id, value_boolean)
VALUES 
  (50, (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_WEBSITE'), 
   (SELECT id FROM seasons WHERE code = '2024'), true),  -- Московская область (РФБ)
  (40, (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_WEBSITE'), 
   (SELECT id FROM seasons WHERE code = '2024'), true);  -- Москва (ВЛФА)
```

**Результат:** Один критерий используется двумя организациями с разными весами

### Кейс 2: Специфичные критерии для баскетбола

**Проблема:** Площадки 3х3 есть только в баскетболе

**Решение:**
```sql
-- 1. Создаем в каталоге с привязкой к баскетболу
INSERT INTO indicator_catalog (category, code, name_ru, value_type, default_weight, sport_id, discipline_id)
VALUES ('infrastructure', 'BBL_COURTS_3X3', 'Площадки 3х3', 'number', 0.10, 10, 219);

-- 2. Только РФБ может активировать (ВЛФА не увидит)
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
VALUES (1, (SELECT id FROM indicator_catalog WHERE code = 'BBL_COURTS_3X3'), true);

-- 3. РФБ вносит данные
INSERT INTO organization_indicator_values (organization_id, indicator_catalog_id, season_id, value_number)
VALUES (50, (SELECT id FROM indicator_catalog WHERE code = 'BBL_COURTS_3X3'), 
        (SELECT id FROM seasons WHERE code = '2024'), 15);
```

**Результат:** Критерий доступен только для баскетбола

### Кейс 3: Иерархия событий

**Проблема:** Суперлига состоит из регулярного сезона и плей-офф

**Решение:**
```sql
-- 1. Создаем родительское событие
INSERT INTO events_catalog (code, name_ru, event_type, level, sport_id)
VALUES ('BBL_SUPERLEAGUE_M', 'Суперлига (мужчины)', 'league', 'national', 10)
RETURNING id;  -- Допустим, вернул id=100

-- 2. Создаем дочерние события
INSERT INTO events_catalog (parent_event_id, code, name_ru, event_type, level, stage, sport_id)
VALUES 
  (100, 'BBL_SUPERLEAGUE_M_REGULAR', 'Суперлига. Регулярный сезон', 'league', 'national', 'regular_season', 10),
  (100, 'BBL_SUPERLEAGUE_M_PLAYOFF', 'Суперлига. Плей-офф', 'league', 'national', 'playoff', 10);

-- 3. Фиксируем результаты на разных этапах
INSERT INTO event_results (event_id, organization_id, season_id, place)
VALUES 
  ((SELECT id FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M_REGULAR'), 50, 
   (SELECT id FROM seasons WHERE code = '2024'), 5),  -- 5 место в регулярке
  ((SELECT id FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M_PLAYOFF'), 50, 
   (SELECT id FROM seasons WHERE code = '2024'), 3);  -- 3 место в плей-офф

-- 4. Запрос иерархии
WITH RECURSIVE event_tree AS (
    SELECT id, parent_event_id, code, name_ru, 0 as level
    FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M'
    UNION ALL
    SELECT ec.id, ec.parent_event_id, ec.code, ec.name_ru, et.level + 1
    FROM events_catalog ec
    JOIN event_tree et ON ec.parent_event_id = et.id
)
SELECT REPEAT('  ', level) || name_ru as hierarchy FROM event_tree;
```

**Результат:**
```
Суперлига (мужчины)
  Суперлига. Регулярный сезон
  Суперлига. Плей-офф
```

### Кейс 4: Автоматическое определение сезона

**Проблема:** При вводе данных нужно каждый раз указывать сезон

**Решение:**
```sql
-- Сейчас январь 2025 года

-- 1. Вставляем результат БЕЗ указания сезона
INSERT INTO event_results (event_id, organization_id, place)
VALUES (100, 50, 3);
-- Триггер автоматически определит сезон 2024/25 или 2025

-- 2. Или указываем дату события в метаданных
INSERT INTO event_results (event_id, organization_id, place, metadata)
VALUES (100, 50, 3, '{"event_date": "2024-10-15"}');
-- Триггер определит сезон 2024/25 по дате из метаданных

-- 3. Проверяем текущий сезон
SELECT * FROM get_current_season();
```

**Результат:** Сезон присваивается автоматически

### Кейс 5: Организация выбирает только нужные критерии

**Проблема:** В каталоге 100+ критериев, но организации нужны только некоторые

**Решение:**
```sql
-- РФБ выбирает только маркетинг и инфраструктуру баскетбола
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true
FROM indicator_catalog
WHERE (category = 'marketing' AND sport_id IS NULL)
   OR (category = 'infrastructure' AND sport_id = 10);

-- ВЛФА выбирает маркетинг и инфраструктуру легкой атлетики
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 2, id, true
FROM indicator_catalog
WHERE (category = 'marketing' AND sport_id IS NULL)
   OR (category = 'infrastructure' AND sport_id = 3);

-- Запрос: какие критерии использует РФБ?
SELECT 
    ic.code,
    ic.name_ru,
    ic.category,
    COALESCE(oi.custom_weight, ic.default_weight) as effective_weight
FROM organization_indicators oi
JOIN indicator_catalog ic ON ic.id = oi.indicator_catalog_id
WHERE oi.organization_id = 1 AND oi.is_enabled = true;
```

**Результат:** Каждая организация видит только свои критерии

### Кейс 6: Связь событий с индикаторами

**Проблема:** Участие в Суперлиге должно давать баллы

**Решение:**
```sql
-- 1. Создаем индикатор "Команды в профессиональных лигах"
INSERT INTO indicator_catalog (category, code, name_ru, value_type, default_weight, sport_id)
VALUES ('achievements', 'BBL_TEAMS_PRO_LEAGUES', 'Команды в проф. лигах', 'number', 0.5, 10)
RETURNING id;  -- id=200

-- 2. Связываем Суперлигу с индикатором
INSERT INTO event_indicator_mapping (event_id, indicator_catalog_id, weight_multiplier)
VALUES (100, 200, 1.0);  -- Участие = 1.0x вес

-- 3. Призовые места (1-3) дают удвоенный вес
INSERT INTO event_indicator_mapping (event_id, indicator_catalog_id, place_from, place_to, weight_multiplier)
VALUES (100, 200, 1, 3, 2.0);  -- Призовое место = 2.0x вес

-- 4. Фиксируем результат
INSERT INTO event_results (event_id, organization_id, season_id, place, team_count)
VALUES (100, 50, (SELECT id FROM seasons WHERE code = '2024'), 3, 1);

-- 5. Автоматически создается значение индикатора
INSERT INTO organization_indicator_values (
    organization_id, indicator_catalog_id, season_id, value_number, 
    source, event_result_id
)
VALUES (
    50, 200, (SELECT id FROM seasons WHERE code = '2024'), 1,
    'event', (SELECT id FROM event_results WHERE event_id = 100 AND organization_id = 50)
);
```

**Результат:** Результаты в событиях автоматически влияют на индикаторы

### Кейс 7: Сравнение организаций разных видов спорта

**Проблема:** Нужно сравнить маркетинг РФБ и ВЛФА

**Решение:**
```sql
SELECT 
    o.name_ru as organization,
    ic.name_ru as indicator,
    COALESCE(oi.custom_weight, ic.default_weight) as weight,
    oiv.value_boolean,
    oiv.value_number,
    s.code as season
FROM organizations o
JOIN organization_indicators oi ON oi.organization_id = o.id
JOIN indicator_catalog ic ON ic.id = oi.indicator_catalog_id
LEFT JOIN organization_indicator_values oiv ON oiv.organization_id = o.id 
    AND oiv.indicator_catalog_id = ic.id
LEFT JOIN seasons s ON s.id = oiv.season_id
WHERE o.id IN (1, 2)  -- РФБ и ВЛФА
  AND ic.category = 'marketing'
  AND ic.sport_id IS NULL  -- Только универсальные
  AND s.code = '2024'
ORDER BY o.name_ru, ic.code;
```

**Результат:** Видим маркетинговые показатели обеих организаций

### Кейс 8: Расчет баллов организации

**Проблема:** Нужно рассчитать общий балл организации за сезон

**Решение:**
```sql
-- Функция расчета баллов (упрощенная версия)
CREATE OR REPLACE FUNCTION calculate_organization_score(
    p_organization_id INTEGER,
    p_season_id INTEGER
)
RETURNS NUMERIC AS $$
DECLARE
    v_total_score NUMERIC := 0;
    v_indicator RECORD;
BEGIN
    FOR v_indicator IN 
        SELECT 
            ic.id,
            ic.value_type,
            COALESCE(oi.custom_weight, ic.default_weight) as weight,
            ic.use_population,
            oiv.value_number,
            oiv.value_boolean
        FROM organization_indicators oi
        JOIN indicator_catalog ic ON ic.id = oi.indicator_catalog_id
        LEFT JOIN organization_indicator_values oiv ON oiv.indicator_catalog_id = ic.id
            AND oiv.organization_id = p_organization_id
            AND oiv.season_id = p_season_id
        WHERE oi.organization_id = p_organization_id
          AND oi.is_enabled = true
    LOOP
        IF v_indicator.value_type = 'boolean' AND v_indicator.value_boolean THEN
            v_total_score := v_total_score + v_indicator.weight;
        ELSIF v_indicator.value_type = 'number' AND v_indicator.value_number IS NOT NULL THEN
            v_total_score := v_total_score + (v_indicator.value_number * v_indicator.weight);
        END IF;
    END LOOP;
    
    RETURN v_total_score;
END;
$$ LANGUAGE plpgsql;

-- Использование
SELECT calculate_organization_score(50, (SELECT id FROM seasons WHERE code = '2024'));
```

**Результат:** Получаем общий балл организации

## Полезные запросы

### Какие критерии доступны для моего вида спорта?
```sql
SELECT 
    ic.code,
    ic.name_ru,
    ic.category,
    ic.default_weight,
    CASE WHEN ic.sport_id IS NULL THEN 'Универсальный' ELSE s.name_ru END as sport
FROM indicator_catalog ic
LEFT JOIN sports s ON s.id = ic.sport_id
WHERE ic.sport_id IS NULL OR ic.sport_id = 10  -- Баскетбол
ORDER BY ic.category, ic.code;
```

### Какие события доступны для моего вида спорта?
```sql
WITH RECURSIVE event_tree AS (
    SELECT id, parent_event_id, code, name_ru, 0 as level
    FROM events_catalog
    WHERE sport_id = 10 AND parent_event_id IS NULL
    
    UNION ALL
    
    SELECT ec.id, ec.parent_event_id, ec.code, ec.name_ru, et.level + 1
    FROM events_catalog ec
    JOIN event_tree et ON ec.parent_event_id = et.id
)
SELECT 
    REPEAT('  ', level) || name_ru as event_hierarchy,
    code
FROM event_tree
ORDER BY level, code;
```

### Какой сейчас активный сезон?
```sql
SELECT * FROM v_current_seasons;
```

### Результаты моей организации за сезон
```sql
SELECT 
    ec.name_ru as event,
    er.place,
    er.team_count,
    er.points,
    s.code as season
FROM event_results er
JOIN events_catalog ec ON ec.id = er.event_id
JOIN seasons s ON s.id = er.season_id
WHERE er.organization_id = 50
  AND s.code = '2024'
ORDER BY ec.name_ru;
```

### Топ-10 организаций по баллам
```sql
SELECT 
    o.name_ru,
    os.total_score,
    os.score_marketing,
    os.score_infrastructure,
    os.score_achievements,
    s.code as season
FROM organization_scores os
JOIN organizations o ON o.id = os.organization_id
JOIN seasons s ON s.id = os.season_id
WHERE s.code = '2024'
ORDER BY os.total_score DESC
LIMIT 10;
```

## Преимущества системы

| Преимущество | Описание |
|--------------|----------|
| **Универсальность** | Один критерий для всех видов спорта |
| **Гибкость** | Организация выбирает нужные критерии и веса |
| **Масштабируемость** | Легко добавить новый вид спорта |
| **Разделение данных** | Справочники отдельно от данных организаций |
| **Автоматизация** | Автоопределение сезонов, автогенерация |
| **Иерархия** | События имеют структуру (этапы турниров) |
| **Межспортивный анализ** | Можно сравнивать разные виды спорта |
| **История** | Данные по сезонам, версионирование |

## Недостатки и ограничения

| Недостаток | Решение |
|------------|---------|
| Сложность структуры | Подробная документация и примеры |
| Много таблиц | Views для упрощения запросов |
| Производительность при большом объеме | Индексы, партиционирование по сезонам |
| Миграция старых данных | Скрипты миграции |

## Следующие шаги

1. ✅ Создать таблицы (09_universal_indicators_system.sql)
2. ✅ Создать утилиты для сезонов (10_seasons_utilities.sql)
3. ⏳ Создать представления (views) для удобного доступа
4. ⏳ Написать функции расчета баллов
5. ⏳ Создать скрипты миграции данных
6. ⏳ Добавить валидацию данных
7. ⏳ Создать API для работы с системой
