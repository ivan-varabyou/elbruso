# Migration Guide — Component System Naming Convention

> Генерировано: Ср 04 Feb 2026
> Документ для миграции файлов в packages/shared и apps/web

---

## 1. Quick Reference — Все типы компонентов

### UI Components

| Тип        | Суффикс         | Ответственность              | Пример                     |
| ---------- | --------------- | ---------------------------- | -------------------------- |
| Page       | `.page.tsx`     | Роутинг, data fetching       | Dashboard.page.tsx         |
| Section    | `.section.tsx`  | Группировка функциональности | Analytics.section.tsx      |
| Widget     | `.widget.tsx`   | Логика, API                  | UserList.widget.tsx        |
| Modal      | `.modal.tsx`    | Модальный диалог             | ConfirmDelete.modal.tsx    |
| Layout     | `.layout.tsx`   | Layout-обёртка               | AuthLayout.layout.tsx      |
| Smart      | `.smart.tsx`    | Бизнес-логика                | LoginForm.smart.tsx        |
| Dumb       | `.dumb.tsx`     | Один dumb компонент          | Button.dumb.tsx            |
| Dumb Group | `.dumbs.tsx`    | Группа dumb                  | FormFields.dumbs.tsx       |
| Provider   | `.provider.tsx` | Context provider             | ToastProvider.provider.tsx |
| Context    | `.context.tsx`  | React Context consumer       | AuthContext.context.tsx    |

### Hooks

| Тип        | Суффикс    | Ответственность      | Пример               |
| ---------- | ---------- | -------------------- | -------------------- |
| Hook       | `.hook.ts` | Custom React hooks   | useAuth.hook.ts      |
| Composable | `.hook.ts` | Vue-like composables | useDraggable.hook.ts |

### Visualization

| Тип     | Суффикс        | Ответственность      | Пример                  |
| ------- | -------------- | -------------------- | ----------------------- |
| Viz     | `.viz.tsx`     | D3/Canvas/SVG        | NetworkGraph.viz.tsx    |
| Chart   | `.chart.tsx`   | Charts               | BarChart.chart.tsx      |
| Graph   | `.graph.tsx`   | Graph visualizations | ForceGraph.graph.tsx    |
| Diagram | `.diagram.tsx` | Diagram components   | FlowDiagram.diagram.tsx |

### Functional Files

| Тип         | Суффикс           | Ответственность       | Папка             |
| ----------- | ----------------- | --------------------- | ----------------- |
| Service     | `.service.ts`     | API сервисы           | api/services/     |
| API         | `.api.ts`         | API endpoints         | api/              |
| WS          | `.ws.ts`          | WebSocket             | api/              |
| Interceptor | `.interceptor.ts` | HTTP interceptors     | api/              |
| Store       | `.store.ts`       | State management      | stores/           |
| Selector    | `.selector.ts`    | State selectors       | stores/selectors/ |
| Types       | `.types.ts`       | TypeScript interfaces | types/            |
| DTO         | `.dto.ts`         | Data Transfer Objects | types/dto/        |
| Interface   | `.interface.ts`   | TS interfaces         | types/            |
| Constant    | `.constant.ts`    | Константы             | lib/constants/    |
| Config      | `.config.ts`      | Конфигурация          | config/           |
| Lib         | `.lib.ts`         | Утилиты, engine       | lib/              |
| Adapter     | `.adapter.ts`     | Адаптеры данных       | lib/adapters/     |
| Pattern     | `.pattern.ts`     | Паттерны              | lib/patterns/     |
| Utility     | `.util.ts`        | Utility functions     | lib/utils/        |
| Helper      | `.helper.ts`      | Helper functions      | lib/helpers/      |

### Visualization Adapters

| Тип      | Суффикс        | Ответственность       | Пример                     |
| -------- | -------------- | --------------------- | -------------------------- |
| Adapter  | `.adapter.ts`  | Адаптеры визуализации | ChartAdapter.adapter.ts    |
| Parser   | `.parser.ts`   | Data parsers          | DataParser.parser.ts       |
| Renderer | `.renderer.ts` | Custom renderers      | CanvasRenderer.renderer.ts |

### Tests

| Тип     | Суффикс       | Ответственность   |
| ------- | ------------- | ----------------- |
| Test    | `.test.ts`    | Unit tests        |
| Spec    | `.spec.ts`    | Integration tests |
| E2E     | `.e2e.ts`     | End-to-end tests  |
| Fixture | `.fixture.ts` | Test fixtures     |
| Mock    | `.mock.ts`    | Test mocks        |
| Stubs   | `.stub.ts`    | Test stubs        |

### Extended UI Components

| Тип        | Суффикс        | Ответственность       | Пример                      |
| ---------- | -------------- | --------------------- | --------------------------- |
| Form       | `.form.tsx`    | Form with validation  | ContactForm.form.tsx        |
| Field      | `.field.tsx`   | Form field wrapper    | InputField.field.tsx        |
| List       | `.list.tsx`    | List component        | UserList.list.tsx           |
| Table      | `.table.tsx`   | Table component       | DataTable.table.tsx         |
| Tree       | `.tree.tsx`    | Tree component        | CategoryTree.tree.tsx       |
| Navigation | `.nav.tsx`     | Navigation component  | MainNav.nav.tsx             |
| Toolbar    | `.toolbar.tsx` | Toolbar component     | EditorToolbar.toolbar.tsx   |
| Sidebar    | `.sidebar.tsx` | Sidebar component     | AppSidebar.sidebar.tsx      |
| Panel      | `.panel.tsx`   | Panel component       | ControlPanel.panel.tsx      |
| Dialog     | `.dialog.tsx`  | Dialog component      | SettingsDialog.dialog.tsx   |
| Drawer     | `.drawer.tsx`  | Drawer component      | SlideDrawer.drawer.tsx      |
| Tooltip    | `.tooltip.tsx` | Tooltip component     | HelpTooltip.tooltip.tsx     |
| Popover    | `.popover.tsx` | Popover component     | DropdownPopover.popover.tsx |
| Badge      | `.badge.tsx`   | Badge component       | StatusBadge.badge.tsx       |
| Tag        | `.tag.tsx`     | Tag component         | FilterTag.tag.tsx           |
| Avatar     | `.avatar.tsx`  | Avatar component      | UserAvatar.avatar.tsx       |
| Card       | `.card.tsx`    | Card component        | InfoCard.card.tsx           |
| EmptyState | `.empty.tsx`   | Empty state component | NoResults.empty.tsx         |
| Loading    | `.loading.tsx` | Loading component     | SpinnerLoading.loading.tsx  |
| ErrorState | `.error.tsx`   | Error state component | LoadError.error.tsx         |

### Feature Components

| Тип         | Суффикс           | Ответственность       | Пример                          |
| ----------- | ----------------- | --------------------- | ------------------------------- |
| Feature     | `.feature.tsx`    | Feature module        | ExportData.feature.tsx          |
| Controller  | `.controller.tsx` | Component controller  | ModalController.controller.tsx  |
| Manager     | `.manager.tsx`    | Component manager     | SessionManager.manager.tsx      |
| Handler     | `.handler.tsx`    | Event handler         | DragDropHandler.handler.tsx     |
| Reducer     | `.reducer.tsx`    | State reducer         | TableReducer.reducer.tsx        |
| Factory     | `.factory.ts`     | Object factory        | WidgetFactory.factory.ts        |
| Builder     | `.builder.ts`     | Object builder        | QueryBuilder.builder.ts         |
| Validator   | `.validator.ts`   | Validator functions   | FormValidator.validator.ts      |
| Transformer | `.transformer.ts` | Data transformer      | DataTransformer.transformer.ts  |
| Mapper      | `.mapper.ts`      | Data mapper           | DtoMapper.mapper.ts             |
| Converter   | `.converter.ts`   | Data converter        | UnitConverter.converter.ts      |
| Encoder     | `.encoder.ts`     | Encoder               | UrlEncoder.encoder.ts           |
| Decoder     | `.decoder.ts`     | Decoder               | TokenDecoder.decoder.ts         |
| Hasher      | `.hasher.ts`      | Hash functions        | PasswordHasher.hasher.ts        |
| Crypter     | `.crypter.ts`     | Encryption functions  | AesCrypter.crypter.ts           |
| Formatter   | `.formatter.ts`   | Formatting functions  | DateFormatter.formatter.ts      |
| Parser      | `.parser.ts`      | Parsing functions     | CsvParser.parser.ts             |
| Generator   | `.generator.ts`   | Generation functions  | IdGenerator.generator.ts        |
| Calculator  | `.calculator.ts`  | Calculation functions | TaxCalculator.calculator.ts     |
| Calculator  | `.calculator.tsx` | Calculator component  | BudgetCalculator.calculator.tsx |

### Data Access

| Тип           | Суффикс          | Ответственность       | При示例                           |
| ------------- | ---------------- | --------------------- | --------------------------------- |
| Repository    | `.repository.ts` | Data repository       | UserRepository.repository.ts      |
| DAO           | `.dao.ts`        | Data Access Object    | SessionDAO.dao.ts                 |
| Gateway       | `.gateway.ts`    | API gateway           | PaymentGateway.gateway.ts         |
| Bridge        | `.bridge.ts`     | Bridge pattern        | LegacyBridge.bridge.ts            |
| Proxy         | `.proxy.ts`      | Proxy pattern         | CacheProxy.proxy.ts               |
| Facade        | `.facade.ts`     | Facade pattern        | DatabaseFacade.facade.ts          |
| Decorator     | `.decorator.ts`  | Decorator pattern     | LoggingDecorator.decorator.ts     |
| Strategy      | `.strategy.ts`   | Strategy pattern      | PaymentStrategy.strategy.ts       |
| Policy        | `.policy.ts`     | Policy pattern        | AccessPolicy.policy.ts            |
| Rule          | `.rule.ts`       | Business rule         | DiscountRule.rule.ts              |
| Condition     | `.condition.ts`  | Condition check       | EligibilityCondition.condition.ts |
| Specification | `.spec.ts`       | Specification pattern | ProductSpec.spec.ts               |

### State Management

| Тип           | Суффикс         | Ответственность      | Пример                          |
| ------------- | --------------- | -------------------- | ------------------------------- |
| Store         | `.store.ts`     | State store          | UserStore.store.ts              |
| StoreProvider | `.provider.tsx` | Store provider       | ReduxStoreProvider.provider.tsx |
| Slice         | `.slice.ts`     | State slice          | CartSlice.slice.ts              |
| Reducer       | `.reducer.ts`   | State reducer        | RootReducer.reducer.ts          |
| Action        | `.action.ts`    | Redux action         | UserAction.action.ts            |
| ActionCreator | `.action.ts`    | Redux action creator | CreateUserAction.action.ts      |
| Thunk         | `.thunk.ts`     | Redux thunk          | FetchUsers.thunk.ts             |
| Effect        | `.effect.ts`    | Side effect handler  | AnalyticsEffect.effect.ts       |
| Selector      | `.selector.ts`  | State selector       | selectUserById.selector.ts      |
| Memoizer      | `.memo.ts`      | Memoized selector    | memoizedUsers.memo.ts           |
| Atom          | `.atom.ts`      | Jotai atom           | countAtom.atom.ts               |

### API Layer

| Тип          | Суффикс            | Ответственность      | Пример                         |
| ------------ | ------------------ | -------------------- | ------------------------------ |
| API          | `.api.ts`          | API endpoints        | users.api.ts                   |
| Endpoint     | `.endpoint.ts`     | API endpoint         | getUsersEndpoint.endpoint.ts   |
| Request      | `.request.ts`      | Request builder      | ApiRequest.request.ts          |
| Response     | `.response.ts`     | Response handler     | ApiResponse.response.ts        |
| Client       | `.client.ts`       | API client           | HttpClient.client.ts           |
| Service      | `.service.ts`      | API service          | UserService.service.ts         |
| Interceptor  | `.interceptor.ts`  | HTTP interceptor     | AuthInterceptor.interceptor.ts |
| WS           | `.ws.ts`           | WebSocket            | RealTime.ws.ts                 |
| Socket       | `.socket.ts`       | Socket.io            | NotificationSocket.socket.ts   |
| GraphQL      | `.gql.ts`          | GraphQL queries      | users.gql.ts                   |
| Mutation     | `.mutation.ts`     | GraphQL mutation     | CreateUser.mutation.ts         |
| Subscription | `.subscription.ts` | GraphQL subscription | Updates.subscription.ts        |
| Query        | `.query.ts`        | Data query           | FetchUsers.query.ts            |

### Internationalization

| Тип         | Суффикс           | Ответственность       | Пример                     |
| ----------- | ----------------- | --------------------- | -------------------------- |
| Locale      | `.locale.ts`      | Locale data           | en.locale.ts               |
| Translation | `.translation.ts` | Translation strings   | en.translation.ts          |
| Dictionary  | `.dictionary.ts`  | Dictionary            | ui.dictionary.ts           |
| i18n        | `.i18n.ts`        | i18n configuration    | i18n.config.ts             |
| Message     | `.message.ts`     | Message format        | error.message.ts           |
| Formatter   | `.formatter.ts`   | Number/date formatter | DateFormatter.formatter.ts |
| Plural      | `.plural.ts`      | Plural rules          | plural.rules.ts            |

### Utilities

| Тип         | Суффикс           | Ответственность     | Пример                          |
| ----------- | ----------------- | ------------------- | ------------------------------- |
| Utility     | `.util.ts`        | Utility functions   | array.util.ts                   |
| Helper      | `.helper.ts`      | Helper functions    | string.helper.ts                |
| Extension   | `.extension.ts`   | Extension methods   | ArrayExtension.extension.ts     |
| Polyfill    | `.polyfill.ts`    | Polyfill functions  | PromisePolyfill.polyfill.ts     |
| Shim        | `.shim.ts`        | Shim functions      | classShim.shim.ts               |
| TypeGuard   | `.guard.ts`       | Type guards         | isUser.guard.ts                 |
| Assertion   | `.assert.ts`      | Assertion functions | assertUser.assert.ts            |
| Guard       | `.guard.ts`       | Route guard         | AuthGuard.guard.ts              |
| Middleware  | `.middleware.ts`  | Middleware          | LoggerMiddleware.middleware.ts  |
| Interceptor | `.interceptor.ts` | Request interceptor | ErrorInterceptor.interceptor.ts |
| Decorator   | `.decorator.ts`   | Class decorator     | LogDecorator.decorator.ts       |
| Annotation  | `.annotation.ts`  | Type annotations    | deprecated.annotation.ts        |

### Configuration

| Тип         | Суффикс           | Ответственность      | Пример                  |
| ----------- | ----------------- | -------------------- | ----------------------- |
| Config      | `.config.ts`      | Configuration        | app.config.ts           |
| Setting     | `.setting.ts`     | Settings             | user.setting.ts         |
| Option      | `.option.ts`      | Options              | chart.option.ts         |
| Parameter   | `.parameter.ts`   | Parameters           | api.parameter.ts        |
| Schema      | `.schema.ts`      | Validation schema    | user.schema.ts          |
| Definition  | `.definition.ts`  | Type definitions     | component.definition.ts |
| Declaration | `.declaration.ts` | Type declarations    | global.declaration.ts   |
| Type        | `.types.ts`       | TypeScript types     | common.types.ts         |
| Interface   | `.interface.ts`   | TypeScript interface | IUser.interface.ts      |
| TypeAlias   | `.type.ts`        | Type alias           | UserId.type.ts          |
| Enum        | `.enum.ts`        | TypeScript enum      | UserRole.enum.ts        |
| Constant    | `.constant.ts`    | Constants            | MAX_RETRIES.constant.ts |
| Env         | `.env.ts`         | Environment config   | env.production.ts       |
| FeatureFlag | `.flag.ts`        | Feature flag         | newUI.flag.ts           |

### Documentation

| Тип          | Суффикс            | Ответственность    | Пример               |
| ------------ | ------------------ | ------------------ | -------------------- |
| Doc          | `.doc.ts`          | Documentation      | usage.doc.ts         |
| Readme       | `.readme.md`       | Module readme      | api.readme.md        |
| Changelog    | `.changelog.md`    | Change log         | v1.0.changelog.md    |
| License      | `.license.md`      | License            | MIT.license.md       |
| Contributing | `.contributing.md` | Contributing guide | CONTRIBUTING.md      |
| Example      | `.example.ts`      | Usage example      | basic.example.ts     |
| Demo         | `.demo.tsx`        | Demo component     | interactive.demo.tsx |

### Summary Table

| Категория              | Количество типов |
| ---------------------- | ---------------- |
| UI Components          | 10               |
| Hooks                  | 2                |
| Visualization          | 4                |
| Functional Files       | 16               |
| Visualization Adapters | 3                |
| Tests                  | 6                |
| Extended UI            | 23               |
| Feature Components     | 21               |
| Data Access            | 12               |
| State Management       | 11               |
| API Layer              | 14               |
| Internationalization   | 7                |
| Utilities              | 12               |
| Configuration          | 16               |
| Documentation          | 7                |
| **Total**              | **164 типа**     |

---

## 2. Суффиксы для функциональных файлов

| Тип         | Суффикс           | Ответственность       | Папка             |
| ----------- | ----------------- | --------------------- | ----------------- |
| Service     | `.service.ts`     | API сервисы           | api/services/     |
| API         | `.api.ts`         | API endpoints         | api/              |
| WS          | `.ws.ts`          | WebSocket             | api/              |
| Interceptor | `.interceptor.ts` | HTTP interceptors     | api/              |
| Store       | `.store.ts`       | State management      | stores/           |
| Selector    | `.selector.ts`    | State selectors       | stores/selectors/ |
| Types       | `.types.ts`       | TypeScript interfaces | types/            |
| DTO         | `.dto.ts`         | Data Transfer Objects | types/dto/        |
| Interface   | `.interface.ts`   | TS interfaces         | types/            |
| Constant    | `.constant.ts`    | Константы             | lib/constants/    |
| Config      | `.config.ts`      | Конфигурация          | config/           |
| Lib         | `.lib.ts`         | Утилиты, engine       | lib/              |
| Adapter     | `.adapter.ts`     | Адаптеры данных       | lib/adapters/     |
| Pattern     | `.pattern.ts`     | Паттерны              | lib/patterns/     |

---

## 3. Визуализация

| Тип     | Суффикс       | Ответственность       | Папка            |
| ------- | ------------- | --------------------- | ---------------- |
| Viz     | `.viz.tsx`    | D3/Canvas/SVG         | ui/viz/          |
| Chart   | `.chart.tsx`  | Charts                | ui/charts/       |
| Adapter | `.adapter.ts` | Адаптеры визуализации | ui/viz/adapters/ |

---

## 4. Тесты

| Тип     | Суффикс       | Ответственность   |
| ------- | ------------- | ----------------- |
| Test    | `.test.ts`    | Unit tests        |
| Spec    | `.spec.ts`    | Integration tests |
| E2E     | `.e2e.ts`     | End-to-end tests  |
| Fixture | `.fixture.ts` | Test fixtures     |
| Mock    | `.mock.ts`    | Test mocks        |

---

## 5. ESLint Configuration

### ESLint Rules

| Rule                        | Description                                            | Severity |
| --------------------------- | ------------------------------------------------------ | -------- |
| no-logic-in-dumb            | Dumb components cannot contain hooks or business logic | error    |
| no-logic-in-dto             | DTO files can only contain type definitions            | error    |
| import-aliases              | Must use @/ or #/ aliases for imports                  | error    |
| no-barrel-exports           | export \* is forbidden in index.ts files               | error    |
| component-suffix-validation | Component files must have correct suffixes             | error    |
| named-exports-naming        | Export names must match file conventions               | error    |

### Example Configuration

```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      "component-naming/no-logic-in-dumb": "error",
      "component-naming/no-logic-in-dto": "error",
      "component-naming/import-aliases": "error",
      "component-naming/no-barrel-exports": "error",
      "component-naming/component-suffix-validation": "error",
      "component-naming/named-exports-naming": "error",
    },
  },
];
```

### Rule Examples

**no-logic-in-dumb** — Dumb компоненты не должны содержать логику:

```typescript
// ✅ OK — Button.dumb.tsx
export function ButtonDumb({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>
}

// ❌ ERROR — Button.dumb.tsx
export function ButtonDumb() {
  const [state, setState] = useState()  // Hook запрещён
  const handleClick = () => { ... }       // Бизнес-логика запрещена
  return <button onClick={handleClick}>Click</button>
}
```

**no-logic-in-dto** — DTO файлы только для типов:

```typescript
// ✅ OK — user.dto.ts
export interface UserDTO {
  id: string
  name: string
  email: string
}

// ❌ ERROR — user.dto.ts
export interface UserDTO { ... }
export function validateUser(user: UserDTO) { ... }  // Функции запрещены
```

**import-aliases** — Использовать @/ или #/:

```typescript
// ✅ OK
import { ButtonDumb } from "@/ui/kit";
import { useAuth } from "#/hooks";

// ❌ ERROR
import { ButtonDumb } from "../../../../ui/kit";
import { useAuth } from "../../../hooks";
```

**no-barrel-exports** — export \* запрещён:

```typescript
// ✅ OK — index.ts
export { ButtonDumb } from "./Button";
export { InputDumb } from "./Input";

// ❌ ERROR — index.ts
export * from "./Button";
export * from "./Input";
```

**component-suffix-validation** — Проверка суффиксов:

```typescript
// ✅ OK
LoginForm.smart.tsx → export { LoginFormSmart }
Button.dumb.tsx → export { ButtonDumb }

// ❌ ERROR
LoginForm.tsx → без суффикса
Button.tsx → без суффикса
```

**named-exports-naming** — Имена экспортов:

```typescript
// ✅ OK
export function ButtonDumb() { ... }
export function useAuth() { ... }

// ❌ ERROR
export function Button() { ... }  // Должно быть ButtonDumb
export function authHook() { ... }  // Должно быть useAuth
```

---

## 6. Правила импортов

### Barrel Exports — ТОЛЬКО явные экспорты

```typescript
// ❌ ЗАПРЕЩЕНО
export * from "./Button";

// ✅ РАЗРЕШЕНО
export { ButtonDumb } from "./Button";
export { InputDumb } from "./Input";
```

### Пример структуры папки

```
ui/kit/Button/
├── Button.dumb.tsx
└── index.ts          → export { ButtonDumb } from './Button.dumb'

ui/smart/LoginForm/
├── LoginForm.smart.tsx
└── index.ts          → export { LoginFormSmart } from './LoginForm.smart'

ui/kit/FormFields/
├── FormFields.dumbs.tsx    → Label, ErrorText, HelperText
└── index.ts                → export { FormFieldsDumbs } from './FormFields.dumbs'
```

### Примеры импортов

```typescript
// Из kit (dumb)
import { ButtonDumb, InputDumb, FormFieldsDumbs } from "@/ui/kit";

// Из smart
import { LoginFormSmart } from "@/modules/auth/ui";

// Из hooks
import { useAuth } from "@/hooks";

// Из stores
import { useUserStore } from "@/stores";
```

---

## 7. Правила Barrel Exports

### Главное правило: `export *` ЗАПРЕЩЁН на первом уровне

```typescript
// ❌ kit/index.ts — НЕЛЬЗЯ
export * from "./Button";
export * from "./FormFields";

// ✅ kit/index.ts — НУЖНО
export { ButtonDumb } from "./Button";
export { FormFieldsDumbs } from "./FormFields";
```

**Почему:**

- Предсказуемый API
- IDE autocomplete показывает только экспортируемое
- Tree-shaking работает лучше
- ESLint может проверять неиспользуемые экспорты

---

## 8. Структура папок

```
shared/
├── src/
│   ├── api/
│   │   ├── hooks/           → .hook.ts
│   │   ├── services/        → .service.ts
│   │   ├── interceptors/    → .interceptor.ts
│   │   └── *.api.ts         → Endpoints
│   ├── ui/
│   │   ├── kit/             → Dumb компоненты
│   │   ├── smart/           → Smart компоненты
│   │   ├── providers/       → .provider.tsx
│   │   ├── context/         → .context.tsx
│   │   ├── viz/             → .viz.tsx, .chart.tsx
│   │   └── layout/          → .layout.tsx
│   ├── stores/              → .store.ts
│   │   └── selectors/       → .selector.ts
│   ├── lib/
│   │   ├── constants/       → .constant.ts
│   │   ├── adapters/        → .adapter.ts
│   │   ├── patterns/       → .pattern.ts
│   │   └── *.lib.ts
│   ├── types/               → .types.ts
│   │   └── dto/             → .dto.ts
│   └── modules/
│       └── **/ui/           → .page.tsx, .section.tsx, .widget.tsx, .modal.tsx

web/
├── src/
│   ├── app/
│   │   └── (auth|profile)/  → .page.tsx
│   ├── components/          → .smart.tsx, .dumb.tsx
│   ├── hooks/               → .hook.ts
│   └── stores/              → .store.ts
```

---

## 9. Миграция — packages/shared

### api/

| Текущий файл                       | Новый файл                                  | Действие      |
| ---------------------------------- | ------------------------------------------- | ------------- |
| `api/hooks/index.ts`               | `api/hooks/index.ts`                        | OK            |
| `api/hooks/queryClient.ts`         | `api/hooks/queryClient.hook.ts`             | Переименовать |
| `api/hooks/ReactQueryProvider.tsx` | `api/hooks/ReactQueryProvider.provider.tsx` | Переименовать |
| `api/hooks/useAuth.ts`             | `api/hooks/useAuth.hook.ts`                 | Переименовать |
| `api/hooks/useCountries.ts`        | `api/hooks/useCountries.hook.ts`            | Переименовать |
| `api/hooks/useForgotPassword.ts`   | `api/hooks/useForgotPassword.hook.ts`       | Переименовать |
| `api/hooks/useOrganizations.ts`    | `api/hooks/useOrganizations.hook.ts`        | Переименовать |
| `api/hooks/useReference.ts`        | `api/hooks/useReference.hook.ts`            | Переименовать |
| `api/hooks/useResetPassword.ts`    | `api/hooks/useResetPassword.hook.ts`        | Переименовать |
| `api/hooks/useUsers.ts`            | `api/hooks/useUsers.hook.ts`                | Переименовать |
| `api/hooks/useWorkspaces.ts`       | `api/hooks/useWorkspaces.hook.ts`           | Переименовать |
| `api/Admin.ts`                     | `api/admin.api.ts`                          | Переименовать |
| `api/Auth.ts`                      | `api/auth.api.ts`                           | Переименовать |
| `api/Blocks.ts`                    | `api/blocks.api.ts`                         | Переименовать |
| `api/Countries.ts`                 | `api/countries.api.ts`                      | Переименовать |
| `api/Events.ts`                    | `api/events.api.ts`                         | Переименовать |
| `api/Formulas.ts`                  | `api/formulas.api.ts`                       | Переименовать |
| `api/Groups.ts`                    | `api/groups.api.ts`                         | Переименовать |
| `api/Pages.ts`                     | `api/pages.api.ts`                          | Переименовать |
| `api/Reference.ts`                 | `api/reference.api.ts`                      | Переименовать |
| `api/Tables.ts`                    | `api/tables.api.ts`                         | Переименовать |
| `api/Users.ts`                     | `api/users.api.ts`                          | Переименовать |
| `api/Versions.ts`                  | `api/versions.api.ts`                       | Переименовать |
| `api/Workspaces.ts`                | `api/workspaces.api.ts`                     | Переименовать |
| `api/client.ts`                    | `api/client.service.ts`                     | Переименовать |
| `api/config.ts`                    | `api/config.constant.ts`                    | Переименовать |
| `api/create-api.ts`                | `api/create-api.service.ts`                 | Переименовать |
| `api/http-client.ts`               | `api/http-client.service.ts`                | Переименовать |
| `api/websocket.ts`                 | `api/websocket.ws.ts`                       | Переименовать |

### modules/auth/

| Текущий файл                            | Новый файл                                    | Действие      |
| --------------------------------------- | --------------------------------------------- | ------------- |
| `modules/auth/lib/AuthContext.tsx`      | `modules/auth/lib/AuthContext.context.tsx`    | Переименовать |
| `modules/auth/lib/ProtectedRoute.tsx`   | `modules/auth/lib/ProtectedRoute.smart.tsx`   | Переименовать |
| `modules/auth/ui/LoginForm.tsx`         | `modules/auth/ui/LoginForm.smart.tsx`         | Переименовать |
| `modules/auth/ui/RegisterForm.tsx`      | `modules/auth/ui/RegisterForm.smart.tsx`      | Переименовать |
| `modules/auth/ui/ResetPasswordForm.tsx` | `modules/auth/ui/ResetPasswordForm.smart.tsx` | Переименовать |

### modules/i18n/

| Текущий файл                                            | Новый файл                                                    | Действие      |
| ------------------------------------------------------- | ------------------------------------------------------------- | ------------- |
| `modules/i18n/lib/language/LanguageContext.tsx`         | `modules/i18n/lib/language/LanguageContext.context.tsx`       | Переименовать |
| `modules/i18n/lib/i18n-provider.tsx`                    | `modules/i18n/lib/i18n-provider.provider.tsx`                 | Переименовать |
| `modules/i18n/ui/LanguageSwitcher/LanguageSwitcher.tsx` | `modules/i18n/ui/LanguageSwitcher/LanguageSwitcher.smart.tsx` | Переименовать |

### modules/notifications/

| Текущий файл                                        | Новый файл                                                   | Действие      |
| --------------------------------------------------- | ------------------------------------------------------------ | ------------- |
| `modules/notifications/providers/ToastProvider.tsx` | `modules/notifications/providers/ToastProvider.provider.tsx` | Переименовать |
| `modules/notifications/ui/ToastContainer.tsx`       | `modules/notifications/ui/ToastContainer.smart.tsx`          | Переименовать |

### modules/profile/

| Текущий файл                                                           | Новый файл                                                                   | Действие      |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------- |
| `modules/profile/ui/indicators/components/CreateIndicatorModal.tsx`    | `modules/profile/ui/indicators/components/CreateIndicatorModal.modal.tsx`    | Переименовать |
| `modules/profile/ui/indicators/components/FilterDropdown.tsx`          | `modules/profile/ui/indicators/components/FilterDropdown.smart.tsx`          | Переименовать |
| `modules/profile/ui/indicators/components/GenerateIndicatorsModal.tsx` | `modules/profile/ui/indicators/components/GenerateIndicatorsModal.modal.tsx` | Переименовать |
| `modules/profile/ui/indicators/components/IndicatorGroupModal.tsx`     | `modules/profile/ui/indicators/components/IndicatorGroupModal.modal.tsx`     | Переименовать |
| `modules/profile/ui/indicators/components/IndicatorGroupsList.tsx`     | `modules/profile/ui/indicators/components/IndicatorGroupsList.smart.tsx`     | Переименовать |
| `modules/profile/ui/ProfileLayout/Sidebar/Sidebar.tsx`                 | `modules/profile/ui/ProfileLayout/Sidebar/Sidebar.smart.tsx`                 | Переименовать |
| `modules/profile/ui/ProfileLayout/LeftPanel.tsx`                       | `modules/profile/ui/ProfileLayout/LeftPanel.smart.tsx`                       | Переименовать |
| `modules/profile/ui/ProfileLayout/ProfileLayout.tsx`                   | `modules/profile/ui/ProfileLayout/ProfileLayout.smart.tsx`                   | Переименовать |
| `modules/profile/ui/ProfileLayout/RightPanel.tsx`                      | `modules/profile/ui/ProfileLayout/RightPanel.smart.tsx`                      | Переименовать |
| `modules/profile/ui/Settings/PasswordStrength/PasswordStrength.tsx`    | `modules/profile/ui/Settings/PasswordStrength/PasswordStrength.dumb.tsx`     | Переименовать |
| `modules/profile/ui/Settings/OrganizationTree.tsx`                     | `modules/profile/ui/Settings/OrganizationTree.smart.tsx`                     | Переименовать |
| `modules/profile/ui/Settings/ProfileForm.tsx`                          | `modules/profile/ui/Settings/ProfileForm.smart.tsx`                          | Переименовать |
| `modules/profile/ui/Settings/SecurityForm.tsx`                         | `modules/profile/ui/Settings/SecurityForm.smart.tsx`                         | Переименовать |
| `modules/profile/ui/WorkspaceTree/CreateTableModal.tsx`                | `modules/profile/ui/WorkspaceTree/CreateTableModal.modal.tsx`                | Переименовать |
| `modules/profile/ui/WorkspaceTree/CreateWorkspaceModal.tsx`            | `modules/profile/ui/WorkspaceTree/CreateWorkspaceModal.modal.tsx`            | Переименовать |
| `modules/profile/ui/WorkspaceTree/WorkspaceTableTabs.tsx`              | `modules/profile/ui/WorkspaceTree/WorkspaceTableTabs.smart.tsx`              | Переименовать |
| `modules/profile/ui/WorkspaceTree/WorkspaceTree.tsx`                   | `modules/profile/ui/WorkspaceTree/WorkspaceTree.smart.tsx`                   | Переименовать |

### modules/reference/

| Текущий файл                                 | Новый файл                                         | Действие      |
| -------------------------------------------- | -------------------------------------------------- | ------------- |
| `modules/reference/ui/ReferenceSelector.tsx` | `modules/reference/ui/ReferenceSelector.smart.tsx` | Переименовать |

### modules/seasons/

| Текущий файл                                       | Новый файл                                               | Действие      |
| -------------------------------------------------- | -------------------------------------------------------- | ------------- |
| `modules/seasons/ui/Seasons/AutogenerateModal.tsx` | `modules/seasons/ui/Seasons/AutogenerateModal.modal.tsx` | Переименовать |
| `modules/seasons/ui/Seasons/SeasonModal.tsx`       | `modules/seasons/ui/Seasons/SeasonModal.modal.tsx`       | Переименовать |

### modules/table/

| Текущий файл                                        | Новый файл                                          | Действие      |
| --------------------------------------------------- | --------------------------------------------------- | ------------- |
| `modules/table/hooks/useKeyboardShortcuts.ts`       | `modules/table/hooks/useKeyboardShortcuts.hook.ts`  | Переименовать |
| `modules/table/services/cell-formatting.service.ts` | `modules/table/services/cell-formatting.service.ts` | OK            |
| `modules/table/services/table-grid-api.service.ts`  | `modules/table/services/table-grid-api.service.ts`  | OK            |
| `modules/table/services/table.service.ts`           | `modules/table/services/table.service.ts`           | OK            |
| `modules/table/types/cell.types.ts`                 | `modules/table/types/cell.types.ts`                 | OK            |
| `modules/table/types/table.types.ts`                | `modules/table/types/table.types.ts`                | OK            |
| `modules/table/ui/ContextMenu.tsx`                  | `modules/table/ui/ContextMenu.smart.tsx`            | Переименовать |
| `modules/table/ui/DynamicTable.tsx`                 | `modules/table/ui/DynamicTable.smart.tsx`           | Переименовать |
| `modules/table/ui/FormulaBar.tsx`                   | `modules/table/ui/FormulaBar.smart.tsx`             | Переименовать |
| `modules/table/ui/MainToolbar.tsx`                  | `modules/table/ui/MainToolbar.dumb.tsx`             | Переименовать |
| `modules/table/ui/SheetTabs.tsx`                    | `modules/table/ui/SheetTabs.dumb.tsx`               | Переименовать |
| `modules/table/ui/TableHeader.tsx`                  | `modules/table/ui/TableHeader.smart.tsx`            | Переименовать |

### modules/visualization/

| Текущий файл                                              | Новый файл                                                      | Действие          |
| --------------------------------------------------------- | --------------------------------------------------------------- | ----------------- |
| `modules/visualization/lib/adapters/*.ts`                 | `modules/visualization/lib/adapters/*.adapter.ts`               | Переименовать все |
| `modules/visualization/ui/charts/BarChart/BarChart.tsx`   | `modules/visualization/ui/charts/BarChart/BarChart.chart.tsx`   | Переименовать     |
| `modules/visualization/ui/charts/LineChart/LineChart.tsx` | `modules/visualization/ui/charts/LineChart/LineChart.chart.tsx` | Переименовать     |
| `modules/visualization/ui/charts/PieChart/PieChart.tsx`   | `modules/visualization/ui/charts/PieChart/PieChart.chart.tsx`   | Переименовать     |

### ui/

| Текущий файл                                   | Новый файл                                   | Действие                       |
| ---------------------------------------------- | -------------------------------------------- | ------------------------------ |
| `ui/layout/AuthLayout/AuthLayout.tsx`          | `ui/layout/AuthLayout/AuthLayout.layout.tsx` | Переименовать                  |
| `ui/layout/Footer/Footer.tsx`                  | `ui/layout/Footer/Footer.smart.tsx`          | Переименовать                  |
| `ui/layout/Header/Header.tsx`                  | `ui/layout/Header/Header.smart.tsx`          | Переименовать                  |
| `ui/layout/PageLayout/PageLayout.tsx`          | `ui/layout/PageLayout/PageLayout.layout.tsx` | Переименовать                  |
| `ui/primitives/Button/Button.dumb.tsx`         | `ui/kit/Button/Button.dumb.tsx`              | Переместить + обновить exports |
| `ui/primitives/IconButton/IconButton.dumb.tsx` | `ui/kit/IconButton/IconButton.dumb.tsx`      | Переместить + обновить exports |
| `ui/primitives/Input/Input.dumb.tsx`           | `ui/kit/Input/Input.dumb.tsx`                | Переместить + обновить exports |
| `ui/primitives/Logo/Logo.dumb.tsx`             | `ui/kit/Logo/Logo.dumb.tsx`                  | Переместить + обновить exports |
| `ui/primitives/Select/Select.dumb.tsx`         | `ui/kit/Select/Select.dumb.tsx`              | Переместить + обновить exports |

### stores/

| Текущий файл                       | Новый файл                          | Действие      |
| ---------------------------------- | ----------------------------------- | ------------- |
| `stores/useFormattingStore.ts`     | `stores/useFormatting.store.ts`     | Переименовать |
| `stores/useFormulaStore.ts`        | `stores/useFormula.store.ts`        | Переименовать |
| `stores/useHistoryStore.ts`        | `stores/useHistory.store.ts`        | Переименовать |
| `stores/useReferenceStore.ts`      | `stores/useReference.store.ts`      | Переименовать |
| `stores/useSelectionStore.ts`      | `stores/useSelection.store.ts`      | Переименовать |
| `stores/useTableReferenceStore.ts` | `stores/useTableReference.store.ts` | Переименовать |
| `stores/useTableStore.ts`          | `stores/useTable.store.ts`          | Переименовать |
| `stores/useUserStore.ts`           | `stores/useUser.store.ts`           | Переименовать |
| `stores/useWorkspaceStore.ts`      | `stores/useWorkspace.store.ts`      | Переименовать |

### lib/

| Текущий файл                  | Новый файл                          | Действие      |
| ----------------------------- | ----------------------------------- | ------------- |
| `lib/react/SourceTracker.tsx` | `lib/react/SourceTracker.smart.tsx` | Переименовать |
| `lib/cn.ts`                   | `lib/cn.lib.ts`                     | Переименовать |

---

## 10. Миграция — apps/web

### src/app/

| Текущий файл                                         | Новый файл                                                | Действие      |
| ---------------------------------------------------- | --------------------------------------------------------- | ------------- |
| `src/app/(auth)/forgot-password/page.tsx`            | `src/app/(auth)/forgot-password/page.page.tsx`            | Переименовать |
| `src/app/(auth)/login/page.tsx`                      | `src/app/(auth)/login/page.page.tsx`                      | Переименовать |
| `src/app/(auth)/register/page.tsx`                   | `src/app/(auth)/register/page.page.tsx`                   | Переименовать |
| `src/app/(auth)/reset-password/page.tsx`             | `src/app/(auth)/reset-password/page.page.tsx`             | Переименовать |
| `src/app/(auth)/layout.tsx`                          | `src/app/(auth)/layout.layout.tsx`                        | Переименовать |
| `src/app/(profile)/dashboard/page.tsx`               | `src/app/(profile)/dashboard/page.page.tsx`               | Переименовать |
| `src/app/(profile)/indicators/page.tsx`              | `src/app/(profile)/indicators/page.page.tsx`              | Переименовать |
| `src/app/(profile)/organizations/page.tsx`           | `src/app/(profile)/organizations/page.page.tsx`           | Переименовать |
| `src/app/(profile)/seasons/page.tsx`                 | `src/app/(profile)/seasons/page.page.tsx`                 | Переименовать |
| `src/app/(profile)/settings/page.tsx`                | `src/app/(profile)/settings/page.page.tsx`                | Переименовать |
| `src/app/(profile)/tables/[id]/page.tsx`             | `src/app/(profile)/tables/[id]/page.page.tsx`             | Переименовать |
| `src/app/(profile)/tables-test/page.tsx`             | `src/app/(profile)/tables-test/page.page.tsx`             | Переименовать |
| `src/app/(profile)/workspace/[workspaceId]/page.tsx` | `src/app/(profile)/workspace/[workspaceId]/page.page.tsx` | Переименовать |
| `src/app/(profile)/workspace/page.tsx`               | `src/app/(profile)/workspace/page.page.tsx`               | Переименовать |
| `src/app/(profile)/workspaces/page.tsx`              | `src/app/(profile)/workspaces/page.page.tsx`              | Переименовать |
| `src/app/(profile)/layout.tsx`                       | `src/app/(profile)/layout.layout.tsx`                     | Переименовать |
| `src/app/layout.tsx`                                 | `src/app/layout.layout.tsx`                               | Переименовать |
| `src/app/page.tsx`                                   | `src/app/page.page.tsx`                                   | Переименовать |

### src/components/

| Текущий файл                                                      | Новый файл                                                              | Действие      |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------- |
| `src/components/home/Brands/Brands.tsx`                           | `src/components/home/Brands/Brands.smart.tsx`                           | Переименовать |
| `src/components/home/ChartsShowcase/ChartsShowcase.tsx`           | `src/components/home/ChartsShowcase/ChartsShowcase.smart.tsx`           | Переименовать |
| `src/components/home/DataWavesBackground/DataWavesBackground.tsx` | `src/components/home/DataWavesBackground/DataWavesBackground.smart.tsx` | Переименовать |
| `src/components/home/Footer/Footer.tsx`                           | `src/components/home/Footer/Footer.smart.tsx`                           | Переименовать |
| `src/components/home/Header/Header.tsx`                           | `src/components/home/Header/Header.smart.tsx`                           | Переименовать |
| `src/components/home/Hero/Hero.tsx`                               | `src/components/home/Hero/Hero.smart.tsx`                               | Переименовать |
| `src/components/home/HomePage/HomePage.tsx`                       | `src/components/home/HomePage/HomePage.smart.tsx`                       | Переименовать |
| `src/components/home/InteractiveGrid/InteractiveGrid.tsx`         | `src/components/home/InteractiveGrid/InteractiveGrid.smart.tsx`         | Переименовать |
| `src/components/home/LiveSportsChart/LiveSportsChart.tsx`         | `src/components/home/LiveSportsChart/LiveSportsChart.smart.tsx`         | Переименовать |
| `src/components/home/LiveSportsChart/chartConfig.ts`              | `src/components/home/LiveSportsChart/chartConfig.constant.ts`           | Переименовать |
| `src/components/home/ProductsShowcase/ProductsShowcase.tsx`       | `src/components/home/ProductsShowcase/ProductsShowcase.smart.tsx`       | Переименовать |

---

## 11. Примеры миграции

### Пример 1: Компонент с бизнес-логикой

**До:**

```typescript
// modules/auth/ui/LoginForm.tsx
import { useState } from 'react'
import { useAuth } from '@/api/hooks'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const { login } = useAuth()

  const handleSubmit = () => {
    login(email)
  }

  return (...)
}
```

**После:**

```typescript
// modules/auth/ui/LoginForm.smart.tsx
import { useState } from 'react'
import { useAuth } from '@/hooks'

export function LoginFormSmart() {
  const [email, setEmail] = useState('')
  const { login } = useAuth()

  const handleSubmit = () => {
    login(email)
  }

  return (...)
}
```

```typescript
// modules/auth/ui/index.ts
export { LoginFormSmart } from "./LoginForm.smart";
```

### Пример 2: Dumb компонент

**До:**

```typescript
// ui/primitives/Button/Button.dumb.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary'
  onClick: () => void
  children: React.ReactNode
}

export function Button({ variant, onClick, children }: ButtonProps) {
  return <button className={`btn-${variant}`} onClick={onClick}>{children}</button>
}
```

**После:**

```typescript
// ui/kit/Button/Button.dumb.tsx
interface ButtonDumbProps {
  variant: 'primary' | 'secondary'
  onClick: () => void
  children: React.ReactNode
}

export function ButtonDumb({ variant, onClick, children }: ButtonDumbProps) {
  return <button className={`btn-${variant}`} onClick={onClick}>{children}</button>
}
```

```typescript
// ui/kit/Button/index.ts
export { ButtonDumb } from "./Button.dumb";
```

### Пример 3: Hook

**До:**

```typescript
// api/hooks/useAuth.ts
export function useAuth() {
  // ...
}
```

**После:**

```typescript
// api/hooks/useAuth.hook.ts
export function useAuth() {
  // ...
}
```

---

## 12. Чек-лист миграции

- [ ] Создать новую структуру папок (kit, smart, providers, context, viz, charts, selectors)
- [ ] Переименовать все dumb компоненты в `.dumb.tsx`
- [ ] Переименовать все smart компоненты в `.smart.tsx`
- [ ] Переименовать все hooks в `.hook.ts`
- [ ] Переименовать все providers в `.provider.tsx`
- [ ] Переименовать все contexts в `.context.tsx`
- [ ] Переименовать все modals в `.modal.tsx`
- [ ] Переименовать все layouts в `.layout.tsx`
- [ ] Переименовать все pages в `.page.tsx`
- [ ] Переименовать все sections в `.section.tsx`
- [ ] Переименовать все widgets в `.widget.tsx`
- [ ] Переименовать все services в `.service.ts`
- [ ] Переименовать все APIs в `.api.ts`
- [ ] Переименовать все WS в `.ws.ts`
- [ ] Переименовать все interceptors в `.interceptor.ts`
- [ ] Переименовать все stores в `.store.ts`
- [ ] Переименовать все selectors в `.selector.ts`
- [ ] Переименовать все constants в `.constant.ts`
- [ ] Переименовать все configs в `.config.ts`
- [ ] Переименовать все types в `.types.ts`
- [ ] Переименовать все DTOs в `.dto.ts`
- [ ] Переименовать все interfaces в `.interface.ts`
- [ ] Переименовать все adapters в `.adapter.ts`
- [ ] Переименовать все patterns в `.pattern.ts`
- [ ] Переименовать все lib в `.lib.ts`
- [ ] Переименовать все viz/charts в `.viz.tsx` / `.chart.tsx`
- [ ] Обновить barrel exports (index.ts) — ТОЛЬКО явные `export {...}`
- [ ] Обновить все импорты во всех файлах
- [ ] Запустить TypeScript check
- [ ] Запустить линтер
- [ ] Запустить тесты

---

## 13. Migration Scripts

### Available Scripts

| Script                           | Description                    |
| -------------------------------- | ------------------------------ |
| scripts/migrate.mjs              | Main migration script          |
| scripts/dry-run.sh               | Test migration without changes |
| scripts/rollback.sh              | Rollback all changes           |
| scripts/update-barrel-exports.js | Update barrel exports          |
| scripts/update-imports.js        | Update import paths            |

### Usage

```bash
# Dry run - see what will be changed
./scripts/dry-run.sh

# Run full migration
node scripts/migrate.mjs --phase=all

# Rollback changes
./scripts/rollback.sh
```

### Phase 1: Rename Files

- Files are renamed according to rename-map.json
- Backups are created in .backup/ directory

### Phase 2: Update Barrel Exports

- All index.ts files are updated
- export \* is replaced with named exports

### Phase 3: Update Imports

- All imports are updated to match new file paths
- Both relative and alias imports are handled

### Script Examples

**dry-run.sh**

```bash
#!/bin/bash
echo "=== DRY RUN MODE ==="
echo "No files will be modified."
echo ""

node scripts/migrate.mjs --phase=rename --dry-run
node scripts/migrate.mjs --phase=exports --dry-run
node scripts/migrate.mjs --phase=imports --dry-run

echo ""
echo "=== DRY RUN COMPLETE ==="
```

**rollback.sh**

```bash
#!/bin/bash
echo "=== ROLLBACK ==="
echo "Restoring files from .backup/ directory..."

if [ -d ".backup" ]; then
  cp -r .backup/* .
  rm -rf .backup
  echo "Rollback complete."
else
  echo "No backup directory found."
fi
```

---

## 14. Ссылки

- Документация: `/docs/COMPONENT_SYSTEM.md`
- Оригинальная структура: `/docs/PROJECT_TREE.md`
