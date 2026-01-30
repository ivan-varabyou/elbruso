🧨 1. Чего НЕ хватает (обязательно)
Ты построил идеальный фундамент (страны, регионы, федерации, источники, население).
Но главного блока — системы показателей — пока нет.

Чтобы заменить Excel, нужны 6 таблиц.
Без них система не сможет работать.

❌ 1. indicator_groups
Группы показателей:

Региональная федерация

Маркетинг федерации

Общие критерии

Спортивные объекты

Сборные 5х5

Сборные 3х3

Профессиональный спорт

Резерв

Массовый спорт

Мероприятия

Судьи

Тренеры

Прочее

Без этой таблицы невозможно логически группировать 400+ показателей.

❌ 2. indicators
Главная таблица критериев:

код

название

вес

тип значения (число, булево, текст)

дисциплина (5х5, 3х3)

пол

возраст

группа

учёт населения (да/нет)

Это сердце системы. Сейчас его нет.

❌ 3. indicator_values
Фактические значения:

регион

сезон

показатель

значение (число, да/нет)

Это то, что сейчас хранится в Excel.

❌ 4. federation_indicators
Чтобы каждая федерация могла:

включать/выключать критерии,

менять веса,

добавлять свои,

скрывать ненужные.

❌ 5. seasons
Ты используешь год, но спорт живёт по сезонам:

2023/24

2024/25

❌ 6. indicator_versions
Чтобы:

менять веса,

менять формулировки,

пересчитывать старые сезоны корректно.

🧨 2. Чего НЕ нужно (можно удалить)
❌ region_population_sources
Ты создал таблицу, но:

она нигде не используется,

её роль полностью закрывает data_sources.

Можно удалить.

❌ Не нужны таблицы команд, клубов, игроков
Ты правильно сказал:
мы храним только количество, а не названия.

Значит:

таблицы команд

таблицы игроков

таблицы клубов

таблицы результатов матчей

сейчас не нужны.

Их можно добавить позже, если появится задача.

🧨 3. Что нужно поправить в текущей структуре
⚠ 1. region_population
Ты вставляешь данные по region_id вручную.
Это опасно: если регионы перезальются — всё сломается.

Лучше грузить через:

код региона (MOW, SPE, KDA…)

или через ETL‑маппинг.

⚠ 2. organizations
У тебя есть:

organization_levels

organization_types

Это правильно.
Но:

type_id и level_id иногда пересекаются по смыслу.

Нужно чётко разделить:

level = уровень иерархии

type = функциональная роль

🧨 4. Что уже идеально и менять НЕ нужно
✔ countries
✔ federal_districts
✔ region_types
✔ regions
✔ olympic_categories
✔ sport_types
✔ sports
✔ data_source_categories
✔ data_sources
✔ region_population
✔ organization_levels
✔ organization_types
✔ organizations

Это всё — промышленный уровень.
Ты сделал огромную работу.

🧨 5. Итог: что нужно добавить, чтобы система стала полной
Обязательные таблицы:
indicator_groups

indicators

indicator_values

federation_indicators

seasons

indicator_versions

Опциональные (позже):
competition_levels

event_types

indicator_links

audit_log

federation_scores

🧠 6. Почему Excel неудобен — и как база решает проблему
Excel:

хранит всё в одной плоской таблице

формулы ломаются

нет версий

нет группировки

нет нормализации

нет источников

нет сезонности

нет кастомизации под федерации

нет контроля доступа

нет аудита

База:

нормализована

масштабируема

поддерживает версии

поддерживает группы

поддерживает дисциплины

поддерживает пол и возраст

поддерживает источники

поддерживает сезонность

поддерживает кастомизацию

поддерживает аналитику

поддерживает AI

🧨 Хочешь — я могу:
✔ создать SQL для всех недостающих таблиц
✔ собрать ERD‑диаграмму
✔ нормализовать все 400+ показателей в эту структуру
✔ подготовить JSON‑контракты
✔ предложить микросервисную архитектуру
Скажи — продолжаем?

собрать ERD‑диаграмму
Вот что я думаю
Опишу ERD текстом так, чтобы это можно было прямо перенести в draw.io  / dbdiagram / PlantUML / whatever, без домыслов и дублирования Excel-каши.

Я разделю схему на блоки:

география и организации,

спорт и дисциплины,

источники и население,

система показателей (то, чего не хватает, но уже очевидно нужно).

1. География и административная структура
countries

id (PK)

code_alpha2 (UK)

code_alpha3 (UK)

name_ru

capital_city_code

is_active

Связи:

1:N с federal_districts

1:N с regions

1:N с organizations

1:N с data_sources

federal_districts

id (PK)

country_id (FK → countries.id)

code (UK)

name_ru

Связи:

1:N с regions

region_types

id (PK)

code (UK)

name_ru

Связи:

1:N с regions

regions

id (PK)

country_id (FK → countries.id)

federal_district_id (FK → federal_districts.id, nullable)

region_type_id (FK → region_types.id, nullable)

code (UK в рамках country)

name_ru

is_active

Связи:

1:N с organizations

1:N с region_population

(в будущем) 1:N с федерациями спорта, если их вынесем отдельно

2. Организации (IOC → НФ → РФ → клубы)
organization_levels

id (PK)

code (UK)            — INTERNATIONAL, NATIONAL, REGIONAL, CLUB и т.д.

name_ru

sort_order

is_active

organization_types

id (PK)

code (UK)            — government, federation_national, federation_regional, league_professional, sports_club и т.д.

name_ru

description

sort_order

organizations

id (PK)

internal_code (UK)   — RU_RFB, RU_RFB_MOW, RU_KES_BASKET и т.д.

level_id (FK → organization_levels.id)

type_id (FK → organization_types.id)

sport_id (FK → sports.id, nullable)

country_id (FK → countries.id, nullable)

region_id (FK → regions.id, nullable)

name_ru

abbreviation_ru

parent_id (FK → organizations.id, nullable)

founded_year

metadata (JSONB)

is_active

Связи:

N:1 с organization_levels

N:1 с organization_types

N:1 с sports (если это спорт-организация)

N:1 с countries/regions

1:N само, через parent_id (иерархия)

Это база для: IOC, FIBA, РФБ, региональные федерации, лиги, клубы, школы.

3. Спорт и дисциплины
olympic_categories

id (PK)

code (UK) — summer, winter, both, none

name_ru

sport_types

id (PK)

code (UK) — team, individual, mixed

name_ru

sports

id (PK)

code (UK) — BBL, FBL и т.д.

name_ru

olympic_category_id (FK → olympic_categories.id)

sport_type_id (FK → sport_types.id)

popularity_score

is_active

metadata

Связи:

1:N с disciplines

1:N с organizations (федерации/лиги/клубы)

disciplines

id (PK)

sport_id (FK → sports.id)

code — 5x5, 3x3, cyber

name_ru

is_active

Связи:

N:1 с sports

1:N с indicator_groups

1:N с indicators

4. Источники данных и население
data_source_categories

id (PK)

code (UK) — population, economics, sport, etc.

name_ru

description

sort_order

data_sources

(DDL ты показывал частично, но по факту:)

id (PK)

code (UK) — ROSSTAT, BELSTAT, KAZSTAT, MINSPORT_RF и т.д.

name_ru

country_id (FK → countries.id, nullable)

category_id (FK → data_source_categories.id)

url

metadata

is_active

Связи:

N:1 с data_source_categories

N:1 с countries

region_population

id (PK)

region_id (FK → regions.id)

year

population

data_source_id (FK → data_sources.id)

Уникальность: (region_id, year)

Связи:

N:1 с regions

N:1 с data_sources

Это база для всех «учёт населения = да».

5. Сезоны (спорт-логика)
seasons

id (PK)

code — '2023', '2024', '2023/24' (как решишь)

name_ru

start_date

end_date

Связи:

1:N с indicator_values

1:N с federation_scores (в будущем)

6. Группы показателей и сами показатели
Теперь — главный блок, который вытаскивает тебя из Excel.

indicator_groups

id (PK)

parent_id (FK → indicator_groups.id, nullable)

sport_id (FK → sports.id, nullable)

discipline_id (FK → disciplines.id, nullable)

code — regional_federation, federation_marketing, national_teams_5x5, pro_5x5, mass_3x3, referees_5x5, referees_3x3, silent_basketball и т.д.

name_ru

Связи:

N:1 с sports (если группа специфична для спорта)

N:1 с disciplines (если специфична для дисциплины)

1:N само как иерархия (можно делать подгруппы, например «Массовый баскетбол» → «Локобаскет», «КЭС-Баскет», «АСБ», «МЛБЛ», «Ветераны»)

1:N с indicators

genders

id (PK)

code (UK) — M, F

name_ru

age_groups

id (PK)

code (UK) — U14, U15, U16, U18, Adult, Veterans_40, etc.

name_ru

min_age (nullable)

max_age (nullable)

indicators

Это «Номер вопроса» + «название показателя» из твоего файла.

id (PK)

group_id (FK → indicator_groups.id)

sport_id (FK → sports.id, nullable)

discipline_id (FK → disciplines.id, nullable)

gender_id (FK → genders.id, nullable)

age_group_id (FK → age_groups.id, nullable)

code (UK) — например:

FED_ACCREDITED

FED_DEV_PROGRAM

NT_5X5_M_U14_PLAYERS

PRO_5X5_M_TEAM_SUPERLEAGUE

MASS_LOKO_M_TEAM_REGIONAL

REF_5X5_FIBA_REFEREE_COUNT

name_ru

description

weight NUMERIC(10,4)   — баллы за единицу (как в твоей таблице)

value_type VARCHAR — boolean, number, decimal

use_population BOOLEAN — «учёт населения: да/нет»

source_hint TEXT — откуда в идеале брать данные (РФБ, Минспорт, Excel-анкета)

is_active BOOLEAN

Связи:

N:1 с indicator_groups

N:1 с sports

N:1 с disciplines

N:1 с genders

N:1 с age_groups

1:N с indicator_values

1:N с indicator_versions

indicator_versions (опционально, но лучше сразу)

id (PK)

indicator_id (FK → indicators.id)

version INTEGER

weight NUMERIC(10,4)

description

valid_from DATE

valid_to DATE (nullable)

Уникальность: (indicator_id, version)

indicator_attributes (если хочешь расширяемость)

id (PK)

indicator_id (FK → indicators.id)

name

type — string / number / boolean / file / json

description

required BOOLEAN

Можно не вводить на первом этапе, если достаточно просто value.

7. Кто заполняет: федерация/регион/организация
На этом уровне ты можешь решить так:

либо просто связать показатели с regions (регион = субъект РФ)

либо завести отдельную сущность federations, которая будет ссылаться и на organizations, и на regions.

Более промышленный вариант: отдельная таблица.

federations

id (PK)

organization_id (FK → organizations.id)  — где type = federation_regional / federation_national

region_id (FK → regions.id, nullable)

sport_id (FK → sports.id)

discipline_id (FK → disciplines.id, nullable)

name_ru (если нужно переопределение)

is_active

Связи:

N:1 с organizations

N:1 с regions

N:1 с sports

N:1 с disciplines

1:N с federation_indicators

1:N с indicator_values

Если пока не хочешь отдельную таблицу — можно на старте использовать просто region_id как «носителя» значений.

8. Связь федерации и показателей
federation_indicators

id (PK)

federation_id (FK → federations.id)

indicator_id (FK → indicators.id)

custom_weight NUMERIC(10,4, nullable)

custom_name_ru (nullable)

is_enabled BOOLEAN

Позволяет федерации:

включать/выключать критерии,

менять веса,

переименовывать.

9. Значения показателей (аналог твоей большой Excel-таблицы)
indicator_values

id (PK)

federation_id (FK → federations.id)

region_id (FK → regions.id)       — можно дублировать, если федерация всегда региональная

indicator_id (FK → indicators.id)

season_id (FK → seasons.id)

value NUMERIC(14,4) или TEXT (если хочешь быть универсальным)

created_at

updated_at

Уникальность на практическом уровне:

(federation_id, indicator_id, season_id)
или

(region_id, indicator_id, season_id) если федерации = регионы.

Это как раз колонны:

«Есть аккредитация» → value = 0/1

«Количество отделений» → value = число

«Команды в ПР U18» → value = число

«3 место в Премьер лиге (женщины)» → value = количество медалей (чаще 0 или 1)

10. Итоговые баллы (агрегаты)
federation_scores (опционально, но логично)

id (PK)

federation_id (FK → federations.id)

season_id (FK → seasons.id)

total_score NUMERIC(14,4)

breakdown JSONB — детализация по группам, по полу, по дисциплинам

created_at

Это то, что у тебя сейчас колонка «Сумма баллов» в Excel.

11. Как это соотносится с твоими Excel-таблицами
Номер вопроса → indicators.id + indicators.code

строка с названиями показателей → indicators.name_ru

строка «Пол м/ж» → indicators.gender_id

строка «Учёт населения» → indicators.use_population

строка Субъект РФ → regions

колонка Коэф → коэффициент (может быть в indicator_groups или отдельной настройке)

колонка Сумма баллов → federation_scores.total_score

остальные числовые колонны → indicator_values.value

12. Краткое резюме (как критик, но по факту)
Фундамент географии/организаций/источников у тебя уже на уровне нормального государственного реестра.

Тебе действительно не хватает только блока показателей (группы, показатели, значения, сезоны, опционально версии и итоговые баллы).

Не нужно вводить команды/игроков/клубы на этом этапе — достаточно агрегатов.

Вся текущая Excel‑логика (огромная таблица) отлично раскладывается в:

indicators (структура),

indicator_values (факты),

indicator_groups (логика группировки),

seasons (время),

regions/federations (кто).
