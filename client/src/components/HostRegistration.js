
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HostRegistration extends Component{
  constructor(props){
    super(props);
    this.state={
      selected_option:'yes'
    }
  }
  handleOptionChange(){

  }
  render(){
    return(
      <main>
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="host_title">
          HOST
        </div>
        <div className="address_checker">
          <div className="row">
            <div className="col-sm-3">
              <h3>Address:</h3>
            </div>
            <div className="col-sm-9">
              <span className="checker_addr">
                123 Main St<br/>
                Washington, DC 20011
              </span>
            </div>
          </div>
        </div>
        <section className="host_form">
          <form>
            <p>*denotes required field for submission</p>
            <div><div className="form_labels">Listing Agent Name*:</div>&nbsp;<div className="form_inputs"><input type="text" /></div></div>
            <div><div className="form_labels">Listing Agent Email*:</div>&nbsp;<div className="form_inputs"><input type="text" /></div></div>
            <div><div className="form_labels">Expected Price:</div>&nbsp;<div className="form_inputs"><input type="text" /></div></div>
            <div><div className="form_labels">Estimated Size (sqft)*:</div>&nbsp;<div className="form_inputs"><input type="text" /></div></div>
            <div className="form_inputs">Will seller show home/consider
  offers prior to listing?*:</div>&nbsp;
              <div className="form_labels">
                <div>
                  <input onChange={this.handleOptionChange.bind(this)} type="radio" value='no' checked = {this.state.selected_option==='yes'} id="radio_no" name="yes_no" /><label for="radio_no">Yes</label>
                  <input onChange={this.handleOptionChange.bind(this)} type="radio" value='yes' checked = {this.state.selected_option==='no'} id="radio_yes" name="yes_no" /><label for="radio_yes">No</label>
                </div>
              </div>
          </form>
        </section>
        <section className="feedback">
          <div className="feedback_msg">
            Feedback host is seeking from peers on tour*:
          </div><br/>
          <div className="feedback_options row">
            <div className="col-xs-2">

            </div>
            <form>
            <div className="col-xs-4">
              <div>
                <input type="checkbox" id="radio_price"  name="radio_feedback" /><label for="price">Price</label><br/>
                <input type="checkbox" id="radio_staging" name="radio_feedback"/><label for="radio">Staging</label><br/>
                <input type="checkbox" id="radio_timing" value="radio_feedback" name="radio"  /><label for="radio_timing">Timing</label>
              </div>
            </div>
            <div className="col-xs-6">
              <input type="checkbox" id="radio_improvements" value="radio_improvements"  name="radio_feedback" /><label for="radio_improvements">Improvements</label><br/>
              <input type="checkbox" id="radio_buyers_interested" value="radio_buyers_interested" name="radio_feedback"  /><label for="radio_buyers_interested">Buyers Interested</label><br/>
              <input type="checkbox" id="radio_other" value="radio_other" name="radio_feedback" /><label for="radio_other">Other</label><br/>
            </div>
          </form>
          </div>
        </section>
        <section className="reminder">
          REMINDER: Finalized tour logisitics will be determined and distributed after final property
          is submitted, but no later than 6pm on the previous Monday. Tour details will be posted at
          <Link to="/agenda">comingsoontour.com/agenda</Link> AND sent to all members via email in participating brokerage(s).
        </section>
        <section className="terms_conditions">
          <input type="checkbox" id="terms_conditions_radio" value="terms_conditions_radio" name="terms_conditions_radio"  /><label className="terms_conditions_link">I agree to the terms and conditions</label>
        </section>
        <section className="submit_btn">
          <span onClick={()=>this.props.history.push('/agenda')} className="main_submit">SUBMIT</span>
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
