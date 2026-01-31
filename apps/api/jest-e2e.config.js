module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: 'test/.+\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  globalSetup: './test/global-setup.js',
  setupFilesAfterEnv: ['./test/setup-env.js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@database/(.*)': '<rootDir>/src/database/$1',
    '^@modules/(.*)': '<rootDir>/src/modules/$1',
    '^@gateway/(.*)': '<rootDir>/src/gateway/$1',
    '^@common/(.*)': '<rootDir>/src/common/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@elbruso/database$': '<rootDir>/../packages/database/src/index.ts',
    '^@elbruso/types$': '<rootDir>/../packages/types/src/index.ts',
  },
};
