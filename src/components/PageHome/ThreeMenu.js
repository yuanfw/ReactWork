/**
 * Created by zhangyuanyuan031 on 17/5/23.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

class ThreeMenu extends React.Component {

    componentDidUpdate() {
        let isShow = this.props.isShow;
        if (isShow) {
            let dom = this.refs.threeNav;
            let threeNavH = dom.clientHeight || dom.offsetHeight;
            this.props.getChildHeight(threeNavH)
        }
    }

    setToolBar(args) {
        let oneToolBar = this.props.oneToolBarMes, towToolBar = this.props.secondToolBar;
        this.props.setToolBar({
            one:oneToolBar,
            two:towToolBar,
            three:args
        });
    }

    render() {
        let isShow = this.props.isShow;
        let threeItem = [];
        if (this.props.data && this.props.data.length > 0) {
            threeItem = this.props.data.map(item => <li onClick={this.setToolBar.bind(this, item)}><Link
                to={item.path}>{item.name}</Link><p>{item.desc}</p>
            </li>)
        }
        let top = this.props.index * (-40) + "px";
        return <nav ref="threeNav" style={isShow ? {display: "block", top: top} : {display: "none", top: top}}>
            <ul>
                {threeItem}
            </ul>
        </nav>
    }
}

export default ThreeMenu;
