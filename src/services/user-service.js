/**
 * Created by zhangyuanyuan031 on 17/4/20.
 */
import ajax from 'util/ajax';

// login 接口
export const login=(params)=>{
    return ajax(
        'login',
        params,
        "POST"
    )
};
