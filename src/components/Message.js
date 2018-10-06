import React from 'react'

const Message = ({ message }) => (
  <div className="msg">
    <div className="right">
      <p>{message.username}</p>
      <p className='text'>{message.text}</p>
    </div>
  </div>
);

export default Message;
