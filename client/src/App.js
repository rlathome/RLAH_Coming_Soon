import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import HostMap from './components/HostMap';
import Hotlist from './components/Hotlist';
import GuestLoginReact from './components/GuestLoginReact';
import Login from './components/Login';
import GuestRegistration from './components/GuestRegistration';
import HostRegistration from './components/HostRegistration';
import Agenda from './components/Agenda';
import Admin from './components/Admin';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';


const fakeGuestAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    fakeHostAuth.isAuthenticated = false;
    fakeAdminAuth.isAuthenticated = false;
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const fakeHostAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    fakeAdminAuth.isAuthenticated = false;
    fakeGuestAuth.isAuthenticated = false;
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const fakeAdminAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    fakeGuestAuth.isAuthenticated = false;
    fakeHostAuth.isAuthenticated = false;
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const fakeHotlistAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    fakeAdminAuth.isAuthenticated = false;
    fakeGuestAuth.isAuthenticated = false;
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class GuestLogin extends Component{
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeGuestAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render(){
    const {from} = this.props.location.state || { from:{pathname:'/'}}
    const {redirectToReferrer} = this.state;
    if(redirectToReferrer===true){
      console.log('it is true: ',from.pathname);
      return <Redirect to={from.pathname} />
    }
    return(
        <Login type='guest' login = {this.login} />
    );
  }
}

class HostLogin extends Component{
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeHostAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render(){
    const {from} = this.props.location.state || { from:{pathname:'/'}}
    const {redirectToReferrer} = this.state;
    if(redirectToReferrer===true){
      console.log('it is true: ',from.pathname);
      return <Redirect to={from.pathname} />
    }
    return(
        <Login type='host' login = {this.login} />
    );
  }
}

class HotlistLogin extends Component{
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeHotlistAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render(){
    const {from} = this.props.location.state || { from:{pathname:'/'}}
    const {redirectToReferrer} = this.state;
    if(redirectToReferrer===true){
      console.log('it is true: ',from.pathname);
      return <Redirect to={from.pathname} />
    }
    return(
        <Login type='hotlist' login = {this.login} />
    );
  }
}

class AdminLogin extends Component{
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAdminAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render(){
    const {from} = this.props.location.state || { from:{pathname:'/'}}
    const {redirectToReferrer} = this.state;
    if(redirectToReferrer===true){
      console.log('it is true: ',from.pathname);
      return <Redirect to={from.pathname} />
    }
    return(
      <Login type='admin' login = {this.login} />
    );
  }
}

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return(
    fakeGuestAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login/guest',
          state: { from: props.location }
        }} />
  )}} />
)
const HostRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return(
    fakeHostAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login/host',
          state: { from: props.location }
        }} />
  )}} />
)

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return(
    fakeAdminAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/admin_login',
          state: { from: props.location }
        }} />
  )}} />
)
const HotlistRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return(
    fakeHotlistAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login/hotlist',
          state: { from: props.location }
        }} />
  )}} />
)

class App extends Component {
  state = {
    loggedInAsGuest:false,
    loggedInAsHost:false
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path='/guest' component = { Header } />
            <Route exact path='/' component = { Home } />
            <Route exact path='/host' component = { Header } />
            <Route exact path='/host/registration/:addr' component = { Header } />
            {/* <Route path='/agenda' component = { Header } /> */}
            <Route path='/login/guest' component = { GuestLogin } />
            <Route path='/login/host' component = { HostLogin } />
            <Route path='/login/hotlist' component = { HotlistLogin } />
            <Route path='/admin_login' component = { AdminLogin } />

            <Route exact path='/admin' component = { Header } />
            <Route path='/admin' component = { Admin } />
            {/*<AdminRoute path='/admin' component = { Admin } />*/}

            <Route exact path='/guest' component = { GuestRegistration } />
            {/* <GuestRoute exact path='/guest' component = { GuestRegistration } /> */}

            <Route exact path='/host' component = { HostMap } />
            <Route path='/host/registration/:addr' component = { HostRegistration } />
            {/* <HostRoute exact path='/host' component = { HostMap } />
            <HostRoute path='/host/registration/:addr' component = { HostRegistration } /> */}

            <Route exact path='/agenda' component = { Header } />
            <Route path='/agenda' component = { Agenda }/>

            <Route exact path='/hotlist' component = { Header } />
            {/*<HotlistRoute path='/hotlist' component = { Hotlist } />*/}
            <Route path='/hotlist' component = { Hotlist }/>
            {/* <Route path='/' component = { Footer } /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
