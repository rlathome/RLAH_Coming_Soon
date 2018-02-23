import React, { Component } from 'react';
import RadiusMap from './RadiusMap';
import axios from 'axios';
const google = window.google;

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
    axios.get('http://localhost:8080/info/admin_info').then((admin)=>{
      console.log('admin info: ',admin.data);
      const d = admin.data[0];
      this.setState({
        slots_available:d.slots_available
      })
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
    this.setState({
      address_entered:true
    })
  }
  render(){
    const out_of_bounds = (this.state.out_of_bounds) ? (
      <div className="out_of_bounds">Sorry, that address is outside of the 2 mile radius qualification</div>
    ) : '';
    const submit = (this.state.address_entered && !this.state.out_of_bounds) ? (
      <span onClick={()=>this.props.history.push('/host/registration')} className="checker_submit">NEXT</span>
    ): (
      <span id="map-button" className="checker_submit">SUBMIT</span>
    );
    const map_props = {
      out_of_bounds:this.out_of_bounds.bind(this),
      not_out_of_bounds:this.not_out_of_bounds.bind(this),
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
            <li>Property is located within the 2 mile map</li>
            <li>Property is NOT listed in Bright MLS (except "Coming Soon") at time of tour</li>
            <li>Property must be submitted by 12pm the previous Monday or until 4 total qualifying properties have been submitted, whichever comes first</li>
          </ol>
        </section>
        <section className="slots_avail"><h3>Current Property Slots Available:</h3> <span className="slots_number">
          { this.state.slots_available }
        </span></section>
        <form className="address_checker checker_margin">
          <h3>Address:</h3><input  id="pac-input" type="text" />
          { submit }
        </form>
        { out_of_bounds }
        <section className="radius_map">
          <div className="map_element">
            <RadiusMap  {...map_props} />
          </div>
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
