import React, { Component } from 'react'
import { Table,Tag,Button,Select,Form, Modal,Input } from 'antd';
import axios from 'axios'
const { Option } = Select;


export default class Rights extends Component {
    state={
        dataSource:[],
        visibleAdd: false,
        visibleUpdate: false
    }
    addFrom = React.createRef()
    updateFrom = React.createRef()
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
            title: '权限列表',
            dataIndex:'title'
          },
          {
            title: '权限等级',
            dataIndex: 'grade',
            render: (grade) => {
              let arr = ["green", "orange", "red"]
              return <Tag color={arr[grade - 1]}>{grade}</Tag>
           }
          },
          {
            title: '操作',
            render: (item) => {
            console.log(item.id)
                return <div>
                    <Button danger onClick={()=>this.handleDelete(item.id)} disabled>删除</Button>
                    <Button type="primary" onClick={()=>this.handleUpdate(item)}>更新</Button>
                </div>
            }
          },
    ];
    handleDelete=(id)=>{
        this.setState({
            dataSource:this.state.dataSource.filter(item=>item.id!==id)
        })
        axios.delete(`http://localhost:8000/rights/${id}`)
    }
    handleUpdate = (item) => {
        // console.log(item)

        this.currentItem = item
        setTimeout(()=>{
            this.setState({
                visibleUpdate:true
            })
    
            this.updateFrom.current.setFieldsValue({
                title:item.title,
                grade:item.grade
            })
            console.log(this.updateFrom.current)
        },0)
    }

    handleUpdateOK = ()=>{
        // console.log(this.currentItem)
        this.updateFrom.current.validateFields().then(values=>{
            console.log(values)
            // console.log(values)
            axios.put(`http://localhost:8000/rights/${this.currentItem.id}`,{
                ...this.currentItem,
               title:values.title,
                grade:values.grade,
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
            <Table dataSource={this.state.dataSource} columns={this.columns}pagination={
                     { pageSize: 5 }
                 }  />;
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
                            name="title"
                            label="标题"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="grade"
                            label="权限等级"
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
        axios.get("http://localhost:8000/rights").then(res => {
            console.log(res.data)      
            this.setState({
                dataSource: res.data
            })
        })
    }
}
