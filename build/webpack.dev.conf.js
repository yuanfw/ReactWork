/**
 * Created by zhangyuanyuan031 on 17/4/19.
 */

var webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    SOURCE_MAP = true;// 开发的时候使用map文件方便调试

config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = SOURCE_MAP ? 'eval-source-map' : false;

// 加入热加载的中间键
config.entry.app = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    config.entry.app
];

config.output.publicPath = '/';

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.loaders.push({
    test: /\.css$/,
    loader: 'style!css'
}, {
    test: /\.less$/,
    loader: 'style!css!less'
});

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: config.commonPath.indexHTML,
        chunksSortMode: 'none'
    }),
    new BrowserSyncPlugin({
        port: 1688,
        proxy: "localhost:3000",
        ui: {
            port: 8888,
            weinre: {
                port: 9090
            }
        },
       // files: ["/src/**/*.js", "/src/**/*.css", "/src/**/*.less", "/src/**/*.jsx"],
        watchOptions: {
            ignoreInitial: true,
            ignored: '/node_modules/**/*.*'
        },
        logLevel: "info",
        logPrefix: "我的项目测试log:",
        logConnections: false,
        notify: false
        // startPath:"./index.html" //启动时开始目录
    },{
        reload: false
    })

);

module.exports = config;


