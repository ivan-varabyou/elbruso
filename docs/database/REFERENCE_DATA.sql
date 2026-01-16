-- ================================
-- СПРАВОЧНЫЕ ДАННЫЕ ДЛЯ АВТОГЕНЕРАЦИИ
-- ================================
-- Полный набор справочников для генерации показателей
-- Можно использовать для заполнения UI-форм

-- ================================
-- 1. Группы показателей (иерархическая структура)
-- ================================
-- Основные группы (верхний уровень)
SELECT 
    1 as id, NULL as parent_id, 'regional_federation' as code, 'Региональная федерация' as name_ru, 'Показатели региональной федерации' as description
UNION ALL SELECT 2, NULL, 'regional_general', 'Общие региональные показатели', 'Общие критерии для региона'
UNION ALL SELECT 3, NULL, 'sports_facilities', 'Спортивные объекты', 'Инфраструктура и объекты'
UNION ALL SELECT 4, NULL, 'national_teams', 'Сборные команды', 'Сборные команды региона'
UNION ALL SELECT 5, NULL, 'professional_sport', 'Профессиональный спорт', 'Профессиональные команды и лиги'
UNION ALL SELECT 6, NULL, 'reserve', 'Резерв', 'Резервные команды и спортсмены'
UNION ALL SELECT 7, NULL, 'mass_sport', 'Массовый спорт (любительский)', 'Любительские команды и мероприятия'
UNION ALL SELECT 8, NULL, 'events', 'Мероприятия', 'Спортивные мероприятия и соревнования'
UNION ALL SELECT 9, NULL, 'referees', 'Судьи', 'Судейский корпус'
UNION ALL SELECT 10, NULL, 'coaches', 'Тренеры', 'Тренерский состав'
UNION ALL SELECT 11, NULL, 'other', 'Прочее', 'Прочие показатели'
-- Подгруппы
UNION ALL SELECT 12, 1, 'federation_marketing', 'Маркетинг федерации', 'Маркетинговые активности федерации'
UNION ALL SELECT 13, 5, 'pro_club_marketing', 'Маркетинг профессиональных клубов', 'Маркетинговые активности профессиональных клубов'
UNION ALL SELECT 14, 7, 'school_basketball', 'Школьный баскетбол', 'Локобаскет, КЭС-Баскет, минибаскет'
UNION ALL SELECT 15, 7, 'student_basketball', 'Студенческий баскетбол', 'АСБ, Лига Белова, СЛ РЖД'
UNION ALL SELECT 16, 7, 'amateur_basketball', 'Любительский баскетбол', 'МЛБЛ, региональные лиги'
UNION ALL SELECT 17, 7, 'veterans', 'Ветераны', 'Первенство России среди ветеранов';

-- ================================
-- 2. Пол
-- ================================
SELECT 
    1 as id, 'M' as code, 'Мужчины' as name_ru
UNION ALL SELECT 2, 'F', 'Женщины';

-- ================================
-- 3. Возрастные группы
-- ================================
SELECT 
    1 as id, 'U14' as code, 'До 14 лет' as name_ru, NULL as min_age, 14 as max_age
UNION ALL SELECT 2, 'U15', 'До 15 лет', NULL, 15
UNION ALL SELECT 3, 'U16', 'До 16 лет', NULL, 16
UNION ALL SELECT 4, 'U17', 'До 17 лет', NULL, 17
UNION ALL SELECT 5, 'U18', 'До 18 лет', NULL, 18
UNION ALL SELECT 6, 'U20', 'До 20 лет', NULL, 20
UNION ALL SELECT 7, 'U23', 'До 23 лет', NULL, 23
UNION ALL SELECT 8, 'AD', 'Взрослые', 18, NULL
UNION ALL SELECT 9, 'V40', 'Ветераны 40+', 40, NULL;

-- ================================
-- 4. Типы результата
-- ================================
-- Используются для определения логики генерации
SELECT 
    'place' as code, 'Место (диапазон мест)' as name_ru, 'Генерирует критерии для каждого места в диапазоне' as description
UNION ALL SELECT 'medal', 'Медали (золото/серебро/бронза)', 'Генерирует 3 критерия: золото, серебро, бронза'
UNION ALL SELECT 'participation', 'Участие (количество)', 'Генерирует критерий с числовым значением (количество участников/команд)'
UNION ALL SELECT 'score', 'Очки/баллы', 'Генерирует критерий с дробным значением'
UNION ALL SELECT 'boolean', 'Да/Нет', 'Генерирует булев критерий (есть/нет)';

-- ================================
-- 5. Дисциплины баскетбола (пример)
-- ================================
SELECT 
    1 as id, '5X5' as code, 'Баскетбол 5x5' as name_ru, 2 as sport_id
UNION ALL SELECT 2, '3X3', 'Баскетбол 3x3', 2
UNION ALL SELECT 3, 'CYBER', 'Кибербаскетбол', 2;

-- ================================
-- 6. Шаблоны плейсхолдеров
-- ================================
-- Для использования в name_pattern и code_pattern

-- В name_pattern:
-- {place}           - номер позиции (1, 2, 3...)
-- {sport_name}      - название спорта (Баскетбол)
-- {discipline_name} - название дисциплины (Баскетбол 5x5)
-- {gender_name}     - название пола (Мужчины, Женщины)
-- {age_group_name}  - название возрастной группы (До 18 лет, Взрослые)

-- В code_pattern:
-- {place}           - номер позиции
-- {sport_code}      - код спорта (BBL)
-- {discipline_code} - код дисциплины (5X5, 3X3)
-- {gender_code}     - код пола (M, F)
-- {age_group_code}  - код возрастной группы (U18, AD)

-- ================================
-- 7. Примеры шаблонов для разных сценариев
-- ================================

-- Пример 1: Сборные команды, места 1-3
-- group_id: 4 (Сборные команды)
-- result_type: 'place'
-- range: 1-3
-- name_pattern: '{place} место сборной {age_group_name} ({gender_name}) в {discipline_name}'
-- code_pattern: 'BBL_{discipline_code}_{gender_code}_{age_group_code}_NAT_{place}'

-- Пример 2: Профессиональный спорт, места 1-8
-- group_id: 5 (Профессиональный спорт)
-- result_type: 'place'
-- range: 1-8
-- name_pattern: '{place} место в профессиональной лиге {discipline_name} ({gender_name})'
-- code_pattern: 'BBL_{discipline_code}_{gender_code}_PRO_PLACE_{place}'

-- Пример 3: Резерв, количество команд
-- group_id: 6 (Резерв)
-- result_type: 'participation'
-- range: 1-1 (один критерий)
-- name_pattern: 'Количество команд резерва {age_group_name} ({gender_name})'
-- code_pattern: 'BBL_{discipline_code}_{gender_code}_{age_group_code}_RES_TEAMS'

-- Пример 4: Судьи, наличие судей FIBA
-- group_id: 9 (Судьи)
-- result_type: 'boolean'
-- range: 1-1
-- name_pattern: 'Наличие судей FIBA в регионе'
-- code_pattern: 'BBL_REF_FIBA_EXISTS'

-- ================================
-- 8. JSON для frontend (готовый)
-- ================================
/*
{
  "indicator_groups": [
    {"id": 1, "parent_id": null, "code": "regional_federation", "name": "Региональная федерация"},
    {"id": 2, "parent_id": null, "code": "regional_general", "name": "Общие региональные показатели"},
    {"id": 3, "parent_id": null, "code": "sports_facilities", "name": "Спортивные объекты"},
    {"id": 4, "parent_id": null, "code": "national_teams", "name": "Сборные команды"},
    {"id": 5, "parent_id": null, "code": "professional_sport", "name": "Профессиональный спорт"},
    {"id": 6, "parent_id": null, "code": "reserve", "name": "Резерв"},
    {"id": 7, "parent_id": null, "code": "mass_sport", "name": "Массовый спорт (любительский)"},
    {"id": 8, "parent_id": null, "code": "events", "name": "Мероприятия"},
    {"id": 9, "parent_id": null, "code": "referees", "name": "Судьи"},
    {"id": 10, "parent_id": null, "code": "coaches", "name": "Тренеры"},
    {"id": 11, "parent_id": null, "code": "other", "name": "Прочее"},
    {"id": 12, "parent_id": 1, "code": "federation_marketing", "name": "Маркетинг федерации"},
    {"id": 13, "parent_id": 5, "code": "pro_club_marketing", "name": "Маркетинг профессиональных клубов"},
    {"id": 14, "parent_id": 7, "code": "school_basketball", "name": "Школьный баскетбол"},
    {"id": 15, "parent_id": 7, "code": "student_basketball", "name": "Студенческий баскетбол"},
    {"id": 16, "parent_id": 7, "code": "amateur_basketball", "name": "Любительский баскетбол"},
    {"id": 17, "parent_id": 7, "code": "veterans", "name": "Ветераны"}
  ],
  "genders": [
    {"id": 1, "code": "M", "name": "Мужчины"},
    {"id": 2, "code": "F", "name": "Женщины"}
  ],
  "age_groups": [
    {"id": 1, "code": "U14", "name": "До 14 лет"},
    {"id": 2, "code": "U15", "name": "До 15 лет"},
    {"id": 3, "code": "U16", "name": "До 16 лет"},
    {"id": 4, "code": "U17", "name": "До 17 лет"},
    {"id": 5, "code": "U18", "name": "До 18 лет"},
    {"id": 6, "code": "U20", "name": "До 20 лет"},
    {"id": 7, "code": "U23", "name": "До 23 лет"},
    {"id": 8, "code": "AD", "name": "Взрослые"},
    {"id": 9, "code": "V40", "name": "Ветераны 40+"}
  ],
  "result_types": [
    {"code": "place", "name": "Место (диапазон мест)"},
    {"code": "medal", "name": "Медали"},
    {"code": "participation", "name": "Участие"},
    {"code": "score", "name": "Очки"},
    {"code": "boolean", "name": "Да/Нет"}
  ]
}
*/
