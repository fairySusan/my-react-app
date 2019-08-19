import React, { Component } from 'react'
import { Drawer, Avatar, List } from 'antd'
import { connect } from 'react-redux'
import { closeUserInfo} from '../redux/actions/index';
class userInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [
        {label: '姓名', value: 'susan'},
        {label: '手机号', value: '15020000000'},
        {label: '单位', value: '重庆市'},
        {label: '职务', value: '销售'},
        {label: '用户角色', value: '超级管理员'},
      ]
    };
  }
  onClose = () => {
    this.props.dispatch(closeUserInfo())
  }
  render() {
    const {userData} = this.state;
    return (
      <div id="user-info">
        <Drawer
        title="用户信息"
        placement="right"
        width={520}
        closable={false}
        onClose={this.onClose}
        visible={this.props.visible}
        >
          <div className="user">
            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" ></Avatar>
            <div className="user-info">
              <List
              itemLayout='horizontal'
              dataSource={userData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                  description={item.label}>
                  </List.Item.Meta>
                  <List.Item.Meta
                  description={item.value}>
                  </List.Item.Meta>
                </List.Item>
              )}
              ></List>
              <div className="changePwd">
                <span>修改密码</span>
                <span>修改</span>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { visible: state.showProfile }
}
export default connect(mapStateToProps)(userInfo);