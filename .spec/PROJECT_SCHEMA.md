# Project Schema Documentation: Elbruso

## Project Specification Overview
Elbruso is a modular monorepo system designed for sports data management, dynamic tables, and analytics.

### Architecture
- **Monorepo**: Managed by `pnpm` and `Turbo`.
- **Backend**: NestJS application with a modular architecture.
- **Frontend**: Next.js application following Feature-Sliced Design (FSD).
- **Database**: PostgreSQL (main storage) and Redis (caching).
- **Database Client**: Kysely (type-safe SQL query builder).

## Database Connection Details
- **Type**: PostgreSQL 16
- **Host**: `localhost`
- **Port**: `7900`
- **Database**: `elbruso`
- **User**: `postgres` / `elbruso`
- **Password**: `postgres` / `elbruso`
- **Connection String**: `postgresql://elbruso:elbruso@localhost:7900/elbruso`

## API Navigation (Swagger)
- **URL**: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
- **Main Modules**:
    - `auth`: Authentication and registration.
    - `users`: User management and profiles.
    - `workspaces`: Workspace and participant management.
    - `dynamic-tables`: Flexible table structures and data.
    - `formula`: Calculation engine.
    - `indicators`: Sports performance metrics.
    - `organizations`: Federations and clubs.
    - `sports`: Sports and disciplines.

## Database Tables and Fields
Below is a consolidated list of the main database tables and their fields, categorized by module.

### Core Modules
#### Users
- `users`: `id`, `email`, `password`, `name`, `is_active`, `organization_id`, `country_id`, `created_at`, `updated_at`
- `sessions`: `id`, `user_id`, `refresh_token`, `expires_at`, `created_at`
- `api_keys`: `id`, `user_id`, `name`, `key_hash`, `permissions`, `is_active`, `last_used_at`, `created_at`

#### Workspaces
- `workspaces`: `id`, `name`, `description`, `owner_id`, `organization_id`, `sport_id`, `season_id`, `is_template`, `is_active`, `metadata`, `created_at`, `updated_at`
- `workspace_groups`: `id`, `workspace_id`, `name`, `description`, `icon`, `color`, `sort_order`, `is_active`, `created_at`
- `workspace_permissions`: `id`, `workspace_id`, `user_id`, `role_id`, `organization_id`, `permission_level`, `can_share`, `can_export`, `can_create_tables`, `inherit_to_tables`, `expires_at`, `granted_at`, `granted_by`

#### Pages & Blocks
- `pages`: `id`, `workspace_id`, `parent_page_id`, `title`, `icon`, `cover_image`, `page_type`, `sort_order`, `is_public`, `public_url`, `public_password`, `view_count`, `last_viewed_at`, `is_active`, `metadata`, `created_at`, `updated_at`, `created_by`, `updated_by`
- `blocks`: `id`, `page_id`, `parent_block_id`, `block_type`, `content`, `settings`, `sort_order`, `is_active`, `created_at`, `updated_at`, `created_by`, `updated_by`

### Dynamic Tables
- `dynamic_tables`: `id`, `workspace_id`, `group_id`, `name`, `description`, `is_active`, `is_reference`, `reference_type`, `row_count`, `column_count`, `metadata`, `created_at`, `updated_at`, `created_by`
- `table_versions`: `id`, `table_id`, `version_number`, `columns`, `column_definitions`, `matrix_formulas`, `is_active`, `is_frozen`, `frozen_at`, `change_description`, `created_at`, `created_by`
- `table_cells`: `id`, `version_id`, `row_index`, `col_index`, `cell_data`, `is_locked`, `locked_at`, `locked_by`, `lock_reason`, `created_at`, `updated_at`, `created_by`, `updated_by`

### Sports Catalog
- `sports`: `id`, `name_ru`, `sport_type_id`, `olympic_category_id`, `is_active`, `created_at`, `updated_at`
- `disciplines`: `id`, `country_sport_id`, `name_ru`, `is_active`, `created_at`, `updated_at`
- `organizations`: `id`, `parent_id`, `name_ru`, `abbreviation_ru`, `type_id`, `level_id`, `sport_id`, `region_id`, `country_id`, `founded_year`, `internal_code`, `is_active`, `metadata`, `created_at`, `updated_at`

### Metrics & Analytics
- `indicator_catalog`: `id`, `sport_id`, `discipline_id`, `category_id`, `gender_id`, `age_group_id`, `measurement_unit_id`, `code`, `name_ru`, `description`, `value_type`, `calculation_formula`, `default_weight`, `use_population`, `source_hint`, `is_active`, `metadata`, `created_at`, `updated_at`
- `organization_indicator_values`: `id`, `organization_id`, `indicator_catalog_id`, `season_id`, `data_source_id`, `event_result_id`, `value_number`, `value_boolean`, `value_text`, `notes`, `metadata`, `created_at`, `updated_at`

### System & Reference
- `countries`: `id`, `code_alpha2`, `code_alpha3`, `name_ru`, `capital_city_code`, `currency_code`, `phone_code`, `is_active`, `created_at`
- `regions`: `id`, `country_id`, `federal_district_id`, `region_type_id`, `code`, `name_ru`, `is_active`, `created_at`
- `audit_logs`: `id`, `user_id`, `action`, `entity_type`, `entity_id`, `details`, `ip_address`, `user_agent`, `created_at`

---
*Note: This documentation is generated based on the project specification and active database schema.*
