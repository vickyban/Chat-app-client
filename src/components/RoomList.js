import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class RoomList extends Component {
  // handleClick = (e) => {
  //   const roomName = e.target.innerText;
  //   this.props.join(roomName);
  // }
  render() {
    const { rooms, base_url } = this.props;
    return (
      <div>
        <h2>Room List</h2>
        <ul>
          {/* {rooms.slice(1).map(room => (<li id={room} key={room} onClick={this.handleClick}>{room}</li>))} */}
          {rooms.slice(1).map(room => (<li key={room}><Link to={`${base_url}/${room}`}>{room}</Link></li>))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rooms: state.chatroom.rooms
});

export default connect(mapStateToProps)(RoomList);