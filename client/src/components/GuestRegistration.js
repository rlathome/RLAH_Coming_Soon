import { Link } from 'react-router-dom';
import LogoArea from './LogoArea';
import Footer from './Footer';
import React, { Component } from 'react';
import axios from 'axios';
import { terms_text } from './inserts/terms_conditions.js';
import { url } from '../globalConf.js';
// const url = 'http://www.comingsoontour.com';

export default class GuestRegistration extends Component{
  constructor(props){
    super(props);
    this.state={
      next_ok:false,
      agrees:false,
      terms_conditions:false,
      submitted_form:false
    }
  }
  componentWillMount(){
    console.log('joey: ',this.props.joey)
    axios.get(url+'/info/admin_info').then((admin)=>{
      console.log('map admin info: ',admin.data);
      const d = admin.data[0];
      const date = d.event_date;
      const admin_info = d;
      this.setState({
        date,
        admin_info
      });
    }).catch((err)=>{
      console.log('err - ',err);
    })
  }
  isFormFilled(){
    console.log('firing',this.refs.needs_reserve.value)
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const isEmail = re.test(String(this.refs.email.value).toLowerCase());

   let regYes = new RegExp('yes');
   let regNo = new RegExp('no');
   const needs_res = this.refs.needs_reserve.value.toLowerCase();
   const ready = (this.refs.agent_name.value !=='' && this.state.agrees && isEmail && this.refs.needs_reserve.value !=='' && (regYes.test(needs_res) || regNo.test(needs_res)));

    if(ready){
      console.log('ready to go')
      this.setState({
        next_ok:true
      });
    }else{
      this.setState({
        next_ok:false
      });
    };
  }
  handleAgree(){
    this.setState({
      agrees:!this.state.agrees
    });
    setTimeout(()=>{
      this.isFormFilled();
    },20);
  }
  submitRSVP(e){
    let agent_name = this.refs.agent_name.value;
    let email = this.refs.email.value;
    let needs_reserve = this.refs.needs_reserve.value;

    let data = {
      agent_name,
      email,
      needs_reserve
    }
    console.log('you submitted: ',data);
      axios.post(url + '/info/submitguestform',data).then((response)=>{
        if(response.data.message === "Queued. Thank you."){
          // alert('Thank you for your submission! We\'ll be in touch shortly.');
          //show modal
          this.setState({
            submitted_form:true
          });
          //route to agenda
          setTimeout(()=>{
            this.props.history.push('/');
          },2000);
        }
      }).catch((err)=>{
        console.log('form submission error - ',err);
      });

  }
  toggleTerms(){
    this.setState({
      terms_conditions:!this.state.terms_conditions
    });
  }
  render(){
    const { admin_info } = this.state;
    const submit_modal = (this.state.submitted_form) ? (
      <div className = 'submit_modal flex-col'>
        <span>Thank you for your submission! We'll have a seat for you on the tour!</span>
      </div>
    ) : '';
    const terms_conditions = (this.state.terms_conditions) ? (
      <div className = 'flex-col terms_conditions_modal'>
        { terms_text() }
        <br/>
        <span className="checker_submit" onClick={()=>this.toggleTerms()}>Close</span>
      </div>
    ) : '';
    const rsvp = (this.state.next_ok) ? (
      <span onClick = {()=>this.submitRSVP()} className="main_submit">RSVP</span>
    ) : (
      <span className="main_submit muted">RSVP</span>
    );
    return(
      <main>
        { submit_modal }
        { terms_conditions }
        <div className="comingsoon_logo">
          <img className="image-responsive" src="../images/RLAH_logo_green.png"/>
        </div>
        <div className="host_title">
          GUEST
        </div>
        <div className="agenda_date">
          { this.state.date }
        </div>
        <section className="guest_form top_padding">
        {
          admin_info && admin_info.hide_guest_slots && (
            <div className="reminder red">
              Sorry, the sponsored caravan for this tour is full. You’re welcome to attend the tour in your own transportation.
            </div>
          )
        }
        {
          admin_info && admin_info.hide_guest_slots==false && (
            <div>
              <div className="reminder">
                Registering as a guest reserves a spot for you in the caravan paid for by the brokerage. If you do not need transportation, but still want to view the properties you do not need to register
              </div>
              <form>
                <p>*denotes required field for submission</p>
                <div><div className="form_labels">Agent Name*:</div>&nbsp;<div className="form_inputs"><input  onKeyUp={()=>this.isFormFilled()} ref="agent_name" type="text" /></div></div>
                <div><div className="form_labels">Agent Email*:</div>&nbsp;<div className="form_inputs"><input  onKeyUp={()=>this.isFormFilled()} ref="email" type="text" /></div></div>
                <div><div className="form_labels">I need to reserve a spot in the caravan (type yes or no)*:</div>&nbsp;<div className="form_inputs"><input onKeyUp={()=>this.isFormFilled()} ref="needs_reserve" type="text" /></div></div>
              </form>
              <section className="reminder">
                REMINDER: Finalized tour logistics will be determined and distributed after final property
                is submitted, but no later than 6pm on the previous Monday. Tour details will be posted at&nbsp;
                <Link to="/agenda">comingsoontour.com/agenda</Link> AND sent to all members via email in participating brokerage(s).
              </section>
              <section className="terms_conditions">
                <input onChange={this.handleAgree.bind(this)} type="checkbox" id="terms_conditions_radio" value="terms_conditions_radio" name="terms_conditions_radio"  /><label onClick={this.toggleTerms.bind(this)} className="terms_conditions_link">I agree to the terms and conditions</label>
              </section>
              <section className="submit_btn">
                { rsvp }
              </section>
            </div>
        )
        }

        </section>


        <LogoArea />
        <Footer />
      </main>
    );
  }
}
