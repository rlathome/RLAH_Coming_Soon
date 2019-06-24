import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LogoArea from './LogoArea';
import Footer from './Footer';
import { APIService } from '../APIs/apiService';
import { DataService } from '../APIs/dataService';

export default class Agenda extends Component{
  constructor(props){
    super(props);
    this.state={
      agenda:'',
      after_tour:''
    }
    this.api = new APIService();
    this.dataService = new DataService();
  }
  componentDidMount(){
    // this.api.get('info/admin_info').then((agenda)=>{
    this.dataService.getAdminInfo().then((admin_info)=>{

      console.log('Admin getting back: ',admin_info.agenda)
      const agenda = admin_info.agenda;
      this.setState({
        agenda,
        after_tour:agenda.after_tour
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
    console.log('OUR AGENDA ',this.state.agenda)
    let agenda = (this.state.agenda !=='') ? this.state.agenda.map((event)=>{
      const address = (event.listing_url) ? (
        <a href={event.listing_url} target="_blank" rel="listing website">
          {event.address}
        </a>
      ) : event.address;
      return(
        <tr>
          <td>{event.property_no}</td>
          <td>{event.arrival}</td>
          <td>{event.departure}</td>
          <td><span className="cs_address">{address}</span></td>
          <td>{event.listing_agt}</td>
          <td>{event.est_price}</td>
          <td>{event.est_sq_ft}</td>
          <td>{event.will_sell}</td>
          <td>{event.est_live}</td>
        </tr>
      );
    }) : '';
    let after_tour = (this.state.after_tour !=='' && this.state.after_tour !==undefined) ? this.state.after_tour.map((event)=>{
      const address = (event.listing_url) ? (
        <a href={event.listing_url} target="_blank" rel="listing website">
          {event.address}
        </a>
      ) : event.address;
      return(
        <tr>
          <td id="aftertour_address"><span className="cs_address">{address}</span></td>
          <td className="aftertour_agent">{event.listing_agt}</td>
          <td className="aftertour_price">{event.est_price}</td>
          <td className="aftertour_sqft">{event.est_sq_ft}</td>
          <td className="aftertour_willsell">{event.will_sell}</td>
          <td className="aftertour_est_live">{event.est_live}</td>
        </tr>
      );
    }) : '';
    const after_tour_contents = '';
    // const after_tour_contents = (this.state.after_tour.length>0) ? (
    //   <div>
    //     <div className="bottom_buffer"></div>
    //     <div ref="after_tour" className="host_title">
    //       HOT LIST
    //     </div>
    //     <section className="agenda_table_container after_tour_table">
    //       <table className="agenda_table second_table">
    //         <tbody>
    //           <tr>
    //             <th>Address</th>
    //             <th className="aftertour_agent">Listing Agent</th>
    //             <th className="aftertour_price">Est. Price</th>
    //             <th className="aftertour_sqft">BR/BA</th>
    //             <th className="aftertour_willsell">Sell Off Mkt?</th>
    //             <th className="aftertour_est_live">Est. Live Date</th>
    //           </tr>
    //           { after_tour }
    //         </tbody>
    //
    //
    //       </table>
    //     </section>
    //     <div className="bottom_buffer"></div>
    // </div>
    // ) : '';
    return(
      <main>
      <div className="comingsoon_logo">
        <img className="image-responsive" src="../images/RLAH_logo_green.png"/>
      </div>
        <div className="host_title">
          AGENDA
        </div>
        <div className="agenda_date">
          { this.state.agenda.event_date }
        </div>
        <section className="agenda_table_container main_agenda_table">
          <table className="agenda_table">
            <tbody>
              <tr>
                <th>Prop No.</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Address</th>
                <th>Listing Agent</th>
                <th>Est. Price</th>
                <th>BR/BA</th>
                <th>Sell Off Mkt?</th>
                <th>Est. Live Date</th>
              </tr>
              { agenda }
            </tbody>


          </table>
        </section>
        <section className="submit_btn hidden-xs">
          <span onClick={()=>window.print()} className="main_submit">PRINT</span>
        </section>
        <LogoArea />

      <Footer/>
      </main>
    );
  }
}
