module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom for frontend tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^next/image$': '<rootDir>/__mocks__/image.js',
    '^next/router$': '<rootDir>/__mocks__/router.js',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  testMatch: ['<rootDir>/__tests__/client/**/*.test.(ts|tsx|js|jsx)'], // Match frontend tests
};
