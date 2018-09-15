import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import ChatInput from '../components/ChatInput';
// actions
import { addNewMessage } from '../redux-store/chatroom/action';

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
    this.state.client.subscribe(this.onMessageReceived);
    this.addNewMessage = this.props.addNewMessage.bind(this);
    this.state.client.listenForTyping(this.onStartTyping);
  }

  // send and receive new text
  onMessageReceived = message => {
    // send to dispatch
    console.log("Received message:", message);
    this.addNewMessage(message);
  }

  send = message => {
    console.log("About to send:", message);
    this.state.client.send(message);
    this.props.addNewMessage(message);
  }

  // set typing state
  onStartTyping = username => {
    console.log(username + " is typing ...");
  }

  handleTyping = text => {
    if (text) {
      if (!this.isTyping) {
        this.isTyping = true;
        this.state.client.startTyping("someone");
      }
      this.resetTypingTimeOut();
    } else if (text.length === 0 && this.isTyping) {
      this.isTyping = false;
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
  }

  resetTypingTimeOut = () => {
    if (this.timeOut)
      clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      // socket emit stop typing
      clearTimeout(this.timeOut);
      this.timeOut = null;
      this.isTyping = false;
      console.log("stop typing");
    }, 3000);
  }

  render() {
    return (
      <div>
        <ChatInput
          send={this.send}
          handleTyping={this.handleTyping}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispathToProps = dispatch => bindActionCreators({
  addNewMessage
}, dispatch);


export default connect(mapStateToProps, mapDispathToProps)(ChatPage);