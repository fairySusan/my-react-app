import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Home from './home';
import { connect } from 'react-redux'
import Login from './views/login';

class App extends Component {

  render() {
    const isLogin = this.props.profile ? true : false;
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route> 
          <Route path="/" component={Home} render= {() => (
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