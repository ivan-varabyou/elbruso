// Table Reference Parser - парсит гибкие ссылки на таблицы
// Поддерживаемые форматы:
// - A1 - ячейка текущей таблицы
// - A1:B5 - диапазон текущей таблицы
// - Sheet1!A1 - ячейка на другом листе/таблице
// - Workspace:Table!A1 - ячейка из таблицы другого воркспейса
// - Workspace:Table!A1:B5 - диапазон

export interface TableReference {
  workspaceId?: string;
  tableId?: string;
  tableName?: string;
  sheetName?: string;
  startCell: string; // A1
  endCell?: string; // B5 (для диапазонов)
  isRange: boolean;
  isCrossWorkspace: boolean;
  isCrossTable: boolean;
  startRow?: number; // Computed row index (0-based)
  startCol?: number; // Computed column index (0-based)
}

export interface ParseResult {
  references: TableReference[];
  formula: string;
  hasErrors: boolean;
  errorMessage?: string;
}

// Парсинг ссылки на таблицу/ячейку
export function parseTableReference(input: string): TableReference | null {
  const trimmed = input.trim();

  // Проверяем формат Workspace:Table!A1 или Workspace:Table!A1:B5
  const crossWorkspaceMatch = trimmed.match(/^([^:]+):([^!]+)!([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)$/);
  if (crossWorkspaceMatch) {
    const [, workspacePart, tablePart, cellPart] = crossWorkspaceMatch;

    // Проверяем, что workspacePart это UUID или название
    const isUuid = /^[0-9a-f-]{36}$/i.test(workspacePart);
    const workspaceId = isUuid ? workspacePart : undefined;
    const workspaceName = isUuid ? undefined : workspacePart;

    return {
      workspaceId: workspaceId,
      tableName: tablePart,
      startCell: cellPart.split(":")[0],
      endCell: cellPart.includes(":") ? cellPart.split(":")[1] : undefined,
      isRange: cellPart.includes(":"),
      isCrossWorkspace: true,
      isCrossTable: true,
    };
  }

  // Проверяем формат Table!A1 или Table!A1:B5 (другая таблица)
  const crossTableMatch = trimmed.match(/^([^!]+)!([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)$/);
  if (crossTableMatch) {
    const [, tablePart, cellPart] = crossTableMatch;

    return {
      tableName: tablePart,
      startCell: cellPart.split(":")[0],
      endCell: cellPart.includes(":") ? cellPart.split(":")[1] : undefined,
      isRange: cellPart.includes(":"),
      isCrossWorkspace: false,
      isCrossTable: true,
    };
  }

  // Проверяем формат Sheet!A1 (другой лист - для будущего использования)
  const sheetMatch = trimmed.match(/^([^!]+)!([A-Z]+[0-9]+)$/);
  if (sheetMatch) {
    return {
      sheetName: sheetMatch[1],
      startCell: sheetMatch[2],
      isRange: false,
      isCrossWorkspace: false,
      isCrossTable: false,
    };
  }

  // Проверяем формат A1 или A1:B5 (текущая таблица)
  const cellMatch = trimmed.match(/^([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)$/);
  if (cellMatch) {
    return {
      startCell: cellMatch[1].split(":")[0],
      endCell: cellMatch[1].includes(":") ? cellMatch[1].split(":")[1] : undefined,
      isRange: cellMatch[1].includes(":"),
      isCrossWorkspace: false,
      isCrossTable: false,
    };
  }

  return null;
}

// Извлечение всех ссылок на таблицы из формулы
export function extractTableReferences(formula: string): TableReference[] {
  const references: TableReference[] = [];

  // Ищем паттерны типа Workspace:Table!A1 или Table!A1
  const pattern =
    /([a-zA-Zа-яА-Я0-9_\-]+(?:\s*:\s*[a-zA-Zа-яА-Я0-9_\-]+)?(?:\s*!\s*)?)([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)/g;

  let match;
  while ((match = pattern.exec(formula)) !== null) {
    const prefix = match[1].trim();
    const cellPart = match[2];

    // Пропускаем стандартные функции Excel (SUM, AVERAGE, etc.)
    const functionNames = [
      "SUM",
      "AVERAGE",
      "MIN",
      "MAX",
      "COUNT",
      "IF",
      "VLOOKUP",
      "HLOOKUP",
      "INDEX",
      "MATCH",
      "CONCATENATE",
      "LEFT",
      "RIGHT",
      "MID",
      "LEN",
      "TRIM",
      "ROUND",
      "ABS",
      "SQRT",
      "POWER",
      "LOG",
      "LN",
      "EXP",
      "PI",
      "TODAY",
      "NOW",
      "YEAR",
      "MONTH",
      "DAY",
      "HOUR",
      "MINUTE",
      "SECOND",
    ];
    if (functionNames.some((fn) => prefix.toUpperCase().includes(fn))) {
      continue;
    }

    let fullRef = prefix;
    if (prefix.includes("!")) {
      fullRef = prefix + cellPart;
    } else if (!/^[A-Z]/.test(prefix) && !/^[0-9]/.test(prefix)) {
      fullRef = prefix + "!" + cellPart;
    } else {
      fullRef = cellPart;
    }

    const ref = parseTableReference(fullRef);
    if (ref && (ref.isCrossTable || ref.isCrossWorkspace)) {
      references.push(ref);
    }
  }

  return references;
}

// Форматирование адреса ячейки
export function formatCellAddress(row: number, col: number): string {
  let colLetter = "";
  let colNum = col;
  while (colNum >= 0) {
    colLetter = String.fromCharCode(65 + (colNum % 26)) + colLetter;
    colNum = Math.floor(colNum / 26) - 1;
  }
  return `${colLetter}${row + 1}`;
}

// Парсинг адреса ячейки (A1 -> row: 0, col: 0)
export function parseCellAddress(address: string): { row: number; col: number } | null {
  const match = address.match(/^([A-Z]+)([0-9]+)$/i);
  if (!match) return null;

  const colLetters = match[1].toUpperCase();
  const rowNum = parseInt(match[2], 10) - 1;

  let col = 0;
  for (let i = 0; i < colLetters.length; i++) {
    col = col * 26 + (colLetters.charCodeAt(i) - 64);
  }

  return { row: rowNum, col: col - 1 };
}

// Проверка корректности адреса
export function isValidCellAddress(address: string): boolean {
  return parseCellAddress(address) !== null;
}

// Проверка корректности диапазона
export function isValidRange(range: string): boolean {
  if (!range.includes(":")) return false;

  const [start, end] = range.split(":");
  const startAddr = parseCellAddress(start);
  const endAddr = parseCellAddress(end);

  if (!startAddr || !endAddr) return false;

  return startAddr.row <= endAddr.row && startAddr.col <= endAddr.col;
}

// Генерация уникального ID для кэша
export function generateCacheKey(ref: TableReference): string {
  const parts: string[] = [];
  if (ref.workspaceId) parts.push(`ws:${ref.workspaceId}`);
  if (ref.tableName) parts.push(`t:${ref.tableName}`);
  if (ref.tableId) parts.push(`id:${ref.tableId}`);
  parts.push(`c:${ref.startCell}`);
  if (ref.endCell) parts.push(`e:${ref.endCell}`);
  return parts.join("|");
}
