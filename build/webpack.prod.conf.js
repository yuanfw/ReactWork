/**
 * Created by zhangyuanyuan031 on 17/4/19.
 */
var webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    env = process.env.NODE_ENV.trim(), // 当前环境
    SOURCE_MAP = env === 'test';

config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';
config.devtool = SOURCE_MAP ? 'source-map' : false;

// 生产环境下分离出 CSS 文件
config.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css')
}, {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style', 'css!less')
});

config.plugins.push(
    new CleanWebpackPlugin('dist', {
        root: config.commonPath.rootPath,
        verbose: false
    }),
    new CopyWebpackPlugin([ // 复制高度静态资源
        {
            context: config.commonPath.staticDir,
            from: '**/*',
            ignore: ['*.md']
        }
    ]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        names: ["vendor", "init"]
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 30000
    }),
    new ExtractTextPlugin('[name].[contenthash:6].css', {
        allChunks: true // 若要按需加载 CSS 则请注释掉该行
    }),
    new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
        filename: '../dist/index.html', //生成的html存放路径，相对于 path
        template: config.commonPath.indexHTML, //html模板路径
        inject: 'body',
        hash: true,
        chunksSortMode: function (chunk1, chunk2) {
            var order = ['init', 'vendor', 'app'];
            var order1 = order.indexOf(chunk1.names[0]);
            var order2 = order.indexOf(chunk2.names[0]);
            return order1 - order2;
        }
    })
);

if (!SOURCE_MAP) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }))
}

module.exports = config;
