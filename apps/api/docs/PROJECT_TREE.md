# Структура проекта api

Генерировано: Сб 31 янв 2026 01:05:24 +03

/home/ivan/git/elbruso/apps/api
├── docs
│   └── PROJECT_TREE.md
├── src
│   ├── admin
│   │   ├── decorators
│   │   │   └── roles.decorator.ts
│   │   ├── dto
│   │   │   ├── admin-login.dto.ts
│   │   │   └── admin-setup.dto.ts
│   │   ├── guards
│   │   │   └── admin-jwt-auth.guard.ts
│   │   ├── roles
│   │   │   ├── dto
│   │   │   │   ├── create-role.dto.ts
│   │   │   │   └── update-role.dto.ts
│   │   │   ├── admin-roles.controller.ts
│   │   │   ├── admin-roles.module.ts
│   │   │   └── admin-roles.service.ts
│   │   ├── strategies
│   │   │   └── admin-jwt.strategy.ts
│   │   ├── users
│   │   │   ├── dto
│   │   │   │   ├── create-admin-user.dto.ts
│   │   │   │   └── update-admin-user.dto.ts
│   │   │   ├── admin-users.controller.ts
│   │   │   ├── admin-users.module.ts
│   │   │   └── admin-users.service.ts
│   │   ├── admin-auth.controller.ts
│   │   ├── admin-auth.module.ts
│   │   ├── admin-auth.service.ts
│   │   ├── admin.module.ts
│   │   ├── admin-setup.controller.ts
│   │   └── admin-setup.service.ts
│   ├── auth
│   │   ├── dto
│   │   │   ├── index.ts
│   │   │   └── password-recovery.dto.ts
│   │   ├── guards
│   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   ├── api-key-auth.guard.ts
│   │   │   └── jwt-auth.guard.ts
│   │   ├── interfaces
│   │   │   └── index.ts
│   │   ├── strategies
│   │   │   ├── api-key.strategy.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── blocks
│   │   ├── dto
│   │   │   └── index.ts
│   │   ├── blocks.controller.ts
│   │   ├── blocks.module.ts
│   │   └── blocks.service.ts
│   ├── common
│   │   ├── audit
│   │   │   ├── audit.module.ts
│   │   │   └── audit.service.ts
│   │   ├── decorators
│   │   │   └── roles.decorator.ts
│   │   ├── filters
│   │   └── interceptors
│   ├── config
│   ├── countries
│   │   ├── countries.controller.ts
│   │   ├── countries.module.ts
│   │   └── countries.service.ts
│   ├── database
│   │   ├── {repositories}
│   │   ├── database.module.ts
│   │   └── database.service.ts
│   ├── dynamic-tables
│   │   ├── dto
│   │   │   └── index.ts
│   │   ├── dynamic-tables.controller.ts
│   │   ├── dynamic-tables.module.ts
│   │   └── dynamic-tables.service.ts
│   ├── email
│   │   ├── interfaces
│   │   │   └── email-provider.interface.ts
│   │   ├── providers
│   │   │   ├── console-email.provider.ts
│   │   │   └── smtp-email.provider.ts
│   │   ├── email.module.ts
│   │   └── email.service.ts
│   ├── events
│   │   ├── dto
│   │   │   └── event-filters.dto.ts
│   │   ├── events.controller.ts
│   │   ├── events.module.ts
│   │   └── events.service.ts
│   ├── formula
│   │   ├── dto
│   │   │   └── formula-analysis.dto.ts
│   │   ├── formula.controller.ts
│   │   ├── formula.module.ts
│   │   └── formula.service.ts
│   ├── gateway
│   │   ├── controllers
│   │   ├── guards
│   │   └── interceptors
│   ├── indicator-groups
│   │   ├── dto
│   │   │   └── indicator-group-filters.dto.ts
│   │   ├── indicator-groups.controller.ts
│   │   ├── indicator-groups.module.ts
│   │   └── indicator-groups.service.ts
│   ├── indicators
│   │   ├── dto
│   │   │   ├── generate-indicators.dto.ts
│   │   │   ├── indicator-filters.dto.ts
│   │   │   └── indicator-group.dto.ts
│   │   ├── indicators.controller.ts
│   │   ├── indicators.module.ts
│   │   └── indicators.service.ts
│   ├── modules
│   │   ├── admin
│   │   │   ├── admin-auth
│   │   │   │   └── dto
│   │   │   └── admin-users
│   │   │       └── dto
│   │   ├── content
│   │   │   ├── blocks
│   │   │   │   └── dto
│   │   │   ├── charts
│   │   │   └── pages
│   │   │       └── dto
│   │   ├── core
│   │   │   ├── auth
│   │   │   │   ├── dto
│   │   │   │   ├── guards
│   │   │   │   └── strategies
│   │   │   ├── permissions
│   │   │   ├── users
│   │   │   │   └── dto
│   │   │   ├── workspace-groups
│   │   │   │   └── dto
│   │   │   └── workspaces
│   │   │       └── dto
│   │   └── reference
│   │       ├── countries
│   │       ├── organizations
│   │       ├── regions
│   │       ├── seasons
│   │       └── sports
│   ├── organizations
│   │   ├── dto
│   │   │   └── organization-filters.dto.ts
│   │   ├── organizations.controller.ts
│   │   ├── organizations.module.ts
│   │   └── organizations.service.ts
│   ├── pages
│   │   ├── dto
│   │   │   └── index.ts
│   │   ├── pages.controller.ts
│   │   ├── pages.module.ts
│   │   └── pages.service.ts
│   ├── regions
│   │   ├── dto
│   │   │   └── region-filters.dto.ts
│   │   ├── regions.controller.ts
│   │   ├── regions.module.ts
│   │   └── regions.service.ts
│   ├── seasons
│   │   ├── dto
│   │   │   └── generate-seasons.dto.ts
│   │   ├── seasons.controller.ts
│   │   ├── seasons.module.ts
│   │   └── seasons.service.ts
│   ├── shared
│   │   ├── dto
│   │   ├── interfaces
│   │   └── utils
│   ├── sports
│   │   ├── dto
│   │   │   └── sport-filters.dto.ts
│   │   ├── sports.controller.ts
│   │   ├── sports.module.ts
│   │   └── sports.service.ts
│   ├── users
│   │   ├── dto
│   │   │   ├── index.ts
│   │   │   └── user-settings.dto.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── workspace-groups
│   │   ├── dto
│   │   │   └── index.ts
│   │   ├── workspace-groups.controller.ts
│   │   ├── workspace-groups.module.ts
│   │   └── workspace-groups.service.ts
│   ├── workspaces
│   │   ├── dto
│   │   │   └── index.ts
│   │   ├── workspaces.controller.ts
│   │   ├── workspaces.module.ts
│   │   └── workspaces.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test
│   ├── coverage
│   │   ├── lcov-report
│   │   │   ├── base.css
│   │   │   ├── block-navigation.js
│   │   │   ├── favicon.png
│   │   │   ├── index.html
│   │   │   ├── prettify.css
│   │   │   ├── prettify.js
│   │   │   ├── sort-arrow-sprite.png
│   │   │   └── sorter.js
│   │   ├── base.css
│   │   ├── block-navigation.js
│   │   ├── coverage-final.json
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── lcov.info
│   │   ├── prettify.css
│   │   ├── prettify.js
│   │   ├── sort-arrow-sprite.png
│   │   └── sorter.js
│   ├── auth-users.e2e-spec.ts
│   ├── global-setup.js
│   ├── jest-e2e.json
│   ├── pages.e2e-spec.ts
│   ├── security.e2e-spec.ts
│   ├── setup-env.js
│   ├── test-schema-full.sql
│   ├── test-schema.sql
│   └── workspaces.e2e-spec.ts
├── AGENT.md
├── nest-cli.json
├── package.json
├── test-advanced-e2e.ts
├── test-security-e2e.ts
├── test-simple-security.ts
└── tsconfig.json

97 directories, 142 files
