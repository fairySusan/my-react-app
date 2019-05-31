import React, { Component } from 'react';
import * as mockApi from '../apis/mockApi';

export default class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mockData: {}
      }
    }
    componentDidMount() {
      this.getMockData();
    }
    getMockData = () => {
      mockApi.getMockData().then(res => {
        this.setState({
          mockData: res
        })
      })
    }
    render() {
      return (
        <div>
          <pre>
            <code>
            {JSON.stringify(this.state.mockData,null,2)}
            </code>
          </pre>
        </div>
      )
    }
  }