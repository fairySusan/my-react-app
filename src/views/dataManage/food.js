import React, { Component } from 'react';
import * as Api from '../../apis/mockApi';
import Columns from '../../config/columns';
import FoodModal from '../../componets/foodModal';
import {Table, message, Select, Pagination} from 'antd';
const {Option} = Select;
export default class FoodPage extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      currPage: 1,
      pageSize: 5,
      tableData: [],
      shopNameOptions: [],
      currItem: null,
      showFoodModal: false,
      searchSoodName: ''
    }
  }
  componentDidMount() {
    this.getFoods();
  }
  getFoods = (restaurant_id) => {
    Api.getFood(restaurant_id).then(res => {
      if (res.succeed && res.data.length > 0) {
        res.data.forEach((element,index) => {
          element.key = index;
        });
        this.setState({
          tableData: res.data,
          count: res.data.count
        })
      }
    })
  }
  modifyModal = (key) => {
    const data = this.state.tableData[key]
    this.setState({
      showFoodModal: true,
      currItem: data
    })
  }
  submitFoodForm = (params, isModify) => {
    if (isModify) {
      Api.modifyFood(params).then(res => {
        if(res.succeed) {
          message.success(res.data.message);
          this.getFoods();
        } else {
          message.error(res.message);
        }
        this.setState({showFoodModal: false});
      }).catch(() => {
        message.error('服务器出错');
        this.setState({showFoodModal: false});
      })
    } else {
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
  }
  deleteFood = (id, category_id) => {
    Api.deleteFood(id, category_id).then(res => {
      if(res.succeed) {
        message.success(res.data.message);
        this.getFoods();
      } else {
        message.error(res.message);
      }
    })
  }
  onPageChange = (currPage) => {
    this.setState({
      currPage: currPage
    });
    this.getFoods(undefined, currPage);
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
  handleChange = (restaurant_id) => {
    this.getFoods(restaurant_id)
    const shop = this.state.shopNameOptions.find((item) => {
      return item._id === restaurant_id;
    })
    this.setState({
      searchShopName: shop && shop.name
    })
  }
  render() {
    const {tableData, currItem, shopNameOptions} = this.state;
    const columns = Columns.foodCol(this);
    return(
      <div id="food-content" className="manage-content">
        <div className="opt-box">
          <div className="filter-item">
            <label>
              所属商家：
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
        </div>
        <Table columns={columns} dataSource={tableData} pagination={false}></Table>
        <Pagination total={this.state.count} current={this.state.currPage} onChange={this.onPageChange} pageSize={this.state.pageSize}></Pagination>
        <FoodModal currItem={currItem} visible={this.state.showFoodModal} onClose={() => this.setState({showFoodModal: false})} submitFoodForm={this.submitFoodForm}></FoodModal>
      </div>
    )
  }
}