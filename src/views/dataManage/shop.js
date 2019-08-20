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
              phone: element.phone
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
  addShop = (params) => {
    Api.addShop(params).then(res => {
      if(res.succeed) {
        message.success(res.data.message);
        this.getShopList();
      } else {
        message.error(res.message);
      }
      this.setState({showShopModal: false});
    })
  }
  addFood = (params) => {
    this.setState({showFoodModal: true});
  }
  contrlModal = (visible) => {
    this.setState({showShopModal: visible});
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
          <Button type="primary" className="add-btn" onClick={(e) => this.contrlModal(true, e)}>新增</Button>
        </div>
        <Table columns={columns} dataSource={tableData}>
        </Table>
        <ShopModal visible={this.state.showShopModal} onClose={(e) => this.contrlModal(false, e)} onAdd={this.addShop}></ShopModal>
        <FoodModal visible={this.state.showFoodModal} onClose={(e) => this.contrlFoodModal(false, e)}></FoodModal>
      </div>
    )
  }
}