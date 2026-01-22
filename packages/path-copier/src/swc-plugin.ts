// packages/path-copier/src/swc-plugin.ts

import type {
  Program,
  JSXAttribute,
  JSXAttributeName,
  StringLiteral,
  JSXOpeningElement,
  JSXAttributeOrSpread,
  TsType,
  TsTypeAnnotation,
  TsTypeParameterDeclaration,
  TsTypeParameterInstantiation
} from '@swc/core';
import { Visitor } from '@swc/core/Visitor.js';

interface JSXOpeningElementWithAttrs extends JSXOpeningElement {
  attributes: JSXAttributeOrSpread[];
}

interface PluginOptions {
  // Options for the plugin, if any
}

// Function to generate a unique key for the attribute
function generateAttributeName(name: string): JSXAttributeName {
  return {
    type: 'Identifier',
    span: {
      start: 0,
      end: 0,
      ctxt: 0,
    },
    value: name,
    optional: false,
  };
}

// Function to generate a StringLiteral for the attribute value
function generateStringLiteral(value: string): StringLiteral {
  return {
    type: 'StringLiteral',
    span: {
      start: 0,
      end: 0,
      ctxt: 0,
    },
    value: value,
    raw: JSON.stringify(value), // Ensure proper escaping
  };
}


class FilePathInjector extends Visitor {
  private filePath: string | undefined;
  private options: PluginOptions;
  private isDevMode: boolean;
  private sourceCode: string;

  constructor(filePath: string | undefined, options: PluginOptions, isDevMode: boolean, sourceCode: string = '') {
    super();
    this.filePath = filePath;
    this.options = options;
    this.isDevMode = isDevMode;
    this.sourceCode = sourceCode;
  }

  // Helper function to calculate line number from byte offset
  private getLineNumber(byteOffset: number): number {
    if (!this.sourceCode) return 1;

    let line = 1;
    for (let i = 0; i < byteOffset && i < this.sourceCode.length; i++) {
      if (this.sourceCode[i] === '\n') {
        line++;
      }
    }
    return line;
  }

  visitProgram(n: Program): Program {
    if (!this.filePath || !this.isDevMode) {
      return n; // Only inject in dev mode and if filePath is available
    }
    return super.visitProgram(n);
  }

  visitJSXOpeningElement(element: JSXOpeningElement): JSXOpeningElement {
    const elementWithAttrs = element as JSXOpeningElementWithAttrs;

    if (!elementWithAttrs.attributes) {
      elementWithAttrs.attributes = [];
    }

    // Only inject if the element doesn't already have data-file-path
    const attributes = elementWithAttrs.attributes || [];
    const hasFilePathAttribute = attributes.some((attr) => {
      if (attr.type !== 'JSXAttribute') {
        return false;
      }
      return attr.name.type === 'Identifier' && attr.name.value === 'data-file-path';
    });

    if (!hasFilePathAttribute && this.filePath) {
      // Get line number from element span
      const lineNumber = this.getLineNumber(element.span.start);
      const filePathWithLine = `${this.filePath}:${lineNumber}`;

      const filePathAttribute: JSXAttribute = {
        type: 'JSXAttribute',
        span: {
          start: 0,
          end: 0,
          ctxt: 0,
        },
        name: generateAttributeName('data-file-path'),
        value: generateStringLiteral(filePathWithLine),
      };
      elementWithAttrs.attributes.push(filePathAttribute);
    }

    return super.visitJSXOpeningElement(element);
  }

  visitTsType(n: TsType): TsType {
    return n;
  }

  visitTsTypeAnnotation(a: TsTypeAnnotation): TsTypeAnnotation {
    return a;
  }

  visitTsTypeParameterDeclaration(n: TsTypeParameterDeclaration): TsTypeParameterDeclaration {
    return n;
  }

  visitTsTypeParameterInstantiation(n: TsTypeParameterInstantiation): TsTypeParameterInstantiation {
    return n;
  }
}

// The plugin entry point for SWC
export default function (filePath: string, options: PluginOptions, isDevMode: boolean): Visitor {
  return new FilePathInjector(filePath, options, isDevMode);
}

export async function transform(code: string, filePath: string, isDevMode: boolean) {
  const { transform: swcTransform } = await import('@swc/core');

  return swcTransform(code, {
    filename: filePath,
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      target: 'esnext',
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
    plugin: (m) => new FilePathInjector(filePath, {}, isDevMode, code).visitProgram(m),
  });
}