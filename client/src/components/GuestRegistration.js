import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export default class GuestRegistration extends Component{
  render(){
    return(
      <main>
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="host_title">
          GUEST
        </div>

        <section className="guest_form top_padding">
          <form>
            <p>*denotes required field for submission</p>
            <div><div className="form_labels">Listing Agent Name*:</div>&nbsp;<div className="form_inputs"><input type="text" /></div></div>
            <div><div className="form_labels">Listing Agent Email*:</div>&nbsp;<div className="form_inputs"><input type="text" /></div></div>

          </form>
        </section>

        <section className="reminder">
          REMINDER: Finalized tour logisitics will be determined and distributed after final property
          is submitted, but no later than 6pm on the previous Monday. Tour details will be posted at &nbsp;
          <Link to="/agenda">comingsoontour.com/agenda</Link> AND sent to all members via email in participating brokerage(s).
        </section>
        <section className="terms_conditions">
          <input type="checkbox" id="terms_conditions_radio" value="terms_conditions_radio" name="terms_conditions_radio"  /><label className="terms_conditions_link">I agree to the terms and conditions</label>
        </section>
        <section className="submit_btn">
          <span className="main_submit">RSVP</span>
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
