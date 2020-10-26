import React, { Component } from 'react'
import { Table,  Button, Modal, Form, Input } from 'antd'
import axios from 'axios'


export default class Users extends Component {

    state = {
        dataSource: [],
        
    }

    addFrom = React.createRef()
    updateFrom = React.createRef()

    currentItem = null //当前item

    columns = [
        {
            title: '影院名称',
            dataIndex: 'name', //自动对每一项数据 访问  .id 属性
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '编号',
            dataIndex: 'lowPrice',
        },
        {
            title: '操作',
            render: (item) => {
                // console.log(item.id)
                return <div>
                    <Button danger onClick={() => this.handleDelete(item.id)} disabled={item.default} >删除</Button>
                    <Button type="primary" onClick={() => this.handleUpdate(item)} disabled={item.default}>更新</Button>
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

        axios.delete(`http://localhost:8000/movieway/${id}`)
    }

    handleUpdate = (item) => {
        // console.log(item)

        this.currentItem = item
        setTimeout(()=>{
            this.setState({
                visibleUpdate:true
            })
    
            this.updateFrom.current.setFieldsValue({
                name:item.name,
                address:item.address,
                lowPrice:item.lowPrice
            })
        },0)
      
    }


    //创建用户，点击ok按钮
    handleAddOK= ()=>{

        this.addFrom.current.validateFields().then(values=>{
            // console.log(values)
            
            // 同步后端 ==》 //更新当前页面
            axios.post("http://localhost:8000/movieway",{
                "name": values.name,
                "address": values.address,

                
               
                "lowPrice": values.lowPrice
            
            }).then(res=>{
                // console.log(res.data)

                this.setState({
                    visibleAdd: false,
                    dataSource:[...this.state.dataSource,res.data]
                })
            })
            
            this.addFrom.current.resetFields()
        })
        
    }

    //更新用户，点击ok按钮
    handleUpdateOK = ()=>{
        // console.log(this.currentItem)
        this.updateFrom.current.validateFields().then(values=>{
            // console.log(values)
            

            axios.put(`http://localhost:8000/movieway/${this.currentItem.id}`,{
                ...this.currentItem,
                name:values.name,
                address:values.address,
                lowPrice:values.lowPrice,
                
            }).then(res=>{
                // console.log(res.data)
                this.setState({
                    visibleUpdate:false,
                    dataSource:this.state.dataSource.map(item=>{
                        if(item.id===this.currentItem.id){
                            return res.data
                        }
                        return item
                    })
                })
            })
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={() => {
                    this.setState({
                        visibleAdd: true
                    })
                }}>添加用户</Button>
                <Table dataSource={this.state.dataSource} columns={this.columns}
                    // rowKey接收一个回调函数，可以设置表格的key值（回调函数的返回值）
                    rowKey={item => item.id}
                    pagination={
                        { pageSize: 5 }
                    } //分页    
                />

                {/* 下面是模态中的表单组件 */}

                <Modal
                    visible={this.state.visibleAdd}
                    title="添加用户"
                    okText="创建"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({
                            visibleAdd: false
                        })
                    }}
                    onOk={this.handleAddOK}
                >
                    <Form
                        layout="vertical"
                        name="form_in_modal"

                        ref={this.addFrom}
                    >
                        <Form.Item
                            name="name"
                            label="影院名称"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="地址"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="lowPrice"
                            label="编号"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>


                {/* 更新的模态 */}

                <Modal
                    visible={this.state.visibleUpdate}
                    title="更新用户"
                    okText="更新"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({
                            visibleUpdate: false
                        })
                    }}
                    onOk={this.handleUpdateOK}
                >
                    <Form
                        layout="vertical"
                        name="form_in_modal_update"

                        ref={this.updateFrom}
                    >
                        <Form.Item
                            name="name"
                            label="影院名称"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="地址"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="lowPrice"
                            label="编号"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                             <Input />

                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        axios.get("http://localhost:8000/movieway").then(res => {
            // console.log(res.data)      
            this.setState({
                dataSource: res.data
            })
        })
    }

}
