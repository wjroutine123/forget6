import React, { Component } from 'react'
import { PageHeader, Button,Form,Input } from 'antd';
import axios from 'axios';

export default class Update extends Component {
    state = {
        options:[],
        formInfo:{}
    }

    fromref = React.createRef()

    render() {
   
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => { this.props.history.goBack() }}
                    title="更新信息"/>

                <Form
                    ref={this.fromref}>
                        <Form.Item
                            label="名称"
                            name="roleName"
                            rules={[{ required: true, message: 'Please input' }]}>
                            <Input/>
                        </Form.Item>
                </Form>
                  
                <Button type="primary" onClick={this.handleSubmit}>
                    提交
                </Button>    
            </div>
        )
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/roles/${this.props.match.params.myid}`).then(res=>{
            console.log(res.data)
            // console.log(this.fromref.current)
            this.setState({
                formInfo:res.data
            })
            this.fromref.current.setFieldsValue({
                roleName:res.data.roleName
            })
        })
    }
    
    //提交方法

    handleSubmit = (id)=>{
        this.fromref.current.validateFields().then(values=>{
            axios.put(`http://localhost:8000/roles/${this.props.match.params.myid}`,{
                ...this.state.formInfo,
                roleName:values.roleName
           }).then(res=>{
            this.props.history.goBack()    
           })
        })
    }
 }

