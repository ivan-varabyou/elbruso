export interface TableReference {
  workspaceId?: string;
  tableId?: string;
  tableName?: string;
  sheetName?: string;
  startCell: string;
  endCell?: string;
  isRange: boolean;
  isCrossWorkspace: boolean;
  isCrossTable: boolean;
  startRow?: number;
  startCol?: number;
}

export interface ParseResult {
  references: TableReference[];
  formula: string;
  hasErrors: boolean;
  errorMessage?: string;
}

export function parseTableReference(input: string): TableReference | null {
  const trimmed = input.trim();

  const crossWorkspaceMatch = trimmed.match(/^([^:]+):([^!]+)!([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)$/);
  if (crossWorkspaceMatch) {
    const [, workspacePart, tablePart, cellPart] = crossWorkspaceMatch;
    const isUuid = /^[0-9a-f-]{36}$/i.test(workspacePart);
    const workspaceId = isUuid ? workspacePart : undefined;

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

export function extractTableReferences(formula: string): TableReference[] {
  const references: TableReference[] = [];

  const pattern =
    /([a-zA-Zа-яА-Я0-9_\-]+(?:\s*:\s*[a-zA-Zа-яА-Я0-9_\-]+)?(?:\s*!\s*)?)([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)/g;

  let match;
  while ((match = pattern.exec(formula)) !== null) {
    const prefix = match[1].trim();
    const cellPart = match[2];

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

export function formatCellAddress(row: number, col: number): string {
  let colLetter = "";
  let colNum = col;
  while (colNum >= 0) {
    colLetter = String.fromCharCode(65 + (colNum % 26)) + colLetter;
    colNum = Math.floor(colNum / 26) - 1;
  }
  return `${colLetter}${row + 1}`;
}

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

export function isValidCellAddress(address: string): boolean {
  return parseCellAddress(address) !== null;
}

export function isValidRange(range: string): boolean {
  if (!range.includes(":")) return false;

  const [start, end] = range.split(":");
  const startAddr = parseCellAddress(start);
  const endAddr = parseCellAddress(end);

  if (!startAddr || !endAddr) return false;

  return startAddr.row <= endAddr.row && startAddr.col <= endAddr.col;
}

export function generateCacheKey(ref: TableReference): string {
  const parts: string[] = [];
  if (ref.workspaceId) parts.push(`ws:${ref.workspaceId}`);
  if (ref.tableName) parts.push(`t:${ref.tableName}`);
  if (ref.tableId) parts.push(`id:${ref.tableId}`);
  parts.push(`c:${ref.startCell}`);
  if (ref.endCell) parts.push(`e:${ref.endCell}`);
  return parts.join("|");
}
