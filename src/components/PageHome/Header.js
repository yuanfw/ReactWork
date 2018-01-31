/**
 * Created by zhangyuanyuan031 on 17/5/10.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import SencodMenu from './SencodMenu'

class Header extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            currentIndex: null
        }
    }

    isShow(index) {
        return index === this.state.currentIndex;
    }


    render() {
        const menuDate = this.props.data;
        let MenuItems = [];
        if (menuDate.length > 0) {
            MenuItems = menuDate.map((item, i) => {

                let toolBarMes = {  // 获取toolbar 一级信息
                    id:item.id,
                    name:item.name,
                    path:item.path
                };
                return <li key={i} onMouseOut={(e) => {
                    this.setState({currentIndex: null})
                }} onMouseOver={(e) => {
                    this.setState({currentIndex: i})
                }}><a to={item.path}>{item.name}</a>
                    <SencodMenu toolBarMes={toolBarMes} setToolBar={this.props.setToolBar} isShow={this.isShow(i)} index={i} key={i}
                                data={item.children}/>
                    <i style={this.isShow(i) ? {display: "block"} : {display: "none"} }></i></li>
            });
        }
        return <header>
            <article className="logo">ECIF</article>
            <nav>
                <ul>
                    {MenuItems}
                </ul>
            </nav>
            <article className="user-message">
                <label></label>
                <span>管理员 张三</span>
            </article>
        </header>
    }
}

export default Header