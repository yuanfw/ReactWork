/**
 * Created by zhangyuanyuan031 on 17/4/19.
 */

require("./check-version")();

var express = require('express'),
    path=require('path'),
    webpack = require('webpack'),
    config = require('./webpack.dev.conf'),
    app = express();
var compiler = webpack(config);

//放开静态资源
var rootPath = path.resolve(__dirname, '..'), // 项目根目录
    src = path.join(rootPath, 'src'); // 开发源码目录

app.use('/static', express.static(config.commonPath.staticDir));
app.use('/json',express.static(path.join(src, 'json')));

// 使用HTML5历史记录API
app.use(require('connect-history-api-fallback')());

//加中间键
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, '127.0.0.1', function(err) {
    err && console.log(err);
});

