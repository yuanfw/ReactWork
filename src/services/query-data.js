/**
 * Created by zhangyuanyuan031 on 17/5/26.
 */

import ajax from 'util/ajax';

// 精准查询
export default {
    queryPeople(searchdata){
        return ajax(
            "bdc/ecif/api/customerIdentify.do",
            searchdata,
            "POST"
        )
    }
}

// 查询为员详细信息
export const peopleMes=(parame)=>{
    return ajax("bdc/ecif/api/queryPersonDetail.do",parame,"POST");
};

/*
*
* 操作ODS
*
* */

// 人员就诊信息时间轴查询
export const queryMedicalInsurRcode=(parameters)=> ajax("bdc/ecif/api/queryVisitRecord.do",parameters,"POST");

// 人员费用报表查询
export const expenseReport = (params) => ajax('bdc/ecif/api/queryExpenseReport.do',params,"POST");
