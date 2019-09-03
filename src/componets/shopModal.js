import React, { Component } from 'react';
import moment from 'moment';
import baseUrl from '../local_config';
import { Modal, Form, Input, Select, Checkbox, InputNumber, TimePicker, Upload, message, Icon, Button, Row, Col } from 'antd';
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
      loading: false,
      isModify: false
    }
  }
  // 接受props
  componentDidUpdate(oldProps) {
    if (oldProps.visible !== this.props.visible) {
      this.resetForm();
    }
    if(oldProps.currItem !== this.props.currItem) {
      this.resetForm();
      const data = this.props.currItem;
      if (data) {
        this.setState({
          imageUrl: baseUrl + data.image_path,
          isModify: true
        })
        this.props.form.setFieldsValue({
          name: data.name,
          city: data.city,
          address: data.address,
          phone: data.phone,
          describe: data.describe,
          category: data.category,
          feature: data.feature.map(item => {return item.id}),
          float_delivery_fee: data.float_delivery_fee,
          float_minimum_order_amount: data.float_minimum_order_amount,
          opening_hours: moment(data.opening_hours, 'HH:mm'),
          closing_hours: moment(data.closing_hours, 'HH:mm')
        });
      }
    } 
  }
  resetForm = () => {
    fileList = [];
    this.props.form.resetFields();
    this.setState({
      imageUrl: '',
      isModify: false
    })
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err) {
        values.opening_hours = moment(values.opening_hours).format('HH:mm');
        values.closing_hours = moment(values.closing_hours).format('HH:mm');
        const formData = new FormData();
        const f = fileList.pop();
        formData.append('file', f);
        if (this.state.isModify) {
          formData.append('image_path',this.props.currItem.image_path);
          formData.append('_id', this.props.currItem._id)
        }
        for(let i in values) {
          formData.append(i, values[i])
        }
        this.props.submitShopForm(formData, this.state.isModify);
      }
    });
  }
  render() {
    const {imageUrl, isModify} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
      hideRequiredMark: false
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
    ];
    const format = 'HH:mm';
    return(
      <Modal
        title={isModify ? '修改店铺' : '新增店铺'}
        width={800}
        wrapClassName="shopModal"
        visible={this.props.visible}
        onOk={this.onSubmit}
        onCancel={() => this.props.onClose()}>
        <Form
          {...formItemLayout}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="店铺名称">
                {
                  getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入店铺名称'}]
                  })(
                    <Input
                      placeholder="请输入店铺名称"
                    ></Input>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所在城市">
                {
                  getFieldDecorator('city', {
                    rules: [{required: true, message: '请输入店铺所在城市'}]
                  })(
                    <Input
                      placeholder="请输入店铺所在城市"
                    ></Input>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="详细地址">
                {
                  getFieldDecorator('address', {
                    rules: [{required: true, message: '请输入店铺详细地址'}]
                  })(
                    <Input
                      placeholder="请输入店铺详细地址"
                    ></Input>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话">
                {
                  getFieldDecorator('phone', {
                    rules: [{required: true, message: '请输入店铺联系电话'}]
                  })(
                    <Input
                      placeholder="请输入店铺联系电话"
                    ></Input>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="店铺简介">
                {
                  getFieldDecorator('describe')(
                    <Input
                      placeholder="请输入店铺简介"
                    ></Input>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="店铺特点" labelCol={{span: 3}}>
              {
                getFieldDecorator('feature', { initialValue: [8] })(
                  <Checkbox.Group options={plainOptions}/>
                )
              }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="配送费(¥)">
              {
                getFieldDecorator('float_delivery_fee', {
                  rules: [{required: true, message: '请输入配送费'}],
                  initialValue: 3
                })(
                  <InputNumber min={0}/>
                )
              }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="起送价(¥)">
              {
                getFieldDecorator('float_minimum_order_amount', {
                  rules: [{required: true, message: '请输入起送价'}],
                  initialValue: 3
                })(
                  <InputNumber min={0}/>
                )
              }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="营业开始时间">
              {
                getFieldDecorator('opening_hours', { initialValue: moment('08:00', format) })(
                  <TimePicker format={format}/>
                )
              }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="营业结束时间">
              {
                getFieldDecorator('closing_hours', { initialValue: moment('10:00', format) })(
                  <TimePicker format={format}/>
                )
              }
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={isModify ? '修改店铺头像' : '上传店铺头像'} labelCol={{span:3}}>
            <Upload
              name="file"
              className="avatar-uploader"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
              >
              {
                imageUrl 
                ?
                 <img className="shop-img" src={imageUrl} alt="商铺图片"></img>
                :
                <Button>
                  <Icon type="upload"/> 选择图片
                </Button>
              }
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(ShopModal)