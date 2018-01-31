/**
 * Created by zhangyuanyuan031 on 17/9/8.
 */
import React from 'react'
import Switch from 'util/Switch'
import {setWeightManageStatus} from 'action/datacombine-action'


class Trdata extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            id:''
        }
    }

    switch(val){
        setWeightManageStatus({id:this.state.id,enable:val});
    }

    render() {
        let {del,update,data,index} = this.props;
        this.state.id = data.id;
        return <tr>
                    <td style={{"text-align": "center"}}>{index + 1}</td>
                    <td>{data.tableComment}</td>
                    <td>{data.columnComment}</td>
                    <td>{data.columnDesc}</td>
                    <td>{data.weightRatio}</td>
                    <td>
                        <span style={{"position": "relative", top: "7px"}}><Switch value={data.enable} checkedText="有效" unCheckedText="无效" onChange={this.switch.bind(this)}/></span>
                        <button className="btn btn-default" onClick={update.bind(this,data)} type="button"><i className="glyphicon glyphicon-edit"></i></button>
                        <button className="btn btn-default" onClick={del.bind(this,data.id)} type="button"><i className="glyphicon glyphicon-trash"></i></button>
                    </td>
                </tr>
    }
}

export default Trdata;