/**
 * Created by zhangyuanyuan031 on 17/9/13.
 */
import React, {Component} from 'react'

class TrData extends Component {

    constructor(props) {
        super(props);
        this.state={
            checked:false
        }
    }

    checked(){
        let checkMethod = this.props.checkMethod;
        let flag=this.refs.ischecked.checked;
        checkMethod(flag,this.props.data.id);
    }

    render() {
        let {tableComment, columnDesc, createDate, updateDate,columnComment,id} = this.props.data;
        return <tr>
            <td style={{"text-align": "center"}}><input type="checkbox" defaultChecked={this.state.checked} name={id} ref="ischecked" onChange={this.checked.bind(this)}/></td>
            <td style={{"text-align": "center"}}>{this.props.index + 1}</td>
            <td>{tableComment}</td>
            <td>{columnComment}</td>
            <td>{columnDesc}</td>
            <td>{updateDate}</td>
            <td>{createDate}</td>
        </tr>
    }
}

export default TrData;
