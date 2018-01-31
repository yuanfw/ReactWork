/**
 * 权限管理Action
 */
import {error} from 'util'
import {grantPrivilegeService, liftPrivilegeService} from 'service/privilege-manage-service'

export const grantPrivilegeAction = (grantParams) => (dispatch) => grantPrivilegeService(grantParams).then((res) => {
    dispatch({
        type: "getPrivilege",
        playload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});


export const liftPrivilegeAction = (liftParams) => (dispatch) => liftPrivilegeService(liftParams).then((res) => {
    dispatch({
        type: "liftPrivilege",
        playload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});