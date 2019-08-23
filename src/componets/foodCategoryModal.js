import React, { Component } from 'react';
import { Modal, Form, Input, Upload, Icon } from 'antd';

class FoodCategoryModal extends Component {
  constructor() {
    super();
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err) {
        this.props.submitMenuForm(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return(
      <Modal
        title="添加食品"
        width={800}
        visible={this.props.visible}
        onOk={this.onSubmit}
        onCancel={() => this.props.onClose()}
      >
        <Form {...formItemLayout}>
          <Form.Item label="种类名称">
            {
              getFieldDecorator('name', {
                rules: [{require: true, message: '请输入种类名称'}]
              })(
                <Input
                  placeholder="请输入种类名称"
                ></Input>
              )
            }
          </Form.Item>
          <Form.Item label="种类描述">
            {
              getFieldDecorator('description')(
                <Input
                  placeholder="请输入种类描述"
                ></Input>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(FoodCategoryModal)