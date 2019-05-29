import React, { Component } from 'react';
import './App.css';
import { message, LocaleProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Header from './componets/Header';
import SiderBar from './componets/siderBar';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Layout id="container">
          <Header></Header>
          <SiderBar></SiderBar>
        </Layout>
      </LocaleProvider>
    )
  }
}
