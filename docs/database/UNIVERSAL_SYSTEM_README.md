# Универсальная система индикаторов - Порядок установки

## Обзор

Система разработана для универсального использования критериев оценки между разными видами спорта с возможностью гибкой настройки для каждой организации.

## Структура файлов

### Основные SQL файлы (в порядке выполнения)

1. **09_universal_indicators_system.sql** - Основные таблицы системы
   - Сезоны (seasons)
   - Справочник индикаторов (indicator_catalog)
   - Группы индикаторов (indicator_groups_catalog)
   - Активные индикаторы организаций (organization_indicators)
   - Справочник событий (events_catalog)
   - Результаты в событиях (event_results)
   - Значения индикаторов (organization_indicator_values)
   - Расчетные баллы (organization_scores)
   - Примеры данных для баскетбола и легкой атлетики

2. **10_seasons_utilities.sql** - Утилиты для работы с сезонами
   - Автогенерация календарных сезонов
   - Автогенерация спортивных сезонов
   - Определение текущего сезона
   - Автоматическое присвоение сезона при вставке данных
   - Представления для анализа сезонов

3. **11_reference_tables.sql** - Справочные таблицы (нормализация)
   - Категории индикаторов (indicator_categories)
   - Единицы измерения (measurement_units)
   - Типы событий (event_types)
   - Уровни событий (event_levels)
   - Этапы событий (event_stages)
   - Источники данных (data_sources)
   - Представления с развернутыми справочниками

### Документация

- **REFACTORING_PROPOSAL.md** - Первоначальное предложение по рефакторингу
- **IMPROVED_INDICATORS_PROPOSAL.md** - Детальное предложение с примерами
- **UNIVERSAL_SYSTEM_GUIDE.md** - Полное руководство по использованию системы

## Порядок установки

### Шаг 1: Предварительные требования

Убедитесь, что у вас уже созданы базовые таблицы:
- `organizations` - Организации
- `sports` - Виды спорта
- `disciplines` - Дисциплины
- `genders` - Пол
- `age_groups` - Возрастные группы

### Шаг 2: Установка основных таблиц

```bash
psql -U your_user -d your_database -f 09_universal_indicators_system.sql
```

Этот файл создаст:
- ✅ Таблицу сезонов с базовыми данными
- ✅ Справочник индикаторов
- ✅ Систему групп индикаторов
- ✅ Таблицы для активации индикаторов организациями
- ✅ Справочник событий и турниров
- ✅ Таблицы для хранения результатов и значений
- ✅ Примеры данных для баскетбола и легкой атлетики

### Шаг 3: Установка утилит для сезонов

```bash
psql -U your_user -d your_database -f 10_seasons_utilities.sql
```

Этот файл создаст:
- ✅ Функции автогенерации сезонов
- ✅ Функции определения текущего сезона
- ✅ Триггеры автоматического присвоения сезонов
- ✅ Представления для анализа сезонов
- ✅ Автоматически сгенерирует сезоны с 2020 по 2030

### Шаг 4: Установка справочных таблиц

```bash
psql -U your_user -d your_database -f 11_reference_tables.sql
```

Этот файл создаст:
- ✅ Справочники категорий, единиц измерения, типов событий и т.д.
- ✅ Обновит существующие таблицы для использования справочников
- ✅ Создаст представления с развернутыми справочниками
- ✅ Мигрирует существующие данные

## Проверка установки

### 1. Проверка таблиц

```sql
-- Проверяем, что все таблицы созданы
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'seasons',
    'indicator_catalog',
    'indicator_groups_catalog',
    'organization_indicators',
    'events_catalog',
    'event_results',
    'organization_indicator_values',
    'organization_scores',
    'indicator_categories',
    'measurement_units',
    'event_types',
    'event_levels',
    'event_stages',
    'data_sources'
  )
ORDER BY table_name;
```

Должно вернуть 14 таблиц.

### 2. Проверка сезонов

```sql
-- Проверяем текущие активные сезоны
SELECT * FROM v_current_seasons;

-- Должно показать текущие календарный и спортивный сезоны
```

### 3. Проверка индикаторов

```sql
-- Проверяем количество индикаторов в каталоге
SELECT 
    category_name,
    COUNT(*) as indicators_count
FROM v_indicator_catalog_full
GROUP BY category_name
ORDER BY category_name;

-- Должно показать индикаторы по категориям
```

### 4. Проверка событий

```sql
-- Проверяем события баскетбола
SELECT 
    code,
    name_ru,
    event_type_name,
    level_name
FROM v_events_catalog_full
WHERE sport_name = 'Баскетбол'
ORDER BY name_ru;

-- Должно показать события баскетбола
```

### 5. Проверка справочников

```sql
-- Проверяем справочники
SELECT 'Categories' as type, COUNT(*) as count FROM indicator_categories
UNION ALL
SELECT 'Units', COUNT(*) FROM measurement_units
UNION ALL
SELECT 'Event Types', COUNT(*) FROM event_types
UNION ALL
SELECT 'Event Levels', COUNT(*) FROM event_levels
UNION ALL
SELECT 'Event Stages', COUNT(*) FROM event_stages
UNION ALL
SELECT 'Data Sources', COUNT(*) FROM data_sources;

-- Должно показать количество записей в каждом справочнике
```

## Быстрый старт

### Пример 1: Активация индикаторов для РФБ

```sql
-- РФБ активирует все универсальные маркетинговые индикаторы
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 
    1,  -- ID РФБ
    id,
    true
FROM indicator_catalog
WHERE category_id = (SELECT id FROM indicator_categories WHERE code = 'marketing')
  AND sport_id IS NULL;

-- РФБ активирует все баскетбольные индикаторы
INSERT INTO organization_indicators (organization_id, indicator_catalog_id, is_enabled)
SELECT 1, id, true
FROM indicator_catalog
WHERE sport_id = 10;  -- Баскетбол
```

### Пример 2: Внесение данных

```sql
-- Московская область: наличие сайта в 2024 году
INSERT INTO organization_indicator_values (
    organization_id, 
    indicator_catalog_id, 
    season_id, 
    value_boolean,
    data_source_id
) VALUES (
    50,  -- Московская область
    (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_WEBSITE'),
    (SELECT id FROM seasons WHERE code = '2024'),
    true,
    (SELECT id FROM data_sources WHERE code = 'manual')
);

-- Сезон будет определен автоматически, если не указан
INSERT INTO organization_indicator_values (
    organization_id, 
    indicator_catalog_id, 
    value_boolean,
    data_source_id
) VALUES (
    50,
    (SELECT id FROM indicator_catalog WHERE code = 'MARKETING_VK_ACTIVE'),
    true,
    (SELECT id FROM data_sources WHERE code = 'manual')
);
-- Триггер автоматически присвоит текущий сезон
```

### Пример 3: Запрос данных организации

```sql
-- Все значения индикаторов Московской области за 2024 год
SELECT 
    indicator_code,
    indicator_name,
    category_name,
    value_display,
    unit,
    data_source_name
FROM v_indicator_values_full
WHERE organization_name LIKE '%Московская%'
  AND season_code = '2024'
ORDER BY category_name, indicator_name;
```

## Основные возможности

### ✅ Универсальность
- Один индикатор "Наличие сайта" для всех видов спорта
- Специфичные индикаторы для каждого вида спорта

### ✅ Гибкость
- Организация выбирает нужные индикаторы
- Организация может переопределить веса
- Организация может отключить ненужные индикаторы

### ✅ Автоматизация
- Автогенерация сезонов
- Автоопределение текущего сезона
- Автоматическое присвоение сезона при вставке данных

### ✅ Иерархия
- События имеют структуру (родитель-потомок)
- Группы индикаторов имеют иерархию

### ✅ Нормализация
- Справочники для категорий, единиц измерения, типов событий
- Представления для удобного доступа

## Следующие шаги

1. ✅ Установить все SQL файлы
2. ✅ Проверить создание таблиц
3. ⏳ Активировать индикаторы для ваших организаций
4. ⏳ Внести данные за текущий сезон
5. ⏳ Создать функции расчета баллов
6. ⏳ Настроить автоматический импорт данных
7. ⏳ Создать API для работы с системой

## Поддержка

Для вопросов и предложений обращайтесь к документации:
- **UNIVERSAL_SYSTEM_GUIDE.md** - Полное руководство
- **IMPROVED_INDICATORS_PROPOSAL.md** - Детальные примеры

## Версия

- **Версия:** 1.0
- **Дата:** 2026-01-13
- **Статус:** Готово к использованию
