"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaService = void 0;
const common_1 = require("@nestjs/common");
const hyperformula_1 = require("hyperformula");
let FormulaService = class FormulaService {
    constructor() {
        const config = {
            licenseKey: 'gpl-v3',
            useArrayArithmetic: true,
            useColumnIndex: true,
        };
        this.engine = hyperformula_1.HyperFormula.buildEmpty(config);
    }
    parseFormula(formula) {
        try {
            const cleanFormula = formula.startsWith('=')
                ? formula.substring(1)
                : formula;
            const normalizedFormula = cleanFormula.replace(/\[[^\]]+\]!(\[[^\]]+\]!)?/g, 'EXT!');
            const extSheetName = this.engine.addSheet('EXT');
            const extSheetId = this.engine.getSheetId(extSheetName);
            const sheetName = this.engine.addSheet('temp');
            const sheetId = this.engine.getSheetId(sheetName);
            if (sheetId === undefined || extSheetId === undefined) {
                return { valid: false, error: 'Failed to create validation sheets' };
            }
            this.engine.setCellContents({ sheet: sheetId, col: 0, row: 0 }, [
                [`=${normalizedFormula}`],
            ]);
            const cellValue = this.engine.getCellValue({
                sheet: sheetId,
                col: 0,
                row: 0,
            });
            this.engine.removeSheet(sheetId);
            this.engine.removeSheet(extSheetId);
            if (cellValue && typeof cellValue === 'object' && 'type' in cellValue) {
                if (cellValue.type !== 'REF') {
                    return { valid: false, error: cellValue.type };
                }
            }
            return { valid: true };
        }
        catch (error) {
            return {
                valid: false,
                error: error instanceof Error ? error.message : 'Invalid formula',
            };
        }
    }
    evaluateFormula(formula, cells, currentRow, currentCol) {
        try {
            const sheetName = this.engine.addSheet('calc');
            const sheetId = this.engine.getSheetId(sheetName);
            if (sheetId === undefined) {
                return '#ERROR';
            }
            const maxRow = Math.max(...Array.from(cells.keys()).map((k) => parseInt(k.split(':')[0])), currentRow);
            const maxCol = Math.max(...Array.from(cells.keys()).map((k) => parseInt(k.split(':')[1])), currentCol);
            for (let row = 0; row <= maxRow; row++) {
                for (let col = 0; col <= maxCol; col++) {
                    const key = `${row}:${col}`;
                    const cellData = cells.get(key);
                    if (cellData) {
                        if (cellData.formula) {
                            this.engine.setCellContents({ sheet: sheetId, col, row }, [
                                [
                                    cellData.formula.startsWith('=')
                                        ? cellData.formula
                                        : `=${cellData.formula}`,
                                ],
                            ]);
                        }
                        else if (cellData.value !== undefined &&
                            cellData.value !== null) {
                            this.engine.setCellContents({ sheet: sheetId, col, row }, [
                                [cellData.value],
                            ]);
                        }
                    }
                }
            }
            const cleanFormula = formula.startsWith('=') ? formula : `=${formula}`;
            this.engine.setCellContents({ sheet: sheetId, col: currentCol, row: currentRow }, [[cleanFormula]]);
            const result = this.engine.getCellValue({
                sheet: sheetId,
                col: currentCol,
                row: currentRow,
            });
            this.engine.removeSheet(sheetId);
            if (result && typeof result === 'object' && 'type' in result) {
                return `#${result.type}`;
            }
            return result;
        }
        catch (_error) {
            return '#ERROR';
        }
    }
    getDependencies(formula) {
        const dependencies = [];
        const cellRefPattern = /([A-Z]+)(\d+)/g;
        const cleanFormula = formula.startsWith('=')
            ? formula.substring(1)
            : formula;
        let match;
        while ((match = cellRefPattern.exec(cleanFormula)) !== null) {
            const col = this.columnToIndex(match[1]);
            const row = parseInt(match[2]) - 1;
            dependencies.push({ row, col });
        }
        return dependencies;
    }
    getExternalDependencies(formula) {
        const externals = [];
        const crossWorkspacePattern = /\[([^\]]+)\]!\[([^\]]+)\]!(\$?[A-Z]+\$?(\d+)?(?::\$?[A-Z]+\$?(\d+)?)?)/g;
        const localTablePattern = /\[([^\]]+)\]!(\$?[A-Z]+\$?(\d+)?(?::\$?[A-Z]+\$?(\d+)?)?)/g;
        const cleanFormula = formula.startsWith('=') ? formula : `=${formula}`;
        let match;
        while ((match = crossWorkspacePattern.exec(cleanFormula)) !== null) {
            externals.push({
                fullReference: match[0],
                workspace: match[1],
                table: match[2],
                range: match[3],
            });
        }
        while ((match = localTablePattern.exec(cleanFormula)) !== null) {
            const isCross = externals.some((e) => e.fullReference.includes(match[0]));
            if (!isCross) {
                externals.push({
                    fullReference: match[0],
                    table: match[1],
                    range: match[2],
                });
            }
        }
        return externals;
    }
    columnToIndex(column) {
        let index = 0;
        for (let i = 0; i < column.length; i++) {
            index = index * 26 + (column.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
        }
        return index - 1;
    }
    columnToLetter(index) {
        let letter = '';
        let num = index + 1;
        while (num > 0) {
            const remainder = (num - 1) % 26;
            letter = String.fromCharCode('A'.charCodeAt(0) + remainder) + letter;
            num = Math.floor((num - 1) / 26);
        }
        return letter;
    }
    buildDependencyGraph(cells) {
        const graph = new Map();
        for (const [key, cellData] of cells.entries()) {
            if (cellData.formula) {
                const deps = this.getDependencies(cellData.formula);
                const depKeys = deps.map((d) => `${d.row}:${d.col}`);
                graph.set(key, depKeys);
            }
        }
        return graph;
    }
    getCalculationOrder(cells) {
        const graph = this.buildDependencyGraph(cells);
        const visited = new Set();
        const order = [];
        const visit = (key) => {
            if (visited.has(key))
                return;
            visited.add(key);
            const deps = graph.get(key) || [];
            for (const dep of deps) {
                visit(dep);
            }
            order.push(key);
        };
        for (const key of cells.keys()) {
            if (cells.get(key)?.formula) {
                visit(key);
            }
        }
        return order;
    }
};
exports.FormulaService = FormulaService;
exports.FormulaService = FormulaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FormulaService);
//# sourceMappingURL=formula.service.js.map