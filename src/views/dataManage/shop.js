import React, { Component } from 'react';
import { Table, Button } from 'antd';
import * as Api from '../../apis/mockApi';
import Columns from '../../config/columns';
import ShopModal from '../../componets/shopModal';
export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      showModal: false
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
              key: index,
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
    console.log('删除');
  }
  contrlModal = (visible) => {
    this.setState({showModal: visible});
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
        <ShopModal visible={this.state.showModal} onClose={(e) => this.contrlModal(false, e)}></ShopModal>
      </div>
    )
  }
}