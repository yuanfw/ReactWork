import ajax from 'util/ajax';

// 添加菜单
export const addMenuService = (param) => ajax("menu", param, "POST");

// 修改菜单
export const reviseMenuService = (param) => ajax("menu", param, "POST");

// 删除菜单
export const deleteMenuService = (param) => ajax("menu", param, "DELETE");

