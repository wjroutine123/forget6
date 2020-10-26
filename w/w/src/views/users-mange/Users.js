import React, { Component } from 'react'
import { Table, Switch, Button, Modal, Form, Input ,Select} from 'antd'
import axios from 'axios'
const { Option } = Select;

export default class Users extends Component {

    state = {
        dataSource: [],
        visibleAdd: false,
        visibleUpdate: false
    }

    addFrom = React.createRef()
    updateFrom = React.createRef()

    currentItem = null //当前item

    columns = [
        {
            title: '角色名称',
            dataIndex: 'roleName', //自动对每一项数据 访问  .id 属性
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户状态',
            // dataIndex: 'roleState',
            render: (item) => {
                return <Switch defaultChecked={item.roleState} disabled={item.default} onChange={(checked)=>{
                    this.handleSwitchChange(item,checked)
                }}></Switch>
            }
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

        axios.delete(`http://localhost:8000/users/${id}`)
    }

    handleUpdate = (item) => {
        // console.log(item)

        this.currentItem = item
        setTimeout(()=>{
            this.setState({
                visibleUpdate:true
            })
    
            this.updateFrom.current.setFieldsValue({
                username:item.username,
                password:item.password,
                roleType:item.roleType
            })
        },0)
      
    }

    handleSwitchChange = (item,checked)=>{
        console.log(item,checked)
        axios.put(`http://localhost:8000/users/${item.id}`,{
            ...item,
            roleState:checked
        })

        //同步前端的state

        this.setState({
            dataSource:this.state.dataSource.map(data=>{
                if(data.id===item.id){
                    return {
                        ...item,
                        roleState:checked
                    }
                }
                return data
            })
        })
    }
    //创建用户，点击ok按钮
    handleAddOK= ()=>{

        this.addFrom.current.validateFields().then(values=>{
            // console.log(values)
            let list= ["小编","管理员","超级管理员"]
            // 同步后端 ==》 //更新当前页面
            axios.post("http://localhost:8000/users",{
                "username": values.username,
                "password": values.password,
                "roleName": list[values.roleType-1],
                "roleState": false,
                "default": false,
                "roleType": values.roleType
            
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
            let list= ["小编","管理员","超级管理员"]

            axios.put(`http://localhost:8000/users/${this.currentItem.id}`,{
                ...this.currentItem,
                username:values.username,
                password:values.password,
                roleType:values.roleType,
                roleName:list[values.roleType-1]
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
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input type="password"/>
                        </Form.Item>

                        <Form.Item
                            name="roleType"
                            label="角色"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"

                            >
                                <Option value={3}>超级管理员</Option>
                                <Option value={2}>管理员</Option>
                                <Option value={1}>小编</Option>
                            </Select>

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
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input type="password"/>
                        </Form.Item>

                        <Form.Item
                            name="roleType"
                            label="角色"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"

                            >
                                <Option value={3}>超级管理员</Option>
                                <Option value={2}>管理员</Option>
                                <Option value={1}>小编</Option>
                            </Select>

                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        axios.get("http://localhost:8000/users").then(res => {
            // console.log(res.data)      
            this.setState({
                dataSource: res.data
            })
        })
    }

}
