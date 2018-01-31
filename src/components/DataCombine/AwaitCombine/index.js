/**
 * Created by zhangyuanyuan031 on 17/9/8.
 */

import React from 'react'
import Rconnect from 'util/Rconnect'
import TrData from './TrData'
import {seriData,arrAddOrRemove,selectLable,dicVal} from 'util'
import eventProxy from 'util/eventProxy'

import Confirm from 'util/Confirm'
import Alert from 'util/Alert'
import Dialog from 'util/Dialog'
import Select from 'util/Select'
import DatePicker from 'util/DatePicker'

// action
import {
    queryAwaitCombine,
    delAwaitCombine,
    commitCombine,
    awaitUpdate,
    detailAwaitCombine
} from 'action/datacombine-action'

class AwaitCombine extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dataDir: JSON.parse(localStorage.getItem('dataDir')),  // 查询数据字典数据
            checkBox:null,
            isCheckAll:false,
            ids:[],
            delId:'', // 设置删除数据的id
            editId:'',// 设置编辑数据的id
            confirmAlert:false,
            confirmCommtAlert:false,
            alert:false,
            alertTitle:'保存',
            alertContent:'保存成功',
            dialog:false
        }
    }

    componentDidMount(){
        // this.state.checkBox = this.refs.allChecked;
        this.props.queryAwaitCombine();
    }

    //传给子组件调用的回调函数
    changeMainCheck(flag,val) {
        arrAddOrRemove(this.state.ids,flag,val);
    }

    // 点击提交要做数据合并
    commit(ev){
        this.setState({
            confirmCommtAlert:true
        })
    }

    // 确认合并数据
    confirmCommit(){
        this.props.commitCombine({ids:this.state.ids},(res) => {
            this.confirmHide();
            this.props.queryAwaitCombine();
        })
    }

    // 删除一行数据
    del(id){
       this.state.delId = id;
        this.setState({
            confirmAlert:true
        })
    }

// 确认删除
    confirm(){
        this.props.delAwaitCombine({ids:[this.state.delId]},(res) => {
            $("input[name="+this.state.delId+"]").get(0).checked = false;
            this.state.delId = '';
              this.setState({
                  confirmAlert:false,
              });
              this.props.queryAwaitCombine();
        });
    }

    confirmHide(){
        this.setState({
            confirmAlert:false,
            confirmCommtAlert:false
        })
    }

    alertHide(){
        this.setState({
            alert:false
        })
    }

// 打开详情
    editPerson(id){
        this.state.editId = id;
        this.props.detailAwaitCombine({id},(res) => {
            this.setState({dialog:true})
        });
    }

    // 保存修改的数据
    saveEditPerson(){
        let {cardType,cardNo,height,weight,bloodType,countryCode,startJobdate,retiredFlag,livingState,maritalStatus,censusId,address,politicalStatus,remark} = this.refs;
        let params = seriData({cardType,cardNo,height,weight,bloodType,countryCode,startJobdate,retiredFlag,livingState,maritalStatus,censusId,address,politicalStatus,remark});
        params.id = this.state.editId;
       this.props.awaitUpdate(params,(res) => {
           if(res.httpCode == 200){
               this.confirmHide();
               this.dialogCancel();
               this.setState({
                   alert:true,
                   alertTitle:'保存',
                   alertContent:'保存成功'
               });
               this.props.queryAwaitCombine();
           }else {
               this.setState({
                   alert:true,
                   alertTitle:'保存失败',
                   alertContent:res.msg
               });
           }
       });
    }

    dialogCancel(){
        this.setState({dialog:false})
    }

    render(){
        if(this.props.personDetail && this.props.personDetail.payload && this.props.personDetail.payload.data){
            var {persName,gender,birth,nation,cardType,cardNo,height,weight,bloodType,countryCode,startJobdate,retiredFlag,livingState,maritalStatus,censusId,address,politicalStatus,remark} = this.props.personDetail.payload.data;
        }

        return <div className="wait-combine">
            <div className="tips">
                <span>待合并箱</span>
            </div>

            <main>
                <div className="row" style={{"margin-bottom": "5px"}}>
                    <button className="btn btn-info mybtn" style={{float:"right"}} type="button" onClick={this.commit.bind(this)}>提交</button>
                </div>
                <div>
                    <table className="table" style={{"margin-top": "10px",width: "99%"}}>
                        <thead>
                        <tr>
                            <th style={{"text-align": "center"}} width="50px">
                            </th>
                            <th style={{"text-align": "center"}} width="50px">序列</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>出生年月</th>
                            <th>证件类型</th>
                            <th>证件号</th>
                            <th>民族</th>
                            <th>婚姻状况</th>
                            <th>政治面貌</th>
                            <th>常用地址</th>
                            <th>文化程序</th>
                            <th>户口薄编号</th>
                            <th width="105px">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.awaitCombineList && this.props.awaitCombineList.payload && this.props.awaitCombineList.payload.length > 0 ?
                                this.props.awaitCombineList.payload.map((item,index) => <TrData data={item} del={this.del.bind(this)} editPerson={this.editPerson.bind(this)} changeMainCheck = {this.changeMainCheck.bind(this)} key={index} index={index}/>) : ""
                        }
                        </tbody>
                    </table>
                </div>
            </main>
            <Confirm options={{show:this.state.confirmAlert,confirm:this.confirm.bind(this),onHide:this.confirmHide.bind(this),content:"你确定要删除吗?",title:"删除"}}/>
            <Confirm options={{show:this.state.confirmCommtAlert,confirm:this.confirmCommit.bind(this),onHide:this.confirmHide.bind(this),content:"你确定要合并数据吗?",title:"数据合并"}}/>
            <Alert options={{show:this.state.alert,onHide:this.alertHide.bind(this),title:this.state.alertTitle,content:this.state.alertContent}}/>
            <Dialog options={{show: this.state.dialog, bsSize: "normal", title: '修改待合并数据', onHide: this.dialogCancel.bind(this)}}>
                <div>
             <table className="detail-table">
                        <tbody>
                        <tr>
                            <td className="text-align">姓名</td>
                            <td><input type="text" className="form-control" defaultValue={persName} disabled={true}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">性别</td>
                            <td>
                                <Select value={gender} disabled={true} placeholder="性别" options={selectLable(this.state.dataDir,'AAC004')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-align">出生日期</td>
                            <td><DatePicker disabled={true} value={birth}/> </td>
                        </tr>
                        <tr>
                            <td className="text-align">民族</td>
                            <td><input type="text" className="form-control" value={dicVal(this.state.dataDir,'AAC005',nation)} disabled={true}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">证件类型</td>
                            <td><Select value={cardType} ref="cardType" disabled={this.state.editType === 'search'} placeholder="证件类型" options={selectLable(this.state.dataDir,'AAC058')}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">证件号</td>
                            <td><input type="text" className="form-control" ref="cardNo" defaultValue={cardNo} disabled={this.state.editType === 'search'}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">身高(cm)</td>
                            <td><input type="text" className="form-control" defaultValue={height} ref="height" disabled={this.state.editType === 'search'}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">体重(kg)</td>
                            <td><input type="text" className="form-control" defaultValue={weight} ref="weight" disabled={this.state.editType === 'search'}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">血型</td>
                            <td>
                                <Select value={bloodType} ref="bloodType" disabled={this.state.editType === 'search'} placeholder="血型" options={selectLable(this.state.dataDir,'AAC012')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-align">国家区域代码</td>
                            <td><input type="text" className="form-control" defaultValue={countryCode} ref="countryCode" disabled={this.state.editType === 'search'}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">开始工作日期</td>
                            <td> <DatePicker disabled={this.state.editType === 'search'} value={startJobdate} ref="startJobdate"/></td>
                        </tr>
                        <tr>
                            <td className="text-align">离退休标识</td>
                            <td>
                                <Select value={retiredFlag} ref="retiredFlag" disabled={this.state.editType === 'search'} placeholder="离退休标识" options={selectLable(this.state.dataDir,'AAC015')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-align">生存状态</td>
                            <td>
                                <Select value={livingState} ref="livingState" disabled={this.state.editType === 'search'} placeholder="生存状态" options={selectLable(this.state.dataDir,'AAC014')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-align">婚姻状况</td>
                            <td>
                                <Select value={maritalStatus} ref="maritalStatus" disabled={this.state.editType === 'search'} placeholder="婚姻状况" options={selectLable(this.state.dataDir,'AAC017')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-align">户口薄编号</td>
                            <td><input type="text" className="form-control" ref="censusId" defaultValue={censusId} /></td>
                        </tr>
                        <tr>
                            <td className="text-align">常住地址</td>
                            <td><input type="text" className="form-control" ref="address" defaultValue={address}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">政治面貌</td>
                            <td>
                                <Select value={politicalStatus} ref="politicalStatus"  placeholder="政治面貌" options={selectLable(this.state.dataDir,'AAC013')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-align">备注</td>
                            <td>
                                <textarea defaultValue={remark} ref="remark" className="form-control"></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn-bottom">
                    <button className="btn btn-info mybtn f-right" type="button" onClick={this.saveEditPerson.bind(this)}>保存</button>
                    <button className="btn btn-info mybtn f-right" type="button" onClick={this.dialogCancel.bind(this)}>取消</button>
                </div>
            </Dialog>
        </div>
    }

}

export default Rconnect((state,props) => {
    return {
        'awaitCombineList':state['dataCombine/queryAwaitCombine'],
        'personDetail':state['dataCombine/detailAwaitCombine']
    }
},{
    queryAwaitCombine,
    delAwaitCombine,
    commitCombine,
    awaitUpdate,
    detailAwaitCombine
},AwaitCombine);
