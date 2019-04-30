import React, { Component } from 'react';

export default class Header extends Component {
  render(){
    return(
      <header className="clearfix">
        <ul className="menu">
          <li onClick={()=>this.props.history.push('/')}>Home</li>
          <li onClick={()=>this.props.history.push('/host')}>Host</li>
          <li onClick={()=>this.props.history.push('/guest')}>Guest</li>
          <li onClick={()=>this.props.history.push('/agenda')}>Agenda</li>
          <li onClick={()=>this.props.history.push('/hotlist')}>Hotlist</li>
          
        </ul>
      </header>
    );
  }
}
