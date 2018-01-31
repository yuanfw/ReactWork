/**
 * Created by zhangyuanyuan031 on 17/6/5.
 */
import React from 'react'
import moment from 'moment'

class DateTimer extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        debugger
        let data=this.props.data;
        console.log(data);
        return <section className={this.props.index === 0 ? "detail-begin" : "detail"}>
            <div>
                <span className="circle"></span>
                <span className="line"></span>
                <i>{moment(data.dateTimeDto.dateTimeId).format("YYYY-MM-DD")}</i>
            </div>
            <div>
                <span></span>
                <table>
                    <thead>
                    <tr>
                        <th>{data.diseaseName}</th>
                        <th><span></span> {data.medicalOrgDto.deptName}</th>
                        <th><span></span> {data.regionDto.address}</th>
                        <th style={{"text-align":"right","padding-right":"20px"}}>￥{data.feeAmount}</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </section>
    }
}

export default DateTimer;
