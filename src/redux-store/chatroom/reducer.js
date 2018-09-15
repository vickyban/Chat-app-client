import { NEW_TEXT } from "../chatroom/action";

const initialState = {
  messages: [],
  onlineUsers: [],
  typingUsers: []
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case NEW_TEXT:
      return {
        ...state,
        messages: [...state.messages, data],
      }
    default:
      return state;
  }
}