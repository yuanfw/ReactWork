/**
 * * Created by zhangyuanyuan031 on 17/6/28.
 * 由于react-bootstrap 中的 Tooltip 在弹出框中存在bug ,于是自己封装一个 Tips
 * 封装一个提示框
 * 用法: <Tips target="target" self={this} content="你好啊" show={true} position="bottom"/>
 * 说明:
 *  target: 指向元素的ref的值
 *  self:要使用的类对象
 *  content:要提示的内容
 *  position:显示内容的方向
 */
import React from 'react'

export default class Tips extends React.Component {
    constructor(props, content) {
        super(props, content);
        this.state = {
            style: {left: "50%"},
            classname: "fade in tooltip top",
            targetPostion: undefined,
            tWidth: 0,
            tHieght: 0,
            show: this.props.show,
            position: this.props.position || "top",
            showText: this.props.content || ''
        }
    }

    componentDidMount() {
        let {self, target} = this.props;
        let targetObj = self.refs[target],
            $targetObj = $(targetObj);
        this.state.targetPostion = $targetObj.position();
        this.state.tWidth = $targetObj.outerWidth();
        this.state.tHieght = $targetObj.outerHeight();
        this._setStyle();
        this._setOpsition();
    }

    componentWillReceiveProps(newProps) {
        this.state.showText = newProps.content;
        this.state.show = newProps.show;
    }

    componentDidUpdate() {
        this._setOpsition();
        let {show} = this.state,
            toolTips = $(this.tooltips);
        if (show)
            toolTips.show();
        else
            toolTips.hide();
    }

    _setStyle() {
        switch (this.state.position) {
            case 'top':
                $(this.tooltips).addClass('top');
                this.style.style.left = "50%";
                break;
            case 'left':
                $(this.tooltips).addClass('left');
                this.style.style.top = "50%";
                break;
            case 'right':
                $(this.tooltips).addClass('right');
                this.style.style.top = "50%";
                break;
            case 'bottom':
                $(this.tooltips).addClass('bottom');
                this.style.style.left = "50%";
                break;
            default:
                $(this.tooltips).addClass('top');
                this.style.style.left = "50%";
        }
    }

    _setOpsition() {
        this.showText.innerText = this.state.showText;
        let targetpostion = this.state.targetPostion,
            tw = this.state.tWidth,
            th = this.state.tHieght;

        let toolTips = $(this.tooltips),
            toolW = toolTips.outerWidth(),
            toolH = toolTips.outerHeight(), l, t;
        let {position, show} = this.state;

        switch (position) {
            case "top":
                l = targetpostion.left + (tw - toolW) / 2;
                t = targetpostion.top - toolH;
                break;
            case "left":
                l = targetpostion.left - toolW - 5;
                t = targetpostion.top;
                break;
            case "right":
                l = targetpostion.left + tw;
                t = targetpostion.top;
                break;
            case "bottom":
                l = (tw - toolW) / 2 + targetpostion.left;
                t = targetpostion.top + th;
                break;
            default:
                l = (tw - toolW) / 2 + targetpostion.left;
                t = targetpostion.top - toolH - 5;
                break;
        }
        toolTips.css({left: l, top: t});
        if (show)
            toolTips.show();
        else
            toolTips.hide();
    }

    render() {
        return <div>
            <div className="fade in tooltip" ref={(_tooltips) => this.tooltips = _tooltips}>
                <div className="tooltip-arrow" ref={(_style) => this.style = _style}></div>
                <div className="tooltip-inner" ref={(_showText) => this.showText = _showText }></div>
            </div>
        </div>

    }
}