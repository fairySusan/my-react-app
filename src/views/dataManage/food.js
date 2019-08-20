import React, { Component } from 'react';
import {Table} from 'antd';
export default class FoodPage extends Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div id="food-content">
        <Table></Table>
      </div>
    )
  }
}