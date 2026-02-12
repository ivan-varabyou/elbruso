# Структура проекта api-gateway

Генерировано: Чт 12 фев 2026 22:09:15 +03

/home/ivan/git/elbruso/apps/api-gateway
├── docs
│   └── PROJECT_TREE.md
├── src
│   ├── config
│   │   └── config.ts
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
│   ├── app.module.ts
│   ├── bootstrap.ts
│   └── main.ts
├── test
│   ├── coverage
│   │   ├── lcov-report
│   │   │   ├── base.css
│   │   │   ├── favicon.png
│   │   │   ├── index.html
│   │   │   ├── prettify.css
│   │   │   └── sort-arrow-sprite.png
│   │   ├── base.css
│   │   ├── coverage-final.json
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── lcov.info
│   │   ├── prettify.css
│   │   └── sort-arrow-sprite.png
│   ├── auth-users.e2e-spec.ts
│   ├── jest-e2e.json
│   ├── pages.e2e-spec.ts
│   ├── security.e2e-spec.ts
│   ├── test-request.helper.ts
│   ├── test-schema-full.sql
│   ├── test-schema.sql
│   └── workspaces.e2e-spec.ts
├── AGENTS.md
├── nest-cli.json
├── package.json
├── test-advanced-e2e.ts
├── test-security-e2e.ts
├── test-simple-security.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo

16 directories, 50 files
