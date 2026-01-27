nypm-workspace/
├── package.json                                   # корневой манифест: workspaces, scripts, devDeps
├── nypm-workspace.json                            # конфигурация workspace (аналог pnpm-workspace)
├── tsconfig.json                                   # базовый tsconfig для всех пакетов
├── turbo.json / nx.json                           # оркестрация билдов, кэширование, пайплайны
│
├───────────────────────────────────────────────────────────────────────────────
│  APPS — ТОЛЬКО ПРИЛОЖЕНИЯ (СТРАНИЦЫ, LAYOUT’Ы, DI, CONFIG)
│  НИКАКИХ МОДУЛЕЙ, НИКАКОГО UI МОДУЛЕЙ, НИКАКОЙ ДОМЕННОЙ ЛОГИКИ
├───────────────────────────────────────────────────────────────────────────────
│
├── apps/
│   ├── web/                                       # публичное приложение (клиентская часть)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │   ├── app/                                   # универсальная FEOD-оркестрация
│   │   │   ├── boot/
│   │   │   │   ├── di.ts                          # базовая DI-конфигурация FEOD
│   │   │   │   ├── lifecycle.ts                   # onReady(), onShutdown()
│   │   │   │   ├── startup.ts                     # preload, warmup, init telemetry
│   │   │   │   └── config/                        # базовые конфиги FEOD
│   │   │   │       ├── default.ts
│   │   │   │       ├── env.dev.ts
│   │   │   │       ├── env.stage.ts
│   │   │   │       └── env.prod.ts
│   │   │   ├── externals/
│   │   │   │   ├── analytics.adapter.ts           # init analytics, send events
│   │   │   │   ├── sentry.adapter.ts              # error logging
│   │   │   │   ├── featureFlags.adapter.ts        # LaunchDarkly/Unleash
│   │   │   │   └── httpClient.adapter.ts          # axios/fetch wrapper
│   │   │   └── providers/
│   │   │       ├── RootProviders.tsx              # ThemeProvider, I18nProvider, ErrorBoundary
│   │   │       └── AppShell.tsx                   # минимальный shell FEOD
│   │   │
│   │   ├── common/                                # шаред слой
│   │   ├── common/state/                          # состояние ПРИЛОЖЕНИЯ
│   │   │   ├── stores/                            # глобальные Zustand/Redux stores
│   │   │   │   ├── app.store.ts                   # глобальное состояние приложения
│   │   │   │   ├── user.store.ts                  # пользователь, токены, профиль
│   │   │   │   ├── settings.store.ts              # настройки приложения
│   │   │   │   ├── featureFlags.store.ts          # фичи приложения
│   │   │   │   ├── permissions.store.ts           # ACL, роли, доступы
│   │   │   │   └── {APP_STORE}.ts                 # любое другое состояние приложения
│   │   │   │
│   │   │   ├── selectors/                         # селекторы для stores
│   │   │   │   ├── user.selectors.ts
│   │   │   │   ├── permissions.selectors.ts
│   │   │   │   └── {SELECTOR_GROUP}.ts
│   │   │   │
│   │   │   ├── actions/                           # действия приложения (чистые функции)
│   │   │   │   ├── user.actions.ts
│   │   │   │   ├── app.actions.ts
│   │   │   │   └── {ACTION_GROUP}.ts
│   │   │   │
│   │   │   ├── effects/                           # побочные эффекты (если нужны)
│   │   │   │   ├── user.effects.ts
│   │   │   │   ├── app.effects.ts
│   │   │   │   └── {EFFECT_GROUP}.ts
│   │   │   │
│   │   │   ├── hooks/                             # хуки для работы с app-state
│   │   │   │   ├── useUser.ts
│   │   │   │   ├── usePermissions.ts
│   │   │   │   ├── useFeatureFlags.ts
│   │   │   │   └── {APP_HOOK}.ts
│   │   │   │
│   │   │   └── index.ts                           # единая точка экспорта app-state
│   │   │
│   │   ├── pages/                                 # страницы и layout’ы приложения
│   │   │   ├── layouts/                       # layout-слой (только в приложении)
│   │   │   │   ├── DefaultLayout.tsx          # базовый layout: header/footer/sidebar
│   │   │   │   ├── AuthLayout.tsx             # layout для auth-зоны
│   │   │   │   ├── AdminLayout.tsx            # layout для админки
│   │   │   │   └── {SECTION_NAME}Layout.tsx   # layout для вложенных разделов
│   │   │   │
│   │   │   ├── index.tsx                      # route "/" — корневая страница
│   │   │   ├── _app.tsx                       # wrapper для роутера (если нужен)
│   │   │   │
│   │   │   ├── auth/                          # раздел авторизации
│   │   │   │   ├── login.tsx                  # страница логина
│   │   │   │   ├── register.tsx               # страница регистрации
│   │   │   │   └── _components/               # UI-компоненты, специфичные для auth
│   │   │   │       ├── LoginForm.tsx
│   │   │   │       └── OAuthButtons.tsx
│   │   │   │
│   │   │   ├── {PAGE_NAME}/                   # страница, основанная на модуле FEOD
│   │   │   │   ├── index.tsx                  # страница раздела
│   │   │   │   ├── layout.tsx                 # вложенный layout раздела
│   │   │   │   └── _components/               # UI-компоненты страницы (НЕ модуля)
│   │   │   │       ├── {COMPONENT_NAME}.tsx
│   │   │   │       └── {COMPONENT_NAME}.tsx
│   │   │   │
│   │   │   └── {PAGE_NAME}/[id].tsx           # динамическая страница (например, /users/[i
│   │   │
│   │   ├── global/                            # глобальные настройки приложения (НЕ FEOD)
│   │   │   ├── shims/                         # полифиллы, патчи, runtime-фиксы
│   │   │   │   ├── fetch.polyfill.ts          # пример: полифилл fetch
│   │   │   │   ├── intl.polyfill.ts           # пример: полифилл Intl
│   │   │   │   └── index.ts                   # единая точка подключения шима
│   │   │   │
│   │   │   └── env/                           # переменные окружения приложения
│   │   │       ├── schema.ts                  # схема валидации env (zod/yup)
│   │   │       ├── load.ts                    # загрузка env из process.env
│   │   │       └── index.ts                   # экспорт валидированного env
│   │   │
│   │   └── tests/                             # тестовая пирамида приложения
│   │       ├── unit/                          # unit-тесты: компоненты, функции
│   │       │   ├── {COMPONENT_NAME}.test.ts
│   │       │   └── {UTIL_NAME}.test.ts
│   │       │
│   │       ├── integration/                   # интеграционные тесты: страницы, роутинг
│   │       │   ├── {PAGE_NAME}.integration.test.ts
│   │       │   └── {FLOW_NAME}.integration.test.ts
│   │       │
│   │       ├── contract/                      # контрактные тесты FEOD-модулей и API
│   │       │   ├── {MODULE_NAME}.contract.test.ts
│   │       │   └── {EVENT_NAME}.schema.test.ts
│   │       │
│   │       └── e2e/                           # end-to-end тесты (Cypress/Playwright)
│   │           ├── {SCENARIO_NAME}.e2e.ts
│   │           └── {USER_FLOW}.e2e.ts
│   │
│   └── admin/                                     # второе приложение (админ-панель) стурктура как и у web
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── app/                               # оркестрация admin
│           ├── pages/                             # страницы admin
│           ├── global/                            # env, polyfills admin
│           └── tests/                             # тесты admin
│
├───────────────────────────────────────────────────────────────────────────────
│  PACKAGES — ВСЯ РАЗРАБОТКА (FEOD-ФРЕЙМВОРК, ДОМЕНЫ, UI МОДУЛЕЙ, ИНТЕГРАЦИИ)
│  ПРИЛОЖЕНИЯ ТОЛЬКО ИСПОЛЬЗУЮТ ЭТИ МОДУЛИ
├───────────────────────────────────────────────────────────────────────────────
│
├── packages/
│   ├── frontend/
│   │   ├── modules/
│   │   │   └── {MODULE_NAME}/                     # фрактальный модуль
│   │   │       ├── state/                         # состояние модуля опционально (в большинстве достаточно services)
│   │   │       ├── services/                      # бизнес-логика модуля (чистые функции)
│   │   │       │   ├── {SERVICE_NAME}.ts
│   │   │       │   └── index.ts
│   │   │       │
│   │   │       ├── api/                           # API-слой модуля
│   │   │       │   ├── endpoints.ts
│   │   │       │   ├── dto.ts
│   │   │       │   └── index.ts
│   │   │       │
│   │   │       ├── events/                        # события модуля
│   │   │       │   ├── {EVENT_NAME}.schema.json
│   │   │       │   ├── publisher.ts
│   │   │       │   └── index.ts
│   │   │       │
│   │   │       ├── ui/                            # UI-слой модуля
│   │   │       │   ├── {MODULE_NAME}Table.tsx
│   │   │       │   ├── {MODULE_NAME}Filters.tsx
│   │   │       │   ├── {MODULE_NAME}Card.tsx
│   │   │       │   └── {MODULE_NAME}Details.tsx
│   │   │       │
│   │   │       └── _modules/                      # фрактальные подмодули
│   │   │           └── {SUBMODULE_NAME}/
│   │   │               ├── services/
│   │   │               ├── api/
│   │   │               ├── events/
│   │   │               └── ui/
│   │   │
│   │   ├── common/                                # shared, agnostic, не зависит от модулей
│   │   │   ├── ui/                                # атомарная дизайн-система (FEOD-agnostic)
│   │   │   │   ├── atoms/                         # минимальные UI-единицы (не имеют состояния)
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Checkbox.tsx
│   │   │   │   │   ├── Badge.tsx
│   │   │   │   │   ├── Spinner.tsx
│   │   │   │   │   └── {ATOM_NAME}.tsx
│   │   │   │   │
│   │   │   │   ├── molecules/                     # комбинации атомов (минимальная логика)
│   │   │   │   │   ├── InputWithLabel.tsx
│   │   │   │   │   ├── FormField.tsx
│   │   │   │   │   ├── DropdownMenu.tsx
│   │   │   │   │   └── {MOLECULE_NAME}.tsx
│   │   │   │   │
│   │   │   │   ├── organisms/                     # крупные UI-блоки (таблицы, формы, диалоги)
│   │   │   │   │   ├── Table.tsx
│   │   │   │   │   ├── Dialog.tsx
│   │   │   │   │   ├── Form.tsx
│   │   │   │   │   ├── DataGrid.tsx
│   │   │   │   │   └── {ORGANISM_NAME}.tsx
│   │   │   │   │
│   │   │   │   ├── templates/                     # UI-шаблоны без данных (скелетоны, состояния)
│   │   │   │   │   ├── EmptyState.tsx
│   │   │   │   │   ├── ErrorState.tsx
│   │   │   │   │   ├── LoadingState.tsx
│   │   │   │   │   └── {TEMPLATE_NAME}.tsx
│   │   │   │   │
│   │   │   │   ├── theme/                         # дизайн-токены и тема
│   │   │   │   │   ├── tokens.ts                  # spacing, radius, shadows, z-index
│   │   │   │   │   ├── colors.ts                  # цветовая палитра
│   │   │   │   │   ├── typography.ts              # шрифты, размеры, веса
│   │   │   │   │   ├── ThemeProvider.tsx          # провайдер темы
│   │   │   │   │   └── index.ts                   # экспорт темы
│   │   │   │   │
│   │   │   │   └── icons/                         # иконки (SVG/React)
│   │   │   │       ├── {ICON_NAME}.tsx
│   │   │   │       └── index.ts
│   │   │   │
│   │   │   ├── hooks/                             # общие хуки (не зависят от модулей)
│   │   │   │   ├── useDebounce.ts
│   │   │   │   ├── useMediaQuery.ts
│   │   │   │   ├── useClickOutside.ts
│   │   │   │   └── {HOOK_NAME}.ts
│   │   │   │
│   │   │   ├── utils/                             # чистые утилиты (pure functions)
│   │   │   │   ├── classnames.ts
│   │   │   │   ├── mergeProps.ts
│   │   │   │   ├── formatters.ts
│   │   │   │   └── {UTIL_NAME}.ts
│   │   │   │
│   │   │   ├── types/                             # общие типы UI/утилит
│   │   │   │   ├── ui.ts
│   │   │   │   ├── helpers.ts
│   │   │   │   └── {TYPE_GROUP}.ts
│   │   │   │
│   │   │   └── meta/                              # метаданные, документация, mdx
│   │   │       ├── README.md
│   │   │       ├── design-guidelines.md
│   │   │       └── {DOC_NAME}.md

│   │   │
│   │   ├── contracts/                             # единый источник истины: схемы, события, DTO
│   │   │   ├── schemas/                           # схемы данных (Zod/JSON Schema)
│   │   │   │   ├── {MODULE_NAME}.schema.json      # схема доменной сущности
│   │   │   │   ├── {EVENT_NAME}.schema.json       # схема события
│   │   │   │   └── {DTO_NAME}.schema.json         # схема DTO
│   │   │   │
│   │   │   ├── events/                            # описание событий домена
│   │   │   │   ├── {EVENT_NAME}.event.json        # контракт события
│   │   │   │   └── index.ts                       # экспорт событий
│   │   │   │
│   │   │   └── codegen/                           # генераторы типов и клиентов
│   │   │       ├── openapi/                       # генерация API-клиентов
│   │   │       │   ├── openapi.yaml
│   │   │       │   └── generate.ts
│   │   │       ├── schemas/                       # генерация TS-типов из схем
│   │   │       │   ├── generate-types.ts
│   │   │       │   └── templates/
│   │   │       └── events/                        # генерация типов событий
│   │   │           ├── generate-events.ts
│   │   │           └── templates/
│   │   │
│   │   ├── generated/                             # автоматически сгенерированные артефакты
│   │   │   ├── contracts/                         # TS-типы, созданные из схем
│   │   │   │   ├── {MODULE_NAME}.d.ts
│   │   │   │   ├── {EVENT_NAME}.d.ts
│   │   │   │   └── {DTO_NAME}.d.ts
│   │   │   │
│   │   │   └── events/                            # TS-типы событий
│   │   │       ├── {EVENT_NAME}.event.d.ts
│   │   │       └── index.d.ts
│   │   │
│   │   └── infra/                                 # инфраструктура FEOD-пакета
│   │       ├── eslint/                            # правила линтинга для FEOD
│   │       │   ├── feod.eslintrc.js
│   │       │   └── rules/                         # кастомные архитектурные правила
│   │       │       ├── no-cross-module-imports.js
│   │       │       ├── enforce-public-api.js
│   │       │       └── no-app-imports.js
│   │       │
│   │       ├── tsconfig/                          # tsconfig-настройки FEOD
│   │       │   ├── base.json
│   │       │   ├── modules.json
│   │       │   └── common.json
│   │       │
│   │       ├── prettier/                          # форматирование FEOD-кода
│   │       │   └── prettier.config.js
│   │       │
│   │       └── scripts/                           # служебные скрипты FEOD
│   │           ├── validate-architecture.ts       # проверка import-boundaries
│   │           ├── validate-contracts.ts          # проверка схем и codegen
│   │           ├── generate-all.ts                # единая команда генерации
│   │           └── sync-types.ts                  # синхронизация FE/BE типов
│
│
├── types/                                         # общие типы для фронтенда и бэкенда
│   ├── global.d.ts                                # глобальные типы (расширения TS)
│   ├── env.d.ts                                   # типизация переменных окружения
│   ├── api.d.ts                                   # общие API-типы (shared DTO)
│   ├── utils.d.ts                                 # общие служебные типы
│   └── index.ts                                   # единая точка экспорта типов
│
├── config/                                        # общие конфиги для всего монорепо
│   ├── eslint/                                    # общие правила линтинга
│   │   ├── base.eslintrc.js
│   │   ├── frontend.eslintrc.js
│   │   └── backend.eslintrc.js
│   │
│   ├── tsconfig/                                  # общие tsconfig-настройки
│   │   ├── base.json
│   │   ├── frontend.json
│   │   └── backend.json
│   │
│   ├── prettier/                                  # форматирование
│   │   └── prettier.config.js
│   │
│   ├── jest/                                      # общие настройки тестов
│   │   ├── jest.base.config.js
│   │   ├── jest.frontend.config.js
│   │   └── jest.backend.config.js
│   │
│   └── index.ts                                   # экспорт общих конфигов
│
├── debug/                                         # debug-пакеты (вспомогательные инструменты)
│   ├── logger/                                    # расширенный логгер для разработки
│   │   ├── index.ts
│   │   └── transports/
│   │       ├── console.ts
│   │       └── file.ts
│   │
│   ├── mock-server/                               # локальный mock-сервер для разработки
│   │   ├── index.ts
│   │   ├── routes/
│   │   └── data/
│   │
│   └── playground/                                # песочница для тестирования модулей FEOD
│       ├── index.tsx
│       └── examples/
│
└── tools/                                         # devtools, генераторы, cli
    ├── feod-scaffold/                             # генератор модулей FEOD (фракталы)
    │   ├── templates/                             # шаблоны модулей
    │   │   ├── module/
    │   │   │   ├── domain/
    │   │   │   ├── integration/
    │   │   │   ├── events/
    │   │   │   └── ui/
    │   │   └── submodule/
    │   │
    │   ├── index.js                               # CLI-логика генератора
    │   └── README.md                              # документация по scaffold
    │
    └── scripts/                                   # вспомогательные CLI-скрипты
        ├── validate-architecture.js               # проверка import-boundaries
        ├── validate-contracts.js                  # проверка схем и codegen
        ├── sync-types.js                          # синхронизация типов FE/BE
        ├── bump-version.js                        # автоматическое версионирование
        └── README.md



1. ГЛАВНОЕ ПРАВИЛО
Импорт всегда идёт только “вниз” по слоям. Никогда — вверх.
Код
apps  →  packages/frontend/modules  →  packages/frontend/common
apps  →  packages/frontend/contracts
apps  →  packages/frontend/generated
packages/frontend/modules → packages/frontend/common
packages/frontend/modules → packages/frontend/contracts
packages/frontend/modules → packages/frontend/generated
Никогда наоборот.

2. ПРАВИЛА ДЛЯ APPS/
Приложения — это только композиция.
Они не содержат логики, не содержат модулей, не содержат UI‑модулей.

✔ apps/** МОГУТ импортировать:
packages/frontend/modules/*

packages/frontend/common/*

packages/frontend/contracts/*

packages/frontend/generated/*

собственные app/*, state/*, pages/*, global/*

❌ apps/** НЕ МОГУТ импортировать:
apps/* (другие приложения)

packages/frontend/modules/*/ui напрямую в layout (только в страницах)

packages/frontend/modules/*/state напрямую (только через публичный API модуля)

packages/frontend/infra/*

tools/*

debug/*

3. ПРАВИЛА ДЛЯ packages/frontend/modules/
Модули — это фракталы.
Они не знают о приложениях, не знают о страницах, не знают о layout’ах.

✔ modules/** МОГУТ импортировать:
packages/frontend/common/*

packages/frontend/contracts/*

packages/frontend/generated/*

свои подмодули _modules/*

свои слои (services, api, events, ui, state)

❌ modules/** НЕ МОГУТ импортировать:
apps/*

pages/*

app/state/*

app/providers/*

app/externals/*

packages/frontend/modules/* (другие модули)

packages/frontend/infra/*

tools/*

debug/*

❗ Единственное исключение
Модуль может импортировать другой модуль, но только через его публичный API, если ты разрешишь межмодульные связи.

Но в идеале — модули полностью изолированы.

4. ПРАВИЛА ДЛЯ packages/frontend/common/
Это shared‑слой.
Он не зависит ни от модулей, ни от приложений.

✔ common/** МОЖЕТ импортировать:
только себя (common/ui, common/utils, common/hooks, common/types)

❌ common/** НЕ МОЖЕТ импортировать:
modules/*

apps/*

contracts/*

generated/*

tools/*

debug/*

5. ПРАВИЛА ДЛЯ packages/frontend/contracts/
Контракты — это источник истины.

✔ contracts/** МОГУТ импортировать:
ничего (кроме внутренних файлов)

❌ contracts/** НЕ МОГУТ импортировать:
modules/*

common/*

apps/*

generated/*

tools/*

Контракты — это фундамент.

6. ПРАВИЛА ДЛЯ packages/frontend/generated/
Generated — read‑only.

✔ generated/** МОЖЕТ импортировать:
ничего (кроме внутренних файлов)

❌ generated/** НЕ МОЖЕТ импортировать:
modules/*

common/*

apps/*

contracts/*

tools/*

7. ПРАВИЛА ДЛЯ packages/frontend/infra/
Это инфраструктура FEOD‑фреймворка.

✔ infra/** МОЖЕТ импортировать:
common/*

contracts/*

generated/*

❌ infra/** НЕ МОЖЕТ импортировать:
modules/*

apps/*

pages/*

app/*

8. ПРАВИЛА ДЛЯ tools/
Tools — это devtools.

✔ tools/** МОГУТ импортировать:
contracts/*

generated/*

common/*

❌ tools/** НЕ МОГУТ импортировать:
apps/*

modules/*

9. ПРАВИЛА ДЛЯ debug/
Debug — только для разработки.

✔ debug/** МОЖЕТ импортировать:
modules/*

contracts/*

generated/*

❌ debug/** НЕ МОЖЕТ импортировать:
apps/*

pages/*

app/*

10. ПРАВИЛА ДЛЯ pages/
Страницы — это композиция UI.

✔ pages/** МОГУТ импортировать:
modules/*/ui

modules/*/services

common/ui

common/hooks

common/utils

app/state

app/providers

❌ pages/** НЕ МОГУТ импортировать:
modules/*/state напрямую

modules/*/events

modules/*/api

modules/*/integration (если появится)

contracts/*

generated/*

11. ПРАВИЛА ДЛЯ app/state/
Состояние приложения — только для приложения.

✔ app/state МОЖЕТ импортировать:
common/*

❌ app/state НЕ МОЖЕТ импортировать:
modules/*

contracts/*

generated/*

12. ПРАВИЛА ДЛЯ app/providers/
Провайдеры — это shell приложения.

✔ providers МОГУТ импортировать:
common/*

app/state/*

❌ providers НЕ МОГУТ импортировать:
modules/*

13. ПРАВИЛА ДЛЯ app/externals/
Адаптеры внешних систем.

✔ externals МОГУТ импортировать:
common/*

❌ externals НЕ МОГУТ импортировать:
modules/*

14. ПРАВИЛА ДЛЯ tests/
Тесты могут импортировать всё, но:

❌ tests/** НЕ МОГУТ:
экспортировать что‑то наружу

использовать тестовые утилиты в прод‑коде

🧩 ИТОГОВАЯ МАТРИЦА ЗАВИСИМОСТЕЙ
Слой	Может импортировать	Не может импортировать
apps	modules, common, contracts, generated	apps, infra, tools, debug
modules	common, contracts, generated	apps, pages, infra, tools
common	только common	всё остальное
contracts	ничего	всё
generated	ничего	всё
infra	common, contracts, generated	apps, modules
tools	common, contracts, generated	apps, modules
debug	modules, contracts, generated	apps
pages	modules/ui, common, app/state	modules/state, modules/events
