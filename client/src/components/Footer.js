import React, { Component } from 'react';

export default class Footer extends Component{
  login(){
    this.props.history.push('/admin');
  }
  render(){
    return(
      <div className='footer' onClick={()=>this.login()}>
        Footer Admin Login
      </div>
    );
  }
}
