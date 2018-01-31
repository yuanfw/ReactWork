/**
 * Created by zhangyuanyuan031 on 17/6/14.
 */

import {demoServer} from "service/demo"

export const demoAction = () => (dispatch) => demoServer().then((payload) => dispatch({type: "demo", payload}));

export const myAction=function () {
    return function (dispath) {
        return demoServer().then(function (res) {
            dispath({
                type:"mydemo",
                payload:res
            })
        })
    }
}
