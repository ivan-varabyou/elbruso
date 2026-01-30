🧩 1. Что уже есть (по твоей текущей архитектуре)
✔ 1.1. Архитектура монорепозитория
pnpm + Turbo

NestJS микросервисы

Next.js  FSD фронтенд

PostgreSQL + Redis

Kysely как типобезопасный SQL

Это сильная основа: масштабируемая, модульная, современная.

✔ 1.2. Микросервисы (по портам)
Main API

Users

Workspaces

Tables

Indicators

Это правильное доменное разбиение.

✔ 1.3. База данных — сильная, богатая модель
Ты уже имеешь:

Workspaces
воркспейсы

группы

permissions

Dynamic Tables
таблицы

версии

ячейки

Indicators
каталог индикаторов

группы

связи групп

значения индикаторов

Organizations
федерации

клубы

регионы

страны

Pages & Blocks
Notion‑style страницы

блоки

Events & Rankings
события

результаты

маппинг индикаторов

System
audit logs

sessions

api keys

Это уже почти полноценная data‑platform.

✔ 1.4. Логика таблиц
версии

ячейки

формулы (внутри версии)

метаданные

reference tables

✔ 1.5. Логика индикаторов
многоуровневые группы

связи индикаторов

значения по организациям

веса, формулы, категории

✔ 1.6. Логика воркспейсов
права

группы

принадлежность к организации

🧩 2. Что НЕ хватает (критические пробелы)
Это то, что обязательно нужно, чтобы система была:

консистентной

безопасной

расширяемой

AI‑управляемой

пригодной для больших данных

❗ 2.1. Нет полноценной модели зависимостей таблиц
Сейчас есть:

формулы внутри версии

связи таблиц (частично)

Но нет:

TableDependency

ColumnDependency

CellDependency

графа зависимостей

топологической сортировки

детектора циклов

Без этого:

пересчёт формул будет хаотичным

cross‑workspace связи будут ломаться

AI‑агент не сможет безопасно работать

❗ 2.2. Нет полноценной модели прав доступа (RBAC + ABAC)
Сейчас есть:

workspace_permissions

Но нет:

table_permissions

column_permissions

row‑level security

cross‑workspace access policies

AI‑agent policies

Это критично, потому что:

таблицы могут содержать чувствительные данные

cross‑workspace может раскрыть данные других регионов

AI‑агент может случайно изменить то, что нельзя

❗ 2.3. Нет черновиков (drafts) как отдельной сущности
Сейчас есть:

table_versions

Но нет:

table_drafts

workspace_drafts

page_drafts

change_sets

Без этого:

AI‑агент не сможет работать безопасно

пользователь не сможет откатывать изменения

нельзя делать review/approve

❗ 2.4. Нет модели шаблонов
Сейчас есть:

workspaces.is_template

Но нет:

workspace_templates

table_templates

page_templates

indicator_templates

Это нужно для:

быстрого создания типовых воркспейсов

автоматизации федераций

AI‑генерации

❗ 2.5. Нет модели формул как сущности
Сейчас формулы хранятся в:

table_versions.matrix_formulas

Но нет:

table_formulas

formula_dependencies

formula_errors

formula_history

Это ограничивает:

AI‑агента

пересчёт

отладку

визуализацию зависимостей

❗ 2.6. Нет модели связей таблиц как сущности
Сейчас есть:

reference_type

is_reference

Но нет:

table_relations

relation_types (lookup, join, reference, cross_workspace)

relation_metadata

relation_errors

❗ 2.7. Нет модели событий (event sourcing)
Сейчас есть:

audit_logs

Но нет:

table.updated

formula.changed

workspace.permission.changed

indicator.updated

ai.suggestion.created

Это нужно для:

откатов

AI‑обучения

аналитики

❗ 2.8. Нет модели AI‑агента
Сейчас нет:

agent_sessions

agent_actions

agent_change_sets

agent_policies

Без этого агент не сможет:

создавать таблицы

предлагать формулы

делать изменения безопасно

❗ 2.9. Нет модели HUD (formula context)
HUD — ключевая фича, но нет:

formula_context

formula_navigation_state

formula_preview

🧩 3. Что нужно доработать (архитектурные рекомендации)
🔧 3.1. Добавить полноценный Dependency Graph
Сущности:

table_dependencies

column_dependencies

cell_dependencies

Функции:

топологическая сортировка

пересчёт

уведомления

защита от циклов

🔧 3.2. Добавить многоуровневую модель прав доступа
Слои:

WorkspacePermission

TablePermission

ColumnPermission

RowAccessRule

AIAgentPolicy

🔧 3.3. Добавить Drafts + ChangeSets
Сущности:

workspace_drafts

table_drafts

page_drafts

agent_change_sets

🔧 3.4. Добавить TableRelations
Типы:

lookup

join

reference

cross_workspace

🔧 3.5. Добавить TableFormulas
Сущности:

table_formulas

formula_dependencies

formula_errors

formula_history

🔧 3.6. Добавить Templates
Сущности:

workspace_templates

table_templates

page_templates

🔧 3.7. Добавить AI‑agent architecture
Сущности:

agent_sessions

agent_actions

agent_change_sets

agent_policies

🔧 3.8. Добавить Event Sourcing слой
Сущности:

domain_events

event_streams

🧩 4. Итог: что есть → что нужно
Область	Что есть	Что нужно
Workspaces	✔ сильная модель	➕ расширить права, добавить drafts
Dynamic Tables	✔ таблицы, версии, ячейки	➕ зависимости, формулы, связи, drafts
Indicators	✔ каталог, группы	➕ шаблоны, зависимости
Pages	✔ страницы, блоки	➕ drafts, шаблоны
Permissions	✔ workspace_permissions	➕ table/column/row permissions
AI	✖ отсутствует	➕ agent_sessions, change_sets, policies
Dependencies	✖ отсутствует	➕ dependency graph
Templates	✖ отсутствует	➕ workspace/table/page templates
Event Sourcing	✖ отсутствует	➕ domain events
