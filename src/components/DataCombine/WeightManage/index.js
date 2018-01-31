/**
 * Created by zhangyuanyuan031 on 17/9/8.
 */
import 'assets/less/wait-combine.less'

import React from 'react'
import Trdata from './Trdata'
import Rconnect from 'util/Rconnect'
import Select from 'util/Select'
import Alert from 'util/Alert'
import Confirm from 'util/Confirm'
import Dialog from 'util/Dialog'
import {
    queryWeightManage,
    delWeightManage,
    editWeightManage,
    detailWeight,
    queryConfigTableName,
    queryConfigColumn
} from 'action/datacombine-action'

import {seriData} from 'util'

class WeightManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"",
            tableName:"",
            columnName:"",
            columnDesc:"",
            weightRatio:"",
            dialogTitle:"新增",
            dialog: false,
            operate: "",
            alert:false,
            alertTitle:'保存',
            alertContent:'保存成功',
            confirmAlert:false,
            tableNameLabel:"",
            columNameLabel:""
        }
    }

    componentDidMount() {
        this.props.queryWeightManage();
        this.props.queryConfigTableName();
    }

    //弹出框取消
    cancel() {
        this.setState({dialog: false})
    }

    //新增
    add() {
        this.setState({dialog: true, operate: "add",dialogTitle:"新增"})
    }

    //修改数据
    update(data,event) {
        this.props.queryConfigColumn({tableName:data.tableName},(res)=>{
            if(res.httpCode === 200){
                this.state.tableNameLabel = data.tableComment;
                this.state.columNameLabel = data.columnComment;
                this.setState({
                    id:data.id,
                    dialog: true,
                    dialogTitle:"编辑",
                    operate: "update",
                    tableName:data.tableName,
                    columnName:data.columnName,
                    columnDesc:data.columnDesc,
                    weightRatio:data.weightRatio
                })
            }
        });
    }

    // 删除
    del(id,event) {
        this.setState({
            id:id,
            operate:"del",
            confirmAlert:true
        });
    }

    // 确认提交
    commit() {
        let {tableName, columnName, columnDesc, weightRatio} = this.refs;
        let params = seriData({tableName, columnName, columnDesc, weightRatio});
        params.tableComment = this.state.tableNameLabel;
        params.columnComment = this.state.columNameLabel;
        if(this.state.operate === 'update')
            params.id = this.state.id;
        this.props.editWeightManage(params,(res)=>{
            if(res.httpCode === 200){
                this.setState({
                    dialog:false,
                    alert:true,
                    alertTitle:'保存',
                    alertContent:'保存成功'
                })
            }
        });
    }

    // 当表修改时触发事件
    tableChange(vItem) {
        this.state.tableNameLabel = vItem.label;
        this.props.queryConfigColumn({tableName: vItem.value})
    }

    columnsChange(checkVal) {
        this.state.columNameLabel = checkVal.label;
        this.refs.columnDesc.value = checkVal.label;
    }
// 点击保存成功的确定事件
    alertHide(){
        this.setState({alert:false});
        this.props.queryWeightManage();
    }

    //确定删除要执行的事件
    confirm(){
        this.props.delWeightManage({ids:[this.state.id]},(res) => {
            if(res.httpCode === 200){
                this.confirmHide();
                this.props.queryWeightManage();
            }
        });
    }

    confirmHide(){
        this.setState({confirmAlert:false});
    }

    render() {
        return <div className="wait-combine">
            <div className="tips">
                <span>权重管理</span>
            </div>

            <main>
                <div className="row" style={{"margin-bottom": "5px"}}>
                    <button className="btn btn-info mybtn" type="button" onClick={this.add.bind(this)}>增加</button>
                </div>

                <div>
                    <table className="table" style={{"margin-top": "10px", width: "99%"}}>
                        <thead>
                        <tr>
                            <th style={{"text-align": "center"}} width="50px">序列</th>
                            <th>表名</th>
                            <th>数据库字段名称</th>
                            <th>字段描述</th>
                            <th width="120px">权重比例（%）</th>
                            <th width="200px">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.queryList.payload && this.props.queryList.payload.length > 0 ?
                                this.props.queryList.payload.map((item,index) => (<Trdata index={index} key={item.id} del={this.del.bind(this)} data={item} update={this.update.bind(this)}/>)) : ""
                        }
                        </tbody>
                    </table>
                </div>
            </main>

            <Dialog options={{show: this.state.dialog, bsSize: "normal", title: this.state.dialogTitle, onHide: this.cancel.bind(this)}}>
                <div>
                    <table className="edit-table table">
                        <tbody>
                        <tr>
                            <td width="125px">表名</td>
                            <td>
                                <Select onChange={this.tableChange.bind(this)}
                                        options={this.props.tableNames.payload}
                                        value={this.state.operate === 'update' ? this.state.tableName : ""}
                                        ref="tableName"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>数据库字段名称</td>
                            <td>
                                <Select options={this.props.configColumns.payload}
                                        ref="columnName"
                                        value={this.state.operate === 'update' ? this.state.columnName : ""}
                                        onChange={this.columnsChange.bind(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>字段描述</td>
                            <td>
                                <input type="text" className="form-control" ref="columnDesc" defaultValue={this.state.operate === 'update' ? this.state.columnDesc : ""}/>
                            </td>
                        </tr>
                        <tr>
                            <td>权重比例（%）</td>
                            <td>
                                <input type="text" className="form-control" ref="weightRatio" defaultValue={this.state.operate === 'update' ? this.state.weightRatio :""}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn-bottom">
                    <button onClick={this.commit.bind(this)} className="btn btn-info mybtn f-right" type="button">确定</button>
                </div>
            </Dialog>
            <Confirm options={{show:this.state.confirmAlert,confirm:this.confirm.bind(this),onHide:this.confirmHide.bind(this),content:"你确定要删除吗?",title:"删除权重管理"}}/>
            <Alert options={{show:this.state.alert,onHide:this.alertHide.bind(this),title:this.state.alertTitle,content:this.state.alertContent}}/>
        </div>
    }
}

export default Rconnect((state, props) => {
    return {
        'queryList': state['dataCombine/queryWeightManage'],
        'delWeightManage': state['dataCombine/delWeightManage'],
        'eidtWeightManage': state['dataCombine/editWeightManage'],
        'detailWeight': state['dataCombine/detailWeight'],
        'tableNames': state['dataCombine/queryConfigTableName'],
        'configColumns': state['dataCombine/queryConfigColumn']
    };
}, {
    queryWeightManage,
    delWeightManage,
    editWeightManage,
    detailWeight,
    queryConfigTableName,
    queryConfigColumn
}, WeightManage);
