import React, { Component } from 'react';
import { Form, Input } from 'antd';
class login extends Component {

  render() {
    return (
      <div id="login-page">
        <div className="react-bg">
        </div>
        <div className="login-form">
          <Form>
            <Form.Item>
              <Input></Input>
            </Form.Item>
            <Form.Item>
              <Input></Input>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
export default login;