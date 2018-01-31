import {error} from 'util'
import {addMenuService, reviseMenuService, deleteMenuService} from 'service/menu-manage-service'

// 添加菜单
export const addMenuAction = (addParams) => (dispatch) => addMenuService(addParams).then((res) => {
    dispatch({
        type: "addMenu",
        payload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});

// 修改菜单
export const reviseMenuAction = (reviseParams) => (dispatch) => reviseMenuService(reviseParams).then((res) => {
    dispatch({
        type: "reviseMenu",
        payload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});

// 删除菜单
export const deleteMenuAction = (deleteParams) => (dispatch) => deleteMenuService(deleteParams).then((res) => {
    dispatch({
        type: "deleteMenu",
        payload: res
    });
    if (res.httpCode !== "200") {
        error(res);
    }
});