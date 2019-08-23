import React, { Component } from 'react';
import * as Api from '../../apis/mockApi';
import {Table} from 'antd';
export default class FoodPage extends Component {
  componentDidMount() {
    this.getFoods();
  }
  getFoods = () => {
    Api.getFood().then(res => {
      console.log(res);
    })
  }
  render() {
    return(
      <div id="food-content">
        <Table></Table>
      </div>
    )
  }
}