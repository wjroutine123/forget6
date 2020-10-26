import React, { Component } from 'react'
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import Login from '../views/login/Login'
import Dashboard from '../views/dashboard/Dashboard'

export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                <Route path="/login" component={Login}/>
                    <Route path="/" render={(props)=>
                        localStorage.getItem("token")?
                        <Dashboard {...props}></Dashboard>
                        :
                        <Redirect to="/login"/>
                    }/>
                </Switch>
            </HashRouter>
        )
    }
}
