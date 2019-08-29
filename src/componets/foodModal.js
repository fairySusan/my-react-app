import React, { Component } from 'react';
import * as Api from '../apis/mockApi';
import baseUrl from '../local_config';
import { Modal, Form, Input, Select, Upload, Icon, InputNumber, message, Button } from 'antd';
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

class FoodModal extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
      menus: [],
      isModify: false
    }
  }
  componentDidMount() {
  }
  componentDidUpdate(oldprops) {
    if(oldprops.currItem !== this.props.currItem) {
      const data = this.props.currItem;
      this.getMenus(data.restaurant._id);
      if (data) {
        this.setState({
          imageUrl: baseUrl + data.image_path,
          isModify: true
        })
        this.props.form.setFieldsValue({
          name: data.name,
          price: data.price,
          category_id: data.category._id,
        });
      }
    } else {
      if (oldprops.visible !== this.props.visible) {
        if (this.props.visible) {
          this.getMenus(this.props.shopId);
        }
      }
    }
  }
  resetForm = () => {
    fileList = [];
    this.props.form.resetFields();
    this.setState({
      imageUrl: '',
      isModify: true
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (err) {
        return
      }
      const formData = new FormData();
      const f = fileList.pop();
      formData.append('file', f);
      formData.append('restaurant_id', this.props.shopId);
      if(this.props.currItem) {
        formData.append('_id', this.props.currItem._id)
      }
      for(let i in values) {
        formData.append(i, values[i])
      }
      this.props.submitFoodForm(formData, this.state.isModify);
    });
  }
  getMenus = (id) => {
    Api.getMenu(id).then(res => {
     this.setState({
       menus: res.data,
     })
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const {imageUrl, menus } = this.state;
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
          <Form.Item label="食品价格(¥)">
            {
              getFieldDecorator('price', {
                rules: [{required: true, message: '请输入食品价格'}],
                initialValue: 3
              })(
                <InputNumber min={0}/>
              )
            }
          </Form.Item>
          <Form.Item label="食品分类">
            {
              getFieldDecorator('category_id', {
                rules: [{required: true, message: '请选择食品分类'}]
              })(
                <Select
                  style={{ width: 120 }}
                >
                {
                  menus.map(item => {
                    return (
                      <Option value={item._id} key={item._id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
              )
            }
          </Form.Item>
          <Form.Item label="食品图片">
            {
              <Upload
               name="file"
               className="avatar-uploader"
               beforeUpload={beforeUpload}
               onChange={this.handleChange}
              >
              {
               imageUrl 
               ?
                <img className="shop-img" src={imageUrl} alt="食物图片"></img>
               :
                <Button>
                  <Icon type="upload"/> 选择图片
                </Button>
              }
             </Upload>
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(FoodModal);