# Структура проекта

Генерировано: Вс 01 фев 2026 15:41:43 +03

/home/ivan/git/elbruso
├── apps
│   ├── api
│   │   ├── docs
│   │   │   └── PROJECT_TREE.md
│   │   ├── src
│   │   │   ├── config
│   │   │   ├── database
│   │   │   │   ├── {repositories}
│   │   │   │   ├── database.module.ts
│   │   │   │   └── database.service.ts
│   │   │   ├── gateway
│   │   │   │   ├── controllers
│   │   │   │   ├── dto
│   │   │   │   ├── filters
│   │   │   │   ├── guards
│   │   │   │   ├── interceptors
│   │   │   │   ├── services
│   │   │   │   ├── websocket
│   │   │   │   ├── gateway.module.ts
│   │   │   │   └── index.ts
│   │   │   ├── modules
│   │   │   │   ├── admin
│   │   │   │   ├── audit
│   │   │   │   ├── auth
│   │   │   │   ├── blocks
│   │   │   │   ├── content
│   │   │   │   ├── countries
│   │   │   │   ├── email
│   │   │   │   ├── events
│   │   │   │   ├── indicators
│   │   │   │   ├── organizations
│   │   │   │   ├── pages
│   │   │   │   ├── reference
│   │   │   │   ├── regions
│   │   │   │   ├── seasons
│   │   │   │   ├── sports
│   │   │   │   ├── tables
│   │   │   │   ├── users
│   │   │   │   └── workspace
│   │   │   ├── shared
│   │   │   │   ├── decorators
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
│   │   ├── AGENT.md
│   │   ├── jest-e2e.config.js
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── test-advanced-e2e.ts
│   │   ├── test-security-e2e.ts
│   │   ├── test-simple-security.ts
│   │   └── tsconfig.json
│   └── web
│       ├── assets
│       │   └── img
│       │       ├── login-bg.jpg
│       │       └── logo.svg
│       ├── dictionaries
│       │   ├── en.json
│       │   └── ru.json
│       ├── docs
│       │   └── PROJECT_TREE.md
│       ├── public
│       │   ├── assets
│       │   │   └── img
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
│       │   │   ├── (profile)
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── components
│       │   │   └── home
│       │   ├── pages
│       │   └── types
│       │       └── next-shim.d.ts
│       ├── AGENT.md
│       ├── get-dictionary.ts
│       ├── i18n-config.ts
│       ├── middleware.ts
│       ├── next.config.mjs
│       ├── next-env.d.ts
│       ├── package.json
│       ├── postcss.config.js
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── tsconfig.tsbuildinfo
├── dist
│   ├── apps
│   │   ├── api
│   │   │   ├── src
│   │   │   │   ├── database
│   │   │   │   ├── gateway
│   │   │   │   ├── modules
│   │   │   │   ├── shared
│   │   │   │   ├── app.module.d.ts
│   │   │   │   ├── app.module.js
│   │   │   │   ├── bootstrap.d.ts
│   │   │   │   ├── bootstrap.js
│   │   │   │   ├── config.d.ts
│   │   │   │   ├── config.js
│   │   │   │   ├── main.d.ts
│   │   │   │   └── main.js
│   │   │   ├── test
│   │   │   │   ├── auth-users.e2e-spec.d.ts
│   │   │   │   ├── auth-users.e2e-spec.js
│   │   │   │   ├── pages.e2e-spec.d.ts
│   │   │   │   ├── pages.e2e-spec.js
│   │   │   │   ├── security.e2e-spec.d.ts
│   │   │   │   ├── security.e2e-spec.js
│   │   │   │   ├── test-request.helper.d.ts
│   │   │   │   ├── test-request.helper.js
│   │   │   │   ├── workspaces.e2e-spec.d.ts
│   │   │   │   └── workspaces.e2e-spec.js
│   │   │   ├── test-advanced-e2e.d.ts
│   │   │   ├── test-advanced-e2e.js
│   │   │   ├── test-security-e2e.d.ts
│   │   │   ├── test-security-e2e.js
│   │   │   ├── test-simple-security.d.ts
│   │   │   └── test-simple-security.js
│   │   └── web
│   │       ├── src
│   │       │   ├── app
│   │       │   └── pages
│   │       ├── get-dictionary.d.ts
│   │       ├── get-dictionary.js
│   │       ├── i18n-config.d.ts
│   │       ├── i18n-config.js
│   │       ├── middleware.d.ts
│   │       ├── middleware.js
│   │       ├── tailwind.config.d.ts
│   │       └── tailwind.config.js
│   └── packages
│       ├── database
│       │   └── src
│       │       ├── db.d.ts
│       │       ├── db.js
│       │       ├── index.d.ts
│       │       ├── index.js
│       │       ├── types.d.ts
│       │       └── types.js
│       ├── devtools
│       │   └── src
│       │       ├── compiler
│       │       ├── ui
│       │       ├── index.d.ts
│       │       └── index.js
│       └── shared
│           └── src
│               ├── api
│               ├── app
│               ├── lib
│               ├── modules
│               ├── stores
│               ├── types
│               ├── ui
│               ├── index.d.ts
│               └── index.js
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
│   ├── PRODUCTION_SETUP.md
│   └── PROJECT_TREE.md
├── packages
│   ├── context
│   │   ├── mcp-server
│   │   │   ├── __pycache__
│   │   │   │   └── server.cpython-310.pyc
│   │   │   └── server.py
│   │   ├── __pycache__
│   │   │   └── logging_config.cpython-310.pyc
│   │   ├── scripts
│   │   │   ├── backup.py
│   │   │   └── embed.py
│   │   ├── ARCHITECTURE.md
│   │   ├── CONFIG.md
│   │   ├── docker-compose.yml
│   │   ├── INSTALL.sh
│   │   ├── logging_config.py
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── requirements.txt
│   │   ├── SETUP.md
│   │   ├── TOOLS.md
│   │   ├── TROUBLESHOOTING.md
│   │   ├── USAGE.md
│   │   └── USAGE_RU.md
│   ├── database
│   │   ├── dist
│   │   │   ├── db.d.ts
│   │   │   ├── db.js
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   ├── types.d.ts
│   │   │   └── types.js
│   │   ├── migrations
│   │   │   └── 001_add_auth_enhancements.sql
│   │   ├── src
│   │   │   ├── db.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── devtools
│   │   ├── dist
│   │   │   ├── builder
│   │   │   │   ├── rollup
│   │   │   │   ├── swc
│   │   │   │   ├── vite
│   │   │   │   └── webpack
│   │   │   ├── ui
│   │   │   │   ├── lib
│   │   │   │   ├── index.d.ts
│   │   │   │   ├── index.js
│   │   │   │   ├── mount.d.ts
│   │   │   │   └── mount.js
│   │   │   ├── index.d.ts
│   │   │   └── index.js
│   │   ├── src
│   │   │   ├── builder
│   │   │   │   ├── rollup
│   │   │   │   ├── swc
│   │   │   │   ├── vite
│   │   │   │   └── webpack
│   │   │   ├── ui
│   │   │   │   ├── lib
│   │   │   │   ├── index.ts
│   │   │   │   └── mount.ts
│   │   │   └── index.ts
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── shared
│       ├── docs
│       │   └── PROJECT_TREE.md
│       ├── src
│       │   ├── api
│       │   │   ├── hooks
│       │   │   ├── Admin.ts
│       │   │   ├── api-mapping.ts
│       │   │   ├── api-types.ts
│       │   │   ├── api-utils.ts
│       │   │   ├── Auth.ts
│       │   │   ├── Blocks.ts
│       │   │   ├── client.ts
│       │   │   ├── config.ts
│       │   │   ├── Countries.ts
│       │   │   ├── create-api.ts
│       │   │   ├── data-contracts.ts
│       │   │   ├── definitions.ts
│       │   │   ├── endpoints.ts
│       │   │   ├── error.ts
│       │   │   ├── Events.ts
│       │   │   ├── Formulas.ts
│       │   │   ├── Groups.ts
│       │   │   ├── http-client.ts
│       │   │   ├── index.ts
│       │   │   ├── Pages.ts
│       │   │   ├── Reference.ts
│       │   │   ├── Tables.ts
│       │   │   ├── Users.ts
│       │   │   ├── Versions.ts
│       │   │   ├── websocket.ts
│       │   │   └── Workspaces.ts
│       │   ├── app
│       │   │   └── providers
│       │   ├── lib
│       │   │   ├── cn.ts
│       │   │   └── index.ts
│       │   ├── modules
│       │   │   ├── admin
│       │   │   ├── auth
│       │   │   ├── dashboard
│       │   │   ├── events
│       │   │   ├── i18n
│       │   │   ├── indicators
│       │   │   ├── notifications
│       │   │   ├── pages
│       │   │   ├── profile
│       │   │   ├── reference
│       │   │   ├── seasons
│       │   │   ├── sports
│       │   │   ├── table
│       │   │   ├── visualization
│       │   │   ├── workspaces
│       │   │   └── index.ts
│       │   ├── stores
│       │   │   ├── index.ts
│       │   │   ├── useFormattingStore.ts
│       │   │   ├── useFormulaStore.ts
│       │   │   ├── useHistoryStore.ts
│       │   │   ├── useReferenceStore.ts
│       │   │   ├── useSelectionStore.ts
│       │   │   ├── useTableReferenceStore.ts
│       │   │   ├── useTableStore.ts
│       │   │   ├── useUserStore.ts
│       │   │   └── useWorkspaceStore.ts
│       │   ├── types
│       │   │   ├── dictionary.ts
│       │   │   ├── enums.ts
│       │   │   ├── index.ts
│       │   │   ├── link.types.ts
│       │   │   ├── next-shim.d.ts
│       │   │   ├── reference.types.ts
│       │   │   └── visualization.ts
│       │   ├── ui
│       │   │   ├── layout
│       │   │   ├── primitives
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── AGENT.md
│       ├── package.json
│       ├── tsconfig.json
│       └── tsconfig.tsbuildinfo
├── scripts
│   ├── dev-setup.sh
│   ├── fix-imports.py
│   ├── fix-imports.sh
│   ├── generate-secrets.sh
│   ├── generate_tree.sh
│   └── production-setup.sh
├── AGENT.md
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

151 directories, 348 files
