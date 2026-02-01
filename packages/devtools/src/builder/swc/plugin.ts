// @ts-nocheck
import type { PluginOptions, TransformResult } from "../../ui/lib/types.js";
import type { Visitor } from "@swc/core";
import { Visitor as SWCVisitor } from "@swc/core/Visitor.js";

class SWCPathInjector extends SWCVisitor {
  private filePath: string | undefined;
  private options: PluginOptions;
  private isDevMode: boolean;
  private sourceCode: string;
  private predecessorSpan: { file: string; line: number } | null = null;

  constructor(
    filePath: string | undefined,
    options: PluginOptions,
    isDevMode: boolean,
    sourceCode: string = "",
  ) {
    super();
    this.filePath = filePath;
    this.options = options;
    this.isDevMode = isDevMode;
    this.sourceCode = sourceCode;
  }

  visitProgram(program: unknown): unknown {
    if (!this.filePath || !this.isDevMode) {
      return program;
    }
    return super.visitProgram(program);
  }

  visitJSXOpeningElement(element: unknown): unknown {
    const el = element as {
      span: { start: number };
      attributes: Array<{
        type: string;
        name: { value: string };
      }>;
    };

    if (!el.attributes) {
      el.attributes = [];
    }

    const hasPathAttribute = el.attributes.some(
      (attr) => attr.type === "JSXAttribute" && attr.name.value === "data-path",
    );

    if (!hasPathAttribute && this.filePath) {
      const lineNumber = this.getLineNumber(el.span.start);
      const callPathValue = this.predecessorSpan
        ? { file: this.getRelativePath(this.predecessorSpan.file), line: this.predecessorSpan.line }
        : null;

      const pathObject = {
        file: this.getRelativePath(this.filePath),
        fileLine: lineNumber,
        callFile: callPathValue?.file ?? null,
        callFileLine: callPathValue?.line ?? null,
      };

      const pathAttribute = {
        type: "JSXAttribute" as const,
        span: { start: 0, end: 0, ctxt: 0 },
        name: {
          type: "Identifier" as const,
          span: { start: 0, end: 0, ctxt: 0 },
          value: "data-path",
          optional: false,
        },
        value: {
          type: "StringLiteral" as const,
          span: { start: 0, end: 0, ctxt: 0 },
          value: JSON.stringify(pathObject),
          raw: JSON.stringify(JSON.stringify(pathObject)),
        },
      };

      el.attributes.push(pathAttribute);
    }

    if (this.filePath) {
      this.predecessorSpan = {
        file: this.filePath,
        line: this.getLineNumber(el.span.start),
      };
    }

    return super.visitJSXOpeningElement(element);
  }

  visitJSXClosingElement(element: unknown): unknown {
    this.predecessorSpan = null;
    return super.visitJSXClosingElement(element);
  }

  private getLineNumber(byteOffset: number): number {
    if (!this.sourceCode) return 1;
    let line = 1;
    for (let i = 0; i < byteOffset && i < this.sourceCode.length; i++) {
      if (this.sourceCode[i] === "\n") {
        line++;
      }
    }
    return line;
  }

  private getRelativePath(absolutePath: string): string {
    const gitElbruso = "/home/ivan/git/elbruso/";
    if (absolutePath.startsWith(gitElbruso)) {
      return absolutePath.slice(gitElbruso.length);
    }
    return absolutePath;
  }
}

export function swcPlugin(filePath: string, options: PluginOptions, isDevMode: boolean): Visitor {
  return new SWCPathInjector(filePath, options, isDevMode);
}

export async function transform(
  code: string,
  filePath: string,
  isDevMode: boolean,
): Promise<TransformResult> {
  const { transform: swcTransform } = await import("@swc/core");

  return swcTransform(code, {
    filename: filePath,
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
      target: "esnext",
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
    plugin: (m) => new SWCPathInjector(filePath, {}, isDevMode, code).visitProgram(m),
  });
}
