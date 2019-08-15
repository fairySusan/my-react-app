import React, { Component } from 'react';
import { Divider, Tag } from 'antd';

class Column extends Component {
  constructor() {
    super();
    // 商家列表表头配置
    this.shopCol = () =>([
      {
        title: '商家名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      // {
      //   title: '商家地址',
      //   dataIndex: 'address',
      //   key: 'address',
      // },
      // {
      //   title: '商家详情',
      //   dataIndex: 'address',
      //   key: 'address',
      // },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Invite {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        ),
      },
    ]);
  }
}
export default new Column();