# Автогенерация показателей — Примеры использования

Создан в файле `03_indicators_system.sql`

## Обзор

Система автоматической генерации решает проблему создания сотен однотипных показателей (например, "1 место", "2 место"... "8 место" для каждой дисциплины, пола и возраста).

## Компоненты

### 1. Таблица `indicator_templates`

Хранит шаблоны для генерации:
- Диапазон (например, места 1-8)
- Базовый вес
- Шаблоны названия и кода с плейсхолдерами
- Привязки к спорту/дисциплине/полу/возрасту

### 2. Функция `generate_indicators_from_template(template_id, overwrite)`

Генерирует показатели из одного шаблона.

### 3. Функция `generate_all_indicators(overwrite)`

Массовая генерация для всех активных шаблонов.

## Примеры

### Создание шаблона

```sql
-- Создать шаблон для мест 1-8 в профессиональном спорте
INSERT INTO indicator_templates (
    group_id,          -- 5 = "Профессиональный спорт"
    sport_id,          -- 2 = Баскетбол
    discipline_id,     -- 1 = 5x5
    gender_id,         -- 1 = Мужчины
    age_group_id,      -- 8 = Взрослые
    result_type,       -- 'place' = места
    range_from,        -- С 1 места
    range_to,          -- По 8 место
    base_weight,       -- Вес 5.0 за каждое место
    name_pattern,
    code_pattern
) VALUES (
    5, 2, 1, 1, 8,
    'place', 1, 8, 5.0000,
    '{place} место в профессиональной лиге {discipline_name} ({gender_name})',
    'BBL_{discipline_code}_{gender_code}_PRO_PLACE_{place}'
);
```

### Генерация показателей

```sql
-- Сгенерировать 8 показателей (места 1-8)
SELECT * FROM generate_indicators_from_template(1);

-- Результат:
-- action | indicator_code           | indicator_name
-- -------|--------------------------|---------------------------------------
-- INSERT | BBL_5X5_M_PRO_PLACE_1    | 1 место в профессиональной лиге (Мужской)
-- INSERT | BBL_5X5_M_PRO_PLACE_2    | 2 место в профессиональной лиге (Мужской)
-- ...
```

### Массовая генерация

```sql
-- Создать показатели для всех активных шаблонов
SELECT * FROM generate_all_indicators();

-- Результат показывает статистику по каждому шаблону:
-- template_id | total_generated | total_updated | total_skipped
-- ------------|-----------------|---------------|---------------
-- 1           | 8               | 0             | 0
-- 2           | 3               | 0             | 0
```

### Обновление существующих показателей

```sql
-- Перегенерировать с обновлением (если веса изменились)
SELECT * FROM generate_indicators_from_template(1, true);
```

## Типы результатов

- `place` — места (1, 2, 3...) → value_type = 'number'
- `medal` — медали (золото/серебро/бронза) → value_type = 'number'
- `participation` — участие (количество команд/спортсменов) → value_type = 'number'
- `score` — очки → value_type = 'decimal'
- `boolean` — да/нет → value_type = 'boolean'

## Плейсхолдеры

### В `name_pattern` и `description_pattern`:
- `{place}` — номер позиции (1, 2, 3...)
- `{sport_name}` — название спорта
- `{discipline_name}` — название дисциплины
- `{gender_name}` — название пола
- `{age_group_name}` — название возрастной группы

### В `code_pattern`:
- `{place}` — номер позиции
- `{sport_code}` — код спорта
- `{discipline_code}` — код дисциплины  
- `{gender_code}` — код пола
- `{age_group_code}` — код возрастной группы

## Пример полного цикла

```sql
-- 1. Создать шаблон для сборных U18 женщины 3x3 (места 1-3)
INSERT INTO indicator_templates (
    group_id, sport_id, discipline_id, gender_id, age_group_id,
    result_type, range_from, range_to, base_weight,
    name_pattern, code_pattern, description_pattern
) VALUES (
    4, 2, 2, 2, 5,  -- group_id=4 (Сборные команды), age_group_id=5 (U18)
    'place', 1, 3, 10.0000,
    '{place} место сборной {age_group_name} ({gender_name}) в {discipline_name}',
    'BBL_{discipline_code}_{gender_code}_{age_group_code}_NAT_PLACE_{place}',
    'Региональная сборная заняла {place} место на первенстве России'
);

-- 2. Сгенерировать показатели
SELECT * FROM generate_indicators_from_template(CURRVAL('indicator_templates_id_seq'));

-- 3. Проверить созданные показатели
SELECT code, name_ru, weight 
FROM indicators 
WHERE code LIKE 'BBL_3X3_F_U18%'
ORDER BY code;

-- Результат:
-- code                             | name_ru                                    | weight
-- ---------------------------------|--------------------------------------------|---------
-- BBL_3X3_F_U18_NAT_PLACE_1       | 1 место сборной До 18 лет (Женский)...   | 10.0000
-- BBL_3X3_F_U18_NAT_PLACE_2       | 2 место сборной До 18 лет (Женский)...   | 10.0000
-- BBL_3X3_F_U18_NAT_PLACE_3       | 3 место сборной До 18 лет (Женский)...   | 10.0000
```

## Преимущества

✅ **Быстрота**: создание 100+ показателей за секунды  
✅ **Консистентность**: единообразные названия и коды  
✅ **Масштабируемость**: легко добавлять новые дисциплины  
✅ **Гибкость**: возможность ручного редактирования после генерации  
✅ **Версионирование**: поддержка через `indicator_versions`
