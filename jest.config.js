/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  // transform: { "\\.[jt]sx?$": ["ts-jest", { useESM: true }] },
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.js$": "$1",
  },
  // coverageDirectory: "./test-reports",
  // globals: {
  //   // "ts-jest": { diagnostics: false }
  //   moduleNameMapper:
  // },
};
