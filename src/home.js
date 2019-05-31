import React, { Component } from 'react';
import './App.css';
import {LocaleProvider, Layout } from 'antd';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Header from './componets/Header';
import SiderBar from './componets/siderBar';
import Profile from './views/profile';
import UserManange from './views/user-manage';
import socketPage from './views/socket';

export default class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Layout id="container">
          <Router>
            <Header></Header>
            <Layout id="sub-container">
              <SiderBar></SiderBar>
              <Layout>
                  <div className="content">
                    <Route path="/" exact component={Profile}></Route>
                    <Route path="/socket" component={socketPage}></Route>
                    <Route path="/set/userManage" component={UserManange}></Route>
                  </div>
              </Layout>
            </Layout>
          </Router>
        </Layout>
      </LocaleProvider>
    )
  }
}
