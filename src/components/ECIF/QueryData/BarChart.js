/**
 * 用户管理component
 */
import React from 'react'
import echarts from 'echarts'

class BarChart extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let mesData = this.props.data;
        let xAxisData =[]; // 做标值
        let seriseData = []; // 具体每项值
        if(mesData && mesData.length > 0){
            mesData.forEach((item,index) => {
                xAxisData.push(item.begin.substr(0,7));
                seriseData.push(item.money);
            });
        }

        let chartNode = echarts.init(this.chart);
        let title = "近一年就诊费用统计:单位(元)";

        let option = {
            title: {
                x: 'center',
                text: title
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
        /*    toolbox: { // 显示下载图片功能
                show: true,
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },*/
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    show: false,
                    data: xAxisData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: title,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: "#0066ff",
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{b}\n{c}'
                            }
                        }
                    },
                    data: seriseData,
                    markPoint: {
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(0,0,0,0)'
                        },
                    }
                }
            ]
        };

        chartNode.setOption(option);
    }

    render() {
        return (
            <section style={{"border-bottom": "1px solid #E0E6ED", "width": "100%", "height": "400px"}}>
                <div ref={(e) => this.chart = e} style={{height: "100%", width: "100%"}}></div>
            </section>
        )
    }

}

export default BarChart