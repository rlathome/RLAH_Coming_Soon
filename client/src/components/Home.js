import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component{
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
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="main-subtitle">Bi-weekly caravan tour to preview properties not listed in Bright MLS for agents</div>
        <section className="visitor_buttons clearfix">
          <div onClick={()=>{this.props.history.push('/host')}}>Host</div>
          <div onClick={()=>{this.props.history.push('/guest')}}>Guest</div>
        </section>
        <section className="sponsored_by">
          <h2>Sponsored By</h2>
          <div>RLAH<br/>
            Real setState
          </div>
        </section>
      </main>
    );
  }
}
