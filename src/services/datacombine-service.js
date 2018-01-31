/**
 * Created by zhangyuanyuan031 on 17/9/11.
 */
import ajax from 'util/ajax'

/**
 * 权重管理
 */

//查询当前用户权重比例
export const queryWeightManage = () => ajax('bdc/ecif/weight/config/query', 'POST');

//删除当前用户权重比例
export const delWeightManage = (params) => ajax('bdc/ecif/weight/config/delete', params, 'POST');

//
export const detailWeight = (params) => ajax('bdc/ecif/weight/config/detail',params,'POST');

//增加修改当前用户权重比例
export const editWeightManage = (params) => ajax('bdc/ecif/weight/config/update', params, 'POST');

//查询配置表名
export const queryConfigTableName = () => ajax('bdc/ecif/weight/config/table', 'GET');

//根据表名查询配置列名
export const queryConfigColumn = (params) => ajax('bdc/ecif/weight/config/column',params,'POST');

//设置权重是否可用
export const setWeightManageStatus = (params) => ajax('bdc/ecif/weight/config/status',params,'POST');

/**
 * 权重表管理
 */

// 根据字典表表名查询列名
export const queryColmnName = (params) => ajax('bdc/ecif/weight/column', params, 'POST');

//查询权重表管理配置列表
export const queryWeightTable = () => ajax('bdc/ecif/weight/query','GET');

//保存或修改权重表管理配置
export const updateWeightTable = (params) => ajax('bdc/ecif/weight/update',params,'POST');

// 获取详细数据
export const weightTableDetail = (params) => ajax('bdc/ecif/weight/detail',params,'POST');

// 删除管理配置信息
export const weightTableDel = (params) => ajax('bdc/ecif/weight/delete',params,'POST');



/**
 * 人员合并接口
 */

// 模糊查询人员信息
export const queryCombinePersons = (params) => ajax('bdc/ecif/merge/query', params, 'POST');

//查询人员信息相似度
export const querySemblancePersons = (params) => ajax('bdc/ecif/merge/semblance',params,'POST');

//自动合并人员信息
export const autoMergePersons = (params) => ajax('bdc/ecif/merge/auto', params, 'POST');



/**
 * 人员待合并接口
 */
// 查询当前用户下待合并记录
export const queryAwaitCombine = () => ajax('bdc/ecif/pending/query', 'GET');

//删除记录
export const delAwaitCombine = (params) => ajax('bdc/ecif/pending/delete',params,'POST');

//提交合并
export const commitCombine = (params) => ajax('bdc/ecif/pending/commit', params, 'POST');

// 保存修改
export const awaitUpdate = (params) => ajax('bdc/ecif/pending/update', params, 'POST');

// 获取详细数据
export const detailAwaitCombine = (params) => ajax('bdc/ecif/pending/detail',params,'POST');


/**
 * 证件优先级管理
 */
// 查询当前用户配置证件类型列表
export const priorityList = (params) => ajax('bdc/ecif/priority/list',params,'POST');

// 删除配置证件
export const priorityDel = (params) => ajax('bdc/ecif/priority/delete',params,'POST');

// 添加或修改优先级
export const priorityEdit = (params) => ajax('bdc/ecif/priority/update',params,'POST');

// 查询证件详细
export const priorityDetail = (params) => ajax('bdc/ecif/priority/detail',params,'GET');

// 查询字典证件类型
export const dictionaryCards = () => ajax('bdc/ecif/priority/read','GET');
