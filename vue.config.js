const FontminPlugin = require('fontmin-webpack');

module.exports = {
        productionSourceMap: false,
        configureWebpack: {
                plugins: [
                        new FontminPlugin({
                          autodetect: false, // automatically pull unicode characters from CSS
                          glyphs: [ '\uF0493', ],
                        }),
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
