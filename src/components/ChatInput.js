import React, { Component } from 'react'

export default class ChatInput extends Component {

  handleSend = e => {
    e.preventDefault();
    const text = this.text.value.trim();
    if (text.length > 0) {
      // socket emit
      this.props.send(text);
      this.text.value = "";
    }
  }

  handleChange = e => {
    const text = this.text.value;
    this.props.handleTyping(text);
  }

  render() {
    return (
      <div id="chat-input">
        <form onSubmit={this.handleSend}>
          <textarea type='text' ref={input => this.text = input} onChange={this.handleChange} required />
          <input type='submit' value='Send' />
        </form>
      </div>
    )
  }
}
