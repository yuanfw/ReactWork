/**
 * 权限管理component
 */
import React from 'react'
import "assets/less/base-manage.less"
import Rconnect from 'util/Rconnect'
import TablePages from 'util/TablePages'
import {grantPrivilegeAction, liftPrivilegeAction} from 'action/privilege-manage'

class PrivilegeManage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.grantPrivilegeAction();
        // this.props.liftPrivilegeAction();
    }

    render() {
        let {payload} = this.props;
        return (
            <div className="base-manage">
                <div className="tips">
                    <span>权限管理</span>
                </div>
                <main>
                    <table className="table" style={{width: "99%"}}>
                        <thead>
                            <tr>
                                <th width="60px">序号</th>
                                <th>用户</th>
                                <th>机构名称</th>
                                <th>机构类型</th>
                                <th>联系人</th>
                                <th>联系电话</th>
                                <th>地址</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                        <tfoot>
                            <tr>
                                <td style={{"text-align": "right"}} colSpan="13">
                                    <nav aria-label="Page navigation" style={{float: "right"}}>
                                        <TablePages />
                                    </nav>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </main>
            </div>
        )
    }

}

export default Rconnect((state, props) => state.privilegeManage, {
    grantPrivilegeAction,
    liftPrivilegeAction
}, PrivilegeManage)
