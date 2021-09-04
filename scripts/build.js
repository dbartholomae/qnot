process.env.NODE_ENV = "production";

const commonConfig = require("./commonConfig.js");
const fs = require("fs-extra");

async function build() {
  await require("fs-extra").emptyDir("build");
  await fs.copy("./public", "./build");

  await require("esbuild").build({ ...commonConfig, outdir: "build" });
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
