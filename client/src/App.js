import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import GuestRegistration from './components/GuestRegistration';
import HostRegistration from './components/HostRegistration';
import Admin from './components/Admin';
import Footer from './components/Footer';
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
      <div>
        Welcome to Guest Login!
        <button onClick={()=>this.login()} >Login</button>
      </div>
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
      <div>
        Welcome to Host Login!
        <button onClick={()=>this.login()} >Login</button>
      </div>
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
      <div>
        Welcome to Admin Login!
        <button onClick={()=>this.login()} >Login</button>
      </div>
    );
  }
}

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return(
    fakeGuestAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/guest_login',
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
          pathname: '/host_login',
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

class App extends Component {
  state = {
    loggedInAsGuest:false,
    loggedInAsHost:false
  }
  render() {
    return (
      <div>
        <Header/>
        <Router>
          <div>
            <Route exact path='/' component = { Home } />
            <Route path='/' component = { Footer } />
            <Route path='/guest_login' component = { GuestLogin } />
            <Route path='/host_login' component = { HostLogin } />
            <Route path='/admin_login' component = { AdminLogin } />
            <GuestRoute path='/guest_reg' component = { GuestRegistration } />
            <HostRoute path='/host_reg' component = { HostRegistration } />
            <AdminRoute path='/admin' component = { Admin } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
