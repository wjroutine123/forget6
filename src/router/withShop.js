import React, { Component } from 'react'
import { PageHeader } from 'antd'
function withShop (ChildComponent) {
    return class DieComponent extends Component{
        render() {
            return <div>
            <PageHeader
                className="site-page-header"
                onBack={() => this.props.history.goBack()}
                title="返回"
                subTitle="goback"
            />
            <ChildComponent {...this.props}></ChildComponent>
        </div>
        }
    }
}
export default withShop
