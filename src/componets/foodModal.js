import React, { Component } from 'react';
import { Modal, Form, Input, Upload, Icon } from 'antd';
class FoodModal extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: ''
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err) {
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {imageUrl} = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
    return (
      <Modal
        title="添加食品"
        width={800}
        visible={this.props.visible}
        onOk={this.onSubmit}
        onCancel={() => this.props.onClose()}
      >
        <Form {...formItemLayout}>
          <Form.Item label="食品名称">
            {
              getFieldDecorator('name', {
                rules: [{require: true, message: '请输入食品名称'}]
              })(
                <Input
                  placeholder="请输入食品名称"
                ></Input>
              )
            }
          </Form.Item>
          <Form.Item label="食品价格">
            {
              getFieldDecorator('price', {
                rules: [{require: true, message: '请输入食品价格'}]
              })(
                <Input
                  placeholder="请输入食品价格"
                ></Input>
              )
            }
          </Form.Item>
          <Form.Item label="食品图片">
            {
              getFieldDecorator('image_path')(
                <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={this.handleChange}
              >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(FoodModal);