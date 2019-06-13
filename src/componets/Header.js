import React, { Component } from 'react'
import {Row, Col } from 'antd';
import { connect } from 'react-redux'
import { clearProfile, openUserInfo} from '../redux/actions/index';
import logoIcon from '../images/logo.png';
import userIcon from '../images/user.png';
class Header extends Component {
  loginOut = () => {
    this.props.dispatch(clearProfile())
  }
  showProfile = () => {
    this.props.dispatch(openUserInfo())
  }
  render() {
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <Row>
            <Col span={21}>
              <div className="brand">
                <img className="brand-logo" src={logoIcon} alt="logo" width="40" height="29"/>
                <span className="brand-text">R e a c t</span>
              </div>
            </Col>
            <Col span={3}>
              <ul className="user-info">
                <li>
                  <img src={userIcon} alt="管理员"/>
                </li>
                <li>
                  <span onClick={this.showProfile}>管理员</span>
                </li>
                <li>
                  <a onClick={this.loginOut} href="/login">退出</a>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </header>
    )
  }
}
export default connect()(Header);