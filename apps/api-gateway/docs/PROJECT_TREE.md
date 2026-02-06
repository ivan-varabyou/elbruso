# Структура проекта api-gateway

Генерировано: Пт 06 фев 2026 03:21:05 +03

/home/ivan/git/elbruso/apps/api-gateway
├── docs
│   └── PROJECT_TREE.md
├── src
│   ├── config
│   ├── core
│   │   ├── controllers
│   │   │   ├── health.controller.ts
│   │   │   └── index.ts
│   │   ├── database
│   │   │   ├── {repositories}
│   │   │   ├── database.module.ts
│   │   │   └── database.service.ts
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
├── tsconfig.json
└── tsconfig.tsbuildinfo

21 directories, 61 files
