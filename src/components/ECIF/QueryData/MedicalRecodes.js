/**
 * 用药记录有多条时
 * Created by zhangyuanyuan031 on 17/11/7.
 */

import React from 'react'
import MedicalRecodeItem from './MedicalRecodeItem'

class MedicalRecodes extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.child.style.height = this.parent.offsetHeight + "px";
    }

    render() {

        let data = this.props.data;
        let itemArr = [];
        let allMoney=0;
        if(data.tFeePrescriptionDetails && data.tFeePrescriptionDetails.length > 0 ){
            itemArr = data.tFeePrescriptionDetails.map((item,index) =>{
                allMoney += parseFloat(item.amount) * parseFloat(item.unitPrice);
                return <MedicalRecodeItem item={item} key={index}/>;
            });
        }

        return <section className="detail" ref={(e) => this.parent=e}>
            <div ref={(e) => this.child=e}>
                <span className="circle"></span>
                <span className="line"></span>
                <i>{data.begin}</i>
            </div>
            <div>
                <span></span>
                <table>
                    <thead>
                    <tr>
                        <th colSpan="2">{data.disName}</th>
                        <th><span></span> {data.orgName}</th>
                        <th><span></span> {data.address}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemArr}
                    <tr>
                        <td colSpan="4">
                            合计金额：￥{Math.round(allMoney * 100) / 100}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    }
}

export default MedicalRecodes;
