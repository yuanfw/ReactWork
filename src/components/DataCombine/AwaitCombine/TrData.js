/**
 * Created by zhangyuanyuan031 on 17/9/12.
 */
import React, {Component} from 'react'
import eventProxy from 'util/eventProxy'
import {dicVal} from 'util' // 数据字典code值得value值

class TrData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:undefined,
            dataDir: JSON.parse(localStorage.getItem('dataDir')),  // 查询数据字典数据
            index:this.props.index + 1
        }
    }

    // change event
    changeCheck(event) {
        this.props.changeMainCheck(event.target.checked,this.state.id);
    }

    del(){
        this.props.del(this.state.id)
    }

    editPerson(){
        this.props.editPerson(this.state.id)
    }

    render() {
        let data = this.props.data;
        this.state.id = data.id;
        return <tr>
            <td style={{"text-align": "center"}}>
                <input ref="cbox" type="checkbox" name={this.state.id} onChange={this.changeCheck.bind(this)} defaultChecked={false}/>
            </td>
            <td style={{"text-align": "center"}}>{this.state.index}</td>
            <td>{data.persName}</td>
            <td>{dicVal(this.state.dataDir,'AAC004',data.gender)}</td>
            <td>{data.birth}</td>
            <td>{dicVal(this.state.dataDir,'AAC058',data.cardType)}</td>
            <td>{data.cardNo}</td>
            <td>{dicVal(this.state.dataDir,'AAC005',data.nation)}</td>
            <td>{dicVal(this.state.dataDir,'AAC017',data.maritalStatus)}</td>
            <td>{dicVal(this.state.dataDir,'AAC013',data.politicalStatus)}</td>
            <td>{data.address}</td>
            <td>{dicVal(this.state.dataDir,'AAC011',data.education)}</td>
            <td>{data.censusId}</td>
            <td>
                <button className="btn btn-default" type="button" style={{'margin-right': '5px'}} onClick={this.editPerson.bind(this)}>
                    <i className="glyphicon glyphicon-edit"></i>
                </button>
                <button className="btn btn-default" type="button" onClick={this.del.bind(this)}><i className="glyphicon glyphicon-trash"></i></button>
            </td>
        </tr>
    }
}

export default TrData;

