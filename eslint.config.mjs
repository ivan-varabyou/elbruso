import tseslint from "typescript-eslint";
import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";

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
    },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true },
      },
    },
    rules: {
      // Disable - we use TypeScript
      "import/no-unresolved": "off",

      // Auto-sort imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Auto-remove unused imports only (vars handled by TypeScript)
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",

      // Keep TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off", // Handled by unused-imports

      // Allow default exports
      "import/prefer-default-export": "off",
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
