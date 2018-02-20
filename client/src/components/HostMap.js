import React, { Component } from 'react';

export default class HostRegistration extends Component{
  render(){
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
        <section className="slots_avail"><h3>Current Property Slots Available:</h3> <span className="slots_number">4</span></section>
        <form className="address_checker checker_margin">
          <h3>Address:</h3><input type="text" /><span onClick={()=>this.props.history.push('/host/registration')} className="checker_submit">SUBMIT</span>
        </form>
        <section className="radius_map">
          <div className="map_element"></div>
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
