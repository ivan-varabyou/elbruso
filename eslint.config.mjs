import tseslint from "typescript-eslint";
import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const HOOK_PATTERN = /^use[A-Z]/;
const FORBIDDEN_IMPORTS = ["@/hooks", "@/stores", "@/api", "@/modules"];
const FORBIDDEN_HOOKS = [
  "useState",
  "useEffect",
  "useCallback",
  "useReducer",
  "useContext",
  "useMemo",
  "useRef",
  "useLayoutEffect",
  "useImperativeHandle",
  "useDebugValue",
  "useId",
];

const noLogicInDumb = {
  meta: {
    type: "problem",
    docs: {
      description: "Dumb components must not contain business logic or React hooks",
      category: "Best Practices",
      recommended: "error",
    },
    messages: {
      noHooks: "Dumb components must not use React hooks ({{ hook }})",
      noForbiddenImports: "Dumb components must not import from forbidden paths ({{ importPath }})",
      noBusinessLogic: "Dumb components should be pure and contain no business logic",
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename;
    const isDumbFile = /\.dumb[s]?\.tsx?$/.test(filename);

    if (!isDumbFile) return {};

    return {
      CallExpression(node) {
        const calleeName = node.callee.name;
        if (FORBIDDEN_HOOKS.includes(calleeName)) {
          context.report({
            node,
            messageId: "noHooks",
            data: { hook: calleeName },
          });
        }
      },
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (typeof importPath === "string") {
          const hasForbiddenImport = FORBIDDEN_IMPORTS.some((forbidden) =>
            importPath.startsWith(forbidden),
          );
          if (hasForbiddenImport) {
            context.report({
              node,
              messageId: "noForbiddenImports",
              data: { importPath },
            });
          }
        }
      },
    };
  },
};

const noLogicInDto = {
  meta: {
    type: "problem",
    docs: {
      description: "DTO files must only contain TypeScript interfaces and type aliases",
      category: "Best Practices",
      recommended: "error",
    },
    messages: {
      noFunctions: "DTO files must not contain functions ({{ nodeType }})",
      noClasses: "DTO files must not contain classes",
      noVariables: "DTO files must not contain variable declarations",
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename;
    const isDtoFile = /\.dto\.ts$/.test(filename);

    if (!isDtoFile) return {};

    const allowedNodes = [
      "TSTypeAliasDeclaration",
      "TSInterfaceDeclaration",
      "TSImportEqualsDeclaration",
    ];

    return {
      "Program:exit"(node) {
        node.body.forEach((statement) => {
          if (!allowedNodes.includes(statement.type)) {
            const nodeType = statement.type
              .replace("TS", "")
              .replace(/([A-Z])/g, " $1")
              .trim();
            context.report({
              node: statement,
              messageId:
                statement.type === "VariableDeclaration"
                  ? "noVariables"
                  : statement.type === "ClassDeclaration"
                    ? "noClasses"
                    : "noFunctions",
              data: { nodeType },
            });
          }
        });
      },
    };
  },
};

const importAliases = {
  meta: {
    type: "problem",
    docs: {
      description: "Imports must use @/ or #/ aliases, no deep relative imports",
      category: "Import Rules",
      recommended: "error",
    },
    messages: {
      noDeepRelative: "Avoid deep relative imports (../../../). Use @/ or #/ aliases instead",
      noDirectModulesPath: "Do not import directly from modules/**/ui/. Use proper path aliases.",
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (typeof importPath !== "string") return;

        if (/^\.{2,}\/.+/.test(importPath)) {
          const relativeLevels = (importPath.match(/\.\.\//g) || []).length;
          if (relativeLevels >= 3) {
            context.report({
              node,
              messageId: "noDeepRelative",
            });
          }
        }

        if (/modules\/[^\/]+\/ui\//.test(importPath)) {
          context.report({
            node,
            messageId: "noDirectModulesPath",
          });
        }
      },
    };
  },
};

const noBarrelExports = {
  meta: {
    type: "problem",
    docs: {
      description: "Barrel exports (export *) are forbidden in index files",
      category: "Export Rules",
      recommended: "error",
    },
    messages: {
      noBarrelExport: "Barrel exports (export *) are forbidden. Use named exports instead.",
    },
    schema: [],
  },
  create(context) {
    return {
      ExportAllDeclaration(node) {
        if (node.exported) return;

        context.report({
          node,
          messageId: "noBarrelExport",
        });
      },
    };
  },
};

const componentSuffixValidation = {
  meta: {
    type: "problem",
    docs: {
      description: "Component exports must have correct suffixes matching their filenames",
      category: "Naming Conventions",
      recommended: "error",
    },
    messages: {
      invalidSuffix:
        'Component export "{{ exportName }}" must end with "{{ expectedSuffix }}" ({{ fileType }})',
    },
    schema: [],
  },
  create(context) {
    const suffixMap = {
      ".page.tsx": "Page",
      ".section.tsx": "Section",
      ".widget.tsx": "Widget",
      ".modal.tsx": "Modal",
      ".layout.tsx": "Layout",
      ".smart.tsx": "Smart",
      ".dumb.tsx": "Dumb",
      ".dumbs.tsx": "Dumb",
      ".provider.tsx": "Provider",
      ".context.tsx": "Context",
    };

    const filename = context.filename;

    for (const [suffix, expectedName] of Object.entries(suffixMap)) {
      if (filename.endsWith(suffix)) {
        return {
          ExportNamedDeclaration(node) {
            node.specifiers.forEach((specifier) => {
              if (specifier.exported && specifier.exported.name) {
                const exportName = specifier.exported.name;
                if (!exportName.endsWith(expectedName)) {
                  context.report({
                    node: specifier,
                    messageId: "invalidSuffix",
                    data: {
                      exportName,
                      expectedSuffix: expectedName,
                      fileType: suffix,
                    },
                  });
                }
              }
            });
          },
        };
      }
    }

    return {};
  },
};

const namedExportsNaming = {
  meta: {
    type: "problem",
    docs: {
      description: "Export names must match file suffixes conventions",
      category: "Naming Conventions",
      recommended: "error",
    },
    messages: {
      invalidHookName: 'Hook export "{{ exportName }}" must follow use*Hook pattern (hook file)',
      invalidServiceName: 'Service export "{{ exportName }}" must end with Service (service file)',
      invalidStoreName:
        'Store export "{{ exportName }}" must follow use*Store pattern (store file)',
      invalidApiName: 'API export "{{ exportName }}" must end with Api (api file)',
      invalidWsName: 'WebSocket export "{{ exportName }}" must end with Ws (ws file)',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename;

    return {
      ExportNamedDeclaration(node) {
        node.specifiers.forEach((specifier) => {
          const exportName = specifier.exported?.name;
          if (!exportName) return;

          if (filename.endsWith(".hook.ts") && !HOOK_PATTERN.test(exportName)) {
            context.report({
              node: specifier,
              messageId: "invalidHookName",
              data: { exportName },
            });
          }

          if (filename.endsWith(".service.ts") && !exportName.endsWith("Service")) {
            context.report({
              node: specifier,
              messageId: "invalidServiceName",
              data: { exportName },
            });
          }

          if (filename.endsWith(".store.ts") && !HOOK_PATTERN.test(exportName)) {
            context.report({
              node: specifier,
              messageId: "invalidStoreName",
              data: { exportName },
            });
          }

          if (filename.endsWith(".api.ts") && !exportName.endsWith("Api")) {
            context.report({
              node: specifier,
              messageId: "invalidApiName",
              data: { exportName },
            });
          }

          if (filename.endsWith(".ws.ts") && !exportName.endsWith("Ws")) {
            context.report({
              node: specifier,
              messageId: "invalidWsName",
              data: { exportName },
            });
          }
        });
      },
    };
  },
};

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: pluginImport,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
      "custom-rules": {
        rules: {
          "no-logic-in-dumb": noLogicInDumb,
          "no-logic-in-dto": noLogicInDto,
          "import-aliases": importAliases,
          "no-barrel-exports": noBarrelExports,
          "component-suffix-validation": componentSuffixValidation,
          "named-exports-naming": namedExportsNaming,
        },
      },
    },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true },
      },
    },
    rules: {
      "import/no-unresolved": "off",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off",

      "import/prefer-default-export": "off",

      "custom-rules/no-logic-in-dumb": "error",
      // Disable no-logic-in-dto for NestJS backend (DTOs use classes with decorators)
      "custom-rules/no-logic-in-dto": "off",
      "custom-rules/import-aliases": "error",
      "custom-rules/no-barrel-exports": "error",
      "custom-rules/component-suffix-validation": "error",
      "custom-rules/named-exports-naming": "error",
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      ".next/",
      "apps/web/.next/",
      "*.config.*",
      "!.eslint.config.mjs",
      "**/dist/**",
      "**/*.d.ts",
      "apps/api/src/**/*.entity.ts",
      "apps/api/src/**/*.module.ts",
      "apps/api/src/**/*.service.ts",
      "apps/api/src/**/*.controller.ts",
    ],
  },
);
