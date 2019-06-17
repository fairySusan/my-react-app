import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Home from './home';
import { connect } from 'react-redux'
import Login from './views/login';

class App extends Component {

  render() {
    const isLogin = sessionStorage.getItem('token') ? true : false;
    console.log(isLogin);
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}></Route> 
          <Route path="/" render= {() => (
            isLogin ? (
              <Home></Home>
            ) : (
              <Redirect to="/login"></Redirect>
            )
          )}></Route>
        </Switch>
      </Router>
    )
  }
}
const mapStateToProps = state => {
  return { profile: state.profile }
}
export default withRouter(connect(mapStateToProps)(App));