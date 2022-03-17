import type { Config } from '@jest/types';

export default (): Config.InitialOptions => {
  return {
    rootDir: 'src',
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^src(.*)$': '<rootDir>/$1',
    },
    testMatch: ['<rootDir>/**/?(*.)+(test).ts'],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
      },
    },
  };
};
