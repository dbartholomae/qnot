require('dotenv').config()

const envVars = {
  'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  'process.env.PUBLIC_URL': `"${new URL(require('../package.json').homepage).pathname}"`
};

for (let key in process.env) {
  if(key.startsWith('REACT_APP_')) {
    envVars[`process.env.${key}`] = process.env[key] !== undefined && `"${process.env[key]}"`
  }
}

/**
 * @type {{[key: string]: string}}
 */
module.exports = envVars
