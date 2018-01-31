/**
 * Created by zhangyuanyuan031 on 17/9/22.
 */
import React from 'react'
import {dicVal} from 'util'

class QueryPersonsTr extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            globalPersId:undefined, // globalId
            dataDir: JSON.parse(localStorage.getItem('dataDir'))  // 查询数据字典数据
        }
    }

    dbClick(event){
        event.preventDefault();
        this.props.querySemblance(this.state.globalPersId);
    }

    changeBg(ev){
        this.props.clearBgColor();
        this.refs.tr.style.backgroundColor = "#c9e5f5";
    }

    render() {
        let {globalPersId, persName, gender, birth, cardType, cardNo, nation, maritalStatus, politicalStatus, commAddr, education, censusId} =  this.props.data;
        this.state.globalPersId = globalPersId;
        return <tr onDoubleClick={this.dbClick.bind(this)} onClick={this.changeBg.bind(this)} ref="tr">
            <td>{persName}</td>
            <td>{dicVal(this.state.dataDir,'AAC004',gender)}</td>
            <td>{birth}</td>
            <td>{dicVal(this.state.dataDir,'AAC058',cardType)}</td>
            <td>{cardNo}</td>
            <td>{dicVal(this.state.dataDir,'AAC005',nation)}</td>
            <td>{dicVal(this.state.dataDir,'AAC017',maritalStatus)}</td>
            <td>{dicVal(this.state.dataDir,'AAC013',politicalStatus)}</td>
            <td>{commAddr}</td>
            <td>{dicVal(this.state.dataDir,'AAC011',education)}</td>
            <td>{censusId}</td>
        </tr>
    }

}

export default QueryPersonsTr;
