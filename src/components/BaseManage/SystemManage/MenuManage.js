/**
 * 菜单管理
 */
import React from 'react'
import {getMenuAction} from 'action/base-menu'
import {addMenuAction, reviseMenuAction, deleteMenuAction} from 'action/menu-manage'
import Rconnect from 'util/Rconnect'
import RCTree from 'util/RCTree'
import Confirm from 'util/Confirm'
import Dialog from 'util/Dialog'
import "assets/less/base-manage.less"

class MenuManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            revision: false,
            addition: false,
            deletion: false,
            addBtn: false
        }
    }

    componentDidMount() {
        this.props.getMenuAction();
    }

    onSelect(selectedId, info) {
        info.selectedNodes[0].props.path ? this.state.addBtn = true : this.state.addBtn = false;
        this.setState({selectedId: selectedId, info: info});
    }

    // 发起新增菜单&打开弹框
    addMenu() {
        this.setState({addition: true});
    }

    // 确认新增菜单
    confirmAdd() {
        let {_parentMenuName, _menuName, _isLeafNode, _menuDesc, _menuOrder, _menuState, _menuRoute} = this.refs;
        let menuParams = {
            parentName: _parentMenuName.value.trim(),
            menuName: _menuName.value.trim(),
            leaf: _isLeafNode.value,
            menuDesc: _menuDesc.value.trim(),
            sortNo: _menuOrder.value,
            menuState: _menuState.value,
            menuRoute: _menuRoute.value.trim()
        };
        this.props.addMenuAction(menuParams);
        this.setState({addition: false});
    }

    // 取消新增菜单
    cancelAdd() {
        this.setState({addition: false});
    }

    // 发起修改菜单&打开弹框
    reviseMenu() {
        this.setState({revision: true});
    }

    // 确认修改菜单
    confirmRevise() {
        let {menuName, isLeafNode, menuDesc, menuOrder, menuState, menuRoute} = this.refs;
        let menuParams = {
            menuName: menuName.value.trim(),
            leaf: isLeafNode.value,
            menuDesc: menuDesc.value.trim(),
            sortNo: menuOrder.value,
            menuState: menuState.value,
            menuRoute: menuRoute.value.trim()
        };
        this.props.reviseMenuAction(menuParams);
        this.setState({revision: false});
    }

    // 取消修改菜单
    cancelRevise() {
        this.setState({revision: false});
    }

    // 发起删除菜单&打开弹框
    deleteMenu() {
        this.setState({deletion: true});
    }

    // 确认删除菜单
    confirmDelete() {
        let deleteMenuParams = {
            id: this.state.selectedId[0]
        };
        this.props.deleteMenuAction(deleteMenuParams);
        this.setState({deletion: false});
    }

    // 取消删除菜单
    cancelDelete() {
        this.setState({deletion: false});
    }

    render() {
        let {payload} = this.props;
        return(
            <div className="base-manage">
                <div className="tips">
                    <span>菜单管理</span>
                </div>
                <main>
                    <div className="nanae">
                        {payload && payload.output && payload.output.length > 0 ?
                            <RCTree expand={true} data={payload.output} onSelect={this.onSelect.bind(this)}/> : ""}
                    </div>
                    <div className="side-meridian">
                        <h3 className="tips-title">菜单信息</h3>
                        <div>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <span>菜单名称</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input
                                            className="form-control"
                                            type="text"
                                            ref="menuName"
                                            value={this.state.info ? this.state.info.selectedNodes[0].props.title : ''}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>是否叶子节点</span>
                                    </td>
                                    <td className="inport-stile">
                                        <select
                                            className="form-control"
                                            ref="isLeafNode"
                                            value={this.state.info && this.state.info.selectedNodes[0].props.children ? '是' : '否'}>
                                            <option value="0">是</option>
                                            <option value="1">否</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>菜单描述</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input className="form-control" type="text" ref="menuDesc"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>菜单顺序</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input className="form-control" type="number" ref="menuOrder"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>菜单状态</span>
                                    </td>
                                    <td className="inport-stile">
                                        <select className="form-control" ref="menuState">
                                            <option value="0">有效</option>
                                            <option value="1">无效</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>路由</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input
                                            className="form-control"
                                            type="text"
                                            ref="menuRoute"
                                            value={this.state.info ? this.state.info.selectedNodes[0].props.path : ''}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="btn-bottom">
                            <button className="btn btn-sm btn-primary" onClick={this.addMenu.bind(this)} disabled={this.state.addBtn}>新增</button>
                            <button className="btn btn-sm btn-primary" onClick={this.reviseMenu.bind(this)}>修改</button>
                            <button className="btn btn-sm btn-primary" onClick={this.deleteMenu.bind(this)}>删除</button>
                        </div>
                    </div>
                </main>
                <Confirm options={{show:this.state.revision,confirm:this.confirmRevise.bind(this),onHide:this.cancelRevise.bind(this),content:"确认要修改吗?",title:"修改菜单"}}/>
                <Confirm options={{show:this.state.deletion,confirm:this.confirmDelete.bind(this),onHide:this.cancelDelete.bind(this),content:"确认要删除吗?",title:"删除菜单"}}/>
                <Dialog options={{show:this.state.addition,onHide:this.cancelAdd.bind(this),title:"添加菜单",bsSize:"normal"}}>
                    <div>
                        <table className="text-right dialog-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <span>父菜单名称</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input
                                            className="form-control"
                                            type="text"
                                            disabled
                                            ref="_parentMenuName"
                                            value={this.state.info ? this.state.info.selectedNodes[0].props.title : '--'} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>菜单名称</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input className="form-control" type="text" ref="_menuName" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>是否叶子节点</span>
                                    </td>
                                    <td className="inport-stile">
                                        <select className="form-control" ref="_isLeafNode">
                                            <option value="0">是</option>
                                            <option value="1">否</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>菜单描述</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input className="form-control" type="text" ref="_menuDesc" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>菜单顺序</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input className="form-control" type="number" ref="_menuOrder" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>菜单状态</span>
                                    </td>
                                    <td className="inport-stile">
                                        <select className="form-control" ref="_menuState">
                                            <option value="0">有效</option>
                                            <option value="1">无效</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>路由</span>
                                    </td>
                                    <td className="inport-stile">
                                        <input className="form-control" type="text" ref="_menuRoute" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button className="btn btn-sm btn-default" onClick={this.confirmAdd.bind(this)}>确认</button>
                        <button className="btn btn-sm btn-default" onClick={this.cancelAdd.bind(this)}>取消</button>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default Rconnect((state, props) => state.menuManage, {
    getMenuAction,
    addMenuAction,
    reviseMenuAction,
    deleteMenuAction
}, MenuManage);
