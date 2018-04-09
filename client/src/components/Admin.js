import React, { Component } from 'react';
import axios from 'axios';
const url = 'http://www.comingsoontour.com';
// const url = 'http://localhost:8080';

export default class Admin extends Component{
  constructor(props){
    super(props);
    this.state={
      host_password:'',
      guest_password:'',
      agenda:'',
      after_tour:'',
      event_date:'',
      slots_avail:'',
      logo:''
    }
  }
  componentDidMount(){
    axios.get(url+'/info/admin_info').then((admin)=>{
      console.log('admin info: ',admin.data);
      const d = admin.data[0];
      this.setState({
        host_password:d.host_password,
        guest_password:d.guest_password,
        admin_password:d.admin_password,
        agenda:d.agenda,
        after_tour:d.after_tour,
        event_date:d.event_date,
        slots_avail:d.slots_available,
        logo:d.logo_url
      })
    }).catch((err)=>{
      console.log('err - ',err);
    })
  }
  submitEvent(){
    let event_num = 0;
    let agenda = [];
    let event_date = this.refs.event_date.value;
    let slots_avail = this.refs.slots_avail.value.toString();
    for(let i=1; i<5; i++){
      let property_no = 'property_no'+i;
      let arrival = 'arrival'+i;
      let departure = 'departure'+i;
      let address = 'address'+i;
      let listing_agt = 'listing_agt'+i;
      let est_price = 'est_price'+i;
      let est_sq_ft = 'est_sq_ft'+i;
      let will_sell = 'will_sell'+i;
      property_no = this.refs[property_no].value;
      arrival = this.refs[arrival].value;
      departure = this.refs[departure].value;
      address = this.refs[address].value;
      listing_agt = this.refs[listing_agt].value;
      est_price = this.refs[est_price].value;
      est_sq_ft = this.refs[est_sq_ft].value;
      will_sell = this.refs[will_sell].value;
      let items = {
        property_no,
        arrival,
        departure,
        address,
        listing_agt,
        est_price,
        est_sq_ft,
        will_sell
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
      let listing_agt = 'at_listing_agt'+i;
      let est_price = 'at_est_price'+i;
      let est_sq_ft = 'at_est_sq_ft'+i;
      let will_sell = 'at_will_sell'+i;
      address = this.refs[address].value;
      listing_agt = this.refs[listing_agt].value;
      est_price = this.refs[est_price].value;
      est_sq_ft = this.refs[est_sq_ft].value;
      will_sell = this.refs[will_sell].value;
      let items = {
        address,
        listing_agt,
        est_price,
        est_sq_ft,
        will_sell
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
    let after_tour = this.state.after_tour.slice();
    console.log('after_tour - ',after_tour);
    if(after_tour.length===1){
      after_tour=[];
    }else{
      after_tour.splice(event,1);
    }
    console.log(after_tour)
    const data = {
      after_tour
    }
    if(window.confirm('Are you sure?')){
        axios.post(url+'/info/update_after_tour_event',data).then((response)=>{
        console.log('success -',response)
        if(response.data ==='success'){
          this.setState({
            after_tour
          });
        }
      }).catch((err)=>[
        console.log('err - ',err)
      ]);
    }
  }
  updateAfterTourEvent(){

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
      if(response.data.message === 'success'){
        alert('your logo has been updated');
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
      arrival:"",
      departure:"",
      est_price:"",
      est_sq_ft:"",
      listing_agt:"",
      property_no:"",
      will_sell:""
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
      arrival:"",
      departure:"",
      est_price:"",
      est_sq_ft:"",
      listing_agt:"",
      property_no:"",
      will_sell:""
    });
    this.setState({
      after_tour
    })
  }
  render(){
    let event_num = 0;
    let at_event_num = 0;
    let ts_agenda = this.state.agenda;
    let ts_after_tour = this.state.after_tour;
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
      return(
        <tr>
          <button onClick={this.deleteEvent.bind(this)} id={event_num}>Delete</button>
          <td><textarea ref={property_no} className="table_input" type="text" defaultValue={event.property_no} /></td>
          <td><textarea ref={arrival} className="table_input" type="text" defaultValue={event.arrival}/></td>
          <td><textarea ref={departure} className="table_input" type="text" defaultValue={event.departure}/></td>
          <td><textarea ref={address} className="table_input" type="text" defaultValue={event.address}/></td>
          <td><textarea ref={listing_agt} className="table_input" type="text" defaultValue={event.listing_agt}/></td>
          <td><textarea ref={est_price} className="table_input" type="text" defaultValue={event.est_price}/></td>
          <td><textarea ref={est_sq_ft} className="table_input" type="text" defaultValue={event.est_sq_ft}/></td>
          <td><textarea ref={will_sell} className="table_input" type="text" defaultValue={event.will_sell}/></td>
        </tr>
      );
    }) : '';
    let after_tour = (ts_after_tour !=='' && ts_after_tour !== undefined) ? ts_after_tour.map((event)=>{
      at_event_num++;
      const address = 'at_address'+at_event_num;
      const listing_agt = 'at_listing_agt'+at_event_num;
      const est_price = 'at_est_price'+at_event_num;
      const est_sq_ft = 'at_est_sq_ft'+at_event_num;
      const will_sell = 'at_will_sell'+at_event_num;
      return(
        <tr>
          <button onClick={this.deleteAfterTourEvent.bind(this)} id={at_event_num}>Delete</button>
          <td><textarea ref={address} className="table_input" type="text" defaultValue={event.address}/></td>
          <td><textarea ref={listing_agt} className="table_input" type="text" defaultValue={event.listing_agt}/></td>
          <td><textarea ref={est_price} className="table_input" type="text" defaultValue={event.est_price}/></td>
          <td><textarea ref={est_sq_ft} className="table_input" type="text" defaultValue={event.est_sq_ft}/></td>
          <td><textarea ref={will_sell} className="table_input" type="text" defaultValue={event.will_sell}/></td>
        </tr>
      );
    }) : '';
    // if(ts_agenda !=='' && ts_agenda.length<4){
    //   let i = ts_agenda.length;
    //   console.log('i: ',i)
    //   while(i<4){
    //     i++;
    //     const property_no = 'property_no'+i;
    //     const arrival = 'arrival'+i;
    //     const departure = 'departure'+i;
    //     const address = 'address'+i;
    //     const listing_agt = 'listing_agt'+i;
    //     const est_price = 'est_price'+i;
    //     const est_sq_ft = 'est_sq_ft'+i;
    //     const will_sell = 'will_sell'+i;
    //     agenda.push(
    //       <tr>
    //         <td><input ref={property_no} className="table_input" type="text"  /></td>
    //         <td><input ref={arrival} className="table_input" type="text" /></td>
    //         <td><input ref={departure} className="table_input" type="text" /></td>
    //         <td><input ref={address} className="table_input" type="text" /></td>
    //         <td><input ref={listing_agt} className="table_input" type="text" /></td>
    //         <td><input ref={est_price} className="table_input" type="text" /></td>
    //         <td><input ref={est_sq_ft} className="table_input" type="text" /></td>
    //         <td><input ref={will_sell} className="table_input" type="text" /></td>
    //       </tr>
    //     );
    //   }
    // }
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

    let logo = this.state.logo;

    const logo_edit = (logo) ? (
      <div>
        <input className="input-logo" type="text" ref="logo_url" defaultValue={logo} /><span onClick={()=>this.changeLogo()} className="btn btn-primary">Update</span>
      </div>
    ) : '';
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
            <table className="agenda_table admin_agenda_table">
              <tbody>
                <tr>
                  <th></th>
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
            <button className="add_event" onClick={this.addEvent.bind(this)}>Add Row</button><span className="add_event">(Press Update after adding event information)</span>
            </table>
          </section>
            <span onClick={this.submitEvent.bind(this)} className="main_submit adm_submit">UPDATE</span>
            <span onClick={()=>window.print()} className="main_submit">PRINT</span>
          <h1>Passwords</h1>
            { passwords }
          <section className="logo-area">
            <h2>Sponsored by</h2>
            <div className='main_logo flex_col' >
              {logo_edit}
              <img className="img-responsive" src={logo} alt="affiliate logo" />
            </div>
          </section>
          <div className="host_title">
            AFTER TOUR
          </div>
          <section className="agenda_table_container">
            <table className="agenda_table admin_agenda_table">
              <tbody>
                <tr>
                  <th></th>
                  <th>Address</th>
                  <th>Listing Agent</th>
                  <th>Est. Price</th>
                  <th>Est. Sq. Ft</th>
                  <th>Willing to sell off market?</th>
                </tr>
                { after_tour }
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
