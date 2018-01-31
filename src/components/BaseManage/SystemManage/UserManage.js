/**
 * 用户管理component
 */
import React from 'react'
import {getUserListAction, getUserDetailAction, reviseUserAction, deleteUserAction} from 'action/user-manage'
import Rconnect from 'util/Rconnect'

import TablePages from 'util/TablePages'
import PageUserManage from './PageUserManage'
import "assets/less/base-manage.less"

class UserManage extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            nowpage: 1
        }
    }
    
    pages(key) {
        this.state.nowpage = key;
        this.action();
    }

	componentDidMount() {
        this.props.getUserListAction();
    }
	
    render() {
        let {payload} = this.props, data, pages = 1, userListContent = [];

        if ({payload} && {payload}.payload) {
            data = {payload}.payload;
        }
        
        if (data) {
            pages = data.pages;
            if (data.data && data.data.length > 0) {
                userListContent = data.data.map((item, i) => {
                    return <PageUserManage key={i} data={item} index={i + 1}/>;
                }); 
            }
        } else {
            userListContent = [];
            pages = 1
        }

        return (
            <div className="base-manage">
                <div className="tips">
                    <span>用户管理</span>
                </div>
                <main style={{"overflow": "scroll"}}>
                    <table className="table" style={{"width": "99%"}}>
                        <thead>
                            <tr>
                                <th width="60px">序号</th>
                                <th>账号</th>
                                <th>用户名</th>
                                <th>性别</th>
                                <th>用户类型</th>
                                <th>状态</th>
                                <th width="130">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userListContent}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style={{"text-align": "right"}} colSpan="13">
                                    <nav aria-label="Page navigation" style={{float: "right"}}>
                                    <TablePages
                                        totals={pages}
                                        onSelect={this.pages.bind(this)}
                                        activePage={this.state.nowpage} />
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

export default Rconnect((state, props) => state.userManage, {
    getUserListAction,
    getUserDetailAction,
    reviseUserAction,
    deleteUserAction
}, UserManage)