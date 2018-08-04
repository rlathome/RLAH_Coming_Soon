import React, { Component } from 'react';
import axios from 'axios';
import LogoArea from './LogoArea';
import Footer from './Footer';
import { url } from '../globalConf.js';
// let url = "https://polar-waters-86989.herokuapp.com";

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      host:'',
      guest:'',
      first:true,
      guest_pass:false,
      host_pass:false,
      admin:{}
    }
  }
  componentWillMount(){
    axios.get(url+'/info/admin_info').then((res)=>{
      let guest = res.data[0].guest;
      let host = res.data[0].host;
      let admin = res.data[0];
      console.log('admin - ',admin);
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
  submitOnEnter(e,client){
    console.log('func')
    if(e.keyCode===13){
      this.login(client);
    }
  }
  render(){
    const {admin} = this.state;
    let first = (this.state.first) ? (
      <div>
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="main-subtitle">Bi-weekly caravan tour to preview properties not listed in Bright MLS for agents<br/>
          <div>Occurs every 1st and 3rd Tuesday of each month beginning at 10AM and ending before noon. Each property will have a stop of about 15-20 minutes.</div>
        </div>
        <section className="next_tour_date">

          {
            admin.next_tour !== "" && (
              <div>
                <div>Next Tour</div>
                <div>{admin.next_tour}</div>
              </div>
            )
          }
        </section>
        <section className="visitor_buttons clearfix">
          <div onClick={()=>{this.open_host()}}>Host</div>
          <div onClick={()=>{this.open_guest()}}>Guest</div>
        </section>
        <LogoArea />
        <section className="join_coming_soon">
          If you or your brokerage is interested in joining Coming Soon Tour <a href="https://docs.google.com/forms/d/e/1FAIpQLSdWeIYF79hZpKvguPsM93XLrq8_YM6nbRxNKw_f4REqjw3KMQ/viewform" alt="form link">click here</a>
        </section>
        <Footer />
      </div>
    ) : '';
    let guest_pass = (this.state.guest_pass) ? (
      <div className="login_window_container">
        <div className="login_window panel panel-default clearfix">
          <h2>Please Enter Password</h2>
          <input onKeyDown={(e)=>{this.submitOnEnter(e,'guest')}} type="password" ref="password" />
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
          <input onKeyDown={(e)=>{this.submitOnEnter(e,'host')}} type="password" ref="password" />
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
