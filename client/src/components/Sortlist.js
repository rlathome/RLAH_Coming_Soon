import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LogoArea from './LogoArea';
import Footer from './Footer';
import { APIService } from '../APIs/apiService';
import { DataService } from '../APIs/dataService';
import HotlistMap from './HotlistMap';


export default class Hotlist extends Component{
  constructor(props){
    super(props);
    this.state={
      agenda:'',
      after_tour:'',
      after_tour_md:'',
      after_tour_va:'',
      just_sorted:'',
      arrow:true,
      view:'list'
    }
    this.dataService = new DataService();
  }
  componentDidMount(){
    this.dataService.getAdminInfo().then((agenda)=>{
      console.log('the agenda: ',agenda.data[0].after_tour);
      this.setState({
        agenda:agenda.data[0]
      });
    }).catch((err)=>{
      console.log('err - ',err);
    })
    this.dataService.getAfterTour('after_tour').then(res=>{
        this.setState({
        after_tour:res['after_tour']
      });
    });
    this.dataService.getAfterTour('after_tour_va').then(res=>{
      console.log('setting va listings: ',res['after_tour_va'])
        this.setState({
        after_tour_va:res['after_tour_va']
      });
    });

    this.dataService.getAfterTour('after_tour_md').then(res=>{
      console.log('setting md listings: ',res['after_tour_md'])
        this.setState({
        after_tour_md:res['after_tour_md']
      });
    });
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

  onSort(event, sortKey,tour){
    console.log('sorting ',sortKey)
    const column_name = tour+sortKey;
    this.setState({
      arrow:!this.state.arrow
    })
    if(this.state.just_sorted !='' && this.state.just_sorted !=column_name){
      let target = document.getElementsByClassName('selected_header')[0];
      target && target.setAttribute('class','')
    }
    if(this.state.just_sorted==column_name){
      let to_reverse = this.state[tour];
      to_reverse = to_reverse.reverse();
      this.setState({
        [tour]:to_reverse
      });
      return;
    }
    event.target.setAttribute('class','selected_header')
    const data = this.state[tour];
    if(sortKey =='address') {
      // data.sort((a,b) => a[sortKey].replace(/[0-9]/g,'').localeCompare(b[sortKey].replace(/[0-9]/g,'')))
      data.sort((a,b) => a[sortKey].split(' ')[1].localeCompare(b[sortKey].split(' ')[1]))
    }else if(sortKey=='listing_agt'){
      data.sort((a,b) => a[sortKey].split(' ').pop().localeCompare(b[sortKey].split(' ').pop()))
    }else if(sortKey=='est_price'){
      data.sort((a,b)=>{
        const aInt = parseInt(a[sortKey].replace(/\D/g,''));
        const bInt = parseInt(b[sortKey].replace(/\D/g,''));
        console.log('aInt ',aInt)
        return aInt-bInt;
      });
    }else{
      data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
    }

    this.setState({
      [tour]:data,
      just_sorted:column_name
    });
  }
  changeView(event,view){
    event.target.setAttribute('class','view-by-btn view-by-btn-clicked');
    this.setState({
      view
    });
  }

  render(){
    const {after_tour, after_tour_md, after_tour_va, just_sorted, arrow, view} = this.state;
    const table_contents = (type) => {
      return this.state[type].map((event)=>{
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
      });
    }
    let sort_arrow = (arrow==true) ? (<span><i className="fa fa-angle-up"></i></span>) : (<span><i className="fa fa-angle-down"></i></span>);

    const map_props = {
      center:{lat:38.910136,lng:-77.042510},
      after_tour,
      after_tour_md,
      after_tour_va
    }
    const list_btn_style = (view==='list') ? 'view-by-btn view-by-btn-clicked' : 'view-by-btn';
    const map_btn_style = (view==='map') ? 'view-by-btn view-by-btn-clicked' : 'view-by-btn';

    return(
      <main>
      <div className="comingsoon_logo">
        <img className="image-responsive" src="../images/RLAH_logo_green.png"/>
      </div>
      <div ref="after_tour" className="host_title">
        HOT LIST
      </div>

      <div>View by</div>
      <div>
        <span className={list_btn_style} onClick={(e)=>this.changeView(e,'list')}>List</span>
        <span className={map_btn_style} onClick={(e)=>this.changeView(e,'map')}>Map</span>
      </div>

      {
          view === 'list' && (  <section className="qualifications_msg">
              <ul className="hotlist_title_list">
                <li>To submit a property to the Hot List<a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfkUnV09CSId-qYSzaop9Wt5LObd9Auv4fFaIxBgm_TVakutA/viewform"> click here</a></li>
                <li>Additional off-market properties that may not be on the sponsored tour</li>
                <li>Scroll down to view the complete list sorted by DC, MD, & VA</li>
                <li>If a property address is blue, click for additional media</li>
              </ul>
            </section>)
      }
      {
        view === 'list' && (
          <div className="click_to_sort">Click a column to sort by</div>
        )
      }

      <section>
        {
          after_tour && view === 'list' && (
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
                  <th onClick={(e)=>this.onSort(e,'address','after_tour')}>Address {(sort_arrow)}</th>
                  <th onClick={(e)=>this.onSort(e,'listing_agt','after_tour')} className="aftertour_agent">Listing Agent</th>
                  <th onClick={(e)=>this.onSort(e,'est_price','after_tour')} className="aftertour_price">Est. Price</th>
                  <th onClick={(e)=>this.onSort(e,'est_sq_ft','after_tour')} className="aftertour_sqft">BR/BA</th>
                  <th onClick={(e)=>this.onSort(e,'will_sell','after_tour')} className="aftertour_willsell">Sell Off Mkt?</th>
                  <th onClick={(e)=>this.onSort(e,'est_live','after_tour')} className="aftertour_est_live">Est. Live Date</th>
                  </tr>

                  {
                    after_tour && table_contents('after_tour')
                  }
                 <div className="row_header">MD</div>
                 <tr>
                   <th onClick={(e)=>this.onSort(e,'address','after_tour_md')}>Address</th>
                   <th onClick={(e)=>this.onSort(e,'listing_agt','after_tour_md')} className="aftertour_agent">Listing Agent</th>
                   <th onClick={(e)=>this.onSort(e,'est_price','after_tour_md')} className="aftertour_price">Est. Price</th>
                   <th onClick={(e)=>this.onSort(e,'est_sq_ft','after_tour_md')} className="aftertour_sqft">BR/BA</th>
                   <th onClick={(e)=>this.onSort(e,'will_sell','after_tour_md')} className="aftertour_willsell">Sell Off Mkt?</th>
                   <th onClick={(e)=>this.onSort(e,'est_live','after_tour_md')} className="aftertour_est_live">Est. Live Date</th>
                 </tr>
                  {
                    after_tour_md && table_contents('after_tour_md')
                  }
                  <div className="row_header">VA</div>
                  <tr>
                  <th onClick={(e)=>this.onSort(e,'address','after_tour_va')}>Address</th>
                  <th onClick={(e)=>this.onSort(e,'listing_agt','after_tour_va')} className="aftertour_agent">Listing Agent</th>
                  <th onClick={(e)=>this.onSort(e,'est_price','after_tour_va')} className="aftertour_price">Est. Price</th>
                  <th onClick={(e)=>this.onSort(e,'est_sq_ft','after_tour_va')} className="aftertour_sqft">BR/BA</th>
                  <th onClick={(e)=>this.onSort(e,'will_sell','after_tour_va')} className="aftertour_willsell">Sell Off Mkt?</th>
                  <th onClick={(e)=>this.onSort(e,'est_live','after_tour_va')} className="aftertour_est_live">Est. Live Date</th>
                  </tr>
                  {
                    after_tour_va && table_contents('after_tour_va')
                  }
                </tbody>
              </table>
            </section>
            <div className="bottom_buffer"></div>
          </div>
          )
        }
      </section>
      <section>
      {
        view === 'map' && (
          <HotlistMap {...map_props} />
        )
      }
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
