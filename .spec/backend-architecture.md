# ⚙️ Бэкенд архитектура (Elbruso API)

## Технологический стек
- **Runtime:** Node.js (v20+)
- **Framework:** NestJS (Modular structure)
- **Database:** PostgreSQL
- **ORM/Query Builder:** Kysely (Strict TypeScript typing)
- **Validation:** class-validator + Zod
- **Documentation:** Swagger (OpenAPI 3.0)

## Основные сущности (Entity Models)
Названия сущностей в коде соответствуют таблицам БД и индустриальным стандартам:
- `User`, `ApiKey`, `Workspace`, `WorkspaceGroup`, `Page`, `Block`
- `DynamicTable`, `TableVersion`, `CellHistory`, `FormulaTemplate`, `FormulaCache`
- `IndicatorCatalog`, `Organization`, `Sport`, `Discipline`, `Region`, `Federation`, `Season`, `Event`

## API Справочник (Endpoints)

### 🔑 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/auth/register` | Регистрация нового пользователя |
| POST | `/auth/login` | Вход по email и паролю |
| POST | `/auth/refresh` | Обновление токена доступа |

### 👤 Users
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/users/me` | Получение профиля текущего пользователя |
| GET | `/users/{id}` | Получение пользователя по ID |
| POST | `/users/api-keys` | Создание API ключа |

### 🏢 Workspaces
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/workspaces` | Создать воркспейс |
| GET | `/workspaces` | Список воркспейсов пользователя |
| GET | `/workspaces/{id}` | Получить воркспейс по ID |
| PATCH | `/workspaces/{id}` | Обновить воркспейс |
| DELETE | `/workspaces/{id}` | Удалить воркспейс |
| POST | `/workspaces/{id}/members` | Добавить участника |
| GET | `/workspaces/{id}/members` | Список участников |
| PATCH | `/workspaces/{id}/members/{memberId}` | Изменить роль участника |
| DELETE | `/workspaces/{id}/members/{memberId}` | Удалить участника |

### 📂 Workspace Groups
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/workspaces/{workspaceId}/groups` | Создать группу |
| GET | `/workspaces/{workspaceId}/groups` | Список групп воркспейса |
| PATCH | `/groups/{id}` | Обновить группу |
| DELETE | `/groups/{id}` | Удалить группу |
| POST | `/workspaces/{workspaceId}/groups/reorder` | Изменить порядок групп |

### 📃 Pages
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/workspaces/{workspaceId}/pages` | Создать страницу |
| GET | `/workspaces/{workspaceId}/pages` | Дерево страниц воркспейса |
| GET | `/pages/{id}` | Получить страницу по ID |
| PATCH | `/pages/{id}` | Обновить страницу |
| DELETE | `/pages/{id}` | Удалить страницу (soft delete) |
| POST | `/pages/{id}/move` | Переместить страницу |

### 🧱 Blocks
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/pages/{pageId}/blocks` | Создать блок |
| GET | `/pages/{pageId}/blocks` | Список блоков страницы |
| PATCH | `/blocks/{id}` | Обновить контент блока |
| DELETE | `/blocks/{id}` | Удалить блок (soft delete) |
| POST | `/blocks/{id}/move` | Изменить позицию блока |

### 📊 Dynamic Tables
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/workspaces/{workspaceId}/tables` | Создать таблицу |
| GET | `/workspaces/{workspaceId}/tables` | Список таблиц воркспейса |
| GET | `/tables/{id}` | Получить таблицу по ID |
| PATCH | `/tables/{id}` | Обновить таблицу |
| DELETE | `/tables/{id}` | Удалить таблицу |
| POST | `/tables/{id}/versions` | Создать новую версию |
| GET | `/tables/{id}/versions` | История версий |
| POST | `/versions/{id}/activate` | Активировать версию |
| GET | `/versions/{id}/cells` | Получить ячейки (пагинация) |
| PATCH | `/versions/{id}/cells/{rowIndex}/{colIndex}` | Обновить одну ячейку |
| POST | `/versions/{id}/cells/batch` | Массовое обновление ячеек |
| DELETE | `/versions/{id}/rows/{index}` | Удалить строку |
| POST | `/versions/{id}/rows/{index}` | Вставить строку |
| DELETE | `/versions/{id}/columns/{index}` | Удалить колонку |
| POST | `/versions/{id}/columns/{index}` | Вставить колонку |
| POST | `/tables/{id}/links` | Связать таблицу с донором |
| PATCH | `/versions/{id}/matrix-formulas` | Обновить матричные формулы |
| GET | `/tables/{id}/donor-status` | Проверить изменения в доноре |

### 🏆 Sports & Catalogs
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/sports` | Все виды спорта |
| GET | `/sports/{id}/disciplines` | Дисциплины вида спорта |
| GET | `/seasons/current` | Текущий сезон |
| GET | `/regions/by-country/{countryId}` | Регионы страны |
| GET | `/organizations/federations` | Список федераций |
| GET | `/events` | События с фильтрами |
| GET | `/indicator-groups` | Группы показателей |
| GET | `/indicators/by-sport/{sportId}` | Показатели вида спорта |

### 🧮 Formulas & Analysis
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/formulas/analyze` | Анализ формул и связей |

## Schemas (DTOs)
`RegisterDto`, `LoginDto`, `RefreshTokenDto`, `CreateWorkspaceDto`, `AddMemberDto`, `UpdateMemberRoleDto`, `CreatePageDto`, `UpdatePageDto`, `MovePageDto`, `CreateBlockDto`, `UpdateBlockDto`, `MoveBlockDto`, `CreateGroupDto`, `UpdateGroupDto`, `ReorderGroupsDto`, `AnalyzeFormulaDto`, `CreateTableDto`, `UpdateTableDto`, `CreateVersionDto`, `CellDataDto`, `BatchUpdateCellsDto`, `CreateLinkDto`.
