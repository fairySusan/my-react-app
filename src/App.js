import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './home';
import Login from './views/login';

export default class App extends Component {

  render() {
    return (
      <Router>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login"  component={Login}></Route>
      </Router>
    )
  }
}
