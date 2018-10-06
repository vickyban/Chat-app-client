import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class RoomList extends Component {
  handleClick = (e) => {
    const roomName = e.target.innerText;
    this.props.join(roomName);
  }
  render() {
    const { rooms, base_url, current_room } = this.props;
    return (
      <div id="room-window">
        <h2>Room List</h2>
        <ul>
          {rooms.slice(1).map(room =>
            (<li key={room} className={room === current_room ? 'active' : ''} >
              <Link to={`${base_url}/${room}`} onClick={this.handleClick}>{room}</Link>
            </li>
            )
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rooms: state.chatroom.rooms,
  current_room: state.chatroom.current_room
});

export default connect(mapStateToProps)(RoomList);