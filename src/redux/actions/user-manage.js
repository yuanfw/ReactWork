/**
 * 用户管理Action
 */
import {error} from 'util'
import {getUserListService, getUserDetailService, reviseUserService, deleteUserService} from 'service/user-manage-service'

// 获取用户列表
export const getUserListAction = () => (dispatch) => getUserListService().then((res) => {
    dispatch({
        type: "getUserList",
        payload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});

// 获取当前用户详情
export const getUserDetailAction = (userDetail) => (dispatch) => getUserDetailService(userDetail).then((res) => {
    dispatch({
        type: "getUserDetail",
        payload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});

// 修改用户
export const reviseUserAction = (reviseParams) => (dispatch) => reviseUserService(reviseParams).then((res) => {
    dispatch({
        type: "reviseUser",
        payload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});

// 删除用户
export const deleteUserAction = (deleteParams) => (dispatch) => deleteUserService(deleteParams).then((res) => {
    dispatch({
        type: "deleteUser",
        playload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});

