# Полная текущая структура проекта Elbruso

Ниже приведено исчерпывающее дерево всех папок и файлов проекта для понимания полной картины вложенности и модульности.

## 1. Корень проекта и конфигурация
```text
elbruso/
├── apps/ (Приложения)
├── packages/ (Разделяемые пакеты)
├── docs/ (Техническая документация)
├── .spec/ (Спецификации)
├── scripts/
│   └── dev-setup.sh
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── docker-compose.yml
```

---

## 2. Приложение: Web (Next.js + FSD)
`apps/web/src`
```text
apps/web/src/
├── app/ (Next.js App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   ├── auth.config.ts
│   │   ├── AUTH_CONFIG.md
│   │   ├── AuthStats.tsx
│   │   ├── AuthStats.css
│   │   ├── RussiaMapViz.tsx
│   │   └── RussiaMapViz.css
│   └── (profile)/
│       ├── layout.tsx
│       ├── dashboard/page.tsx
│       ├── indicators/page.tsx
│       ├── organizations/page.tsx
│       ├── seasons/page.tsx
│       ├── settings/page.tsx
│       ├── tables/page.tsx
│       ├── tables-test/page.tsx
│       └── workspaces/page.tsx
├── entities/
│   ├── cell/
│   │   ├── model/
│   │   └── ui/
│   └── table/
│       ├── model/
│       └── ui/
├── features/
│   ├── cell-edit/
│   │   ├── model/
│   │   └── ui/
│   ├── formula-insert/
│   │   ├── model/
│   │   └── ui/
│   ├── reference-link/
│   │   ├── index.ts
│   │   ├── model/
│   │   └── ui/
│   ├── table-create/
│   │   ├── model/
│   │   └── ui/
│   └── table-edit/
│       ├── model/
│       └── ui/
├── shared/
│   ├── api/
│   │   ├── auth.ts
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   ├── index.ts
│   │   ├── references.ts
│   │   ├── tables.ts
│   │   ├── templates.ts
│   │   ├── users.ts
│   │   └── workspaces.ts
│   ├── lib/
│   │   ├── agGrid/
│   │   ├── auth/
│   │   ├── debug/
│   │   ├── errors/
│   │   ├── hyperformula/
│   │   ├── i18n/
│   │   ├── language/
│   │   ├── matrix/
│   │   ├── utils/
│   │   ├── utils.ts
│   │   ├── visualization/
│   │   └── websocket/
│   ├── services/
│   │   ├── cellFormatting.ts
│   │   ├── index.ts
│   │   ├── tableGridApi.ts
│   │   └── tableService.ts
│   ├── stores/
│   │   ├── index.ts
│   │   ├── useHistoryStore.ts
│   │   ├── useReferenceStore.ts
│   │   ├── useTableStore.ts
│   │   ├── useTemplateStore.ts
│   │   ├── useUserStore.ts
│   │   └── useWorkspaceStore.ts
│   ├── types/
│   │   ├── api.types.ts
│   │   ├── cell.types.ts
│   │   ├── enums.ts
│   │   ├── index.ts
│   │   ├── link.types.ts
│   │   ├── reference.types.ts
│   │   └── table.types.ts
│   └── ui/
│       ├── Button/
│       ├── IconButton/
│       ├── Input/
│       ├── Select/
│       ├── Sidebar/
│       ├── Toast/
│       ├── Logo/
│       ├── PageLayout/
│       ├── charts/
│       ├── d3/
│       ├── DataWavesBackground/
│       ├── InteractiveGrid/
│       ├── LanguageSwitcher/
│       ├── LiveSportsChart/
│       └── PasswordStrength/
├── views/
│   └── HomePage/
│       ├── index.ts
│       └── ui/HomePage.tsx
└── widgets/
    ├── Brands/
    ├── ChartsShowcase/
    ├── DynamicTable/
    ├── Footer/
    ├── Header/
    ├── Hero/
    ├── ProductsShowcase/
    ├── ProfileLayout/
    ├── Seasons/
    ├── TableCreationWizard/
    ├── TableNotification/
    ├── TableTabs/
    └── WorkspaceTree/
```

---

## 3. Приложение: API (NestJS)
`apps/api/src`
```text
apps/api/src/
├── app.module.ts
├── main.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── admin/
│   ├── dto/
│   ├── guards/
│   ├── interfaces/
│   └── strategies/
├── blocks/
├── common/ (audit)
├── countries/
├── database/
├── dynamic-tables/
├── email/
│   ├── email.module.ts
│   ├── email.service.ts
│   ├── interfaces/
│   └── providers/
├── events/
├── formula/
├── indicator-groups/
├── indicators/
│   ├── dto/
│   ├── indicators.controller.ts
│   ├── indicators.module.ts
│   └── indicators.service.ts
├── organizations/
├── pages/
├── regions/
├── seasons/
├── sports/
├── users/
├── workspace-groups/
└── workspaces/
```

---

## 4. Пакеты (Packages)
`packages/`
```text
packages/
├── database/
│   ├── migrations/ (001_add_auth_enhancements.sql, ...)
│   ├── package.json
│   ├── src/ (db.ts, index.ts, types.ts)
│   └── tsconfig.json
├── debug/
│   ├── package.json
│   ├── src/
│   │   ├── action-registry.ts
│   │   ├── ContrastDetector.tsx
│   │   ├── DebugConsole.tsx
│   │   ├── DebugContext.tsx
│   │   ├── DebugOverlay.tsx
│   │   ├── DebugTrigger.tsx
│   │   ├── index.ts
│   │   ├── PathCopier.tsx
│   │   └── ui-events.ts
│   └── tsconfig.json
├── path-copier/
│   ├── package.json
│   ├── src/ (index.ts, loader.ts, swc-plugin.ts)
│   └── tsconfig.json
├── shared/
│   ├── package.json
│   ├── src/
│   │   ├── api/ (auth.ts, client.ts, index.ts)
│   │   ├── auth/ (AuthContext.tsx, ProtectedRoute.tsx, ...)
│   │   ├── lib/ (utils.ts)
│   │   ├── types/ (index.ts)
│   │   ├── ui/ (AuthLayout, Button, Input, LoginPage, Logo, Toast)
│   │   └── index.ts
│   └── tsconfig.json
├── types/
│   ├── package.json
│   ├── src/ (index.ts)
│   └── tsconfig.json
└── ui/
    ├── package.json
    ├── src/ (index.ts)
    └── tsconfig.json
```

---

## 5. Документация и Спецификации
```text
docs/
├── database/ (SQL скрипты, гайды, схемы)
├── entity/ (Описание доменных сущностей)
├── FEOD_ARCHITECTURE.md (Целевой план)
└── CURRENT_ARCHITECTURE.md (Этот файл)

.spec/
├── profile/ (ai.md, api.md, check-list.md, ...)
├── API_AUTH_GUIDE.md
├── backend-architecture.md
├── BI.md
├── frontend-architecture.md
├── PROJECT_SCHEMA.md
└── walkthrough_frontend_redesign.md
```

---

## 6. Целевая архитектура бэкенда (To-Be: Microservices Ready)

Для подготовки бэкенда к будущему разделению на микросервисы мы адаптируем принципы **FEOD** для NestJS. Основная цель — высокая изоляция доменов и четкие границы ответственности.

### 6.1 Целевая Мега-схема Бэкенда

```text
src/
├── app/ (Слой оркестрации - "Ядро")
│   ├── app.module.ts (Сборка всех модулей)
│   ├── main.ts (Загрузчик)
│   └── common/ (Глобальные фильтры, перехватчики, пайпы)
│
├── modules/ (Доменные области - "Будущие микросервисы")
│   └── [DomainName]/ (Например: Inventory, Billing, Users)
│       ├── index.ts (Публичный API модуля: экспорт Nest-модуля и интерфейсов)
│       ├── controller/ (Входящие вызовы - "UI" бэкенда)
│       │   └── [Domain].controller.ts
│       ├── service/ (Бизнес-логика и доменная модель - "Model")
│       │   ├── [Domain].service.ts
│       │   └── [Domain].repository.ts
│       ├── dto/ (Контракты данных - "API")
│       │   ├── request/
│       │   └── response/
│       └── modules/ (Вложенные фракталы для сложных доменов)
│           └── [SubDomain]/
│               ├── index.ts
│               └── ...
│
└── shared/ (Инфраструктурный слой - переезжает в @repo/packages)
    ├── database/ (Кисэли-репозитории, миграции)
    ├── auth/ (Гварды и логика авторизации)
    ├── logger/
    └── messaging/ (Логика для очередей событий)
```

### 6.2 Принципы разделения
1. **Изоляция данных**: Каждый доменный модуль в идеале должен владеть своими таблицами в БД. Перекрестные JOIN-ы между модулями запрещены — только через вызовы сервисов или событийную модель.
2. **Публичный интерфейс (Gateway)**: Модули общаются друг с другом только через сервисы, экспортированные в `index.ts`. Прямой импорт внутренних файлов модуля запрещен.
3. **Фрактальность**: Если домен становится слишком сложным, он порождает вложенную структуру модулей, сохраняя тот же паттерн изоляции.
4. **Готовность к экстракции**: Каждый модуль в `modules/*` спроектирован так, чтобы его можно было вынести в отдельный пакет монорепозитория или отдельный сервис.

---

## 7. Целевая архитектура фронтенда (To-Be: FEOD + Monorepo)

Для фронтенда целевым состоянием является переход от классического FSD к фрактальному **FEOD**, адаптированному под архитектуру воркспейсов. Это решает проблему дублирования логики между компонентами и упрощает композицию страниц.

### 7.1 Целевая Мега-схема Фронтенда (Full Mapping)

Здесь представлено детальное распределение текущих файлов проекта по новым слоям. **Никакой логики не потеряно — она пересобрана для шаринга между Web и Admin.**

```text
/ (Корень воркспейса)
├── apps/
│   ├── web/src/ (Приложение клиента)
│   │   ├── app/ (Оркестрация - "Мозг")
│   │   │   ├── layout.tsx (Root Layout)
│   │   │   ├── shell/ (Специфичные слоты: AppHeader, AppSidebar)
│   │   │   └── providers/ (DI для Web)
│   │   └── pages/ (Сборка - "Сценарии Web")
│   │       ├── dashboard/ (Композиция из @repo/shared/modules/Analytics)
│   │       └── SharedLayouts/ (Локальные композиционные лейауты)
│   │
│   └── admin/src/ (Приложение админки)
│       ├── app/ (Оркестрация - "Мозг")
│       │   ├── layout.tsx (Admin Root Layout)
│       │   ├── shell/ (Admin-specific Sidebar, AdminHeader)
│       │   └── providers/ (DI для Admin: AdminAuthContext)
│       └── pages/ (Сборка - "Сценарии Admin")
│           ├── users/ (Сборка из @repo/shared/modules/UserManagement)
│           └── statistics/ (Сборка из того же @repo/shared/modules/Analytics)
│
└── packages/
    ├── shared/src/ (Общее бизнес-ядро проекта)
    │   ├── modules/ (Фрактальные домены - "Сердце")
    │   │   ├── Auth/ (Логика авторизации, шарится между web и admin)
    │   │   │   ├── index.ts
    │   │   │   ├── model/ (useUserStore)
    │   │   │   └── ui/ (LoginPage, AuthStats, RussiaMapViz)
    │   │   ├── TableEngine/ (Движок таблиц)
    │   │   │   ├── index.ts
    │   │   │   └── ui/ (DynamicTable, TableTabs)
    │   │   └── Analytics/ (Графики и отчеты - используются и в web, и в admin)
    │   │
    │   ├── ui/ (Общие интерфейсные паттерны)
    │   │   └── layouts/ (ШАРИМЫЕ ЛЕЙАУТЫ: AuthLayout, BaseLayout, SettingsLayout)
    │   │       ├── AuthLayout.tsx
    │   │       ├── ProfileLayout.tsx (бывший виджет ProfileLayout)
    │   │       └── index.ts
    │   │
    │   └── common/ (Toolkit: хуки, утилиты, типы)
    │       ├── api/ (client.ts, shared endpoints)
    │       └── lib/ (utils.ts, i18n logic)
    │
    └── ui-kit/ (Визуальный фундамент - "Агностичный UI")
        ├── atoms/ (Button, Input, Select, Toast)
        ├── molecules/ (Logo, LanguageSwitcher)
        └── charts/ (LiveSportsChart, d3 visualizations)
```

### 7.2 Места хранения лейаутов (Layouts)

В FEOD лейауты распределяются по уровню ответственности:

1.  **Shell Layouts** (`apps/*/src/app/shell/`): Самый верхний уровень. Каркас конкретного приложения (где находится сайдбар, как выглядит хедер именно в этом приложении).
2.  **Shared Layouts** (`packages/shared/src/ui/layouts/`): Переиспользуемые композиционные паттерны. Например, `AuthLayout` (форма по центру, фон справа) — одинаков и для Web, и для Admin.
3.  **Domain/Module Layouts** (`packages/shared/src/modules/*/ui/layouts/`): Лейауты, специфичные для домена (например, лейаут редактора таблиц с панелью инструментов слева).

### 7.3 Матрица перехода (FSD -> FEOD)

| Текущий слой (FSD) | Целевой слой (FEOD) | Обоснование |
| :--- | :--- | :--- |
| **Entities** | **Modules** (внутренности) | Сущности становятся базовой частью фрактального модуля. |
| **Features** | **Modules** (внутренности) | Фичи становятся подмодулями или вложенной логикой домена. |
| **Widgets** | **Modules** (Public API) | Виджеты теперь экспортируются как готовые к сборке части модуля. |
| **Shared** (web/src) | **Packages/Shared** | Инфраструктурные вещи выносятся на уровень воркспейса. |
| **App** | **Apps/*/src/app** | Слой остается в приложении, но фокусируется только на DI и DI-контейнерах. |

### 7.3 Ключевые принципы
1.  **Композиция через Props**: Модули не лезут друг в друга. Страница (`Pages`) собирает их, прокидывая зависимости или данные через пропсы/сторы.
2.  **Глубокая фрактальность**: Вместо плоских фич мы строим дерево. Например, `TableEngine` содержит в себе `CellEditor`, который содержит `FormulaParser`.
3.  **Изоляция в Packages**: Если домен `Inventory` нужен и в `web`, и в `admin`, он обязан жить в `packages/shared/modules`.

---

## 8. Итоги и следующие шаги
1.  **Backend**: Начать рефакторинг `apps/api` с выделения домена `Workspaces` в фрактальный модуль.
2.  **Frontend**: Вынести `entities/table` и зависимые `features` в единый разделяемый модуль `packages/shared/modules/TableEngine`.
3.  **Monorepo**: Настроить алиасы `@repo/shared` и `@repo/ui-kit` для бесшовного импорта.
