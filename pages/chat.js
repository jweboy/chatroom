import React, { Component } from 'react';
import io from 'socket.io-client';
import { chat, ChatContext } from './store';
import Login from './login';
import MainScreen from './main-screen';

const SOCKETURL = 'http://localhost:3001';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      ...chat,
      createUser: this.createUser,
    };
    this.socket = io.connect(SOCKETURL);
  }

  createUser = username => () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin,
      username: username === '' ? 'Anonymous' : username,
    }));
  }

  render() {
    const { isLogin } = this.state;
    return (
      <ChatContext.Provider value={this.state}>
        <Login />
        {isLogin && <MainScreen socket={this.socket} />}
      </ChatContext.Provider>
    );
  }
}
