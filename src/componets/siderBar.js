import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import {withRouter, Link} from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
class siderBar extends Component {
  constructor(props,context) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }
  toggleCollapsed =  () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  routerJump = (key) => {
    const path = key.keyPath.reverse().join('/');
    console.log(`/${path}`)
    this.props.history.push(`/${path}`);
  }
  renderMenus = () => {
    const  menus = [
      {
        label: '概览',
        key: '/',
        icon: 'pie-chart'
      },
      {
        label: '数据管理',
        key: 'manage',
        icon: 'desktop',
        children: [
          {
            label: '商家列表',
            key: '/shop',
            icon: 'appstore'
          },
          {
            label: '用户列表',
            key: '/user',
            icon: 'appstore'
          },
          {
            label: '食品列表',
            key: '/food',
            icon: 'appstore'
          },
          {
            label: '订单列表',
            key: '/order',
            icon: 'appstore'
          },
        ]
      },
      {
        label: '图表',
        key: '/chart',
        icon: 'area-chart'
      },
      {
        label: '编辑器',
        key: '/editor',
        icon: 'edit'
      },
      {
        label: '设置中心',
        key: 'set',
        icon: 'setting',
        children: [
          {
            label: '用户管理',
            key: '/userManage',
            icon: 'team'
          },
          {
            label: '角色管理',
            key: '/roleManange',
            icon: 'user-add'
          },
          {
            label: '权限管理',
            key: '/authManage',
            icon: 'appstore'
          }
        ]
      }
    ];
    return menus.map((item1, index) => {
      if (!item1.children || item1.children.length === 0) {
        return (
          <Menu.Item key={item1.key}>
            <Link to={item1.key}>
              <Icon type={item1.icon} />
              <span>{item1.label}</span>
            </Link>
          </Menu.Item>
        ) 
      } else {
        return (
          <SubMenu
          key={item1.key}
          title={
            <span>
              <Icon type="setting" />
              <span>{item1.label}</span>
            </span>
          }
          >
            {
              item1.children.map((item2, index) => {
                return (
                  <Menu.Item key={item2.key}>
                  <Link to={`/${item1.key}${item2.key}`}>
                    <Icon type={item2.icon} />
                    <span>{item2.label}</span>
                  </Link>
                  </Menu.Item>
                )
              })
            }
          </SubMenu>
        )
      }
    })
  }
  render() {
    
    return (
      <div id="side-bar" className={this.state.collapsed ? 'mini-side-bar' : 'side-bar'}>
        <Sider width={150} style={{background: '#42485a'}} collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            defaultSelectedKeys={['/']}
          >
            {this.renderMenus()}
          </Menu>
        </Sider>
      </div>
    )
  }
}
export default withRouter(siderBar);