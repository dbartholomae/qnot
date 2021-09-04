const envVariables = require('./envVariables.js');

module.exports = {
  define: envVariables,
  entryPoints: ['src/index.tsx'],
  bundle: true,
  loader: {
    '.woff': 'file',
    '.woff2': 'file'
  },
}
