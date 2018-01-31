/**
 * Created by zhangyuanyuan031 on 17/5/31.
 */

import React from 'react'
import {withRouter} from 'react-router'
import {isEmptyObject} from 'util'
import {queryGlobalOrg, queryOrg} from 'action/query-org'
import OrgDetailMes from './OrgDetailMes'

class QueryOrgDetail extends React.Component {

   gotoOrgMes() {
              //this.props.router.push("/pagehome/ecif/queryOrg/orgDetailMes/"+this.props.data.globalId);
          this.props.router.push("/pagehome/ecif/queryOrg/orgDetailMes/"+this.props.data.globalOrgId);
      }

    render() {
        let output = this.props.data;
        let OrgDetailMesArr = [];
                if (!isEmptyObject(output)) {
                   OrgDetailMesArr.push(<OrgDetailMes data={output}/>)
                }
        return <table className="table" style={{"margin-top": "10px"}}>
            <thead>
            <tr>
                <th width="75px">序号</th>
                <th>机构编号</th>
                <th>机构名称</th>
                <th>机构类型</th>
                <th>联系人</th>
                <th>联系电话</th>
                <th>地址</th>
            </tr>
            </thead>
            <tbody>
            <tr onDoubleClick={this.gotoOrgMes.bind(this)}>
                <td>1</td>
                <td>{output.orgno}</td>
                <td>{output.orgname}</td>
                <td>{output.orgtype === "1" ? "平台经办" : output.orgtype === "2" ? "商保机构" : output.orgtype === "3" ? "医保机构" : "医疗机构"}</td>
                <td>{output.linkman}</td>
                <td>{output.linktel}</td>
                <td>{output.address}</td>
            </tr>
            </tbody>
        </table>
    }
}
//export default Rconnect((state,props) => state.queryorg,{queryOrgbyOrgno,queryGlobalOrg}, QueryOrgDetail);
export default withRouter(QueryOrgDetail);
