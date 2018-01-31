/**
 * Created by zhangyuanyuan031 on 17/10/11.
 */
import React from 'react'
import {selectTablesLable, seriData, arrAddOrRemove} from 'util'
import Tr from './Tr'

import Dialog from 'util/Dialog'
import Confirm from 'util/Confirm'
import Alert from 'util/Alert'
import Rconnect from 'util/Rconnect'
import Select from 'util/Select'

import {priorityList, priorityDel, dictionaryCards, priorityEdit, priorityDetail} from 'action/datacombine-action'

class CardPriority extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkids: [], // 存放已选中的ids
            dialogShow: false,
            dialogTitle: '新增',
            confirmShow: false,
            edit: '', // 用来标记是增加还是修改
            alert: false,
            alertTitle: '',
            alertContent: '',
            changeVal: {},
            dragStartId:undefined, // 记录开始拖拽行的id
            rowsIds:[] // 存放拖拽后行的所有id

        }
    }

    componentDidMount() {
        this.props.dictionaryCards();
        this.props.priorityList();
    }

    setId(flag, val) {
        arrAddOrRemove(this.state.checkids, flag, val);
    }

    add() {
        this.props.dictionaryCards();
        this.props.cardDetail = false;// 清空修改数据
        this.setState({
            dialogShow: true,
            dialogTitle: '新增',
            edit: 'add'
        })
    }


    commit() {
        let {remark} = this.refs;
        let params = seriData({remark});
        params.codeName = this.state.changeVal.label;
        params.codeValue = this.state.changeVal.value;
        if (this.state.edit === 'update') {
            params.id = this.state.checkids[0]
        }
        priorityEdit(params, () => {
            this.hide();
            this.props.priorityList();
        });
    }

    del() {
        if (this.state.checkids.length > 0) {
            this.setState({
                confirmShow: true
            });
        } else {
            this.setState({
                alert: true,
                alertTitle: '删除数据',
                alertContent: '请选择至少一条数据!!!'
            });
        }
    }

    //确定删除
    confirmDel() {
        priorityDel({ids: this.state.checkids}, (res) => {
            this.state.checkids = [];
            this.hide();
            this.props.priorityList();
        })
    }

    hide() {
        this.setState({
            dialogShow: false,
            confirmShow: false,
            alert: false
        })
    }

    change(val) {
        this.state.changeVal = val
    }

    setDragStart(id){
        this.state.dragStartId = id;
    }

    dropToTarget(dropid){
        this.state.rowsIds.splice(this.state.rowsIds.indexOf(this.state.dragStartId),1);
        this.state.rowsIds.splice(this.state.rowsIds.indexOf(dropid)+1,0,this.state.dragStartId);
        this.props.priorityList({ids:this.state.rowsIds});
    }

    // 鼠标松开清空样式
    clearStyle(){
        $("#rows").find("tr").css({cursor:"move",'border-bottom':"none","background-color":"#fff"});
    }

    render() {
        let dicCards = [];
        if (this.props.dicCards && this.props.dicCards.payload && this.props.dicCards.payload.length > 0) {
            dicCards = this.props.dicCards.payload.map((item) => ({label: item.codeName, value: item.codeValue}))
        }

        var rowsComps=[];
        // 渲染行数据
        if( this.props.cards && this.props.cards.payload && this.props.cards.payload.length > 0){
            this.state.rowsIds = [];
            this.props.cards.payload.forEach((item,index) =>{
                this.state.rowsIds.push(item.id); // 用来初始化所需行的id
                rowsComps.push(
                    <Tr
                        clearStyle={this.clearStyle.bind(this)}
                        setDragStart={this.setDragStart.bind(this)}
                        dropToTarget={this.dropToTarget.bind(this)}
                        setId={this.setId.bind(this)}
                        key={item.id} index={index}
                        data={item}
                    />
                );
            });
        }

        return <div className="wait-combine">
            <div className="tips">
                <span>证件优先级</span>
            </div>

            <main>
                <div className="row" style={{"margin-bottom": "5px"}}>
                    <button className="btn btn-info mybtn" type="button" onClick={this.add.bind(this)}>新增</button>
                    <button className="btn btn-info mybtn" type="button" onClick={this.del.bind(this)}>删除</button>
                </div>

                <div>
                    <table className="table" style={{"margin-top": "10px", width: "99%"}}>
                        <thead>
                        <tr>
                            <th width="50px"></th>
                            <th style={{"text-align": "center"}} width="50px">序列</th>
                            <th width="300px">卡类型</th>
                            <th>描述</th>
                            <th width="150px">创建时间</th>
                        </tr>
                        </thead>
                        <tbody id="rows">
                            {rowsComps}
                        </tbody>
                    </table>
                </div>
            </main>

            <Dialog options={{
                show: this.state.dialogShow,
                bsSize: "normal",
                title: this.state.dialogTitle,
                onHide: this.hide.bind(this)
            }}>
                <div>
                    <table className="edit-table table">
                        <tbody>
                        <tr>
                            <td width="125px">卡类型</td>
                            <td>
                                <Select
                                    options={dicCards}
                                    ref="codeValue"
                                    onChange={this.change.bind(this)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>描述</td>
                            <td>
                                <input type="text" ref="remark" defaultValue="" className="form-control"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <div className="btn-bottom">
                    <button className="btn btn-info mybtn f-right" type="button" onClick={this.commit.bind(this)}>
                        确定
                    </button>
                </div>
            </Dialog>

            <Confirm options={{
                show: this.state.confirmShow,
                confirm: this.confirmDel.bind(this),
                onHide: this.hide.bind(this),
                content: "你确定要删除吗?",
                title: "删除"
            }}/>
            <Alert options={{
                show: this.state.alert,
                onHide: this.hide.bind(this),
                title: this.state.alertTitle,
                content: this.state.alertContent
            }}/>
        </div>
    }
}

export default Rconnect((state, props) => {
    return {
        'cards': state['dataCombine/priorityList'],
        'dicCards': state['dataCombine/dictionaryCards']
    }
}, {
    priorityList,
    dictionaryCards
}, CardPriority);

