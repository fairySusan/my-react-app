import React, { Component } from 'react';
import { Row, Col, Tree, Input, Table, Divider, Button, Pagination } from 'antd';
import { openUserInfoModal } from '../redux/actions/index';
import { connect } from 'react-redux'
import AddorModifyUser from '../componets/addormodifyuser';
import * as mockApi from '../apis/mockApi';
const { TreeNode } = Tree;
const Search = Input.Search;
class UserManange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    }
  }
  showUserInModal = () => {
    this.props.dispatch(openUserInfoModal())
  }
  componentDidMount() {
    mockApi.getUserList().then(res => {
      this.setState({
        tableData: res.data.list
      })
    })
  }

  render() {
    console.log(this.state.tableData);
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '职务',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: '账户',
        dataIndex: 'acount',
        key: 'acount',
      },
      {
        title: '账户状态',
        dataIndex: 'acount_state',
        key: 'acount_state',
        render: (text,record) => {
          return (
            <span>
              { record.acount_state ? '正常' : '已冻结' }
            </span>
          )
        }
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <a href="javascript:;">详情</a>
              <Divider type="vertical"></Divider>
              <a href="javascript:;">冻结账户</a>
            </span>
          )
        }
      }
    ]
    return (
    <div id="user-manage">
      <AddorModifyUser></AddorModifyUser>
      <Row id="user-manage-content">
        <Col span={3} id="col-left">
          <div className="left">
            <div className="title">杭州市</div>
            <div className="part">
              <Tree
              defaultCheckedKeys={['0-0']}
              blockNode>
                <TreeNode title="重庆" key="0-0">
                  <TreeNode title="南岸" key="0-1">
                    <TreeNode title="工贸" key="0-1-1"></TreeNode>
                    <TreeNode title="南坪" key="0-1-2"></TreeNode>
                    <TreeNode title="南湖" key="0-1-3"></TreeNode>
                  </TreeNode>
                  <TreeNode title="巴南" key="0-2"></TreeNode>
                  <TreeNode title="九龙坡" key="0-3"></TreeNode>
                  <TreeNode title="渝中" key="0-4"></TreeNode>
                  <TreeNode title="江北" key="0-5"></TreeNode>
                  <TreeNode title="渝北" key="0-6"></TreeNode>
                </TreeNode>
              </Tree>
            </div>
          </div>
        </Col>
        <Col span={21} id="col-right">
          <div className="right">
            <div className="title">杭州市10人</div>
            <div className="body-part">
              <div id="search-part">
                <Search 
                placeholder="请输入关键词搜索"
                style={{width: 350}}
                enterButton="搜索"
                onSearch={value => console.log(value)}
                >
                </Search>
              </div>
              <div id="table-part">
                <Table
                dataSource={this.state.tableData}
                rowKey="id"
                columns={columns}
                size="middle"
                rowClassName="row"
                bordered></Table>
              </div>
            </div>
            <div id="footer-part">
              <Button type="primary" onClick={this.showUserInModal}>新增人员</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    )
  }
}
export default connect()(UserManange);