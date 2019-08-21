import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import * as Api from '../../apis/mockApi';
import Columns from '../../config/columns';
import ShopModal from '../../componets/shopModal';
import FoodModal from '../../componets/foodModal';
export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      currItem: {},
      showShopModal: false,
      showFoodModal: false
    }
    this.getShopList();
  }
  getShopList = () => {
    Api.getShopList().then(res => {
      if(res.succeed) {
        let data = [];
        if (res.data.length > 0) {
          res.data.forEach((element,index) => {
            data.push({
              key: element._id,
              name: element.name,
              address: element.address,
              city: element.city,
              phone: element.phone,
              feature: element.feature,
              image_path: element.image_path,
              category: element.category,
              opening_hours: element.opening_hours,
              closing_hours: element.closing_hours,
              float_delivery_fee: element.float_delivery_fee,
              float_minimum_order_amount: element.float_minimum_order_amount
            })
          });
        }
        this.setState({
          tableData: data
        })
      }
    })
  }
  deleteShop = (id) => {
    Api.deleteShop(id).then(res => {
      if (res.succeed) {
        message.success(res.data.message);
        this.getShopList();
      } else {
        message.error(res.message);
      }
    })
  }
  submitShopForm = (params) => {
    if (params.key) {
      Api.modifyShop(params).then(res => {
        console.log(res);
      })
    } else {
      Api.addShop(params).then(res => {
        if(res.succeed) {
          message.success(res.data.message);
          this.getShopList();
        } else {
          message.error(res.message);
        }
        this.setState({showShopModal: false});
      }).catch(err => {
        message.error('服务器出错');
        this.setState({showShopModal: false});
      })
    }
  }
  addFood = (params) => {
    this.setState({showFoodModal: true});
  }
  addOrModifyModal = (option, id) => {
    this.setState({
      currItem: {}
    })
    this.setState({showShopModal: true});
    if(option === 'modify') {
      const currItem = this.state.tableData.find(item => {
        return item['key'] === id;
      })
      this.setState({
        currItem: currItem
      })
    }
  }
  onClose = () => {
    this.setState({showShopModal: false});
  }
  contrlFoodModal = (visible) => {
    this.setState({showFoodModal: visible});
  }
  render() {
    const columns = Columns.shopCol(this);
    const { tableData } = this.state;
    return (
      <div id="shop-content">
        <div className="opt-box clearfix">
          <Button type="primary" className="add-btn" onClick={(e) => this.addOrModifyModal('add', e)}>新增</Button>
        </div>
        <Table columns={columns} dataSource={tableData}>
        </Table>
        <ShopModal visible={this.state.showShopModal} onClose={this.onClose} submitShopForm={this.submitShopForm} currItem={this.state.currItem}></ShopModal>
        <FoodModal visible={this.state.showFoodModal} onClose={(e) => this.contrlFoodModal(false, e)}></FoodModal>
      </div>
    )
  }
}