import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import {withRouter} from 'react-router'
import menus from '../../router/menus'

const { SubMenu } = Menu;
const { Sider } = Layout;

class SideMenu extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = () => {
    this.setState({
      collapsed:!this.state.collapsed
    });
  };
    render() {
      let openKey = ['/' + this.props.location.pathname.split('/')[1]]
      let selectKey = [this.props.location.pathname]

        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" selectedKeys={selectKey} defaultOpenKeys={openKey} mode="inline" onClick={(item)=>{
              this.props.history.push(item.key)
            }}>
                {
                  this.setList(menus)
                }
            </Menu>
          </Sider>
        )
    }
    setList = (menus)=> {
      let {roleType} = JSON.parse(localStorage.getItem('token'))
      // console.log(roleType)
      return menus.map(item=>{
        if(item.children){
          // console.log(this)
          return item.permission.includes(roleType)?<SubMenu 
          key={item.key}
          title={
            <span>
              <item.icons />
              <span>{item.title}</span>
            </span>
          }
          >
            {
              this.setList(item.children)
            }
          </SubMenu>:null
        }
        return item.permission.includes(roleType)?<Menu.Item key={item.key} title={<item.icons />}>
          {item.title}
        </Menu.Item>:null
      })
    }
}
export default withRouter(SideMenu)
