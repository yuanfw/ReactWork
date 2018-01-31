/**
 * 存放一些公共的接口
 * Created by zhangyuanyuan031 on 17/8/1.
 */

import ajax from 'util/ajax';

//查询数据字典信息
export const dataDictonary = (params) => ajax("bdc/ecif/api/codeDict.do",params,"GET");
