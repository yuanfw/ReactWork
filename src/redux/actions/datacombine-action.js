/**
 * Created by zhangyuanyuan031 on 17/9/11.
 */
import {error} from 'util'
import * as dataCombine from 'service/datacombine-service'
import {createActions} from 'redux-actions'

const actions = createActions({
    dataCombine: {
        // 证件优先级管理
        priorityList(res){
            if (res.httpCode === 200) {
                return res.data;
            }
            return [];
        },
        dictionaryCards(res){
            if (res.httpCode === 200) {
                return res.data;
            }
            return [];
        },

        priorityDetail(res){
            if(res.httpCode === 200){
                return res.data;
            }
            return {};
        },

        //人员数据合并
        queryCombinePersons(res){
            if (res.httpCode == 200) {
                return res.data;
            }
            return {};
        },
        querySemblancePersons(res){
            if (res.httpCode == 200) {
                return res.data;
            }
            return {};
        },
        autoMergePersons(res){
            return res;
        },
        // 待合并箱
        queryAwaitCombine(res){ //  查询当前用户下待合并记录
            if(res.httpCode === 200){
                return res.data;
            }
            return [];
        },
        commitCombine(res){ // 提交合并
            return res;
        },
        awaitUpdate(res){ // 保存修改
            return res;
        },
        detailAwaitCombine(res){ // 获取详细数据
            return res;
        },

        // 权重管理
        queryWeightManage(res){
            if (res.httpCode === 200 && res.data && res.data.length > 0) {
                return res.data;
            }
            return [];
        },
        delWeightManage(res){
            return res;
        },
        editWeightManage(res){
            return res;
        },
        detailWeight(res){
            return res;
        },
        queryConfigTableName(res){
            if (res.httpCode === 200 && res.data && res.data.length > 0) {
                return res.data.map((item) => ({label: item.tableComment, value: item.tableName}));
            }
            return [];
        },
        queryConfigColumn(res){
            if (res.httpCode === 200 && res.data && res.data.length > 0) {
                return res.data.map((item) => ({label: item.columnDesc, value: item.columnName}));
            }
            return [];
        },

        //权重表管理
        queryColmnName(res){  // 查询表对应下的所有列名
            if (res.data && res.data.length > 0) {
                return res.data.map((item) => ({label: item.columnComment, value: item.columnName}))
            }
            return [];
        },
        queryWeightTable(res){
            if (res.data && res.data.length > 0) {
                return res.data;
            }
            return [];
        },
        updateWeightTable(res){
            return res;
        },
        weightTableDetail(res){
            return res;
        },
        weightTableDel(res){
            return res;
        }

    }
});


/**
 * 证件优先级管理
 */

// 查询当前用户配置证件类型列表
export const priorityList = (params) => (dispatch) => dataCombine.priorityList(params).then((res) => {
    dispatch(actions.dataCombine.priorityList(res));
    if (res.httpCode != '200')
        error(res);
});

// 删除配置证件
export const priorityDel = (params,cb) => dataCombine.priorityDel(params).then((res) => {
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});
// 查询字典证件类型
export const dictionaryCards = () => (dispatch) => dataCombine.dictionaryCards().then((res) => {
    dispatch(actions.dataCombine.dictionaryCards(res));
    if (res.httpCode != '200')
        error(res);
});
// 添加或修改优先级
export const priorityEdit = (params,cb) => dataCombine.priorityEdit(params).then((res) => {
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

// 查询证件详细
export const priorityDetail = (params,cb) => (dispatch) => dataCombine.priorityDetail(params).then((res) => {
    dispatch(actions.dataCombine.priorityDetail(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

/**
 * 人员数据合并
 */


//模糊查询人员信息
export const queryCombinePersons = (params) => (dispatch) => dataCombine.queryCombinePersons(params).then((res) => {
    dispatch(actions.dataCombine.queryCombinePersons(res));
    if (res.httpCode != '200')
        error(res);
});


//查询人员信息相似度
export const querySemblancePersons = (params) => (dispatch) => dataCombine.querySemblancePersons(params).then((res) => {
    dispatch(actions.dataCombine.querySemblancePersons(res));
    if (res.httpCode != '200')
        error(res);
});

//自动合并人员信息
export const autoMergePersons = (params, cb) => (dispatch) => dataCombine.autoMergePersons(params).then((res) => {
    dispatch(actions.dataCombine.autoMergePersons(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});


/**
 *待合并箱
 */

// 查询当前用户下待合并记录
export const queryAwaitCombine = () => (dispatch) => dataCombine.queryAwaitCombine().then((res) => {
    dispatch(actions.dataCombine.queryAwaitCombine(res));
    if (res.httpCode != '200')
        error(res);
});

//删除记录
export const delAwaitCombine = (params,cb) =>  (dispatch) => dataCombine.delAwaitCombine(params).then((res) => {
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

//提交合并
export const commitCombine = (params,cb) => (dispatch) => dataCombine.commitCombine(params).then((res) => {
    // dispatch(actions.dataCombine.commitCombine(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

// 保存修改
export const awaitUpdate = (params,cb) => (dispatch) => dataCombine.awaitUpdate(params).then((res) => {
    dispatch(actions.dataCombine.awaitUpdate(res));
    if (res.httpCode != 200)
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

// 获取详细数据
export const detailAwaitCombine = (params,cb) => (dispatch) => dataCombine.detailAwaitCombine(params).then((res) => {
    dispatch(actions.dataCombine.detailAwaitCombine(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});



/**
 * 权重管理 action
 */

//查询当前用户权重比例
export const queryWeightManage = () => (dispatch) => dataCombine.queryWeightManage().then((res) => {
    dispatch(actions.dataCombine.queryWeightManage(res));
    if (res.httpCode != '200')
        error(res);
});

//删除当前用户权重比例
export const delWeightManage = (params, cb) => (dispatch) => dataCombine.delWeightManage(params).then((res) => {
    dispatch(actions.dataCombine.delWeightManage(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

//增加修改当前用户权重比例
export const editWeightManage = (params, cb) => (dispatch) => dataCombine.editWeightManage(params).then((res) => {
    dispatch(actions.dataCombine.editWeightManage(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

// 获取权重详情
export const detailWeight = (params) => (dispatch) => dataCombine.detailWeight(params).then((res) => {
    dispatch(actions.dataCombine.detailWeight(res));
    if (res.httpCode != '200')
        error(res);
});

//查询配置表名
export const queryConfigTableName = () => (dispatch) => dataCombine.queryConfigTableName().then((res) => {
    dispatch(actions.dataCombine.queryConfigTableName(res));
    if (res.httpCode != '200')
        error(res);
});

//根据表名查询配置列名
export const queryConfigColumn = (params, cb) => (dispatch) => dataCombine.queryConfigColumn(params).then((res) => {
    dispatch(actions.dataCombine.queryConfigColumn(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

// 设置权重是否可用
export const setWeightManageStatus = (params,cb) => dataCombine.setWeightManageStatus(params).then((res) => {
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});


/**
 * 权重表管理 action
 */

// 查询表对应下的所有列名
export const queryColmnName = (params, cb) => (dispatch) => dataCombine.queryColmnName(params).then((res) => {
    dispatch(actions.dataCombine.queryColmnName(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

//查询权重表管理配置列表
export const queryWeightTable = () => (dispatch) => dataCombine.queryWeightTable().then((res) => {
    dispatch(actions.dataCombine.queryWeightTable(res));
    if (res.httpCode != '200')
        error(res);
});

//保存或修改权重表管理配置
export const updateWeightTable = (params, cb) => (dispatch) => dataCombine.updateWeightTable(params).then((res) => {
    dispatch(actions.dataCombine.updateWeightTable(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

// 获取详细数据
export const weightTableDetail = (params, cb) => (dispatch) => dataCombine.weightTableDetail(params).then((res) => {
    dispatch(actions.dataCombine.weightTableDetail(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});

// 删除管理配置信息
export const weightTableDel = (params, cb) => (dispatch) => dataCombine.weightTableDel(params).then((res) => {
    dispatch(actions.dataCombine.weightTableDel(res));
    if (res.httpCode != '200')
        error(res);
    else {
        if (typeof cb === 'function')
            cb(res);
    }
});
