# 🖼 Фронтенд архитектура (Elbruso Web)

## Технологический стек (Industrial Stack)
- **Framework:** React JS (Next.js 14+)
- **Architecture:** Feature-Sliced Design (FSD)
- **Styling:** Tailwind CSS + Shared UI Layer
- **Industrial Table:** AG Grid (Enterprise-ready)
- **Calculation Engine:** HyperFormula (Excel-like logic)
- **Visualization:** D3.js (Advanced custom charts)
- **State Management:** Zustand (UI) + TanStack Query (Server Data)

## Структура по FSD & Реализация API

### 1. Shared Layer (Фундамент)
- **UI:** Атомарные компоненты (Button, Input, Badge, Card, Modal, Tooltip).
- **API Client:** Настроенный Axios/Fetch инстанс с перехватом 401 и обновлением токенов (`/auth/refresh`).
- **Table Core:** Базовая обертка над AG Grid с поддержкой тем Elbruso.
- **Formula Core:** Интеграция HyperFormula для локальных расчетов.

### 2. Entities (Бизнес-сущности)
- **User:** Хранение состояния `/users/me`, управление API-ключами.
- **Workspace:** Работа со списком воркспейсов, группами (`WorkspaceGroup`) и правами участников.
- **Page & Block:** Модели данных для конструктора дашбордов. Обработка дерева страниц и типов блоков (Text, Chart, Table).
- **DynamicTable:** Сложная сущность, объединяющая `TableVersion`, пагинацию ячеек (`/versions/{id}/cells`) и метаданные колонок.
- **Reference Data:** Справочники (`Sports`, `Regions`, `Seasons`, `Indicators`) — кэширование через TanStack Query.

### 3. Features (Пользовательские сценарии)
- **Auth:** Сценарии Login, Register, Logout.
- **WorkspaceManagement:** Создание воркспейсов, приглашение участников (`/members`), управление ролями.
- **ContentEditor:** Редактирование страниц, перемещение блоков (`/blocks/{id}/move`), управление деревом страниц (`/pages/{id}/move`).
- **TableGridEditor:** Интерактивное редактирование ячеек, массовое обновление (`/cells/batch`), вставка/удаление строк и колонок.
- **FormulaAnalyzer:** Детальный разбор формул через `/formulas/analyze` для отображения зависимостей.
- **DataLinking:** Связывание таблиц со сторонними источниками (донорами) через `/tables/{id}/links`.

### 4. Widgets (Композиция)
- **NavigationSidebar:** Управление навигацией, группами воркспейса и деревом страниц.
- **MainTableEditor:** Виджет, соединяющий AG Grid, HyperFormula и панель инструментов таблицы.
- **DashboardRenderer:** Отрисовка страницы через сетку блоков.
- **AIChatAssistant:** Интерфейс взаимодействия с AI для анализа текущих данных.

### 5. Pages (Маршруты)
- `LoginPage`, `RegisterPage`
- `WorkspaceSelectPage` (выбор активной рабочей области)
- `DashboardPage` (просмотр/правка страниц с блоками)
- `TableEditorPage` (полноэкранная работа с AG Grid)

## Ключевые интеграционные принципы
1. **SSOT (Single Source of Truth):** Frontend использует типы данных бэкенда. При изменении DTO на бэкенде, фронтенд должен сигнализировать об ошибках сборки.
2. **Lazy Data Loading:** Для больших таблиц используется серверная пагинация ячеек. AG Grid работает в режиме Server-Side Row Model для экстремальных объемов.
3. **Optimistic Updates:** При редактировании ячеек или перемещении блоков изменения отображаются мгновенно, а запрос на сервер идет в фоне.
4. **Offline Calculation:** HyperFormula позволяет пересчитывать зависимые ячейки без обращения к API, если все необходимые данные загружены в локальный кэш.
