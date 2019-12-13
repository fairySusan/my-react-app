import React, { Component } from 'react';
import {Button, Icon} from 'antd';

class Column extends Component {
  constructor() {
    super();
    // 商家列表表头配置
    this.shopCol = (ctx) =>([
      {
        title: '商家名称',
        dataIndex: 'name',
        key: 'name',
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
            <Icon
              type="delete"
              style={{fontSize: '18px'}}
              onClick={(e) => ctx.deleteShop(record['_id'], e)}>
              删除
            </Icon>
            <span className="action-split"></span>
            <Icon
             type="edit"
             style={{fontSize: '18px'}}
             onClick={(e) => ctx.addOrModifyModal('modify',record, e)}>
             修改
            </Icon>
            <span className="action-split"></span>
            <Button type="primary" onClick={(e) => ctx.contrlFoodModal(record, e)}>添加食品</Button>
            <span className="action-split"></span>
            <Button type="primary" onClick={(e) => ctx.contrlMenuModal(record, e)}>添加食品分类</Button>
          </span>
        ),
      },
    ]);
    this.foodCol = (ctx) => ([
      {
        title: '食品名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '食品价格(¥)',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: '所属商家',
        dataIndex: 'shop',
        key: 'shop',
        render: (text, record) => (
          <span>{record.restaurant.name}</span>
        )
      },
      {
        title: '所属种类',
        dataIndex: 'menu',
        key: 'menu',
        render: (text, record) => (
          <span>{record.menu.name}</span>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Icon 
              type="delete"
              style={{fontSize: '18px'}}
              onClick={(e) => ctx.deleteFood(record['_id'],record['category']['_id'], e)}
            >删除</Icon>
            <span className="action-split"></span>
            <Icon
            type="edit"
            style={{fontSize: '18px'}}
            onClick={(e) => ctx.modifyModal(record['key'], e)}>
            修改</Icon>
          </span>
        )
      }
    ]);
    this.orderCol = () => ([
      {
        title: '订单编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '客户姓名',
        dataIndex: 'client_name',
        key: 'client_name'
      },
      {
        title: '客户电话',
        dataIndex: 'client_phone',
        key: 'client_phone',
      },
      {
        title: '接单商家',
        dataIndex: 'shop_name',
        key: 'shop_name'
      },
      {
        title: '商家电话',
        dataIndex: 'shop_name',
        key: 'shop_name',
      },
      {
        title: '商品数量',
        dataIndex: 'foods_count',
        key: 'foods_count'
      },
      {
        title: '下单商品',
        dataIndex: 'order_foods',
        key: 'order_foods'
      }
    ])
  }
}
export default new Column();