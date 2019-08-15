import React, { Component } from 'react';

export default class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mockData: {}
      }
    }
    componentDidMount() {
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