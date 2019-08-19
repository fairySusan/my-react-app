import React, { Component } from 'react';

class Column extends Component {
  constructor() {
    super();
    // 商家列表表头配置
    this.shopCol = (ctx) =>([
      {
        title: '商家名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '所在城市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <button onClick={ctx.deleteShop}>删除</button>
          </span>
        ),
      },
    ]);
  }
}
export default new Column();