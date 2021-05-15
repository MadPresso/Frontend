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