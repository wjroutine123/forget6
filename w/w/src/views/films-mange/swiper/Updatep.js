import React, { Component } from 'react'
import { PageHeader, Button,Form, Input } from 'antd';
import axios from 'axios';

export default class Updatep extends Component {
    state = {
        options:[]
    }

    fromref = React.createRef()

    render() {     
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => { this.props.history.goBack() }}
                    title="更新图片地址"/>

                <Form
                    ref={this.fromref}>
                    <Form.Item
                        label="图片地址"
                        name="img"
                        rules={[{ required: true, message: 'Please input your address!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
                <Button type="primary" onClick={this.handleSubmit}>
                    提交
                </Button>
            </div>
        )
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/swiperway/${this.props.match.params.myid}`).then(res=>{
            this.fromref.current.setFieldsValue({
               img:res.data.img
             })
        })
    }

    handleSubmit = ()=>{
        this.fromref.current.validateFields().then(values=>{
            axios.put( `http://localhost:8000/swiperway/${this.props.match.params.myid}`,{
            img:values.img
            }).then(res=>{
                console.log(res.data)
                this.props.history.goBack()
            }) 
        })
    }
}