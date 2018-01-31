/**
 * Created by zhangyuanyuan031 on 17/9/8.
 */

import React from 'react'
import {selectTablesLable, seriData,arrAddOrRemove} from 'util'
import Dialog from 'util/Dialog'
import Confirm from 'util/Confirm'
import Rconnect from 'util/Rconnect'
import Select from 'util/Select'
import Alert from 'util/Alert'
import {
    queryColmnName,
    queryWeightTable,
    updateWeightTable,
    weightTableDel,
    weightTableDetail
} from 'action/datacombine-action'

import {dataDicAction} from 'action/common-action'
import TrData from './TrData'


class WeightTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableComment:"",
            columnComment:"",
            dialog: false,
            dialogTitle:'新增',
            confirm: false,
            alert:false,
            checkids:[], // 存放已选中的ids
            formData:{
                tableName:"",
                columnName:"",
                columnDesc:""
            },
            edit:""
        }
    }

    // 向this.state.checkids 中加入或者删除数据
    addOrRemove(flag,val){
        arrAddOrRemove(this.state.checkids,flag,val);
    }

    // 组件加载完成后执行的钩子函数
    componentDidMount() {
        this.props.dataDicAction({codeType: "AAC018"});
        this.props.queryWeightTable();

    }

    cancel() {
        this.setState({dialog: false})
    }

    // 编辑提交事件
    commit() {
        let {tableName, columnName, columnDesc} = this.refs;
        let values = seriData({tableName, columnName, columnDesc});
        values.tableComment =this.state.tableComment;
        values.columnComment = this.state.columnComment;
        if(this.state.edit === 'update'){ // 如何是修改加一个id属性
            values.id=this.state.checkids[0];
        }
        this.props.updateWeightTable(values,(res)=>{
            if(res.httpCode == '200'){
                this.setState({dialog: false,alert:true});
                this.props.queryWeightTable();
            }
        });
    }

    add() {
        this.setState({
            edit:'add',
            formData:{
                tableName:"",
                columnName:"",
                columnDesc:""
            },
            dialog: true,
            dialogTitle:'新增'
        })
    }

    update() {
        if(this.state.checkids.length === 0)
            alert("请选中至少一条数据!!!");
        else if(this.state.checkids.length === 1){
            this.props.weightTableDetail({id:this.state.checkids[0]},(res)=>{
                if(res.httpCode == '200'){
                    this.props.queryColmnName({tableName: res.data.tableName},(colres)=>{
                        if(colres.httpCode == '200')
                        this.setState({
                            tableComment:res.data.tableComment,
                            columnComment:res.data.columnComment,
                            formData:{
                                tableName:res.data.tableName,
                                columnName:res.data.columnName,
                                columnDesc:res.data.columnDesc
                            },
                            dialog: true,
                            dialogTitle:'修改',
                            edit:'update'
                        });
                    });
                }
            });
        }else
            alert("您只能更新一条数据!!!");
    }

    // 删除事件
    del() {
        if(this.state.checkids.length === 0)
            alert("请选中至少一条数据!!!");
        else
            this.setState({confirm: true})
    }

    delOk() {  // 确定删除
        this.props.weightTableDel({ids:this.state.checkids},(res)=>{
            this.state.checkids = [];
            $("input[type=checkbox]").each((index,item) => {
               if(item.checked){
                   item.checked = false;
               }
            });
            this.confirmHide();
            this.props.queryWeightTable();
        })
    }

    // 取消删除
    confirmHide() {
        this.setState({confirm: false})
    }

    //表修改时触发changes
    tableChange(val) {
        this.state.tableComment = val.label;
        this.props.queryColmnName({tableName: val.value});
    }

    colmnChange(val) {
        this.state.columnComment = val.label;
        this.refs.columnDesc.value = val.label;
    }

    onHideAlert(){
        this.setState({alert:false});
    }

    // 回写checkbox 选错的bug
    componentDidUpdate(){
     $("input[type=checkbox]").each((index,node) => {
         if(node){
            let nodeId=node.getAttribute("name");
            if(this.state.checkids.length > 0){
                this.state.checkids.forEach((id,index) => {
                    node.checked = (id === nodeId);
                });
            }
         }
     });
    }

    render() {

        return <div className="wait-combine">
            <div className="tips">
                <span>权重表管理</span>
            </div>

            <main>
                <div className="row" style={{"margin-bottom": "5px"}}>
                    <button className="btn btn-info mybtn" type="button" onClick={this.add.bind(this)}>新增</button>
                    <button className="btn btn-info mybtn" type="button" onClick={this.update.bind(this)}>修改</button>
                    <button className="btn btn-info mybtn" type="button" onClick={this.del.bind(this)}>删除</button>
                </div>

                <div>
                    <table className="table" style={{"margin-top": "10px", width: "99%"}}>
                        <thead>
                        <tr>
                            <th width="50px"></th>
                            <th style={{"text-align": "center"}} width="50px">序列</th>
                            <th>表名</th>
                            <th>数据库列名</th>
                            <th>描述</th>
                            <th width="150px">更新时间</th>
                            <th width="150px">创建时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.tableList.payload && this.props.tableList.payload.length > 0 ? this.props.tableList.payload.map((item,index) => <TrData key={index} index={index} data={item} checkMethod={this.addOrRemove.bind(this)}/> ) : ""
                        }
                        </tbody>
                    </table>
                </div>
            </main>

            <Dialog options={{show: this.state.dialog, bsSize: "normal", title:this.state.dialogTitle, onHide: this.cancel.bind(this)}}>
                <div>
                    <table className="edit-table table">
                        <tbody>
                        <tr>
                            <td width="125px">表名</td>
                            <td>
                                <Select
                                    options={selectTablesLable(this.props.allTables.payload, 'AAC018')}
                                    ref="tableName"
                                    onChange={this.tableChange.bind(this)}
                                    value={this.state.edit=== 'update' ? this.state.formData.tableName : ""}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>数据库列名</td>
                            <td>
                                <Select
                                    options={this.props.colmns.payload}
                                    ref="columnName"
                                    onChange={this.colmnChange.bind(this)}
                                    value={this.state.edit=== 'update' ? this.state.formData.columnName:""}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>描述</td>
                            <td>
                                <input type="text" ref="columnDesc" defaultValue={this.state.edit=== 'update' ? this.state.formData.columnDesc : ''} className="form-control"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <div className="btn-bottom">
                    <button onClick={this.commit.bind(this)} className="btn btn-info mybtn f-right" type="button">
                        确定
                    </button>
                </div>
            </Dialog>

            <Confirm options={{
                show: this.state.confirm,
                confirm: this.delOk.bind(this),
                onHide: this.confirmHide.bind(this),
                content: "你确定要删除吗?",
                title: "删除"
            }}/>
            <Alert options={{show:this.state.alert,onHide:this.onHideAlert.bind(this),title:"保存用户数据",content:"保存成功"}}/>
        </div>
    }

}

export default Rconnect((state) => {
    return {
        'allTables': state['commonAction/dataDictonary2'],
        'colmns': state['dataCombine/queryColmnName'],
        'tableList': state['dataCombine/queryWeightTable'],
        'commit':state['dataCombine/updateWeightTable'],
        'del':state['dataCombine/weightTableDel'],
        'detail':state['dataCombine/weightTableDetail']
    }
}, {
    dataDicAction,
    queryColmnName,
    queryWeightTable,
    updateWeightTable,
    weightTableDel,
    weightTableDetail
}, WeightTable);
