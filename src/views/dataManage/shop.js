import React, { Component } from 'react';
import { Table, Button, message, Select } from 'antd';
import * as Api from '../../apis/mockApi';
import Columns from '../../config/columns';
import ShopModal from '../../componets/shopModal';
import FoodModal from '../../componets/foodModal';
import CategoryModal from '../../componets/foodCategoryModal';
const {Option} = Select;
export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      currItem: {},
      searchShopName: '',
      shopNameOptions: [],
      showShopModal: false,
      showFoodModal: false,
      showCategory: false,
    }
    this.getShopList();
  }
  getShopList = (id) => {
    Api.getShopList(id).then(res => {
      if(res.succeed) {
        if (res.data.length > 0) {
          res.data.forEach((element,index) => {
            element.key = index;
          });
        }
        this.setState({
          tableData: res.data
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
  submitMenuForm = (form) => {
    const params = {
      restaurant_id: this.state.currItem['_id'],
      ...form
    }
    Api.addMenu(params).then(res => {
      if(res.succeed) {
        message.success(res.data.message);
      } else {
        message.error(res.message);
      }
      this.setState({showCategory: false})
    }).catch(() => {
      message.error('服务器出错');
      this.setState({showCategory: false})
    })
  }
  submitShopForm = (params, isModify) => {
    if (isModify) {
      Api.modifyShop(params).then(res => {
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
  submitFoodForm = (params) => {
    Api.addFood(params).then(res => {
      if(res.succeed) {
        message.success(res.data.message);
      } else {
        message.error(res.message);
      }
      this.setState({showFoodModal: false});
    }).catch(() => {
      message.error('服务器出错');
      this.setState({showFoodModal: false});
    })
  }
  addOrModifyModal = (option, record) => {
    this.setState({
      currItem: {}
    })
    this.setState({showShopModal: true});
    if(option === 'modify') {
      this.setState({
        currItem: record
      })
    }
  }
  contrlFoodModal = (record) => {
    this.setState({
      currItem: record
    })
    this.setState({showFoodModal: true});
  }
  contrlMenuModal = (record) => {
    this.setState({
      currItem: record
    })
    this.setState({showCategory: true});
  }
  handleSearch = (value) => {
    if (value) {
      Api.searchShopNames(value).then(res => {
        if(res.succeed) {
          this.setState({
            shopNameOptions: res.data
          })
        }
      })
    } else {
      this.setState({shopNameOptions: []})
    }
  }
  handleChange = (id) => {
    this.getShopList(id);
    const shop = this.state.shopNameOptions.find((item) => {
      return item._id === id;
    })
    this.setState({
      searchShopName: shop && shop.name
    })
  }
  render() {
    const columns = Columns.shopCol(this);
    const { tableData, shopNameOptions } = this.state;
    return (
      <div id="shop-content" className="manage-content">
        <div className="opt-box">
          <div className="filter-item">
            <label>
              搜索商家：
            </label>
            <Select
              showSearch
              allowClear={true}
              value={this.state.searchShopName}
              style={{width: '200px'}} 
              placeholder="请输入商家名称"
              onSearch={this.handleSearch}
              onChange={this.handleChange}
              filterOption={false}
              defaultActiveFirstOption={false}
              notFoundContent={null}
              >
              {
                shopNameOptions.map(opt => {
                  return (
                    <Option
                    value={opt._id}
                    key={opt._id}
                    >
                      {opt.name}
                    </Option>
                  )
                })
              }
            </Select>
          </div>
          <Button type="primary" className="add-btn" onClick={(e) => this.addOrModifyModal('add', e)}>新增商铺</Button>
        </div>
        <Table columns={columns} dataSource={tableData}></Table>
        <ShopModal visible={this.state.showShopModal} onClose={() => {this.setState({showShopModal: false})}} submitShopForm={this.submitShopForm} currItem={this.state.currItem}></ShopModal>
        <FoodModal visible={this.state.showFoodModal} onClose={() => this.setState({showFoodModal: false})} submitFoodForm={this.submitFoodForm} shopId={this.state.currItem['_id']}></FoodModal>
        <CategoryModal visible={this.state.showCategory} onClose={() => {this.setState({showCategory: false})}} submitMenuForm={this.submitMenuForm}></CategoryModal>
      </div>
    )
  }
}