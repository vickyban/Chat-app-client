import { NEW_TEXT, ROOM_LIST } from "../chatroom/action";

const initialState = {
  messages: [],
  rooms: ['general'],
  current_room: 'general',
  onlineUsers: [],
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case NEW_TEXT:
      return {
        ...state,
        messages: [...state.messages, data],
      };
    case ROOM_LIST:
      return {
        ...state,
        rooms: data.rooms,
        current_room: data.current_room
      }
    default:
      return state;
  }
}