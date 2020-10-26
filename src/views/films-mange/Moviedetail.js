import React, { Component } from 'react'
import { Button, Table } from 'antd'
import axios from 'axios'

export default class Moviedetail extends Component {
      state = {
          dataSource:[]
      }
      columns = [
        {
          title: '#',
          dataIndex: 'id',
          render:(id)=>{
            return <b>{id}</b>
          }
        },
        {
          title: '电影名',
          dataIndex: 'name',
        },
        {
          title: '演员信息',
          render:(item)=>{
                return item.actors.map(data=><span key={data.avatarAddress}>{data.name}</span>)
          }
        },
        {
            title: '操作',
            render: (item)=>{
                return <div>
                    <Button danger onClick={()=>{this.handleDel(item.id)}}>删除</Button>
                    <Button type="primary" onClick={()=>{this.handleUpdate(item.id)}}>更新</Button>
                </div>
            }
        }
      ]
    handleDel = (id)=> {
        this.setState({
            dataSource:this.state.dataSource.filter(data=>data.id!==id)
        })
        axios.delete(`http://localhost:8000/detailway/${id}`)
    }
    handleUpdate = (id)=>{
        this.props.history.push(`/films-mange/detailupdate/${id}`)
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={()=>{
                    this.props.history.push('/films-mange/detailcreate')
                }}>添加信息</Button>
                <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={item=>item.id} />;
            </div>
        )
    }
    componentDidMount () {
        axios.get('http://localhost:8000/detailway').then(res=>{
            console.log(res.data)
            this.setState({
                dataSource:res.data
            })
        })
    }
}
