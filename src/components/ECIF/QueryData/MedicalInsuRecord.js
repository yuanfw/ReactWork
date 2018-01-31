/**
 * Created by zhangyuanyuan031 on 17/5/31.
 */
import React from 'react'
import {peopleMesAction, medialInsurRecordAction, expenseReportAction} from 'action/query-people'
import {isEmptyObject} from 'util'
import Rconnect from 'util/Rconnect'
import BarChart from './BarChart'

import "assets/less/timer-shaft.less"

import MedicalRecodeOnlyOne from './MedicalRecodeOnlyOne'
import MedicalRecodes from './MedicalRecodes'

class MedicalInsuRecord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDir: JSON.parse(localStorage.getItem('dataDir')),  // 查询数据字典数据
            globalId: this.props.params.globalId,
            pcno: this.props.params.pcno
        }
    }

    componentDidMount() {
        // 填充人员主要信息
        this.props.peopleMesAction({globalPersId: this.state.globalId});
        // 就诊记录
        this.props.medialInsurRecordAction({pcno: '123'});
        //    拉统计图
        this.props.expenseReportAction({pcno: '123'});
    }

    //过滤数据字典信息
    filterDic(arr, codeType) {
        return arr.length > 0 ? arr.filter((item) => item.codeType === codeType) : [];
    }

    // 根据字典 codeType 和 codeValue 精确字典的对应的名称
    getDicVal(arr, codeType, codeVal) {
        if (arr.length > 0) {
            let codeName;
            this.filterDic(arr, codeType).forEach((item) => {
                if (item.codeValue === codeVal) {
                    codeName = item.codeName
                    return false;
                }
            });
            return codeName;
        }
    }

    render() {
        let dicArr = this.state.dataDir;
        let data = this.props.querypeople; // 人员信息数据

        if (data.payload) {
            data = data.payload;
        }

        let medicalRecode = this.props.medicalInseRecode;
        let expenseReport = this.props.expenseReport;

        let dataTimer = [];

        if (medicalRecode.payload && medicalRecode.payload.length > 0) {
            let recodesArr = medicalRecode.payload, len = recodesArr.length;
            dataTimer.push(<MedicalRecodeOnlyOne data={recodesArr[0]}/>);
            if (recodesArr.length > 1) {
                for (let i = 1; i < len; i++) {
                    dataTimer.push(<MedicalRecodes data={recodesArr[i]}/>);
                }
            }
        }


        return <div className="see-doctor-record">
            <div className="tips">
                <span>医保就诊记录</span>
            </div>

            <article className="user-mes">
                <section>
                    <label>
                        <i className={data.gender === '1' ? "iconfont icon-nanren" : "iconfont icon-nvren"}></i>
                    </label>
                    <span>{data.persName}</span>
                    <span>{this.getDicVal(dicArr, "BAC004", data.gender)}</span>
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
                                <td>{data.height}</td>
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
                                <td>{this.getDicVal(dicArr, "AAC005", data.nation)}</td>
                            </tr>
                            <tr>
                                <td>婚姻状况</td>
                                <td>{this.getDicVal(dicArr, "AAC017", data.maritalStatus)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>血型</td>
                                <td>{this.getDicVal(dicArr, "AAC012", data.bloodType)}</td>
                            </tr>
                            <tr>
                                <td>文化程度</td>
                                <td>{this.getDicVal(dicArr, "AAC011", data.education)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>

            <article class="bar-chart">
                {
                    expenseReport && expenseReport.payload && expenseReport.payload.length > 0 ?
                        <BarChart data={expenseReport.payload} /> : ""
                }
            </article>

            <article className="report-forms"></article>

            <article className="detail-record">
                <label>
                    详细就诊记录
                </label>
                {dataTimer}
            </article>


        </div>
    }
}

export default Rconnect((state, props) => {
    return {
        'querypeople': state['querypeople'],
        'medicalInseRecode': state['ecifManage/medicalInsuRecod'],
        'expenseReport': state['ecifManage/expenseReport']
    };
}, {peopleMesAction, medialInsurRecordAction, expenseReportAction}, MedicalInsuRecord);

