import React from 'react'
import Confirm from 'util/Confirm'
import Dialog from 'util/Dialog'
import {withRouter} from 'react-router'

class TrData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            revision: false,
            deletion: false
        }
    }

    // 打开修改用户弹窗
    reviseUser() {
        this.setState({revision: true});
    }

    // 确认修改用户
    confirmRevise() {
        let {} = this.refs;
        let reviseParams = {};
        this.props.reviseUserAction(reviseParams);
        this.setState({revision: false});
    }

    // 取消修改用户
    cancelRevise() {
        this.setState({revision: false});
    }

    // 打开删除用户弹窗
    deleteUser() {
        this.setState({deletion: true});
    }

    // 确认删除用户
    confirmDelete() {
        let {} = this.refs;
        let deleteParams = {};
        this.props.deleteUserAction(deleteParams);
        this.setState({deletion: false});
    }

    // 取消删除用户
    cancelDelete() {
        this.setState({deletion: false});
    }

    render() {
        let {data, index} = this.props;
        return (
            <tr>
                <td>{index}</td>
                <td>{data.account}</td>
                <td>{data.userName}</td>
                <td>{data.sex === "0" ? '男' : '女'}</td>
                <td>{data.userTypeText}</td>
                <td>{data.enable === "0" ? '有效' : '无效'}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-sm btn-default"
                        style={{"margin-right": "10px"}}
                        onClick={this.reviseUser.bind(this)}>修改</button>
                    <button
                        type="button"
                        className="btn btn-sm btn-default"
                        onClick={this.deleteUser.bind(this)}>删除</button>
                        <Confirm options={{show:this.state.deletion,confirm:this.confirmDelete.bind(this),onHide:this.cancelDelete.bind(this),content:"确认要删除吗?",title:"删除用户"}} />
                        <Dialog options={{show:this.state.revision,onHide:this.cancelRevise.bind(this),title:"修改用户",bsSize:"normal"}}>
                            <div>
                                <table className="text-right dialog-table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>账号</span>
                                            </td>
                                            <td className="inport-stile">
                                                <input className="form-control" type="text" ref="" value={data.account} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>用户名</span>
                                            </td>
                                            <td className="inport-stile">
                                                <input className="form-control" type="text" ref="" value={data.userName} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>性别</span>
                                            </td>
                                            <td className="inport-stile">
                                                <select
                                                    className="form-control"
                                                    ref=""
                                                    value={data.sex}>
                                                    <option value="0">男</option>
                                                    <option value="1">女</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>用户类型</span>
                                            </td>
                                            <td className="inport-stile">
                                                <select
                                                    className="form-control"
                                                    ref=""
                                                    value={data.userType}>
                                                    <option value="1">经办员</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>状态</span>
                                            </td>
                                            <td className="inport-stile">
                                                <select
                                                    className="form-control"
                                                    ref=""
                                                    value={data.enable}>
                                                    <option value="0">有效</option>
                                                    <option value="1">无效</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <button className="btn btn-sm btn-default" onClick={this.confirmRevise.bind(this)}>确认</button>
                                <button className="btn btn-sm btn-default" onClick={this.cancelRevise.bind(this)}>取消</button>
                            </div>
                        </Dialog>
                </td>
            </tr>
        )
    }
}

export default withRouter(TrData);