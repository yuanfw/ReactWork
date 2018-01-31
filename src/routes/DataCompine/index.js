/**
 * Created by zhangyuanyuan031 on 17/9/8.
 */

import AwaitCombine from 'comp/DataCombine/AwaitCombine';
import Combine from 'comp/DataCombine/Combine';
import WeightManage from 'comp/DataCombine/WeightManage';
import WeightTable from 'comp/DataCombine/WeightTable';
import CardPriority from 'comp/DataCombine/CardPriority'

export default [
    {
        path:"dataCombine/awaitCombine",
        component:AwaitCombine
    },
    {
        path:"dataCombine/combine",
        component:Combine
    },
    {
        path:"dataCombine/weightManage",
        component:WeightManage
    },
    {
        path:"dataCombine/weightTable",
        component:WeightTable
    },
    {
        path:"dataCombine/cardPriority",
        component:CardPriority
    }
]
