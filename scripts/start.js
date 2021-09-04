process.env.NODE_ENV = "development";

const fs = require("fs-extra");

const commonConfig = require("./commonConfig.js");

async function serve() {
  await fs.emptyDir("./build");
  await fs.copy("./public", "./temp/qnot");

  await require("esbuild").build({ ...commonConfig, outdir: "temp/qnot" });

  const { url } = await require("servor")({
    browse: true,
    root: "temp",
    fallback: "qnot/index.html",
    reload: true,
    port: 8080,
  });

  console.log(`App running at ${url}`);
}

serve().catch((err) => {
  console.error(err);
  process.exit(1);
});
