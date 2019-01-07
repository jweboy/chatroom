import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from './store';

class MainScreen extends Component {
  static propTypes = {
    socket: {
      on: PropTypes.func,
      emit: PropTypes.func,
    },
  };

  static defaultProps = {
    socket: {
      on: () => {},
      emit: () => {},
    },
  }

  constructor() {
    super();

    this.state = {
      msgList: [],
      value: '',
      realTimeMsg: ` -${MainScreen.getTimestamp()}`,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

    componentDidMount = () => {
      // Get current user
      // this.getCurrentUser();
      // Get inital message list
      this.getMessageList();
    }

    componentDidUpdate = (_, prevState) => {
      // Get update message list
      if (prevState.realTimeMsg !== this.state.realTimeMsg) {
        this.getMessageList();
      }
    }

    static getTimestamp() {
      return new Date().getTime();
    }

    getMessageList() {
      this.props.socket.emit('msgList');
      this.props.socket.on('msgList', (data) => {
        this.setState({
          msgList: data.msgList,
        });
      });
    }

    // getCurrentUser() {
    //   this.props.socket.on('user');
    // }

    setMessage(user) {
      this.props.socket.emit('message', user);
    }

  handleSubmit = username => () => {
    const { value } = this.state;
    const timestamp = MainScreen.getTimestamp();
    this.setState({
      realTimeMsg: `${value}-${timestamp}`,
      value: '',
    }, () => {
      this.setMessage({
        message: value,
        username,
      });
    });
  }

  handleClearHistory = () => {
    this.setState({
      value: '',
    }, () => {
      this.props.socket.emit('clear');
      this.getMessageList();
    });
  }

  handleOnChange(evt) {
    this.setState({
      value: evt.target.value,
    });
  }

  render() {
    const { msgList, value } = this.state;
    return (
      <ChatContext.Consumer>
        {({ username }) => (
          <>
            <ul>
              {/* eslint no-underscore-dangle: 0 */}
              {msgList.map(item => (
                <li key={item._id}>
                  {item.username}
                  :
                  {' '}
                  {item.message}
                </li>
              ))}
            </ul>
            <input onChange={this.handleOnChange} value={value} />
            <button type="button" onClick={this.handleSubmit(username)}>send</button>
            <button type="button" onClick={this.handleClearHistory}>clear-history</button>
          </>
        )}
      </ChatContext.Consumer>
    );
  }
}

export default MainScreen;
