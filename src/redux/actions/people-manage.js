/**
 * Created by zhangyuanyuan031 on 17/6/12.
 */
import {error} from 'util'
import {queryPeopleManageService, updatePeopleService} from 'service/people-manage-service'

export const queryPeopleAction = (searchData) => (dispatch) => queryPeopleManageService(searchData).then((res) => {
    dispatch({
        type: "peopleManage",
        playload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});

export const updatePeopleManageAction = (updateParams, cb) => (dispatch) => updatePeopleService(updateParams).then((res) => {
    dispatch({type: "updatePeopleManage", payload: res});
    if (res.httpCode == '200' && typeof cb === 'function')
        cb(res);
    else if( res.httpCode != '200' )
      error(res);
});