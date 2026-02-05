# Структура проекта api

Генерировано: Чт 05 фев 2026 20:47:46 +03

/home/ivan/git/elbruso/apps/api
├── docs
│   └── PROJECT_TREE.md
├── src
│   ├── config
│   ├── database
│   │   ├── {repositories}
│   │   ├── database.module.ts
│   │   └── database.service.ts
│   ├── gateway
│   │   ├── controllers
│   │   │   ├── health.controller.ts
│   │   │   └── index.ts
│   │   ├── dto
│   │   │   ├── api-response.dto.ts
│   │   │   └── index.ts
│   │   ├── filters
│   │   │   ├── http-exception.filter.ts
│   │   │   └── index.ts
│   │   ├── guards
│   │   ├── interceptors
│   │   │   ├── index.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── services
│   │   │   ├── health.service.ts
│   │   │   └── index.ts
│   │   ├── websocket
│   │   │   ├── bootstrap.ts
│   │   │   ├── index.ts
│   │   │   └── profile.gateway.ts
│   │   ├── gateway.module.ts
│   │   └── index.ts
│   ├── modules
│   │   ├── admin
│   │   │   ├── admin-auth
│   │   │   │   ├── controllers
│   │   │   │   │   └── admin-auth.controller.ts
│   │   │   │   ├── dto
│   │   │   │   │   └── login.dto.ts
│   │   │   │   ├── services
│   │   │   │   │   └── admin-auth.service.ts
│   │   │   │   └── strategies
│   │   │   │       └── admin-jwt.strategy.ts
│   │   │   ├── admin-users
│   │   │   │   └── dto
│   │   │   ├── controllers
│   │   │   │   ├── admin-auth.controller.ts
│   │   │   │   ├── admin-setup.controller.ts
│   │   │   │   └── index.ts
│   │   │   ├── decorators
│   │   │   │   ├── index.ts
│   │   │   │   └── roles.decorator.ts
│   │   │   ├── dto
│   │   │   │   ├── admin-login.dto.ts
│   │   │   │   ├── admin-reset.dto.ts
│   │   │   │   ├── admin-setup.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── guards
│   │   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   │   └── index.ts
│   │   │   ├── roles
│   │   │   │   ├── dto
│   │   │   │   │   ├── create-role.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── update-role.dto.ts
│   │   │   │   ├── admin-roles.controller.ts
│   │   │   │   ├── admin-roles.module.ts
│   │   │   │   └── admin-roles.service.ts
│   │   │   ├── services
│   │   │   │   ├── admin-auth.service.ts
│   │   │   │   ├── admin-setup.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── strategies
│   │   │   │   ├── admin-jwt.strategy.ts
│   │   │   │   └── index.ts
│   │   │   ├── users
│   │   │   │   ├── dto
│   │   │   │   │   ├── create-admin-user.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── update-admin-user.dto.ts
│   │   │   │   ├── admin-users.controller.ts
│   │   │   │   ├── admin-users.module.ts
│   │   │   │   └── admin-users.service.ts
│   │   │   ├── admin-auth.module.ts
│   │   │   ├── admin.module.ts
│   │   │   └── index.ts
│   │   ├── audit
│   │   │   ├── events
│   │   │   │   └── audit.events.ts
│   │   │   ├── services
│   │   │   │   └── audit.service.ts
│   │   │   ├── audit.module.ts
│   │   │   └── index.ts
│   │   ├── auth
│   │   │   ├── controllers
│   │   │   │   └── auth.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── auth.dto.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── password-recovery.dto.ts
│   │   │   ├── events
│   │   │   │   ├── auth.events.ts
│   │   │   │   └── index.ts
│   │   │   ├── guards
│   │   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   │   ├── api-key-auth.guard.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   ├── interfaces
│   │   │   │   ├── auth.interface.ts
│   │   │   │   └── index.ts
│   │   │   ├── services
│   │   │   │   └── auth.service.ts
│   │   │   ├── strategies
│   │   │   │   ├── api-key.strategy.ts
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── auth.module.ts
│   │   │   └── index.ts
│   │   ├── blocks
│   │   │   ├── controllers
│   │   │   │   └── blocks.controller.ts
│   │   │   ├── dto
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── blocks.events.ts
│   │   │   ├── services
│   │   │   │   └── blocks.service.ts
│   │   │   ├── blocks.module.ts
│   │   │   └── index.ts
│   │   ├── content
│   │   │   ├── blocks
│   │   │   │   └── dto
│   │   │   ├── charts
│   │   │   └── pages
│   │   │       └── dto
│   │   ├── countries
│   │   │   ├── controllers
│   │   │   │   └── countries.controller.ts
│   │   │   ├── dto
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── countries.events.ts
│   │   │   ├── services
│   │   │   │   └── countries.service.ts
│   │   │   ├── countries.module.ts
│   │   │   └── index.ts
│   │   ├── email
│   │   │   ├── controllers
│   │   │   ├── dto
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── email.events.ts
│   │   │   ├── interfaces
│   │   │   │   └── email-provider.interface.ts
│   │   │   ├── providers
│   │   │   │   ├── console-email.provider.ts
│   │   │   │   └── smtp-email.provider.ts
│   │   │   ├── services
│   │   │   │   └── email.service.ts
│   │   │   ├── email.module.ts
│   │   │   └── index.ts
│   │   ├── events
│   │   │   ├── controllers
│   │   │   │   └── events.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── event-filters.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   ├── services
│   │   │   │   └── events.service.ts
│   │   │   ├── events.module.ts
│   │   │   └── index.ts
│   │   ├── indicators
│   │   │   ├── controllers
│   │   │   │   ├── indicator-groups.controller.ts
│   │   │   │   └── indicators.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── generate-indicators.dto.ts
│   │   │   │   ├── indicator-filters.dto.ts
│   │   │   │   ├── indicator-group.dto.ts
│   │   │   │   └── indicator-group-filters.dto.ts
│   │   │   ├── entities
│   │   │   ├── interfaces
│   │   │   ├── services
│   │   │   │   ├── indicator-groups.service.ts
│   │   │   │   └── indicators.service.ts
│   │   │   ├── index.ts
│   │   │   └── indicators.module.ts
│   │   ├── organizations
│   │   │   ├── controllers
│   │   │   │   └── organizations.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── index.ts
│   │   │   │   └── organization-filters.dto.ts
│   │   │   ├── events
│   │   │   │   └── organizations.events.ts
│   │   │   ├── services
│   │   │   │   └── organizations.service.ts
│   │   │   ├── index.ts
│   │   │   └── organizations.module.ts
│   │   ├── pages
│   │   │   ├── controllers
│   │   │   │   └── pages.controller.ts
│   │   │   ├── dto
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── pages.events.ts
│   │   │   ├── services
│   │   │   │   └── pages.service.ts
│   │   │   ├── index.ts
│   │   │   └── pages.module.ts
│   │   ├── reference
│   │   │   ├── countries
│   │   │   ├── organizations
│   │   │   ├── regions
│   │   │   ├── seasons
│   │   │   └── sports
│   │   ├── regions
│   │   │   ├── controllers
│   │   │   │   └── regions.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── index.ts
│   │   │   │   └── region-filters.dto.ts
│   │   │   ├── events
│   │   │   │   └── regions.events.ts
│   │   │   ├── services
│   │   │   │   └── regions.service.ts
│   │   │   ├── index.ts
│   │   │   └── regions.module.ts
│   │   ├── seasons
│   │   │   ├── controllers
│   │   │   │   └── seasons.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── generate-seasons.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── seasons.events.ts
│   │   │   ├── services
│   │   │   │   └── seasons.service.ts
│   │   │   ├── index.ts
│   │   │   └── seasons.module.ts
│   │   ├── sports
│   │   │   ├── controllers
│   │   │   │   └── sports.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── index.ts
│   │   │   │   └── sport-filters.dto.ts
│   │   │   ├── events
│   │   │   │   └── sports.events.ts
│   │   │   ├── services
│   │   │   │   └── sports.service.ts
│   │   │   ├── index.ts
│   │   │   └── sports.module.ts
│   │   ├── tables
│   │   │   ├── controllers
│   │   │   │   ├── formula.controller.ts
│   │   │   │   └── tables.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── formula-analysis.dto.ts
│   │   │   │   └── tables.dto.ts
│   │   │   ├── entities
│   │   │   │   ├── formula.entity.ts
│   │   │   │   └── table.entity.ts
│   │   │   ├── events
│   │   │   │   └── tables.events.ts
│   │   │   ├── interfaces
│   │   │   │   └── tables.interface.ts
│   │   │   ├── services
│   │   │   │   ├── formula.service.ts
│   │   │   │   └── tables.service.ts
│   │   │   ├── index.ts
│   │   │   └── tables.module.ts
│   │   ├── users
│   │   │   ├── controllers
│   │   │   │   └── users.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── index.ts
│   │   │   │   └── user-settings.dto.ts
│   │   │   ├── events
│   │   │   ├── services
│   │   │   │   └── users.service.ts
│   │   │   ├── index.ts
│   │   │   └── users.module.ts
│   │   └── workspace
│   │       ├── controllers
│   │       │   ├── workspace.controller.ts
│   │       │   └── workspace-group.controller.ts
│   │       ├── dto
│   │       │   ├── index.ts
│   │       │   ├── workspace.dto.ts
│   │       │   └── workspace-group.dto.ts
│   │       ├── events
│   │       │   └── workspace.events.ts
│   │       ├── services
│   │       │   ├── workspace-group.service.ts
│   │       │   └── workspace.service.ts
│   │       ├── index.ts
│   │       └── workspace.module.ts
│   ├── shared
│   │   ├── decorators
│   │   │   └── roles.decorator.ts
│   │   ├── dto
│   │   ├── interfaces
│   │   └── utils
│   ├── app.module.ts
│   ├── bootstrap.ts
│   ├── config.ts
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
│   ├── custom-resolver.js
│   ├── global-setup.js
│   ├── jest-e2e.json
│   ├── pages.e2e-spec.ts
│   ├── security.e2e-spec.ts
│   ├── setup-env.js
│   ├── test-request.helper.ts
│   ├── test-schema-full.sql
│   ├── test-schema.sql
│   └── workspaces.e2e-spec.ts
├── AGENTS.md
├── jest-e2e.config.js
├── nest-cli.json
├── package.json
├── test-advanced-e2e.ts
├── test-security-e2e.ts
├── test-simple-security.ts
└── tsconfig.json

133 directories, 215 files
