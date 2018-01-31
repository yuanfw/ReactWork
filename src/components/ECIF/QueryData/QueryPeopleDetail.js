/**
 * Created by zhangyuanyuan031 on 17/5/31.
 */

import React from 'react'
import {withRouter} from 'react-router'
import moment from 'moment'

class QueryPeopleDetail extends React.Component {

    gotoPeopleMes() {
        this.props.router.push("/pagehome/ecif/queryPeople/peopleMes/"+this.props.data.globalId);
    }

    render() {
        let output = this.props.data;
        let cardType;
        switch (output.idNo) {
            case "1":
                cardType = "身份证号";
                break;
            case "2":
                cardType = "社保卡号";
                break;
            case "3":
                cardType = "驾照号";
                break;
            case "4":
                cardType = "军官证号";
                break;
            case "5":
                cardType = "护照号";
                break;
            default:
                cardType = "身份证号";
        }

        return <table className="table" style={{"margin-top": "10px"}}>
            <thead>
            <tr>
                <th width="75px">序号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>出生年月</th>
                <th>证件类型</th>
                <th>证件号</th>
                <th>社保卡号</th>
                <th>手机</th>
                <th>最后更新时间</th>
            </tr>
            </thead>
            <tbody>
            <tr onDoubleClick={this.gotoPeopleMes.bind(this)}>
                <td>1</td>
                <td>{output.name}</td>
                <td>{output.gender === '1' ? '男' : '女'}</td>
                <td>{moment(output.birthday).format('YYYY-MM-DD')}</td>
                <td>{cardType}</td>
                <td>{output.idNo}</td>
                <td>{output.ssNo}</td>
                <td>{output.tel}</td>
                <td>{moment(output.updateDate).format('YYYY-MM-DD')}</td>
            </tr>
            </tbody>
        </table>
    }
}

export default withRouter(QueryPeopleDetail);
