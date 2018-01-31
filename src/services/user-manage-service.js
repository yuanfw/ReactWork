/**
 * 用户管理接口调取
 */

import ajax from 'util/ajax';

// 获取用户列表
export const getUserListService = () => ajax("user/read/list", "PUT");
// export const getUserListService = () => ajax("../json/user-list.json");

// 获取当前用户详情
export const getUserDetailService = (param) => ajax("user/read/current", param, "POST");

// 修改用户
export const reviseUserService = (param) => ajax("user", param, "POST");

// 删除用户
export const deleteUserService = (param) => ajax("user", param, "DELETE");