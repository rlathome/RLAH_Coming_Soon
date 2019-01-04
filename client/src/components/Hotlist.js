import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LogoArea from './LogoArea';
import Footer from './Footer';
import { APIService } from '../APIs/apiService';

export default class Hotlist extends Component{
  constructor(props){
    super(props);
    this.state={
      agenda:'',
      after_tour:''
    }
    this.api = new APIService();
  }
  componentDidMount(){
    this.api.get('info/admin_info').then((agenda)=>{
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
    const post_tour = this.state.after_tour;
    return(
      <main>
      <h1 className="coming_soon_title">Coming Soon Tour</h1>
      <div ref="after_tour" className="host_title">
        HOT LIST
      </div>
      <section className="qualifications_msg">
        <ul className="hotlist_title_list">
          <li>Additional off-market properties that may not be on the sponsored tour</li>
          <li>Scroll down to view the complete list sorted by DC, MD, & VA</li>
          <li>If a property address is blue, click for additional media</li>
        </ul>
      </section>

        {
          post_tour && (
          <div>
            <section className="agenda_table_container after_tour_table">

          {/* <div className="row_header_container">
              <div className="row_header">
                DC
              </div>
            </div>*/}
              <table className="agenda_table second_table">
                <tbody>
                <div className="row_header">DC</div>
                  <tr>
                    <th>Address</th>
                    <th className="aftertour_agent">Listing Agent</th>
                    <th className="aftertour_price">Est. Price</th>
                    <th className="aftertour_sqft">Est. Sq. Ft</th>
                    <th className="aftertour_willsell">Sell Off Mkt?</th>
                    <th className="aftertour_est_live">Est. Live Date</th>
                  </tr>

              {
                post_tour &&
                  this.state.after_tour.map((event)=>{
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
                  })
                 }
                 <div className="row_header">MD</div>
                  <tr>
                    <th>Address</th>
                    <th className="aftertour_agent">Listing Agent</th>
                    <th className="aftertour_price">Est. Price</th>
                    <th className="aftertour_sqft">Est. Sq. Ft</th>
                    <th className="aftertour_willsell">Sell Off Mkt?</th>
                    <th className="aftertour_est_live">Est. Live Date</th>
                  </tr>
                  <div className="row_header">VA</div>
                  <tr>
                    <th>Address</th>
                    <th className="aftertour_agent">Listing Agent</th>
                    <th className="aftertour_price">Est. Price</th>
                    <th className="aftertour_sqft">Est. Sq. Ft</th>
                    <th className="aftertour_willsell">Sell Off Mkt?</th>
                    <th className="aftertour_est_live">Est. Live Date</th>
                  </tr>
                </tbody>
              </table>
            </section>
            <div className="bottom_buffer"></div>
          </div>
          )
        }
        <section className="submit_btn hidden-xs">
          <span onClick={()=>window.print()} className="main_submit">PRINT</span>
        </section>
        <LogoArea />
      <Footer/>
      </main>
    );
  }
}
