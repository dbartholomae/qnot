const recommendedRules = [
  /* rules from the 'recommended' preset: */
  {
    name: "no-orphans",
    comment:
      "This is an orphan module - it's likely not used (anymore?). Either use it or " +
      "remove it. If it's logical this module is an orphan (i.e. it's a config file), " +
      "add an exception for it in your dependency-cruiser configuration. By default " +
      "this rule does not scrutinize dotfiles (e.g. .eslintrc.js), TypeScript declaration " +
      "files (.d.ts), tsconfig.json and some of the babel and webpack configs.",
    severity: "error",
    from: {
      orphan: true,
      pathNot: [
        "(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$", // dot files
        "\\.d\\.ts$", // TypeScript declaration files
        "(^|/)tsconfig\\.json$", // TypeScript config
        "(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts|json)$", // other configs
      ],
    },
    to: {},
  },
  {
    name: "not-to-deprecated",
    comment:
      "This module uses a (version of an) npm module that has been deprecated. Either upgrade to a later " +
      "version of that module, or find an alternative. Deprecated modules are a security risk.",
    severity: "error",
    from: {},
    to: {
      dependencyTypes: ["deprecated"],
    },
  },
  {
    name: "no-non-package-json",
    severity: "error",
    comment:
      "This module depends on an npm package that isn't in the 'dependencies' section of your package.json. " +
      "That's problematic as the package either (1) won't be available on live (2 - worse) will be " +
      "available on live with an non-guaranteed version. Fix it by adding the package to the dependencies " +
      "in your package.json.",
    from: {},
    to: {
      dependencyTypes: ["npm-no-pkg", "npm-unknown"],
    },
  },
  {
    name: "not-to-unresolvable",
    comment:
      "This module depends on a module that cannot be found ('resolved to disk'). If it's an npm " +
      "module: add it to your package.json. In all other cases you likely already know what to do.",
    severity: "error",
    from: {
      pathNot: "src/react-app-env.d.ts",
    },
    to: {
      couldNotResolve: true,
    },
  },
  {
    name: "no-duplicate-dep-types",
    comment:
      "Likeley this module depends on an external ('npm') package that occurs more than once " +
      "in your package.json i.e. bot as a devDependencies and in dependencies. This will cause " +
      "maintenance problems later on.",
    severity: "error",
    from: {},
    to: {
      moreThanOneDependencyType: true,
    },
  },

  /* rules you might want to tweak for your specific situation: */
  {
    name: "not-to-test",
    comment:
      "This module depends on a spec (test) file. The sole responsibility of a spec file is to test code. " +
      "If there's something in a spec that's of use to other modules, it doesn't have that single " +
      "responsibility anymore. Factor it out into (e.g.) a separate utility/ helper or a mock.",
    severity: "error",
    from: {},
    to: {
      path: "\\.(spec|test)\\.(ts|tsx)$",
    },
  },
];

const recommendedOptions = {
  doNotFollow: {
    path: "node_modules",
    dependencyTypes: [
      "npm",
      "npm-dev",
      "npm-optional",
      "npm-peer",
      "npm-bundled",
      "npm-no-pkg",
    ],
  },
};

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    ...recommendedRules,
    {
      name: "only-use-router-from-internal-module",
      comment:
        "Only rely on the central router definitions in the router module. This makes it easier to replace the router if we need to.",
      severity: "error",
      from: { pathNot: "^src/services/router" },
      to: { path: "react-router.+" },
    },
  ],
  options: {
    ...recommendedOptions,
    tsPreCompilationDeps: true,
  },
};
