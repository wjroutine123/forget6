import React, { Component } from 'react'
import { PageHeader, Button,Form, Input } from 'antd';
import axios from 'axios';

export default class Updatec extends Component {
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
                    title="更新城市"/>

                <Form
                    ref={this.fromref}>
                    <Form.Item
                        label="城市名称"
                        name="name"
                        rules={[{ required: true, message: 'Please input !' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="城市拼音"
                        name="pinyin"
                        rules={[{ required: true, message: 'Please input !' }]}>
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
        axios.get(`http://localhost:8000/citiesway/${this.props.match.params.myid}`).then(res=>{
            this.fromref.current.setFieldsValue({
               name:res.data.name,
               pinyin:res.data.pinyin

             })
        })
    }

    
    //提交方法

    handleSubmit = ()=>{
        this.fromref.current.validateFields().then(values=>{
            axios.put( `http://localhost:8000/citiesway/${this.props.match.params.myid}`,{
            name:values.name,
            pinyin:values.pinyin
            }).then(res=>{
                console.log(res.data)
                this.props.history.goBack()
            }) 
        })
    }
}