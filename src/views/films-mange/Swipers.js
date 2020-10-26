import React, { Component } from 'react'
import { Table, Button,Modal, Form, Input,Card } from 'antd'
import axios from 'axios'

export default class List extends Component {

    state = {
        dataSource: [],
    }

    addFrom = React.createRef()
    currentItem = null

    columns = [
        {
            title: '图片序号',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id+1}</b>
            } 
        },
        {
            title: '图片',
            dataIndex: 'img',
            render: (img) => {
                return <div>
                    <img src={img} width={"200px"} height={"120px"} alt=''/>
                </div>
            } 
        },
        {
            title: '操作',
            render: (item) => {
                    return <div>
                    <Button type="primary" onClick={()=>this.handleUpdate(item.id)}>更新</Button>
                    <Button danger onClick={()=>this.handleDelete(item.id)} disabled >删除</Button>
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
             axios.delete(`http://localhost:8000/swiperway/${id}`)
    }

    //添加
    handleAddOK= ()=>{

                this.addFrom.current.validateFields().then(values=>{
                    //  console.log(values)
                    axios.post("http://localhost:8000/swiperway",{
                        "img":values.img
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
        this.props.history.push(`/films-mange/swiper/updatep/${id}`)
    }      

    render() {
        return (
            <div>
                 <Card bordered={false} style={{ marginTop:"10px", width: document.body.clientWidth }}>
                 <Button type="primary" ghost onClick={() => {
                     this.setState({
                         visibleAdd: true
                         })
                    }}>添加图片</Button>
                </Card>

                <Modal
                     visible={this.state.visibleAdd}
                     title="添加图片"
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
                             name="img"
                             label="图片地址"
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
        axios.get(`http://localhost:8000/swiperway`).then(res => {
            console.log(res.data)      
            this.setState({
                dataSource: res.data,
            })
        })
    }

}
