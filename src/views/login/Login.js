import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'
import Particles from 'react-particles-js'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import params from './params'

export default class Login extends Component {
    error = () => {
        message.error('用户名密码不匹配');
      }
    onFinish = (values) => {
        axios.get(`http://localhost:8000/users?username=${values.username}&password=${values.password}&roleState=${true}`).then(res => {
            console.log(res.data)
            if(res.data.length!==0){
                localStorage.setItem('token',JSON.stringify(res.data[0]))
                this.props.history.push('/')
            }else{
                this.error()
            }
        })
    }
    render() {
        return (
            <div style={{background:'linear-gradient(#243949,#517fa4)'}}>
                <Particles height={document.documentElement.clientHeight-5 + 'px'} params={params} />
                <Form
                    name="normal_login"
                    className="login-form"
                    // initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入你的用户名!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入你的密码!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
