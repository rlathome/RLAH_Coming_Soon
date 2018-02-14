import React, { Component } from 'react';
import axios from 'axios';

export default class Admin extends Component{
  constructor(props){
    super(props);
    this.state={
      host_password:'',
      guest_password:''
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8080/info/admin_info').then((host)=>{
      console.log('admin info: ',host.data);
      this.setState({
        host_password:host.data[0].host_password,
        guest_password:host.data[0].guest_password
      })
    })
  }
  render(){
    return(
      <div>
        <p>Welcome to DCOH Admin Page!</p>
        <div>{this.state.host_password}</div>
        <div>{this.state.guest_password}</div>
      </div>
    );
  }
}
