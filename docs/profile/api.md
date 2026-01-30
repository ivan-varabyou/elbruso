🧩 API Contracts: Dynamic Tables & Relations
Ниже — базовый набор API, который покрывает:

создание таблиц

управление структурой

создание связей

формулы

версии

черновики

📘 1. Создание таблицы
POST /dynamic-tables
Создание новой таблицы в воркспейсе.

Request
json
{
  "workspace_id": "uuid",
  "name": "Коэффициенты регионов",
  "description": "Таблица для расчёта рейтинга",
  "is_reference": false,
  "reference_type": null,
  "metadata": {
    "color": "#00AEEF"
  }
}
Response
json
{
  "id": "uuid",
  "workspace_id": "uuid",
  "name": "Коэффициенты регионов",
  "created_at": "2026-01-23T17:00:00Z"
}
📘 2. Создание таблицы на основе справочника
POST /dynamic-tables/from-dictionary
Request
json
{
  "workspace_id": "uuid",
  "dictionary": "regions",
  "filters": {
    "country_id": 643
  },
  "name": "Регионы РФ",
  "metadata": {}
}
Response
json
{
  "table_id": "uuid",
  "rows_created": 85,
  "columns_created": 1
}
📘 3. Добавление колонки
POST /dynamic-tables/{table_id}/columns
Request
json
{
  "name": "Население",
  "type": "number",
  "is_required": false,
  "metadata": {
    "format": "integer"
  }
}
Response
json
{
  "column_id": "uuid",
  "name": "Население",
  "type": "number"
}
📘 4. Добавление строки
POST /dynamic-tables/{table_id}/rows
Request
json
{
  "values": {
    "Регион": "Москва",
    "Население": 13000000
  }
}
Response
json
{
  "row_id": "uuid",
  "status": "created"
}
📘 5. Создание связи Lookup
POST /dynamic-tables/{table_id}/relations/lookup
Request
json
{
  "source_column": "uuid",
  "target_table": "uuid",
  "target_key_column": "uuid",
  "target_value_column": "uuid"
}
Response
json
{
  "relation_id": "uuid",
  "type": "lookup",
  "status": "active"
}
📘 6. Создание связи Join
POST /dynamic-tables/{table_id}/relations/join
Request
json
{
  "join_type": "left",
  "source_key_column": "uuid",
  "target_table": "uuid",
  "target_key_column": "uuid",
  "columns": ["uuid", "uuid"]
}
Response
json
{
  "relation_id": "uuid",
  "type": "join",
  "status": "active"
}
📘 7. Cross‑Workspace связь (read‑only)
POST /dynamic-tables/{table_id}/relations/cross-workspace
Request
json
{
  "external_workspace_id": "uuid",
  "external_table_id": "uuid",
  "mode": "readonly",
  "sync_policy": "manual"
}
Response
json
{
  "relation_id": "uuid",
  "type": "cross_workspace",
  "status": "active"
}
📘 8. Формулы
POST /dynamic-tables/{table_id}/formulas
Request
json
{
  "column_id": "uuid",
  "expression": "=A * B / 100",
  "dependencies": [
    { "table_id": "uuid", "column_id": "uuid" }
  ]
}
Response
json
{
  "formula_id": "uuid",
  "status": "valid"
}
📘 9. Проверка формулы (HUD)
POST /dynamic-tables/formulas/validate
Request
json
{
  "expression": "=TABLE(\"Население\").COLUMN(\"2024\").ROW(\"Москва\") * 0.1"
}
Response
json
{
  "is_valid": true,
  "preview_value": 1300000,
  "dependencies": [
    {
      "table_id": "uuid",
      "column_id": "uuid",
      "row_id": "uuid"
    }
  ]
}
📘 10. Создание черновика таблицы
POST /dynamic-tables/{table_id}/drafts
Response
json
{
  "draft_id": "uuid",
  "status": "created"
}
📘 11. Публикация версии
POST /dynamic-tables/{table_id}/versions/publish
Request
json
{
  "draft_id": "uuid",
  "change_description": "Добавлены коэффициенты"
}
Response
json
{
  "version_id": "uuid",
  "version_number": 4,
  "status": "published"
}
📘 12. Откат версии
POST /dynamic-tables/{table_id}/versions/{version_id}/rollback
Response
json
{
  "status": "rolled_back",
  "active_version": 3
}
🎯 Итог
Ты получил полный набор API‑контрактов, покрывающий:

создание таблиц

структуру

связи

формулы

HUD

версии

черновики
