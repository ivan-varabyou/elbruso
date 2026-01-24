module.exports = {
  extends: ["../.eslintrc.js"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/elements": [
      {
        /**
         * Слой Shared Modules.
         * ОПИСАНИЕ: Переиспользуемая бизнес-логика (Fractals).
         * РАСПОЛОЖЕНИЕ: packages/shared/src/modules/
         */
        type: "modules",
        pattern: ["shared/src/modules/**/*"],
      },
      {
        /**
         * Слой Shared Common.
         * ОПИСАНИЕ: Чистая инфраструктура.
         * РАСПОЛОЖЕНИЕ: packages/shared/src/common/, packages/types/
         */
        type: "common",
        pattern: ["shared/src/common/**/*", "types/**/*"],
      },
      {
        /**
         * Слой UI-Kit.
         * ОПИСАНИЕ: Агностичные компоненты.
         * РАСПОЛОЖЕНИЕ: packages/ui-kit/, packages/ui/
         */
        type: "ui-kit",
        pattern: ["ui-kit/**/*", "ui/**/*"],
      },
    ],
  },
  rules: {
    "boundaries/no-private": "error",
    "boundaries/entry-point": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            target: "modules",
            allow: "index.ts",
          },
        ],
      },
    ],
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            from: "modules",
            allow: ["modules", "common"],
            description: "Бизнес-модули не должны зависеть от UI-кита напрямую (инверсия).",
          },
          {
            from: "common",
            allow: ["common"],
            description: "Инфраструктура должна быть чистой.",
          },
          {
            from: "ui-kit",
            allow: ["ui-kit"],
            description: "UI-кит полностью агностичен.",
          },
        ],
      },
    ],
  },
};
