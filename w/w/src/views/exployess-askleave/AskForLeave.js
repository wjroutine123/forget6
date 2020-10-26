import React, { Component } from 'react'
import {Space,Input,Form,Button } from 'antd';
import ArticlEditor from './ArticlEditor';
import  './Mang.css'
import Axios from 'axios';



 class AskForLeave extends Component {
     state={
         dataSource:[],
         content:'',
         isDisabled:true
     }
     mentForm = React.createRef()
    render() {
        return (
            <div>
                <h1 style={{fontWeight:900}}>请假申请</h1>
                <Button type="primary" disabled={this.state.isDisabled}>{this.state.isDisabled?'未批准':'已批准'}</Button>
                <Form ref={this.mentForm}>    
                <Space direction="vertical" size={8}>
                <Form.Item
                        label="员工姓名"
                        name="author"
                    >
                <Input size="small"/></Form.Item>
                </Space>
                <Form.Item
                        label="请假事由"
                    >
                </Form.Item>
                </Form> 
                <div>
                    < ArticlEditor getContent={(content)=>{
                        // console.log(content)
                        this.setState({
                            content
                        })
                    }}></ArticlEditor>
                </div>
                <Button onClick={()=>{this.handleSubmit()}}>提交</Button>
            </div>
           
        )
    }
    handleSubmit () {
        this.mentForm.current.validateFields().then(values => {
            Axios.post('http://localhost:8000/leaveway',{
                title: '请假原因',
                content:this.state.content,
                author: values.author,
                ismange: false
            }).then(res=>{
                localStorage.setItem('leave',JSON.stringify(res.data))
            })
        })
    }
    componentDidMount () {
        Axios.get(`http://localhost:8000/leaveway?id=${JSON.parse(localStorage.getItem('leave')).id}`).then(res=>{
            console.log(res.data)
            if(res.data.length){
                this.setState({
                    isDisabled:!res.data[0].ismange
                })
            }
        })
    }
}
export default AskForLeave
