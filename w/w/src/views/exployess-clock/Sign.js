import React, { Component } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import moment from 'moment'

export default class Sign extends Component {
    state = {
        dataSource:[],
        myid:0
    }
    columns = [
        {
          title: '#',
          dataIndex: 'id'
        },
        {
          title: '姓名',
          dataIndex: 'username'
        },
        {
          title: '签到时间',
          dataIndex: 'sign',
          render: (sign)=>{
            return sign[sign.length-1]==='今天未签到'?'今天未签到':moment(sign[sign.length-1]).format('YYYY-MM-DD')
          }
        },
        {
            title: '签到天数',
            dataIndex: 'signday'
          }
      ]  
    render() {
        return (
            <div>
                <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={item=>item.id} />
            </div>
        )
    }
    componentDidMount () {
        axios.get('http://localhost:8000/ployway').then(res => {
            console.log(res.data)
            this.setState({
                dataSource:res.data
            })
        })
    }
}
