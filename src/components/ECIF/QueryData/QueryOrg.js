/**
 * Created by zhangyuanyuan031 on 17/5/24.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Overlay, Tooltip} from 'react-bootstrap'
import {isEmptyObject} from 'util'
import Rconnect from 'util/Rconnect'
import {queryOrgbyOrgno} from "action/query-org"
import QueryOrgDetail from './QueryOrgDetail'
import "assets/less/queryorg.less"
import Alert from 'util/Alert'


class QueryOrg extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: {
                globalId: false,
                orgno: false
            },
            dialog: false
        }
    }

    onHide() {
        this.setState({dialog: false})
    }

    queryOrg() {
        // let getDay = this.refs.birthday.get();
        // let idNo = this.refs.idNo.value, tel = this.refs.tel.value;
//        let globalId = this.refs.globalId.value, orgno = this.refs.orgno.value;
        let orgno = this.refs.orgno.value;
        if (!orgno) {
            this.setState({show: {orgno: true}});
            return;
        }

        let queryCondition = {
            //  globalId: this.refs.globalId.value,
            orgno: this.refs.orgno.value
        };
//        if(!isEmptyObject(globalId)){
//                this.props.queryGlobalOrg(this.refs.globalId.value);
//                 return;
//           }
//        if(!isEmptyObject(orgno)){
//           this.props.queryOrgbyOrgno(this.refs.orgno.value);
//          }
        this.props.queryOrgbyOrgno(this.refs.orgno.value, () => {
            this.setState({dialog: true})
        });

    }

    canncleTips(e) {
        this.setState({show: {globalId: false, orgno: false}});
    }

    render() {
        let data = this.props.output;
        let QueryOrgDetailArr = [];
        if (!isEmptyObject(data)) {
            QueryOrgDetailArr.push(<QueryOrgDetail data={data}/>)
        }

        const cardProps = {
            show: this.state.show.globalId,
            container: ReactDOM.findDOMNode(this.refs.idNoParent),
            target: () => ReactDOM.findDOMNode(this.refs.idNoParent)
        };

        const orgProps = {
            show: this.state.show.orgno,
            container: ReactDOM.findDOMNode(this.refs.orgParent),
            target: () => ReactDOM.findDOMNode(this.refs.orgParent)
        };

        return <div className="queryOrg">
            <div className="tips">
                <span>机构精准查询</span>
            </div>
            <article className="desc">
                <div>
                    <section>
                        <label></label>
                        <h2>机构精准查询</h2>
                        <span>机构精准查询，提供精确的机构查询服务，并且提供可视化开发界面，多种查询方式相结合，精确的定位到您想查找的机构，并且提供详细的机构信息。包括机构基本信息、联系方式、地址、机构等级等</span>
                    </section>
                </div>
                <div></div>
            </article>

            <main>
                <form>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={this.state.show.orgno ? 'has-error' : ''}>
                                <div ref="orgParent" style={{"display": "inline-block", "padding-left": "10px", "width": "calc(100% - 70px)"}}>
                                    <input
                                        className="form-control"
                                        ref="orgno"
                                        onChange={this.canncleTips.bind(this)}
                                        placeholder="组织机构编号"/>
                                </div>
                                <button
                                    className="btn btn-info pull-right"
                                    type="button"
                                    onClick={this.queryOrg.bind(this)}
                                    style={{"background-color": "#20A0FF"}}>查询</button>
                            </div>
                        </div>
                    </div>

                    <Overlay {...cardProps} placement="top">
                        <Tooltip>全局id不能为空</Tooltip>
                    </Overlay>

                    <Overlay {...orgProps} placement="top">
                        <Tooltip>机构编码不能为空</Tooltip>
                    </Overlay>
                </form>
                {QueryOrgDetailArr}
            </main>
            <Alert options={{show: this.state.dialog, onHide: this.onHide.bind(this), content: "没有数据", title: "机构识别"}}/>
        </div>
    }
}

export default Rconnect((state, props) => state.queryorg, {queryOrgbyOrgno}, QueryOrg);