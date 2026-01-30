🧭 5) Архитектура AI‑агента
5.1. Роли и границы агента
Принцип: агент — не «магический бог», а строго ограниченный клиент API с особыми правами и режимом работы только через черновики.

Основные роли агента:

Аналитик:

предлагает новые таблицы, колонки, связи, формулы, индикаторы.

Оператор:

заполняет таблицы данными (по инструкциям пользователя).

Навигатор:

находит нужные данные, таблицы, страницы, версии.

Ревизор:

находит ошибки, аномалии, неконсистентность.

Агент никогда не пишет напрямую в боевые данные — только:

создаёт draft (черновики таблиц, формул, связей, страниц),

формирует change set,

отдаёт пользователю на review/approve.

5.2. Логическая архитектура
Слои:

AI Orchestrator (Service)

Принимает запросы от фронта (чат справа).

Управляет сессиями диалога.

Делит задачи на шаги (decomposition).

Вызывает доменные API (workspaces, tables, formulas, indicators).

Domain API Layer

workspaces — создание/поиск воркспейсов.

dynamic-tables — создание/изменение таблиц.

formula — валидация/генерация формул.

indicators — работа с каталогом индикаторов.

pages — создание страниц/блоков.

Draft & ChangeSet Layer

agent_drafts — черновики, созданные агентом.

agent_change_sets — набор изменений (таблицы, формулы, связи).

agent_suggestions — предложения с описанием «что и зачем».

Review & Approval Layer

UI для пользователя:

просмотр diff,

принятие/отклонение,

частичное принятие.

5.3. Основные сущности агента
AIAgentSession

id

user_id

workspace_id

context (последние действия, выбранные таблицы)

created_at, last_activity_at

AIAgentAction

id

session_id

action_type (create_table, add_column, create_formula, create_relation, create_page, etc.)

payload (JSON)

status (draft, suggested, applied, rejected)

created_at, created_by

AIAgentChangeSet

id

session_id

workspace_id

changes (список операций: add_table, add_column, add_formula, add_relation)

status (pending_review, approved, rejected, partially_approved)

created_at, approved_at, approved_by

5.4. Поток работы агента (high‑level)
Пользователь:
«Создай воркспейс для сезона 2025 и таблицу с регионами и коэффициентами».

Агент:

находит/создаёт воркспейс (через API),

создаёт таблицу (черновик),

создаёт связи со справочником регионов,

создаёт колонку коэффициентов,

формирует AIAgentChangeSet.

Пользователь:

видит diff: «будет создан воркспейс, таблица, связи, колонки».

нажимает «Применить».

Система:

применяет change set → создаёт реальные записи в dynamic_tables, table_versions, table_relations, table_formulas.

5.5. Ограничения агента
Не может:

публиковать версии таблиц,

менять данные в таблицах без черновика,

менять права доступа,

читать данные вне своих прав (как обычный пользователь).

Может:

всё то же, что и пользователь, но только в режиме draft + suggestions.

🧰 6) Модель зависимостей таблиц
Тут тебе нужен явный граф зависимостей, а не «магия внутри формул».

6.1. Уровни зависимостей
Таблица → Таблица

таблица B зависит от таблицы A (через формулы, lookup, join, reference).

Колонка → Колонка

колонка B.коэффициент зависит от A.население.

Ячейка → Ячейка

конкретная ячейка зависит от другой ячейки (особенно при сложных формулах).

6.2. Сущность TableDependency
TableDependency

id

table_id — кто зависит

depends_on_table_id — от кого зависит

depends_on_column_id (nullable)

depends_on_row_id (nullable)

dependency_type — formula | relation | reference | cross_workspace

source_type — cell | column | table

source_id — id формулы/связи

created_at

6.3. Построение графа
При сохранении формулы:

парсится выражение,

извлекаются ссылки на таблицы/колонки/ячейки,

создаются записи в table_dependencies.

При создании связи (lookup/join/reference):

создаётся зависимость table_id → target_table_id.

При cross‑workspace связи:

создаётся зависимость table_id → external_table_id с флагом cross_workspace.

6.4. Использование графа
Use‑cases:

Пересчёт:  
при изменении таблицы A → найти все таблицы, зависящие от A → пересчитать.

Уведомления:  
при изменении источника → пометить зависимые таблицы как «требуют обновления».

Защита от удаления:  
нельзя удалить таблицу/колонку, если от неё зависят другие.

Визуализация:  
граф зависимостей в UI (кто от кого зависит).

6.5. Алгоритмы
Topological sort для порядка пересчёта.

Cycle detection при добавлении новой зависимости:

если добавление ребра создаёт цикл → запретить формулу/связь.

🧩 7) Модель прав доступа
Тут лучше всего сочетание RBAC + ABAC.

7.1. Уровни доступа
Уровень пользователя:

роль (system_admin, federation_admin, regional_admin, workspace_owner, editor, viewer, ai_agent).

Уровень организации:

организация пользователя,

иерархия (родитель/дочерние).

Уровень воркспейса:

workspace_permissions:

permission_level (owner, editor, viewer, custom),

can_share, can_export, can_create_tables, inherit_to_tables.

Уровень таблицы:

наследование прав от воркспейса,

возможность override:

только просмотр,

запрет на редактирование,

скрытие таблицы.

Уровень колонки:

скрытые колонки,

только чтение,

только для определённых ролей.

Уровень строки/ячейки (опционально, но у тебя это напрашивается):

row‑level security (например, только свой регион),

cell‑level lock (locked_by, lock_reason).

7.2. Основные сущности
Role

id

code (system_admin, federation_admin, etc.)

description

WorkspacePermission

workspace_id

user_id

role_id

permission_level

can_share

can_export

can_create_tables

inherit_to_tables

TablePermission (если нужно отдельно)

table_id

user_id / role_id

access_level (view, edit, none)

can_edit_structure

can_edit_formulas

ColumnPermission (минимально)

column_id

role_id

is_hidden

is_readonly

7.3. Правила доступа (policy‑уровень)
Примеры:

Пользователь может видеть воркспейс, если:

он владелец, или

есть запись в workspace_permissions, или

он system_admin.

Пользователь может редактировать таблицу, если:

у него permission_level >= editor в воркспейсе, и

нет явного запрета на уровне таблицы.

Пользователь может видеть колонку, если:

нет ColumnPermission.is_hidden = true для его роли.

AI‑агент:

имеет отдельную роль ai_agent,

его права = подмножество прав пользователя, от имени которого он действует.

7.4. Интеграция с AI‑агентом
Агент всегда действует от имени пользователя:

agent_context.user_id,

все проверки прав — как для пользователя.

Дополнительно:

глобальный флаг: «разрешить агенту создавать таблицы/формулы/связи».

ограничения на типы действий:

нельзя менять права,
нельзя публиковать версии.
