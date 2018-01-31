/**
 * Created by zhangyuanyuan031 on 17/5/26.
 */

import queryDataService, {peopleMes, queryMedicalInsurRcode,expenseReport} from 'service/query-data'
import {error} from 'util'
import {createActions} from 'redux-actions';

// 精准查询
const queryAllPeople = (peopleData) => ({
    type: "querypeople",
    payload: peopleData
});

// 查询为员详细信息
const queryDetailPeopleMes = (mes) => ({
    type: "peopleMes",
    payload: mes
});

export const queryPeople = (searchData,cb) => {
    return (dispatch) => {
        queryDataService.queryPeople(searchData).then((res) => {
            dispatch(queryAllPeople(res));
            if (res.httpCode !== "200") {
                if(typeof cb === 'function') cb();
                error(res);
            }
        })
    }
};

export const peopleMesAction = (parames,cb) => {
    return (dispatch) => {
        peopleMes(parames).then((res) => {
            dispatch(queryDetailPeopleMes(res.data));
            if(typeof cb === 'function') cb(res);
            if (res.httpCode !== "200") {
                error(res);
            }
        })
    }
};


/*
* 操作ODS
* */

const actions = createActions({
    ecifManage:{
        medicalInsuRecod(res){
            return res.data;
        },
        expenseReport(res){
            return res.data;
        }
    }
});


// 人员使用药品信息记录
export const medialInsurRecordAction = (params) => (dispatch) => queryMedicalInsurRcode(params).then((res) => {
    dispatch(actions.ecifManage.medicalInsuRecod(res));
    if(res.httpCode != '200'){
        error(res);
    }
});

// 人员报表记录

export const expenseReportAction = (params) => (dispatch) => expenseReport(params).then((res) => {
    dispatch(actions.ecifManage.expenseReport(res));
    if(res.httpCode != '200'){
        error(res);
    }
});

