import React, { Component } from 'react'
import { Table, Tag, Button,Card } from 'antd'
import axios from 'axios'

export default class Roles extends Component {

    state = {
        dataSource: []
    }

    columns = [
        {
            title: '角色名称',
            dataIndex: 'roleName', //自动对每一项数据 访问  .id 属性
            render: (a) => {
                //   console.log(id)
                return <b>{a}</b>
            } //定制每一列的样式
        },
        {
            title: '操作',
            render: (item) => {
                // console.log(item.id)
                return <div>
                    <Button danger onClick={() => this.handleDelete(item.id)} >删除</Button>
                    <Button type="primary" onClick={() => this.handleUpdate(item.id)}>更新</Button>
                </div>
            }
        }
    ];

    handleDelete = (id) => {
        console.log("delete", id)
        //删掉当前页面数据

        this.setState({
            dataSource: this.state.dataSource.filter(item => item.id !== id)
        })
        //同步后端

        axios.delete(`http://localhost:8000/roles/${id}`)
    }

    handleUpdate = (id) => {
        console.log('更新',id)
        this.props.history.push(`/rights-mange/role/updateroles/${id}`)
    }

    render() {
        return (
            <div>

                <Card bordered={false} style={{ marginTop:"10px", width: document.body.clientWidth }}>
                 <Button type="primary" ghost onClick={()=>{
                    this.props.history.push('/rights-mange/role/createroles')}}>添加角色</Button>
                </Card>

                <Table dataSource={this.state.dataSource} columns={this.columns}
                    rowKey={item => item.id}
                    pagination={
                        { pageSize: 5 }
                    } //分页    

                    //可展开
                    expandable={{
                        expandedRowRender: item => {
                            // console.log(item)
                            return item.roleRight.map(a =>
                                <div key={a.category}>
                                    <b>{a.category}</b>
                                    {a.list.map(b => <Tag color="green" key={b} closable>{b}</Tag>)}
                                </div>
                            )
                        }
                    }}
                />
            </div>
        )
    }

    componentDidMount() {
        axios.get("http://localhost:8000/roles").then(res => {
            // console.log(res.data)      
            this.setState({
                dataSource: res.data
            })
        })
    }

}

