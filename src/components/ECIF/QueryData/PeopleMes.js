/**
 * Created by zhangyuanyuan031 on 17/5/31.
 */
import React from 'react'
import {Link} from 'react-router'
import Rconnect from 'util/Rconnect'
import md5 from 'md5'
import {peopleMesAction} from "action/query-people"
import {updatePeopleManageAction} from 'action/people-manage'
import {getDataDic} from 'action/common-action'
import {Overlay, Tooltip, Modal, Button} from 'react-bootstrap'
import Select from 'util/Select'
import DatePicker from 'util/DatePicker'
import Alert from 'util/Alert'
import Tips from 'util/Tips'
import {telphone,phone,email,weightOrHeight,tel} from 'util/regexp'
import {format} from 'util'
import "assets/less/people-detail.less"

class PeopleMes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalId: this.props.params.globalId,
            pcno:this.props.params.pcno,
            isEdit: false,
            editContactsMesDialog: false,
            editAddrMesDialog: false,
            socialPropertyDialog: false,
            accountMesDialog: false,
            editDetailMes: false,
            tips:false,
            tipsContent:"",
            tipsTitle:"修改信息",
            updateTips:{
                linktel:{
                    show:false,
                    content:""
                },
                linkemail:{
                    show:false,
                    content:""
                },
                homeTel:{
                    show:false,
                    content:""
                },
                workTel:{
                    show:false,
                    content:""
                },
                tel:{
                    show:false,
                    content:""
                },
                tel2:{
                    show:false,
                    content:""
                },
                fax:{
                    show:false,
                    content:""
                },
                height:{
                    show:false,
                    content:""
                },
                weight:{
                    show:false,
                    content:""
                }
            }
        }
    }

    componentDidMount() {
        let params = this.props.params;
        let isChange = params.changed;

        if (params && params.globalId) {
            // this.props.peopleMesAction({globalPersId: params.globalId});
            this.props.getDataDic((data)=>{
                this.props.peopleMesAction({globalPersId: params.globalId});
            });
        }

        if (isChange && md5("changepeoplemessage") === isChange) {
            this.setState({isEdit: true})
        }
    }

    //过滤数据字典信息
    filterDic(arr,codeType){
        return arr.length > 0 ? arr.filter((item)=>item.codeType === codeType) : [];
    }

    // 根据字典 codeType 和 codeValue 精确字典的对应的名称
    getDicVal(arr,codeType,codeVal){
        if(arr.length > 0 ){
            let codeName;
            this.filterDic(arr,codeType).forEach((item)=>{
                if(item.codeValue === codeVal){
                    codeName =  item.codeName;
                    return false;
                }
            });
            return codeName;
        }
    }

    // 得到下拉列表的数据格式
    lableData(arr,codeType){
        let labArr=this.filterDic(arr,codeType);
        return labArr.length > 0 ? labArr.map((item)=>{return {label:item.codeName,value:item.codeValue}}) : [] ;
    }

    tipsHide(){
        this.setState({tips:false})
    }

    editContactsMes() {
        this.setState({editContactsMesDialog: true})
    }


    // 系统一关闭弹框
    dialogClose() {
        this.setState({show: {height: false, weight: false}});
        this.setState({
            editContactsMesDialog: false,
            editAddrMesDialog: false,
            socialPropertyDialog: false,
            accountMesDialog: false,
            editDetailMes: false,
            updateTips:{
                linktel:{
                    show:false,
                    content:""
                },
                linkemail:{
                    show:false,
                    content:""
                },
                homeTel:{
                    show:false,
                    content:""
                },
                workTel:{
                    show:false,
                    content:""
                },
                tel:{
                    show:false,
                    content:""
                },
                tel2:{
                    show:false,
                    content:""
                },
                fax:{
                    show:false,
                    content:""
                },
                height:{
                    show:false,
                    content:""
                },
                weight:{
                    show:false,
                    content:""
                }
            }
        })
    }

    //修改联系人信息
    commitEditMes() {
        let {email, homeTel, workTel, linkTel, fax} = this.refs,
            updateParames = {
                email: email.value.trim(),
                homeTel: homeTel.value.trim(),
                workTel: workTel.value.trim(),
                linkTel: linkTel.value.trim(),
                fax: fax.value.trim()
            };
        if(this.checkLinkTel(updateParames.linkTel) && this.checkLinkEmail(updateParames.email)
            && this.checkHomeTel(updateParames.homeTel) && this.checkWorkTel(updateParames.workTel) && this.checkFax(updateParames.fax))

        this.updateMes(updateParames);
    }

    // 修改人员信息
    updateMes(params,cb) {
        params.globalPersId = this.state.globalId;
        params.pcno = this.state.pcno;
        this.props.updatePeopleManageAction(params, () => {
            this.dialogClose();
            this.props.peopleMesAction({globalPersId: this.state.globalId},(data)=>{
                if(data && data.httpCode === '200')
                    this.setState({
                        tips:true,
                        tipsContent:"修改成功"
                    });
                else
                    this.setState({
                        tips:true,
                        tipsContent:"修改失败"
                    });

                setTimeout(this.tipsHide.bind(this),500)
            });
        });
    }

    // 修改地址信息
    editAddrMes() {
        this.setState({editAddrMesDialog: true});
    }

    commitEditAddrMes() {
        let {commAddr, censusAddr, address} = this.refs,
            updateParames = {
                commAddr: commAddr.value.trim(),
                censusAddr: censusAddr.value.trim(),
                address: address.value.trim()
            };
        this.updateMes(updateParames);
    };

    // 修改社会属性
    socialPropertyCommit() {
        let {politicalStatus, duty, miningProdu, livingState, retiredFlag} = this.refs;
        let updateParames = {
            politicalStatus: politicalStatus.get(),
            duty: duty.value.trim(),
            miningProdu: miningProdu.value.trim(),
            livingState: livingState.get(),
            retiredFlag: retiredFlag.get()
        };
        this.updateMes(updateParames);
    }

    showSocialPropertyDialog() {
        this.setState({socialPropertyDialog: true})
    }

    // 修改户口信息

    updateAccountMes() {
        let {censusId, isHolder, holderName,relaHolder} = this.refs,
            updateParames = {
                censusId: censusId.value.trim(),
                isHolder: isHolder.get(),
                holderName:holderName.value.trim(),
                relaHolder: relaHolder.value.trim()
            };
        this.updateMes(updateParames);
    }

    accountMesDialogOpen() {
        this.setState({accountMesDialog: true})
    }

    // 修改用详细信息
    openEditDetailMes() {
        this.setState({editDetailMes: true})
    }

    updateDetailMes() {
        let {persName, birthday, height, nativeplace, weight, nation, maritalStatus, bloodType, education} = this.refs;

        let updateParames = {
            persName: persName.value.trim(),
            birth: birthday.get(),
            height: height.value.trim(),
            nativeplace: nativeplace.value.trim(),
            weight: weight.value.trim(),
            nation: nation.get(),
            maritalStatus: maritalStatus.get(),
            bloodType: bloodType.get(),
            education: education.get()
        };
        this.updateMes(updateParames);
    }


    //联系方式修改正则校验
    //常用手机
    blurLinkTel(ev){
        this.checkLinkTel(ev.target.value);
        this.forceUpdate();
    }

    //邮箱
    blurLinkemail(ev){
        this.checkLinkEmail(ev.target.value);
        this.forceUpdate();
    }

    //家庭电话
    blurHomeTel(ev){
        this.checkHomeTel(ev.target.value);
        this.forceUpdate();
    }

    //工作电话
    blurWorkTel(ev){
        this.checkWorkTel(ev.target.value);
        this.forceUpdate();
    }

    //联系人手机
    blurTel(ev){
        this.checkTel(ev.target.value);
        this.forceUpdate();
    }
    //备用电话
    blurTel2(ev){
        this.checkTel2(ev.target.value);
        this.forceUpdate();
    }

    blurFax(ev){
        this.checkFax(ev.target.value);
        this.forceUpdate();
    }

    //身高
    blurHeight(ev){
        this.checkHeight(ev.target.value);
        this.forceUpdate();
    }

    //体重
    blurWeight(ev){
        this.checkWeight(ev.target.value);
        this.forceUpdate();
    }

    // 验证手机号码
    checkLinkTel(val){
        if(!val){
            return true;
        }else {
            if (tel.test(val)) {
                this.state.updateTips.linktel.show = false;
                this.state.updateTips.linktel.content = "";
                return true;
            } else {
                this.state.updateTips.linktel.show = true;
                this.state.updateTips.linktel.content = "常用手机号码格式不对";
                return false;
            }
        }
    }

    checkLinkEmail(val){
        if(!val){
            return true;
        }else {
            if(email.test(val)){
                this.state.updateTips.linkemail.show=false;
                this.state.updateTips.linkemail.content="";
                return true;
            }else {
                this.state.updateTips.linkemail.show=true;
                this.state.updateTips.linkemail.content="邮箱格式不正确!";
                return false;
            }
        }
    }

    checkHomeTel(val){
        if(!val){
            return true;
        }else {
            if(tel.test(val)){
                this.state.updateTips.homeTel.show=false;
                this.state.updateTips.homeTel.content="";
                return true;
            }else{
                this.state.updateTips.homeTel.show=true;
                this.state.updateTips.homeTel.content="家庭电话号码格式不正确!";
                return false;
            }
        }
    }

    checkWorkTel(val){
        if(!val){
            return true;
        }else {
            if(tel.test(val)){
                this.state.updateTips.workTel.show=false;
                this.state.updateTips.workTel.content="";
                return true;
            }else{
                this.state.updateTips.workTel.show=true;
                this.state.updateTips.workTel.content="工作电话号码格式不正确!";
                return false;
            }
        }
    }

    checkTel(val){
        if(!val){
            return true;
        }else {
            if (tel.test(val)) {
                this.state.updateTips.tel.show = false;
                this.state.updateTips.tel.content = "";
                return true;
            } else {
                this.state.updateTips.tel.show = true;
                this.state.updateTips.tel.content = "联系人号码格式不对";
                return false;
            }
        }
    }

    checkFax(val){
        if(!val){
            return true;
        }else {
            if (phone.test(val)) {
                this.state.updateTips.fax.show = false;
                this.state.updateTips.fax.content = "";
                return true;
            } else {
                this.state.updateTips.fax.show = true;
                this.state.updateTips.fax.content = "传真号码格式不对";
                return false;
            }
        }
    }

    checkHeight(val){
        if(!val){
            return true;
        }else {
            if (weightOrHeight.test(val)) {
                this.state.updateTips.height.show = false;
                this.state.updateTips.height.content = "";
                return true;
            } else {
                this.state.updateTips.height.show = true;
                this.state.updateTips.height.content = "请填写最大为三位数,最多两位小数";
                return false;
            }
        }
    }

    checkWeight(val){
        if(!val){
            return true;
        }else {
            if (weightOrHeight.test(val)) {
                this.state.updateTips.height.show = false;
                this.state.updateTips.height.content = "";
                return true;
            } else {
                this.state.updateTips.height.show = true;
                this.state.updateTips.height.content = "请填写最大为三位数,最多两位小数";
                return false;
            }
        }
    }

    goBack(ev){
        window.history.go(-1);
    }

    render() {
        let data = this.props.querypeople; // 人员信息数据
        let dataDic = this.props.dataDic; // 获取字典数据

        let dicArr=[];
        if(dataDic && dataDic.payload && dataDic.payload.data){
            dicArr = dataDic.payload.data.codeDictDto ;
        }

        let globalId = this.props.params.globalId;
        let editStyle = {
            width: "25px",
            height: "25px",
            color: "#999",
            "margin-left": "10px",
            "font-size": "13px",
            cursor: "pointer",
            visibility: this.state.isEdit ? "visible" : "hidden"
        };

        if(data.payload){
            data = data.payload;
        }

        return <div className="person-detail">

            <div className="tips">
                <span>人员详情</span>
                <button className="btn btn-default" style={{float:"right",'margin-right':"20px","margin-top":"12px"}} onClick={this.goBack.bind(this)}>返回</button>
            </div>
            <article className="user-mes">
                <section>
                    <label>
                        <i className={data.gender === "1" ? "iconfont icon-nanren" : "iconfont icon-nvren"}></i>
                    </label>
                    <span>{data.persName} <i onClick={this.openEditDetailMes.bind(this)} className="iconfont icon-bianji"
                                         style={editStyle}></i></span>
                    <span>{this.getDicVal(dicArr,"BAC004",data.gender)}</span>
                </section>
                <section>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>出生年月</td>
                                <td>{data.birth}</td>
                            </tr>
                            <tr>
                                <td>身高</td>
                                <td>{data.height}CM</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>籍贯</td>
                                <td>{data.nativeplace}</td>
                            </tr>
                            <tr>
                                <td>体重</td>
                                <td>{data.weight}KG</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>民族</td>
                                <td>{this.getDicVal(dicArr,"AAC005",data.nation)}</td>
                            </tr>
                            <tr>
                                <td>婚姻状况</td>
                                <td>{this.getDicVal(dicArr,"AAC017",data.maritalStatus)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>血型</td>
                                <td>{this.getDicVal(dicArr,"AAC012",data.bloodType)}</td>
                            </tr>
                            <tr>
                                <td>文化程度</td>
                                <td>{this.getDicVal(dicArr,"AAC011",data.education)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <Modal show={this.state.editDetailMes} autoFocus={true} onHide={this.dialogClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>修改人员详情</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table dialog-table">
                            <tr>
                                <td style={{width: "90px"}}>姓名</td>
                                <td><input type="text" className="form-control" ref="persName" defaultValue={data.persName}/>
                                </td>
                            </tr>
                            <tr>
                                <td>出生年月</td>
                                <td>
                                    <DatePicker ref="birthday" maxDate={format(new Date(),'YYYY-MM-DD')} value={data.birth}/>
                                </td>
                            </tr>
                            <tr>
                                <td>身高</td>
                                <td>
                                    <input type="text" defaultValue={data.height} ref="height" className="form-control" onBlur={this.blurHeight.bind(this)} onChange={this.blurHeight.bind(this)}/>
                                    <Tips show={this.state.updateTips.height.show} self={this} target="height" content={this.state.updateTips.height.content}/>
                                </td>
                            </tr>
                            <tr>
                                <td>籍贯</td>
                                <td>
                                    <input type="text" defaultValue={data.nativeplace} ref="nativeplace"
                                           className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td>体重</td>
                                <td >
                                    <input type="text" defaultValue={data.weight} ref="weight" className="form-control" onBlur={this.blurWeight.bind(this)} onChange={this.blurWeight.bind(this)}/>
                                    <Tips show={this.state.updateTips.weight.show} self={this} target="weight" content={this.state.updateTips.weight.content}/>
                                </td>
                            </tr>
                            <tr>
                                <td>民族</td>
                                <td>
                                    <Select options={this.lableData(dicArr,"AAC005")} value={data.nation} ref="nation"/>
                                </td>
                            </tr>
                            <tr>
                                <td>婚姻状况</td>
                                <td>
                                    <Select options={this.lableData(dicArr,"AAC017")} value={data.maritalStatus} ref="maritalStatus"/>
                                </td>
                            </tr>
                            <tr>
                                <td>血型</td>
                                <td>
                                    <Select options={this.lableData(dicArr,"AAC012")} value={data.bloodType} ref="bloodType"/>
                                </td>
                            </tr>
                            <tr>
                                <td>文化程度</td>
                                <td>
                                    <Select options={this.lableData(dicArr,"AAC011")} value={data.education} ref="education"/>
                                </td>
                            </tr>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.dialogClose.bind(this)}>取消</Button>
                        <Button onClick={this.updateDetailMes.bind(this)}>确定</Button>
                    </Modal.Footer>
                </Modal>
            </article>



            <article className="user-detail-mes">
                <div>
                    <label>联系方式 <i onClick={this.editContactsMes.bind(this)} className="iconfont icon-bianji"
                                   style={editStyle}></i></label>
                    <table>
                        <tbody>
                        <tr>
                            <td>邮箱</td>
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <td>家庭电话</td>
                            <td>{data.homeTel}</td>
                        </tr>
                        <tr>
                            <td>工作电话</td>
                            <td>{data.workTel}</td>
                        </tr>
                        <tr>
                            <td>联系人电话</td>
                            <td>{data.linkTel}</td>
                        </tr>
                        <tr>
                            <td>传真</td>
                            <td>{data.fax}</td>
                        </tr>
                        </tbody>
                    </table>
                    <Modal show={this.state.editContactsMesDialog} autoFocus={true} onHide={this.dialogClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>联系方式修改</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table dialog-table" style={{position:"relative"}}>
                                <tr>
                                    <td width="150px">邮箱</td>
                                    <td>
                                        <input type="text" className="form-control" ref="email" defaultValue={data.email} onBlur={this.blurLinkemail.bind(this)} onChange={this.blurLinkemail.bind(this)}/>
                                        <Tips show={this.state.updateTips.linkemail.show} self={this} target="email" content={this.state.updateTips.linkemail.content}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>家庭电话</td>
                                    <td><input type="text" className="form-control" ref="homeTel" defaultValue={data.homeTel} onBlur={this.blurHomeTel.bind(this)} onChange={this.blurHomeTel.bind(this)}/>
                                        <Tips show={this.state.updateTips.homeTel.show} self={this} target="homeTel" content={this.state.updateTips.homeTel.content}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>工作电话</td>
                                    <td><input type="text" className="form-control" ref="workTel" defaultValue={data.workTel} onBlur={this.blurWorkTel.bind(this)} onChange={this.blurWorkTel.bind(this)}/>
                                        <Tips show={this.state.updateTips.workTel.show} self={this} target="workTel" content={this.state.updateTips.workTel.content}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>联系人电话</td>
                                    <td><input type="text" className="form-control" ref="linkTel" defaultValue={data.linkTel} onBlur={this.blurTel.bind(this)} onChange={this.blurTel.bind(this)}/>
                                        <Tips show={this.state.updateTips.tel.show} self={this} target="linkTel" content={this.state.updateTips.tel.content}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>传真</td>
                                    <td><input type="text" className="form-control" ref="fax" defaultValue={data.fax} onBlur={this.blurFax.bind(this)} onChange={this.blurFax.bind(this)}/>
                                        <Tips show={this.state.updateTips.fax.show} self={this} target="fax" content={this.state.updateTips.fax.content}/>
                                    </td>
                                </tr>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.dialogClose.bind(this)}>取消</Button>
                            <Button onClick={this.commitEditMes.bind(this)}>确定</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div>
                    <label>地址<i onClick={this.editAddrMes.bind(this)} className="iconfont icon-bianji"
                                style={editStyle}></i></label>
                    <table>
                        <tbody>
                        <tr>
                            <td>常住详细地址</td>
                            <td>{data.commAddr}</td>
                        </tr>
                        <tr>
                            <td>户口所在地</td>
                            <td>{data.censusAddr}</td>
                        </tr>
                        <tr>
                            <td>邮寄地址</td>
                            <td>{data.address}</td>
                        </tr>
                        </tbody>
                    </table>
                    <Modal show={this.state.editAddrMesDialog} autoFocus={true}
                           onHide={this.dialogClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>地址修改</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table dialog-table">
                                <tr>
                                    <td style={{width: "90px"}}>常住详细地址</td>
                                    <td>
                                        <input type="text" className="form-control" ref="commAddr"
                                               defaultValue={data.commAddr}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>户口所在地</td>
                                    <td>
                                        <input type="text" className="form-control" ref="censusAddr"
                                               defaultValue={data.censusAddr}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>邮寄地址</td>
                                    <td>
                                        <input type="text" className="form-control" ref="address"
                                                defaultValue={data.address}/>
                                    </td>
                                </tr>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.dialogClose.bind(this)}>取消</Button>
                            <Button onClick={this.commitEditAddrMes.bind(this)}>确定</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div>
                    <label>社会属性<i onClick={this.showSocialPropertyDialog.bind(this)} className="iconfont icon-bianji"
                                  style={editStyle}></i></label>
                    <table>
                        <tbody>
                        <tr>
                            <td>政治面貌</td>
                            <td>{this.getDicVal(dicArr,"AAC013",data.politicalStatus)}</td>
                        </tr>
                        <tr>
                            <td>职务</td>
                            <td>{data.duty}</td>
                        </tr>
                        <tr>
                            <td>用工方式</td>
                            <td>{data.miningProdu}</td>
                        </tr>
                        <tr>
                            <td>生存状态</td>
                            <td>{this.getDicVal(dicArr,"AAC014",data.livingState)}</td>
                        </tr>
                        <tr>
                            <td>离休状态</td>
                            <td>{this.getDicVal(dicArr,"AAC015",data.retiredFlag)}</td>
                        </tr>
                        </tbody>
                    </table>
                    <Modal show={this.state.socialPropertyDialog} autoFocus={true}
                           onHide={this.dialogClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>修改社会属性</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table dialog-table">
                                <tr>
                                    <td style={{width: "90px"}}>政治面貌</td>
                                    <td>
                                        <Select ref="politicalStatus" value={data.politicalStatus} options={this.lableData(dicArr,"AAC013")} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>职务</td>
                                    <td>
                                        <input type="text" defaultValue={data.duty} ref="duty" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>用工方式</td>
                                    <td>
                                        <input type="text" defaultValue={data.miningProdu} ref="miningProdu" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>生存状态</td>
                                    <td>
                                        <Select ref="livingState" value={data.livingState} options={this.lableData(dicArr,"AAC014")} />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>离休状态</td>
                                    <td>
                                        <Select ref="retiredFlag" value={data.retiredFlag} options={this.lableData(dicArr,"AAC015")}/>
                                    </td>
                                </tr>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.dialogClose.bind(this)}>取消</Button>
                            <Button onClick={this.socialPropertyCommit.bind(this)}>确定</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
                <div>
                    <label>户口信息<i onClick={this.accountMesDialogOpen.bind(this)} className="iconfont icon-bianji"
                                  style={editStyle}></i></label>
                    <table>
                        <tbody>
                        <tr>
                            <td>户口编号</td>
                            <td>{data.censusId}</td>
                        </tr>
                        <tr>
                            <td>是否户主</td>
                            <td>{this.getDicVal(dicArr,"AAC016",data.isHolder)}</td>
                        </tr>
                        <tr>
                            <td>户主姓名</td>
                            <td>{data.holderName}</td>
                        </tr>
                        <tr>
                            <td>与户主关系</td>
                            <td>{data.relaHolder}</td>
                        </tr>
                        </tbody>
                    </table>

                    <Modal show={this.state.accountMesDialog} autoFocus={true}
                           onHide={this.dialogClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>修改户口信息</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table dialog-table">
                                <tr>
                                    <td style={{width: "90px"}}>户口编号</td>
                                    <td>
                                        <input type="text" defaultValue={data.censusId} ref="censusId" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>是否户主</td>
                                    <td>
                                        <Select ref="isHolder" value={data.isHolder} options={this.lableData(dicArr,"AAC016")}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>户主姓名</td>
                                    <td>
                                      <input type="text" className="form-control" ref="holderName" defaultValue={data.holderName}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width: "90px"}}>与户主关系</td>
                                    <td>
                                        <input defaultValue={data.relaHolder} ref="relaHolder" className="form-control"/>
                                    </td>
                                </tr>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.dialogClose.bind(this)}>取消</Button>
                            <Button onClick={this.updateAccountMes.bind(this)}>确定</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </article>

            <footer className="org-record">
                <Link to={"/pagehome/ecif/queryPeople/timerShaft/" + this.state.globalId + "/" + this.state.pcno}>
                    <label></label>
                    <span>医保就诊记录</span>
                    <span>详细记录医院就诊信息，包括就诊时间、疾病、药品。</span>
                </Link>
                <Link to={"/pagehome/ecif/queryPeople/timerShaft/" + globalId}>
                    <label></label>
                    <span>区卫就诊记录</span>
                    <span>详细记录医院就诊信息，包括就诊时间、疾病、药品。</span>
                </Link>
                <Link to={"/pagehome/ecif/queryPeople/timerShaft/" + globalId}>
                    <label></label>
                    <span>HIS就诊记录</span>
                    <span>详细记录医院就诊信息，包括就诊时间、疾病、药品。</span>
                </Link>
                <Link to={"/pagehome/ecif/queryPeople/timerShaft/" + globalId}>
                    <label></label>
                    <span>商保就诊记录</span>
                    <span>详细记录医院就诊信息，包括就诊时间、疾病、药品。</span>
                </Link>
            </footer>
            <Alert options={{show:this.state.tips,onHide:this.tipsHide.bind(this),title:this.state.tipsTitle,content:this.state.tipsContent}}/>
        </div>
    }
}

export default Rconnect((state, props) => state, {peopleMesAction, updatePeopleManageAction,getDataDic}, PeopleMes);
