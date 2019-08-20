import React, { Component } from 'react';
import moment from 'moment';
import { Modal, Form, Input, Select, Checkbox, InputNumber, TimePicker, Upload, message, Icon, Button } from 'antd';
const { Option } = Select;
let fileList = [];
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传JPG/PNG格式');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小必须小于2MB!');
  }
  if (isJpgOrPng && isLt2M) {
    fileList.push(file);
  }
  return false;
}
class ShopModal extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      imageUrl: '',
      loading: false
    }
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err) {
        const formData = new FormData();
        const f = fileList.pop();
        formData.append('file', f);
        for(let i in values) {
          formData.append(i, values[i])
        }
        this.props.onAdd(formData);
      }
    });
  }
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
    const plainOptions = [
      {label: '品牌商家', value:8},
      {label: '外卖保', value: 7},
      {label: '新店', value: 5},
      {label: '开发票', value: 4},
      {label: '在线支付', value: 3},
      {label: '准时达', value: 9},
    ];
    const categoryOptions = [
      {label: '快餐便当', value: 207},
      {label: '小吃夜宵', value: 233},
      {label: '特色菜系', value: 220},
      {label: '异国料理', value: 260},
    ]
    return(
      <Modal
        title="新增商铺"
        width={800}
        visible={this.props.visible}
        onOk={this.onSubmit}
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
          <Form.Item label="所在城市">
            {
              getFieldDecorator('city', {
                rules: [{require: true, message: '请输入店铺所在城市'}]
              })(
                <Input
                  placeholder="请输入店铺所在城市"
                ></Input>
              )
            }
          </Form.Item>
          <Form.Item label="详细地址">
            {
              getFieldDecorator('address', {
                rules: [{require: true, message: '请输入店铺详细地址'}]
              })(
                <Input
                  placeholder="请输入店铺详细地址"
                ></Input>
              )
            }
          </Form.Item>
          <Form.Item label="联系电话">
            {
              getFieldDecorator('phone', {
                rules: [{require: true, message: '请输入店铺联系电话'}]
              })(
                <Input
                  placeholder="请输入店铺联系电话"
                ></Input>
              )
            }
          </Form.Item>
          <Form.Item label="店铺简介">
            {
              getFieldDecorator('phone')(
                <Input
                  placeholder="请输入店铺简介"
                ></Input>
              )
            }
          </Form.Item>
          <Form.Item label="店铺分类">
            {
              getFieldDecorator('category', { initialValue: 207 } )(
                <Select
                  style={{ width: 120 }}
                >
                {
                  categoryOptions.map(item => {
                    return (
                      <Option value={item.value} key={item.value}>{item.label}</Option>
                    )
                  })
                }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="店铺特点">
            {
              getFieldDecorator('feature', { initialValue: [8] })(
                <Checkbox.Group options={plainOptions} onChange={this.onChange} />
              )
            }
          </Form.Item>
          <Form.Item label="配送费">
            {
              getFieldDecorator('float_delivery_fee', { initialValue: 3 })(
                <InputNumber min={1} max={10}/>
              )
            }
          </Form.Item>
          <Form.Item label="起送价">
            {
              getFieldDecorator('float_minimum_order_amount', { initialValue: 3 })(
                <InputNumber min={1} max={10}/>
              )
            }
          </Form.Item>
          <Form.Item label="营业开始时间">
            {
              getFieldDecorator('opening_hours', { initialValue: moment('00:00:00', 'HH:mm:ss') })(
                <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
              )
            }
          </Form.Item>
          <Form.Item label="营业结束时间">
            {
              getFieldDecorator('closing_hours', { initialValue: moment('00:00:00', 'HH:mm:ss') })(
                <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
              )
            }
          </Form.Item>
          <Form.Item label="上传店铺头像">
            <Upload
              name="file"
              className="avatar-uploader"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
              >
              <Button>
                <Icon type="upload" /> 选择图片
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(ShopModal)