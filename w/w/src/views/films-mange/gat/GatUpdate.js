import React, { Component } from 'react'
import withShop from '../../../router/withShop'
import { Steps, Button, message,Form, Input } from 'antd'
import css from './create.module.css'
import axios from 'axios'

const { Step } = Steps

class GatUpdate extends Component {

    state = {
        current: 0,
        filminfo: {},
        actors:[],
        photos:[],
        item:{},
        disabled:false
    }
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      }
      oneForm = React.createRef()
      twoForm = React.createRef()
     
      fourForm = React.createRef()
    next() {
        if(this.state.current === 0){
            this.oneForm.current.validateFields().then(values=>{
                console.log(values)
                this.setState({
                    current: this.state.current + 1,
                    filminfo:values
                })
            })
            return
        }
        if(this.state.current === 1){
            this.twoForm.current.validateFields().then(values=>{
                
                    this.fourForm.current.validateFields().then(values=>{
                        this.setState({
                            current:this.state.current +1,
                            filminfo:{
                                ...this.state.filminfo,
                                actors:this.state.actors,
                                photos:this.state.photos,
                                item:this.state.item
                            }
                        })
                    })
                
            })
        }
    }
    prev() {
        this.setState({
            current: this.state.current - 1
        })
    }
    handleUpload () {
        this.twoForm.current.validateFields().then(values=>{
            console.log(values)
            let newarr = this.state.actors
            newarr.push(values)
            this.setState({
                actors:newarr
            })
            message.success('上传成功，可以继续上传')
        })
    }
    
    handleUploadItem () {
        this.fourForm.current.validateFields().then(values=>{
            this.setState({
                item:values
            })
            message.success('上传成功')
        })
    }
    handleSubmit () {
        axios.put(`http://localhost:8000/gateway/${this.props.match.params.myid}`,{
            ...this.state.filminfo
        })
    }
    componentDidMount () {
        axios.get(`http://localhost:8000/gateway?id=${this.props.match.params.myid}`).then(res=>{
            console.log(res.data)
            console.log(this.oneForm)
            this.oneForm.current.setFieldsValue({
                name:res.data[0].name,
                poster:res.data[0].poster,
                grade:res.data[0].grade,
                nation:res.data[0].nation,
                runtime:res.data[0].runtime,
                
                
            })
            this.twoForm.current.setFieldsValue({
                name:res.data[0].actors[res.data[0].actors.length-1].name,
                avatarAddress:res.data[0].actors[res.data[0].actors.length-1].avatarAddress,
                role:res.data[0].actors[res.data[0].actors.length-1].role
            })
            this.fourForm.current.setFieldsValue({
                name:res.data[0].item.name,
                type:res.data[0].item.type
            })
        })
    }
    render() {
        return (
            <div>
                <Steps current={this.state.current}>
                    <Step key={1} title="电影信息" />
                    <Step key={2} title="更新文件" />
                    <Step key={3} title="更新" />
                </Steps>
                <div style={{ marginTop: '50px' }}>
                    <div className={this.state.current === 0 ? '' : css.active}>
                        <Form {...this.layout} ref={this.oneForm} name="basic">
                            <Form.Item label="电影名称" name="name" rules={[{ required: true, message: '请输入标题!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="宣传大图" name="poster" rules={[{ required: true, message: '请输入图片链接!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="评分" name="grade" rules={[{ required: true, message: '请输入内容!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="上映地区" name="nation" rules={[{ required: true, message: '请输入内容!' }]}>
                                <Input  />
                            </Form.Item>
                            <Form.Item label="播放时长" name="runtime" rules={[{ required: true, message: '请输入内容!' }]}>
                                <Input  />
                            </Form.Item>
                            
                        </Form>
                    </div>
                    <div className={this.state.current === 1 ? '' : css.active}>
                        <Form {...this.layout} ref={this.twoForm} name="basictwo">
                            <Form.Item label="演员姓名" name="name" 
                            rules={[{ required: true, message: '请输入内容!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="剧照" name="avatarAddress" 
                            rules={[{ required: true, message: '请输入图片链接!' }]}
                            >
                                <Input placeholder="请输入图片链接" />
                            </Form.Item>
                            <Form.Item label="饰演角色" name="role" 
                            rules={[{ required: true, message: '请输入内容!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                        <Button onClick={()=>{this.handleUpload()}}>上传演职员信息</Button>
                       
                        <Form {...this.layout} ref={this.fourForm} name="basicthree">
                            <Form.Item label="电影几D" name="name" 
                            rules={[{ required: true, message: '请输入内容!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="属性" name="type" 
                            rules={[{ required: true, message: '请输入内容!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                        <Button onClick={()=>{this.handleUploadItem()}} disabled={this.state.disabled}>上传观影信息</Button>
                    </div>
                    <div className={this.state.current === 2 ? '' : css.active}>
                        更新
                    </div>
                </div>
                <div className="steps-action">
                    {this.state.current < 2 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {this.state.current === 2 && (
                        <Button type="primary" onClick={() => this.handleSubmit()}>
                            更新
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        )
    }
}
export default withShop(GatUpdate)