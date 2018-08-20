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
      agenda:'',
      after_tour:[],
      event_date:'',
      slots_avail:'',
      logo:'',
      next_tour:'',
      footer_logo_url:'',
      footer_logo_edit:''
    }
    this.dataService = new DataService();
  }
  componentDidMount(){
    this.dataService.getAdminInfo(this.footerLogoEdit).then(res=>this.setState(res));
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
  submitAfterTourEvent(){
    let event_num = 0;
    let agenda = [];
    let amount = this.state.after_tour.length;
    for(let i=1; i<=amount; i++){
      let address = 'at_address'+i;
      let listing_url = 'at_url'+i
      let listing_agt = 'at_listing_agt'+i;
      let est_price = 'at_est_price'+i;
      let est_sq_ft = 'at_est_sq_ft'+i;
      let will_sell = 'at_will_sell'+i;
      let est_live = 'at_est_live'+i;
      address = this.refs[address].value;
      listing_agt = this.refs[listing_agt].value;
      listing_url = this.refs[listing_url].value;
      est_price = this.refs[est_price].value;
      est_sq_ft = this.refs[est_sq_ft].value;
      will_sell = this.refs[will_sell].value;
      est_live = this.refs[est_live].value;
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
    const after_tour = agenda;
    axios.post(url+'/info/update_after_tour_event',{after_tour}).then((response)=>{
      console.log('success: ',response);
      alert('your after tour agenda has been updated');
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
  deleteAfterTourEvent(e){
    let event = (e.target.id !=='0') ? parseInt(e.target.id)-1 : 0;

    console.log('deleting - ',event)
    let after_tour = this.state.after_tour.slice();
    // console.log('after_tour - ',after_tour);
    if(after_tour.length===1){
      after_tour=[];
    }else{
      after_tour.splice(event,1);
    }
    console.log(after_tour)
    const data = {
      after_tour
    }
    console.log('saving - ',data)
    if(window.confirm('Are you sure?')){
        axios.post(url+'/info/update_after_tour_event',data).then((response)=>{
        console.log('success -',response)
        window.alert('Your row has been deleted')
        this.setState({
          after_tour:[]
        });
        this.dataService.getAdminInfo(this.footerLogoEdit).then(res=>this.setState(res));
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
    })
  }
  addAfterTourEvent(){
    let after_tour = this.state.after_tour;
    console.log(after_tour)
    after_tour.push({
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
      after_tour
    })
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
  render(){
    let { logo, footer_logo_url, after_tour } = this.state;
    console.log('footer logo: ',footer_logo_url);
    // const footer_logo_url = (this.state.footer_logo_url !== '')
    // const logo = (this.state.logo !=='') ? this.state.logo : '';
    // const footer_logo_url = (this.state.footer_logo_url !== '') ? this.state.footer_logo_url : '';
    let event_num = 0;
    let at_event_num = 0;
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
    const after_tour_data = after_tour.map((event)=>{
      at_event_num++;
      const address = 'at_address'+at_event_num;
      const listing_agt = 'at_listing_agt'+at_event_num;
      const est_price = 'at_est_price'+at_event_num;
      const est_sq_ft = 'at_est_sq_ft'+at_event_num;
      const will_sell = 'at_will_sell'+at_event_num;
      const est_live = 'at_est_live'+at_event_num;
      const url = 'at_url'+at_event_num;
      const listing_url = (event.listing_url) ? event.listing_url : '';
      return(
        <tr>
          <button onClick={this.deleteAfterTourEvent.bind(this)} id={at_event_num}>Delete</button>
          <td id="aftertour_address"><textarea ref={address} className="table_input" type="text" defaultValue={event.address}/></td>
          <td id="aftertour_url"><textarea ref={url} className="table_input" type="text" defaultValue={listing_url}/></td>
          <td><textarea ref={listing_agt} className="table_input" type="text" defaultValue={event.listing_agt}/></td>
          <td className="aftertour_price"><textarea ref={est_price} className="table_input" type="text" defaultValue={event.est_price}/></td>
          <td className="aftertour_sqft"><textarea ref={est_sq_ft} className="table_input" type="text" defaultValue={event.est_sq_ft}/></td>
          <td className="aftertour_willsell"><textarea ref={will_sell} className="table_input" type="text" defaultValue={event.will_sell}/></td>
          <td className="aftertour_willsell"><textarea ref={est_live} className="table_input" type="text" defaultValue={event.est_live}/></td>
        </tr>
      );
    });

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
    // let footer_logo_edit = this.state.footer_logo_edit;
    return(
      <div>
        <h1>Welcome to Admin Page!</h1>

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
                  <th>Estimated Sq. Ft</th>
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
          <h1>Passwords</h1>
            { passwords }
            { next_tour_date }
          <section className="logo-area">
            <h2>Sponsored by</h2>
            {logo_edit}
          </section>
          <section className="logo-area">
            <h2>Footer Logos</h2>
            {footer_logo_edit}
          </section>
          <div className="host_title">
            HOT LIST
          </div>
          <section className="agenda_table_container">
            <table className="agenda_table admin_agenda_table admin_container">
              <tbody>
                <tr>
                  <th></th>
                  <th>Address</th>
                  <th>URL</th>
                  <th>Listing Agent</th>
                  <th className="aftertour_price">Est. Price</th>
                  <th className="aftertour_sqft">Est. Sq. Ft</th>
                  <th className="aftertour_willsell">Willing to sell off market?</th>
                  <th className="aftertour_est_live">Est. Live Date</th>
                </tr>
                { after_tour_data }
            </tbody>
            <button className="add_event" onClick={this.addAfterTourEvent.bind(this)}>Add Row</button><span className="add_event">(Press Update after adding event information)</span>
          </table><br/>
            <span onClick={this.submitAfterTourEvent.bind(this)} className="main_submit adm_submit">UPDATE</span>
          </section>
          <div className="bottom_buffer"></div>
        </div>
      </div>

          );
        }
      }
