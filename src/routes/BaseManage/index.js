import MenuManage from 'comp/BaseManage/SystemManage/MenuManage'
import PrivilegeManage from 'comp/BaseManage/SystemManage/PrivilegeManage'
import UserManage from 'comp/BaseManage/SystemManage/UserManage'

export default [{
    path: "baseManage/menuManage",
    component: MenuManage
}, {
    path: 'baseManage/privilegeManage',
    component: PrivilegeManage
}, {
    path: 'baseManage/userManage',
    component: UserManage
}]
