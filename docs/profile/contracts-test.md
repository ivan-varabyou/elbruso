🧩 1. WORKSPACE_DRAFTS API
POST /workspace-drafts
Создать черновик воркспейса.

Request
json
{
  "workspace_id": "uuid",
  "metadata": {
    "reason": "AI agent suggestion"
  }
}
Response
json
{
  "draft_id": "uuid",
  "workspace_id": "uuid",
  "created_by": "uuid",
  "created_at": "2026-01-23T18:00:00Z"
}
GET /workspace-drafts/{draft_id}
Получить черновик.

Response
json
{
  "id": "uuid",
  "workspace_id": "uuid",
  "metadata": {},
  "created_by": "uuid",
  "created_at": "2026-01-23T18:00:00Z",
  "updated_at": "2026-01-23T18:10:00Z"
}
🧩 2. TABLE_DRAFTS API
POST /table-drafts
Создать черновик таблицы.

Request
json
{
  "table_id": "uuid",
  "workspace_draft_id": "uuid",
  "draft_data": {
    "columns": [],
    "rows": []
  }
}
Response
json
{
  "draft_id": "uuid",
  "table_id": "uuid",
  "workspace_draft_id": "uuid",
  "created_by": "uuid"
}
🧩 3. PAGE_DRAFTS API
POST /page-drafts
json
{
  "page_id": "uuid",
  "workspace_draft_id": "uuid",
  "content": {
    "blocks": []
  }
}
Response
json
{
  "draft_id": "uuid",
  "page_id": "uuid",
  "workspace_draft_id": "uuid"
}
🧩 4. AGENT_SESSIONS API
POST /ai/sessions
Создать сессию AI‑агента.

Request
json
{
  "workspace_id": "uuid",
  "context": {
    "active_table_id": "uuid"
  }
}
Response
json
{
  "session_id": "uuid",
  "workspace_id": "uuid",
  "user_id": "uuid",
  "created_at": "2026-01-23T18:00:00Z"
}
🧩 5. AGENT_ACTIONS API
POST /ai/actions
Записать действие агента.

Request
json
{
  "session_id": "uuid",
  "action_type": "create_table",
  "payload": {
    "name": "Коэффициенты регионов"
  }
}
Response
json
{
  "action_id": "uuid",
  "status": "recorded"
}
🧩 6. AGENT_CHANGE_SETS API
POST /ai/change-sets
Создать набор изменений.

Request
json
{
  "session_id": "uuid",
  "workspace_id": "uuid",
  "changes": [
    {
      "type": "add_table",
      "payload": {
        "name": "Региональные коэффициенты"
      }
    }
  ]
}
Response
json
{
  "change_set_id": "uuid",
  "status": "pending_review"
}
POST /ai/change-sets/{id}/approve
json
{
  "approved_by": "uuid"
}
Response
json
{
  "status": "approved",
  "applied_at": "2026-01-23T18:30:00Z"
}
🧩 7. AI_AGENT_POLICIES API
POST /ai/policies
json
{
  "user_id": "uuid",
  "workspace_id": "uuid",
  "can_create_tables": true,
  "can_create_formulas": true,
  "can_create_relations": false,
  "can_edit_data": false,
  "requires_approval": true
}
Response
json
{
  "policy_id": "uuid",
  "status": "created"
}
🧩 8. TABLE_DEPENDENCIES API
POST /table-dependencies
json
{
  "table_id": "uuid",
  "depends_on_table_id": "uuid",
  "dependency_type": "formula",
  "source_type": "column",
  "source_id": "uuid"
}
Response
json
{
  "dependency_id": "uuid",
  "status": "created"
}
🧩 9. FORMULA_DEPENDENCIES API
POST /formula-dependencies
json
{
  "formula_id": "uuid",
  "depends_on_table_id": "uuid",
  "depends_on_column_id": "uuid"
}
Response
json
{
  "id": "uuid",
  "status": "created"
}
🧩 10. TABLE_FORMULAS API
POST /table-formulas
json
{
  "table_id": "uuid",
  "version_id": "uuid",
  "target_type": "column",
  "target_id": "uuid",
  "expression": "=A * B / 100",
  "metadata": {}
}
Response
json
{
  "formula_id": "uuid",
  "is_valid": true
}
🧩 11. FORMULA_HISTORY API
POST /formula-history
json
{
  "formula_id": "uuid",
  "old_expression": "=A+B",
  "new_expression": "=A*B"
}
Response
json
{
  "history_id": "uuid"
}
🧩 12. TABLE_RELATIONS API
POST /table-relations
json
{
  "table_id": "uuid",
  "relation_type": "lookup",
  "source_column_id": "uuid",
  "target_table_id": "uuid",
  "target_key_column_id": "uuid",
  "target_value_column_id": "uuid",
  "sync_policy": "manual"
}
Response
json
{
  "relation_id": "uuid",
  "status": "active"
}
🧩 13. TABLE_PERMISSIONS API
POST /table-permissions
json
{
  "table_id": "uuid",
  "user_id": "uuid",
  "access_level": "edit_data",
  "can_edit_formulas": true,
  "can_edit_structure": false
}
Response
json
{
  "permission_id": "uuid"
}
🧩 14. COLUMN_PERMISSIONS API
POST /column-permissions
json
{
  "column_id": "uuid",
  "user_id": "uuid",
  "is_hidden": false,
  "is_readonly": true
}
Response
json
{
  "id": "uuid"
}
🧩 15. ROW_ACCESS_RULES API
POST /row-access-rules
json
{
  "table_id": "uuid",
  "rule_type": "by_region",
  "expression": "row.region_id == user.region_id"
}
Response
json
{
  "rule_id": "uuid"
}
🧩 16. CELL_LOCKS API
POST /cell-locks
json
{
  "table_id": "uuid",
  "row_index": 5,
  "col_index": 2,
  "is_locked": true,
  "lock_reason": "Protected by admin"
}
Response
json
{
  "lock_id": "uuid"
}
🧩 17. TEMPLATES API
POST /workspace-templates
json
{
  "name": "Федерация — базовый шаблон",
  "metadata": {}
}
Response
json
{
  "template_id": "uuid"
}
POST /table-templates
json
{
  "name": "Шаблон коэффициентов",
  "structure": {
    "columns": [
      { "name": "Регион", "type": "reference" },
      { "name": "Коэффициент", "type": "number" }
    ]
  }
}
Response
json
{
  "template_id": "uuid"
}
POST /page-templates
json
{
  "name": "Отчёт по региону",
  "content": {
    "blocks": []
  }
}
Response
json
{
  "template_id": "uuid"
}
🎯 Итог
Ты получил полный набор JSON‑контрактов API для:

Drafts

ChangeSets

AI‑agent

Dependencies

Formulas

Relations

Permissions

Templates
