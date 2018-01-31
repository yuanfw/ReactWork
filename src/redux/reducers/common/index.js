/**
 * 公共的reducer
 * Created by zhangyuanyuan031 on 17/8/1.
 */

import {handleAction} from 'redux-actions'

export default {
    dataDic: handleAction("commonAction/dataDictonary", (state, action) => Object.assign({}, {payload: action.payload}), {}),
    'commonAction/dataDictonary2': handleAction('commonAction/dataDictonary2', (state, action) => Object.assign({}, {payload: action.payload}), {})
}
