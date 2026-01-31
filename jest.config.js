module.exports = {
  projects: [
    {
      displayName: "api-e2e",
      testEnvironment: "node",
      rootDir: "./apps/api",
      testRegex: "test/.e2e-spec.ts$",
      transform: {
        "^.+\\.(t|j)s$": "ts-jest",
      },
      globalSetup: "<rootDir>/test/global-setup.js",
      setupFiles: ["<rootDir>/test/setup-env.js"],
      moduleDirectories: ["node_modules", "<rootDir>/src"],
      resolver: "<rootDir>/test/custom-resolver.js",
      moduleNameMapper: {
        "^@elbruso/database$": "<rootDir>/../../packages/database/src/index.ts",
        "^@elbruso/types$": "<rootDir>/../../packages/types/src/index.ts",
      },
    },
  ],
};
