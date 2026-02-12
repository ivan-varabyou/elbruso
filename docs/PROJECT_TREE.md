# Структура проекта

Генерировано: Чт 12 фев 2026 23:42:18 +03

/home/ivan/git/elbruso
├── apps
│   ├── api-gateway
│   │   ├── docs
│   │   │   └── PROJECT_TREE.md
│   │   ├── src
│   │   │   ├── config
│   │   │   │   └── config.ts
│   │   │   ├── core
│   │   │   │   ├── controllers
│   │   │   │   │   ├── health.controller.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── database
│   │   │   │   │   ├── {repositories}
│   │   │   │   │   ├── database.module.ts
│   │   │   │   │   └── database.service.ts
│   │   │   │   ├── dto
│   │   │   │   │   ├── api-response.dto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── filters
│   │   │   │   │   ├── http-exception.filter.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── guards
│   │   │   │   ├── interceptors
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── transform.interceptor.ts
│   │   │   │   ├── services
│   │   │   │   │   ├── health.service.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── websocket
│   │   │   │   │   ├── bootstrap.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── profile.gateway.ts
│   │   │   │   ├── gateway.module.ts
│   │   │   │   └── index.ts
│   │   │   ├── app.module.ts
│   │   │   ├── bootstrap.ts
│   │   │   └── main.ts
│   │   ├── test
│   │   │   ├── coverage
│   │   │   │   ├── lcov-report
│   │   │   │   │   ├── base.css
│   │   │   │   │   ├── favicon.png
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── prettify.css
│   │   │   │   │   └── sort-arrow-sprite.png
│   │   │   │   ├── base.css
│   │   │   │   ├── coverage-final.json
│   │   │   │   ├── favicon.png
│   │   │   │   ├── index.html
│   │   │   │   ├── lcov.info
│   │   │   │   ├── prettify.css
│   │   │   │   └── sort-arrow-sprite.png
│   │   │   ├── auth-users.e2e-spec.ts
│   │   │   ├── jest-e2e.json
│   │   │   ├── pages.e2e-spec.ts
│   │   │   ├── security.e2e-spec.ts
│   │   │   ├── test-request.helper.ts
│   │   │   ├── test-schema-full.sql
│   │   │   ├── test-schema.sql
│   │   │   └── workspaces.e2e-spec.ts
│   │   ├── AGENTS.md
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── test-advanced-e2e.ts
│   │   ├── test-security-e2e.ts
│   │   ├── test-simple-security.ts
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   ├── app-admin
│   │   ├── dictionaries
│   │   │   ├── en.json
│   │   │   └── ru.json
│   │   ├── docs
│   │   │   └── PROJECT_TREE.md
│   │   ├── public
│   │   │   ├── assets
│   │   │   │   └── img
│   │   │   │       └── login-bg.jpg
│   │   │   ├── images
│   │   │   │   └── auth-bg.jpg
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── favicon-96x96.png
│   │   │   ├── favicon.ico
│   │   │   ├── favicon.svg
│   │   │   ├── russia.geojson
│   │   │   ├── site.webmanifest
│   │   │   ├── web-app-manifest-192x192.png
│   │   │   └── web-app-manifest-512x512.png
│   │   ├── src
│   │   │   ├── app
│   │   │   │   ├── (admin)
│   │   │   │   │   ├── dashboard
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── indicators
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── organizations
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── seasons
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── settings
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── tables
│   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── test
│   │   │   │   │   ├── tables-test
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── users
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── workspaces
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── (auth)
│   │   │   │   │   ├── login
│   │   │   │   │   │   ├── login.css
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── AuthStats.css
│   │   │   │   │   ├── AuthStats.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── globals.css
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── components
│   │   │   ├── dictionaries
│   │   │   │   ├── en.json
│   │   │   │   └── ru.json
│   │   │   └── lib
│   │   │       ├── get-dictionary.ts
│   │   │       └── i18n-config.ts
│   │   ├── AGENTS.md
│   │   ├── next.config.mjs
│   │   ├── next-env.d.ts
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   └── app-web
│       ├── assets
│       │   └── img
│       │       ├── login-bg.jpg
│       │       └── logo.svg
│       ├── dictionaries
│       │   ├── en.json
│       │   └── ru.json
│       ├── docs
│       │   ├── COMPONENT_SYSTEM.md
│       │   ├── MIGRATION_TABLE.md
│       │   └── PROJECT_TREE.md
│       ├── public
│       │   ├── assets
│       │   │   └── img
│       │   │       └── login-bg.jpg
│       │   ├── images
│       │   │   └── auth-bg.jpg
│       │   ├── apple-touch-icon.png
│       │   ├── favicon-96x96.png
│       │   ├── favicon.ico
│       │   ├── favicon.svg
│       │   ├── russia.geojson
│       │   ├── site.webmanifest
│       │   ├── web-app-manifest-192x192.png
│       │   └── web-app-manifest-512x512.png
│       ├── src
│       │   ├── app
│       │   │   ├── (auth)
│       │   │   │   ├── forgot-password
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── login
│       │   │   │   │   ├── login.css
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── register
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   └── register.css
│       │   │   │   ├── reset-password
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── AUTH_CONFIG.md
│       │   │   │   ├── AuthStats.css
│       │   │   │   ├── AuthStats.tsx
│       │   │   │   └── layout.tsx
│       │   │   ├── (profile)
│       │   │   │   ├── dashboard
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── indicators
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── organizations
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── seasons
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── settings
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── tables
│       │   │   │   │   └── [id]
│       │   │   │   │       └── page.tsx
│       │   │   │   ├── tables-test
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── workspace
│       │   │   │   │   ├── [workspaceId]
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── workspaces
│       │   │   │   │   └── page.tsx
│       │   │   │   └── layout.tsx
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── components
│       │   │   └── home
│       │   │       ├── Brands
│       │   │       │   ├── Brands.smart.tsx
│       │   │       │   └── index.ts
│       │   │       ├── ChartsShowcase
│       │   │       │   ├── ChartsShowcase.smart.tsx
│       │   │       │   └── index.ts
│       │   │       ├── DataWavesBackground
│       │   │       │   ├── DataWavesBackground.smart.tsx
│       │   │       │   └── index.ts
│       │   │       ├── Footer
│       │   │       │   ├── Footer.smart.tsx
│       │   │       │   └── index.ts
│       │   │       ├── Header
│       │   │       │   ├── Header.smart.tsx
│       │   │       │   └── index.ts
│       │   │       ├── Hero
│       │   │       │   ├── Hero.smart.tsx
│       │   │       │   └── index.ts
│       │   │       ├── HomePage
│       │   │       │   ├── HomePage.tsx
│       │   │       │   └── index.ts
│       │   │       ├── InteractiveGrid
│       │   │       │   ├── index.ts
│       │   │       │   └── InteractiveGrid.smart.tsx
│       │   │       ├── LiveSportsChart
│       │   │       │   ├── chartConfig.constant.ts
│       │   │       │   ├── index.ts
│       │   │       │   └── LiveSportsChart.smart.tsx
│       │   │       └── ProductsShowcase
│       │   │           ├── index.ts
│       │   │           └── ProductsShowcase.smart.tsx
│       │   ├── lib
│       │   │   ├── get-dictionary.ts
│       │   │   ├── i18n-config.ts
│       │   │   └── middleware.ts
│       │   ├── pages
│       │   └── types
│       ├── AGENTS.md
│       ├── next.config.mjs
│       ├── next-env.d.ts
│       ├── package.json
│       ├── postcss.config.js
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── tsconfig.tsbuildinfo
├── docs
│   ├── data
│   │   ├── API_AUTH_GUIDE.md
│   │   ├── auto_gen.md
│   │   ├── backend-architecture.md
│   │   ├── BI.md
│   │   ├── D3_SERVICE_REPORT.md
│   │   ├── DATABASE_SETUP.md
│   │   ├── debug-mode-guide.md
│   │   ├── DEV_SETUP.md
│   │   ├── ERD.md
│   │   ├── image.png
│   │   ├── init.md
│   │   ├── organ.md
│   │   ├── PORT_SCHEMA.md
│   │   ├── profile.ms
│   │   ├── PROJECT_SCHEMA.md
│   │   ├── readme.md
│   │   ├── Reestr_b2e716479e-25-07-2025.csv
│   │   ├── region.md
│   │   ├── TASK.md
│   │   ├── TEST_CREDENTIALS.md
│   │   ├── Всероссийский реестр видов спорта на 12.1.2026.xlsx
│   │   ├── Иерархия рейтинга РФБ.md
│   │   ├── Организации и структуры.md
│   │   └── Реестр_общероссийских_и_региональных_аккредитованных_спортивных_федераций.csv
│   ├── database
│   │   ├── __pycache__
│   │   │   ├── import_federations.cpython-310.pyc
│   │   │   └── sport_code_mapping.cpython-310.pyc
│   │   ├── 00_install_dynamic_tables.sql
│   │   ├── 00_master_install.sql
│   │   ├── 01_reference_tables.sql
│   │   ├── 02_core_entities.sql
│   │   ├── 03a_indicators_system_fix.sql
│   │   ├── 03_indicators_system.sql
│   │   ├── 04_values_and_results.sql
│   │   ├── 05_registry_import.sql
│   │   ├── 06_regions_import.sql
│   │   ├── 07_federations_import.sql
│   │   ├── 08_basketball_indicators_full.sql
│   │   ├── 08_basketball_indicators.sql
│   │   ├── 09_universal_indicators_system.sql
│   │   ├── 10_seasons_utilities.sql
│   │   ├── 11_reference_tables.sql
│   │   ├── 12_group_relationships.sql
│   │   ├── 13_autogeneration_system.sql
│   │   ├── 14_referee_license_categories.sql
│   │   ├── 15_basketball_events_catalog.sql
│   │   ├── 16_basketball_manual_indicators.sql
│   │   ├── 17_basketball_autogeneration_templates.sql
│   │   ├── 18_basketball_criteria_full.sql
│   │   ├── 19_basketball_criteria_professional.sql
│   │   ├── 20_basketball_criteria_youth.sql
│   │   ├── 21_basketball_criteria_mass.sql
│   │   ├── 21_basketball_criteria_remaining.sql
│   │   ├── 22_basketball_criteria_final.sql
│   │   ├── 23_athletics_criteria_full.sql
│   │   ├── 24_athletics_criteria_additional.sql
│   │   ├── 25_dynamic_tables_core.sql
│   │   ├── 26_dynamic_tables_permissions.sql
│   │   ├── 27_dynamic_tables_history.sql
│   │   ├── 28_dashboard_reports.sql
│   │   ├── 99_admin_roles.sql
│   │   ├── ALL_UNIFIED_DATA.sql
│   │   ├── ALL_UNIFIED_INDICATORS.sql
│   │   ├── AUTOGENERATION_CONCEPT.md
│   │   ├── AUTO_GENERATION_GUIDE.md
│   │   ├── COMPLETE_indicators_load.sql
│   │   ├── CRITERIA_MAPPING.md
│   │   ├── DYNAMIC_TABLES_GUIDE.md
│   │   ├── FEDERATIONS_IMPORT_README.md
│   │   ├── FINAL_COMPLETE_load.sql
│   │   ├── FINAL_COMPLETE_MAPPED_load.sql
│   │   ├── FINAL_FINAL_load.sql
│   │   ├── FINAL_FIXED_ID_load.sql
│   │   ├── FINAL_indicators_load.sql
│   │   ├── FINAL_MAPPED_load.sql
│   │   ├── FINAL_NO_ID_load.sql
│   │   ├── FINAL_ROBUST_load.sql
│   │   ├── FINAL_STRUCTURE.md
│   │   ├── GENERATED_all_indicators.sql
│   │   ├── HIERARCHICAL_GROUPS.md
│   │   ├── import_federations.py
│   │   ├── import_registry.py
│   │   ├── IMPROVED_INDICATORS_PROPOSAL.md
│   │   ├── parse_criteria.py
│   │   ├── README.md
│   │   ├── REFACTORING_PROPOSAL.md
│   │   ├── REFERENCE_DATA.sql
│   │   ├── REGISTRY_IMPORT_GUIDE.md
│   │   ├── Screenshot from 2026-01-19 10-43-51.png
│   │   ├── Screenshot from 2026-01-19 10-54-00.png
│   │   ├── seed_templates.sql
│   │   ├── sport_code_mapping.py
│   │   ├── SPORTS_TO_ADD.md
│   │   ├── temp_indicators.sql
│   │   ├── UNIVERSAL_SYSTEM_GUIDE.md
│   │   ├── UNIVERSAL_SYSTEM_README.md
│   │   ├── update_gen_logic_v4.sql
│   │   ├── update_gen_logic_v5.sql
│   │   ├── update_gen_v3.sql
│   │   └── update_users_v1.sql
│   ├── entity
│   │   ├── age_category.md
│   │   ├── core.nd
│   │   ├── country.md
│   │   ├── entity.md
│   │   ├── federation.md
│   │   ├── gender.md
│   │   ├── org--ru-ath.md
│   │   ├── org-ru-bff.md
│   │   ├── org-world.md
│   │   ├── region.md
│   │   └── stort-type.md
│   ├── profile
│   │   ├── ai.md
│   │   ├── api.md
│   │   ├── check-list.md
│   │   ├── contracts-test.md
│   │   ├── edr.md
│   │   ├── project.md
│   │   ├── test-cases.md
│   │   ├── test-plan.md
│   │   ├── uml.md
│   │   └── useCase.md
│   ├── DESIGN_SYSTEM.md
│   ├── IMPORT_STYLE_GUIDE.md
│   ├── memory-graph.html
│   ├── PRODUCTION_SETUP.md
│   ├── PROJECT_TREE.md
│   └── TEST_CREDENTIALS.md
├── packages
│   ├── backend
│   │   ├── docs
│   │   │   └── PROJECT_TREE.md
│   │   ├── src
│   │   │   ├── config
│   │   │   ├── lib
│   │   │   ├── modules
│   │   │   │   ├── admin
│   │   │   │   │   ├── admin-auth
│   │   │   │   │   │   ├── controllers
│   │   │   │   │   │   │   └── admin-auth.controller.ts
│   │   │   │   │   │   ├── dto
│   │   │   │   │   │   │   └── login.dto.ts
│   │   │   │   │   │   ├── services
│   │   │   │   │   │   │   └── admin-auth.service.ts
│   │   │   │   │   │   └── strategies
│   │   │   │   │   │       └── admin-jwt.strategy.ts
│   │   │   │   │   ├── admin-users
│   │   │   │   │   │   └── dto
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── admin-auth.controller.ts
│   │   │   │   │   │   ├── admin-me.controller.ts
│   │   │   │   │   │   ├── admin-setup.controller.ts
│   │   │   │   │   │   ├── admin-workspace.controller.ts
│   │   │   │   │   │   ├── admin-workspace-template.controller.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── decorators
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── roles.decorator.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── admin-auth.response.dto.ts
│   │   │   │   │   │   │   ├── admin-me.response.dto.ts
│   │   │   │   │   │   │   ├── admin-setup.response.dto.ts
│   │   │   │   │   │   │   ├── admin-user.response.dto.ts
│   │   │   │   │   │   │   ├── admin-users-list.response.dto.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── role.response.dto.ts
│   │   │   │   │   │   │   ├── roles-list.response.dto.ts
│   │   │   │   │   │   │   ├── workspace.response.dto.ts
│   │   │   │   │   │   │   ├── workspaces-list.response.dto.ts
│   │   │   │   │   │   │   ├── workspace-template.response.dto.ts
│   │   │   │   │   │   │   └── workspace-templates-list.response.dto.ts
│   │   │   │   │   │   ├── admin-login.dto.ts
│   │   │   │   │   │   ├── admin-reset.dto.ts
│   │   │   │   │   │   ├── admin-setup.dto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── enums
│   │   │   │   │   │   └── admin-role.enum.ts
│   │   │   │   │   ├── guards
│   │   │   │   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── permissions.guard.ts
│   │   │   │   │   │   └── roles.guard.ts
│   │   │   │   │   ├── roles
│   │   │   │   │   │   ├── dto
│   │   │   │   │   │   │   ├── create-role.dto.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   └── update-role.dto.ts
│   │   │   │   │   │   ├── admin-roles.controller.ts
│   │   │   │   │   │   ├── admin-roles.module.ts
│   │   │   │   │   │   └── admin-roles.service.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── admin-auth.service.ts
│   │   │   │   │   │   ├── admin-setup.service.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── strategies
│   │   │   │   │   │   ├── admin-jwt.strategy.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── users
│   │   │   │   │   │   ├── dto
│   │   │   │   │   │   │   ├── create-admin-user.dto.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── update-admin-me.dto.ts
│   │   │   │   │   │   │   └── update-admin-user.dto.ts
│   │   │   │   │   │   ├── admin-users.controller.ts
│   │   │   │   │   │   ├── admin-users.module.ts
│   │   │   │   │   │   └── admin-users.service.ts
│   │   │   │   │   ├── admin-auth.module.ts
│   │   │   │   │   ├── admin.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── audit
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── audit.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── audit.service.ts
│   │   │   │   │   ├── audit.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── auth
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── auth.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── auth.response.dto.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   └── user.response.dto.ts
│   │   │   │   │   │   ├── auth.dto.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── password-recovery.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   ├── auth.events.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── guards
│   │   │   │   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   │   │   │   ├── any-jwt-auth.guard.ts
│   │   │   │   │   │   ├── api-key-auth.guard.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── jwt-auth.guard.ts
│   │   │   │   │   ├── interfaces
│   │   │   │   │   │   ├── auth.interface.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── auth.service.ts
│   │   │   │   │   ├── strategies
│   │   │   │   │   │   ├── api-key.strategy.ts
│   │   │   │   │   │   ├── jwt.strategy.ts
│   │   │   │   │   │   └── local.strategy.ts
│   │   │   │   │   ├── auth.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── blocks
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── blocks.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── block.response.dto.ts
│   │   │   │   │   │   │   ├── blocks-list.response.dto.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── blocks.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── blocks.service.ts
│   │   │   │   │   ├── blocks.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── content
│   │   │   │   │   ├── blocks
│   │   │   │   │   │   └── dto
│   │   │   │   │   ├── charts
│   │   │   │   │   └── pages
│   │   │   │   │       └── dto
│   │   │   │   ├── countries
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── countries.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── country.response.dto.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── countries.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── countries.service.ts
│   │   │   │   │   ├── countries.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── database
│   │   │   │   ├── email
│   │   │   │   │   ├── controllers
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── email.events.ts
│   │   │   │   │   ├── interfaces
│   │   │   │   │   │   └── email-provider.interface.ts
│   │   │   │   │   ├── providers
│   │   │   │   │   │   ├── console-email.provider.ts
│   │   │   │   │   │   └── smtp-email.provider.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── email.service.ts
│   │   │   │   │   ├── email.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── events
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── events.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── event.response.dto.ts
│   │   │   │   │   │   │   ├── events-list.response.dto.ts
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── event-filters.dto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── events.service.ts
│   │   │   │   │   ├── events.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── indicators
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── indicator-groups.controller.ts
│   │   │   │   │   │   └── indicators.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── groups-list.response.dto.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── indicator-group.response.dto.ts
│   │   │   │   │   │   │   ├── indicator.response.dto.ts
│   │   │   │   │   │   │   └── indicators-list.response.dto.ts
│   │   │   │   │   │   ├── generate-indicators.dto.ts
│   │   │   │   │   │   ├── indicator-filters.dto.ts
│   │   │   │   │   │   ├── indicator-group.dto.ts
│   │   │   │   │   │   └── indicator-group-filters.dto.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   ├── interfaces
│   │   │   │   │   ├── mappers
│   │   │   │   │   │   ├── indicator-group.mapper.ts
│   │   │   │   │   │   └── indicator.mapper.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── indicator-groups.service.ts
│   │   │   │   │   │   └── indicators.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── indicators.module.ts
│   │   │   │   ├── organizations
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── admin-organizations.controller.ts
│   │   │   │   │   │   └── organizations.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── organization-level.response.dto.ts
│   │   │   │   │   │   │   ├── organization.response.dto.ts
│   │   │   │   │   │   │   ├── organizations-list.response.dto.ts
│   │   │   │   │   │   │   └── organization-type.response.dto.ts
│   │   │   │   │   │   ├── create-organization.dto.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── move-organization.dto.ts
│   │   │   │   │   │   ├── organization-filters.dto.ts
│   │   │   │   │   │   └── update-organization.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── organizations.events.ts
│   │   │   │   │   ├── mappers
│   │   │   │   │   │   └── organization.mapper.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── organizations.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── organizations.module.ts
│   │   │   │   ├── packages
│   │   │   │   │   └── backend
│   │   │   │   │       └── src
│   │   │   │   │           └── modules
│   │   │   │   │               └── workspace-template
│   │   │   │   │                   ├── controllers
│   │   │   │   │                   ├── dto
│   │   │   │   │                   └── services
│   │   │   │   ├── pages
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── pages.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── page.response.dto.ts
│   │   │   │   │   │   │   ├── pages-list.response.dto.ts
│   │   │   │   │   │   │   ├── page-tree-item.response.dto.ts
│   │   │   │   │   │   │   └── page-tree.response.dto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── pages.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── pages.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── pages.module.ts
│   │   │   │   ├── reference
│   │   │   │   │   ├── countries
│   │   │   │   │   ├── organizations
│   │   │   │   │   ├── regions
│   │   │   │   │   ├── seasons
│   │   │   │   │   └── sports
│   │   │   │   ├── regions
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── regions.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── region.response.dto.ts
│   │   │   │   │   │   │   └── regions-list.response.dto.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── region-filters.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── regions.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── regions.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── regions.module.ts
│   │   │   │   ├── seasons
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── seasons.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── season.response.dto.ts
│   │   │   │   │   │   │   └── seasons-list.response.dto.ts
│   │   │   │   │   │   ├── generate-seasons.dto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── seasons.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── seasons.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── seasons.module.ts
│   │   │   │   ├── sports
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── sports.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── sport.response.dto.ts
│   │   │   │   │   │   │   └── sports-list.response.dto.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── sport-filters.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── sports.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── sports.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── sports.module.ts
│   │   │   │   ├── tables
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── formula.controller.ts
│   │   │   │   │   │   └── tables.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── cells.response.dto.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── table.response.dto.ts
│   │   │   │   │   │   │   └── tables-list.response.dto.ts
│   │   │   │   │   │   ├── formula-analysis.dto.ts
│   │   │   │   │   │   └── tables.dto.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   │   ├── formula.entity.ts
│   │   │   │   │   │   └── table.entity.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── tables.events.ts
│   │   │   │   │   ├── formula
│   │   │   │   │   │   └── dto
│   │   │   │   │   │       └── responses
│   │   │   │   │   │           ├── formula-analysis.response.dto.ts
│   │   │   │   │   │           └── index.ts
│   │   │   │   │   ├── interfaces
│   │   │   │   │   │   └── tables.interface.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── formula.service.ts
│   │   │   │   │   │   └── tables.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── tables.module.ts
│   │   │   │   ├── users
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   └── users.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── responses
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── user.response.dto.ts
│   │   │   │   │   │   │   └── users-list.response.dto.ts
│   │   │   │   │   │   ├── create-user.dto.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── update-user.dto.ts
│   │   │   │   │   │   └── user-settings.dto.ts
│   │   │   │   │   ├── enums
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── user-role.enum.ts
│   │   │   │   │   ├── events
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── users.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── users.module.ts
│   │   │   │   └── workspace
│   │   │   │       ├── controllers
│   │   │   │       │   ├── workspace.controller.ts
│   │   │   │       │   ├── workspace-group.controller.ts
│   │   │   │       │   └── workspace-template.controller.ts
│   │   │   │       ├── dto
│   │   │   │       │   ├── responses
│   │   │   │       │   │   ├── groups-list.response.dto.ts
│   │   │   │       │   │   ├── index.ts
│   │   │   │       │   │   ├── workspace-group.response.dto.ts
│   │   │   │       │   │   ├── workspace.response.dto.ts
│   │   │   │       │   │   └── workspaces-list.response.dto.ts
│   │   │   │       │   ├── index.ts
│   │   │   │       │   ├── workspace.dto.ts
│   │   │   │       │   ├── workspace-group.dto.ts
│   │   │   │       │   └── workspace-template.dto.ts
│   │   │   │       ├── events
│   │   │   │       │   └── workspace.events.ts
│   │   │   │       ├── services
│   │   │   │       │   ├── workspace-group.service.ts
│   │   │   │       │   └── workspace.service.ts
│   │   │   │       ├── workspace-template
│   │   │   │       │   └── dto
│   │   │   │       │       └── responses
│   │   │   │       │           ├── index.ts
│   │   │   │       │           ├── template.response.dto.ts
│   │   │   │       │           └── templates-list.response.dto.ts
│   │   │   │       ├── index.ts
│   │   │   │       └── workspace.module.ts
│   │   │   └── shared
│   │   │       ├── decorators
│   │   │       │   └── roles.decorator.ts
│   │   │       ├── dto
│   │   │       ├── interfaces
│   │   │       └── utils
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── context
│   │   ├── mcp-server
│   │   │   ├── __pycache__
│   │   │   │   └── server.cpython-310.pyc
│   │   │   └── server.py
│   │   ├── proxy
│   │   │   ├── qdrant_proxy.py
│   │   │   ├── qdrant-proxy.service
│   │   │   └── run_proxy.sh
│   │   ├── __pycache__
│   │   │   ├── graph_generator.cpython-310.pyc
│   │   │   └── logging_config.cpython-310.pyc
│   │   ├── scripts
│   │   │   ├── backup.py
│   │   │   ├── delete_memory.py
│   │   │   ├── embed.py
│   │   │   ├── get_memory.py
│   │   │   ├── list_memory.py
│   │   │   ├── save_memory.py
│   │   │   └── search_memory.py
│   │   ├── ARCHITECTURE.md
│   │   ├── CONFIG.md
│   │   ├── docker-compose.yml
│   │   ├── graph_generator.py
│   │   ├── INSTALL.sh
│   │   ├── logging_config.py
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── requirements.txt
│   │   ├── SETUP.md
│   │   ├── test_memory.py
│   │   ├── TOOLS.md
│   │   ├── TROUBLESHOOTING.md
│   │   ├── USAGE.md
│   │   └── USAGE_RU.md
│   ├── database
│   │   ├── migrations
│   │   │   └── 001_add_auth_enhancements.sql
│   │   ├── src
│   │   │   ├── database.module.ts
│   │   │   ├── database.service.ts
│   │   │   ├── db.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── devtools
│   │   ├── src
│   │   │   ├── builder
│   │   │   │   ├── babel
│   │   │   │   │   ├── jsx-plugin.mjs
│   │   │   │   │   ├── plugin.mjs
│   │   │   │   │   └── turbopack-plugin.mjs
│   │   │   │   └── webpack
│   │   │   │       ├── jsx-source-loader.cjs
│   │   │   │       ├── passthrough.cjs
│   │   │   │       └── plugin.cjs
│   │   │   ├── ui
│   │   │   │   ├── components
│   │   │   │   │   └── DevTools.tsx
│   │   │   │   ├── lib
│   │   │   │   │   ├── dom.ts
│   │   │   │   │   ├── shadow-root.ts
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── utils.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── mount.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   └── tsconfig.json
│   └── frontend
│       ├── docs
│       │   ├── COMPONENT_SYSTEM.md
│       │   ├── MIGRATION_TABLE.md
│       │   └── PROJECT_TREE.md
│       ├── src
│       │   ├── api
│       │   │   ├── admin
│       │   │   │   ├── admin-organizations.api.ts
│       │   │   │   ├── auth.ts
│       │   │   │   ├── client.ts
│       │   │   │   └── index.ts
│       │   │   ├── hooks
│       │   │   │   ├── index.ts
│       │   │   │   ├── queryClient.hook.ts
│       │   │   │   ├── ReactQueryProvider.tsx
│       │   │   │   ├── useAuth.hook.ts
│       │   │   │   ├── useCountries.hook.ts
│       │   │   │   ├── useForgotPassword.hook.ts
│       │   │   │   ├── useOrganizations.hook.ts
│       │   │   │   ├── useReference.hook.ts
│       │   │   │   ├── useResetPassword.hook.ts
│       │   │   │   ├── useUsers.hook.ts
│       │   │   │   └── useWorkspaces.hook.ts
│       │   │   ├── admin.api.ts
│       │   │   ├── Admin.ts
│       │   │   ├── api-mapping.ts
│       │   │   ├── api-types.ts
│       │   │   ├── api-utils.ts
│       │   │   ├── auth.api.ts
│       │   │   ├── Auth.ts
│       │   │   ├── blocks.api.ts
│       │   │   ├── Blocks.ts
│       │   │   ├── client.ts
│       │   │   ├── config.constant.ts
│       │   │   ├── countries.api.ts
│       │   │   ├── Countries.ts
│       │   │   ├── create-api.service.ts
│       │   │   ├── data-contracts.ts
│       │   │   ├── definitions.ts
│       │   │   ├── endpoints.ts
│       │   │   ├── error.ts
│       │   │   ├── events.api.ts
│       │   │   ├── Events.ts
│       │   │   ├── formulas.api.ts
│       │   │   ├── Formulas.ts
│       │   │   ├── groups.api.ts
│       │   │   ├── Groups.ts
│       │   │   ├── Health.ts
│       │   │   ├── http-client.service.ts
│       │   │   ├── http-client.ts
│       │   │   ├── index.ts
│       │   │   ├── pages.api.ts
│       │   │   ├── Pages.ts
│       │   │   ├── reference.api.ts
│       │   │   ├── Reference.ts
│       │   │   ├── tables.api.ts
│       │   │   ├── Tables.ts
│       │   │   ├── users.api.ts
│       │   │   ├── Users.ts
│       │   │   ├── versions.api.ts
│       │   │   ├── Versions.ts
│       │   │   ├── websocket.ws.ts
│       │   │   ├── workspaces.api.ts
│       │   │   ├── Workspaces.ts
│       │   │   ├── workspace-template.api.ts
│       │   │   └── WorkspaceTemplates.ts
│       │   ├── app
│       │   │   ├── providers
│       │   │   │   ├── AppProviders.tsx
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   ├── build
│       │   │   └── plugins
│       │   │       └── inject-source.cjs
│       │   ├── lib
│       │   │   ├── react
│       │   │   │   └── SourceTracker.smart.tsx
│       │   │   ├── cn.lib.ts
│       │   │   └── index.ts
│       │   ├── modules
│       │   │   ├── admin
│       │   │   │   ├── api
│       │   │   │   ├── auth
│       │   │   │   │   ├── lib
│       │   │   │   │   │   ├── AdminAuthContext.tsx
│       │   │   │   │   │   └── ProtectedRoute.tsx
│       │   │   │   │   ├── ui
│       │   │   │   │   │   ├── AdminLoginForm.tsx
│       │   │   │   │   │   ├── auth.css
│       │   │   │   │   │   └── index.ts
│       │   │   │   │   └── index.ts
│       │   │   │   ├── ui
│       │   │   │   │   ├── AdminLayout
│       │   │   │   │   │   ├── AdminLayout.smart.tsx
│       │   │   │   │   │   └── AdminRightPanel.smart.tsx
│       │   │   │   │   ├── AdminLeftPanel
│       │   │   │   │   │   ├── AdminLeftPanel.smart.tsx
│       │   │   │   │   │   └── index.ts
│       │   │   │   │   ├── AdminSettings
│       │   │   │   │   │   ├── AdminSettings.smart.tsx
│       │   │   │   │   │   ├── CreateAdminModal.dump.tsx
│       │   │   │   │   │   ├── ProfileSettings.smart.tsx
│       │   │   │   │   │   └── UserManagement.smart.tsx
│       │   │   │   │   ├── AdminTemplateTree
│       │   │   │   │   │   ├── AdminTemplateTree.smart.tsx
│       │   │   │   │   │   ├── CreateTemplateModal.smart.tsx
│       │   │   │   │   │   └── index.ts
│       │   │   │   │   ├── Organizations
│       │   │   │   │   │   ├── CreateOrganizationModal.tsx
│       │   │   │   │   │   ├── DeleteConfirmationModal.tsx
│       │   │   │   │   │   ├── EditOrganizationModal.tsx
│       │   │   │   │   │   ├── OrganizationsList.tsx
│       │   │   │   │   │   └── OrganizationsTree.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── auth
│       │   │   │   ├── lib
│       │   │   │   │   ├── AuthContext.tsx
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── ProtectedRoute.smart.tsx
│       │   │   │   ├── ui
│       │   │   │   │   ├── auth.css
│       │   │   │   │   ├── index.ts
│       │   │   │   │   ├── LoginForm.smart.tsx
│       │   │   │   │   ├── RegisterForm.smart.tsx
│       │   │   │   │   └── ResetPasswordForm.smart.tsx
│       │   │   │   └── index.ts
│       │   │   ├── dashboard
│       │   │   │   └── index.ts
│       │   │   ├── events
│       │   │   │   └── index.ts
│       │   │   ├── i18n
│       │   │   │   ├── lib
│       │   │   │   │   ├── language
│       │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   └── LanguageContext.tsx
│       │   │   │   │   ├── I18nProvider.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── ui
│       │   │   │   │   └── LanguageSwitcher
│       │   │   │   │       ├── index.ts
│       │   │   │   │       ├── LanguageSwitcher.css
│       │   │   │   │       └── LanguageSwitcher.smart.tsx
│       │   │   │   └── index.ts
│       │   │   ├── indicators
│       │   │   │   └── index.ts
│       │   │   ├── notifications
│       │   │   │   ├── hooks
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── useToast.ts
│       │   │   │   ├── providers
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── ToastProvider.tsx
│       │   │   │   ├── types
│       │   │   │   │   └── index.ts
│       │   │   │   ├── ui
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── ToastContainer.smart.tsx
│       │   │   │   └── index.ts
│       │   │   ├── pages
│       │   │   │   └── index.ts
│       │   │   ├── profile
│       │   │   │   ├── ui
│       │   │   │   │   ├── indicators
│       │   │   │   │   │   ├── components
│       │   │   │   │   │   │   ├── CreateIndicatorModal.tsx
│       │   │   │   │   │   │   ├── FilterDropdown.smart.tsx
│       │   │   │   │   │   │   ├── GenerateIndicatorsModal.tsx
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   ├── IndicatorGroupModal.tsx
│       │   │   │   │   │   │   └── IndicatorGroupsList.smart.tsx
│       │   │   │   │   │   └── index.ts
│       │   │   │   │   ├── ProfileLayout
│       │   │   │   │   │   ├── Sidebar
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── Sidebar.smart.tsx
│       │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   ├── LeftPanel.smart.tsx
│       │   │   │   │   │   ├── ProfileLayout.smart.tsx
│       │   │   │   │   │   └── RightPanel.smart.tsx
│       │   │   │   │   ├── Settings
│       │   │   │   │   │   ├── PasswordStrength
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   ├── PasswordStrength.css
│       │   │   │   │   │   │   └── PasswordStrength.dumb.tsx
│       │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   ├── OrganizationTree.smart.tsx
│       │   │   │   │   │   ├── ProfileForm.smart.tsx
│       │   │   │   │   │   └── SecurityForm.smart.tsx
│       │   │   │   │   ├── WorkspaceTree
│       │   │   │   │   │   ├── CreateTableModal.tsx
│       │   │   │   │   │   ├── CreateWorkspaceModal.tsx
│       │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   ├── WorkspaceTableTabs.smart.tsx
│       │   │   │   │   │   └── WorkspaceTree.smart.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── reference
│       │   │   │   ├── ui
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── ReferenceSelector.smart.tsx
│       │   │   │   └── index.ts
│       │   │   ├── seasons
│       │   │   │   ├── ui
│       │   │   │   │   ├── Seasons
│       │   │   │   │   │   ├── AutogenerateModal.tsx
│       │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   └── SeasonModal.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── sports
│       │   │   │   └── index.ts
│       │   │   ├── table
│       │   │   │   ├── hooks
│       │   │   │   │   └── useKeyboardShortcuts.hook.ts
│       │   │   │   ├── lib
│       │   │   │   │   ├── cellAddressUtils.ts
│       │   │   │   │   ├── crossWorkspace.ts
│       │   │   │   │   ├── engine.ts
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── TableReferenceParser.ts
│       │   │   │   ├── services
│       │   │   │   │   ├── cell-formatting.service.ts
│       │   │   │   │   ├── table-grid-api.service.ts
│       │   │   │   │   └── table.service.ts
│       │   │   │   ├── types
│       │   │   │   │   ├── cell.types.ts
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── table.types.ts
│       │   │   │   ├── ui
│       │   │   │   │   ├── ContextMenu.smart.tsx
│       │   │   │   │   ├── DynamicTable.smart.tsx
│       │   │   │   │   ├── FormulaBar.smart.tsx
│       │   │   │   │   ├── index.ts
│       │   │   │   │   ├── MainToolbar.dumb.tsx
│       │   │   │   │   ├── SheetTabs.dumb.tsx
│       │   │   │   │   ├── TableHeader.smart.tsx
│       │   │   │   │   └── TableTheme.css
│       │   │   │   └── index.ts
│       │   │   ├── users
│       │   │   │   ├── api
│       │   │   │   │   └── users.api.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── useUsersPermissions.ts
│       │   │   │   ├── stores
│       │   │   │   │   └── useUsersPageStore.ts
│       │   │   │   ├── types
│       │   │   │   │   └── users.types.ts
│       │   │   │   └── ui
│       │   │   │       ├── UsersFilters.tsx
│       │   │   │       └── UsersTable.tsx
│       │   │   ├── visualization
│       │   │   │   ├── lib
│       │   │   │   │   ├── adapters
│       │   │   │   │   │   ├── AreaChartAdapter.ts
│       │   │   │   │   │   ├── BarChartAdapter.ts
│       │   │   │   │   │   ├── BoxPlotAdapter.ts
│       │   │   │   │   │   ├── BubbleChartAdapter.ts
│       │   │   │   │   │   ├── BubbleMapAdapter.ts
│       │   │   │   │   │   ├── CalendarHeatmapAdapter.ts
│       │   │   │   │   │   ├── CandlestickAdapter.ts
│       │   │   │   │   │   ├── ChordAdapter.ts
│       │   │   │   │   │   ├── ChoroplethMapAdapter.ts
│       │   │   │   │   │   ├── CorrelationMatrixAdapter.ts
│       │   │   │   │   │   ├── ForceDirectedGraphAdapter.ts
│       │   │   │   │   │   ├── GanttAdapter.ts
│       │   │   │   │   │   ├── GeoHeatMapAdapter.ts
│       │   │   │   │   │   ├── GroupedBarChartAdapter.ts
│       │   │   │   │   │   ├── HeatmapAdapter.ts
│       │   │   │   │   │   ├── HistogramAdapter.ts
│       │   │   │   │   │   ├── LineChartAdapter.ts
│       │   │   │   │   │   ├── ParallelCoordinatesAdapter.ts
│       │   │   │   │   │   ├── PieChartAdapter.ts
│       │   │   │   │   │   ├── RadarChartAdapter.ts
│       │   │   │   │   │   ├── RadialBarChartAdapter.ts
│       │   │   │   │   │   ├── RidgelinePlotAdapter.ts
│       │   │   │   │   │   ├── SankeyAdapter.ts
│       │   │   │   │   │   ├── ScatterPlotAdapter.ts
│       │   │   │   │   │   ├── StackedBarChartAdapter.ts
│       │   │   │   │   │   ├── StreamGraphAdapter.ts
│       │   │   │   │   │   ├── SunburstAdapter.ts
│       │   │   │   │   │   ├── ViolinPlotAdapter.ts
│       │   │   │   │   │   └── WaterfallChartAdapter.ts
│       │   │   │   │   └── index.ts
│       │   │   │   ├── ui
│       │   │   │   │   ├── charts
│       │   │   │   │   │   ├── BarChart
│       │   │   │   │   │   │   ├── BarChart.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── LineChart
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── LineChart.tsx
│       │   │   │   │   │   ├── PieChart
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── PieChart.tsx
│       │   │   │   │   │   └── index.ts
│       │   │   │   │   ├── d3
│       │   │   │   │   │   ├── AreaChart
│       │   │   │   │   │   │   ├── AreaChart.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── BoxPlot
│       │   │   │   │   │   │   ├── BoxPlot.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── BubbleChart
│       │   │   │   │   │   │   ├── BubbleChart.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── BubbleMap
│       │   │   │   │   │   │   ├── BubbleMap.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── CalendarHeatmap
│       │   │   │   │   │   │   ├── CalendarHeatmap.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── Candlestick
│       │   │   │   │   │   │   ├── Candlestick.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── Chord
│       │   │   │   │   │   │   ├── Chord.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── ChoroplethMap
│       │   │   │   │   │   │   ├── ChoroplethMap.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── CorrelationMatrix
│       │   │   │   │   │   │   ├── CorrelationMatrix.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── DonutChart
│       │   │   │   │   │   │   ├── DonutChart.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── ForceDirectedGraph
│       │   │   │   │   │   │   ├── ForceDirectedGraph.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── Gantt
│       │   │   │   │   │   │   ├── Gantt.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── GeoHeatMap
│       │   │   │   │   │   │   ├── GeoHeatMap.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── GroupedBarChart
│       │   │   │   │   │   │   ├── GroupedBarChart.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── Heatmap
│       │   │   │   │   │   │   ├── Heatmap.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── Histogram
│       │   │   │   │   │   │   ├── Histogram.tsx
│       │   │   │   │   │   │   └── index.ts
│       │   │   │   │   │   ├── ParallelCoordinates
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── ParallelCoordinates.tsx
│       │   │   │   │   │   ├── RadarChart
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── RadarChart.tsx
│       │   │   │   │   │   ├── RadialBarChart
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── RadialBarChart.tsx
│       │   │   │   │   │   ├── RidgelinePlot
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── RidgelinePlot.tsx
│       │   │   │   │   │   ├── Sankey
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── Sankey.tsx
│       │   │   │   │   │   ├── ScatterPlot
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── ScatterPlot.tsx
│       │   │   │   │   │   ├── Sparkline
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── Sparkline.tsx
│       │   │   │   │   │   ├── StackedBarChart
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── StackedBarChart.tsx
│       │   │   │   │   │   ├── StreamGraph
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── StreamGraph.tsx
│       │   │   │   │   │   ├── Sunburst
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── Sunburst.tsx
│       │   │   │   │   │   ├── ViolinPlot
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── ViolinPlot.tsx
│       │   │   │   │   │   ├── WaterfallChart
│       │   │   │   │   │   │   ├── index.ts
│       │   │   │   │   │   │   └── WaterfallChart.tsx
│       │   │   │   │   │   └── index.ts
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── workspaces
│       │   │   │   ├── ui
│       │   │   │   │   └── AdminWorkspacesSmart.tsx
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   ├── stores
│       │   │   ├── index.ts
│       │   │   ├── useAdminAuth.store.ts
│       │   │   ├── useAdminSettings.store.ts
│       │   │   ├── useFormatting.store.ts
│       │   │   ├── useFormula.store.ts
│       │   │   ├── useHistory.store.ts
│       │   │   ├── useOrganizationsStore.ts
│       │   │   ├── useReference.store.ts
│       │   │   ├── useSelection.store.ts
│       │   │   ├── useTableReference.store.ts
│       │   │   ├── useTableStore.ts
│       │   │   ├── useUser.store.ts
│       │   │   ├── useWorkspace.store.ts
│       │   │   └── useWorkspaceTemplate.store.ts
│       │   ├── types
│       │   │   ├── admin.types.ts
│       │   │   ├── api-response.ts
│       │   │   ├── dictionary.ts
│       │   │   ├── enums.ts
│       │   │   ├── index.ts
│       │   │   ├── link.types.ts
│       │   │   ├── reference.types.ts
│       │   │   └── visualization.ts
│       │   ├── ui
│       │   │   ├── layout
│       │   │   │   ├── AuthLayout
│       │   │   │   │   ├── AuthLayout.css
│       │   │   │   │   ├── AuthLayout.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── Footer
│       │   │   │   │   ├── Footer.smart.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── Header
│       │   │   │   │   ├── Header.smart.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── ProfilePageLayout
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── ProfilePageLayout.tsx
│       │   │   │   └── index.ts
│       │   │   ├── primitives
│       │   │   │   ├── Button
│       │   │   │   │   ├── Button.dumb.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── IconButton
│       │   │   │   │   ├── IconButton.dumb.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── Input
│       │   │   │   │   ├── index.ts
│       │   │   │   │   ├── Input.css
│       │   │   │   │   └── Input.dumb.tsx
│       │   │   │   ├── Logo
│       │   │   │   │   ├── index.ts
│       │   │   │   │   ├── Logo.dumb.tsx
│       │   │   │   │   └── LogoV2.tsx
│       │   │   │   ├── Select
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── Select.dumb.tsx
│       │   │   │   ├── Table
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── Table.dumb.tsx
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── AGENTS.md
│       ├── package.json
│       ├── tsconfig.json
│       └── tsconfig.tsbuildinfo
├── scripts
│   ├── dev-setup.sh
│   ├── generate-project-trees.sh
│   ├── generate-secrets.sh
│   ├── generate-swagger.ts
│   ├── migrate.mjs
│   └── production-setup.sh
├── AGENTS.md
├── docker-compose.yml
├── eslint.config.mjs
├── opencode.json
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── project_tree.md
├── swagger.json
├── TEST_CREDENTIALS.md
├── tsconfig.base.json
├── tsconfig.json
└── turbo.json

389 directories, 946 files
