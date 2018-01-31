/**
 * Created by zhangyuanyuan031 on 17/6/12.
 */
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {isEmptyObject} from './index'

/**
 * 把路由和reduce连接起来的桥梁组件
 * @param state 组件中定义的state
 * @param action action
 * @param componet 普通组件
 * @returns {*} 智能组件
 * @constructor
 */
export default (state,action,componet)=>{
    if(typeof state !== 'function'){
        throw new Error("state 必须是一个函数")
    }
    if(!action || !(action instanceof Object) || isEmptyObject(action)){
        throw new Error("action 必须是一个对象")
    }

    return connect(state,action)(withRouter(componet));
};