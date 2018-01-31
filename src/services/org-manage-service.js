/**
 * Created by zhangyuanyuan031 on 17/6/19.
 */

import ajax from 'util/ajax';

// 查询组织机构管理
export const orgManageSearch = (params) => ajax("bdc/ecif/org/queryOrgInfo.do", params, "POST");

// 由globalId 查询机构详情
export const orgManageDetailSearch = (gid) => ajax("bdc/ecif/org/queryOrgDetail.do", {globalOrgId: gid}, "GET");

// 修改机构详情
export const updateOrgManageDetail = (params) => ajax("bdc/ecif/org/updateOrgDetail.do", params, "POST");
