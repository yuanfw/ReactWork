/**
 * Created by zhangyuanyuan031 on 17/6/22.
 */
import React from 'react';
import {Modal,Button} from 'react-bootstrap'

/**
 * 使用方法
 * <Confirm options={{show:this.state.dialog,confirm:this.confirm.bind(this),onHide:this.onHide.bind(this),content:"你确定要删除吗?",title:"删除人员管理"}}/>
 */
class Confirm extends React.Component{

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
                <Button onClick={options.onHide}>取消</Button>
                <Button onClick={options.confirm}>确定</Button>
            </Modal.Footer>
        </Modal>)
    }
}

export default Confirm;