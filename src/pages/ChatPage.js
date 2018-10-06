import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import '../style/chatStyle.css';

// components
import ChatInput from '../components/ChatInput';
import ChatRoomInput from '../components/ChatRoomInput';
import RoomList from '../components/RoomList';
import ChatWindow from '../components/ChatWindow';
// actions
import { addNewMessage, updateRoomList } from '../redux-store/chatroom/action';

// socket
import socket from '../services/socket';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: socket()
    }
    this.timeOut = null;
    this.isTyping = false;
    this.joinRoom('general');
    this.state.client.subscribe(this.onMessageReceived);
    this.addNewMessage = this.props.addNewMessage.bind(this);
    this.state.client.listenForTyping(this.updateTypingState);
    this.updateRoomList = this.props.updateRoomList.bind(this);
    this.state.client.roomList(this.onRoomList);
    // bind callback for action handle typingState
  }

  // send and receive new text
  onMessageReceived = message => {
    // send to dispatch
    console.log("Received message:", message);
    this.addNewMessage(message);
  }

  send = text => {
    const { current_room } = this.props;
    console.log('Send from room', current_room);
    const message = {
      username: 'poyo',
      text,
      room_name: current_room,
      timestamp: Date.now()
    };
    console.log("About to send:", message);
    this.state.client.send(message);
    this.state.client.setTypingState("someone", this.props.current_room, false)
    this.props.addNewMessage(message);
    if (this.timeOut) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }

  joinRoom = roomName => {
    if (this.props.current_room === roomName) return;
    const roomInfo = {
      username: 'poyo',
      roomName: roomName
    }
    console.log('before send join room');
    this.state.client.join(roomInfo);
  }
  onRoomList = roomList => {
    console.log('Room List:', roomList);
    this.updateRoomList(roomList);

  }

  // set typing state
  updateTypingState = ({ username, room, isTyping }) => {
    const { current_room } = this.props;
    if (current_room === room) {
      console.log(isTyping ? username + " is typing.." : username + " stop typing");
    }
  }

  handleTyping = text => {
    if (text) {
      if (!this.isTyping) {
        this.isTyping = true;
        this.state.client.setTypingState("someone", this.props.current_room, true);
      }
      this.resetTypingTimeOut();
    } else if (text.length === 0 && this.isTyping) {
      this.state.client.setTypingState("someone", this.props.current_room, false);
      this.isTyping = false;
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }

  resetTypingTimeOut = () => {
    if (this.timeOut)
      clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.state.client.setTypingState("someone", this.props.current_room, false);
      clearTimeout(this.timeOut);
      this.timeOut = null;
      this.isTyping = false;
    }, 3000);
  }

  render() {
    const { match } = this.props;
    return (
      <div id='chat-page'>
        <RoomList join={this.joinRoom} base_url={match.url} />
        <Route path={`${match.path}/:roomId`} component={ChatWindow} />
        <ChatRoomInput joinRoom={this.joinRoom} />
        <ChatInput
          send={this.send}
          handleTyping={this.handleTyping}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current_room: state.chatroom.current_room,
});

const mapDispathToProps = dispatch => bindActionCreators({
  addNewMessage,
  updateRoomList
}, dispatch);


export default connect(mapStateToProps, mapDispathToProps)(ChatPage);