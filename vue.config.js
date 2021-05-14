const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  configureWebpack: {
    plugins: [],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://192.168.178.45/'
        }
      }
    }
  }
}