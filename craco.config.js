const path = require('path');
const { configPaths } = require('react-app-rewire-alias');

function pathResolver(_aliasMap) {
  let returnObj = {};
  Object.entries(_aliasMap).forEach(([key, value]) => {
    returnObj = Object.assign(returnObj, {
      [key]: path.resolve(__dirname, value),
    });
  });
  return returnObj;
}

module.exports = {
  webpack: {
    alias: pathResolver(configPaths('./tsconfig.paths.json')),
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
