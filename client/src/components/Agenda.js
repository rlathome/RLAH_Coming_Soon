import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';
const url = 'https://polar-waters-86989.herokuapp.com';

export default class Agenda extends Component{
  constructor(props){
    super(props);
    this.state={
      agenda:''
    }
  }
  componentDidMount(){
    axios.get(url+'/info/admin_info').then((agenda)=>{
      console.log('the agenda: ',agenda.data[0].agenda);
      this.setState({
        agenda:agenda.data[0]
      });
    }).catch((err)=>{
      console.log('err - ',err);
    })
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
      </main>
    );
  }
}
