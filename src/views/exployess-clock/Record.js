import React, { Component } from 'react'
import { Table,Button,Calendar } from 'antd'
import moment from 'moment'
import axios from 'axios'
// import './record.css'

export default class Record extends Component {
    state = {
        dataSource:[],
        myid:0,
        isDisabled:false
    }
    columns = [
        {
          title: '#',
          dataIndex: 'id'
        },
        {
          title: '姓名',
          dataIndex: 'username'
        },
        {
          title: '签到时间',
          dataIndex: 'sign',
          render: (sign)=>{
              return sign[sign.length-1]==='今天未签到'?'今天未签到':moment(sign[sign.length-1]).format('YYYY-MM-DD')
          }
        },
        {
            title: '签到天数',
            dataIndex: 'signday'
          }
      ]  
    handleRecord () {
        // console.log(moment().format('L'))
        if (localStorage.getItem('record')) {
            let {sign} = JSON.parse(localStorage.getItem('record'))
            if(moment(sign[sign.length-1]).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')){
                this.setState({
                    isDisabled:true
                })
                return
            }else{
                this.setState({
                    isDisabled:false
                })
                sign.push(new Date().getTime())
                axios.put(`http://localhost:8000/ployway/${this.state.myid}`,{
                    ...this.state.dataSource[0],
                    sign:sign,
                    signday:this.state.dataSource[0].signday+1
                }).then(res=>{
                    localStorage.setItem('record',JSON.stringify(res.data))
                    this.setState({
                        isDisabled:true,
                        dataSource:[res.data]
                    })
                })
            }
        }else{
            this.setState({
                isDisabled:false
            })
            let newdata = this.state.dataSource[0].sign
            newdata.push(new Date().getTime())
            axios.put(`http://localhost:8000/ployway/${this.state.myid}`,{
                ...this.state.dataSource[0],
                sign:newdata,
                signday:this.state.dataSource[0].signday+1
            }).then(res=>{
                localStorage.setItem('record',JSON.stringify(res.data))
                this.setState({
                    isDisabled:true,
                    dataSource:[res.data]
                })
            })
        }
    }
    getListData=(value)=> {
     let listData =[];
     JSON.parse(localStorage.getItem('record')).sign.forEach((item)=>{
        if(item!=='今天未签到'){
            if (moment(value).format('YYYY-MM-DD') === moment(item).format('YYYY-MM-DD') ) {
                listData.push(item)
              }
        }
     })
     return listData;
  }

  dateFullCellRender= value=>{
  let num =this.getListData(value);
    return (
      <div style={{width:'100%', height:'100%',padding: '20px'}}>
        {num.map((item,index) => (
          <div key={index}>
            <span key={index} style={{width:'20px',height:'20px',borderRadius:'50%',backgroundColor:'red',display:'block'}}></span>
          </div>
        ))}
      </div>
    );
  }
    render() {
        return (
            <div>
                <Button type="primary" onClick={()=>{this.handleRecord()}} disabled={this.state.isDisabled}>{this.state.isDisabled?'已签到':'签到'}</Button>
                <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={item=>item.id} />
                <Calendar dateCellRender ={this.dateFullCellRender} onPanelChange={this.onPanelChange} />
            </div>
        )
    }
    componentDidMount () {
        console.log(moment(new Date().getTime()).format('YYYY-MM-DD'))
        let {username} = JSON.parse(localStorage.getItem('token'))
        axios.get(`http://localhost:8000/ployway?username=${username}`).then(res => {
            console.log(res.data) 
            this.setState({
                dataSource:res.data,
                myid:res.data[0].id
            })
        })
        try{
            let {sign} = JSON.parse(localStorage.getItem('record'))
            if (localStorage.getItem('record')) {
                if(moment(sign[sign.length-1]).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')){
                    this.setState({
                        isDisabled:true
                    })
                }
            }else{
                this.setState({
                    isDisabled:false
                })
            }
        }catch{
            return
        }
    }
}
