/**
 * Created by zhangyuanyuan031 on 17/4/25.
 */

import moment from 'moment'
import {handleAction} from 'redux-actions'

/**
 * 格式化日期
 * @param data
 * @param format
 * @returns {string}
 */
export const format = (date, fm) => {
    return moment(date).format(fm);
};

/**
 * 封装一个增强版的handleAction
 * @param str dispatch 中触发的字符串
 * @param flag 为true时只留上一次的 state中的数据,为false获取最新请求数据,默认为false
 */
export const hdAction = (str, flag = false) => {
    if (flag)
        return handleAction(str, (state, action) => Object.assign({}, state, {payload: action.payload}), {payload: undefined});
    else
        return handleAction(str, (state, action) => Object.assign({}, {payload: action.payload}), {payload: undefined});
};

/**
 * 向数据中添加或者删除数据
 * @param flag 为 true时向数据中添加数据,为false时从数据删除数据
 * @param val
 */
export const arrAddOrRemove = (arr, flag, val) => {
    if (arr.length === 0) {
        if (flag)
            arr.push(val);
        else
            return;
    } else {
        let i = arr.indexOf(val);
        if (flag) {
            if (i === -1)
                arr.push(val);
            else
                return;
        } else {
            if (i === -1)
                return;
            else
                arr.splice(i, 1);
        }
    }
};

/**
 * 字符串的trim函数
 * @param str
 */
export const trim = (str) => {
    if (str && str.length > 0)
        return str.replace(/^\s+|\s+$/, "");
};

/**
 * 判断一个对象是否为 null
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = (obj) => {
    for (var n in obj) {
        return false
    }
    return true;
};

//对后台返回的数据code值不是 200 的统一处理
export const error = (res) => {
    if (res && res.httpCode != '200' && res.msg) {
        if (res.httpCode == 401) {
            window.location.href = "/bdc-web/#/";
        }else{
            alert(res.msg);
        }
        throw new Error(res.msg);
    }
};


/**
 * 对数据字典的操作
 * @param arr
 * @param codeType
 */

//过滤数据字典信息
export const filterData = (arr, codeType) => arr && arr.length > 0 ? arr.filter((item) => item.codeType === codeType) : [];

// 根据字典 codeType 和 codeValue 精确字典的对应的名称
export const dicVal = (arr, codeType, codeVal) => {
    if (arr && arr.length > 0) {
        let codeName;
        filterData(arr, codeType).forEach((item) => {
            if (item.codeValue === codeVal) {
                codeName = item.codeName;
                return false;
            }
        });
        return codeName;
    } else {
        return [];
    }
};

// 得到下拉列表的数据格式
export const selectLable = (arr, codeType) => {
    let labArr = filterData(arr, codeType);
    return labArr.length > 0 ? labArr.map((item) => {
            return {label: item.codeName, value: item.codeValue}
        }) : [];
};

// 序列化ref得到的传递给后台的数据
export const seriData = (...args) => {
    if (args.length === 0)
        return;

    let obj = {};

    for (let i = 0, len = args.length; i < len; i++) {
        let item = args[i];
        for (var key in item) {
            let childItem = item[key].value;
            if (typeof childItem === 'string')
                obj[key] = childItem.trim();
            else
                obj[key] = childItem;
        }
    }
    return obj;
};


// 下拉列表中的显示显示表名
export const selectTablesLable = (arr, codeType) => {
    let labArr = filterData(arr, codeType);
    return labArr.length > 0 ? labArr.map((item) => {
            return {label: item.commentComt, value: item.codeName}
        }) : [];
};


