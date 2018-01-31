/**
 * 权限管理接口调取
 */

import ajax from 'util/ajax';

// 授予权限
export const grantPrivilegeService = (param) => ajax("", param, "POST");

// 取消权限
export const liftPrivilegeService = (param) => ajax("", param, "POST");