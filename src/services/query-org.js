/**
 * Created by zhangyuanyuan031 on 17/6/19.
 */

import ajax from 'util/ajax';

//// 查询组织机构管理
//export const orgManageSearch = (params) => ajax("bdc/ecif/org/queryOrgAgency.do", params, "post");

// 由globalId 查询机构详情
export const queryOrgDetailById = (gid) => ajax("bdc/ecif/org/OrgAgencyDetail.do", {globalOrgId: gid}, "GET");

//由orgno 查询机构详情
export const queryOrgDetailByOrgno = (org) => ajax("bdc/ecif/org/OrgAgencyDetailOrg.do",{orgno: org},"GET");

//// 修改机构详情
//export const updateOrgManageDetail = (params) => ajax("bdc/ecif/org/UpdateOrgAgencyDetail.do", params, "POST");

