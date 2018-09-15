import React, { Component } from 'react'

export default class ChatInput extends Component {
  constructor(props) {
    super(props);
    // instance var
    this.timeOut = null;
    this.isTyping = false;
  }

  handleSend = e => {
    e.preventDefault();
    const text = this.text.value.trim();
    if (text.length > 0) {
      const msg = { text };
      // socket emit
      this.props.send(msg);
    }
  }


  handleChange = e => {
    const text = this.text.value;
    this.props.handleTyping(text);
  }

  // resetTimeOut = () => {
  //   if (this.timeOut)
  //     clearTimeout(this.timeOut);
  //   this.timeOut = setTimeout(() => {
  //     // socket emit stop typing
  //     clearTimeout(this.timeOut);
  //     this.timeOut = null;
  //     this.isTyping = false;
  //     console.log("stop typing");
  //   }, 3000);
  // }

  render() {
    return (
      <form onSubmit={this.handleSend}>
        <input type='text' ref={input => this.text = input} onChange={this.handleChange} required />
        <input type='submit' value='Send' />
      </form>
    )
  }
}
