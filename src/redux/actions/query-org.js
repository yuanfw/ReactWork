/**
 * Created by zhangyuanyuan031 on 17/6/19.
 */
import {error} from 'util'
import {queryOrgDetailById,queryOrgDetailByOrgno} from 'service/query-org'


// 查询组织机构详情 通过globalId
export const queryGlobalOrg=(globalId) =>(dispatch) => queryOrgDetailById(globalId).then((res)=>{
    dispatch({type: "queryorg", payload: res});
    if (res.code !== '200') error(res);
});

// 查询组织机构详情 通过orgno
export const queryOrgbyOrgno=(orgno,cb) =>(dispatch) => queryOrgDetailByOrgno(orgno).then((res)=>{
    dispatch({type: "queryorg", payload: res});
    if (res.code !== '200') {
        if(typeof cb === 'function') cb();
        error(res);
    }
});

// 修改组织机构管理详情
//export const updateOrgManageDetailAction=(parames,cb) =>(dispatch) => updateOrgManageDetail(parames).then((res)=>{
//    dispatch({type: "updateorgmanagedetail", payload: res});
//    if(typeof cb === 'function') cb();
//    if (res.code !== '200') error(res);
//});