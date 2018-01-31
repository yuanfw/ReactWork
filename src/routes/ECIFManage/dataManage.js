/**
 * Created by zhangyuanyuan031 on 17/6/8.
 */

import PeopleManage from 'comp/ECIFManage/ManageData/PeopleManage'
import OrgManage from 'comp/ECIFManage/ManageData/OrgManage'
import OrgManageUpdate from 'comp/ECIFManage/ManageData/OrgManageUpdate'

export default [
    {
        path: "ecifManage/managePeople",
        component: PeopleManage
    }, {
        path: "ecifManage/manageOrg",
        component: OrgManage
    },{
        path:"ecifManage/manageOrg/orgManageUpdate/:globalOrgId/:pcno",
        component:OrgManageUpdate
    }
]
