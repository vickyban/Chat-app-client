const io = require('socket.io-client');


export default function () {
  const socket = io('http://localhost:4001');

  socket.on('error', err => console.log('received socket error:', err));
  socket.on('welcome', greet => console.log(greet.text));

  const roomList = updateRoomList => socket.on('rooms', updateRoomList);
  const join = roomInfo => socket.emit('join room', roomInfo);

  const send = message => socket.emit('message', message);
  const subscribe = onMessageReceived => socket.on('message', onMessageReceived);

  const setTypingState = (username, room, bool) => socket.emit('typing', { username, room, isTyping: bool });
  const listenForTyping = onStartTyping => socket.on('typing', onStartTyping);




  return {
    send,
    subscribe,
    setTypingState,
    listenForTyping,
    join,
    roomList
  }
}