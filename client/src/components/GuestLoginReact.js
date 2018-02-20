


import React, { Component } from 'react';
import axios from 'axios';

export default class GuestLoginReact extends Component{
  constructor(props){
    super(props);
  }

  guest(){
    this.props.history.push('/guest')
  }
  host(){
    this.props.history.push('/host');
  }
  render(){
    return(
      <main>
        Welcome to Guest Login!
        <button onClick={()=>this.props.login()} >Login</button>
      </main>
    );
  }
}
