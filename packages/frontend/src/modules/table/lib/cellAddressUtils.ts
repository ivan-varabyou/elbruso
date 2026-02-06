export interface CellAddress {
  row: number;
  col: number;
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

export function parseCellAddress(address: string): CellAddress | null {
  const match = address.match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;

  const colStr = match[1];
  const row = parseInt(match[2], 10) - 1;

  let col = 0;
  for (let i = 0; i < colStr.length; i++) {
    col = col * 26 + (colStr.charCodeAt(i) - 64);
  }
  col = col - 1;

  return { row, col };
}

export function getCellRange(start: CellAddress, end: CellAddress): CellAddress[] {
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);
  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);

  const cells: CellAddress[] = [];
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      cells.push({ row, col });
    }
  }
  return cells;
}

export function getSelectedRangeString(start: CellAddress, end: CellAddress): string {
  const startAddr = formatCellAddress(start.row, start.col);
  const endAddr = formatCellAddress(end.row, end.col);
  return startAddr === endAddr ? startAddr : `${startAddr}:${endAddr}`;
}

export function isCellInRange(cell: CellAddress, start: CellAddress, end: CellAddress): boolean {
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);
  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);

  return cell.row >= minRow && cell.row <= maxRow && cell.col >= minCol && cell.col <= maxCol;
}
