/**
 * 全局配制文件
 * Created by zhangyuanyuan031 on 17/6/23.
 */
var packageJS = require('../package.json');

module.exports = {
    name: packageJS.name,
    version:packageJS.version,
    ajaxSettings:{
        dev:{
            protocol:"http",
            port:"8080",
            domain:"localhost"
        },
        test:{
            protocol:"http",
            port:"8080",
            domain:"30.4.90.170"
        },
        pro:{
            protocol:"http",
            port:"8080",
            domain:"30.16.9.25"
        }
    }
};

