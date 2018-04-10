import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Footer from './Footer';
const url = 'http://www.comingsoontour.com';

export default class Agenda extends Component{
  constructor(props){
    super(props);
    this.state={
      agenda:'',
      after_tour:''
    }
  }
  componentDidMount(){
    axios.get(url+'/info/admin_info').then((agenda)=>{
      console.log('the agenda: ',agenda.data[0].after_tour);
      this.setState({
        agenda:agenda.data[0],
        after_tour:agenda.data[0].after_tour
      });
    }).catch((err)=>{
      console.log('err - ',err);
    })
  }
  componentDidUpdate() {
    let hash = this.props.location.hash.replace('#', '');
      if (hash) {
          let node = ReactDOM.findDOMNode(this.refs[hash]);
          if (node) {
              node.scrollIntoView();
          }
      }
  }
  render(){
    let agenda = (this.state.agenda !=='' && this.state.agenda.agenda !==undefined) ? this.state.agenda.agenda.map((event)=>{
      return(
        <tr>
          <td>{event.property_no}</td>
          <td>{event.arrival}</td>
          <td>{event.departure}</td>
          <td>{event.address}</td>
          <td>{event.listing_agt}</td>
          <td>{event.est_price}</td>
          <td>{event.est_sq_ft}</td>
          <td>{event.will_sell}</td>
        </tr>
      );
    }) : '';
    let after_tour = (this.state.after_tour !=='' && this.state.after_tour !==undefined) ? this.state.after_tour.map((event)=>{
      return(
        <tr>
          <td id="aftertour_address">{event.address}</td>
          <td className="aftertour_agent">{event.listing_agt}</td>
          <td className="aftertour_price">{event.est_price}</td>
          <td className="aftertour_sqft">{event.est_sq_ft}</td>
          <td className="aftertour_willsell">{event.will_sell}</td>
        </tr>
      );
    }) : '';
    const after_tour_contents = (this.state.after_tour.length>0) ? (
      <div>
        <div className="bottom_buffer"></div>
        <div ref="after_tour" className="host_title">
          AFTER TOUR
        </div>
        <section className="agenda_table_container after_tour_table">
          <table className="agenda_table">
            <tbody>
              <tr>
                <th>Address</th>
                <th className="aftertour_agent">Listing Agent</th>
                <th className="aftertour_price">Est. Price</th>
                <th className="aftertour_sqft">Est. Sq. Ft</th>
                <th className="aftertour_willsell">Willing to sell off market?</th>
              </tr>
              { after_tour }
            </tbody>


          </table>
        </section>
        <div className="bottom_buffer"></div>
    </div>
    ) : '';
    return(
      <main>
        <h1 className="coming_soon_title">Coming Soon Tour</h1>
        <div className="host_title">
          AGENDA
        </div>
        <div className="agenda_date">
          { this.state.agenda.event_date }
        </div>
        <section className="agenda_table_container">
          <table className="agenda_table">
            <tbody>
              <tr>
                <th>Property No.</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Address</th>
                <th>Listing Agent</th>
                <th>Est. Price</th>
                <th>Est. Sq. Ft</th>
                <th>Willing to sell off market?</th>
              </tr>
              { agenda }
            </tbody>


          </table>
        </section>
        <section className="submit_btn">
          <span onClick={()=>window.print()} className="main_submit">PRINT</span>
        </section>
        <Footer />
        {/* <div className="bottom_buffer"></div>
        <div className="host_title">
          AFTER TOUR
        </div>
        <section className="agenda_table_container after_tour_table">
          <table className="agenda_table">
            <tbody>
              <tr>
                <th>Address</th>
                <th>Listing Agent</th>
                <th>Est. Price</th>
                <th>Est. Sq. Ft</th>
                <th>Willing to sell off market?</th>
              </tr>
              { after_tour }
            </tbody>


          </table>
        </section>
        <div className="bottom_buffer"></div> */}
        { after_tour_contents }
      </main>
    );
  }
}
