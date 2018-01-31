/**
 * Created by zhangyuanyuan031 on 17/5/22.
 */
import React from 'react'
import {isEmptyObject} from 'util'
class ToolBar extends React.Component {

    render() {

        let data = this.props.toolbar;
        let children = [];
        if (!isEmptyObject(data)) {
            children.push(<ChildPages flag={false} mes={data.one.name}/>);
            children.push(<ChildPages flag={false} mes={data.two.name}/>);
            children.push(<ChildPages flag={true} mes={data.three.name}/>);
        }
        return <p className="showtips">
            <span className="home">
                    <label className="home-icon iconfont"></label>
                    主页
            </span>
            {children}
        </p>
    }
}

class ChildPages extends React.Component {
    render() {
        return <span>
               <i>/</i>
            <span className={this.props.flag ? "nowpage" : ""}>{this.props.mes}</span>
        </span>
    }
}

export default ToolBar;

