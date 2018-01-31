/**
 * Created by zhangyuanyuan031 on 17/4/20.
 */


import {login} from 'service/user-service';
import {error} from "util"
const LOG_IN = 'LOG_IN';
const loginDone = (userData) => ({
    type: LOG_IN,
    payload: userData
});

const loginAction = (params,cb) => {
    return dispatch => {
        login(params)
            .then(
                re => {
                    dispatch(loginDone(re))
                    if(typeof cb === 'function')
                        cb(re)
                    if(re.code !== '200'){
                        error(re)
                    }
                }
            )
    }
};

export default loginAction
