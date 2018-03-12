import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';
let url = "https://polar-waters-86989.herokuapp.com";

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      host:'',
      guest:'',
      first:true,
      guest_pass:false,
      host_pass:false
    }
  }
  componentWillMount(){
    axios.get(url+'/info/admin_info').then((res)=>{
      let guest = res.data[0].guest;
      let host = res.data[0].host;
      let admin = res.data[0].admin;
      this.setState({
        guest,host,admin
      });
    }).catch((err)=>{
      console.log('err - ',err);
    })
  }
  open_host(){
    this.setState({
      first:false,
      host_pass:true
    });
  }
  open_guest(){
    this.setState({
      first:false,
      guest_pass:true
    });
  }
  guest(){
    this.props.history.push('/guest')
  }
  host(){
    this.props.history.push('/host');
  }
  login(type){
    console.log(type);
    const password = this.refs.password.value;
    const data ={
      type,
      password
    }
    axios.post(url+'/info/login',data).then((res)=>{
      console.log(res);
      if(res.data === 'success'){
        let route = '/'+type;
        this.props.history.push(route);
      }else{
        alert('Please enter correct password or contact RLAH.');
      }
    }).catch((err)=>{
      console.log('err - ',err)
    });
  }
  render(){
    let first = (this.state.first) ? (
      <div>
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="main-subtitle">Bi-weekly caravan tour to preview properties not listed in Bright MLS for agents</div>
        <section className="visitor_buttons clearfix">
          <div onClick={()=>{this.open_host()}}>Host</div>
          <div onClick={()=>{this.open_guest()}}>Guest</div>
        </section>
        <Footer />
      </div>
    ) : '';
    let guest_pass = (this.state.guest_pass) ? (
      <div className="login_window_container">
        <div className="login_window panel panel-default clearfix">
          <h2>Please Enter Password</h2>
          <input type="password" ref="password" />
          <span onClick={()=>this.login('guest')} className="checker_submit">
            Login
          </span>
        </div>
      </div>
    ) : '';
    let host_pass = (this.state.host_pass) ? (
      <div className="login_window_container">
        <div className="login_window panel panel-default clearfix">
          <h2>Please Enter Password</h2>
          <input type="password" ref="password" />
          <span onClick={()=>this.login('host')} className="checker_submit">
            Login
          </span>
        </div>
      </div>
    ) : '';
    return(
      <main>
        { first }
        { guest_pass }
        { host_pass }
      </main>
    );
  }
}
