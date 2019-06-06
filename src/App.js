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
          <Route path="/" exact render={() => (
            isLogin ? (
              <Home/>
            ) : (<Redirect to='/login'/>)
          )}></Route>
          <Route path="/login"  component={Login}></Route>
        </Switch>
      </Router>
    )
  }
}
const mapStateToProps = state => {
  return { profile: state.profile }
}
export default withRouter(connect(mapStateToProps)(App));