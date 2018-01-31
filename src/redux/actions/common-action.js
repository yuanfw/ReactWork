/**
 * 做一个公共的action
 * Created by zhangyuanyuan031 on 17/8/1.
 */

import {error} from 'util'
import * as commonServer from "service/common-service"
import {createActions} from 'redux-actions'

const actions = createActions({
    commonAction: {
        dataDictonary(res){
            return res
        },
        dataDictonary2(res){
            if(res.data && res.data.codeDictDto && res.data.codeDictDto.length > 0){
                return res.data.codeDictDto;
            }
            return [];
        }
    }
});

export const getDataDic = (params, cb) => (dispatch) => commonServer.dataDictonary(params).then((res) => {
    dispatch(actions.commonAction.dataDictonary(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (cb == null) {
            cb = params;
        }
        if (typeof cb === 'function') cb(res);
    }
});


export const dataDicAction = (params, cb) => (dispatch) => commonServer.dataDictonary(params).then((res) => {
    if (res.httpCode != '200')
        error(res);
    else {
        dispatch(actions.commonAction.dataDictonary2(res));
        if (cb == null) {
            cb = params;
        }
        if (typeof cb === 'function') cb(res);
    }
});


