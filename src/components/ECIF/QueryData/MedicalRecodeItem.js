/**
 * Created by zhangyuanyuan031 on 17/11/7.
 */
import React from 'react'

class MedicalRecodeItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props.item;
        return <tr>
            <td style={{width:"300px"}}>
                {item.orgThreeDirName}
            </td>
            <td style={{'text-align':'center'}}>{item.specification}{item.pharmacyType}</td>
            <td>x{item.amount}</td>
            <td>￥{item.unitPrice}</td>
        </tr>
    }
}

export default MedicalRecodeItem;
