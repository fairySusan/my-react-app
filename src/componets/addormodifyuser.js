import React, { Component } from "react";
import { connect } from 'react-redux'
import { Drawer, Form, Input, Select, Button } from "antd";
import { closeUserInfoModal } from '../redux/actions/index';
const { Option } = Select;
class userInfoModal extends Component {
  onClose = () => {
    this.props.dispatch(closeUserInfoModal())
  }
  renderOptions = () => {
    const options = [{
      label: '超级管理员',
      value: 0
    },{
      label: '开发账号',
      value: 1
    },{
      label: '测试',
      value: 2
    },{
      label: '演示账号',
      value: 3
    }]
    return options.map((item, index) => {
      return <Option key={item.value}>{item.label}</Option>;
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <div id="userInfo-modal">
        <Drawer
        title="新增"
        placement="right"
        width={400}
        closable={false}
        onClose={this.onClose}
        visible={this.props.visible}>
          <Form {...formItemLayout}>
            <Form.Item label="姓名">
            {
              getFieldDecorator('name', {
                rules: [{require: true, message: '请输入姓名'}]
              })(
                <Input
                placeholder="请输入姓名"
                ></Input>
              )
            }
            </Form.Item>
            <Form.Item label="身份证">
            {
              getFieldDecorator('ID', {
                rules: [
                  {require: true, message: '请输入身份证号码'}
                ]
              })(
                <Input 
                placeholder="请输入身份证号码"
                ></Input>
              )
            }
            </Form.Item>
            <Form.Item label="警号">
            {
              getFieldDecorator('policeID')(
                <Input 
                placeholder="请输入警号"
                ></Input>
              )
            }
            </Form.Item>
            <Form.Item label="登录用户">
            {
              getFieldDecorator('loginID', {
                rules: [
                  {require: true, message: '请输入登录用户名'}
                ]
              })(
                <Input 
                placeholder="请输入登录用户名"
                ></Input>
              )
            }
            </Form.Item>
            <Form.Item label="登录密码">
            {
              getFieldDecorator('loginpwd', {
                rules: [
                  {require: true, message: '请输入登录密码'}
                ]
              })(
                <Input 
                placeholder="请输入登录密码"
                ></Input>
              )
            }
            </Form.Item>
            <Form.Item label="手机号">
            {
              getFieldDecorator('telenumber', {
                rules: [
                  {require: true, message: '请输入手机号码'}
                ]
              })(
                <Input 
                placeholder="请输入手机号码"
                ></Input>
              )
            }
            </Form.Item>
            <Form.Item label="职务">
            {
              getFieldDecorator('position')(
                <Input 
                placeholder="请输入职务"
                ></Input>
              )
            }
            </Form.Item>
            <Form.Item label="角色">
            {
              getFieldDecorator('role', {
                rules: [
                  {require: true, message: '请输入角色'}
                ]
              })(
                <Select 
                mode="multiple"
                placeholder="请输入角色"
                >
                { this.renderOptions() }
                </Select>
              )
            }
            </Form.Item>
          </Form>
          <div id="form-footer" 
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}>
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={this.onClose} type="primary">
              确认
            </Button>
          </div>
        </Drawer>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { visible: state.showUserInfoModal }
}
export default Form.create()(connect(mapStateToProps)(userInfoModal));