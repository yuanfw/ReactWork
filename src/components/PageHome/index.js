/**
 * Created by zhangyuanyuan031 on 17/5/10.
 */

import React from 'react'
import Header from './Header'
import ToolBar from './ToolBar'
import Rconnect from 'util/Rconnect'
import {pageAction} from 'action/page-home'
import {dataDicAction} from 'action/common-action'

import "assets/less/page-home.less"

class PageHome extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            toolbar: {}
        }
    }

    componentDidMount() {
        this.props.pageAction(); // 加载 index 页面数据

        // 查询数据字典中所有数据并缓存到 localStorage 中.
        this.props.dataDicAction((res)=>{
            if(res && res.httpCode === '200' && res.data && res.data.codeDictDto &&  res.data.codeDictDto.length > 0){
                window.localStorage.setItem('dataDir',JSON.stringify(res.data.codeDictDto));
            }else {
                throw new Error('数据字典中数据加载失败');
            }
        });
    }

    setToolBar(mes) {
        this.state.toolbar = mes;
        this.forceUpdate()
    }

    render() {
        let headerData = this.props.code === "200" ? this.props.output : [];
        return <div className="pagehome">
            <Header setToolBar={this.setToolBar.bind(this)} data={headerData}/>
            <ToolBar toolbar={this.state.toolbar}/>
            {this.props.children}
        </div>
    }
}

export default Rconnect((state, props) => state.pageHome , {pageAction,dataDicAction}, PageHome);