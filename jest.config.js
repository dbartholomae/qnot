module.exports = {
  setupFilesAfterEnv: ["jest-extended", "@testing-library/jest-dom"],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "css"],
  moduleNameMapper: {
    "fontsource-roboto": "identity-obj-proxy",
  },
};
