/**
 * Created by zhangyuanyuan031 on 17/6/19.
 */
import {error} from 'util'
import {orgManageSearch,orgManageDetailSearch,updateOrgManageDetail} from 'service/org-manage-service'

// 查询组织机构管理
export const orgManageSearchAction = (params) => (dispatch) => orgManageSearch(params).then((res) => {
    dispatch({type: "orgmanagesearch", payload: res});
    if (res.httpCode !== '200') error(res);
});

// 查询组织机构管理详情
export const orgManageDetailAction=(globalId) =>(dispatch) => orgManageDetailSearch(globalId).then((res)=>{
    dispatch({type: "orgmanagedetail", payload: res});
    if (res.httpCode !== '200') error(res);
});

// 修改组织机构管理详情
export const updateOrgManageDetailAction=(parames,cb) =>(dispatch) => updateOrgManageDetail(parames).then((res)=>{
    dispatch({type: "updateorgmanagedetail", payload: res});
    if(typeof cb === 'function') cb();
    if (res.httpCode !== '200') error(res);
});