🧩 ERD: Недостающие сущности Elbruso Platform
mermaid
erDiagram

%% ============================
%% DRAFTS & CHANGE SETS
%% ============================

WORKSPACE_DRAFTS {
  UUID id PK
  UUID workspace_id FK
  UUID created_by
  JSON metadata
  TIMESTAMP created_at
  TIMESTAMP updated_at
}

TABLE_DRAFTS {
  UUID id PK
  UUID table_id FK
  UUID workspace_draft_id FK
  JSON draft_data
  UUID created_by
  TIMESTAMP created_at
}

PAGE_DRAFTS {
  UUID id PK
  UUID page_id FK
  UUID workspace_draft_id FK
  JSON content
  UUID created_by
  TIMESTAMP created_at
}

AGENT_CHANGE_SETS {
  UUID id PK
  UUID agent_session_id FK
  UUID workspace_id FK
  JSON changes
  TEXT status
  UUID created_by
  TIMESTAMP created_at
  TIMESTAMP approved_at
  UUID approved_by
}

%% ============================
%% AI AGENT
%% ============================

AI_AGENT_SESSIONS {
  UUID id PK
  UUID user_id FK
  UUID workspace_id FK
  JSON context
  TIMESTAMP created_at
  TIMESTAMP last_activity_at
}

AI_AGENT_ACTIONS {
  UUID id PK
  UUID session_id FK
  TEXT action_type
  JSON payload
  TEXT status
  TIMESTAMP created_at
  UUID created_by
}

AI_AGENT_POLICIES {
  UUID id PK
  UUID user_id FK
  UUID workspace_id FK
  BOOLEAN can_create_tables
  BOOLEAN can_create_formulas
  BOOLEAN can_create_relations
  BOOLEAN can_edit_data
  BOOLEAN can_create_pages
  BOOLEAN requires_approval
}

%% ============================
%% DEPENDENCY GRAPH
%% ============================

TABLE_DEPENDENCIES {
  UUID id PK
  UUID table_id FK
  UUID depends_on_table_id FK
  UUID depends_on_column_id
  UUID depends_on_row_id
  TEXT dependency_type
  TEXT source_type
  UUID source_id
  TIMESTAMP created_at
}

FORMULA_DEPENDENCIES {
  UUID id PK
  UUID formula_id FK
  UUID depends_on_table_id FK
  UUID depends_on_column_id
  UUID depends_on_row_id
  TIMESTAMP created_at
}

%% ============================
%% FORMULAS
%% ============================

TABLE_FORMULAS {
  UUID id PK
  UUID table_id FK
  UUID version_id FK
  TEXT target_type
  UUID target_id
  TEXT expression
  BOOLEAN is_valid
  TEXT error_message
  JSON metadata
  TIMESTAMP created_at
  UUID created_by
}

FORMULA_HISTORY {
  UUID id PK
  UUID formula_id FK
  TEXT old_expression
  TEXT new_expression
  UUID changed_by
  TIMESTAMP changed_at
}

%% ============================
%% RELATIONS
%% ============================

TABLE_RELATIONS {
  UUID id PK
  UUID table_id FK
  TEXT relation_type
  UUID source_column_id
  UUID target_table_id FK
  UUID target_column_id
  UUID target_key_column_id
  UUID target_value_column_id
  TEXT join_type
  TEXT sync_policy
  BOOLEAN is_active
  JSON metadata
  TIMESTAMP created_at
}

%% ============================
%% PERMISSIONS
%% ============================

TABLE_PERMISSIONS {
  UUID id PK
  UUID table_id FK
  UUID user_id
  UUID role_id
  TEXT access_level
  BOOLEAN can_edit_formulas
  BOOLEAN can_edit_structure
  BOOLEAN can_delete_table
}

COLUMN_PERMISSIONS {
  UUID id PK
  UUID column_id FK
  UUID user_id
  UUID role_id
  BOOLEAN is_hidden
  BOOLEAN is_readonly
}

ROW_ACCESS_RULES {
  UUID id PK
  UUID table_id FK
  TEXT rule_type
  TEXT expression
  TIMESTAMP created_at
}

CELL_LOCKS {
  UUID id PK
  UUID table_id FK
  INT row_index
  INT col_index
  BOOLEAN is_locked
  UUID locked_by
  TEXT lock_reason
  TIMESTAMP locked_at
}

%% ============================
%% TEMPLATES
%% ============================

WORKSPACE_TEMPLATES {
  UUID id PK
  TEXT name
  JSON metadata
  TIMESTAMP created_at
}

TABLE_TEMPLATES {
  UUID id PK
  TEXT name
  JSON structure
  JSON metadata
  TIMESTAMP created_at
}

PAGE_TEMPLATES {
  UUID id PK
  TEXT name
  JSON content
  JSON metadata
  TIMESTAMP created_at
}

%% ============================
%% RELATIONSHIPS
%% ============================

WORKSPACE_DRAFTS ||--|| WORKSPACES : "belongs to"
TABLE_DRAFTS ||--|| DYNAMIC_TABLES : "draft of"
PAGE_DRAFTS ||--|| PAGES : "draft of"

AI_AGENT_SESSIONS ||--o{ AI_AGENT_ACTIONS : "has actions"
AI_AGENT_SESSIONS ||--o{ AGENT_CHANGE_SETS : "produces changes"

TABLE_FORMULAS ||--o{ FORMULA_DEPENDENCIES : "depends on"
TABLE_FORMULAS ||--o{ FORMULA_HISTORY : "has history"

DYNAMIC_TABLES ||--o{ TABLE_RELATIONS : "has relations"
DYNAMIC_TABLES ||--o{ TABLE_DEPENDENCIES : "depends on"

DYNAMIC_TABLES ||--o{ TABLE_PERMISSIONS : "permissions"
DYNAMIC_TABLES ||--o{ ROW_ACCESS_RULES : "row rules"
DYNAMIC_TABLES ||--o{ CELL_LOCKS : "cell locks"

DYNAMIC_TABLES ||--o{ TABLE_TEMPLATES : "template source"
WORKSPACES ||--o{ WORKSPACE_TEMPLATES : "template source"
PAGES ||--o{ PAGE_TEMPLATES : "template source"
🧠 Что покрывает эта ERD
✔ Полная модель AI‑агента
сессии

действия

политики

change sets

✔ Полная модель черновиков
воркспейсы

таблицы

страницы

✔ Полная модель зависимостей
таблицы

формулы

ячейки

✔ Полная модель формул
формулы

история

зависимости

ошибки

✔ Полная модель связей
lookup

join

reference

cross‑workspace

✔ Полная модель прав доступа
таблицы

колонки

строки

ячейки

политики

✔ Полная модель шаблонов
воркспейсы

таблицы

страницы
