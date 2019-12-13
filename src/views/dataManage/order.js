import React, { Component } from 'react';
import Columns from '../../config/columns';
import { Table, Button, message, Select, Pagination } from 'antd';
const {Option} = Select;
export default class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      currPage: 1,
      pageSize: 5,
      count: 0,
      currItem: null,
      searchShopName: '',
      shopNameOptions: [],
    }
  }
  render() {
    const columns = Columns.shopCol(this);
    const { tableData, shopNameOptions } = this.state;
    return (
      <div id="order-content" className="manage-content">
         <div className="opt-box">
          <div className="filter-item">
            <Select
              showSearch
              allowClear={true}
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
          <Button type="primary" className="add-btn" onClick={(e) => this.addOrModifyModal('add', e)}>新增订单</Button>
        </div>
        <Table columns={columns} dataSource={tableData} pagination={false}></Table>
        <Pagination total={this.state.count} current={this.state.currPage} onChange={this.onPageChange} pageSize={this.state.pageSize}></Pagination>
      </div>
    )
  }
}