import React, { Component } from 'react'
import withShop from '../../router/withShop'
import axios from 'axios'

class LeavePreview extends Component {
    state = {
        previnfo:[]
    }
    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={
                    {
                        __html:this.state.previnfo.content
                    }
                }></div>
            </div>
        )
    }
    componentDidMount () {
        axios.get(`http://localhost:8000/leaveway?id=${this.props.match.params.myid}`).then(res => {
            console.log(res.data)
            this.setState({
                previnfo:res.data[0]
            })
        })
    }
}
export default withShop(LeavePreview)
