import React from 'react'
import { Router, Route, IndexRoute,/* , Redirect */ } from 'react-router'
import App from './App'
import profile from './views/profile'
import UserManange from './views/user-manage';
import socketPage from './views/socket';
import login from './views/login';
export default () => (
  <Router>
    <Route path="" component={App}>
      <Route path="/"  exact component={profile}></Route>
      <Route path="/socket" component={socketPage}></Route>
      <Route path="/set/userManage" component={UserManange}></Route>
    </Route>
    <Route path="/login" component={login}></Route>
  </Router>
)