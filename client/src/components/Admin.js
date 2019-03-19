import React, { Component } from 'react';
import axios from 'axios';
import { DataService } from '../APIs/dataService';

import { url } from '../globalConf.js';

export default class Admin extends Component{
  constructor(props){
    super(props);
    this.state={
      host_password:'',
      guest_password:'',
      hotlist_password:'',
      agenda:'',
      after_tour:[],
      after_tour_dc:[],
      after_tour_md:[],
      after_tour_va:[],
      event_date:'',
      slots_avail:'',
      logo:'',
      next_tour:'',
      footer_logo_url:'',
      footer_logo_edit:'',
      currently_editing:'agenda'
    }
    this.dataService = new DataService();
  }
  componentDidMount(){
    this.dataService.getAdminInfo(this.footerLogoEdit).then(res=>this.setState(res));
  }

  hideGuestSlots(cmd){
    console.log('hide: ',cmd);
    const data = {cmd};
    axios.post(url+'/info/hideguestslots',data).then((res)=>{
      console.log('HIDDEN: ',res.data);
      alert('Guest Form Hide: '+res.data.toUpperCase());
    }).catch(err=>console.log('error hiding guests: ',err));
  }
  submitEvent(){
    let event_num = 0;
    let agenda = [];
    let event_date = this.refs.event_date.value;
    let slots_avail = this.refs.slots_avail.value.toString();
    const slots_to_fill = document.getElementsByClassName('admin_row');
    let slots = slots_to_fill.length;
    for(let i=1; i<=slots; i++){
      let property_no = 'property_no'+i;
      let listing_url = 'url'+i;
      let arrival = 'arrival'+i;
      let departure = 'departure'+i;
      let address = 'address'+i;
      let listing_agt = 'listing_agt'+i;
      let est_price = 'est_price'+i;
      let est_sq_ft = 'est_sq_ft'+i;
      let will_sell = 'will_sell'+i;
      let est_live = 'est_live'+i;
      property_no = this.refs[property_no].value;
      arrival = this.refs[arrival].value;
      departure = this.refs[departure].value;
      address = this.refs[address].value;
      listing_agt = this.refs[listing_agt].value;
      est_price = this.refs[est_price].value;
      est_sq_ft = this.refs[est_sq_ft].value;
      will_sell = this.refs[will_sell].value;
      listing_url = this.refs[listing_url].value;
      est_live = this.refs[est_live].value;
      let items = {
        property_no,
        listing_url,
        arrival,
        departure,
        address,
        listing_url,
        listing_agt,
        est_price,
        est_sq_ft,
        will_sell,
        est_live
      }
      agenda.push(items);
    }
    console.log('our agenda: ',agenda);
    axios.post(url+'/info/submitagenda',{agenda,event_date,slots_avail}).then((response)=>{
      console.log('success: ',response);
      alert('your agenda has been updated');
    }).catch((err)=>{
      console.log('err - ',err);
    });
  }
  deleteEvent(e){
    let event = (e.target.id !=='0') ? parseInt(e.target.id)-1 : 0;
    let agenda = this.state.agenda.slice();
    console.log('deleting -',e.target.id)
    if(agenda.length===1){
      agenda=[];
    }else{
      agenda.splice(event,1);
    }
    console.log(agenda)
    const data = {
      agenda
    }
    if(window.confirm('Are you sure?')){
        axios.post(url+'/info/delete_event',data).then((response)=>{
        console.log('success -',response)
        if(response.data ==='success'){
          this.setState({
            agenda
          });
        }
      }).catch((err)=>[
        console.log('err - ',err)
      ]);
    }
  }
  changePassword(type){
    let password;
    switch(type){
      case 'admin_password':
      password = this.refs.admin_pass.value;
      break;
      case 'guest_password':
      password = this.refs.guest_pass.value;
      break;
      case 'host_password':
      password = this.refs.host_pass.value;
      break;
      case 'hotlist_password':
      password = this.refs.hotlist_pass.value;
      break;
      default:
      password = this.refs.host_pass.value;
    }
    console.log('changing to: ',password)
    const data = {
      type,
      password
    }
    axios.post(url +'/info/change_password',data).then((response)=>{
      console.log('success: ',response);
      alert('your password has been updated');
    }).catch((err)=>{
      console.log('err - ',err);
    });
  }
  changeLogo(){
    const logo_url = this.refs.logo_url.value;
    const data = { logo_url };
    axios.post(url +'/info/change_logo',data).then((response)=>{
      console.log('success: ',response);
      if(response.data === 'success'){
        alert('your logo has been updated');
      }
    }).catch((err)=>{
      console.log('err - ',err);
    });
  }
  changeFooterLogo(){
    const footer_logo_url = this.refs.footer_logo_url.value;
    const data = { footer_logo_url };
    axios.post(url +'/info/change_footer_logo',data).then((response)=>{
      console.log('success: ',response);
      if(response.data === 'success'){
        alert('your footer logo has been updated');
      }
    }).catch((err)=>{
      console.log('err - ',err);
    });
  }
  submitNextTourDate(){
    const next_tour= this.refs.next_tour.value;
    console.log('value: ',next_tour)
    const data = {
      next_tour
    }
    axios.post(url +'/info/change_next_tour_date',data).then((response)=>{
      console.log('success: ',response);
      if(response.data === 'success'){
        alert('next tour date has been updated');
      }
    }).catch((err)=>{
      console.log('err - ',err);
    });
  }
  // This function adds a new editable row for the main agenda page:
  addEvent(){
    let agenda = this.state.agenda;
    console.log(agenda)
    agenda.push({
      address:"",
      listing_url:"",
      arrival:"",
      departure:"",
      est_price:"",
      est_sq_ft:"",
      listing_agt:"",
      property_no:"",
      will_sell:"",
      est_live:""
    });
    this.setState({
      agenda
    });
  }
// this function will send the after tour event to the database and store/update it:

  submitAfterTourEvent(tour){
    let event_num = 0;
    let agenda = [];
    let amount = this.state[tour].length;
    for(let i=1; i<=amount; i++){
      let address_ref = `${tour}_address${i}`;
      console.log('submitAfterTour address_ref: ',address_ref)
      let listing_url_ref = `${tour}_url${i}`;
      let listing_agt_ref = `${tour}_listing_agt${i}`;
      let est_price_ref = `${tour}_est_price${i}`;
      let est_sq_ft_ref = `${tour}_est_sq_ft${i}`;
      let will_sell_ref = `${tour}_will_sell${i}`;
      let est_live_ref = `${tour}_est_live${i}`;
      const address = this.refs[address_ref].value;
      const listing_agt = this.refs[listing_agt_ref].value;
      const listing_url = this.refs[listing_url_ref].value;
      const est_price = this.refs[est_price_ref].value;
      const est_sq_ft = this.refs[est_sq_ft_ref].value;
      const will_sell = this.refs[will_sell_ref].value;
      const est_live = this.refs[est_live_ref].value;
      let items = {
        address,
        listing_url,
        listing_agt,
        est_price,
        est_sq_ft,
        will_sell,
        est_live
      }
      agenda.push(items);
    }
    console.log('our agenda: ',agenda);
    const hotlist = agenda;
    const data = {
      hotlist,
      type:tour
    };
    axios.post(url+'/info/update_after_tour_event',{data}).then((response)=>{
      console.log('success: ',response);
      alert('your hotlist agenda has been updated');
    }).catch((err)=>{
      console.log('err - ',err);
    });
  }

  // This function will generate a new (editable) row on whichever hotlist table its argument specifies:
  addAfterTourEvent(tour_area){
    let tour_table = this.state[tour_area];
    console.log(tour_table)
    tour_table.push({
      address:"",
      listing_url:"",
      arrival:"",
      departure:"",
      est_price:"",
      est_sq_ft:"",
      listing_agt:"",
      property_no:"",
      will_sell:"",
      est_live:""
    });
    this.setState({
      [tour_area]:tour_table
    });
  }
//this function sets up a deleted row in the component state, only pressing 'UPDATE' will send request to DB.
// first argument is event object, second object is string specifying which tour area:
  deleteAfterTourEvent(e, tour_area){
    let event = (e.target.id !=='0') ? parseInt(e.target.id)-1 : 0;

    console.log('deleting - ',event)
    let current_hotlist = this.state[tour_area].slice();
    let hotlist = current_hotlist;
    // console.log('current_hotlist - ',current_hotlist);
    if(current_hotlist.length===1){
      hotlist=[];
    }else{
      hotlist = current_hotlist.splice(event,1);
    }
    console.log('deleted - ',current_hotlist)
    const data = {
      type:tour_area,
      hotlist:current_hotlist
    }
    console.log('saving - ',data)
    if(window.confirm('Are you sure?')){
        axios.post(url+'/info/update_after_tour_event',{data}).then((response)=>{
        console.log('success -',response)
        window.alert('Your row has been deleted')
        this.setState({
          [tour_area]:[]
        });
        this.dataService.getAdminInfo(this.footerLogoEdit).then(res=>this.setState(res));
      }).catch((err)=>[
        console.log('err - ',err)
      ]);
    }
  }

  footerLogoEdit(footer_logo_url){
    return (
      <div className='main_logo flex_col' >
        <div>
            <input className="input-logo" type="text" ref="footer_logo_url" defaultValue={footer_logo_url} /><span onClick={()=>this.changeFooterLogo()} className="btn btn-primary">Update</span>
          </div>
        <img className="img-responsive" src={footer_logo_url} alt="affiliate logo" />
      </div>
    );
  }
  changeView(view){
    this.setState({
      currently_editing:view
    });
  }
  render(){
    let { logo, footer_logo_url, after_tour, after_tour_dc, after_tour_md, after_tour_va, currently_editing } = this.state;
    console.log('VIRGINIA - ',after_tour_va);
    console.log('footer logo: ',footer_logo_url);
    // const footer_logo_url = (this.state.footer_logo_url !== '')
    // const logo = (this.state.logo !=='') ? this.state.logo : '';
    // const footer_logo_url = (this.state.footer_logo_url !== '') ? this.state.footer_logo_url : '';
    let event_num = 0;
    let ts_agenda = this.state.agenda;
    let next_tour_date = (this.state.next_tour !=='') ? (
      <section className = "admin_passwords">
        <h3>Next Tour</h3>
        <input type="text" ref="next_tour" defaultValue={this.state.next_tour} />
        <span onClick={this.submitNextTourDate.bind(this)} className="btn btn-primary">UPDATE</span>
      </section>
    ): '';
    let passwords = (this.state.guest_password !=='') ? (
      <div>
        <div className="admin_passwords">Host password: <input ref="host_pass" type="text" defaultValue={this.state.host_password} /><span onClick={()=>this.changePassword('host_password')} className="btn btn-primary">Update</span></div>
        <div className="admin_passwords">Guest password: <input ref="guest_pass" type="text" defaultValue={this.state.guest_password} /><span onClick={()=>this.changePassword('guest_password')} className="btn btn-primary">Update</span></div>
        <div className="admin_passwords">Admin password: <input ref="admin_pass" type="text" defaultValue={this.state.admin_password} /><span onClick={()=>this.changePassword('admin_password')} className="btn btn-primary">Update</span></div>
        <div className="admin_passwords">Hotlist password: <input ref="hotlist_pass" type="text" defaultValue={this.state.hotlist_password} /><span onClick={()=>this.changePassword('hotlist_password')} className="btn btn-primary">Update</span></div>
      </div>
    ) : '';
    let agenda = (ts_agenda !=='' && ts_agenda !== undefined) ? ts_agenda.map((event)=>{
      event_num++;
      const property_no = 'property_no'+event_num;
      const arrival = 'arrival'+event_num;
      const departure = 'departure'+event_num;
      const address = 'address'+event_num;
      const listing_agt = 'listing_agt'+event_num;
      const est_price = 'est_price'+event_num;
      const est_sq_ft = 'est_sq_ft'+event_num;
      const will_sell = 'will_sell'+event_num;
      const est_live = 'est_live'+event_num;
      const url = 'url'+event_num;
      const listing_url = (event.listing_url) ? event.listing_url : '';
      return(
        <tr className="admin_row">
          <button onClick={this.deleteEvent.bind(this)} id={event_num}>Delete</button>
          <td><textarea ref={property_no} className="table_input" type="text" defaultValue={event.property_no} /></td>
          <td><textarea ref={arrival} className="table_input" type="text" defaultValue={event.arrival}/></td>
          <td><textarea ref={departure} className="table_input" type="text" defaultValue={event.departure}/></td>
          <td><textarea ref={url} className="table_input" type="text" defaultValue={listing_url}/></td>
          <td><textarea ref={address} className="table_input" type="text" defaultValue={event.address}/></td>
          <td><textarea ref={listing_agt} className="table_input" type="text" defaultValue={event.listing_agt}/></td>
          <td><textarea ref={est_price} className="table_input" type="text" defaultValue={event.est_price}/></td>
          <td><textarea ref={est_sq_ft} className="table_input" type="text" defaultValue={event.est_sq_ft}/></td>
          <td><textarea ref={will_sell} className="table_input" type="text" defaultValue={event.will_sell}/></td>
          <td><textarea ref={est_live} className="table_input" type="text" defaultValue={event.est_live}/></td>
        </tr>
      );
    }) : '';


    // This function generates the editable hotlist table for any tour[array] & tour_type[string] of properties passed into it:

    const after_tour_data = (tour, tour_type) => {
      let evt_num = 0;
      return tour.map((event)=>{
      evt_num++;
      console.log('mapping ',tour_type,'events now');
      const address_ref = `${tour_type}_address`+evt_num;
      console.log('after_tour_data address_ref: ',address_ref);
      const listing_agt_ref = `${tour_type}_listing_agt`+evt_num;
      const est_price_ref = `${tour_type}_est_price`+evt_num;
      const est_sq_ft_ref = `${tour_type}_est_sq_ft`+evt_num;
      const will_sell_ref = `${tour_type}_will_sell`+evt_num;
      const est_live_ref = `${tour_type}_est_live`+evt_num;
      const url_ref = `${tour_type}_url`+evt_num;
      console.log('my url_ref: ',url_ref)
      const listing_url = (event.listing_url) ? event.listing_url : '';
      return(
        <tr>
          <button onClick={(e)=>this.deleteAfterTourEvent(e,tour_type)} id={evt_num}>Delete</button>
          <td id="aftertour_address"><textarea ref={address_ref} className="table_input" type="text" defaultValue={event.address}/></td>
          <td id="aftertour_url"><textarea ref={url_ref} className="table_input" type="text" defaultValue={listing_url}/></td>
          <td><textarea ref={listing_agt_ref} className="table_input" type="text" defaultValue={event.listing_agt}/></td>
          <td className="aftertour_price"><textarea ref={est_price_ref} className="table_input" type="text" defaultValue={event.est_price}/></td>
          <td className="aftertour_sqft"><textarea ref={est_sq_ft_ref} className="table_input" type="text" defaultValue={event.est_sq_ft}/></td>
          <td className="aftertour_willsell"><textarea ref={will_sell_ref} className="table_input" type="text" defaultValue={event.will_sell}/></td>
          <td className="aftertour_willsell"><textarea ref={est_live_ref} className="table_input" type="text" defaultValue={event.est_live}/></td>
        </tr>
      );
    });}

    let agenda_date = (this.state.event_date !=='') ? (
      <div className="agenda_date">
        <span>Event date: </span>
        <input type="text" defaultValue={ this.state.event_date } ref="event_date" />
      </div>
    ) : '';
    let slots_avail = (this.state.slots_avail !=='') ? (
      <div className="slots_avail">
        <span>Slots: </span>
        <input type="text" defaultValue={ this.state.slots_avail } ref="slots_avail" />
      </div>
    ) : '';

    logo = (logo) ? logo : '';
    // let logo = (this.state.logo !=='') ? this.state.logo : '';

    let logo_edit = (

      <div className='main_logo flex_col' >
        <div>
            <input className="input-logo" type="text" ref="logo_url" defaultValue={logo} /><span onClick={()=>this.changeLogo()} className="btn btn-primary">Update</span>
          </div>
        <img className="img-responsive" src={logo} alt="affiliate logo" />
      </div>
    );

    footer_logo_url = (this.state.footer_logo_url) ? footer_logo_url : '';

    let footer_logo_edit = (
      <div className='main_logo flex_col' >
        <div>
            <input className="input-logo" type="text" ref="footer_logo_url" defaultValue={footer_logo_url} /><span onClick={()=>this.changeFooterLogo()} className="btn btn-primary">Update</span>
          </div>
        <img className="img-responsive" src={footer_logo_url} alt="affiliate logo" />
      </div>
    );

    const hotlist_header = (
      <tr>
        <th></th>
        <th>Address</th>
        <th>URL</th>
        <th>Listing Agent</th>
        <th className="aftertour_price">Est. Price</th>
        <th className="aftertour_sqft">BR/BA</th>
        <th className="aftertour_willsell">Willing to sell off market?</th>
        <th className="aftertour_est_live">Est. Live Date</th>
      </tr>
    )
    return(
      <div>
        <h1>Welcome to Admin Page!</h1>
        <div className="dropdown_contain">
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Currently Editing &nbsp;
          <span class="caret"></span></button>

          {/* Dropdown to navigate to different areas of admin page: */}

          <ul class="dropdown-menu">
            <li className="dropdown-header">Tour Info:</li>
            <li><a onClick={()=>this.changeView('agenda')} href="#">Agenda</a></li>
            <li><a onClick={()=>this.changeView('dc')} href="#">Hotlist DC</a></li>
            <li><a onClick={()=>this.changeView('va')} href="#">Hotlist VA</a></li>
            <li><a onClick={()=>this.changeView('md')} href="#">Hotlist MD</a></li>
            <li className="divider"></li>
            <li className="dropdown-header">Other:</li>
            <li><a onClick={()=>this.changeView('passwords')} href="#">Passwords</a></li>
            <li><a onClick={()=>this.changeView('next_tour')} href="#">Next Tour</a></li>
            <li><a onClick={()=>this.changeView('footer_logo')} href="#">Footer Logo</a></li>
            <li><a onClick={()=>this.changeView('sponsored_by')} href="#">Sponsored By</a></li>
            <li><a onClick={()=>this.changeView('guest_slots_full')} href="#">Guest Slots Full</a></li>
          </ul>
        </div>
        </div>
        <div>
        {
        currently_editing=='agenda' && (
            <div>
              <div className="host_title">
                AGENDA
              </div>
              { agenda_date }
              { slots_avail }
              <section className="agenda_table_container">
                <table className="agenda_table admin_agenda_table admin_container">
                  <tbody>
                    <tr>
                      <th></th>
                      <th>Property No.</th>
                      <th>Arrival</th>
                      <th>Departure</th>
                      <th>Listing URL</th>
                      <th>Address</th>
                      <th>Listing Agent</th>
                      <th>Est. Price</th>
                      <th>BR/BA</th>
                      <th>Willing to sell off market?</th>
                      <th>Est. Live Date</th>
                    </tr>
                    { agenda }
                </tbody>
                <button className="add_event" onClick={this.addEvent.bind(this)}>Add Row</button><span className="add_event">(Press Update after adding event information)</span>
                </table>
              </section>
                <span onClick={this.submitEvent.bind(this)} className="main_submit adm_submit">UPDATE</span>
                <span onClick={()=>window.print()} className="main_submit">PRINT</span>
            </div>
        )}
        {
          currently_editing=='guest_slots_full' && (
            <div className="dropdown_contain">
              <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Guest Slots Full &nbsp;
              <span className="caret"></span></button>
              <ul className="dropdown-menu">
                <li className="dropdown-header">Pick One:</li>
                <li><a onClick={()=>this.hideGuestSlots('on')} href="#">On</a></li>
                <li><a onClick={()=>this.hideGuestSlots('off')} href="#">Off</a></li>
              </ul>
              </div>
            </div>
          )
        }
        {
          currently_editing=='passwords' && (
            <div>
              <h1>Passwords</h1>
              { passwords }
            </div>
        )}
        {
          currently_editing=='next_tour' && (
            <div>
              { next_tour_date }
            </div>
        )}
        {
          currently_editing == 'sponsored_by' && (
            <section className="logo-area">
              <h2>Sponsored by</h2>
              {logo_edit}
            </section>
        )}
        { currently_editing=='footer_logo' && (
          <section className="logo-area">
            <h2>Footer Logos</h2>
            {footer_logo_edit}
          </section>)}
        {(currently_editing=='dc' || currently_editing == 'va' || currently_editing == 'md') &&
          (<div className="host_title">
            HOT LIST
          </div>
        )}
          {/*DC Hotlist*/}
          {currently_editing == 'dc' && (
            <section className="agenda_table_container">
              <table className="agenda_table admin_agenda_table admin_container">
                <tbody>
                <div className="row_header">DC</div>
                  { hotlist_header }
                  { after_tour_data(after_tour,'after_tour') }
                </tbody>
                <button className="add_event" onClick={()=>this.addAfterTourEvent('after_tour')}>Add Row</button><span className="add_event">(Press Update after adding event information)</span>
              </table><br/>
              <span onClick={()=>this.submitAfterTourEvent('after_tour')} className="main_submit adm_submit">UPDATE DC</span>
            </section>
          )}
          {/*Maryland Hotlist:*/}
          {currently_editing=='md' && (
            <section className="agenda_table_container">
              <table className="agenda_table admin_agenda_table admin_container">
                <tbody>
                <div className="row_header">MD</div>
                  { hotlist_header }
                  { after_tour_data(after_tour_md,'after_tour_md') }
                </tbody>
                <button className="add_event" onClick={()=>this.addAfterTourEvent('after_tour_md')}>Add Row</button><span className="add_event">(Press Update after adding event information)</span>
              </table><br/>
              <span onClick={()=>this.submitAfterTourEvent('after_tour_md')} className="main_submit adm_submit">UPDATE MD</span>
            </section>
          )}
          {/*Virginia Hotlist:*/}
          {currently_editing=='va' && (
            <section className="agenda_table_container">
              <table className="agenda_table admin_agenda_table admin_container">
                <tbody>
                <div className="row_header">VA</div>
                  { hotlist_header }
                  { after_tour_data(after_tour_va,'after_tour_va') }
                </tbody>
                <button className="add_event" onClick={()=>this.addAfterTourEvent('after_tour_va')}>Add Row</button><span className="add_event">(Press Update after adding event information)</span>
              </table><br/>
              <span onClick={()=>this.submitAfterTourEvent('after_tour_va')} className="main_submit adm_submit">UPDATE VA</span>
            </section>
          )}
          <div className="bottom_buffer"></div>
        </div>
      </div>

          );
        }
      }
