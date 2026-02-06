# Структура проекта

Генерировано: Пт 06 фев 2026 03:21:05 +03

/home/ivan/git/elbruso
├── apps
│   ├── api-gateway
│   │   ├── docs
│   │   │   └── PROJECT_TREE.md
│   │   ├── src
│   │   │   ├── config
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
│   │   │   ├── shared
│   │   │   │   ├── decorators
│   │   │   │   │   └── roles.decorator.ts
│   │   │   │   ├── dto
│   │   │   │   ├── interfaces
│   │   │   │   └── utils
│   │   │   ├── app.module.ts
│   │   │   ├── bootstrap.ts
│   │   │   ├── config.ts
│   │   │   └── main.ts
│   │   ├── test
│   │   │   ├── coverage
│   │   │   │   ├── lcov-report
│   │   │   │   │   ├── base.css
│   │   │   │   │   ├── block-navigation.js
│   │   │   │   │   ├── favicon.png
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── prettify.css
│   │   │   │   │   ├── prettify.js
│   │   │   │   │   ├── sort-arrow-sprite.png
│   │   │   │   │   └── sorter.js
│   │   │   │   ├── base.css
│   │   │   │   ├── block-navigation.js
│   │   │   │   ├── coverage-final.json
│   │   │   │   ├── favicon.png
│   │   │   │   ├── index.html
│   │   │   │   ├── lcov.info
│   │   │   │   ├── prettify.css
│   │   │   │   ├── prettify.js
│   │   │   │   ├── sort-arrow-sprite.png
│   │   │   │   └── sorter.js
│   │   │   ├── auth-users.e2e-spec.ts
│   │   │   ├── custom-resolver.js
│   │   │   ├── global-setup.js
│   │   │   ├── jest-e2e.json
│   │   │   ├── pages.e2e-spec.ts
│   │   │   ├── security.e2e-spec.ts
│   │   │   ├── setup-env.js
│   │   │   ├── test-request.helper.ts
│   │   │   ├── test-schema-full.sql
│   │   │   ├── test-schema.sql
│   │   │   └── workspaces.e2e-spec.ts
│   │   ├── AGENTS.md
│   │   ├── jest-e2e.config.js
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
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── (auth)
│   │   │   │   │   ├── forgot-password
│   │   │   │   │   ├── login
│   │   │   │   │   │   ├── login.css
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── register
│   │   │   │   │   │   └── register.css
│   │   │   │   │   ├── reset-password
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── AUTH_CONFIG.md
│   │   │   │   │   ├── AuthStats.css
│   │   │   │   │   ├── AuthStats.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── globals.css
│   │   │   │   └── layout.tsx
│   │   │   ├── components
│   │   │   ├── dictionaries
│   │   │   │   ├── en.json
│   │   │   │   └── ru.json
│   │   │   └── lib
│   │   │       ├── get-dictionary.ts
│   │   │       └── i18n-config.ts
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
│       │       └── next-shim.d.ts
│       ├── AGENTS.md
│       ├── inject-source.cjs
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
│   ├── COMPONENT_SYSTEM_MIGRATION.md
│   ├── DESIGN_SYSTEM.md
│   ├── IMPORT_STYLE_GUIDE.md
│   ├── memory-graph.html
│   ├── memory-graph-screenshot.png
│   ├── PRODUCTION_SETUP.md
│   ├── PROJECT_TREE.md
│   └── TEST_CREDENTIALS.md
├── packages
│   ├── backend
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
│   │   │   │   │   │   ├── admin-auth.controller.d.ts
│   │   │   │   │   │   ├── admin-auth.controller.js
│   │   │   │   │   │   ├── admin-auth.controller.js.map
│   │   │   │   │   │   ├── admin-auth.controller.ts
│   │   │   │   │   │   ├── admin-setup.controller.d.ts
│   │   │   │   │   │   ├── admin-setup.controller.js
│   │   │   │   │   │   ├── admin-setup.controller.js.map
│   │   │   │   │   │   ├── admin-setup.controller.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── decorators
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── roles.decorator.d.ts
│   │   │   │   │   │   ├── roles.decorator.js
│   │   │   │   │   │   ├── roles.decorator.js.map
│   │   │   │   │   │   └── roles.decorator.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── admin-login.dto.d.ts
│   │   │   │   │   │   ├── admin-login.dto.js
│   │   │   │   │   │   ├── admin-login.dto.js.map
│   │   │   │   │   │   ├── admin-login.dto.ts
│   │   │   │   │   │   ├── admin-reset.dto.d.ts
│   │   │   │   │   │   ├── admin-reset.dto.js
│   │   │   │   │   │   ├── admin-reset.dto.js.map
│   │   │   │   │   │   ├── admin-reset.dto.ts
│   │   │   │   │   │   ├── admin-setup.dto.d.ts
│   │   │   │   │   │   ├── admin-setup.dto.js
│   │   │   │   │   │   ├── admin-setup.dto.js.map
│   │   │   │   │   │   ├── admin-setup.dto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── guards
│   │   │   │   │   │   ├── admin-jwt-auth.guard.d.ts
│   │   │   │   │   │   ├── admin-jwt-auth.guard.js
│   │   │   │   │   │   ├── admin-jwt-auth.guard.js.map
│   │   │   │   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── roles
│   │   │   │   │   │   ├── dto
│   │   │   │   │   │   │   ├── create-role.dto.d.ts
│   │   │   │   │   │   │   ├── create-role.dto.js
│   │   │   │   │   │   │   ├── create-role.dto.js.map
│   │   │   │   │   │   │   ├── create-role.dto.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── update-role.dto.d.ts
│   │   │   │   │   │   │   ├── update-role.dto.js
│   │   │   │   │   │   │   ├── update-role.dto.js.map
│   │   │   │   │   │   │   └── update-role.dto.ts
│   │   │   │   │   │   ├── admin-roles.controller.d.ts
│   │   │   │   │   │   ├── admin-roles.controller.js
│   │   │   │   │   │   ├── admin-roles.controller.js.map
│   │   │   │   │   │   ├── admin-roles.controller.ts
│   │   │   │   │   │   ├── admin-roles.module.d.ts
│   │   │   │   │   │   ├── admin-roles.module.js
│   │   │   │   │   │   ├── admin-roles.module.js.map
│   │   │   │   │   │   ├── admin-roles.module.ts
│   │   │   │   │   │   ├── admin-roles.service.d.ts
│   │   │   │   │   │   ├── admin-roles.service.js
│   │   │   │   │   │   ├── admin-roles.service.js.map
│   │   │   │   │   │   └── admin-roles.service.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── admin-auth.service.d.ts
│   │   │   │   │   │   ├── admin-auth.service.js
│   │   │   │   │   │   ├── admin-auth.service.js.map
│   │   │   │   │   │   ├── admin-auth.service.ts
│   │   │   │   │   │   ├── admin-setup.service.d.ts
│   │   │   │   │   │   ├── admin-setup.service.js
│   │   │   │   │   │   ├── admin-setup.service.js.map
│   │   │   │   │   │   ├── admin-setup.service.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── strategies
│   │   │   │   │   │   ├── admin-jwt.strategy.d.ts
│   │   │   │   │   │   ├── admin-jwt.strategy.js
│   │   │   │   │   │   ├── admin-jwt.strategy.js.map
│   │   │   │   │   │   ├── admin-jwt.strategy.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── users
│   │   │   │   │   │   ├── dto
│   │   │   │   │   │   │   ├── create-admin-user.dto.d.ts
│   │   │   │   │   │   │   ├── create-admin-user.dto.js
│   │   │   │   │   │   │   ├── create-admin-user.dto.js.map
│   │   │   │   │   │   │   ├── create-admin-user.dto.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── update-admin-user.dto.d.ts
│   │   │   │   │   │   │   ├── update-admin-user.dto.js
│   │   │   │   │   │   │   ├── update-admin-user.dto.js.map
│   │   │   │   │   │   │   └── update-admin-user.dto.ts
│   │   │   │   │   │   ├── admin-users.controller.d.ts
│   │   │   │   │   │   ├── admin-users.controller.js
│   │   │   │   │   │   ├── admin-users.controller.js.map
│   │   │   │   │   │   ├── admin-users.controller.ts
│   │   │   │   │   │   ├── admin-users.module.d.ts
│   │   │   │   │   │   ├── admin-users.module.js
│   │   │   │   │   │   ├── admin-users.module.js.map
│   │   │   │   │   │   ├── admin-users.module.ts
│   │   │   │   │   │   ├── admin-users.service.d.ts
│   │   │   │   │   │   ├── admin-users.service.js
│   │   │   │   │   │   ├── admin-users.service.js.map
│   │   │   │   │   │   └── admin-users.service.ts
│   │   │   │   │   ├── admin-auth.module.d.ts
│   │   │   │   │   ├── admin-auth.module.js
│   │   │   │   │   ├── admin-auth.module.js.map
│   │   │   │   │   ├── admin-auth.module.ts
│   │   │   │   │   ├── admin.module.d.ts
│   │   │   │   │   ├── admin.module.js
│   │   │   │   │   ├── admin.module.js.map
│   │   │   │   │   ├── admin.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── audit
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── audit.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── audit.service.d.ts
│   │   │   │   │   │   ├── audit.service.js
│   │   │   │   │   │   ├── audit.service.js.map
│   │   │   │   │   │   └── audit.service.ts
│   │   │   │   │   ├── audit.module.d.ts
│   │   │   │   │   ├── audit.module.js
│   │   │   │   │   ├── audit.module.js.map
│   │   │   │   │   ├── audit.module.ts
│   │   │   │   │   ├── index.d.ts
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── index.js.map
│   │   │   │   │   └── index.ts
│   │   │   │   ├── auth
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── auth.controller.d.ts
│   │   │   │   │   │   ├── auth.controller.js
│   │   │   │   │   │   ├── auth.controller.js.map
│   │   │   │   │   │   └── auth.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── auth.dto.d.ts
│   │   │   │   │   │   ├── auth.dto.js
│   │   │   │   │   │   ├── auth.dto.js.map
│   │   │   │   │   │   ├── auth.dto.ts
│   │   │   │   │   │   ├── index.d.ts
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── index.js.map
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── password-recovery.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   ├── auth.events.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── guards
│   │   │   │   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   │   │   │   ├── api-key-auth.guard.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── jwt-auth.guard.d.ts
│   │   │   │   │   │   ├── jwt-auth.guard.js
│   │   │   │   │   │   ├── jwt-auth.guard.js.map
│   │   │   │   │   │   └── jwt-auth.guard.ts
│   │   │   │   │   ├── interfaces
│   │   │   │   │   │   ├── auth.interface.d.ts
│   │   │   │   │   │   ├── auth.interface.js
│   │   │   │   │   │   ├── auth.interface.js.map
│   │   │   │   │   │   ├── auth.interface.ts
│   │   │   │   │   │   ├── index.d.ts
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── index.js.map
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── auth.service.d.ts
│   │   │   │   │   │   ├── auth.service.js
│   │   │   │   │   │   ├── auth.service.js.map
│   │   │   │   │   │   └── auth.service.ts
│   │   │   │   │   ├── strategies
│   │   │   │   │   │   ├── api-key.strategy.d.ts
│   │   │   │   │   │   ├── api-key.strategy.js
│   │   │   │   │   │   ├── api-key.strategy.js.map
│   │   │   │   │   │   ├── api-key.strategy.ts
│   │   │   │   │   │   ├── jwt.strategy.d.ts
│   │   │   │   │   │   ├── jwt.strategy.js
│   │   │   │   │   │   ├── jwt.strategy.js.map
│   │   │   │   │   │   ├── jwt.strategy.ts
│   │   │   │   │   │   ├── local.strategy.d.ts
│   │   │   │   │   │   ├── local.strategy.js
│   │   │   │   │   │   ├── local.strategy.js.map
│   │   │   │   │   │   └── local.strategy.ts
│   │   │   │   │   ├── auth.module.d.ts
│   │   │   │   │   ├── auth.module.js
│   │   │   │   │   ├── auth.module.js.map
│   │   │   │   │   ├── auth.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── blocks
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── blocks.controller.d.ts
│   │   │   │   │   │   ├── blocks.controller.js
│   │   │   │   │   │   ├── blocks.controller.js.map
│   │   │   │   │   │   └── blocks.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── index.d.ts
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── index.js.map
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── blocks.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── blocks.service.d.ts
│   │   │   │   │   │   ├── blocks.service.js
│   │   │   │   │   │   ├── blocks.service.js.map
│   │   │   │   │   │   └── blocks.service.ts
│   │   │   │   │   ├── blocks.module.d.ts
│   │   │   │   │   ├── blocks.module.js
│   │   │   │   │   ├── blocks.module.js.map
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
│   │   │   │   │   │   ├── countries.controller.d.ts
│   │   │   │   │   │   ├── countries.controller.js
│   │   │   │   │   │   ├── countries.controller.js.map
│   │   │   │   │   │   └── countries.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── countries.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── countries.service.d.ts
│   │   │   │   │   │   ├── countries.service.js
│   │   │   │   │   │   ├── countries.service.js.map
│   │   │   │   │   │   └── countries.service.ts
│   │   │   │   │   ├── countries.module.d.ts
│   │   │   │   │   ├── countries.module.js
│   │   │   │   │   ├── countries.module.js.map
│   │   │   │   │   ├── countries.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── email
│   │   │   │   │   ├── controllers
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── email.events.ts
│   │   │   │   │   ├── interfaces
│   │   │   │   │   │   ├── email-provider.interface.d.ts
│   │   │   │   │   │   ├── email-provider.interface.js
│   │   │   │   │   │   ├── email-provider.interface.js.map
│   │   │   │   │   │   └── email-provider.interface.ts
│   │   │   │   │   ├── providers
│   │   │   │   │   │   ├── console-email.provider.d.ts
│   │   │   │   │   │   ├── console-email.provider.js
│   │   │   │   │   │   ├── console-email.provider.js.map
│   │   │   │   │   │   ├── console-email.provider.ts
│   │   │   │   │   │   ├── smtp-email.provider.d.ts
│   │   │   │   │   │   ├── smtp-email.provider.js
│   │   │   │   │   │   ├── smtp-email.provider.js.map
│   │   │   │   │   │   └── smtp-email.provider.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── email.service.d.ts
│   │   │   │   │   │   ├── email.service.js
│   │   │   │   │   │   ├── email.service.js.map
│   │   │   │   │   │   └── email.service.ts
│   │   │   │   │   ├── email.module.d.ts
│   │   │   │   │   ├── email.module.js
│   │   │   │   │   ├── email.module.js.map
│   │   │   │   │   ├── email.module.ts
│   │   │   │   │   ├── index.d.ts
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── index.js.map
│   │   │   │   │   └── index.ts
│   │   │   │   ├── events
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── events.controller.d.ts
│   │   │   │   │   │   ├── events.controller.js
│   │   │   │   │   │   ├── events.controller.js.map
│   │   │   │   │   │   └── events.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── event-filters.dto.d.ts
│   │   │   │   │   │   ├── event-filters.dto.js
│   │   │   │   │   │   ├── event-filters.dto.js.map
│   │   │   │   │   │   ├── event-filters.dto.ts
│   │   │   │   │   │   ├── index.d.ts
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── index.js.map
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── events.service.d.ts
│   │   │   │   │   │   ├── events.service.js
│   │   │   │   │   │   ├── events.service.js.map
│   │   │   │   │   │   └── events.service.ts
│   │   │   │   │   ├── events.module.d.ts
│   │   │   │   │   ├── events.module.js
│   │   │   │   │   ├── events.module.js.map
│   │   │   │   │   ├── events.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── indicators
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── indicator-groups.controller.d.ts
│   │   │   │   │   │   ├── indicator-groups.controller.js
│   │   │   │   │   │   ├── indicator-groups.controller.js.map
│   │   │   │   │   │   ├── indicator-groups.controller.ts
│   │   │   │   │   │   ├── indicators.controller.d.ts
│   │   │   │   │   │   ├── indicators.controller.js
│   │   │   │   │   │   ├── indicators.controller.js.map
│   │   │   │   │   │   └── indicators.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── generate-indicators.dto.d.ts
│   │   │   │   │   │   ├── generate-indicators.dto.js
│   │   │   │   │   │   ├── generate-indicators.dto.js.map
│   │   │   │   │   │   ├── generate-indicators.dto.ts
│   │   │   │   │   │   ├── indicator-filters.dto.d.ts
│   │   │   │   │   │   ├── indicator-filters.dto.js
│   │   │   │   │   │   ├── indicator-filters.dto.js.map
│   │   │   │   │   │   ├── indicator-filters.dto.ts
│   │   │   │   │   │   ├── indicator-group.dto.d.ts
│   │   │   │   │   │   ├── indicator-group.dto.js
│   │   │   │   │   │   ├── indicator-group.dto.js.map
│   │   │   │   │   │   ├── indicator-group.dto.ts
│   │   │   │   │   │   ├── indicator-group-filters.dto.d.ts
│   │   │   │   │   │   ├── indicator-group-filters.dto.js
│   │   │   │   │   │   ├── indicator-group-filters.dto.js.map
│   │   │   │   │   │   └── indicator-group-filters.dto.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   ├── interfaces
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── indicator-groups.service.d.ts
│   │   │   │   │   │   ├── indicator-groups.service.js
│   │   │   │   │   │   ├── indicator-groups.service.js.map
│   │   │   │   │   │   ├── indicator-groups.service.ts
│   │   │   │   │   │   ├── indicators.service.d.ts
│   │   │   │   │   │   ├── indicators.service.js
│   │   │   │   │   │   ├── indicators.service.js.map
│   │   │   │   │   │   └── indicators.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── indicators.module.d.ts
│   │   │   │   │   ├── indicators.module.js
│   │   │   │   │   ├── indicators.module.js.map
│   │   │   │   │   └── indicators.module.ts
│   │   │   │   ├── organizations
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── organizations.controller.d.ts
│   │   │   │   │   │   ├── organizations.controller.js
│   │   │   │   │   │   ├── organizations.controller.js.map
│   │   │   │   │   │   └── organizations.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── organization-filters.dto.d.ts
│   │   │   │   │   │   ├── organization-filters.dto.js
│   │   │   │   │   │   ├── organization-filters.dto.js.map
│   │   │   │   │   │   └── organization-filters.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── organizations.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── organizations.service.d.ts
│   │   │   │   │   │   ├── organizations.service.js
│   │   │   │   │   │   ├── organizations.service.js.map
│   │   │   │   │   │   └── organizations.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── organizations.module.d.ts
│   │   │   │   │   ├── organizations.module.js
│   │   │   │   │   ├── organizations.module.js.map
│   │   │   │   │   └── organizations.module.ts
│   │   │   │   ├── pages
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── pages.controller.d.ts
│   │   │   │   │   │   ├── pages.controller.js
│   │   │   │   │   │   ├── pages.controller.js.map
│   │   │   │   │   │   └── pages.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── index.d.ts
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── index.js.map
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── pages.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── pages.service.d.ts
│   │   │   │   │   │   ├── pages.service.js
│   │   │   │   │   │   ├── pages.service.js.map
│   │   │   │   │   │   └── pages.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── pages.module.d.ts
│   │   │   │   │   ├── pages.module.js
│   │   │   │   │   ├── pages.module.js.map
│   │   │   │   │   └── pages.module.ts
│   │   │   │   ├── reference
│   │   │   │   │   ├── countries
│   │   │   │   │   ├── organizations
│   │   │   │   │   ├── regions
│   │   │   │   │   ├── seasons
│   │   │   │   │   └── sports
│   │   │   │   ├── regions
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── regions.controller.d.ts
│   │   │   │   │   │   ├── regions.controller.js
│   │   │   │   │   │   ├── regions.controller.js.map
│   │   │   │   │   │   └── regions.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── region-filters.dto.d.ts
│   │   │   │   │   │   ├── region-filters.dto.js
│   │   │   │   │   │   ├── region-filters.dto.js.map
│   │   │   │   │   │   └── region-filters.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── regions.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── regions.service.d.ts
│   │   │   │   │   │   ├── regions.service.js
│   │   │   │   │   │   ├── regions.service.js.map
│   │   │   │   │   │   └── regions.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── regions.module.d.ts
│   │   │   │   │   ├── regions.module.js
│   │   │   │   │   ├── regions.module.js.map
│   │   │   │   │   └── regions.module.ts
│   │   │   │   ├── seasons
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── seasons.controller.d.ts
│   │   │   │   │   │   ├── seasons.controller.js
│   │   │   │   │   │   ├── seasons.controller.js.map
│   │   │   │   │   │   └── seasons.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── generate-seasons.dto.d.ts
│   │   │   │   │   │   ├── generate-seasons.dto.js
│   │   │   │   │   │   ├── generate-seasons.dto.js.map
│   │   │   │   │   │   ├── generate-seasons.dto.ts
│   │   │   │   │   │   ├── index.d.ts
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── index.js.map
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── seasons.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── seasons.service.d.ts
│   │   │   │   │   │   ├── seasons.service.js
│   │   │   │   │   │   ├── seasons.service.js.map
│   │   │   │   │   │   └── seasons.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── seasons.module.d.ts
│   │   │   │   │   ├── seasons.module.js
│   │   │   │   │   ├── seasons.module.js.map
│   │   │   │   │   └── seasons.module.ts
│   │   │   │   ├── sports
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── sports.controller.d.ts
│   │   │   │   │   │   ├── sports.controller.js
│   │   │   │   │   │   ├── sports.controller.js.map
│   │   │   │   │   │   └── sports.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── sport-filters.dto.d.ts
│   │   │   │   │   │   ├── sport-filters.dto.js
│   │   │   │   │   │   ├── sport-filters.dto.js.map
│   │   │   │   │   │   └── sport-filters.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── sports.events.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── sports.service.d.ts
│   │   │   │   │   │   ├── sports.service.js
│   │   │   │   │   │   ├── sports.service.js.map
│   │   │   │   │   │   └── sports.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── sports.module.d.ts
│   │   │   │   │   ├── sports.module.js
│   │   │   │   │   ├── sports.module.js.map
│   │   │   │   │   └── sports.module.ts
│   │   │   │   ├── tables
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── formula.controller.d.ts
│   │   │   │   │   │   ├── formula.controller.js
│   │   │   │   │   │   ├── formula.controller.js.map
│   │   │   │   │   │   ├── formula.controller.ts
│   │   │   │   │   │   ├── tables.controller.d.ts
│   │   │   │   │   │   ├── tables.controller.js
│   │   │   │   │   │   ├── tables.controller.js.map
│   │   │   │   │   │   └── tables.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── formula-analysis.dto.d.ts
│   │   │   │   │   │   ├── formula-analysis.dto.js
│   │   │   │   │   │   ├── formula-analysis.dto.js.map
│   │   │   │   │   │   ├── formula-analysis.dto.ts
│   │   │   │   │   │   ├── tables.dto.d.ts
│   │   │   │   │   │   ├── tables.dto.js
│   │   │   │   │   │   ├── tables.dto.js.map
│   │   │   │   │   │   └── tables.dto.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   │   ├── formula.entity.ts
│   │   │   │   │   │   └── table.entity.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── tables.events.ts
│   │   │   │   │   ├── interfaces
│   │   │   │   │   │   └── tables.interface.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── formula.service.d.ts
│   │   │   │   │   │   ├── formula.service.js
│   │   │   │   │   │   ├── formula.service.js.map
│   │   │   │   │   │   ├── formula.service.ts
│   │   │   │   │   │   ├── tables.service.d.ts
│   │   │   │   │   │   ├── tables.service.js
│   │   │   │   │   │   ├── tables.service.js.map
│   │   │   │   │   │   └── tables.service.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── tables.module.d.ts
│   │   │   │   │   ├── tables.module.js
│   │   │   │   │   ├── tables.module.js.map
│   │   │   │   │   └── tables.module.ts
│   │   │   │   ├── users
│   │   │   │   │   ├── controllers
│   │   │   │   │   │   ├── users.controller.d.ts
│   │   │   │   │   │   ├── users.controller.js
│   │   │   │   │   │   ├── users.controller.js.map
│   │   │   │   │   │   └── users.controller.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   ├── index.d.ts
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── index.js.map
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── user-settings.dto.d.ts
│   │   │   │   │   │   ├── user-settings.dto.js
│   │   │   │   │   │   ├── user-settings.dto.js.map
│   │   │   │   │   │   └── user-settings.dto.ts
│   │   │   │   │   ├── events
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── users.service.d.ts
│   │   │   │   │   │   ├── users.service.js
│   │   │   │   │   │   ├── users.service.js.map
│   │   │   │   │   │   └── users.service.ts
│   │   │   │   │   ├── index.d.ts
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── index.js.map
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── users.module.d.ts
│   │   │   │   │   ├── users.module.js
│   │   │   │   │   ├── users.module.js.map
│   │   │   │   │   └── users.module.ts
│   │   │   │   └── workspace
│   │   │   │       ├── controllers
│   │   │   │       │   ├── workspace.controller.d.ts
│   │   │   │       │   ├── workspace.controller.js
│   │   │   │       │   ├── workspace.controller.js.map
│   │   │   │       │   ├── workspace.controller.ts
│   │   │   │       │   ├── workspace-group.controller.d.ts
│   │   │   │       │   ├── workspace-group.controller.js
│   │   │   │       │   ├── workspace-group.controller.js.map
│   │   │   │       │   └── workspace-group.controller.ts
│   │   │   │       ├── dto
│   │   │   │       │   ├── index.d.ts
│   │   │   │       │   ├── index.js
│   │   │   │       │   ├── index.js.map
│   │   │   │       │   ├── index.ts
│   │   │   │       │   ├── workspace.dto.d.ts
│   │   │   │       │   ├── workspace.dto.js
│   │   │   │       │   ├── workspace.dto.js.map
│   │   │   │       │   ├── workspace.dto.ts
│   │   │   │       │   ├── workspace-group.dto.d.ts
│   │   │   │       │   ├── workspace-group.dto.js
│   │   │   │       │   ├── workspace-group.dto.js.map
│   │   │   │       │   └── workspace-group.dto.ts
│   │   │   │       ├── events
│   │   │   │       │   └── workspace.events.ts
│   │   │   │       ├── services
│   │   │   │       │   ├── workspace-group.service.d.ts
│   │   │   │       │   ├── workspace-group.service.js
│   │   │   │       │   ├── workspace-group.service.js.map
│   │   │   │       │   ├── workspace-group.service.ts
│   │   │   │       │   ├── workspace.service.d.ts
│   │   │   │       │   ├── workspace.service.js
│   │   │   │       │   ├── workspace.service.js.map
│   │   │   │       │   └── workspace.service.ts
│   │   │   │       ├── index.d.ts
│   │   │   │       ├── index.js
│   │   │   │       ├── index.js.map
│   │   │   │       ├── index.ts
│   │   │   │       ├── workspace.module.d.ts
│   │   │   │       ├── workspace.module.js
│   │   │   │       ├── workspace.module.js.map
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
│   │   ├── __pycache__
│   │   │   ├── graph_generator.cpython-310.pyc
│   │   │   └── logging_config.cpython-310.pyc
│   │   ├── scripts
│   │   │   ├── backup.py
│   │   │   └── embed.py
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
│   │   │   ├── database.module.d.ts
│   │   │   ├── database.module.js
│   │   │   ├── database.module.js.map
│   │   │   ├── database.module.ts
│   │   │   ├── database.service.d.ts
│   │   │   ├── database.service.js
│   │   │   ├── database.service.js.map
│   │   │   ├── database.service.ts
│   │   │   ├── db.d.ts
│   │   │   ├── db.js
│   │   │   ├── db.js.map
│   │   │   ├── db.ts
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   ├── index.ts
│   │   │   ├── types.d.ts
│   │   │   ├── types.js
│   │   │   ├── types.js.map
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
│   ├── frontend
│   │   ├── docs
│   │   │   ├── COMPONENT_SYSTEM.md
│   │   │   ├── MIGRATION_TABLE.md
│   │   │   └── PROJECT_TREE.md
│   │   ├── src
│   │   │   ├── api
│   │   │   │   ├── hooks
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── queryClient.hook.ts
│   │   │   │   │   ├── ReactQueryProvider.tsx
│   │   │   │   │   ├── useAuth.hook.ts
│   │   │   │   │   ├── useCountries.hook.ts
│   │   │   │   │   ├── useForgotPassword.hook.ts
│   │   │   │   │   ├── useOrganizations.hook.ts
│   │   │   │   │   ├── useReference.hook.ts
│   │   │   │   │   ├── useResetPassword.hook.ts
│   │   │   │   │   ├── useUsers.hook.ts
│   │   │   │   │   └── useWorkspaces.hook.ts
│   │   │   │   ├── admin.api.ts
│   │   │   │   ├── admin.client.ts
│   │   │   │   ├── api-mapping.ts
│   │   │   │   ├── api-types.ts
│   │   │   │   ├── api-utils.ts
│   │   │   │   ├── auth.api.ts
│   │   │   │   ├── blocks.api.ts
│   │   │   │   ├── client.ts
│   │   │   │   ├── config.constant.ts
│   │   │   │   ├── countries.api.ts
│   │   │   │   ├── create-api.service.ts
│   │   │   │   ├── data-contracts.ts
│   │   │   │   ├── definitions.ts
│   │   │   │   ├── endpoints.ts
│   │   │   │   ├── error.ts
│   │   │   │   ├── events.api.ts
│   │   │   │   ├── formulas.api.ts
│   │   │   │   ├── groups.api.ts
│   │   │   │   ├── http-client.service.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── pages.api.ts
│   │   │   │   ├── reference.api.ts
│   │   │   │   ├── tables.api.ts
│   │   │   │   ├── users.api.ts
│   │   │   │   ├── versions.api.ts
│   │   │   │   ├── websocket.ws.ts
│   │   │   │   └── workspaces.api.ts
│   │   │   ├── app
│   │   │   │   ├── providers
│   │   │   │   │   ├── AppProviders.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── lib
│   │   │   │   ├── react
│   │   │   │   │   └── SourceTracker.smart.tsx
│   │   │   │   ├── cn.lib.ts
│   │   │   │   └── index.ts
│   │   │   ├── modules
│   │   │   │   ├── admin
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── AdminLayout
│   │   │   │   │   │   │   ├── AdminLayout.smart.tsx
│   │   │   │   │   │   │   └── AdminRightPanel.smart.tsx
│   │   │   │   │   │   ├── AdminLeftPanel
│   │   │   │   │   │   │   ├── AdminLeftPanel.smart.tsx
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── admin-auth
│   │   │   │   │   ├── lib
│   │   │   │   │   │   ├── AdminAuthContext.tsx
│   │   │   │   │   │   └── ProtectedRoute.tsx
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── AdminLoginForm.tsx
│   │   │   │   │   │   ├── auth.css
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── auth
│   │   │   │   │   ├── lib
│   │   │   │   │   │   ├── AuthContext.tsx
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── ProtectedRoute.smart.tsx
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── auth.css
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── LoginForm.smart.tsx
│   │   │   │   │   │   ├── RegisterForm.smart.tsx
│   │   │   │   │   │   └── ResetPasswordForm.smart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── dashboard
│   │   │   │   │   └── index.ts
│   │   │   │   ├── events
│   │   │   │   │   └── index.ts
│   │   │   │   ├── i18n
│   │   │   │   │   ├── lib
│   │   │   │   │   │   ├── language
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   └── LanguageContext.tsx
│   │   │   │   │   │   ├── I18nProvider.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── ui
│   │   │   │   │   │   └── LanguageSwitcher
│   │   │   │   │   │       ├── index.ts
│   │   │   │   │   │       ├── LanguageSwitcher.css
│   │   │   │   │   │       └── LanguageSwitcher.smart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── indicators
│   │   │   │   │   └── index.ts
│   │   │   │   ├── notifications
│   │   │   │   │   ├── hooks
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── useToast.ts
│   │   │   │   │   ├── providers
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── ToastProvider.tsx
│   │   │   │   │   ├── types
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── ToastContainer.smart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── pages
│   │   │   │   │   └── index.ts
│   │   │   │   ├── profile
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── indicators
│   │   │   │   │   │   │   ├── components
│   │   │   │   │   │   │   │   ├── CreateIndicatorModal.tsx
│   │   │   │   │   │   │   │   ├── FilterDropdown.smart.tsx
│   │   │   │   │   │   │   │   ├── GenerateIndicatorsModal.tsx
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   ├── IndicatorGroupModal.tsx
│   │   │   │   │   │   │   │   └── IndicatorGroupsList.smart.tsx
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── ProfileLayout
│   │   │   │   │   │   │   ├── Sidebar
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── Sidebar.smart.tsx
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── LeftPanel.smart.tsx
│   │   │   │   │   │   │   ├── ProfileLayout.smart.tsx
│   │   │   │   │   │   │   └── RightPanel.smart.tsx
│   │   │   │   │   │   ├── Settings
│   │   │   │   │   │   │   ├── PasswordStrength
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   ├── PasswordStrength.css
│   │   │   │   │   │   │   │   └── PasswordStrength.dumb.tsx
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── OrganizationTree.smart.tsx
│   │   │   │   │   │   │   ├── ProfileForm.smart.tsx
│   │   │   │   │   │   │   └── SecurityForm.smart.tsx
│   │   │   │   │   │   ├── WorkspaceTree
│   │   │   │   │   │   │   ├── CreateTableModal.tsx
│   │   │   │   │   │   │   ├── CreateWorkspaceModal.tsx
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── WorkspaceTableTabs.smart.tsx
│   │   │   │   │   │   │   └── WorkspaceTree.smart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── reference
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── ReferenceSelector.smart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── seasons
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── Seasons
│   │   │   │   │   │   │   ├── AutogenerateModal.tsx
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   └── SeasonModal.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── sports
│   │   │   │   │   └── index.ts
│   │   │   │   ├── table
│   │   │   │   │   ├── hooks
│   │   │   │   │   │   └── useKeyboardShortcuts.hook.ts
│   │   │   │   │   ├── lib
│   │   │   │   │   │   ├── cellAddressUtils.ts
│   │   │   │   │   │   ├── crossWorkspace.ts
│   │   │   │   │   │   ├── engine.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── TableReferenceParser.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── cell-formatting.service.ts
│   │   │   │   │   │   ├── table-grid-api.service.ts
│   │   │   │   │   │   └── table.service.ts
│   │   │   │   │   ├── types
│   │   │   │   │   │   ├── cell.types.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── table.types.ts
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── ContextMenu.smart.tsx
│   │   │   │   │   │   ├── DynamicTable.smart.tsx
│   │   │   │   │   │   ├── FormulaBar.smart.tsx
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── MainToolbar.dumb.tsx
│   │   │   │   │   │   ├── SheetTabs.dumb.tsx
│   │   │   │   │   │   ├── TableHeader.smart.tsx
│   │   │   │   │   │   └── TableTheme.css
│   │   │   │   │   └── index.ts
│   │   │   │   ├── visualization
│   │   │   │   │   ├── lib
│   │   │   │   │   │   ├── adapters
│   │   │   │   │   │   │   ├── AreaChartAdapter.ts
│   │   │   │   │   │   │   ├── BarChartAdapter.ts
│   │   │   │   │   │   │   ├── BoxPlotAdapter.ts
│   │   │   │   │   │   │   ├── BubbleChartAdapter.ts
│   │   │   │   │   │   │   ├── BubbleMapAdapter.ts
│   │   │   │   │   │   │   ├── CalendarHeatmapAdapter.ts
│   │   │   │   │   │   │   ├── CandlestickAdapter.ts
│   │   │   │   │   │   │   ├── ChordAdapter.ts
│   │   │   │   │   │   │   ├── ChoroplethMapAdapter.ts
│   │   │   │   │   │   │   ├── CorrelationMatrixAdapter.ts
│   │   │   │   │   │   │   ├── ForceDirectedGraphAdapter.ts
│   │   │   │   │   │   │   ├── GanttAdapter.ts
│   │   │   │   │   │   │   ├── GeoHeatMapAdapter.ts
│   │   │   │   │   │   │   ├── GroupedBarChartAdapter.ts
│   │   │   │   │   │   │   ├── HeatmapAdapter.ts
│   │   │   │   │   │   │   ├── HistogramAdapter.ts
│   │   │   │   │   │   │   ├── LineChartAdapter.ts
│   │   │   │   │   │   │   ├── ParallelCoordinatesAdapter.ts
│   │   │   │   │   │   │   ├── PieChartAdapter.ts
│   │   │   │   │   │   │   ├── RadarChartAdapter.ts
│   │   │   │   │   │   │   ├── RadialBarChartAdapter.ts
│   │   │   │   │   │   │   ├── RidgelinePlotAdapter.ts
│   │   │   │   │   │   │   ├── SankeyAdapter.ts
│   │   │   │   │   │   │   ├── ScatterPlotAdapter.ts
│   │   │   │   │   │   │   ├── StackedBarChartAdapter.ts
│   │   │   │   │   │   │   ├── StreamGraphAdapter.ts
│   │   │   │   │   │   │   ├── SunburstAdapter.ts
│   │   │   │   │   │   │   ├── ViolinPlotAdapter.ts
│   │   │   │   │   │   │   └── WaterfallChartAdapter.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── charts
│   │   │   │   │   │   │   ├── BarChart
│   │   │   │   │   │   │   │   ├── BarChart.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── LineChart
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── LineChart.tsx
│   │   │   │   │   │   │   ├── PieChart
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── PieChart.tsx
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   ├── d3
│   │   │   │   │   │   │   ├── AreaChart
│   │   │   │   │   │   │   │   ├── AreaChart.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── BoxPlot
│   │   │   │   │   │   │   │   ├── BoxPlot.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── BubbleChart
│   │   │   │   │   │   │   │   ├── BubbleChart.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── BubbleMap
│   │   │   │   │   │   │   │   ├── BubbleMap.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── CalendarHeatmap
│   │   │   │   │   │   │   │   ├── CalendarHeatmap.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── Candlestick
│   │   │   │   │   │   │   │   ├── Candlestick.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── Chord
│   │   │   │   │   │   │   │   ├── Chord.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── ChoroplethMap
│   │   │   │   │   │   │   │   ├── ChoroplethMap.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── CorrelationMatrix
│   │   │   │   │   │   │   │   ├── CorrelationMatrix.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── DonutChart
│   │   │   │   │   │   │   │   ├── DonutChart.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── ForceDirectedGraph
│   │   │   │   │   │   │   │   ├── ForceDirectedGraph.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── Gantt
│   │   │   │   │   │   │   │   ├── Gantt.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── GeoHeatMap
│   │   │   │   │   │   │   │   ├── GeoHeatMap.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── GroupedBarChart
│   │   │   │   │   │   │   │   ├── GroupedBarChart.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── Heatmap
│   │   │   │   │   │   │   │   ├── Heatmap.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── Histogram
│   │   │   │   │   │   │   │   ├── Histogram.tsx
│   │   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   │   ├── ParallelCoordinates
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── ParallelCoordinates.tsx
│   │   │   │   │   │   │   ├── RadarChart
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── RadarChart.tsx
│   │   │   │   │   │   │   ├── RadialBarChart
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── RadialBarChart.tsx
│   │   │   │   │   │   │   ├── RidgelinePlot
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── RidgelinePlot.tsx
│   │   │   │   │   │   │   ├── Sankey
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── Sankey.tsx
│   │   │   │   │   │   │   ├── ScatterPlot
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── ScatterPlot.tsx
│   │   │   │   │   │   │   ├── Sparkline
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── Sparkline.tsx
│   │   │   │   │   │   │   ├── StackedBarChart
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── StackedBarChart.tsx
│   │   │   │   │   │   │   ├── StreamGraph
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── StreamGraph.tsx
│   │   │   │   │   │   │   ├── Sunburst
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── Sunburst.tsx
│   │   │   │   │   │   │   ├── ViolinPlot
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── ViolinPlot.tsx
│   │   │   │   │   │   │   ├── WaterfallChart
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   └── WaterfallChart.tsx
│   │   │   │   │   │   │   └── index.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── workspaces
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── stores
│   │   │   │   ├── index.ts
│   │   │   │   ├── useFormatting.store.ts
│   │   │   │   ├── useFormula.store.ts
│   │   │   │   ├── useHistory.store.ts
│   │   │   │   ├── useReference.store.ts
│   │   │   │   ├── useSelection.store.ts
│   │   │   │   ├── useTableReference.store.ts
│   │   │   │   ├── useTable.store.ts
│   │   │   │   ├── useUser.store.ts
│   │   │   │   └── useWorkspace.store.ts
│   │   │   ├── types
│   │   │   │   ├── dictionary.ts
│   │   │   │   ├── enums.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── link.types.ts
│   │   │   │   ├── next-shim.d.ts
│   │   │   │   ├── reference.types.ts
│   │   │   │   └── visualization.ts
│   │   │   ├── ui
│   │   │   │   ├── layout
│   │   │   │   │   ├── AuthLayout
│   │   │   │   │   │   ├── AuthLayout.css
│   │   │   │   │   │   ├── AuthLayout.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Footer
│   │   │   │   │   │   ├── Footer.smart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Header
│   │   │   │   │   │   ├── Header.smart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── PageLayout
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── PageLayout.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── primitives
│   │   │   │   │   ├── Button
│   │   │   │   │   │   ├── Button.dumb.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── IconButton
│   │   │   │   │   │   ├── IconButton.dumb.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Input
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── Input.css
│   │   │   │   │   │   └── Input.dumb.tsx
│   │   │   │   │   ├── Logo
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── Logo.dumb.tsx
│   │   │   │   │   │   └── LogoV2.tsx
│   │   │   │   │   ├── Select
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── Select.dumb.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── AGENTS.md
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   └── shared
│       └── docs
│           └── PROJECT_TREE.md
├── scripts
│   ├── dev-setup.sh
│   ├── dry-run.sh
│   ├── fix-aliases.sh
│   ├── generate-project-trees.sh
│   ├── generate-secrets.sh
│   ├── migrate.mjs
│   ├── production-setup.sh
│   ├── rename-map.json
│   ├── rollback.sh
│   ├── update-barrel-exports.js
│   └── update-imports.js
├── AGENTS.md
├── docker-compose.yml
├── eslint.config.mjs
├── jest.config.js
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

347 directories, 1158 files
