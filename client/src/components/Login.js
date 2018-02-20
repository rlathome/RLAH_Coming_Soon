import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component{
  render(){
    return(
      <div className="login_window_container">
        <div className="login_window panel panel-default clearfix">
          <h2>Please Enter Password</h2>
          <input type="text" ref="password" />
          <span onClick={()=>this.props.login()} className="checker_submit">
            Login
          </span>
        </div>
      </div>
    );
  }
}
