import { Link } from 'react-router-dom';
import Footer from './Footer';
import React, { Component } from 'react';
import axios from 'axios';
const url = 'http://www.comingsoontour.com';

export default class GuestRegistration extends Component{
  constructor(props){
    super(props);
    this.state={
      next_ok:false,
      agrees:false,
      terms_conditions:false
    }
  }
  componentWillMount(){
    console.log('joey: ',this.props.joey)
    axios.get(url+'/info/admin_info').then((admin)=>{
      console.log('map admin info: ',admin.data);
      const d = admin.data[0];
      const date = d.event_date;
      this.setState({
        date
      });
    }).catch((err)=>{
      console.log('err - ',err);
    })
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
    const submit_modal = (this.state.submitted_form) ? (
      <div className = 'submit_modal flex-col'>
        <span>Thank you for your submission! We'll be in touch shortly.</span>
      </div>
    ) : '';
    const terms_conditions = (this.state.terms_conditions) ? (
      <div className = 'flex-col terms_conditions_modal'>
        <span>THIS TOUR IS PROVIDED ON “AS IS” AND  “AS AVAILABLE” BASIS, AND BROKER EXPRESSLY DISCLAIMS ALL WARRANTIES, EXPRESS AND IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. NEITHER PARTY SHALL BE LIABLE TO THE OTHER PARTY FOR ANY CONSEQUENTIAL, SPECIAL OR PUNITIVE DAMAGES OR LOST PROFITS ARISING OUT OF ANY BREACH OF THIS AGREEMENT OR ITS TERMINATION, WHETHER FOR BREACH OF WARRANTY OR ANY OBLIGATION OR OTHERWISE, WHETHER LIABILITY IS ASSERTED IN CONTRACT OR TORT AND REGARDLESS OF WHETHER OR NOT THE PARTY HAS ADVISED OR HAS BEEN ADVISED OF THE POSSIBILITY OF ANY SUCH LOSS OR DAMAGE. <br/>This Agreement and all attached Schedules constitute the entire understanding and agreement of the parties with respect to the subject matter contained herein. This Agreement may not be altered, modified or waived, in whole or in part, except in a writing signed by the authorized representatives of the parties.</span>
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
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="host_title">
          GUEST
        </div>
        <div className="agenda_date">
          { this.state.date }
        </div>
        <div className="reminder">
          Registering as a guest reserves a spot for you in the caravan paid for by the brokerage. If you do not need transportation, but still want to view the properties you do not need to register
        </div>
        <section className="guest_form top_padding">
          <form>
            <p>*denotes required field for submission</p>
            <div><div className="form_labels">Agent Name*:</div>&nbsp;<div className="form_inputs"><input ref="agent_name" type="text" /></div></div>
            <div><div className="form_labels">Agent Email*:</div>&nbsp;<div className="form_inputs"><input ref="email" type="text" /></div></div>

          </form>
        </section>

        <section className="reminder">
          REMINDER: Finalized tour logisitics will be determined and distributed after final property
          is submitted, but no later than 6pm on the previous Monday. Tour details will be posted at&nbsp;
          <Link to="/agenda">comingsoontour.com/agenda</Link> AND sent to all members via email in participating brokerage(s).
        </section>
        <section className="terms_conditions">
          <input onChange={this.handleAgree.bind(this)} type="checkbox" id="terms_conditions_radio" value="terms_conditions_radio" name="terms_conditions_radio"  /><label onClick={this.toggleTerms.bind(this)} className="terms_conditions_link">I agree to the terms and conditions</label>
        </section>
        <section className="submit_btn">
          { rsvp }
        </section>
        <Footer />
      </main>
    );
  }
}
