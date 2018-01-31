/**
 * 日志中间键的设置
 * Created by zhangyuanyuan031 on 17/4/20.
 */

import thunk from './redux-thunk';
import { historyMiddleware } from './sync-history-config';

const middlewares = [thunk, historyMiddleware];
if (__DEV__ || __TEST__) {
    const createLogger = require('redux-logger');
    middlewares.push(createLogger());
}
export default middlewares;