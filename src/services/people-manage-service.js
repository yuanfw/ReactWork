/**
 * 人员管理
 * Created by zhangyuanyuan031 on 17/6/12.
 */

import ajax from 'util/ajax';

// 查询
export const queryPeopleManageService = (param) => ajax("bdc/ecif/api/queryPersonInfo.do", param, "post");

// 修改
export const updatePeopleService = (params) => ajax( "bdc/ecif/api/updatePersonDetail.do", params, "post");
