import React from 'react';

export const chat = {
  username: '',
  message: '',
  isLogin: false,
};

export const ChatContext = React.createContext({
  chat,
  createUser: () => {},
});
