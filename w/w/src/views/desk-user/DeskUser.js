import React, { Component } from 'react'
import axios from 'axios'
import echarts from 'echarts'

export default class DeskUser extends Component {
    render() {
        return (
            <div>
                <div id="main" style={{width:'100%',height:'500px'}}></div>
            </div>
        )
    }
    componentDidMount() {
        axios.get('http://localhost:8000/deskway').then(res =>{
            console.log(res.data)
            var myChart = echarts.init(document.getElementById('main'))
            var newdata = []
            newdata.push(res.data.length)

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'app用户数量'
            },
            tooltip: {},
            legend: {
                data:['注册量']
            },
            xAxis: {
                data: ["用户"]
            },
            yAxis: {
                interval:1
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: newdata
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        })
    }
    
}
