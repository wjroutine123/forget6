import React, { Component } from 'react'
import { Row, Col, PageHeader } from 'antd';
import Echarts from 'echarts'
import axios from 'axios'
import _ from 'lodash'

class AskLeave extends Component {
    myBarChart = null
    myPieChart = null
    componentDidMount() {
        axios.get("http://localhost:8000/leaveway").then(res => {
            console.log(res.data)
            console.log(_.groupBy(res.data,"author"))
            this.initBarEchart(res.data)
            this.initPieEchart(res.data)
        })

        window.onresize = () => {
            this.myBarChart.resize()
            this.myPieChart.resize()
        }
    }

    componentWillUnmount() {
        window.onresize = null
    }

    initBarEchart(list) {
        let newlist = _.groupBy(list, "author")
        let xData = Object.keys(newlist)
        console.log(Object.values)
        let yData = Object.values(newlist).map(item => item.length)

        this.myBarChart = Echarts.init(document.getElementById('bar'));
        var option = {
            title: {
                text: '每个员工请假次数'
            },
            tooltip: {},
            legend: {
                data: ['请假次数']
            },
            xAxis: {
                data: xData
            },
            yAxis: {
                minInterval: 1
            }
            ,
            series: [{
                name: '请假次数',
                type: 'bar',
                data: yData,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                '#cc33cc', '#f60', '#00BFFF', '#bbaacc',
                                '#1E90FF', '#00BFFF'
                            ]
                            return colorList[params.dataIndex]
                        }
                    }
                },
            }]
        };

        this.myBarChart.setOption(option);
    }

    initPieEchart(list) {
        let newlist = _.groupBy(list, "author")
        let newData = []
        for (let key in newlist) {
            newData.push({
                name: key,
                value: newlist[key].length
            })
        }

        this.myPieChart = Echarts.init(document.getElementById('pie'));
        var option = {
            series: [
                {
                    name: '请假次数',
                    type: 'pie',
                    radius: '55%',
                    data: newData,
                    label: {
                        normal: {
                            formatter: '{b}: {d}%',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 15
                            }
                        }
                    },
                }
            ]
        };

        this.myPieChart.setOption(option);
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => { this.props.history.goBack() }}
                    title="请假信息"/>
                <Row>
                    <Col span={12}>
                        <div id="bar" style={{ width: '100%', height: '500px' }}></div>
                    </Col>
                    <Col span={12}>
                        <div id="pie" style={{ width: '100%', height: '500px' }}></div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default AskLeave