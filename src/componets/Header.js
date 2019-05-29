import React, { Component } from 'react'
import { Menu, Dropdown, Button, Modal, message, Icon, Row, Col } from 'antd';
import logoIcon from '../images/logo.png';
export default class Header extends Component {
  render() {
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <Row>
            <Col span={20}>
              <div className="brand">
                <img className="brand-logo" src={logoIcon} alt="logo"/>
                <span className="brand-text">R e a c t</span>
              </div>
            </Col>
            <Col span={4}></Col>
          </Row>
        </div>
      </header>
    )
  }
}
