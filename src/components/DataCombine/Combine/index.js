/**
 * 人员数据合并
 * Created by zhangyuanyuan031 on 17/9/8.
 */

import React from 'react'
import 'assets/less/data-combin.less'
import TablePages from 'util/TablePages'
import DatePicker from 'util/DatePicker'
import {seriData,arrAddOrRemove,selectLable,dicVal} from 'util'
import Rconnect from 'util/Rconnect'
import {
    queryCombinePersons,
    querySemblancePersons,
    autoMergePersons
} from 'action/datacombine-action'
import {peopleMesAction} from 'action/query-people'
import {updatePeopleManageAction} from 'action/people-manage'
import QueryPersonsTr from './QueryPersonsTr'
import SemblanceTr from './SemblanceTr'

import Alert from 'util/Alert'
import Confirm from 'util/Confirm'
import Dialog from 'util/Dialog'
import Select from 'util/Select'

class Combine extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            dataDir: JSON.parse(localStorage.getItem('dataDir')),  // 查询数据字典数据
            queryPersonActionPage:1,
            querySemblanceActionPage:1,
            pageSize:10,
            masterPersId:"",
            editPersonId:'',
            globalPersIds:[],
            dialog: false,
            dialogTitle:"编辑",
            confirmAlert:false,
            alert:false,
            alertTitle:'保存',
            alertContent:'保存成功',
            editType:"",
            pcno:""
        }
    }


    componentDidMount(){
        this.queryPersonAction({
            pageNum:1,
            pageSize:this.state.pageSize
        });
    }

    /**
     * 人员查询
     */

    // 人查询分页
    queryPersonPage(key){
        this.state.queryPersonActionPage = key;
        let {persName,cardNum,birth} = this.refs;
        let params = seriData({persName,cardNo:cardNum,birth});
        params.pageNum = this.state.queryPersonActionPage;
        params.pageSize = this.state.pageSize;
        this.queryPersonAction(params);
    }

    //人员查询
    queryPersons(){
        let {persName,cardNum,birth} = this.refs;
        let params = seriData({persName,cardNo:cardNum,birth});
        params.pageNum = 1;
        params.pageSize = this.state.pageSize;
        this.queryPersonAction(params);
        this.setState({
            queryPersonActionPage:1
        });
    }

     queryPersonAction(params){
       this.props.queryCombinePersons(params);
    }
// 清除其它 QueryPersonsTr 兄弟节点的样式
    clearBgColor(){
        $(this.refs.combinPersonTbody).find('tr').css({'background-color':"#fff"});
    }

    /**
     * 相似度查询
     */

    // 相似度查询分页
    querySemblancePage(key){
        this.state.querySemblanceActionPage = key;
        let params = {
            pageNum:this.state.querySemblanceActionPage,
            pageSize:this.state.pageSize
        };
        this.semblanceAction(params);
    }

    // 双击某条数据查询对应相似度
    querySemblance(globalId){
        this.state.globalPersIds = [];
        this.state.masterPersId = globalId; // 记录当前点中的数据ID
        let params = {
            pageNum:1,
            pageSize:this.state.pageSize,
            globalPersId:globalId
        };
        this.semblanceAction(params);
    }
    // 相似度查询action
    semblanceAction(params){
        this.props.querySemblancePersons(params);
    }

    //获取选中条的所有id
    getCheckids(flag,val){
        arrAddOrRemove(this.state.globalPersIds,flag,val);
    }

    //数据合并事件
    combinePersons(ev){
        ev.preventDefault();
        let params = {
            masterPersId:this.state.masterPersId,
            globalPersIds:this.state.globalPersIds
        };
        this.props.autoMergePersons(params,(res) => {
            if(res.httpCode === "200"){
                this.setState({
                    alert:true,
                    alertTitle:'数据合并',
                    alertContent:'数据合并成功'
                });
                this.semblanceAction({
                    pageNum:this.state.querySemblanceActionPage,
                    pageSize:this.state.pageSize,
                    globalPersId:this.state.masterPersId
                });
            }else {
                this.setState({
                    alert:true,
                    alertTitle:'数据合并',
                    alertContent:res.msg
                });
            }
        });
    }


    // 修改数据操作
    edit(editType,globalPersId){
        this.state.editType = editType;
        this.state.editPersonId = globalPersId;
        // 查询选中的人详情信息
        this.props.peopleMesAction({globalPersId},(res)=>{
            if(res.httpCode === '200'){
                this.setState({
                    dialogTitle:editType === 'edit' ? '编辑' : '查看',
                    dialog: true
                })
            }else {
                this.setState({
                    alert:true,
                    alertTitle:'加载用户信息',
                    alertContent:'加载用户失败'
                })
            }
        });
    }

    //取消保存
    dialogCancel(){
        this.setState({
            dialog: false
        })
    }

    //保存编辑的人
    saveEditPerson(){
        this.setState({confirmAlert:true})
    }

    //确认提交保存
    confirm(){
       let {cardType,cardNo,height,weight,bloodType,countryCode,startJobdate,retiredFlag,livingState,maritalStatus,censusId,commAddr,politicalStatus,descrip,education} = this.refs;
       let params = seriData({cardType,cardNo,height,weight,bloodType,countryCode,startJobdate,retiredFlag,livingState,maritalStatus,censusId,commAddr,politicalStatus,descrip,education});
        params.pcno = this.state.pcno;
        params.globalPersId = this.state.editPersonId;
        this.props.updatePeopleManageAction(params,(res) => {
            if(res.httpCode === '200'){
                this.confirmHide();
                this.dialogCancel();
                this.setState({
                    alert:true,
                    alertTitle:'保存',
                    alertContent:'保存成功'
                });
                this.semblanceAction({
                    pageNum:this.state.querySemblanceActionPage,
                    pageSize:this.state.pageSize,
                    globalPersId:this.state.masterPersId
                });
            }else {
                this.setState({
                    alert:true,
                    alertTitle:'保存失败',
                    alertContent:res.msg
                });
            }
        });
    }

    confirmHide(){
        this.setState({confirmAlert:false})
    }


    alertHide(){
        this.setState({
            alert:false
        })
    }

  /*  clearCheckBox(){
        this.state.globalPersIds = [];

    }
*/
    render() {
        if(this.props.peopleMes && this.props.peopleMes.payload){
            // globalPersId,pcno
            var {pcno,persName,gender,birth,nation,cardType,cardNo,height,weight,bloodType,countryCode,startJobdate,retiredFlag,livingState,maritalStatus,censusId,commAddr,politicalStatus,descrip,education} = this.props.peopleMes.payload;
            this.state.pcno = pcno;
        }
        return <div className="data-combine">
            <div className="tips">
                <span>数据合并</span>
            </div>

            <main>
                <div className="row" style={{"margin-bottom": "5px"}}>
                    <div className="col-xs-11">
                        <div className="col-xs-4"><input className="form-control" placeholder="姓名" ref="persName"/></div>
                        <div className="col-xs-4">
                            <input className="form-control" placeholder="证件号" ref="cardNum"/>
                        </div>
                        <div className="col-xs-4">
                            <DatePicker ref="birth" placeholder="出生年月"/>
                        </div>
                    </div>
                    <div className="col-xs-1">
                      <span className="input-group-btn" style={{"padding-right": "5px"}}>
                            <button className="btn btn-info" type="button"
                                    style={{"background-color": "#20A0FF", "border-radius": "5px"}}
                                    onClick={this.queryPersons.bind(this)}
                            >查询 </button>
                      </span>
                    </div>
                </div>

                <div>
                    <table className="table" style={{width: "99%"}}>
                        <thead>
                        <tr>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>出生年月</th>
                            <th>证件类型</th>
                            <th>证件号</th>
                            <th>民族</th>
                            <th>婚姻状况</th>
                            <th>政治面貌</th>
                            <th>常用地址</th>
                            <th>文化程度</th>
                            <th>户口薄编号</th>
                        </tr>
                        </thead>
                        <tbody ref="combinPersonTbody">
                        {
                            (this.props.combinPersons.payload &&  this.props.combinPersons.payload.list && this.props.combinPersons.payload.list.length > 0) ? this.props.combinPersons.payload.list.map((item,index) => <QueryPersonsTr
                                    querySemblance={this.querySemblance.bind(this)} data={item} index={index} key={index} clearBgColor = {this.clearBgColor.bind(this)}/> ) : ""
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td style={{"text-align": "right"}} colSpan="11">
                                <nav aria-label="Page navigation" style={{float: "right"}}>
                                    <TablePages totals={(this.props.combinPersons.payload && this.props.combinPersons.payload.pages) ? this.props.combinPersons.payload.pages : 0} onSelect={this.queryPersonPage.bind(this)}
                                                activePage={this.state.queryPersonActionPage}/>
                                </nav>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

                <div>
                    <div className="col-xs-1" style={{float:"right"}}>
                      <span className="input-group-btn" style={{"padding-right": "5px"}}>
                            <button className="btn btn-info" type="button" onClick={this.combinePersons.bind(this)}
                                    style={{"background-color": "#20A0FF", "border-radius": "5px"}}>合并 </button>
                      </span>
                    </div>
                </div>

                <div>
                    <table className="table" style={{position:"relative","top": "5px", width: "99%"}}>
                        <thead>
                        <tr>
                            <th width="50px"></th>
                            <th width="50px">序列</th>
                            <th>相似度</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>出生年月</th>
                            <th>证件类型</th>
                            <th>证件号</th>
                            <th>民族</th>
                            <th>政治面貌</th>
                            <th>文化程度</th>
                            <th>户口薄编号</th>
                            <th width="110px">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (this.props.semblancdPersons.payload && this.props.semblancdPersons.payload.list && this.props.semblancdPersons.payload.list.length > 0) ? this.props.semblancdPersons.payload.list.map((item,index) => <SemblanceTr edit={this.edit.bind(this)} data={item} index={index} key={index} getCheckids = {this.getCheckids.bind(this)}/> ) : ""
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td style={{"text-align": "right"}} colSpan="13">
                                <nav aria-label="Page navigation" style={{float: "right"}}>
                                    <TablePages totals={(this.props.semblancdPersons.payload && this.props.semblancdPersons.payload.pages) ? this.props.semblancdPersons.payload.pages : 0} onSelect={this.querySemblancePage.bind(this)}
                                                activePage={this.state.querySemblanceActionPage}/>
                                </nav>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

            </main>

            <Dialog options={{show: this.state.dialog, bsSize: "normal", title: this.state.dialogTitle, onHide: this.dialogCancel.bind(this)}}>
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
                            <td className="text-align">文化程度</td>
                            <td>
                                <Select value={education} ref="education" disabled={this.state.editType === 'search'} placeholder="文化程度" options={selectLable(this.state.dataDir,'AAC011')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-align">户口薄编号</td>
                            <td><input type="text" className="form-control" ref="censusId" defaultValue={censusId} disabled={this.state.editType === 'search'}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">常住详细地址</td>
                            <td><input type="text" className="form-control" ref="commAddr" defaultValue={commAddr} disabled={this.state.editType === 'search'}/></td>
                        </tr>
                        <tr>
                            <td className="text-align">政治面貌</td>
                            <td>
                                <Select value={politicalStatus} ref="politicalStatus" disabled={this.state.editType === 'search'} placeholder="政治面貌" options={selectLable(this.state.dataDir,'AAC013')}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-align">备注</td>
                            <td>
                                <textarea defaultValue={descrip} ref="descrip" className="form-control" disabled={this.state.editType === 'search'}></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn-bottom">
                    <button className="btn btn-info mybtn f-right" type="button" style={{display:this.state.editType === 'search'?'none':'block'}} onClick={this.saveEditPerson.bind(this)}>保存</button>
                    <button className="btn btn-info mybtn f-right" type="button" onClick={this.dialogCancel.bind(this)}>取消</button>
                </div>
            </Dialog>
            <Confirm options={{show:this.state.confirmAlert,confirm:this.confirm.bind(this),onHide:this.confirmHide.bind(this),content:"你确定要保存吗?",title:"保存"}}/>
            <Alert options={{show:this.state.alert,onHide:this.alertHide.bind(this),title:this.state.alertTitle,content:this.state.alertContent}}/>
        </div>
    }

}

export default Rconnect((state)=>{
    return {
        'combinPersons':state['dataCombine/queryCombinePersons'],
        'semblancdPersons':state['dataCombine/querySemblancePersons'],
        'peopleMes':state['querypeople']
    };
},{
    queryCombinePersons,
    querySemblancePersons,
    autoMergePersons,
    peopleMesAction,
    updatePeopleManageAction
},Combine);

