/**
 * Created by zhangyuanyuan031 on 17/6/14.
 */

import ajax from 'util/ajax';

export const demoServer = (params)=>ajax("app/login",params,'POST');

/*
export var deom=()=>{

}

deom=function () {
    var a=1;
}
*/

/*
export const deom=function () {
    return ajax("aaa")
}*/
