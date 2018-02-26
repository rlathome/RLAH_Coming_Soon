import { Link } from 'react-router-dom';
import Footer from './Footer';
import React, { Component } from 'react';
import axios from 'axios';
const url = 'https://polar-waters-86989.herokuapp.com';

export default class GuestRegistration extends Component{
  constructor(props){
    super(props);
    this.state={
      next_ok:false,
      agrees:false
    }
  }
  isFormFilled(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const isEmail = re.test(String(this.refs.email.value).toLowerCase());

   const ready = (this.refs.agent_name !=='' && this.state.agrees && isEmail);

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
    let data = {
      agent_name,
      email
    }
    console.log('you submitted: ',data);
      axios.post(url + '/info/submitguestform',data).then((response)=>{
        if(response.data === "Queued. Thank you."){
          alert('Thank you for your submission! We\'ll be in touch shortly.');
          setTimeout(()=>{
            this.props.history.push('/agenda');
          },2000);
        }
      }).catch((err)=>{
        console.log('form submission error - ',err);
      });

  }
  render(){
    const rsvp = (this.state.next_ok) ? (
      <span onClick = {()=>this.submitRSVP()} className="main_submit">RSVP</span>
    ) : (
      <span className="main_submit muted">RSVP</span>
    )
    return(
      <main>
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="host_title">
          GUEST
        </div>

        <section className="guest_form top_padding">
          <form>
            <p>*denotes required field for submission</p>
            <div><div className="form_labels">Listing Agent Name*:</div>&nbsp;<div className="form_inputs"><input ref="agent_name" type="text" /></div></div>
            <div><div className="form_labels">Listing Agent Email*:</div>&nbsp;<div className="form_inputs"><input ref="email" type="text" /></div></div>

          </form>
        </section>

        <section className="reminder">
          REMINDER: Finalized tour logisitics will be determined and distributed after final property
          is submitted, but no later than 6pm on the previous Monday. Tour details will be posted at &nbsp;
          <Link to="/agenda">comingsoontour.com/agenda</Link> AND sent to all members via email in participating brokerage(s).
        </section>
        <section className="terms_conditions">
          <input onChange={this.handleAgree.bind(this)} type="checkbox" id="terms_conditions_radio" value="terms_conditions_radio" name="terms_conditions_radio"  /><label className="terms_conditions_link">I agree to the terms and conditions</label>
        </section>
        <section className="submit_btn">
          { rsvp }
        </section>
        <Footer />
      </main>
    );
  }
}
