import React, { Component } from 'react'
import { head } from './head';
import Echarts from 'echarts'
import { Row, Col } from 'antd';
import axios from 'axios'
import _ from 'lodash'

class Home extends Component {
    myBarChart = null
    myPieChart = null
    componentDidMount() {
        // console.log("dom已经插入到父节点中,css还在计算中",document.getElementById('main').clientWidth)


        axios.get(" http://localhost:8000/gateway").then(res => {
            console.log(res.data)
            // console.log(_.groupBy(res.data,"author"))
            this.initBarEchart(res.data)
            // this.initPieEchart(res.data)
        })



        window.onresize = () => {
            // console.log("resize")
            //调整echart大小

            this.myBarChart.resize()
            // this.myPieChart.resize()
        }
    }

    componentWillUnmount() {
        window.onresize = null
    }

    initBarEchart(list) {

        // console.log()
        let newlist = _.groupBy(list,"name")
        let xData = Object.keys(newlist)
        let yData = Object.values(newlist).map(item => item.length)

        this.myBarChart = Echarts.init(document.getElementById('bar'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '上映电影'
            },
            tooltip: {},
            legend: {
                data: ['电影名']
            },
            xAxis: {
                data: xData
            },
            yAxis: {
                minInterval: 1
            }
            ,
            series: [{
                name: '电影名',
                type: 'bar',
                data: yData,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                '#14c145', '#f60', '#ff0000', '#00ddff',
                                '#baff00', '#00ff06'
                            ]
                            return colorList[params.dataIndex]
                        }
                    }
                }, //不同柱颜色不一样
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.myBarChart.setOption(option);
    }

    // initPieEchart(list) {
    //     let newlist = _.groupBy(list, "author")
    //     // console.log(newlist)
    //     let newData = []
    //     for (let key in newlist) {
    //         newData.push({
    //             name: key,
    //             value: newlist[key].length
    //         })
    //     }
    //     // console.log(newData)

    //     this.myPieChart = Echarts.init(document.getElementById('pie'));
    //     // 指定图表的配置项和数据
    //     var option = {
    //         series: [
    //             {
    //                 name: '文章数',
    //                 type: 'pie',
    //                 radius: '55%',
    //                 data: newData,
    //                 label: {
    //                     normal: {
    //                         formatter: '{b}: {d}%',
    //                         textStyle: {
    //                             fontWeight: 'normal',
    //                             fontSize: 15
    //                         }
    //                     }// 显示百分比
    //                 },

    //             }
    //         ]
    //     };

    //     // 使用刚指定的配置项和数据显示图表。
    //     this.myPieChart.setOption(option);
    // }

    render() {
        return (
            <div>
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

export default head(Home, {
    title: "电影信息",
  
})