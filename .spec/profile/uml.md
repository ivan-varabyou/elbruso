🧩 UML Use Case Diagram — Создание таблиц и связей
mermaid
%% UML Use Case Diagram for Dynamic Tables & Relations

usecaseDiagram

actor User as U
actor "AI Agent" as AI
actor "External Workspace" as EW

rectangle "Dynamic Tables Module" {

  (Create Empty Table) as UC1
  (Create Table from Template) as UC2
  (Create Table from Reference Dictionary) as UC3

  (Add Column) as UC4
  (Add Row) as UC5
  (Edit Column Type) as UC6

  (Create Lookup Relation) as UC7
  (Create Join Relation) as UC8
  (Create Reference Column) as UC9

  (Cross-Workspace Link) as UC10
  (Aggregate External Data) as UC11

  (Enter Formula Mode) as UC12
  (HUD-Assisted Formula Input) as UC13
  (Cross-Table Formula Reference) as UC14

  (Detect Source Changes) as UC15
  (Recalculate Dependencies) as UC16

  (Create Draft Version) as UC17
  (Publish Table Version) as UC18
  (Rollback Table Version) as UC19
}

U --> UC1
U --> UC2
U --> UC3

U --> UC4
U --> UC5
U --> UC6

U --> UC7
U --> UC8
U --> UC9

U --> UC10
U --> UC11
EW --> UC10

U --> UC12
U --> UC13
U --> UC14

U --> UC15
U --> UC16

U --> UC17
U --> UC18
U --> UC19

AI --> UC1
AI --> UC4
AI --> UC12
AI --> UC13
AI --> UC17
📘 Описание акторов
User
Создаёт таблицы

Настраивает структуру

Создаёт связи

Пишет формулы

Управляет версиями

AI Agent
Может создавать таблицы в черновике

Может предлагать формулы

Может создавать связи

Может инициировать пересчёт

External Workspace
Источник данных для cross-workspace связей

📘 Описание основных Use Cases
UC1 — Create Empty Table
Пользователь создаёт пустую таблицу.

UC3 — Create Table from Reference Dictionary
Таблица создаётся на основе справочника (регионы, критерии, организации).

UC7 — Create Lookup Relation
Связь «один-к-одному» между таблицами.

UC10 — Cross-Workspace Link
Таблица получает данные из другого воркспейса (read-only).

UC13 — HUD-Assisted Formula Input
Пользователь вводит формулу с подсказками и навигацией.

UC17 — Create Draft Version
Любое изменение создаёт черновик.

UC18 — Publish Table Version
Пользователь подтверждает изменения → создаётся новая версия.


🧩 Полная UML Class Diagram (Mermaid)
Dynamic Tables + Relations + Workspaces + Pages + Users + Organizations
mermaid
classDiagram
direction LR

%% =========================
%% USERS & ORGANIZATIONS
%% =========================

class User {
  +UUID id
  +String email
  +String password_hash
  +String name
  +Boolean is_active
  +UUID organization_id
  +UUID country_id
  +Date created_at
  +Date updated_at
}

class Organization {
  +UUID id
  +UUID parent_id
  +String name_ru
  +String abbreviation_ru
  +Integer type_id
  +Integer level_id
  +UUID sport_id
  +UUID region_id
  +UUID country_id
  +Integer founded_year
  +String internal_code
  +Boolean is_active
  +JSON metadata
  +Date created_at
  +Date updated_at
}

User --> Organization : belongs_to


%% =========================
%% WORKSPACES
%% =========================

class Workspace {
  +UUID id
  +String name
  +String description
  +UUID owner_id
  +UUID organization_id
  +UUID sport_id
  +UUID season_id
  +Boolean is_template
  +Boolean is_active
  +JSON metadata
  +Date created_at
  +Date updated_at
}

class WorkspacePermission {
  +UUID id
  +UUID workspace_id
  +UUID user_id
  +UUID role_id
  +UUID organization_id
  +String permission_level
  +Boolean can_share
  +Boolean can_export
  +Boolean can_create_tables
  +Boolean inherit_to_tables
  +Date expires_at
  +Date granted_at
  +UUID granted_by
}

Workspace "1" --> "many" WorkspacePermission : has_permissions


%% =========================
%% PAGES & BLOCKS
%% =========================

class Page {
  +UUID id
  +UUID workspace_id
  +UUID parent_page_id
  +String title
  +String icon
  +String cover_image
  +String page_type
  +Integer sort_order
  +Boolean is_public
  +String public_url
  +String public_password
  +Integer view_count
  +Date last_viewed_at
  +Boolean is_active
  +JSON metadata
  +Date created_at
  +Date updated_at
  +UUID created_by
  +UUID updated_by
}

class Block {
  +UUID id
  +UUID page_id
  +UUID parent_block_id
  +String block_type
  +JSON content
  +JSON settings
  +Integer sort_order
  +Boolean is_active
  +Date created_at
  +Date updated_at
  +UUID created_by
  +UUID updated_by
}

Workspace "1" --> "many" Page : contains
Page "1" --> "many" Block : contains


%% =========================
%% DYNAMIC TABLES
%% =========================

class DynamicTable {
  +UUID id
  +UUID workspace_id
  +UUID group_id
  +String name
  +String description
  +Boolean is_active
  +Boolean is_reference
  +String reference_type
  +Integer row_count
  +Integer column_count
  +JSON metadata
  +Date created_at
  +Date updated_at
  +UUID created_by
}

Workspace "1" --> "many" DynamicTable : contains


%% =========================
%% TABLE VERSIONS
%% =========================

class TableVersion {
  +UUID id
  +UUID table_id
  +Integer version_number
  +JSON columns
  +JSON column_definitions
  +JSON matrix_formulas
  +Boolean is_active
  +Boolean is_frozen
  +Date frozen_at
  +String change_description
  +Date created_at
  +UUID created_by
}

DynamicTable "1" --> "many" TableVersion : has_versions


%% =========================
%% CELLS
%% =========================

class TableCell {
  +UUID id
  +UUID version_id
  +Integer row_index
  +Integer col_index
  +JSON cell_data
  +Boolean is_locked
  +Date locked_at
  +UUID locked_by
  +String lock_reason
  +Date created_at
  +Date updated_at
  +UUID created_by
  +UUID updated_by
}

TableVersion "1" --> "many" TableCell : contains_cells


%% =========================
%% FORMULAS
%% =========================

class TableFormula {
  +UUID id
  +UUID table_id
  +UUID version_id
  +String target_type  %% cell | column | table
  +UUID target_id
  +String expression
  +JSON dependencies
  +Boolean is_valid
  +String error_message
  +Date created_at
  +UUID created_by
}

DynamicTable "1" --> "many" TableFormula : has_formulas
TableVersion "1" --> "many" TableFormula : version_formulas


%% =========================
%% RELATIONS
%% =========================

class TableRelation {
  +UUID id
  +UUID table_id
  +String relation_type  %% lookup | join | reference | cross_workspace
  +UUID source_column_id
  +UUID target_table_id
  +UUID target_column_id
  +UUID target_key_column_id
  +UUID target_value_column_id
  +String join_type
  +String sync_policy
  +Boolean is_active
  +Date created_at
}

DynamicTable "1" --> "many" TableRelation : has_relations


%% =========================
%% DEPENDENCY GRAPH
%% =========================

class TableDependency {
  +UUID id
  +UUID table_id
  +UUID depends_on_table_id
  +UUID depends_on_column_id
  +UUID depends_on_row_id
  +String dependency_type  %% formula | relation | reference
  +Date created_at
}

DynamicTable "1" --> "many" TableDependency : depends_on


%% =========================
%% DICTIONARIES
%% =========================

class Dictionary {
  +String type  %% regions | organizations | indicators | sports
  +JSON schema
  +Boolean is_system
}

DynamicTable --> Dictionary : may_reference


%% =========================
%% AI AGENT
%% =========================

class AIAgentAction {
  +UUID id
  +UUID workspace_id
  +UUID table_id
  +String action_type
  +JSON payload
  +String status
  +Date created_at
  +UUID created_by
}

Workspace "1" --> "many" AIAgentAction : ai_actions

🧩 UML Sequence Diagram — Полный цикл работы с таблицей
mermaid
sequenceDiagram
    autonumber

    participant U as User
    participant FE as Frontend (Next.js)
    participant API as API Gateway (NestJS)
    participant WS as Workspaces Service
    participant DT as Dynamic Tables Service
    participant FR as Formula Engine (HyperFormula Layer)
    participant DG as Dependency Graph Service
    participant VS as Versioning Service
    participant DB as PostgreSQL

    %% ============================
    %% 1. CREATE TABLE
    %% ============================

    U->>FE: Click "Create Table"
    FE->>API: POST /dynamic-tables (workspace_id, name)
    API->>DT: CreateTableRequest
    DT->>DB: INSERT INTO dynamic_tables
    DB-->>DT: table_id
    DT-->>API: TableCreated(table_id)
    API-->>FE: 201 Created
    FE-->>U: Table created and opened

    %% ============================
    %% 2. ADD COLUMN
    %% ============================

    U->>FE: Add Column ("Population")
    FE->>API: POST /dynamic-tables/{id}/columns
    API->>DT: AddColumnRequest
    DT->>DB: INSERT INTO table_versions (draft)
    DT->>DB: INSERT INTO column_definitions
    DB-->>DT: column_id
    DT-->>API: ColumnCreated(column_id)
    API-->>FE: Column added
    FE-->>U: Column appears in UI

    %% ============================
    %% 3. CREATE LOOKUP RELATION
    %% ============================

    U->>FE: Create Lookup Relation
    FE->>API: POST /dynamic-tables/{id}/relations/lookup
    API->>DT: CreateLookupRelationRequest
    DT->>DB: INSERT INTO table_relations
    DB-->>DT: relation_id

    DT->>DG: RegisterDependency(table_id, target_table_id)
    DG->>DB: INSERT INTO table_dependencies
    DB-->>DG: OK

    DT-->>API: LookupRelationCreated
    API-->>FE: Relation created
    FE-->>U: Lookup column populated

    %% ============================
    %% 4. ENTER FORMULA MODE (HUD)
    %% ============================

    U->>FE: Type "=" in cell
    FE->>FR: InitializeFormulaSession
    FR-->>FE: HUD Active (suggestions, syntax)

    U->>FE: Click cell in another table
    FE->>FR: AddReference(table_id, column_id, row_id)
    FR-->>FE: UpdatedFormulaExpression

    U->>FE: Confirm formula
    FE->>API: POST /dynamic-tables/{id}/formulas
    API->>DT: SaveFormulaRequest
    DT->>DB: INSERT INTO table_formulas
    DB-->>DT: formula_id

    DT->>DG: RegisterFormulaDependencies
    DG->>DB: INSERT INTO table_dependencies
    DB-->>DG: OK

    DT-->>API: FormulaSaved
    API-->>FE: Formula applied
    FE-->>U: Cell shows computed value

    %% ============================
    %% 5. RECALCULATE DEPENDENCIES
    %% ============================

    U->>FE: Modify source table value
    FE->>API: PATCH /dynamic-tables/{id}/cells
    API->>DT: UpdateCellRequest
    DT->>DB: UPDATE table_cells
    DB-->>DT: OK

    DT->>DG: QueryAffectedTables
    DG-->>DT: List of dependent tables

    DT->>FR: RecalculateFormulas
    FR->>DB: SELECT dependencies
    DB-->>FR: Data
    FR-->>DT: Updated values

    DT->>DB: UPDATE table_cells (recalculated)
    DB-->>DT: OK

    DT-->>API: RecalculationComplete
    API-->>FE: Updated values
    FE-->>U: UI refreshes dependent cells

    %% ============================
    %% 6. PUBLISH VERSION
    %% ============================

    U->>FE: Publish Changes
    FE->>API: POST /dynamic-tables/{id}/versions/publish
    API->>VS: PublishVersionRequest
    VS->>DB: INSERT INTO table_versions (final)
    DB-->>VS: version_id

    VS->>DB: Freeze draft version
    DB-->>VS: OK

    VS-->>API: VersionPublished(version_id)
    API-->>FE: Publish successful
    FE-->>U: Version published and locked
