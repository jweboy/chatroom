import React, { Component } from 'react';
import { ChatContext } from './store';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(evt) {
    const { value } = evt.target;
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (
      <ChatContext.Consumer>
        {({ isLogin, createUser }) => (
          !isLogin && (
          <>
            <input onChange={this.handleOnChange} value={value} />
            <button type="button" onClick={createUser(value)}>login</button>
          </>
          )
        )}
      </ChatContext.Consumer>
    );
  }
}
