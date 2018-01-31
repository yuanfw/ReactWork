/**
 * 封装一个弹框
 * Created by zhangyuanyuan031 on 17/6/22.
 */
import React from 'react';
import {Modal} from 'react-bootstrap'

/**
 * 使用方法
 *   <Dialog options={{show:this.state.dialog,onHide:this.onHide.bind(this),title:"无内容",bsSize:"lg"}}>
         <div>
         没有查询到任何内容
         </div>
         <div>
         <Button onClick={this.onHide.bind(this)}>确定</Button>
         </div>
    </Dialog>

 注意:
    1,Dialog中有两个div,第一个用来显示内容
    2,第二个DIV用来显示要操作的按钮
 */
class Dialog extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {options, children} = this.props;
        return <Modal show={options.show} autoFocus={true} onHide={options.onHide} bsSize={options.bsSize || 'sm'}>
            <Modal.Header closeButton>
                <Modal.Title>{options.title || '弹框内容...'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children[0]}</Modal.Body>
            <Modal.Footer> {children[1]}</Modal.Footer>
        </Modal>
    }
}

export default Dialog;