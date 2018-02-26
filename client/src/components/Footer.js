import React, { Component } from 'react';
import axios from 'axios';
const url = 'http://polar-waters-86989.herokuapp.com';
export default class Footer extends Component{
  constructor(props){
    super(props);
    this.state={
      logo:''
    }
  }
  componentWillMount(){
    axios.get(url+'/info/admin_info').then((admin)=>{
      console.log('footer admin:',admin)
      this.setState({
        logo:admin.data[0].logo_url
      });
    })
  }
  render(){
    let logo = this.state.logo;
    return(
        <section className="sponsored_by">
          <h2>Sponsored By</h2>
          <div className='main_logo' >
            <img className="img-responsive" src={logo} alt="affiliate logo" />
          </div>
        </section>
    );
  }
}
