import React, { Component } from 'react'
import { Steps, Button, message,Form, Input,PageHeader } from 'antd'
import css from '../../films-mange/detail/create.module.css'
import axios from 'axios'

const { Step } = Steps

class Createroles extends Component {

    state = {
        current: 0,
        filminfo: {},
        list:[],
        roleRight:[],
        ll:{}
    }
    oneForm = React.createRef()
    twoForm = React.createRef()
   
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
            let newarr = []
            newarr.push(this.state.ll)
            this.setState({
                current:this.state.current +1,
                filminfo:{
                ...this.state.filminfo,
                roleRight:newarr,
                }
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
          let newarr2 =this.state.list
          newarr2.push(values.list)
          this.setState({
              ll:{
                  category:values.category,
                  list:newarr2
              }
          })
          message.success('上传成功')
      })
  }

  handleSubmit () {
      axios.post('http://localhost:8000/roles',{
          ...this.state.filminfo
      })
      message.success('已提交')
      this.props.history.goBack()  
  }

  handleBack () {
    this.props.history.push('/rights-manage/roles')
  }

  render() {
      return (
          <div>
            <PageHeader
                    className="site-page-header"
                    onBack={() => { this.props.history.goBack() }}
                    title="添加角色"/> 

              <Steps current={this.state.current}>
                  <Step key={1} title="角色信息" />
                  <Step key={2} title="上传信息" />
                  <Step key={3} title="提交" />
              </Steps>

              <div style={{ marginTop: '50px' }}>
                  <div className={this.state.current === 0 ? '' : css.active}>
                      <Form  ref={this.oneForm} name="basic">
                          <Form.Item label="角色名称" 
                                     name="roleName" 
                          rules={[{ required: true, message: '请输入名称!' }]}>
                              <Input />
                          </Form.Item>
                          <Form.Item label="默认值" 
                                     name="default" 
                          rules={[{ required: true, message: '请输入布尔值!' }]}>
                              <Input placeholder="请输入布尔值!"/>
                          </Form.Item>
                      </Form>
                  </div>

                  <div className={this.state.current === 1 ? '' : css.active}>
                      <Form  ref={this.twoForm} name="basictwo">
                          <Form.Item label="权限类别" 
                                    name="category" 
                          rules={[{ required: true, message: '不能为空' }]}>
                              <Input/>
                          </Form.Item>
                          
                          <Form.Item label="列表" 
                                     name="list" 
                          rules={[{ required: true, message: '不能为空' }]}>
                              <Input/>
                          </Form.Item>
                          <Button onClick={()=>{this.handleUpload()}}>上传信息</Button>
                      </Form> 
                  </div>
                  <div className={this.state.current === 2 ? '' : css.active}/>
                 
              </div>

              <div className="steps-action">
                  {this.state.current < 2 && (
                      <Button type="primary" onClick={() => this.next()}>
                          下一步
                      </Button>
                  )}
                  {this.state.current === 2 && (
                      <Button type="primary" onClick={() => this.handleSubmit()} >
                          提交
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
export default Createroles
