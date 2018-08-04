import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../globalConf.js';
// const url = 'http://www.comingsoontour.com';
export default class Footer extends Component{
  constructor(props){
    super(props);
    this.state={
      footer_logo_url:''
    }
  }
  componentDidMount(){
    axios.get(url+'/info/admin_info').then((admin)=>{
      console.log('logo_area admin:',admin.data[0].logo_url)
      this.setState({
        footer_logo_url:admin.data[0].footer_logo_url
      });
    })
  }
  render(){
    let footer_logo_url = this.state.footer_logo_url;
    let logo_img = (this.state.footer_logo_url !== '') ? (
      <section className="logo-area">
          <img className="img-responsive" src={footer_logo_url} alt="" />
      </section>
    ) : '';
    return(
      <div>
        { logo_img }
      </div>
    );
  }
}
