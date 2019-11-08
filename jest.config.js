const jsdom = require('jsdom');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  moduleDirectories: ["node_modules", "src"], 
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
};