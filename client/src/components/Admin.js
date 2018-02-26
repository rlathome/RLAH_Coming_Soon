import React, { Component } from 'react';
import axios from 'axios';
const url = 'https://polar-waters-86989.herokuapp.com/';

export default class Admin extends Component{
  constructor(props){
    super(props);
    this.state={
      host_password:'',
      guest_password:'',
      agenda:'',
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
    axios.post('http://localhost:8080/info/submitagenda',{agenda,event_date,slots_avail}).then((response)=>{
      console.log('success: ',response);
      alert('your agenda has been updated');
    }).catch((err)=>{
      console.log('err - ',err);
    });
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
    axios.post('http://localhost:8080/info/change_password',data).then((response)=>{
      console.log('success: ',response);
      alert('your password has been updated');
    }).catch((err)=>{
      console.log('err - ',err);
    });
  }
  render(){
    let event_num = 0;
    let ts_agenda = this.state.agenda;
    let passwords = (this.state.guest_password !=='') ? (
      <div>
        <div className="admin_passwords">Host password: <input ref="host_pass" type="text" defaultValue={this.state.host_password} /><span onClick={()=>this.changePassword('host_password')} className="btn btn-primary">Update</span></div>
        <div className="admin_passwords">Guest password: <input ref="guest_pass" type="text" defaultValue={this.state.guest_password} /><span onClick={()=>this.changePassword('guest_password')} className="btn btn-primary">Update</span></div>
        <div className="admin_passwords">Admin password: <input ref="admin_pass" type="text" defaultValue={this.state.admin_password} /><span onClick={()=>this.changePassword('admin_password')} className="btn btn-primary">Update</span></div>
      </div>
    ) : '';
    let agenda = (ts_agenda !=='') ? ts_agenda.map((event)=>{
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
          <td><input ref={property_no} className="table_input" type="text" defaultValue={event.property_no} /></td>
          <td><input ref={arrival} className="table_input" type="text" defaultValue={event.arrival}/></td>
          <td><input ref={departure} className="table_input" type="text" defaultValue={event.departure}/></td>
          <td><input ref={address} className="table_input" type="text" defaultValue={event.address}/></td>
          <td><input ref={listing_agt} className="table_input" type="text" defaultValue={event.listing_agt}/></td>
          <td><input ref={est_price} className="table_input" type="text" defaultValue={event.est_price}/></td>
          <td><input ref={est_sq_ft} className="table_input" type="text" defaultValue={event.est_sq_ft}/></td>
          <td><input ref={will_sell} className="table_input" type="text" defaultValue={event.will_sell}/></td>
        </tr>
      );
    }) : '';
    if(ts_agenda !=='' && ts_agenda.length<4){
      let i = ts_agenda.length;
      console.log('i: ',i)
      while(i<4){
        i++;
        const property_no = 'property_no'+i;
        const arrival = 'arrival'+i;
        const departure = 'departure'+i;
        const address = 'address'+i;
        const listing_agt = 'listing_agt'+i;
        const est_price = 'est_price'+i;
        const est_sq_ft = 'est_sq_ft'+i;
        const will_sell = 'will_sell'+i;
        agenda.push(
          <tr>
            <td><input ref={property_no} className="table_input" type="text"  /></td>
            <td><input ref={arrival} className="table_input" type="text" /></td>
            <td><input ref={departure} className="table_input" type="text" /></td>
            <td><input ref={address} className="table_input" type="text" /></td>
            <td><input ref={listing_agt} className="table_input" type="text" /></td>
            <td><input ref={est_price} className="table_input" type="text" /></td>
            <td><input ref={est_sq_ft} className="table_input" type="text" /></td>
            <td><input ref={will_sell} className="table_input" type="text" /></td>
          </tr>
        );
      }
    }
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
            <span onClick={this.submitEvent.bind(this)} className="main_submit adm_submit">UPDATE</span>
            <span onClick={()=>window.print()} className="main_submit">PRINT</span>
          <h1>Passwords</h1>
            { passwords }
          <section className="sponsored_by">
            <h2>Sponsored By</h2>
            <div className='main_logo' >

              <img className="img-responsive" src={logo} alt="affiliate logo" />
            </div>
          </section>
        </div>
      </div>

          );
        }
      }
