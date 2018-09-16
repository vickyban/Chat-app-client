import React, { Component } from 'react'

export default class ChatRoomInput extends Component {
  handleSubmit = e => {
    const roomName = this.roomName.value;
    //const action = e.target.name;
    if (roomName) {
      // if (action === 'createRoom') {
      //   this.props.creatRoom(roomName);
      // } else if (action === 'joinRoom') {
      this.props.joinRoom(roomName);
      //}
    }
  }

  disableSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.disableSubmit}>
        <input text="text" ref={input => this.roomName = input} required />
        {/* <button type="button" name="createRoom" onClick={this.handleSubmit}>Create Room</button> */}
        <button type="button" name="joinRoom" onClick={this.handleSubmit}>Join Room</button>
      </form>
    )
  }
}
