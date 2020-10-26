import React, { Component } from 'react'
import { Layout, Avatar,Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router'

const { Header } = Layout;

class TopHeader extends Component {
    handleExit(){
        localStorage.removeItem('token')
        this.props.history.push('/login')
    }
    render() {
        let {roleName,username} = JSON.parse(localStorage.getItem('token'))
        const menu = (
            <Menu onClick={(item)=>{
                if(item.key==='item_1'){
                    this.props.history.push('/exployees-clock/record')
                }
                if(item.key==='item_2'){
                    this.props.history.push('/exployees-askleave/askforleave')
                }
            }}>
              <Menu.Item>
                {roleName}
              </Menu.Item>
              <Menu.Item>
                  日常签到
              </Menu.Item>
              <Menu.Item>
                  发起请假
              </Menu.Item>
              <Menu.Item danger onClick={()=>{
                this.handleExit()
            }}>退出</Menu.Item>
            </Menu>
          );
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <Dropdown overlay={menu}>
                    <span style={{float:'right'}}>
                        欢迎{username}回府
                        <Avatar icon={<UserOutlined />} />
                    </span>
                </Dropdown>
            </Header>
        )
    }
}
export default withRouter(TopHeader)
