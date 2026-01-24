module.exports = {
  /**
   * Специфичный конфиг для Backend API.
   * Реализует архитектуру FOED2: App -> Modules -> Shared.
   */
  extends: ["../../.eslintrc.js"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js", "dist", "node_modules"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
    "boundaries/elements": [
      {
        /**
         * Слой App (Backend Shell).
         * Оркестрация сервера, глобальные Middleware, DI-контейнер.
         */
        type: "app",
        pattern: "src/app/**/*",
      },
      {
        /**
         * Слой Modules (Бизнес-домены).
         * Автономные модули (как микросервисы).
         * Структура внутри: api/ (контроллеры), domain/ (логика), infrastructure/ (БД).
         */
        type: "modules",
        pattern: [
          "src/modules/**/modules/**/*",
          "src/modules/**/*",
          "src/auth/**/*",
          "src/users/**/*",
          "src/workspaces/**/*",
        ],
      },
      {
        /**
         * Слой Shared/Common (Инфраструктура).
         * Агностичные библиотеки: логирование, БД, утилиты.
         */
        type: "shared",
        pattern: ["src/shared/**/*", "src/common/**/*", "src/database/**/*"],
      },
    ],
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

    /**
     * ПРАВИЛА АРХИТЕКТУРНЫХ ГРАНИЦ (FEOD)
     */

    // Запрет импорта приватных файлов (только через index.ts)
    "boundaries/no-private": "error",

    // Входные точки: Модули доступны ТОЛЬКО через фасады (index.ts)
    "boundaries/entry-point": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            target: "modules",
            allow: "**/index.ts",
          },
        ],
      },
    ],

    // Соблюдение иерархии FOED2
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            from: "app",
            allow: ["app", "modules", "shared"],
            description: "App может оркестровать всё.",
          },
          {
            from: "modules",
            allow: ["modules", "shared"],
            description: "Модули изолированы и зависят только от инфраструктуры.",
          },
          {
            from: "shared",
            allow: ["shared"],
            description: "Shared слой максимально чист.",
          },
        ],
      },
    ],
  },
};
