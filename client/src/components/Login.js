import React, { Component } from 'react';
import axios from 'axios';
const url = 'https://www.comingsoontour.com';

export default class Login extends Component{
  login(){
    console.log(this.props.type);
    const type = this.props.type;
    const password = this.refs.password.value;
    const data ={
      type,
      password
    }
    axios.post(url+'/info/login',data).then((res)=>{
      console.log(res);
      if(res.data === 'success'){
        this.props.login();
      }else{
        alert('Please enter correct password or contact RLAH.');
      }
    }).catch((err)=>{
      console.log('err - ',err)
    });
  }
  render(){
    return(
      <div className="login_window_container">
        <div className="login_window panel panel-default clearfix">
          <h2>Please Enter Password</h2>
          <input type="password" ref="password" />
          <span onClick={()=>this.login()} className="checker_submit">
            Login
          </span>
        </div>
      </div>
    );
  }
}
