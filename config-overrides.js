const { override, addLessLoader, addPostcssPlugins, addWebpackModuleRule } = require('customize-cra');
const { alias, configPaths } = require('react-app-rewire-alias');
const pxtorem = require('postcss-pxtorem');

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = override(
  alias(configPaths('./tsconfig.paths.json')),

  addLessLoader({
    lessOptions: {
      strictMath: true,
      noIeCompat: true,
      javascriptEnabled: true,
      modifyVars: {
        // for example, you use Ant Design to change theme color.
      },
      cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
      cssModules: {
        localIdentName: '[path][name]__[local]--[hash:base64:5]', // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      },
    },
  }),
  addPostcssPlugins([
    pxtorem({
      rootValue: 100,
      propWhiteList: ['*'],
    }),
  ]),
  addWebpackModuleRule({
    test: /\.svg$/,
    include: [resolve('src/assets/sprites')],
    use: [
      {
        loader: 'svg-sprite-loader',
        options: { symbolId: 'icon-[name]' },
      },
    ],
  }),
);
