-- ================================
-- МАСТЕР-СКРИПТ УСТАНОВКИ БАЗЫ ДАННЫХ
-- ================================
-- Полная схема базы данных для системы оценки развития спорта по регионам
-- 
-- Порядок выполнения:
-- 1. Справочники (Reference Tables)
-- 2. Основные сущности (Core Entities)
-- 3. Система показателей (Indicators System)
-- 4. Значения и результаты (Values & Results)
--
-- Использование:
-- psql -d sba -f 00_master_install.sql
-- ================================

\echo '================================'
\echo 'Установка базы данных SBA'
\echo 'Система оценки развития спорта'
\echo '================================'
\echo ''

-- Включить отображение времени выполнения
\timing on

\echo '>>> Шаг 1/4: Создание справочников...'
\i 01_reference_tables.sql

\echo ''
\echo '>>> Шаг 2/4: Создание основных сущностей...'
\i 02_core_entities.sql

\echo ''
\echo '>>> Шаг 3/4: Создание системы показателей...'
\i 03_indicators_system.sql

\echo ''
\echo '>>> Шаг 4/4: Создание таблиц значений и результатов...'
\i 04_values_and_results.sql

\echo ''
\echo '================================'
\echo 'Установка завершена!'
\echo '================================'
\echo ''
\echo 'Проверка созданных таблиц:'

-- Показать все созданные таблицы
\dt

\echo ''
\echo 'Статистика:'

SELECT 
    'Справочные таблицы' as category,
    COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public'
  AND table_name IN (
      'languages', 'genders', 'age_groups', 'region_types', 
      'countries', 'federal_districts', 'olympic_categories', 
      'sport_types', 'organization_levels', 'organization_types',
      'data_source_categories', 'data_sources'
  )
UNION ALL
SELECT 
    'Основные сущности' as category,
    COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public'
  AND table_name IN (
      'regions', 'region_population', 'sports', 'disciplines',
      'organizations', 'federations', 'translations'
  )
UNION ALL
SELECT 
    'Система показателей' as category,
    COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public'
  AND table_name IN (
      'seasons', 'indicator_groups', 'indicators',
      'indicator_versions', 'federation_indicators'
  )
UNION ALL
SELECT 
    'Значения и результаты' as category,
    COUNT(*) as count
FROM information_schema.tables 
WHERE table_schema = 'public'
  AND table_name IN (
      'indicator_values', 'federation_scores',
      'federation_score_details', 'audit_log'
  );

\echo ''
\echo 'Готово! База данных готова к использованию.'
