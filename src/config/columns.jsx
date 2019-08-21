import React, { Component } from 'react';
import {Button} from 'antd';

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
            <Button type="primary" onClick={(e) => ctx.deleteShop(record['key'], e)}>删除</Button>
            <Button type="primary" onClick={(e) => ctx.addOrModifyModal('modify',record['key'], e)}>修改</Button>
            <Button type="primary" onClick={(e) => ctx.addFood(record['key'], e)}>添加食品</Button>
          </span>
        ),
      },
    ]);
  }
}
export default new Column();