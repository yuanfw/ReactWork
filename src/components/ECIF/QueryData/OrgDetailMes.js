/**
 * Created by zhangyuanyuan031 on 17/6/16.
 */
import React from 'react'
import Rconnect from 'util/Rconnect'
import {queryGlobalOrg} from 'action/query-org'

import "assets/less/org-manage-update.less"

class OrgDetailMes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editBaseDialog: false,
            editDetailDialog: false
        }
    }

//    componentDidMount() {
//        this.updatePage();
//    }

//    //更新整个页面
//    updatePage() {
//        this.props.orgManageDetailAction(this.props.params.globalOrgId);
//    }


    // 关闭弹框
    dialogClose() {
        this.setState({
            editBaseDialog: false,
            editDetailDialog: false
        })
    }

    openBaseDialog() {
        this.setState({editBaseDialog: true})
    }

    openDetailDialog() {
        this.setState({editDetailDialog: true})
    }

    updateMes(params) {
        params.globalOrgId = this.props.params.globalOrgId;
        this.props.updateOrgManageDetailAction(params, () => {
            this.dialogClose();
            this.updatePage();
        });
    }

    // 修改基本信息
    updateBaseMes() {
        let {orgno, orgtype, orgname, hospitalGrade, orgTypeCode, pinyinCode} = this.refs,
            params = {
                orgno: orgno.value.trim(),
                orgtype: orgtype.value.trim(),
                orgname: orgname.value.trim(),
                hospitalGrade: hospitalGrade.value.trim(),
                orgTypeCode: orgTypeCode.value.trim(),
                pinyinCode: pinyinCode.value.trim()
            };
        this.updateMes(params)
    }


    //修改详情信息
    updateDetailMes() {
        let {formsOwnership,provinceName, cityName, hospLongitude, hospLatitude, orgRangeCode,linktel,industryCode, removed,address ,description,orglicence} = this.refs,
            params = {
                formsOwnership:formsOwnership.value.trim(),
                provinceName: provinceName.value.trim(),
                cityName: cityName.value.trim(),
                hospLongitude: hospLongitude.value.trim(),
                hospLatitude: hospLatitude.value.trim(),
                orgRangeCode:orgRangeCode.value.trim(),
                linktel: linktel.value.trim(),
                industryCode:industryCode.value.trim(),
                address: address.value.trim(),
                removed:removed.get(),
                description: description.value.trim(),
                orglicence:orglicence.value.trim()
            };
        this.updateMes(params)
    }


    render() {
        let data = this.props.output;
        let editStyle = {
            width: "25px",
            height: "25px",
            color: "#999",
            "margin-left": "10px",
            "font-size": "13px",
            cursor: "pointer"
        };

        return <div className="medicalInstitution-information">
            <div className="tips">
                <span>医疗机构信息</span>
            </div>
            <article className="user-mes">
                <section>
                    <span>医院基本信息</span>
                </section>
                <section>
                    <div>
                        <table className="itemTable">
                            <tbody>
                            <tr>
                                <td>医疗机构编码</td>
                                <td>{data.orgno}</td>
                            </tr>
                            <tr>
                                <td>医疗机构类型</td>
                                <td>{data.orgtype === "1" ? "平台经办" : data.orgtype === "2" ? "商保机构" : data.orgtype === "3" ? "医保机构" : "医疗机构"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table className="itemTable">
                            <tbody>
                            <tr>
                                <td>医疗机构名称</td>
                                <td>{data.orgname}</td>
                            </tr>
                            <tr>
                                <td>医疗机构等级</td>
                                <td>{data.hospitalGrade === "1" ? "三级特等" : data.hospitalGrade === "2" ? "三级甲等" : data.hospitalGrade === "3" ? "三级乙等" : data.hospitalGrade === "4" ? "三级丙等" :
                                                                            data.hospitalGrade === "5" ? "二级甲等" : data.hospitalGrade === "6" ? "二级乙等" : data.hospitalGrade === "7" ? "二级丙等" : data.hospitalGrade === "8" ? "一级甲等" :
                                                                                data.hospitalGrade === "9" ? "一级乙等" : data.hospitalGrade === "10" ? "一级丙等" : "无等级"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table className="itemTable">
                            <tbody>
                            <tr>
                                <td>拼音助记码</td>
                                <td>{data.pinyinCode}</td>
                            </tr>
                            <tr>
                                <td>医疗机构分类</td>
                                <td>{data.orgTypeCode === "1" ? "中医医院" : data.orgTypeCode === "2" ? "五官医院" : data.orgTypeCode === "3" ? "传染病医院" : data.orgTypeCode === "4" ? "儿童医院" :
                                                                            data.orgTypeCode === "5" ? "血液病医院" : data.orgTypeCode === "6" ? "口腔医院" : data.orgTypeCode === "7" ? "妇产医院" : data.orgTypeCode === "8" ? "康复医院" :
                                                                                data.orgTypeCode === "9" ? "眼科医院" : data.orgTypeCode === "10" ? "精神病医院" : data.orgTypeCode === "11" ? "综合医院" : data.orgTypeCode === "12" ? "肛肠医院" :
                                                                                    data.orgTypeCode === "13" ? "肿瘤医院" : data.orgTypeCode === "14" ? "胸科医院" : "其他医院"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

            </article>

            <article className="user-detail-mes">
                <div>
                    <label style={{"margin-left": "37px"}}>医院详细信息</label>
                    <table>
                        <tbody>
                        <tr>
                            <td>行政区域（省）</td>
                            <td>{data.provinceName}</td>
                        </tr>
                        <tr>
                            <td>行政区划(市)</td>
                            <td>{data.cityName}</td>
                        </tr>
                        <tr>
                            <td>医院经度</td>
                            <td>{data.hospLongitude}</td>
                        </tr>
                        <tr>
                            <td>医院纬度</td>
                            <td>{data.hospLatitude}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <label></label>
                    <table>
                        <tbody>
                        <tr>
                            <td>联系电话</td>
                            <td>{data.linktel}</td>
                        </tr>
                        <tr>
                            <td>执业许可证号</td>
                            <td>{data.orglicence}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <label></label>
                    <table>
                        <tbody>
                        <tr>
                            <td>医院机构性质</td>
                            <td>{data.formsOwnership}</td>
                        </tr>
                        <tr>
                            <td>医院地址</td>
                            <td>{data.address}</td>
                        </tr>
                        <tr>
                            <td>有效标志</td>
                            <td>{data.removed === '1' ? '有效' :'无效'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </article>

            <footer className="org-record">
                <label></label>
                <div className="detail-in-right">
                    <h5>备注</h5>
                    <span>{data.description}</span>
                </div>
            </footer>
        </div>
    }
}

export default Rconnect((state, props) => state.queryorg, {
    queryGlobalOrg
}, OrgDetailMes);
