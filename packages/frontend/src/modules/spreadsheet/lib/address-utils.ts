/**
 * Converts column index to A1 notation letter (0 -> A, 1 -> B, ...)
 */
export function indexToColumn(index: number): string {
  let column = '';
  let tempIndex = index;
  while (tempIndex >= 0) {
    column = String.fromCharCode((tempIndex % 26) + 65) + column;
    tempIndex = Math.floor(tempIndex / 26) - 1;
  }
  return column;
}

/**
 * Converts A1 notation letter to column index (A -> 0, B -> 1, ...)
 */
export function columnToIndex(column: string): number {
  let index = 0;
  for (let i = 0; i < column.length; i++) {
    index = index * 26 + column.charCodeAt(i) - 64;
  }
  return index - 1;
}

/**
 * Converts row/col to A1 notation (0,0 -> A1)
 */
export function toA1(row: number, col: number): string {
  return `${indexToColumn(col)}${row + 1}`;
}

/**
 * Parses A1 notation to row/col (A1 -> {row: 0, col: 0})
 */
export function fromA1(address: string): { row: number; col: number } | null {
  const match = address.match(/^([A-Z]+)([0-9]+)$/i);
  if (!match) return null;
  return {
    row: parseInt(match[2], 10) - 1,
    col: columnToIndex(match[1].toUpperCase()),
  };
}
