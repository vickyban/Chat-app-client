import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';

export class ChatWindow extends Component {
  render() {
    const { messages, current_room } = this.props;
    return (
      <div id="chat-window">
        <div id="chat-msgs">
          {messages.filter(message => message.room_name === current_room).map(message => (
            <Message message={message} key={message.timestamp} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.chatroom.messages,
  current_room: state.chatroom.current_room
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow)
