/**
 * Created by zhangyuanyuan031 on 17/6/9.
 */

import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';

class RangeDatePicker extends React.Component {
    constructor(props) {
        super(props);
        moment.locale('CH', {
            monthsShort: [
                "一月", "二月", "三月", "四月", "五月", "六月",
                "七月", "八月", "九月", "十月", "十一月", "十二月"
            ]
        });

        moment.locale('CH', {
            weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"]
        });

        this.state = {
            startDate: this.props.begin,
            endDate: this.props.end,
        };

        this.value=undefined;
    }

    handleEvent(event, picker) {
        event.preventDefault();
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
        this.value=this.get();
    }

    clearData(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({startDate: undefined, endDate: undefined})
        this.value=null;
    }

    get() {
        let {startDate, endDate} = this.state;
        if (startDate && typeof startDate !== 'string') startDate = startDate.format("YYYY-MM-DD");
        if (endDate && typeof endDate !== 'string') endDate = endDate.format("YYYY-MM-DD");
        let label = startDate + ' - ' + endDate;
        if (startDate === endDate) {
            label = startDate;
        }
        return label;
    }

    set(beginDate, endDate) {
        this.setState({startDate: beginDate, endDate: endDate})
    }

    render() {
        let locale = {
            format: 'YYYY-MM-DD',
            separator: ' - ',
            applyLabel: '应用',
            cancelLabel: '取消',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.localeData("CH").weekdaysMin(),
            monthNames: moment.localeData("CH").monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek(),
        }, label = this.get();
        return (
            <div>
                <DatetimeRangePicker
                    autoUpdateInput={false}
                    locale={locale}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onEvent={this.handleEvent.bind(this)}
                >
                    <span className="form-control">{label || this.props.placeholder || ""}</span>
                </DatetimeRangePicker>
                <div style={{position: "relative"}}>
                    <i onClick={this.clearData.bind(this)} className="iconfont icon-clear" style={{
                        position: "absolute",
                        "right": "5px",
                        top: "-30px",
                        "font-size": "18px",
                        color: "#afa8a8",
                        cursor: "pointer"
                    }}></i>
                </div>
            </div>
        );
    }
}

export default RangeDatePicker;


