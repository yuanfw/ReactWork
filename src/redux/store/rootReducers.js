/**
 * 这是一个 rootReducer
 * Created by zhangyuanyuan031 on 17/4/20.
 */

import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import store from 'store';
import  syncReducers from '../reducers/syncReducers'

const asyncReducers = {};

let allReduces = {
    router,
    ...syncReducers,
    ...asyncReducers
};

export function createRootReducer() {
    return combineReducers(allReduces)
}

/**
 * 按需加载时，立即注入对应的 Reducer
 * @param  {String}   key
 * @param  {Function} reducer
 */
export function injectReducer(key, reducer) {
    asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer()); // 替换当前的 rootReducer
}



