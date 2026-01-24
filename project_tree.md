# Структура проекта

Генерировано: Сб 24 янв 2026 20:16:12 +03

/home/ivan/git/elbruso
├── apps
│   ├── admin
│   │   ├── public
│   │   │   └── assets
│   │   │       └── img
│   │   ├── src
│   │   │   └── app
│   │   │       ├── login
│   │   │       ├── globals.css
│   │   │       └── page.tsx
│   │   ├── next.config.mjs
│   │   ├── next-env.d.ts
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   ├── api
│   │   ├── src
│   │   │   ├── auth
│   │   │   │   ├── admin
│   │   │   │   ├── dto
│   │   │   │   ├── guards
│   │   │   │   ├── interfaces
│   │   │   │   ├── strategies
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── blocks
│   │   │   │   ├── dto
│   │   │   │   ├── blocks.controller.ts
│   │   │   │   ├── blocks.module.ts
│   │   │   │   └── blocks.service.ts
│   │   │   ├── common
│   │   │   │   └── audit
│   │   │   ├── countries
│   │   │   │   ├── countries.controller.ts
│   │   │   │   ├── countries.module.ts
│   │   │   │   └── countries.service.ts
│   │   │   ├── database
│   │   │   │   ├── database.module.ts
│   │   │   │   └── database.service.ts
│   │   │   ├── dynamic-tables
│   │   │   │   ├── dto
│   │   │   │   ├── dynamic-tables.controller.ts
│   │   │   │   ├── dynamic-tables.module.ts
│   │   │   │   └── dynamic-tables.service.ts
│   │   │   ├── email
│   │   │   │   ├── interfaces
│   │   │   │   ├── providers
│   │   │   │   ├── email.module.ts
│   │   │   │   └── email.service.ts
│   │   │   ├── events
│   │   │   │   ├── dto
│   │   │   │   ├── events.controller.ts
│   │   │   │   ├── events.module.ts
│   │   │   │   └── events.service.ts
│   │   │   ├── formula
│   │   │   │   ├── dto
│   │   │   │   ├── formula.controller.ts
│   │   │   │   ├── formula.module.ts
│   │   │   │   └── formula.service.ts
│   │   │   ├── indicator-groups
│   │   │   │   ├── dto
│   │   │   │   ├── indicator-groups.controller.ts
│   │   │   │   ├── indicator-groups.module.ts
│   │   │   │   └── indicator-groups.service.ts
│   │   │   ├── indicators
│   │   │   │   ├── dto
│   │   │   │   ├── indicators.controller.ts
│   │   │   │   ├── indicators.module.ts
│   │   │   │   └── indicators.service.ts
│   │   │   ├── modules
│   │   │   │   ├── Analytics
│   │   │   │   ├── Auth
│   │   │   │   ├── Inventory
│   │   │   │   ├── TableEngine
│   │   │   │   ├── User
│   │   │   │   └── Workspace
│   │   │   ├── organizations
│   │   │   │   ├── dto
│   │   │   │   ├── organizations.controller.ts
│   │   │   │   ├── organizations.module.ts
│   │   │   │   └── organizations.service.ts
│   │   │   ├── pages
│   │   │   │   ├── dto
│   │   │   │   ├── pages.controller.ts
│   │   │   │   ├── pages.module.ts
│   │   │   │   └── pages.service.ts
│   │   │   ├── regions
│   │   │   │   ├── dto
│   │   │   │   ├── regions.controller.ts
│   │   │   │   ├── regions.module.ts
│   │   │   │   └── regions.service.ts
│   │   │   ├── seasons
│   │   │   │   ├── dto
│   │   │   │   ├── seasons.controller.ts
│   │   │   │   ├── seasons.module.ts
│   │   │   │   └── seasons.service.ts
│   │   │   ├── sports
│   │   │   │   ├── dto
│   │   │   │   ├── sports.controller.ts
│   │   │   │   ├── sports.module.ts
│   │   │   │   └── sports.service.ts
│   │   │   ├── users
│   │   │   │   ├── dto
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.module.ts
│   │   │   │   └── users.service.ts
│   │   │   ├── workspace-groups
│   │   │   │   ├── dto
│   │   │   │   ├── workspace-groups.controller.ts
│   │   │   │   ├── workspace-groups.module.ts
│   │   │   │   └── workspace-groups.service.ts
│   │   │   ├── workspaces
│   │   │   │   ├── dto
│   │   │   │   ├── workspaces.controller.ts
│   │   │   │   ├── workspaces.module.ts
│   │   │   │   └── workspaces.service.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── test
│   │   │   ├── auth-users.e2e-spec.ts
│   │   │   ├── global-setup.js
│   │   │   ├── jest-e2e.json
│   │   │   ├── pages.e2e-spec.ts
│   │   │   ├── security.e2e-spec.ts
│   │   │   ├── setup-env.js
│   │   │   ├── test-schema-full.sql
│   │   │   ├── test-schema.sql
│   │   │   └── workspaces.e2e-spec.ts
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
│       ├── public
│       │   ├── assets
│       │   │   └── img
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
│       │   │   ├── boot
│       │   │   ├── externals
│       │   │   ├── (profile)
│       │   │   ├── router
│       │   │   ├── ui
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── common
│       │   │   ├── hooks
│       │   │   ├── meta
│       │   │   ├── types
│       │   │   ├── ui
│       │   │   └── utils
│       │   ├── contracts
│       │   │   ├── codegen
│       │   │   ├── events
│       │   │   └── schemas
│       │   ├── features
│       │   │   └── reference-link
│       │   ├── global
│       │   │   ├── env
│       │   │   └── shims
│       │   ├── infra
│       │   │   ├── ci
│       │   │   ├── eslint
│       │   │   └── scripts
│       │   ├── modules
│       │   ├── pages
│       │   │   ├── auth
│       │   │   ├── index
│       │   │   ├── layouts
│       │   │   └── profile
│       │   ├── shared
│       │   │   ├── api
│       │   │   ├── lib
│       │   │   ├── services
│       │   │   ├── stores
│       │   │   ├── types
│       │   │   └── ui
│       │   ├── tests
│       │   │   ├── contract
│       │   │   ├── e2e
│       │   │   ├── integration
│       │   │   └── unit
│       │   ├── types
│       │   │   └── index.ts
│       │   ├── views
│       │   │   └── HomePage
│       │   └── widgets
│       │       ├── Brands
│       │       ├── ChartsShowcase
│       │       ├── DynamicTable
│       │       ├── Footer
│       │       ├── Header
│       │       ├── Hero
│       │       ├── ProductsShowcase
│       │       ├── ProfileLayout
│       │       ├── Seasons
│       │       └── WorkspaceTree
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
├── packages
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
│   ├── debug
│   │   ├── src
│   │   │   ├── action-registry.ts
│   │   │   ├── ContrastDetector.tsx
│   │   │   ├── DebugConsole.tsx
│   │   │   ├── DebugContext.tsx
│   │   │   ├── DebugOverlay.tsx
│   │   │   ├── DebugTrigger.tsx
│   │   │   ├── index.ts
│   │   │   ├── PathCopier.tsx
│   │   │   └── ui-events.ts
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.json
│   ├── path-copier
│   │   ├── dist
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   ├── loader.d.ts
│   │   │   ├── loader.js
│   │   │   ├── swc-plugin.d.ts
│   │   │   └── swc-plugin.js
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   ├── loader.ts
│   │   │   └── swc-plugin.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── shared
│   │   ├── src
│   │   │   ├── api
│   │   │   ├── auth
│   │   │   ├── common
│   │   │   │   ├── api
│   │   │   │   └── lib
│   │   │   ├── lib
│   │   │   ├── modules
│   │   │   │   ├── Analytics
│   │   │   │   ├── Auth
│   │   │   │   ├── TableEngine
│   │   │   │   ├── User
│   │   │   │   └── Workspace
│   │   │   ├── types
│   │   │   └── ui
│   │   │       ├── AuthLayout
│   │   │       ├── Button
│   │   │       ├── Input
│   │   │       ├── layouts
│   │   │       ├── LoginPage
│   │   │       ├── Logo
│   │   │       └── Toast
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   ├── types
│   │   ├── dist
│   │   │   ├── index.d.ts
│   │   │   └── index.js
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ui
│       ├── dist
│       │   ├── index.d.ts
│       │   └── index.js
│       ├── src
│       │   ├── atoms
│       │   │   ├── Button
│       │   │   ├── IconButton
│       │   │   ├── Input
│       │   │   ├── Select
│       │   │   └── Toast
│       │   ├── charts
│       │   ├── components
│       │   │   ├── PageLayout
│       │   │   └── Sidebar
│       │   ├── molecules
│       │   │   ├── LanguageSwitcher
│       │   │   ├── Logo
│       │   │   └── PasswordStrength
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── scripts
│   └── dev-setup.sh
├── docker-compose.yml
├── generate_tree.sh
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── project_tree.md
├── TEST_CREDENTIALS.md
├── tsconfig.json
└── turbo.json

184 directories, 261 files
