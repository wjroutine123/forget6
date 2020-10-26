import React, { Component } from 'react'
import './release.css'
import axios from 'axios'
import { Form, Input, Button } from 'antd';

 class Release extends Component {
    state = {
        size: 'large',
        formInfo:{},
    }
    releaseForm = React.createRef()
    render() {
        const { size } = this.state;
        return (
            <div>
                <h1>
                   <b>玄天府</b> 
                </h1>
                
                <Form ref={this.releaseForm}>
                    <Form.Item
                        label="职位名称"
                        name="title"
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item 
                    label="职位要求"
                    name="position"
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item 
                    label="工作地点"
                    name="place"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                    label="福利待遇"
                    name="welfare"
                     >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                    label="联系人"
                    name="contacts"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item 
                    label="联系人电话"
                    name="phone"
                    >
                       <Input/>
                    </Form.Item>

                    <Form.Item 
                    label="公司简介"
                    name="introduce"
                    >
                        <Input style={{ width: '100%',height:"200px" }} />
                    </Form.Item>

                    <Form.Item 
                    label="邮箱地址"
                    name="email"
                     >
                        <Input />
                    </Form.Item>
                </Form>,
                <Button type="primary" size={size} onClick={()=>{this.handleSubmit()}}>发布职位</Button>
            </div>
        )
    }
    handleSubmit () {
        this.releaseForm.current.validateFields().then(values => {
            console.log(values)
            axios.post('http://localhost:8000/recruitmessageway',{
                title: values.title,
                position: values.position,
                place: values.place,
                welfare:  values.welfare,
                contacts: values.contacts,
                phone: values.phone,
                introduce: values.introduce,
                email: values.email
            })
        })
    }
}
export default Release