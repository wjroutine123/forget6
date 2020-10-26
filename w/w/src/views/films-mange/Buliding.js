import React, { Component } from 'react'
import { Table, Button,Modal, Form, Input,Card } from 'antd'
import axios from 'axios'

export default class Buliding extends Component {

    state = {
        dataSource: [],
    }

    addFrom = React.createRef()
    currentItem = null

    columns = [
        {
            title: '序号',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            } 
        },
        {
            title: '城市',
            dataIndex: 'name',
            render: (name) => {
                return <b>{name}</b>
            } 
        },
        {
            title: '操作',
            render: (item) => {
                    return <div>
                    <Button type="primary" onClick={()=>this.handleUpdate(item.id)}>更新</Button>
                    <Button danger onClick={()=>this.handleDelete(item.id)} >删除</Button>
                </div>
            }
        }
    ];
    //删除
    handleDelete = (id) => {
        console.log("delete",id)
        //删掉当前页面数据

        this.setState({
            dataSource:this.state.dataSource.filter(item=>item.id!==id)
        })
             axios.delete(`http://localhost:8000/citiesway/${id}`)
    }

    //添加
    handleAddOK= ()=>{

                this.addFrom.current.validateFields().then(values=>{
                    //  console.log(values)
                    axios.post("http://localhost:8000/citiesway",{
                        "name":values.name,
                        "pinyin":values.pinyin
                    }).then(res=>{
                        // console.log(res.data)
                        this.setState({
                            visibleAdd: false,
                            dataSource:[...this.state.dataSource,res.data]
                        })
                    })
                     this.addFrom.current.resetFields() //重置
                })    
            }

    handleUpdate = (id) => {
         this.props.history.push(`/films-mange/city/updatec/${id}`)
    }      

    render() {
        return (
            <div>
                 <Card bordered={false} style={{ marginTop:"10px", width: document.body.clientWidth }}>
                 <Button type="primary" ghost onClick={() => {
                     this.setState({
                         visibleAdd: true
                         })
                    }}>添加城市</Button>
                </Card>

                <Modal
                     visible={this.state.visibleAdd}
                     title="添加城市"
                     okText="添加"
                     cancelText="取消"
                     onCancel={() => {
                         this.setState({
                             visibleAdd: false
                         })
                     }}
                     onOk={this.handleAddOK}>
                     <Form
                         ref={this.addFrom}>
                         <Form.Item
                             name="name"
                             label="城市名称"
                             rules={[{ required: true, message: 'Please input the title of collection!' }]}>
                             <Input />
                         </Form.Item>

                         <Form.Item
                             name="pinyin"
                             label="城市拼音"
                             rules={[{ required: true, message: 'Please input the title of collection!' }]}>
                             <Input />
                         </Form.Item>

                     </Form>
                 </Modal>

                <Table dataSource={this.state.dataSource} columns={this.columns}
                    rowKey={item=>item.id}
                    pagination={
                        { pageSize: 5 }
                    } />
                </div>
        )
    }

    componentDidMount() {
        axios.get('http://localhost:8000/citiesway').then(res => {
            console.log(res.data)      
            this.setState({
                dataSource: res.data,
            })
        })
    }

}
