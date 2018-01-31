/**
 * Created by zhangyuanyuan031 on 17/4/19.
 */

var path = require('path'),
    webpack = require('webpack'),
    NyanProgressPlugin = require('nyan-progress-webpack-plugin'),
    config = require('./config');

var rootPath = path.resolve(__dirname, '..'), // 项目根目录
    src = path.join(rootPath, 'src'), // 开发源码目录
    env = process.env.NODE_ENV.trim(); // 当前环境

// 此类用来做一个整合 routers 和 reduces
var mergeFiles = require("./mergeFiles");
mergeFiles("./src/redux/reducers/syncReducers.js", "./src/redux/reducers/**/index.js");
mergeFiles("./src/routes/syncRoutes.js", "./src/routes/**/index.js", true);

var commonPath = {
    rootPath: rootPath,
    dist: path.join(rootPath, 'dist'), // build 后输出目录
    indexHTML: path.join(src, env === 'development' ? 'index-dev.html' : 'index-pro.html'), // 入口基页
    staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
};


module.exports = {
    commonPath: commonPath,
    entry: {
        app: path.join(src, 'app.js'),
        // 框架打包
        vendor: [
			'jquery',
            'history',
            'lodash',
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'react-router-redux',
            'react-select',
            'moment',
            'react-bootstrap'
        ]
    },
    output: {
        path: path.join(commonPath.dist, ''),
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.jsx', 'less', 'css', ''],
        //自定义别名，方便引用路径
        alias: {
            asset: path.join(src, 'assets'),
            comp: path.join(src, 'components'),
            action: path.join(src, 'redux/actions'),
            reducer: path.join(src, 'redux/reducers'),
            store: path.join(src, 'redux/store'),
            route: path.join(src, 'routes'),
            service: path.join(src, 'services'),
            util: path.join(src, 'utils'),
            assets: path.join(src, 'assets')
        }
    },
    resolveLoader: {
        root: path.join(rootPath, 'node_modules')
    },
    module: {
        loaders: [{
            test: /\.(jsx|js)$/,
            include: src,
            exclude: /^node_modules$/,
			loader:'babel-loader'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.(png|jpe?g|gif|svg|ico)$/,
            loader: 'url',
            query: {
                limit: 10240, // 10KB 以下使用 base64
                name: 'images/[name]-[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)$/,
            loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:7].[ext]'
        }]
    },
    plugins: [
        new NyanProgressPlugin(), // 进度条
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': { // 这是给 React / Redux 打包用的
                NODE_ENV: JSON.stringify('production')
            },
            // 配置开发全局常量
            __DEV__: env === 'development',
            __PROD__: env === 'production',
            __TEST__: env === 'test',
            __CONFIG__: JSON.stringify(config),
            __COMPONENT_DEVTOOLS__: false // 是否使用组件形式的 Redux DevTools
        })
    ]
};

