/**
 * 封装一个提示弹框,可用简单的弹框架
 * Created by zhangyuanyuan031 on 17/6/22.
 */

import React from 'react';
import {Modal,Button} from 'react-bootstrap'

/**
 * 使用方法:
 *   <Alert options={{show:this.state.dialog,onHide:this.onHide.bind(this),title:"aaa",content:"没有数据"}}/>
 */
class Alert extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        let {options} = this.props;
        return (<Modal show={options.show} autoFocus={true} onHide={options.onHide} bsSize={options.bsSize || 'sm'}>
            <Modal.Header closeButton>
                <Modal.Title>{options.title || '弹框内容...'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{options.content}</Modal.Body>
            <Modal.Footer>
                <Button onClick={options.onHide}>确定</Button>
            </Modal.Footer>
        </Modal>)
    }
}

export default Alert;