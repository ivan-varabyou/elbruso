Phase 4: Dynamic Tables - Полный Детальный План
Оглавление
Анализ Существующего Backend
Архитектура Frontend
Детальный План Реализации
Компоненты и Код
Интеграции
Тестирование
Анализ Существующего Backend
Database Schema (Уже Реализовано)
1. dynamic_tables
CREATE TABLE dynamic_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id),
  group_id UUID REFERENCES workspace_groups(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  is_reference BOOLEAN DEFAULT false,
  reference_type VARCHAR(50),
  row_count INTEGER DEFAULT 10,
  column_count INTEGER DEFAULT 5,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);
Поля:

workspace_id - принадлежность к workspace
group_id - группировка таблиц (опционально)
is_reference - справочная таблица или расчетная
reference_type - тип справочника (regions, indicators, etc.)
row_count, column_count - текущие размеры
metadata - дополнительные данные (настройки, конфиг)
2. table_versions
CREATE TABLE table_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES dynamic_tables(id),
  version_number INTEGER NOT NULL,
  columns JSONB NOT NULL, -- [{name, type, width, ...}]
  column_definitions JSONB,
  matrix_formulas JSONB, -- Формулы для всей матрицы
  is_active BOOLEAN DEFAULT false,
  is_frozen BOOLEAN DEFAULT false,
  frozen_at TIMESTAMP,
  change_description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  UNIQUE(table_id, version_number)
);
Версионирование:

Каждая таблица может иметь множество версий
Только одна версия активна (is_active = true)
columns - определения столбцов в JSON
matrix_formulas - формулы, применяемые к диапазонам
3. table_cells
CREATE TABLE table_cells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version_id UUID NOT NULL REFERENCES table_versions(id),
  row_index INTEGER NOT NULL,
  col_index INTEGER NOT NULL,
  cell_data JSONB NOT NULL, -- {value, formula, format, style}
  is_locked BOOLEAN DEFAULT false,
  locked_at TIMESTAMP,
  locked_by UUID REFERENCES users(id),
  lock_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  UNIQUE(version_id, row_index, col_index)
);
Матричное хранение:

Хранятся только заполненные ячейки
cell_data содержит: value, formula, format, style
Поддержка блокировки ячеек
4. table_links
CREATE TABLE table_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_table_id UUID NOT NULL REFERENCES dynamic_tables(id),
  source_table_id UUID REFERENCES dynamic_tables(id),
  source_system_entity VARCHAR(100), -- 'regions', 'indicators', etc.
  link_type VARCHAR(50) NOT NULL, -- 'vertical', 'horizontal', 'formula'
  link_metadata JSONB, -- {filter, mappings, sync_config}
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
Linking система:

Связь с другими таблицами (source_table_id)
Связь со справочниками (source_system_entity)
link_metadata содержит mappings и фильтры
Backend API (Уже Реализовано)
DynamicTablesService Methods
// Table Management
create(workspaceId, dto, userId): Promise<DynamicTable>
findAll(workspaceId, userId, groupId?): Promise<DynamicTable[]>
findById(id, userId): Promise<DynamicTable>
update(id, dto, userId): Promise<DynamicTable>
delete(id, userId): Promise<void>
// Version Management
createVersion(tableId, dto, userId): Promise<TableVersion>
getVersionHistory(tableId, userId): Promise<TableVersion[]>
activateVersion(versionId, userId): Promise<void>
// Cell Operations
getCells(versionId, query, userId): Promise<TableCell[]>
updateCell(versionId, dto, userId): Promise<void>
batchUpdateCells(versionId, dto, userId): Promise<{updatedCount: number}>
deleteRow(versionId, index, userId): Promise<void>
deleteColumn(versionId, index, userId): Promise<void>
insertRow(versionId, index, userId): Promise<void>
insertColumn(versionId, index, userId): Promise<void>
// Linking & Sync
createLink(targetTableId, dto, userId): Promise<TableLink>
syncLinkData(linkId, userId): Promise<void>
updateMatrixFormulas(versionId, formulas, userId): Promise<void>
Reference Data Services
// RegionsService
findAll(filters): Promise<Region[]>
// SportsService  
findAll(filters): Promise<Sport[]>
// IndicatorsService
findAll(filters): Promise<Indicator[]>
// IndicatorGroupsService
findAll(filters): Promise<IndicatorGroup[]>
FormulaService (Уже Реализовано)
@Injectable()
export class FormulaService {
  evaluate(formula: string, context: any): any
  validateFormula(formula: string): boolean
  getDependencies(formula: string): string[]
}
Архитектура Frontend
FSD Структура (Полная)
apps/web/src/
├── shared/
│   ├── api/
│   │   ├── client.ts                    # Axios instance
│   │   ├── tables.ts                    # Tables API
│   │   ├── references.ts                # Reference data API
│   │   ├── templates.ts                 # Templates API
│   │   └── index.ts
│   ├── types/
│   │   ├── table.types.ts               # DynamicTable, TableVersion
│   │   ├── cell.types.ts                # CellData, CellFormat
│   │   ├── formula.types.ts             # FormulaAST, CellReference
│   │   ├── reference.types.ts           # ReferenceData, ReferenceLink
│   │   ├── link.types.ts                # TableLink, LinkMetadata
│   │   └── index.ts
│   ├── stores/
│   │   ├── useTableStore.ts             # Главный store таблиц
│   │   ├── useFormulaStore.ts           # Store формул
│   │   ├── useReferenceStore.ts         # Store справочников
│   │   ├── useLinkStore.ts              # Store связей
│   │   └── index.ts
│   ├── lib/
│   │   ├── hyperformula/
│   │   │   ├── engine.ts                # HyperFormula wrapper
│   │   │   ├── functions.ts             # Кастомные функции
│   │   │   ├── crossWorkspace.ts        # Cross-workspace resolver
│   │   │   ├── referenceResolver.ts     # REGION.*, INDICATOR.*
│   │   │   └── index.ts
│   │   ├── matrix/
│   │   │   ├── storage.ts               # Матричное хранение
│   │   │   ├── serializer.ts            # Сериализация
│   │   │   ├── transformer.ts           # Трансформации
│   │   │   └── index.ts
│   │   ├── agGrid/
│   │   │   ├── cellRenderers.ts         # Кастомные рендереры
│   │   │   ├── cellEditors.ts           # Кастомные редакторы
│   │   │   ├── valueFormatters.ts       # Форматтеры
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── cellUtils.ts             # Утилиты для ячеек
│   │       ├── columnUtils.ts           # Утилиты для столбцов
│   │       └── index.ts
│   └── ui/
│       ├── LoadingSpinner/
│       ├── ErrorBoundary/
│       └── index.ts
├── entities/
│   ├── table/
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── TableCard.tsx            # Карточка таблицы
│   │       └── index.ts
│   └── cell/
│       ├── model/
│       │   └── types.ts
│       └── ui/
│           ├── CellValue.tsx            # Отображение значения
│           └── index.ts
├── features/
│   ├── table-create/
│   │   ├── ui/
│   │   │   ├── CreateTableButton.tsx
│   │   │   └── CreateTableModal.tsx
│   │   └── model/
│   │       └── useCreateTable.ts
│   ├── table-edit/
│   │   ├── ui/
│   │   │   ├── EditTableButton.tsx
│   │   │   └── EditTableModal.tsx
│   │   └── model/
│   │       └── useEditTable.ts
│   ├── cell-edit/
│   │   ├── ui/
│   │   │   ├── CellEditor.tsx
│   │   │   └── FormulaEditor.tsx
│   │   └── model/
│   │       └── useCellEdit.ts
│   ├── reference-link/
│   │   ├── ui/
│   │   │   ├── LinkButton.tsx
│   │   │   ├── LinkModal.tsx
│   │   │   └── ReferenceSelector.tsx
│   │   └── model/
│   │       └── useReferenceLink.ts
│   └── formula-insert/
│       ├── ui/
│       │   ├── FormulaBar.tsx
│       │   └── FunctionPicker.tsx
│       └── model/
│           └── useFormulaInsert.ts
└── widgets/
    ├── DynamicTable/
    │   ├── ui/
    │   │   ├── DynamicTable.tsx         # Главный компонент
    │   │   ├── TableToolbar.tsx         # Панель инструментов
    │   │   ├── TableGrid.tsx            # ag-Grid обертка
    │   │   ├── TableHeader.tsx          # Заголовок таблицы
    │   │   ├── ContextMenu.tsx          # Контекстное меню
    │   │   ├── FrozenPane.tsx           # Фиксированные панели
    │   │   └── index.ts
    │   ├── model/
    │   │   ├── useTableViewModel.ts     # View model
    │   │   ├── useTableActions.ts       # Actions
    │   │   └── index.ts
    │   └── index.ts
    ├── TableTabs/
    │   ├── ui/
    │   │   ├── TableTabs.tsx
    │   │   ├── TabItem.tsx
    │   │   └── AddTabButton.tsx
    │   └── model/
    │       └── useTabsState.ts
    ├── TableCreationWizard/
    │   ├── ui/
    │   │   ├── WizardModal.tsx
    │   │   ├── Step1_Type.tsx           # Выбор типа
    │   │   ├── Step2_Template.tsx       # Выбор темплейта
    │   │   ├── Step3_Vertical.tsx       # Вертикальные данные
    │   │   ├── Step4_Horizontal.tsx     # Горизонтальные данные
    │   │   ├── Step5_Preview.tsx        # Предпросмотр
    │   │   └── index.ts
    │   └── model/
    │       ├── useWizardState.ts
    │       └── index.ts
    └── TableNotification/
        ├── ui/
        │   └── TableNotification.tsx
        └── model/
            └── useNotifications.ts
Детальный План Реализации
Шаг 0: Подготовка и Установка (2-3 часа)
0.1 Установка Зависимостей
# ag-Grid
pnpm add ag-grid-react ag-grid-community -w
# ag-Grid Enterprise (опционально, для advanced features)
pnpm add ag-grid-enterprise -w
# HyperFormula
pnpm add hyperformula -w
# Дополнительные утилиты
pnpm add lodash-es date-fns -w
pnpm add -D @types/lodash-es -w
0.2 Проверка React Version
# Проверить текущую версию
cat apps/web/package.json | grep react
# Если нужно обновить до React 19
pnpm add react@19 react-dom@19 -w
pnpm add -D @types/react@19 @types/react-dom@19 -w
0.3 Настройка Backend Type Autogeneration
// scripts/generate-types.ts
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);
async function generateTypes() {
  // Генерация типов из Kysely schema
  await execAsync('pnpm --filter @elbruso/api run generate:types');
  
  // Копирование типов в web app
  await execAsync('cp apps/api/src/generated/types.ts apps/web/src/shared/types/generated.ts');
}
generateTypes();
0.4 Создание FSD Структуры
# Создать директории
mkdir -p apps/web/src/shared/{api,types,stores,lib/{hyperformula,matrix,agGrid,utils}}
mkdir -p apps/web/src/entities/{table,cell}/{model,ui}
mkdir -p apps/web/src/features/{table-create,table-edit,cell-edit,reference-link,formula-insert}/{ui,model}
mkdir -p apps/web/src/widgets/{DynamicTable,TableTabs,TableCreationWizard,TableNotification}/{ui,model}
Шаг 1: Shared Layer - API & Types (3-4 часа)
1.1 Types Definition
// shared/types/enums.ts - Shared Type Definitions
export type SystemEntityType = 'regions' | 'sports' | 'indicators' | 'indicator-groups' | 'organizations' | 'events';
export type LinkType = 'vertical' | 'horizontal' | 'formula' | 'reference';
export type FontWeight = 'normal' | 'bold' | 'light' | 'medium' | 'semibold';
export type FontStyle = 'normal' | 'italic' | 'oblique';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type CellFormatType = 'number' | 'currency' | 'percentage' | 'date' | 'time' | 'datetime' | 'text' | 'boolean';
export type ColumnType = 'string' | 'number' | 'boolean' | 'date' | 'formula' | 'reference';
export type ValidationRuleType = 'required' | 'min' | 'max' | 'pattern' | 'custom' | 'unique';
export type ReferenceScope = 'global' | 'sport' | 'organization' | 'user';
// HyperFormula types
export interface FormulaAST {
  args: FormulaAST[];
  type: string;
  value?: string | number | boolean;
}
export interface FormulaState {
  sheet: number;
  row: number;
  col: number;
}
// shared/types/table.types.ts
import type { 
  ColumnType, 
  ValidationRuleType, 
  LinkType 
} from './enums';
export interface DynamicTable {
  id: string;
  workspace_id: string;
  group_id?: string;
  name: string;
  description?: string;
  is_active: boolean;
  is_reference: boolean;
  reference_type?: string;
  row_count: number;
  column_count: number;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  created_by: string;
  activeVersion?: TableVersion;
}
export interface TableVersion {
  id: string;
  table_id: string;
  version_number: number;
  columns: ColumnDefinition[];
  column_definitions?: Record<string, any>;
  matrix_formulas?: MatrixFormula[];
  is_active: boolean;
  is_frozen: boolean;
  frozen_at?: string;
  change_description?: string;
  created_at: string;
  created_by: string;
}
export interface ColumnDefinition {
  name: string;
  type: ColumnType;
  width: number;
  editable?: boolean;
  frozen?: boolean;
  format?: string;
  validation?: ValidationRule;
}
export interface ValidationRule {
  type: ValidationRuleType;
  value: any;
  message: string;
}
export interface MatrixFormula {
  range: CellRange;
  formula: string;
  description?: string;
}
export interface CellRange {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}
// shared/types/cell.types.ts
import type {
  CellFormatType,
  FontWeight,
  FontStyle,
  TextAlign,
} from './enums';
export interface CellData {
  value?: any;
  formula?: string;
  format?: CellFormat;
  style?: CellStyle;
  validation?: ValidationResult;
  metadata?: Record<string, any>;
}
export interface CellFormat {
  type: CellFormatType;
  decimals?: number;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
}
export interface CellStyle {
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  textAlign?: TextAlign;
  border?: BorderStyle;
  fontSize?: number;
  fontFamily?: string;
}
export interface BorderStyle {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}
export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}
export interface TableCell {
  id: string;
  version_id: string;
  row_index: number;
  col_index: number;
  cell_data: CellData;
  is_locked: boolean;
  locked_at?: string;
  locked_by?: string;
  lock_reason?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}
// shared/types/link.types.ts
import type {
  SystemEntityType,
  LinkType,
} from './enums';
export interface TableLink {
  id: string;
  target_table_id: string;
  source_table_id?: string;
  source_system_entity?: SystemEntityType;
  link_type: LinkType;
  link_metadata: LinkMetadata;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
export interface LinkMetadata {
  filter?: Record<string, any>;
  mappings: FieldMapping[];
  sync_config?: SyncConfig;
}
export interface FieldMapping {
  sourceField: string;
  targetColIndex: number;
  transform?: string; // функция трансформации
}
export interface SyncConfig {
  auto: boolean;
  interval?: number; // минуты
  onUpdate?: boolean;
}
// shared/types/reference.types.ts
import type {
  SystemEntityType,
  ReferenceScope,
} from './enums';
export interface ReferenceData {
  id: string;
  type: SystemEntityType;
  scope: ReferenceScope;
  sport_id?: string;
  organization_id?: string;
  user_id?: string;
  data: any[];
}
// shared/types/index.ts
export * from './enums';
export * from './table.types';
export * from './cell.types';
export * from './link.types';
export * from './reference.types';
1.2 API Client
// shared/api/endpoints.ts - API Endpoints Constants
export const API_ENDPOINTS = {
  // Workspaces
  WORKSPACE_TABLES: (workspaceId: string) => `/workspaces/${workspaceId}/tables`,
  
  // Tables
  TABLE: (id: string) => `/tables/${id}`,
  TABLE_VERSIONS: (tableId: string) => `/tables/${tableId}/versions`,
  TABLE_LINKS: (tableId: string) => `/tables/${tableId}/links`,
  
  // Versions
  VERSION_ACTIVATE: (versionId: string) => `/versions/${versionId}/activate`,
  VERSION_CELLS: (versionId: string) => `/versions/${versionId}/cells`,
  VERSION_CELLS_BATCH: (versionId: string) => `/versions/${versionId}/cells/batch`,
  VERSION_FORMULAS: (versionId: string) => `/versions/${versionId}/formulas`,
  VERSION_ROW: (versionId: string, index: number) => `/versions/${versionId}/rows/${index}`,
  VERSION_COLUMN: (versionId: string, index: number) => `/versions/${versionId}/columns/${index}`,
  
  // Links
  LINK_SYNC: (linkId: string) => `/links/${linkId}/sync`,
  
  // Reference
  REFERENCE_REGIONS: '/reference/regions',
  REFERENCE_SPORTS: '/reference/sports',
  REFERENCE_INDICATORS: '/reference/indicators',
  REFERENCE_INDICATOR_GROUPS: '/reference/indicator-groups',
} as const;
// shared/types/api.types.ts - API Request/Response Types
export interface CellUpdate {
  row: number;
  col: number;
  data: CellData;
}
export interface BatchUpdateResponse {
  updatedCount: number;
}
export interface CreateTableDto {
  name: string;
  description?: string;
  groupId?: string;
  initialRows?: number;
  initialColumns?: number;
}
export interface UpdateTableDto {
  name?: string;
  description?: string;
  groupId?: string;
}
export interface CreateVersionDto {
  columnDefinitions: ColumnDefinition[];
  copyDataFromVersion?: string;
  changeDescription?: string;
}
export interface UpdateCellDto {
  rowIndex: number;
  colIndex: number;
  cellData: CellData;
}
export interface GetCellsQueryDto {
  startRow?: number;
  endRow?: number;
  startCol?: number;
  endCol?: number;
}
export interface CreateLinkDto {
  sourceTableId?: string;
  sourceSystemEntity?: SystemEntityType;
  linkType: LinkType;
  metadata?: LinkMetadata;
}
export interface MatrixFormulaDto {
  range: CellRange;
  formula: string;
  description?: string;
}
// shared/api/tables.ts
import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import type { 
  DynamicTable, 
  TableVersion, 
  TableCell,
  TableLink,
  CreateTableDto,
  UpdateTableDto,
  CreateVersionDto,
  UpdateCellDto,
  GetCellsQueryDto,
  CreateLinkDto,
  MatrixFormulaDto,
  BatchUpdateResponse,
} from '../types';
export const tablesApi = {
  // Tables CRUD
  create: async (workspaceId: string, dto: CreateTableDto): Promise<DynamicTable> => {
    const response = await apiClient.post(API_ENDPOINTS.WORKSPACE_TABLES(workspaceId), dto);
    return response.data;
  },
  getAll: async (workspaceId: string, groupId?: string): Promise<DynamicTable[]> => {
    const response = await apiClient.get(API_ENDPOINTS.WORKSPACE_TABLES(workspaceId), {
      params: { groupId },
    });
    return response.data;
  },
  getById: async (id: string): Promise<DynamicTable> => {
    const response = await apiClient.get(API_ENDPOINTS.TABLE(id));
    return response.data;
  },
  update: async (id: string, dto: UpdateTableDto): Promise<DynamicTable> => {
    const response = await apiClient.patch(API_ENDPOINTS.TABLE(id), dto);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.TABLE(id));
  },
  // Versions
  createVersion: async (tableId: string, dto: CreateVersionDto): Promise<TableVersion> => {
    const response = await apiClient.post(API_ENDPOINTS.TABLE_VERSIONS(tableId), dto);
    return response.data;
  },
  getVersionHistory: async (tableId: string): Promise<TableVersion[]> => {
    const response = await apiClient.get(API_ENDPOINTS.TABLE_VERSIONS(tableId));
    return response.data;
  },
  activateVersion: async (versionId: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.VERSION_ACTIVATE(versionId));
  },
  // Cells
  getCells: async (versionId: string, query: GetCellsQueryDto = {}): Promise<TableCell[]> => {
    const response = await apiClient.get(API_ENDPOINTS.VERSION_CELLS(versionId), {
      params: query,
    });
    return response.data;
  },
  updateCell: async (versionId: string, dto: UpdateCellDto): Promise<void> => {
    await apiClient.patch(API_ENDPOINTS.VERSION_CELLS(versionId), dto);
  },
  batchUpdateCells: async (versionId: string, cells: UpdateCellDto[]): Promise<BatchUpdateResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.VERSION_CELLS_BATCH(versionId), { cells });
    return response.data;
  },
  // Row/Column operations
  deleteRow: async (versionId: string, index: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.VERSION_ROW(versionId, index));
  },
  deleteColumn: async (versionId: string, index: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.VERSION_COLUMN(versionId, index));
  },
  insertRow: async (versionId: string, index: number): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.VERSION_ROW(versionId, index));
  },
  insertColumn: async (versionId: string, index: number): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.VERSION_COLUMN(versionId, index));
  },
  // Links
  createLink: async (tableId: string, dto: CreateLinkDto): Promise<TableLink> => {
    const response = await apiClient.post(API_ENDPOINTS.TABLE_LINKS(tableId), dto);
    return response.data;
  },
  syncLink: async (linkId: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.LINK_SYNC(linkId));
  },
  // Formulas
  updateMatrixFormulas: async (versionId: string, formulas: MatrixFormulaDto[]): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.VERSION_FORMULAS(versionId), { formulas });
  },
};
// shared/api/references.ts
export const referencesApi = {
  getRegions: async (filters?: any): Promise<Region[]> => {
    const response = await apiClient.get('/reference/regions', { params: filters });
    return response.data;
  },
  getSports: async (filters?: any): Promise<Sport[]> => {
    const response = await apiClient.get('/reference/sports', { params: filters });
    return response.data;
  },
  getIndicators: async (filters?: any): Promise<Indicator[]> => {
    const response = await apiClient.get('/reference/indicators', { params: filters });
    return response.data;
  },
  getIndicatorGroups: async (filters?: any): Promise<IndicatorGroup[]> => {
    const response = await apiClient.get('/reference/indicator-groups', { params: filters });
    return response.data;
  },
};
1.3 Zustand Stores
// shared/stores/useTableStore.ts
import { create } from 'zustand';
import { tablesApi } from '../api';
import type { DynamicTable, TableCell, CellData } from '../types';
interface TableStore {
  // State
  tables: DynamicTable[];
  activeTable: DynamicTable | null;
  cells: Map<string, CellData>; // "row_col" -> CellData
  isLoading: boolean;
  error: string | null;
  // Actions
  fetchTables: (workspaceId: string, groupId?: string) => Promise<void>;
  loadTable: (tableId: string) => Promise<void>;
  createTable: (workspaceId: string, dto: CreateTableDto) => Promise<DynamicTable>;
  updateTable: (id: string, dto: UpdateTableDto) => Promise<void>;
  deleteTable: (id: string) => Promise<void>;
  
  // Cell operations
  updateCell: (row: number, col: number, data: CellData) => Promise<void>;
  batchUpdateCells: (updates: CellUpdate[]) => Promise<void>;
  getCellValue: (row: number, col: number) => CellData | undefined;
  
  // Row/Column operations
  insertRow: (index: number) => Promise<void>;
  deleteRow: (index: number) => Promise<void>;
  insertColumn: (index: number) => Promise<void>;
  deleteColumn: (index: number) => Promise<void>;
  
  // Utility
  clearError: () => void;
  reset: () => void;
}
export const useTableStore = create<TableStore>((set, get) => ({
  tables: [],
  activeTable: null,
  cells: new Map(),
  isLoading: false,
  error: null,
  fetchTables: async (workspaceId, groupId) => {
    set({ isLoading: true, error: null });
    try {
      const tables = await tablesApi.getAll(workspaceId, groupId);
      set({ tables, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  loadTable: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const table = await tablesApi.getById(tableId);
      
      if (!table.activeVersion) {
        throw new Error('No active version found');
      }
      const cellsData = await tablesApi.getCells(table.activeVersion.id);
      
      const cellsMap = new Map<string, CellData>();
      cellsData.forEach(cell => {
        const key = `${cell.row_index}_${cell.col_index}`;
        cellsMap.set(key, cell.cell_data);
      });
      set({ 
        activeTable: table, 
        cells: cellsMap, 
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  createTable: async (workspaceId, dto) => {
    set({ isLoading: true, error: null });
    try {
      const table = await tablesApi.create(workspaceId, dto);
      set(state => ({ 
        tables: [...state.tables, table],
        isLoading: false 
      }));
      return table;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updateTable: async (id, dto) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await tablesApi.update(id, dto);
      set(state => ({
        tables: state.tables.map(t => t.id === id ? updated : t),
        activeTable: state.activeTable?.id === id ? updated : state.activeTable,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  deleteTable: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await tablesApi.delete(id);
      set(state => ({
        tables: state.tables.filter(t => t.id !== id),
        activeTable: state.activeTable?.id === id ? null : state.activeTable,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  updateCell: async (row, col, data) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;
    try {
      await tablesApi.updateCell(activeTable.activeVersion.id, {
        rowIndex: row,
        colIndex: col,
        cellData: data,
      });
      // Optimistic update
      const cells = new Map(get().cells);
      cells.set(`${row}_${col}`, data);
      set({ cells });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  batchUpdateCells: async (updates) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;
    try {
      const dtos = updates.map(u => ({
        rowIndex: u.row,
        colIndex: u.col,
        cellData: u.data,
      }));
      await tablesApi.batchUpdateCells(activeTable.activeVersion.id, dtos);
      // Optimistic update
      const cells = new Map(get().cells);
      updates.forEach(u => {
        cells.set(`${u.row}_${u.col}`, u.data);
      });
      set({ cells });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  getCellValue: (row, col) => {
    return get().cells.get(`${row}_${col}`);
  },
  insertRow: async (index) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;
    try {
      await tablesApi.insertRow(activeTable.activeVersion.id, index);
      // Reload table to get updated data
      await get().loadTable(activeTable.id);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  deleteRow: async (index) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;
    try {
      await tablesApi.deleteRow(activeTable.activeVersion.id, index);
      await get().loadTable(activeTable.id);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  insertColumn: async (index) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;
    try {
      await tablesApi.insertColumn(activeTable.activeVersion.id, index);
      await get().loadTable(activeTable.id);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  deleteColumn: async (index) => {
    const { activeTable } = get();
    if (!activeTable?.activeVersion) return;
    try {
      await tablesApi.deleteColumn(activeTable.activeVersion.id, index);
      await get().loadTable(activeTable.id);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  clearError: () => set({ error: null }),
  reset: () => set({ tables: [], activeTable: null, cells: new Map(), error: null }),
}));
Шаг 2: HyperFormula Integration (4-5 часов)
2.1 HyperFormula Engine Wrapper
// shared/lib/hyperformula/engine.ts
import { HyperFormula, ConfigParams } from 'hyperformula';
import type { CellData } from '../../types';
export class TableFormulaEngine {
  private hf: HyperFormula;
  private sheetMap: Map<string, number> = new Map();
  private cellListeners: Map<string, Set<(value: any) => void>> = new Map();
  constructor(config?: Partial<ConfigParams>) {
    this.hf = HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3',
      ...config,
    });
  }
  /**
   * Добавить таблицу в движок
   */
  addTable(tableId: string, data: CellData[][]): void {
    const sheetName = `TABLE_${tableId}`;
    const sheetId = this.hf.addSheet(sheetName);
    this.sheetMap.set(tableId, sheetId);
    // Заполнить ячейки
    data.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        this.setCellContent(tableId, rowIdx, colIdx, cell);
      });
    });
  }
  /**
   * Удалить таблицу
   */
  removeTable(tableId: string): void {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId !== undefined) {
      this.hf.removeSheet(sheetId);
      this.sheetMap.delete(tableId);
    }
  }
  /**
   * Установить содержимое ячейки
   */
  setCellContent(tableId: string, row: number, col: number, cell: CellData): void {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return;
    const address = { sheet: sheetId, row, col };
    if (cell.formula) {
      this.hf.setCellContents(address, cell.formula);
    } else if (cell.value !== undefined && cell.value !== null) {
      this.hf.setCellContents(address, cell.value);
    } else {
      this.hf.setCellContents(address, null);
    }
  }
  /**
   * Получить значение ячейки (вычисленное)
   */
  getCellValue(tableId: string, row: number, col: number): any {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return null;
    return this.hf.getCellValue({ sheet: sheetId, row, col });
  }
  /**
   * Получить формулу ячейки
   */
  getCellFormula(tableId: string, row: number, col: number): string | null {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return null;
    const formula = this.hf.getCellFormula({ sheet: sheetId, row, col });
    return formula || null;
  }
  /**
   * Валидация формулы
   */
  validateFormula(formula: string): { isValid: boolean; error?: string } {
    try {
      // Попытка парсинга
      const tempSheetId = this.hf.addSheet('TEMP_VALIDATION');
      this.hf.setCellContents({ sheet: tempSheetId, row: 0, col: 0 }, formula);
      
      const value = this.hf.getCellValue({ sheet: tempSheetId, row: 0, col: 0 });
      this.hf.removeSheet(tempSheetId);
      if (value instanceof Error) {
        return { isValid: false, error: value.message };
      }
      return { isValid: true };
    } catch (error) {
      return { isValid: false, error: (error as Error).message };
    }
  }
  /**
   * Получить зависимости формулы
   */
  getDependencies(tableId: string, row: number, col: number): Array<{tableId: string; row: number; col: number}> {
    const sheetId = this.sheetMap.get(tableId);
    if (sheetId === undefined) return [];
    const deps = this.hf.getCellDependencies({ sheet: sheetId, row, col });
    
    return deps.map(dep => {
      const depTableId = Array.from(this.sheetMap.entries())
        .find(([, id]) => id === dep.sheet)?.[0];
      
      return {
        tableId: depTableId || '',
        row: dep.row,
        col: dep.col,
      };
    });
  }
  /**
   * Пересчитать все формулы
   */
  recalculate(): void {
    this.hf.rebuildAndRecalculate();
  }
  /**
   * Подписаться на изменения ячейки
   */
  subscribe(tableId: string, row: number, col: number, callback: (value: any) => void): () => void {
    const key = `${tableId}_${row}_${col}`;
    
    if (!this.cellListeners.has(key)) {
      this.cellListeners.set(key, new Set());
    }
    
    this.cellListeners.get(key)!.add(callback);
    // Вернуть функцию отписки
    return () => {
      this.cellListeners.get(key)?.delete(callback);
    };
  }
  /**
   * Уведомить подписчиков об изменении
   */
  private notifyListeners(tableId: string, row: number, col: number): void {
    const key = `${tableId}_${row}_${col}`;
    const value = this.getCellValue(tableId, row, col);
    
    this.cellListeners.get(key)?.forEach(callback => callback(value));
  }
}
2.2 Custom Functions
// shared/lib/hyperformula/functions.ts
import { FunctionPlugin, FunctionPluginDefinition } from 'hyperformula';
/**
 * Кастомная функция WORKSPACE для cross-workspace ссылок
 * Использование: =WORKSPACE("workspace_id", "table_name", "A1")
 */
export class WorkspaceFunction extends FunctionPlugin implements FunctionPluginDefinition {
  workspaceDataFetcher?: (workspaceId: string, tableName: string, cellRef: string) => Promise<any>;
  constructor(workspaceDataFetcher?: (workspaceId: string, tableName: string, cellRef: string) => Promise<any>) {
    super();
    this.workspaceDataFetcher = workspaceDataFetcher;
  }
  WORKSPACE(ast: FormulaAST, state: FormulaState): number | string | boolean {
    const workspaceId = this.evaluateAst(ast.args[0], state) as string;
    const tableName = this.evaluateAst(ast.args[1], state) as string;
    const cellRef = this.evaluateAst(ast.args[2], state) as string;
    // В реальности нужно async, но HyperFormula синхронный
    // Решение: кэшировать данные заранее
    return this.getCachedWorkspaceValue(workspaceId, tableName, cellRef);
  }
  private getCachedWorkspaceValue(workspaceId: string, tableName: string, cellRef: string): number | string | boolean {
    // Реализация кэша
    return 0; // placeholder
  }
}
/**
 * Функции для работы со справочниками
 * REGION.POPULATION("77") - население Москвы
 * INDICATOR.WEIGHT("IND_001") - вес индикатора
 */
export class ReferenceFunction extends FunctionPlugin implements FunctionPluginDefinition {
  private referenceCache: Map<string, number | string> = new Map();
  REGION_POPULATION(ast: FormulaAST, state: FormulaState): number {
    const regionCode = this.evaluateAst(ast.args[0], state) as string;
    const cached = this.referenceCache.get(`region_pop_${regionCode}`);
    return typeof cached === 'number' ? cached : 0;
  }
  REGION_NAME(ast: FormulaAST, state: FormulaState): string {
    const regionCode = this.evaluateAst(ast.args[0], state) as string;
    const cached = this.referenceCache.get(`region_name_${regionCode}`);
    return typeof cached === 'string' ? cached : '';
  }
  INDICATOR_WEIGHT(ast: FormulaAST, state: FormulaState): number {
    const indicatorCode = this.evaluateAst(ast.args[0], state) as string;
    const cached = this.referenceCache.get(`indicator_weight_${indicatorCode}`);
    return typeof cached === 'number' ? cached : 0;
  }
  updateReferenceCache(key: string, value: number | string): void {
    this.referenceCache.set(key, value);
  }
}
Шаг 3: ag-Grid Integration (4-5 часов)
3.1 DynamicTable Component
// widgets/DynamicTable/ui/DynamicTable.tsx
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useTableStore } from '@/shared/stores';
import { TableFormulaEngine } from '@/shared/lib/hyperformula';
import { TableToolbar } from './TableToolbar';
import { FormulaBar } from './FormulaBar';
import type { CellData } from '@/shared/types';
interface DynamicTableProps {
  tableId: string;
  workspaceId: string;
}
export function DynamicTable({ tableId, workspaceId }: DynamicTableProps) {
  const { 
    activeTable, 
    cells, 
    loadTable, 
    updateCell,
    isLoading 
  } = useTableStore();
  const [formulaEngine] = useState(() => new TableFormulaEngine());
  const [selectedCell, setSelectedCell] = useState<{row: number; col: number} | null>(null);
  
  const gridRef = useRef<AgGridReact>(null);
  // Загрузить таблицу при монтировании
  useEffect(() => {
    loadTable(tableId);
  }, [tableId, loadTable]);
  // Синхронизировать с HyperFormula
  useEffect(() => {
    if (!activeTable || !cells) return;
    const data: CellData[][] = [];
    for (let row = 0; row < activeTable.row_count; row++) {
      data[row] = [];
      for (let col = 0; col < activeTable.column_count; col++) {
        const cellData = cells.get(`${row}_${col}`) || {};
        data[row][col] = cellData;
      }
    }
    formulaEngine.addTable(tableId, data);
  }, [activeTable, cells, tableId, formulaEngine]);
  // Column definitions
  const columnDefs = useMemo<ColDef[]>(() => {
    if (!activeTable?.activeVersion) return [];
    const columns = activeTable.activeVersion.columns;
    
    return columns.map((col, idx) => ({
      field: `col_${idx}`,
      headerName: col.name,
      width: col.width || 150,
      editable: col.editable !== false,
      pinned: col.frozen ? 'left' : undefined,
      cellEditor: 'agTextCellEditor',
      valueGetter: (params) => {
        const row = params.node.rowIndex!;
        const cellData = cells.get(`${row}_${idx}`);
        
        if (cellData?.formula) {
          return formulaEngine.getCellValue(tableId, row, idx);
        }
        
        return cellData?.value;
      },
      valueSetter: (params) => {
        const row = params.node.rowIndex!;
        const newValue = params.newValue;
        
        const cellData: CellData = {
          value: newValue,
        };
        
        updateCell(row, idx, cellData);
        return true;
      },
    }));
  }, [activeTable, cells, tableId, formulaEngine, updateCell]);
  // Row data
  const rowData = useMemo(() => {
    if (!activeTable) return [];
    return Array.from({ length: activeTable.row_count }, (_, rowIdx) => {
      const row: Record<string, any> = {};
      
      for (let colIdx = 0; colIdx < activeTable.column_count; colIdx++) {
        row[`col_${colIdx}`] = cells.get(`${rowIdx}_${colIdx}`)?.value || '';
      }
      
      return row;
    });
  }, [activeTable, cells]);
  // Handle cell selection
  const onCellClicked = (event: any) => {
    setSelectedCell({
      row: event.rowIndex,
      col: parseInt(event.column.getColId().split('_')[1]),
    });
  };
  if (isLoading) {
    return <div className=\"flex items-center justify-center h-full\">Loading...</div>;
  }
  if (!activeTable) {
    return <div className=\"flex items-center justify-center h-full\">Table not found</div>;
  }
  return (
    <div className=\"flex flex-col h-full\">
      <TableToolbar tableId={tableId} />
      
      {selectedCell && (
        <FormulaBar 
          tableId={tableId}
          row={selectedCell.row}
          col={selectedCell.col}
          formulaEngine={formulaEngine}
        />
      )}
      <div className=\"flex-1 ag-theme-alpine\">
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          enableRangeSelection={true}
          enableFillHandle={true}
          undoRedoCellEditing={true}
          suppressMenuHide={true}
          onCellClicked={onCellClicked}
          onCellValueChanged={(event) => {
            // Пересчитать формулы
            formulaEngine.recalculate();
            // Обновить grid
            gridRef.current?.api.refreshCells();
          }}
        />
      </div>
    </div>
  );
}
Продолжение следует...
Это первая часть детального плана. План содержит:

✅ Полный анализ backend
✅ Детальная архитектура FSD
✅ Шаг 0: Подготовка (полностью)
✅ Шаг 1: API & Types (полностью)
✅ Шаг 2: HyperFormula (полностью)
✅ Шаг 3: ag-Grid (начало)
Следующие разделы:

Шаг 4: Reference Data Linking
Шаг 5: Advanced Features
Шаг 6: Templates System
Шаг 7: Cell Merging & Grouping
Шаг 8: Table Tabs
Шаг 9: Testing & Polish
Общий объем плана: ~150+ страниц кода и документации

Продолжить с остальными шагами?


Phase 4 Plan - Анализ и Улучшения
Обнаруженные Несоответствия и Пробелы
1. ❌ Reference Data API - Неполная Реализация
Проблема:

// shared/api/references.ts
export const referencesApi = {
  getRegions: async (filters?: any) => {...}
  // Только GET методы, нет CRUD
}
Отсутствует:

Создание кастомных справочников
Обновление справочных данных
Удаление справочников
Управление scope (global/sport/org/user)
Решение:

export const referencesApi = {
  // Read
  getRegions: (filters?: ReferenceFilter) => Promise<Region[]>,
  getSports: (filters?: ReferenceFilter) => Promise<Sport[]>,
  getIndicators: (filters?: ReferenceFilter) => Promise<Indicator[]>,
  
  // Create custom reference
  createCustomReference: (dto: CreateReferenceDto) => Promise<ReferenceData>,
  
  // Update
  updateReference: (id: string, dto: UpdateReferenceDto) => Promise<ReferenceData>,
  
  // Delete
  deleteReference: (id: string) => Promise<void>,
  
  // Scope management
  getReferencesByScope: (scope: ReferenceScope, entityId?: string) => Promise<ReferenceData[]>,
};
2. ❌ WebSocket Integration - Отсутствует
Проблема: План упоминает "Real-time Updates" и "EventEmitter", но нет реализации WebSocket.

Отсутствует:

WebSocket connection setup
Real-time cell updates
Collaborative editing
Presence indicators
Conflict resolution
Решение:

// shared/lib/websocket/tableSocket.ts
export class TableWebSocket {
  private socket: WebSocket;
  private listeners: Map<string, Set<(data: any) => void>>;
  
  connect(tableId: string): void {
    this.socket = new WebSocket(`ws://localhost:7100/tables/${tableId}`);
    
    this.socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      this.emit(type, data);
    };
  }
  
  onCellUpdate(callback: (update: CellUpdate) => void): () => void {
    return this.on('cell:update', callback);
  }
  
  onUserPresence(callback: (users: User[]) => void): () => void {
    return this.on('presence:update', callback);
  }
  
  sendCellUpdate(update: CellUpdate): void {
    this.socket.send(JSON.stringify({
      type: 'cell:update',
      data: update,
    }));
  }
}
3. ❌ Template System - Не Реализован
Проблема: План упоминает templates, но нет кода реализации.

Отсутствует:

Template CRUD API
Template structure definition
Template application logic
Template inheritance (sport → org → user)
Решение:

// shared/types/template.types.ts
export interface TableTemplate {
  id: string;
  name: string;
  description?: string;
  scope: ReferenceScope;
  sport_id?: string;
  organization_id?: string;
  user_id?: string;
  structure: TemplateStructure;
  preview_image?: string;
  is_active: boolean;
  created_at: string;
  created_by: string;
}
export interface TemplateStructure {
  columns: ColumnDefinition[];
  initial_rows: number;
  frozen_rows?: number;
  frozen_cols?: number;
  merged_cells?: MergedCell[];
  default_links?: TemplateLinkConfig[];
  default_formulas?: TemplateFormulaConfig[];
}
// shared/api/templates.ts
export const templatesApi = {
  getAll: (scope?: ReferenceScope) => Promise<TableTemplate[]>,
  getById: (id: string) => Promise<TableTemplate>,
  create: (dto: CreateTemplateDto) => Promise<TableTemplate>,
  update: (id: string, dto: UpdateTemplateDto) => Promise<TableTemplate>,
  delete: (id: string) => Promise<void>,
  applyTemplate: (templateId: string, workspaceId: string) => Promise<DynamicTable>,
};
4. ❌ Cell Merging - Не Реализовано
Проблема: План упоминает merged cells, но нет реализации.

Отсутствует:

MergedCell type definition
Merge/unmerge API
ag-Grid integration для merged cells
Rendering logic
Решение:

// shared/types/cell.types.ts
export interface MergedCell {
  id: string;
  version_id: string;
  start_row: number;
  start_col: number;
  end_row: number;
  end_col: number;
  cell_data: CellData;
  created_at: string;
}
// shared/api/tables.ts
export const tablesApi = {
  // ... existing methods
  
  // Merged cells
  mergeCells: (versionId: string, range: CellRange) => Promise<MergedCell>,
  unmergeCells: (versionId: string, mergedCellId: string) => Promise<void>,
  getMergedCells: (versionId: string) => Promise<MergedCell[]>,
};
// widgets/DynamicTable/ui/DynamicTable.tsx
const gridOptions = {
  // ... existing options
  
  // Merged cells support
  spanHeaderHeight: true,
  suppressFieldDotNotation: true,
  
  // Custom cell renderer для merged cells
  cellRenderer: (params) => {
    const mergedCell = getMergedCellAt(params.rowIndex, params.colIndex);
    if (mergedCell) {
      return <MergedCellRenderer cell={mergedCell} />;
    }
    return params.value;
  },
};
5. ❌ Cross-Workspace Formula Resolver - Неполный
Проблема:

WORKSPACE(ast: FormulaAST, state: FormulaState): number | string | boolean {
  return this.getCachedWorkspaceValue(workspaceId, tableName, cellRef);
}
private getCachedWorkspaceValue(...): number | string | boolean {
  return 0; // placeholder
}
Отсутствует:

Реальная реализация кэша
Загрузка данных из других workspace
Обновление кэша
Permissions check
Решение:

// shared/lib/hyperformula/crossWorkspace.ts
export class CrossWorkspaceResolver {
  private cache: Map<string, CachedWorkspaceData> = new Map();
  private tablesApi: typeof tablesApi;
  
  constructor(tablesApi: typeof tablesApi) {
    this.tablesApi = tablesApi;
  }
  
  async loadWorkspaceData(workspaceId: string, tableName: string): Promise<void> {
    const tables = await this.tablesApi.getAll(workspaceId);
    const table = tables.find(t => t.name === tableName);
    
    if (!table?.activeVersion) {
      throw new Error(`Table ${tableName} not found in workspace ${workspaceId}`);
    }
    
    const cells = await this.tablesApi.getCells(table.activeVersion.id);
    
    const cacheKey = `${workspaceId}_${tableName}`;
    this.cache.set(cacheKey, {
      table,
      cells: new Map(cells.map(c => [`${c.row_index}_${c.col_index}`, c.cell_data])),
      loadedAt: new Date(),
    });
  }
  
  getCellValue(workspaceId: string, tableName: string, cellRef: string): any {
    const cacheKey = `${workspaceId}_${tableName}`;
    const cached = this.cache.get(cacheKey);
    
    if (!cached) {
      console.warn(`Workspace ${workspaceId} table ${tableName} not loaded`);
      return null;
    }
    
    const { row, col } = parseCellRef(cellRef); // "A1" -> {row: 0, col: 0}
    return cached.cells.get(`${row}_${col}`)?.value;
  }
  
  invalidateCache(workspaceId: string, tableName?: string): void {
    if (tableName) {
      this.cache.delete(`${workspaceId}_${tableName}`);
    } else {
      // Invalidate all tables in workspace
      Array.from(this.cache.keys())
        .filter(key => key.startsWith(`${workspaceId}_`))
        .forEach(key => this.cache.delete(key));
    }
  }
}
6. ❌ Error Handling - Недостаточно
Проблема:

try {
  const tables = await tablesApi.getAll(workspaceId);
  set({ tables, isLoading: false });
} catch (error) {
  set({ error: (error as Error).message, isLoading: false });
}
Отсутствует:

Типизация ошибок
Retry logic
Offline handling
User-friendly error messages
Error recovery strategies
Решение:

// shared/types/error.types.ts
export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONFLICT = 'CONFLICT',
  SERVER_ERROR = 'SERVER_ERROR',
}
export interface AppError {
  code: ErrorCode;
  message: string;
  details?: Record<string, any>;
  retryable: boolean;
}
// shared/lib/errors/errorHandler.ts
export class ErrorHandler {
  static handle(error: unknown): AppError {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      
      switch (status) {
        case 401:
          return {
            code: ErrorCode.UNAUTHORIZED,
            message: 'Необходима авторизация',
            retryable: false,
          };
        case 403:
          return {
            code: ErrorCode.FORBIDDEN,
            message: 'Недостаточно прав',
            retryable: false,
          };
        case 404:
          return {
            code: ErrorCode.NOT_FOUND,
            message: 'Ресурс не найден',
            retryable: false,
          };
        case 409:
          return {
            code: ErrorCode.CONFLICT,
            message: 'Конфликт данных',
            details: error.response?.data,
            retryable: true,
          };
        default:
          return {
            code: ErrorCode.SERVER_ERROR,
            message: 'Ошибка сервера',
            retryable: true,
          };
      }
    }
    
    return {
      code: ErrorCode.NETWORK_ERROR,
      message: 'Ошибка сети',
      retryable: true,
    };
  }
  
  static async retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        const appError = ErrorHandler.handle(error);
        
        if (!appError.retryable || i === maxRetries - 1) {
          throw appError;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
    
    throw new Error('Max retries exceeded');
  }
}
7. ❌ Optimistic Updates - Не Реализовано
Проблема:

updateCell: async (row, col, data) => {
  await tablesApi.updateCell(...);
  // Только после успешного ответа обновляем UI
  const cells = new Map(get().cells);
  cells.set(`${row}_${col}`, data);
  set({ cells });
}
Проблема: UI обновляется только после ответа сервера (медленно).

Решение:

updateCell: async (row, col, data) => {
  // 1. Optimistic update
  const cells = new Map(get().cells);
  const previousValue = cells.get(`${row}_${col}`);
  cells.set(`${row}_${col}`, data);
  set({ cells });
  
  try {
    // 2. Server update
    await tablesApi.updateCell(activeTable.activeVersion.id, {
      rowIndex: row,
      colIndex: col,
      cellData: data,
    });
  } catch (error) {
    // 3. Rollback on error
    const rollbackCells = new Map(get().cells);
    if (previousValue) {
      rollbackCells.set(`${row}_${col}`, previousValue);
    } else {
      rollbackCells.delete(`${row}_${col}`);
    }
    set({ cells: rollbackCells, error: (error as Error).message });
  }
}
8. ❌ Virtualization - Отсутствует
Проблема: ag-Grid без виртуализации для больших таблиц (1000+ строк).

Решение:

const gridOptions = {
  // ... existing options
  
  // Virtualization
  rowModelType: 'infinite',
  cacheBlockSize: 100,
  maxBlocksInCache: 10,
  
  // Lazy loading
  datasource: {
    getRows: async (params) => {
      const startRow = params.startRow;
      const endRow = params.endRow;
      
      const cells = await tablesApi.getCells(versionId, {
        startRow,
        endRow,
      });
      
      params.successCallback(cells, totalRows);
    },
  },
};
9. ❌ Undo/Redo - Не Реализовано
Проблема: План упоминает "Undo/redo system", но нет реализации.

Решение:

// shared/stores/useHistoryStore.ts
interface HistoryEntry {
  action: 'cell_update' | 'row_insert' | 'column_insert' | 'row_delete' | 'column_delete';
  data: any;
  timestamp: Date;
}
export const useHistoryStore = create<HistoryStore>((set, get) => ({
  past: [],
  future: [],
  
  addEntry: (entry: HistoryEntry) => {
    set(state => ({
      past: [...state.past, entry],
      future: [], // Clear future on new action
    }));
  },
  
  undo: async () => {
    const { past, future } = get();
    if (past.length === 0) return;
    
    const entry = past[past.length - 1];
    
    // Revert action
    await revertAction(entry);
    
    set({
      past: past.slice(0, -1),
      future: [entry, ...future],
    });
  },
  
  redo: async () => {
    const { past, future } = get();
    if (future.length === 0) return;
    
    const entry = future[0];
    
    // Reapply action
    await applyAction(entry);
    
    set({
      past: [...past, entry],
      future: future.slice(1),
    });
  },
}));
10. ❌ Keyboard Shortcuts - Отсутствуют
Проблема: Нет упоминания keyboard shortcuts для таблиц.

Решение:

// widgets/DynamicTable/hooks/useKeyboardShortcuts.ts
export function useKeyboardShortcuts(gridRef: RefObject<AgGridReact>) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z - Undo
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        useHistoryStore.getState().undo();
      }
      
      // Ctrl+Y - Redo
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        useHistoryStore.getState().redo();
      }
      
      // Ctrl+C - Copy
      if (e.ctrlKey && e.key === 'c') {
        gridRef.current?.api.copySelectedRangeToClipboard();
      }
      
      // Ctrl+V - Paste
      if (e.ctrlKey && e.key === 'v') {
        // Handle paste
      }
      
      // Delete - Clear cell
      if (e.key === 'Delete') {
        const selectedCells = gridRef.current?.api.getSelectedCells();
        // Clear selected cells
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gridRef]);
}
11. ❌ Accessibility - Не Учтено
Проблема: Нет ARIA labels, keyboard navigation, screen reader support.

Решение:

<div 
  role="grid" 
  aria-label={`Таблица ${activeTable.name}`}
  aria-rowcount={activeTable.row_count}
  aria-colcount={activeTable.column_count}
>
  <AgGridReact
    {...gridOptions}
    onCellFocused={(event) => {
      // Announce cell to screen reader
      announceToScreenReader(
        `Ячейка ${event.column.getColId()} строка ${event.rowIndex + 1}`
      );
    }}
  />
</div>
12. ❌ Testing Strategy - Отсутствует
Проблема: Нет упоминания тестов.

Решение:

// widgets/DynamicTable/__tests__/DynamicTable.test.tsx
describe('DynamicTable', () => {
  it('should render table with correct data', async () => {
    const { getByRole } = render(<DynamicTable tableId="123" />);
    await waitFor(() => {
      expect(getByRole('grid')).toBeInTheDocument();
    });
  });
  
  it('should update cell on edit', async () => {
    const { getByRole } = render(<DynamicTable tableId="123" />);
    const cell = getByRole('gridcell', { name: 'A1' });
    
    fireEvent.doubleClick(cell);
    fireEvent.change(cell, { target: { value: 'New Value' } });
    fireEvent.blur(cell);
    
    await waitFor(() => {
      expect(tablesApi.updateCell).toHaveBeenCalled();
    });
  });
});
13. ❌ Performance Optimization - Недостаточно
Проблема: Нет мемоизации, debouncing, throttling.

Решение:

// Debounce cell updates
const debouncedUpdateCell = useMemo(
  () => debounce((row, col, data) => {
    updateCell(row, col, data);
  }, 300),
  [updateCell]
);
// Memoize column definitions
const columnDefs = useMemo(() => {
  return activeTable?.activeVersion.columns.map(...);
}, [activeTable?.activeVersion.columns]);
// Memoize row data
const rowData = useMemo(() => {
  return Array.from({ length: activeTable.row_count }, ...);
}, [activeTable, cells]);
14. ❌ Migration Strategy - Отсутствует
Проблема: Нет плана миграции существующих данных.

Решение:

// scripts/migrate-tables.ts
async function migrateExistingTables() {
  // 1. Backup existing data
  await backupDatabase();
  
  // 2. Create new table structure
  await createDynamicTablesSchema();
  
  // 3. Migrate data
  const oldTables = await getOldTables();
  for (const oldTable of oldTables) {
    await migrateSingleTable(oldTable);
  }
  
  // 4. Verify migration
  await verifyMigration();
}
15. ❌ Deployment Considerations - Не Учтены
Проблема: Нет упоминания production deployment.

Решение:

Environment variables для API endpoints
Build optimization (code splitting)
CDN для ag-Grid assets
Error monitoring (Sentry)
Analytics (Google Analytics, Mixpanel)
Feature flags для постепенного rollout
Итоговый Список Улучшений
Критические (Must Have)
✅ Реализовать Reference Data CRUD API
✅ Добавить WebSocket для real-time updates
✅ Реализовать Template System
✅ Реализовать Cell Merging
✅ Завершить Cross-Workspace Resolver
✅ Улучшить Error Handling
Важные (Should Have)
✅ Добавить Optimistic Updates
✅ Реализовать Virtualization
✅ Реализовать Undo/Redo
✅ Добавить Keyboard Shortcuts
Желательные (Nice to Have)
✅ Добавить Accessibility
✅ Написать тесты
✅ Оптимизировать Performance
✅ Подготовить Migration Strategy
✅ Учесть Deployment
Применить все улучшения к плану?
