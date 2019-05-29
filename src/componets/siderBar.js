import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
export default class siderBar extends Component {
  render() {
    return (
      <Layout id="side-bar" className="side-bar">
        <Sider width={150} style={{background: '#42485a'}}>
          <Menu
            mode="inline"
            theme="dark"
          >
            <Menu.Item>
              <Icon type="pie-chart" />
              <span>概览</span>
            </Menu.Item>
            <Menu.Item>
              <Icon type="desktop" />
              <span>socket接收</span>
            </Menu.Item>
            <Menu.Item>
              <Icon type="inbox" />
              <span>图标</span>
            </Menu.Item>
            <Menu.Item>
              <Icon type="inbox" />
              <span>编辑器</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>设置中心</span>
                </span>
             }
            >
              <Menu.Item>
                <Icon type="inbox" />
                <span>用户管理</span>
              </Menu.Item>
              <Menu.Item>
                <Icon type="inbox" />
                <span>角色管理</span>
              </Menu.Item>
              <Menu.Item>
                <Icon type="inbox" />
                <span>权限管理</span>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}