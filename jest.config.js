module.exports = {
  reporters: ["default", ["jest-junit", { outputFile: "./reports/junit.xml" }]],
  projects: [
    {
      displayName: "Unit",
      testEnvironment: "node",
      transform: {
        "^.+\\.tsx?$": "esbuild-jest",
      },
      setupFilesAfterEnv: ["jest-extended"],
      testMatch: ["<rootDir>/**/*.unit.test.ts"],
    },
    {
      displayName: "DOM",
      moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "css"],
      moduleNameMapper: {
        "@fontsource/roboto": "identity-obj-proxy",
      },
      setupFilesAfterEnv: ["./src/setupTests.ts"],
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/**/*.dom.test.ts?(x)"],
      transform: {
        "^.+\\.tsx?$": "esbuild-jest",
      },
    },
  ],
};
