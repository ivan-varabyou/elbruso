// packages/path-copier/src/swc-plugin.ts

import type { Program, JSXAttribute, JSXAttributeName, StringLiteral, JSXOpeningElement, JSXSpreadChild } from '@swc/core';
import { Visitor } from '@swc/core/Visitor';
import { parse } from '@swc/core'; // For parsing strings into AST nodes

interface JSXOpeningElementWithAttrs extends JSXOpeningElement {
  attrs: (JSXAttribute | JSXSpreadChild)[];
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

  constructor(filePath: string | undefined, options: PluginOptions, isDevMode: boolean) {
    super();
    this.filePath = filePath;
    this.options = options;
    this.isDevMode = isDevMode;
  }

  visitProgram(n: Program): Program {
    if (!this.filePath || !this.isDevMode) {
      return n; // Only inject in dev mode and if filePath is available
    }
    return super.visitProgram(n);
  }

  visitJSXOpeningElement(element: JSXOpeningElement): JSXOpeningElement {
    const elementWithAttrs = element as JSXOpeningElementWithAttrs;
    // Only inject if the element doesn't already have data-file-path
    const hasFilePathAttribute = elementWithAttrs.attrs.some((attr: JSXAttribute | JSXSpreadChild) => {
      if (attr.type !== 'JSXAttribute') {
        return false;
      }
      return attr.name.type === 'Identifier' && attr.name.value === 'data-file-path';
    });

    if (!hasFilePathAttribute && this.filePath) {
      const filePathAttribute: JSXAttribute = {
        type: 'JSXAttribute',
        span: {
          start: 0,
          end: 0,
          ctxt: 0,
        },
        name: generateAttributeName('data-file-path'),
        value: generateStringLiteral(this.filePath!),
      };
      elementWithAttrs.attrs.push(filePathAttribute);
    }

    return super.visitJSXOpeningElement(element);
  }
}

// The plugin entry point for SWC
export default function (filePath: string, options: PluginOptions, isDevMode: boolean): Visitor {
  return new FilePathInjector(filePath, options, isDevMode);
}