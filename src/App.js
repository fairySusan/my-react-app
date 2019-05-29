import React, { Component } from 'react';
import './App.css';
import { message, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Header from './componets/Header';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div id="container">
          <Header></Header>
        </div>
      </LocaleProvider>
    )
  }
}
