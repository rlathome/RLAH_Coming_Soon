import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component{
  constructor(props){
    super(props);
  }

  guest(){
    this.props.history.push('/guest_reg')
  }
  host(){
    this.props.history.push('/host_reg');
  }
  render(){
    return(
      <div>
        <p>Welcome to DCOH Coming Soon!</p>
        <button onClick = {this.guest.bind(this)}>Guests</button>
        <button onClick = {this.host.bind(this)} >Hosts</button>
      </div>
    );
  }
}
