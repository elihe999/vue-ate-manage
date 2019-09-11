const port = 7070;
const title = 'vue example';

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        port: port,
        proxy: {
            '/api': {
                target: 'http://192.168.92.210:10003/index.php',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/index.php': {
                target: 'http://192.168.92.210:10003/',
                changeOrigin: true
            },
            '/ms': {
                target: 'https://www.easy-mock.com/mock/5cfdf3b46b3bca3c744e7543/example',
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        name: title
    }
}
