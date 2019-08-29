import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import * as regExpConfig from '../config/regExp';
import * as api from '../apis/mockApi';
import { connect } from 'react-redux'
import {setProfile} from '../redux/actions/index';
import Logo from '../componets/logo/logo';
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'susan',
      password: 199632
    }
  }
  loginSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err) {
        api.login(values).then(res => {
          if (res.succeed) {
            this.props.dispatch(setProfile(res.data));
            this.props.history.replace('/')
          } else {
            message.error(res.message);
          }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login-page">
        <div className="react-bg">
          <div className="react">
            MANAGE
          </div>
        </div>
        <div className="login-form">
          <Form>
            <Form.Item>
              {getFieldDecorator('username', { initialValue: 'susan' }, {
                rules: [
                  {require:true, min: 4, max: 10, message: '用户名为4-10个字符'},
                  {pattern: regExpConfig.policeNo, message: '账号由4-10位数字或字母组成'}
                ]
              })(
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Username"
              ></Input>
              )}
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', { initialValue: 199632 }, {
                  rules: [
                    {require: true, message: '请输入密码'},
                    {pattern: regExpConfig.pwd, message: '密码由6-10位数字或字母组成'}
                  ]
                })(
                  <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                ></Input>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block={true} className="login-form-button"
              onClick={this.loginSubmit}
              >登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(withRouter(connect()(login)));