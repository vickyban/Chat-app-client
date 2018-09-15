const io = require('socket.io-client');


export default function () {
  const socket = io('http://localhost:4001');

  socket.on('error', err => console.log('received socket error:', err));

  const send = message => socket.emit('message', message);
  const subscribe = onMessageReceived => socket.on('message', onMessageReceived);

  const startTyping = username => socket.emit('typing', username);
  const listenForTyping = onStartTyping => socket.on('typing', onStartTyping);


  return {
    send,
    subscribe,
    startTyping,
    listenForTyping,
  }
}