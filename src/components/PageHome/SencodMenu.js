/**
 * Created by zhangyuanyuan031 on 17/5/23.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import ThreeMenu from './ThreeMenu'
class SencodMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            childrenHeight: 0,
            style: {}
        }
    }

    isShow(index) {
        return index === this.state.currentIndex;
    }


    componentDidUpdate() {
        let isShow = this.props.isShow;
        if (isShow) { // 若此组件要显示,设置它的宽和高
            let height = Math.max(this.refs.children.clientHeight, this.state.childrenHeight) + 40 + "px";
            let width = $(document).innerWidth() + "px";
            this.state.style = {
                display: "block",
                width,
                height
            };
        }
        this.refs.article.style.width = this.state.style.width;
        this.refs.article.style.height = this.state.style.height;
    }

    getChildHeight(height) {
        this.state.childrenHeight = height;
    }

    render() {
        let twoItems = [];
        let isShow = this.props.isShow;
        if (this.props.data && this.props.data.length > 0) {
            twoItems = this.props.data.map((item, index) => {

                let secondToolBarMes={ // 获取toolbar 二级信息
                    id:item.id,
                    name:item.name,
                    path:item.path
                };

                return <li key={index} onMouseOver={e => {
                    this.setState({currentIndex: index})
                }}><a to={item.path}>{item.name}</a>
                    <ThreeMenu oneToolBarMes={this.props.toolBarMes} secondToolBar={secondToolBarMes} setToolBar={this.props.setToolBar} getChildHeight={this.getChildHeight.bind(this)} index={index} isShow={this.isShow(index)}
                               data={item.children}/>
                    <i style={this.isShow(index) ? {display: "block"} : {display: "none"}}></i></li>});
        }

        return <article ref="article" style={isShow ? {display: "block"} : {display: "none"}}>
            <nav className="nav-left">
                <ul ref="children">
                    {twoItems}
                </ul>
            </nav>
        </article>
    }
}

export default SencodMenu;
