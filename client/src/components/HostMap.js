import React, { Component } from 'react';
import RadiusMap from './RadiusMap';
import axios from 'axios';
import Footer from './Footer';
const google = window.google;
const url = 'http://www.comingsoontour.com';

export default class HostRegistration extends Component{
  constructor(props){
    super(props);
    this.state={
      out_of_bounds:false,
      address_entered:false,
      slots_available:''
    }
  }
  componentWillMount(){
    console.log('joey: ',this.props.joey)
    axios.get(url+'/info/admin_info').then((admin)=>{
      console.log('map admin info: ',admin.data);
      const d = admin.data[0];
      const avail = parseInt(d.slots_available);
      const slots_full = (avail===0) ? true : false;
      const date = d.event_date;
      this.setState({
        slots_available:d.slots_available,
        slots_full,
        date
      });
    }).catch((err)=>{
      console.log('err - ',err);
    })
  }
  out_of_bounds(){
    this.setState({
      out_of_bounds:true
    })
  }
  not_out_of_bounds(){
    this.setState({
      out_of_bounds:false
    })
  }
  address_entered(){
    const address = this.refs.addr.value;
    this.setState({
      address_entered:true,
      address
    })
  }
  no_address_entered(){
    this.setState({
      address_entered:false
    });
  }
  next(){
    this.props.history.push('/host/registration/'+this.state.address);
  }
  render(){
    const out_of_bounds = (this.state.address_entered && this.state.out_of_bounds) ? (
      <div className="out_of_bounds">Sorry, that address is not within our tour area.</div>
    ) : '';
    const within_bounds = (this.state.address_entered && !this.state.out_of_bounds) ? (
      <div className="within_bounds">Your property is within the tour area. Please press 'Next'</div>
    ) : '';
    let submit = (this.state.address_entered && !this.state.out_of_bounds) ? (
      <span onClick={()=>this.next()} className="checker_submit">NEXT</span>
    ): (
      <span id="map-button" className="checker_submit no_click">SUBMIT</span>
    );
    let address_form = (
      <form className="address_checker checker_margin">
        <h3>Address:</h3><input placeholder="Enter an address to see if it qualifies" ref="addr" id="pac-input" type="text" />
        { submit }
      </form>
    )
    if(this.state.slots_full){
      address_form = '';
    }
    const map_props = {
      out_of_bounds:this.out_of_bounds.bind(this),
      not_out_of_bounds:this.not_out_of_bounds.bind(this),
      no_address_entered :this.no_address_entered.bind(this),
      address_entered :this.address_entered.bind(this),
      center:{lat:38.910136,lng:-77.042510}
    }
    return(
      <main>
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="host_title">
          HOST
        </div>
        <section className="qualifications_msg">
          <h3>Qualifications</h3>
          <ol className="qualifications_list">
            <li>Property is located within the 2 Miler Map below (no VA addresses)</li>
            <li>Property is NOT listed in Bright MLS (except "Coming Soon") at time of tour</li>
            <li>Property must be submitted by 12pm the Monday before the tour or until 4 total qualifying properties have been submitted, whichever comes first</li>
          </ol>
        </section>
        <section className="slots_avail"><h3>Current Property Slots Available:</h3> <span className="slots_number">
          { this.state.slots_available }
        </span></section>
        <div className="agenda_date">
          { this.state.date }
        </div>
        { address_form }
        { out_of_bounds }
        { within_bounds }
        <section className="after_tour_info">
          Don’t worry if your property doesn’t qualify, <a href="https://docs.google.com/forms/d/e/1FAIpQLSfkUnV09CSId-qYSzaop9Wt5LObd9Auv4fFaIxBgm_TVakutA/viewform" alt="form link">click here</a> for HOT LIST information
        </section>
        <section className="radius_map">
          <div className="map_element">
            <RadiusMap  {...map_props} />
          </div>
        </section>
        <Footer />
      </main>
    );
  }
}
