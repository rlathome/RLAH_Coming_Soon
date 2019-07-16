import React, { Component } from 'react';
import { DataService } from '../../APIs/dataService';


export default class HotlistForm extends Component{
  constructor(props){
    super(props);
    this.state={
      selected_offer_option:'',
      feedback_filled:false,
      form_vals:{
        address:'',
        agent_name:'',
        agent_email:'',
        expected_price:'',
        br_ba:'',
        when_active:'',
        comments:'',
        will_seller_show:'',
        add_on_cancel:'',
        feedback:{
          price:false,
          staging:false,
          timing:false,
          improvements:false,
          buyers_interested:false,
          other:false,
        },
      }
    };
    this.dataService = new DataService();
  }
  isFormFilled(){
    if(this.state.feedback_filled == false){
      console.log('NOT FILLED');
      return false;
    }
    for(let val in this.state.form_vals)(()=>{
      if(val == ''){
        console.log('NOT FILLED');
        return false;
      }
    });
    console.log('FILLED')
    return true;
  }
  handle_yn_btn(e,bool,prop){
    console.log('handling yn')
    const new_vals = {
      ...this.state.form_vals,
      [prop]:bool
    }
    this.setState({
      form_vals:new_vals
    });
    console.log(prop,' : ',bool)
  }
  setForm(e,prop){
    const new_vals = {
      ...this.state.form_vals,
      [prop]:e.target.value
    }
    this.setState({
      form_vals:new_vals
    });
    console.log('form vals: ',new_vals)
  }
  handleFeedback(e,prop){
    this.state.feedback_filled = true;
    console.log('getting ',prop,':',e.target.checked)
    const new_val = {
      [prop]:e.target.checked
    }
    const new_feedback = {
      ...this.state.form_vals.feedback,
      ...new_val
    }
    const new_vals = {
      ...this.state.form_vals,
      feedback:new_feedback
    }
    this.setState({
      form_vals:new_vals
    });
    console.log('new vals - ',new_vals)
  }
  submit(){
    const filled = this.isFormFilled();
    if(filled == false){
      window.alert('Please fill out all the fields.');
      return;
    }
    const data = this.state.form_vals;
    this.dataService.submitHotlist(data);
  }
  render(){
    const { selected_offer_option, form_vals } = this.state;
    const add_on_cancel = (form_vals.add_on_cancel=='N') ? true : false;
    console.log(
      'Add on cancel: ',add_on_cancel
    )
    return(
      <div className="hotlistform-container">

          <div className="hotlistform panel panel-default">
            <div className="hotlist-inst">
              <h1>Hot List</h1>
              <p>Properties that do not qualify, but are submitted in a timely manner, can still benefit from <a href="http://comingsoontour.com" alt="Coming Soon Tour">comingsoontour.com!</a> </p>
              <p>*Your property will be mentioned on the Hot List page: <a href="http://www.comingsoontour.com/hotlist" alt="Hotlist">http://www.comingsoontour.com/hotlist</a></p>

              <p>*In some instances, if there is a cancellation, your property may get bumped up into the official comingsoontour</p>

              <p>Provide the information below and we'll do our best to get you the exposure, feedback, and/or visitors you're seeking</p>

              <p className="red">* Required</p>
            </div>

            <form>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">Property Address</span> <span className="red">*</span>
                <div>
                  <input onChange={(e)=>this.setForm(e,'address')} className="hotlistform-input" placeholder="Your Answer" ref="address" type="text"/>
                </div>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">Listing Agent Name</span> <span className="red">*</span>
                <div>
                  <input onChange={(e)=>this.setForm(e,'agent_name')} className="hotlistform-input" placeholder="Your Answer" ref="agent_name" type="text"/>
                </div>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">Listing Agent Email</span> <span className="red">*</span>
                <div>
                  <input onChange={(e)=>this.setForm(e,'agent_email')} className="hotlistform-input" placeholder="Your Answer" ref="agent_email" type="text"/>
                </div>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">Expected Price</span> <span className="red">*</span>
                <div>
                  <input onChange={(e)=>this.setForm(e,'expected_price')} className="hotlistform-input" placeholder="Your Answer" ref="expected_price" type="text"/>
                </div>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">BR/BA</span> <span className="red">*</span>
                <div>
                  <input onChange={(e)=>this.setForm(e,'br_ba')} className="hotlistform-input" placeholder="Your Answer" ref="br_ba" type="text"/>
                </div>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">What media links do you have, if any, of property (SPW, Photos, Previous Listing, Dropbox etc.). For example: <span className="blue">http://www.rlahre.com/listing/5301-dorsett-place-nw/</span></span> <span className="red">*</span>
                <div>
                  <input className="hotlistform-input hotlistform-input-long" placeholder="Your Answer" ref="media_links" type="text"/>
                </div>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">Will seller show home/consider offers prior to listing?</span> <span className="red">*</span>
                <fieldset >
                  <div >
                    <label><input onChange={(e)=>this.handle_yn_btn(e,'Y','will_seller_show')} type="radio" name="optradio" />Yes</label>
                  </div>
                  <div >
                    <label><input onChange={(e)=>this.handle_yn_btn(e,'N','will_seller_show')} type="radio" name="optradio"/>No</label>
                  </div>
                  <div class="radio hidden">
                    <label><input type="radio" name="optradio"  />No</label>
                  </div>
              </fieldset>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">Feedback host is seeking from peers on tour (if it's bumped into the sponsored tour)</span> <span className="red">*</span>
                <div class="checkbox">
                  <label><input onClick={(e)=>this.handleFeedback(e,'price')} type="checkbox" value=""/>Price</label>
                </div>
                <div class="checkbox">
                  <label><input onClick={(e)=>this.handleFeedback(e,'staging')} type="checkbox" value=""/>Staging</label>
                </div>
                <div class="checkbox disabled">
                  <label><input onClick={(e)=>this.handleFeedback(e,'timing')} type="checkbox" value="" />Timing</label>
                </div>
                <div class="checkbox">
                  <label><input onClick={(e)=>this.handleFeedback(e,'improvements')} type="checkbox" value=""/>Improvements</label>
                </div>
                <div class="checkbox">
                  <label><input onClick={(e)=>this.handleFeedback(e,'buyers_interested')} type="checkbox" value=""/>Buyers Interested</label>
                </div>
                <div class="checkbox disabled">
                  <label><input onClick={(e)=>this.handleFeedback(e,'other')} type="checkbox" value="" />Other</label>
                </div>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">If there is a cancellation of a qualified property, do you want this property to be bumped into the official sponsored tour?</span> <span className="red">*</span>
                <fieldset >
                  <div >
                    <label><input onChange={(e)=>this.handle_yn_btn(e,'Y','add_on_cancel')} type="radio" name="second_group" />Yes, I would like to be a part of the sponsored tour if there is a cancellation</label>
                  </div>
                  <div >
                    <label><input onChange={(e)=>this.handle_yn_btn(e,'N','add_on_cancel')} type="radio" name="second_group" />No, the property is not available for the tour</label>
                  </div>
                  <div class="radio hidden">
                    <label><input type="radio" name="second_group"  />No</label>
                  </div>
                </fieldset>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">When will this property be active?</span> <span className="red">*</span>
                <div>
                  <input onChange={(e)=>this.setForm(e,'when_active')} className="hotlistform-input" placeholder="Your Answer" ref="when_active" type="text"/>
                </div>
              </div>
              <div className="hotlistform-entry">
                <span className="hotlistform-label">Additional comments</span> <span className="red">*</span>
                <div>
                  <input onChange={(e)=>this.setForm(e,'comments')} className="hotlistform-input" placeholder="Your Answer" ref="comments" type="text"/>
                </div>
              </div>
              <div onClick={()=>this.submit()} className="btn btn-primary hotlistform-submit">Submit</div>
            </form>
          </div>
      </div>
    );
  }
}
