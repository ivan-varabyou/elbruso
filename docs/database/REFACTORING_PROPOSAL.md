# Предложение по рефакторингу системы индикаторов

## Проблемы текущей системы

1. **Жесткая привязка к спорту**: Критерии создаются отдельно для каждого вида спорта
2. **Дублирование**: Маркетинговые критерии повторяются для разных спортов
3. **Нет гибкости**: Организация не может выбрать только нужные критерии
4. **Смешение сущностей**: События, турниры и критерии оценки в одной таблице

## Предлагаемая архитектура

### 1. Справочник базовых критериев (Reference Indicators)

```
indicator_catalog (справочник критериев)
├── id
├── category (федерация, маркетинг, инфраструктура, спорт_достижения)
├── code (уникальный код)
├── name_ru
├── description
├── value_type (boolean, number, decimal)
├── default_weight (базовый вес по умолчанию)
├── use_population (нормализация на население)
├── sport_id (NULL = универсальный для всех видов спорта)
├── discipline_id (NULL = для всех дисциплин)
└── is_active
```

### 2. Привязка критериев к организации

```
organization_indicators (активные критерии организации)
├── id
├── organization_id
├── indicator_catalog_id
├── custom_weight (NULL = использовать default_weight)
├── is_enabled (организация может отключить критерий)
├── custom_name_ru (NULL = использовать из каталога)
└── notes (комментарии организации)
```

### 3. Группировка критериев

```
indicator_groups_catalog (справочник групп)
├── id
├── parent_id
├── code
├── name_ru
├── sport_id (NULL = универсальная группа)
└── sort_order

indicator_catalog_groups (связь критериев с группами)
├── indicator_catalog_id
├── group_catalog_id
└── sort_order
```

### 4. События и турниры (отдельная сущность)

```
events_catalog (справочник событий/турниров)
├── id
├── code
├── name_ru
├── event_type (championship, cup, league, tournament)
├── level (international, national, regional, local)
├── sport_id
├── discipline_id
├── gender_id
├── age_group_id
└── parent_event_id (для иерархии: ЧР -> Полуфинал -> Финал)

event_results (результаты в событиях)
├── id
├── event_id
├── organization_id
├── season_year
├── place (1, 2, 3...)
├── team_count
├── participants_count
└── points
```

## Примеры использования

### Пример 1: Универсальные маркетинговые критерии

```sql
-- Создаем универсальный критерий (для всех видов спорта)
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight, sport_id
) VALUES (
    'marketing', 
    'FED_WEBSITE', 
    'Наличие активного сайта федерации', 
    'boolean', 
    0.04, 
    NULL  -- NULL = применимо ко всем видам спорта
);

-- РФБ использует этот критерий
INSERT INTO organization_indicators (
    organization_id, indicator_catalog_id, is_enabled
) VALUES (
    1,  -- РФБ
    (SELECT id FROM indicator_catalog WHERE code = 'FED_WEBSITE'),
    true
);

-- Федерация футбола тоже использует
INSERT INTO organization_indicators (
    organization_id, indicator_catalog_id, is_enabled, custom_weight
) VALUES (
    2,  -- РФС
    (SELECT id FROM indicator_catalog WHERE code = 'FED_WEBSITE'),
    true,
    0.05  -- РФС решил дать больший вес
);
```

### Пример 2: Специфичные для баскетбола критерии

```sql
-- Критерий только для баскетбола
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight, sport_id, discipline_id
) VALUES (
    'infrastructure', 
    'BBL_COURTS_3X3', 
    'Количество площадок 3х3', 
    'number', 
    0.1, 
    10,   -- Баскетбол
    219   -- Дисциплина 3х3
);
```

### Пример 3: События как отдельная сущность

```sql
-- Создаем событие "Суперлига 5х5 мужчины"
INSERT INTO events_catalog (
    code, name_ru, event_type, level, sport_id, discipline_id, gender_id
) VALUES (
    'BBL_SUPERLEAGUE_M_5X5',
    'Суперлига 5х5 (мужчины)',
    'league',
    'national',
    10,  -- Баскетбол
    220, -- 5х5
    1    -- Мужчины
);

-- Создаем критерий "участие в Суперлиге"
INSERT INTO indicator_catalog (
    category, code, name_ru, value_type, default_weight, sport_id
) VALUES (
    'achievements',
    'BBL_SUPERLEAGUE_PARTICIPATION',
    'Команда участвует в Суперлиге',
    'number',
    0.6,
    10
);

-- Фиксируем результат: Московская область заняла 3 место
INSERT INTO event_results (
    event_id, organization_id, season_year, place
) VALUES (
    (SELECT id FROM events_catalog WHERE code = 'BBL_SUPERLEAGUE_M_5X5'),
    50,  -- Московская область
    2024,
    3
);
```

### Пример 4: Организация выбирает критерии

```sql
-- РФБ создает свой набор критериев для регионов
-- Включает только нужные из каталога

-- 1. Маркетинг (универсальные)
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true 
FROM indicator_catalog 
WHERE category = 'marketing' AND sport_id IS NULL;

-- 2. Инфраструктура баскетбола
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true 
FROM indicator_catalog 
WHERE category = 'infrastructure' AND sport_id = 10;

-- 3. НЕ включает критерии по ветеранам (организация решила не оценивать)
-- Просто не добавляем в organization_indicators
```

## Преимущества

✅ **Универсальность**: Один критерий "Наличие сайта" для всех видов спорта  
✅ **Гибкость**: Организация выбирает нужные критерии  
✅ **Переопределение**: Организация может изменить вес  
✅ **Масштабируемость**: Легко добавить новый вид спорта  
✅ **Разделение**: События отдельно от критериев оценки  
✅ **Связи**: Можно анализировать результаты между организациями и видами спорта

## Миграция данных

1. Создать `indicator_catalog` из уникальных критериев
2. Создать `events_catalog` из турниров/соревнований
3. Перенести текущие `indicators` в `organization_indicators`
4. Связать с каталогом

## Вопросы для обсуждения

1. Согласны с разделением на справочник + привязка к организации?
2. События выделить в отдельную сущность?
3. Нужна ли возможность создавать собственные критерии организации (не из каталога)?
4. Как обрабатывать исторические данные при изменении весов?
