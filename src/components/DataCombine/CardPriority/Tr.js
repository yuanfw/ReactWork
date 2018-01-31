/**
 * Created by zhangyuanyuan031 on 17/10/23.
 */
import React from 'react'

class Tr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            rowStyle:{
                cursor: "move"
            }
        }
    }

    checked() {
        this.props.setId(this.refs.ischecked.checked, this.state.id);
    }

    // 组件销毁时钩子函数
    componentWillUnmount() {
        this.refs.ischecked.checked = false;
    }

    /**
     * 拖拽效果的实现
     */

    // 开始拖拽
    dragStart(ev) {
        ev.dataTransfer.effectAllowed = "move";
        ev.dataTransfer.setData("text", ev.target.innerHTML);
        this.props.setDragStart(this.state.id);
        return true;
    }

    // 拖拽结束
    dragEnd(ev) {
        ev.dataTransfer.clearData("text");
        return false;
    }

    // 目标元素
    // 拖拽进入
    dragEnter(ev) {
        ev.preventDefault();
        return false;
    }

    //在目标元素上移动 修改样式
    dragOver(ev) {
        ev.preventDefault();
        this.props.clearStyle();
        $(this.tr).css({
            cursor:"move",
            'border-bottom':'5px solid #ddd',
            'background-color':"#f9f9f9"
        });
        return false;
    }

    // 松开鼠标事件
    drop(ev) {
        this.props.clearStyle();
        this.props.dropToTarget(this.state.id);
        return false;
    }

    render() {
        let {id, codeName, priorityLev, remark, updateDate, createDate} = this.props.data;
        this.state.id = id;

        return <tr
            style={this.state.rowStyle}
            draggable={true}
            onDragStart={this.dragStart.bind(this)}
            onDragEnd={this.dragEnd.bind(this)}
            onDragEnter={this.dragEnter.bind(this)}
            onDragOver={this.dragOver.bind(this)}
            onDrop={this.drop.bind(this)}
            ref={(e) => this.tr=e}
        >
            <td style={{"text-align": "center"}}><input type="checkbox" ref="ischecked" onChange={this.checked.bind(this)}/></td>
            <td style={{"text-align": "center"}}>{this.props.index + 1}</td>
            <td>{codeName}</td>
            <td>{remark}</td>
            <td>{createDate}</td>
        </tr>
    }
}

export default Tr;