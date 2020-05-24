/**
 * Created by HIAPAD on 2020/5/18.
 */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './',
    outputDir: '7yunLive', // 打包文佳加名称
    productionSourceMap: false, // 不打包map
    lintOnSave: false, // 关闭代码报错
    devServer: {
        // 配置代理，解决跨域问题
        proxy: {
            '/': {
                target: 'http://47.108.55.97:2000/', // 172.16.0.169:10011   http://47.108.55.97:2000/
                // target: 'http://7yunapp.com/',
                changeOrigin: true,
                ws: false,
                pathRewrite: { '^/': '' }
            }
        }
    },
    configureWebpack: { // 配置短路径
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}
