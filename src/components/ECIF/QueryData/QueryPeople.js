/**
 * Created by zhangyuanyuan031 on 17/5/24.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {queryPeople} from "action/query-people"
import {Overlay, Tooltip} from 'react-bootstrap'
import Select from 'util/Select'
import DatePicker from 'util/DatePicker'
import {isEmptyObject} from 'util'
import QueryPeopleDetail from './QueryPeopleDetail'
import Rconnect from 'util/Rconnect'
import Alert from 'util/Alert'

import "assets/less/querypeople.less"


class QueryPeople extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: {
                idNo: false,
                tel: false
            },
            dialog: false
        }
    }

    onHide() {
        this.setState({dialog: false})
    }

    queryPeople() {
        let {name, gender, birthday, idType, idNo, tel} = this.refs;
        if (!idNo.value && !tel.value) {
            this.setState({show: {idNo: true, tel: true}});
            return;
        }

        let queryCondition = {
            name: name.value.trim(),
            gender: gender.value,
            birthday: birthday.value,
            idType: idType.value,
            idNo: idNo.value.trim(),
            tel: tel.value.trim()
        };
        this.props.queryPeople(queryCondition, () => {
            this.setState({dialog: true})
        });
    }

    canncleTips(e) {
        this.setState({show: {idNo: false, tel: false}});
    }

    render() {
        let data = this.props.output;
        let QueryPeopleDetailArr = [];
        if (!isEmptyObject(data)) {
            QueryPeopleDetailArr.push(<QueryPeopleDetail data={data}/>)
        }

        const cardProps = {
            show: this.state.show.idNo,
            container: ReactDOM.findDOMNode(this.refs.idNoParent),
            target: () => ReactDOM.findDOMNode(this.refs.idNoParent)
        };

        const telProps = {
            show: this.state.show.tel,
            container: ReactDOM.findDOMNode(this.refs.telParent),
            target: () => ReactDOM.findDOMNode(this.refs.telParent)
        };

        return <div className="queryPeople">
            <div className="tips">
                <span>人员精准查询</span>
            </div>
            <article className="desc">
                <div>
                    <section>
                        <label></label>
                        <h2>人员精确查询</h2>
                        <span>人员精确查询，提供精确的人员查询服务，并且提供可视化开发界面，多种查询方式相结合，精确的定位到您想查找的人员，并且提供详细的人员信息。包括人员基本信息、联系方式、地址、户口基本信息社会属性、曾患疾病就诊金额报表，以及医保、区卫、HIS、商保详细就诊记录</span>
                    </section>
                </div>
                <div></div>
            </article>

            <main>
                <form>
                    <div className="row" style={{"padding-left": "10px"}}>
                        <div className="col-lg-2">
                            <input type="text" className="form-control" ref="name" placeholder="姓名" />
                        </div>
                        <div className={this.state.show.tel ? 'col-lg-2 has-error' : 'col-lg-2'}>
                            <div ref="telParent">
                                <input
                                    type="number"
                                    className="form-control"
                                    ref="tel"
                                    placeholder="手机"
                                    onChange={this.canncleTips.bind(this)} />
                            </div>

                        </div>
                        <div className="col-lg-2">
                            <DatePicker ref="birthday" placeholder="出生年月" />
                        </div>
                        <div className="col-lg-2">
                            <Select
                                value="1"
                                ref="idType"
                                options={[
                                    {label: "身份证号", value: "1"},
                                    {label: "社保卡号", value: "2"},
                                    {label: "驾照号", value: "3"},
                                    {label: "军官证号", value: "4"},
                                    {label: "护照号", value: "5"}
                                ]} />
                        </div>
                        <div className={this.state.show.idNo ? 'col-lg-2 has-error' : 'col-lg-2'}>
                            <div ref="idNoParent">
                                <input
                                    type="text"
                                    className="form-control"
                                    ref="idNo"
                                    onChange={this.canncleTips.bind(this)}
                                    placeholder="证件号" />
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div style={{"display": "inline-block", "width": "calc(100% - 70px)"}}>
                                <Select
                                    ref="gender"
                                    placeholder="性别"
                                    options={[
                                        {label: "请选择", value: "0"},
                                        {label: "男", value: "1"},
                                        {label: "女",value: "2"}
                                    ]} />
                            </div>
                            <button
                                className="btn btn-info pull-right"
                                type="button"
                                onClick={this.queryPeople.bind(this)}
                                style={{"background-color": "#20A0FF"}}>查询</button>
                        </div>
                    </div>

                    <Overlay {...cardProps} placement="top">
                        <Tooltip>证件号不能为空</Tooltip>
                    </Overlay>

                    <Overlay {...telProps} placement="top">
                        <Tooltip>手机号码不能为空</Tooltip>
                    </Overlay>
                </form>
                {QueryPeopleDetailArr}
            </main>

            <Alert options={{show: this.state.dialog, onHide: this.onHide.bind(this), content: "没有数据", title: "人员识别"}}/>
        </div>
    }

}

export default Rconnect((state, props) => state.querypeople, {queryPeople}, QueryPeople);