/**
 * Created by zhangyuanyuan031 on 17/9/27.
 */
import React from 'react'
import {dicVal} from 'util'

class SemblanceTr extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            globalPersId:"", // globalId
            dataDir: JSON.parse(localStorage.getItem('dataDir'))  // 查询数据字典数据
        }
    }

    //给父组件设置id
    setId(event){
        this.props.getCheckids(event.target.checked,this.state.globalPersId);
    }

    edit(flag,event){
       event.preventDefault();
       this.props.edit(flag,this.state.globalPersId);
    }

    componentDidUpdate(){
        if(this.refs.cbox){
            this.refs.cbox.checked=false;
            this.props.getCheckids(false,this.state.globalPersId);
        }
    }

    componentWillMount(){
        if(this.refs.cbox){
            this.refs.cbox.checked=false;
            this.props.getCheckids(false,this.state.globalPersId);
        }
    }

    render(){
      let {globalPersId,semblance,persName,gender,birth,cardType,cardNo,nation,politicalStatus,education,censusId,locked} = this.props.data;
      this.state.globalPersId = globalPersId;

        return  <tr>
            <td style={{'text-align':'center'}}><input style={{display:locked === "0" ? "inline-block" : "none"}} ref="cbox" onChange={this.setId.bind(this)} type="checkbox"/></td>
            <td style={{'text-align':'center'}}>{this.props.index + 1}</td>
            <td>{semblance}</td>
            <td>{persName}</td>
            <td>{dicVal(this.state.dataDir,'AAC004',gender)}</td>
            <td>{birth}</td>
            <td>{dicVal(this.state.dataDir,'AAC058',cardType)}</td>
            <td>{cardNo}</td>
            <td>{dicVal(this.state.dataDir,'AAC005',nation)}</td>
            <td>{dicVal(this.state.dataDir,'AAC013',politicalStatus)}</td>
            <td>{dicVal(this.state.dataDir,'AAC011',education)}</td>
            <td>{censusId}</td>
            <td style={{'text-align':'center'}}>
                <button onClick={this.edit.bind(this,'search')} className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
                <button onClick={this.edit.bind(this,'edit')} style={{'margin-left':'5px',display:locked === "0" ? "inline-block" : "none"}} className="btn btn-default" type="button"><i className="glyphicon glyphicon-edit"></i></button>
            </td>
        </tr>
    }
}


export default SemblanceTr;