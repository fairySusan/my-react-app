import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
class ShopModal extends Component {
  constructor() {
    super();
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return(
      <Modal
        title="新增商铺"
        width={800}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={() => this.props.onClose()}>
        <Form
          {...formItemLayout}
        >
          <Form.Item label="店铺名称">
            {
              getFieldDecorator('name', {
                rules: [{require: true, message: '请输入店铺名称'}]
              })(
                <Input
                  placeholder="请输入店铺名称"
                ></Input>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(ShopModal)