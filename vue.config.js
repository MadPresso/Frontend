const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  configureWebpack: {
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './node_modules/buefy/**/*.@(vue|js|ts)'),
          path.join(__dirname, './public/index.html'),
          path.join(__dirname, './src/**/*.@(vue|js|ts)')
        ]),
        // safelist: [/icon/, /button/, /is-grouped/, /^navbar-/, /^has-text-/, /^mdi-/, /^has-numberinput-/, /select/, /switch/, /modal/, /b-tabs/, /button/, /autocomplete/, /dropdown/],
      })
    ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://192.168.178.45/'
        }
      }
    }
  }
}