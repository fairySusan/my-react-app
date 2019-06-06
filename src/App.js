import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Home from './home';
import Login from './views/login';

class App extends Component {

  render() {
    const isLogin = sessionStorage.getItem('userInfo') ? true : false;
    console.log(isLogin, 'ssss');
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
export default withRouter(App);