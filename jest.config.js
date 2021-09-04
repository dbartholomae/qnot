module.exports = {
  setupFilesAfterEnv: ["jest-extended", "@testing-library/jest-dom"],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
    "^.+\\.css$": "jest-transform-css",
  },
};
