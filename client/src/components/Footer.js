import React, { Component } from 'react';
import axios from 'axios';
const url = 'https://polar-waters-86989.herokuapp.com';
export default class Footer extends Component{
  constructor(props){
    super(props);
    this.state={
      logo:''
    }
  }
  componentDidMount(){
    axios.get(url+'/info/admin_info').then((admin)=>{
      console.log('footer admin:',admin.data[0].logo_url)
      this.setState({
        logo:admin.data[0].logo_url
      });
    })
  }
  render(){
    let logourl = this.state.logo;
    let logo_img = (this.state.logo !== '') ? (
      <section className="logo-area">
        <h2>Sponsored by</h2>
        <div className='main_logo' >
          <img className="img-responsive" src={logourl} alt="" />
        </div>
      </section>
    ) : '';
    return(
      <div>
        { logo_img }
      </div>
    );
  }
}
