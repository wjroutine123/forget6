import React,{Component} from 'react'
import {PageHeader} from 'antd'
function head(ChildComponent,obj){
    return class KerwinComponent extends Component{
        render(){
            return <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => { this.props.history.goBack() }}
                    title={obj.title}
                    subTitle={obj.subTitle}
                />
                <ChildComponent {...this.props} a={1} b={2} c={3} />
            </div>
        }
    }
}
export {head}