import React, { Component } from 'react'
import { Table, Button } from 'antd';
import axios from 'axios'

export default class Hot extends Component {
    state={
        dataSource:[],
    }
    currentItem = null //当前item
    columns = [
        {
          title: '#',
          dataIndex: 'id',
          render:(id)=>{
            //   console.log(id)
              return <b>{id}</b>
          }
        },
        {
            title: '热映电影',
            dataIndex:'name',
          },
          {
            title: '演员信息',
           render:(item)=>{
           return item.actors.map(data=><span key={data.name}>{data.name}/</span>)
           }
          },
          {
            title: '操作',
            render: (item) => {
            // console.log(item.id)
                return <div>
                    <Button danger onClick={()=>this.handleDelete(item.id)} disabled>删除</Button>
                    <Button type="primary" onClick={()=>this.handleUpdate(item.id)}>更新</Button>
                </div>
            }
          },
    ];
    handleUpdate = (id) => {
        this.props.history.push(`/article-manage/update/${id}`)
    }
    render() {
        return (
            <div>
                 <Button type="primary" onClick={()=>{
                    this.props.history.push('/films-mange/article-manage/articleCreate')
                }}>创建文章</Button>
               <Table rowKey={item=>item.id} dataSource={this.state.dataSource} columns={this.columns} pagination={
                     { pageSize: 5 }
                 }/>;
            </div>
        )
    }
    componentDidMount() {
        axios.get(" http://localhost:8000/hotway").then(res=>{
            console.log(res.data)
            this.setState({
                dataSource:res.data
            })
        })
    }
    
}
