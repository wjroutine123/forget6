import React, { Component } from 'react'
import { Button, Table,message } from 'antd'
import axios from 'axios'

export default class Mangement extends Component {
    state = {
        dataSource:[]
    }
    columns = [
        {
          title: '姓名',
          dataIndex: 'author'
        },
        {
          title: '操作',
          render: (item)=>{
              return <div>
                  <Button danger onClick={()=>{this.handleRatify(item)}}>批假</Button>
                  <Button type="primary" onClick={()=>{this.handlePreview(item.id)}}>预览</Button>
              </div>
          }
        }
      ]  
    handleRatify(data){
        axios.put(`http://localhost:8000/leaveway/${data.id}`,{
            ...data,
            ismange:true
        }).then(res => {
            message.success('已经批准')
        })
    }
    handlePreview (id) {
        this.props.history.push(`/exployees-askleave/leavepreview/${id}`)
    }
    render() {
        return (
            <div>
                <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={item=>item.id} ></Table>
            </div>
        )
    }
    componentDidMount () {
        axios.get('http://localhost:8000/leaveway').then(res => {
            console.log(res.data)
            this.setState({
                dataSource:res.data
            })
        })
    }
}
