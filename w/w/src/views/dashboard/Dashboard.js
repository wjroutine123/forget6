import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from '../home/Home'
import Roles from '../rights-mange/Roles'
import Updateroles from '../rights-mange/role/Updateroles'
import Createroles from '../rights-mange/role/Createroles'
import Rights from '../rights-mange/Rights'
import './Dashboard.css'
import Users from '../users-mange/Users'
import Swipers from '../films-mange/Swipers'
import Oncoming from '../films-mange/Oncoming'
import Hot from '../films-mange/Hot'
import Movies from '../films-mange/Movies'
import Buliding from '../films-mange/Buliding'
import Moviedetail from '../films-mange/Moviedetail'
import DetailCreate from '../films-mange/detail/DetailCreate'
import DetailUpdate from '../films-mange/detail/DeatilUpdate'
import DeskUser from '../desk-user/DeskUser'
import Record from '../exployess-clock/Record'
import Sign from '../exployess-clock/Sign'
import Release from '../recruitment/Release'
import AskForleave from '../exployess-askleave/AskForLeave'
import Mangement from '../exployess-askleave/Mangement'
import LeavePreview from '../exployess-askleave/LeavePreview'
import AskLeave from '../atten-mange/AskLeave'
import Records from '../atten-mange/Records'
import NotFound from '../error/NotFound'
import SideMenu from './SideMenu'
import GatCreate from '../films-mange/gat/GatCreate'
import GatUpdate from '../films-mange/gat/GatUpdate'

import { Layout } from 'antd';
import TopHeader from './TopHeader'
import Update from '../films-mange/article-manage/Update'
import Preview from '../films-mange/article-manage/Preview'
import Updatep from '../films-mange/swiper/Updatep'
import Updatec from '../films-mange/city/Updatec'
import articleCreat from '../films-mange/article-manage/articleCreate'

const {Content} = Layout

const routes = [
    {
        path: "/home",
        component: Home,
        permission:[1,2,3]
    },
    {
        path: "/user-manage/users",
        component: Users,
        permission:[3]
    },
    {
        path: "/rights-manage/roles",
        component: Roles,
        permission:[3]
    },
    {
        path:"/rights-mange/role/updateroles/:myid",
        component: Updateroles,
        permission:[1,2,3] 
    },
    {
        path:"/rights-mange/role/createroles",
        component: Createroles,
        permission:[1,2,3] 
    },
    {
        path: "/rights-manage/rights",
        component: Rights,
        permission:[3]
    },
    {
        path: "/films-mange/swipers",
        component: Swipers,
        permission:[1,2,3]
    },
    {
        path:"/films-mange/swiper/updatep/:myid",
        component: Updatep ,
        permission:[1,2,3] 
    },
    {
        path:"/films-mange/city/updatec/:myid",
        component: Updatec ,
        permission:[1,2,3] 
    },
    {
        path: "/films-mange/oncoming",
        component: Oncoming,
        permission:[1,2,3]
    },
    {
        path: "/films-mange/hot",
        component: Hot,
        permission:[1,2,3]
    },
    {
        path: "/films-mange/movies",
        component: Movies,
        permission:[2,3]
    },
    {
        path: "/films-mange/buliding",
        component: Buliding,
        permission:[2,3]
    },
    {
        path: "/films-mange/moviedetail",
        component: Moviedetail,
        permission:[1,2,3]
    },
    {
        path: "/films-mange/detailcreate",
        component: DetailCreate,
        permission:[1,2,3]
    },
    {
        path: "/films-mange/detailupdate/:myid",
        component: DetailUpdate,
        permission:[1,2,3]
    },
    {
        path: "/films-mange/article-manage/articleCreate",
        component: articleCreat,
        permission:[1,2,3]
    },
    {
        path: "/desk-user/toview",
        component: DeskUser,
        permission:[3]
    },
    {
        path: "/exployees-clock/record",
        component: Record,
        permission:[3]
    },
    {
        path: "/exployees-clock/sign",
        component: Sign,
        permission:[3]
    },
    {
        path: "/recruitment/release",
        component: Release,
        permission:[2,3]
    },
    {
        path: "/exployees-askleave/askforleave",
        component: AskForleave,
        permission:[1,2,3]
    },
    {
        path: "/exployees-askleave/leavepreview/:myid",
        component: LeavePreview,
        permission:[1,2,3]
    },
    {
        path: "/exployees-askleave/mangement",
        component: Mangement,
        permission:[2,3]
    },
    {
        path: "/atten-mange/records",
        component: Records,
        permission:[3]
    },
    {
        path: "/atten-mange/askleave",
        component: AskLeave,
        permission:[3]
    },
    {
        path:"/article-manage/preview/:myid",
        component: Preview ,
        permission:[1,2,3] 
    },
    {
        path:"/article-manage/update/:myid", //动态路由
        component: Update ,
        permission:[1,2,3] 
    },
    {
        path: "/films-mange/gatecreate",
        component: GatCreate,
        permission:[1,2,3]
    },
    {
        path: "/films-mange/gateupdate/:myid",
        component: GatUpdate,
        permission:[1,2,3]
    },
]
export default class Dashboard extends Component {
    render() {
        let {roleType} = JSON.parse(localStorage.getItem('token'))
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SideMenu></SideMenu>
                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    <Content style={{ margin: '0 16px',minHeight:'auto' }}>
                        <Switch>
                            {
                                routes.map(item => {
                                    // console.log(item)
                                    return item.permission.includes(roleType)?
                                    <Route key={item.path} path={item.path} component={item.component} exact sensitive />:null
                                })
                            }
                            <Redirect from="/" to="/home" exact></Redirect>
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
