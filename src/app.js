import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store ,{ history } from 'store';
import routes from 'store/routes';
import 'babel-polyfill'; // 兼容底版本chrom,firforx and ie

if (__DEV__) {
    console.info('[当前环境] 开发环境');
}
if (__PROD__) {
    console.info('[当前环境] 生产环境');
}
if(__TEST__){
    console.info('[当前环境] 测试环境');
}

//页面总渲染
ReactDOM.render(<Provider store={store}>
    <Router history={history} children={routes} />
</Provider>,document.getElementById("app"));
