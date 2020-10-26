import React, { Component } from 'react'
import { Table, Button,Modal, Form, Input } from 'antd'
import axios from 'axios'

export default class Records extends Component {
    state = {
        dataSource: [],
        myid: 0,
        visible:false,
        isvisible:false
    }
    cretaeForm = React.createRef()
    updateForm = React.createRef()
    currentItem = null
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
            title: '姓名',
            render: (item) => {
                return <div>
                    <Button type="primary" onClick={()=>{
                        this.handleUpdate(item)
                    }}>更新</Button>
                    <Button danger onClick={()=>{
                        this.handleDelete(item.id)
                    }}>删除</Button>
                </div>
            }
        }
    ]
    handleUpdate (item) {
        this.currentItem = item
        setTimeout(()=>{
            this.setState({
                isvisible:true
            })
            // console.log(this.updateForm.current)
            this.updateForm.current.setFieldsValue({
                title:item.username
            })
        },0)
    }
    handleDelete (id) {
        this.setState({
            dataSource:this.state.dataSource.filter(item=>item.id!==id)
        })
        axios.delete(`http://localhost:8000/ployway/${id}`)
    }
    handleUpdateOk (current) {
        this.updateForm.current.validateFields().then(values => {
            axios.put(`http://localhost:8000/ployway/${current.id}`,{
                username:values.title
            })
        })
    }
    handleCreate () {
        this.setState({
            visible:true
        })
    }
    onCancel () {
        this.setState({
            visible:false
        })
    }
    handleOk () {
        // console.log(this.cretaeForm.current.validateFields())
        this.cretaeForm.current.validateFields().then(values => {
            // console.log(values)
            axios.post('http://localhost:8000/ployway',{
                username: values.title,
                sign: '今天未签到',
                signday: 1,
            }).then(res => {
                this.setState({
                    visible:false
                })
            })
        })
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={()=>{this.handleCreate()}}>添加员工</Button>
                <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={item=>item.id} />
                <Modal
                    visible={this.state.visible}
                    title="添加新员工"
                    okText="添加"
                    cancelText="取消"
                    onCancel={()=>{
                        this.onCancel()
                    }}
                    onOk={() => {
                        this.handleOk()
                    }}
                >
                    <Form
                        ref={this.createForm}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{ modifier: 'public' }}
                    >
                        <Form.Item
                            name="title"
                            label="员工姓名"
                            rules={[{ required: true, message: '请输入内容!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.isvisible}
                    title="更新名单"
                    okText="更新"
                    cancelText="取消"
                    onCancel={()=>{
                        this.setState({
                            isvisible:false
                        })
                    }}
                    onOk={() => {
                        this.handleUpdateOk()
                    }}
                >
                    <Form
                        ref={this.updateForm}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{ modifier: 'public' }}
                    >
                        <Form.Item
                            name="title"
                            label="员工姓名"
                            rules={[{ required: true, message: '请输入内容!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
    componentDidMount() {
        axios.get('http://localhost:8000/ployway').then(res => {
            this.setState({
                dataSource: res.data
            })
        })
    }
}
